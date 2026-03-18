import { useDispatch } from "react-redux";
import { deleteTask, editTask } from "../features/tasks/taskSlice";
import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.title);

  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  const handleEdit = () => {
    if (!text.trim()) return;
    dispatch(editTask({ id: task.id, title: text }));
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-3 rounded shadow hover:shadow-lg transition flex flex-col gap-2 cursor-grab"
    >
      {isEditing ? (
        <>
          <input
            className="border p-1 rounded"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={handleEdit}
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <div
            {...listeners}
            {...attributes}
            className="flex justify-between items-center"
          >
            <span>{task.title}</span>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500"
            >
              Edit
            </button>

            <button
              onClick={() => dispatch(deleteTask(task.id))}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;