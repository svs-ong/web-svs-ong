# CSS Basics Tutorial

## Introduction to CSS

CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of an HTML document. It controls the layout, colors, fonts, and overall appearance of a website.

## Adding CSS to HTML

You can add CSS to HTML in three ways: Inline, Internal, and External. (Yes, CSS is flexible—like yoga for your website!)

### 1. Inline CSS

Add styles directly to HTML elements using the `style` attribute. (Great for quick fixes, but not recommended for big projects—unless you enjoy chaos!)

```html
<h1 style="color: blue; font-size: 24px;">This is a Heading</h1>
```

### 2. Internal CSS

Include CSS within the `<style>` tag in the `<head>` section of the HTML document. (Perfect for small projects or when you want to keep everything in one place—like a tidy desk!)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page Title</title>
    <style>
      body {
        background-color: #f4f4f4;
      }
      h1 {
        color: blue;
        font-size: 24px;
      }
    </style>
  </head>
  <body>
    <h1>This is a Heading</h1>
    <p>This is a paragraph.</p>
  </body>
</html>
```

### 3. External CSS

Link to an external CSS file using the `<link>` tag. (The professional way! Keeps your styles neat and reusable.)

#### HTML:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page Title</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>This is a Heading</h1>
    <p>This is a paragraph.</p>
  </body>
</html>
```

#### External CSS File (styles.css):

```css
body {
  background-color: #f4f4f4;
}
h1 {
  color: blue;
  font-size: 24px;
}
```

> **Pro Tip:** Use your browser's DevTools (right-click → Inspect) to experiment with CSS live. It's like a magic wand for your website!

## CSS Selectors

Selectors are used to target HTML elements to apply styles. (Think of them as the matchmakers of the web—pairing style with substance!)

### Common Selectors

- **Element Selector** : Targets elements by their tag name.

#### CSS:

```css
p {
  color: red;
}
```

#### HTML:

```html
<p>This paragraph will be red.</p>
<p>So will this one.</p>
```

- **Class Selector** : Targets elements by their class attribute.

#### CSS:

```css
.my-class {
  color: green;
}
```

#### HTML:

```html
<p class="my-class">This paragraph will be green.</p>
<p>This paragraph will not be green.</p>
```

- **ID Selector** : Targets a single element by its ID attribute.

#### CSS:

```css
#my-id {
  color: blue;
}
```

#### HTML:

```html
<p id="my-id">This paragraph will be blue.</p>
<p>This paragraph will not be blue.</p>
```

---

This version includes corresponding HTML code to show how each CSS selector applies to HTML elements.

> **Common Mistake Alert:** Don't forget the dot (`.`) for classes and the hash (`#`) for IDs! `.my-class` ≠ `my-class`, and `#my-id` ≠ `my-id`.

## Styling Text

CSS provides various properties to style text, allowing you to change its appearance and improve readability. (Because nobody likes boring text!)

### Common Text Properties

- **Color** : Sets the text color.

```css
p {
  color: navy;
}
```

- **Font Family** : Specifies the font of the text.

```css
p {
  font-family: Arial, sans-serif;
}
```

- **Font Size** : Defines the size of the text.

```css
p {
  font-size: 16px;
}
```

- **Font Weight** : Controls the thickness of the text.

```css
p {
  font-weight: bold;
}
```

- **Text Align** : Aligns the text within its container.

```css
p {
  text-align: center;
}
```

- **Text Decoration** : Adds decoration to text, such as underline, overline, or line-through.

```css
p {
  text-decoration: underline;
}
```

### Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Styling Text Example</title>
    <style>
      h1 {
        color: darkred;
        font-family: "Georgia", serif;
        font-size: 32px;
        font-weight: bold;
        text-align: center;
      }

      p {
        color: darkslategray;
        font-family: "Arial", sans-serif;
        font-size: 16px;
        text-align: justify;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <h1>This is a Heading</h1>
    <p>
      This is a paragraph demonstrating various text styling properties using
      CSS. The text is justified, and its color, font family, and size have been
      customized.
    </p>
  </body>
</html>
```

> "CSS: Making the web fabulous, one selector at a time!"

## The CSS Box Model

Every HTML element is treated as a box in CSS. Understanding the box model is like understanding how to wrap a present—you need to know about the gift (content), the wrapping paper (border), the space inside the box (padding), and the space around the box (margin).

### Box Model Components

- **Content**: The actual content of the element (text, images, etc.)
- **Padding**: The space between the content and the border
- **Border**: The line around the padding and content
- **Margin**: The space outside the border

### Example

```css
.box {
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 2px solid black;
  margin: 10px;
  background-color: lightblue;
}
```

```html
<div class="box">This is a box with padding, border, and margin!</div>
```

> **Fun Fact:** The total width of an element = content + padding + border + margin. It's like a mathematical sandwich!

### Box Model Properties

```css
/* Padding */
padding: 10px; /* All sides */
padding: 10px 20px; /* Top/bottom, left/right */
padding: 10px 20px 15px 25px; /* Top, right, bottom, left */

/* Border */
border: 2px solid red; /* Width, style, color */
border-radius: 5px; /* Rounded corners */

/* Margin */
margin: 10px; /* All sides */
margin: 10px auto; /* Center horizontally */
```

> "Why did the CSS box go to therapy? Because it had too many issues with its inner self!"
