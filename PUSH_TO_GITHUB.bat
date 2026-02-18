@echo off
REM © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
REM Push v0.9.1 to GitHub

echo.
echo ========================================
echo  Pushing v0.9.1 to GitHub
echo ========================================
echo.

echo Checking git status...
git status

echo.
echo Pushing to GitHub...
git push origin main

if %errorlevel% neq 0 (
    echo.
    echo Push failed! Trying 'master' branch instead...
    git push origin master
    
    if %errorlevel% neq 0 (
        echo.
        echo ERROR: Push failed!
        echo.
        echo Possible reasons:
        echo - Not connected to internet
        echo - Need to authenticate with GitHub
        echo - Branch name is different
        echo.
        echo Try manually: git push origin YOUR_BRANCH_NAME
        echo.
        timeout /t 10 >nul
        exit /b 1
    )
)

echo.
echo ========================================
echo  Push Complete!
echo ========================================
echo.
echo If GitHub Pages is enabled, your site will update automatically.
echo Check: https://barryward2070-dotcom.github.io/heritage-postbox/
echo.
echo (May take 1-2 minutes to deploy)
echo.
echo Terminal will close in 5 seconds...
timeout /t 5 >nul
