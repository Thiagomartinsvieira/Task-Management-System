import taskDb, { Task } from "../lib/db";

// API functions for tasks
export const tasksApi = {
  // Get all tasks
  getAllTasks: async (): Promise<Task[]> => {
    try {
      // Simulate network delay for a more realistic API call
      await new Promise((resolve) => setTimeout(resolve, 300));
      return taskDb.getAll();
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw new Error("Failed to fetch tasks");
    }
  },

  // Get a single task
  getTask: async (id: string): Promise<Task | null> => {
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 200));
      const task = taskDb.getById(id);
      return task || null;
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error);
      throw new Error("Failed to fetch task");
    }
  },

  // Create a new task
  createTask: async (text: string): Promise<Task> => {
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      return taskDb.create({ text, completed: false });
    } catch (error) {
      console.error("Error creating task:", error);
      throw new Error("Failed to create task");
    }
  },

  // Update a task's completion status
  toggleTaskCompletion: async (id: string): Promise<Task | null> => {
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 200));
      const updatedTask = taskDb.toggleComplete(id);
      return updatedTask || null;
    } catch (error) {
      console.error(`Error toggling task ${id}:`, error);
      throw new Error("Failed to update task");
    }
  },

  // Delete a task
  deleteTask: async (id: string): Promise<boolean> => {
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 200));
      return taskDb.delete(id);
    } catch (error) {
      console.error(`Error deleting task ${id}:`, error);
      throw new Error("Failed to delete task");
    }
  },
};

export default tasksApi;
