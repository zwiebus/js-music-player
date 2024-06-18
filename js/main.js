    let track_name = document.querySelector(".track-name");
    let tracknumber = document.querySelector(".tracknumber");
    let playpause_btn = document.querySelector(".playpause-track");
    let next_btn = document.querySelector(".next-track");
    let prev_btn = document.querySelector(".prev-track");
    let seek_slider = document.querySelector(".seek_slider");
    let volume_slider = document.querySelector(".volume_slider");
    let curr_time = document.querySelector(".current-time");
    let total_duration = document.querySelector(".total-duration");

    let track_index = 0;
    let isPlaying = false;
    let updateTimer;
    // Create new audio element
    let curr_track = document.createElement('audio');
    let track_list = [
  {
    name: "Night Owl",
    artist: "Broke For Free",
    image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3",
    number: "1",
  },
  {
    name: "Enthusiast",
    artist: "Tours",
    image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3",
    number: "2",
  },
  {
    name: "Shipping Lanes",
    artist: "Chad Crouch",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
    number: "3",
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
      playpause_btn.innerHTML = '<i class="fa fa-pause-circle"></i>';
    }
    function pauseTrack() {
      curr_track.pause();
      isPlaying = false;
      playpause_btn.innerHTML = '<i class="fa fa-play-circle"></i>';
    }
    // numbers must be one less than in track_list
    function nextTrack() {
      if (track_index < 2)
        track_index++;
      else track_index = 0;
      loadTrack(track_index);
      playTrack();
    }
    function prevTrack() {
      if (track_index > 0)
      track_index--;
      else track_index = 2;
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

    // show/hide playlist or trackdetails
    function showHide(id, styleDisplay, displayInline) {
     var node = document.getElementById(id);
      if(node) {
       if(styleDisplay) {
        node.style.display = styleDisplay;
       } else {
         if(node.style.display == 'none') {
        node.style.display = (displayInline ? 'inline' : 'block');
       } else {
        node.style.display = 'none';
       }
      }
     }
    }
   // show volume_slider value
   let slider = document.getElementById("volumeValue");
   let output = document.getElementById("volume_value");
    output.innerText = slider.value  + " %";
     slider.oninput = function() {
     output.innerText = this.value + " %";
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
   }
