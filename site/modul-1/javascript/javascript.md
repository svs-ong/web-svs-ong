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

**Rest (`...`)** collects remaining values:
 
```javascript
const [top, ...rest] = [95, 88, 76];
console.log(rest); // Output: [88, 76]
 
function sumAll(...nums) {
  return nums.reduce((total, n) => total + n, 0);
}
console.log(sumAll(1, 2, 3)); // Output: 6
```

### Quick Question
 
> ❓What will the following code log to the console, and why?
 
```javascript
const [a, b, ...rest] = [10, 20, 30, 40];
console.log(typeof a, rest);
```
 
<details>

<summary>Show answer</summary>

`"number" [ 30, 40 ]` — `a` is destructured as the first array element (a number), and the rest pattern (`...rest`) collects everything after `a` and `b` into a new array.
 
</details>


## Functions & Loops

<div style="float: right;">~20 minutes</div>

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

### Functions

A function is just a value, so it can be stored in a variable like any other:

```javascript
const nr = 4;
const greet = (name) => {
  return `Hello, ${name}!`;
};

console.log(greet("Bob")); // Output: Hello, Bob!
```

`greet` is a variable holding a function. Because it's a value, we can check its type just like we would for a string or a number:

```javascript
console.log(typeof greet); // Output: "function"
```

### Unnamed (anonymous) functions

Not every function needs a name. An anonymous function is one with no name of its own — most often you'll see it created on the spot and handed straight to another function, instead of being stored in a variable first.

```javascript
const repeat = (action, time) => {
  for (let i = 1; i <= time; i++) action();
};
```

`repeat` takes a function called `action` and just calls it `time` times — it doesn't care what that function does. Now call `repeat` with a function created right there, with no name of its own:

```javascript
repeat(() => {
  console.log("Hello1!");
}, 3);

repeat(() => console.log("Hello2!"), 2);
```

`() => console.log("Hello!")` is never named or stored in a variable — it's built right inside the call to `repeat` and only exists to be run those 3 times. Same idea with an arrow function passed to `forEach`:

> 💡 `greet` from before is technically anonymous as well — `(name) => { ... }` has no name of its own, it's just been assigned to a variable. We refer to it as "`greet`" because of the variable, not because the function itself is named.

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

### Array Methods — map, filter, forEach & sort

`map`, `filter`, `forEach` and `sort` all loop over an array for you, but they don't all give you the same thing back.

**`map(fn)`** runs `fn` on every item and returns a **new array** of the same length, built from the results. The original array is left untouched.

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2);

console.log(doubled); // [2, 4, 6, 8, 10]
console.log(numbers); // [1, 2, 3, 4, 5] — untouched
```

**Same result with a normal `for` loop:**

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = [];

for (let i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}

console.log(doubled); // [2, 4, 6, 8, 10]
```

Both produce the same `doubled` array. The `for` loop needs an empty array set up beforehand and a manual `push` on every iteration; `map` does both automatically and just returns the finished array.

**`forEach(fn)`** runs `fn` on every item too, but it returns `undefined` — there's no new array. It exists purely to run a side effect for each item (`console.log`, updating the DOM, pushing into some other variable), not to build data.

```javascript
const numbers = [1, 2, 3, 4, 5];
const result = numbers.forEach((n) => console.log(n * 2)); // logs 2 4 6 8 10

console.log(result); // undefined — forEach gives you nothing back
```

**`filter(fn)`** runs a true/false test on every item and returns a **new array** with only the items that passed. Just like `map`, the original is untouched, but the result can be shorter.

```javascript
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter((n) => n % 2 === 0);

console.log(evens); // [2, 4]
console.log(numbers); // [1, 2, 3, 4, 5] — untouched
```

**`sort(fn)`** is the odd one out: it **mutates the original array** in place and returns that same array — not a copy.

```javascript
const numbers = [5, 3, 1, 4, 2];
const sorted = numbers.sort((a, b) => a - b);

console.log(sorted); // [1, 2, 3, 4, 5]
console.log(numbers); // [1, 2, 3, 4, 5] — the original got rearranged too!
console.log(sorted === numbers); // true — same array, not a copy
```

**At a glance:**

| Method    | Returns        | New array? | Mutates original? | Use it to...                                        |
| --------- | -------------- | ---------- | ----------------- | --------------------------------------------------- |
| `map`     | new array      | ✅ yes     | ❌ no             | transform every item into something else            |
| `forEach` | `undefined`    | ❌ no      | ❌ no             | run a side effect per item — no output array needed |
| `filter`  | new array      | ✅ yes     | ❌ no             | keep only the items matching a condition            |
| `sort`    | the same array | ❌ no      | ✅ yes            | reorder the items in place                          |

> 🔧 Given `const prices = [12, 45, 7, 89, 23];`, write one line using `filter` to keep only prices above 20, then one line using `map` to add 19% VAT on top of those.

> 💡 Common mistake: reaching for `map` when you only need to log or update the DOM for each item — you're building and throwing away an array for nothing; use `forEach` instead. Rule of thumb: **need a new array back → `map`/`filter`. Just doing something with each item → `forEach`.**

## Try Catch

The `try-catch` statement appears in many programming languages, in more or less the same form so it shouldn't be unfamiliar:

#### In Python you would do it like this:

```python
try:
  # code here to try
except TypeError:
  # what happpens when it gives error ( Here its TypeError ).
  # This is also called a "fallback" statement
```
This statement allows for an elegant method of handling errors in a way that won't crash your production builds instantly when an one eventually pops up.

