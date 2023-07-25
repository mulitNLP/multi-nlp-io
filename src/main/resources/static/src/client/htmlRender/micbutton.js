import { analysisResult } from '../networking';
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

/* ----------------------------------------------------------- */

{/* <div id="checkbox"> hi </div>

#checkbox {

    position: fixed;
    bottom: 20%;
    left: 0;
    right: 0;
    width: 300px;
    margin: auto;
    background-color: gray;
    padding: 10px;
    border-radius: 5px;
    color: white;
  
} */}