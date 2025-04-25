# React Tutorial

## What is React?

**React** is a popular JavaScript library for building user interfaces, primarily focused on building single-page applications (SPAs) where you can build reusable UI components. It allows developers to create large web applications that can update and render efficiently in response to data changes. React's core principle is based on the concept of components—small, reusable pieces of UI that you can compose together to build complex interfaces.

### Explanation of Files

1. **`main.tsx` (or `main.js`)** :

- This is the entry point of your React application.

- It typically renders the root component (often `App.tsx`) into the DOM.

- Example:

```js
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App  from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

2. **`App.tsx` (or `App.js`)** :

- This is the root component of your React application.

- It often contains the main structure and routing logic for the app.

- Example:

```js
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
```

3. **`package.json`** :

- This file contains metadata about your project and its dependencies.

- It lists the packages your project depends on, as well as scripts you can run, and the version of your project.

- Example:

```json
{
  "name": "my-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.22.0",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.22.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^16.0.0",
    "typescript": "~5.7.2",
    "typescript-eslint": "^8.26.1",
    "vite": "^6.3.1"
  }
}
```

## Create basic page

In this tutorial, we will create a simple page layout that includes two Card components. Each card will display some content, and we’ll structure our project to separate components and pages effectively.

Your project structure might look like this:

```plaintext
/src
  |-- components
  |     |-- Card
  |     |    |-- Card.tsx
  |     |    |-- Card.styles.css
  |-- pages
  |     |-- CardsPage
  |     |    |-- CardsPage.tsx
  |     |    |-- CardsPage.styles.css
  |-- main.tsx
  |-- App.tsx
```

#### Step 1: Delete irrelevant files

- delete `./index.css`
- delete `./App.css`
- delete `./assets/react.svg`

#### Step 2: Write the Card Component

- **Card.tsx**

```js
import React from "react";
import "./Card.styles.css";

export const Card: React.FC = () => {
  return (
    <div className="card">
      <img
        src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ7qJ3Zs1RzzOTQ-ayvL38mNy4sewFDbwOFlJslSzELB3ISCPkAOJmcRisaI0_PJ0BFf5X7ghyE_hA1mjL-P7pldw"
        alt="Default Image"
        className="card-image"
      />
      <div className="card-content">
        <h3>Default Title</h3>
        <p>This is a default description for the card.</p>
        <span>2024-08-10</span>
      </div>
    </div>
  );
};
```

- **Card.styles.css**

```css
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  max-width: 300px;
  text-align: center;
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);
  margin: 16px;
}

.card-image {
  width: 100%;
  height: auto;
  border-radius: 8px 8px 0 0;
}

.card-content h3 {
  margin: 16px 0 8px;
  font-size: 1.5rem;
}

.card-content p {
  font-size: 1rem;
  color: #666;
}

.card-content span {
  display: block;
  margin-top: 12px;
  color: #999;
}
```

#### Step 3: Create a Page to Render Two Cards

- **CardsPage.tsx**

```js
import React from "react";
import { Card } from "../../components/Card/Card";
import "./CardsPage.styles.css";

export const CardsPage: React.FC = () => {
  return (
    <div className="cards-page">
      <Card />
      <Card />
    </div>
  );
};
```

- **CardsPage.styles.css**

```css
.cards-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px;
  gap: 16px;
}
```

#### Step 4: Add CardsPage in App

```js
import { CardsPage } from "./pages/CardsPage/CardsPage";

export const App = () => {
  return (
    <>
      <CardsPage />
    </>
  );
};
```

## Parsing props

Next, let's modify the Card component to accept props, which will allow it to display dynamic content. We'll also explain the use of `React.FC` and how props are passed in React.

#### Enhancing Card with Props

- **Card.tsx (updated with props)**

```javascript
import React from "react";
import "./Card.styles.css";

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  date,
}) => {
  return (
    <div className="card">
      <img src={imageUrl} alt={title} className="card-image" />
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <span>{date}</span>
      </div>
    </div>
  );
};
```

#### Updating the CardsPage to Use Dynamic Data

- **CardsPage.tsx (updated)**

```javascript
import React from "react";
import { Card } from "../../components/Card/Card";
import "./CardsPage.styles.css";

