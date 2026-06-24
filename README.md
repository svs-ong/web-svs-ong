# SVS Web Development Internship Documentation

Course materials and documentation for the SVS web development internship, covering HTML/CSS, Git, React, and Next.js.

Live site: [web.svs.ong](http://web.svs.ong/)

---

## Local Run

```bash
npm install
npm start
```

## Deployment

```bash
firebase deploy
```

### Generate sitemap

```bash
npx docsify-sitemap local -u https://web.svs.ong/ -b ./site -f ./site/sitemap.xml -i
```

Sitemap is also available at `https://web.svs.ong/sitemap.xml`

---

## Course File Structure

Each course topic lives in its own folder. A complete course folder contains up to three files:

| File          | Required     | Purpose                                                                 |
| ------------- | ------------ | ----------------------------------------------------------------------- |
| `preparation.md`  | Optional     | Environment setup, software installation, prerequisites for that lesson |
| `<topic>.md`  | **Required** | Main course content — the lesson itself                                 |
| `practice.md` | **Required** | Exercises — individual and team sections                                |

---

## Course Writing Requirements

### Duration

Each course is designed to be **presented in ~100 minutes**. Plan your content accordingly — favor depth over breadth. If the material runs long, cut theory before cutting exercises.

### Pacing — the rhythm of a lesson

A well-paced course alternates between explanation and engagement. Follow this loop:

> **Explain** → (❓Question || 🔧Short Practice ) →💡Hint → repeat

Avoid long uninterrupted blocks of theory. Every 10–15 minutes, include at least one engagement element.

### Engagement Elements

These must be built **into the course file** (`<topic>.md`), not saved only for the end.

#### ❓ Question

A question directed at the audience — rhetorical or interactive. Used to check understanding, spark discussion, or introduce a new concept by making students think first.

> ❓ What do you think happens if two CSS rules target the same element?

#### 💡 Hint

A callout for a non-obvious tip, gotcha, best practice, or shortcut. Use when the next step would trip up a beginner or when there's a common misconception worth naming.

> 💡 `margin: auto` only works horizontally on block elements — it has no effect on vertical centering.

#### 🔧 Short Practice

A micro-exercise completable in **2–5 minutes**, done during the course — not at the end. Its purpose is to immediately apply what was just explained before moving on.

> 🔧 Add a `<nav>` element to your page with three links. Style it so the links are
> horizontal using flexbox.

---

## Practice File Requirements

Every `practice.md` file must contain two clearly marked sections:

### Individual Work

Exercises each student completes on their own in 1.5h. These should reinforce the core skill from the lesson. Examples:

- "Recreate this layout using CSS Grid"
- "Add a `useState` hook to toggle a dark/light theme"

### Team Work

All teams work on the **same long-running shared project** that spans the entire internship. The starting point for that project lives in `homework/` — students clone it once and keep building on it throughout every course.

Each course's team section adds one layer on top of the previous course's result. When writing a team exercise, state clearly what the project looks like coming in and what must be added or improved by the end of the session. Examples:

- Course 1 (HTML): clone the starter from `homework/`, build the page skeleton
- Course 2 (CSS): style the skeleton from Course 1
- Course 3 (Layout): refactor the layout using flexbox/grid
- Course 4 (JS): add interactivity to the styled page

## Homework Folder

The `homework/` folder contains the **starting point materials** students use as the base for their practice work. Place here anything a student needs before they can begin an exercise — skeleton projects, design references, mock APIs, or partially-written starter files.

```
homework/
├── <module-or-topic>/   ← starting project per course or module
│   ├── README.md        ← setup instructions (how to clone/run)
│   └── ...              ← starter files (HTML skeleton, design.pdf, etc.)
└── server/              ← shared mock API (JSON Server) for data-fetching exercises
```

The long-running team project also lives here. Each course's team exercise builds on top of whatever state the project is in at the end of the previous course.

---
