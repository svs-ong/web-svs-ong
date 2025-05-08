# React Hooks

In React, a hook is a special function that allows you to "hook into" React features like state, lifecycle methods, and context without writing a class component. Hooks make it easier to organize logic inside components, reuse functionality across components, and write cleaner, more readable code.

## `useState`

The `useState` hook allows you to add and manage **state** inside a **functional component** .

Whenever the state changes, React automatically re-renders the component to reflect the new state on the screen.
In simple words: **State is any data that can change over time** — and when it does, the UI updates

### Syntax

```tsx
const [state, setState] = useState(initialValue);
```

- `state`: The current value.

- `setState`: A function you call to change the value.

- `initialValue`: The starting value for the state.

---

Example using **Material-UI (MUI)**

```tsx
import React, { useState } from "react";
import { Button, Typography, Box } from "@mui/material";

export const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h5" gutterBottom>
        You clicked {count} times
      </Typography>
      <Button variant="contained" onClick={() => setCount(count + 1)}>
        Click me
      </Button>
    </Box>
  );
};
```

---

### What happens here?

- `useState(0)` creates a `count` state variable with an initial value of `0`.

- When the **Button** is clicked, `setCount(count + 1)` updates the `count`.

- Because the state changed, React **re-renders** the component, and you immediately see the updated number on the screen.

**Important** : In React, any time a state changes, the component **re-renders** to make sure the UI stays in sync with the latest data.

---
