import React, { useState } from "react";
import type { IDeck } from "../types";
interface StudyProps {
  activeDeck: IDeck;
}
function Study({activeDeck}:StudyProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  function NextCard(){
    if(activeDeck)
    if(currentIndex<activeDeck.cards.length-1){
      setCurrentIndex(currentIndex+1);
      setIsFlipped(false);
    }
    
  }
  if (!activeDeck.cards.length) return <div>No cards yet</div>;
  return <>
  <div onClick={()=>setIsFlipped(!isFlipped)}>
    {isFlipped ? (activeDeck.cards[currentIndex].back)
    : (activeDeck.cards[currentIndex].front)}
    
  </div>
  <div>
    <button onClick={NextCard}>Easy</button>
    <button onClick={NextCard}>Good</button>
    <button onClick={NextCard}>Again</button>
  </div>
  </>;
}

export default Study;
