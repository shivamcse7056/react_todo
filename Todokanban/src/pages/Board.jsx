import Column from "../components/Column";
import AddTask from "../components/AddTask";
import { DndContext } from "@dnd-kit/core";
import { useDispatch } from "react-redux";
import { moveTask } from "../features/tasks/taskSlice";

const Board = () => {
  const dispatch = useDispatch();

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    dispatch(
      moveTask({
        id: active.id,
        status: over.id,
      })
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="max-w-6xl mx-auto">
            <div className="text-3xl text-bold bg-blue-500 item-center text-center p-4">TODO App</div>
        <AddTask />

        <div className="grid grid-cols-3 gap-6 p-6">
          <Column status="todo" title="To Do" />
          <Column status="in-progress" title="In Progress" />
          <Column status="done" title="Done" />
        </div>
      </div>
    </DndContext>
  );
};

export default Board;