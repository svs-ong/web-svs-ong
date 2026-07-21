# Vanilla JavaScript Tutorial

## Types of data

### Primitives Types

JavaScript defines six primitive data types:

1. **String** : Represents textual data.

```javascript
let name = "John Doe";
```

2. **Number** : Represents both integer and floating-point numbers.

```javascript
let age = 30;
```

3. **Boolean** : Represents true or false values.

```javascript
let isStudent = true;
```

4. **Undefined** : Represents a variable that has been declared but not assigned a value.

```javascript
let address;
```

5. **Null** : Represents the intentional absence of any object value.

```javascript
let car = null;
```

6. **Symbol** : Represents a unique identifier.

```javascript
let uniqueId = Symbol("id");
```

7. **String formatting** : Refers to the technique of inserting variables, expressions, or values into strings to make them dynamic and readable.

```javascript
let name = "Alice";
let age = 25;

let message = `Hello, my name is ${name} and I am ${age} years old.`;
```

These primitive types form the foundation of data manipulation in JavaScript, each serving specific roles in programming tasks.

### The `typeof` Operator

Sometimes you need to check what type of data a variable holds — that's what the `typeof` operator is for. It returns a string naming the type of its operand, which is especially useful for debugging or validating values before using them.

```javascript

console.log(typeof "Hello"); // Output: "string"

console.log(typeof 42); // Output: "number"

console.log(typeof true); // Output: "boolean"

console.log(typeof undefined); // Output: "undefined"

console.log(typeof Symbol("id")); // Output: "symbol"

console.log(typeof { name: "Alice" }); // Output: "object"

```

> **Watch out:** `typeof null` returns `"object"`, not `"null"`. This is a well-known quirk (and bug) that has existed in JavaScript since its earliest versions.

`let` and `const` (Differences)

- **`let`** : Used to declare variables that can be reassigned.

```javascript
let city = "New York";
city = "Los Angeles"; // Allowed
```

- **`const`** : Used to declare constants that cannot be reassigned.

```javascript
const country = "USA";
country = "Canada"; // Error: Assignment to constant variable
```

### Objects

Objects are collections of properties and methods.

```javascript
const person = {
  name: "Alice",
  age: 25,
  greet() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
  },
};

console.log(person.greet()); // Output: Hello, my name is Alice and I am 25 years old.
```
#### Restructuring and Destructuring
 
**Destructuring** unpacks values from arrays or objects into variables. **Spread (`...`)** does the opposite — it expands an array or object out.
 
**Object destructuring**
```javascript
const user = { name: "Sarah", age: 28 };
const { name: userName, city = "Boston" } = user;
 
console.log(userName); // Output: Sarah
console.log(city); // Output: Boston
```
 
**Spread** copies/combines arrays and objects:
 
```javascript
const nums = [1, 2, 3];
const moreNums = [...nums, 4, 5]; // Output: [1, 2, 3, 4, 5]
 
const settings = { theme: "dark", ...{ fontSize: 16 } };
// Output: { theme: "dark", fontSize: 16 }
```


## Conditions & Loops

### Conditions

Conditional statements execute code based on conditions.

`if else` statement

```javascript
let age = 20;

if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}
```

`switch` statement

```javascript
switch (expression) {
  case x:
    // code block
    break;
  case y:
    // code block
    break;
  default:
  // code block
}
```

### Loops

Loops are used to execute a block of code repeatedly.
`for` Loop

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i); // Output: 0 1 2 3 4
}
```

`while` Loop

```javascript
let i = 0;
while (i < 5) {
  console.log(i); // Output: 0 1 2 3 4
  i++;
}
```

## Functions

Functions are blocks of code designed to perform a particular task.

### Function Declaration

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("Alice")); // Output: Hello, Alice!
console.log(greet(123)); // Output: Hello, 123!
```

### Function Expression

```javascript
const greet = (name) => {
  return `Hello, ${name}!`;
};

console.log(greet("Bob")); // Output: Hello, Bob!
```

1. **Function Definition**
   `greet` is a function that takes a name as input and returns a greeting message.

