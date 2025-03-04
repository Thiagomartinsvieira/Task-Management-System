import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";

interface TaskFormProps {
  onAddTask?: (text: string) => void;
  isLoading?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({
  onAddTask = () => {},
  isLoading = false,
}) => {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText.trim());
      setTaskText("");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder="Add a new task..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className="flex-1"
          disabled={isLoading}
          aria-label="Task description"
        />
        <Button
          type="submit"
          disabled={!taskText.trim() || isLoading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </form>
    </div>
  );
};

export default TaskForm;
