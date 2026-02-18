@echo off
REM © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
REM Simple commit and push (bypasses virtual environment issues)

echo.
echo ========================================
echo  Committing and Pushing v0.9.1
echo ========================================
echo.

echo Staging all changes...
git add .

echo.
echo Creating commit...
git commit -m "Deploy v0.9.1: Complete release with Firebase config" -m "Changes:" -m "- Update version labels to v0.9.1 in index.html" -m "- Add Firebase hosting configuration (firebase.json)" -m "- Add Firebase project config (.firebaserc)" -m "- Organize v0.9.1 documentation" -m "- Add deployment helper scripts" -m "" -m "v0.9.1 Features:" -m "- Pulsating blue dot GPS marker" -m "- SatNav handover (geo: URI)" -m "- Visual picker grid (Newbie Mode)" -m "- Persistence hardening (localStorage fallback)" -m "- Edward VIII Holy Grail entry (500 points)" -m "- Victorian Fluted enhancement (300 points)" -m "- Regional variations (Guernsey, Isle of Man)" -m "- Heritage postmark stamp integration" -m "- Period metadata for all 23 postbox types" -m "" -m "Ready for production deployment via GitHub Pages." -m "" -m "© 2025 Insight Geospatial, Eurotech Marine Data Services Ltd."

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
    echo Push failed! Trying master branch...
    git push origin master
    
    if %errorlevel% neq 0 (
        echo.
        echo Push failed on both branches!
        echo.
        timeout /t 5 >nul
        exit /b 1
    )
)

echo.
echo ========================================
echo  Success!
echo ========================================
echo.
echo v0.9.1 pushed to GitHub!
echo.
echo Your site will update in 1-2 minutes at:
echo https://barryward2070-dotcom.github.io/heritage-postbox/
echo.
echo Test these features:
echo - Edward VIII in visual picker (500 points)
echo - Pulsating blue GPS marker
echo - SatNav directions button
echo - Visual picker grid
echo - PostcardCanvas
echo.
timeout /t 5 >nul
