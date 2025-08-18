## Next.js Tutorial

### What is Next.js?

Next.js is a robust framework that builds upon React, facilitating the development of various web applications. It supports server-rendered applications, static websites, and complex web apps. Here's a brief overview:

- Static websites consist of fixed content pre-generated during the build process. These sites are fast and efficient, ideal for content that does not change often.

- Next.js and Static Websites: Next.js uses Static Generation to pre-render pages at build time, delivering high-speed loading and optimized SEO by serving pages from a CDN.

- Server-rendered applications dynamically generate content per request, providing unique HTML based on user interactions or backend state.

- Next.js for Server Rendering: Next.js seamlessly handles server rendering, allowing for dynamic content delivery while maintaining fast performance and enhancing SEO, compared to client-side-only frameworks.

### Server and Client at the Same Time

Next.js operates both on the server and the client, providing a versatile environment to manage rendering and data fetching. On the server, Next.js pre-renders pages by default, allowing your initial HTML to be generated ahead of client requests for better performance and SEO. On the client, it handles dynamic interactions and ensures the application behaves as a single-page application (SPA) once loaded.

### Differences from React

While React is a library for building user interfaces, Next.js is a framework that provides an extensive set of tools to build a complete web application:

- **Server-Side Rendering (SSR)** : React apps are typically client-side rendered, meaning that JavaScript runs in the browser to construct the UI. Next.js can render these components on the server first, send them to the browser fully rendered, and then enable interactivity with JavaScript.

- **File-based Routing** : In React, routing is handled with libraries like React Router, where routes are declared explicitly in the code. Next.js uses a file-based routing system where pages correspond to files in the `pages` directory.

- **Built-in API Routes** : Next.js allows you to create API routes. These are server-side functions that you can build into your Next.js app to handle backend functionality without needing a separate server.

## Project Structure

In this section, we'll explore a well-organized project structure for a Next.js application using Material-UI (MUI). This structure is designed to enhance maintainability, scalability, and readability, ensuring that your codebase remains clean and manageable as your project grows.

**Project Structure Overview**

```plaintext
project-root/
├── public/                     # Static assets
│   ├── images/                 # Image files
│   │   ├── logo.png
│   │   └── hero-bg.jpg
│   └── icons/                  # Icon files
└── src/
    ├── api/                    # API-related files
    │   ├── auth.ts             # Authentication API functions
    │   └── users.ts            # User-related API functions
    ├── app/
    │   ├── layout.tsx          # Root layout component
    │   ├── page.tsx            # Home page component
    │   ├── about/
    │   │   └── page.tsx        # About page component
    │   └── contact/
    │       ├── page.tsx        # Contact page component
    │       └── components/     # Components specific to contact page
    │           ├── ContactForm.tsx
    │           └── ContactInfo.tsx
    ├── components/
    │   ├── atomic/             # Small, reusable components
    │   │   ├── Button/
    │   │   │   └── Button.tsx
    │   │   └── [Other atomic components]
    │   └── organism/           # Larger, composed components
    │       ├── Header/
    │       │   └── Header.tsx
    │       ├── Footer/
    │       │   └── Footer.tsx
    │       └── [Other reusable components]
    ├── lib/
    │   ├── utils.ts            # Utility functions
    │   └── hooks/              # Custom React hooks
    │       ├── useLocalStorage.ts
    │       └── useFetch.ts
    └── model/
        ├── user                # Example data model file
        └── article             # Example data model file
```

### Folder Explanations

**`public/`** - Static assets directory containing images, icons, and other files served directly by the web server.

**`src/api/`** - API-related functions for communicating with backend services (authentication, user management, etc.).

**`src/app/`** - Main application pages and routing structure using Next.js App Router.

**`src/components/`** - Reusable UI components organized using atomic design principles (atomic and organism components).

**`src/lib/`** - Utility functions and custom React hooks for common functionality across the application.

**`src/model/`** - TypeScript interfaces and data models defining the structure of application data.

## Navigation theory

The `src/app/` directory is the heart of Next.js 13+ applications, introducing the new App Router that replaces the older Pages Router. This directory uses file-system based routing with several important conventions and reserved names.

### How App Router Works

**File-based Routing**: Each folder represents a route segment, and files define the UI for that route. The `page.tsx` file is the main component that renders when someone visits that route.

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

**Dynamic Routes**: Use square brackets `[paramName]` for dynamic segments:

- `app/blog/[slug]/page.tsx` → `/blog/any-post-title`

**Parallel Routes**: Use `@folder` syntax for parallel routes that can be rendered simultaneously.

### Why App Router Matters

1. **Server Components by Default**: Components are server-side rendered by default, improving performance
2. **Streaming**: Supports streaming and progressive rendering
3. **Simplified Data Fetching**: Built-in data fetching with async components
4. **Better SEO**: Improved metadata handling and static generation
5. **Type Safety**: Better TypeScript support and type inference

## Navigation Example

**Objective**: In this exercise, we will create a simple Next.js application with three pages: a main page (`/`), a contact page (`/contact`), and a dynamic article page (`/article/[id]`). We will use Material-UI components to build these pages and set up navigation between them. The goal is to demonstrate how to structure basic pages in a Next.js application, implement dynamic routing, and navigate between pages using Material-UI for the UI elements.

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

## Server vs Client

Next.js 13+ introduces a fundamental distinction between Server Components and Client Components. Understanding this difference is crucial for building efficient applications.

### What are Server Components?

**Server Components** are the default in Next.js 13+. They:

- Run on the server during build time or request time
- Can directly access backend resources (databases, APIs)
- Are not sent to the browser (no JavaScript bundle)
- Cannot use browser APIs (localStorage, window, etc.)
- Cannot use React hooks (useState, useEffect, etc.)

### What are Client Components?

**Client Components** run in the browser and:

- Can use browser APIs and React hooks
- Handle user interactions and state
- Are interactive and dynamic
- Increase the JavaScript bundle size

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

**Server Component Console Logs:**

- Appear in your terminal/server logs
- Run during build time or server-side rendering
- Cannot access browser-specific information
- Example: `Contact page rendered on server`

**Client Component Console Logs:**

- Appear in the browser's Developer Tools console
- Run when the component mounts and during interactions
- Can access browser APIs and user interactions
- Examples:
  - `Contact page rendered on client`
  - `Current form data: {name: "", email: "", message: ""}`
  - `name changed to: John`

### When to Use Each Type

**Use Server Components when:**

- Fetching data from databases or APIs
- Accessing backend resources
- Rendering static content
- SEO optimization
- Reducing client bundle size

**Use Client Components when:**

- Handling user interactions (forms, buttons)
- Using React hooks (useState, useEffect)
- Accessing browser APIs (localStorage, window)
- Managing component state
- Creating interactive UI elements

### Best Practices

1. **Start with Server Components** - They're the default and more performant
2. **Add "use client" only when needed** - For interactivity, state, or browser APIs
3. **Keep interactive parts small** - Convert only the components that need client-side features
4. **Use the boundary pattern** - Keep server components as parents and client components as children

This approach gives you the best of both worlds: server-side performance and client-side interactivity where needed.
