const blocks = document.querySelectorAll('.square');
const duration = document.querySelector('#time-left');
const presentscore = document.querySelector('#score');
const pauseButton = document.querySelector('#pause');
const restartButton = document.querySelector('#restart');
let count;
let initialscore = 0;
let presentTime = 60;
let moleTimerId = null;
let countdownTimerId = null;
let isPaused = false;

function randomBlock() {
    if (!isPaused) {
        blocks.forEach(sq => sq.classList.remove('mole'));

        const randomPosition = blocks[Math.floor(Math.random() * blocks.length)];
        randomPosition.classList.add('mole');

        count = randomPosition.id;
    }
}

function moveMole() {
    moleTimerId = setInterval(randomBlock, 500);
}

blocks.forEach(sq => {
    sq.addEventListener('click', () => {
        if (!isPaused && sq.id === count) { 
            initialscore++;
            presentscore.textContent = initialscore;
            count = null;
        }
    });
});

function countDown() {
    if (!isPaused) {
        presentTime--;
        duration.textContent = presentTime;

        if (presentTime === 0) {
            clearInterval(countdownTimerId);
            clearInterval(moleTimerId);
            alert('GAME OVER! Your final score is ' + initialscore);
        }
    }
}

function pauseGame() {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? 'Resume' : 'Pause';
}

function restartGame() {
    clearInterval(moleTimerId);
    clearInterval(countdownTimerId);

    initialscore = 0;
    presentTime = 60;
    isPaused = false;

    presentscore.textContent = initialscore;
    duration.textContent = presentTime;
    pauseButton.textContent = 'Pause';

    moveMole();
    countdownTimerId = setInterval(countDown, 1000);
}

pauseButton.addEventListener('click', pauseGame);
restartButton.addEventListener('click', restartGame);

moveMole();
countdownTimerId = setInterval(countDown, 1000);
