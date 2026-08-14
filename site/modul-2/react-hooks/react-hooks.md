# React Hooks

## Reference Equality

<div style="float: right;">~15 minutes</div>

`===` on objects and arrays checks whether both sides are the same thing in memory, not whether the contents match. React uses this exact check to decide whether to re-render — so mutating state is invisible to it, and spreading into a new object/array is what it actually notices.

```js
console.log(1 === 1); // true — primitives compare by value
console.log({ name: "Alex" } === { name: "Alex" }); // false — different objects
```

```js
// mutating: same reference in, same reference out
const a = { name: "Alex" };
const b = a; // not a copy
b.name = "Sam";

console.log(a.name); // "Sam" — a changed too
console.log(a === b); // true
```

```js
const arr = [1, 2, 3];
const alsoArr = arr;
alsoArr.push(4);

console.log(arr); // [1, 2, 3, 4]
console.log(arr === alsoArr); // true
```

```js
// spreading: destructure the old one, reconstruct a new one
const a = { name: "Alex", age: 12 };
const b = { ...a, name: "Sam" };

console.log(a); // { name: "Alex", age: 12 } — untouched
console.log(b); // { name: "Sam", age: 12 } — changed
console.log(a === b); // false
```

```js
const arr = [1, 2, 3];
const copy = [...arr, 4];

console.log(arr); // [1, 2, 3] — untouched
console.log(copy); // [1, 2, 3, 4] — changed
console.log(arr === copy); // false
```

| Keeps the same reference (mutates) | Creates a new reference                        |
| ---------------------------------- | ---------------------------------------------- |
| `obj.prop = x`                     | `{ ...obj, prop: x }`                          |
| `arr[i] = x`                       | `[...arr.slice(0, i), x, ...arr.slice(i + 1)]` |
| `arr.push(x)` / `.pop()`           | `[...arr, x]`                                  |
| `arr.sort()` / `.reverse()`        | `[...arr].sort()`                              |
| `arr.foreach(...)`                 | `arr.filter(...)`, `arr.map(...)`              |

---

## `useState`

<div style="float: right;">~35 minutes</div>

**State is how your app looks at a given moment.** Change the state, and the screen changes to match — that's the entire idea. `useState` is what gives a functional component a piece of state to hold onto, and a way to change it.

Whenever you change the state, React re-renders the component — it redraws the screen so it matches the new state. Nothing on screen updates unless the state behind it changed first.

### Syntax

```js
const [state, setState] = useState < T > initialValue;
```

- `state` — the current value.
- `setState` — the function you call to change it.
- `T` — the type of the state (optional, but recommended in a TypeScript environment).
- `initialValue` — what `state` starts out as.

### Example 1: primitive state

```js
import { useState } from "react";
import { Button, Typography, Stack } from "@mui/material";

export const App = () => {
  const [count, setCount] = useState < number > 0;

  return (
    <Stack spacing={2} sx={{ alignItems: "center" }}>
      <Typography variant="h5" gutterBottom>
        You clicked {count} times
      </Typography>
      <Button variant="contained" onClick={() => setCount(count + 1)}>
        Click me
      </Button>
    </Stack>
  );
};
```

- `useState(0)` creates `count`, starting at `0`.
- Clicking the button calls `setCount(count + 1)`.
- `count` changed → React re-renders → the new number shows up on screen.

> 🔧 Add a second button that calls `setCount(0)` to reset the counter — one more `setCount` call, nothing else changes.

### Example 2: object state

Counters and booleans are flat — a single value. But state can also be an object with several fields, like a user profile:

```js
import { useState } from "react";
import { Button, Typography, Stack } from "@mui/material";

export const App = () => {
  const [user, setUser] = useState({ name: "Alex", age: 20 });

  // ❌ Wrong: edits the existing object directly
  const haveBirthdayIncorrect = () => {
    user.age = user.age + 1; // mutates the object already in state
    setUser(user); // same object reference — React sees nothing changed
  };

  // ✅ Correct: a brand new object, with the one field updated
  const haveBirthday = () => {
    setUser({ ...user, age: user.age + 1 });
  };

  return (
    <Stack spacing={2} sx={{ alignItems: "center" }}>
      <Typography variant="h5">
        {user.name} is {user.age} years old
      </Typography>
      <Button variant="contained" onClick={haveBirthday}>
        Happy birthday!
      </Button>
    </Stack>
  );
};
```

