const micstatus = document.getElementById('micstatus');

function renderMicstatus(readySignal, isRecognizing) {

    
    // 락온이 안된 상태
    if (readySignal === true) {

        // 녹음 완료!
        micstatus.innerText = "녹음 완료!";
        micstatus.style.backgroundColor = "green";
        console.log("hii");

        // Clear the message after 3 seconds
        setTimeout(() => {
        micstatus.innerText = "";
        micstatus.style.backgroundColor = "";
        }, 2000);

    } else if (readySignal === false) {

        if (isRecognizing === true) {

            // 활성화 대기중!
            micstatus.innerText = "활성화 대기중!";
            micstatus.style.backgroundColor = "gray";
            console.log("hii");

        } else if (isRecognizing === false) {

            // 녹음중!!
            micstatus.innerText = "녹음중!";
            micstatus.style.backgroundColor = "red";
            console.log("hii");
        
        }
        
    }

}

export default renderMicstatus;