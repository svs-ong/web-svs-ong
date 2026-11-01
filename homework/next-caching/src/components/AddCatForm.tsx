"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { addCat } from "@/lib/actions";
import styles from "./AddCatForm.module.css";

// Spare pictures that homework/server ships in its images/ folder
const pictures = [
  { label: "Shadow (black kitten)", imageUrl: "/images/shadow.jpg" },
  { label: "Pixel (tabby kitten)", imageUrl: "/images/pixel.jpg" },
  { label: "Ranger (tree climber)", imageUrl: "/images/ranger.jpg" },
  { label: "The Twins", imageUrl: "/images/twins.jpg" },
];

export const AddCatForm = () => {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [imageUrl, setImageUrl] = useState(pictures[0].imageUrl);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const handleAdd = () => {
    startTransition(async () => {
      const result = await addCat({ name, breed, imageUrl });
      setError(result.error ?? null);
      if (!result.error) {
        setName("");
        setBreed("");
      }
    });
  };

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        handleAdd();
      }}
    >
      <Image className={styles.preview} src={imageUrl} alt="" width={96} height={72} unoptimized />
      <div className={styles.fields}>
        <input aria-label="Name" placeholder="Name" value={name} maxLength={30} onChange={(event) => setName(event.target.value)} />
        <input aria-label="Breed" placeholder="Breed" value={breed} maxLength={30} onChange={(event) => setBreed(event.target.value)} />
        <select aria-label="Picture" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)}>
          {pictures.map((picture) => (
            <option key={picture.imageUrl} value={picture.imageUrl}>
              {picture.label}
            </option>
          ))}
        </select>
      </div>
      <button className={styles.submit} type="submit" disabled={pending}>
        {pending ? "Adding…" : "＋ Add cat"}
      </button>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </form>
  );
};
