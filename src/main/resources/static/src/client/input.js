// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#6-client-input-%EF%B8%8F
import { updateInputKeyBoardDown, updateInputKeyBoardUp } from './networking';
import { enterKeyBoard } from './input/nlp';
import { getCurrentState } from './state';
import { getnearbyothers , getnearmeteors } from './render';
const Constants = require('../shared/constants');
const canvas = document.getElementById('game-canvas');

const { PLAYER_RADIUS, MAP_SIZE } = Constants;

function onkeyDown(e) {
  if (e.keyCode === 87 || e.keyCode === 83 || e.keyCode === 68 || e.keyCode === 65) {
    updateInputKeyBoardDown(e.keyCode);
  }
  if (e.keyCode === 13) {
    enterKeyBoard();
  }

  if (e.keyCode === 222){
    // 엔터키 옆 '
    playertargeting();
  }

  if (e.keyCode === 186){
    // 엔터키 옆옆 ; 
    meteortargeting();
  }

}

function onkeyUp(e) {
  if (e.keyCode === 87 || e.keyCode === 83 || e.keyCode === 68 || e.keyCode === 65) {
    updateInputKeyBoardUp(e.keyCode);
  }
}

// function onTouchInput(e) {
//   const touch = e.touches[0];
//   handleInput(touch.clientX, touch.clientY);
// }

export function startCapturingInput() {
  // window.addEventListener('mousemove', onMouseInput);
  window.addEventListener('click', onMouseInput);
  // window.addEventListener('touchstart', onTouchInput);
  // window.addEventListener('touchmove', onTouchInput);
  window.addEventListener('keydown', onkeyDown);
  window.addEventListener('keyup', onkeyUp);
}

export function stopCapturingInput() {
  // window.removeEventListener('mousemove', onMouseInput);
  window.removeEventListener('click', onMouseInput);
  // window.removeEventListener('touchstart', onTouchInput);
  // window.removeEventListener('touchmove', onTouchInput);
  window.removeEventListener('keydown', onkeyDown);
  window.removeEventListener('keyup', onkeyUp);
}

/* ------------------------------------------------------------ */

export let targetId = -1;

export function lnittargetId(){
  targetId = -1;
}

function playertargeting(){
  let others = getnearbyothers();
  targetlogic(others)
}

function meteortargeting(){
  let others = getnearmeteors();
  targetlogic(others)
}



function targetlogic(others){
  if(others && others.length > 0){
    if(targetId === -1){
      targetId = others[0].id;
      console.log(others[0].id);
      return;
    }else{
      for(let i = 0; i < others.length; i++){
        if(targetId === others[i].id){
          if(i === others.length -1){
            targetId = others[0].id;
            console.log(others[0].id);
            return;
          }
          targetId = others[i+1].id;
          console.log(others[i+1].id);
          return;
        }
      }
    }
  }
  targetId = -1
}

// 여기에 상대 플레이어를 마우스 클릭 하는 기능을 구현하고 싶어
function onMouseInput(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Get the current player's state
  const me = getCurrentState().me;

  // Convert the canvas coordinates to game world coordinates
  const gameX = me.x + (x - canvas.width / 2);
  const gameY = me.y + (y - canvas.height / 2);

  clickPlayer(gameX, gameY);
}



function clickPlayer(x, y) {

  const players = getCurrentState().others;
  const meteors = getCurrentState().meteors;

  // 클릭된 위치가 플레이어의 영역 내에 있는지 확인합니다.
  for (const player of players) {
    const distance = Math.hypot(player.x - (x), player.y - (y));
    // 클릭한 위치가 플레이어의 반경 내에 있다면,
    // 이 플레이어를 락온하고 루프를 종료합니다.
    if (distance < PLAYER_RADIUS) {
      console.log("hi");
      targetId = player.id;
      return;
    }
  }

  for (const meteor of meteors) {
    const distance = Math.hypot(meteor.x - (x), meteor.y - (y));
    // 클릭한 위치가 플레이어의 반경 내에 있다면,
    // 이 플레이어를 락온하고 루프를 종료합니다.
    if (distance < PLAYER_RADIUS) {
      console.log("hi");
      targetId = meteor.id;
      return;
    }
  }

  targetId = -1;

}