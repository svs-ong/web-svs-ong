import Image from "next/image";
import { CatAdminActions } from "@/components/CatAdminActions";
import { LikeButton } from "@/components/LikeButton";
import type { Cat } from "@/model/cat";
import styles from "./CatCard.module.css";

interface CatCardProps {
  cat: Cat;
  rank?: number;
  editable: boolean;
}

export const CatCard = ({ cat, rank, editable }: CatCardProps) => (
  <li className={styles.card}>
    <div className={styles.photo}>
      {/* Pictures come from homework/server through the /images rewrite in next.config.ts */}
      <Image src={cat.imageUrl} alt={cat.name} width={600} height={450} unoptimized />
      {rank !== undefined && <span className={styles.rank}>#{rank}</span>}
    </div>
    <div className={styles.body}>
      <div className={styles.info}>
        <h2 className={styles.name}>{cat.name}</h2>
        <p className={styles.breed}>{cat.breed}</p>
      </div>
      <LikeButton cat={cat} />
    </div>
    {editable && <CatAdminActions cat={cat} />}
  </li>
);
