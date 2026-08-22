# Practice

## Starter

> 🔧 **Exercise** — the two pages below work: the list loads, click a cat, its detail page loads. They also break nearly every habit from this lesson on purpose. Refactor them, one step at a time — behavior stays identical, structure doesn't.

```ts
// src/lib/cats.ts — given, refactor this
export interface Cat {
  id: number;
  name: string;
  breed: string;
  imageUrl: string;
}

const cats: Cat[] = [
  {
    id: 1,
    name: "Whiskers",
    breed: "Tabby",
    imageUrl: "https://s3.us-west-2.amazonaws.com/cdn2.thecatapi.com/images/ar.jpg",
  },
  {
    id: 2,
    name: "Luna",
    breed: "Siamese",
    imageUrl: "https://s3.us-west-2.amazonaws.com/cdn2.thecatapi.com/images/MTc4NDg3Nw.png",
  },
  {
    id: 3,
    name: "Milo",
    breed: "Persian",
    imageUrl: "https://s3.us-west-2.amazonaws.com/cdn2.thecatapi.com/images/bqr.jpg",
  },
];

export const getCats = (): Cat[] => cats;

export const getCat = (id: number): Cat | undefined =>
  cats.find((cat) => cat.id === id);
```

```ts
// src/app/cats/page.tsx — given, refactor this
"use client";
import { useState, useEffect } from "react";
import { Typography, Stack } from "@mui/material";
import { getCats, type Cat } from "@/lib/cats";

const CatsPage = () => {
  const [cats, setCats] = useState<Cat[]>([]);

  useEffect(() => {
    setCats(getCats());
  }, []);

  return (
    <Stack spacing={1}>
      <Typography variant="h4">Cats</Typography>
      {cats.map((cat) => (
        <a key={cat.id} href={`/cats/detail?id=${cat.id}`}>
          <img src={cat.imageUrl} alt={cat.name} width={40} />
          {cat.name} — {cat.breed}
        </a>
      ))}
    </Stack>
  );
};

export default CatsPage;
```

```ts
// src/app/cats/detail/page.tsx — given, refactor this
"use client";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { getCat, type Cat } from "@/lib/cats";

const CatDetailPage = () => {
  const [cat, setCat] = useState<Cat | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));
    setCat(getCat(id) ?? null);
  }, []);

  if (!cat) return <Typography>Cat not found</Typography>;

  return (
    <>
      <img src={cat.imageUrl} alt={cat.name} width={200} />
      <Typography variant="h4">
        {cat.name} — {cat.breed}
      </Typography>
    </>
  );
};

export default CatDetailPage;
```

### Step 1 — `lib/cats.ts` → `model/cat.ts`

`lib/` is for generic, no-directive helpers that don't belong to any one domain — a `formatDate`, a `debounce`. A list of cats, and the two functions that read it, are exactly what this course's `model/` folder is for instead.

- Move `src/lib/cats.ts` to `src/model/cat.ts`.
- Make `getCats` and `getCat` return a `Promise` — `async () => cats`, `async (id) => cats.find(...)` — the same shape `getCat`/`getCats` already had in the Dynamic Routes chapter. Even over a plain in-memory array, this is what lets a real database call replace the inside later without changing anything that calls it.

### Step 2 — The list, back to a Server Component

`useEffect(() => setCats(getCats()), [])` runs once, on mount, purely to copy something already available into state — the exact "derive during render, don't sync" shape called out back in React Patterns, just with `getCats()` standing in for a prop or another piece of state.

- Remove `"use client"` from `src/app/cats/page.tsx`.
- Make `CatsPage` `async`, and replace the whole `useState`/`useEffect` block with one line: `const cats = await getCats();`.
- There's no state left to sync, because there's no state left at all.

### Step 3 — A real dynamic route, not a query string

`/cats/detail?id=3` is one page reading a query string by hand, with its own `useState`/`useEffect` pair just to turn that string into a cat. `/cats/[id]` is the actual tool for "one file, many URLs" — the same pattern `CatPage` already used in the Dynamic Routes chapter.

- Delete `src/app/cats/detail/page.tsx`.
- Create `src/app/cats/[id]/page.tsx` instead.
- Read `id` from `params` — a `Promise`, same as every dynamic route in this course — not from `window.location.search`.
- Make the component `async`, and call `getCat(Number(id))` directly, `await`ed. Delete `useState`, `useEffect`, and the `URLSearchParams` line entirely.

### Step 4 — `notFound()`, not an inline check

- Replace `if (!cat) return <Typography>Cat not found</Typography>;` with `if (!cat) notFound();`, imported from `next/navigation`.
- Add `src/app/cats/not-found.tsx`. It'll render automatically now, for this route and any other unmatched one under `/cats` — nothing has to call it by hand.

### Step 5 — `<Link>`, not `<a>`

- Replace `<a href={...}>` in the cats list with `<Link href={...}>`, imported from `next/link`.
- Point it at `/cats/${cat.id}` instead of `/cats/detail?id=${cat.id}`.

> 💡 Every step here removes something — a `useState`/`useEffect` pair, a query string, an inline check — because the conventions this course already taught (Server Components by default, `model/` for domain data, `[id]` segments, `not-found.tsx`) do that job on their own. If a step ever makes a file longer, it's probably the wrong direction.

---

## Team Work

Using what you've learned in this lesson, replicate the React + MUI app from earlier courses as a Next.js app instead — file-based routing, Server Components by default, an `[id]` route for anything that was a single hardcoded page before. No fixed steps here: go in whatever order makes sense for your app, the same way the Starter above had a fixed order for a reason but your own project won't.
