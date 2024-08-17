# React Tutorial

## What is React?

**React** is a popular JavaScript library for building user interfaces, primarily focused on building single-page applications (SPAs) where you can build reusable UI components. It allows developers to create large web applications that can update and render efficiently in response to data changes. React's core principle is based on the concept of components—small, reusable pieces of UI that you can compose together to build complex interfaces.

### Explanation of Files

1. **`index.tsx` (or `index.js`)** :

- This is the entry point of your React application.

- It typically renders the root component (often `App.tsx`) into the DOM.

- Example:

```js
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

```js
import React from "react";
import "./App.css";
import CardsPage from './pages/CardsPage/CardsPage';

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

## Create basic page

### Creating a Basic Page with Two Card Components

#### Step 1: Write the Card Component

- **Card.tsx**



```js
import React from "react";
import './Card.styles.css';

const Card: React.FC = () => {
  return (
    <div className="card">
      <img src="https://via.placeholder.com/300" alt="Default Image" className="card-image" />
      <div className="card-content">
        <h3>Default Title</h3>
        <p>This is a default description for the card.</p>
        <span>2024-08-10</span>
      </div>
    </div>
  );
};

export default Card;
```


- **Card.styles.css**



```
css
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



```js
import React from "react";
import Card from "../components/Card/Card";
import "./CardsPage.styles.css";

const CardsPage: React.FC = () => {
  return (
    <div className="cards-page">
      <Card />
      <Card />
    </div>
  );
};

export default CardsPage;
```


- **CardsPage.styles.css**



```
css
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


```
plaintext
/src
  |-- components
  |     |-- Card
  |     |    |-- Card.tsx
  |     |    |-- Card.styles.css
  |-- pages
  |     |-- CardsPage
  |     |    |-- CardsPage.tsx
  |     |    |-- CardsPage.styles.css
  |-- index.tsx
  |-- App.tsx
  |-- index.css
  |-- package.json
```


## Parsing props

Next, let's modify the Card component to accept props, which will allow it to display dynamic content. We'll also explain the use of `React.FC` and how props are passed in React.


#### Enhancing Card with Props 
 
- **Card.tsx (updated with props)**


```javascript
import React from "react";
import './Card.styles.css';

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

#### Updating the CardsPage to Use Dynamic Data 
 
- **CardsPage.tsx (updated)**


```javascript
import React from "react";
import Card from "../components/Card/Card";
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

### Understanding React.FC and Props 
`React.FC` stands for React Functional Component. It's a type definition (generic type) provided by TypeScript to describe functional components. This type can also specify the expected props as a generic parameter, as shown in `CardProps`.
#### Props in React 
 
- **Props**  are how components talk to each other in React. They are passed to the component similar to how arguments are passed to a function. Props make components reusable by giving you the ability to pass different values to components based on the parent component's context.

This structure and explanation guide you through creating reusable components in React and passing them dynamic data through props.

## useState & useEffect

Enhancing `CardsPage` with `useState` and `useEffect`Let's enhance the `CardsPage` component by incorporating `useState` for handling the card data and the loading status, and `useEffect` to simulate data fetching.

### Step 1: Implementing `useState` Hooks

We'll start by using `useState` to create state variables for the card data and a loading indicator.

```javascript
import React, { useState, useEffect } from 'react';
import Card from "../components/Card/Card";
import "./CardsPage.styles.css";

const CardsPage: React.FC = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // ... useEffect will be added here ...

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cards-page">
      {cards.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          description={card.description}
          imageUrl={card.imageUrl}
          date={card.date}
        />
      ))}
    </div>
  );
};

export default CardsPage;
```
### Step 2: Simulating Data Fetching with `useEffect`

Next, we'll simulate data fetching by utilizing `useEffect`. This will involve using a timeout to mimic an asynchronous API call.

```javascript
async function fetchData() {
  // Simulate a network request with a delay
  return new Promise(resolve => {
    setTimeout(() => {
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
      resolve(mockData);
    }, 2000);
  });
}
```
Completing the `CardsPage` ComponentNow, we'll combine everything to complete the `CardsPage` component, using both `useState` and `useEffect` to manage the state and side effects.

```js
const CardsPage: React.FC = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true); 

    const data = await fetchData();

    setCards(data)
    setIsLoading(false);
  }, []); 

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="cards-page">
      {cards.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          description={card.description}
          imageUrl={card.imageUrl}
          date={card.date}
        />
      ))}
    </div>
  );
};
```
This improved version of `CardsPage` dynamically fetches data and updates the UI based on state changes, effectively utilizing React's `useState` and `useEffect` hooks.


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
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Page1 from './Page1';
import Page2 from './Page2';
import CardsPage from './CardsPage';

const App: React.FC = () => {
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

export default App;
```
Step 3: Create `Page1`, `Page2`, and `CardsPage` Components with Navigation ButtonsNext, let's define `Page1`, `Page2`, and `CardsPage` components, each including buttons to navigate between the pages.`Page1` Component (`Page1.tsx`)

```javascript
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Page1: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to Page 1</h1>
      <button onClick={() => navigate('/page2')}>Go to Page 2</button>
      <button onClick={() => navigate('/cards')}>Go to Cards Page</button>
    </div>
  );
};

export default Page1;
```
`Page2` Component (`Page2.tsx`)

```javascript
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Page2: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to Page 2</h1>
      <button onClick={() => navigate('/page1')}>Go to Page 1</button>
      <button onClick={() => navigate('/cards')}>Go to Cards Page</button>
    </div>
  );
};

export default Page2;
```
`CardsPage` Component (`CardsPage.tsx`)

```javascript
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from "../components/Card/Card";
import "./CardsPage.styles.css";

const CardsPage: React.FC = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    fetchData().then(data => {
      setCards(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Cards Page</h1>
      <div className="cards-page">
        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            imageUrl={card.imageUrl}
            date={card.date}
          />
        ))}
      </div>
      <button onClick={() => navigate('/page1')}>Go to Page 1</button>
      <button onClick={() => navigate('/page2')}>Go to Page 2</button>
    </div>
  );
};

export default CardsPage;
```

### Step 4: Add Basic Styling (Optional) 

You can add some CSS to style the navigation menu and buttons:


```css
nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin-right: 20px;
}

nav ul li a {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}

nav ul li a:hover {
  text-decoration: underline;
}

button {
  margin-right: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
```

### Summary 
This setup creates a fully functional navigation system using React Router. Each page (`Page1`, `Page2`, and `CardsPage`) contains buttons to navigate to the other pages. Additionally, the main navigation menu allows for quick switching between the pages via links.The `useNavigate` hook from React Router enables programmatic navigation, providing a smooth user experience as users transition between different parts of your application.

