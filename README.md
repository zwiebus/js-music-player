# compact-js-music-player
This is an HTML, CSS and JavaScript-based music player.
It's a dark styled compact version.

![Output](/output/html-css.png)

![Output](/output/html-css1.png)

![Output](/output/html-css2.png)

## Running the player

The music player can be run on any modern browser by opening the index.html file.
The player can easily be integrated into your website — just remember to add the stylesheets and jquery's source (if not present) to the head section!
Further information is included in the form of comments in the files.

## Adding more tracks

The tracks are currently being loaded from the tracklist array specified in main.js. More tracks can be added by adding the details of each track as an object to the tracklist.

## Add more tracks to playlist

You can add more tracks by adding a new <i>div class="track-number"</i> in the index.html file.
Ensure that the number is always one less than the corresponding number in the tracklist array: 1 = 0, 2 = 1, etc.

## Features
<ul>
<li>Load audio files with Open File</li>
<li>Display it's cover when hovering over a track in the playlist</li>
<li>Display an error message when an audio file can not be loaded</li>
<li>Ability to display/hide playlist and track details</li>
<li>Make track name smaller if it's too long</li>
<li>Playlist: Highlight current track name and scroll it into view</li>
<li>Optional: Autoscroll track name in playlist once if it's too long</li>
</ul>

## Planned
<ul>
<li>Load playlists with Open File(.pls, .m3u etc)</li>
</ul>

