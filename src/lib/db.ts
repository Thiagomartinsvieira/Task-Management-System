import Database from "better-sqlite3";
import { join } from "path";
import fs from "fs";

// Ensure the database directory exists
const dbDir = join(process.cwd(), "db");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Initialize the database
const db = new Database(join(dbDir, "tasks.db"));

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0
  )
`);

// Seed some initial data if the table is empty
const count = db.prepare("SELECT COUNT(*) as count FROM tasks").get();
if (count.count === 0) {
  const insert = db.prepare(
    "INSERT INTO tasks (id, title, completed) VALUES (?, ?, ?)",
  );
  insert.run("task-1", "Complete project documentation", 0);
  insert.run("task-2", "Review pull requests", 1);
  insert.run("task-3", "Fix UI bugs in dashboard", 0);
  insert.run("task-4", "Prepare for team meeting", 0);
  insert.run("task-5", "Update dependencies", 1);
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

// Task operations
export const taskDb = {
  // Get all tasks
  getAll: (): Task[] => {
    const stmt = db.prepare("SELECT * FROM tasks");
    const rows = stmt.all();
    return rows.map((row) => ({
      ...row,
      completed: Boolean(row.completed),
    }));
  },

  // Get a single task by id
  getById: (id: string): Task | undefined => {
    const stmt = db.prepare("SELECT * FROM tasks WHERE id = ?");
    const row = stmt.get(id);
    if (!row) return undefined;
    return {
      ...row,
      completed: Boolean(row.completed),
    };
  },

  // Create a new task
  create: (title: string): Task => {
    const id = `task-${Date.now()}`;
    const stmt = db.prepare(
      "INSERT INTO tasks (id, title, completed) VALUES (?, ?, ?)",
    );
    stmt.run(id, title, 0);
    return {
      id,
      title,
      completed: false,
    };
  },

  // Update a task's completion status
  toggleComplete: (id: string): Task | undefined => {
    const task = taskDb.getById(id);
    if (!task) return undefined;

    const newStatus = task.completed ? 0 : 1;
    const stmt = db.prepare("UPDATE tasks SET completed = ? WHERE id = ?");
    stmt.run(newStatus, id);

    return {
      ...task,
      completed: !task.completed,
    };
  },

  // Delete a task
  delete: (id: string): boolean => {
    const stmt = db.prepare("DELETE FROM tasks WHERE id = ?");
    const result = stmt.run(id);
    return result.changes > 0;
  },
};

export default taskDb;
