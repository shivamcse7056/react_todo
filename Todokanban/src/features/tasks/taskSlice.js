import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  byId: {},
  allIds: [],
  editingTaskId: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        const task = action.payload;
        state.byId[task.id] = task;
        state.allIds.push(task.id);
      },
      prepare(title) {
        return {
          payload: {
            id: nanoid(),
            title,
            status: "todo",
          },
        };
      },
    },

    deleteTask(state, action) {
      const id = action.payload;
      delete state.byId[id];
      state.allIds = state.allIds.filter(t => t !== id);
    },

    setEditingTask(state, action) {
        state.editingTaskId = action.payload;
    },

    clearEditingTask(state) {
        state.editingTaskId = null;
    },

    editTask(state, action) {
        const { id, title } = action.payload;

        if (state.byId[id]) {
            state.byId[id].title = title;
        }

        state.editingTaskId = null; // reset after edit
    },

    moveTask(state, action) {
      const { id, status } = action.payload;

      if (state.byId[id]) {
        state.byId[id].status = status;
      }
    },
  },
});

export const { addTask, deleteTask, moveTask, editTask, setEditingTask, clearEditingTask } = taskSlice.actions;
export default taskSlice.reducer;