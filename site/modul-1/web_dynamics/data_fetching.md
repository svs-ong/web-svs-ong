# Data Fetching

## Introduction to Data Fetching

Data fetching is the process of retrieving data from a remote server or database, usually over the internet, using various protocols like HTTP. This is essential for modern web applications, as it allows them to dynamically update content, load data on demand, and provide real-time user experiences.

## Making a GET HTTP Request

One of the most common ways to fetch data is by using a GET HTTP request. Below is an example of how you can do this using JavaScript's `fetch` API.

### Example Code

```js
try {
  const response = await fetch("http://localhost:3000/articles");
  const data = await response.json();
  console.log("Data fetched successfully:", data);
} catch (error) {
  console.error("Error fetching data:", error);
}
```

In this example:

- The `fetch` function is used to send a GET request to the specified URL.

- `response.json()` converts the response into a JSON object.

- If the data is successfully fetched, it is logged to the console.

- Any errors during the fetch process are caught and logged to the console.

### Example of Fetched Data

The following is an example of the data that might be retrieved from the server:

```json
[
  {
    "title": "Exploring the Depths of the Mariana Trench",
    "imageurl": "https://i.ytimg.com/vi/E_o6jKrZsg8/maxresdefault.jpg",
    "description": "Join us as we delve into the mysteries of the deepest part of the world's oceans to discover unique marine life and stunning new ecosystems.",
    "author": "Jane Doe",
    "rating": 4.7,
    "date": "2023-07-26",
    "readingTime": "15min"
  },
  {
    "title": "The Future of Renewable Energy",
    "description": "An in-depth analysis of upcoming technologies in renewable energy that could revolutionize how we power our world.",
    "author": "John Smith",
    "rating": 4.8,
    "date": "2023-07-20",
    "readingTime": "10min"
  }
...]
```

This JSON array contains objects, each representing an article with attributes like title, image URL, description, author, rating, date, and estimated reading time. This structure is typical for content that might be displayed in a blog or news application.

## Render feched data

### 1. HTML Page (index.html)

The HTML page sets up a script to handle data fetching, HTML content parsing, and DOM manipulation. It also ensures that styles are applied correctly.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dynamic Article Cards</title>
    <script>
      // Fetch and return an HTML element from a file
      async function getElementFromFile(filePath, elementId) {
        try {
          const response = await fetch(filePath);
          const text = await response.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(text, "text/html");
          return doc.getElementById(elementId);
        } catch (error) {
          console.error(`Failed to load element from file: ${filePath}`, error);
          return null;
        }
      }

      // Fetch articles from a backend server
      async function fetch_articles() {
        try {
          const response = await fetch("http://localhost:3000/articles");
          return await response.json();
        } catch (error) {
          console.error("Error fetching data", error);
          return [];
        }
      }

      // Inject CSS into the document head
      function injectCss(cssFilePath) {
        const linkElement = document.createElement("link");
        linkElement.rel = "stylesheet";
        linkElement.href = cssFilePath;
        document.head.appendChild(linkElement);
      }

      // Main function to render fetched articles
      async function main() {
        const articles = await fetch_articles();
        const cardTemplate = await getElementFromFile("./card.html", "card");

        articles.forEach((article) => {
          const card = cardTemplate.cloneNode(true);
          card.querySelector("#title").textContent = article.title;
          card.querySelector("#description").textContent = article.description;
          document.body.appendChild(card);
        });

        injectCss("./card.styles.css");
      }

      document.addEventListener("DOMContentLoaded", main);
    </script>
  </head>
  <body></body>
</html>
```

### 2. HTML Template for Article Cards (card.html)

This template provides the basic structure for each article card.

```html
<div id="card" class="card">
  <h1 id="title">Title Here</h1>
  <h2 id="description">Subtitle Here</h2>
</div>
```

### 3. CSS for Styling Article Cards (card.styles.css)

The CSS file specifies the visual appearance of the cards.

```css
.card {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 20px;
  width: 300px;
  margin: auto;
}

.card h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.card h2 {
  font-size: 18px;
  color: #666;
  margin: 0;
}
```

### Conclusion

This course module teaches how to integrate HTML templates and CSS styling with JavaScript's asynchronous data fetching capabilities to render dynamic content on a webpage. This setup is commonly used in modern web applications to display articles, profiles, and other content in a responsive and engaging manner.

## JS Modules

Modules in JavaScript are self-contained units of code that can be exported from one file and imported into another. They promote better code organization, reusability, and manageability. JavaScript provides two primary ways to export modules: named and default exports.

### 1. Exporting Modules

### Named Exports

You can export multiple items from a module using named exports. Each exported item retains its original name.

#### Example of Named Exports

```javascript
// file: mathFunctions.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
```

### Default Exports

Each module can have one default export. This is typically used for the main functionality of the module.

#### Example of Default Export

```javascript
// file: greeting.js
const greet = (name) => `Hello, ${name}!`;
export default greet;
```

### 2. Importing Modules

### Importing Named Exports

You can selectively import named exports.

#### Example:

```javascript
import { add, subtract } from "./mathFunctions.js";

console.log(add(5, 3)); // Output: 8
console.log(subtract(5, 3)); // Output: 2
```

### Importing Default Exports

Default exports can be imported under any name.

#### Example:

```javascript
import greet from "./greeting.js";

console.log(greet("Alice")); // Output: Hello, Alice!
```

### Importing Everything

For convenience, you can import all exports from a module at once.

#### Example:

```javascript
import * as MathFunc from "./mathFunctions.js";

console.log(MathFunc.add(10, 5));
console.log(MathFunc.subtract(10, 5));
```

### 3. Aliasing in Imports and Exports

Aliases allow you to rename imports or exports for clarity or convenience.

#### Exporting with Aliases:

```javascript
const multiply = (a, b) => a * b;
export { multiply as product };
```

#### Importing with Aliases:

```javascript
import { product as multiply } from "./mathFunctions.js";

console.log(multiply(4, 5)); // Output: 20
```

4. Using the `index.js` FileThe `index.js` file often serves as an entry point or a "barrel" file for a module or directory, making imports cleaner and more organized.Purpose of `index.js`

- **Aggregation:** `index.js` can re-export functions from multiple files, allowing you to import them through a single entry point.

- **Simplification:** It simplifies the import paths in your application.

#### Example:

```javascript
// file: index.js in a utils folder
export { add, subtract } from "./mathFunctions.js";
export { default as greet } from "./greeting.js";
```

Using `index.js` for Imports:

```javascript
import { add, greet } from "./utils"; // Assuming the index.js is in the utils folder

console.log(add(10, 10));
console.log(greet("Bob"));
```

### Conclusion

Understanding and using JavaScript's `import` and `export` statements, along with strategic use of `index.js` files, can significantly enhance the structure and efficiency of your projects. These tools are crucial for developing scalable and maintainable web applications.
