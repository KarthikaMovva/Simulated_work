const computer = document.getElementById('computer');
const user = document.getElementById('user');
const result = document.getElementById('result');
const possibilities = document.querySelectorAll('button');
let userChoice;

possibilities.forEach(each => 
  each.addEventListener('click', (e) => {
    userChoice = e.target.id;
    user.innerHTML = userChoice;
    randomChoice();
  })
);

function randomChoice() {
  const randomNumber = Math.floor(Math.random() * 3)+1; 
  console.log(randomNumber);
}
