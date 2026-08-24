# Practice

## Starter

> 🔧 **Exercise** — the two pages below work: the list loads, click a cat, its detail page loads, the Like button counts up. They also break nearly every habit from this course on purpose. Refactor them, one step at a time — behavior stays identical, structure doesn't.

```ts
// src/lib/catsApi.ts — given, refactor this
export interface Cat {
  id: number;
  name: string;
  breed: string;
  imageUrl: string;
  likes: number;
}

let cats: Cat[] = [
  {
    id: 1,
    name: "Whiskers",
    breed: "Tabby",
    imageUrl: "https://s3.us-west-2.amazonaws.com/cdn2.thecatapi.com/images/ar.jpg",
    likes: 0,
  },
  {
    id: 2,
    name: "Luna",
    breed: "Siamese",
    imageUrl: "https://s3.us-west-2.amazonaws.com/cdn2.thecatapi.com/images/MTc4NDg3Nw.png",
    likes: 0,
  },
  {
    id: 3,
    name: "Milo",
    breed: "Persian",
    imageUrl: "https://s3.us-west-2.amazonaws.com/cdn2.thecatapi.com/images/bqr.jpg",
    likes: 0,
  },
];

export const getCats = (): Cat[] => cats;

export const getCat = (id: number): Cat | undefined =>
  cats.find((cat) => cat.id === id);

export const likeCat = (id: number): Cat | undefined => {
  cats = cats.map((cat) => (cat.id === id ? { ...cat, likes: cat.likes + 1 } : cat));
  return cats.find((cat) => cat.id === id);
};
```

```ts
// src/app/cats/page.tsx — given, refactor this
import { Avatar, Typography, Stack } from "@mui/material";
import Link from "next/link";
import { getCats } from "@/lib/catsApi";

export default function CatsPage() {
  const cats = getCats();

  return (
    <Stack spacing={1}>
      <Typography variant="h4">Cats</Typography>
      {cats.map((cat) => (
        <Stack
          key={cat.id}
          component={Link}
          href={`/cats/${cat.id}`}
          direction="row"
          spacing={1}
          sx={{ alignItems: "center" }}
        >
          <Avatar src={cat.imageUrl} alt={cat.name} />
          <Typography>
            {cat.name} — {cat.breed}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}
```

```ts
// src/app/cats/[id]/page.tsx — given, refactor this
"use client";
import { useState, useEffect } from "react";
import { Stack, Typography, Button } from "@mui/material";
import { getCat, likeCat, type Cat } from "@/lib/catsApi";

interface CatPageProps {
  params: { id: string };
}

export default function CatPage({ params }: CatPageProps) {
  const [cat, setCat] = useState<Cat | undefined>(undefined);

  useEffect(() => {
    setCat(getCat(Number(params.id)));
  }, [params.id]);

  const handleLike = () => {
    setCat(likeCat(Number(params.id)));
  };

  if (!cat) return <Typography>Loading...</Typography>;

  return (
    <Stack spacing={2} sx={{ alignItems: "center" }}>
      <img src={cat.imageUrl} alt={cat.name} width={300} />
      <Typography variant="h4">
        {cat.name} — {cat.breed}
      </Typography>
      <Button variant="contained" onClick={handleLike}>
        Like ({cat.likes})
      </Button>
    </Stack>
  );
}
```

> 💡 Before touching anything: like a cat, then refresh the page. Then open the same cat in a second tab and like it there too. Neither like survives the refresh, and the two tabs never see each other's clicks. Keep that in mind — Step 3 is what actually fixes it, not just moves the bug around.

### Step 1 — Split `lib/catsApi.ts` into a model and an API

`lib/catsApi.ts` mixes the `Cat` shape and its data with the functions that read and change it — with no directive marking any of it as anything special.

- Create `src/model/cat.ts`. Move the `Cat` interface and the `cats` array into it, both `export`ed — the same file this course has referenced back to since the Dynamic Routes chapter.
- Create `src/server/catsApi.ts`. Move `getCats`, `getCat`, and `likeCat` into it, importing `Cat`/`cats` from `@/model/cat`.
- Update both page files' imports: `Cat` from `@/model/cat`, the three functions from `@/server/catsApi`.

### Step 2 — Mark `src/server/catsApi.ts` as `"use server"`

`likeCat` has no directive at all right now — called from `"use client"` `CatPage`, its code just gets bundled straight into the browser. `cats` genuinely only ever lives in whichever tab last clicked Like, which is exactly what the warning under the Starter showed.

