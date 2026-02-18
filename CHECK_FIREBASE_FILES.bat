@echo off
REM © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
REM Check what files Firebase will deploy

echo.
echo ========================================
echo  Firebase Deployment Preview
echo ========================================
echo.

echo Files that SHOULD be deployed:
echo.
echo Core Application (6 files):
echo - index.html
echo - plogger.js
echo - postboxAssets.js
echo - postcard-engine.js
echo - manifest.json
echo - service-worker.js
echo - 404.html
echo.
echo Assets folder:
echo - assets/icons/*.png (if they exist)
echo - assets/README.md
echo.
echo Total expected: ~10-20 files
echo.

echo.
echo Files that should be IGNORED:
echo - All .bat, .ps1, .exe files
echo - All .md files (documentation)
echo - docs/ folder
echo - tools/ folder
echo - .git/ folder
echo - .cursor/ folder
echo - firebase.json, .firebaserc
echo.

pause
