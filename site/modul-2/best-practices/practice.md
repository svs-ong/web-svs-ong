# Practice

## Starter

> 🔧 **Exercise** — `App.tsx` below works: it fetches, it searches, it filters by category. It also breaks nearly every habit from this lesson on purpose. Refactor it, one step at a time — behavior stays identical, structure doesn't.

```ts
// App.tsx — given, refactor this
import { useState, useEffect } from "react";
import {
  Stack,
  TextField,
  Chip,
  Button,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";

export const App = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        const withCategory = data.map((post: any) => ({
          ...post,
          category:
            post.userId % 3 === 0
              ? "tech"
              : post.userId % 3 === 1
                ? "design"
                : "business",
        }));
        setPosts(withCategory);
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress />;

  const filtered = posts.filter((post) => {
    const matchesQuery = post.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category ? post.category === category : true;
    return matchesQuery && matchesCategory;
  });

  return (
    <Stack spacing={2} sx={{ p: 4, maxWidth: 800, margin: "0 auto" }}>
      <Typography variant="h4">Articles</Typography>

      <TextField
        placeholder="Search articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ borderRadius: 2 }}
      />

      <Stack direction="row" spacing={1}>
        <Chip
          label="tech"
          onClick={() => setCategory(category === "tech" ? null : "tech")}
          sx={{
            borderRadius: 2,
            textTransform: "capitalize",
            fontWeight: 600,
            backgroundColor: category === "tech" ? "#1976d2" : "#eee",
            color: category === "tech" ? "#fff" : "#000",
          }}
        />
        <Chip
          label="design"
          onClick={() => setCategory(category === "design" ? null : "design")}
          sx={{
            borderRadius: 2,
            textTransform: "capitalize",
            fontWeight: 600,
            backgroundColor: category === "design" ? "#1976d2" : "#eee",
            color: category === "design" ? "#fff" : "#000",
          }}
        />
        <Chip
          label="business"
          onClick={() => setCategory(category === "business" ? null : "business")}
          sx={{
            borderRadius: 2,
            textTransform: "capitalize",
            fontWeight: 600,
            backgroundColor: category === "business" ? "#1976d2" : "#eee",
            color: category === "business" ? "#fff" : "#000",
          }}
        />
      </Stack>

      <Button
        variant="contained"
        sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
      >
        New Article
      </Button>

      {filtered.length === 0 && (
        <Typography>No articles match your search.</Typography>
      )}

      {filtered.map((post) => (
        <Card key={post.id} sx={{ borderRadius: 2, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <CardContent>
            <Typography variant="subtitle2" sx={{ textTransform: "capitalize", color: "#666" }}>
              {post.category}
            </Typography>
            <Typography variant="h6">{post.title}</Typography>
            <Typography variant="body2">{post.body}</Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};
```

### Step 1 — Wrap the `Stack` in a `Container`

The outermost `<Stack spacing={2} sx={{ p: 4, maxWidth: 800, margin: "0 auto" }}>` is doing two unrelated jobs. `spacing={2}` is genuinely `Stack`'s job — the gap between its children. `p`, `maxWidth`, and `margin: "0 auto"` aren't spacing between children at all; they're page-layout concerns, which is what `Container` is for.

- Import `Container` from `@mui/material`.
- Wrap the outer `Stack` in `<Container maxWidth="sm">`.
- Remove `p`, `maxWidth`, and `margin: "0 auto"` off the `Stack`'s `sx`.
- Leave `Stack` with only `spacing={2}` — no `sx` left on it.

### Step 2 — Theme

`borderRadius: 2` is pasted onto four different components; the chips repeat their active/inactive colors three times each; the `Button`'s `sx` matches this lesson's own theme example exactly.

- In `theme.ts`, add `styleOverrides` for `MuiButton`, `MuiChip`, `MuiTextField`, and `MuiCard`.
- Move every repeated value — `borderRadius`, `textTransform`, `fontWeight`, `boxShadow` — into the matching component's `styleOverrides.root`.
- Delete the `sx` prop from every `Button`, `Chip`, `TextField`, and `Card` in `App.tsx`.
- Independent of every other step — do it whenever, in any order relative to the rest.

### Step 3 — Types

The API doesn't send a `category` — jsonplaceholder's posts are just `id`, `userId`, `title`, `body`. The effect adds `category` afterward, locally, so there are really two shapes here, not one.

```ts
interface ApiPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface Post extends ApiPost {
  category: Category;
}
```

- Add `ApiPost` — exactly the fields the API sends, nothing more.
- Add `Post extends ApiPost`, adding `category: Category` — the same `extends` pattern as `SingleChoiceChallenge`/`CodingChallenge` earlier in this lesson.
- Add `type Category = "tech" | "design" | "business"` — a closed set, like `Difficulty`.
- Type `data` inside `.then()`, before `category` is attached, as `ApiPost[]`.
- Type `posts`, `filtered`, and any prop that takes a post as `Post`. Nothing in the file should be `any` when this step is done.

### Step 4 — Split into components

