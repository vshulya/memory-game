import React, { useEffect } from 'react';
import { useState } from 'react';
import Card from '../Card/Card';

import helmet from '../../img/helmet-1.png';
import potion from '../../img/potion-1.png';
import ring from '../../img/ring-1.png';
import scroll from '../../img/scroll-1.png';
import shield from '../../img/shield-1.png';
import sword from '../../img/sword-1.png';

const cardImage = [
  {'src': helmet, matched: false},
  {'src': potion, matched: false},
  {'src': ring, matched: false},
  {'src': scroll, matched: false},
  {'src': shield, matched: false},
  {'src': sword, matched: false}
];

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurn => prevTurn+1)
    setDisabled(false);
  } 

  //compare cards 
  useEffect(() => {
    if(choiceOne && choiceTwo) {
      setDisabled(true);
      if(choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src) {
              return {...card, matched: true} 
            } else {
              return card;
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards);

  const shuffleCards = () => {
    const shuffledCards = [...cardImage, ...cardImage]
    .sort(() => Math.random() -0.5)
    .map((card) => ({...card, id: Math.random() }));

    setCards(shuffledCards); 
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
  }

  useEffect(() =>{
    shuffleCards();
  }, [])

  return (
    <div className='App'>
      <h1 className='app__title'>Magic Match</h1>
      <button onClick={shuffleCards} className='button'>Next</button>
      <div className='card-grid'> {
        cards.map(card => (
       <Card 
       card={card} 
       key={card.id}
       src={card.src}
       handleChoice={handleChoice} 
       flipped={ card === choiceOne || card === choiceTwo || card.matched }
       disabled={disabled}
       >
       </Card>
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
