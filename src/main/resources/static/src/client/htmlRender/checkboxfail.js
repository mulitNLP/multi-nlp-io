const checkbox = document.getElementById('checkbox');

function renderNlpCheckboxFail() {

    checkbox.innerText = "빈칸입니다! \n 다시 입력해 주세요!";
    checkbox.style.backgroundColor = "red";
    console.log("hi");

    // Clear the message after 3 seconds
    setTimeout(() => {
        checkbox.innerText = "";
        checkbox.style.backgroundColor = "";
    }, 5000);
    
}

export default renderNlpCheckboxFail;