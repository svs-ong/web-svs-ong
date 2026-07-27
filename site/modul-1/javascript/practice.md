# Practice

## Starter

Everyone works through this on their own before the team work below — a checkpoint, not a team deliverable.

### 🔧 Exercise: Fetch the Articles

**Step 1 — Install Node.js/npm.** Search it yourself ("how to install Node.js") and install it — `npm` comes bundled with it, you don't install it separately. Confirm it worked in a terminal:

```bash
node -v
npm -v
```

**Step 2 — Start the server.** Open a terminal in `homework/server` and follow its own `README.md`:

```bash
npm install
npm start
```

Confirm it's actually running by opening `http://localhost:3000/articles` directly in your browser — you should see the raw article data as JSON.

**Step 3 — Starter page.** With the server still running, create this page:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fetch Practice</title>
  </head>
  <body>
    <h1>Article Titles</h1>
    <div id="titles"></div>

    <script src="script.js"></script>
  </body>
</html>
```

**Step 4 — Write `script.js` using `async`/`await` and `try`/`catch` — no `.then()`.** Fetch `http://localhost:3000/articles`, map the response down to just the titles, then insert each title into the `#titles` div (one `<p>` per title, created and appended — not `innerHTML`).

```javascript
async function loadTitles() {
  try {
    // fetch + await response.json() here
    // map the articles down to just their titles
    // create a <p> per title and append it into #titles
  } catch (error) {
    // what should happen if the fetch fails or the server is down?
  }
}

loadTitles();
```

**Verify:**

- `node -v` and `npm -v` both print a version number.
- `http://localhost:3000/articles` loads valid JSON in the browser.
- Opening your page (server running) shows one line of text per article title inside `#titles` — nothing hardcoded in the HTML.
- Stop the server and reload the page — your `catch` block should run instead of the page silently doing nothing.

---

## Team Work

Same shared project from Course 1 — continue building on your team's repo, together.

Fetching in the console proved the data's there — now wire it into the real site. Replace the hardcoded article cards in `index.html` with cards built from the live `/articles` data.

- Write a script that runs on page load, fetches `http://localhost:3000/articles`, and for each article builds the same card markup you already styled in the Layout course (`.card`, `.pill`, ...) — then inserts it into the page instead of the hardcoded cards.
- The category filter pills should now filter the *fetched* data by `article.category`, not something baked into the HTML.
- Clicking a card should take you to `article.html?slug=...` using that article's `slug`. `article.html` should then fetch `http://localhost:3000/articles/:slug` and fill in the detail page from that response, instead of always showing the same static article.

> 💡 Keep fetching and rendering as two separate functions — one gets the data, another turns data into HTML. That split is what lets you reuse the rendering logic for both the home page list and the single article page.
