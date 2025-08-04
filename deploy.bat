@echo off
git add .
set /p str=enter commit message : 
git commit -m %str%
npm run deploy