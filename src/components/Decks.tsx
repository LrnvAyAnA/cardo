import React, { useState } from "react";
import type { IDeck } from "../types";
interface DecksProp {
  data: IDeck[];
  setDecks: React.Dispatch<React.SetStateAction<IDeck[]>>;
}
function Decks({ data, setDecks }: DecksProp) {
  const [title, setTitle] = useState("");
  const [selectedDeck, setSelectedDeck] = useState<IDeck | null>(null);
  const [isModalOpen,setIsModalOpen] = useState(false);
const [front, setFront] = useState("");
const [back, setBack] = useState("");
  function addDeck() {
    return title
      ? setDecks([...data, { deckId: Date.now(), deckTitle: title, cards: [] }])
      : null;
  }
    function addCard() {
      if(front && back && selectedDeck) {
        const newCard = { cardId: Date.now(), front, back, lvl: 0 };
        const updatedDeck = {
          ...selectedDeck,
          cards: [...selectedDeck.cards, newCard],
        };
        setDecks(data.map(deck => deck.deckId === selectedDeck.deckId ? updatedDeck : deck));
        setSelectedDeck(updatedDeck);
      }
  }
  return (
    <div>
      {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50">
    <div className="bg-white p-6 rounded-xl">
      содержимое формы
      <button onClick={() => setIsModalOpen(false)}>×</button>
    </div>
  </div>
)}
      {/* <input onChange={(e) => setTitle(e.target.value)} className="" /> 
      <button onClick={addDeck}>Add deck</button> */}
      <button onClick={()=>setIsModalOpen(true)}>+</button>
      {selectedDeck ? (
        <>
          {selectedDeck.cards.map((card) => 
            <div key={card.cardId}>{card.front}</div>
          )}
          {/* <input onChange={(e) => setFront(e.target.value)} placeholder="Front" />
          <input onChange={(e) => setBack(e.target.value)} placeholder="Back" />
          <button onClick={addCard}>Add card</button> */}
          <button onClick={() => setSelectedDeck(null)}>Back</button>
        </>
      ) : (
        //отображение колод
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
