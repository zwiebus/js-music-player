# compact-js-music-player
This is an HTML, CSS and JavaScript-based music player.
It's a dark styled compact version.

![Output](/output/html-css2.png)

## Running the player

The music player can be run on any modern browser by opening the index.html file.
You can also open the player in a small new window, as shown in start.html.
The player can easily be integrated into your website - just remember to add the stylesheets to the head section! Further information is included in the form of comments in the files.

## Adding tracks to the built-in tracklist

The tracks are currently being loaded from the tracklist array specified in main.js. More tracks can be added by adding the details of each track as an object to the tracklist. Only URL sources are supported.

## Adding more tracks to built-in playlist

You can add more tracks by adding a new <i>div class="track-number"</i> in the index.html file.
Ensure that the number is always one less than the corresponding number in the tracklist array: 1 = 0, 2 = 1, etc.

## Adding tracks from local sources

Open local audio files with “Files.” A new playlist containing the loaded tracks is automatically created and, if necessary, expanded.
Although the files are validated, this feature should only be used in desktop mode!

## Features
<ul>
<li>Load audio files</li>
<li>Validate files (isAudio, maxSize)</li>
<li>Files Playlist</li>
<li>Display an error message when an audio file can not be loaded</li>
<li>Ability to display/hide playlists and track details</li>
<li>Make track name smaller if it's too long</li>
<li>Choose a background image</li>
<li>Playlist: Highlight current track name and scroll it into view</li>
<li>Display it's cover when hovering over a track in the playlist</li>
<li>Optional: Autoscroll track name in playlist once if it's too long</li>
</ul>

## Planned
<ul>
<li>Load playlists(.pls, .m3u etc) with Open File</li>
</ul>







