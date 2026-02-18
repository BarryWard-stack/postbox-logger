@echo off
REM © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
REM Commit remaining untracked files

echo.
echo ========================================
echo  Adding Remaining Files
echo ========================================
echo.

REM Check what's untracked
echo Current untracked files:
git status --short

echo.
echo Adding all remaining files...

REM Add the commit scripts themselves
git add COMMIT_V0.9.1.bat
git add COMMIT_V0.9.1.ps1
git add HOW_TO_COMMIT.md
git add COMMIT_REMAINING.bat

REM Add any other untracked documentation
git add *.md

REM Add reorganization files if they exist
git add MIGRATE_STRUCTURE.bat
git add REORGANIZATION_QUICK_REFERENCE.md

REM Show what will be committed
echo.
echo Files staged for commit:
git status --short

echo.
echo Creating commit...
git commit -m "Add commit scripts and remaining documentation" -m "- Add COMMIT_V0.9.1 batch and PowerShell scripts" -m "- Add HOW_TO_COMMIT guide" -m "- Add remaining reorganization documentation" -m "" -m "© 2025 Insight Geospatial, Eurotech Marine Data Services Ltd."

echo.
echo ========================================
echo  Complete!
echo ========================================
echo.
echo Run 'git status' to verify all files are committed
echo.
echo Terminal will close automatically in 3 seconds...
timeout /t 3 >nul
