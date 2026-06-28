import React from "react";
import Close from "../assets/Close.svg?react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div
      className="z-50 fixed inset-0 flex items-center justify-center bg-black/30"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="backdrop-blur-sm bg-linear-30 from-[#9077FF]/30 to-[#DAD2FC]/30 w-90 h-60 shadow-lg p-6 rounded-xl flex flex-col justify-center items-center relative"
      >
        <button
          className="w-5 h-5 bg-[#856EB1]/30 absolute top-3 right-3 rounded-[5px] flex justify-center items-center hover:bg-[#674c99]"
          onClick={onClose}
        >
          <Close className="w-3 h-3 cursor-pointer" />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
