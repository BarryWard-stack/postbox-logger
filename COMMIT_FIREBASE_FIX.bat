@echo off
REM © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
REM Commit Firebase configuration fixes

echo.
echo ========================================
echo  Committing Firebase Fixes
echo ========================================
echo.

echo Staging changes...
git add firebase.json 404.html

echo.
echo Creating commit...
git commit -m "Fix Firebase deployment configuration" -m "Problem:" -m "Firebase was ignoring too many files, resulting in empty deployment" -m "and 'Site Not Found' error." -m "" -m "Solution:" -m "- Simplify firebase.json ignore list (only ignore essentials)" -m "- Add 404.html for SPA routing" -m "- Ensure public directory points to root (.)" -m "" -m "Changes:" -m "- firebase.json: Remove overly aggressive ignore patterns" -m "- 404.html: Add redirect to index.html for SPA" -m "" -m "Now firebase deploy should find 50+ files instead of 0." -m "" -m "© 2025 Insight Geospatial, Eurotech Marine Data Services Ltd."

if %errorlevel% neq 0 (
    echo.
    echo Commit failed or nothing to commit!
    echo.
    timeout /t 5 >nul
    exit /b 1
)

echo.
echo Pushing to GitHub...
git push origin main

if %errorlevel% neq 0 (
    echo.
    echo Push failed! Trying master...
    git push origin master
)

echo.
echo ========================================
echo  Firebase Config Fixed!
echo ========================================
echo.
echo Now deploy with:
echo 1. Open PowerShell as Administrator
echo 2. cd C:\Insight_Workspace\Projects\postbox-logger
echo 3. firebase login
echo 4. firebase deploy --only hosting
echo.
echo Should see: "found 50+ files"
echo.
timeout /t 5 >nul
