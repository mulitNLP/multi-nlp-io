const checkbox = document.getElementById('checkbox');
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

function renderCheckbox(checkValue) {
    
    const { x, y } = player;
    const canvasX = canvas.width / 2 + x - me.x;
    const canvasY = canvas.height / 2 + y - me.y;

    // 배 그리기
    context.save();
    context.translate(canvasX, canvasY);

    // 입력 실패
    if (checkValue === -1) {

        console.log("입력 실패, 메세지를 입력해 주세요!");
        context.fillStyle = 'white'; // 텍스트 색상 설정
        context.font = '20px Arial'; // 텍스트 폰트 설정
        context.textAlign = 'center'; // 텍스트 정렬 설정
        context.fillText("입력실패!", canvasX, canvasY + 100); // 텍스트 그리기

    // 긍정 입력
    } else if (checkValue === 1) {

        console.log("공격");
        context.fillStyle = 'white'; // 텍스트 색상 설정
        context.font = '20px Arial'; // 텍스트 폰트 설정
        context.textAlign = 'center'; // 텍스트 정렬 설정
        context.fillText("긍정!", canvasX, canvasY + 100); // 텍스트 그리기
    
    // 부정 입력
    } else {

        console.log("공격!");
        context.fillStyle = 'white'; // 텍스트 색상 설정
        context.font = '20px Arial'; // 텍스트 폰트 설정
        context.textAlign = 'center'; // 텍스트 정렬 설정
        context.fillText("부정!", x, y + 100); // 텍스트 그리기

    }
    return null;

}

export default renderCheckbox;