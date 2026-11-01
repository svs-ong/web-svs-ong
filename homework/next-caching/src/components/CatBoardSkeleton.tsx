import styles from "./CatBoard.module.css";

interface CatBoardSkeletonProps {
  title: string;
}

// Shown by loading.tsx while the server waits for the cats API
export const CatBoardSkeleton = ({ title }: CatBoardSkeletonProps) => (
  <section className={styles.board} aria-busy="true">
    <div className={styles.toolbar}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.loadingNote}>🐾 Fetching cats from the slow API…</p>
    </div>
    <ol className={styles.grid}>
      {[1, 2, 3, 4, 5, 6].map((key) => (
        <li key={key} className={styles.skeletonCard} />
      ))}
    </ol>
  </section>
);
