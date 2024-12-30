const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');

const width = 100;
const height = 20;
const balldia = 20;
const gridWidth = 560;
const gridHeight = 300;
let score = 0;
let lives = 3;
let xDirection = -2;
let yDirection = 2;
let timer;

const start = [230, 10];
let current = start;

const ballStart = [270, 40];
let ballCurr = ballStart;

livesDisplay.innerHTML = `Lives: ${lives}`;

class Block {
    constructor(x_axis, y_axis) {
        this.bottomLeft = [x_axis, y_axis];
        this.bottomRight = [x_axis + width, y_axis];
        this.topLeft = [x_axis, y_axis + height];
        this.topRight = [x_axis + width, y_axis + height];
    }
}

const totalBlocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210)
];

function incrementBlocks() {
    for (let i = 0; i < totalBlocks.length; i++) {
        const blockElement = document.createElement('div');
        blockElement.classList.add('blocks');
        blockElement.style.left = totalBlocks[i].bottomLeft[0] + 'px';
        blockElement.style.bottom = totalBlocks[i].bottomLeft[1] + 'px';
        grid.appendChild(blockElement);
    }
}

incrementBlocks();

const userElement = document.createElement('div');
userElement.classList.add('user');
showUser();
grid.appendChild(userElement);

function showUser() {
    userElement.style.left = current[0] + 'px';
    userElement.style.bottom = current[1] + 'px';
}

function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (current[0] > 0) {
                current[0] -= 10;
                showUser();
            }
            break;
        case 'ArrowRight':
            if (current[0] < gridWidth - width) {
                current[0] += 10;
                showUser();
            }
            break;
    }
}
document.addEventListener('keydown', moveUser);

const userBall = document.createElement('div');
userBall.classList.add('userBall');
showBall();
grid.appendChild(userBall);

function showBall() {
    userBall.style.left = ballCurr[0] + 'px';
    userBall.style.bottom = ballCurr[1] + 'px';
}

function moveBall() {
    ballCurr[0] += xDirection;
    ballCurr[1] += yDirection;
    showBall();
    findDirection();
    checkCollision();
}

timer = setInterval(moveBall, 30);

function findDirection() {
    if (ballCurr[0] >= gridWidth - balldia || ballCurr[0] <= 0) {
        xDirection = -xDirection;
    }
    if (ballCurr[1] >= gridHeight - balldia) {
        yDirection = -yDirection;
    }
}

function checkCollision() {
    for (let i = 0; i < totalBlocks.length; i++) {
        if (
            ballCurr[0] > totalBlocks[i].bottomLeft[0] &&
            ballCurr[0] < totalBlocks[i].bottomRight[0] &&
            ballCurr[1] + balldia > totalBlocks[i].bottomLeft[1] &&
            ballCurr[1] < totalBlocks[i].topLeft[1]
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.blocks'));
            allBlocks[i].classList.remove('blocks');
            totalBlocks.splice(i, 1);
            yDirection = -yDirection;
            score++;
            scoreDisplay.innerHTML = `Score: ${score}`;

           
            if (totalBlocks.length === 0) {
                scoreDisplay.innerHTML = 'YOU WIN!';
                clearInterval(timer);
                document.removeEventListener('keydown', moveUser);
            }
            return;
        }
    }

    if (
        ballCurr[0] > current[0] &&
        ballCurr[0] < current[0] + width &&
        ballCurr[1] > current[1] &&
        ballCurr[1] < current[1] + height
    ) {
        yDirection = -yDirection;
    }

    if (ballCurr[1] <= 0) {
        loseLife();
    }
}

function loseLife() {
    lives--;
    livesDisplay.innerHTML = `Lives: ${lives}`;
    if (lives > 0) {
        ballCurr = ballStart.slice();
        xDirection = -2;
        yDirection = 2;
        showBall();
    } else {
        clearInterval(timer);
        scoreDisplay.innerHTML = 'GAME OVER!';
        document.removeEventListener('keydown', moveUser);
    }
}