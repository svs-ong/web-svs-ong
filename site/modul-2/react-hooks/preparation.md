# Preparation

Before the course starts, set up a small test app so you can try every hook example as it's introduced, instead of just reading them.

### Create the app

```bash
npm create vite@latest test -- --template react-ts
```

### Add MUI

```bash
npm install @mui/material @emotion/react @emotion/styled
```

### Wire up the theme

Replace the contents of `src/main.tsx` with:

```ts
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
```

`ThemeProvider` makes the theme available to every MUI component in the app, and `CssBaseline` resets the browser's default styles so MUI's own styling isn't fighting them.

Run it with `npm run dev`, and you're ready — paste each example from the lesson into `src/App.tsx` as you get to it.
