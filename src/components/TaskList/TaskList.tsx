import Item from "../Task/Task";
import "./TaskList.scss";

type TaskListProps = {
  tasks: { id: number; content: string }[];
  onDelete: (id: number) => void;
};

const TaskList = ({ tasks, onDelete }: TaskListProps) => {
  return (
    <div className="tasklist">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Item
            key={task.id}
            task={task.content}
            onDelete={() => onDelete(task.id)}
          />
        ))
      ) : (
        <p className="tasklist__empty-message">
          Add a daily task above!
        </p>
      )}
    </div>
  );
};

export default TaskList;
