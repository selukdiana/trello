import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "./slices/boardsSlice";
import listsReducer from "./slices/listsSlice";

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    lists: listsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
