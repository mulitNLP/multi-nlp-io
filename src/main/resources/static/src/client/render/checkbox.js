import { analysisResult } from '../input/nlp';

const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

function renderCheckbox() {

    const yOffset = 100;  // Adjust this value to change the vertical position of the text
    const result = analysisResult.result;
    const percent = analysisResult.percentage;

    // 긍정 입력
    if (result === true) {
        context.fillStyle = 'white'; // 텍스트 색상 설정
        context.font = '20px Arial'; // 텍스트 폰트 설정
        context.textAlign = 'center'; // 텍스트 정렬 설정
        context.fillText("긍정!", canvas.width / 2, canvas.height / 2 + yOffset); // 텍스트 그리기

    // 부정 입력
    } else if (result === false) {
        context.fillStyle = 'white'; // 텍스트 색상 설정
        context.font = '20px Arial'; // 텍스트 폰트 설정
        context.textAlign = 'center'; // 텍스트 정렬 설정
        context.fillText("부정!", canvas.width / 2, canvas.height / 2 + yOffset); // 텍스트 그리기

    // 입력 실패
    } else if (result === null) {
        context.fillStyle = 'white'; // 텍스트 색상 설정
        context.font = '20px Arial'; // 텍스트 폰트 설정
        context.textAlign = 'center'; // 텍스트 정렬 설정
        context.fillText("입력 실패!", canvas.width / 2, canvas.height / 2 + yOffset); // 텍스트 그리기
    }

    // setTimeout(() => {
    //     context.clearRect(0, 0, canvas.width, canvas.height);
        
    // }, 3000);
}

export default renderCheckbox;
