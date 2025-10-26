# Reverting Commits

Sometimes you make a change that didn’t turn out the way you wanted.
Maybe a commit introduced a bug, or maybe a feature isn’t ready yet.
Luckily, Git lets you undo changes safely **without losing history** — using `git revert`.

Unlike `git reset`, which can rewrite or remove commits, `git revert` **adds a new commit** that undoes an earlier one.
This is especially important for shared branches where other people may rely on existing commits.

---

##  Setup — Making Some Commits

Let’s create a simple example:

```bash
mkdir revert-demo
cd revert-demo
git init
echo "Line 1" > file.txt
git add .
git commit -m "A: initial commit"

echo "Line 2" >> file.txt
git commit -am "B: add second line"

echo "Line 3" >> file.txt
git commit -am "C: add third line"
```

Now the file looks like:

```
Line 1
Line 2
Line 3
```

And `git log --oneline --graph --decorate` shows:

```
* c3d1b2a (HEAD -> main) C: add third line
* b2a4d1b B: add second line
* a1f9c7b A: initial commit
```

---

##  Reverting a Middle Commit

Let’s say we want to undo commit **B** (the second line) without touching the third line.

```bash
git revert b2a4d1b
```

Git will create a **new commit**:

```
* e7c2f9d (HEAD -> main) Revert "B: add second line"
* c3d1b2a C: add third line
* b2a4d1b B: add second line
* a1f9c7b A: initial commit
```

Check the file now:

```
Line 1
Line 3
```

✅ **Notice:**

* The original commit **B** is still in history.
* The revert commit **cancels its effect.**
* Commit **C** is untouched — you didn’t lose the third line.

> 💡 This is why `git revert` is safe for shared branches: it never rewrites history, it just adds a new “undo” commit.

---

## Reverting Multiple Commits

You can also revert multiple commits at once.
For example, to undo both **B** and **C**:

```bash
git revert b2a4d1b c3d1b2a
```

Git will create **two new revert commits**, each undoing one original commit.
Again, history stays intact — you can always see what was reverted and when.

---

##  Reverting a Merge Commit

Reverting a merge is a little trickier because a merge has **two parents**.

```bash
git revert -m 1 <merge-commit-hash>
```

`-m 1` tells Git which parent is the “mainline” (the branch you want to keep).
This ensures Git knows which side of the merge to undo.

> 🔧 Reverting merges safely is important for large teams and PRs that have already been merged.

---

##  Practical Exercise — Explore Reverts

1. Make three commits changing the same file (**A**, **B**, **C**).
2. Revert the middle one (**B**) and check the file.
3. Observe how `git log --graph --oneline --decorate` reflects the revert.
4. Try reverting multiple commits in a row.
5. *(Optional)* Create a merge commit and experiment with `git revert -m 1`.

After each step, notice:

* The commit history always shows every action.
* The file reflects exactly what Git applied or reverted.
* You can undo mistakes safely **without erasing any work.**

---

## 🧭 In Conclusion

`git revert` is your **safety net**.
It lets you undo changes while keeping a complete record of what happened.

Unlike reset or deleting commits, you don’t risk breaking the history for others.
Every revert leaves a visible trace — a new commit that says:

> “This change was undone.”

Mastering revert means you can **experiment freely**, **fix mistakes confidently**, and always keep your project history **clean and understandable**.
