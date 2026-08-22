# Next.js Intro

<div style="float: right;">0 → 10 min</div>

**Next.js is React, plus the missing pieces of a real website.**

A website needs an answer to three basic questions. React alone doesn't come with one for any of them:

- **What shows up at `/contact`?** — React only renders components. Deciding _which_ component belongs to _which_ URL is a separate job — Course 1 solved it by adding `react-router-dom` on top.
- **What does the visitor see before the JavaScript loads?** — A React app's HTML starts out empty. Nothing is on screen until the browser finishes downloading and running its JavaScript.
- **Where does the page's data come from?** — React renders whatever data it's handed, but fetching that data — a database, an API — happens outside React, on some backend you build or find separately.

Next.js answers all three, built in:

- **Routing** — folder names decide what shows up. Create a folder, add a page file inside it, and that URL exists — no router library to install or configure.
- **Rendering** — the page is built on the server, before it's sent. The browser receives real, filled-in HTML immediately, instead of an empty page waiting for JavaScript to finish.
- **Backend** — a route can also be a tiny API. The same file-based folders can send back data too, so a page can get what it needs without a separate server running somewhere else.

> 🔧 **Try it, in Chrome:**
>
> 1. Open any plain React (Vite) site.
> 2. Open DevTools (`F12`, or right-click → Inspect).
> 3. Press `Ctrl+Shift+P` (`Cmd+Shift+P` on Mac) — this opens the Command Menu inside DevTools.
> 4. Type `disable javascript`, click the matching result.
> 5. Reload the page (`Ctrl+R` / `Cmd+R`).
>
> Blank. A plain React app is just an empty `<div id="root">` until JavaScript runs — nothing shows up before that, because React itself builds the whole page inside the browser.
> _Figure: `<div id="root"></div>` — empty. Right after it, `<script type="module" src="/src/main.tsx">`._
>
> That script **is** the React app:
>
> - It only runs in the browser. That's the client side.
> - It builds the entire page in memory, then stuffs it into `<div id="root">`.
> - Disable it, and `#root` stays empty forever — nothing else was ever going to fill it in.

![A plain React app with JavaScript disabled — the page is blank, and the Elements panel shows an empty `<div id="root">`, followed by `<script src="/src/main.tsx">`](./img/react-app-without-javascript.png)

