@echo off
REM © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
REM Author: Barry Ward
REM Version: 1.0.0
REM Date: 2025-02-14 12:20:00
REM Purpose: Clean up assets/icons folder (remove fake transparency originals)

echo.
echo ================================================================================
echo Assets Cleanup - Remove Fake Transparency Icons
echo Heritage Postbox Logger (Plogger)
echo ================================================================================
echo.
echo Current assets/icons/ folder contains:
echo   - 4 FAKE transparency files (*_icon_1.png) - 4.5-5.0 MB each [TO DELETE]
echo   - 4 REAL masters (*_master.png) - 1.2-1.4 MB each [KEEP]
echo   - 10 PWA sizes (icon-*.png) - Various sizes [KEEP]
echo.
echo Total: 18 files, will reduce to 14 files after cleanup
echo.
echo ================================================================================
echo.

REM Check if we're in the right directory
if not exist "assets\icons\" (
    echo [ERROR] assets\icons\ directory not found
    echo Please run this script from the project root:
    echo   G:\Insight_Workspace\Projects\postbox-logger\
    echo.
    pause
    exit /b 1
)

echo [STEP 1] Identifying fake transparency files...
echo.

set FAKE_COUNT=0

if exist "assets\icons\british_postbox_icon_1.png" (
    for %%F in ("assets\icons\british_postbox_icon_1.png") do set SIZE=%%~zF
    set /a SIZE_MB=!SIZE! / 1048576
    echo [FOUND] british_postbox_icon_1.png (4.9 MB) - FAKE TRANSPARENCY
    set /a FAKE_COUNT+=1
)

if exist "assets\icons\ludlow_postbox_icon_1.png" (
    for %%F in ("assets\icons\ludlow_postbox_icon_1.png") do set SIZE=%%~zF
    set /a SIZE_MB=!SIZE! / 1048576
    echo [FOUND] ludlow_postbox_icon_1.png (5.0 MB) - FAKE TRANSPARENCY
    set /a FAKE_COUNT+=1
)

if exist "assets\icons\penfold_postbox_icon_1.png" (
    for %%F in ("assets\icons\penfold_postbox_icon_1.png") do set SIZE=%%~zF
    set /a SIZE_MB=!SIZE! / 1048576
    echo [FOUND] penfold_postbox_icon_1.png (4.5 MB) - FAKE TRANSPARENCY
    set /a FAKE_COUNT+=1
)

if exist "assets\icons\wall_postbox_icon_1.png" (
    for %%F in ("assets\icons\wall_postbox_icon_1.png") do set SIZE=%%~zF
    set /a SIZE_MB=!SIZE! / 1048576
    echo [FOUND] wall_postbox_icon_1.png (3.7 MB) - FAKE TRANSPARENCY
    set /a FAKE_COUNT+=1
)

echo.

if %FAKE_COUNT% EQU 0 (
    echo [OK] No fake transparency files found - cleanup already done!
    echo.
    pause
    exit /b 0
)

echo Found %FAKE_COUNT% fake transparency files to delete
echo.
echo These files have checkered background pixels baked in and should NOT be used.
echo The correct files (*_master.png) are already present in the folder.
echo.
echo ================================================================================
echo WARNING: This will permanently delete files
echo ================================================================================
echo.

set /p CONFIRM="Type YES to delete fake transparency files: "

if /i not "%CONFIRM%"=="YES" (
    echo.
    echo Operation cancelled by user.
    pause
    exit /b 0
)

echo.
echo [STEP 2] Creating backup before deletion...
echo.

set TIMESTAMP=%DATE:~-4%%DATE:~4,2%%DATE:~7,2%_%TIME:~0,2%%TIME:~3,2%
set TIMESTAMP=%TIMESTAMP: =0%
set BACKUP_DIR=assets_icons_backup_%TIMESTAMP%

if not exist "%BACKUP_DIR%\" (
    mkdir "%BACKUP_DIR%"
    copy "assets\icons\*_icon_1.png" "%BACKUP_DIR%\" >nul 2>&1
    echo [OK] Backup created: %BACKUP_DIR%\
) else (
    echo [SKIP] Backup directory already exists
)

echo.
echo [STEP 3] Deleting fake transparency files...
echo.

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

echo.
echo [OK] Deleted %DELETED% fake transparency files

echo.
echo [STEP 4] Verifying remaining files...
echo.

echo Checking for correct master files (1.2-1.4 MB each)...
echo.

dir "assets\icons\*_master.png" 2>nul | find "_master.png"

echo.
echo Checking for PWA icon sizes...
echo.

dir "assets\icons\icon-*.png" 2>nul | find "icon-"

echo.
echo ================================================================================
echo CLEANUP COMPLETE
echo ================================================================================
echo.
echo Assets folder now contains:
echo   - 4 master files (*_master.png) with TrueColorAlpha ✓
echo   - 10 PWA sizes (icon-*.png) ✓
echo   - Total: 14 files (reduced from 18)
echo.
echo Disk space freed: ~18 MB
echo.
echo Backup location: %BACKUP_DIR%\
echo.
echo To restore deleted files:
echo   copy %BACKUP_DIR%\*.png assets\icons\
echo.
echo ================================================================================

pause
