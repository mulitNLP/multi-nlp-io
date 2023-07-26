// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#3-client-entrypoints
import { connect, play, handleChatAttack } from './networking';
import { startRendering, stopRendering } from './render';
import { startCapturingInput, stopCapturingInput } from './input';
import { downloadAssets } from './assets';
import { initState } from './state';
import { setLeaderboardHidden } from './leaderboard';
import { resetStore } from './mic'
import deadResons from './htmlRender/deadresons';
import renderMicbutton from './htmlRender/micbutton';
import { resetWordSet } from './input/nlp';
// I'm using a tiny subset of Bootstrap here for convenience - there's some wasted CSS,
// but not much. In general, you should be careful using Bootstrap because it makes it
// easy to unnecessarily bloat your site.
import './css/bootstrap-reboot.css';
import './css/main.css';
import pixitest from './pixi/pixitest';
const playMenu = document.getElementById('play-menu');
const playButton = document.getElementById('play-button');
const usernameInput = document.getElementById('username-input');

const gameoverMenu = document.getElementById('game-over');
const replayButton = document.getElementById('replay-button');
const usernamereInput = document.getElementById('username-reinput');
let flag = true;

Promise.all([
  connect(onGameOver),
  downloadAssets(),
  pixitest(),
]).then(() => {
  window.addEventListener('keydown' ,handleEnterKey);
  playMenu.classList.remove('hidden');
  usernameInput.focus();
  playButton.onclick = () => {
    window.removeEventListener('keydown' ,handleEnterKey);
    // Play!
    play(usernameInput.value);
    playMenu.classList.add('hidden');
    initState();
    startCapturingInput();
    startRendering();
    renderMicbutton(false);
    setLeaderboardHidden(false);
  };
}).catch(console.error);

function onGameOver(obj) {
  window.addEventListener('keydown' ,handleEnterKey);
  stopCapturingInput();
  stopRendering();
  setLeaderboardHidden(true);
  gameoverMenu.classList.remove('hidden');
  deadResons(obj);

  if(flag){
    usernamereInput.value = usernameInput.value;
    flag = false;
  }
  usernamereInput.focus();
  replayButton.onclick = () => {
    window.removeEventListener('keydown' ,handleEnterKey);
    play(usernamereInput.value);
    gameoverMenu.classList.add('hidden');
    initState();
    resetStore();
    resetWordSet();
    startCapturingInput();
    startRendering();
    renderMicbutton(false);
    setLeaderboardHidden(false);
  }
}


// 엔터 키 이벤트를 감지하는 함수
function handleEnterKey(event) {
  // event.keyCode는 Enter 키의 키코드가 13입니다.
  if (event.keyCode === 13) {
    // 엔터 키를 누른 경우, playButton을 클릭한 것과 같은 동작을 수행합니다.
    if(flag){
      playButton.click();
    }else{
      replayButton.click();
    }
  }
}