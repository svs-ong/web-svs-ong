# Next.js Patterns

<div style="float: right;">0 → 15 min</div>

## Three Directives

Plain version: one of these three says "run me in the browser." Another says "run me on the server, but let the browser call me." The third says "never let this near the browser at all" — and it's the only one that isn't a language feature, just a package that enforces the rule.

### Files that carry one of the three directives:

|                         | `"use client"`                                                                    | `"use server"`                                                             | `import "server-only"`                                                          |
| ----------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Says                    | "ship this file to the browser too"                                               | "let the client call this, but keep it server-only"                        | "never let this file reach the browser, not even indirectly"                    |
| Behaves                 | runs on the server once, for the first HTML, then again in the browser to hydrate | always runs on the server; the browser only ever gets a stub that calls it | never reaches the browser — the build fails the moment a client file imports it |
| Callable by client code | Yes — it's already in the browser                                                 | Yes — called from client run on server                                     | No — must never be reachable at all                                             |

### Files with no directive at all (default):

|                             | Functions, variables, types                                                                                           | React components                                                                          |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Behaves                     | runs wherever the file importing it runs — server-side if a server file imports it, client-side if a client file does | a Server Component — runs on the server, once, full stop, no matter which file renders it |
| Fixed, or caller-dependent? | Caller-dependent — not fixed at all                                                                                   | Fixed — always a Server Component                                                         |

> 💡 This is the one thing worth slowing down for: a file with no directive doesn't have one fixed behavior — it depends on what's _inside_ it. A file exporting a React component is a Server Component, always. A file exporting a plain function or variable has no fixed side at all: `double` below runs on the server if a server file imports it, and in the browser if a client file does — two independent copies of the same source, each running wherever it was actually imported.

