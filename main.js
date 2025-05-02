'use strict';
//各要素
const audio = document.getElementById('audio');
const songImage = document.getElementById('songImage');
const songTitle = document.querySelector('h1');
const li = document.querySelectorAll('#playlist li');
//buttons
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
//menu
const sound = document.getElementById('sound');
const mute = document.getElementById('mute');
const reset = document.getElementById('reset');
const volume = document.getElementById('volume');
let currentIndex = 0;

const songs = [
  { title: "- NewJeans -", file: "mp3/audio.newjeans.mp3", img: "img/newjeansIcon.PNG" },
  { title: "- Lucky Girl Syndrome -", file: "mp3/audio.lucky girl syndrome.mp3", img: "img/illitIcon.PNG" },
  { title: "- Blue Heart -", file: "mp3/audio.blue heart.mp3", img: "img/iveIcon.PNG" },
  { title: "- GPT -", file: "mp3/audio.gpt.mp3", img: "img/staycIcon.PNG" },
  { title: "- Dolphin -", file: "mp3/audio.dolphin.mp3", img: "img/ohmygirlIcon.PNG" },
]

//再生されている音楽の更新
function updateSong() {
  const currentSong = songs[currentIndex];  //初めは0番目のsong
  songTitle.textContent = currentSong.title;
  audio.src = currentSong.file;
  songImage.src = currentSong.img;
}
updateSong();


//PLAYLISTの設定
function playlistSetting() {
  for (let i = 0; i < songs.length; i++) {
    li[i].classList.remove('highlightgreen');
  }
  li[currentIndex].classList.add('highlightgreen');
}
playlistSetting();


//MENUの設定
sound.addEventListener('click', () => {
  sound.classList.add('highlightblue');
  volume.classList.remove('hidden');
});

// volume.value = audio.volume;
volume.addEventListener('input', (e) => {
  audio.volume = e.currentTarget.value;
});

mute.addEventListener('click', () => {
  mute.classList.add('highlightblue');
  if (audio.muted === false) {
    mute.textContent = "MUTE OFF";
    audio.muted = true;
    volume.value = 0;
  } else {
    mute.textContent = "MUTE ON";
    audio.muted = false;
    volume.value = audio.valume;
  }
});

reset.addEventListener('click', () => {
  if (!confirm('Are you sure ?')) {
    return;
  }
  resetMenu();
})

function resetMenu() {
  sound.classList.remove('highlightblue');
  mute.classList.remove('highlightblue');
  mute.textContent = "MUTE ON";
  volume.classList.add('hidden');
  audio.muted = false;
}


//関数の整理
function allSetting() {
  updateSong();
  playlistSetting();
  audio.play();
}


//ボタンを押した時の動作
prev.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    allSetting();
  } else {
    return;
  }
});

next.addEventListener('click', () => {
  if (currentIndex < songs.length - 1) {
    currentIndex++;
    allSetting();
  } else {
    return;
  }
});

// -----------------------------------------------------------

//コントロール操作
//音楽の再生 
play.addEventListener('click', () => {
  audio.play();
  play.classList.toggle('hidden');
  stop.classList.toggle('hidden');
  stop.classList.toggle('appear');
});

//音楽の停止
stop.addEventListener('click', () => {
  audio.pause();
  stop.classList.toggle('hidden');
  play.classList.toggle('hidden');
  play.classList.toggle('appear');
});

//再生データの動き-------------------------------

const restTime = document.getElementById('restTime');
let duration = audio.duration;
//durationは総時間,currentTimeは経過時間
const bar = document.getElementById('bar');

console.log(audio.duration);   //NaN 取得できず lodeddataと使用

audio.addEventListener('loadeddata', () => {  //初期値の設定
  duration = audio.duration;
  restTime.textContent =
    `${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`;

  bar.setAttribute('max', Math.floor(duration));  //max属性の設定
  //maxは秒単位でするべき
  console.log(bar.max);
});

function printRestTime() {   //残り時間の更新
  const nowTime = audio.currentTime;
  // 残り時間 = duration(初期値) - nowTime(経過時間)
  const minutes = Math.floor((duration - nowTime) / 60);
  const seconds = Math.floor((duration - nowTime) % 60);
  restTime.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  bar.value = nowTime; //bar valueが変わり続ける
}
audio.addEventListener('timeupdate', printRestTime, false);
//audioの再生時間の更新のたびtimeupdateが発生

bar.addEventListener('input', (e) => {
  audio.currentTime = e.currentTarget.value;  //var valueの定義
});


// 音楽が終わった時の動作-----------------------------
audio.addEventListener('ended', () => {
  console.log("Finished!");
  if (currentIndex === songs.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  allSetting();
});




















