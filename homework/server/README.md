A json-server used to mimic a HTTP based rest API for the react internship theoretical training.

## Installation

Make sure you have [Node.js](https://nodejs.org/en/) installed.

Then, open a terminal at the root of `server` and run:

```bash
npm install
```

## Usage

To start the server, run:

```bash
npm start
```

The server runs on [http://localhost:3000](http://localhost:3000).

### Articles

The server reads article data from `articles.json` and exposes:

- `GET /articles` — short article data (title, category, excerpt, date, etc.) for the home / articles list page.
- `GET /articles/:slug` — full detailed data for a single article page.

### Cats (used by `homework/next-caching`)

A small CRUD API over a list of cats, seeded from `cats.json`. Changes are kept **in memory only**: restarting the server, or calling `POST /cats/reset`, brings the original cats back.

Every `/cats` call waits **500 ms** on purpose, to behave like a slow database, and prints one line in the terminal:

```plaintext
[18:03:45.120] GET /cats → 200 (503 ms)
```

That log line is how you can tell whether a request really reached the server.

| Method   | Path             | Body                                    | Does                                        |
| -------- | ---------------- | --------------------------------------- | ------------------------------------------- |
| `GET`    | `/cats`          |                                         | lists every cat                             |
| `GET`    | `/cats/:id`      |                                         | one cat, or `404`                           |
| `POST`   | `/cats`          | `{ name, breed?, imageUrl? }`           | adds a cat with `0` likes                   |
| `PATCH`  | `/cats/:id`      | any of `{ name, breed, imageUrl, likes }` | changes the fields you send               |
| `POST`   | `/cats/:id/like` |                                         | adds one like on the server                 |
| `DELETE` | `/cats/:id`      |                                         | removes the cat                             |
| `POST`   | `/cats/reset`    |                                         | restores the cats from `cats.json`          |

Cat pictures are served from the `images/` folder at `/images/<name>.jpg`, without the delay.

To change the delay, set `CATS_DELAY_MS` before starting, for example `CATS_DELAY_MS=1500 npm start` (macOS / Linux / Git Bash) or `$env:CATS_DELAY_MS=1500; npm start` (PowerShell).
