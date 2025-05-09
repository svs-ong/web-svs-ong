# React Hooks

In React, a hook is a special function that allows you to "hook into" React features like state, lifecycle methods, and context without writing a class component. Hooks make it easier to organize logic inside components, reuse functionality across components, and write cleaner, more readable code.

## `useState`

The `useState` hook allows you to add and manage **state** inside a **functional component** .

Whenever the state changes, React automatically re-renders the component to reflect the new state on the screen.
In simple words: **State is any data that can change over time** — and when it does, the UI updates

### Syntax

```js
const [state, setState] = useState(initialValue);
```

- `state`: The current value.

- `setState`: A function you call to change the value.

- `initialValue`: The starting value for the state.

---

Example using **Material-UI (MUI)**

```js
import { useState } from "react";
import { Button, Typography, Stack } from "@mui/material";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <Stack spacing={2} textAlign="center" mt={4}>
      <Typography variant="h5" gutterBottom>
        You clicked {count} times
      </Typography>
      <Button variant="contained" onClick={() => setCount(count + 1)}>
        Click me
      </Button>
    </Stack>
  );
};

export default App;
```

---

### What happens here?

- `useState(0)` creates a `count` state variable with an initial value of `0`.

- When the **Button** is clicked, `setCount(count + 1)` updates the `count`.

- Because the state changed, React **re-renders** the component, and you immediately see the updated number on the screen.

**Important** : In React, any time a state changes, the component **re-renders** to make sure the UI stays in sync with the latest data.

---

### Proper State Updates and Reference Handling

When updating state in React, it's important to handle references correctly, especially when dealing with objects and arrays. Here's an example showing both incorrect and correct ways to update state:

```js
import { useState } from "react";
import { Button, Typography, Stack } from "@mui/material";

// Define interfaces for our user object
interface UserPreferences {
  notifications: boolean;
}

interface User {
  name: string;
  preferences: UserPreferences;
}

const App = () => {
  // State with an object
  const [user, setUser] =
    useState <
    User >
    {
      name: "John",
      preferences: {
        notifications: true,
      },
    };

  // ❌ Incorrect way: Directly mutating the state
  const handleIncorrectUpdate = () => {
    user.preferences.notifications = !user.preferences.notifications; // This mutates the state directly
    setUser(user); // This won't trigger a re-render because the reference hasn't changed
  };

  // ✅ Correct way: Creating a new reference
  const handleCorrectUpdate = () => {
    setUser({
      ...user,
      preferences: {
        ...user.preferences,
        notifications: !user.preferences.notifications,
      },
    });
  };

  return (
    <Stack spacing={2} textAlign="center" mt={4}>
      <Typography variant="h5" gutterBottom>
        Notifications are{" "}
        {user.preferences.notifications ? "enabled" : "disabled"}
      </Typography>
      <Button variant="contained" onClick={handleCorrectUpdate} sx={{ mr: 2 }}>
        Toggle Notifications (Correct)
      </Button>
      <Button variant="outlined" onClick={handleIncorrectUpdate}>
        Toggle Notifications (Incorrect)
      </Button>
    </Stack>
  );
};

export default App;
```

In this example:

1. We've simplified the TypeScript interfaces:

   - `UserPreferences` interface now only contains the notifications boolean
   - `User` interface remains the same structure

2. The incorrect way (`handleIncorrectUpdate`):

   - Directly mutates the state object
   - Doesn't create a new reference
   - Won't trigger a re-render
   - Violates React's immutability principle

3. The correct way (`handleCorrectUpdate`):
   - Creates a new object using the spread operator
   - Maintains immutability
   - Creates new references for changed objects
   - Properly triggers re-renders

Remember: React uses reference equality to determine if state has changed. Always create new references when updating state objects or arrays.

---

## `useEffect`

The `useEffect` hook lets you perform side effects in function components. Think of it as your component's way of saying "Hey, I need to do something after I render!"

### Understanding useEffect Behavior

1. **No Dependency Array** 🏃‍♂️

   - Runs after every render
   - Like a sprinter who never stops
   - Use sparingly!

2. **Empty Array `[]`** 🎯

   - Runs once after mount
   - Like a sniper - one shot, one kill
   - Perfect for setup

3. **With Dependencies `[value]`** 🧠
   - Runs when dependencies change
   - Like a smart thermostat
   - Most common use case

Let's see these in action with some examples:

### Basic Usage

**Explanation:**
Think of this as the "always-on" mode. Your effect runs after every render, like a friend who shows up to every party, even the ones they weren't invited to! 🎉

⚠️ **WARNING**: This example shows what NOT to do! It creates an infinite loop because:

1. Effect runs and updates state
2. State update causes a re-render
3. Re-render triggers the effect again
4. And the cycle continues... 🔄

