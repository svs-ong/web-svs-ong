## Next.js Tutorial

<div style="float: right;">~70 minutes</div>

### What is Next.js?

Next.js is a full-stack React framework for building modern web applications. It extends React with features such as routing, server rendering, data fetching, API endpoints, and performance optimizations.

Some of its key features include:

- Server Components by default for improved performance.
- Client Components for interactive UI when needed.
- File-based routing using the app directory.
- Static and dynamic rendering depending on your application's needs.
- API routes for backend functionality without a separate server.
- Built-in support for TypeScript, image optimization, fonts, and more.
- Server and Client Components

**With the `App Router`, components are Server Components by default. They render on the server, reducing the amount of JavaScript sent to the browser and improving performance.**

When a component needs browser features such as **state**, **event** handlers, or hooks (`useState`, `useEffect`), add the :
```javascript
"use client"
``` 
directive to make it a Client Component.

### **Next.js** vs **React**

**React is a library for building user interfaces, while Next.js is a framework built on top of React that provides everything needed for a production-ready application.**

Compared to a standard React application, Next.js includes:

- File-based routing using the app directory.
- Server-side rendering (SSR) and Static Site Generation (SSG).
- API routes and server-side code.
- Built-in optimizations for images, fonts, metadata, and performance.

### Project Structure

A common project structure for a Next.js application is shown below:
**Project Structure Overview**

```plaintext
project-root/
├── public/                  # Static assets
├── src/
│   ├── app/                 # App Router pages and layouts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utilities, helpers, and hooks
│   ├── services/            # API requests and business logic
│   ├── types/               # TypeScript types and interfaces
│   ├── theme/               # Material UI theme configuration
│   └── models/              # Application models (optional)
├── package.json
└── tsconfig.json
```

## Navigation theory

The `src/app/` directory is the heart of Next.js applications, introducing the new App Router that replaces the older Pages Router. This directory uses file-system based routing with several important conventions and reserved names.

### How App Router Works

**File-based Routing**: Each folder represents a **route segment**, and files define the UI for that route. The `page.tsx` file is the main component that renders when someone visits that route.

**Reserved File Names**: Next.js reserves certain filenames for special purposes:

- `page.tsx` - Makes a route segment publicly accessible
- `layout.tsx` - Shared UI for a segment and its children
- `loading.tsx` - Loading UI for Suspense boundaries
- `error.tsx` - Error UI for error boundaries
- `not-found.tsx` - UI for not found pages
- `route.ts` - API endpoints for the route

### Layout System

**Root Layout (`app/layout.tsx`)**: This is the top-level layout that wraps all pages. It's required and must contain `html` and `body` tags. This is where you define:

- Global metadata
- Navigation components (Header, Footer)
- Global styles
- Providers (Theme, Context, etc.)

**Nested Layouts**: You can create layouts for specific sections by adding `layout.tsx` files in subdirectories. These layouts wrap only the pages within that section.

**Layout Nesting Example**:

```tsx
// app/layout.tsx (Root layout)
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

// app/dashboard/layout.tsx (Dashboard section layout)
export default function DashboardLayout({ children }) {
  return (
    <div>
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
```

### Route Groups and Organization

**Route Groups**: You can organize routes without affecting the URL structure using parentheses `(folderName)`. For example:

- `app/(marketing)/about/page.tsx` → `/about`
- `app/(shop)/products/page.tsx` → `/products`

**Parallel Routes**: Use `@folder` syntax for parallel routes that can be rendered simultaneously.

### ***Dynamic Routes***: Use square brackets `[paramName]` for dynamic segments:
### - `app/blog/[slug]/page.tsx` → `/blog/any-post-title`


### Why App Router Matters

Instead of simply organizing pages, the `App Router` introduces several modern features that make Next.js applications faster and easier to build. 
As you work through this tutorial, you'll see many of these features in action.

1. **Server Components** by default for better performance.
2. **Streaming** so pages can load progressively.
3. **Simplified data** fetching using async components.
4. **Improved SEO** with built-in metadata support.
5. **Excellent TypeScript** integration with strong type inference.

### Navigation Example

**In this exercise, you'll build a small multi-page application using the App Router.**

By the end, you'll know how to:

- Create multiple pages.
- Navigate between routes.
- Build a dynamic route using [id].
- Display data based on the URL.
- Use Material UI to create a clean interface.

### Rather than focusing on design, we'll use this project to understand how routing works in Next.js.

**Project Structure**

```plaintext
src/
├── app/
│   ├── layout.tsx              # Root layout with navigation
│   ├── page.tsx                # Main page component
│   ├── contact/
│   │   └── page.tsx            # Contact page component
│   └── article/
│       └── [id]/
│           └── page.tsx        # Dynamic article page component
├── model/
|   └── article.ts                 # Article data model
├── theme.ts

```

**Step 1: Create theme file**

`src/app/layout.tsx`:

```js
"use client";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({});
```

**Step 2: Creating the Root Layout with Navigation**

First, we'll create a root layout that includes navigation between all pages.

`src/app/layout.tsx`:

```js
import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme";
import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar>
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  My Next.js App
                </Typography>
                <Link href="/" passHref>
                  <Button color="inherit">Home</Button>
                </Link>
                <Link href="/contact" passHref>
                  <Button color="inherit">Contact</Button>
                </Link>
              </Toolbar>
            </AppBar>
            <Container sx={{ mt: 8 }}>{children}</Container>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
```

### Step 3: Creating the model

