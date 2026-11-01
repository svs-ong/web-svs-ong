import { AddCatForm } from "@/components/AddCatForm";
import { CacheInspector } from "@/components/CacheInspector";
import { CatCard } from "@/components/CatCard";
import { getCats } from "@/lib/cats";
import styles from "./CatBoard.module.css";

interface CatBoardProps {
  view: "gallery" | "leaderboard";
}

// One component, two routes: /cats (A–Z, full editing) and /leaderboard (most liked first)
export const CatBoard = async ({ view }: CatBoardProps) => {
  const { cats, fetchedAt } = await getCats();

  const sortedCats =
    view === "gallery"
      ? cats.toSorted((a, b) => a.name.localeCompare(b.name))
      : cats.toSorted((a, b) => b.likes - a.likes);

  return (
    <section className={styles.board}>
      <div className={styles.toolbar}>
        <h1 className={styles.title}>{view === "gallery" ? "Cat Gallery" : "Top Cats"}</h1>
        <CacheInspector fetchedAt={fetchedAt} />
      </div>
      {view === "gallery" && <AddCatForm />}
      {sortedCats.length === 0 && <p className={styles.empty}>No cats left. Use ↺ Reset to bring them back.</p>}
      <ol className={styles.grid}>
        {sortedCats.map((cat, index) => (
          <CatCard key={cat.id} cat={cat} rank={view === "leaderboard" ? index + 1 : undefined} editable={view === "gallery"} />
        ))}
      </ol>
    </section>
  );
};
