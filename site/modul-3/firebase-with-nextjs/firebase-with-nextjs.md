# **Firebase & Next.js Starter**

Welcome to the **Firebase & Next.js Starter** course!

Firebase is a powerful Backend-as-a-Service (BaaS) platform provided by Google. It offers a complete set of tools and services that make web and app development faster and more scalable — including:

- **Deployment and hosting**
- **User authentication**
- **Data and big data (like images) storage**
- **AI integration and security features**

In this course, you’ll learn how to integrate **Firebase** with **Next.js**, one of the most popular React-based frameworks for building modern web applications.

We’ll be following an existing official Google tutorial to ensure you get hands-on experience with real-world tools and best practices.

---

## ⚠️ **Important Note (Bug Fix)**

In **Chapter 8: “Save user-submitted reviews from the web app”**, there’s a small issue in the original tutorial code.

In the file:

```bash
src/app/actions.js
```

The tutorial shows this line:

```js
const { app } = await getAuthenticatedAppForUser();
```

However, this is **incorrect**.  
Please replace it with the **correct destructuring**:

```js
const { firebaseServerApp } = await getAuthenticatedAppForUser();
```

This will ensure your authentication and server-side Firebase setup works properly.

---

## 📘 **Official Google Tutorial**

Follow the full step-by-step course here:  
👉 [**Integrate Firebase with a Next.js App** (Google Codelab)](https://firebase.google.com/codelabs/firebase-nextjs#0)

---

## **Bonus: Running the App Locally**

By default, if you follow the Google Codelab, the Next.js + Firebase app only works when deployed. To make it work **locally**, you need to provide Firebase configuration variables. This is done using an **`.env` file**.

> ⚠️ Make sure this file is **added to `.gitignore`**. We do **not** want to expose sensitive Firebase credentials in version control.

---

### **Steps to Run Locally**

### 1️⃣ Add `.env` to `.gitignore`

Ensure your `.gitignore` contains the line:

```bash
.env
```

This prevents your Firebase credentials from being pushed to your repository.

---

### 2️⃣ Create an `.env` file

Create a `.env` file at the root of your project and add your Firebase configuration variables. Each variable **must begin with `NEXT_PUBLIC_`** to make it accessible in both client and server code.

You can get these variables from your Firebase console: **Project Settings → Your Apps**.

```env
NEXT_PUBLIC_APP_ENV="local"
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyDQHgSf-tm7oUHoYbKDBNf-dLbB9cqI7LM"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="next-deployment-test.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="next-deployment-test"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="next-deployment-test.firebasestorage.app"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="28407699093"
NEXT_PUBLIC_FIREBASE_APP_ID="1:28407699093:web:458c4575ac11936425ed9c"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="G-80V9PW5R31"
```

> 💡 Tip: Keep your `.env` secure and never commit it to GitHub.

---

### 3️⃣ Initialize Firebase Locally

You need to pass the Firebase configuration to the `initializeApp` function **only when running locally**. This is why we use the `NEXT_PUBLIC_APP_ENV` variable.

Create a file (e.g., `firebaseClient.js`) that can be used on both **client and server**:

```js
import { initializeApp as firebaseInitializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const initializeApp = () => {
  if (process.env.NEXT_PUBLIC_APP_ENV === "local") {
    return firebaseInitializeApp(firebaseConfig);
  }
  return firebaseInitializeApp();
};
```

This ensures your app uses the **local Firebase credentials** during development but defaults to the deployed configuration when running on Firebase Hosting.

---

### 4️⃣ Use the Custom `initializeApp`

Finally, update your **clientApp** and **serverApp** files to use this new `initializeApp` function instead of directly importing from Firebase.

This completes the setup for running your Next.js + Firebase app **locally**.
