# Responsive Design with CSS

Responsive web design is crucial as it ensures that your website looks good on all devices. A mobile-first approach is particularly important because the majority of internet searches are conducted on mobile devices. Here's how you can design responsively using CSS, particularly focusing on mobile-first strategies.

## Media Query
***How responsivness is acheved***

Media queries are foundational to responsive design. They allow you to apply CSS rules based on the device characteristics.

## Mobile First Approach

***Why is it Important?***

With over 90% of internet searches happening on mobile devices, it's crucial to prioritize mobile design. Designing for mobile first ensures that the most essential elements of your website are accessible on smaller screens, which improves usability and enhances user experience. Once the mobile design is nailed down, you can enhance the experience for desktop users, adding more features that take advantage of the larger screen space.


 When adopting a mobile-first approach, you should use `min-width` queries to scale your design up to larger screens. Here’s how to structure your CSS:

 ```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Color Change</title>
    <style>
        /* Base CSS for Mobile Devices */
        body {
            background-color: #B0E0E6; /* Light blue background for mobile devices */
            color: #333333; /* Dark grey text color */
            font-family: 'Arial', sans-serif;
            padding: 20px;
        }

        /* Tablet screens (min-width: 600px) */
        @media (min-width: 600px) {
            body {
                background-color: #FFDAB9; /* Peach background for tablets */
            }
        }

        /* Desktop screens (min-width: 900px) */
        @media (min-width: 900px) {
            body {
                background-color: #ADD8E6; /* Light blue, different shade for desktops */
            }
        }
    </style>
</head>
<body>
    <h1>Welcome to Our Responsive Site!</h1>
    <p>This page changes its background color based on the screen width. Resize your browser to see the effect in action.</p>
</body>
</html>
```

## Simple Section

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
          This is a description that goes in detail about the content of the
          section. It is more detailed and explanatory.
          This is a description that goes in detail about the content of the
          section. It is more detailed and explanatory.
          This is a description that goes in detail about the content of the
          section. It is more detailed and explanatory.
          This is a description that goes in detail about the content of the
          section. It is more detailed and explanatory.
        </p>
      </div>
      <div class="image">
        <img src="https://thumbs.dreamstime.com/b/cute-cate-ai-picture-presentations-cute-cate-ai-picture-presentation-267914253.jpg" alt="Descriptive Alt Text" />
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


## Grid Example

### CSS Code 

This CSS code includes styles for a grid container and individual cards, adjusting the number of columns based on screen size using media queries.


```css
/* Base styles */
body {
  font-family: "Arial", sans-serif;
  margin: 20px;
  line-height: 1.6;
}

/* Grid container */
.grid {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

/* Card styles */
.card {
  background: #f9f9f9;
  border: 1px solid #ddd;
  padding: 20px;
  text-align: center;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 992px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1200px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### HTML Code 
The HTML structure includes a `div` with the class `grid`, containing multiple `div` elements with the class `card` to represent each card.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Responsive Grid Example</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <div class="grid">
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>
    <div class="card">Card 3</div>
    <div class="card">Card 4</div>
    <div class="card">Card 5</div>
    <div class="card">Card 6</div>
    <div class="card">Card 7</div>
    <div class="card">Card 8</div>
  </div>
</body>
</html>
```

### Explanation 
 
- **Base Grid Layout:**  The `.grid` uses `display: grid` and sets the grid to automatically fill available space with columns that are at least 250px wide. It adjusts the number of columns based on the container's width and available space.
 
- **Media Queries:**  Adjustments are made for different breakpoints:
  - At widths of 768px and above, the grid will have at least 2 columns.

  - At widths of 992px and above, the grid will increase to 3 columns.

  - At widths of 1200px and above, it will display 4 columns.

1. `display: grid`
This property is used to define an HTML element as a grid container, setting up its direct children as grid items. Once an element is defined as a grid container, other grid-specific properties can be applied to it and its children.
 
- **Usage Example:** 

