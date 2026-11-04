"use client";

import { useEffect, useState } from "react";
import styles from "./CacheInspector.module.css";

interface CacheInspectorProps {
  fetchedAt: string;
}

const formatTime = (date: Date) =>
  `${date.toTimeString().slice(0, 8)}.${String(date.getMilliseconds()).padStart(3, "0")}`;

// Shows when getCats() really talked to the API, and how old that data is now
export const CacheInspector = ({ fetchedAt }: CacheInspectorProps) => {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const interval = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, []);

  // The clock only runs in the browser, so the server and the browser render the same first HTML
  if (now === null) {
    return <p className={styles.inspector}>🕒 Data fetched …</p>;
  }

  const fetchedDate = new Date(fetchedAt);
  const ageSeconds = Math.max(0, Math.round((now - fetchedDate.getTime()) / 1000));

  return (
    <p className={styles.inspector} title={fetchedAt}>
      🕒 Data fetched at <strong>{formatTime(fetchedDate)}</strong>
      <span className={ageSeconds < 5 ? styles.fresh : styles.old}>{ageSeconds} s ago</span>
    </p>
  );
};
