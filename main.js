function onBallClick(elBall, maxDiameter) {
    console.log('elBall received:', elBall); 
    
    const currentSize = parseInt(elBall.style.width) || 100;
    let randomNum = getRandomIntInt(20, 60);
    let randomColor = getRandomColor();
    let newSize = currentSize + randomNum;
    
    if (newSize > maxDiameter) {
        newSize = 100;
    }
    
    elBall.style.width = newSize + 'px';
    elBall.style.height = newSize + 'px';
    elBall.style.backgroundColor = randomColor;
    elBall.innerText = newSize;

}

function onThirdBallClick() {
    let elball1 = document.querySelector('.ball1');
    let elball2 = document.querySelector('.ball2');


    let tempWidth = elball1.style.width;
    let tempHeight = elball1.style.height;
    let tempBgColor = elball1.style.backgroundColor;
    let tempText = elball1.innerText;


    elball1.style.width = elball2.style.width;
    elball1.style.height = elball2.style.height;
    elball1.style.backgroundColor = elball2.style.backgroundColor;
    elball1.innerText = elball2.innerText;


    elball2.style.width = tempWidth;
    elball2.style.height = tempHeight;
    elball2.style.backgroundColor = tempBgColor;
    elball2.innerText = tempText;
}


function onFourthBallClick() {
    let elBalls = [document.querySelector('.ball1'), document.querySelector('.ball2')];
    let randomNum = getRandomIntInt(20, 60);

    for (let i = 0; i < elBalls.length; i++) {
        let elBall = elBalls[i];
        let currentSize = parseInt(elBall.style.width) || 100;
        let newSize = currentSize - randomNum;

        if (newSize < 100) {
            newSize = 100; 
        }

        elBall.style.width = newSize + 'px';
        elBall.style.height = newSize + 'px';
        elBall.innerText = newSize;
    }
}
    
function onFifthBallClick(){

    document.body.style.backgroundColor=getRandomColor();
}

function onSixBallClick(){
    location.reload();
}