@echo off
REM © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
REM Check if push was successful

echo.
echo ========================================
echo  Checking Push Status
echo ========================================
echo.

echo Current branch:
git branch --show-current

echo.
echo Last commit:
git log -1 --oneline

echo.
echo Remote status:
git status

echo.
echo Recent commits on remote:
git log origin/main -3 --oneline 2>nul
if %errorlevel% neq 0 (
    echo Trying master branch...
    git log origin/master -3 --oneline 2>nul
)

echo.
echo ========================================
echo If you see your v0.9.1 commit above,
echo the push was successful!
echo ========================================
echo.
