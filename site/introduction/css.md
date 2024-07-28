# CSS Basics Tutorial 

## Introduction to CSS 

CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of an HTML document. It controls the layout, colors, fonts, and overall appearance of a website.

## Adding CSS to HTML 

You can add CSS to HTML in three ways: Inline, Internal, and External.

### 1. Inline CSS 
Add styles directly to HTML elements using the `style` attribute.

```html
<h1 style="color: blue; font-size: 24px;">This is a Heading</h1>
```

### 2. Internal CSS 
Include CSS within the `<style>` tag in the `<head>` section of the HTML document.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
Link to an external CSS file using the `<link>` tag.
#### HTML: 


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
    <link rel="stylesheet" href="styles.css">
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

## CSS Selectors 

Selectors are used to target HTML elements to apply styles.

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

## Styling Text 

CSS provides various properties to style text, allowing you to change its appearance and improve readability.

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

#### CSS: 


```css
h1 {
    color: darkred;
    font-family: 'Georgia', serif;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
}

p {
    color: darkslategray;
    font-family: 'Arial', sans-serif;
    font-size: 16px;
    text-align: justify;
    text-decoration: none;
}
```

#### HTML: 


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Styling Text Example</title>
    <style>
        h1 {
            color: darkred;
            font-family: 'Georgia', serif;
            font-size: 32px;
            font-weight: bold;
            text-align: center;
        }

        p {
            color: darkslategray;
            font-family: 'Arial', sans-serif;
            font-size: 16px;
            text-align: justify;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <h1>This is a Heading</h1>
    <p>This is a paragraph demonstrating various text styling properties using CSS. The text is justified, and its color, font family, and size have been customized.</p>
</body>
</html>
```


## CSS Box Model 

Understanding the CSS box model is essential for controlling the layout and design of HTML elements. The box model describes how the size and spacing of an element are calculated, and it consists of four regions: content, padding, border, and margin.

### The Four Regions of the Box Model 
 
1. **Content Edge** : This is the innermost part of the box where the actual content of the element is displayed, such as text, images, or other media. The size of this area can be adjusted using properties like `width` and `height`.
 
2. **Padding Edge** : Padding is the space between the content and the border. It provides inner spacing within the box, making the content appear with some breathing room. Padding can be set individually for each side (top, right, bottom, left) or uniformly for all sides using the `padding` property.
 
3. **Border Edge** : The border surrounds the padding (or the content if there is no padding). It can be styled using the `border` property, which allows you to set the width, style (solid, dashed, etc.), and color of the border.
 
4. **Margin Edge** : The margin is the outermost part of the box, creating space between the element and its surrounding elements. Like padding, margins can be set individually for each side or uniformly for all sides using the `margin` property.

### Example of the Box Model 

To illustrate the box model, consider the following image and CSS example:
![CSS Box Model](https://qph.cf2.quoracdn.net/main-qimg-d424c463fabd68e11736d4a7f09a14ce-pjlq) 

### CSS Example 


```css
.box {
    width: 200px;             /* Content width */
    height: 100px;            /* Content height */
    padding: 20px;            /* Padding on all sides */
    border: 5px solid black;  /* Border width, style, and color */
    margin: 10px;             /* Margin on all sides */
}
```

### HTML Example 


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Box Model Example</title>
    <style>
        .box {
            width: 200px;
            height: 100px;
            padding: 20px;
            border: 5px solid black;
            margin: 10px;
            background-color: lightblue;
        }
    </style>
</head>
<body>
    <div class="box">This is a box.</div>
</body>
</html>
```

### Explanation 
 
- **Content** : The innermost area of the `.box` element is 200px wide and 100px high.
 
- **Padding** : A 20px padding on all sides adds extra space inside the box, pushing the content inward.
 
- **Border** : A 5px solid black border surrounds the padding.
 
- **Margin** : A 10px margin around the box creates space between the box and other elements.


## CSS Display Property 
The `display` property in CSS determines how an element is displayed on the web page. It is fundamental for controlling the layout and presentation of elements.
### Common Display Values 
`block` 
- **Description** : Elements with `display: block` start on a new line and take up the full width available by default. Block-level elements create a line break before and after themselves.
 
- **Common Examples** : `<div>`, `<h1>`, `<p>`, `<section>`

#### CSS: 


```css
.block-element {
    display: block;
    background-color: lightblue;
    padding: 10px;
    margin: 10px 0;
}
```

#### HTML: 


```html
<div class="block-element">This is a block element.</div>
<p class="block-element">This is another block element.</p>
```
`inline` 
- **Description** : Elements with `display: inline` do not start on a new line and only take up as much width as necessary. Inline elements do not create a line break and can sit next to other inline elements.
 
- **Common Examples** : `<span>`, `<a>`, `<strong>`

#### CSS: 


```css
.inline-element {
    display: inline;
    background-color: lightgreen;
    padding: 10px;
}
```

#### HTML: 


```html
<span class="inline-element">This is an inline element.</span>
<span class="inline-element">This is another inline element.</span>
```
`inline-block` 
- **Description** : Elements with `display: inline-block` are formatted as inline elements but can accept block-level properties like width and height. They sit next to each other like inline elements but maintain the ability to use block properties.
 
- **Common Examples** : Custom elements like buttons or styled components that need block properties but inline flow.

#### CSS: 


```css
.inline-block-element {
    display: inline-block;
    background-color: lightcoral;
    padding: 10px;
    margin: 10px 0;
    width: 150px;
}
```

#### HTML: 


```html
<div class="inline-block-element">This is an inline-block element.</div>
<div class="inline-block-element">This is another inline-block element.</div>
```
`none` 
- **Description** : Elements with `display: none` are completely removed from the document flow and are not displayed on the page. This is different from visibility hidden, where the element is hidden but still takes up space.
 
- **Common Examples** : Used for elements that should be hidden from view but not removed from the DOM, such as in toggling visibility.

#### CSS: 


```css
.hidden-element {
    display: none;
}
```

#### HTML: 


```html
<div class="hidden-element">This element is hidden and won't be displayed.</div>
<p>This paragraph is visible.</p>
```

### More Display Values 
`flex` 
- **Description** : Elements with `display: flex` become flex containers, allowing for flexible layouts using the Flexbox model. Child elements (flex items) can be arranged dynamically within the container.
 
- **Common Examples** : Navigation bars, galleries, any dynamic layout needs.

#### CSS: 


```css
.flex-container {
    display: flex;
    justify-content: space-between;
}
.flex-item {
    background-color: lightseagreen;
    padding: 10px;
    margin: 5px;
}
```

#### HTML: 


```html
<div class="flex-container">
    <div class="flex-item">Item 1</div>
    <div class="flex-item">Item 2</div>
    <div class="flex-item">Item 3</div>
</div>
```
`grid` 
- **Description** : Elements with `display: grid` become grid containers, enabling complex layouts using the Grid model. Grid items can be precisely positioned within rows and columns.
 
- **Common Examples** : Layouts that require precise control over rows and columns, such as dashboards and complex UI layouts.

#### CSS: 


```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}
.grid-item {
    background-color: lightgoldenrodyellow;
    padding: 20px;
    text-align: center;
}
```

#### HTML: 


```html
<div class="grid-container">
    <div class="grid-item">1</div>
    <div class="grid-item">2</div>
    <div class="grid-item">3</div>
    <div class="grid-item">4</div>
    <div class="grid-item">5</div>
    <div class="grid-item">6</div>
</div>
```

### Conclusion 
The `display` property is versatile and essential for controlling how elements appear and interact on a web page. By understanding and using different `display` values, you can create more dynamic and responsive layouts.


## CSS Flexbox 

Flexbox, or the Flexible Box Layout Module, is a layout model that allows for the efficient arrangement of items within a container. It is designed to provide a consistent layout on different screen sizes and devices, making it particularly useful for responsive design.

### Key Concepts 
 
1. **Flex Container** : The parent element that has `display: flex` or `display: inline-flex`.
 
2. **Flex Items** : The child elements within the flex container.

### Flex Container Properties 
`display: flex` 
- **Description** : Defines a flex container and enables flexbox for its children.
 
- **Example** :

```css
.flex-container {
    display: flex;
}
```
`flex-direction` 
- **Description** : Specifies the direction of the flex items within the container.
 
- **Values** : 
  - `row` (default): Left to right.
 
  - `row-reverse`: Right to left.
 
  - `column`: Top to bottom.
 
  - `column-reverse`: Bottom to top.
 
- **Example** :

```css
.flex-container {
    display: flex;
    flex-direction: row;
}
```
`justify-content` 
- **Description** : Aligns flex items along the main axis.
 
- **Values** : 
  - `flex-start` (default): Items are packed toward the start.
 
  - `flex-end`: Items are packed toward the end.
 
  - `center`: Items are centered along the line.
 
  - `space-between`: Items are evenly distributed; the first item is at the start and the last item is at the end.
 
  - `space-around`: Items are evenly distributed with equal space around them.
 
- **Example** :

```css
.flex-container {
    display: flex;
    justify-content: space-between;
}
```
`align-items` 
- **Description** : Aligns flex items along the cross axis.
 
- **Values** : 
  - `stretch` (default): Items stretch to fill the container.
 
  - `flex-start`: Items are aligned at the start.
 
  - `flex-end`: Items are aligned at the end.
 
  - `center`: Items are centered along the line.
 
  - `baseline`: Items are aligned along their baseline.
 
- **Example** :

```css
.flex-container {
    display: flex;
    align-items: center;
}
```
`flex-wrap` 
- **Description** : Controls whether flex items are forced into a single line or can wrap onto multiple lines.
 
- **Values** : 
  - `nowrap` (default): All flex items will be on one line.
 
  - `wrap`: Flex items will wrap onto multiple lines.
 
  - `wrap-reverse`: Flex items will wrap onto multiple lines in reverse order.
 
- **Example** :

```css
.flex-container {
    display: flex;
    flex-wrap: wrap;
}
```

### Flex Item Properties 
`flex-grow` 
- **Description** : Defines the ability of a flex item to grow relative to the rest of the flex items.
 
- **Example** :

```css
.flex-item {
    flex-grow: 1;
}
```
`flex-shrink` 
- **Description** : Defines the ability of a flex item to shrink relative to the rest of the flex items.
 
- **Example** :

```css
.flex-item {
    flex-shrink: 1;
}
```
`flex-basis` 
- **Description** : Defines the default size of a flex item before the remaining space is distributed.
 
- **Example** :

```css
.flex-item {
    flex-basis: 100px;
}
```
`align-self` 
- **Description** : Allows the default alignment (or the one specified by `align-items`) to be overridden for individual flex items.
 
- **Example** :

```css
.flex-item {
    align-self: center;
}
```

### Example 

#### CSS: 


```css
.flex-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    background-color: lightgrey;
    padding: 10px;
}

.flex-item {
    background-color: lightseagreen;
    padding: 20px;
    margin: 10px;
    flex-grow: 1;
    flex-basis: 150px;
    text-align: center;
    color: white;
}
```

#### HTML: 


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flexbox Example</title>
    <style>
        .flex-container {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            flex-wrap: wrap;
            background-color: lightgrey;
            padding: 10px;
        }

        .flex-item {
            background-color: lightseagreen;
            padding: 20px;
            margin: 10px;
            flex-grow: 1;
            flex-basis: 150px;
            text-align: center;
            color: white;
        }
    </style>
</head>
<body>
    <div class="flex-container">
        <div class="flex-item">Item 1</div>
        <div class="flex-item">Item 2</div>
        <div class="flex-item">Item 3</div>
        <div class="flex-item">Item 4</div>
    </div>
</body>
</html>
```

### Conclusion 
The Flexbox layout model is a powerful tool for creating responsive layouts. By understanding and utilizing properties like `flex-direction`, `justify-content`, `align-items`, and `flex-wrap`, you can create flexible and efficient layouts that adapt to various screen sizes and devices.

---


## CSS Position Property 
The `position` property in CSS specifies how an element is positioned in a document. It affects how elements are placed on the web page and can be used to create complex layouts.
### Common Values 
`static` 
- **Description** : This is the default position value. Elements are positioned according to the normal document flow. Top, right, bottom, and left properties have no effect.
 
- **Example** :

```css
.static-element {
    position: static;
}
```
`relative` 
- **Description** : The element is positioned relative to its normal position. Setting top, right, bottom, or left will adjust the element away from its normal position.
 
- **Example** :

```css
.relative-element {
    position: relative;
    top: 10px;
    left: 20px;
}
```
`absolute` 
- **Description** : The element is positioned relative to its nearest positioned ancestor (an ancestor with `position` other than `static`), or the initial containing block if there are no positioned ancestors. The element is removed from the normal document flow.
 
- **Example** :

```css
.absolute-element {
    position: absolute;
    top: 50px;
    left: 100px;
}
```
`fixed` 
- **Description** : The element is positioned relative to the browser window, and it stays in the same place even when the page is scrolled. It is also removed from the normal document flow.
 
- **Example** :

```css
.fixed-element {
    position: fixed;
    top: 0;
    right: 0;
}
```
`sticky` 
- **Description** : The element toggles between `relative` and `fixed` positioning depending on the user's scroll position. It is positioned relative until a specified offset position is met in the viewport, then it "sticks" in place.
 
- **Example** :

```css
.sticky-element {
    position: sticky;
    top: 0;
}
```

### Example 

#### CSS: 


```css
.container {
    height: 200px;
    position: relative;
    background-color: lightgrey;
}

.relative-element {
    position: relative;
    top: 20px;
    left: 20px;
    background-color: lightblue;
    padding: 10px;
}

.absolute-element {
    position: absolute;
    top: 50px;
    left: 50px;
    background-color: lightgreen;
    padding: 10px;
}

.fixed-element {
    position: fixed;
    top: 10px;
    right: 10px;
    background-color: lightcoral;
    padding: 10px;
}

.sticky-element {
    position: sticky;
    top: 0;
    background-color: lightgoldenrodyellow;
    padding: 10px;
}
```

#### HTML: 


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Position Property Example</title>
    <style>
        .container {
            height: 200px;
            position: relative;
            background-color: lightgrey;
        }

        .relative-element {
            position: relative;
            top: 20px;
            left: 20px;
            background-color: lightblue;
            padding: 10px;
        }

        .absolute-element {
            position: absolute;
            top: 50px;
            left: 50px;
            background-color: lightgreen;
            padding: 10px;
        }

        .fixed-element {
            position: fixed;
            top: 10px;
            right: 10px;
            background-color: lightcoral;
            padding: 10px;
        }

        .sticky-element {
            position: sticky;
            top: 0;
            background-color: lightgoldenrodyellow;
            padding: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="relative-element">Relative Element</div>
        <div class="absolute-element">Absolute Element</div>
        <div class="sticky-element">Sticky Element</div>
    </div>
    <div class="fixed-element">Fixed Element</div>
    <p>Scroll down to see the sticky element in action.</p>
    <div style="height: 1000px;"></div>
</body>
</html>
```

--- 
