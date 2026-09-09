function onBallClick(elBall, maxDiameter) {
    console.log('elBall received:', elBall); // נוודא שהוא מקבל את הכדור
    
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