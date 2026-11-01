"use client";

import { useState, useTransition } from "react";
import { setVisitorName } from "@/lib/actions";
import styles from "./Header.module.css";

interface VisitorFormProps {
  name: string;
}

export const VisitorForm = ({ name }: VisitorFormProps) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name);
  const [pending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      const result = await setVisitorName(draft);
      if (!result.error) setEditing(false);
    });
  };

  if (!editing) {
    return (
      <button className={styles.visitor} onClick={() => setEditing(true)} title="Change your name">
        🙋 {name || "Guest"}
      </button>
    );
  }

  return (
    <span className={styles.visitorForm}>
      <input
        aria-label="Your name"
        placeholder="Your name"
        value={draft}
        maxLength={20}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => event.key === "Enter" && handleSave()}
        autoFocus
      />
      <button onClick={handleSave} disabled={pending}>
        Save
      </button>
    </span>
  );
};
