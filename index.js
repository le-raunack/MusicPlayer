"use strict";
let autoplay = 0; // Global autoplay tracker
let shuffle = 0; // Global shuffle tracker
let toggle_tracker = 1; // Global toggle tracker

//Global songs list, song names list, song poster and settings

let songsList = [
  "Assets/Songs/Song_1.mp3",
  "Assets/Songs/Song_2.mp3",
  "Assets/Songs/Song_3.mp3",
  "Assets/Songs/Song_4.mp3",
  "Assets/Songs/Song_5.mp3",
  "Assets/Songs/Song_6.mp3",
  "Assets/Songs/Song_7.mp3",
  "Assets/Songs/Song_8.mp3",
  "Assets/Songs/Song_9.mp3",
  "Assets/Songs/Song_10.mp3",
  "Assets/Songs/Song_11.mp3",
  "Assets/Songs/Song_12.mp3",
  "Assets/Songs/Song_13.mp3",
  "Assets/Songs/Song_14.mp3",
  "Assets/Songs/Song_15.mp3"
];
let songNames = [
  "Ekadantaya Vakratundaya",
  "Grand Theft Auto V Theme",
  "Made in Abyss Season 1 Opening",
  "We Are! (One Piece, Straw Hats Version)",
  "Kaun Kehte Hain Bhagwaan Aate Nahi",
  "Mitti Di Kushboo - Aayushmaan Khuranna Cover",
  "Seigi Sikkou - One Punch Man OST",
  "Bohemian Rhapsody - Queen",
  "Dovahkiin - Song of the Dragon Born",
  "Hashire - HunterxHunter OST",
  "Bhaag D.K. Bose - Delhi Belly",
  "Neon Genesis: Evangelion Opening",
  "Sono Chi No Kiouku; End of ZA WARUDO - JoJo's Bizarre Adventures Season 3 Opening",
  "Avengers Theme Song",
  "Roundabout - Yes"
];
let Poster = [
  "Assets/Posters/Pos_1.jpg",
  "Assets/Posters/Pos_2.jpg",
  "Assets/Posters/Pos_3.jpg",
  "Assets/Posters/Pos_4.jpg"
];

//////// Song objects

let current_song = 0;
let song = new Audio();
let slider = document.getElementById("slider");
let nameList = document.getElementById("list");
let text = document.getElementById("songname");
let poster = document.getElementById("song_image");
let auto_img = document.getElementById("autoplay");
let shuffle_img = document.getElementById("shuffle");
let volume_tracker = document.getElementById("volume");
let volume_tracker_media = document.getElementById("volume-media");

////// Duration bar

song.addEventListener("timeupdate", function() {
  let position = song.currentTime / song.duration;
  slider.value = position * 100;
});

slider.oninput = function() {
  song.currentTime = (this.value * song.duration) / 100;
};

/////// Volume bar

volume_tracker.oninput = function() {
  if (this.value <= 0) {
    document.getElementById("volume-img").src =
      "Assets/Pictures/volume-mute.png";
  } else {
    document.getElementById("volume-img").src =
      "Assets/Pictures/volume-unmute.png";
  }
  song.volume = this.value / 100;
};

//////// Volume-Bar for media objects

volume_tracker_media.oninput = function() {
  if (this.value <= 0) {
    document.getElementById("volume-img-media").src =
      "Assets/Pictures/volume-mute.png";
  } else {
    document.getElementById("volume-img-media").src =
      "Assets/Pictures/volume-unmute.png";
  }
  song.volume = this.value / 100;
};

////////////////////////////Initializing songs///////////////////////////////

song.src = songsList[current_song];
text.textContent = songNames[current_song];
poster.src = Poster[current_song];

/*********** Autoplay Event Listener**********/

auto_img.addEventListener("click", function() {
  if (autoplay === 0) {
    autoplay = 1;
    auto_img.src = "Assets/Pictures/auto-play-active.png";
  } else {
    autoplay = 0;
    auto_img.src = "Assets/Pictures/auto-play-inactive.png";
  }
});

/*************** Shuffle Event Listener ****************/

shuffle_img.addEventListener("click", function() {
  if (shuffle === 0) {
    shuffle = 1;
    shuffle_img.src = "Assets/Pictures/shuffle-active.png";
  } else {
    shuffle_img.src = "Assets/Pictures/shuffle-inactive.png";
    shuffle = 0;
  }
});

/************ Autoplay ***********/
function AutoPlay() {
  song.addEventListener("ended", function() {
    if (autoplay === 1) {
      if (shuffle === 1) {
        Shuffle();
      }
      current_song++;
      if (current_song > songsList.length) {
        current_song = 0;
      }
      song.src = songsList[current_song];
      text.textContent = songNames[current_song];
      poster.src = Poster[current_song];
      song.play();
      slider.value = 0;
    } else {
      return null;
    }
  });
}
AutoPlay();

/********************FUNCTIONS**********************/

// Play song

function PlaySong() {
  if (song.paused) {
    song.play();
  } else {
    song.pause();
  }
}

//Play and Pause buttons

function PlayOrPause() {
  if (song.paused) {
    document.getElementById("play").src = "Assets/Pictures/pause.png";
  } else {
    document.getElementById("play").src = "Assets/Pictures/play.png";
  }
  PlaySong();
}

//Next Song

function NextSong() {
  current_song++;
  if (current_song > [songsList.length - 1]) {
    current_song = 0;
  }
  if (shuffle === 1) {
    Shuffle();
    PlayOrPause();
  } else {
    song.src = songsList[current_song];
    text.textContent = songNames[current_song];
    poster.src = Poster[current_song];
  }
  PlayOrPause();
}

//Previous Song

function PrevSong() {
  current_song--;
  if (current_song < 0) {
    current_song = 14;
  }
  if (shuffle === 1) {
    Shuffle();
    PlayOrPause();
  } else {
    song.src = songsList[current_song];
    text.textContent = songNames[current_song];
    poster.src = Poster[current_song];
  }
  PlayOrPause();
}

//Shuffling

function Shuffle() {
  let random = Math.random(songsList);
  random = random * songsList.length;
  random = parseInt(random);
  if (random > songsList.length) {
    random = 0;
  }
  current_song = random;
  song.src = songsList[current_song];
  text.textContent = songNames[current_song];
  poster.src = Poster[current_song];
  PlayOrPause();
}

//Song Names

function SongsList() {
  for (let i in songNames) {
    let name = document.createElement("li");
    name.dataset.value = i;
    name.addEventListener("click", function() {
      current_song = parseInt(name.dataset.value);
      song.src = songsList[current_song];
      text.textContent = songNames[current_song];
      poster.src = Poster[current_song];
      PlayOrPause();
    });
    name.innerText = songNames[i];
    nameList.insertAdjacentElement("beforeend", name);
  }
}
SongsList();

///////// List toggle function

function Toggle() {
  if (toggle_tracker === 1) {
    document.getElementById("list").style.display = "none";
    toggle_tracker = 0;
    document.getElementsByTagName("footer")[0].style.position = "fixed";
  } else {
    document.getElementById("list").style.display = "block";
    toggle_tracker = 1;
    document.getElementsByTagName("footer")[0].style.position = "relative";
  }
}
