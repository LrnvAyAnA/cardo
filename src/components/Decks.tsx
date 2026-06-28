import React, { useState } from "react";
import type { ICard, IDeck } from "../types";
import Modal from "./Modal";
import { CardItem } from "./CardItem";
import Plus from "../assets/Plus.svg?react";
import MoreInfo from "../assets/MoreInfo.svg?react";
import Back from "../assets/Arrow.svg?react";
import { inputField, butModal } from "../styles";
interface DecksProp {
  data: IDeck[];
  setDecks: React.Dispatch<React.SetStateAction<IDeck[]>>;
  onSelectDeck: (deck: IDeck) => void;
}
function Decks({ data, setDecks, onSelectDeck }: DecksProp) {
  const [title, setTitle] = useState("");
  const [selectedDeck, setSelectedDeck] = useState<IDeck | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [editingCard, setEditingCard] = useState<ICard | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState<number | null>(null);

  function addDeck() {
    setIsModalOpen(false);
    return title
      ? setDecks([...data, { deckId: Date.now(), deckTitle: title, cards: [] }])
      : null;
  }
  function DeleteDeck(deckId: number) {
    if (deckId) {
      setDecks(data.filter((deck) => deck.deckId !== deckId));
    }
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
      setEditingCard(null);
      setFront("");
      setBack("");
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
    <div className="flex flex-col">
      <>
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingCard(null);
            setFront("");
            setBack("");
          }}
        >
          {selectedDeck ? (
            editingCard ? (
              <div className="flex flex-col gap-6 items-center">
                <input
                  defaultValue={editingCard.front}
                  onChange={(e) => setFront(e.target.value)}
                  placeholder="Front"
                  className={inputField}
                />
                <input
                  defaultValue={editingCard.back}
                  onChange={(e) => setBack(e.target.value)}
                  placeholder="Back"
                  className={inputField}
                />
                <button className={butModal} onClick={editCard}>
                  Edit card
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-6 items-center">
                <input
                  className={inputField}
                  onChange={(e) => setFront(e.target.value)}
                  placeholder="Front"
                />
                <input
                  className={inputField}
                  onChange={(e) => setBack(e.target.value)}
                  placeholder="Back"
                />
                <button className={butModal} onClick={addCard}>
                  Add card
                </button>
              </div>
            )
          ) : (
            <div className="flex flex-col gap-6 items-center">
              <input
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className={inputField}
              />
              <button className={butModal} onClick={addDeck}>
                Add deck
              </button>
            </div>
          )}
        </Modal>
      </>

      <button
        onClick={() => setIsModalOpen(true)}
        className="self-center mt-5 w-12 h-9 bg-black/25 rounded-[10px] cursor-pointer flex items-center justify-center hover:bg-black/50"
      >
        <Plus className="w-3 h-3" />
      </button>
      {selectedDeck ? (
        //отображение карточек
        <>
          <input
            placeholder="Search..."
            className="pl-4 mt-4 bg-linear-90 from-[#9077FF]/10 to-[#DAD2FC]/10 border border-white rounded-[20px] text-white text-lg font-bold w-full h-10 focus:outline-none"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="w-74 h-12 rounded-[10px] border border-white/50 cursor-pointer flex justify-center items-center bg-linear-30 from-[#9077FF]/30 to-[#DAD2FC]/30 mt-3 mb-2 text-white font-bold text-lg">
            {selectedDeck.deckTitle}
          </div>
          <div className="flex flex-col gap-1">
            {selectedDeck.cards
              .filter(
                (card) =>
                  card.front.includes(searchQuery) ||
                  card.back.includes(searchQuery),
              )
              .map((card) => (
                <CardItem
                  key={card.cardId}
                  card={card}
                  onEdit={() => {
                    setIsModalOpen(true);
                    setFront(card.front);
                    setBack(card.back);
                    setEditingCard(card);
                  }}
                  onDelete={() => {
                    deleteCard(card.cardId);
                  }}
                />
              ))}
          </div>

          <button
            className="absolute top-15 left-15 w-14 h-12 bg-linear-30 from-[#9077FF]/30 rounded-[10px] flex items-center justify-center to-[#DAD2FC]/30 cursor-pointer"
            onClick={() => setSelectedDeck(null)}
          >
            <Back className="w-8 h-8" />
          </button>
        </>
      ) : (
        //отображение колод
        <div className="grid grid-cols-2 gap-x-20 gap-y-8">
          {data.map((deck) => (
            <div
              onClick={() => onSelectDeck(deck)}
              key={deck.deckId}
              className="mt-5 relative w-40 h-29 bg-linear-60 from-[#B6A7F8]/30 to-[#7C5EFF]/30 flex flex-col justify-center items-center border rounded-[10px] border-white/50 text-white cursor-pointer"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(menuOpen === deck.deckId ? null : deck.deckId);
                  // setSelectedDeck(deck);
                }}
                className="absolute top-2 right-2 bg-[#856EB1] rounded-[5px] h-5 w-5 flex justify-center items-center cursor-pointer hover:bg-[#674c99]"
              >
                <MoreInfo className="w-3 h-3" />
              </button>
              {menuOpen === deck.deckId && (
                <div className="absolute bg-black/30 top-8 left-32 backdrop-blur-sm text-[12px] rounded-[5px] w-25 flex flex-col justify-center text-white">
                  <button
                    className="hover:bg-black/50 rounded-t-[5px] w-full cursor-pointer text-[10px] border-b border-white/30"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDeck(deck);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="hover:bg-black/50 rounded-b-[5px] w-full cursor-pointer text-[10px]"
                    onClick={(e) => {
                      e.stopPropagation();
                      DeleteDeck(deck.deckId);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
              {deck.deckTitle}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Decks;
