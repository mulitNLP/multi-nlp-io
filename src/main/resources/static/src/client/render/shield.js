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
  
  }
  
  export default renderShields;