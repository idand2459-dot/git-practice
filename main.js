function onBallClick() {
    const elBall = document.querySelector('.ball');
    
    const currentSize = parseInt(elBall.style.width) || 100;
    let randomNum=getRandomIntInt(20,60);
    let randomColor=getRandomColor();
    let newSize = currentSize + randomNum;
    
    if (newSize > 400) {
        newSize = 100;
    }
    
    elBall.style.width = newSize + 'px';
    elBall.style.height = newSize + 'px';
    elBall.style.backgroundColor=randomColor;
    
    elBall.innerText = newSize;
}