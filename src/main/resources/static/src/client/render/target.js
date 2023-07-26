import { getAsset } from '../assets';
import { getCurrentState } from '../state';
import { targetId ,lnittargetId } from '../input';
import maptrick from './maptrick';


const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');
const Constants = require('../../shared/constants');

const { MAP_SIZE } = Constants;

function renderTarget(me,nearplayers,nearmeteors) {
  const lockedEntities = [...nearplayers, ...nearmeteors];
  const lockedEntity = lockedEntities.find(e => e.id === targetId);

  if (!lockedEntity) {
    lnittargetId();
    return;
  }
  
  const { rx , ry } = maptrick(me, lockedEntity);  
  let saveid = (lockedEntity.id >> 24) & 0x7f;
  let targetsize = 0;
  if (saveid === 1) {//플레이어
    targetsize = 22
  }
  if (saveid === 2) {//운석
    targetsize = 16
  }
    const canvasX = canvas.width / 2 + rx - me.x;
    const canvasY = canvas.height / 2 + ry - me.y;

  const targetImage = getAsset('target.png');
  context.drawImage(
    targetImage,
    canvasX - targetImage.width / targetsize,   // Adjust the center of the image
    canvasY - targetImage.height / targetsize,  // Adjust the center of the image
    targetImage.width / (targetsize/2),
    targetImage.height / (targetsize/2),
  );
}

export default renderTarget;