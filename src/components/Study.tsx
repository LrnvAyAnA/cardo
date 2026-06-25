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

  const butAnswer = "bg-[#7367A0] h-9 w-17 rounded-[10px] text-white hover:shadow-[0_4px_20px_rgba(144,119,255,0.6)]";

  if (!activeDeck.cards.length) return <div className="mt-30">No cards yet</div>;
  return <>
  <div className="mt-7 text-white/90">Card 1 of 3</div>
  <div onClick={()=>setIsFlipped(!isFlipped)} className="mt-5 w-96 h-72 rounded-[10px] bg-linear-to-tr from-[#7C5EFF]/30 to-[#B6A7F8]/30 border border-white/50 font-bold text-white/70 flex flex-col justify-between">
    <div className="bg-white/20 w-24 h-5.5 rounded-sm self-start font-normal text-[11px] ml-3 mt-2">English</div>
  <div>
    {isFlipped ? (activeDeck.cards[currentIndex].back)
    : (activeDeck.cards[currentIndex].front)}
  </div>
      <div className="mb-2.5 text-white/30 text-[12px] font-normal">Tap to reveal</div>

  </div>
  <div className="flex justify-items-center gap-4 mt-5 ">
    <button className={butAnswer}  onClick={NextCard}>Easy</button>
    <button className={butAnswer} onClick={NextCard}>Good</button>
    <button className={butAnswer} onClick={NextCard}>Again</button>
  </div>
  </>;
}

export default Study;
