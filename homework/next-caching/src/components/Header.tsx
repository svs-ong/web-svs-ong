import { Suspense } from "react";
import { NavLinks } from "@/components/NavLinks";
import { ResetButton } from "@/components/ResetButton";
import { Visitor } from "@/components/Visitor";
import styles from "./Header.module.css";

export const Header = () => (
  <header className={styles.header}>
    <div className={styles.inner}>
      <span className={styles.brand}>🐾 Cat Café</span>
      <NavLinks />
      <div className={styles.tools}>
        <Suspense fallback={<span className={styles.visitorFallback}>…</span>}>
          <Visitor />
        </Suspense>
        <ResetButton />
      </div>
    </div>
  </header>
);