> ❓ A `"use client"` file "runs only in the browser" — true or false? And a no-directive file with a component in it, versus a `"use server"` file, both run on the server — so what's actually different?
>
> <details>
> <summary>Show answer</summary>
>
> _(False — a `"use client"` file still renders on the server first, to produce real HTML for the first request (Course 5, "What is Next.js?"). The same file then runs a second time, in the browser, to hydrate. "Runs only in the browser" is wrong; "also ships to and runs in the browser" is right.)_
>
> _(And the no-directive-component vs. `"use server"` question: a file with no directive, holding a component, only ever runs once, as part of rendering a page — nothing can call it again afterward. A `"use server"` file is written specifically so the client **can** call into it again later, from an `onClick` or a submit, long after the page finished loading. That's the entire reason the directive exists.)_
>
> </details>

### `"use client"` — already known from Course 5

A recap: `"use client"` at the top of a file marks every component in that file as a Client Component. Full explanation in Course 5's Client Component chapter.

### `"use server"` — marks a Server Function

`"use server"` at the top of a function, or a whole file, marks it as a **Server Function** — code that always runs on the server, no matter which file calls it:

```ts
// src/app/actions.ts
"use server";

export const addLike = async () => {
  // ...this body only ever runs on the server
};
```

A `"use client"` file ships its code to the browser. A `"use server"` file does the opposite: never ships this code, but lets a client file call it anyway, over the network, automatically.

### `server-only` — a guardrail, not a directive

`"use server"` keeps a function's _body_ off the client, but nothing stops a client file from accidentally importing a whole file full of secrets just to reach one harmless thing inside it. `server-only` closes that gap:

```ts
// src/lib/db.ts
import "server-only";

export const dbPassword = process.env.DB_PASSWORD;
```

That one import turns any accidental use of this file from a client file into a **build error** — immediately, not a leaked secret discovered later.

> 💡 `"use server"` is for a file _meant_ to be called from the client. `server-only` is for a file that should _never_ be reachable from client code at all — it exposes nothing callable, it just refuses to build if it ends up in a client bundle.

<div style="float: right;">15 → 45 min</div>

## Functions Calls

Course 5's `LikeButton` kept `likes` in `useState` — real, but gone the moment the page refreshes. This chapter makes it stick, using a Server Function instead of `useState` alone.

### `Demo`: watch where each `console.log` lands

Three functions, three files, one of each kind — `first` in a default file, `second` in a `"use client"` file, `third` in a `"use server"` file — all called from the same Client Component, each with its own `console.log`:

```ts
// src/lib/first.ts — nothing, a plain function
export const first = () => {
  console.log("first call");
};
```

```ts
// src/lib/second.ts — "use client"
"use client";

export const second = () => {
  console.log("second call");
};
```

```ts
// src/lib/third.ts — "use server"
"use server";

export const third = async () => {
  console.log("third call");
};
```

```ts
// src/components/Demo.tsx — a Client Component, calling all three
"use client";
import { Button } from "@mui/material";
import { first } from "@/lib/first";
import { second } from "@/lib/second";
import { third } from "@/lib/third";

export const Demo = () => {
  const handleClick = async () => {
    console.log("handle click call");
    first();
    second();
    await third();
  };

  return <Button onClick={handleClick}>Go</Button>;
};
```

Click the button once:

**Browser console:**

```plaintext
handle click call
first call
second call
```

**Terminal (wherever `npm run dev` is running):**

```plaintext
third call
```

> 💡 `"use client"` on a plain function does something a no-directive function never does: it makes the function _unreachable_ from server code, the same direction `server-only` locks down completely — the difference is `server-only` blocks the browser from reaching in, `"use client"` here blocks the server from reaching in.

> 🔧 **Exercise:** in `Demo.tsx`, delete the `"use client"` line entirely — leave everything else exactly as it is. What changes? Try running the app, click `Go`, and read whatever Next.js tells you.
>
> <details>
> <summary>Show answer</summary>
>
> - `Demo` becomes a plain, no-directive component — a Server Component, by the table earlier in this course, fixed and always. Two separate things break at once. First, the one from the section just above: `Demo` still imports `second`, from a `"use client"` file — and a Server Component can't import a plain function from one of those at all, the exact build error just seen with `HomePage`.
> - Second, even setting that aside, `Demo` still has `onClick={handleClick}` on its `Button` — the failure from Course 5's Server Component chapter, `Error: Event handlers cannot be passed to Client Component props.`, since a Server Component can only ship HTML to the browser, never a function.
> - `first` and `third` were never part of the problem; neither was ever fixed to the client side.
>
> </details>

<div style="float: right;">45 → 70 min</div>

## Hybrid Component

Plain version: half of this component is written by the server, half by the browser. The server's half is the opening line — the initial list, already there when the page loads. The browser's half is everything after that — every item added from then on, with no reload in between.

### Step 1: a simulated database, and two Server Functions with a delay

```ts
// src/lib/tags.ts — "use server"
"use server";

const tagsDb: string[] = [
  "react",
  "next.js",
  "typescript",
  "javascript",
  "css",
];

export const getTag = async (): Promise<string[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // pretend database read
  return tagsDb;
};

export const addTag = async (tag: string): Promise<string[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // pretend database write
  tagsDb.push(tag);
  return tagsDb;
};
```

Same `setTimeout` trick as `getLikes` back in Course 5's Async Component chapter — pretending this is a real network round trip to a database, not instant in-memory data. `tagsDb` lives inside this file too, but it's never `export`ed — a `"use server"` file is only allowed to export async functions, so the data it works on has to stay internal, shared between `getTag` and `addTag` by both living in the same module.

### Step 2: `getTag` makes the initial call, on the server

```ts
// src/app/page.tsx — an async Server Component
import { getTag } from "@/lib/tags";
import { TagList } from "@/components/TagList";

const HomePage = async () => {
  const initialTags = await getTag();

  return <TagList initialTags={initialTags} />;
};

export default HomePage;
```

Same shape as Course 5's Async Component chapter: `HomePage` awaits `getTag()` before rendering anything, so the very first HTML the browser receives already has the full tag list in it — no spinner, no loading state to write by hand.

### Step 3: `addTag` manages every update after that, from `TagList`

```ts
// src/components/TagList.tsx — a Client Component
"use client";
import { useState } from "react";
import { Button, Chip, CircularProgress, Stack, TextField } from "@mui/material";
import { addTag } from "@/lib/tags";

interface TagListProps {
  initialTags: string[];
}

export const TagList = ({ initialTags }: TagListProps) => {
  const [tags, setTags] = useState(initialTags);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!draft) return;
    setLoading(true);
    const updatedTags = await addTag(draft);
    setTags(updatedTags);
    setDraft("");
    setLoading(false);
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1}>
        {tags.map((tag) => (
          <Chip key={tag} label={tag} />
        ))}
      </Stack>
      <Stack direction="row" spacing={1}>
        <TextField size="small" value={draft} onChange={(e) => setDraft(e.target.value)} />
        <Button variant="contained" onClick={handleAdd} disabled={loading}>
          {loading ? <CircularProgress size={20} /> : "Add"}
        </Button>
      </Stack>
    </Stack>
  );
};
```

`useState(initialTags)` reads its starting value once, from the prop `HomePage` already computed on the server — `initialTags` only ever seeds the state, it's never kept in sync with it afterward. Every click after that calls `addTag`, a real round trip to the server: `tagsDb` gets the new tag pushed onto it there, and the updated array comes back to replace `tags` — the same array `getTag` will read from on the _next_ page load, since it's the same shared `tagsDb`.

> 💡 This is the shape almost every real Next.js page ends up taking: a Server Component fetches once and renders the frame, a Client Component underneath it owns whatever needs to keep changing after that — usually by calling a Server Function, the way `TagList` calls `addTag`. Neither half replaces the other — `HomePage` is a plain async Server Component, `TagList` is an ordinary Client Component with `useState`. "Hybrid" just means one page, built from both.

> ❓ Open the page in two different tabs — or two different browsers entirely. Add a tag in the first one. Add a _different_ tag in the second one. Now refresh just the first tab. What shows up, and why?
>
> <details>
> <summary>Show answer</summary>
>
> _(Both tags — the one added in the first tab, and the one added in the second. `tagsDb` isn't scoped to a tab, a browser, or a visitor at all; it's one array, sitting in the server's memory, and every `addTag` call from anywhere pushes onto that exact same array. The second tab's click didn't just update *its own* copy of the list — there is no "its own copy" on the server side. Refreshing the first tab calls `getTag()` fresh, which reads whatever `tagsDb` currently holds, regardless of which tab, browser, or person put it there.)_
>
> _(This is the opposite of `useState`. `tags` in `TagList` genuinely is private to that one component instance, in that one tab — two tabs each get their own `useState`, never shared. `tagsDb` on the server has no such boundary by default; every request, from every tab everywhere, is talking to the same one.)_
>
> </details>

<div style="float: right;">70 → 85 min</div>

## App Structure

Plain version: a small app can afford one junk drawer. A big one needs the drawer split into hooks, server functions, and helpers — and its components split into "knows nothing about the app" and "knows exactly one piece of it."

### Small — one `lib/` for everything that isn't a component or a model

```plaintext
src/
├── app/
│   └── tags/
│       └── page.tsx
├── components/
│   ├── TagList.tsx
│   └── TagChip.tsx
├── lib/
│   ├── tags.ts             # "use server" — getTag, addTag
│   ├── useTagDraft.ts       # a custom hook
│   └── formatTagLabel.ts    # a plain helper
└── model/
    └── tag.ts               # the Tag interface
```

`lib/` here is one folder for three different kinds of file — a Server Function, a hook, a plain helper — same as Course 4's React Patterns used `lib/` as a catch-all before a project earned anything more specific. `model/` is new only in name: it's exactly the role `src/model/article.ts` already played back in Course 5, just holding `Tag` this time instead of `Article`.

### The big one — `lib/` splits into three, `components/` splits into two

```plaintext
src/
├── app/
│   └── tags/
│       └── page.tsx
├── components/
│   ├── atomic/
│   │   └── Pill.tsx          # generic — no model knowledge
│   └── organism/
│       ├── TagChip.tsx        # coupled to Tag
│       └── TagList.tsx        # coupled to Tag
├── server/
│   └── tags.ts               # "use server" — getTag, addTag
├── helpers/
│   └── formatTagLabel.ts      # plain helpers
├── hooks/
│   └── useTagDraft.ts         # custom hooks
└── model/
    └── tag.ts                 # the Tag interface
```

Same files as the small version, three new names instead of one: `server/` for `"use server"` files specifically, `helpers/` for plain no-directive functions, `hooks/` for custom hooks. Nothing here does anything different from the small version — this is purely "One name per concern" from React Patterns, applied the moment `lib/` gets crowded enough that "wait, is this a hook or a helper?" stops being obvious at a glance.

> 💡 Each of these three folder names is really just this course's directives, wearing a different label:
>
> - **`server/`** — Server Functions, `"use server"`. Always run on the server, but callable from the client, on demand.
> - **`hooks/`** — no directive marks the file itself, but a hook that calls `useState` or `useEffect` only ever actually works when a Client Component renders it. In practice, a hook is a client-only function, even without `"use client"` written anywhere.
> - **`helpers/`** — plain, no-directive functions, usable from either side. Same file, same code, running server-side if a server file imports it and client-side if a client file does — the "caller-dependent" row from the Three Directives table, given its own folder.

### What makes a component coupled to model data

`components/` splits the same way: **atomic** components know nothing about the app's data; **organism** components are built around one specific model type.

```ts
// src/components/organism/TagChip.tsx — coupled to Tag
import { Chip } from "@mui/material";
import type { Tag } from "@/model/tag";

interface TagChipProps {
  tag: Tag;
}

export const TagChip = ({ tag }: TagChipProps) => <Chip label={tag.label} color={tag.color} />;
```

`TagChip` takes the whole `Tag` object as a prop and reaches into its fields — `tag.label`, `tag.color`. It only means anything in an app that has a `Tag`. Swap `Tag` for anything else, and `TagChip` has to change with it.

```ts
// src/components/atomic/Pill.tsx — generic, has never heard of Tag
import { Chip } from "@mui/material";

interface PillProps {
  label: string;
  color?: "default" | "primary" | "secondary";
}

export const Pill = ({ label, color = "default" }: PillProps) => <Chip label={label} color={color} />;
```

```ts
// src/components/organism/TagChip.tsx — now a thin adapter, built on Pill
import type { Tag } from "@/model/tag";
import { Pill } from "@/components/atomic/Pill";

interface TagChipProps {
  tag: Tag;
}

export const TagChip = ({ tag }: TagChipProps) => <Pill label={tag.label} color={tag.color} />;
```

`Pill` takes only the individual primitive values it actually renders — `label`, `color` — never the whole `Tag`. It could render a cat's breed, a like count, anything with a label and a color, because nothing inside it says `Tag` anywhere. `TagChip` is the one small piece that still knows `Tag` exists, translating it into props `Pill` already understands — the exact "generic primitive + thin adapter" shape Course 4's React Patterns built with `InfoCard`/`UserCard`, here applied to `atomic`/`organism` as folder names instead of just a convention.

> 💡 The test for which folder a component belongs in: does its prop type name a domain model (`tag: Tag`), or only the primitive fields that model happens to have (`label: string`)? The first is an organism. The second is atomic — and reusable anywhere that shape of data shows up, model or not.

> ❓ `TagList` renders a list of `TagChip`s and owns `useTagDraft`. Atomic, or organism?
>
> <details>
> <summary>Show answer</summary>
>
> _(Organism. `TagList` knows `Tag` exists — it's iterating over `Tag[]`, same as `TagChip` reaching into one `Tag`'s fields. Knowing about the model anywhere in a component, even just to loop over a list of it, is enough to make it an organism — only `Pill` underneath, with no `Tag` in sight, earns `atomic/`.)_
>
> </details>

<div style="float: right;">85 → 100 min</div>

## Security and SEO

Plain version: a Server Function looks like a normal function call from inside `TagList`, but it's really an address on the internet — anyone who finds it can call it directly, with anything, not just through the button that happens to call it in this app. And the opposite problem: content that only ever appears after a click may never make it into the page a search engine actually reads.

### Security: it's a public endpoint, not a private function

```ts
// ❌ src/server/tags.ts — trusts the input completely
"use server";

export const addTag = async (tag: string): Promise<string[]> => {
  tagsDb.push(tag); // no check at all — any string, any length, from anyone
  return tagsDb;
};
```

Nothing about `"use server"` checks who's calling `addTag`, or what they're sending. Next.js builds a real network endpoint for it — reachable with a plain `fetch`, from a terminal or another website entirely, without ever touching `TagList` or clicking anything in this app.

```ts
// ✅ src/server/tags.ts — validates what actually gets in
"use server";

export const addTag = async (tag: string): Promise<string[]> => {
  const trimmed = tag.trim();
  if (!trimmed || trimmed.length > 30) {
    throw new Error("Invalid tag");
  }
  tagsDb.push(trimmed);
  return tagsDb;
};
```

> 💡 Never assume a Server Function's argument came from the UI that calls it in your own code — validate it exactly like a request from a stranger, because that's genuinely what it is.

For anything sensitive, add an identity check too, not just validation:

```ts
// ✅ checks who's calling, not just what they're sending
"use server";

export const deleteTag = async (tag: string) => {
  const session = await getSession(); // pretend auth check
  if (!session) throw new Error("Not authorized");
  // ...only now touch tagsDb
};
```

> ❓ `getDbPassword`, from the Three Directives chapter, was marked `server-only`, not `"use server"`. Why does that difference matter?
>
> <details>
> <summary>Show answer</summary>
>
> _(`server-only` means "never reachable from the client, ever" — right for a database password, which should never be an HTTP endpoint at all. `"use server"` means the opposite: "reachable from the client, on purpose." Marking something sensitive with `"use server"` instead of `server-only` would turn a secret into a public endpoint by mistake.)_
>
> </details>

### SEO: only what's in the HTML gets indexed reliably

`HomePage`, back in the Hybrid Component chapter, calls `getTag()` on the server, so the tags already there when the page loads are real HTML — the same idea as Course 5's "What is Next.js?" chapter, readable by a search engine without running any JavaScript at all.

A tag added afterward, through `TagList`'s `addTag`, starts out differently — for that one visitor, in that one moment, it's a React state update layered on top of HTML that already arrived. A crawler that only reads HTML, and never clicks a button, wouldn't see it either, no differently than it wouldn't see any other client-only update.

> 💡 What saves this pattern from being an SEO problem: `addTag` writes to `tagsDb` for real, on the server. The next time anyone — a visitor, or a crawler — requests the page, `getTag()` picks up the change, and it arrives as real HTML again. Content only stays permanently invisible to search engines if it never makes it back to whatever the server renders from. The very first version of `TagList`, back before this course wired up `addTag` — the one that only ever called `setTags` — never would have: nothing it did was ever going to show up in anyone else's HTML, ever.

> 🔧 **Exercise:** view the page source for `/tags` (an actual "View Page Source," not DevTools) before adding a tag, add one, then reload and view source again. What's different across the three?

### Metadata: telling the crawler what the page actually is

Real HTML alone isn't the whole story — a crawler, and a chat app generating a link preview, both read one specific part of that HTML: a `metadata` export, another reserved name Next.js looks for, same family as `page.tsx` and `layout.tsx` from Course 5's Static Routes chapter — just an object instead of a component:

```ts
// src/app/tags/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse and add tags",
};

const TagsPage = async () => {
  /* ...unchanged */
};

export default TagsPage;
```

No directive needed — `metadata` is read on the server, the same way `page.tsx` itself is, and turned into real `<title>` and `<meta>` tags before anything reaches the browser.

### Dynamic metadata: one function per page, not one fixed object

A fixed `metadata` object works for a page that's always about the same thing. `/cats/[id]`, from Course 5's Dynamic Routes chapter, isn't — every `id` is a different cat, so the title has to be computed, not written once:

```ts
// src/app/cats/[id]/page.tsx
import type { Metadata } from "next";
import { getCat } from "@/model/cat";

interface CatPageProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({ params }: CatPageProps): Promise<Metadata> => {
  const { id } = await params;
  const cat = await getCat(Number(id));

  return { title: cat ? cat.name : "Cat not found" };
};

const CatPage = async ({ params }: CatPageProps) => {
  /* ...unchanged from Course 5 */
};

export default CatPage;
```

`generateMetadata` takes the exact same `params` prop as `CatPage` itself — same `Promise`, same `await` — and runs before the page renders. Visit `/cats/1`, and the tab, the search result, and any shared link all say "Whiskers," not a generic app name repeated on every route.

> ❓ Why can't `metadata` just stay a fixed object here, the way it is on the tags page?
>
> <details>
> <summary>Show answer</summary>
>
> _(A fixed object is written once, at build time, before any request happens — it has no way to know which `id` a visitor is about to load. `/cats/[id]` is one file answering for every cat, exactly like `CatPage` itself; the title needs the same per-request lookup the page's own content does, so it needs a function, not a static value.)_
>
> </details>

### `robots.ts` and `sitemap.ts` — two more reserved files

The same file-based idea extends one step further: `src/app/sitemap.ts` and `src/app/robots.ts` are reserved filenames too, each exporting a function instead of a component, each turned automatically into a real `/sitemap.xml` and `/robots.txt`:

```ts
// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { getCats } from "@/model/cat";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const cats = await getCats();

  return [
    { url: "https://example.com/tags" },
    ...cats.map((cat) => ({ url: `https://example.com/cats/${cat.id}` })),
  ];
};

export default sitemap;
```

Same shape as any async Server Component: `await getCats()`, before returning anything. The sitemap grows on its own as cats get added to the database — nobody has to remember to hand-edit a static `sitemap.xml` file the next time the data changes.

> 🔧 **Exercise:** add `generateMetadata` to `/tags` too — instead of a fixed `description`, make it read the current tag count from `getTag()` and include it, e.g. `"12 tags and counting"`.
