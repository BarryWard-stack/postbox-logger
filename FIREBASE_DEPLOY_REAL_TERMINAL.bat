@echo off
REM © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
REM Opens a new CMD window for Firebase deployment

echo.
echo ========================================
echo  Opening New Terminal for Firebase
echo ========================================
echo.

echo This will open a NEW command window where firebase login will work.
echo.
echo In the new window, you'll need to run:
echo 1. firebase login
echo 2. firebase deploy --only hosting
echo.

timeout /t 3 >nul

REM Open new CMD window in this directory
start cmd /k "cd /d %~dp0 && echo. && echo Ready to deploy! && echo. && echo Step 1: firebase login && echo Step 2: firebase deploy --only hosting && echo."
