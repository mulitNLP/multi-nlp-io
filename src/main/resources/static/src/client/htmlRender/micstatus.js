import { getAsset } from '../assets';
const canvas = document.getElementById('game-canvas');
const micbutton = document.getElementById('micbutton');

const context = canvas.getContext('2d');
const changeImage = document.createElement('img');


function renderMicbutton(onoff) {

    changeImage.id = 'micimage';
    if(onoff){
        changeImage.src = getAsset('icon_sound_on.png').src;
    }else{
        changeImage.src = getAsset('icon_sound_off.png').src;
    }


    micbutton.innerHTML = '';
    micbutton.appendChild(changeImage);
    
}

export default renderMicbutton;