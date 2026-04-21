@echo off
REM © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd. All rights reserved.
REM Author: Barry Ward
REM License: Proprietary - Not for redistribution without written consent.
REM Last Modified: 2025-02-14 15:20:00
REM Version: 0.9.0
REM Setup PWA folder structure

echo ================================================================================
echo Heritage Postbox - PWA Setup Script
echo ================================================================================
echo.

REM Create assets/icons directory if it doesn't exist
if not exist "assets\icons" (
    echo Creating assets\icons directory...
    mkdir "assets\icons"
    echo [OK] assets\icons created
) else (
    echo [OK] assets\icons already exists
)

REM Copy PWA files from docs to root if they don't exist
if not exist "manifest.json" (
    if exist "docs\manifest.json" (
        echo Copying manifest.json from docs to root...
        copy "docs\manifest.json" "manifest.json" >nul
        echo [OK] manifest.json copied
    ) else (
        echo [WARNING] docs\manifest.json not found
    )
) else (
    echo [OK] manifest.json already in root
)

if not exist "service-worker.js" (
    if exist "docs\service-worker.js" (
        echo Copying service-worker.js from docs to root...
        copy "docs\service-worker.js" "service-worker.js" >nul
        echo [OK] service-worker.js copied
    ) else (
        echo [WARNING] docs\service-worker.js not found
    )
) else (
    echo [OK] service-worker.js already in root
)

REM Check if package.json exists
if not exist "package.json" (
    echo.
    echo [TODO] Run: npm init -y
    echo        Then install dev server: npm install --save-dev http-server
) else (
    echo [OK] package.json exists
)

REM List what's needed in assets/icons
echo.
echo ================================================================================
echo NEXT STEPS:
echo ================================================================================
echo.
echo 1. Generate app icons (8 sizes needed):
echo    - icon-72x72.png
echo    - icon-96x96.png
echo    - icon-128x128.png
echo    - icon-144x144.png
echo    - icon-152x152.png
echo    - icon-192x192.png
echo    - icon-384x384.png
echo    - icon-512x512.png
echo.
echo    Quick method: https://www.pwabuilder.com/imageGenerator
echo    Upload 512x512 base icon, download all sizes, extract to assets\icons\
echo.
echo 2. Update index.html with PWA integration
echo    See: docs\QUICK_START_ADAPTED.md (Step 8)
echo.
echo 3. Test locally: npm start
echo.
echo ================================================================================
echo Setup complete! Check docs\QUICK_START_ADAPTED.md for detailed instructions.
echo ================================================================================
echo.

pause