- Create `CategoryFilter`, taking `category` and `onCategoryChange` as props — move the whole chip row into it.
- Inside `CategoryFilter`, compute a per-chip `isSelected` boolean (`category === value`) instead of repeating the `category === "tech"` comparison inline wherever a color is needed.
- Use `isSelected` to drive `Chip`'s own `color` prop — `color={isSelected ? "primary" : "default"}` — instead of the hand-picked `backgroundColor`/`color` hex values in the starter's `sx`. One clear boolean feeding a prop `Chip` already understands, the same shape as `severity` on `Alert` earlier in this lesson, and it reads its actual color from the theme instead of a hardcoded hex.
- Create `ArticleCard`, taking one `post: Post` as a prop — move one card's markup into it.
- `App` should end this step owning `query`/`category` state and rendering three things: the search field, `CategoryFilter`, and a list of `ArticleCard` — nothing else.

### Step 5 — One list, not three chips

Three `<Chip>` blocks, hand-copied, is the same mistake as three hand-copied `sx` objects — just at the markup level instead of the styling level.

- Turn `Category` into something loopable at runtime too: an `as const` object (the same pattern as `Difficulty` in "write explicit types"), not just the union type.
- Use `Object.values(Category)` to create a list.
- Replace all three `<Chip>` elements with a single `.map()` over that list, passing each one its `isSelected` from Step 4.
- Verify it: add a fourth category to the object, and a fourth chip should appear, correctly colored, with no other line touched.

### Step 6 — Extract the category logic out of the effect

The block that assigns each post's `category` is data transformation, not a side effect — it doesn't need `fetch`, and it's the reason the effect body is as long as it is.

- Write `withCategory(post: ApiPost): Post` as its own function, outside the component.
- Replace the inline `.map()` inside `.then()` with `data.map(withCategory)`.
- The effect's body should end up doing exactly two things — `fetch(...)`, then hand the result to a named function — nothing computed inline inside `.then()`.

### Step 7 — Extract a custom hook

- Create `useArticles`, returning `{ articles, loading }` — the same shape `usePosts`/`useArticles` already take elsewhere in this course.
- Move the `fetch` call, the `.then()` chain (calling `withCategory`), and the `posts`/`loading` state into it.
- In `App`, replace all of that with one line: `const { articles, loading } = useArticles();`. `App` should never call `fetch` directly again.

> 💡 Types before markup, markup before logic. Step 3 makes step 4 and 5 far easier to get right, and step 6 is much easier to spot once `withCategory` has a `Post` to return instead of an untyped blob.

---

## Team Work

Same shared `react-homework` app from the last two courses. Search and category pills both work now — no new feature this time. Instead, audit the app itself against this lesson, and fix what you find.

- **Real data:** the home page and the article page have been working off static data — replace both with a real fetch against the server in `homework/server` of this repo. `cd homework/server && npm install && npm start` runs it on `http://localhost:3000`. `GET /articles` returns the short list this app's home page needs (`title`, `category`, `excerpt`, `date`, `readingTime`, `imagePlaceholder`, `background`, `slug`); `GET /articles/:slug` returns one article's full detail (`title`, `tag`, `author`, `date`, `readingTime`, `heroPlaceholder`, `body`, `quote`, `tags`, `relatedArticles`) — genuinely two different shapes, not the same `Article` with a few fields added, so they get two separate interfaces, typed from what the server actually sends back rather than assumed. Wrap each in its own hook — `useArticles()` for the list, `useArticle(slug)` for one — with `loading`/`error` handled the same way `usePosts` was in the Course 3 exercise.
- **Types:** find every `any` in the app — the fetched articles, event handlers, anything typed loosely "to make it compile" — and give it a real interface. If categories (or anything else with a fixed set of options) are still raw strings scattered across files, model them the way `Category` was here: a union type, or an `as const` object if the values are also looped over somewhere.
- **Component design:** find the app's biggest component — almost certainly `HomePage`, carrying the fetch, the search state, the pill row, and the card markup all at once — and split it the same way `App.tsx` was split here: a `useArticles` hook for the data, a filter component for the pills, a card component for one article.
- **State:** check every `useEffect` in the app for the two patterns this lesson called out — one syncing a piece of state from another that could just be computed during render, or one resetting local state from a prop that a `key` would handle instead. Fix any you find.
- **Theme:** grep the app for `sx=`. Anything that shows up more than once — a border radius, a font weight, a repeated color — moves into `theme.ts`. Anything that's really a boolean flag on a component (an `isActive`/`isSelected`-style color switch) should drive a real prop like `color` or `variant`, not a hand-picked hex value.
- **Structure:** look at how the app's folders are actually organized today, and move it toward whichever shape from "structure the app" it's closest to already — most real apps land on Vertical or Hybrid. A shared `components/` folder should only hold what's used by more than one feature; everything else moves into the feature that owns it.

> 💡 Don't do all six at once across the whole app. Start with **Real data** — the other five are much easier to get right once there's a real `Article`/`ArticleDetail` shape from the server driving them, instead of guessing at static mock data. Then pick one screen, apply the rest to just that screen, and confirm it still behaves identically before moving to the next — the same "behavior stays identical, structure doesn't" rule as the Starter above, just at the scale of a real app instead of one file.

<div style="height:200px"></div>
