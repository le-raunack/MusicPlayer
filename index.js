"use strict";
let img_tracker = "play"; // Global image tacker

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
let current_song = 0;
let song = new Audio();

song.addEventListener("timeupdate", function() {
  let position = song.currentTime / song.duration;
  document.getElementById("duration").style.width = position * 100 + "%";
});

song.src = songsList[current_song];
document.getElementById("songname").textContent = songNames[current_song];
document.getElementById("song_image").src = Poster[current_song];
song.play();

song.addEventListener("ended", function() {
  current_song++;
  song.src = songsList[current_song];
  document.getElementById("songname").textContent = songNames[current_song];
  document.getElementById("song_image").src = Poster[current_song];
  song.play();
});

//Play and Pause buttons

function PlayOrPause() {
  if (img_tracker === "play") {
    document.getElementById("play").src = "Assets/Pictures/pause.png";
    img_tracker = "pause";
  } else {
    document.getElementById("play").src = "Assets/Pictures/play.png";
    img_tracker = "play";
  }
  PlaySong();
}

//Next Song

function NextSong() {
  current_song++;
  if (current_song > 14) {
    current_song = 0;
  }
  song.src = songsList[current_song];
  img_tracker = "play";
  document.getElementById("songname").textContent = songNames[current_song];
  document.getElementById("song_image").src = Poster[current_song];
  PlayOrPause();
}

//Previous Song

function PrevSong() {
  current_song--;
  if (current_song < 0) {
    current_song = 14;
  }
  song.src = songsList[current_song];
  img_tracker = "play";
  document.getElementById("songname").textContent = songNames[current_song];
  document.getElementById("song_image").src = Poster[current_song];
  PlayOrPause();
}

//Song Names

function SongsList() {
  for (let i in songNames) {
    document.getElementById("list").innerHTML +=
      "<li>" + songNames[i] + "</li>";
  }
}

function PlaySong() {
  if (song.paused) {
    song.play();
  } else {
    song.pause();
  }
}

SongsList();

let toggle_tracker = 1;

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
