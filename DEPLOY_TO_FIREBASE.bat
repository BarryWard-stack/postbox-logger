@echo off
REM © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
REM Deploy v0.9.1 to Firebase Hosting

echo.
echo ========================================
echo  Firebase Deployment Script
echo ========================================
echo.

REM Step 1: Check Node.js
echo [1/5] Checking Node.js installation...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install from: https://nodejs.org/
    echo Then restart Cursor and run this script again.
    echo.
    exit /b 1
)
echo Node.js: OK
node -v

echo.
REM Step 2: Check Firebase CLI
echo [2/5] Checking Firebase CLI...
firebase --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Firebase CLI not found. Installing now...
    echo This will take 1-2 minutes...
    echo (npm warnings are normal, ignore them)
    npm install -g firebase-tools
    echo.
    echo Verifying Firebase CLI installation...
    firebase --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo ERROR: Firebase CLI installation failed!
        echo.
        exit /b 1
    )
)
echo Firebase CLI: OK
firebase --version

echo.
REM Step 3: Login to Firebase
echo [3/5] Checking Firebase login...
firebase projects:list >nul 2>&1
if %errorlevel% neq 0 (
    echo You need to login to Firebase...
    echo Your browser will open. Click "Allow" to authorize.
    firebase login
    if %errorlevel% neq 0 (
        echo ERROR: Firebase login failed!
        echo.
        exit /b 1
    )
)
echo Firebase login: OK

echo.
REM Step 4: Check Firebase configuration
echo [4/5] Checking Firebase configuration...
if not exist "firebase.json" (
    echo Firebase not configured yet. Running initialization...
    echo.
    echo IMPORTANT: When asked, answer:
    echo - Public directory: . (just a dot)
    echo - Single-page app: n (No)
    echo - Overwrite index.html: n (No)
    echo.
    echo Press Enter to continue...
    echo.
    firebase init hosting
    if %errorlevel% neq 0 (
        echo ERROR: Firebase initialization failed!
        echo.
        exit /b 1
    )
)
echo Firebase config: OK

echo.
REM Step 5: Deploy
echo [5/5] Deploying v0.9.1 to live site...
echo This will take 30-60 seconds...
echo.
firebase deploy

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Deployment failed!
    echo Check the error message above.
    echo.
    exit /b 1
)

echo.
echo ========================================
echo  Deployment Complete!
echo ========================================
echo.
echo Your site is now live at:
echo https://barryward2070-dotcom.github.io/heritage-postbox/
echo.
echo Test these features:
echo - Edward VIII in visual picker (500 points)
echo - Pulsating blue GPS marker
echo - SatNav directions button
echo - Postcard creation
echo.
echo Press Ctrl+C to close this window, or just close the terminal tab.
echo.
