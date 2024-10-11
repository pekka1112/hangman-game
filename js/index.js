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
}
const getRandomWord = () => {
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
        })
    }else{
        wrongGuessCount++;
        hangmanImage.src = `img/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);

}
for (let i = 97; i <= 122; i++) {
    const button = document.createElement('button');
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}
const gameOver = (isWin) => { 
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