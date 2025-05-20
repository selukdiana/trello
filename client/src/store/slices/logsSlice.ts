import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

interface LogsState {
  data: { id: string; value: string }[];
}
const initialState: LogsState = {
  data: [],
};
export const fetchLogs = createAsyncThunk("logs/fetchLogs", async () => {
  const response = await fetch("http://localhost:8080/api/logs");
  const data = await response.json();
  return data;
});

const logsSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchLogs.fulfilled,
      (state, action: PayloadAction<{ id: string; value: string }[]>) => {
        state.data = action.payload;
      }
    );
  },
});

export default logsSlice.reducer;
