"use client";

import { useState, useTransition } from "react";
import { deleteCat, renameCat } from "@/lib/actions";
import type { Cat } from "@/model/cat";
import styles from "./CatCard.module.css";

interface CatAdminActionsProps {
  cat: Cat;
}

export const CatAdminActions = ({ cat }: CatAdminActionsProps) => {
  const [renaming, setRenaming] = useState(false);
  const [draft, setDraft] = useState(cat.name);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const handleRename = () => {
    startTransition(async () => {
      const result = await renameCat(cat.id, draft);
      setError(result.error ?? null);
      if (!result.error) setRenaming(false);
    });
  };

  const handleDelete = () => {
    if (!window.confirm(`Remove ${cat.name}?`)) return;
    startTransition(async () => {
      const result = await deleteCat(cat.id);
      setError(result.error ?? null);
    });
  };

  return (
    <div className={styles.admin}>
      {renaming ? (
        <>
          <input
            aria-label={`New name for ${cat.name}`}
            value={draft}
            maxLength={30}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && handleRename()}
            autoFocus
          />
          <button onClick={handleRename} disabled={pending}>
            Save
          </button>
          <button onClick={() => setRenaming(false)} disabled={pending}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <button onClick={() => setRenaming(true)} disabled={pending}>
            ✏️ Rename
          </button>
          <button className={styles.danger} onClick={handleDelete} disabled={pending}>
            🗑️ Remove
          </button>
        </>
      )}
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
