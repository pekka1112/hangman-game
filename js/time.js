let timer; 
timeLeft = 180; 
function startTimer() {
    timeLeft = 180; 
    updateTimerDisplay(); 
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            stopGame();
        } else {
            timeLeft--;
            updateTimerDisplay(); 
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (timeLeft <= 10) {
        timerElement.classList.add("red");
    } else {
        timerElement.classList.remove("red");
    }
}

function stopGame() {
    clearInterval(timer); 
    document.querySelector('.game-modal').classList.add('show');
}

startTimer();
