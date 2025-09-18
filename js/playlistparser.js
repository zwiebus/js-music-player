'use strict';

/* Playlist Parser */
function playlistparser() { 
  window = document.getElementById("newPlaylist");
  window.style.display = 'block';
  window.PlaylistParser = {
    init: function (params) {
        this.params = params;

        // parse playlist and set params
        this.playlistFileGET = this.params.playlistFile || null;
        this.playlistType = this.params.playlistType || null;

        if (this.playlistFileGET != null) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', this.playlistFileGET, true);
            xhr.responseType = 'text';
            xhr.onload = () => {
                if (xhr.status === 200) {
                    this.playlistFile = xhr.response;
                    this.parse();
                } else {
                    throw new Error('Error reading the playlist file');
                }
            };
            xhr.onerror = () => {
                throw new Error('Error reading the playlist file');
            };
            xhr.send();
        } else{
            throw new Error('No playlist file provided');
        }
    },

    parse: function() {
        // check if playlist type is given
        let playlist = [];
        if (this.playlistType == 'm3u' || this.playlistType == 'audio/mpegurl') {
            // Parse M3U: ignore lines starting with #, collect others as file paths
            const lines = this.playlistFile.split('\n');
            for (let line of lines) {
                line = line.trim();
                if (line && !line.startsWith('#')) {
                    playlist.push(line);
                }
            }
        } else if (this.playlistType == 'pls' || this.playlistType == 'audio/x-scpls') {
            // Parse PLS: extract lines like File1=...
            const lines = this.playlistFile.split('\n');
            for (let line of lines) {
                const match = line.match(/^File\d+=(.*)$/i);
                if (match) {
                    playlist.push(match[1].trim());
                }
            }
        } else if (this.playlistType == 'json' || this.playlistType == 'application/json') {
            // Parse JSON: expect an array or an object with a playlist property
            try {
                let data = JSON.parse(this.playlistFile);
                if (Array.isArray(data)) {
                    playlist = data;
                } else if (Array.isArray(data.playlist)) {
                    playlist = data.playlist;
                }
            } catch (e) {
                throw new Error('Invalid JSON playlist file');
            }
        } else {
            throw new Error('No valid playlist file provided, valid formats are m3u pls json or their valid mime types');
        }

        // playlist type is set return the playlist
        let outputArray = [];
        for (var i = 0; i < playlist.length; i++) {
            if (playlist[i]) {
                // check if file name has .mp3, .ogg, .aac; .flac or .wav before adding the playlist array
                if(
                    playlist[i].indexOf('.mp3') !== -1 || 
                    playlist[i].indexOf('.wav') !== -1 || 
                    playlist[i].indexOf('.ogg') !== -1 || 
                    playlist[i].indexOf('.aac') !== -1 || 
                    playlist[i].indexOf('.flac') !== -1
                ){
                    outputArray.push(playlist[i]);
                }
            }
        }
        return outputArray;
    }
};

}

