function onBallClick(){
const elBall=document.querySelector('.ball')

const currentSize=parseInt(elBall.style.width)||100;
const newSize=currentSize + 50;

elBall.style.width=currentSize + 'px'
elBall.style.height=currentSize + 'px'
   
elBall.innerText=newSize;
}