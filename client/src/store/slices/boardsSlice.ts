import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";

interface Board {
  id: string;
  name: string;
}
interface BoardsState {
  data: Board[];
}
const initialState: BoardsState = {
  data: [
    {
      id: v4(),
      name: "Board 1",
    },
    {
      id: v4(),
      name: "Board 2",
    },
    {
      id: v4(),
      name: "Board 3",
    },
    {
      id: v4(),
      name: "Board 4",
    },
    {
      id: v4(),
      name: "Board 5",
    },
  ],
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addBoard(state, action: PayloadAction<Pick<Board, "name">>) {
      const boardName = action.payload.name;
      state.data.push({
        id: v4(),
        name: boardName,
      });
    },
    editBoard(state, action: PayloadAction<Board>) {
      const { id, name } = action.payload;
      const index = state.data.findIndex((board) => board.id === id);
      state.data[index] = { id, name };
    },
    removeBoard(state, action: PayloadAction<Pick<Board, "id">>) {
      const id = action.payload.id;
      state.data = state.data.filter((board) => board.id !== id);
    },
  },
});

export const { addBoard, removeBoard, editBoard } = boardsSlice.actions;
export default boardsSlice.reducer;
