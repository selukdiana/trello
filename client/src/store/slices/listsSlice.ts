import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: number;
  value: string;
}
export interface List {
  id: number;
  name: string;
  tasks: Task[];
}
interface ListsState {
  data: List[];
}
interface EditTaskPayload {
  listId: number;
  task: Task;
}
interface DeleteTaskPayload {
  listId: number;
  taskId: number;
}
const initialState: ListsState = {
  data: [
    {
      id: 1,
      name: "List1",
      tasks: [
        {
          id: 1,
          value:
            "aa hihoih hoi ghghj hgujg gujgjuhuju juhjuhju ujhjkhj hjuuhjhjuu hjhjuh hjhkjh  hjhjkh hjkhjhjh jhjhjh jhjuhjh   j hjjh",
        },
      ],
    },
    {
      id: 2,
      name: "List2",
      tasks: [
        { id: 1, value: "aa hihoih hoi " },
        {
          id: 2,
          value:
            "gygg uuiyui iyuiyh  uiyui yiyo  ioi guigui uhihy iooihoi ihoi oihoi ",
        },
      ],
    },
    { id: 3, name: "List3", tasks: [] },
    { id: 4, name: "List4", tasks: [] },
  ],
};

const listsSlise = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addList(state, action) {},
    removeList(state, action) {},
    editList(state, action) {},
    addTask(
      state,
      action: PayloadAction<{ listId: number; taskDescription: string }>
    ) {
      const { listId, taskDescription } = action.payload;
      const list = state.data.find((list) => list.id === listId);
      list?.tasks.push({ id: list.tasks.length + 1, value: taskDescription });
    },
    editTask(state, action: PayloadAction<EditTaskPayload>) {
      const { listId, task } = action.payload;
      const taskId = task.id;
      const list = state.data.find((list) => list.id === listId);
      const taskIndex = list?.tasks.findIndex((elem) => elem.id === taskId);
      if (list && list.tasks.length && typeof taskIndex === "number")
        list.tasks[taskIndex] = task;
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

export const { addList, removeList, editList, addTask, editTask, deleteTask } =
  listsSlise.actions;
export default listsSlise.reducer;
