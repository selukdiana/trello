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
  async (data: { name: string }) => {
    const response = await fetch(`http://localhost:8080/api/createBoard`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const board = await response.json();
    return board;
  }
);

export const fetchUpdateBoard = createAsyncThunk(
  "boards/fetchUpdateBoard",
  async (data: Board) => {
    const response = await fetch(`http://localhost:8080/api/updateBoard`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const board = await response.json();
    return board;
  }
);

export const fetchDeleteBoard = createAsyncThunk(
  "boards/fetchDeleteBoard",
  async (data: { id: string }) => {
    const response = await fetch(
      `http://localhost:8080/api/deleteBoard/?id=${data.id}`,
      {
        method: "DELETE",
      }
    );
    const board = await response.json();
    return board;
  }
);

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllBoards.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchAllBoards.rejected, (state) => {
      state.data = [];
    });
    builder.addCase(
      fetchCreateBoard.fulfilled,
      (state, action: PayloadAction<Board>) => {
        state.data.push(action.payload);
      }
    );
    builder.addCase(
      fetchUpdateBoard.fulfilled,
      (state, action: PayloadAction<Board>) => {
        const { id, name } = action.payload;
        const index = state.data.findIndex((board) => board.id === id);
        state.data[index] = { id, name };
      }
    );
    builder.addCase(fetchDeleteBoard.fulfilled, (state, action) => {
      const id = action.payload.id;
      state.data = state.data.filter((board) => board.id !== id);
    });
  },
});

export default boardsSlice.reducer;
