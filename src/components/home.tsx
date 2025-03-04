import React, { useState, useEffect } from "react";
import TaskHeader from "./TaskHeader";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { Toaster } from "./ui/toaster";
import { useToast } from "./ui/use-toast";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "task-1", text: "Complete project documentation", completed: false },
    { id: "task-2", text: "Review pull requests", completed: true },
    { id: "task-3", text: "Fix UI bugs in dashboard", completed: false },
    { id: "task-4", text: "Prepare for team meeting", completed: false },
    { id: "task-5", text: "Update dependencies", completed: true },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const completedTasks = tasks.filter((task) => task.completed).length;

  const handleAddTask = (text: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        text,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setIsLoading(false);
    }, 500);
  };

  const handleToggleTask = (id: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task,
        ),
      );
      setIsLoading(false);
    }, 300);
  };

  const handleDeleteTask = (id: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      try {
        setTasks(tasks.filter((task) => task.id !== id));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        showErrorToast("Failed to delete task. Please try again.");
      }
    }, 300);
  };

  const showErrorToast = (message: string) => {
    toast({
      variant: "destructive",
      title: "Error",
      description: message,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TaskHeader
        title="Task Management System"
        totalTasks={tasks.length}
        completedTasks={completedTasks}
      />

      <main className="max-w-4xl mx-auto py-8 px-4">
        <div className="space-y-6">
          <TaskForm onAddTask={handleAddTask} isLoading={isLoading} />

          <TaskList
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </main>

      <Toaster />
    </div>
  );
};

export default Home;
