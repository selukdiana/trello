import type { Task as TaskInterface } from "../../store/slices/listsSlice";
import { RxCross2 } from "react-icons/rx";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import classNames from "classnames";
import { draggingTask, task as taskStyles, trash } from "./Task.css";

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

  return (
    <p
      key={task.id}
      className={isDragging ? classNames(draggingTask, taskStyles) : taskStyles}
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
        className={trash}
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
