import { arrayMove } from "@dnd-kit/sortable";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";

export interface Task {
  listId: string;
  id: string;
  value: string;
}
export interface List {
  id: string;
  name: string;
  tasks: Task[];
}
interface ListsState {
  data: List[];
}
interface EditTaskPayload {
  listId: string;
  task: Task;
}
interface DeleteTaskPayload {
  listId: string;
  taskId: string;
}
interface EditListPayload {
  listId: string;
  name: string;
}
const initialState: ListsState = {
  data: [
    {
      id: "rrtgtgt",
      name: "List1",
      tasks: [
        {
          listId: "rrtgtgt",
          id: v4(),
          value:
            "aa hihoih hoi ghghj hgujg gujgjuhuju juhjuhju ujhjkhj hjuuhjhjuu hjhjuh hjhkjh  hjhjkh hjkhjhjh jhjhjh jhjuhjh   j hjjh",
        },
      ],
    },
    {
      id: "gyhggui",
      name: "List2",
      tasks: [
        { listId: "gyhggui", id: v4(), value: "aa hihoih hoi " },
        {
          listId: "gyhggui",
          id: v4(),
          value:
            "gygg uuiyui iyuiyh  uiyui yiyo  ioi guigui uhihy iooihoi ihoi oihoi ",
        },
      ],
    },
    { id: v4(), name: "List3", tasks: [] },
    { id: v4(), name: "List4", tasks: [] },
  ],
};

const listsSlise = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addList(state, action: PayloadAction<string>) {
      state.data.push({
        id: v4(),
        name: action.payload,
        tasks: [],
      });
    },
    deleteList(state, action: PayloadAction<string>) {
      state.data = state.data.filter((list) => list.id !== action.payload);
    },
    editList(state, action: PayloadAction<EditListPayload>) {
      const { listId, name } = action.payload;
      const list = state.data.find((list) => list.id === listId);
      if (list) list.name = name;
    },
    addTask(
      state,
      action: PayloadAction<{ listId: string; taskDescription: string }>
    ) {
      const { listId, taskDescription } = action.payload;
      const list = state.data.find((list) => list.id === listId);
      if (list) {
        list.tasks.push({ listId: list.id, id: v4(), value: taskDescription });
      }
    },
    editTask(state, action: PayloadAction<EditTaskPayload>) {
      const { listId, task } = action.payload;
      const taskId = task.id;
      const list = state.data.find((list) => list.id === listId);
      if (list) {
        const taskIndex = list.tasks.findIndex((elem) => elem.id === taskId);
        list.tasks[taskIndex] = task;
      }
    },
    deleteTask(state, action: PayloadAction<DeleteTaskPayload>) {
      const { listId, taskId } = action.payload;
      const list = state.data.find((list) => list.id === listId);
      if (list) {
        list.tasks = list.tasks.filter((task) => task.id !== taskId);
      }
    },
    moveTaskBetweenLists(
      state,
      action: PayloadAction<{ activeTask: Task; overTask: Task }>
    ) {
      // debugger;
      const { activeTask, overTask } = action.payload;
      if (!activeTask || !overTask) return;
      const activeListId = activeTask.listId;
      const overListId = overTask.listId;

      const activeList = state.data.find((list) => list.id === activeListId);
      if (!activeList) return;
      const active = activeList.tasks.find((task) => task.id === activeTask.id);
      if (!active) return;
      active.listId = overListId;
      activeList.tasks = activeList.tasks.filter(
        (task) => task.id !== active.id
      );

      const overList = state.data.find((list) => list.id === overListId);
      if (!overList) return;

      const overIndex = overList.tasks.findIndex(
        (task) => task.id === overTask.id
      );

      if (overIndex == -1) return;

      overList.tasks.splice(overIndex, 0, active);
    },

    moveTaskWithinList(
      state,
      action: PayloadAction<{ activeTask: Task; overTask: Task }>
    ) {
      const { activeTask, overTask } = action.payload;
      const listId = activeTask.listId;
      const list = state.data.find((list) => list.id === listId);
      if (!list) return;
      const activeIndex = list.tasks.findIndex(
        (task) => task.id === activeTask.id
      );
      const overIndex = list.tasks.findIndex((task) => task.id === overTask.id);
      if (activeIndex === -1 || overIndex === -1) return;

      const newTasks = arrayMove(list.tasks, activeIndex, overIndex);
      list.tasks = newTasks;
    },

    moveTaskToEmptyList(
      state,
      action: PayloadAction<{ activeTask: Task; overList: List }>
    ) {
      const { activeTask, overList } = action.payload;
      const activeList = state.data.find(
        (list) => list.id === activeTask.listId
      );
      if (!activeList) return;
      activeList.tasks = activeList.tasks.filter(
        (task) => task.id !== activeTask.id
      );

      const newTask: Task = { ...activeTask, listId: overList.id };
      const targrtList = state.data.find((list) => list.id === overList.id);
      if (!targrtList) return;
      targrtList.tasks.push(newTask);
    },
  },
});

export const {
  addList,
  deleteList,
  editList,
  addTask,
  editTask,
  deleteTask,
  moveTaskBetweenLists,
  moveTaskWithinList,
  moveTaskToEmptyList,
} = listsSlise.actions;
export default listsSlise.reducer;