```css
.container {
  display: grid;
}
```
2. `grid-gap``grid-gap` (recently updated to just `gap` in the latest specifications, but both are commonly used) specifies the spacing between grid items. It can set both row and column gaps using a single or two values. The first value sets the row gap, and the second value sets the column gap. If only one value is provided, it applies to both rows and columns. 
- **Usage Example:** 

```css
.container {
  display: grid;
  grid-gap: 10px; /* Applies 10px gap between rows and columns */
  gap: 20px 10px; /* 20px gap between rows and 10px between columns */
}
```
3. `grid-template-columns`This property defines the column structure of the grid by setting the size of each column. You can define the number and size of the columns in the grid layout. It accepts values in various units (like pixels, percentages, fr units, etc.), and it can handle a mixture of units. The `fr` unit (fraction) is a flexible unit that distributes available space in the container. 
- **Usage Example:** 

```css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* Three columns with the middle one twice the width of the others */
  grid-template-columns: repeat(3, 1fr); /* Three equal columns */
  grid-template-columns: 100px auto 20%; /* Mixed units for different flexibility */
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); 
  /* Creates a responsive grid layout where each column is at least 250px wide and grows to distribute 
  available space evenly, adding as many columns as can fit within the container without stretching beyond 
  the container's width. */

}
```


## Hamburger Menu

### Explanation: 
 
- **CSS Media Query** : When the screen width is at least 768px, the menu items (`<a>` tags and the `#myLinks` div) are set to display inline-block, creating a horizontal navigation bar.
 
- **Hamburger Icon** : The hamburger icon is hidden on larger screens since it's typically unnecessary for desktop layouts.
 
- **Menu Alignment** : Adjustments ensure that the menu aligns correctly on larger screens, with menu links displayed in a row and the logo positioned on the left.

```html
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
body {
  font-family: Arial, Helvetica, sans-serif;
}

.topnav {
  overflow: hidden;
  background-color: #333;
  position: relative;
}

.topnav #myLinks {
  display: none;
}

.topnav a {
  color: white;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  display: block;
}

.topnav a.icon {
  background: black;
  display: block;
  position: absolute;
  right: 0;
  top: 0;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.active {
  background-color: #04AA6D;
  color: white;
}

/* Desktop styling */
@media screen and (min-width: 768px) {
  .topnav a, .topnav #myLinks {
    display: inline-block; /* Display links inline */
  }
  
  .topnav a.icon {
    display: none; /* Hide the hamburger icon */
  }
  
  .topnav #myLinks {
    display: block; /* Always show the menu items */
    position: relative; /* Adjust position */
    float: right; /* Align menu to the right */
    margin: 0; /* Adjust margins */
    top: 0;
  }
}
</style>
</head>
<body>

<!-- Top Navigation Menu -->
<nav class="topnav">
  <a href="#home" class="active">Logo</a>
  <div id="myLinks">
    <a href="#news">News</a>
    <a href="#contact">Contact</a>
    <a href="#about">About</a>
  </div>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
    <i class="fa fa-bars"></i>
  </a>
</nav>

<div style="padding-left:16px">
  <h3>Vertical Mobile Navbar</h3>
  <p>This example demonstrates how a navigation menu on a mobile/smart phone could look like.</p>
  <p>Click on the hamburger menu (three bars) in the top right corner, to toggle the menu.</p>
</div>

<script>
function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
</script>
</body>
</html>
```

## Common Media Query Breakpoints 
 
```css
  /* Extra small devices (phones, 599.99 and down) */
  @media(max-width: 599.99px) {...}
  
  @media(min-width: 600px) {...}
  /* Small devices (portrait tablets and large phones, 600px and up) */
  
  @media(min-width: 768px) {...}
  /* Medium devices (landscape tablets, 768px and up) */
  
  @media(min-width: 992px) {...}
  /* Large devices (laptops/desktops, 992px and up) */
  
  @media(min-width: 1200px) {...}
  /* Extra large devices (large laptops and desktops, 1200px and up) */
```
