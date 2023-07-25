// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#5-client-rendering
import { debounce } from 'throttle-debounce';
import { getCurrentState } from './state';

import renderBackground from './render/background';
import renderPlayer from './render/player';
import renderLine from './render/line';
import renderMeteor from './render/meteor';
import renderoutMeteor from './render/outmeteor';
import renderTarget from './render/target';
import renderBullet from './render/bullet';
import renderCheckbox from './render/checkbox';

const Constants = require('../shared/constants');

const { MAP_SIZE } = Constants;

// Get the canvas graphics context
const canvas = document.getElementById('game-canvas');
setCanvasDimensions();

// 캔버스의 크기를 설정하는 함수
function setCanvasDimensions() {
  // 작은 화면 (예: 핸드폰)에서는 "확대/축소"를 해서 플레이어가 최소한
  // 800개의 게임 유닛 너비를 볼 수 있게 한다.
  // const scaleRatio = Math.max(1, 800 / window.innerWidth);
  // canvas.width = scaleRatio * window.innerWidth;
  // canvas.height = scaleRatio * window.innerHeight;

  canvas.width = 1200;
  canvas.height = 900;
}

// 화면 크기가 변경될 때 캔버스 크기를 업데이트
window.addEventListener('resize', debounce(40, setCanvasDimensions));

let animationFrameRequestId;
let nearplayers = [];
let nearmeteors = [];
let nearbullets = [];
// 게임의 현재 상태를 그리는 함수
function render() {
  const { me, others, bullets, meteors } = getCurrentState();
  if (me) {
    nearbullets = Object.values(bullets).filter(p => distanceTo(me,p) <= Constants.MAP_SIZE /2);
    nearplayers = Object.values(others).filter(p => distanceTo(me,p) <= 600)
                        .sort((p1,p2) => distanceTo(me, p1) - distanceTo(me, p2));
    nearmeteors = Object.values(meteors).filter(p => distanceTo(me,p) <= 600)
                        .sort((p1,p2) => distanceTo(me, p1) - distanceTo(me, p2));
    
    // 배경 그리기
    renderBackground(me.x, me.y);

    // 경계선 그리기
    renderLine(me);

    renderTarget(me,nearplayers,nearmeteors);
    // 모든 총알 그리기
    nearbullets.forEach(renderBullet.bind(null, me));
    meteors.forEach(renderMeteor.bind(null, me));
    meteors.forEach(renderoutMeteor.bind(null,me));
    // 모든 플레이어 그리기
    renderPlayer(me, me);
    nearplayers.forEach(renderPlayer.bind(null, me));

    renderCheckbox();

  }
 
  // 다음 프레임에서 이 render 함수를 다시 실행
  animationFrameRequestId = requestAnimationFrame(render);
}

// 나와 상대방의 거리
function distanceTo(me,other){
    let dx = other.x - me.x;
    let dy = other.y - me.y;
    return Math.sqrt(dx * dx + dy * dy);
}




// 메인 메뉴를 그리는 함수
function renderMainMenu() {
  const t = Date.now() / 7500;
  // const x = MAP_SIZE / 2 + 800 * Math.cos(t);
  // const y = MAP_SIZE / 2 + 800 * Math.sin(t);
  const x = MAP_SIZE / 2;
  const y = MAP_SIZE / 2;
  renderBackground(x, y);

  // 다음 프레임에서 이 render 함수를 다시 실행
  animationFrameRequestId = requestAnimationFrame(renderMainMenu);
}

// 초기 애니메이션 프레임 요청
animationFrameRequestId = requestAnimationFrame(renderMainMenu);

// 메인 메뉴 렌더링을 게임 렌더링으로 교체하는 함수
export function startRendering() {
  cancelAnimationFrame(animationFrameRequestId);
  animationFrameRequestId = requestAnimationFrame(render);
}

// 게임 렌더링을 메인 메뉴 렌더링으로 교체하는 함수
export function stopRendering() {
  cancelAnimationFrame(animationFrameRequestId);
  animationFrameRequestId = requestAnimationFrame(renderMainMenu);
}

export function getnearbyothers(){
  //nearplayers.sort((p1,p2) => distanceTo(me, p1) - distanceTo(me, p2));
  return nearplayers;
}

export function getnearmeteors(){
  //nearmeteors.sort((p1,p2) => distanceTo(me, p1) - distanceTo(me, p2));
  return nearmeteors;
}
