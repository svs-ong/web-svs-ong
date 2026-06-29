# TypeScript Tutorial

TypeScript is a superset of JavaScript that adds static types to the language. It helps catch errors early through its type system and provides a better development experience with strong typing and object-oriented features. This tutorial covers the basics of TypeScript, including types, the `type` keyword, interfaces, and generics.

## Playground

To experiment with the examples provided in this tutorial, use the following TypeScript playground:
[Click Here](https://www.typescriptlang.org/play/?#code/PTAEHUFMBsGMHsC2lQBd5oBYoCoE8AHSAZVgCcBLA1UABWgEM8BzM+AVwDsATAGiwoBnUENANQAd0gAjQRVSQAUCEmYKsTKGYUAbpGF4OY0BoadYKdJMoL+gzAzIoz3UNEiPOofEVKVqAHSKymAAmkYI7NCuqGqcANag8ABmIjQUXrFOKBJMggBcISGgoAC0oACCbvCwDKgU8JkY7p7ehCTkVDQS2E6gnPCxGcwmZqDSTgzxxWWVoASMFmgYkAAeRJTInN3ymj4d-jSCeNsMq-wuoPaOltigAKoASgAywhK7SbGQZIIz5VWCFzSeCrZagNYbChbHaxUDcCjJZLfSDbExIAgUdxkUBIursJzCFJtXydajBBCcQQ0MwAUVWDEQC0gADVHBQGNJ3KAALygABEAAkYNAMOB4GRonzFBTBPB3AERcwABS0+mM9ysygc9wASmCKhwzQ8ZC8iHFzmB7BoXzcZmY7AYzEg-Fg0HUiQ58D0Ii8fLpDKZgj5SWxfPADlQAHJhAA5SASPlBFQAeS+ZHegmdWkgR1QjgUrmkeFATjNOmGWH0KAQiGhwkuNok4uiIgMHGxCyYrA4PCCJSAA)

## What is TypeScript?

TypeScript is developed and maintained by Microsoft. It offers all of JavaScript's features with the additional layer of type safety. TypeScript code is transpiled into JavaScript, which can then be executed in the browser or Node.js environment.

## Basic Types

TypeScript defines several basic types which include `number`, `string`, `boolean`, `null`, `undefined`, `symbol`, `bigint`, and `any`. Here are some examples demonstrating basic operations with these types:

### Example: Operations on Basic Types

```js
let a: number = 5;
let b: number = 3;
console.log(a + b); // Output: 8

let firstName: string = "Alice";
let lastName: string = "Smith";
console.log(firstName + " " + lastName); // Output: Alice Smith
```

### Mixing Types: Number and String

When you mix `string` and `number` types in TypeScript, the number is typically coerced into a string.

```js
let num: number = 10;
let text: string = "The number is ";
console.log(text + num); // Output: The number is 10
```

The `type` KeywordThe `type` keyword in TypeScript is used to create aliases for type annotations, making it easier to refer to complex types.

### Example: Composed Types

```js
type User = {
  name: string,
  age: number,
};

const user: User = {
  name: "John Doe",
  age: 30,
};

console.log(user); // Output: { name: 'John Doe', age: 30 }
```

How `extends` Works with `type`The `extends` keyword is used with interfaces in TypeScript, but for types, you can use intersections to achieve similar functionality.

```js
type Person = {
  name: string,
};

type Employee = Person & {
  companyId: number,
};

const employee: Employee = {
  name: "Jane Doe",
  companyId: 12345,
};

console.log(employee); // Output: { name: 'Jane Doe', companyId: 12345 }
```

## Interface

Interfaces in TypeScript are used to define contracts within your code and for external code integration.

### Differences Between Interfaces & Type

- **Interfaces** are open-ended and can be extended or implemented by other interfaces and classes.

- **Types** can be used for a wider range of types such as primitives, unions, and tuples, and cannot be re-opened to add new properties.

### Extending an Interface

```js
interface Person {
  name: string;
}

interface Employee extends Person {
  companyId: number;
}

const employee: Employee = {
  name: "John Doe",
  companyId: 67890,
};

console.log(employee); // Output: { name: 'John Doe', companyId: 67890 }
```

## Generics

Generics provide a way to make components work with any data type and not restrict them to one data type. Thus, they add flexibility to our components.

### Link Between Types and Generic Functions

Generics can be used with both `type` and `interface` to define flexible and reusable components.

<!-- prettier-ignore -->
```js
const identity = <T,>(arg: T): T => {
  return arg;
};

const output = identity<string>("myString");
const numericOutput = identity<number>(100);

console.log(output); // Output: myString
console.log(numericOutput); // Output: 100
```

### Generics with Arrays

Arrays in TypeScript can also use generics, allowing them to hold values of any specified type. Here's how you can work with generic arrays:

<!-- prettier-ignore -->
```js
const logArrayElements = <T,>(elements: T[]): void => {
  for (const element of elements) {
    console.log(element);
  }
};

logArrayElements<string>(["Hello", "World"]);
logArrayElements<number>([1, 2, 3, 4, 5]);
```

This function `logArrayElements` takes an array of any type `T` and logs each element to the console. The generic `<T>` allows the function to accept arrays of any type, maintaining consistency across the array's data type.

### Generics with Interfaces

Generics can also be applied to interfaces to define properties that can hold any type. This is particularly useful when designing data structures like linked lists, stacks, or queues. Here’s an example of a generic interface for a linked list node:

<!-- prettier-ignore -->
```js
interface ListNode<T> {
  value: T;
  next: ListNode<T> | null;
}

const createTreeNode = <T,>(value: T): TreeNode<T> => {
  return { value, next: null };
};

const displayTree = <T>(node: TreeNode<T> | null): void => {
  while (node !== null) {
    console.log(node.value);
    node = node.next;
  }
};

const node1 = createTreeNode(10); // Root node
const node2 = createTreeNode(5);  // Left child
const node3 = createTreeNode(20); // Right child

node1.next = node2; 
node2.next = node3;

console.log("Tree Node Values:");
displayTree(node1); 
```

In this code, `ListNode` is a generic interface that uses the type variable `T` to define the type of `value` and `next`. This setup allows you to create nodes for a linked list that can store any type of data.

### Generics with Classes

Generics are not limited to functions and interfaces; they can also be used in classes. Here is how you can define a generic class in TypeScript:

```js
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
}

const numberStack = new Stack<number>();
numberStack.push(10);
console.log(numberStack.peek()); // Output: 10
console.log(numberStack.pop());  // Output: 10
console.log(numberStack.pop());  // Output: undefined
```

This `Stack` class uses a generic type `T` to work with any data type. You can push items to the stack, pop them off, and peek at the top item, all while maintaining type safety.

## Conclusion

TypeScript enhances JavaScript by adding types and several other useful features that help in developing large-scale applications by providing tools to write more robust and error-free code. This tutorial covered the fundamentals to get you started with TypeScript's powerful features.
