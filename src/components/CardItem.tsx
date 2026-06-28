import type { ICard } from "../types";
import Delete from "../assets/Delete.svg?react";

type Props = {
  card: ICard;
  onEdit: () => void;
  onDelete: () => void;
};

export const CardItem = ({ card, onEdit, onDelete }: Props) => {
  return (
    <div
      className="text-white w-74 h-5 rounded-[10px] border border-white/50 cursor-pointer flex justify-between items-center p-5 bg-linear-30 from-[#9077FF]/30 to-[#DAD2FC]/30"
      onClick={onEdit}
    >
      {card.front}
      <button
        className="cursor-pointer text-white/50 hover:text-white"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <Delete className="w-5 h-5" />
      </button>
    </div>
  );
};