**Think of it like swapping a photo in a frame, instead of editing the photo itself.** React doesn't inspect state pixel by pixel — it just glances at the frame and asks "is this the same photo as before, or a different one?" `haveBirthdayIncorrect` scribbles directly on the photo that's already in the frame, then hangs that exact same photo back up — same photo, so React never looks twice, even though it's been scribbled on. `haveBirthday` prints a brand new photo with the one change already on it and hangs _that_ up instead — a different photo is now in the frame, so React notices and re-renders.

Concretely: `{ ...user, age: user.age + 1 }` **destructures** `user` (spreads out all its fields — `name`, `age`) and **reconstructs** a new object from them, overriding `age` with the new value. `name` gets copied over untouched; `age` gets replaced. The result is a brand new object, so React notices it's different from the old one.

> 💡 This is why React checks _reference equality_ (same object or not), not a deep comparison of every field — comparing every field of every object on every render would be far too slow to do 60 times a second.

> 🔧 Add a `rename` function that calls `setUser({ ...user, name: "..." })` with a new name, and wire it to a second button.

**Remember:** whenever state is an object or an array, build a new one instead of editing the old one. The spread operator (`{ ...user }`, `[...items]`) is how you do that in practice.

### Example 3: list of objects state

The trickiest case is a **list of objects**, because there are two levels of state stacked on top of each other: the array itself, and each object inside it. To update correctly, you have to reconstruct _both_ levels — the array **and** the object that changed.

```js
import { useState, type FC } from "react";
import { Checkbox, Stack, Typography } from "@mui/material";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
}

// Wrapped in React.memo: React skips re-rendering this component if `todo`
// is the same object reference as it was on the last render.
const TodoItem: FC<TodoItemProps> = ({ todo, onToggle }) => {
  return (
    <Stack direction="row" sx={{ alignItems: "center" }}>
      <Checkbox checked={todo.done} onChange={() => onToggle(todo.id)} />
      <Typography sx={{ textDecoration: todo.done ? "line-through" : "none" }}>
        {todo.text}
      </Typography>
    </Stack>
  );
});

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn useState", done: false },
    { id: 2, text: "Learn useEffect", done: false },
  ]);

  // ❌ Wrong: neither the array nor the object is reconstructed
  const toggleNothing = (id: number) => {
    todos.forEach((todo) => {
      if (todo.id === id) todo.done = !todo.done; // mutates the object already in state
    });
    setTodos(todos); // same array reference as before — nothing updates
  };

  // ⚠️ Half right: only the array is reconstructed, the objects inside are still the old ones
  const toggleListOnly = (id: number) => {
    todos.forEach((todo) => {
      if (todo.id === id) todo.done = !todo.done; // mutates the object already in state
    });
    setTodos([...todos]); // new array, but same objects inside
  };

  // ⚠️ Half right: only the object is reconstructed, the array itself is still the old one
  const toggleObjectOnly = (id: number) => {
    todos.forEach((todo, index) => {
      if (todo.id === id) todos[index] = { ...todo, done: !todo.done }; // a brand new object
    });
    setTodos(todos); // same array reference as before — nothing updates
  };

  // ✅ Correct: a new array from .map(), with a new object for the item that changed
  const toggle = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };

  return (
    <Stack spacing={1}>
      {todos.map((todo) => (
        // Swap `toggle` below for toggleNothing / toggleListOnly / toggleObjectOnly to compare
        <TodoItem key={todo.id} todo={todo} onToggle={toggle} />
      ))}
    </Stack>
  );
};
```

Four versions of the same update, side by side, changing only how much gets reconstructed:

- **`toggleNothing`** — click the checkbox and _nothing happens on screen at all_. `todos` is the exact array React already had, so React bails out before it even reaches `TodoItem`. This one is reliable to watch: it's `App` itself that skips rendering, so it fails every time no matter what.
- **`toggleListOnly`** — the array is reconstructed (`[...todos]`), but the `todo` object inside it is still the same mutated object as before, so _in principle_ `React.memo` should skip re-rendering `TodoItem` and leave the checkbox stuck. In this exact code, though, you probably won't see that: `onToggle={toggle}` is bound to a brand-new function every time `App` renders, and `React.memo`'s comparison checks _every_ prop — so a changed `onToggle` alone is enough to force `TodoItem` to re-render anyway, papering over the fact that `todo` didn't change. That's the trap: the bug is still there (the object was never reconstructed), it's just being hidden by another prop that happens to be unstable too. Relying on that is an accident, not a fix — the moment `onToggle` becomes stable, the checkbox freezes.
- **`toggleObjectOnly`** — a brand new object gets built with `{ ...todo, done: !todo.done }`, but it's written back into the same `todos` array (`todos[index] = ...`), so `todos` is still the same array reference. Just like `toggleNothing`, React bails out of re-rendering the whole list before it ever gets to notice the new object inside — this one _is_ reliably visible, since it's `App` itself skipping the render, not something a memoized child could paper over.
- **`toggle`** — `.map()` returns a **new array**, and inside it the one todo that changed is rebuilt as a **new object**; every other todo is returned as-is (`todo`), no need to copy objects that didn't change. Both levels are reconstructed, so the checkbox flips correctly every time. This is the one wired up above.

