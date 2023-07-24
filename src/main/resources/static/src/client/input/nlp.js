import { handleChatAttack } from '../networking';
import { throttle } from 'throttle-debounce';
import { targetId } from '../input';
import { playerId } from '../input';

const enterInputBar = document.getElementById('inputbar');

function performSentimentAnalysis(playerID, targetID, inputValue) {
    const url = 'http://localhost:5050/sentiment-analysis'; // Adjust the URL to match your Python server
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
        const result =data.result;
        handleChatAttack(targetId, inputValue, result, data.percentage);
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