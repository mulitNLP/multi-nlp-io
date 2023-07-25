const deadreson = document.getElementById('dead-reason');

function deadResons(obj) {

    let deadmessage = "@@원인 불명@@";
    let deadres = (obj >> 24) & 0x7f;
    
    if (deadres === 3) {
      deadmessage = "총알에 맞았습니다. ㅠ.ㅠ";
    }else if (deadres === 2){
      deadmessage = "운석에 치였습니다!!";
    }

    deadreson.innerHTML =  deadmessage;
}

export default deadResons;