2. **Arrow Function (=>)**
   This is a shorter way to write a function in JavaScript.

3. **Template Literal (${name})**
   We use backticks \` to insert the value of `name` into the message:
   → `"Hello, Bob!"` if `name = "Bob"`

4. **Calling the Function**
   `greet("Bob")` runs the function with `"Bob"` and `console.log` prints the result.


## Try Catch

In JavaScript, error handling is an important part of writing robust code. The `try-catch` statement allows you to handle exceptions gracefully. This tutorial will guide you through using `try-catch` to manage errors in your JavaScript code.

**1. Basic Try-Catch Structure** The `try` block lets you test a block of code for errors. The `catch` block lets you handle the error.

```javascript
try {
  // Code to try
  console.log("Start of try runs"); // This will run

  // Error occurs here
  lalala; // This will throw ReferenceError: lalala is not defined

  console.log("End of try runs"); // This will not run
} catch (err) {
  console.log("Error has occurred!"); // This will run
  console.log(err.name); // Output: ReferenceError
  console.log(err.message); // Output: lalala is not defined
}
```

**2. The Finally Block** Optionally, you can use a `finally` block after `catch`. Code inside the `finally` block will run regardless of the result from the `try-catch`.

```javascript
try {
  console.log("Try block executed.");
  throw new Error("Something went wrong!");
} catch (err) {
  console.log("Caught an error:", err.message);
} finally {
  console.log("Finally block executed.");
}
```

**3. Throwing Custom Errors** You can throw your own exceptions using the `throw` statement. This is useful when you want to create custom error responses.

```javascript
try {
  let user = { name: "John", age: 30 };
  if (!user.email) {
    throw new Error("User has no email!");
  }
} catch (err) {
  console.log(err.message); // Output: User has no email!
}
```

## DOM Manipulation

DOM (Document Object Model) manipulation is a powerful feature in JavaScript that allows you to dynamically change the contents and structure of HTML documents.

**HTML and CSS**
Start by setting up the basic HTML and CSS for the page. This will provide the structure and styling we will manipulate with JavaScript.
**HTML Code:**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DOM Manipulation Tutorial</title>
    <style>
      div {
        border: 1px solid #ccc;
        margin: 10px;
        padding: 10px;
      }
      .example {
        color: green;
      }
    </style>
  </head>
  <body>
    <div id="example">This is a div element identified by ID.</div>
    <div class="example">First Element with class</div>
    <div class="example">Second Element with class</div>
    <div id="changeColor">Color me!</div>
    <div id="textContent">Initial text content.</div>
    <div id="parentDiv">Parent Div:</div>
    <div id="container">
      <div id="firstChild">First child</div>
    </div>

    <!-- Link to JavaScript file -->
    <script src="script.js"></script>
  </body>
</html>
```

### Save the following code into a separate file called **script.js**:

**1. getElementById** `getElementById` selects a single element with the specified ID.

**JavaScript Example:**

```javascript
const element = document.getElementById("example");
console.log(element.innerText); // Output: This is a div element identified by ID.
```

**2. getElementsByClassName** `getElementsByClassName` selects all elements that share the same class name.

**JavaScript Example:**

```javascript
const elements = document.getElementsByClassName("example");
console.log(elements[0].innerText); // Output: First Element with class
console.log(elements[1].innerText); // Output: Second Element with class
```

**3. Changing Background Color and Other Properties**
Modify CSS properties of elements dynamically.

**JavaScript Example:**

```javascript
const colorDiv = document.getElementById("changeColor");
colorDiv.style.backgroundColor = "lightblue";
colorDiv.style.color = "white";
colorDiv.style.padding = "10px";
```

**4. Changing innerText and innerHTML** `innerText` changes the text content, and `innerHTML` changes the inner HTML of an element.

**JavaScript Example:**

```javascript
const textDiv = document.getElementById("textContent");
textDiv.innerText = "Updated text content using innerText.";
textDiv.innerHTML = "<strong>Now with bold HTML content!</strong>";
```

**5. Appending and Inserting Elements**
Demonstrate how to add new elements to the DOM.

**JavaScript for Appending Elements:**

