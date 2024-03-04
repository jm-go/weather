import { PlusCircle } from "lucide-react";
import "./AddTask.scss";
import { ChangeEvent, useState } from "react";

type AddTaskProps = {
  onAdd: (task: string) => void;
};

const AddTask = ({ onAdd }: AddTaskProps) => {
  const [userInput, setUserInput] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleAdd = () => {
    if (userInput.trim() !== "") {
      onAdd(userInput);
      setUserInput("");
    } else {
      alert("Please enter a task!");
    }
  };

  return (
    <div className="addtask">
      <input
        className="addtask__input"
        type="text"
        placeholder="Add your task here..."
        value={userInput}
        onChange={handleInputChange}
      />
      <button className="addtask__button" onClick={handleAdd}>
        <PlusCircle className="addtask__button--icon" />
      </button>
    </div>
  );
};

export default AddTask;
