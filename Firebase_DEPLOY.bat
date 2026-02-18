@echo off
REM © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
REM Simple Firebase deployment script

echo.
echo ========================================
echo  Deploying to Firebase
echo ========================================
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
echo  Success!
echo ========================================
echo.
echo Live at: https://heritage-postbox.web.app
echo.
pause
