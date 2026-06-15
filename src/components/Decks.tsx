import React, { useState } from "react";
import type { IDeck } from "../types";
interface DecksProp {
  data: IDeck[];
  setDecks: React.Dispatch<React.SetStateAction<IDeck[]>>;
}
function Decks({ data, setDecks }: DecksProp) {
  const [title, setTitle] = useState("");
  const [selectedDeck, setSelectedDeck] = useState<IDeck | null>(null);
const [front, setFront] = useState("");
const [back, setBack] = useState("");
  // function addDeck() {
  //   return title
  //     ? setDecks([...data, { deckId: Date.now(), deckTitle: title, cards: [] }])
  //     : null;
  // }
  function addBack() {
    selectedDeck?.cards()
  }
  return (
    <div>
      {/* <input onChange={(e) => setTitle(e.target.value)} className="" />
      <button onClick={addDeck}>Add</button> */}
      {selectedDeck ? (
        <>
          {selectedDeck.cards.map((card) => {
            <div key={card.cardId}>{card.front}</div>;
          })}
          <input/>
          <input onChange={()=>addBack}>BackCard</input>
          <button onClick={() => setSelectedDeck(null)}>Back</button>
        </>
      ) : (
        data.map((deck) => (
          <div onClick={() => setSelectedDeck(deck)} key={deck.deckId}>
            {deck.deckTitle}
          </div>
        ))
      )}
    </div>
  );
}

export default Decks;
