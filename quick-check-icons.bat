@echo off
REM © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
REM Author: Barry Ward
REM Version: 1.0.0
REM Date: 2025-02-14 10:15:00
REM Purpose: Quick check for fake transparency icons

echo ================================================================================
echo Quick Icon Transparency Check
echo ================================================================================
echo.
echo Checking for FAKE TRANSPARENCY icons (4-5 MB files with checkered backgrounds)
echo.

set FAKE_FOUND=0

echo Checking /assets/icons/ for oversized files...
echo.

if exist "assets\icons\british_postbox_icon_1.png" (
    for %%F in ("assets\icons\british_postbox_icon_1.png") do set SIZE=%%~zF
    set /a SIZE_MB=!SIZE! / 1048576
    echo [CHECK] british_postbox_icon_1.png: !SIZE_MB! MB
    if !SIZE_MB! GEQ 3 (
        echo         ^^^ FAKE TRANSPARENCY - DELETE THIS FILE
        set /a FAKE_FOUND+=1
    )
)

if exist "assets\icons\ludlow_postbox_icon_1.png" (
    for %%F in ("assets\icons\ludlow_postbox_icon_1.png") do set SIZE=%%~zF
    set /a SIZE_MB=!SIZE! / 1048576
    echo [CHECK] ludlow_postbox_icon_1.png: !SIZE_MB! MB
    if !SIZE_MB! GEQ 3 (
        echo         ^^^ FAKE TRANSPARENCY - DELETE THIS FILE
        set /a FAKE_FOUND+=1
    )
)

if exist "assets\icons\penfold_postbox_icon_1.png" (
    for %%F in ("assets\icons\penfold_postbox_icon_1.png") do set SIZE=%%~zF
    set /a SIZE_MB=!SIZE! / 1048576
    echo [CHECK] penfold_postbox_icon_1.png: !SIZE_MB! MB
    if !SIZE_MB! GEQ 3 (
        echo         ^^^ FAKE TRANSPARENCY - DELETE THIS FILE
        set /a FAKE_FOUND+=1
    )
)

if exist "assets\icons\wall_postbox_icon_1.png" (
    for %%F in ("assets\icons\wall_postbox_icon_1.png") do set SIZE=%%~zF
    set /a SIZE_MB=!SIZE! / 1048576
    echo [CHECK] wall_postbox_icon_1.png: !SIZE_MB! MB
    if !SIZE_MB! GEQ 3 (
        echo         ^^^ FAKE TRANSPARENCY - DELETE THIS FILE
        set /a FAKE_FOUND+=1
    )
)

echo.
echo Checking for CORRECT files (*_master.png, 1-2 MB)...
echo.

if exist "assets\icons\british_postbox_master.png" (
    for %%F in ("assets\icons\british_postbox_master.png") do set SIZE=%%~zF
    set /a SIZE_MB=!SIZE! / 1048576
    echo [CHECK] british_postbox_master.png: !SIZE_MB! MB ✓
) else (
    echo [MISSING] british_postbox_master.png
)

if exist "assets\icons\ludlow_postbox_master.png" (
    for %%F in ("assets\icons\ludlow_postbox_master.png") do set SIZE=%%~zF
    set /a SIZE_MB=!SIZE! / 1048576
    echo [CHECK] ludlow_postbox_master.png: !SIZE_MB! MB ✓
) else (
    echo [MISSING] ludlow_postbox_master.png
)

if exist "assets\icons\penfold_postbox_master.png" (
    for %%F in ("assets\icons\penfold_postbox_master.png") do set SIZE=%%~zF
    set /a SIZE_MB=!SIZE! / 1048576
    echo [CHECK] penfold_postbox_master.png: !SIZE_MB! MB ✓
) else (
    echo [MISSING] penfold_postbox_master.png
)

if exist "assets\icons\wall_postbox_master.png" (
    for %%F in ("assets\icons\wall_postbox_master.png") do set SIZE=%%~zF
    set /a SIZE_MB=!SIZE! / 1048576
    echo [CHECK] wall_postbox_master.png: !SIZE_MB! MB ✓
) else (
    echo [MISSING] wall_postbox_master.png
)

echo.
echo ================================================================================

if %FAKE_FOUND% GTR 0 (
    echo [RESULT] ✗ FOUND %FAKE_FOUND% FAKE TRANSPARENCY FILES
    echo.
    echo ACTION REQUIRED:
    echo 1. Delete all *_icon_1.png files from assets/icons/
    echo 2. Copy *_master.png files from /icons/ to assets/icons/
    echo.
    echo Quick fix command:
    echo   cd assets\icons
    echo   del *_icon_1.png
    echo   copy ..\..\icons\*_master.png .
) else (
    echo [RESULT] ✓ NO FAKE TRANSPARENCY FILES DETECTED
    echo.
    echo Your icons appear to be correctly converted with TrueColorAlpha.
)

echo ================================================================================
echo.
pause