#### In C++ you would do this:
```cpp
try {
  // Code that may throw an exception
  throw 505;
}
catch (int errorCode) {
  cout << "Error occurred: " << errorCode;
} of code to handle errors
```


In JavaScript, error handling is an important part of writing robust code, as the language is quite unpredictable. 
This tutorial will guide you through using `try-catch` to manage errors in your JavaScript code.

**1. Basic Try-Catch Structure** The `try` block lets you test a block of code for errors. The `catch` block lets you handle the error.

```javascript
try {

  // Code to try

}
catch (err) { // err needs to be here

  // Code to execute if error occurs
}
```

**2. The Finally Block** Optionally, you can use a `finally` block after `catch`. Code inside the `finally` block will run regardless of the result from the `try-catch`.

```javascript
try {
  // ... 
} 
catch (err) {
  //... 
} 
finally {
  console.log("Finally block executed.");
}
```

**3. Throwing Custom Errors** You can throw your own exceptions using the `throw` statement. This is useful when you want to create custom error responses.
We use the `new` statement to instantiate a new `Error` object wher you can write your own!

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
  }, 1000); // Waits 1 second (1000ms = 1s)
  });

promise
  .then((result) => console.log(result)) // Runs if the promise resolves
  .catch((error) => console.error(error)); // Runs if the promise is rejected
```

### Async/Await Mechanism

`async` and `await` are built on top of promises and make working with them more intuitive and easier to manage.

- **`async` function** : Declares a function as asynchronous and enables the use of `await` within it.

- **`await`** : Pauses the function execution until the Promise is resolved or rejected, and then returns the resolved value or throws the rejected error.

Think of it as stopping at a coffee shop on your way to work ( Suppose you can't live without it ):

  - You are waiting in line and thus don't progress on your way to work **(async)**

  - You need to wait until the barista makes your coffee **(await)**

  - If the coffee is satisfactory, you continue on with your day and drink it, if not you go back home since it ruined your entire mood. **(rejected or resolved)**

#### Async must always be present in a function that calls promises with await. These two statements have a **interdependence** relation.
A function can be `async` without an `await` in it, but if there's an `await` statement in a function, it MUST be `async`

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


## Manipulation&Events

### DOM Manipulation
 
The DOM (Document Object Model) is the browser's live version of your HTML. **DOM manipulation** means using JavaScript to select and change it directly, no page reload needed.
 
**1. Selecting elements** — `querySelector` is the easiest way; it works just like a CSS selector (`#id`, `.class`, `tag`) and grabs the first match. Its sibling `querySelectorAll` returns *every* match instead.
 
```html
<div id="box">Click the button to change me.</div>
```
 
```javascript
const box = document.querySelector("#box"); // "#" means "match by id"
console.log(box.innerText); // Output: Click the button to change me.
```
 
> 💡 You'll also see `getElementById` and `getElementsByClassName` in older code — they do the same job, but `querySelector` covers both cases with one consistent syntax.
 
**2. Changing styles** — reach into `.style` and set any CSS property, camelCased instead of dashed (`backgroundColor`, not `background-color`).
 
```javascript
box.style.backgroundColor = "lightblue";
box.style.padding = "10px";
```
 
**3. Changing content** — `innerText` for plain text, `innerHTML` for actual HTML tags.
 
```javascript
box.innerText = "New text!";
box.innerHTML = "<strong>Bold now!</strong>";
```
 
**4. Creating, adding, and removing elements**
 
```javascript
const newItem = document.createElement("div");
newItem.innerText = "I'm new here!";
document.body.appendChild(newItem); // adds it at the end
 
newItem.remove(); // takes it back out
```
 
**The pattern to remember:** select → change (or create) → attach.
 
### Events & onload
 
**Events** let your page react to the user — clicks, hovers, typing, and more. `addEventListener` says: "when this happens, run this function."
 
```html
<button id="clickButton">Click Me!</button>
```
 
```javascript
const button = document.getElementById("clickButton");
 
button.addEventListener("click", () => {
  alert("Button was clicked!");
});
```
 
You can also listen for a *pair* of events, like hovering in and out:
 
```javascript
const hoverDiv = document.querySelector("#hoverDiv");
 
hoverDiv.addEventListener("mouseover", () => (hoverDiv.style.color = "red"));
hoverDiv.addEventListener("mouseout", () => (hoverDiv.style.color = "black"));
```
 
Common events: `click`, `mouseover`, `mouseout`, `keydown`, `submit`.
 
**The `onload` problem it solves:** if your script runs before the page finishes loading, it won't find its elements yet. `window.onload` waits until everything — HTML, CSS, and images — is ready:
 
```javascript
window.onload = function () {
  console.log("Page fully loaded!");
};
```
 
**In short:** DOM manipulation changes the page, events make it respond to the user.

>🔧 Exercises
>
>Use this HTML page as your starting point (link a `script.js` file at the bottom, just like earlier in this chapter):
>1. Select the `#box` div using `querySelector` and change its background color to `"orange"`.
>2. Create a new `<p>` element containing the text `"Hello from JavaScript!"` and append it to the end of `document.body`.
>3. Add a `click` event listener to a button that changes its own text to `"Clicked!"` when pressed.
>4. Add both `mouseover` and `mouseout` listeners to a div so its border color changes on hover and reverts when the mouse leaves.
>5. Wrap your DOM code in `window.onload` and explain, in your own words, why it's needed.
 
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>DOM Exercises</title>
  </head>
  <body>
    <div id="box">Click the button to change me.</div>
    <div id="hoverDiv" style="border: 2px solid black; padding: 10px;">
      Hover over me!
    </div>
    <button>Click Me!</button>
 
    <script src="script.js"></script>
  </body>
</html>
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
