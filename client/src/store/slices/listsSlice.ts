import { arrayMove } from "@dnd-kit/sortable";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

export interface Task {
  listId: string;
  id: string;
  value: string;
}
export interface List {
  id: string;
  name: string;
  tasks: Task[];
  boardId: string;
}
interface ListsState {
  data: List[];
  active: Task | null;
  over: Task | List | null;
}

const initialState: ListsState = {
  data: [],
  active: null,
  over: null,
};

export const fetchAllLists = createAsyncThunk(
  "lists/allLists",
  async ({ id }: { id: string }) => {
    const response = await fetch(
      `http://localhost:8080/api/getAllLists?id=${id}`
    );
    const lists: Omit<List, "tasks">[] = await response.json();
    const data = await Promise.all(
      lists.map(async (list) => {
        const response = await fetch(
          `http://localhost:8080/api/getAllTasks?listId=${list.id}`
        );
        const tasks = await response.json();
        return { ...list, tasks };
      })
    );
    return data;
  }
);

export const fetchCreateList = createAsyncThunk(
  "lists/fetchCreateList",
  async (data: { name: string; boardId: string }) => {
    const response = await fetch(`http://localhost:8080/api/createList`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const list: List = await response.json();
    return list;
  }
);

export const fetchUpdateListName = createAsyncThunk(
  "lists/fetchUpdateListName",
  async (data: { id: string; name: string }) => {
    const response = await fetch(`http://localhost:8080/api/updateListName`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const list: { id: string; name: string } = await response.json();
    return list;
  }
);

export const fetchDeleteList = createAsyncThunk(
  "lists/fetchDeleteLists",
  async (data: { id: string }) => {
    const response = await fetch(
      `http://localhost:8080/api/deleteList?id=${data.id}`,
      {
        method: "DELETE",
      }
    );
    const listData: { id: string } = await response.json();
    return listData.id;
  }
);

export const fetchCreateTask = createAsyncThunk(
  "lists/fetchCreateTask",
  async (data: Omit<Task, "id">) => {
    const response = await fetch(`http://localhost:8080/api/createTask`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const task: Task = await response.json();
    return task;
  }
);
export const fetchUpdateTask = createAsyncThunk(
  "lists/fetchUpdateTask",
  async (data: { id: string; value: string }) => {
    const response = await fetch(`http://localhost:8080/api/updateTask`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const task: Task = await response.json();
    return task;
  }
);
export const fetchDeleteTask = createAsyncThunk(
  "lists/fetchDeleteTask",
  async (data: { id: string }) => {
    const response = await fetch(
      `http://localhost:8080/api/deleteTask?id=${data.id}`,
      {
        method: "DELETE",
      }
    );
    const task: Task = await response.json();
    return task;
  }
);

export const fetchListsState = createAsyncThunk(
  "lists/fetchUpdateTask",
  async (data: { activeTask: Task; overTask: Task }) => {
    const { activeTask, overTask } = data;
    const response = await fetch(
      `http://localhost:8080/api/moveTaskWithinList`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activeTask,
          overTask,
        }),
      }
    );
    const status: string = await response.json();
    return status;
  }
);
const listsSlise = createSlice({
  name: "lists",
  initialState,
  reducers: {
    moveWithinList(
      state,
      action: PayloadAction<{
        listId: string;
        activeId: string;
        overId: string;
      }>
    ) {
      const { listId, activeId, overId } = action.payload;
      const listIndex = state.data.findIndex((list) => list.id === listId);
      if (listIndex === -1) return;
      const list = state.data[listIndex];
      const activeIndex = list.tasks.findIndex((task) => task.id === activeId);
      const overIndex = list.tasks.findIndex((task) => task.id === overId);
      if (activeIndex === -1 || overIndex === -1) return;
      const newTasks = arrayMove(list.tasks, activeIndex, overIndex);
      list.tasks = newTasks;
    },
    move(
      state,
      action: PayloadAction<{
        activeListId: string;
        overListId: string;
        activeId: string;
        overId: string;
      }>
    ) {
      const { activeListId, overListId, activeId, overId } = action.payload;
      const activeList = state.data.find((list) => list.id === activeListId);
      const activeTask = activeList?.tasks.find((task) => task.id === activeId);
      if (!activeTask) return;
      activeTask.listId = overListId;
      const newData = state.data.map((list) => {
        if (list.id === activeListId) {
          return {
            ...list,
            tasks: list.tasks.filter((task) => task.id !== activeId),
          };
        }
        if (list.id === overListId) {
          if (overId === overListId) {
            return {
              ...list,
              tasks: [...list.tasks, activeTask],
            };
          }

          const overItemIndex = list.tasks.findIndex(
            (task) => task.id === overId
          );
          if (overItemIndex !== -1) {
            return {
              ...list,
              tasks: [
                ...list.tasks.slice(0, overItemIndex + 1),
                activeTask,
                ...list.tasks.slice(overItemIndex + 1),
              ],
            };
          }
        }
        return list;
      });
      state.data = newData || [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllLists.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchAllLists.rejected, (state) => {
      state.data = [];
    });
    builder.addCase(
      fetchCreateList.fulfilled,
      (state, action: PayloadAction<List>) => {
        state.data.push(action.payload);
      }
    );
    builder.addCase(
      fetchUpdateListName.fulfilled,
      (state, action: PayloadAction<{ id: string; name: string }>) => {
        const { id, name } = action.payload;
        const list = state.data.find((list) => list.id === id);
        if (list) list.name = name;
      }
    );
    builder.addCase(
      fetchDeleteList.fulfilled,
      (state, action: PayloadAction<string>) => {
        const id = action.payload;
        state.data = state.data.filter((list) => list.id !== id);
      }
    );
    builder.addCase(
      fetchCreateTask.fulfilled,
      (state, action: PayloadAction<Task>) => {
        const task = action.payload;
        const list = state.data.find((list) => list.id === task.listId);
        if (list) {
          list.tasks.push(task);
        }
      }
    );
    builder.addCase(
      fetchUpdateTask.fulfilled,
      (state, action: PayloadAction<Task>) => {
        const task = action.payload;
        const list = state.data.find((list) => list.id === task.listId);
        if (list) {
          const taskIndex = list.tasks.findIndex((elem) => elem.id === task.id);
          list.tasks[taskIndex] = task;
        }
      }
    );
    builder.addCase(
      fetchDeleteTask.fulfilled,
      (state, action: PayloadAction<Task>) => {
        const { listId, id } = action.payload;
        const list = state.data.find((list) => list.id === listId);
        if (list) {
          list.tasks = list.tasks.filter((task) => task.id !== id);
        }
      }
    );
  },
});

export const { move, moveWithinList } = listsSlise.actions;
export default listsSlise.reducer;
