const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
let currentWord, correctLetters = [], wrongGuessCount = 0;
const maxGuesses = 6;
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let teams = JSON.parse(localStorage.getItem('teamsData')) || [];
let currentTeamIndex = 0;
let roundTimer;

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    hangmanImage.src = `img/hangman-${wrongGuessCount}.svg`;
    gameModal.classList.remove("show");
    resetKeyboard();
};

const resetKeyboard = () => {
    keyboardDiv.querySelectorAll("button").forEach(button => {
        button.disabled = false;  
    });
};

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word, hint);
    document.querySelector(".hint-text b").innerText = hint;


    wordDisplay.innerHTML = word.split('').map(() => `<li class="letter"></li>`).join('');
    
    correctLetters = [];
};

const initGame = (button, clickedLetter) => {
    if (correctLetters.includes(clickedLetter)) {
        button.disabled = true;  
        return; 
    }

    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter; 
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        wrongGuessCount++;
        hangmanImage.src = `img/hangman-${wrongGuessCount}.svg`;
    }

    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if (wrongGuessCount === maxGuesses) {
        handleTeamLoss();
        return; 
    }

    if (new Set(correctLetters).size === new Set(currentWord).size) {
        const currentTeam = teams[currentTeamIndex];
        currentTeam.score += 1;  
        localStorage.setItem('teamsData', JSON.stringify(teams));  
        resetKeyboard();
    
        setTimeout(() => {
            getRandomWord();  
        }, 1000);
    }
}


const handleTeamLoss = () => {
    const currentTeam = teams[currentTeamIndex];
    currentTeam.roundsPlayed++;  
    localStorage.setItem('teamsData', JSON.stringify(teams)); 


    setTimeout(() => {
        if (currentTeamIndex < teams.length - 1) {
            const proceed = confirm("Đội tiếp theo có muốn chơi không?");
            if (proceed) {
                currentTeamIndex++;
                startRound(); 
            }
        } else {
            checkForTies(); 
        }
    }, 1000);
};


// const showLostTurnModal = () => {
//     gameModal.querySelector("img").src = `img/lost.gif`;
//     gameModal.querySelector("h4").innerText = "Thất bại!";
//     gameModal.querySelector("p").innerHTML = "Bạn đã đoán sai quá nhiều. Đến lượt đội tiếp theo!";
//     gameModal.classList.add("show");
// }

for (let i = 97; i <= 122; i++) {
    const button = document.createElement('button');
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(button, String.fromCharCode(i))); 
}

playAgainBtn.addEventListener("click", () => {
    const currentTeam = teams[currentTeamIndex];
    
    
    if (currentTeamIndex < teams.length - 1) {
        currentTeamIndex++;
        resetGame(); 
        getRandomWord();  
    } else {
    
        currentTeamIndex = 0; 
        resetGame();
        getRandomWord();
    }
});

const gameOver = (isWin) => { 
    const currentTeam = teams[currentTeamIndex];
    clearTimeout(roundTimer); 

    setTimeout(() => {
        const modalText = isWin ? "Bạn đã tìm thấy từ:" : "Từ đúng là:";
        gameModal.querySelector("img").src = `img/${isWin ? "victory" : "lost"}.gif`;
        gameModal.querySelector("h4").innerText = `${isWin ? "Chiến thắng!" : "Thất bại!"}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");

        currentTeam.roundsPlayed++;
        localStorage.setItem('teamsData', JSON.stringify(teams));

        setTimeout(() => {
            if (currentTeamIndex < teams.length - 1) {
                const proceed = confirm("Đội tiếp theo có muốn chơi không?");
                if (proceed) {
                    currentTeamIndex++;
                    startRound(); 
                }
            } else {
                checkForTies();
            }
        }, 1000);

        resetGame(); 
    }, 300);
};



function updateLeaderboard() {
    const teams = JSON.parse(localStorage.getItem('teamsData'));
    teams.sort((a, b) => b.score - a.score);
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


function startRound() {
    if (currentTeamIndex < teams.length) {
        resetGame(); 
        getRandomWord(); 
        resetKeyboard();

        wrongGuessCount = 0;
        guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
        hangmanImage.src = `img/hangman-${wrongGuessCount}.svg`;

        clearInterval(timer);

        roundTimer = setTimeout(() => {
            handleTeamLoss(); 
        }, 180000); 

        startTimer(); 
    } else {
        checkForTies(); 
    }
}

function checkTeamWin() {
    return correctLetters.length === new Set(currentWord).size;
}

function checkForTies() {
    teams.sort((a, b) => b.score - a.score); 

    const highestScoreTeam = teams[0]; 
    const highestScore = highestScoreTeam.score;

    let hasTies = false;
    for (let i = 0; i < teams.length - 1; i++) {
        if (teams[i].score === teams[i + 1].score) {
            hasTies = true;
            break;
        }
    }

    if (hasTies) {
        alert("Có đội hòa! Chúc mừng!");
    } else {
        alert(`Cuộc chơi đã kết thúc! Đội chiến thắng là ${highestScoreTeam.name} với ${highestScore} điểm!`);
    }

    resetGame(); 
    currentTeamIndex = 0; 
    updateLeaderboard(); 

    window.location.href = "menu.html";
}


getRandomWord();
startRound();
