import { useDispatch } from "react-redux";
import { deleteTask, setEditingTask } from "../features/tasks/taskSlice";
import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-3 rounded shadow hover:shadow-lg transition flex flex-col gap-2"
    >
      <div
        {...listeners}
        {...attributes}
        className="flex justify-between cursor-grab"
      >
        <span>{task.title}</span>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => dispatch(setEditingTask(task.id))}
          className="text-blue-500"
        >
          Edit
        </button>

        <button
          onClick={() => setOpen(true)}
          className="text-red-500"
        >
          Delete
        </button>
      </div>
      <DeleteModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
        dispatch(deleteTask(task.id));
        setOpen(false);
        }}
      />
    </div>
  );
};

export default TaskCard;