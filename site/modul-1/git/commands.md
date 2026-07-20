# Important Commands

## The Classical Trio / The Holy Trinity
<div style="float: right;">~5 minutes</div>

To save your work to the server on your remote branch, always remember:

* `git add .` - add all your changes to the next commit.
* `git commit -m "message"` - commit your changes with a message.
* `git push` - push your changes to the server.

## Creating your project
<div style="float: right;">~5 minutes</div>

* `git init` - initialize a new git repository.
* `git clone URL` - clone an existing repository from a URL.

## Connecting your local repository to the server
<div style="float: right;">~5 minutes</div>

* `git remote add origin URL` - connect your local repository to a remote server.
* `git branch -M main` - rename the main branch to 'main'.
* `git push -u origin main` - push your main branch to the server.

> 💡 The `-u` flag is used to set the upstream branch. After you ran the 3 commands above, you can just write `git push`.

## Working with the server
<div style="float: right;">~5 minutes</div>

* `git pull` - get the latest changes from the server for your current branch.
* `git fetch --all` - get the latest changes from the server for all branches.
* `git push` - push your changes to the server.

> 💡 `git fetch` will not pull the updates from the server, it will only signal that there are updates on the branches.

## Branches
<div style="float: right;">~5 minutes</div>

* `git branch branch_name` - create a new branch named 'branch_name'.
* `git checkout branch_name` - switch to the branch named 'branch_name'.

## Merging
<div style="float: right;">~5 minutes</div>

* `git merge branch_name` - merge the branch 'branch_name' into the current branch.

> 💡 Remember, it's bad practice to merge into the main branch directly. Instead merge from the main branch into yours and do a pull request.
