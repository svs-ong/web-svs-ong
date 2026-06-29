# Matering React Hooks

To stay at the top of your game as a programmer, you have to stay curious! 💡 Keeping up with new technologies and methodologies is key, but the real secret sauce is exposing yourself to different opinions on how and why we build things. The best way to level up? Reading and experimenting with the wisdom of the greats. 📚🚀

🌟 Featured Expert: TkDodo

For this tutorial, we’re diving into the "useState pitfalls" shared by Dominik (better known as TkDodo). Dominik is a powerhouse in the dev world, maintaining heavy-hitters like TanStack Query and TanStack Router. If there's anyone who knows how to handle state like a pro, it's him! 🏆

> **Read the full philosophy here:**
> [TkDodo's useState pitfalls](https://tkdodo.eu/blog/dont-over-use-state)

The best way to follow the instructions is to create an react app and to run examples on your own machine. You will need a function that simulates reading data from some server. You can use somthing like :

### Setting Up Your Environment

The best way to absorb this material is to create a React application and run these examples on your own machine. You can quickly spin up a new React app using Vite:

```
npm create vite@latest react-hooks-tutorial -- --template react
cd react-hooks-tutorial
npm install
npm run dev
```

### Simulating a Server Request

To properly explore `useState` and its common pitfalls, we will need to simulate fetching data from an external API or server. Instead of setting up a real backend, you can use the following utility function anywhere in your app to simulate a network request with a slight delay:

```js
// api.js or at the top of your component file
export const fetchUsers = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Alice", role: "admin" },
        { id: 2, name: "Bob", role: "user" },
        { id: 3, name: "Charlie", role: "user" }
      ]);
    }, 1500); // Simulates a 1.5-second network delay
  });
};
```
