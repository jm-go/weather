import { useState } from "react";
import { Trash2 } from "lucide-react";
import "./Item.scss";

type ItemProps = {
  task: string;
  onDelete: () => void;
};


const Item = ({ task, onDelete }: ItemProps) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div className="item">
      <input
        type="checkbox"
        className="item__checkbox"
        checked={isCompleted}
        onChange={handleCheckboxChange}
      />
      <span
        className={`item__text ${isCompleted ? "item__text--completed" : ""}`}
      >
        {task}
      </span>
      <button className="item__delete" onClick={onDelete}>
        <Trash2 className="item__delete--icon" />
      </button>
    </div>
  );
};

export default Item;
