# Instalation & Create React Projects

## Install npm

npm (Node Package Manager) is distributed with Node.js. To install npm, you first need to install Node.js.

1. **Download Node.js** : Visit the [Node.js website](https://nodejs.org/) and download the installer for your operating system.

2. **Install Node.js and npm** : Run the downloaded Node.js installer, which includes npm. Follow the prompts in the Node.js Setup Wizard.

3. **Verify Installation** : Open your command line or terminal and type the following commands to check if Node.js and npm were installed successfully:

```bash
node -v
npm -v
```

This will show the versions of Node.js and npm installed, confirming that the installation was successful.

## Create a project

#### How to Create Your First React Project

To create a new React project, you can use the `create-react-app` command-line utility which simplifies the setup of a new React application.

1. **Create a New React App** :
   Open your terminal and run the following command:

```bash
npm create vite@latest my-app -- --template react-ts
```

Replace `project-name` with the desired directory name for your new application. This command creates a new folder named `project-name` with all the initial setup and dependencies.

2. **Navigate into Your Project** :

```bash
cd project-name
```

3. **Install the dependencies** :

```bash
npm install
```

4. **Start the Development Server** :

```bash
npm run dev
```

This command runs the app in development mode. Open [http://localhost:3000]() to view it in the browser. The page will reload if you make edits.

### Recommended VS Code Plugins for React Development:

1. **ESLint**

- **Description** : This extension integrates ESLint, a tool for identifying and fixing problems in JavaScript and TypeScript code. It helps in maintaining consistent code style and identifying errors early in development.

2. **Prettier - Code formatter**

- **Description** : Prettier is an opinionated code formatter that ensures your code is clean and consistently styled. It works well with React and TypeScript.

3. **React** (for TypeScript & JavaScript in React)

- **Description** :This is a Visual Studio Code extension specially designed for React developers, offering a wealth of practical React code snippets suitable for JavaScript and TypeScript.
