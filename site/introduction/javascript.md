# Vanilla JavaScript Tutorial 

## Primitives Types in JavaScript 

JavaScript defines six primitive data types:
 
1. **String** : Represents textual data.

```javascript
let name = 'John Doe';
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
let uniqueId = Symbol('id');
```

These primitive types form the foundation of data manipulation in JavaScript, each serving specific roles in programming tasks.



`let` and `const` (Differences) 
- **`let`** : Used to declare variables that can be reassigned.

```javascript
let city = 'New York';
city = 'Los Angeles';  // Allowed
```
 
- **`const`** : Used to declare constants that cannot be reassigned.

```javascript
const country = 'USA';
country = 'Canada';  // Error: Assignment to constant variable
```

## Conditions & Loops 

### Conditions 

Conditional statements execute code based on conditions.


```javascript
let age = 20;

if (age >= 18) {
  console.log('Adult');
} else {
  console.log('Minor');
}
```

### Loops 

Loops are used to execute a block of code repeatedly.
`for` Loop

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);  // Output: 0 1 2 3 4
}
```
`while` Loop

```javascript
let i = 0;
while (i < 5) {
  console.log(i);  // Output: 0 1 2 3 4
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

console.log(greet('Alice'));  // Output: Hello, Alice!
```

### Function Expression 


```javascript
const greet = function(name) {
  return `Hello, ${name}!`;
};

console.log(greet('Bob'));  // Output: Hello, Bob!
```

## Classes and Objects (Complex Types) 

### Classes 

Classes are templates for creating objects.


```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
  }
}

const john = new Person('John', 30);
console.log(john.greet());  // Output: Hello, my name is John and I am 30 years old.
```

### Objects 

Objects are collections of properties and methods.


```javascript
const person = {
  name: 'Alice',
  age: 25,
  greet() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
  }
};

console.log(person.greet());  // Output: Hello, my name is Alice and I am 25 years old.
```

## Try Catch 
`try...catch` statement is an effective tool in JavaScript for managing errors within a program. It allows developers to catch exceptions—errors that may occur during execution—and handle them without halting the entire application. This error handling approach is essential for maintaining the stability and reliability of applications, especially when dealing with user input or external data sources. Below are two examples illustrating practical uses of `try...catch`:
### Example 1: Safe Number Conversion 
This example demonstrates using `try...catch` to safely convert user input to a number, which is a common requirement in many applications.

```javascript
try {
  let userInput = "1024x"; // Incorrect format due to the 'x'
  let number = parseInt(userInput);
  if (isNaN(number)) {
    throw new Error("Conversion failed: Input is not a valid number.");
  }
  console.log('Converted number:', number);
} catch (error) {
  console.error('Error:', error.message);
}
```

### Example 2: Propagating Errors in Function Calls 

In this scenario, errors are not only caught but also rethrown to higher-level functions, which allows for centralized and more flexible error management.


```javascript
function parseInput(input) {
  try {
    let number = parseInt(input);
    if (isNaN(number)) {
      throw new Error("Invalid number format.");
    }
    return number;
  } catch (error) {
    console.error("Error in parseInput:", error.message);
    throw error; // Rethrow to be handled by the caller
  }
}

function main() {
  try {
    let userInput = "123abc";
    let result = parseInput(userInput);
    console.log('Result:', result);
  } catch (error) {
    console.error("Error in main:", error.message);
  }
}

main();
```
These examples show how `try...catch` can be used to handle and propagate errors, ensuring that your program remains robust and user-friendly.


## DOM Manipulation 

DOM (Document Object Model) manipulation is used to interact with HTML elements.

### Selecting Elements 


```javascript
let element = document.getElementById('myElement');
let elements = document.getElementsByClassName('myClass');
let queryElement = document.querySelector('.myClass');
```

### Changing Content 


```javascript
let element = document.getElementById('myElement');
element.innerHTML = 'New Content';
```

### Event Listeners 


```javascript
let button = document.getElementById('myButton');
button.addEventListener('click', function() {
  alert('Button clicked!');
});
```
`onLoad`The `onLoad` event occurs when the document or an element has finished loading.
### HTML 


```html
<body onload="init()">
  <script>
    function init() {
      console.log('Page loaded');
    }
  </script>
</body>
```

## Promise 

Promises represent the eventual completion (or failure) of an asynchronous operation and its resulting value.

### Creating a Promise 


```javascript
let promise = new Promise((resolve, reject) => {
  let success = true;  // Change to false to test reject path
  if (success) {
    resolve('Operation successful');
  } else {
    reject('Operation failed');
  }
});

promise
  .then(result => console.log(result))  // Output: Operation successful
  .catch(error => console.error(error));
```

## Fetch 
The `fetch` API is used to make network requests.
### Example 


```javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching data:', error));
```
`this` KeywordThe `this` keyword refers to the object it belongs to.
### Example in a Function 


```javascript
const person = {
  name: 'John',
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
};

person.greet();  // Output: Hello, my name is John
```

## Async Function Example 

### Function Definition 


```javascript
/**
 *
 * @param {*} filePath - the relative path of the file containing the element
 * @param {*} elementId - the id of the top most element in the file
 * @returns
 */
export async function getElementFromFile(filePath, elementId) {
  try {
    // Use Fetch API to get the element content
    // elementAsString is a string containing the HTML content of the element
    const elementAsString = await (await fetch(filePath)).text();

    // Parse the elementAsString into a Document Object Model (DOM)
    const parser = new DOMParser();
    const parsedElement = parser.parseFromString(elementAsString, "text/html");

    return parsedElement.getElementById(elementId);
  } catch (error) {
    console.error(`Failed to load element from file: ${filePath}`, error);
    return null;
  }
}
```

### Explanation 
 
- **Fetch API** : Retrieves the file content.
 
- **DOMParser** : Parses the HTML string into a DOM.
 
- **Error Handling** : Logs errors if the fetch operation fails.