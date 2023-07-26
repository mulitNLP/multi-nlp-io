import { performNlp } from "./input/nlp";
import renderMicbutton from './htmlRender/micbutton';
import renderMicstatus from './htmlRender/micstatus';

const $ = (el) => document.querySelector(el);
let recognition;

const store = {
    texts: '',
    isRecognizing: true,
    readySignal: true,
};

export const resetStore = () => {
    store.texts = '';
    store.isRecognizing = true;
    store.readySignal = true;
}

/* Speech API start */
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!("webkitSpeechRecognition" in window)) {
    alert("지원 안되는 브라우저 입니다. !")
} else {
    recognition = new SpeechRecognition();
    recognition.interimResults = false;
    recognition.lang = 'ko-KR';
    recognition.continuous = false;
    recognition.maxAlternatives = 20000;

    recognition.onspeechend = function () {
        recognition.stop();
        store.isRecognizing = true;
    };

    recognition.onresult = function (e) {
        store.texts = Array.from(e.results)
            .map(results => results[0].transcript).join("");

        // enterInputBar.value = store.texts;
        console.log(`store.text? ${store.texts}`);
        performNlp(store.texts);
    };

    recognition.onerror = function (e) {
        console.log(`Error: ${e}`);
    };

}
/* Speech API END */
let exitTime = Date.now();
export const enterSpacebar = () => {
    console.log('enter spacebar');
    if (store.readySignal) {
        mic_active();
    } else if (!store.readySignal && !(Date.now() > exitTime) && store.isRecognizing) {
        console.log("아직은 종료하실 수 없습니다.");
        console.log(`${Date.now()} 와 ${exitTime}`);
    } else {
        mic_unactive();
        console.log("stopped recording");
    }
}

function mic_active() {
    store.readySignal = false;
    exitTime = Date.now() + 1000;
    recognition.start();
    setTimeout(signalCompleteReady, 1000);
    renderMicstatus(store.readySignal, store.isRecognizing);
}

function mic_unactive() {
    recognition.stop();
    store.isRecognizing = true;
    store.readySignal = true;
    renderMicbutton(false);
    renderMicstatus(store.readySignal, store.isRecognizing);
}

function signalCompleteReady() {
    store.isRecognizing = false;
    renderMicbutton(true);
    renderMicstatus(store.readySignal, store.isRecognizing);
    console.log('이제 끝낼 수 있습니다.');
}