```javascript
const parent = document.getElementById("parentDiv");
const newElement = document.createElement("div");
newElement.innerText = "I am a new child!";
parent.appendChild(newElement);
```

**JavaScript for Inserting Elements:**

```javascript
const container = document.getElementById("container");
const newDiv = document.createElement("div");
newDiv.innerText = "Inserted at the beginning";
container.insertBefore(newDiv, container.firstChild);
```

## Events & onload

Event listeners are crucial for making web pages interactive. They listen for events like clicks, keystrokes, and loads, and then trigger specific functions in response. The `onload` property of the `window` object is a specific event listener that executes code after the entire page, including all dependent resources like stylesheets and images, is fully loaded.

### Using Event Listeners

**1. Basic Event Listener** You can add an event listener to any DOM element to handle events like `click`, `mouseover`, etc. Here's an example of how to add a click event listener to a button:

**HTML:**

```html
<button id="clickButton">Click Me!</button>
```

**JavaScript:**

```javascript
const button = document.getElementById("clickButton");
button.addEventListener("click", function () {
  alert("Button was clicked!");
});
```

This code snippet creates a button that, when clicked, will show an alert box saying `"Button was clicked!"`.

**2. Event Listener with Multiple Events**
You can also add event listeners for different types of events on the same element:

**HTML:**

```html
<div id="hoverDiv">Hover over me!</div>
```

**JavaScript:**

```javascript
const hoverDiv = document.getElementById("hoverDiv");
hoverDiv.addEventListener("mouseover", function () {
  hoverDiv.style.color = "red";
});
hoverDiv.addEventListener("mouseout", function () {
  hoverDiv.style.color = "black";
});
```

In this example, the text color of the `div` changes to red when the mouse hovers over it and returns to black when the mouse moves away.

### Using the onload Property

The `onload` property is especially useful when you need to be sure that all the HTML elements are fully loaded before your JavaScript code attempts to manipulate them.

**Using onload in Body Tag** You can specify an `onload` event directly in the HTML `body` tag to run JavaScript code after the entire page is loaded:

**HTML:**

```html
<body onload="doSomething();">
  <!-- page content -->
</body>
```

**JavaScript:**

```javascript
function doSomething() {
  console.log("Page fully loaded!");
}
```

**Using onload with the Window Object** Alternatively, you can add an `onload` event listener to the `window` object in your JavaScript file:

**JavaScript:**

```javascript
window.onload = function () {
  console.log("Page fully loaded and all resources are ready!");
};
```

**When to Use onload** Use the `onload` property when:

- Your JavaScript needs to manipulate DOM elements, and you want to ensure they are fully loaded before accessing them.

- Your script depends on external resources like images or stylesheets, and you need everything to be loaded before your script runs.

- You want to initialize JavaScript functionality, such as setting up event listeners or starting animations, only after the entire page is ready.
  Using `onload` ensures that your JavaScript code doesn't run prematurely, preventing errors related to trying to manipulate non-existent DOM elements and ensuring a smoother user experience.

**Conclusion** Understanding and using event listeners and the `onload` property effectively are fundamental skills in web development. They make your web applications interactive and ensure that scripts run at the appropriate time, enhancing reliability and user experience.

## Promises

A **Promise** in JavaScript is a way to handle actions that don’t happen instantly — like waiting for a server to respond, loading a file, or setting a timer.

Think of it like this:

> “I promise to give you an answer later — either I succeed, or I fail.”

So a Promise can:

- **Resolve** (success) and return a result
- **Reject** (failure) and return an error

**Creating a Promise**
Here’s a simple example of creating and using a promise:

```javascript
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true; // You can change this to false to test rejection

    if (success) {
      resolve("Promise resolved successfully!");
    } else {
      reject("Promise was rejected.");
    }
  }, 1000); // Waits 1 second
});

// Using the promise
promise
  .then((result) => console.log(result)) // Runs if the promise resolves
  .catch((error) => console.error(error)); // Runs if the promise is rejected
```

### Async/Await Mechanism

`async` and `await` are built on top of promises and make working with them more intuitive and easier to manage.

