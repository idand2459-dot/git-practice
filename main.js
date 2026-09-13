// מערכות מעקב למשחק (Undo/Redo, מונה צעדים וטיימר)
let gHistory = [];
let gHistoryIndex = -1;
let gMoveCount = 0;
let gTimerInterval = null;
let gSecondsElapsed = 0;
let gIsGameStarted = false;

// שמירת מצב בכל פעולה
function saveState() {
    startTimerIfNeeded();
    gMoveCount++;
    document.title = `The Ball Game (Moves: ${gMoveCount})`;

    // אם אנחנו באמצע ההיסטוריה ועשינו פעולה חדשה, נחתך קדימה
    if (gHistoryIndex < gHistory.length - 1) {
        gHistory = gHistory.slice(0, gHistoryIndex + 1);
    }

    const state = {
        ball1: getBallData('.ball1'),
        ball2: getBallData('.ball2'),
        ball3: getBallData('.ball3'),
        ball4: getBallData('.ball4'),
        ball5: getBallData('.ball5'),
        bodyBg: document.body.style.backgroundColor || ''
    };

    gHistory.push(state);
    gHistoryIndex = gHistory.length - 1;
    updateUndoRedoButtons();
}

function getBallData(selector) {
    const el = document.querySelector(selector);
    return {
        width: el.style.width,
        height: el.style.height,
        backgroundColor: el.style.backgroundColor,
        innerText: el.innerText
    };
}

function applyState(state) {
    setBallData('.ball1', state.ball1);
    setBallData('.ball2', state.ball2);
    setBallData('.ball3', state.ball3);
    setBallData('.ball4', state.ball4);
    setBallData('.ball5', state.ball5);
    document.body.style.backgroundColor = state.bodyBg;
}

function setBallData(selector, data) {
    const el = document.querySelector(selector);
    el.style.width = data.width;
    el.style.height = data.height;
    el.style.backgroundColor = data.backgroundColor;
    el.innerText = data.innerText;
}

// משימה 7-8: Undo ו-Redo
function onUndo() {
    if (gHistoryIndex > 0) {
        gHistoryIndex--;
        applyState(gHistory[gHistoryIndex]);
        gMoveCount++;
        document.title = `The Ball Game (Moves: ${gMoveCount})`;
        updateUndoRedoButtons();
    }
}

function onRedo() {
    if (gHistoryIndex < gHistory.length - 1) {
        gHistoryIndex++;
        applyState(gHistory[gHistoryIndex]);
        gMoveCount++;
        document.title = `The Ball Game (Moves: ${gMoveCount})`;
        updateUndoRedoButtons();
    }
}

function updateUndoRedoButtons() {
    const undoBtn = document.getElementById('undoBtn');
    const redoBtn = document.getElementById('redoBtn');
    
    undoBtn.disabled = gHistoryIndex <= 0;
    redoBtn.disabled = gHistoryIndex >= gHistory.length - 1;
}

// משימה 10: טיימר שמתחיל בשינוי הראשון
function startTimerIfNeeded() {
    if (!gIsGameStarted) {
        gIsGameStarted = true;
        gTimerInterval = setInterval(() => {
            gSecondsElapsed++;
            const timerEl = document.getElementById('timer');
            if (timerEl) timerEl.innerText = `Time: ${gSecondsElapsed}s`;
        }, 1000);
    }
}

// פונקציות הכדורים המקוריות בשילוב שמירת מצב (saveState)
function onBallClick(elBall, maxDiameter) {
    saveState();
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
    saveState();
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
    saveState();
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
    
function onFifthBallClick() {
    saveState();
    document.body.style.backgroundColor = getRandomColor();
}

function onSixBallClick() {
    location.reload();
}

// משימות 5 ו-6: ריחוף אוטומטי
let autoPlayTimeout = null;
let autoPlayInterval = null;
let cycleCount = 0;

function onSixthBallMouseEnter() {
    autoPlayTimeout = setTimeout(() => {
        cycleCount = 0;
        autoPlayInterval = setInterval(() => {
            if (cycleCount >= 10) {
                stopAutoPlay();
                return;
            }
            onBallClick(document.querySelector('.ball1'), 400);
            onBallClick(document.querySelector('.ball2'), 300);
            onThirdBallClick();
            onFourthBallClick();
            cycleCount++;
        }, 2000);
    }, 2000);
}

function onSixthBallMouseLeave() {
    stopAutoPlay();
}

function stopAutoPlay() {
    clearTimeout(autoPlayTimeout);
    clearInterval(autoPlayInterval);
    autoPlayTimeout = null;
    autoPlayInterval = null;
    cycleCount = 0;
}

// שמירת מצב ראשוני כשהדף נטען
window.onload = () => {
    saveState();
    // מאפסים את המונה שנוצר בטעינה הראשונית כדי שיתחיל מ-0 אמיתי
    gMoveCount = 0;
    document.title = `The Ball Game (Moves: 0)`;
    gHistory = [gHistory[gHistory.length - 1]];
    gHistoryIndex = 0;
    updateUndoRedoButtons();
};