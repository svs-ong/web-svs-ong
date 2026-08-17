# Practice

## Starter

> 🔧 **Exercise** — given `PostsPage.tsx`, write only `usePosts.ts`, one step at a time.
>
> **Verify:**
>
> - On load: the spinner shows first, then all 100 posts, each with its title _and_ body text.
> - Click "Reload" — the spinner reappears, then the same posts come back.
> - Temporarily point the URL at something that 404s (`.../postsxxx`) and confirm the error message renders instead of a blank page — then put the real URL back.

```ts
// PostsPage.ts — given, don't modify
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { usePosts } from "./usePosts";

export const PostsPage = () => {
  const { posts, loading, error, reload } = usePosts();

  return (
    <Stack spacing={2} p={4}>
      <Button variant="contained" onClick={reload} disabled={loading}>
        Reload
      </Button>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {!loading &&
        !error &&
        posts.map((post) => (
          <Stack
            key={post.id}
            spacing={0.5}
            sx={{ border: "1px solid #eee", p: 2, borderRadius: 1 }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              User {post.userId}
            </Typography>
            <Typography variant="h6">{post.title}</Typography>
            <Typography variant="body2">{post.body}</Typography>
          </Stack>
        ))}
    </Stack>
  );
};
```

```ts
// usePosts.ts — TODO: implement this
import { useState, useEffect } from "react";

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface UsePostsResult {
  posts: Post[];
  loading: boolean;
  error: string | null;
  reload: () => void;
}

export const usePosts = (): UsePostsResult => {
  // TODO: posts / loading / error state
  // TODO: an effect that fetches all posts, and updates that state
  //       (loading before the fetch, then posts + loading, or error + loading, after)
  // TODO: a reload function that makes the effect above run again
  // TODO: return { posts, loading, error, reload }
};
```

### Step 1 — State

- `posts: Post[]`, starting empty.
- `loading: boolean`, starting `true` — there's a fetch in flight from the very first render.
- `error: string | null`, starting `null`.

### Step 2 — Fetch inside an effect

- One `useEffect`, firing on mount.
- Before the fetch starts: `setLoading(true)` and `setError(null)` — `reload` can run after a previous error, so both need resetting every time, not just once.
- `fetch("https://jsonplaceholder.typicode.com/posts")`, the same endpoint as the lesson's `Fetching data` example.
- Check `res.ok` — the happy path never 404s, but this exercise's own verify step points the URL somewhere that does, so it has to be a real check, not an assumption.
- On success: `setPosts` with the **full** `Post` shape — `id`, `userId`, `title`, `body` — not just the title like the lesson's trimmed example. Then `setLoading(false)`.
- On failure — `res.ok` is `false`, or the `fetch` itself throws — `setError` to a message, then `setLoading(false)`.

### Step 3 — Make `reload` actually reload

- Add one more piece of state: a `reloadKey`, starting at `0`.
- Add `reloadKey` to the effect's dependency array, even though nothing inside the effect ever reads it — the effect only needs to re-run when it changes, not to use its value.
- `reload` becomes `() => setReloadKey((k) => k + 1)` — bumping a number the effect depends on is enough to make it run again, no other plumbing required.

### Step 4 — Return the result

- `return { posts, loading, error, reload }`, matching `UsePostsResult` — `PostsPage` below is already wired to exactly this shape.

> 💡 Steps 1 and 2 alone are enough to make `PostsPage` render real posts end to end. Step 3 is what makes the "Reload" button do something.

---

## Team Work

Same shared `react-homework` app from the last two courses. It's fully styled with MUI now — this time, make the HomePage's search bar and category pills actually do something.

- **Search bar:** a piece of state holding the current query (`useState("")`), updated on every keystroke. Filter `articles` down to the ones whose `title` includes the query (case-insensitive) before mapping them into `ArticleCard`s.
- **Category pills:** a piece of state holding the currently selected category (`useState<string | null>(null)`). Clicking a `CategoryPill` selects it; clicking the same one again clears the selection back to `null`, showing every category again. Filter `articles` down to the ones matching the selected category — when nothing is selected, show them all.
- **Combine both:** search and category filtering apply together, so a user can search _inside_ a single category. `.filter()` twice (or once with both conditions) — order doesn't matter.
- **Empty state:** when the combined filters leave zero articles, render a message ("No articles match your search") instead of an empty grid.
- **Highlight the active pill:** give the selected `CategoryPill` a different visual style (its `variant` or `color` prop, or `sx`) than the unselected ones, so it's clear which filter, if any, is currently active.

> 💡 None of this needs a `useEffect`. Filtering an array you already have in memory is exactly the "derived value" case from the `useEffect` lesson's Common Mistakes — calculate `articles.filter(...)` directly during render, don't `useState` + `useEffect` a copy of it. Save `useEffect` for when you actually need to reach outside of rendering, like `usePosts` did above.

<div style="height:200px"></div>
