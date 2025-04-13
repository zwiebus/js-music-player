# minimal-js-music-player
This is a simple User Interface of a music player created in HTML, CSS and JavaScript.

![Output](/output/html-css.png)

![Output](/output/html-css1.png)

## Running the player

The index.html file can be run on any modern browser to run the music player.

## Adding more tracks

The tracks are currently being loaded from the tracklist array specified in main.js. More tracks can be added by adding the details of each track as an object to the tracklist.

## Add more tracks to playlist

More tracks can be added by adding a new div class="track-number"  in index.html.
Make sure that the number ' ' is always one less than in tracklist array : 1 = 0, 2 = 1 etc.

## Information

This branch is designed as a mimimal version with a dark style.

## Additional features: 
<ul>
<li>ability to show playlist and trackdetails</li>
<li>minimize track-name if it is too long</li>
<li>playlist: highlight current trackname and scroll it into view</li>
<li>playlist: autoscroll trackname once if it is too long </li>
</ul>
