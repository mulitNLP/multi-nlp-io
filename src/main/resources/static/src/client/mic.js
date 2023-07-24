const $ = (el) => document.querySelector(el);
let recognition;

const store = {
    texts: '',
    isRecognizing: true
};

/* Speech API start */
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!("webkitSpeechRecognition" in window)) {
    alert("지원 안되는 브라우저 입니다. !")
} else {
    recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'ko-KR';
    recognition.continuous = false;
    recognition.maxAlternatives = 16000;

    recognition.onspeechend = function () {
        recognition.stop();
        $('.dictate').classList.remove("on");
        store.isRecognizing = true;
    };

    recognition.onresult = function (e) {
        store.texts = Array.from(e.results)
            .map(results => results[0].transcript).join("");
        enterInputBar.value = store.texts;
        // You can update the inputbar here if needed:
        // $('inputbar').value = store.texts;
    };
}
/* Speech API END */

function enterSpacebar() {
    if (store.isRecognizing) {
        console.log("now recognizing")
        mic_active();
    } else {
        mic_unactive();
        console.log("stopped recording")
    }
}

function mic_unactive() {
    $('.dictate').classList.remove('on')
    if (recognition) {
        recognition.stop();
    }
    store.isRecognizing = true;
}

function mic_active() {
    $('.dictate').classList.add('on')
    if (recognition) {
        recognition.start();
    }
    store.isRecognizing = false;
}

export default enterSpacebar;
