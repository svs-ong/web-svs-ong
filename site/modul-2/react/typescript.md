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

> 💡 Give the union its own name once the options represent a closed, named set of related values, like `Difficulty` in the next section — `type Difficulty = "EASY" | "MEDIUM" | "HARD"` instead of repeating the union inline everywhere it's used. That alone gets every option one canonical, autocomplete-friendly, rename-safe name. Reach for an `as const` object (see below) only once the values themselves are also needed at runtime, not just the type.

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

A fixed set of related values — a difficulty, a status, a direction — deserves its own name, so the same magic strings or numbers aren't scattered across the codebase. Two ways to do that cover everything you'll need day to day.

### String union types

The simplest option: a union of string literals, given its own name.

```ts
type Difficulty = "EASY" | "MEDIUM" | "HARD";

let level: Difficulty = "EASY";
```

This disappears completely once compiled — there's no `Difficulty` at runtime, only ever at the type level. Reach for it whenever code only needs to *restrict* a value, not loop over the options or look one up by name.

### `as const` objects

When the actual values are needed at runtime too — to populate a dropdown, to check something a user typed against the valid options — reach for a plain object marked `as const`, and derive the type from it instead of writing the set out twice:

```ts
const Difficulty = {
  Easy: "EASY",
  Medium: "MEDIUM",
  Hard: "HARD",
} as const;

type Difficulty = (typeof Difficulty)[keyof typeof Difficulty];

console.log(Difficulty.Easy); // Output: EASY
console.log(Object.values(Difficulty)); // Output: ["EASY", "MEDIUM", "HARD"] — a real, usable array
```

`Difficulty.Easy` reads exactly like a named constant, with autocomplete and safe renames — but `Difficulty` is a real object now, so `Object.values`/`Object.keys` actually work on it, which the string union alone can never give you.

Either version plugs straight into the `Challenge` interface from before the same way:

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
  difficulty: Difficulty.Easy, // or "EASY" directly, with the plain union-type version
};
```

> ❓ Why is `difficulty: Difficulty` safer here than typing that same field as a plain `string` would be?

### What about the `enum` keyword?

TypeScript also has a dedicated `enum` keyword, and it's worth being able to recognize — other tutorials and older codebases use it a lot:

```ts
enum Difficulty {
  Easy = "EASY",
  Medium = "MEDIUM",
  Hard = "HARD",
}
```

It looks like the `as const` version above and behaves similarly at the call site (`Difficulty.Easy`), but with one real difference: `enum` is the one construct in this tutorial that doesn't fully disappear at compile time — it generates actual runtime code of its own, unlike every other type covered here. That's exactly what TypeScript 5.8's `--erasableSyntaxOnly` compiler flag was built to catch, flagging `enum` as an error for projects that want to run `.ts` files directly without a build step. Current guidance is to reach for a string union or an `as const` object instead, and save `enum` for the one thing it still does that they can't: a *numeric* enum with reverse mapping (`Difficulty[0] === "Easy"`).

> 💡 Default to a plain union type. Reach for `as const` specifically once the values themselves are needed at runtime, not just the type.

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
- **Name a closed set of options as its own union type** (`type Difficulty = "EASY" | "MEDIUM" | "HARD"`), not `enum` — `enum` is the one construct here that doesn't fully disappear at compile time, and current guidance (including TypeScript's own `--erasableSyntaxOnly` flag) steers new code away from it. Reach for an `as const` object instead of the plain union only once the values themselves are needed at runtime, not just the type.
- **Keep functions as `const name = (...) => { ... }`.** One consistent shape for every function in the codebase, instead of mixing `function` declarations and arrow functions.
- **Let TypeScript infer what it already can.** `const age = 30;` doesn't need `: number` — only annotate when the type isn't obvious from the value, like function parameters or an empty array.

## Conclusion

TypeScript's type system — basic types, interfaces, enums, and generics — catches a whole category of bugs before your code ever runs, without changing how you write JavaScript day to day.
