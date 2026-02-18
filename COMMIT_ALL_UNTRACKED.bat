@echo off
REM © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
REM Commit ALL untracked files at once

echo.
echo ========================================
echo  Committing ALL Untracked Files
echo ========================================
echo.

echo Current status:
git status --short

echo.
echo Adding ALL untracked files...
git add .

echo.
echo Files now staged:
git status --short

echo.
echo Creating commit...
git commit -m "Add all remaining v0.9.1 files and documentation" -m "Includes:" -m "- Commit helper scripts (COMMIT_V0.9.1.bat, .ps1)" -m "- Deployment guides and documentation" -m "- Reorganization files" -m "- All untracked assets and configuration" -m "" -m "© 2025 Insight Geospatial, Eurotech Marine Data Services Ltd."

echo.
echo ========================================
echo  Complete!
echo ========================================
echo.
echo Verify with: git status
echo Push with: git push origin main
echo.

pause
