    // * @package compact-js-music-player
    // * @author sayantanm19
    // * @author zwiebus

    const track_name = document.querySelector(".track-name");
    const track_number = document.querySelector(".track-number");
    const tracknumber = document.querySelector(".tracknumber");
    const seek_slider = document.querySelector(".seek_slider");
    const volume_slider = document.querySelector(".volume_slider");
    const curr_time = document.querySelector(".current-time");
    const total_duration = document.querySelector(".total-duration");

    let fileArray = [];

    const fileInput = document.getElementById('fileInput');

   // validate FileList
    fileInput.addEventListener('input', () => {
     const files = fileInput.files;
     const requiredTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/webm', 'audio/aac', 'audio/flac', 'audio/opus'];
     const requiredSize = 100 * 1024 * 1024;   // first value means MB.
     let message = document.getElementById("error");
      for (let i = 0; i < files.length; i++) {
       file = files[i];
       size = files[i].size;
       if(!requiredTypes.includes(file.type)) {
        message.style.display = 'block';
        message.textContent = 'You selected an unsupported file (no audio).';
        message.appendChild(closeerror);
        closeError();
        fileInput.value = '';
        return;
       }
       if(size > requiredSize) {
        message.style.display = 'block';
        message.textContent = 'Files must not exceed 100 MB in size.';
        message.appendChild(closeerror);
        closeError();
        fileInput.value = '';
        return;
       }
     }
     const tracks = Array.from(fileInput.files); // Convert FileList to array
      fileArray = fileArray.concat(tracks); // Concatenate input files with existing array
      console.log(fileArray); // Display the updated array
      loadFiles(fileArray);
    });

    let lens = 0;
    let blob = 0;
    let files_index = 0;
    let track_index = 0;
    let isPlaying = false;
    let updateTimer;

   // Create and config audio element
    let curr_track = document.createElement('audio');
        curr_track.setAttribute("id", "player");
        curr_track.setAttribute("type", "audio/mpeg");
        container.appendChild(curr_track);

    curr_track.addEventListener("ended", nextTrack);

    curr_track.addEventListener("pause", () => {
      const playPauseTrack = document.querySelector(".playpause-track");
      playPauseTrack.classList.remove("fa-pause-circle");
      playPauseTrack.classList.add("fa-play-circle");
    });

    curr_track.addEventListener("play", () => {
      const playPauseTrack = document.querySelector(".playpause-track");
      playPauseTrack.classList.remove("fa-play-circle");
      playPauseTrack.classList.add("fa-pause-circle");
    });

   // Load audio files
   function loadFiles(fileArray) {
     lens = fileArray.length;
      let _next = 0;
       //let n = (_next + lens - 1) % lens;
       if(lens > 0){
        nextFile(_next);
       }
     newPl();
   }

   function nextFile(n) {
     clearInterval(updateTimer);
     resetValues();
     let url = URL.createObjectURL(fileArray[n]);
     curr_track.src = url;
     curr_track.load();
     let fileName = fileArray[n].name;
     let title = fileName.replace(/^[0-9. -]+/,'').replace(/[_]/g,' ').replace(/\.[^.]*$/,'');
     track_name.textContent = title;
     tracknumber.textContent = '';
     tracknumber.classList.add('fa','fa-file-audio');
     updateTimer = setInterval(seekUpdate, 1000);
     playTrack();
     smallName();
     activeTrack();
   }

  // create new playlist
   function newPl() {
     let newplaylist = document.getElementById("newplaylist");
     newplaylist.innerText = '';
     fileArray.forEach((file, index) => {
       const fileItem = document.createElement('div');
     // File names often contain characters that do not belong in the title. Clean these and the file extension up.
       let title = file.name.replace(/^[0-9. -]+/,'').replace(/[_]/g,' ').replace(/\.[^.]*$/,'');
       let number = index + 1;
        fileItem.classList.add('track-number');
        fileItem.setAttribute('data-track', number);
         if (number < 10) {
          fileItem.textContent = "0" + number + ". " + title;
         } else {
          fileItem.textContent =  + number + ". " + title;
         }
        fileItem.onclick = () => {
         let url = URL.createObjectURL(file);
         curr_track.src = url;
         track_name.textContent = title;
         tracknumber.textContent = '';
         tracknumber.classList.add('fa','fa-file-audio');
         playTrack();
         smallName();
         activeTrack();
        };
        newplaylist.appendChild(fileItem);
        activeTrack();
        //autoscrollPls();   // comment in for autoscroll track-number text
     });
     newplaylist.style.display = 'block';
   }

 // Use track_list only for URL sources
    let track_list = [
  {
    name: "Night Owl - Broke For Free",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3",
    number: "1",
  },
  {
    name: "Enthusiast - Tours",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3",
    number: "2",
  },
  {
    name: "Shipping Lanes - Chad Crouch",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
    number: "3",
  },
  // Internet radio stream
  {
    name: "SomaFM - Groove Salad",
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
      tracknumber.classList.remove('fa','fa-file-audio');
      tracknumber.textContent = track_list[track_index].number + '.';
      if (tracknumber.textContent < 10) {tracknumber.textContent = "0" + tracknumber.textContent;}
      updateTimer = setInterval(seekUpdate, 1000);
      //playTrack();
      activeTrack();
      smallName();
      //autoscrollPls();  // comment in for autoscroll track-number text
    }

    function resetValues() {
      curr_time.textContent = "00:00";
      total_duration.textContent = "00:00";
      seek_slider.value = 0;
    }

    const playpause = document.getElementById("playpause");
    playpause.addEventListener('click', playpauseTrack);

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

    function nextTrack() {
      if(curr_track.src.startsWith("blob:")) {
       nextBlob();
      } else {
       if (track_index < 3)   // number must be one less than in track_list
       track_index++;
       else track_index = 0;
       loadTrack(track_index);
       playTrack();
      }
    }

    function prevTrack() {
      if(curr_track.src.startsWith("blob:")) {
       prevBlob();
      } else {
       if (track_index > 0)
       track_index--;
       else track_index = 3;  // number must be one less than in track_list
       loadTrack(track_index);
       playTrack();
      }
    }

    function nextBlob() {
     lens = fileArray.length;
     blob = (blob + 1) % lens;
       nextFile(blob);
    }

    function prevBlob() {
     lens = fileArray.length;
     let first = fileArray[0];
      if(first) {
       blob = (blob + lens - 1) % lens;
      } else {
       blob = (blob - 1) % lens;
      }
       nextFile(blob);
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

   // display/hide playlists, trackdetails
    const playlists = document.getElementById("showHidePlaylist");
    playlists.addEventListener('click', showHidePlaylist);

    function showHidePlaylist() {
     let x = document.querySelectorAll(".playlist, .newplaylist");
     for (let i = 0; i < x.length; i++) {
      if (x[i].style.display === "none") {
       x[i].style.display = "block";
      } else {
       x[i].style.display = "none";
      }
     }
    }

    const showHideTime = document.getElementById("showHideTime");
    showHideTime.addEventListener('click', showHideTimes);

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

  // highlight the current track in playlists
    function activeTrack() {
      const track = track_name;
      const tracks = document.querySelectorAll(".track-number");
       for (let i = 0; i < tracks.length; i++) {
        let title = tracks[i].textContent.replace(/^[0-9. -]+/,'').replace(/[_]/g,' ').replace(/\.[^.]*$/,'');
         if(track.textContent == title) {
          tracks[i].classList.add("active");
          //tracks[i].scrollIntoView();   // optional if playlists height is greater than specified
         } else {
          tracks[i].classList.remove("active");
         }
       }
    }

    function removeClass() {
      const playPauseTrack = document.querySelector(".playpause-track");
      if(!curr_track.paused) {
      playPauseTrack.classList.remove("fa-pause-circle");
      playPauseTrack.classList.add("fa-play-circle");
      }
    }

  // if track-name is too long make it smaller
    function smallName() {
     const smallName = document.getElementById("track-name");
     smallName.classList.remove("small");
     let  text = track_name.textContent.length;
      if(text > 42) {
       track_name.classList.add("small");
      }
    }

  // if track-number text is too long for playlist width - autoscroll it
    function  autoscrollPls() {
     const pls = document.querySelectorAll(".track-number");
      for (let i = 0; i < pls.length; i++) {
       let  text = pls[i].textContent.length;
       if(text > 50) {
        pls[i].classList.add("autoscroll");
       }
      }
   }

  // Display audio error message
   const audio = document.getElementById('player');
   let closeerror = document.getElementById("closeerror");
    audio.addEventListener('error', function() {
    const error = audio.error;
    if (error) {
     message = document.getElementById("error");
     message.style.display = 'block';
     message.textContent ='The audio file seems to be damaged and/or corrupted.';
     message.appendChild(closeerror);
     const playPauseTrack = document.querySelector(".playpause-track");
     playPauseTrack.classList.remove("fa-pause-circle");
     playPauseTrack.classList.add("fa-play-circle");
     closeError();
     let errortrack = document.getElementsByClassName("track-number")[0].getAttribute("div[data-track]");
     if(lens == 1) {
      errortrack = document.querySelector('div[data-track="1"]');
      errortrack.style.display = 'none';
     } else {
      erlens = lens;
      errortrack = document.querySelector('div[data-track="' + erlens + '"]');
      errortrack.style.display = 'none';
     }
    fileArray.pop();
    track_name.textContent = 'Error. Please choose a valid track';
    }
   });

// toogle play pause
document.querySelector(".playpause-track").addEventListener('click', function() {
  this.classList.toggle("fa-play-circle");
  this.classList.toggle("fa-pause-circle");
});

const trackSelection = document.querySelectorAll(".prev-track, .next-track, .track-number");
  trackSelection.forEach(function(element) {
   element.addEventListener('click', function() {
    const playPauseTrack = document.querySelector(".playpause-track");
    playPauseTrack.classList.remove("fa-play-circle");
    playPauseTrack.classList.add("fa-pause-circle");
  });
});

// Close error message or fade out after 8 seconds
document.querySelector(".closeerror").addEventListener('click', function() {
  document.querySelector(".error").style.display = 'none';
});

function closeError() {
  setTimeout(function() {
   const element = document.getElementById("error");
    element.classList.add("fading-out"); // Triggers transition
    element.addEventListener("transitionend", () => {
     element.style.display = "none";
     element.classList.remove("fading-out");
    }, { once: true });
  }, 8000);
}

// change background image . add new images
const images = ['img/js-player-bg3.png', 'img/js-player-bg2.png', 'img/js-player-bg_psy.png', 'img/true_transpa', 'img/light_transpa.png'];
let currentImageIndex = 0;

const changeBgd = document.getElementById("changeBg");
changeBgd.addEventListener('click', changeBg);

function changeBg() {
  player = document.getElementById("container");
  player.style.backgroundImage = `url('${images[currentImageIndex]}')`;
  currentImageIndex = (currentImageIndex + 1) % images.length;
}

// to do : save playlist as json file
/* function saveJSON() {
     fileArray.forEach(file => {
      trackName = file.name;
     });
   saveArrayAsJSON(fileArray, 'pls.json');
}

function saveArrayAsJSON(fileArray, filename) {
  const jsonString = JSON.stringify(fileArray, trackName);
  const blob = new Blob([jsonString], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
} */
