import { useState } from "react";
import { Trash2 } from "lucide-react";
import "./Task.scss";

type TaskProps = {
  task: string;
  onDelete: () => void;
};

const Task = ({ task, onDelete }: TaskProps) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div className="task">
      <input
        type="checkbox"
        className="task__checkbox"
        checked={isCompleted}
        onChange={handleCheckboxChange}
      />
      <span
        className={`task__text ${isCompleted ? "task__text--completed" : ""}`}
      >
        {task}
      </span>
      <button className="task__delete" onClick={onDelete}>
        <Trash2 className="task__delete--icon" />
      </button>
    </div>
  );
};

export default Task;
