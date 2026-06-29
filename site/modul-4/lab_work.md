#  Git Lab Homework — Team Practice

##  Objective

This lab is designed to give you **hands-on experience** with Git history, merging strategies, pull behavior, and reverting commits.
You will work in teams, practice branching, committing, merging, rebasing, and reverting — and visualize the effects using `git log`.

---

##  Branching and Committing

### Create Your Team Branch

Starting from `main`, create a new branch named after your team:

```bash
git checkout -b team-<your-team-name>
```

⚠️ **Do not work directly on `main`.**
All your changes should be made in your **team branch**.

---

### Individual Contributions

Each team member must make **2 separate commits** to the same file(s), using different approaches or changes.

**Example commit messages:**

* Change 1: Updated project header
* Change 2: Fixed typo in README

---

### Visualize History

After all commits, run:

```bash
git log --graph --oneline --decorate
```

Ensure your commits appear and are correctly labeled.

**Example Sequence (3-member team):**

| Member | Commit                                               |
| ------ | ---------------------------------------------------- |
| Alice  | Change 1: Added CSS flexbox tutorial section         |
| Bob    | Change 2: Fixed typo in HTML structure example       |
| Carol  | Change 3: Updated navigation menu styling            |
| Alice  | Change 4: Updated color scheme in CSS examples       |
| Bob    | Change 5: Added JavaScript DOM manipulation examples |
| Carol  | Change 6: Improved responsive design examples        |

---

##  Merging Practice

### Create Feature Branches

Each member creates their own branch off the team branch:

```bash
git checkout -b <member-name>-feature
```

---

### Make Additional Changes

Each member makes **1–2 commits** in their branch.
Commit messages should describe what was changed.

---

### Merge Back to Team Branch

Try **three different strategies** across your team:

| Member | Strategy                            |
| ------ | ----------------------------------- |
| Alice  | Normal merge (`git merge`)          |
| Bob    | Squash merge (`git merge --squash`) |
| Carol  | Rebase (`git rebase`)               |

---

### Visualize History

```bash
git log --graph --oneline --decorate --all
```

Compare how each strategy affects the commit graph and storytelling of the project history.

---

##  Pull and Fetch

### Simulate Remote Changes

One member pushes their branch to GitHub:

```bash
git push origin <branch-name>
```

---

### Other Members Pull Updates

Run a normal pull:

```bash
git pull origin <branch-name>
```

Observe what happens in the log.

---

### Optional: Manual Fetch + Merge

Instead of `git pull`, try:

```bash
git fetch origin
git merge origin/<branch-name>
```

Compare results with a normal pull —
notice how **fetch + merge** gives you more control before integrating changes.

---

##  Reverting Commits

Pick one commit in your **team branch** (not the first or last).
Then revert it:

```bash
git revert <commit-hash>
```

---

### Check the Effect

* File changes are undone.
* Commit history reflects the revert.

Optional: Try reverting **multiple commits** at once and observe how history changes.

---

##  Optional: Merge Conflicts

Intentionally create a **merge conflict**:

1. Two members change the same line in the same file in separate branches.
2. Merge the branches.
3. Resolve the conflict manually and commit.

Then check the log to see how the merge commit appears.

---

##  Deliverables

1.  **Screenshot** of your

   ```bash
   git log --graph --oneline --decorate --all
   ```

   after all merges and reverts.

2.  **List of commits** each team member made, including descriptions.

3.  **Short reflection (2–3 sentences)** on what you learned about:

   * How merge strategies affect history
   * How `git pull` differs from `fetch + merge`
   * How `revert` works in shared branches
