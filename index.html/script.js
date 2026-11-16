const button = document.getElementById("flowerButton");
const message = document.getElementById("message");

button.addEventListener("click", function () {
    message.textContent = "Every flower has its own story. ✿";
    button.textContent = "Thank you for visiting";
});

// CATCH THE STARS GAME

const gameArea = document.getElementById("gameArea");
const startButton = document.getElementById("startGame");
const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");
const gameMessage = document.getElementById("gameMessage");

let score = 0;
let time = 30;
let gameRunning = false;
let timer;
let starTimer;

function createStar() {
    if (!gameRunning) return;

    const star = document.createElement("span");

    star.classList.add("star");
    star.textContent = "✦";

    const maxX = gameArea.clientWidth - 40;
    const maxY = gameArea.clientHeight - 40;

    star.style.left = Math.random() * maxX + "px";
    star.style.top = Math.random() * maxY + "px";

    star.addEventListener("click", function () {
        if (!gameRunning) return;

        score += 10;
        scoreText.textContent = score;
        star.remove();
    });

    gameArea.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 1800);
}

function startGame() {
    if (gameRunning) return;

    score = 0;
    time = 30;
    gameRunning = true;

    scoreText.textContent = score;
    timeText.textContent = time;
    gameMessage.textContent = "";

    gameArea.querySelectorAll(".star").forEach(star => star.remove());

    startButton.textContent = "PLAYING...";

    starTimer = setInterval(createStar, 600);

    timer = setInterval(function () {
        time--;
        timeText.textContent = time;

        if (time <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    gameRunning = false;

    clearInterval(timer);
    clearInterval(starTimer);

    gameArea.querySelectorAll(".star").forEach(star => star.remove());

    gameMessage.textContent = "Game Over! Your score: " + score;

    startButton.textContent = "PLAY AGAIN";
}

startButton.addEventListener("click", startGame);