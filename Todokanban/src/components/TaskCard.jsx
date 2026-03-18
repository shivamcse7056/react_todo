import { useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/taskSlice";
import { useDraggable } from "@dnd-kit/core";

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();

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
      {...listeners}
      {...attributes}
      style={style}
      className="bg-white p-3 rounded shadow hover:shadow-lg transition flex justify-between cursor-grab"
    >
      <span>{task.title}</span>

      <button
        onClick={() => dispatch(deleteTask(task.id))}
        className="text-red-500"
      >
        ✕
      </button>
    </div>
  );
};

export default TaskCard;