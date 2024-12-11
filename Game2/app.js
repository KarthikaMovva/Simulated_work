document.addEventListener('DOMContentLoaded', () => {

    const setofCards = [
      {
        name: 'bheem',
        img: 'images/bheem.jpg'
      },
      {
        name: 'doramon',
        img: 'images/doramon.jpg'
      },
      {
        name: 'family',
        img: 'images/family.webp'
      },
      {
        name: 'mrbean',
        img: 'images/mrbean.jpg'
      },
      {
        name: 'ninja',
        img: 'images/ninja.jpg'
      },
      {
        name: 'tom',
        img: 'images/tom.jpg'
      },
      {
        name: 'bheem',
        img: 'images/bheem.jpg'
      },
      {
        name: 'doramon',
        img: 'images/doramon.jpg'
      },
      {
        name: 'family',
        img: 'images/family.webp'
      },
      {
        name: 'mrbean',
        img: 'images/mrbean.jpg'
      },
      {
        name: 'ninja',
        img: 'images/ninja.jpg'
      },
      {
        name: 'tom',
        img: 'images/tom.jpg'
      }
    ]
  
    setofCards.sort(() => 0.5 - Math.random())
  
    const gridofCards = document.querySelector('.grid')
    const result = document.querySelector('#result')
    let cardsPicked = []
    let cardsPickedId = []
    let cardsCompleted = []
  
    function createBoard() {
      for (let i = 0; i < setofCards.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'images/ques.jpeg')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        gridofCards.appendChild(card)
      }
    }
  
    function FindMatch() {
      const cards = document.querySelectorAll('img')
      const optionOneId = cardsPickedId[0]
      const optionTwoId = cardsPickedId[1]
      
      if(optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/ques.jpeg')
        cards[optionTwoId].setAttribute('src', 'images/ques.jpeg')
        alert('You have clicked the same image!')
      }
      else if (cardsPicked[0] === cardsPicked[1]) {
        alert('You found a match')
        cards[optionOneId].setAttribute('src', 'images/white.jpg')
        cards[optionTwoId].setAttribute('src', 'images/white.jpg')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsCompleted.push(cardsPicked)
      } else {
        cards[optionOneId].setAttribute('src', 'images/ques.jpeg')
        cards[optionTwoId].setAttribute('src', 'images/ques.jpeg')
        alert('Sorry, try again')
      }
      cardsPicked = []
      cardsPickedId = []
      result.textContent = cardsCompleted.length
      if  (cardsCompleted.length === setofCards.length/2) {
        result.textContent = 'Congratulations! You found them all!'
      }
    }
  
    function flipCard() {
      let cardId = this.getAttribute('data-id')
      cardsPicked.push(setofCards[cardId].name)
      cardsPickedId.push(cardId)
      this.setAttribute('src', setofCards[cardId].img)
      if (cardsPicked.length ===2) {
        setTimeout(FindMatch, 500)
      }
    }
  
    createBoard()
  })