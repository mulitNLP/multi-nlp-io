// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#3-client-entrypoints
import { connect, play, handleChatAttack } from './networking';
import { startRendering, stopRendering } from './render';
import { startCapturingInput, stopCapturingInput } from './input';
import { downloadAssets } from './assets';
import { initState } from './state';
import { setLeaderboardHidden } from './leaderboard';
import { throttle } from 'throttle-debounce';
import { targetId } from './input';
import { playerId } from './input';
// I'm using a tiny subset of Bootstrap here for convenience - there's some wasted CSS,
// but not much. In general, you should be careful using Bootstrap because it makes it
// easy to unnecessarily bloat your site.
import './css/bootstrap-reboot.css';
import './css/main.css';

const playMenu = document.getElementById('play-menu');
const playButton = document.getElementById('play-button');
const usernameInput = document.getElementById('username-input');
const enterInputBar = document.getElementById('inputbar');

Promise.all([
  connect(onGameOver),
  downloadAssets(),
]).then(() => {
  playMenu.classList.remove('hidden');
  usernameInput.focus();
  playButton.onclick = () => {
    // Play!
    play(usernameInput.value);
    playMenu.classList.add('hidden');
    initState();
    startCapturingInput();
    startRendering();
    setLeaderboardHidden(false);
  };
}).catch(console.error);

function onGameOver() {
  stopCapturingInput();
  stopRendering();
  playMenu.classList.remove('hidden');
  setLeaderboardHidden(true);
}


function performSentimentAnalysis(playerID, targetID, inputValue) {
  const url = 'http://localhost:5000/sentiment-analysis'; // Adjust the URL to match your Python server
  const dataString = playerID + '|' + targetID + '|' + inputValue;
  // Send the input value to the Python server using fetch API
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
      'Connection': 'keep-alive'
    },
    body: dataString
  })
    .then(response => response.json())
    .then(data => {
      const result = data.result;
      handleChatAttack(targetId, inputValue, result, 0);
      console.log(result);
      // Update the UI with the sentiment analysis result as needed
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


export const enterKeyBoard = throttle(10, () => {
  if (document.activeElement === enterInputBar) {
    const inputOrigin = enterInputBar.value.trim()
    // } else

    if (targetId > 0) {
      if (inputOrigin === "") {
        console.log("입력 실패, 메세지를 입력해 주세요!");
      } else {
        console.log(enterInputBar.value);
        performSentimentAnalysis(playerId, targetId, enterInputBar.value);
      }
    } else {
      if (inputOrigin === "") {
        console.log("입력 실패, 메세지를 입력해 주세요!");
      } else {
        console.log(enterInputBar.value);
        performSentimentAnalysis(playerId, targetId, enterInputBar.value);
      }
      //handleChatAttack(targetId, enterInputBar.value, true, 0);
    }
    enterInputBar.value = "";
    enterInputBar.blur();
  } else {
    enterInputBar.focus();

  }
});
    // } else {
    //   handleChatAttack(targetId, enterInputBar.value(), true, 0); //본인 아이디를 넘겨줘야함!
    //   enterInputBar.value = "";
    //   enterInputBar.blur();
    // }
  // }
  // }