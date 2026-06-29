#  Merging Strategies

At some point, you’ll need to bring changes from one branch into another.
There are a few different ways to do this — and even though they might all “get the job done,” each one tells a different story in your Git history.

This section is about seeing what those stories look like and when to use each one.

---

##  The Big Three

Let’s say you’ve got:

* a **main** branch
* and a **feature** branch with two commits (`F1`, `F2`)

You’re ready to merge `feature` into `main`.

There are three common approaches:

| Strategy         | Command                      | What Happens                                                                |
| ---------------- | ---------------------------- | --------------------------------------------------------------------------- |
| **Merge**        | `git merge feature`          | Combines both histories and creates a merge commit linking them.            |
| **Squash Merge** | `git merge --squash feature` | Flattens all commits into one new commit before adding it to main.          |
| **Rebase**       | `git rebase main`            | Rewrites the feature branch as if it was developed directly on top of main. |

Let’s go through what each looks like in practice.

---

##  Regular Merge — Keeping the Full Story

A normal merge keeps everything — every commit, every branch connection.

```bash
git merge feature
```

This creates a **merge commit** that has two parents: one from `main`, one from `feature`.

🔍 **In History:**

```
*   7f8e6a2 (HEAD -> main) Merge branch 'feature'
|\  
| * 3c4b9e1 (feature) F2: add button color
| * 2b1a8d4 F1: create button component
* | 8b2e1e3 Main branch update
|/  
* 5a91c7b Initial commit
```

You can clearly see where the branches split and where they came back together.

✅ **Why It’s Good**

* Keeps the full context of how work actually happened.
* You can trace when and where branches were merged.

⚠️ **Tradeoff**

* Your history starts to look more like spaghetti if there are lots of merges.
* Not great for small experimental branches.

---

##  Squash Merge — Clean and Simple

If you want a tidy, one-commit summary of a whole feature, try:

```bash
git merge --squash feature
git commit -m "Add button feature"
```

This doesn’t actually create a merge commit.
It just takes all the work from `feature`, combines it into a single set of changes, and lets you commit them as one.

🔍 **In History:**

```
* 4e9b6f2 (HEAD -> main) Add button feature (squashed)
* 8b2e1e3 Main branch update
* 5a91c7b Initial commit
```

All the messy “work in progress” commits from your branch are flattened into one clean commit.

✅ **Why It’s Good**

* Great for small branches or features that don’t need to preserve every commit.
* Keeps your history simple and linear.
* Perfect for teams that like a “clean” log.

⚠️ **Tradeoff**

* You lose the internal history of the branch — it’s all compressed.
* You won’t see the original commits in `git log`.

---

##  Rebase — A Clean Timeline

Rebase is a bit different.
Instead of merging, it moves your branch so that it looks like you built it directly on top of `main`.

```bash
git checkout feature
git rebase main
```

Git will take each commit from your feature branch and “replay” it on top of the latest commit from `main`.

Then you can merge it back easily:

```bash
git checkout main
git merge feature
```

Usually this merge becomes a **fast-forward** — no new commit, just a straight timeline.

🔍 **Before Rebase:**

```
* 3c4b9e1 (feature) F2
* 2b1a8d4 F1
| * 8b2e1e3 (main) Update
|/  
* 5a91c7b Initial
```

🔍 **After Rebase:**

```
* 3c4b9e1 (main, feature) F2
* 2b1a8d4 F1
* 8b2e1e3 Update
* 5a91c7b Initial
```

The timeline now looks perfectly clean — no merge bubbles, no extra nodes.

✅ **Why It’s Good**

* Keeps history linear and easy to follow.
* Makes `git log` much cleaner.
* Great for smaller, isolated branches.

⚠️ **Tradeoff**

* Rebase **rewrites commits** (new hashes).
* Never rebase a branch that others are already working on — it’ll mess up their history.

---

##  Try It Yourself — Quick Exercise

Let’s play it out.

### 🧩 Setup

```bash
mkdir merge-strategies
cd merge-strategies
git init
echo "Main A" > file.txt
git add .
git commit -m "A: initial"
```

### Make a feature branch

```bash
git checkout -b feature
echo "Feature 1" >> file.txt
git commit -am "F1"
echo "Feature 2" >> file.txt
git commit -am "F2"
```

### Add something new on main

```bash
git checkout main
echo "Main B" >> file.txt
git commit -am "B"
```

Now experiment:

```bash
# Normal merge
git merge feature

# Squash merge
git merge --squash feature

# Rebase
git checkout feature
git rebase main
git checkout main
git merge feature
```

After each one, check the log:

```bash
git log --graph --oneline --decorate
```

You’ll instantly see the difference:

* **Merge** → two branches coming together.
* **Squash** → one clean commit.
* **Rebase** → perfectly linear history.

---

##  Pull Requests — Same Game, Different Buttons

When you merge on **GitHub** or **GitLab**, you’re basically doing the same thing — just through a nice interface.

That **Merge** button has three options that map directly to the commands you’ve just used:

| Option                    | What It Does                                                             | Equivalent Command                              |
| ------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------- |
| **Create a merge commit** | Keeps both histories and adds a merge commit.                            | `git merge feature`                             |
| **Squash and merge**      | Combines all the commits into one before merging.                        | `git merge --squash feature`                    |
| **Rebase and merge**      | Replays the commits from your branch on top of main for a clean history. | `git rebase main → git merge --ff-only feature` |

Even though you’re clicking a button, GitHub is still running the same Git operations under the hood.
The only difference is **how your story looks in `git log`** — and now you actually know how to read it.
