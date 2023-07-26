const checkbox = document.getElementById('checkbox');

function renderNlpCheckboxSame(content) {

    checkbox.innerText = content + " : 이미 입력한 단어 입니다!";
    checkbox.style.backgroundColor = "red";
    console.log("hi");

    // Clear the message after 3 seconds
    setTimeout(() => {
        checkbox.innerText = "";
        checkbox.style.backgroundColor = "";
    }, 3000);
    
}

export default renderNlpCheckboxSame;