const mockData = [
  {
    title: "Card Title 1",
    description: "This is a description for card 1.",
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
    date: "2024-08-10",
  },
  {
    title: "Card Title 2",
    description: "This is a description for card 2.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT53oaI27s3aNqsnrUqdBlv4eIR-HxS1tuUQ&s",
    date: "2024-08-11",
  },
];

export const CardsPage: React.FC = () => {
  return (
    <div className="cards-page">
      {mockData.map((data, index) => (
        <Card
          key={index}
          title={data.title}
          description={data.description}
          imageUrl={data.imageUrl}
          date={data.date}
        />
      ))}
    </div>
  );
};
```

### Understanding React.FC and Props

`React.FC` stands for React Functional Component. It's a type definition (generic type) provided by TypeScript to describe functional components. This type can also specify the expected props as a generic parameter, as shown in `CardProps`.

#### Props in React

- **Props** are how components talk to each other in React. They are passed to the component similar to how arguments are passed to a function. Props make components reusable by giving you the ability to pass different values to components based on the parent component's context.

This structure and explanation guide you through creating reusable components in React and passing them dynamic data through props.

## Navigation

To create a navigation system that allows switching between `Page1`, `Page2`, and `CardsPage` using React Router, we'll set up routes in your application and add buttons on each page for easy navigation.

### Step 1: Install React Router

If React Router is not already installed in your project, install it using npm or yarn:

```bash
npm install react-router-dom
```

### Step 2: Set Up the Router in Your App

We'll configure the main `App` component to define routes for `Page1`, `Page2`, and `CardsPage`. We'll also include a navigation menu with links to each page.

```javascript
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Page1 } from "./pages/Page1/Page1";
import { Page2 } from "./pages/Page2/Page2";
import { CardsPage } from "./pages/CardsPage/CardsPage";

export const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/page1">Page 1</Link>
            </li>
            <li>
              <Link to="/page2">Page 2</Link>
            </li>
            <li>
              <Link to="/cards">Cards Page</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/" element={<Page1 />} /> {/* Default route */}
        </Routes>
      </div>
    </Router>
  );
};
```

Step 3: Create `Page1`, `Page2`, and `CardsPage` Components with Navigation ButtonsNext, let's define `Page1`, `Page2`, and `CardsPage` components, each including buttons to navigate between the pages.`Page1` Component (`Page1.tsx`)

```javascript
import React from "react";
import { useNavigate } from "react-router-dom";

export const Page1: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to Page 1</h1>
      <button onClick={() => navigate("/page2")}>Go to Page 2</button>
      <button onClick={() => navigate("/cards")}>Go to Cards Page</button>
    </div>
  );
};
```

`Page2` Component (`Page2.tsx`)

```javascript
import React from "react";
import { useNavigate } from "react-router-dom";

export const Page2: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to Page 2</h1>
      <button onClick={() => navigate("/page1")}>Go to Page 1</button>
      <button onClick={() => navigate("/cards")}>Go to Cards Page</button>
    </div>
  );
};
```

### Step 4: Add Basic Styling (Optional)

You can add some CSS to style the navigation menu and buttons:

```css
nav {
  background-color: #333;
  padding: 10px 20px;
  font-family: "Arial", sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
}

nav ul li {
  margin-right: 20px;
}

nav ul li a {
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: color 0.3s ease, text-decoration 0.3s ease;
}

nav ul li a:hover {
  color: #ff6347;
  text-decoration: underline;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

nav .logo {
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
}
```

### Summary

This setup creates a fully functional navigation system using React Router. Each page (`Page1`, `Page2`, and `CardsPage`) contains buttons to navigate to the other pages. Additionally, the main navigation menu allows for quick switching between the pages via links.The `useNavigate` hook from React Router enables programmatic navigation, providing a smooth user experience as users transition between different parts of your application.
