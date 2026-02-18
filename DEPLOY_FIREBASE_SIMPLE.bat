@echo off
REM © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
REM Simple Firebase deployment

echo.
echo ========================================
echo  Deploying to Firebase
echo ========================================
echo.

echo Step 1: Logging in to Firebase...
echo (Browser will open - click Allow)
echo.
firebase login

if %errorlevel% neq 0 (
    echo.
    echo Login failed!
    echo.
    timeout /t 5 >nul
    exit /b 1
)

echo.
echo Step 2: Deploying to hosting...
echo.
firebase deploy --only hosting

if %errorlevel% neq 0 (
    echo.
    echo Deployment failed!
    echo.
    timeout /t 5 >nul
    exit /b 1
)

echo.
echo ========================================
echo  Success!
echo ========================================
echo.
echo Your site is now live at:
echo https://heritage-postbox.web.app
echo.
echo Test v0.9.1 features:
echo - Edward VIII in visual picker
echo - Pulsating GPS marker
echo - SatNav directions
echo.
timeout /t 5 >nul
