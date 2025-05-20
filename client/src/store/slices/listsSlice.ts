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
}

const initialState: ListsState = {
  data: [],
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

const listsSlise = createSlice({
  name: "lists",
  initialState,
  reducers: {
    moveTaskBetweenLists(
      state,
      action: PayloadAction<{ activeTask: Task; overTask: Task }>
    ) {
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

export const { moveTaskBetweenLists, moveTaskWithinList, moveTaskToEmptyList } =
  listsSlise.actions;
export default listsSlise.reducer;
