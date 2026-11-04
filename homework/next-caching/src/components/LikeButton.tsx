"use client";

import { useState, useTransition } from "react";
import { likeCat } from "@/lib/actions";
import type { Cat } from "@/model/cat";
import styles from "./CatCard.module.css";

interface LikeButtonProps {
  cat: Cat;
}

export const LikeButton = ({ cat }: LikeButtonProps) => {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleLike = () => {
    startTransition(async () => {
      const result = await likeCat(cat);
      setError(result.error ?? null);
    });
  };

  return (
    <div className={styles.likeArea}>
      <button className={styles.like} onClick={handleLike} disabled={pending} aria-label={`Like ${cat.name}`}>
        {pending ? "⏳" : "❤️"} {cat.likes}
      </button>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
