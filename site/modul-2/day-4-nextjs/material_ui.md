# Material UI in Next.js

## Introduction
Material-UI is a popular React component library that implements Google's Material Design. It provides a robust set of components that are both customizable and accessible, making it an excellent choice for building dynamic and beautiful web applications quickly. In this course, we will explore how to effectively use Material-UI in a Next.js environment to create responsive, visually appealing web applications.

For detailed information on Material-UI and its components, you can visit the official documentation here: [Material-UI Documentation](https://mui.com/material-ui/getting-started/overview/).

### Useful Links

Here are some useful links to help you get started and reference throughout the course:

- [Main Components](https://mui.com/material-ui/all-components/): Explore all available Material-UI components.
- [Theme Viewer](https://mui.com/material-ui/customization/default-theme/): Understand the default theme and how to customize it.
- [Breakpoints](https://mui.com/material-ui/customization/breakpoints/): Learn about responsive breakpoints in Material-UI.
- [Responsive UI](https://mui.com/material-ui/guides/responsive-ui/): Guidelines for making your UI responsive using Material-UI.
- [Next.js Integration](https://mui.com/material-ui/integrations/nextjs/): Specific guidance on integrating Material-UI with Next.js applications.


## Basic Example

One of the core functionalities of Material-UI is its theme system. The theme contains all the constants needed for the design language of the application, such as colors, distances, and other properties. You can also customize each subcomponent within the theme.

In the following example, we demonstrate how to create a custom theme and apply it using the `ThemeProvider` component. This setup allows us to define and use a consistent style across all components within the provider.

```js
import * as React from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/system';

const theme = createTheme({
  palette: {
    background: {
      paper: '#fff',
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
    action: {
      active: '#001E3C',
    },
    success: {
      dark: '#009688',
    },
  },
});

export default function Example() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
        }}
      >
        <Box sx={{ color: 'text.secondary' }}>Sessions</Box>
        <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
          98.3 K
        </Box>
        <Box
          sx={{
            color: 'success.dark',
            display: 'inline',
            fontWeight: 'bold',
            mx: 0.5,
            fontSize: 14,
          }}
        >
          +18.77%
        </Box>
        <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 14 }}>
          vs. last week
        </Box>
      </Box>
    </ThemeProvider>
  );
}
```
This example illustrates how a `ThemeProvider` wraps the `Box` component to apply the defined theme. We use the `sx` prop on each `Box` to specify styles directly related to the theme values, such as `bgcolor`, which is set to the `background.paper` color from our custom palette. This approach ensures that all components within the `ThemeProvider` are styled consistently, aligning with the design principles specified in your theme configuration.

## Components
In this section, we will explore some of the fundamental components provided by Material-UI, which serve as building blocks for constructing a user interface in a React application. Understanding these components will help you efficiently layout and style your applications.

### Typography

The `Typography` component is used to manage your text and apply the Material Design typography styles. It can be used to adjust font size, weight, and color according to your theme settings.

```jsx
import { Typography } from '@mui/material';

function TypographyExample() {
  return (
    <Typography variant="h1" component="h2" gutterBottom>
      h1. Heading
    </Typography>
  );
}
```

### Button 
The `Button` component is used for interactions. You can customize its size, color, and functionality based on your needs. Buttons come with several variants such as contained, outlined, and text.

```jsx
import { Button } from '@mui/material';

function ButtonExample() {
  return (
    <Button variant="contained" color="primary">
      Click me
    </Button>
  );
}
```

### Box 
The `Box` component serves as a utility component that can be used for custom layouts, positioning, or wrapping other components. It supports all system properties like margin, padding, width, etc.

```jsx
import { Box } from '@mui/material';

function BoxExample() {
  return (
    <Box p={2} bgcolor="background.paper" boxShadow={1}>
      This is a box
    </Box>
  );
}
```

### Container 
The `Container` component is used to align the site's content within a fixed width and properly center it. It adjusts itself on different devices with responsive layout behaviors. It is ideal for sections of your page.

```jsx
import { Container } from '@mui/material';

function ContainerExample() {
  return (
    <Container maxWidth="sm">
      This is a centered container
    </Container>
  );
}
```

### Stack 
The `Stack` component is a flexbox container that makes it easy to align child components either horizontally or vertically. It is a handy tool for creating layouts that need simple stacks of elements.

```jsx
import { Stack, Button } from '@mui/material';

function StackExample() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained">First</Button>
      <Button variant="contained">Second</Button>
    </Stack>
  );
}
```

### Grid 
The `Grid` component provides a flexible grid system which uses a series of containers, rows, and columns to layout and align content. It's responsive, allowing complex layouts to be designed with simplicity.

```jsx
import { Grid, Paper } from '@mui/material';

function GridExample() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Paper>Half-width</Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper>Half-width</Paper>
      </Grid>
    </Grid>
  );
}
```

This overview provides a starting point for understanding and utilizing some of the core Material-UI components in your projects. Each component can be further explored in the documentation to utilize its full potential.


## Customization

Material-UI provides powerful customization options to tailor the look and feel of your components to match your design specifications. This section explores different ways to customize Material-UI components, from one-off style tweaks to global theme modifications.

### 1. One-off customization

For quick, one-off customizations, you can use the `sx` prop directly on a component. This prop allows you to specify a wide range of CSS properties in a concise manner. Here's an example of customizing a `Slider` component:

```jsx
import { Slider } from '@mui/material';

function SliderExample() {
  return (
    <Slider
      defaultValue={30}
      sx={{
        width: 300,
        color: 'success.main',
        '& .MuiSlider-thumb': {
          borderRadius: '1px',
        },
      }}
    />
  );
}
```

### 2. Reusable component 
To create reusable styled components, you can use the `styled` function from MUI. This approach is beneficial when you want to extend the styling capabilities of a component and use it across different parts of your application. Here's how to create a custom `Slider` styled for success scenarios:

```js
import * as React from 'react';
import Slider, { SliderProps } from '@mui/material/Slider';
import { alpha, styled } from '@mui/material/styles';

const SuccessSlider = styled(Slider)<SliderProps>(({ theme }) => ({
  width: 300,
  color: theme.palette.success.main,
  '& .MuiSlider-thumb': {
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.success.main, 0.16)}`,
    },
    '&.Mui-active': {
      boxShadow: `0px 0px 0px 14px ${alpha(theme.palette.success.main, 0.16)}`,
    },
  },
}));

export default function StyledCustomization() {
  return <SuccessSlider defaultValue={30} />;
}
```

### 3. Global theme overrides 
For broad, application-wide style changes, you can customize the default theme. This method involves defining a custom theme with overrides for specific components. Here's an example of customizing the `Button` component globally within a theme:

```js
import { createTheme, ThemeProvider, Button } from '@mui/material';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
        },
      },
    },
  },
});

