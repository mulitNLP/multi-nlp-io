const checkbox = document.getElementById('checkbox');

function renderNlpCheckbox(content) {

    if (content = "") {

        checkbox.innerText = "빈칸입니다! 다시 입력해 주세요!";
        checkbox.style.backgroundColor = "red";
        console.log("hi");

    // 부정 입력
    } else {
        checkbox.innerText = content + " 는 이미 입력한 단어 입니다!";
        checkbox.style.backgroundColor = "red";
        console.log("hi");
    }

    // Clear the message after 3 seconds
    setTimeout(() => {
        checkbox.innerText = "";
        checkbox.style.backgroundColor = "";
    }, 3000);
    
}

export default renderNlpCheckbox;