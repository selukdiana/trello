import { useSearchParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { List } from "../../components/List";
import { useEffect, useState } from "react";
import {
  fetchAllLists,
  fetchCreateList,
  fetchListsState,
  moveBetweenLists,
  moveWithinList,
} from "../../store/slices/listsSlice";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import {
  addListInput,
  content,
  addList as addListStyles,
} from "./BoardPage.css";

export const BoardPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") as string;
  const [isAddList, setIsAddList] = useState(false);
  const listsArr = useAppSelector((state) => state.lists.data);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = () => {};

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeListId = findListId(active.id);
    const overListId = findListId(over.id);
    if (!activeListId || !overListId) return;

    if (activeListId === overListId && active.id !== over.id) {
      dispatch(
        moveWithinList({
          activeTask: active.data.current?.task,
          overTask: over.data.current?.task,
        })
      );
    }
    dispatch(
      fetchListsState({
        activeTask: active.data.current?.task,
        overTask: over.data.current?.task,
      })
    );
  };

  const findListId = (id: UniqueIdentifier) => {
    if (listsArr.some((list) => list.id === id)) {
      return id;
    }
    return listsArr.find((list) => list.tasks.some((task) => task.id === id))
      ?.id;
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeListId = findListId(active.id);
    const overListId = findListId(over.id);

    if (!activeListId || !overListId) return;
    if (activeListId === overListId) return;

    dispatch(
      moveBetweenLists({
        activeListId: activeListId as string,
        overListId: overListId as string,
        activeId: active?.id as string,
        overId: over?.id as string,
      })
    );
  };

  useEffect(() => {
    dispatch(fetchAllLists({ id }));
  }, [dispatch, id]);

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      sensors={sensors}
      collisionDetection={closestCorners}
    >
      <div>
        <div className={content}>
          {listsArr.map((list) => (
            <List list={list} key={list.id} />
          ))}
          {isAddList ? (
            <input
              className={addListInput}
              onBlur={(e) => {
                dispatch(
                  fetchCreateList({ name: e.currentTarget.value, boardId: id })
                );
                setIsAddList(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  dispatch(
                    fetchCreateList({
                      name: e.currentTarget.value,
                      boardId: id,
                    })
                  );
                  setIsAddList(false);
                }
              }}
              autoFocus={true}
            />
          ) : (
            <div
              className={addListStyles}
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
    </DndContext>
  );
};
