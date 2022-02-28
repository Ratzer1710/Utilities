lofi_playlist = lofi_playlist.reverse();
hiphop_playlist = hiphop_playlist.reverse();
nacional_playlist = nacional_playlist.reverse();
rock_playlist = rock_playlist.reverse();
let current_playlist = lofi_playlist;
let current_playlist_name = "Lofi";
let current_song = "A Little Help";
let current_style = "loop";
let current_index = 0;
let songs_played = [0];
let index = 0;
let volume_val = document.getElementById("volume_value");
let volume = document.getElementById("volume_range")
let playlist = document.getElementById("playlist");
let song_name = document.getElementById("name");
let time = document.getElementById("duration");
let play_pause = document.getElementById("play-pause_btn");
let previous = document.getElementById("previous");
let next = document.getElementById("next");
let style = document.getElementById("play_style");
let player = document.getElementById("player");
let modal = document.getElementById("modal");
let volume_control = document.getElementById("volume");
let audio = document.getElementById("main_audio");
let lofi = document.getElementById("lofi");
let hiphop = document.getElementById("hiphop");
let nacional = document.getElementById("nacional");
let rock = document.getElementById("rock");

window.onload = setSong();

function setSong (){
    playlist.innerHTML = current_playlist_name;
    song_name.innerHTML = current_song;
}

audio.addEventListener("timeupdate", (e)=>{
    curr_min = Math.floor(audio.currentTime/60);
    dur_min = Math.floor(audio.duration/60);
    if (Math.floor(audio.currentTime%60) < 10) {
        curr_sec = "0" + Math.floor(audio.currentTime%60); 
    } else { curr_sec = Math.floor(audio.currentTime%60) }
    if (Math.floor(audio.duration%60) < 10) {
        dur_sec = "0" + Math.floor(audio.duration%60); 
    } else { dur_sec = Math.floor(audio.duration%60) }

    if (isNaN(dur_min) || isNaN(dur_sec)) {
        dur_min = 0;
        dur_sec = 00;
    }

    time.innerHTML = curr_min + ":" + curr_sec + " - " + dur_min + ":" + dur_sec;

    if ( audio.ended ) {
        playNext(); 
    }

    audio.volume = volume.value/100;
});

volume.addEventListener("change", function () {
    volume_val.innerHTML = volume.value;
    volume_control.className = "icon";
    if (volume.value < 26) {
        volume_control.classList.add("icon-volume-low");
    } if (volume.value > 25 && volume.value < 76) {
        volume_control.classList.add("icon-volume-medium");
    } if (volume.value > 75) {
        volume_control.classList.add("icon-volume-high");
    } if (volume.value == 0) {
        volume_control.classList.add("icon-volume-mute2");
    }
})

function playPrevious() {
    console.log(songs_played);
    if (curr_sec > 5) {
        loadSong();
    } else {
        if (current_style == "shuffle") {
            current_index = current_index-1;
            index = songs_played[current_index];
        } else {
            index = index-1;
            if(index < 0) { 
                index = current_playlist.length-1;
            }
        }
        loadSong();        
    }
}

function playNext() {
    current_index = current_index+1;
    if (current_style == "shuffle") {
        if (typeof songs_played[current_index] === 'undefined') {
            random = Math.floor(Math.random() * current_playlist.length);
            index = random;
            songs_played.push(index);
        } else {
            index = songs_played[current_index];
        }        
    } else {
        index = index+1;
        if (current_playlist.length == index) {
            index = 0;
        }
        songs_played.push(index);
    }
    loadSong();
}

function loadSong(){
    audio.src = current_playlist[index].path;
    current_song = current_playlist[index].title;
    setSong();
    audio.load();
    playPause();
}

function playStyle () {
    if (current_style == "loop") {
        style.classList.add("icon-loop");
        style.classList.remove("icon-shuffle");
        current_style = "shuffle";
        playNext();
    } else {
        style.classList.remove("icon-loop");
        style.classList.add("icon-shuffle");
        current_style = "loop";
    }
}

function playPause() {
    if (audio.paused) {
        audio.play();
        play_pause.classList.add('icon-pause2');
        play_pause.classList.remove('icon-play3');
    } else {
        audio.pause();
        play_pause.classList.remove('icon-pause2');
        play_pause.classList.add('icon-play3');
    }
}

function useModal() {
    if (player.style.display != "none") {
        player.style.display = "none";
        modal.style.display = "block";
    } else {
        modal.style.display = "none";
        player.style.display = "block";
    }    
}

function playlist_picker(name) {
    current_index = 0;
    songs_played = [0];
    index = 0;
    current_playlist_name = name;
    if (current_playlist_name == "Lofi") {
        current_playlist = lofi_playlist;
        lofi.classList.add("active");
    } else {
        lofi.classList.remove("active");
    } 
    if (current_playlist_name == "Hip Hop") {
        current_playlist = hiphop_playlist;
        hiphop.classList.add("active");
    } else {
        hiphop.classList.remove("active");
    }  
    if (current_playlist_name == "Nacional") {
        current_playlist = nacional_playlist;
        nacional.classList.add("active");
    } else {
        nacional.classList.remove("active");
    }  
    if (current_playlist_name == "Rock") {
        current_playlist = rock_playlist;
        rock.classList.add("active");
    } else {
        rock.classList.remove("active");
    }
    loadSong();
    playPause();
    useModal();
}

function volumeSlider() {
    if (document.getElementById("volume_slider").style.display == "none") {
        document.getElementById("volume_slider").style.display = "flex";
    } else {
        document.getElementById("volume_slider").style.display = "none";
    }
}

document.addEventListener('mouseup', function(e) {
  let container = document.getElementById("volume_slider");
  if (!container.contains(e.target) && !volume_control.contains(e.target) && !document.getElementById("dark_mode_switch").contains(e.target)) {
    document.getElementById("volume_slider").style.display = "none";
  }
});

song_name.addEventListener('mouseover', function(e) {
    if (song_name.innerHTML.length > 20) {
        document.getElementById("name_tag").style.display = 'block';
        document.getElementById("name_tag").innerHTML = song_name.innerHTML;
    }
})

song_name.addEventListener('mouseout', function(e) {
    document.getElementById("name_tag").style.display = 'none';
})

function showSpotify() {
    document.getElementById('spotify').classList.toggle('hidden_music')
}