import type { Task as TaskInterface } from "../../store/slices/listsSlice";
import { RxCross2 } from "react-icons/rx";
import styles from "./Task.module.css";

interface TaskProps {
  task: TaskInterface;
  handleEditTaskClick: (id: number) => void;
  handleDeleteTaskClick: (id: number) => void;
}
export const Task = ({
  task,
  handleEditTaskClick,
  handleDeleteTaskClick,
}: TaskProps) => {
  return (
    <p
      key={task.id}
      className={styles.task}
      onClick={(e) => {
        e.stopPropagation();
        handleEditTaskClick(task.id);
      }}
    >
      {task.value}
      <span
        className={styles.trash}
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteTaskClick(task.id);
        }}
      >
        <RxCross2 />
      </span>
    </p>
  );
};
