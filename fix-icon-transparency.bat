@echo off
REM © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
REM Author: Barry Ward
REM Version: 1.0.0
REM Date: 2025-02-14 10:20:00
REM Purpose: Automated fix for fake transparency icons

setlocal EnableDelayedExpansion

echo ================================================================================
echo Automated Icon Replacement Tool
echo Heritage Postbox Logger (Plogger) v0.9.0
echo ================================================================================
echo.
echo This script will:
echo   1. Delete fake transparency icons from /assets/icons/
echo   2. Copy cleaned TrueColorAlpha masters from /icons/ to /assets/icons/
echo.
echo ================================================================================
echo WARNING: This will permanently delete files
echo ================================================================================
echo.

REM Check if /icons/ directory exists
if not exist "icons\" (
    echo [ERROR] /icons/ directory not found
    echo.
    echo Please extract icons.zip to project root first:
    echo   1. Right-click icons.zip
    echo   2. Select "Extract All..."
    echo   3. Extract to: %CD%
    echo.
    pause
    exit /b 1
)

REM Check if required master files exist in /icons/
set MISSING=0
if not exist "icons\british_postbox_master.png" set /a MISSING+=1
if not exist "icons\ludlow_postbox_master.png" set /a MISSING+=1
if not exist "icons\penfold_postbox_master.png" set /a MISSING+=1
if not exist "icons\wall_postbox_master.png" set /a MISSING+=1

if %MISSING% GTR 0 (
    echo [ERROR] %MISSING% master files missing from /icons/ directory
    echo.
    echo Please ensure icons.zip was fully extracted.
    echo.
    pause
    exit /b 1
)

echo Ready to proceed with automatic fix.
echo.
set /p CONFIRM="Type YES to continue (or anything else to cancel): "

if /i not "%CONFIRM%"=="YES" (
    echo.
    echo Operation cancelled by user.
    pause
    exit /b 0
)

echo.
echo ================================================================================
echo STEP 1: Creating backup of current /assets/icons/
echo ================================================================================

if exist "assets\icons\" (
    if not exist "assets\icons_backup\" (
        echo Creating backup directory...
        mkdir "assets\icons_backup"
    )
    
    echo Backing up existing files...
    copy "assets\icons\*.png" "assets\icons_backup\" >nul 2>&1
    
    if !ERRORLEVEL! EQU 0 (
        echo [OK] Backup created in /assets/icons_backup/
    ) else (
        echo [WARN] Could not create backup (directory may be empty)
    )
) else (
    echo [INFO] /assets/icons/ directory does not exist, creating it...
    mkdir "assets\icons"
)
echo.

echo ================================================================================
echo STEP 2: Removing fake transparency icons
echo ================================================================================

set DELETED=0

if exist "assets\icons\british_postbox_icon_1.png" (
    del "assets\icons\british_postbox_icon_1.png"
    echo [DELETE] british_postbox_icon_1.png
    set /a DELETED+=1
)

if exist "assets\icons\ludlow_postbox_icon_1.png" (
    del "assets\icons\ludlow_postbox_icon_1.png"
    echo [DELETE] ludlow_postbox_icon_1.png
    set /a DELETED+=1
)

if exist "assets\icons\penfold_postbox_icon_1.png" (
    del "assets\icons\penfold_postbox_icon_1.png"
    echo [DELETE] penfold_postbox_icon_1.png
    set /a DELETED+=1
)

if exist "assets\icons\wall_postbox_icon_1.png" (
    del "assets\icons\wall_postbox_icon_1.png"
    echo [DELETE] wall_postbox_icon_1.png
    set /a DELETED+=1
)

if %DELETED% EQU 0 (
    echo [INFO] No fake transparency files found (may have been already removed)
) else (
    echo [OK] Deleted %DELETED% fake transparency files
)
echo.

echo ================================================================================
echo STEP 3: Copying cleaned TrueColorAlpha masters
echo ================================================================================

set COPIED=0

copy "icons\british_postbox_master.png" "assets\icons\" >nul
if !ERRORLEVEL! EQU 0 (
    echo [COPY] british_postbox_master.png ✓
    set /a COPIED+=1
) else (
    echo [ERROR] Failed to copy british_postbox_master.png
)

copy "icons\ludlow_postbox_master.png" "assets\icons\" >nul
if !ERRORLEVEL! EQU 0 (
    echo [COPY] ludlow_postbox_master.png ✓
    set /a COPIED+=1
) else (
    echo [ERROR] Failed to copy ludlow_postbox_master.png
)

copy "icons\penfold_postbox_master.png" "assets\icons\" >nul
if !ERRORLEVEL! EQU 0 (
    echo [COPY] penfold_postbox_master.png ✓
    set /a COPIED+=1
) else (
    echo [ERROR] Failed to copy penfold_postbox_master.png
)

copy "icons\wall_postbox_master.png" "assets\icons\" >nul
if !ERRORLEVEL! EQU 0 (
    echo [COPY] wall_postbox_master.png ✓
    set /a COPIED+=1
) else (
    echo [ERROR] Failed to copy wall_postbox_master.png
)

echo.
echo [OK] Copied %COPIED% master files to /assets/icons/
echo.

echo ================================================================================
echo STEP 4: Verification
echo ================================================================================

echo Checking file sizes (should be 1-2 MB, not 4-5 MB)...
echo.

for %%m in (british_postbox ludlow_postbox penfold_postbox wall_postbox) do (
    if exist "assets\icons\%%m_master.png" (
        for %%F in ("assets\icons\%%m_master.png") do set SIZE=%%~zF
        set /a SIZE_MB=!SIZE! / 1048576
        
        if !SIZE_MB! LEQ 2 (
            echo [OK] %%m_master.png: !SIZE_MB! MB ✓
        ) else (
            echo [ERROR] %%m_master.png: !SIZE_MB! MB - Still oversized!
        )
    )
)

echo.
echo ================================================================================
echo OPERATION COMPLETE
echo ================================================================================
echo.
echo Next steps:
echo   1. Run verify-pwa-installation.bat for full verification
echo   2. Deploy to GitHub Pages
echo   3. Test PWA install on mobile device
echo.
echo If you need to restore the backup:
echo   copy assets\icons_backup\*.png assets\icons\
echo.
echo ================================================================================

pause
