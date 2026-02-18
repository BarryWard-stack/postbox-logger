@echo off
REM © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
REM Check current Firebase deployment

echo.
echo ========================================
echo  Checking Firebase Deployment
echo ========================================
echo.

echo Opening Firebase Console in browser...
echo.
echo You will see:
echo 1. Your project dashboard
echo 2. Click "Hosting" in left sidebar
echo 3. Click your site
echo 4. Click "Release history"
echo 5. Click latest version to see file list
echo.

start https://console.firebase.google.com/project/heritage-postbox/hosting/sites

echo.
echo Also checking via CLI...
echo.
firebase hosting:channel:list

echo.
echo ========================================
echo  Check Complete
echo ========================================
echo.
pause
