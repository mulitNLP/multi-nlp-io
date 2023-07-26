import * as PIXI from 'pixi.js';
import { throttle } from 'throttle-debounce';

let cameraX = 0;
let cameraY = 0;

export function pixitest(){

    const app = new PIXI.Application({ resizeTo: window });

    document.body.appendChild(app.view);

    // Get the texture for star.
    const starTexture = PIXI.Texture.from('https://pixijs.com/assets/star.png');

    const starAmount = 1000;
    let cameraZ = 0;
    const fov = 20;
    const baseSpeed = 0.05;
    let speed = 0;
    let warpSpeed = 0;
    const starStretch = 5;
    const starBaseSize = 0.05;

    // Create the stars
    const stars = [];

    for (let i = 0; i < starAmount; i++)
    {
        const star = {
            sprite: new PIXI.Sprite(starTexture),
            z: 0,
            x: 0,
            y: 0,
        };

        star.sprite.anchor.x = 0.5;
        star.sprite.anchor.y = 0.7;
        randomizeStar(star, true);
        app.stage.addChild(star.sprite);
        stars.push(star);
    }

    function randomizeStar(star, initial)
    {
        star.z = initial ? Math.random() * 2000 : cameraZ + Math.random() * 1000 + 2000;
        const deg = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50 + 1;
        star.x = Math.cos(deg) * distance;
        star.y = Math.sin(deg) * distance;
    }

    // 선형 보간 함수 (lerp) 추가
    function lerp(start, end, speed) {
        return start + (end - start) * speed;
    }

    app.ticker.add((delta) =>
    {
        
        speed += (warpSpeed - speed) / 20;
        cameraZ += delta * 10 * (speed + baseSpeed);
        cameraX = lerp( cameraX , targetCameraX , cameraMoveSpeed);
        cameraY = lerp( cameraY , targetCameraY , cameraMoveSpeed); 
        
        for (let i = 0; i < starAmount; i++)
        {
            const star = stars[i];

            if (star.z < cameraZ) randomizeStar(star);

            const z = star.z - cameraZ;

            star.sprite.x = (star.x + cameraX) * (fov / z) * app.renderer.screen.width + app.renderer.screen.width / 2;
            star.sprite.y = (star.y + cameraY) * (fov / z) * app.renderer.screen.width + app.renderer.screen.height / 2;

            const dxCenter = star.sprite.x - app.renderer.screen.width / 2;
            const dyCenter = star.sprite.y - app.renderer.screen.height / 2;
            const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
            const distanceScale = Math.max(0, (2000 - z) / 2000);

            star.sprite.scale.x = distanceScale * starBaseSize;
            star.sprite.scale.y = distanceScale * starBaseSize
                + distanceScale * speed * starStretch * distanceCenter / app.renderer.screen.width;
            star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
        }
    });
}

let targetCameraX = 0;
let targetCameraY = 0;
const cameraMoveSpeed = 0.001; // 카메라의 이동 속도를 조정
const cameraMoveing = 7;
export const backgroundInputKeyBoardDown = throttle(20, (key) => {
    if (key === 87) {//W
        targetCameraY = cameraMoveing;
    } else if (key === 83) {//S
        targetCameraY = -cameraMoveing;
    } else if (key === 68) {//A
        targetCameraX = -cameraMoveing;
    } else if (key === 65) {//D
        targetCameraX = cameraMoveing;
    }
  
  });

  export const backgroundInputKeyBoardUp = (key) => {
    if (key === 87) {//W
        targetCameraY = 0;
    } else if (key === 83) {//S
        targetCameraY = 0;
    } else if (key === 68) {//A
        targetCameraX = 0;
    } else if (key === 65) {//D
        targetCameraX = 0;
    }
  };

export default pixitest;