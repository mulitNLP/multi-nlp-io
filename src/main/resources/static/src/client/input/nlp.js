import { performSentimentAnalysis } from '../networking';
import { throttle } from 'throttle-debounce';
import { targetId } from '../input';
import { playerId } from '../input';
import renderCheckbox from '../htmlRender/checkbox';

const enterInputBar = document.getElementById('inputbar');

// function performSentimentAnalysis(playerID, targetID, inputValue) {
//   const url = 'http://localhost:5050/sentiment-analysis'; // Adjust the URL to match your Python server
//   const dataString = playerID + '|' + targetID + '|' + inputValue;
//   // Send the input value to the Python server using fetch API
//   fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'text/plain',
//       'Connection': 'keep-alive'
//     },
//     body: dataString
//   })
//     .then(response => response.json())
//     .then(data => {
//       const result = data.result;
//       handleChatAttack(targetId, inputValue, result, data.percentage);
//       console.log(result);
//       // Update the UI with the sentiment analysis result as needed
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// }

let wordSet = new Set();

export const enterKeyBoard = throttle(10, () => {
  if (document.activeElement === enterInputBar) {
    const inputOrigin = enterInputBar.value.trim()
    // } else
    const targetid_sub = targetId;

    if (targetid_sub > 0) {
      if (inputOrigin === "") {
        console.log("입력 실패, 메세지를 입력해 주세요!");
      } else {
        console.log(inputOrigin);
        if (wordSet.has(inputOrigin)) {
          console.log("이미 한번 친 단어입니다. 다시 입력하시오");
          return;
        }
        wordSet.add(inputOrigin);
        performSentimentAnalysis(playerId, targetid_sub, inputOrigin);
      }
    } else {
      if (inputOrigin === "") {
        console.log("입력 실패, 메세지를 입력해 주세요!");
      } else {
        console.log(inputOrigin);
        if (wordSet.has(inputOrigin)) {
          console.log("이미 한번 친 단어입니다. 다시 입력하시오");
          return;
        }
        wordSet.add(inputOrigin);
        performSentimentAnalysis(playerId, targetid_sub, inputOrigin);
      }
    }
    enterInputBar.value = "";
    enterInputBar.blur();
  } else {
    enterInputBar.focus();

  }
});