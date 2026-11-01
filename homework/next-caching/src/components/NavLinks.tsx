"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

const links = [
  { href: "/cats", label: "Gallery" },
  { href: "/leaderboard", label: "Top cats" },
];

export const NavLinks = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={pathname === link.href ? `${styles.navLink} ${styles.active}` : styles.navLink}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};
