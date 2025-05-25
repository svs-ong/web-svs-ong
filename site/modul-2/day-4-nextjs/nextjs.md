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
src/
├── app/
│   ├── page.tsx              # Home page of the application
│   ├── page.styles.tsx       # Home page styles
│   ├── layout.tsx            # Global layout for the entire application
│   ├── layout.styles.tsx     # Global layout styles or configurations
│   ├── page1/
│   │   ├── page.tsx
│   │   ├── page.styles.tsx
│   │   └── components/       # Components specific to page1
│   └── page2/
│       ├── page.tsx
│       └── page.styles.tsx
├── components/               # Components common to all pages
│   ├── atomic/               # Small, reusable components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.styles.tsx
│   │   │   └── index.tsx
│   │   └── [Other atomic components]
│   ├── organism/             # Larger, composed components
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── Sidebar/
│   │   └── [Other reusable components]
├── theme/
│   ├── theme.ts              # MUI theme configuration
│   └── palette.ts            # Color palette configurations
└── model/
    ├── userModel.ts          # Example data model file
    └── productModel.ts       # Example data model file
```

**Detailed Breakdown** 1. `src/app/` Directory:\*\* The `app` directory is the heart of your application, where different pages, the global layout, and styles are organized.

- **`page.tsx`:**

  - This is the home page of your application, corresponding to the default route (`/`). It contains the React component that defines the content and structure of the home page.

- **`page.styles.tsx`:**

  - Contains styles specific to the home page. This separation of styles from the component logic keeps your code clean and modular.

- **`layout.tsx`:**

  - The global layout component that wraps around all pages in the application. This typically includes elements like the `Navbar`, `Footer`, and `Sidebar`, providing a consistent structure and design across the app.

- **`layout.styles.tsx`:**

  - Contains styles specific to the global layout, ensuring a consistent appearance throughout the application.

- **`page1/`, `page2/`:**

  - Each of these directories represents an individual page within your application. Organizing pages into their own folders helps manage page-specific components and styles.

    - **`page.tsx`:** The main component file for the page, defining its content and structure.

    - **`page.styles.tsx`:** Contains styles specific to that page, ensuring modular and maintainable code.

    - **`components/`:** Contains components specific to the particular page, keeping page-specific components organized and separate from globally reused components.

2. `src/components/` Directory:\*\*
   This directory houses components that are shared across multiple pages or are part of the global layout.

- **`atomic/`:**

  - This folder contains small, reusable components often referred to as "atomic" components in design systems. Examples include buttons, icons, and form inputs.

  - Example:

    - **`Button/`:**

      - **`Button.tsx`:** The button component logic.

      - **`Button.styles.tsx`:** Styles specific to the button component.

      - **`index.tsx`:** An index file for easy imports.

- **`organism/`:**
  - Contains larger, more complex components composed of atomic components, often used across the entire application. Examples include the `Navbar`, `Footer`, and `Sidebar`. These components help structure your layout and maintain consistent design patterns throughout the app.

3. `src/theme/` Directory:\*\* The `theme` directory is dedicated to MUI theme customization, where you define the overall look and feel of your application.

- **`theme.ts`:**

  - Contains the MUI theme configuration, including typography, spacing, and other global style settings. This ensures consistent styling across the application.

- **`palette.ts`:**
  - Manages the color palette configurations used within the theme, ensuring a consistent and easily customizable color scheme throughout your application.

4. `src/model/` Directory:\*\*
   This directory is for defining TypeScript models or interfaces representing the data structures used in the application.

- **`userModel.ts`:**

  - A TypeScript interface or model that defines the structure of user-related data, such as user profiles or authentication details.

- **`productModel.ts`:**
  - Similar to `userModel.ts`, this file defines the structure of product-related data, useful in e-commerce applications or product management systems.

## Navigation app

\***\*Objective** In this exercise, we will create a simple Next.js application with two pages: a home page (`/`) and a secondary page (`/page1`). We will use Material-UI components to build these pages and set up navigation between them. The goal is to demonstrate how to structure basic pages in a Next.js application and how to navigate between them using Material-UI for the UI elements.**Project Structure**
We'll keep the project structure straightforward, focusing on just the two pages:

```plaintext
src/
├── app/
│   ├── page.tsx              # Home page
│   └── page1/
│       └── page.tsx          # Page1
```

Step 1: Creating the Home Page (`/`)** We will start by creating the home page. This page will welcome the user and include a button that allows navigation to the `page1`.`src/app/page.tsx`** :

```js
import React from "react";
import { Button, Container, Typography } from "@mui/material";
import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Welcome to the Home Page
      </Typography>
      <Link href="/page1" passHref>
        <Button variant="contained" color="primary">
          Go to Page 1
        </Button>
      </Link>
    </Container>
  );
};

export default HomePage;
```

**Explanation:**

- **Material-UI Components:** We use the `Container` component to center the content on the page, the `Typography` component for displaying the heading, and the `Button` component to create a clickable button.

- **Navigation:** The `Link` component from `next/link` is wrapped around the `Button` to enable client-side navigation to `page1`. The `passHref` prop is used to ensure the `href` is passed correctly to the `Button` component.
  Step 2: Creating Page1 (`/page1`)** Next, we will create `page1`, which will feature a similar layout to the home page but with a button to navigate back to the home page.`src/app/page1/page.tsx`** :

```js
import React from "react";
import { Button, Container, Typography } from "@mui/material";
import Link from "next/link";

const Page1: React.FC = () => {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Welcome to Page 1
      </Typography>
      <Link href="/" passHref>
        <Button variant="contained" color="secondary">
          Go to Home Page
        </Button>
      </Link>
    </Container>
  );
};

export default Page1;
```

**Explanation:**

- **Material-UI Components:** This page uses the same Material-UI components (`Container`, `Typography`, `Button`) as the home page for consistency in design.

- **Navigation:** The `Link` component is used here to navigate back to the home page (`/`). The `Button` component styled with Material-UI's `contained` variant and `secondary` color scheme allows users to return to the home page.
  **Summary** By following these steps, we have successfully created two pages in a Next.js application: a home page and a secondary page (`page1`). We used Material-UI components to build the UI and `next/link` for navigation between the pages. This setup provides a basic structure for a simple Next.js application and demonstrates how to create and link multiple pages within the app.
