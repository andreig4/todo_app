import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../slices/themeSlice";
import todosReducer from "../slices/todosSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    todos: todosReducer,
  },
});
