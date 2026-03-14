    // * @package compact-js-music-player
    // * @author sayantanm19
    // * @author Zwiebus

    const track_name = document.querySelector(".track-name");
    const track_number = document.querySelector(".track-number");
    const tracknumber = document.querySelector(".tracknumber");
    const next_btn = document.querySelector(".next-track");
    const prev_btn = document.querySelector(".prev-track");
    const seek_slider = document.querySelector(".seek_slider");
    const volume_slider = document.querySelector(".volume_slider");
    const curr_time = document.querySelector(".current-time");
    const total_duration = document.querySelector(".total-duration");
    //const track_artist = document.querySelector(".track-artist");

    let track_index = 0;
    let isPlaying = false;
    let updateTimer;

   // Create new audio element
    let curr_track = document.createElement('audio');
        curr_track.setAttribute("id", "player");
        curr_track.setAttribute("type", "audio/mpeg");
        container.appendChild(curr_track);

    let track_list = [
  {
    name: "Night Owl",
    artist: "Broke For Free",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3",
    number: "1",
  },
  {
    name: "Enthusiast",
    artist: "Tours",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3",
    number: "2",
  },
  {
    name: "Shipping Lanes",
    artist: "Chad Crouch",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
    number: "3",
  },
  // Internet radio stream
  {
    name: "SomaFM - Groove Salad",
    artist: "Various",
    path: "https://ice5.somafm.com/groovesalad-256-mp3",
    number: "4",
  },
 ];

    function loadTrack(track_index) {
      clearInterval(updateTimer);
      resetValues();
      curr_track.src = track_list[track_index].path;
      curr_track.load();
      track_name.textContent = track_list[track_index].name;
      //track_artist.textContent = track_list[track_index].artist;
      tracknumber.textContent = track_list[track_index].number + '.';
      if (tracknumber.textContent < 10) {tracknumber.textContent = "0" + tracknumber.textContent;}
      updateTimer = setInterval(seekUpdate, 1000);
      curr_track.addEventListener("ended", nextTrack);
      active();
      smallName();
    }
    function resetValues() {
      curr_time.textContent = "00:00";
      total_duration.textContent = "00:00";
      seek_slider.value = 0;
    }
    function playpauseTrack() {
      if (!isPlaying) playTrack();
      else pauseTrack();
    }
    function playTrack() {
      curr_track.play();
      isPlaying = true;
    }
    function pauseTrack() {
      curr_track.pause();
      isPlaying = false;
    }
   // numbers must be one less than in track_list
    function nextTrack() {
      if (track_index < 3)
        track_index++;
      else track_index = 0;
      loadTrack(track_index);
      playTrack();
    }
    function prevTrack() {
      if (track_index > 0)
      track_index--;
      else track_index = 3;
      loadTrack(track_index);
      playTrack();
    }
    function numberTrack() {
      if (track_index = number)
       track_index.number = '';
      else track_index = track_index;
      loadTrack(track_index);
      playTrack();
    }
    function seekTo() {
      seekto = curr_track.duration * (seek_slider.value / 100);
      curr_track.currentTime = seekto;
    }
    function setVolume() {
      curr_track.volume = volume_slider.value / 100;
    }
    function seekUpdate() {
      let seekPosition = 0;
      // Check if the current track duration is a legible number
      if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;
        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
        // Adding a zero to the single digit time values
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
      }
    }
   // Load the first track in the tracklist
    loadTrack(track_index);

   // display/hide playlist, trackdetails
    function showHidePlaylist() {
     let x = document.getElementById("playlist");
      if (x.style.display === "none") {
      x.style.display = "block";
      } else {
       x.style.display = "none";
     }
    }
    function showHideTimes() {
     let x = document.getElementById("times");
      if (x.style.display === "none") {
      x.style.display = "flex";
      } else {
       x.style.display = "none";
     }
    }

  // display volume_slider value
   const slider = document.getElementById("volumeValue");
   const output = document.getElementById("volume_value");
    output.innerText = slider.value  + " %";
     slider.oninput = function() {
     output.textContent = this.value + " %";
     }

  // highlight the current track
   function active() {
     const tracklist = document.getElementsByClassName("track-number active");
     for (let i = 0; i < tracklist.length; i++) {
       tracklist[i].classList.remove("active");
       }
      let trackactive = document.getElementsByClassName("track-number")[0].getAttribute("div[data-track]");
       trackactive = track_list[track_index].number;
       curr = document.querySelector('div[data-track="' + trackactive + '"]').classList;
       curr.add("active");
      let el = document.querySelector('.active');
        el.scrollIntoView(true);
   }

  // if track-name is too long make it smaller
   function smallName() {
     const smallName = document.getElementsByClassName("track-name small");
     for (let i = 0; i < smallName.length; i++) {
       smallName[i].classList.remove("small");
       }
      let  text = track_name.textContent.length;
      if(text > 36) {
       track_name.classList.add("small");
      }
   }

  // Load audio files with Open File
   function loadFile() {
     let files = document.getElementById("fileInput");
     files = [...fileInput.files];
     let len = files.length;
     if(len == 1) {
      singleFile();
     } else {
      multipleFiles();
     }
   }

   function singleFile() {
     let files = fileInput.files;
     let url = URL.createObjectURL(files[0]);
     let file = document.getElementById("player").src = url;
     let fileName = document.getElementById("fileInput").files[0].name;
     // File names often contain characters that do not belong in the title. Clean these and the file extension up.
     let title = fileName.replace(/^[0-9. -]+/,'').replace(/[_]/g,' ').replace(/\.[^.]*$/,'');
     track_name.textContent = title;
     tracknumber.innerText = 'File';
     smallName();
     playTrack(file);
     removeClass();
   }

   function multipleFiles() {
     let _next = 0;
     files = fileInput.files;
     lens = files.length;
     if(lens){
      nextFile(_next);
     }
     player.addEventListener("ended", function(){
      _next += 1;
      nextFile(_next);
      if((lens - 1)==_next){
       _next = -1;
       }
     });
   }

   function nextFile(n) {
     let url = URL.createObjectURL(files[n]);
     player.setAttribute('src', url);
     let fileName = document.getElementById("fileInput").files[n].name;
     let title = fileName.replace(/^[0-9. -]+/,'').replace(/[_]/g,' ').replace(/\.[^.]*$/,'');
     track_name.textContent = title;
     tracknumber.innerText = 'File';
     smallName(fileName);
     player.play();
     removeClass();
   }

  // Display audio error message
   const audio = document.getElementById('player');
   audio.addEventListener('error', function() {
    const error = audio.error;
    if (error) {
     message = document.getElementById("error");
     message.style.display = 'block';
     const playPauseTrack = document.querySelector(".playpause-track");
     playPauseTrack.classList.remove("fa-pause-circle");
     playPauseTrack.classList.add("fa-play-circle");
     closeError();
    }
     loadTrack(track_index); // Fallback to current track
     pauseTrack();
   });

