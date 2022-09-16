// import { useState } from 'react';
import cover from '../../img/cover.png';

function Card ({card, handleChoice, flipped, disabled}) {

  const handleClick = () => {
    if(!disabled){
    handleChoice(card)}
  };

  return (
    <div className='card'>
      <div className={flipped ? "flipped" : ""}>
        <img className='card__image card__image_front' src={card.src} alt='card front'/>
        <img className='card__image card__image_cover' 
        src={cover} 
        alt='card cover'
        onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default Card;