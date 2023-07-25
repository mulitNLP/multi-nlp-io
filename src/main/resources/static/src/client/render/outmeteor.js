import { getAsset } from '../assets';
const Constants = require('../../shared/constants');
const { PLAYER_RADIUS ,MAP_SIZE} = Constants;

// Get the canvas graphics context
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

// 주어진 좌표에서 운석을 그리는 함수
function renderoutMeteor(me, meteor) {
    const { x, y, direction,word , invisible } = meteor;
    let realx = x;
    let realy = y;
    // 맵 밖에 미리 운석을 구현해서 맵이 연결된것 처럼 보이게 만듬
    if(me.x >= MAP_SIZE/2 && me.y >= MAP_SIZE/2){
        if(x >= MAP_SIZE/2 && y >= MAP_SIZE/2){
            //같은 박스 안에 있음
            return;
        }else if(x >= MAP_SIZE/2 && y < MAP_SIZE/2){
            realy = MAP_SIZE + y;
        }else if(x < MAP_SIZE/2 && y >= MAP_SIZE/2){
            realx = MAP_SIZE + x;
        }else{
            realx = MAP_SIZE + x;
            realy = MAP_SIZE + y;
        }
    }else if(me.x < MAP_SIZE/2 && me.y >= MAP_SIZE/2){
        if(x >= MAP_SIZE/2 && y >= MAP_SIZE/2){
            realx = x - MAP_SIZE;
        }else if(x >= MAP_SIZE/2 && y < MAP_SIZE/2){
            realx = x - MAP_SIZE;
            realy = MAP_SIZE + y;
        }else if(x < MAP_SIZE/2 && y >= MAP_SIZE/2){
            //같은 박스 안에 있음
            return;
        }else{
            realy = MAP_SIZE + y;
        }
    }else if (me.x >= MAP_SIZE/2 && me.y < MAP_SIZE/2){
        if(x >= MAP_SIZE/2 && y >= MAP_SIZE/2){
            realy = y - MAP_SIZE;
        }else if(x >= MAP_SIZE/2 && y < MAP_SIZE/2){
            //같은 박스 안에 있음
            return;
        }else if(x < MAP_SIZE/2 && y >= MAP_SIZE/2){
            realx = MAP_SIZE + x;
            realy = y - MAP_SIZE;
        }else{
            realx = MAP_SIZE + x;
        }
    }else{
        if(x >= MAP_SIZE/2 && y >= MAP_SIZE/2){
            realx = x - MAP_SIZE;
            realy = y - MAP_SIZE;
        }else if(x >= MAP_SIZE/2 && y < MAP_SIZE/2){
            realx = x - MAP_SIZE;
        }else if(x < MAP_SIZE/2 && y >= MAP_SIZE/2){
            realy = y - MAP_SIZE;            
        }else{
            //같은 박스 안에 있음
            return;
        }
    }
    const canvasX = canvas.width / 2 + realx - me.x;
    const canvasY = canvas.height / 2 + realy - me.y;
    /* console.log(`X : ${canvasX}`);
    console.log(`Y : ${canvasY}`); */
    // 운석 그리기
    context.save();
    context.translate(canvasX, canvasY);
    context.rotate(direction);
    context.drawImage(
        getAsset('meteor.png'),
        -PLAYER_RADIUS,
        -PLAYER_RADIUS,
        PLAYER_RADIUS * 2,
        PLAYER_RADIUS * 2,
    );
    context.restore();

/*  context.fillStyle = 'white'; // 텍스트 색상 설정
    context.font = '20px Arial'; // 텍스트 폰트 설정
    context.textAlign = 'center'; // 텍스트 정렬 설정
    context.fillText(word, canvasX, canvasY + PLAYER_RADIUS + 20); // 텍스트 그리기 */
}

export default renderoutMeteor;