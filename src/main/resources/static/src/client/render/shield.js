import { getAsset } from '../assets';

const Constants = require('../../shared/constants');

const { PLAYER_RADIUS } = Constants;
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

function renderShields(me,player, i){
    const { x, y ,direction } = player;
    const canvasX = canvas.width / 2 + x - me.x;
    const canvasY = canvas.height / 2 + y - me.y;
    let ssize = 30;
    const shieldImage = getAsset(`shield${i}.png`);
    context.save();
    context.translate(canvasX, canvasY);
    context.rotate(direction);
    context.drawImage(
      shieldImage,
      -PLAYER_RADIUS - (ssize/2),
      -PLAYER_RADIUS - (ssize/2),
      PLAYER_RADIUS * 2 + (ssize),
      PLAYER_RADIUS * 2 + (ssize),
    );
    context.restore();

    if (i !== 0) {

      context.fillStyle = 'white'; // 텍스트 색상 설정
      context.font = '20px Arial'; // 텍스트 폰트 설정
      context.textAlign = 'center'; // 텍스트 정렬 설정
      context.fillText('x' + i, canvasX + PLAYER_RADIUS + 5, canvasY - PLAYER_RADIUS - 10); // 텍스트 그리기

    }
  
  }
  
  export default renderShields;