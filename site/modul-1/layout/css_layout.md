## CSS Box Model

**_Time: 20 min_**

The CSS box model shows how an element's size is built from four parts:

- `Content`: the area for children, ex: text or images (`width` + `height`).
- `Padding`: space inside the border.
- `Border`: the line around the box.
- `Margin`: the space outside the box.

![CSS Box Model](./img/css-box-model.png)

### Example

```html
<div class="box">This is a box.</div>
```

```css
.box {
  width: 100px;
  height: 200px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
  background-color: lightblue;
}
```

**Total size = content + padding + border + margin:**

- `width`: 100 + 40 + 10 + 20 = 170px
- `height`: 200 + 40 + 10 + 20 = 270px

> 🔧 **Short Practice — Box model sizing**
>
> Before moving on, open your browser devtools and try this:
>
> 1. Create a `<div>` with `width: 100px`, `padding: 20px`, and `border: 5px solid black`.
> 2. Inspect it in devtools — what is the actual rendered width?
> 3. Now add `box-sizing: border-box` to the same element. What changed?

> 💡 By default CSS adds padding and border on top of the width you set. `box-sizing: border-box` makes the width include them — most developers add it globally to avoid surprises.

---

## CSS Display Property


The `display` property in CSS determines how an element is displayed on the web page. It is fundamental for controlling the layout and presentation of elements.

### 1. `block`

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

### 2. `inline`

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

### 3. `inline-block`

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

### 4. `none`

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

### 5. `flex`

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

### 6. `grid`

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

### 1. Flex Container Properties

### `display: flex`

- **Description** : Defines a flex container and enables flexbox for its children.

### `flex-direction`

- **Description** : Specifies the direction of the flex items within the container.

- **Values** :
  - `row` (default): Left to right.

  - `row-reverse`: Right to left.

  - `column`: Top to bottom.

  - `column-reverse`: Bottom to top.

### `justify-content`

- **Description** : Aligns flex items along the main axis.

- **Values** :
  - `flex-start` (default): Items are packed toward the start.

  - `flex-end`: Items are packed toward the end.

  - `center`: Items are centered along the line.

  - `space-between`: Items are evenly distributed; the first item is at the start and the last item is at the end.

  - `space-around`: Items are evenly distributed with equal space around them.

### `align-items`

- **Description** : Aligns flex items along the cross axis.

- **Values** :
  - `stretch` (default): Items stretch to fill the container.

  - `flex-start`: Items are aligned at the start.

  - `flex-end`: Items are aligned at the end.

  - `center`: Items are centered along the line.

  - `baseline`: Items are aligned along their baseline.

### `flex-wrap`

- **Description** : Controls whether flex items are forced into a single line or can wrap onto multiple lines.

- **Values** :
  - `nowrap` (default): All flex items will be on one line.

  - `wrap`: Flex items will wrap onto multiple lines.

  - `wrap-reverse`: Flex items will wrap onto multiple lines in reverse order.

### 2. Flex Item Properties

### `flex-grow`

- **Description** : Defines the ability of a flex item to grow relative to the rest of the flex items.

### `flex-shrink`

- **Description** : Defines the ability of a flex item to shrink relative to the rest of the flex items.

### `flex-basis`

- **Description** : Defines the default size of a flex item before the remaining space is distributed.

### `align-self`

- **Description** : Allows the default alignment (or the one specified by `align-items`) to be overridden for individual flex items.

### Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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

### `static`

- **Description** : This is the default position value. Elements are positioned according to the normal document flow. Top, right, bottom, and left properties have no effect.

- **Example** :

```css
.static-element {
  position: static;
}
```

### `relative`

- **Description** : The element is positioned relative to its normal position. Setting top, right, bottom, or left will adjust the element away from its normal position.

- **Example** :

```css
.relative-element {
  position: relative;
  top: 10px;
  left: 20px;
}
```

### `absolute`

- **Description** : The element is positioned relative to its nearest positioned ancestor (an ancestor with `position` other than `static`), or the initial containing block if there are no positioned ancestors. The element is removed from the normal document flow.

- **Example** :

```css
.absolute-element {
  position: absolute;
  top: 50px;
  left: 100px;
}
```

### `fixed`

- **Description** : The element is positioned relative to the browser window, and it stays in the same place even when the page is scrolled. It is also removed from the normal document flow.

- **Example** :

```css
.fixed-element {
  position: fixed;
  top: 0;
  right: 0;
}
```

### `sticky`

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
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
