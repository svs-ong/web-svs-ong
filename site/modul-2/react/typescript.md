# TypeScript Tutorial

TypeScript is a superset of JavaScript that adds static types to the language — it catches a whole category of bugs before your code ever runs. This tutorial covers TypeScript's type system: basic types, interfaces, enums, and generics.

### Playground

To experiment with the examples provided in this tutorial, use the following TypeScript playground:
[Click Here](https://www.typescriptlang.org/play/?#code/PTAEHUFMBsGMHsC2lQBd5oBYoCoE8AHSAZVgCcBLA1UABWgEM8BzM+AVwDsATAGiwoBnUENANQAd0gAjQRVSQAUCEmYKsTKGYUAbpGF4OY0BoadYKdJMoL+gzAzIoz3UNEiPOofEVKVqAHSKymAAmkYI7NCuqGqcANag8ABmIjQUXrFOKBJMggBcISGgoAC0oACCbvCwDKgU8JkY7p7ehCTkVDQS2E6gnPCxGcwmZqDSTgzxxWWVoASMFmgYkAAeRJTInN3ymj4d-jSCeNsMq-wuoPaOltigAKoASgAywhK7SbGQZIIz5VWCFzSeCrZagNYbChbHaxUDcCjJZLfSDbExIAgUdxkUBIursJzCFJtXydajBBCcQQ0MwAUVWDEQC0gADVHBQGNJ3KAALygABEAAkYNAMOB4GRonzFBTBPB3AERcwABS0+mM9ysygc9wASmCKhwzQ8ZC8iHFzmB7BoXzcZmY7AYzEg-Fg0HUiQ58D0Ii8fLpDKZgj5SWxfPADlQAHJhAA5SASPlBFQAeS+ZHegmdWkgR1QjgUrmkeFATjNOmGWH0KAQiGhwkuNok4uiIgMHGxCyYrA4PCCJSAA)

## Basic Types

TypeScript's type system starts with the same primitives JavaScript already has, plus a few of its own.

### `string`, `number`, `boolean`

```ts
let name: string = "Alice";
let age: number = 30;
let isStudent: boolean = true;
```

### `array` and `tuple`

An array holds any number of values of one type. A tuple is a fixed-length array where each position has its own, specific type.

```ts
let scores: number[] = [10, 20, 30];
let names: string[] = ["Maria", "Bogdan", "Alexa"];
let pair: [string, number] = ["Alice", 30];
```

> ❓ What happens if you write `pair = [30, "Alice"]` instead? Why does TypeScript complain here but a plain `number[]` never would?

### `object`

```ts
let config: object = { debug: true };
```

> 💡 `object` only tells TypeScript "this isn't a primitive" — it says nothing about _which_ properties exist. For that, reach for an `interface` instead (coming up next).

### Union types

A union lets a value be one of several types, joined with `|`.

```ts
let id: string | number = "abc123";
id = 42; // also valid
```

### Literal types

A literal type narrows a type down to one exact value — usually combined with a union to model a fixed set of allowed options.

```ts
let direction: "up" | "down" | "left" | "right" = "up";
```

> 💡 Prefer an `enum` (see below) over this pattern once the options represent a closed, named set of related values, like `Difficulty` in the next section. An enum gives every option one canonical name (`Difficulty.Easy`) that autocompletes and renames safely everywhere it's used — a string literal has to be retyped identically in every file, with no compiler help if you rename it later.

### `void` and `never`

- `void` marks a function that returns nothing.
- `never` marks a function that never returns at all — it always throws, or loops forever.

```ts
const logMessage = (message: string): void => {
  console.log(message);
};

const fail = (message: string): never => {
  throw new Error(message);
};
```

### `unknown` (and why not `any`)

`any` turns off type checking for that value completely — TypeScript just trusts you, and stops helping.

```ts
let anything: any = "could be anything";
anything.thisMethodDoesNotExist(); // no error at compile time — it only blows up at runtime
```

> 💡 Avoid `any` in your own code. It isn't really a type — it's an escape hatch that disables the compiler for that value, which defeats the entire reason to use TypeScript. Every `any` is a spot where a typo, a wrong property name, or a bad assumption won't be caught until the code actually runs.

`unknown` is the safe alternative: it also accepts a value of any type, but it forces you to check what the value actually is before TypeScript lets you use it.

```ts
let userInput: unknown = "42";
if (typeof userInput === "string") {
  console.log(userInput.toUpperCase()); // safe — narrowed to string first
}
```

> ❓ Why doesn't `anything.thisMethodDoesNotExist()` get flagged, while `userInput.toUpperCase()` would be flagged without that `typeof` check first?

> 🔧 Declare a variable `temperature` typed as `unknown`, assign it a `number`, then write an `if` check that narrows it before doing `temperature + 10`.

## Interface

Interfaces describe the **shape** of an object. From here on, every complex type in this tutorial uses `interface`, not `type` — interfaces can be extended and reopened as your data grows, which is exactly what the next section relies on.

```ts
interface Person {
  name: string;
  age: number;
}

const user: Person = {
  name: "John Doe",
  age: 30,
};
```

### Extending an Interface

`extends` lets one interface inherit every field from another and add its own on top — ideal for a family of related shapes that all share a common base.

```ts
interface Challenge {
  id: number;
  title: string;
  points: number;
}

interface SingleChoiceChallenge extends Challenge {
  options: string[];
  correctOptionIndex: number;
}

interface CodingChallenge extends Challenge {
  starterCode: string;
  testCases: string[];
}

const quiz: SingleChoiceChallenge = {
  id: 1,
  title: "What does `typeof null` return?",
  points: 10,
  options: ["null", "object", "undefined"],
  correctOptionIndex: 1,
};

const coding: CodingChallenge = {
  id: 2,
  title: "Reverse a string",
  points: 20,
  starterCode: "function reverse(str: string): string {}",
  testCases: ["reverse('abc') === 'cba'"],
};

const printChallenge = (challenge: Challenge): void => {
  console.log(`${challenge.title} — ${challenge.points} points`);
};

printChallenge(quiz); // works — a SingleChoiceChallenge is still a Challenge
printChallenge(coding); // works too — so is a CodingChallenge
```

`printChallenge` only asks for a `Challenge`. It doesn't care that `quiz` and `coding` each carry extra fields of their own, because both `SingleChoiceChallenge` and `CodingChallenge` `extends Challenge`.

> 💡 This is the same idea as a class hierarchy, just without any classes: `SingleChoiceChallenge` and `CodingChallenge` both _are_ a `Challenge`, so anywhere a `Challenge` is expected, either one is accepted.

> 🔧 Add a third interface, `TimedChallenge`, that extends `Challenge` and adds a `timeLimitSeconds: number` field. Create one example object and pass it to `printChallenge`.

## Enums

An enum names a fixed set of related values, so you're not scattering the same magic strings or numbers across your code.

```ts
enum Difficulty {
  Easy,
  Medium,
  Hard,
}

console.log(Difficulty.Easy); // Output: 0
console.log(Difficulty.Hard); // Output: 2
```

By default, an enum's values are numbers starting at 0. Give them string values instead when the number itself is meaningless and you'd rather read the value directly — in a network request or a log line, for example:

```ts
enum Difficulty {
  Easy = "EASY",
  Medium = "MEDIUM",
  Hard = "HARD",
}

console.log(Difficulty.Easy); // Output: EASY
```

Enums plug straight into the `Challenge` interface from before:

```ts
interface Challenge {
  id: number;
  title: string;
  points: number;
  difficulty: Difficulty;
}

const quiz: Challenge = {
  id: 1,
  title: "What does `typeof null` return?",
  points: 10,
  difficulty: Difficulty.Easy,
};
```

> ❓ Why is `difficulty: Difficulty.Easy` safer here than just writing `difficulty: "EASY"` as a plain string?

## Generics

Generics let a function, array, or interface work with any type, without giving up type safety or writing the same code once per type.

### Generic Functions

<!-- prettier-ignore -->
```ts
const identity = <T,>(arg: T): T => {
  return arg;
};

const output = identity<string>("myString");
const numericOutput = identity<number>(100);

console.log(output); // Output: myString
console.log(numericOutput); // Output: 100
```

### Generics with Arrays

<!-- prettier-ignore -->
```ts
const logArrayElements = <T,>(elements: T[]): void => {
  for (const element of elements) {
    console.log(element);
  }
};

logArrayElements<string>(["Hello", "World"]);
logArrayElements<number>([1, 2, 3, 4, 5]);
```

`logArrayElements` takes an array of any type `T` and logs each element — the same function works for an array of strings or an array of numbers, with no `any` in sight.

### Generics with Interfaces

Generics apply to interfaces too, for data structures that hold a value of a type decided later — like a linked list node.

```ts
interface ListNode<T> {
  value: T;
  next: ListNode<T> | null;
}

const createListNode = <T>(value: T): ListNode<T> => {
  return { value, next: null };
};

const displayList = <T>(node: ListNode<T> | null): void => {
  while (node !== null) {
    console.log(node.value);
    node = node.next;
  }
};

const node1 = createListNode(10);
const node2 = createListNode(5);
const node3 = createListNode(20);

node1.next = node2;
node2.next = node3;

console.log("List values:");
displayList(node1);
```

> 🔧 Change `createListNode` / `displayList` / the 3 nodes so the list holds `SingleChoiceChallenge` objects instead of numbers — the generic functions themselves don't need a single line changed.

## Good Practices

A few habits worth building early, all of which this tutorial already follows:

- **Avoid `any`.** It switches off type-checking instead of describing a type. If you truly don't know the shape of a value yet (an API response, user input), type it as `unknown` and narrow it with a check before you use it.
- **Use `interface` for anything shaped like an object**, not `type` — you get `extends` for free, and interfaces stay open to being extended later, which object `type` aliases don't support as cleanly.
- **Reach for `enum` once a value has a closed, named set of options**, instead of a string literal union — `Difficulty.Easy` is one canonical, autocomplete-friendly name; `"EASY"` typed out in five different files is five chances to introduce a typo.
- **Keep functions as `const name = (...) => { ... }`.** One consistent shape for every function in the codebase, instead of mixing `function` declarations and arrow functions.
- **Let TypeScript infer what it already can.** `const age = 30;` doesn't need `: number` — only annotate when the type isn't obvious from the value, like function parameters or an empty array.

## Conclusion

TypeScript's type system — basic types, interfaces, enums, and generics — catches a whole category of bugs before your code ever runs, without changing how you write JavaScript day to day.
