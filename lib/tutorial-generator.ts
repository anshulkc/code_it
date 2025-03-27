"use client"

import type { Tutorial } from "@/types/tutorial"

// In a real application, this would likely use an AI model to generate tutorials
// based on natural language prompts
export async function generateTutorialFromPrompt(prompt: string): Promise<Tutorial> {
  // This is a simplified implementation for demonstration purposes
  // In a real app, you would use an AI service or more sophisticated NLP

  const promptLower = prompt.toLowerCase()

  // Generate a unique ID for the tutorial
  const id = `custom-${Date.now()}`

  // Default tutorial structure
  let tutorial: Tutorial = {
    id,
    title: "Custom Project",
    description: "A custom project based on your description",
    difficulty: "Intermediate",
    steps: [],
  }

  // Simple keyword matching to customize the tutorial
  if (promptLower.includes("todo") || promptLower.includes("task")) {
    tutorial = generateTodoAppTutorial(id, prompt)
  } else if (promptLower.includes("weather") || promptLower.includes("forecast")) {
    tutorial = generateWeatherAppTutorial(id, prompt)
  } else if (promptLower.includes("blog") || promptLower.includes("cms")) {
    tutorial = generateBlogApiTutorial(id, prompt)
  } else if (promptLower.includes("portfolio") || promptLower.includes("personal website")) {
    tutorial = generatePortfolioTutorial(id, prompt)
  } else {
    // Generate a generic tutorial with placeholder steps
    tutorial = generateGenericTutorial(id, prompt)
  }

  return tutorial
}

// Helper functions to generate specific tutorial types
function generateTodoAppTutorial(id: string, prompt: string): Tutorial {
  return {
    id,
    title: "Building a Todo Application",
    description: "Learn how to build a todo app based on your requirements",
    difficulty: "Beginner",
    steps: [
      {
        id: "step-1",
        title: "Setting up the project",
        description: `
          <p>Let's start by setting up a new React project for your todo application.</p>
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
      // Additional steps would be added here
    ],
  }
}

function generateWeatherAppTutorial(id: string, prompt: string): Tutorial {
  return {
    id,
    title: "Building a Weather Application",
    description: "Create a weather app that fetches data from a weather API",
    difficulty: "Intermediate",
    steps: [
      {
        id: "step-1",
        title: "Setting up the project",
        description: `
          <p>Let's start by setting up a new React project for your weather application.</p>
          <ol>
            <li>Open your terminal</li>
            <li>Navigate to the directory where you want to create your project</li>
            <li>Run the following command to create a new React project:</li>
          </ol>
          <pre><code>npx create-react-app weather-app
cd weather-app
npm start</code></pre>
          <p>This will create a new React project and start the development server.</p>
        `,
      },
      {
        id: "step-2",
        title: "Creating the Weather API service",
        description: `
          <p>Now, let's create a service to fetch weather data from an API.</p>
          <p>Create a new file called <code>weatherService.js</code> in the <code>src</code> directory.</p>
        `,
        codeChunks: [
          {
            id: "weather-service",
            fileName: "weatherService.js",
            language: "javascript",
            instructions: "Create a service that fetches weather data from the OpenWeatherMap API.",
            initialCode: `// We'll use the OpenWeatherMap API
// You'll need to sign up for a free API key at https://openweathermap.org/api

const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// TODO: Implement the following functions:
// 1. getWeatherByCity - Fetches weather data for a specific city
// 2. getForecast - Fetches a 5-day forecast for a specific city

export const weatherService = {
  // Your code here
};`,
            expectedSolution: `// We'll use the OpenWeatherMap API
// You'll need to sign up for a free API key at https://openweathermap.org/api

const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const weatherService = {
  getWeatherByCity: async (city) => {
    try {
      const response = await fetch(
        \`\${BASE_URL}/weather?q=\${city}&units=metric&appid=\${API_KEY}\`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not found');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching weather:', error);
      throw error;
    }
  },
  
  getForecast: async (city) => {
    try {
      const response = await fetch(
        \`\${BASE_URL}/forecast?q=\${city}&units=metric&appid=\${API_KEY}\`
      );
      
      if (!response.ok) {
        throw new Error('Forecast data not found');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw error;
    }
  }
};`,
          },
        ],
      },
      // Additional steps would be added here
    ],
  }
}

function generateBlogApiTutorial(id: string, prompt: string): Tutorial {
  // Implementation for blog API tutorial
  return {
    id,
    title: "Building a Blog API",
    description: "Create a RESTful API for a blog using Node.js and Express",
    difficulty: "Advanced",
    steps: [
      // Steps would be defined here
      {
        id: "step-1",
        title: "Setting up the project",
        description: `
          <p>Let's start by setting up a new Node.js project for your blog API.</p>
          <ol>
            <li>Create a new directory for your project</li>
            <li>Initialize a new Node.js project</li>
            <li>Install the necessary dependencies</li>
          </ol>
          <pre><code>mkdir blog-api
cd blog-api
npm init -y
npm install express mongoose dotenv cors</code></pre>
          <p>This will create a new Node.js project and install the required dependencies.</p>
        `,
      },
      // Additional steps would be added here
    ],
  }
}

function generatePortfolioTutorial(id: string, prompt: string): Tutorial {
  // Implementation for portfolio tutorial
  return {
    id,
    title: "Building a Portfolio Website",
    description: "Create a personal portfolio website to showcase your work",
    difficulty: "Intermediate",
    steps: [
      // Steps would be defined here
      {
        id: "step-1",
        title: "Setting up the project",
        description: `
          <p>Let's start by setting up a new Next.js project for your portfolio website.</p>
          <ol>
            <li>Create a new Next.js project</li>
            <li>Install the necessary dependencies</li>
            <li>Start the development server</li>
          </ol>
          <pre><code>npx create-next-app portfolio-website
cd portfolio-website
npm run dev</code></pre>
          <p>This will create a new Next.js project and start the development server.</p>
        `,
      },
      // Additional steps would be added here
    ],
  }
}

function generateGenericTutorial(id: string, prompt: string): Tutorial {
  // Implementation for a generic tutorial based on the prompt
  return {
    id,
    title: "Custom Project",
    description: `A custom project based on your description: "${prompt}"`,
    difficulty: "Intermediate",
    steps: [
      {
        id: "step-1",
        title: "Setting up your project",
        description: `
          <p>Let's start by setting up a new project based on your requirements.</p>
          <p>Based on your description, we'll create a custom project structure that fits your needs.</p>
          <ol>
            <li>Create a new directory for your project</li>
            <li>Initialize a new project with the appropriate tools</li>
            <li>Install the necessary dependencies</li>
          </ol>
          <p>We'll guide you through each step of the process.</p>
        `,
      },
      // Additional generic steps would be added here
    ],
  }
}

