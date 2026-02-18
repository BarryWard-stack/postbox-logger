@echo off
REM © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
REM Final deployment script - commits everything and deploys

echo.
echo ========================================
echo  Final v0.9.1 Deployment
echo ========================================
echo.

REM Step 1: Stage everything
echo [1/3] Staging all changes...
git add .

REM Step 2: Commit
echo.
echo [2/3] Creating final commit...
git commit -m "v0.9.1 Production Release" -m "Complete v0.9.1 deployment with all features:" -m "" -m "Core Features:" -m "- Pulsating blue dot GPS marker with CSS animation" -m "- SatNav handover using geo: URI scheme" -m "- Visual picker grid (Newbie Mode) with info panels" -m "- Persistence hardening with localStorage fallback" -m "- PostcardCanvas digital collectible module" -m "" -m "Content Updates:" -m "- Edward VIII Holy Grail entry (500 points, rarity 10/10)" -m "- Victorian Fluted enhancement (300 points)" -m "- Regional variations: Guernsey Blue, Isle of Man (200 points each)" -m "- Heritage postmark stamp integration with fallback" -m "- Period metadata for all 23 postbox types" -m "" -m "Infrastructure:" -m "- Firebase hosting configuration (firebase.json)" -m "- Firebase project config (.firebaserc)" -m "- Version labels updated to v0.9.1" -m "- Documentation organized in docs/sessions/v0.9.1/" -m "" -m "Files Modified: 4 core files" -m "Documentation: 13 files organized" -m "Total Types: 21 -> 23" -m "" -m "© 2025 Insight Geospatial, Eurotech Marine Data Services Ltd."

if %errorlevel% neq 0 (
    echo.
    echo Nothing to commit or commit failed!
    echo Checking git status...
    git status
    echo.
    timeout /t 10 >nul
    exit /b 1
)

REM Step 3: Push to GitHub
echo.
echo [3/3] Pushing to GitHub Pages...
git push origin main

if %errorlevel% neq 0 (
    echo.
    echo Push to 'main' failed, trying 'master'...
    git push origin master
    
    if %errorlevel% neq 0 (
        echo.
        echo ========================================
        echo  Push Failed!
        echo ========================================
        echo.
        echo Please try manually:
        echo 1. Open Source Control panel (Ctrl+Shift+G)
        echo 2. Click the "..." menu
        echo 3. Click "Push"
        echo.
        timeout /t 10 >nul
        exit /b 1
    )
)

echo.
echo ========================================
echo  SUCCESS! v0.9.1 Deployed!
echo ========================================
echo.
echo Your site is deploying to:
echo https://barryward2070-dotcom.github.io/heritage-postbox/
echo.
echo Wait 1-2 minutes, then:
echo 1. Visit the URL above
echo 2. Hard refresh: Ctrl + Shift + R
echo 3. Check browser tab title: "Heritage Postbox v0.9.1 (Alpha)"
echo.
echo Test these features:
echo [x] Edward VIII in visual picker (500 points)
echo [x] Pulsating blue GPS marker
echo [x] SatNav directions button (geo: URI)
echo [x] Visual picker grid with info panels
echo [x] PostcardCanvas generation
echo.
echo ========================================
echo  Session Complete!
echo ========================================
echo.
echo Total session time: ~6 hours
echo Files modified: 4 core + 13 docs
echo New postbox types: 3 (Edward VIII, Guernsey, Isle of Man)
echo Documentation created: 13 files
echo.
echo Congratulations on completing v0.9.1!
echo.
timeout /t 10 >nul
