import { useState } from "react";
import { Modal } from "../../components/Modal";
import styles from "./HomePage.module.css";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import {
  addBoard,
  editBoard,
  removeBoard,
} from "../../store/slices/boardsSlice";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

interface FormInputs {
  boardName: string;
}
type IdType = number | null;
const Mode = {
  CREATE_BOARD: 0,
  EDIT_BOARD: 1,
};
let mode = Mode.CREATE_BOARD;
let boardId: IdType = null;

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const boardsArr = useAppSelector((state) => state.boards.data);
  const [isAddBoardModalOpen, setIsAddBoardModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormInputs>({
    defaultValues: {
      boardName: "",
    },
  });
  const onSubmit = (data: FormInputs) => {
    if (mode === Mode.EDIT_BOARD) {
      dispatch(editBoard({ id: boardId, name: data.boardName }));
    } else {
      dispatch(addBoard({ name: data.boardName }));
    }
    setIsAddBoardModalOpen(false);
  };
  const handleDeleteBoard = (id: IdType) => {
    dispatch(removeBoard({ id }));
  };
  const handleEditBoard = (id: IdType) => {
    boardId = id;
    mode = Mode.EDIT_BOARD;
    const board = boardsArr.find((board) => board.id === id);
    reset({ boardName: board?.name });
    setIsAddBoardModalOpen(true);
  };
  const handleCreateBoard = () => {
    mode = Mode.CREATE_BOARD;
    reset({ boardName: "" }); //ne reset()?
    setIsAddBoardModalOpen(true);
  };

  return (
    <section className={styles.home}>
      <div className="container">
        <div className={styles.title}>
          <h2>My Boards</h2>
          <p onClick={() => handleCreateBoard()}>+ Create new board</p>
        </div>
        <div className={styles.content}>
          {boardsArr.map((board) => {
            return (
              <div className={styles.board} key={board.id}>
                <div className={styles.boardHeader}>
                  <h3>{board.name}</h3>
                  <div>
                    <FaEdit
                      onClick={() => {
                        handleEditBoard(board.id);
                      }}
                    />
                    <FaTrash onClick={() => handleDeleteBoard(board.id)} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {isAddBoardModalOpen
        ? createPortal(
            <Modal setIsOpen={setIsAddBoardModalOpen} title="New Board">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  placeholder="Border name"
                  {...register("boardName")}
                  className="modalInput"
                />
                <input type="submit" className="modalBtn" value="OK" />
              </form>
            </Modal>,
            document.body
          )
        : null}
    </section>
  );
};
