# Responsive Design with CSS

Responsive web design is crucial as it ensures that your website looks good on all devices. A mobile-first approach is particularly important because the majority of internet searches are conducted on mobile devices. Here's how you can design responsively using CSS, particularly focusing on mobile-first strategies.

## Mobile First Approach

### Why is it Important?

With over 90% of internet searches happening on mobile devices, it's crucial to prioritize mobile design. Designing for mobile first ensures that the most essential elements of your website are accessible on smaller screens, which improves usability and enhances user experience. Once the mobile design is nailed down, you can enhance the experience for desktop users, adding more features that take advantage of the larger screen space.

### How to Manage with Media Queries

Media queries are foundational to responsive design. They allow you to apply CSS rules based on the device characteristics. When adopting a mobile-first approach, you should use `min-width` queries to scale your design up to larger screens. Here’s how to structure your CSS:

## Case Study: Simple Section

```css
/* Base styles — apply to mobile and all devices */
body {
  font-family: "Arial", sans-serif;
  line-height: 1.6;
  padding: 20px;
}

img {
  max-width: 100%;
  height: auto;
}

/* This applies when the browser window is at least 768px wide */
@media (min-width: 768px) {
  .container {
    display: flex;
    justify-content: space-between;
  }

  .text {
    flex: 1;
    margin-right: 20px;
  }

  .image {
    flex: 1;
  }
}
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Responsive Design Example</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="container">
      <div class="text">
        <h1>Title of the Section</h1>
        <p>
          This is a description that goes in detail about the content of the
          section. It is more detailed and explanatory.
        </p>
      </div>
      <div class="image">
        <img src="your-image.jpg" alt="Descriptive Alt Text" />
      </div>
    </div>
  </body>
</html>
```

### Mobile View

- **Order:** The title and description appear first, followed by the image. This is the default behavior in the HTML structure provided above.

### Desktop View

- **Layout:** At a minimum screen width of 768 pixels, the image and the text content are displayed side by side using flexbox. The image is on the left and the text content is on the right.

By following these steps, you can create a responsive web design that adjusts content layout based on the device being used to view your site. This ensures a user-friendly experience across all device types.
