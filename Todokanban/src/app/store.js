import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/tasks/taskSlice";

const loadState = () => {
  try {
    const data = localStorage.getItem("tasks");
    return data ? JSON.parse(data) : undefined;
  } catch {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem("tasks", JSON.stringify(state));
  } catch {
    console.error("Failed to save state");
  }
};

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  preloadedState: {
    tasks: loadState() || { byId: {}, allIds: [] },
  },
});

store.subscribe(() => {
  saveState(store.getState().tasks);
});