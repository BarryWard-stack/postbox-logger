@echo off
REM © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
REM Deploy v0.9.1 to Firebase

echo.
echo ========================================
echo  Deploying to Firebase
echo ========================================
echo.

echo Firebase configuration:
echo - Public directory: . (root)
echo - Project: heritage-postbox
echo.

echo Logging in to Firebase...
firebase login

if %errorlevel% neq 0 (
    echo.
    echo Login failed! Please try again.
    echo.
    timeout /t 5 >nul
    exit /b 1
)

echo.
echo Deploying v0.9.1...
firebase deploy

if %errorlevel% neq 0 (
    echo.
    echo Deployment failed!
    echo.
    timeout /t 5 >nul
    exit /b 1
)

echo.
echo ========================================
echo  Deployment Complete!
echo ========================================
echo.
echo Your site should be live at:
echo https://heritage-postbox.web.app/
echo (or your custom domain)
echo.
echo Wait 1-2 minutes, then test:
echo - Edward VIII in visual picker
echo - Pulsating GPS marker
echo - SatNav directions
echo.
timeout /t 5 >nul