- **`async` function** : Declares a function as asynchronous and enables the use of `await` within it.

- **`await`** : Pauses the function execution until the Promise is resolved or rejected, and then returns the resolved value or throws the rejected error.
  **Example of Async/Await**

```javascript
async function fetchUserData(userId) {
  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

fetchUserData(1);
```

- The function `fetchUserData` is marked with `async`, which means it works with promises.
- The keyword `await` is used to wait for two things:
  - The data to be fetched from the internet using `fetch(...)`
  - The result to be turned into usable JSON using `.json()`

### Combining Async/Await with .then() and .catch()

```javascript
async function processUserAndPosts(userId) {
  try {
    const user = await fetch(`https://api.example.com/users/${userId}`).then(
      (response) => response.json()
    );
    const posts = await fetch(
      `https://api.example.com/users/${userId}/posts`
    ).then((response) => response.json());
    console.log("User:", user, "Posts:", posts);
  } catch (error) {
    console.error("Error processing user and posts:", error);
  }
}

processUserAndPosts(1);
```

In this example, `then()` is used for converting the fetch response to JSON, separating data transformation from error handling, which is managed by `await` and `try/catch`.

**Handling Errors in Async/Await** Handling errors in `async/await` is straightforward with `try/catch`, as it closely resembles synchronous error handling, which makes it a preferred method in modern JavaScript.

### Detailed Error Handling

```javascript
async function secureFetch(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    return null; // Return a neutral value or further handle the error
  }
}

secureFetch("https://api.example.com/data")
  .then((data) => console.log(data))
  .catch((error) => console.error("Caught in then:", error));
```

## `getElementFromFile`

The `getElementFromFile` function is designed to asynchronously fetch HTML content from a specified file path and then extract a specific HTML element by its ID. This approach is useful in scenarios where you need to load and display content dynamically without reloading the page or when the content is stored in separate files for organizational purposes.

**How the Function Works**

1. **Fetching the File** : It uses the Fetch API to retrieve the file at the provided `filePath`.

2. **Reading the Content** : After fetching the file, it reads the content as text.

3. **Parsing HTML Content** : The function then uses `DOMParser` to parse the text content into a usable Document Object Model (DOM).

4. **Extracting the Element** : Finally, it retrieves an element by its specified `elementId` from the parsed HTML.
   **Step-by-Step Explanation**

```javascript
async function getElementFromFile(filePath, elementId) {
  try {
    // Use Fetch API to get the element content
    const response = await fetch(filePath); // Fetch the file
    const elementAsString = await response.text(); // Convert response to text

    // Parse the elementAsString into a Document Object Model (DOM)
    const parser = new DOMParser(); // Create a new DOMParser instance
    const parsedElement = parser.parseFromString(elementAsString, "text/html"); // Parse the string to a HTML document

    // Return the element with the specified ID
    return parsedElement.getElementById(elementId);
  } catch (error) {
    console.error(`Failed to load element from file: ${filePath}`, error);
    return null; // Return null in case of an error
  }
}
```

**Example Usage** Imagine you have multiple HTML files containing different sections of a webpage, like `header.html`, `footer.html`, etc., and you want to load these into specific elements on your main page dynamically.

**HTML Structure of Main Page**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dynamic Content Loading</title>
  </head>
  <body>
    <div id="header"></div>
    <div id="main-content">Main Content Goes Here</div>
    <div id="footer"></div>

    <script src="loadContent.js"></script>
  </body>
</html>
```

JavaScript File: `loadContent.js`\*\*

```javascript
async function loadContent() {
  const header = await getElementFromFile("header.html", "header");
  const footer = await getElementFromFile("footer.html", "footer");

  document.getElementById("header").appendChild(header);
  document.getElementById("footer").appendChild(footer);
}

window.onload = loadContent;
```

Benefits of Using `getElementFromFile`\*\*

1. **Modularity** : By keeping different parts of the webpage in separate files, you can manage content more efficiently.

2. **Reusability** : The function can be reused across different projects or within the same project to load various elements dynamically.

3. **Maintainability** : Updating the HTML content in separate files does not require changes to the main HTML file, easing maintenance.
