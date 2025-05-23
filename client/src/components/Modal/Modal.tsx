import type React from "react";
import { body, content, header, modal, wrapper } from "./Modal.css";

interface ModalProps {
  title: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export const Modal = ({ title, isOpen, setIsOpen, children }: ModalProps) => {
  return (
    isOpen && (
      <div className={modal}>
        <div className={wrapper} onClick={() => setIsOpen(false)}>
          <div className={content} onClick={(e) => e.stopPropagation()}>
            <div className={header}>
              <h3>{title}</h3>
              <span
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                x
              </span>
            </div>
            <div className={body}>{children}</div>
          </div>
        </div>
      </div>
    )
  );
};
