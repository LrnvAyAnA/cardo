
 export interface IDeck{
    deckId: number,
    deckTitle: string,
    cards: ICard[]
  }
 export interface ICard{
    cardId: number,
    front: string,
    back: string,
    lvl: number
  }