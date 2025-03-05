import React, { useState, useEffect } from "react";
import TaskHeader from "./TaskHeader";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { Toaster } from "./ui/toaster";
import { useToast } from "./ui/use-toast";
import tasksApi from "../api/tasks-browser";
import { Task } from "../lib/db-browser";

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setIsLoading(true);
    try {
      const allTasks = await tasksApi.getAllTasks();
      setTasks(allTasks);
    } catch (error) {
      showErrorToast("Failed to load tasks. Please refresh the page.");
    } finally {
      setIsLoading(false);
    }
  };

  const completedTasks = tasks.filter((task) => task.completed).length;

  const handleAddTask = async (text: string) => {
    setIsLoading(true);
    try {
      const newTask = await tasksApi.createTask(text);
      setTasks([...tasks, newTask]);
    } catch (error) {
      showErrorToast("Failed to add task. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTask = async (id: string) => {
    setIsLoading(true);
    try {
      const updatedTask = await tasksApi.toggleTaskCompletion(id);
      if (updatedTask) {
        setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
      }
    } catch (error) {
      showErrorToast("Failed to update task. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (id: string) => {
    setIsLoading(true);
    try {
      const success = await tasksApi.deleteTask(id);
      if (success) {
        setTasks(tasks.filter((task) => task.id !== id));
      } else {
        showErrorToast("Task not found or already deleted.");
      }
    } catch (error) {
      showErrorToast("Failed to delete task. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
            isLoading={isLoading}
          />
        </div>
      </main>

      <Toaster />
    </div>
  );
};

export default Home;
