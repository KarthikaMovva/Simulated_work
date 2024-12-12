const blocks = document.querySelectorAll('.square');
const duration = document.querySelector('#time-left'); 
const presentscore = document.querySelector('#score');
let count;
let initialscore = 0;
let presentTime = 60;
let id = null;
function randomBlock() {
    blocks.forEach(sq => sq.classList.remove('mole')); 

    const randomPosition = blocks[Math.floor(Math.random() * blocks.length)];
    randomPosition.classList.add('mole');

    count = randomPosition.id; 
}
function moveMole() {
    id = setInterval(randomBlock, 500); 
}
blocks.forEach(sq => {
    sq.addEventListener('click', () => {
        if (sq.id === count) {
            initialscore++;
            presentscore.textContent = initialscore; 
            count = null;
        }
    });
});
moveMole();
function countDown() {
    presentTime--;
    duration.textContent = presentTime;

    if (presentTime === 0) {
        clearInterval(countDownid); 
        clearInterval(id); 
        alert('GAME OVER! Your final presentscore is ' + initialscore); 
    }
}

let countDownid = setInterval(countDown, 1000); 
