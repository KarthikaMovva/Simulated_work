const computer = document.getElementById('computer');
const user = document.getElementById('user');
const result = document.getElementById('result');
const score = document.getElementById('score');
const reset = document.getElementById('reset');
const possibleChoices = document.querySelectorAll('button');

let userPreference;
let computerPreference;
let YourScore = 0;
let computerScore = 0;

const choices = ['rock','paper','scissor'];

possibleChoices.forEach((choice) =>
  choice.addEventListener('click', (e) => {
    if (e.target.id !== 'reset') { 
      userPreference = e.target.id;
      user.innerText = userPreference;
      generateRandomChoice();
      Result();
      updateScore();
    }
  })
);

function generateRandomChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  computerPreference = choices[randomIndex];
  computer.innerText = computerPreference;
}

function Result() {
  if (computerPreference === userPreference) {
    result.innerText = "It's a Draw!";
  } else if (
    (computerPreference === 'rock' && userPreference === 'paper') ||
    (computerPreference === 'paper' && userPreference === 'scissor') ||
    (computerPreference === 'scissor' && userPreference === 'rock')
  ) {
    result.innerText = 'You Win!';
    YourScore++;
  } else {
    result.innerText = 'You Lose!';
    computerScore++;
  }
}

function updateScore() {
  score.innerText = `Player: ${YourScore} | Computer: ${computerScore}`;
}

reset.addEventListener('click', () => {
  YourScore = 0;
  computerScore = 0;
  user.innerText = '';
  computer.innerText = '';
  result.innerText = '';
  updateScore();
});


updateScore();