import React, { useState } from "react";
import type { ICard, IDeck } from "../types";
import Modal from "./Modal";
import { CardItem } from "./CardItem";
interface DecksProp {
  data: IDeck[];
  setDecks: React.Dispatch<React.SetStateAction<IDeck[]>>;
}
function Decks({ data, setDecks }: DecksProp) {
  const [title, setTitle] = useState("");
  const [selectedDeck, setSelectedDeck] = useState<IDeck | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [editingCard, setEditingCard] = useState<ICard | null>(null);

  function addDeck() {
    setIsModalOpen(false);
    return title
      ? setDecks([...data, { deckId: Date.now(), deckTitle: title, cards: [] }])
      : null;
  }
  function addCard() {
    if (front && back && selectedDeck) {
      const newCard = { cardId: Date.now(), front, back, lvl: 0 };
      const updatedDeck = {
        ...selectedDeck,
        cards: [...selectedDeck.cards, newCard],
      };
      setDecks(
        data.map((deck) =>
          deck.deckId === selectedDeck.deckId ? updatedDeck : deck,
        ),
      );
      setSelectedDeck(updatedDeck);
      setIsModalOpen(false);
    }
  }

  function editCard() {
    if (front && back && selectedDeck && editingCard) {
      const updatedCard = { ...editingCard, front, back };
      const updatedDeck = {
        ...selectedDeck,
        cards: selectedDeck.cards.map((card) =>
          card.cardId === editingCard.cardId ? updatedCard : card,
        ),
      };

      setDecks(
        data.map((deck) =>
          deck.deckId === selectedDeck.deckId ? updatedDeck : deck,
        ),
      );
      setSelectedDeck(updatedDeck);
      setIsModalOpen(false);
    }
  }

  function deleteCard(cardId: number) {
    if (selectedDeck) {
      const updatedDeck = {
        ...selectedDeck,
        cards: selectedDeck.cards.filter((card) => card.cardId != cardId),
      };
      setDecks(
        data.map((deck) =>
          deck.deckId === selectedDeck.deckId ? updatedDeck : deck,
        ),
      );
      setSelectedDeck(updatedDeck);
    }
  }

  return (
    <div>
      <>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {selectedDeck ? (
            editingCard ? (
              <>
                <input
                  defaultValue={editingCard.front}
                  onChange={(e) => setFront(e.target.value)}
                  placeholder="Front"
                />
                <input
                  defaultValue={editingCard.back}
                  onChange={(e) => setBack(e.target.value)}
                  placeholder="Back"
                />
                <button onClick={editCard}>Edit card</button>
              </>
            ) : (
              <>
                <input
                  onChange={(e) => setFront(e.target.value)}
                  placeholder="Front"
                />
                <input
                  onChange={(e) => setBack(e.target.value)}
                  placeholder="Back"
                />
                <button onClick={addCard}>Add card</button>
              </>
            )
          ) : (
            <>
              <input onChange={(e) => setTitle(e.target.value)} />
              <button onClick={addDeck}>Add deck</button>
            </>
          )}
        </Modal>
      </>

      <button onClick={() => setIsModalOpen(true)}>+</button>
      {selectedDeck ? (
        //отображение карточек
        <>
          {selectedDeck.cards.map((card) => (
            <CardItem
              key={card.cardId}
              card={card}
              onEdit={() => {
                setIsModalOpen(true);
                setEditingCard(card);
              }}
              onDelete={() => {
                deleteCard(card.cardId);
              }}
            />
          ))}
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
