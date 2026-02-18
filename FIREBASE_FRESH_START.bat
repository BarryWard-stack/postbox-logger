@echo off
REM © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
REM Fresh Firebase deployment with clean slate

echo.
echo ========================================
echo  Firebase Fresh Start
echo ========================================
echo.

echo Step 1: Creating clean public folder...
if exist "public" rmdir /S /Q "public"
mkdir public

echo.
echo Step 2: Copying ONLY core application files...
copy index.html public\
copy plogger.js public\
copy postboxAssets.js public\
copy postcard-engine.js public\
copy manifest.json public\
copy service-worker.js public\
copy 404.html public\

echo.
echo Step 3: Copying assets folder...
if exist "assets" (
    xcopy /E /I /Y assets public\assets
    echo Assets copied!
) else (
    echo No assets folder found - skipping
)

echo.
echo ========================================
echo  Clean Folder Created!
echo ========================================
echo.
echo Public folder contains:
dir /B public
echo.

echo Step 4: Updating firebase.json to use public folder...
echo.

pause

echo.
echo Step 5: Deleting old Firebase deployment...
echo This will remove all old files from Firebase hosting.
echo.
firebase hosting:channel:delete live --force

echo.
echo Step 6: Deploying fresh version...
echo.
firebase deploy --only hosting

if %errorlevel% neq 0 (
    echo.
    echo Deployment failed!
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo  Fresh Deployment Complete!
echo ========================================
echo.
echo Your site is now clean at:
echo https://heritage-postbox.web.app
echo.
echo Only core files deployed (7 files + assets)
echo.
pause
