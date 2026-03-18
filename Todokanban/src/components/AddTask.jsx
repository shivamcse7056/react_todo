import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  editTask,
  clearEditingTask,
} from "../features/tasks/taskSlice";

const AddTask = () => {
  const dispatch = useDispatch();

  const editingTaskId = useSelector(
    (state) => state.tasks.editingTaskId
  );

  const task = useSelector((state) =>
    editingTaskId ? state.tasks.byId[editingTaskId] : null
  );

  const [text, setText] = useState("");


  useEffect(() => {
    if (task) {
      setText(task.title);
    } else {
      setText("");
    }
  }, [task]);

  const handleSubmit = () => {
    if (!text.trim()) return;

    if (editingTaskId) {
      dispatch(editTask({ id: editingTaskId, title: text }));
    } else {
      dispatch(addTask(text));
    }

    setText("");
  };

  return (
    <div className="flex gap-2 p-4">
      <input
        className="border p-2 rounded w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={
          editingTaskId ? "Edit task..." : "Add task..."
        }
      />

      <button
        onClick={handleSubmit}
        className={`px-4 rounded text-white ${
          editingTaskId ? "bg-green-500" : "bg-blue-500"
        }`}
      >
        {editingTaskId ? "Update" : "Add"}
      </button>

      {editingTaskId && (
        <button
          onClick={() => dispatch(clearEditingTask())}
          className="bg-gray-400 text-white px-3 rounded"
        >
          Cancel
        </button>
      )}
    </div>
  );
};

export default AddTask;