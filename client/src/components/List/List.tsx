import {
  addTask,
  deleteTask,
  editTask,
  fetchDeleteList,
  fetchUpdateListName,
  type List as ListInterface,
} from "../../store/slices/listsSlice";
import { Task } from "../Task";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "../Modal";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { useAppDispatch } from "../../store/hooks";
import { RxCross2 } from "react-icons/rx";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  dropArea,
  list as listStyles,
  title,
  addTask as addTaskStyles,
  deleteList as deleteListStyles,
} from "./List.css";

interface ListProps {
  list: ListInterface;
}
interface FormInputs {
  taskDescription: string;
}
let taskId: null | string = null;

export const List = ({ list }: ListProps) => {
  const { setNodeRef } = useDroppable({
    id: list.id,
    data: {
      type: "list",
      list: list,
    },
  });
  const style = {};
  const tasks = list.tasks;
  const dispatch = useAppDispatch();
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isChangeHeader, setIsChangeHeader] = useState(false);
  const [listName, setListName] = useState(list.name);
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
    dispatch(fetchDeleteList({ id: list.id }));
  };
  const onSubmit = (data: FormInputs) => {
    if (taskId !== null) {
      dispatch(
        editTask({
          listId: list.id,
          task: { id: taskId, value: data.taskDescription, listId: list.id },
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
    <div className={listStyles} style={style} ref={setNodeRef}>
      <div className={title}>
        {isChangeHeader ? (
          <input
            className="modalInput"
            onBlur={() => {
              setIsChangeHeader(false);
              dispatch(fetchUpdateListName({ id: list.id, name: listName }));
            }}
            onChange={(e) => setListName(e.target.value)}
            autoFocus={true}
            value={listName}
          />
        ) : (
          <h4
            onClick={() => {
              setIsChangeHeader(true);
            }}
          >
            {listName}
          </h4>
        )}
      </div>
      <div>
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              handleEditTaskClick={handleEditTaskClick}
              handleDeleteTaskClick={handleDeleteTaskClick}
            />
          ))}
        </SortableContext>
        {tasks.length === 0 && (
          <div className={dropArea}>
            <span>Drop here!</span>
          </div>
        )}
        <p
          className={addTaskStyles}
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
        className={deleteListStyles}
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
