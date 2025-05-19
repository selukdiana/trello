import { useSearchParams } from "react-router";
import styles from "./BoardPage.module.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { List } from "../../components/List";
import { useState } from "react";
import {
  addList,
  moveTaskBetweenLists,
  moveTaskToEmptyList,
  moveTaskWithinList,
  type Task as TaskType,
} from "../../store/slices/listsSlice";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";

export const BoardPage = () => {
  const dispatch = useAppDispatch();
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [isAddList, setIsAddList] = useState(false);
  //dispatch(lists by id)
  const listsArr = useAppSelector((state) => state.lists.data);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );
  const handleDragStart = (event: DragStartEvent) => {
    setActiveTask(event.active.id);
  };
  const handleDragEnd = (event: DragEndEvent) => {
    // const { active, over } = event;
    // if (!over) {
    //   setActiveTask(null);
    //   return;
    // }
    // const activeListId = active.data.current?.task.listId;
    // const overListId = over.data.current?.task.listId;
    // if (active.id && over.id && !overListId) {
    //   console.log("empty");
    // }
    // if (!activeListId || !overListId) {
    //   setActiveTask(null);
    //   return;
    // }
    // dispatch(); //na server dnd changes
    // if (activeListId === overListId && active.id !== over.id) {
    //   dispatch(
    //     moveTaskWithinList({
    //       activeTask: active.data.current?.task,
    //       overTask: over.data.current?.task,
    //     })
    //   );
    // }
  };
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    console.log(active);
    console.log(over);
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (
      active.data.current?.type === "task" &&
      over.data.current?.type === "task"
    ) {
      const activeListId = active.data.current?.task.listId;
      const overListId = over.data.current?.task.listId;
      if (!activeListId || !overListId) return;
      if (activeListId === overListId) {
        dispatch(
          moveTaskWithinList({
            activeTask: active.data.current?.task,
            overTask: over.data.current?.task,
          })
        );
      } else {
        dispatch(
          moveTaskBetweenLists({
            activeTask: active.data.current?.task,
            overTask: over.data.current?.task,
          })
        );
      }
      return;
    }
    // if (
    //   active.data.current?.type === "task" &&
    //   over.data.current?.type === "task"
    // ) {
    //   const activeListId = active.data.current?.task.listId;
    //   const overListId = over.data.current?.task.listId;
    //   if (!activeListId || !overListId) return;
    //   if (activeListId === overListId && activeId !== overId) return;
    //   if (activeListId === overListId) return;
    //   dispatch(
    //     moveTaskBetweenLists({
    //       activeTask: active.data.current?.task,
    //       overTask: over.data.current?.task,
    //     })
    //   );
    //   return;
    // }
    if (
      active.data.current?.type === "task" &&
      over.data.current?.type === "list" &&
      over.data.current.list.tasks.length === 0
    ) {
      dispatch(
        moveTaskToEmptyList({
          activeTask: active.data.current.task,
          overList: over.data.current.list,
        })
      );
    }
  };

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      sensors={sensors}
      collisionDetection={closestCorners}
    >
      <div className={styles.board}>
        <div className={styles.content}>
          {listsArr.map((list) => (
            <List list={list} key={list.id} />
          ))}
          {isAddList ? (
            <input
              className={styles.addListInput}
              onBlur={(e) => {
                dispatch(addList(e.target.value));
                setIsAddList(false);
              }}
              autoFocus={true}
            />
          ) : (
            <div
              className={styles.addList}
              onClick={(e) => {
                e.stopPropagation();
                setIsAddList(true);
              }}
            >
              <p>+ Add list</p>
            </div>
          )}
        </div>
      </div>
      {/* {createPortal(
        <DragOverlay>
          {activeTask && <Task task={activeTask}></Task>}
        </DragOverlay>,
        document.body
      )} */}
    </DndContext>
  );
};
