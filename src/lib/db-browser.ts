// Client-side in-memory database for browser environments

export interface Task {
    id: string;
    title: string;
    completed: boolean;
  }
  
  // In-memory storage
  let tasks: Task[] = [
    { id: "task-1", title: "Complete project documentation", completed: false },
    { id: "task-2", title: "Review pull requests", completed: true },
    { id: "task-3", title: "Fix UI bugs in dashboard", completed: false },
    { id: "task-4", title: "Prepare for team meeting", completed: false },
    { id: "task-5", title: "Update dependencies", completed: true },
  ];
  
  // Task operations
  export const taskDb = {
    // Get all tasks
    getAll: (): Task[] => {
      return [...tasks];
    },
  
    // Get a single task by id
    getById: (id: string): Task | undefined => {
      return tasks.find((task) => task.id === id);
    },
  
    // Create a new task
    create: (title: string): Task => {
      const id = `task-${Date.now()}`;
      const newTask: Task = {
        id,
        title,
        completed: false,
      };
  
      tasks.push(newTask);
      return newTask;
    },
  
    // Update a task's completion status
    toggleComplete: (id: string): Task | undefined => {
      const task = taskDb.getById(id);
      if (!task) return undefined;
  
      task.completed = !task.completed;
      return { ...task };
    },
  
    // Delete a task
    delete: (id: string): boolean => {
      const initialLength = tasks.length;
      tasks = tasks.filter((task) => task.id !== id);
      return tasks.length < initialLength;
    },
  };
  
  export default taskDb;
  