> 💡 Rule of thumb: reconstruct every level of the state that changed, from the outermost container down to the object itself. Skip the array, and React bails out before it even reaches your components — reliably, every time. Skip the object, and you might get away with it for a while, because something else (like an unstable callback prop) happens to force the re-render anyway — until it doesn't.

---

## `useEffect`

<div style="float: right;">~20 minutes</div>
**`useEffect` runs code after the component renders.** Rendering itself should stay pure — just compute what the UI looks like. Anything that reaches outside of that (calling an API, starting a timer, subscribing to something) is a _side effect_, and that's what `useEffect` is for.

### Syntax

```js
useEffect(() => {
  // runs after the render is committed to the screen
  return () => {
    // optional cleanup — runs before the effect runs again, and on unmount
  };
}, [dependencies]);
```

- The function — what to do after rendering.
- The value it returns (optional) — a cleanup function, undoing whatever the effect set up.
- `dependencies` — controls how often the effect re-runs:
  - omitted entirely → after **every** render
  - `[]` → **once**, after the first render
  - `[a, b]` → after the first render, and again whenever `a` or `b` changes

### Example 1: re-run when a value changes

```js
import { useState, useEffect } from "react";
import { Button, Typography, Stack } from "@mui/material";

export const App = () => {
  const [count, setCount] = useState(10);

  useEffect(() => {
    document.title = `Clicked ${count} times`;
  }, [count]);

  return (
    <Stack spacing={2} sx={{ alignItems: "center" }}>
      <Typography variant="h5">Clicked {count} times</Typography>
      <Button variant="contained" onClick={() => setCount(count + 1)}>
        Click me
      </Button>
    </Stack>
  );
};
```

`[count]` means the effect re-runs whenever `count` changes, keeping the browser tab's title in sync with it.

> ❓ Change `[count]` to `[]`. What changes?.

### Example 2: cleanup

Cleanup only makes sense once a component can actually go away, so this example uses two components: `Stopwatch`, which owns the effect, and `App`, which mounts and unmounts it with a button.

```js
import { useState, useEffect } from "react";
import { Typography, Stack, Button } from "@mui/material";

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    console.log("mounted: starting timer");
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => {
      console.log("unmounted: clearing timer");
      clearInterval(id);
    };
  }, []);

  return <Typography variant="h5">{seconds}s elapsed</Typography>;
};

export const App = () => {
  const [showStopwatch, setShowStopwatch] = useState(true);

  return (
    <Stack spacing={2} sx={{ alignItems: "center" }}>
      <Button variant="contained" onClick={() => setShowStopwatch((s) => !s)}>
        {showStopwatch ? "Hide" : "Show"} stopwatch
      </Button>
      {showStopwatch && <Stopwatch />}
    </Stack>
  );
};
```

- `Stopwatch` mounts → its effect runs → the interval starts.
- Click "Hide" → `{showStopwatch && <Stopwatch />}` removes it from the tree → React **unmounts** `Stopwatch`, calling the cleanup function it returned → the interval is cleared. Without that cleanup, the timer would keep ticking in the background forever, even with nothing on screen to show for it.
- Click "Show" again → a brand new `Stopwatch` mounts → a fresh effect run → the count restarts at `0`.

### Common mistakes

```js
// ❌ Missing dependency — count can go stale inside the effect
useEffect(() => {
  console.log(count);
}, []);

// ✅ Include everything the effect reads
useEffect(() => {
  console.log(count);
}, [count]);
```

```js
// ❌ Infinite loop — this render's count triggers the next render's effect, forever
useEffect(() => {
  setCount(count + 1);
}, [count]);
```

```js
const [fullName, setFullName] = useState("");

// ❌ An effect for something that doesn't need one
useEffect(() => {
  setFullName(firstName + " " + lastName);
}, [firstName, lastName]);

// ✅ Just calculate it during render
const fullName = firstName + " " + lastName;
```

