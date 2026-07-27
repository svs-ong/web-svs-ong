# Practice

## Starter

Everyone works through this on their own before the team homework below — a checkpoint, not a team deliverable.

### 🔧 Exercise: Responsive News Homepage

Colors: `.featured` `#3B82F6` · `.news-1` `#10B981` · `.news-2` `#8B5CF6` · `.news-3` `#F59E0B`.

`.featured` and `.sidebar` are the two halves of the page — the sidebar itself contains 3 stacked news cards, so `.sidebar` has to work as both a flex **item** (inside `.news-layout`) and a flex **container** (for its own 3 cards) at the same time.

**Requirements:**

- Phone (default, no media query): `.news-layout` is a column. `.featured` comes first, full width; the 3 news cards inside `.sidebar` are stacked underneath it, also full width.
- 768px+: `.news-layout` switches to a flex **row**. `.featured` gets `flex: 2` and `.sidebar` gets `flex: 1`, so the featured story stays about twice as wide as the sidebar at any window width.
- `.sidebar` is its own **nested** flex container — a column stacking its 3 news cards — completely independent of whether `.news-layout` is currently a row or a column.
- Add a `20px` `gap`: between `.featured` and `.sidebar`, and between the 3 cards inside `.sidebar`.
- Every article gets its icon centered above the heading, sized noticeably larger than the heading text.

**Verify in devtools:**

- Below 768px: one column — `.featured`, then the 3 news cards stacked underneath, everything full width.
- At 768px+: two columns side by side; `.featured` stays ~2× the width of `.sidebar` no matter how far you keep widening.
- At every width, the 3 cards inside `.sidebar` stay stacked vertically — that layout never depends on the page's own breakpoint.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Responsive News Homepage</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
    />
  </head>
  <body>
    <div class="news-layout">
      <article class="featured">
        <i class="fa-regular fa-newspaper"></i>
        <h1>Featured Story</h1>
        <p>
          This is today's main headline. It should receive the most attention
          and therefore occupy more space on larger screens.
        </p>
      </article>

      <aside class="sidebar">
        <article class="news-card news-1">
          <i class="fa-solid fa-earth-europe"></i>
          <h2>World News</h2>
          <p>Global events shaping today's headlines.</p>
        </article>

        <article class="news-card news-2">
          <i class="fa-solid fa-laptop-code"></i>
          <h2>Technology</h2>
          <p>Latest updates from the tech industry.</p>
        </article>

        <article class="news-card news-3">
          <i class="fa-regular fa-futbol"></i>
          <h2>Sports</h2>
          <p>Highlights from today's biggest matches.</p>
        </article>
      </aside>
    </div>
  </body>
</html>
```

![ReferenceImage](./img/dashboard-design.png)

## Team Work

Same shared project from Course 1 — continue building on your team's repo, together.

**Goal:** every page in your homework repo — `index.html`, `about.html`, `contact.html`, `article.html` — fully styled to match `design.pdf`, mobile _and_ desktop.

**Process, for every page:** style the mobile layout first, with no media query at all — get it matching `design.pdf`'s phone mockups completely before you write a single `@media`. Only once that's done do you add a `min-width: 768px` query and build the desktop layout from `design.pdf`'s desktop mockups on top of it, using flexbox/grid. Don't jump ahead to desktop on one page while another is still unstyled on mobile.

What that means per page:

- **Header/nav** (shared by all four pages) — Mobile: a hamburger icon opens a full-screen overlay menu with the links stacked in a column. Desktop: the hamburger disappears and the logo + Blog/About/Contact links sit in one flex row instead.
- **Home page** — Mobile: the search bar and pill-shaped category filters wrap with `flex-wrap` instead of overflowing; article cards are one per row. Desktop: the article cards switch to a 2-column CSS Grid (`grid-template-columns: repeat(2, 1fr)`) with even `gap`.
- **About & Contact pages** — stay a single readable column on both mobile and desktop (no grid needed here) — but they still need the same styled header/footer shell as the home page.
- **Article page** — stays single-column on both mobile and desktop; the avatar + author + date row uses flexbox, and the tags at the bottom wrap with `flex-wrap`.

> 💡 Reuse the same header/footer markup and the same class names (`.card`, `.pill`, `.tag`, ...) across all four pages — that's what lets one desktop media query on the shared header/footer styles cover every page, instead of rewriting it four times.
