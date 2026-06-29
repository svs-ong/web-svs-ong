# React Hooks

In React, a hook is a special function that allows you to "hook onto" React features like state, lifecycle methods, and context without writing another class component. Hooks make it easier to organize logic inside components, reuse functionality across components, and write cleaner, more readable code.

!! Later when we will introduce NextJS into the equation it is important to know that **most** React Hooks work ***exclusively*** on the client side of the app. In a **pure React** environment everything is compiled client-side so this problem can be ignored until you learn about NextJS. !!

## `useState`

The `useState` hook allows you to add and manage the **state** inside a **functional component** .

Whenever the state changes, React automatically re-renders the component to reflect the new state on the screen.
In simple words: **State is any data that can change over time** — and when it does, the UI updates

### Syntax

```js
const [state, setState] = useState<T>(initialValue);
```

- `state`: The current value.


- `setState`: A function you call to change the value.

- `T`: The type of the state (optional but recommended in a Typescript environment) 

- `initialValue`: The starting value for the state.

---

Example using **Material-UI (MUI)**

```js
import { useState } from "react";
import { Button, Typography, Stack } from "@mui/material";

const App = () => {
  const [count, setCount] = useState<number>(0);

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

### An Example from our website svs.ong


```js
const NavDrawer: React.FC = () => {
  // ... some code
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [animateItems, setAnimateItems] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // ... some more code
  
  return (
    <>
      <IconButton edge="start" color="inherit" onClick={handleDrawerToggle}>
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: theme.palette.grey[900],
          },
        }}
      >
        <Stack spacing={2} sx={{ p: '10px 10px' }}>
          <IconButton onClick={handleDrawerToggle} sx={{ alignSelf: 'flex-start' }}>
            <CloseIcon sx={{ color: theme.palette.common.white }} />
          </IconButton>
            //[...]
        </Stack>
      </Drawer>
    </>
  );
};

export default NavDrawer;

```



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
    useState<User>({ name: "John",preferences: {notifications: true,}});

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


### Syntax

```js
useEffect(()=>{},[]); 
// or
useEffect(myFunction(),[dependencies]);
```

- `useEffect(() =>{},...)` or `useEffect(myFunction(),...)`: The function that needs to be called. (required)

- `useEffect(..., [])` <- The dependency array. (optional)
---




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

### Let's see an example from svs.ong in the NavDrawer.tsx component again!

```js

const NavDrawer: React.FC = () => {
  //... some code
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [animateItems, setAnimateItems] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    if (drawerOpen) {
      // Allow the drawer to open first, then trigger animations
      const timer = setTimeout(() => setAnimateItems(true), 50);
      return () => clearTimeout(timer);
    } else {
      setAnimateItems(false);
    }
  }, [drawerOpen]);
    
    // [...]

            <Box
              sx={{
                paddingLeft: '35px',
                opacity: animateItems ? 1 : 0, /// the opacity changes with the state of animateItems
                transform: animateItems ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                transitionDelay: `${index * 100}ms`,
              }}
            >

    // [...]
    </>
  );
};

export default NavDrawer;

```


**Explanation**:

- When the drawer opens or closes, the state change gets picked up by the useEffect() and calls the function
to change the state of animateItems.

- We are doing this to make the opening and closing a more seamless animation




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

When working with Promises, it is important to use the keyword `await` to ensure that you are working with the resolved value of the Promise,
rather than the Promise object itself. This is especially important in `useEffect` hooks when performing asynchronous data fetching.

TypeScript can infer the type of the resolved value if the function returning the Promise is properly typed. For example:

```ts
async function fetchUser(): Promise<User> {
  const response = await fetch('/api/user');
  return response.json();
}
```

Inside a useEffect, since the callback function **cannot** be `async`, you typically define an **inner** `async function`:


```ts
useEffect(() => {
  const loadUser = async () => {
    const user = await fetchUser();
    setUser(user);
  };

  loadUser();
}, []);
```

***Using await helps TypeScript understand that user is of type User rather than Promise < User >***

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

### Like usual, here is an example from our site, svs.ong.


```js
// layoutUtils.ts
import pages from '@/components/pageRoutes.json';
import { useMediaQuery, useTheme } from '@mui/material';

/// ... other functions

export const useNavBarLayout = () => {
  const theme = useTheme();
  const isDesktopLargeUp = useMediaQuery(theme.breakpoints.up('lg'));
  const isDesktopUp = useMediaQuery(theme.breakpoints.up('md'));

  return {
    isDesktopLargeUp,
    isDesktopUp,
    isTabletDown: !isDesktopUp,
    height: { xs: 50, sm: 60 },
    spacing: { xs: 0.5, sm: 1, md: 1.5 },
    padding: {
      xs: theme.spacing(0.5, 1),
      sm: theme.spacing(0.5, 2),
      md: theme.spacing(0.5, 4),
    },
  };
};
```
**Explanation**:

- We define our own useNavBarLayout in which we call two different hooks that have not been showcased yet:

  - `useTheme()` - to access the theme components such as theme.spacing that are defined in the theme.ts file for Mui
  
  - `useMediaQuery()` : for media breakpoints ( responsive design )


- This is later used in the main component of the Navbar:

```js
const NavBar: React.FC = () => {
  ...
  const { isTabletDown, isDesktopLargeUp, isDesktopUp, height, padding, spacing } =
    useNavBarLayout();
  ...
}

```

