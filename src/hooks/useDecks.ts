import { useEffect, useState } from "react";
import type { IDeck } from "../types";

export function useDecks(){
const [decks,setDecks] = useState<IDeck[]>(()=>{
  const saved = localStorage.getItem("decks");
  return saved ? JSON.parse(saved) : [];
});
useEffect(()=>{
  localStorage.setItem("decks",JSON.stringify(decks));
},[decks]);
 return {decks,setDecks}
}