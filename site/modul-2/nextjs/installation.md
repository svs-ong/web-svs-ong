

## Next.js Installation 

<div style="float: right;">~3 minutes</div>
### How to Install Next.js with Custom Configuration

This tutorial will guide you through the installation of Next.js using specific options to suit your development preferences. We'll use `npx create-next-app@latest` and configure it for TypeScript, ESLint, and more.

#### Prerequisites

- **Node.js** : Make sure Node.js is installed on your computer. You can download it from [the official Node.js website](https://nodejs.org/) .

### Step 1: Create the Next.js Application

1. **Open your terminal or command prompt.**

2. **Run the command:**

```bash
npx create-next-app@latest app-name
```

Replace `app-name` with the name you want for your project. This command sets up a new directory for your project and initializes a basic Next.js app.

### Step 2: Configure Your Application

When you execute the command, configuration prompts will appear in your terminal. Use the `Tab` key to toggle between options and `Enter` to confirm your selections:

- **TypeScript** : Choose `Yes` for TypeScript support.

- **ESLint** : Select `Yes` to integrate ESLint for code quality assurance.

- **Tailwind CSS** : Choose `No` since Tailwind CSS is not required for this setup.

- **`src/` Directory** : Select `Yes` to structure your project files within a src directory.

- **App Router** : Select `Yes` for using the App Router, which is recommended for effective routing management.

- **Turbopack** : Select `Yes` to use Turbopack for faster development builds and hot reloading.

- **Customize the default import alias (@/\*)** : Choose `No` if customizing import paths is not needed.

Here's how you might interact with the configuration prompts:

```plaintext
√ Would you like to use TypeScript? ... No / **Yes**
√ Would you like to use ESLint? ... No / **Yes**
√ Would you like to use Tailwind CSS? ... **No** / Yes
√ Would you like your code inside a `src/` directory? ... No / **Yes**
√ Would you like to use App Router? (recommended) ... No / **Yes**
√ Would you like to use Turbopack for `next dev`? ... No / **Yes**
√ Would you like to customize the import alias (@/* by default)? ... **No** / Yes
```

### Step 3: Installation Completion

Once you’ve made all your selections, the installation process will automatically proceed, creating your Next.js app in the specified directory, e.g., `D:\Proiecte\app-name`. It will install all necessary dependencies based on your choices.

### Step 4: Navigate to Your Project

To start working on your project, change to your project directory:

```bash
cd app-name
```

### Step 5: Start the Development Server

Initiate the development server by running:

```bash
npm run dev
```

This command starts the Next.js server on [http://localhost:3000](http://localhost:3000) . Open this URL in your browser to see your newly configured Next.js application.

## Add Material UI

### Installation

Navigate to your project directory (`app-name`) and execute the following command to install the necessary Material UI packages along with Emotion for styling:

```bash
npm install @mui/material @mui/material-nextjs @emotion/react @emotion/styled
```

### Update Layout Configuration

Replace the existing content in `src/app/layout.tsx` with the following code to incorporate the Material UI theming and server-side CSS management:

```javascript
import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import CssBaseline from '@mui/material/CssBaseline';

export const metadata: Metadata = {
  title: "My app",
  description: "An initial app made for testing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <CssBaseline />
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
```

### Define the Theme

Create a new file at `src/theme.ts` and insert the following code to set up a custom theme using Material UI and the Roboto font:

```javascript
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
```

### Update Home Page

Replace the existing content in `./src/app/page.tsx` with the new layout to demonstrate the use of Material UI components:

```javascript
import { Box, Stack, Button, Typography } from "@mui/material";

export default function Home() {
  return (
    <Stack spacing={2} sx={{ width: "100%", maxWidth: 800, margin: "auto" }}>
      <Box sx={{ p: 2, border: "1px dashed grey" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Home Page
        </Typography>
        <Typography variant="body1" gutterBottom>
          This is a simple page designed to showcase how to use the Stack and
          Box components from Material-UI. Enjoy navigating through our content
          and exploring what we have to offer!
        </Typography>
        <Button variant="contained">Click Me!</Button>
      </Box>
    </Stack>
  );
}
```

### Clean Up Project Files

Remove the following unused files to tidy up your project directory:

- `src/app/favicon.ico`

- `src/app/page.module.css`

- `public/next.svg`

- `public/vercel.svg`
