const computer = document.getElementById('computer');
const user = document.getElementById('user');
const result = document.getElementById('result');
const score = document.getElementById('score');
const reset = document.getElementById('reset');
const history = document.getElementById('history');
const possibleChoices = document.querySelectorAll('button');

let userPreference;
let computerPreference;
let YourScore = 0;
let computerScore = 0;

const choices = ['rock', 'paper', 'scissor'];

possibleChoices.forEach((choice) =>
  choice.addEventListener('click', (e) => {
    if (e.target.id !== 'reset') { 
      userPreference = e.target.id;
      user.innerText = userPreference;
      generateRandomChoice();
      const roundResult = Result();
      updateScore();
      addToHistory(userPreference, computerPreference, roundResult);
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
    return "Draw";
  } else if (
    (computerPreference === 'rock' && userPreference === 'paper') ||
    (computerPreference === 'paper' && userPreference === 'scissor') ||
    (computerPreference === 'scissor' && userPreference === 'rock')
  ) {
    result.innerText = 'You Win!';
    YourScore++;
    return "Win";
  } else {
    result.innerText = 'You Lose!';
    computerScore++;
    return "Lose";
  }
}

function updateScore() {
  score.innerText = `Player: ${YourScore} | Computer: ${computerScore}`;
}

function addToHistory(userChoice, computerChoice, roundResult) {
  const historyItem = document.createElement('li');
  historyItem.textContent = `You chose ${userChoice}, Computer chose ${computerChoice}. Result: ${roundResult}`;
  history.appendChild(historyItem);
}

reset.addEventListener('click', () => {
  YourScore = 0;
  computerScore = 0;
  user.innerText = '';
  computer.innerText = '';
  result.innerText = '';
  updateScore();
  history.innerHTML = ''; 
});

updateScore();
