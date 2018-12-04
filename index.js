/*********************************************
 *                                           *|
 *              MUSIC PLAYER VER 2           *|
 *                                           *|
 * *******************************************/

//All variables:

let song = new Audio();
let current_song = 0;
let autoplay = document.getElementById("autoplay");
let autoplay_tracker = 0;
let shuffle = document.getElementById("shuffle");
let shuffle_tracker = 0;
let songname = document.getElementById("songname");
let songtime = document.getElementById("songtime");
let songposter = document.getElementById("songposter");
let volume = document.getElementById("volume");
let volume_img = document.getElementById("volume-img");
let playorpause = document.getElementById("playnpause");
let namelist = document.getElementById("list");

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
  "Assets/Songs/Song_15.mp3",
  " "
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
  "Roundabout - Yes",
  " "
];

let songPos = [
  "Assets/Pictures/Pos_1.jpg",
  "Assets/Pictures/Pos_2.jpg",
  "Assets/Pictures/Pos_3.jpg",
  "Assets/Pictures/Pos_4.jpg",
  "Assets/Pictures/Pos_5.jpg",
  "Assets/Pictures/Pos_6.jpg",
  "Assets/Pictures/Pos_7.jpg",
  "Assets/Pictures/Pos_8.jpg",
  "Assets/Pictures/Pos_9.jpg",
  "Assets/Pictures/Pos_10.jpg",
  "Assets/Pictures/Pos_11.jpg",
  "Assets/Pictures/Pos_12.jpg",
  "Assets/Pictures/Pos_13.jpg",
  "Assets/Pictures/Pos_14.jpg",
  "Assets/Pictures/Pos_15.jpg",
  " "
];

// Initializations:

song.src = songsList[current_song];
songname.textContent = songNames[current_song];
songposter.src = songPos[current_song];

song.addEventListener("timeupdate", function() {
  songtime.textContent =
    parseInt(song.currentTime) + " / " + parseInt(song.duration) + " seconds";
});

autoplay.addEventListener("click", function() {
  if (autoplay_tracker === 0) {
    autoplay.src = "Assets/Buttons/auto-play-active.png";
    autoplay_tracker = 1;
  } else {
    autoplay.src = "Assets/Buttons/auto-play-inactive.png";
    autoplay_tracker = 0;
  }
});

shuffle.addEventListener("click", function() {
  if (shuffle_tracker === 0) {
    shuffle.src = "Assets/Buttons/shuffle-active.png";
    shuffle_tracker = 1;
  } else {
    shuffle.src = "Assets/Buttons/shuffle-inactive.png";
    shuffle_tracker = 0;
  }
});

volume.oninput = function() {
  if (this.value <= 0) {
    volume_img.src = "Assets/Buttons/volume-mute.png";
  } else {
    volume_img.src = "Assets/Buttons/volume-unmute.png";
  }
  song.volume = this.value / 100;
};

song.addEventListener("timeupdate", function() {
  let pos = song.currentTime / song.duration;
  duration.value = pos * 100;
});

duration.oninput = function() {
  song.currentTime = (this.value * song.duration) / 100;
};

song.addEventListener("ended", function() {
  if (autoplay_tracker === 1) {
    AutoPlay();
  } else {
    return null;
  }
});

song.addEventListener("ended", function() {
  if (shuffle_tracker === 1) {
    Shuffle();
  } else {
    return null;
  }
});

// Functions:

function PlaySong() {
  if (song.paused) {
    song.play();
  } else {
    song.pause();
  }
}

function PlayNPause() {
  if (song.paused) {
    playorpause.src = "Assets/Buttons/pause.png";
  } else {
    playorpause.src = "Assets/Buttons/play.png";
  }
  PlaySong();
}

function AutoPlay() {
  if (shuffle_tracker === 1) {
    Shuffle();
  } else {
    current_song++;
  }
  if (current_song > songsList.length - 1) {
    current_song = 0;
  }
  song.src = songsList[current_song];
  songname.textContent = songNames[current_song];
  songposter.src = songPos[current_song];
  song.play();
}

function Shuffle() {
  let random = Math.random(songsList);
  random = random * songsList.length;
  random = parseInt(random);
  current_song = random;
  let lastplayed = current_song;
  if (current_song > songsList.length) {
    current_song = 0;
  }
  song.src = songsList[current_song];
  songname.textContent = songNames[current_song];
  songposter.src = songPos[current_song];
  song.play();
}

function NextSong() {
  if (shuffle_tracker === 1) {
    Shuffle();
  }
  current_song++;
  if (current_song > songsList.length - 2) {
    current_song = 0;
  }
  song.src = songsList[current_song];
  songname.textContent = songNames[current_song];
  songposter.src = songPos[current_song];
  PlayNPause();
}

function PrevSong() {
  if (shuffle_tracker === 1) {
    Shuffle();
  }
  current_song--;
  if (current_song < 0) {
    current_song = songsList.length - 2;
  }
  song.src = songsList[current_song];
  songname.textContent = songNames[current_song];
  songposter.src = songPos[current_song];
  PlayNPause();
}

function SongList() {
  for (let i in songNames) {
    let listings = document.createElement("li");
    let poster = document.createElement("img");
    let names = document.createElement("p");
    listings.insertAdjacentElement("beforeend", names);
    listings.insertAdjacentElement("afterbegin", poster);
    listings.dataset.value = i;
    listings.addEventListener("click", function() {
      current_song = parseInt(listings.dataset.value);
      song.src = songsList[current_song];
      songname.textContent = songNames[current_song];
      songposter.src = songPos[current_song];
      PlayNPause();
    });
    poster.src = songPos[i];
    names.innerText = songNames[i];
    namelist.insertAdjacentElement("beforeend", listings);
  }
}
SongList();
