import type { Task as TaskInterface } from "../../store/slices/listsSlice";
import { RxCross2 } from "react-icons/rx";
import styles from "./Task.module.css";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import classNames from "classnames";

interface TaskProps {
  task: TaskInterface;
  handleEditTaskClick: (id: string) => void;
  handleDeleteTaskClick: (id: string) => void;
}
export const Task = ({
  task,
  handleEditTaskClick,
  handleDeleteTaskClick,
}: TaskProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "task",
      task,
    },
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // if (isDragging) {
  //   return (
  //     <p
  //       ref={setNodeRef}
  //       // className={styles.task}
  //       style={{
  //         color: "transparent",
  //         opacity: 0.1,
  //         backgroundColor: "black",
  //         position: "static",
  //         marginBottom: "10px",
  //         padding: "10px",
  //         paddingTop: "25px",
  //         borderRadius: "10px",
  //         display: "block",
  //         width: "100%",
  //         height: "auto",
  //       }}
  //     >
  //       {task.value}
  //     </p>
  //   );
  // }

  return (
    <p
      key={task.id}
      className={
        isDragging ? classNames(styles.draggingTask, styles.task) : styles.task
      }
      onClick={(e) => {
        e.stopPropagation();
        handleEditTaskClick(task.id);
      }}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
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
