"use client"

import type { Tutorial } from "@/types/tutorial"

// This would typically come from an API or database
// For demonstration purposes, we're using a mock
export async function getTutorialData(projectId: string): Promise<Tutorial> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const tutorial = MOCK_TUTORIALS.find((t) => t.id === projectId)
      if (tutorial) {
        resolve(tutorial)
      } else {
        throw new Error(`Tutorial with ID ${projectId} not found`)
      }
    }, 500)
  })
}

const MOCK_TUTORIALS: Tutorial[] = [
  {
    id: "todo-app",
    title: "Building a Todo App with React",
    description: "Learn how to build a simple todo application using React",
    difficulty: "Beginner",
    steps: [
      {
        id: "step-1",
        title: "Setting up the project",
        description: `
          <p>In this step, we'll set up a new React project using Create React App.</p>
          <ol>
            <li>Open your terminal</li>
            <li>Navigate to the directory where you want to create your project</li>
            <li>Run the following command to create a new React project:</li>
          </ol>
          <pre><code>npx create-react-app todo-app
cd todo-app
npm start</code></pre>
          <p>This will create a new React project and start the development server.</p>
        `,
      },
      {
        id: "step-2",
        title: "Creating the Todo component",
        description: `
          <p>Now, let's create a Todo component that will display a single todo item.</p>
          <p>Create a new file called <code>Todo.js</code> in the <code>src</code> directory.</p>
        `,
        codeChunks: [
          {
            id: "todo-component",
            fileName: "Todo.js",
            language: "javascript",
            instructions:
              "Create a Todo component that displays a todo item with a checkbox to mark it as complete and a delete button.",
            initialCode: `import React from 'react';

function Todo({ todo, onToggle, onDelete }) {
  // TODO: Implement the Todo component
  // 1. Display the todo text
  // 2. Add a checkbox to toggle the todo's completed status
  // 3. Add a delete button to remove the todo
  
  return (
    <div>
      {/* Your code here */}
    </div>
  );
}

export default Todo;`,
            expectedSolution: `import React from 'react';

function Todo({ todo, onToggle, onDelete }) {
  return (
    <div className="todo-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
      <input 
        type="checkbox" 
        checked={todo.completed} 
        onChange={() => onToggle(todo.id)} 
      />
      <span style={{ 
        marginLeft: '8px', 
        textDecoration: todo.completed ? 'line-through' : 'none' 
      }}>
        {todo.text}
      </span>
      <button 
        onClick={() => onDelete(todo.id)} 
        style={{ marginLeft: 'auto', background: 'red', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px' }}
      >
        Delete
      </button>
    </div>
  );
}

export default Todo;`,
          },
        ],
      },
      {
        id: "step-3",
        title: "Creating the TodoList component",
        description: `
          <p>Now, let's create a TodoList component that will display all todo items.</p>
          <p>Create a new file called <code>TodoList.js</code> in the <code>src</code> directory.</p>
        `,
        codeChunks: [
          {
            id: "todolist-component",
            fileName: "TodoList.js",
            language: "javascript",
            instructions: "Create a TodoList component that renders a list of Todo components.",
            initialCode: `import React from 'react';
import Todo from './Todo';

function TodoList({ todos, onToggleTodo, onDeleteTodo }) {
  // TODO: Implement the TodoList component
  // 1. Map through the todos array
  // 2. Render a Todo component for each todo
  // 3. Pass the necessary props to each Todo component
  
  return (
    <div>
      {/* Your code here */}
    </div>
  );
}

export default TodoList;`,
            expectedSolution: `import React from 'react';
import Todo from './Todo';

function TodoList({ todos, onToggleTodo, onDeleteTodo }) {
  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <p>No todos yet! Add one above.</p>
      ) : (
        todos.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            onToggle={onToggleTodo}
            onDelete={onDeleteTodo}
          />
        ))
      )}
    </div>
  );
}

export default TodoList;`,
          },
        ],
      },
    ],
  },
  {
    id: "weather-app",
    title: "Building a Weather App",
    description: "Create a weather application that fetches data from a weather API",
    difficulty: "Intermediate",
    steps: [
      {
        id: "step-1",
        title: "Project Setup",
        description: `
          <p>In this tutorial, we'll build a weather app that fetches data from a weather API.</p>
          <p>First, let's set up our project:</p>
          <ol>
            <li>Create a new React project using Create React App</li>
            <li>Install the necessary dependencies</li>
            <li>Set up the basic structure of our application</li>
          </ol>
        `,
      },
      // More steps would be added here
    ],
  },
]