```js
import { useState, useEffect } from "react";
import { Typography, Stack, Button } from "@mui/material";

const App = () => {
  const [count, setCount] = useState(0);
  const [effectCount, setEffectCount] = useState(0);

  // ⚠️ BAD PRACTICE: This creates an infinite loop!
  useEffect(() => {
    console.log("Effect ran!");
    setEffectCount((prev) => prev + 1); // This causes another render!
  }); // No dependency array

  return (
    <Stack spacing={2} textAlign="center" mt={4}>
      <Typography variant="h5" gutterBottom>
        Button clicked: {count} times
      </Typography>
      <Typography variant="h6" gutterBottom color="error">
        Effect ran: {effectCount} times (and counting...)
      </Typography>
      <Button variant="contained" onClick={() => setCount((c) => c + 1)}>
        Click me
      </Button>
    </Stack>
  );
};

export default App;
```

### With Empty Dependency Array

**Explanation:**
The "one-time setup" mode. Like setting up your room once and never moving the furniture again. Perfect for initial API calls or setting up subscriptions! 🏠

Note: In development mode with Strict Mode, this effect runs twice! This is intentional to help catch bugs. In production, it runs only once.

```js
import { useState, useEffect } from "react";
import { Typography, Stack, Button } from "@mui/material";

const App = () => {
  const [count, setCount] = useState(0);
  const [effectCount, setEffectCount] = useState(0);

  // This effect runs only once after initial render
  // (or twice in development with Strict Mode)
  useEffect(() => {
    console.log("Effect ran!");
    setEffectCount((prev) => prev + 1);
  }, []); // Empty dependency array

  return (
    <Stack spacing={2} textAlign="center" mt={4}>
      <Typography variant="h5" gutterBottom>
        Button clicked: {count} times
      </Typography>
      <Typography variant="h6" gutterBottom>
        Effect ran: {effectCount} times
      </Typography>
      <Button variant="contained" onClick={() => setCount((c) => c + 1)}>
        Click me
      </Button>
    </Stack>
  );
};

export default App;
```

### With Dependencies

**Explanation:**
The "smart" mode. Your effect only runs when its dependencies change, like a friend who only shows up when there's pizza! 🍕

```js
import { useState, useEffect } from "react";
import { Typography, Stack, Button } from "@mui/material";

const App = () => {
  const [count, setCount] = useState(0);
  const [effectCount, setEffectCount] = useState(0);

  // This effect runs when count changes
  useEffect(() => {
    console.log("Effect ran!");
    setEffectCount((prev) => prev + 1);
  }, [count]); // Dependency array with count

  return (
    <Stack spacing={2} textAlign="center" mt={4}>
      <Typography variant="h5" gutterBottom>
        Button clicked: {count} times
      </Typography>
      <Typography variant="h6" gutterBottom>
        Effect ran: {effectCount} times
      </Typography>
      <Button variant="contained" onClick={() => setCount((c) => c + 1)}>
        Click me
      </Button>
    </Stack>
  );
};

export default App;
```

### Common Mistakes

1. **Missing Dependencies**

```js
// ❌ Bad: Missing count in dependencies
useEffect(() => {
  console.log(count);
}, []); // ESLint will warn about this

// ✅ Good: Include all dependencies
useEffect(() => {
  console.log(count);
}, [count]);
```

2. **Infinite Loops**

```js
// ❌ Bad: Causes infinite loop
useEffect(() => {
  setCount(count + 1);
}, [count]);

// ✅ Good: Use functional update
useEffect(() => {
  setCount((c) => c + 1);
}, []); // Only runs once
```

3. **Unnecessary Effects**

```js
// ❌ Bad: Don't use effect for derived state
const [fullName, setFullName] = useState("");
useEffect(() => {
  setFullName(firstName + " " + lastName);
}, [firstName, lastName]);

// ✅ Good: Calculate directly
const fullName = firstName + " " + lastName;
```

Now that we understand the basics, let's look at a more complex example with data fetching...

### Example: Fetching Data

```js
import { useState, useEffect } from "react";
import { Typography, Stack, CircularProgress, LinearProgress } from "@mui/material";

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

// Utility function to simulate network delay
const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const fetchPosts = async (): Promise<void> => {
      try {
        setLoadingProgress(0);
        // Simulate initial network delay
        await delay(1000);
        setLoadingProgress(30);

        const response: Response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        setLoadingProgress(60);

        // Simulate processing delay
        await delay(500);
        const data: Post[] = await response.json();
        setLoadingProgress(90);

        // Final delay before showing data
        await delay(300);
        setPosts(data);
        setLoadingProgress(100);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return (
      <Stack spacing={2} p={4}>
        <Typography variant="h6" gutterBottom>
          Loading posts...
        </Typography>
        <LinearProgress
          variant="determinate"
          value={loadingProgress}
          sx={{ mb: 2 }}
        />
        <Stack direction="row" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Stack>
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack spacing={2} textAlign="center" mt={4}>
        <Typography color="error">{error}</Typography>
      </Stack>
    );
  }

  return (
    <Stack spacing={2} p={4}>
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      <Stack spacing={2}>
        {posts.map((post) => (
          <Stack key={post.id} spacing={1} p={2} sx={{ border: "1px solid #eee", borderRadius: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              User ID: {post.userId} | Post ID: {post.id}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
              {post.body}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default App;
```

