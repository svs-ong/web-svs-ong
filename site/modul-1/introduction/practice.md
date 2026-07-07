# Practice Work

## Individual Work

### Prank a friend with DevTools

1. Open any social media chat in your browser — WhatsApp Web, Messenger, Instagram DM, Discord, whatever you and a friend both use.
2. Right-click one of their message bubbles → **Inspect**.
3. Find the text node in the Elements panel and double-click it to edit it live — change it to something that makes it look like you can see a message they never sent. A few ideas:
   - "I just tried to microwave ice cream to make it colder."
   - "I just lost an argument with a chair."
   - "I'm not late. I'm just giving everyone a chance to miss me."
   - "I just made eye contact with a pigeon and now I owe it money."
   - "I am currently under maintenance. Please try again after coffee."
   - Be creative 😄.
4. Screenshot it, send it to that friend as a harmless joke, then tell them how you did it.
5. Refresh the page. Notice everything is back to normal.

> ❓ Why did refreshing undo your change? What does that tell you about what you actually edited — the real conversation, or just what your browser rendered?

> 💡 This only works because the page is just a tree of HTML elements you can inspect and edit locally — nothing you change here is sent anywhere or seen by anyone else. Use it for a fun reveal with people who'll laugh, not to actually deceive anyone (never screenshot-edit anything financial, official, or hurtful).

## Team Work

Shared project — every team builds on the same starting point and keeps extending it across the internship. This is where Course 1 leaves the project for Course 2 (Git) and Course 3 (Layout) to continue.

1. **Team Formation**
   - Meet with your team members.
   - Choose a creative, memorable team name — you'll use it as your branch name starting next course.
   - Choose a group leader for the next week.

2. **Repository Access**
   - Download the repository [web.svs.ong repo](https://github.com/svs-ong/web-svs-ong).
   - Keep just the homework folder. Delete the rest.

3. **Build the Page Skeleton**
   - Starting point is in `homework/html`: `index.html` (the blog home — article list with search and category filters), `article.html` (single article), `about.html`, and `contact.html`. Each currently is just raw, unstructured content.
   - Using semantic HTML, give every page a proper structure: `header` (logo + nav linking Blog / About / Contact), `main` content area, `footer`.
   - On mobile, the nav collapses behind a hamburger icon that opens an overlay menu — see `design.pdf` for how it should look and behave.
   - **Make sure each page follows the same patters**

4. **Start Stylizing the Home Page**
   - Follow the mobile-first mockups in `design.pdf` to style the home page with what you learned this course (text styling, box model, selectors): the search bar, the pill-shaped category filters, and the article cards.
   - Match the look and feel — serif display font for headings, cream background, navy accent color for buttons and tags.
   - Do your best — you'll come back to finish this with flexbox/grid (the desktop multi-column card grid) after the Layout course.

   > 💡 A few patterns that will keep the pages consistent:
   >
   > - **File structure** — make sure each page follows the same patters.
   > - **Semantic over generic** — reach for `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>` instead of `<div>` soup; only use a `<div>` when no semantic tag fits.
   > - **One `<h1>` per page**, then a logical heading order (`h2` → `h3`) — don't skip levels just to get a smaller font size.
   > - **Content vs. presentation** — HTML describes what something _is_ (a nav, a list, a button); it never describes how it looks. If you're picking a tag for its default styling, use CSS instead.
   > - **Reusable structure** — every page shares the same `<head>` boilerplate (meta tags, title format, link to `styles.css`) and the same header/footer markup, so they stay in sync as the project grows across courses.
   > - **Class-based CSS selectors over tag/ID selectors** — `.card-title` is reusable and low-specificity; bare `h2 { }` or `#title` rules get fragile fast once the page grows.

5. **Create Your Team's Branding**
   - Design a simple logo for your blog — a wordmark, an emoji-based mark, a quick sketch, whatever fits your team name. It doesn't need to be professional, just yours.
   - Add a favicon to the home page based on your logo.

   > ❓ What actually is a favicon, and where does the browser look for it if you don't tell it anything? Look it up before you add yours.
