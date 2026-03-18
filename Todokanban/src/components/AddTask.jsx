import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasks/taskSlice";

const AddTask = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (!text.trim()) return;
    dispatch(addTask(text));
    setText("");
  };

  return (
    <div className="flex gap-2 p-4">
      <input
        className="border p-2 rounded w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add task..."
      />
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 rounded"
      >
        Add
      </button>
    </div>
  );
};

export default AddTask;