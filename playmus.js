"use strict";
const musicTitleEl = document.getElementById("music_title");
const playerProgressEl = document.getElementById("player_progress");
const progressEl = document.getElementById("progress");
const currentTimeEl = document.getElementById("current_time");
const durationEl = document.getElementById("duration");
const prevBtnEl = document.getElementById("prev");
const playvBtnEl = document.getElementById("play");
const nextvBtnEl = document.getElementById("next");
const songs = [
  {
    path: "music/gorodkino.mp3",
    displayName: "Город",
  },
  {
    path: "music/nelubov.mp3",
    displayName: "Это не любовь",
  },
  {
    path: "music/etolubov.mp3",
    displayName: "Это любовь",
  },
  {
    path: "music/gruppakrovi.mp3",
    displayName: "Группа крови",
  },
  {
    path: "music/pachkasigaret.mp3",
    displayName: "Пачка сигарет",
  },
  {
    path: "music/etifilmi.mp3",
    displayName: "Эти фильмы",
  },
  {
    path: "music/muraveynik.mp3",
    displayName: "Муравейник",
  },
  {
    path: "music/boshetunmay.mp3",
    displayName: "Бошетунмай",
  },
  {
    path: "music/bezslov.mp3",
    displayName: "Песня без слов",
  },
  {
    path: "music/peremen.mp3",
    displayName: "Перемен",
  },
];
const music = new Audio();
let musicIndex = 0;
let musicIndexl = 0;
let isPlaying = false;
//================== Play Song  True or False====================
function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}
//================== Play Music====================
function playMusic() {
  isPlaying = true;
  playvBtnEl.classList.replace("fa-play", "fa-pause");
  playvBtnEl.setAttribute("title", "pause");
  music.play();
  }
//================== Pause Music====================
function pauseMusic() {
  isPlaying = false;
  playvBtnEl.classList.replace("fa-pause", "fa-play");
  playvBtnEl.setAttribute("pause", "title");
  music.pause();
}
//================== Load Songs ====================
function loadMusic(songs) {
  music.src = songs.path;
  musicTitleEl.textContent = songs.displayName;
}
//================== Change Music ====================
function changeMusic(direction) {
  musicIndex = musicIndex + direction + (songs.length % songs.length);
  loadMusic(songs[musicIndex]);
ubrcvet();
let audiolist = document.querySelectorAll( ".audiolist" );
audiolist[musicIndex].style.color = "white";
// audiolist[musicIndex].style.background = "green";
playMusic();
}

function ubrcvet() {
let audiolist = document.querySelectorAll(".audiolist");
for( let i = 0; i < audiolist.length; i++){ 
    audiolist[i].style.color = "black";
    // audiolist[i].style.background = "white";
}
}

//================== Set Progress ====================
function setProgressBar(e) {
  const width = playerProgressEl.clientWidth;
  const xValue = e.offsetX;
  music.currentTime = (xValue / width) * music.duration;
}
//================== Set Progress ====================
function updateProgressBar() {
  const { duration, currentTime } = music;
  const ProgressPercent = (currentTime / duration) * 100;
  progressEl.style.width = `${ProgressPercent}%`;
  const formattime = (timeRanges) =>
    String(Math.floor(timeRanges)).padStart(2, "0");
  durationEl.textContent = `${formattime(duration / 60)} : ${formattime(
    duration % 60,
  )}`;
  currentTimeEl.textContent = `${formattime(currentTime / 60)} : ${formattime(
    currentTime % 60,
  )}`;
}
//================= Btn Events========================
const btnEvents = () => {
  playvBtnEl.addEventListener("click", togglePlay);
  nextvBtnEl.addEventListener("click", () => changeMusic(1));
  prevBtnEl.addEventListener("click", () => changeMusic(-1));
  //========= Progressbar===========================
  music.addEventListener("ended", () => changeMusic(1));
  music.addEventListener("timeupdate", updateProgressBar);
  playerProgressEl.addEventListener("click", setProgressBar);
};
//================= Btn Events========================
document.addEventListener("DOMContentLoaded", btnEvents);
//============ Calling Load Music
loadMusic(songs[musicIndex]);