> ### 🔧 The Self-Stopping Countdown
>
> Instead of ticking forever, build a timer that counts down from 10 to 0 and then stops itself. This teaches you how to handle intervals that need to interact with current state.
>
> **Requirements:**
>
> - Start state at `10`.
> - Start a `setInterval` that decreases the time by 1 every `1000`ms.
> - **Crucial:** when the timer hits `0`, it must stop — you'll need to clear the interval automatically, from inside the interval itself.
> - Return a cleanup function to clear the interval too, in case the component unmounts before it reaches `0`.

```js
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";

export const Countdown = () => {
  const [time, setTime] = useState(10);

  useEffect(() => {
    // TODO: start a setInterval that decreases `time` by 1 every second.
    //       Use the functional update form — setTime((t) => ...) — so
    //       you're always working with the latest value, not a stale one.
    // TODO: inside that same update, once `time` reaches 0, clear the
    //       interval so it stops counting instead of going negative.
    // TODO: return a cleanup function that also clears the interval,
    //       for the case where the component unmounts early.
  }, []);

  return <Typography variant="h3">{time}</Typography>;
};
```

> 💡 The interval callback can't just read `time` from the surrounding closure — it would always see `10`, the value from when the effect first ran. `setTime((t) => ...)` sidesteps that by handing you the _current_ value at the moment each tick actually fires.

## Fetching data

<div style="float: right;">~10 minutes</div>

```js
import { useState, useEffect } from "react";
import { Typography, Stack, CircularProgress } from "@mui/material";

interface Post {
  id: number;
  title: string;
}

export const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []); // empty array — fetch once, when the component mounts

  if (loading) return <CircularProgress />;

  return (
    <Stack spacing={1}>
      {posts.map((post) => (
        <Typography key={post.id}>{post.title}</Typography>
      ))}
    </Stack>
  );
};
```

> 💡 To refetch on demand (a refresh button, for example), pull the fetch logic out into its own named function and call it both from `useEffect` and from an `onClick`.

## Custom hooks

<div style="float: right;">~20 minutes</div>

**A custom hook is just a function whose name starts with `use`, that calls other hooks inside it.** Nothing more — no special syntax. It's a normal function _composing_ `useState`, `useEffect` (or others) into one reusable package of behavior that any component can call.

### Example: props, the same way components take them

A hook can take a single object argument, typed with an interface — exactly like a component's props:

```js
// useCountdown.ts
import { useState, useEffect } from "react";

interface UseCountdownProps {
  start: number;
  onComplete?: () => void;
}

export const useCountdown = ({ start, onComplete }: UseCountdownProps) => {
  const [time, setTime] = useState(start);

  useEffect(() => {
    const id = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(id);
          onComplete?.();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return time;
};
```

```js
import { Typography } from "@mui/material";
import { useCountdown } from "./useCountdown";

export const Countdown = () => {
  const time = useCountdown({
    start: 10,
    onComplete: () => alert("Time's up!"),
  });

  return <Typography variant="h3">{time}</Typography>;
};
```

`UseCountdownProps` reads exactly like `TodoItemProps` from the `useState` examples earlier — same pattern, just consumed by a hook instead of a component. `onComplete` is optional (`?`), so it's called with `?.()` in case nothing was passed. All the `useState`/`useEffect` logic lives inside `useCountdown` now — `Countdown` itself doesn't know or care how the number gets there, it just calls the hook and renders what it returns.

> ❓ How many parameters does `useCountdown` actually receive?

<details>

<summary>Show answer</summary>

_(Only 1 — `{ start, onComplete }` destructures the fields **out of** that one object; `start` and `onComplete` aren't two separate arguments, they're two properties of the single argument.)_

</details>

### Example: a hook can return anything, not just a value

`useState` itself returns a two-item array. Your own hooks can do the same:

```js
// useToggle.ts
import { useState } from "react";

export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue((v) => !v);
  return [value, toggle];
};
```

```js
import { Button } from "@mui/material";
import { useToggle } from "./useToggle";

export const App = () => {
  const [isOn, toggleIsOn] = useToggle();

  return (
    <Button variant="contained" onClick={toggleIsOn}>
      {isOn ? "ON" : "OFF"}
    </Button>
  );
};
```

`const [isOn, toggleIsOn] = useToggle();` is plain array destructuring — the same syntax `useState` itself uses. `useToggle` isn't special-cased by React in any way; it's just a function that happens to return a two-item array.
