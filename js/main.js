import {fetchData} from "../js/wordList.js";

let wordList = [];
const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
let currentWord, correctLetters = [], wrongGuessCount = 0;
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");
const listScoreBtn = document.querySelector(".btn-result");
let teams = JSON.parse(localStorage.getItem('teamsData')) || [];
let time = JSON.parse(localStorage.getItem('configData')) || [];
let currentTeamIndex = 0;
const maxGuesses = parseInt(time.reasonLimit);
let roundTimer;

let prize1 ="<img width=\"24\" height=\"24\" src=\"https://img.icons8.com/color/48/first-place-ribbon.png\" alt=\"first-place-ribbon\"/>"
let prize2 = "<img width=\"24\" height=\"24\" src=\"https://img.icons8.com/color/48/second-place-ribbon.png\" alt=\"second-place-ribbon\"/>"
let prize3 = "<img width=\"24\" height=\"24\" src=\"https://img.icons8.com/color/48/third-place-ribbon.png\" alt=\"third-place-ribbon\"/>"
let prize4 = "<img width=\"24\" height=\"24\" src=\"https://img.icons8.com/color/48/prize.png\" alt=\"prize\"/>"
let prize5 = "<img width=\"24\" height=\"24\" src=\"https://img.icons8.com/fluency/48/prize--v1.png\" alt=\"prize--v1\"/>"

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = parseInt(localStorage.getItem('reasonLimit')) || 0;
    localStorage.setItem('reasonLimit', wrongGuessCount);
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
const disableKeyboard = () => {
    keyboardDiv.querySelectorAll("button").forEach(button => {
        button.disabled = true;
    });
}
const getRandomWord = async () => {
    wordList = await fetchData();
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
        localStorage.setItem('reasonLimit', wrongGuessCount);
        hangmanImage.src = `img/hangman-${wrongGuessCount}.svg`;
    }

    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if (wrongGuessCount === maxGuesses) {
        disableKeyboard();
        handleTeamLoss();
        return; 
    }

    if (new Set(correctLetters).size === new Set(currentWord).size) {
        const currentTeam = teams[currentTeamIndex];
        currentTeam.score += 1;  
        localStorage.setItem('teamsData', JSON.stringify(teams));  
        resetKeyboard();
        updateLeaderboard();
        setTimeout(() => {
            getRandomWord();
        }, 1000);
    }
}
const handleTeamLoss = () => {
    const currentTeam = teams[currentTeamIndex];
    currentTeam.roundsPlayed++;
    localStorage.setItem('teamsData', JSON.stringify(teams));
    // Đánh dấu trò chơi đang diễn ra cho đội tiếp theo
    localStorage.setItem('isGameOngoing', 'false');

    setTimeout(() => {
        if (currentTeamIndex < teams.length - 1) {
            // const proceed = confirm("Đội tiếp theo có muốn chơi không?");
            $('#alertModal .modal-body .body-content').html(`
                <p class="final-score text-center bungee-regular-normal">${teams[currentTeamIndex].score} </p>
                <p class="text-center bungee-regular">Đội tiếp theo là ${teams[currentTeamIndex+1].name} </p>`);
            $('#alertModal').modal('show');
            $('#confirmBtn').on('click', function (){
                $('#alertModal').modal('hide');
                currentTeamIndex++;
                localStorage.setItem('currentTeamIndex', currentTeamIndex);
                const timeLimit = time.timeLimit * 60;
                localStorage.setItem("timeLeft", timeLimit);
                startRound();
            });
        } else {
            checkForTies(); 
        }
    }, 1000);
};

for (let i = 97; i <= 122; i++) {
    const button = document.createElement('button');
    button.classList.add('btn-pick');
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(button, String.fromCharCode(i))); 
}

playAgainBtn.addEventListener("click", () => {
    if (currentTeamIndex < teams.length - 1) {
        currentTeamIndex++;
    } else {
        currentTeamIndex = 0; 
       
    }
    localStorage.setItem('currentTeamIndex', currentTeamIndex); 
    resetGame();
    getRandomWord();
});

function getPrizeIcon(index) {
    switch (index) {
        case 0: return prize1;
        case 1: return prize2;
        case 2: return prize3;
        case 3: return prize4;
        case 4: return prize5;
        default: return "";
    }
}
function updateLeaderboard() {
        const teams = JSON.parse(localStorage.getItem('teamsData'));
        teams.sort((a, b) => b.score - a.score);
        const leaderboardBody = document.querySelector('table tbody');
        leaderboardBody.innerHTML = '';

        teams.forEach((team, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <th scope="row">${getPrizeIcon(index)}</th>
            <td class="bungee-regular">${team.name}</td>
            <td class="bungee-regular">${team.score}</td>
        `;
            leaderboardBody.appendChild(row);
        });
        localStorage.setItem('teamsData', JSON.stringify(teams));
}
function updateLeaderboardModal() {
    const teams = JSON.parse(localStorage.getItem('teamsData'));
    teams.sort((a, b) => b.score - a.score);
    const leaderboardBody = document.querySelector('.modal-body table tbody');
    leaderboardBody.innerHTML = '';

    teams.forEach((team, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${getPrizeIcon(index)}</th>
            <td class="bungee-regular">${team.name}</td>
            <td class="bungee-regular">${team.score}</td>
        `;
        leaderboardBody.appendChild(row);
    });
    localStorage.setItem('teamsData', JSON.stringify(teams));
}
listScoreBtn.addEventListener("click", () => {
    updateLeaderboardModal();
});
function startRound() {
    clearTimeout(roundTimer);
    currentTeamIndex = parseInt(localStorage.getItem('currentTeamIndex')) || 0;

    if (localStorage.getItem('isGameOngoing') === 'false') {
        wrongGuessCount = 0;
        localStorage.setItem('reasonLimit', wrongGuessCount);
        localStorage.setItem('isGameOngoing', 'true');
    }

    if (currentTeamIndex < teams.length) {
        document.querySelector('#team-name').innerText = teams[currentTeamIndex].name;
        resetGame();
        getRandomWord();
        resetKeyboard();

        guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
        hangmanImage.src = `img/hangman-${wrongGuessCount}.svg`;
        startTimer();
        roundTimer = setTimeout(() => {
            handleTeamLoss(); 
        }, timeLeft * 1000); 
    } else {
        checkForTies(); 
    }
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
        $('#alertModal .modal-body .body-content').html(`
                <p class="final-score text-center bungee-regular-normal">**</p>
                <p class="text-center bungee-regular">Tất cả các đội đều hoà</p>`);
        $('#alertModal').modal('show');
    } else {
        $('#alertModal .modal-body .body-content').html(`
                    <p class="final-score text-center bungee-regular-normal">${highestScore} </p>
                    <p class="text-center bungee-regular">Đội chiến thắng là <span class="bungee-regular">${highestScoreTeam.name}</span> </p>`);
        $('#alertModal').modal('show');
    }
    resetGame();
    currentTeamIndex = 0;
    updateLeaderboard();
    $('#confirmBtn').on('click', function (){
        $('#alertModal').modal('hide');
        window.location.href = "index.html";
    });
}
$('#return-menu').on('click', function (){
    window.location.href = "index.html";
});
updateLeaderboard();
startRound();
