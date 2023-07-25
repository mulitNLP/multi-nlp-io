import { updateInputKeyBoardDown, updateInputKeyBoardUp } from './networking';
import { enterKeyBoard } from './input/nlp';
<<<<<<< HEAD
import { getCurrentState } from './state';
import { getnearbyothers, getnearmeteors } from './render';
import { enterSpacebar } from './mic';
const Constants = require('../shared/constants');
const canvas = document.getElementById('game-canvas');
=======
import { getnearbyothers , getnearmeteors } from './render';
>>>>>>> 894ee68 (325123461234641264136413)

const enterInputBar = document.getElementById('inputbar');

function onkeyDown(e) {

  // If the Enter key is pressed and the input bar is not focused, focus the input bar
  if (e.keyCode === 13 && document.activeElement !== enterInputBar) {
    enterInputBar.focus();
  } 
  // If the Enter key is pressed and the input bar is focused, trigger enterKeyBoard and blur the input bar
  else if (e.keyCode === 13 && document.activeElement === enterInputBar) {
    enterKeyBoard();
    enterInputBar.blur();
  }
  // Otherwise, if some other key is pressed and the input bar is not focused, move the character
  else if (document.activeElement !== enterInputBar && (e.keyCode === 87 || e.keyCode === 83 || e.keyCode === 68 || e.keyCode === 65)) {
    updateInputKeyBoardDown(e.keyCode);
  }
  if (e.keyCode === 32) {
    enterSpacebar();
  }

<<<<<<< HEAD
  if (e.keyCode === 222) {
    //  엔터키 옆 '           
    playertargeting();
  }

  if (e.keyCode === 186) {
    // 엔터키 옆옆 ; 
=======
  if (e.keyCode === 222){
    // 엔터키 옆 ' >> 플레이어 지정           
    playertargeting();
  }
  if(e.keyCode === 186){
    // 엔터키 옆옆 ; >> 메테오 지정
>>>>>>> 894ee68 (325123461234641264136413)
    meteortargeting();
  }
  if (e.keyCode === 191) {
    // 우측 쉬프트키 왼쪽 / >> 지정 해제
    lnittargetId();
  } 

}

function onkeyUp(e) {
  if (e.keyCode === 87 || e.keyCode === 83 || e.keyCode === 68 || e.keyCode === 65) {
    updateInputKeyBoardUp(e.keyCode);
  }
}

<<<<<<< HEAD
// function onTouchInput(e) {
//   const touch = e.touches[0];
//   handleInput(touch.clientX, touch.clientY);
// }
=======
function onkeySpeak(e) {
  let isRecording = false
  if (e.keyCode === 32 && isRecording === false) {
    isRecording = true
    //speech recording start
  } else {
    //speech recording end
  }
  isRecording = false
}

/* ------------------------------------------------------------ */
>>>>>>> 894ee68 (325123461234641264136413)

export function startCapturingInput() {
  window.addEventListener('keydown', onkeyDown);
  window.addEventListener('keyup', onkeyUp);
}

export function stopCapturingInput() {
  window.removeEventListener('keydown', onkeyDown);
  window.removeEventListener('keyup', onkeyUp);
}

/* ------------------------------------------------------------ */

// 락온 함수모음

export let targetId = -1;

export function lnittargetId() {
  targetId = -1;
}

function playertargeting() {
  let saveid = (targetId >> 24) & 0x7f;
  if (targetId !== -1 && saveid !== 1) {
    targetId = -1;
  }
  targetlogic(getnearbyothers());
}

function meteortargeting() {
  let saveid = (targetId >> 24) & 0x7f;
  if (targetId !== -1 && saveid !== 2) {
    targetId = -1;
  }
  targetlogic(getnearmeteors());
}

function targetlogic(others) {
  if (others.length > 0) {
    if (targetId === -1) {
      targetId = others[0].id;
      return;
    } else {
      for (let i = 0; i < others.length; i++) {
        if (targetId === others[i].id) {
          if (i === others.length - 1) {
            targetId = others[0].id;
            return;
          }
          targetId = others[i + 1].id;
          return;
        }
      }
    }
  }
  targetId = -1
}