#!/usr/bin/env sh

# abort on errors
set -e

node index.js

# navigate into the build output directory
cd www

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:noties/noties.github.io.git master:master

cd -