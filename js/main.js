    // * @package compact-js-music-player
    // * @author sayantanm19
    // * @author Zwiebus

    // The original code uses “innerHtml” This is a security risk. Better use “textContent”.
    // This and some other functions like 'display covers' are better solved with pure HTML/CSS.

    const track_name = document.querySelector(".track-name");
    const track_number = document.querySelector(".track-number");
    const tracknumber = document.querySelector(".tracknumber");
    const playpause_btn = document.querySelector(".playpause-track");
    const next_btn = document.querySelector(".next-track");
    const prev_btn = document.querySelector(".prev-track");
    const seek_slider = document.querySelector(".seek_slider");
    const volume_slider = document.querySelector(".volume_slider");
    const curr_time = document.querySelector(".current-time");
    const total_duration = document.querySelector(".total-duration");

    let track_index = 0;
    let isPlaying = false;
    let updateTimer;

    // Create new audio element
    let curr_track = document.createElement('audio');
        curr_track.setAttribute("id", "player");
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
      playTrack();                 ;
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
   const fileInput = document.getElementById("fileInput");
    fileInput.addEventListener("change", event => {
    const objUrl = URL.createObjectURL(event.target.files[0]);
     let file = document.getElementById("player").src = objUrl;
     let fileName = document.getElementById("fileInput").files[0].name;
     // File names contain characters that do not belong in the title. Clean this up.
     let title = fileName.replace(/[0-9]/g,'').replace(/[.-]/,'').replaceAll('_',' ').replace(/\.[^.]*$/,'').replace('flac','');
     tracknumber.textContent = 'File';
     track_name.textContent = title;
     smallName();
     playTrack();
   });
   // jquery toogle play pause
$(".playpause-track").on('click', function() {
  $(this).toggleClass("fa-play-circle fa-pause-circle");
});
$(".prev-track,.next-track,.track-number").on('click', function() {
  $(".playpause-track").removeClass("fa-play-circle");
  $(".playpause-track").addClass("fa-pause-circle");
});
$("#fileInput").on('change', function() {
  $(".playpause-track").removeClass("fa-play-circle");
  $(".playpause-track").addClass("fa-pause-circle");
});
