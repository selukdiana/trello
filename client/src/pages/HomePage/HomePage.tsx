import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router";
import {
  content,
  home,
  title,
  board as boardStyles,
  boardHeader,
} from "./HomePage.css";
import {
  fetchAllBoards,
  fetchCreateBoard,
  fetchDeleteBoard,
  fetchUpdateBoard,
} from "../../store/slices/boardsSlice";

interface FormInputs {
  boardName: string;
}
let boardId: string | null = null;

export const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const boardsArr = useAppSelector((state) => state.boards.data);
  const [isAddBoardModalOpen, setIsAddBoardModalOpen] = useState(false);
  const { register, handleSubmit, reset, getValues } = useForm<FormInputs>({
    defaultValues: {
      boardName: "",
    },
  });

  const onSubmit = (data: FormInputs) => {
    if (boardId !== null) {
      dispatch(fetchUpdateBoard({ id: boardId, name: data.boardName }));
    } else {
      dispatch(fetchCreateBoard({ name: data.boardName }));
    }
    setIsAddBoardModalOpen(false);
  };

  const handleDeleteBoard = (id: string) => {
    dispatch(fetchDeleteBoard({ id }));
  };

  const handleEditBoard = (id: string) => {
    boardId = id;
    const board = boardsArr.find((board) => board.id === id);
    if (board) {
      reset({ boardName: board.name });
    }
    setIsAddBoardModalOpen(true);
  };

  const handleCreateBoard = () => {
    boardId = null;
    reset({ boardName: "" });
    setIsAddBoardModalOpen(true);
  };

  const handleBoardClick = (id: string) => {
    navigate(`/board?id=${id}`);
  };

  useEffect(() => {
    dispatch(fetchAllBoards());
  }, [dispatch]);

  return (
    <section className={home}>
      <div className="container">
        <div className={title}>
          <h2>My Boards</h2>
          <p
            onClick={(e) => {
              e.stopPropagation();
              handleCreateBoard();
            }}
          >
            + Create new board
          </p>
        </div>
        <div className={content}>
          {boardsArr.map((board) => {
            return (
              <div
                className={boardStyles}
                key={board.id}
                onClick={() => handleBoardClick(board.id)}
              >
                <div className={boardHeader}>
                  <h4>{board.name}</h4>
                  <div>
                    <FaEdit
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditBoard(board.id);
                      }}
                    />
                    <FaTrash
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteBoard(board.id);
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {createPortal(
        <Modal
          isOpen={isAddBoardModalOpen}
          setIsOpen={setIsAddBoardModalOpen}
          title="New Board"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Border name"
              {...register("boardName")}
              className="modalInput"
              autoFocus={true}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSubmit(getValues());
                }
              }}
            />
            <input type="submit" className="modalBtn" value="OK" />
          </form>
        </Modal>,
        document.body
      )}
    </section>
  );
};
