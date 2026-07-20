# Practice: Git Homework

## Branch Model

`main` is protected — it only ever receives Pull Requests from `develop`, reviewed and commented on by mentors. All team and individual work happens on `develop` and branches off of it. You never commit to `main` directly.

## Team Setup

Do this together, once, as a team.

1. One member creates a new **empty** GitHub repo named after your team, then adds every teammate as a collaborator.
2. Grab the **entire** shared `homework` folder — `html` (your Introduction-course skeleton), `server`, `design.pdf`, and the `react`/`next` starters — from [web-svs-ong/tree/main/homework](https://github.com/svs-ong/web-svs-ong/tree/main/homework). Keep your team's own edited `html` if you have one.
3. Push it to your new repo's `main`:

   ```bash
   git init
   git add .
   git commit -m "Add homework starter"
   git remote add origin https://github.com/<your-username-or-org>/<team-name>.git
   git branch -M main
   git push -u origin main
   ```

4. Create the `develop` branch and push it — this is where all work will happen from now on:

   ```bash
   git checkout -b develop
   git push -u origin develop
   ```

5. Everyone else clones the repo and checks out `develop`.

## Individual Work

Work alone here — don't compare notes with teammates yet.

1. Branch off `develop`, named after yourself:

   ```bash
   git checkout develop
   git pull
   git checkout -b <your-name>
   ```

2. Make **3 separate commits** on your team's shared `styles.css`, each a small real change to the **header/nav styling** (color, font-size, hover state). Touch the same lines your teammates are independently about to touch — no coordinating. Use present-tense messages (`git commit -m "Add hover state to nav links"`).
3. Push your branch:

   ```bash
   git push -u origin <your-name>
   ```

> ❓ Several conflicting versions of `styles.css` now exist across branches — does Git know that yet? When does a conflict actually get detected?

## Team Work — Merge Into Develop (and Survive the Conflicts)

Everyone styled the same section on purpose — merging will conflict.

1. On `develop`, merge each teammate's branch one at a time:

   ```bash
   git checkout develop
   git pull
   git merge <teammate-branch>
   ```

   The first merge is clean. The second one stops with a conflict in `styles.css` — you'll see the `<<<<<<<` / `=======` / `>>>>>>>` markers from the lesson.

2. As a team, decide what to keep, resolve the markers, then:

   ```bash
   git add .
   git commit -m "Merge <teammate-branch>, combine nav styling"
   ```

3. Repeat for every branch, then push:

   ```bash
   git push
   ```

4. Open the page in a browser and confirm the header/nav still works — a clean merge isn't automatically a correct one.

## Ship It — Pull Request to Main

```bash
git checkout develop
git push
```

Open a Pull Request on GitHub from `develop` into `main`. Mentors will review and leave comments — address them with new commits on `develop` and push again until it's approved and merged.

> 💡 From here on: branch off `develop` for every change, merge feature branches into `develop` directly, and only send `develop → main` when work is ready for mentor review.