function ButtonCustomization() {
  return (
    <ThemeProvider theme={theme}>
      <Button>This button has custom font size.</Button>
    </ThemeProvider>
  );
}
```
Customizing component variants allows you to define new visual styles that can be applied to components using a familiar prop interface. This approach enhances the flexibility of your UI components by allowing you to define custom variants in the theme and apply them just like the default ones provided by Material-UI.

In the following example, we will create a custom variant for the `Button` component called `dashed`. This variant will apply a dashed border style to the button, among other properties. We will also configure variants to respond to the `color` and `size` props to demonstrate how versatile this approach can be.

```js
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

// Extend the Button's props to include the new 'dashed' variant
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}

const customTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { variant: 'dashed' },
              style: ({ theme }) => ({
                textTransform: 'none',
                border: `2px dashed ${theme.palette.primary.main}`,
                color: theme.palette.primary.main,
              }),
            },
            {
              props: { variant: 'dashed', color: 'secondary' },
              style: ({ theme }) => ({
                border: `2px dashed ${theme.palette.secondary.main}`,
                color: theme.palette.secondary.main,
              }),
            },
            {
              props: { variant: 'dashed', size: 'large' },
              style: {
                borderWidth: 4,
              },
            },
            {
              props: { variant: 'dashed', color: 'secondary', size: 'large' },
              style: {
                fontSize: 18,
              },
            },
          ],
        },
      },
    },
  },
});

export default function GlobalThemeVariants() {
  return (
    <ThemeProvider theme={customTheme}>
      <Button variant="dashed" sx={{ m: 1 }}>
        Dashed
      </Button>
      <Button variant="dashed" color="secondary" sx={{ m: 1 }}>
        Secondary
      </Button>
      <Button variant="dashed" size="large" sx={{ m: 1 }}>
        Large
      </Button>
      <Button variant="dashed" color="secondary" size="large" sx={{ m: 1 }}>
        Secondary large
      </Button>
    </ThemeProvider>
  );
}
```

## Breakpoints

Material-UI utilizes a set of responsive breakpoints to adapt your application's layout to the viewing environment. This allows for the creation of responsive layouts that work across different screen sizes. The breakpoints in Material-UI are predefined to match typical device sizes and can be customized if needed.

Here's a breakdown of the default breakpoints:

- `xs` (extra-small): 0px and above (affecting all sizes)
- `sm` (small): 600px and above
- `md` (medium): 900px and above
- `lg` (large): 1200px and above
- `xl` (extra-large): 1536px and above

### Using Breakpoints in Styles

You can use these breakpoints in your theme to apply different styles based on the screen size. Here are examples of how to apply styles at different breakpoints using the Material-UI theme capabilities:

**Example 1: Applying a style from medium breakpoint upwards**

```js
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'blue',
    // Applies red background color from medium breakpoint and above
    // Matching [md, ∞) or [900px, ∞)
    [theme.breakpoints.up('md')]: {
      backgroundColor: 'red',
    },
  },
}));

function MyComponent() {
  const classes = useStyles();
  return <div className={classes.root}>Responsive Div</div>;
}
```
**Example 2: Applying a style between small and medium breakpoints** 

```js
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'blue',
    // Applies red background color between small and medium breakpoints
    // Matching [sm, md) or [600px, 900px)
    [theme.breakpoints.between('sm', 'md')]: {
      backgroundColor: 'red',
    },
  },
}));

function MyComponent() {
  const classes = useStyles();
  return <div className={classes.root}>Responsive Div</div>;
}
```