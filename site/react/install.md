# Instalation & Create React Projects

## Install npm

npm (Node Package Manager) is distributed with Node.js. To install npm, you first need to install Node.js.
 
1. **Download Node.js** : Visit the [Node.js website](https://nodejs.org/)  and download the installer for your operating system.
 
2. **Install Node.js and npm** : Run the downloaded Node.js installer, which includes npm. Follow the prompts in the Node.js Setup Wizard.
 
3. **Verify Installation** : Open your command line or terminal and type the following commands to check if Node.js and npm were installed successfully:

```bash
node -v
npm -v
```
This will show the versions of Node.js and npm installed, confirming that the installation was successful.

## First Project 

#### How to Create Your First React Project 
To create a new React project, you can use the `create-react-app` command-line utility which simplifies the setup of a new React application. 
1. **Create a New React App** :
Open your terminal and run the following command:d

```bash
npx create-react-app project-name
```
Replace `project-name` with the desired directory name for your new application. This command creates a new folder named `project-name` with all the initial setup and dependencies.
 
2. **Navigate into Your Project** :

```bash
cd project-name
```
 
3. **Start the Development Server** :

```bash
npm start
```
This command runs the app in development mode. Open [http://localhost:3000]()  to view it in the browser. The page will reload if you make edits.

### Add TypeScript 

#### Adding TypeScript to Your Project 
To start a new React project with TypeScript, you can use a specific template with `create-react-app`. 
1. **Create a New Project with TypeScript** :
If starting from scratch, use:

```bash
npx create-react-app project-name --template typescript
```

This initializes a new project with TypeScript support.
 
2. **Add TypeScript to your project** :
If you've already created a project and want to add TypeScript, first navigate to your project directory, then run:

```bash
npm install typescript @types/react @types/react-dom
```

