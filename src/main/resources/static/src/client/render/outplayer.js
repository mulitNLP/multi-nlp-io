import { getAsset } from '../assets';
import renderShields from './shield';
import maptrick from './maptrick';
const Constants = require('../../shared/constants');

const { PLAYER_RADIUS ,MAP_SIZE} = Constants;

// Get the canvas graphics context
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

// 주어진 좌표에서 배를 그리는 함수
function renderoutPlayer(me, player) {
    
    const { x, y, direction,username,shields } = player;
    const { rx , ry } = maptrick(me, player);  

    const canvasX = canvas.width / 2 + rx - me.x;
    const canvasY = canvas.height / 2 + ry - me.y;

    // 배 그리기
    context.save();
    context.translate(canvasX, canvasY);
    context.rotate(direction);
    context.drawImage(
        getAsset('ship.svg'),
        -PLAYER_RADIUS,
        -PLAYER_RADIUS,
        PLAYER_RADIUS * 2,
        PLAYER_RADIUS * 2,
    );
    context.restore();

    if(shields > 0 ){
        let shield = shields > 3 ? 3 : shields;
        renderShields(me,player,shield);
    }

    context.fillStyle = 'white'; // 텍스트 색상 설정
    context.font = '20px Arial'; // 텍스트 폰트 설정
    context.textAlign = 'center'; // 텍스트 정렬 설정
    context.fillText(username, canvasX, canvasY + PLAYER_RADIUS + 20); // 텍스트 그리기

}

export default renderoutPlayer;