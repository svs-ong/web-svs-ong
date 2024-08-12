# React Tutorial

What is react ?

Explain the files (index, App, package.json)

## Create basic page

Write a card component. Make a page that will contains 2 cards. Use Typescript. Create some .styles.css files for each

## Parsing props to a component

In the card example, card will take some props like a title, a description, image url, and a date. Make an interface for stoing this props.

Now the Page will again call this card twice but with different prosps. Make some mock data from where the CardsPage Will take the props.

## useState & useEffect

## Navigation

---

### What is React?

**React** is a popular JavaScript library for building user interfaces, primarily focused on building single-page applications (SPAs) where you can build reusable UI components. It allows developers to create large web applications that can update and render efficiently in response to data changes. React's core principle is based on the concept of components—small, reusable pieces of UI that you can compose together to build complex interfaces.

### Explanation of Files

1. **`index.tsx` (or `index.js`)** :

- This is the entry point of your React application.

- It typically renders the root component (often `App.tsx`) into the DOM.

- Example:

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

2. **`App.tsx` (or `App.js`)** :

- This is the root component of your React application.

- It often contains the main structure and routing logic for the app.

- Example:

```typescript
import React from "react";
import "./App.css";
import CardsPage from "./CardsPage";

function App() {
  return (
    <div className="App">
      <CardsPage />
    </div>
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
  "name": "react-app",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^4.8.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

### Creating a Basic Page with Two Card Components

#### Step 1: Write the Card Component

- **Card.tsx**

```typescript
import React from "react";
import "./Card.styles.css";

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, date }) => {
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

export default Card;
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

#### Step 2: Create a Page to Render Two Cards

- **CardsPage.tsx**

```typescript
import React from "react";
import Card from "./Card";
import "./CardsPage.styles.css";

const mockData = [
  {
    title: "Card Title 1",
    description: "This is a description for card 1.",
    imageUrl: "https://via.placeholder.com/300",
    date: "2024-08-10",
  },
  {
    title: "Card Title 2",
    description: "This is a description for card 2.",
    imageUrl: "https://via.placeholder.com/300",
    date: "2024-08-11",
  },
];

const CardsPage: React.FC = () => {
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

export default CardsPage;
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

### Final Folder Structure

Your project structure might look like this:

```lua
/src
  |-- index.tsx
  |-- App.tsx
  |-- Card.tsx
  |-- Card.styles.css
  |-- CardsPage.tsx
  |-- CardsPage.styles.css
  |-- index.css
  |-- App.css
  |-- package.json
```

### Parsing Props to a Component

In the `Card.tsx` example above, we created a `CardProps` interface to define the types of the props that the `Card` component will accept. This allows for type checking and ensures that the data passed to the component matches the expected types.

### Full Example in TypeScript

This example should give you a complete picture of how to structure a basic React page with TypeScript and CSS modules.

Let me know if you need further assistance or explanation!
