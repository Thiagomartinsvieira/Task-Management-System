import React from "react";
import TaskItem from "./TaskItem";
import { Card } from "./ui/card";
import { Loader2 } from "lucide-react";
import { Task } from "../lib/db";

interface TaskListProps {
  tasks?: Task[];
  onToggleTask?: (id: string) => void;
  onDeleteTask?: (id: string) => void;
  isLoading?: boolean;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks = [
    { id: "task-1", title: "Complete project documentation", completed: false },
    { id: "task-2", title: "Review pull requests", completed: true },
    { id: "task-3", title: "Fix UI bugs in dashboard", completed: false },
    { id: "task-4", title: "Prepare for team meeting", completed: false },
    { id: "task-5", title: "Update dependencies", completed: true },
  ],
  onToggleTask = () => {},
  onDeleteTask = () => {},
  isLoading = false,
}) => {
  return (
    <Card className="w-full p-6 bg-white shadow-sm border border-gray-100">
      <div className="space-y-1 mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>
          <p className="text-sm text-gray-500">
            {tasks.length} tasks,{" "}
            {tasks.filter((task) => task.completed).length} completed
          </p>
        </div>
        {isLoading && (
          <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
        )}
      </div>

      <div className="divide-y divide-gray-100">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              text={task.text}
              completed={task.completed}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
            />
          ))
        ) : (
          <div className="py-8 text-center">
            <p className="text-gray-500">
              {isLoading
                ? "Loading tasks..."
                : "No tasks yet. Add a task to get started!"}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TaskList;