- Add `"use server"` to the top of `src/server/catsApi.ts`.
- Make `getCats`, `getCat`, and `likeCat` all `async` — the same shape `getCats`/`getCat` already had back in the Dynamic Routes chapter, now extended to `likeCat` too.

### Step 3 — The hybrid shape, and back to `await params`

`CatPage` reverted to the pre–Next.js-15 way of reading `params` — a plain object, no `Promise`, no `await` — on top of being a Client Component for a page that mostly isn't interactive.

- Turn `src/app/cats/[id]/page.tsx` back into an `async` Server Component, no directive: `params: Promise<{ id: string }>`, `const { id } = await params;`, `const cat = await getCat(Number(id));` — exactly the Dynamic Routes chapter's convention.
- Create `src/components/LikeButton.tsx` — `"use client"`, taking `cat: Cat` as a prop, seeding `useState(cat.likes)`.
- Its `handleLike` should `await likeCat(cat.id)` — the real Server Function — and set the count from the result, instead of calling a function that only ever ran in the browser.
- `CatPage` renders the cat's image and name itself, and drops in `<LikeButton cat={cat} />` for the one piece that still needs to react to a click.
- Verify it: like a cat, refresh. It's still there. Open a second tab, like the same cat there, refresh the first — both clicks show up. That's the multi-tab check from the Hybrid Component chapter, now true here too.

### Step 4 — Validate `id`, inside the Server Function

`likeCat` is a real network endpoint now, reachable with any `id` at all, not just the one on the page that calls it.

- Inside `likeCat`, reject the call (throw, or return `undefined`) if `id` isn't a positive integer, or doesn't match any cat in `cats` — the same shape as `addTag`'s validation in the Security and SEO chapter.
- Confirm it's genuinely enforced server-side: call `likeCat(-1)` from the browser console instead of clicking the button, and check it does nothing.

### Step 5 — A loading state while `likeCat` is in flight

- Give `getCats`/`getCat`/`likeCat` a `setTimeout`-based delay, same as `getLikes`/`getTag` elsewhere in this course, so there's something to actually wait for.
- Add a `loading` boolean to `LikeButton`, `true` while `handleLike`'s `await likeCat(cat.id)` is pending. Disable the button and swap its label for a `CircularProgress` while it's `true`.

### Step 6 — Metadata: one for the list, one generated per cat

`/cats` and `/cats/[id]` need different kinds of `metadata`, for the same reason the Security and SEO chapter's own `/tags` and `/cats/[id]` examples did.

- In `src/app/cats/page.tsx`, add a static `metadata` export — the page is always about the same thing, no matter which cats are in the list:

  ```ts
  import type { Metadata } from "next";

  export const metadata: Metadata = {
    title: "Cats",
    description: "Browse every cat and give your favorite a like.",
  };
  ```

- In `src/app/cats/[id]/page.tsx`, add `generateMetadata` instead — a fixed object can't work here, since every `id` needs a different title:

  ```ts
  export const generateMetadata = async ({
    params,
  }: CatPageProps): Promise<Metadata> => {
    const { id } = await params;
    const cat = await getCat(Number(id));

    return {
      title: cat ? cat.name : "Cat not found",
      description: cat
        ? `${cat.name} is a ${cat.breed}, with ${cat.likes} likes so far.`
        : undefined,
    };
  };
  ```

  Same `params` the page component itself receives — same `Promise`, same `await` — computed on the server before anything renders.

- **How to see they actually exist**: don't trust the DevTools Elements panel — it shows the live, JavaScript-modified DOM, which can make a missing `<title>` look present. Use "View Page Source" instead (or `curl` the URL), and look inside `<head>` for `<title>Whiskers</title>` and `<meta name="description" content="...">`. Visit `/cats/1`, `/cats/2`, `/cats/3` and confirm the title actually changes each time — a fixed `metadata` object would show the same title on all three.

> 💡 Every step here either removes something a Server Function now does for free, or adds exactly the one small piece — a directive, a prop, a `loading` boolean, a `metadata` export — that this course spent six chapters building up to. If a step feels like it's fighting the framework, it's probably the wrong direction.

---

## Team Work

Take a piece of state you're currently keeping in `useState` alone, somewhere in your own project, and give it the same treatment as `likeCat` above: a real `"use server"` function to change it, an async Server Component to load it the first time, a small Client Component underneath that owns everything after that. Validate whatever the Server Function accepts, and add real metadata to whichever page shows it — static if the page is always about the same thing, `generateMetadata` if it isn't. No fixed steps — the six above were a fixed order for a reason, but your own project won't need the same one.
