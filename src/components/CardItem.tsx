import type { ICard } from "../types";

type Props = {
  card: ICard;
  onEdit: () => void;
  onDelete: () => void;
};

export const CardItem = ({ card, onEdit, onDelete }: Props) => {
  return (
    <div onClick={onEdit}>
      {card.front}
      <button onClick={onDelete}>-</button>
    </div>
  );
};
