import { analysisResult } from '../networking';

const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');
const checkbox = document.getElementById('checkbox');

function renderCheckbox() {

    const result = analysisResult.result;
    const percent = analysisResult.percentage;

    // 긍정 입력
    if (result === true) {
        checkbox.innerText = "긍정!";
        checkbox.style.backgroundColor = "green";
        console.log("hi");

    // 부정 입력
    } else if (result === false) {
        checkbox.innerText = "부정!";
        checkbox.style.backgroundColor = "red";
        console.log("hi");

    // 입력 실패
    } else if (result === null) {
        checkbox.innerText = "입력 실패!";
        checkbox.style.backgroundColor = "gray";
        console.log("hi");
    }

    // Clear the message after 3 seconds
    setTimeout(() => {
        checkbox.innerText = "";
        checkbox.style.backgroundColor = "";
    }, 3000);

}

export default renderCheckbox;

/* ----------------------------------------------------------- */

{/* <div id="checkbox"></div>

#checkbox {

    position: fixed;
    bottom: 20%;
    left: 0;
    right: 0;
    width: 300px;
    margin: auto;
    background-color: gray;
    padding: 10px;
    border-radius: 5px;
    color: white;
  
} */}