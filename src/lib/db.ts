import { useState, useEffect } from "react";

// Mock in-memory database for client-side use
// This simulates SQLite functionality in the browser

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  created_at?: string;
}

// In-memory storage
let tasks: Task[] = [
  {
    id: "task-1",
    text: "Complete project documentation",
    completed: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "task-2",
    text: "Review pull requests",
    completed: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "task-3",
    text: "Fix UI bugs in dashboard",
    completed: false,
    created_at: new Date().toISOString(),
  },
];

// Task operations
export const taskDb = {
  // Get all tasks
  getAll: (): Task[] => {
    // Sort by created_at in descending order
    return [...tasks].sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
    });
  },

  // Get a single task by id
  getById: (id: string): Task | undefined => {
    return tasks.find((task) => task.id === id);
  },

  // Create a new task
  create: (task: Omit<Task, "id" | "created_at">): Task => {
    const id = `task-${Date.now()}`;
    const newTask: Task = {
      id,
      text: task.text,
      completed: task.completed,
      created_at: new Date().toISOString(),
    };

    tasks.push(newTask);
    return newTask;
  },

  // Update a task
  update: (
    id: string,
    updates: Partial<Omit<Task, "id" | "created_at">>,
  ): Task | undefined => {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) return undefined;

    const updatedTask = { ...tasks[taskIndex], ...updates };
    tasks[taskIndex] = updatedTask;

    return updatedTask;
  },

  // Delete a task
  delete: (id: string): boolean => {
    const initialLength = tasks.length;
    tasks = tasks.filter((task) => task.id !== id);
    return tasks.length < initialLength;
  },

  // Toggle task completion status
  toggleComplete: (id: string): Task | undefined => {
    const task = taskDb.getById(id);
    if (!task) return undefined;

    return taskDb.update(id, { completed: !task.completed });
  },
};

// Custom hook for using the task database
export function useTaskDb() {
  const [localTasks, setLocalTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Load tasks when component mounts
    setLocalTasks(taskDb.getAll());
  }, []);

  return {
    tasks: localTasks,
    refreshTasks: () => setLocalTasks(taskDb.getAll()),
    addTask: (text: string) => {
      const newTask = taskDb.create({ text, completed: false });
      setLocalTasks(taskDb.getAll());
      return newTask;
    },
    toggleTask: (id: string) => {
      const updated = taskDb.toggleComplete(id);
      setLocalTasks(taskDb.getAll());
      return updated;
    },
    deleteTask: (id: string) => {
      const result = taskDb.delete(id);
      setLocalTasks(taskDb.getAll());
      return result;
    },
  };
}

export default taskDb;
