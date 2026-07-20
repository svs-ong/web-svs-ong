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

The server reads article data from `articles.json` and exposes:

- `GET /articles` — short article data (title, category, excerpt, date, etc.) for the home / articles list page.
- `GET /articles/:slug` — full detailed data for a single article page.
