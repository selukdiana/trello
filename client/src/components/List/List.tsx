import {
  addTask,
  deleteList,
  deleteTask,
  editList,
  editTask,
  type List as ListInterface,
} from "../../store/slices/listsSlice";
import styles from "./List.module.css";
import { Task } from "../Task";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "../Modal";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { useAppDispatch } from "../../store/hooks";
import { RxCross2 } from "react-icons/rx";

interface ListProps {
  list: ListInterface;
}
interface FormInputs {
  taskDescription: string;
}
let taskId: null | string = null;

export const List = ({ list }: ListProps) => {
  const tasks = list.tasks;
  const dispatch = useAppDispatch();
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isChangeHeader, setIsChangeHeader] = useState(false);
  const { handleSubmit, register, reset } = useForm<FormInputs>({
    defaultValues: {
      taskDescription: "",
    },
  });
  const handleEditTaskClick = (id: string) => {
    taskId = id;
    const task = tasks.find((task) => task.id === id);
    reset({
      taskDescription: task?.value,
    });
    setIsAddTaskModalOpen(true);
  };

  const handleDeleteTaskClick = (id: string) => {
    dispatch(deleteTask({ listId: list.id, taskId: id }));
  };

  const handleAddTaskClick = () => {
    taskId = null;
    reset({
      taskDescription: "",
    });
    setIsAddTaskModalOpen(true);
  };
  const handleDeleteListClick = () => {
    dispatch(deleteList(list.id));
  };
  const onSubmit = (data: FormInputs) => {
    if (taskId !== null) {
      dispatch(
        editTask({
          listId: list.id,
          task: { id: taskId, value: data.taskDescription },
        })
      );
    } else {
      dispatch(
        addTask({ listId: list.id, taskDescription: data.taskDescription })
      );
    }
    setIsAddTaskModalOpen(false);
  };

  return (
    <div className={styles.list}>
      <div className={styles.title}>
        {isChangeHeader ? (
          <input
            className="modalInput"
            onBlur={() => setIsChangeHeader(false)}
            onChange={(e) =>
              dispatch(editList({ listId: list.id, name: e.target.value }))
            }
            autoFocus={true}
            value={list.name}
          />
        ) : (
          <h4
            onClick={() => {
              setIsChangeHeader(true);
            }}
          >
            {list.name}
          </h4>
        )}
      </div>
      <div className={styles.listContent}>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            handleEditTaskClick={handleEditTaskClick}
            handleDeleteTaskClick={handleDeleteTaskClick}
          />
        ))}
        <p
          className={styles.addTask}
          onClick={(e) => {
            e.stopPropagation();
            handleAddTaskClick();
          }}
        >
          + Add task
        </p>
      </div>
      <span
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteListClick();
        }}
        className={styles.deleteList}
      >
        <RxCross2 />
      </span>
      {isAddTaskModalOpen
        ? createPortal(
            <Modal setIsOpen={setIsAddTaskModalOpen} title="New Task">
              <form onSubmit={handleSubmit(onSubmit)}>
                <textarea
                  placeholder="Task"
                  {...register("taskDescription")}
                  className={classNames("modalInput", "textareaInput")}
                />
                <input type="submit" className="modalBtn" value="OK" />
              </form>
            </Modal>,
            document.body
          )
        : null}
    </div>
  );
};
