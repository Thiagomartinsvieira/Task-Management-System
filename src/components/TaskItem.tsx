import React from "react";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

interface TaskItemProps {
  id?: string;
  text?: string;
  completed?: boolean;
  onToggle?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id = "task-1",
  text = "Complete the task management system",
  completed = false,
  onToggle = () => {},
  onDelete = () => {},
}) => {
  const handleToggle = () => {
    onToggle(id);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="flex items-center justify-between p-4 mb-2 bg-white rounded-lg shadow-sm border border-gray-100 w-full">
      <div className="flex items-center gap-3">
        <Checkbox
          id={`task-${id}`}
          checked={completed}
          onCheckedChange={() => handleToggle()}
        />
        <label
          htmlFor={`task-${id}`}
          className={`text-sm font-medium ${completed ? "text-gray-400 line-through" : "text-gray-700"}`}
        >
          {text}
        </label>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        className="text-gray-500 hover:text-red-500 hover:bg-red-50"
        aria-label="Delete task"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TaskItem;
