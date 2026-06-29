# Introduction

Before we jump into commands, let’s set the right mindset.

> **Git isn’t just a “sync tool” between your computer and GitHub.**
> Git is a *time machine* for your code.

Every single change — every commit — is a snapshot of your project at a specific moment.
When you commit, Git doesn’t just save your files; it records how your project evolved over time.

That’s the real power of Git: it helps you contain chaos when debugging, reviewing code, or cleaning up after “creative” merges.

When you truly understand Git’s history, you stop being afraid of it.
You can experiment, revert mistakes, and always find your way back.

---

## Basic History View

The most common command is:

```bash
git log
```

This shows all commits in the current branch, starting from the newest.
It includes the author, date, and commit message.

It’s powerful — but hard to read in big projects.

---

## Making It Easier to Read

You can make the log much more visual and compact with these variations:

| Command                                | Description                                                           |
| -------------------------------------- | --------------------------------------------------------------------- |
| `git log --oneline`                    | Shows only commit hashes and messages in one line each.               |
| `git log --oneline --decorate`         | Adds branch and tag names next to commits.                            |
| `git log --graph --oneline --decorate` | Draws an ASCII graph showing branches and merges.                     |
| `git log --stat`                       | Shows which files were changed and how many lines were added/removed. |
| `git log -p`                           | Displays the actual code differences for each commit.                 |

These options are often combined — for example:

```bash
git log --graph --oneline --decorate --all
```

> 💡 This command gives you a **visual map** of your repository: branches, merges, and tags all in one view.

---

## Reading Git History Like a Story

When you start using `git log` regularly, you’ll notice that different actions leave different patterns in the commit history.
Here’s what to look for:

---

### 🔸 Merges

When you merge a branch, the resulting commit has two parent commits — one from the branch you merged into, and one from the branch you merged from.

In `git log --graph`, merges appear as branches connecting back together:

```
*   e42b9b7 (HEAD -> main) Merge branch 'feature'
|\  
| * 5d4f8d1 (feature) Add feature X
* | a73ccaa Update readme
|/  
* 7e1d2f5 Initial commit
```

That “fork and join” shape shows where history diverged and then reunited.

---

### 🔸 Rebases

A rebase replays commits from one branch on top of another.
This means it changes commit hashes, effectively rewriting history to look linear.

**Before rebase:**

```
* 5d4f8d1 (feature) Add feature X
* a73ccaa Update readme
* 7e1d2f5 Initial commit
```

**After rebase:**

```
* 8b9f4c3 (feature) Add feature X
* a73ccaa (main) Update readme
* 7e1d2f5 Initial commit
```

Notice how the feature commit’s hash (`5d4f8d1 → 8b9f4c3`) changed — it’s technically a new commit with the same content.

---

### 🔸 Reverts

A revert doesn’t remove commits — it adds a new commit that undoes another one.
So if you revert commit **B**, your history will look like this:

```
* 9d12ab3 (HEAD -> main) Revert "B: added wrong code"
* 7e4c1d9 B: added wrong code
* 5a91c7b A: initial commit
```

The revert commit exists *after* the original, effectively “canceling” its effect but keeping a clear record of what happened.