> 🔧 **Try it:** same 5 steps, on a Next.js site instead (or the app from Preparation, once it's running). JavaScript still disabled, page reloaded — and the page still shows up. The HTML was already built on the server before it reached the browser.

<div style="float: right;">10 → 25 min</div>

## Server Component

Plain version: a Server Component is written and finished entirely in the server's back office. Only the finished page gets mailed out — the visitor never sees how it was made, and can't touch it.

**Server Components are the default in Next.js.** Every file in `app/` is one, unless it opts out. That includes `HomePage`, sitting in `src/app/page.tsx` since [Preparation](modul-2/nextjs/preparation.md) — no directive was ever added to it, so it already is one.

```ts
// src/app/page.tsx — Server Component, the default, no directive needed
const HomePage = () => {
  console.log("rendered on the server"); // shows up in the terminal, not the browser

  return (
    <Container>
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <Typography variant="h4">It works</Typography>
        <Button variant="contained">Click me</Button>
      </Stack>
    </Container>
  );
};

export default HomePage;
```

A Server Component:

- Runs on the server, before anything reaches the browser.
- Can use `async`/`await` directly — call a database or an API, no separate effect needed.
- Sends only its rendered HTML to the browser — its own code never gets shipped.
- Cannot use hooks (`useState`, `useEffect`) or browser-only things (`onClick`, `localStorage`, `window`) — there's no browser yet when it runs.

That last rule is the one place a Server Component can't go — a button that needs `onClick`, a form that needs to track what's typed. That's exactly what **Client Component** is for, next.

### Example: `LikeButton`, still just a Server Component

`HomePage`'s `Button` from Preparation just sits there — clicking it does nothing yet. Pull it into its own `LikeButton` component:

```ts
// src/components/LikeButton.tsx — a Server Component, no directive
import { Button } from "@mui/material";

export const LikeButton = () => {
  console.log("LikeButton rendered on the server");
  const likes = 12;

  return <Button variant="contained">Like ({likes})</Button>;
};
```

```ts
// src/app/page.tsx — HomePage now uses LikeButton instead of the plain Button
import { Container, Stack, Typography } from "@mui/material";
import { LikeButton } from "@/components/LikeButton";

const HomePage = () => (
  <Container>
    <Stack spacing={2} sx={{ alignItems: "center" }}>
      <Typography variant="h4">It works</Typography>
      <LikeButton />
    </Stack>
  </Container>
);

export default HomePage;
```

> 💡  **Try it:** run the app, open the page, click the button. Nothing happens — no click handler yet — but `console.log` still ran once, in your terminal, the moment the page was requested.

> ❓**A Server Component can't hold state.** `likes` isn't in this version at all — there's nowhere on the server to keep it.
> Why not?
>
> <details>
> <summary>Show answer</summary>
>
> _(A Server Component runs once, on the server, to produce HTML — then it's done running. Nothing is left alive afterward to notice a click and update a number. State needs something that keeps running to react to events over time; on the server, nothing does. The browser is what stays alive after the page loads — which is exactly why state lives there instead.)_
>
> </details>

**Hooks (`useState`, `useEffect`, and the rest) can't be used here either — same reason.** Every hook assumes something will call it again later, in response to something happening. A Server Component never gets called again; it rendered once, and it's finished.

Making `Like` actually count clicks needs exactly what a Server Component doesn't have: something alive in the browser, reacting to events. That's **Client Component**, next.

<div style="float: right;">25 → 40 min</div>

## Client Component

Plain version: a Client Component is handed to the visitor along with the pen. They can still write on it, click things, type into it — and it reacts.

A component becomes a Client Component the moment it opts in with `"use client"` at the top of the file:

```ts
// src/components/LikeButton.tsx — now a Client Component
"use client";
import { useState } from "react";
import { Button } from "@mui/material";

export const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  console.log("rendered on the client"); // shows up in devtools, not the terminal

  return (
    <Button variant="contained" onClick={() => setLikes((prev) => prev + 1)}>
      Like ({likes})
    </Button>
  );
};
```

Same component as the last chapter, extended: `"use client"` at the top, a `useState` for `likes`, and an `onClick` to change it. None of the three works without the others — `onClick` needs `"use client"` to run at all, and `setLikes` needs `useState` to exist in the first place. And notice what didn't change: `src/app/page.tsx` — `HomePage` still renders `<LikeButton />` exactly as before, with no directive of its own. It's still a Server Component; only `LikeButton` became a Client Component.

|                     | Server Component (default)                 | Client Component (`"use client"`)       |
| ------------------- | ------------------------------------------ | --------------------------------------- |
| Runs                | on the server                              | in the browser                          |
| Sent to the browser | just its rendered HTML                     | its full JavaScript, plus HTML          |
| Can use             | `async`/`await`, direct database/API calls | `useState`, `useEffect`, event handlers |
| Cannot use          | hooks, `onClick`, `localStorage`, `window` | —                                       |

**Use a Server Component when:** fetching data, reading from a database, rendering static content — the default, and the more performant choice.

**Add `"use client"` only when:** the component needs a hook, an event handler (`onClick`, `onChange`), or a browser API (`localStorage`, `window`).

> 💡 **Keep the boundary small.** `HomePage` never needed `"use client"` at its own top just because `LikeButton`, one component inside it, needs `onClick` — the directive stayed on `LikeButton` alone, and the rest of the page (and its data fetching) stayed on the server. This is "one component, one job" from React Patterns, applied to a boundary Next.js adds on top of React.

> ❓ Delete the `"use client"` line from `LikeButton` and try running the app again. What happens?
>
> <details>
> <summary>Show answer</summary>
>
> _(Next.js refuses to build: `Error: Event handlers cannot be passed to Client Component props.` `onClick` is a function again, and a Server Component still can't ship a function to the browser — the same rule from the last chapter, just run into from the other direction.)_
>
> </details>

<div style="float: right;">40 → 55 min</div>

## Async Component

Plain version: the old way shows a spinner, waits for data to arrive over the network, then swaps the spinner for the real content — two trips to the browser. The new way waits for the data first, on the server, and only ever sends the finished content — one trip, nothing to swap.

### The old approach: fetch inside a Client Component

```ts
// src/lib/getLikes.ts — a pretend API call, shared by both versions below
export const getLikes = async (): Promise<number> => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // pretend network delay
  return 12;
};
```

```ts
// src/components/LikeCount.tsx — old approach: Client Component + useEffect
"use client";
import { useState, useEffect } from "react";
import { Typography, CircularProgress } from "@mui/material";
import { getLikes } from "@/lib/getLikes";

export const LikeCount = () => {
  const [likes, setLikes] = useState<number | null>(null);

  useEffect(() => {
    getLikes().then(setLikes);
  }, []);

  if (likes === null) return <CircularProgress size={20} />;

  return <Typography>{likes} likes</Typography>;
};
```

Three moving parts just to show one number: a `null` state to mean "still loading," an effect to kick off the fetch, and a spinner to cover the wait. The browser has to download all of that code before any of it can even start fetching.

### The new approach: an `async` Server Component

```ts
// src/components/LikeCount.tsx — new approach: an async Server Component
import { Typography } from "@mui/material";
import { getLikes } from "@/lib/getLikes";

export const LikeCount = async () => {
  const likes = await getLikes();

  return <Typography>{likes} likes</Typography>;
};
```

No `useState`, no `useEffect`, no spinner to write by hand. The component itself waits with `await`, on the server, before it renders anything — by the time HTML reaches the browser, the number is already sitting there.

> 💡 This only compiles in a Server Component. `async` on a Client Component's function isn't allowed — nothing in the browser can pause and wait like that before rendering; only the server can.

### The disadvantage: it can't reload itself

Add a "Refresh" button next to the count, the obvious way:

```ts
// ❌ still inside the async Server Component above
<Button onClick={() => location.reload()}>Refresh</Button>
```

`location.reload()` is the only kind of "refresh" a Server Component can ever offer — the whole page, from scratch. It rendered once, produced HTML, and it's finished; there's no way to ask just `LikeCount` to fetch again on its own. Real refresh — just this number, no full-page reload — needs `onClick`, which needs `"use client"`, which means going back to the old approach: `likes` back in `useState`, and the fetch pulled out into something a click can call again.

That's the trade this chapter has been building to: an async Server Component is simpler and faster for data that's shown once and left alone; a Client Component is what's needed the moment "left alone" stops being true.

### Quiz: Server or Client?

Six components, none of them shown yet. For each one: Server Component, or Client Component?

> ❓ **1.** A page that reads articles from a database and lists their titles. Nothing on it responds to a click.
>
> <details><summary>Show answer</summary>
>
> _(Server. Just data in, HTML out — the async-fetch case from earlier in this chapter.)_
>
> </details>

> ❓ **2.** A search box: typing into it filters a list of results as you type, with no page reload.
>
> <details><summary>Show answer</summary>
>
> _(Client. Typing means `onChange`, and filtering "as you type" means the typed text has to live in `useState` somewhere.)_
>
> </details>

> ❓ **3.** A component that checks `localStorage` to remember whether a sidebar was left open or closed.
>
> <details><summary>Show answer</summary>
>
> _(Client. `localStorage` only exists in the browser — a Server Component has no browser to read it from.)_
>
> </details>

> ❓ **4.** A privacy policy page: a wall of static text, nothing on it ever changes.
>
> <details><summary>Show answer</summary>
>
> _(Server. No state, no event, no browser API — the default, and nothing here asks for anything more.)_
>
> </details>

> ❓ **5.** A dropdown menu that opens when clicked, and closes when clicked again.
>
> <details><summary>Show answer</summary>
>
> _(Client. "Opens when clicked" is an `onClick`, and "stays open until clicked again" is state that has to be remembered between renders — `useState`.)_
>
> </details>

> ❓ **6.** A product page that fetches prices from an API and lists them, with an "Add to cart" button next to each one.
>
> <details><summary>Show answer</summary>
>
> _(Both — this is the trick one. The page itself (the fetching, the list) is a Server Component, same as question 1. Only the "Add to cart" button needs `onClick`, so only the button becomes its own small Client Component, imported into the page — exactly the `LikeButton`-inside-`HomePage` shape from the last two chapters, and "Keep the boundary small" from the Client Component chapter.)_
>
> </details>

<div style="float: right;">55 → 75 min</div>

## Static Routes

Plain version: every folder inside `src/app/` is a route. A handful of filenames inside that folder have a fixed job — Next.js reads them itself, nobody registers them anywhere.

- `page.tsx` — makes the segment visible at its URL. No `page.tsx`, no route — a folder alone renders nothing.
- `layout.tsx` — shared UI wrapping the segment and everything nested inside it.
- `loading.tsx` — shown automatically while `page.tsx` is still loading.
- `error.tsx` — shown automatically if `page.tsx` throws.
- `not-found.tsx` — shown when nothing matches the URL, or when `notFound()` is called.
- `route.ts` — an API endpoint instead of a page.

**Route groups** use parentheses to organize files without adding a URL segment: `app/(marketing)/about/page.tsx` still resolves to `/about`, not `/marketing/about`.

### One rule that's the opposite of everywhere else in this course: default export, not named

`LikeButton`, `getLikes`, `getCats` further on — every regular component and function in this course exports **by name**. `page.tsx`, `layout.tsx`, and the rest of the reserved files above are the one exception: Next.js's router looks specifically for a **default export**. A named export is invisible to it.

```ts
// ❌ src/app/contact/page.tsx — named export, the router finds nothing here
export const ContactPage = () => <Typography variant="h4">Contact</Typography>;
```

```ts
// ✅ src/app/contact/page.tsx — default export, this is what the router looks for
const ContactPage = () => <Typography variant="h4">Contact</Typography>;

export default ContactPage;
```

> 💡 The build fails on the named-export version — Next.js expects this file to hand it a default export, and there isn't one.

### Example: Home, Contact, and a not-found page, inside a shared layout

`src/app/layout.tsx` is the **root layout** — required, and the only place `<html>`/`<body>` are allowed. Every page in the app renders inside it, as its `{children}`. Any folder can add its own `layout.tsx` too, nesting one layer deeper, wrapping only the routes inside that folder:

```plaintext
src/app/
├── layout.tsx           → wraps every page below
├── page.tsx             → /
├── contact/
│   ├── layout.tsx       → wraps only /contact, nested inside layout.tsx above
│   └── page.tsx         → /contact
└── not-found.tsx        → shown for any URL that doesn't match
```

```ts
// src/app/layout.tsx — the root layout, present on every page
import { FC } from "react";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <html lang="en">
    <body>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My Next.js App</Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>{children}</Container>
    </body>
  </html>
);

export default RootLayout;
```

```ts
// src/app/page.tsx — becomes {children} above, at /
import { Typography } from "@mui/material";

const HomePage = () => <Typography variant="h4">Home</Typography>;

export default HomePage;
```

```ts
// src/app/contact/layout.tsx — wraps only /contact, nested inside RootLayout's {children}
import { FC } from "react";
import { Alert } from "@mui/material";

interface ContactLayoutProps {
  children: React.ReactNode;
}

const ContactLayout: FC<ContactLayoutProps> = ({ children }) => (
  <>
    <Alert severity="info" sx={{ mb: 2 }}>
      We usually reply within 24 hours.
    </Alert>
    {children}
  </>
);

export default ContactLayout;
```

```ts
// src/app/contact/page.tsx — becomes {children} above, at /contact
import { Typography } from "@mui/material";

const ContactPage = () => <Typography variant="h4">Contact</Typography>;

export default ContactPage;
```

```ts
// src/app/not-found.tsx — becomes {children} in RootLayout, for any unmatched URL
import { Typography } from "@mui/material";

const NotFound = () => <Typography variant="h4">Page not found</Typography>;

export default NotFound;
```

Every page above is a `{children}`, slotted into a layout, nowhere else. Follow where each route actually lands:

```plaintext
RootLayout                      (AppBar — every route)
└── {children}
    ├── HomePage                 at /
    ├── ContactLayout             at /contact and anything under it
    │   └── {children}
    │       └── ContactPage       at /contact
    └── NotFound                  anything unmatched
```

Visit `/` — `RootLayout` renders, `HomePage` fills its `{children}`: the `AppBar`, then "Home". Visit `/contact` — `RootLayout` renders again (same `AppBar`, not remounted), but this time its `{children}` is `ContactLayout`, which renders `ContactPage` as _its own_ `{children}` — the info banner appears, then "Contact", two layouts deep. Visit anything nothing matches, and `{children}` becomes `NotFound` instead, straight inside `RootLayout` — `ContactLayout` never even runs, since the URL never matched `/contact` in the first place.

> 🔧 **Try it:** create all five files, run the app, and visit `/`, `/contact`, and a URL that doesn't exist, like `/nothing-here`. Notice the `AppBar` stays put on every one of them, the info banner only shows on `/contact`, and `NotFound` only shows on the last one.

> 💡 Everything about _where components and hooks live_ — `components/`, `hooks/`, `features/` — still works exactly like any React app; see [Structure the app](modul-2/best-practices/best-practices.md) in React Patterns. `app/` only holds routing: pages, layouts, and the other reserved files above.

<div style="float: right;">75 → 95 min</div>

## Dynamic Routes

Plain version: a static route is one file answering for one URL. A dynamic route is one file answering for _many_ URLs — `/cats/1`, `/cats/2`, `/cats/3` — because the part that changes is a folder name in square brackets, not a real folder made for every single cat.

`[id]` in a folder name is a **dynamic segment**: `app/cats/[id]/page.tsx` matches `/cats/1`, `/cats/2`, any value at all in that slot.

### The data: a couple of functions that give back cats

```ts
// src/model/cat.ts
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

export const getCats = async (): Promise<Cat[]> => cats;

export const getCat = async (id: number): Promise<Cat | undefined> =>
  cats.find((cat) => cat.id === id);
```

Same shape as `getLikes` from the Async Component chapter — a function that `await`s, even though this mock array doesn't really need it, so a real database call could replace the inside later without changing anything that calls it.

### The list: every cat, one route

```ts
// src/app/cats/page.tsx
import { Avatar, Typography, Stack } from "@mui/material";
import { getCats } from "@/model/cat";

const CatsPage = async () => {
  const cats = await getCats();

  return (
    <Stack spacing={1}>
      <Typography variant="h4">Cats</Typography>
      {cats.map((cat) => (
        <Stack key={cat.id} direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Avatar src={cat.imageUrl} alt={cat.name} />
          <Typography>
            {cat.name} — {cat.breed}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default CatsPage;
```

An async Server Component again, same shape as `LikeCount` — no directive, just `await getCats()` before anything renders.

### The single cat: one route, many URLs

```ts
// src/app/cats/[id]/page.tsx
import { Box, Stack, Typography } from "@mui/material";
import { notFound } from "next/navigation";
import { getCat } from "@/model/cat";

interface CatPageProps {
  params: Promise<{ id: string }>;
}

const CatPage = async ({ params }: CatPageProps) => {
  const { id } = await params;
  const cat = await getCat(Number(id));

  if (!cat) notFound();

  return (
    <Stack spacing={2} sx={{ alignItems: "center" }}>
      <Box
        component="img"
        src={cat.imageUrl}
        alt={cat.name}
        sx={{ width: 300, borderRadius: 2 }}
      />
      <Typography variant="h4">
        {cat.name} — {cat.breed}
      </Typography>
    </Stack>
  );
};

export default CatPage;
```

Two things only a `[id]` folder gives a page: the `params` prop, matching the folder name, and `params` arriving as a `Promise` — so the component itself has to be `async`, and `id` only exists after `await params`. `notFound()` hands off straight to `not-found.tsx` from the last chapter the moment an `id` doesn't match any cat — same file, same job, for a route it's never heard of.

> 🔧 **Exercise:** add a fourth cat to the `cats` array in `src/model/cat.ts`, then visit `/cats/4`. No new file, no new folder, nothing touched under `src/app/` at all — and the page still renders it. That's the actual point of a dynamic segment: `src/app/cats/[id]/page.tsx` was never one route, it was a template for as many routes as the data needs.

<div style="float: right;">95 → 100 min</div>

## Navigation

Plain version: `<Link>` is the everyday way to move between pages — a visitor clicks it, same as any link. `router.push()` is for moving somewhere _because of_ something — after a form submits, after a timer runs out — code deciding to navigate, not a click on a link itself. `redirect()` is that same idea, but decided on the server, before anything is even sent to the browser.

|                | `<Link>`                             | `router.push()`                                   | `redirect()`                                    |
| -------------- | ------------------------------------ | ------------------------------------------------- | ----------------------------------------------- |
| Where it works | Server or Client Component           | Client Component only (`useRouter` is a hook)     | Server Component only, while rendering          |
| Triggered by   | the visitor clicking it              | code, after something happens (a submit, a timer) | the component itself, before rendering anything |
| Example use    | ordinary navigation, a list of links | redirecting after a successful login              | bouncing a signed-out visitor off a page        |

### `<Link>` — works in a Server Component or a Client Component

```ts
// src/app/cats/page.tsx — a Server Component, no directive needed
import Link from "next/link";
import { Avatar, Typography, Stack } from "@mui/material";
import { getCats } from "@/model/cat";

const CatsPage = async () => {
  const cats = await getCats();

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
};

export default CatsPage;
```

`<Link>` isn't a hook — it's just a component, so it needs nothing extra to render inside a Server Component like `CatsPage` above. Next.js still wires up fast navigation with no full page reload, using JavaScript already running in the browser.

> ⚠️ MUI has its own `Link` too — styled text, no routing behavior at all. Import both by their usual names in the same file, and they collide:
>
> ```ts
> // ❌ two different things, both trying to be called "Link"
> import Link from "next/link";
> import { Link } from "@mui/material";
> ```
>
> Alias one, and compose them the same way `Button component={Link}` did in the Static Routes example:
>
> ```ts
> // ✅ MUI's styling, next/link's routing, one element
> import NextLink from "next/link";
> import { Link } from "@mui/material";
>
> const CatLink = () => (
>   <Link component={NextLink} href="/cats/1">
>     Whiskers
>   </Link>
> );
> ```
>
> `Button` takes the exact same `component` prop, no aliasing needed there since MUI's `Button` isn't called `Link` in the first place — this is the pattern the Static Routes example used from the start:
>
> ```ts
> // ✅ a routable Button, same composition, no naming collision to work around
> import NextLink from "next/link";
> import { Button } from "@mui/material";
>
> const CatButton = () => (
>   <Button component={NextLink} href="/cats/1" variant="contained">
>     Whiskers
>   </Button>
> );
> ```

### `router.push()` — only in a Client Component

Sometimes navigation has to happen _from code_, not a link the visitor clicks directly:

```ts
// src/components/LoginForm.tsx — a Client Component
"use client";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

export const LoginForm = () => {
  const router = useRouter();

  const handleLogin = () => {
    // ...actually log the user in first
    router.push("/dashboard");
  };

  return <Button onClick={handleLogin}>Log in</Button>;
};
```

`useRouter` is a hook — same rule as `useState` from the Client Component chapter: it only runs in the browser, so `"use client"` is required. `router.push` behaves like a visitor clicking a `<Link>`; `router.replace` does the same without leaving a "back" entry in browser history.

### `redirect()` — only in a Server Component

The server-side counterpart: deciding to send the visitor elsewhere before anything renders at all — bouncing a signed-out visitor away from a page that needs one, for instance:

```ts
// src/app/dashboard/page.tsx — a Server Component
import { redirect } from "next/navigation";
import { Typography } from "@mui/material";

const DashboardPage = async () => {
  const isLoggedIn = await checkSession(); // pretend auth check

  if (!isLoggedIn) redirect("/login");

  return <Typography variant="h4">Dashboard</Typography>;
};

export default DashboardPage;
```

`redirect()` only works while something is still rendering, on the server — call it inside a Client Component's `onClick` and it does nothing useful there. That's exactly what `router.push` is for instead.

> 💡 Same rule as every chapter before this one: a hook (`useRouter`) needs `"use client"`. Something that only makes sense while a Server Component is still rendering (`redirect`, `notFound`) stays on the server. `<Link>` is the one exception that works in either — it isn't a hook at all, just a component.
