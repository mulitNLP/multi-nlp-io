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
/*   let targetsize = 16 */
  const { rx , ry } = maptrick(me, lockedEntity);  
/*   let saveid = (lockedEntity.id >> 24) & 0x7f; */
 /*  if (saveid === 1) {//플레이어
    targetsize = 10
  }
  if (saveid === 2) {//운석
    targetsize = 16
  } */
    const canvasX = canvas.width / 2 + rx - me.x;
    const canvasY = canvas.height / 2 + ry - me.y;

  const targetImage = getAsset('target.png');
  context.drawImage(
    targetImage,
    canvasX - targetImage.width / 16,   // Adjust the center of the image
    canvasY - targetImage.height / 16,  // Adjust the center of the image
    targetImage.width / 8,
    targetImage.height / 8
  );
}

export default renderTarget;