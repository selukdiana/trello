import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "./slices/boardsSlice";
import listsReducer from "./slices/listsSlice";
import logsReducer from "./slices/logsSlice";

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    lists: listsReducer,
    logs: logsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
