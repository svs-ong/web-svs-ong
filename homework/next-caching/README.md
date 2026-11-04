# Cat Café · Next.js caching lab

Starter project for the **Next.js Caching** lesson ([web.svs.ong → Modul 3 → Next.js Caching](https://web.svs.ong/#/modul-3/next-caching/next-caching)).

It is a small cat app with two pages that read and change the same list of cats:

| Page           | URL            | What you can do                                  |
| -------------- | -------------- | ------------------------------------------------ |
| Cat Gallery    | `/cats`        | see every cat A–Z, like, add, rename, remove     |
| Top Cats       | `/leaderboard` | see the cats sorted by likes, like them          |

The data comes from the Express server in `homework/server`, and **every call to it takes 500 ms**. Right now the app caches nothing, so every click waits for that slow server. The lesson walks you through adding caching step by step.

## Getting started

You need two terminals.

**Terminal 1: the cats API** (port 3000)

```bash
cd homework/server
npm install
npm start
```

Leave it running: it prints one line for every request that reaches it, for example `[18:03:45.120] GET /cats → 200 (503 ms)`.

**Terminal 2: this app** (port 3001)

```bash
cd homework/next-caching
npm install
npm run prod
```

Open [http://localhost:3001](http://localhost:3001).

## Scripts

| Script         | Does                                                                       |
| -------------- | -------------------------------------------------------------------------- |
| `npm run prod` | builds and starts the production app on port 3001 — **use this in the lesson** |
| `npm run dev`  | development mode on port 3001                                              |
| `npm run build`| production build only                                                      |
| `npm start`    | starts the last production build                                           |
| `npm run lint` | ESLint                                                                     |

> Caching only behaves like the real thing in a production build. In `npm run dev`, links are never prefetched and every code change throws the cache away. Stop the app (`Ctrl + C`) and run `npm run prod` again after each change.

The API must be running while `npm run prod` builds, because a build that uses `"use cache"` already reads the cats once.

## Where the lesson's changes go

| File                 | What lives there                                                   |
| -------------------- | ------------------------------------------------------------------ |
| `src/lib/cats.ts`    | `getCats()` — reads the cats from the API                          |
| `src/lib/actions.ts` | Server Actions — like, add, rename, remove, reset                  |

Everything else (components, pages, styles) can stay as it is.

## Useful tools in the app

- **🕒 Data fetched at …** above each list shows when `getCats()` really talked to the API, and how old that data is now.
- **🙋 Guest** in the header: click it to give this browser a name (stored in a cookie). Handy when you open the app in two browsers as two different users.
- **↺ Reset** puts the original cats back.
