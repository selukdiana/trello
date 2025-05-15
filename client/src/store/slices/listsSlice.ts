import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";

export interface Task {
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
      id: "1",
      name: "List1",
      tasks: [
        {
          id: "1",
          value:
            "aa hihoih hoi ghghj hgujg gujgjuhuju juhjuhju ujhjkhj hjuuhjhjuu hjhjuh hjhkjh  hjhjkh hjkhjhjh jhjhjh jhjuhjh   j hjjh",
        },
      ],
    },
    {
      id: "2",
      name: "List2",
      tasks: [
        { id: "1", value: "aa hihoih hoi " },
        {
          id: "2",
          value:
            "gygg uuiyui iyuiyh  uiyui yiyo  ioi guigui uhihy iooihoi ihoi oihoi ",
        },
      ],
    },
    { id: "3", name: "List3", tasks: [] },
    { id: "4", name: "List4", tasks: [] },
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
        list.tasks.push({ id: v4(), value: taskDescription });
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
  },
});

export const { addList, deleteList, editList, addTask, editTask, deleteTask } =
  listsSlise.actions;
export default listsSlise.reducer;
