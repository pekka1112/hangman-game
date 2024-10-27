let timer; 
let timeLeft; 
const dataConfig = JSON.parse(localStorage.getItem("configData"));
function startTimer() {
    const storedTimeLimit = dataConfig ? dataConfig.timeLimit : null;
    timeLeft = storedTimeLimit ? parseInt(storedTimeLimit) * 60 : 180;
    updateTimerDisplay(); 
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTeamLoss();
            // stopGame();
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



startTimer();


