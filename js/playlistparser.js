'use strict';

/* Playlist Parser */
function playlistparser() {
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
            if (xhr.status = 200) {
                this.playlistFile = xhr.response;
                this.parse();
            } else {
                throw new Error('Error reading the playlist file');
            }
        } else{
            throw new Error('No playlist file provided');
        }
    },

    parse: function() {
        // check if playlist type is given
        let playlist = [];
        if (this.playlistType == 'm3u' || 'audio/mpegurl') {
            playlist = this.playlistFile.replace(/^.*#.*$|#EXTM3U|#EXTINF:/mg, '').split('\n');
        } else if (this.playlistType == 'pls' || this.playlistType == 'audio/x-scpls') {
            // to do
        } else if (this.playlistType == 'json' || this.playlistType == 'application/json') {
            // to do
        } else {
            throw new Error('No valid playlist file provided, valid formats are m3u pls json or their valid mime types');
        }

        // playlist type is set return the playlist
        let outputArray = [];
        for (var i = 0; i < playlist.length; i++) {
            if (playlist[i]) {
                // check if file name has .mp3, .ogg, .aac; .flac or .wav before adding the playlist array
                if(playlist[i].indexOf('.mp3') !== -1 || playlist[i].indexOf('.wav') !== -1 || playlist[i].indexOf('.ogg') !== -1 || playlist[i].indexOf('.aac') !== -1 || playlist[i].indexOf('.flac') !== -1) {
                    outputArray.push(playlist[i]);
                }
            }
        }
        return outputArray;
    }
};
}