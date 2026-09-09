function onBallClick() {
    const elBall = document.querySelector('.ball');
    
    const currentSize = parseInt(elBall.style.width) || 100;
    let newSize = currentSize + 50;
    
    if (newSize > 400) {
        newSize = 100;
    }
    
    elBall.style.width = newSize + 'px';
    elBall.style.height = newSize + 'px';
    
    elBall.innerText = newSize;
}