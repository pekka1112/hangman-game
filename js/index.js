const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
let currentWord, correctLetters = [], wrongGuessCount = 0;
const maxGuesses = 6;
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    hangmanImage.src = `img/hangman-${wrongGuessCount}.svg`;
    keyboardDiv.querySelectorAll("button").forEach(button => button.disabled = false);
    wordDisplay.querySelectorAll("li").forEach(li => li.innerText = "");
    gameModal.classList.remove("show");
    startTimer();
}
const getRandomWord = () => {
    clearInterval(timer); 
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word, hint);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();

    wordDisplay.innerHTML = word.split('').map(() => `<li class="letter"></li>`).join('');
   
}
const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    }else{
        wrongGuessCount++;
        hangmanImage.src = `img/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === new Set(currentWord).size) return gameOver(true);

}
for (let i = 97; i <= 122; i++) {
    const button = document.createElement('button');
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}
const gameOver = (isWin) => { 
    clearInterval(timer)
    setTimeout(() => {
        const modalText = isWin ? "Bạn đã tìm thấy từ:" : "Từ đúng là:";
        gameModal.querySelector("img").src = `img/${isWin ? "victory" : "lost"}.gif`;
        gameModal.querySelector("h4").innerText = `${isWin ? "Chiến thắng!" : "Thất bại!"}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300);
}
getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);

let teams = JSON.parse(localStorage.getItem('teamsData'));
let currentTeamIndex = 0;
// Update Score
function updateLeaderboard(){
    const teams = JSON.parse(localStorage.getItem('teamsData'));
    teams.sort((a,b) => b.score - a.score);
    const leaderboardBody = document.querySelector('table tbody');
    leaderboardBody.innerHTML = '';

    teams.forEach((team, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${team.name}</td>
            <td>${team.roundsPlayed}</td>
            <td>${team.score}</td>
        `;
        leaderboardBody.appendChild(row);
    });
    localStorage.setItem('teamsData', JSON.stringify(teams));
}
//Start
function startRound(){
    const currentTeam = teams[currentTeamIndex];
    
    let roundTimer = setTimeout(() => {
        let isWin = checkTeamWin();
        if(isWin){
            currentTeam.score += 5;
        }else{
            currentTeam.score += 0;
        }
        currentTeam.roundsPlayed++;
        localStorage.setItem('teamsData', JSON.stringify(teams));
        currentTeamIndex++;

        if(teams.every(team => team.roundsPlayed >= 5)){
            checkForTies();
        }else{
            startRound();
        }
    }, 180000);
}
//Check Team Win
function checkTeamWin() {
    if(correctLetters.length === new Set(currentWord).size){
        return true;
    }
    if(wrongGuessCount >= maxGuesses){
        return false;
    }
    return null;
}
// Check Ties
function checkForTies(){
    teams.sort((a,b) => b.score - a.score);

    let hasTies = false;
    for (let i = 0; i < teams.length - 1; i++) {
        if(teams[i].score === teams[i + 1].score){
            hasTies = true;
            break;
        }
    }
    if(hasTies){
        startRound();
    }else{
        updateLeaderboard();
    }
}
