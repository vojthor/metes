#!/bin/bash
# My example bash script

export GIT_AUTHOR_DATE="Sun Apr 23 19:32 2017 +0100"
export GIT_COMMITTER_DATE="Sun Apr 23 19:32 2017 +0100"
git remote rm origin
git remote add origin https://github.com/vojthor/metes.git
git checkout --orphan latest_branch
git add -A
git commit -am "init commit"
git branch -D master
git branch -m master
git push -f origin master
