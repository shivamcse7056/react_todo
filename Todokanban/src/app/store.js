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
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  } catch {
    console.log("Failed to save state");
  }
};

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState({
    tasks: store.getState().tasks,
  });
});