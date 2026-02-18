@echo off
REM © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
REM Check what files Firebase will actually deploy

echo.
echo ========================================
echo  Checking Deployment Files
echo ========================================
echo.

echo Running: firebase deploy --only hosting --dry-run
echo.
echo This shows what WOULD be deployed without actually deploying.
echo.

firebase deploy --only hosting --dry-run

echo.
echo ========================================
echo  Analysis Complete
echo ========================================
echo.
echo Look at the file count above.
echo Should be ~10-20 files, not 900+!
echo.
echo If still too many files, the .firebaseignore isn't working.
echo.
echo Press any key to close...
pause >nul
