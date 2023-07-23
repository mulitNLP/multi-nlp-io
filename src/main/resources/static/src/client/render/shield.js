import { getAsset } from '../assets';

const Constants = require('../../shared/constants');

const { PLAYER_RADIUS } = Constants;
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

function renderShields(me,player, i){
    const { x, y ,direction } = player;
    const canvasX = canvas.width / 2 + x - me.x;
    const canvasY = canvas.height / 2 + y - me.y;
    let ssize = 40;
    context.save();
    context.translate(canvasX, canvasY);
    context.rotate(direction);
    context.drawImage(
      getAsset('shield.png'),
      -PLAYER_RADIUS - (ssize/2*i),
      -PLAYER_RADIUS - (ssize/2*i),
      PLAYER_RADIUS * 2 + (ssize*i),
      PLAYER_RADIUS * 2 + (ssize*i),
    );
    context.restore();
  
  }

  export default renderShields;