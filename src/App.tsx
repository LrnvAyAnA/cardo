import { useState } from "react";
import "./App.css";
import Study from "./components/Study";
import Decks from "./components/Decks";
import { useDecks } from "./hooks/useDecks";
import type { IDeck } from "./types";

function App() {
  const [curTab, setTab] = useState("study");
  const [activeDeckId,setActiveDeckId] = useState<number| null>(null);
  const { decks, setDecks } = useDecks();
  const activeDeck = decks.find(deck => deck.deckId === activeDeckId);
  const activeTab =
    "bg-white/50 rounded-[10px] flex items-center justify-center";
  return (
    <div className="bg-linear-to-br from-[#42009F] via-slate-900 to-[#040009] min-h-screen justify-items-center">
      <div className="mt-15 font-medium text-white w-68 h-10 bg-linear-270 from-[#9077FF]/30 to-[#DAD2FC]/30 rounded-[10px] border border-white/50 grid  grid-cols-2">
        <button
          className={curTab === "study" ? activeTab : ""}
          onClick={() => setTab("study")}
        >
          Study
        </button>
        <button
          className={curTab === "study" ? "" : activeTab}
          onClick={() => setTab("decks")}
        >
          Decks
        </button>
      </div>
      {curTab == "study" ? ( activeDeck != null ? 
        (<Study activeDeck={activeDeck}/>):(<div className="mt-30">Select a deck</div>)
      ) : (
        <Decks data={decks} setDecks={setDecks} onSelectDeck={(deck) => { setActiveDeckId(deck.deckId); setTab("study"); }}/>
      )}
    </div>
  );
}

export default App;
