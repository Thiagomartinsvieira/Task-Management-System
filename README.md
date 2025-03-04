# Task Management System Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [System Architecture](#system-architecture)
3. [Component Overview](#component-overview)
4. [Data Flow](#data-flow)
5. [User Interface](#user-interface)
6. [Client-Side Storage](#client-side-storage)
7. [API Reference](#api-reference)
8. [Installation Guide](#installation-guide)
9. [Development Guide](#development-guide)
10. [Troubleshooting](#troubleshooting)

## Introduction

The Task Management System is a responsive web application built with React and TypeScript that allows users to create, view, edit, and delete tasks with a simple and intuitive interface. The application uses client-side storage to persist task data between sessions.

![Task Management System Overview - Insert screenshot of the main application interface here]

### Key Features

- Create new tasks with descriptive text
- Mark tasks as completed or pending
- Delete tasks that are no longer needed
- View task completion statistics
- Responsive design that works on desktop and mobile devices
- Error handling with toast notifications

## System Architecture

The Task Management System follows a component-based architecture using React. The application is structured to separate concerns between UI components, data management, and API interactions.

### Technology Stack

- **Frontend Framework**: React with TypeScript
- **UI Components**: Custom components with Tailwind CSS
- **State Management**: React Hooks (useState, useEffect)
- **Data Storage**: Client-side in-memory storage with simulated API calls
- **Styling**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Vite

## Component Overview

The application is composed of several key components, each with a specific responsibility:

### Home Component

The main container component that orchestrates the application flow and manages the task state.

```tsx
// Key functionality in Home component
const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);
  
  // Task management functions
  const handleAddTask = async (text: string) => { /* ... */ };
  const handleToggleTask = async (id: string) => { /* ... */ };
  const handleDeleteTask = async (id: string) => { /* ... */ };
  
  // Render UI components
  return (
    <div className="min-h-screen bg-gray-50">
      <TaskHeader />
      <main>
        <TaskForm />
        <TaskList />
      </main>
    </div>
  );
};
```

### TaskHeader Component

Displays the application title and task completion statistics.

```tsx
interface TaskHeaderProps {
  totalTasks?: number;
  completedTasks?: number;
  title?: string;
}
```

![TaskHeader Component - Insert screenshot of the header here]

### TaskForm Component

Provides an input field and button for adding new tasks.

```tsx
interface TaskFormProps {
  onAddTask?: (text: string) => void;
  isLoading?: boolean;
}
```

![TaskForm Component - Insert screenshot of the form here]

### TaskList Component

Renders the list of tasks and handles loading states.

```tsx
interface TaskListProps {
  tasks?: Task[];
  onToggleTask?: (id: string) => void;
  onDeleteTask?: (id: string) => void;
  isLoading?: boolean;
}
```

![TaskList Component - Insert screenshot of the task list here]

### TaskItem Component

Renders an individual task with toggle and delete functionality.

```tsx
interface TaskItemProps {
  id?: string;
  text?: string;
  completed?: boolean;
  onToggle?: (id: string) => void;
  onDelete?: (id: string) => void;
}
```

![TaskItem Component - Insert screenshot of a task item here]

### ErrorToast Component

Displays error messages to the user.

```tsx
interface ErrorToastProps {
  message?: string;
  duration?: number;
  variant?: "default" | "destructive";
  onClose?: () => void;
}
```

## Data Flow

The application follows a unidirectional data flow pattern:

1. User interactions trigger event handlers in the UI components
2. Event handlers call API functions to modify data
3. API functions update the client-side storage
4. Updated data flows back to the UI components through state updates

![Data Flow Diagram - Insert data flow diagram here]

### Task Data Structure

```typescript
export interface Task {
  id: string;         // Unique identifier for the task
  text: string;       // Task description
  completed: boolean; // Completion status
  created_at?: string; // Creation timestamp
}
```

## User Interface

The user interface is designed to be clean, intuitive, and responsive. It follows a minimalist design approach with clear visual hierarchy and feedback.

### Layout

The application layout consists of:

1. A header section with the application title and task statistics
2. A task form section for adding new tasks
3. A task list section displaying all tasks

### Responsive Design

The interface adapts to different screen sizes:

- **Desktop**: Full-width layout with comfortable spacing
- **Tablet**: Slightly condensed layout with adjusted margins
- **Mobile**: Single column layout with optimized touch targets

![Responsive Design - Insert responsive design screenshots here]

## Client-Side Storage

The application uses a client-side in-memory storage solution to persist task data during the session.

### Storage Implementation

The storage layer is implemented in `src/lib/db.ts` and provides the following functionality:

- Task retrieval (all tasks or by ID)
- Task creation
- Task updates (including toggling completion status)
- Task deletion

```typescript
// Task operations
export const taskDb = {
  getAll: (): Task[] => { /* ... */ },
  getById: (id: string): Task | undefined => { /* ... */ },
  create: (task: Omit<Task, "id" | "created_at">): Task => { /* ... */ },
  update: (id: string, updates: Partial<Omit<Task, "id" | "created_at">>): Task | undefined => { /* ... */ },
  delete: (id: string): boolean => { /* ... */ },
  toggleComplete: (id: string): Task | undefined => { /* ... */ },
};
```

### Custom Hook

A custom React hook `useTaskDb()` is provided for components that need to interact with the task database directly:

```typescript
export function useTaskDb() {
  const [localTasks, setLocalTasks] = useState<Task[]>([]);
  
  useEffect(() => {
    // Load tasks when component mounts
    setLocalTasks(taskDb.getAll());
  }, []);
  
  return {
    tasks: localTasks,
    refreshTasks: () => setLocalTasks(taskDb.getAll()),
    addTask: (text: string) => { /* ... */ },
    toggleTask: (id: string) => { /* ... */ },
    deleteTask: (id: string) => { /* ... */ },
  };
}
```

## API Reference

The API layer is implemented in `src/api/tasks.ts` and provides asynchronous methods for interacting with the task data:

### Methods

#### `getAllTasks()`

Returns all tasks sorted by creation date (newest first).

```typescript
async function getAllTasks(): Promise<Task[]>
```

#### `getTask(id: string)`

Returns a single task by ID.

```typescript
async function getTask(id: string): Promise<Task | null>
```

#### `createTask(text: string)`

Creates a new task with the given text.

```typescript
async function createTask(text: string): Promise<Task>
```

#### `toggleTaskCompletion(id: string)`

Toggles the completion status of a task.

```typescript
async function toggleTaskCompletion(id: string): Promise<Task | null>
```

#### `deleteTask(id: string)`

Deletes a task by ID.

```typescript
async function deleteTask(id: string): Promise<boolean>
```

## Installation Guide

Follow these steps to set up the Task Management System locally:

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. Clone the repository

```bash
git clone https://github.com/Thiagomartinsvieira/Task-Management-System.git
cd task-management-system
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Development Guide

### Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── api/            # API layer
│   │   └── tasks.ts    # Task API functions
│   ├── components/     # React components
│   │   ├── ErrorToast.tsx
│   │   ├── TaskForm.tsx
│   │   ├── TaskHeader.tsx
│   │   ├── TaskItem.tsx
│   │   ├── TaskList.tsx
│   │   ├── home.tsx
│   │   └── ui/        # UI components
│   ├── lib/           # Utilities and helpers
│   │   ├── db.ts      # Client-side storage
│   │   └── utils.ts   # Utility functions
│   ├── App.tsx        # Main application component
│   ├── index.css      # Global styles
│   └── main.tsx       # Application entry point
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Adding New Features

To add a new feature to the Task Management System:

1. Create any necessary components in the `src/components` directory
2. Add any required API functions to `src/api/tasks.ts`
3. Update the storage implementation in `src/lib/db.ts` if needed
4. Integrate the new feature into the main application flow

### Coding Standards

- Use TypeScript for type safety
- Follow React best practices and hooks guidelines
- Use functional components with hooks
- Implement proper error handling
- Write descriptive comments for complex logic
- Use consistent naming conventions

## Troubleshooting

### Common Issues

#### Tasks not appearing after creation

**Possible causes:**
- The task creation API call failed
- The state update was not triggered correctly

**Solution:**
- Check the browser console for errors
- Verify that the `handleAddTask` function is being called
- Ensure that the state update is working correctly

#### Task completion toggle not working

**Possible causes:**
- The task ID is not being passed correctly
- The toggle API call failed

**Solution:**
- Verify that the correct task ID is being passed to the toggle function
- Check the browser console for errors
- Ensure that the state update after toggling is working correctly

#### Error messages not displaying

**Possible causes:**
- The toast component is not properly configured
- The error handling logic is not triggering the toast

**Solution:**
- Verify that the Toaster component is included in the component tree
- Check that the `showErrorToast` function is being called when errors occur

---

## Future Enhancements

- **User Authentication**: Add user accounts and authentication
- **Task Categories**: Allow users to categorize tasks
- **Due Dates**: Add due dates and reminders for tasks
- **Task Priorities**: Implement priority levels for tasks
- **Data Persistence**: Implement server-side storage with a real database
- **Offline Support**: Add offline capabilities with service workers
- **Dark Mode**: Implement a dark mode theme
- **Task Filtering**: Add the ability to filter tasks by status, category, etc.

---

© 2025 Task Management System. All rights reserved.
