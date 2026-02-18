@echo off
REM © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
REM Fixed Firebase deployment

echo.
echo ========================================
echo  Firebase Deployment (Fixed Config)
echo ========================================
echo.

echo Configuration verified:
echo - Public directory: . (root)
echo - Project: heritage-postbox
echo - 404.html: Created
echo.

echo IMPORTANT: Run this in a NEW PowerShell window!
echo.
echo Steps:
echo 1. Press Windows Key
echo 2. Type: PowerShell
echo 3. Right-click - "Run as Administrator"
echo 4. Navigate: cd C:\Insight_Workspace\Projects\postbox-logger
echo 5. Login: firebase login
echo 6. Deploy: firebase deploy --only hosting
echo.
echo Expected output: "found 50+ files"
echo.
echo If you see "found 0 files" - something is still wrong!
echo.

pause
