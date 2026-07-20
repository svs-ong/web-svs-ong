# Git
Git is a version control system that tracks changes in your code and lets you collaborate with other developers. It is one of the most essential tools in the industry.

## Repositories & Commits 

<div style="float: right;">~20 minutes</div>

Git tracks a project as a folder where lines are added and removed over time. Each bundle of changes is called a `commit`. A project is simply a timeline of commits applied to an empty starting point.

To start tracking a folder, run:

```bash
git init
```

This creates a `repository` — git's name for a tracked project.

> 🤓 Under the hood, git creates an invisible `.git` folder that stores all the project history.

Let's say we create a website and add `index.html`. Once we're happy with it, we tell git to include it in a commit:

```bash
git add .
git commit -m "Add the base html page"
```

`git add .` stages all changed files. `git commit` saves them permanently to the timeline with a message describing what changed. If you only want to stage one specific file instead of everything, you can use `git add index.html`.

Now let's say we modify the paragraph text and also add a `style.css` file. Git sees this as:

1. In `index.html`: 1 line removed, 1 line added.
2. In `style.css`: 3 new lines added.

We commit again:

```bash
git add .
git commit -m "Modify html and add css"
```

At any point you can check what git currently sees with:

```bash
git status   # shows staged and unstaged changes
git log      # shows the full commit history
```

> 💡 Commit messages should be in present tense and be short but descriptive. Commit often in small chunks — a focused commit is much easier to undo than a large messy one.

> ❓ What happens if you edit a file after committing it, but forget to run `git add` before the next commit?

The most recent commit is called the `HEAD` — the latest version of the project. The full timeline of commits is called a `branch`, and every project starts on the `main` branch.

![!img](img/step-1.png)

> 🤓 The default branch used to be called `master`. In 2020 it was renamed to `main`. The diagrams still say master — both mean the same thing.

## Branches and Parallel Timelines

 <div style="float: right;">~20 minutes</div>

Branches let multiple people work on the same project without interfering with each other. Each branch is an independent timeline of commits that starts from an existing point.

Let's say a teammate named Matei joins the project. He creates his own branch so his changes don't interfere with yours:

```bash
git branch matei
git checkout matei
```

> 💡 You can also create and switch in one command: `git checkout -b matei`

Now any commits Matei makes only exist on the `matei` branch. He wants to change the font size of paragraphs:

```css
/* style.css */
p {
    font-size: 32px; /* changed from 24px */
}
```

```bash
git add .
git commit -m "Change font size"
```

> 🔧 **Short Practice (5 min):** Create a branch with your own name, make a small change to a CSS property and commit it. Then run `git checkout main` — notice your change disappears because it only lives on your branch.

The project now has two separate timelines:

![!img](img/step-2.png)

Meanwhile, you switch back to `main` and add your own changes — styling the `h1` element:

```css
/* style.css */
h1 {
    color: yellow;
    font-weight: bold;
}
```

```bash
git checkout main
git add .
git commit -m "Add heading style"
```

Then Matei returns and adds his own `h1` styling on his branch:

```css
/* style.css */
h1 {
    color: blue;
    font-style: italic;
}
```

Both branches now have diverged with different changes to the same file:

![!img](img/step-3.png)

## Merging Branches

<div style="float: right;">~20 minutes</div>

To bring changes together, switch to the branch you want to merge *into* and run `merge`:

```bash
git checkout main
git merge matei
```

Since both branches modified the same lines in `style.css`, git doesn't know which version to keep. This is a `merge conflict`. Git marks the file so you can decide:

```css
<<<<<< HEAD
h1 {
    color: yellow;
    font-weight: bold;
}
=======
h1 {
    color: blue;
    font-style: italic;
}
>>>>>> matei
```

Everything between `<<<<<<` and `=======` is your version. Everything between `=======` and `>>>>>>` is Matei's. Edit the file to keep what you want — for example, combining both:

```css
h1 {
    color: blue;
    font-style: italic;
    font-weight: bold;
}
```

Then commit the resolution:

```bash
git add .
git commit -m "Merge matei branch"
```

> 💡 A merge conflict is not an error — it's git asking you to make a decision. It happens to every developer, every day.

![!img](img/step-4.png)

> ❓ Why is it a bad idea to always pick "my version" when resolving a conflict without reading your teammate's change?

## Remote Repositories 

<div style="float: right;">~10 minutes</div>

> ❓ Many beginners think "Git" and "GitHub" are the same thing. What do you think the difference is?

**Git** is the program running on your machine that tracks changes. **GitHub** is a platform for hosting git repositories remotely so your whole team can access them. Alternatives exist — GitLab, Bitbucket — but GitHub is the most widely used.

To share your project, first create an empty repository on GitHub and copy the URL it gives you:

![!github](img/github.png)

Then connect your local repo to it and push:

```bash
git remote add origin https://github.com/aniteicristi/repo_test.git
git branch -M main
git push -u origin main
```

- `git remote add origin` links your local repo to the GitHub remote.
- `git branch -M main` renames your branch to `main` to match GitHub's default.
- `git push -u origin main` uploads your commits. The `-u` flag makes `origin` the default, so future pushes only need `git push`.

Your commits are now backed up on GitHub and visible to your team.

## Clone, Push & Pull 

<div style="float: right;">~10 minutes</div>

A teammate who wants to work on the project downloads it with:

```bash
git clone https://github.com/aniteicristi/repo_test.git
```

This creates a local copy of the entire repo — including the full commit history. The cloned folder is already connected to the remote, so there's no need to run `git remote add origin` again.

When they're done making changes, they push using the classic trio:

```bash
git add .
git commit -m "My changes"
git push
```

Before you push your own work, always pull first to get your teammates' latest changes:

```bash
git pull
```

If you skip this and push on top of changes you haven't seen, git will reject the push. You'll have to pull anyway, resolve any conflicts, and push again. Pulling first avoids that loop.

> 🔧 **Short Practice (5 min):** Pair up. One of you pushes a small change. The other clones (or pulls) the repo, confirms the change is there, makes their own change and pushes it back.

For true parallel work, each person works on their own named branch. Run `git fetch --all` to check what has changed on the remote without modifying your local files. When you push a branch for the first time, you need to tell git where to send it:

```bash
git push -u origin your-branch-name
```

After that, a plain `git push` is enough for that branch.

> 💡 `git fetch` only signals that updates exist — it does not apply them. `git pull` = `git fetch` + `git merge`.

## Pull Requests 

<div style="float: right;">~5 minutes</div>

A pull request is a managed way of merging — instead of merging directly in the terminal, you ask a supervisor to review your changes first.

The workflow looks like this:

1. On your branch, merge `main` into it to pick up any changes your teammates have already merged.
2. Resolve any conflicts and push your branch to GitHub.
3. On GitHub, open a **pull request** comparing your branch to `main`.

A supervisor can now read your code line by line, leave inline comments, and request specific changes. You can then push follow-up commits directly to the same branch — the pull request updates automatically. When the supervisor is satisfied, they approve and merge.

This creates a full audit trail: every change to `main` was reviewed, discussed, and intentionally approved before landing.

> 💡 Remember: never merge directly into `main` from the terminal. Always go through a pull request so someone can review the code first.

> ❓ Why might a team prefer pull requests over letting everyone merge into `main` directly?
