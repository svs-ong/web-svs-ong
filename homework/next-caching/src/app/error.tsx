"use client";

import styles from "@/components/CatBoard.module.css";

interface ErrorPageProps {
  retry: () => void;
}

const ErrorPage = ({ retry }: ErrorPageProps) => (
  <section className={styles.message}>
    <h1>😿 The cats are hiding</h1>
    <p>
      The app could not load the cats. Is the API running? Open a terminal in <code>homework/server</code>, run{" "}
      <code>npm start</code>, then try again.
    </p>
    <button onClick={() => retry()}>Try again</button>
  </section>
);

export default ErrorPage;