### Understanding Loading States

In this example, we've added several loading states to demonstrate how to handle asynchronous operations:

1. **Artificial Delays**:

   - Initial network delay (1000ms)
   - Processing delay (500ms)
   - Final delay before showing data (300ms)

2. **Loading Progress**:

   - Uses both `LinearProgress` and `CircularProgress`
   - Shows percentage completion
   - Provides visual feedback during loading

3. **Loading States**:
   - 0% - Initial state
   - 30% - After initial delay
   - 60% - After fetch request
   - 90% - After data processing
   - 100% - Complete

This demonstrates how to:

- Handle multiple asynchronous operations
- Show loading progress
- Provide visual feedback to users
- Manage loading states in React

### Understanding Promise Types in TypeScript

When working with `

## Data Fetching

Let's explore different ways to fetch data using hooks, from simple to more advanced patterns.

### Basic Data Fetching

**Explanation:**
The simplest way to fetch data - just call the API when the component mounts. Like ordering pizza when you get home! 🍕

```js
import { useState, useEffect } from "react";
import { Typography, Stack, CircularProgress } from "@mui/material";

interface Post {
  id: number;
  title: string;
  body: string;
}

// Utility function to simulate network delay
const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Declare fetchPosts outside useEffect
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate network delay
      await delay(1000);
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  // Use fetchPosts in useEffect
  useEffect(() => {
    fetchPosts();
  }, []); // Empty array means fetch only once

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Stack spacing={2} p={4}>
      {posts.map((post) => (
        <Stack key={post.id} spacing={1} p={2} sx={{ border: "1px solid #eee", borderRadius: 1 }}>
          <Typography variant="h6">{post.title}</Typography>
          <Typography>{post.body}</Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default App;
```

### With Refetch Function

**Explanation:**
Now we can fetch data whenever we want! Like having a magic button that makes pizza appear. 🍕✨

```js
import { useState, useEffect } from "react";
import { Typography, Stack, CircularProgress, Button } from "@mui/material";

interface Post {
  id: number;
  title: string;
  body: string;
}

// Utility function to simulate network delay
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Declare fetchPosts outside useEffect
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate network delay
      await delay(1000);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  // Use fetchPosts in useEffect
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Stack alignItems="flex-start" spacing={2} p={4} >
      <Button
        variant="contained"
        onClick={fetchPosts}
        disabled={loading}
        sx={{ mb: 2 }}
      >
        {loading ? "Loading..." : "Refresh Posts"}
      </Button>

      {loading && <CircularProgress/>}

      {error && <Typography color="error">{error}</Typography>}


        {posts.map((post) => (
          <Stack key={post.id} spacing={1} p={2} sx={{ border: '1px solid #eee', borderRadius: 1 }}>
            <Typography variant="h6">{post.title}</Typography>
            <Typography>{post.body}</Typography>
          </Stack>
        ))}
    </Stack>
  );
};

export default App;
```

## Custom Hook Pattern

**Explanation:**
Time to level up! Let's separate our data fetching logic into a custom hook. Like having a personal chef who handles all the cooking! 👨‍🍳

### Naming Convention

All custom hooks must start with the prefix `use`. This is a React convention that:

- Helps identify hooks in the code
- Enables React's linting rules to properly check hook rules
- Makes it clear that the function follows React's hook rules
- Follows the same pattern as built-in hooks like `useState`, `useEffect`, etc.

The custom hook pattern gives us several benefits:

- Reusable data fetching logic
- Cleaner component code
- Easier testing
- Better separation of concerns

```js
// usePosts.ts
import { useState, useEffect } from "react";
import { Typography, Stack, Button, CircularProgress } from "@mui/material";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface UsePostsResult {
  posts: Post[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Utility function to simulate network delay
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const usePosts = (): UsePostsResult => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Declare fetchPosts outside useEffect
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate network delay
      await delay(1000);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  // Use fetchPosts in useEffect
  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading, error, refetch: fetchPosts };
};

const App = () => {
  const { posts, loading, error, refetch } = usePosts();

  return (
    <Stack alignItems="flex-start" spacing={2} p={4}>
      <Button variant="contained" onClick={refetch} disabled={loading}>
        {loading ? "Loading..." : "Refresh Posts"}
      </Button>

      {loading && <CircularProgress />}

      {error && <Typography color="error">{error}</Typography>}

      {posts.map((post) => (
        <Stack
          key={post.id}
          spacing={1}
          p={2}
          sx={{ border: "1px solid #eee", borderRadius: 1 }}
        >
          <Typography variant="h6">{post.title}</Typography>
          <Typography>{post.body}</Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default App;
```

## Homework: Blog Articles with Data Fetching

In this homework, you'll build upon your React fundamentals and MUI knowledge to create a blog homepage that fetches and displays articles from a server.

### Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/svs-ong/web-intership-homework.git
   ```

2. **Start the Server**

   - Navigate to the server directory: `cd server`
   - Install dependencies: `npm install`
   - Start the server: `npm start`
   - The server will run on `http://localhost:3001`

3. **Project Structure**
   ```
   web-intership-homework/
   ├── server/           # Backend server (don't modify)
   └── homework/         # Your React application
       ├── src/
       │   ├── components/
       │   │   ├── Header.tsx
       │   │   ├── Footer.tsx
       │   │   └── ArticleCard.tsx
       │   ├── hooks/
       │   │   └── useArticles.ts
       │   └── App.tsx
       └── package.json
   ```

### Tasks

1. **Create a Custom Hook for Articles**

   ```typescript
   // hooks/useArticles.ts
   interface Article {
     id: number;
     title: string;
     content: string;
     author: string;
     date: string;
     imageUrl: string;
   }

   interface UseArticlesResult {
     articles: Article[];
     loading: boolean;
     error: string | null;
     refetch: () => Promise<void>;
   }
   ```

   - Implement the `useArticles` hook to fetch articles from `http://localhost:3001/articles`
   - Handle loading and error states
   - Include a refetch function for manual updates

2. **Create an Article Card Component**

   ```typescript
   // components/ArticleCard.tsx
   interface ArticleCardProps {
     article: Article;
   }
   ```

   - Use MUI components to create a beautiful card layout
   - Display article title, author, date, and a preview of the content
   - Add hover effects and proper spacing

3. **Update the Homepage**
   - Replace the static articles section with dynamic data
   - Implement loading states with MUI's `CircularProgress`
   - Handle error states gracefully
   - Add a refresh button to fetch new articles

### Requirements

1. **Data Fetching**

   - Use `useEffect` for initial data loading
   - Implement proper error handling
   - Show loading states during fetch operations

2. **UI/UX**

   - Use MUI's `Stack` for layout
   - Implement responsive design
   - Add loading skeletons for better UX
   - Include error messages with retry options

3. **Code Quality**
   - Follow React best practices
   - Use TypeScript for type safety
   - Implement proper error boundaries
   - Write clean, maintainable code

### Example Implementation

```typescript
// hooks/useArticles.ts
import { useState, useEffect } from "react";

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://localhost:3001/articles");
      if (!response.ok) throw new Error("Failed to fetch articles");
      const data = await response.json();
      setArticles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return { articles, loading, error, refetch: fetchArticles };
};

// components/ArticleCard.tsx
import { Card, CardContent, CardMedia, Typography, Stack } from "@mui/material";

export const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={article.imageUrl}
        alt={article.title}
      />
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h6">{article.title}</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            By {article.author} • {new Date(article.date).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {article.content.substring(0, 150)}...
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

// App.tsx
import { Stack, CircularProgress, Button, Alert } from "@mui/material";
import { useArticles } from "./hooks/useArticles";
import { ArticleCard } from "./components/ArticleCard";

const App = () => {
  const { articles, loading, error, refetch } = useArticles();

  return (
    <Stack spacing={2} p={4}>
      <Button variant="contained" onClick={refetch} disabled={loading}>
        Refresh Articles
      </Button>

      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Stack alignItems="center" p={4}>
          <CircularProgress />
        </Stack>
      ) : (
        <Stack spacing={2}>
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </Stack>
      )}
    </Stack>
  );
};
```

### Bonus Tasks

1. **Pagination**

   - Implement pagination for articles
   - Add "Load More" functionality
   - Handle loading states for pagination

2. **Search and Filter**

   - Add search functionality
   - Implement filters by author or date
   - Use `useMemo` for filtered results

3. **Article Details**
   - Create a detailed view for each article
   - Implement routing to article pages
   - Add related articles section

### Submission

1. Create a new branch for your work
2. Implement the required features
3. Test thoroughly
4. Create a pull request with your changes
5. Include screenshots of your implementation

### Resources

- [React Hooks Documentation](https://react.dev/reference/react)
- [Material-UI Documentation](https://mui.com/material-ui/getting-started/overview/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

Good luck with your implementation! Remember to follow React best practices and create a clean, maintainable codebase.
