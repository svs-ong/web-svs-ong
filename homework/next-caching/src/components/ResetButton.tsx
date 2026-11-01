"use client";

import { useTransition } from "react";
import { resetCats } from "@/lib/actions";

export const ResetButton = () => {
  const [pending, startTransition] = useTransition();

  const handleReset = () => {
    startTransition(async () => {
      await resetCats();
    });
  };

  return (
    <button onClick={handleReset} disabled={pending} title="Put the original cats back">
      {pending ? "Resetting…" : "↺ Reset"}
    </button>
  );
};
