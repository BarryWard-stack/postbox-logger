@echo off
REM © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
REM Quick deployment script (assumes Firebase CLI is installed)

echo.
echo ========================================
echo  Quick Deploy to Firebase
echo ========================================
echo.

REM Check Firebase CLI
echo Checking Firebase CLI...
firebase --version
if %errorlevel% neq 0 (
    echo ERROR: Firebase CLI not found!
    echo Run DEPLOY_TO_FIREBASE.bat first to install it.
    echo.
    timeout /t 5 >nul
    exit /b 1
)

echo.
echo [1/4] Logging in to Firebase...
echo (Browser will open - click Allow)
firebase login
if %errorlevel% neq 0 (
    echo ERROR: Login failed!
    echo.
    timeout /t 5 >nul
    exit /b 1
)

echo.
echo [2/4] Initializing Firebase...
echo.
echo ANSWER THESE QUESTIONS:
echo - Public directory: . (just a dot)
echo - Single-page app: n (No)
echo - Overwrite index.html: n (No)
echo.
firebase init hosting
if %errorlevel% neq 0 (
    echo ERROR: Initialization failed!
    echo.
    timeout /t 5 >nul
    exit /b 1
)

echo.
echo [3/4] Deploying v0.9.1...
firebase deploy
if %errorlevel% neq 0 (
    echo ERROR: Deployment failed!
    echo.
    timeout /t 5 >nul
    exit /b 1
)

echo.
echo ========================================
echo  SUCCESS!
echo ========================================
echo.
echo Your site is live at:
echo https://barryward2070-dotcom.github.io/heritage-postbox/
echo.
echo Terminal will close in 5 seconds...
timeout /t 5 >nul
