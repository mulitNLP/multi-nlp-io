import { getAsset } from '../assets';
const canvas = document.getElementById('game-canvas');
const micbutton = document.getElementById('micbutton');

const context = canvas.getContext('2d');
const changeImage = document.createElement('img');


function renderMicstatus(onoff) {

    // 긍정 입력
    let targetType = ((targetID >> 24) & 0x7F);
    
    // 락온이 안된 상태
    if (targetID === -1) {

        if (result === true) {

            checkbox.innerText = contexts + " => 긍정! 방어막 생성!";
            checkbox.style.backgroundColor = "green";
            console.log("hi");
    
        // 부정 입력
        } else if (result === false) {

            checkbox.innerText = contexts + " => 부정! 락온이 된 상태에서만 미사일 발사가 가능합니다!";
            checkbox.style.backgroundColor = "gray";
            console.log("hi");
        
        }
    
}

export default renderMicstatus;