// toogle play pause
document.querySelector(".playpause-track").addEventListener('click', function() {
  this.classList.toggle("fa-play-circle");
  this.classList.toggle("fa-pause-circle");
});

const clickableElements = document.querySelectorAll(".prev-track, .next-track, .track-number");
clickableElements.forEach(function(element) {
  element.addEventListener('click', function() {
    const playPauseTrack = document.querySelector(".playpause-track");
    playPauseTrack.classList.remove("fa-play-circle");
    playPauseTrack.classList.add("fa-pause-circle");
  });
});

function removeClass() {
  const playPauseTrack = document.querySelector(".playpause-track");
  playPauseTrack.classList.remove("fa-play-circle");
  playPauseTrack.classList.add("fa-pause-circle");

  const trackNumbers = document.querySelectorAll(".track-number");
  trackNumbers.forEach(function(trackNumber) {
    trackNumber.classList.remove("active");
  });
}

// Close error message or wait 8 seconds for fade out
document.querySelector(".closeerror").addEventListener('click', function() {
  document.querySelector(".error").style.display = 'none';
});

function closeError() {
  setTimeout(function() {
    const errorElement = document.querySelector('.error');
    if (errorElement) {
      errorElement.style.transition = 'opacity 0.8s';
      errorElement.style.opacity = '0';

      // Optionally, you can hide the element completely after fading out
      setTimeout(function() {
        errorElement.style.display = 'none';
      }, 800); // Same duration as fadeOut
    }
  }, 8000);
}

document.querySelector(".closepls").addEventListener('click', function() {
  document.querySelector(".newplaylist").style.display = 'none';
});

function changeBg() {
  player = document.querySelector(".player");
  player.classList.remove("default");
  player.classList.add("psy");

}

const images = ['css/js-player-bg3.png', 'css/js-player-bg2.png', 'css/light_transpa.png', 'css/js-player-bg_psy.png', 'css/true_transpa'];
let currentImageIndex = 0;

function changeBg() {
  player = document.querySelector(".player");
  player.style.backgroundImage = `url('${images[currentImageIndex]}')`;
  currentImageIndex = (currentImageIndex + 1) % images.length;
}
