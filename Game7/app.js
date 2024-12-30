const grid = document.querySelector(".grid");
const resultsDisplay = document.querySelector(".results");

let shooterIndex = 202;
const width = 15;
let direction = 1;
let invadersId;
let goingRight = true;
let aliensRemoved = [];
let level = 1;
let score = 0;
let lives = 3;

for (let i = 0; i < 225; i++) {
    const square = document.createElement("div");
    grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll(".grid div"));

let alienInvaders = [
    0, 1, 2, 3, 4,
    15, 16, 17, 18, 19,
    30, 31, 32, 33, 34,
];

function draw() {
    alienInvaders.forEach((invader, i) => {
        if (!aliensRemoved.includes(i)) {
            squares[invader].classList.add("invader");
        }
    });
}

function remove() {
    alienInvaders.forEach((invader) => squares[invader].classList.remove("invader"));
}

function moveShooter(e) {
    squares[shooterIndex].classList.remove("shooter");
    if (e.key === "ArrowLeft" && shooterIndex % width !== 0) {
        shooterIndex -= 1;
    }
    if (e.key === "ArrowRight" && shooterIndex % width < width - 1) {
        shooterIndex += 1;
    }
    squares[shooterIndex].classList.add("shooter");
}

function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;

    remove();

    if (rightEdge && goingRight) {
        alienInvaders = alienInvaders.map((invader) => invader + width + 1);
        direction = -1;
        goingRight = false;
    }

    if (leftEdge && !goingRight) {
        alienInvaders = alienInvaders.map((invader) => invader + width - 1);
        direction = 1;
        goingRight = true;
    }

    alienInvaders = alienInvaders.map((invader) => invader + direction);

    draw();

    if (alienInvaders.some((invader) => invader === shooterIndex)) {
        loseLife();
    }

    if (alienInvaders.some((invader) => invader >= squares.length)) {
        loseLife();
    }

    if (aliensRemoved.length === alienInvaders.length) {
        levelUp();
    }
}

function loseLife() {
    lives -= 1;
    resultsDisplay.textContent = `Lives: ${lives} | Level: ${level} | Score: ${score}`;

    if (lives === 0) {
        clearInterval(invadersId);
        resultsDisplay.textContent = "Game Over";
    } else {
        resetLevel();
    }
}

function resetLevel() {
    remove();
    alienInvaders = [
        0, 1, 2, 3, 4,
        15, 16, 17, 18, 19,
        30, 31, 32, 33, 34,
    ];
    aliensRemoved = [];
    draw();
}

function shoot(e) {
    if (e.key !== "ArrowUp") return;

    let laserId;
    let currentLaserIndex = shooterIndex;

    function moveLaser() {
        squares[currentLaserIndex].classList.remove("laser");
        currentLaserIndex -= width;
        if (currentLaserIndex >= 0) {
            squares[currentLaserIndex].classList.add("laser");
        }

        if (squares[currentLaserIndex]?.classList.contains("invader")) {
            squares[currentLaserIndex].classList.remove("laser");
            squares[currentLaserIndex].classList.remove("invader");
            squares[currentLaserIndex].classList.add("boom");

            setTimeout(() => squares[currentLaserIndex].classList.remove("boom"), 300);

            clearInterval(laserId);

            const alienIndex = alienInvaders.indexOf(currentLaserIndex);
            aliensRemoved.push(alienIndex);
            score += 10;
            resultsDisplay.textContent = `Lives: ${lives} | Level: ${level} | Score: ${score}`;
        }
    }

    laserId = setInterval(moveLaser, 100);
}

function levelUp() {
    clearInterval(invadersId);
    level += 1;
    resultsDisplay.textContent = `Lives: ${lives} | Level: ${level} | Score: ${score}`;

    alienInvaders = [];
    for (let i = 0; i < level * 5; i++) {
        alienInvaders.push(i % width + Math.floor(i / width) * width);
    }

    aliensRemoved = [];
    draw();

    invadersId = setInterval(moveInvaders, Math.max(200, 600 - level * 50));
}

squares[shooterIndex].classList.add("shooter");
draw();

document.addEventListener("keydown", moveShooter);
document.addEventListener("keydown", shoot);

invadersId = setInterval(moveInvaders, 600);
