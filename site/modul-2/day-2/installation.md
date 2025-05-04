# Add Material UI to Your Existing React App

This guide walks you through how to add [Material UI](https://mui.com/) (MUI) to an existing React project using `npm`.

Material UI is a popular React UI framework that provides a set of customizable, accessible, and beautifully designed components to help you build modern interfaces faster.

---

## Prerequisites

Before starting, make sure:

- You already have a React project created with either `create-react-app` or your own setup.
- You have **Node.js** and **npm** installed.

---

## Install Material UI Packages

Open your terminal and navigate to the root of your React project:

```bash
cd your-existing-react-app
```


Then install the core Material UI library along with Emotion (used for styling):



```bash
npm install @mui/material @emotion/react @emotion/styled
```



> Optional: If you plan to use icons like arrows, close buttons, or menu icons, you can also install the icon package:



```bash
npm install @mui/icons-material
```



---



## Create a Custom Theme 


Creating a custom theme helps keep your styles consistent across your app. You can define your primary and secondary colors, typography, and more.

Create a new file called `theme.ts` (or `theme.js` if you're not using TypeScript) inside your `src` directory:


```ts
// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue
    },
    secondary: {
      main: '#9c27b0', // Purple
    },
  },
});

export default theme;
```


You can update colors later based on your design system.



---



## Apply the Theme in Your App 

To apply the theme globally, wrap your app with MUI's `ThemeProvider`. Also include `CssBaseline` to normalize browser styles.
Open your `src/index.tsx` or `src/index.js` and modify it like this:


```tsx
// src/index.tsx or index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'; // Make sure the path is correct

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```



---



## Use Material UI Components 

Now you can start using MUI components in your app. Here's a quick example using a `Button`, `Container`, and `Typography`:


```tsx
// src/App.tsx or App.js
import { Container, Typography, Button } from '@mui/material';

function App() {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to My App
      </Typography>
      <Typography variant="body1" gutterBottom>
        This app is now powered by Material UI.
      </Typography>
      <Button variant="contained" color="primary">
        Get Started
      </Button>
    </Container>
  );
}

export default App;
```



---



## Optional Clean-Up & Enhancements 

 
- Install [Roboto font]() , which is the default font used by Material UI.


```bash
npm install @fontsource/roboto
```

Then import it at the top of `index.tsx` or `App.tsx`:


```ts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
```
 
- Explore more components: [MUI Components Documentation]()



---

