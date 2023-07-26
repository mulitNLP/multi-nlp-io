import { performSentimentAnalysis, performSentimentAnalysisMeteor, performSentimentAnalysisPlayer } from '../networking';
import { throttle } from 'throttle-debounce';
import { targetId } from '../input';
import { playerId } from '../input';
import renderNlpCheckbox from '../htmlRender/nlpCheckbox';
import { getCurrentState } from '../state';
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

export const enterKeyBoard = throttle(10, () => {
  if (document.activeElement === enterInputBar) {
    const inputOrigin = enterInputBar.value.trim();
    performNlp(inputOrigin)
    enterInputBar.value = "";
    enterInputBar.blur();
  } else {
    enterInputBar.focus();
  }
});

let wordSet = new Set();

export const resetWordSet = () => {
  wordSet.clear();
}


export const performNlp = (content) => {
  const targetid_sub = targetId;

  if ((targetid_sub >> 24 & 0x7F) == 2) {
    if (content === "") {
      console.log("입력 실패, 메세지를 입력해 주세요!");
      renderNlpCheckbox(content);
    } else {
      console.log(content);
      if (wordSet.has(content)) {
        console.log("이미 한번 입력한 단어입니다. 다시 입력하시오");
        renderNlpCheckbox(content);
        return;
      }
      wordSet.add(content);
      const meteor_word = getMeteorById(targetId)
      console.log(meteor_word.word)
      performSentimentAnalysisMeteor(meteor_word.word, targetid_sub, content);
    }
  } else {
    if (content === "") {
      console.log("입력 실패, 메세지를 입력해 주세요!");
      renderNlpCheckbox(content);
    } else {
      console.log(content);
      if (wordSet.has(content)) {
        console.log("이미 한번 입력한 단어입니다. 다시 입력하시오");
        renderNlpCheckbox(content);
        return;
      }
      wordSet.add(content);
      performSentimentAnalysisPlayer(playerId, targetid_sub, content);
    }
  }
}
function getMeteorById(meteorId) {
  const { meteors } = getCurrentState();

  // Array.find() 메서드를 사용하여 주어진 id와 일치하는 메테오 객체를 반환
  const foundMeteor = meteors.find(meteor => meteor.id === meteorId);

  if (foundMeteor) {
    return foundMeteor;
  } else {
    console.log(`ID ${meteorId}를 가진 메테오가 없습니다.`);
    return null;
  }
}