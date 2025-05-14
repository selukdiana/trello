import type React from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  title: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export const Modal = ({ title, setIsOpen, children }: ModalProps) => {
  return (
    <div className={styles.modal}>
      <div className={styles.wrapper} onClick={() => setIsOpen(false)}>
        <div className={styles.content} onClick={(e) => e.stopPropagation()}>
          <div className={styles.header}>
            <h3>{title}</h3>
            <span
              onClick={() => {
                setIsOpen(false);
              }}
            >
              x
            </span>
          </div>
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </div>
  );
};
