import { GetServerSideProps } from "next";
import { useState } from "react";
import TaskHeader from "@/components/TaskHeader";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Task } from "@/lib/db";

interface HomeProps {
  initialTasks: Task[];
}

export default function Home({ initialTasks }: HomeProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const completedTasks = tasks.filter((task) => task.completed).length;

  const handleAddTask = async (text: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: text }),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const newTask = await response.json();
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
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await response.json();
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    } catch (error) {
      showErrorToast("Failed to update task. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks(tasks.filter((task) => task.id !== id));
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
}

// Server-side rendering to fetch initial tasks
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // In a real Next.js app, we would use an absolute URL with the deployment URL
    // For local development, we'll directly import the database module
    const taskDb = (await import("@/lib/db")).default;
    const tasks = taskDb.getAll();

    return {
      props: {
        initialTasks: tasks,
      },
    };
  } catch (error) {
    console.error("Error fetching initial tasks:", error);
    return {
      props: {
        initialTasks: [],
      },
    };
  }
};
