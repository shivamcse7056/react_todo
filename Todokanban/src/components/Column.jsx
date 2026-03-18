import { useSelector } from "react-redux";
import { selectTasksByStatus } from "../features/tasks/selectors";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

const Column = ({ status, title }) => {
  const tasks = useSelector((state) =>
    selectTasksByStatus(state, status)
  );

  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-100 p-4 rounded-xl min-h-[400px]"
    >
      <h2 className="font-bold mb-4">{title}</h2>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;