```js
export interface Article {
  id: number;
  title: string;
  excerpt: string;
}

export const articlesList: Article[] = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    excerpt: "Learn the basics...",
  },
  {
    id: 2,
    title: "Material-UI Integration",
    excerpt: "How to use MUI...",
  },
  {
    id: 3,
    title: "Dynamic Routing",
    excerpt: "Understanding [id] routes...",
  },
];
```

**Step 4: Creating the Main Page**

The main page will display a list of articles with links to individual article pages.

`src/app/page.tsx`:

```js
import React from "react";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Stack,
} from "@mui/material";
import Link from "next/link";
import { articlesList } from "@/model/article";

export default function HomePage() {
  return (
    <Stack>
      <Typography variant="h2" gutterBottom>
        Welcome to Our Blog
      </Typography>
      <Typography variant="body1" paragraph>
        Explore our latest articles and learn about Next.js development.
      </Typography>

      <Grid container spacing={3} sx={{ mt: 4 }}>
        {articlesList.map((article) => (
          <Grid size={4} key={article.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {article.excerpt}
                </Typography>
                <Link href={`/article/${article.id}`} passHref>
                  <Button variant="contained" color="primary">
                    Read More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
```

**Step 5: Creating the Contact Page**

A simple contact page with a form.

`src/app/contact/page.tsx`:

```js
import React from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Stack,
} from "@mui/material";

export default function ContactPage() {
  return (
    <Stack>
      <Typography variant="h2" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        Get in touch with us for any questions or feedback.
      </Typography>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField label="Name" variant="outlined" required />
          <TextField label="Email" type="email" variant="outlined" required />
          <TextField
            label="Message"
            multiline
            rows={4}
            variant="outlined"
            required
          />
          <Button variant="contained" color="primary" type="submit">
            Send Message
          </Button>
        </Box>
      </Paper>
    </Stack>
  );
}
```

**Step 6: Creating the Dynamic Article Page**

This page demonstrates dynamic routing using the `[id]` parameter.

`src/app/article/[id]/page.tsx`:

```js
import React from "react";
import { Typography, Button, Box, Paper } from "@mui/material";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articlesList } from "@/model/article";

interface ArticlePageProps {
  params: { id: string };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = articlesList.find(
    (article) => article.id === parseInt(params.id)
  );

  if (!article) {
    notFound();
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h2" gutterBottom>
        {article.title}
      </Typography>
      <Typography variant="body1" paragraph>
        {article.excerpt}
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Link href="/" passHref>
          <Button variant="outlined" sx={{ mr: 2 }}>
            Back to Home
          </Button>
        </Link>
      </Box>
    </Paper>
  );
}
```

## **Server vs Client Components**

One of the biggest changes in modern Next.js is understanding where your code runs.

Before continuing, ask yourself:
1. **Does this component need to be interactive?**
  - If the answer is no, it can usually remain a Server Component, which is faster and sends less JavaScript to the browser.
  - If the answer is yes—for example, it uses `useState`, responds to button clicks, or accesses the browser—you'll make it a Client Component by adding `"use client"`.

In the next example, we'll compare both approaches and see where the code executes.

### What are Server Components

**Server Components are the default in the App Router.**

Think of them as components that prepare the page before it reaches the browser. They're great for loading data, rendering content, and keeping your application fast.

#### Server Components can:

- Fetch data directly from databases or APIs.
- Reduce the amount of JavaScript sent to users.
- Improve loading performance and SEO.

However, they cannot use browser APIs or React hooks like `useState` or `useEffect`.

### What are Client Components?

### **Client Components run inside the browser after the page has loaded.**

Use them whenever your UI needs to respond to user actions, such as:

- Clicking buttons.
- Filling out forms.
- Managing component state.
- Using React hooks or browser APIs.

Because they ship JavaScript to the browser, it's good practice to use them only when interactivity is needed.

### Example: Contact Page with Console Logs

Let's modify our contact page to demonstrate the difference:

**Server Component Version** (default):

```js
// src/app/contact/page.tsx - Server Component
import { Typography, TextField, Button, Box, Paper } from "@mui/material";

export default function ContactPage() {
  // This will run on the server - you'll see it in server logs, not browser console
  console.log("Contact page rendered on server");

  ...
}
```

**Client Component Version** (with "use client"):

```js
"use client";

import { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Stack,
} from "@mui/material";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // This will run in the browser - you'll see it in browser console
  console.log("Contact page rendered on client");
  console.log("Current form data:", formData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    alert(`Form submitted with data: ${JSON.stringify(formData)}`);
    // Handle form submission
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    console.log(`${field} changed to:`, value);
  };

  return (
    <Stack>
      <Typography variant="h2" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        Get in touch with us for any questions or feedback.
      </Typography>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Name"
            variant="outlined"
            required
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            required
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <TextField
            label="Message"
            multiline
            rows={4}
            variant="outlined"
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            Send Message
          </Button>
        </Box>
      </Paper>
    </Stack>
  );
}
```

### Console Log Differences

**Let's prove where each component runs.**

As you complete the next example, **watch both**:

- Your terminal (server output).
- Your browser's Developer Console (F12).

#### Notice where each console.log() appears—you'll immediately see the difference between Server and Client Components.

### Best Practices

1. **Start with Server Components** - They're the default and more performant
2. **Add "use client" only when needed** - For interactivity, state, or browser APIs
3. **Keep interactive parts small** - Convert only the components that need client-side features
4. **Use the boundary pattern** - Keep server components as parents and client components as children

This approach gives you the best of both worlds: server-side performance and client-side interactivity where needed.
