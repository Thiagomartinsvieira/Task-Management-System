import React, { useState } from "react";
import TaskItem from "./TaskItem";
import { Card } from "./ui/card";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  tasks?: Task[];
  onToggleTask?: (id: string) => void;
  onDeleteTask?: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks = [
    { id: "task-1", text: "Complete project documentation", completed: false },
    { id: "task-2", text: "Review pull requests", completed: true },
    { id: "task-3", text: "Fix UI bugs in dashboard", completed: false },
    { id: "task-4", text: "Prepare for team meeting", completed: false },
    { id: "task-5", text: "Update dependencies", completed: true },
  ],
  onToggleTask = () => {},
  onDeleteTask = () => {},
}) => {
  const [localTasks, setLocalTasks] = useState<Task[]>(tasks);

  const handleToggle = (id: string) => {
    // Update local state for immediate UI feedback
    setLocalTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );

    // Call the parent handler
    onToggleTask(id);
  };

  const handleDelete = (id: string) => {
    // Update local state for immediate UI feedback
    setLocalTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

    // Call the parent handler
    onDeleteTask(id);
  };

  return (
    <Card className="w-full p-6 bg-white shadow-sm border border-gray-100">
      <div className="space-y-1 mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>
        <p className="text-sm text-gray-500">
          {localTasks.length} tasks,{" "}
          {localTasks.filter((task) => task.completed).length} completed
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {localTasks.length > 0 ? (
          localTasks.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              text={task.text}
              completed={task.completed}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="py-8 text-center">
            <p className="text-gray-500">
              No tasks yet. Add a task to get started!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TaskList;
