---
title: "80/20 of Git commands: All of the commands I have used for 2 years"
date: "2020-07-28"
description: A very short post on all the git commands I have used in two years at my current role"
---

Welcome back, this will be a very short post on all the git commands I have used in two years at my current role. A lot of these I used more than others but as you can see there is not a lot of variety here. One thing I should mention most of the time I don't run these command directly all the basic commands such as pulling, pushing, checkout to other branches are all ran through my editor vscode. The more complicated commands are run on the command line.

I want to show you that you can get very far knowing very little commands in Git and you can apply this advice to a lot of these, what is the 20% of <insert_technology_here> that will give be 80% of the benefits. I should also mention this is just my experience with the current setup my team has which is:

- 1 main repository
- 6-10 Team members
- Deploying to production 4-6 times a day (Every merge to master gets deployed to production right away)
- We avoid rebasing, we prefer to just merge master/primary into the branch and push, we have found this works better for us

## General

Tip: The reason why I have a comment at the end of the commands is it makes searching for commands in my history easier. I can use english sentences if I don't exactly remember the command.

`git pull # Pull latest changes`

`git checkout -b <branch-name> # Create a new branch`

`git checkout <branch_name> # Switch to a new branch`

`git merge master # Merge master/primary`
`git merge origin/master # Merge remote master/primary`

`git stash`

`git remotes -v # List the remotes`

`git remote add <name> <repo/remote> # Add another remote`

`git log --oneline # One line history`

## Resetting / Oh Crap what did I do...

`git revert HEAD^1 # Revert top Commit , replace 1 with any number to go back more`

`git reset --hard HEAD # Force revert , no used very often but more like a get of of jail card`

## Merge Stuff

`git cherry-pick <commit_id> # Cherry Pick a commit`

`git diff --name-only <branch_1> <branch_2> # Diff between two branches` > diff2.txt

## Common Issues

`git mv <old_file> <new_file> # Common used when you change case in a file`

## Conclusion

I enjoyed looking back at my command history and figuring out what the most common git commands I use. I hope you enjoyed this very short post

Until next time

Jason
