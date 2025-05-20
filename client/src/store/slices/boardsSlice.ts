import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

interface Board {
  id: string;
  name: string;
}
interface BoardsState {
  data: Board[];
}
const initialState: BoardsState = {
  data: [],
};

export const fetchAllBoards = createAsyncThunk("boards/allBoards", async () => {
  const response = await fetch("http://localhost:8080/api/getAllBoards");
  const data = await response.json();
  return data;
});

export const fetchCreateBoard = createAsyncThunk(
  "boards/fetchCreateBoard",
  async (data: { name: string }, { dispatch }) => {
    const response = await fetch(`http://localhost:8080/api/createBoard`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const board = await response.json();
    dispatch(createBoard(board));
    return board;
  }
);

export const fetchUpdateBoard = createAsyncThunk(
  "boards/fetchUpdateBoard",
  async (data: Board, { dispatch }) => {
    const response = await fetch(`http://localhost:8080/api/updateBoard`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const board = await response.json();
    dispatch(updateBoard(board));
    return board;
  }
);

export const fetchDeleteBoard = createAsyncThunk(
  "boards/fetchDeleteBoard",
  async (data: { id: string }, { dispatch }) => {
    const response = await fetch(
      `http://localhost:8080/api/deleteBoard/?id=${data.id}`,
      {
        method: "DELETE",
      }
    );
    const board = await response.json();
    dispatch(deleteBoard(board));
    return board;
  }
);

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    createBoard(state, action: PayloadAction<Board>) {
      const { id, name } = action.payload;
      state.data.push({
        id,
        name,
      });
    },
    updateBoard(state, action: PayloadAction<Board>) {
      const { id, name } = action.payload;
      const index = state.data.findIndex((board) => board.id === id);
      state.data[index] = { id, name };
    },
    deleteBoard(state, action: PayloadAction<Board>) {
      const id = action.payload.id;
      state.data = state.data.filter((board) => board.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllBoards.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchAllBoards.rejected, (state) => {
      state.data = [];
    });
  },
});

export const { createBoard, updateBoard, deleteBoard } = boardsSlice.actions;
export default boardsSlice.reducer;
