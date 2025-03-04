import Database from 'better-sqlite3';

const db = new Database('tasks.db');

db.pragma('journal_mode = WAL'); 

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT 0
  );
`);


export function getTasks() {
  const stmt = db.prepare('SELECT * FROM tasks');
  return stmt.all();
}

export function addTask(title, description) {
  const stmt = db.prepare('INSERT INTO tasks (title, description) VALUES (?, ?)');
  const info = stmt.run(title, description);
  return { id: info.lastInsertRowid, title, description, completed: 0 };
}

export function updateTask(id, title, description, completed) {
  const stmt = db.prepare('UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?');
  stmt.run(title, description, completed, id);
  return { id, title, description, completed };
}

export function deleteTask(id) {
  const stmt = db.prepare('DELETE FROM tasks WHERE id = ?');
  stmt.run(id);
  return { success: true };
}

export default db;
