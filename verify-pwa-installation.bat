@echo off
REM © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
REM Author: Barry Ward
REM Version: 1.1.0 (Fixed)
REM Date: 2025-02-14 10:30:00

echo.
echo ================================================================================
echo PWA Icon Installation Verification
echo Heritage Postbox Logger (Plogger) v0.9.0
echo ================================================================================
echo.

set ERROR_COUNT=0
set WARNING_COUNT=0
set SUCCESS_COUNT=0

REM ============================================================================
REM STEP 1: Check /icons/ directory exists
REM ============================================================================
echo [STEP 1] Checking /icons/ directory...

if exist "icons\" (
    echo [OK] /icons/ directory found
    set /a SUCCESS_COUNT+=1
) else (
    echo [ERROR] /icons/ directory not found
    echo         Did you extract icons.zip to the project root?
    set /a ERROR_COUNT+=1
    goto REPORT
)
echo.

REM ============================================================================
REM STEP 2: Verify PWA icon sizes
REM ============================================================================
echo [STEP 2] Verifying PWA icon sizes...

if exist "icons\icon-16x16.png" (echo [OK] icon-16x16.png & set /a SUCCESS_COUNT+=1) else (echo [ERROR] icon-16x16.png MISSING & set /a ERROR_COUNT+=1)
if exist "icons\icon-32x32.png" (echo [OK] icon-32x32.png & set /a SUCCESS_COUNT+=1) else (echo [ERROR] icon-32x32.png MISSING & set /a ERROR_COUNT+=1)
if exist "icons\icon-72x72.png" (echo [OK] icon-72x72.png & set /a SUCCESS_COUNT+=1) else (echo [ERROR] icon-72x72.png MISSING & set /a ERROR_COUNT+=1)
if exist "icons\icon-96x96.png" (echo [OK] icon-96x96.png & set /a SUCCESS_COUNT+=1) else (echo [ERROR] icon-96x96.png MISSING & set /a ERROR_COUNT+=1)
if exist "icons\icon-120x120.png" (echo [OK] icon-120x120.png & set /a SUCCESS_COUNT+=1) else (echo [ERROR] icon-120x120.png MISSING & set /a ERROR_COUNT+=1)
if exist "icons\icon-144x144.png" (echo [OK] icon-144x144.png & set /a SUCCESS_COUNT+=1) else (echo [ERROR] icon-144x144.png MISSING & set /a ERROR_COUNT+=1)
if exist "icons\icon-152x152.png" (echo [OK] icon-152x152.png & set /a SUCCESS_COUNT+=1) else (echo [ERROR] icon-152x152.png MISSING & set /a ERROR_COUNT+=1)
if exist "icons\icon-192x192.png" (echo [OK] icon-192x192.png ^(maskable^) & set /a SUCCESS_COUNT+=1) else (echo [ERROR] icon-192x192.png MISSING ^(CRITICAL^) & set /a ERROR_COUNT+=1)
if exist "icons\icon-384x384.png" (echo [OK] icon-384x384.png & set /a SUCCESS_COUNT+=1) else (echo [ERROR] icon-384x384.png MISSING & set /a ERROR_COUNT+=1)
if exist "icons\icon-512x512.png" (echo [OK] icon-512x512.png ^(maskable^) & set /a SUCCESS_COUNT+=1) else (echo [ERROR] icon-512x512.png MISSING ^(CRITICAL^) & set /a ERROR_COUNT+=1)

echo.

REM ============================================================================
REM STEP 3: Verify master files
REM ============================================================================
echo [STEP 3] Checking master source files in /icons/...

if exist "icons\british_postbox_master.png" (echo [OK] british_postbox_master.png & set /a SUCCESS_COUNT+=1) else (echo [ERROR] british_postbox_master.png MISSING & set /a ERROR_COUNT+=1)
if exist "icons\ludlow_postbox_master.png" (echo [OK] ludlow_postbox_master.png & set /a SUCCESS_COUNT+=1) else (echo [ERROR] ludlow_postbox_master.png MISSING & set /a ERROR_COUNT+=1)
if exist "icons\penfold_postbox_master.png" (echo [OK] penfold_postbox_master.png & set /a SUCCESS_COUNT+=1) else (echo [ERROR] penfold_postbox_master.png MISSING & set /a ERROR_COUNT+=1)
if exist "icons\wall_postbox_master.png" (echo [OK] wall_postbox_master.png & set /a SUCCESS_COUNT+=1) else (echo [ERROR] wall_postbox_master.png MISSING & set /a ERROR_COUNT+=1)

echo.

REM ============================================================================
REM STEP 4: Check assets/icons/
REM ============================================================================
echo [STEP 4] Checking /assets/icons/ for cleaned masters...

if not exist "assets\icons\" (
    echo [WARN] /assets/icons/ directory not found
    set /a WARNING_COUNT+=1
) else (
    echo Checking for fake transparency icons...
    
    if exist "assets\icons\british_postbox_icon_1.png" (
        echo [ERROR] british_postbox_icon_1.png found - FAKE TRANSPARENCY
        echo         This is the original 4-5MB file with checkered background
        set /a ERROR_COUNT+=1
    )
    if exist "assets\icons\ludlow_postbox_icon_1.png" (
        echo [ERROR] ludlow_postbox_icon_1.png found - FAKE TRANSPARENCY
        set /a ERROR_COUNT+=1
    )
    if exist "assets\icons\penfold_postbox_icon_1.png" (
        echo [ERROR] penfold_postbox_icon_1.png found - FAKE TRANSPARENCY
        set /a ERROR_COUNT+=1
    )
    if exist "assets\icons\wall_postbox_icon_1.png" (
        echo [ERROR] wall_postbox_icon_1.png found - FAKE TRANSPARENCY
        set /a ERROR_COUNT+=1
    )
    
    echo Checking for correct master files...
    
    if exist "assets\icons\british_postbox_master.png" (echo [OK] british_postbox_master.png & set /a SUCCESS_COUNT+=1) else (echo [WARN] british_postbox_master.png not found & set /a WARNING_COUNT+=1)
    if exist "assets\icons\ludlow_postbox_master.png" (echo [OK] ludlow_postbox_master.png & set /a SUCCESS_COUNT+=1) else (echo [WARN] ludlow_postbox_master.png not found & set /a WARNING_COUNT+=1)
    if exist "assets\icons\penfold_postbox_master.png" (echo [OK] penfold_postbox_master.png & set /a SUCCESS_COUNT+=1) else (echo [WARN] penfold_postbox_master.png not found & set /a WARNING_COUNT+=1)
    if exist "assets\icons\wall_postbox_master.png" (echo [OK] wall_postbox_master.png & set /a SUCCESS_COUNT+=1) else (echo [WARN] wall_postbox_master.png not found & set /a WARNING_COUNT+=1)
)

echo.

REM ============================================================================
REM STEP 5: Check manifest.json
REM ============================================================================
echo [STEP 5] Verifying manifest.json...

if exist "manifest.json" (
    echo [OK] manifest.json found
    set /a SUCCESS_COUNT+=1
    
    findstr /C:"any maskable" manifest.json >nul 2>&1
    if errorlevel 1 (
        echo [WARN] manifest.json missing "any maskable" purpose
        set /a WARNING_COUNT+=1
    ) else (
        echo [OK] manifest.json has maskable icon configuration
        set /a SUCCESS_COUNT+=1
    )
    
    findstr /C:"#DC2626" manifest.json >nul 2>&1
    if errorlevel 1 (
        echo [WARN] manifest.json missing Royal Mail Red theme color
        set /a WARNING_COUNT+=1
    ) else (
        echo [OK] manifest.json has theme_color #DC2626
        set /a SUCCESS_COUNT+=1
    )
) else (
    echo [ERROR] manifest.json not found in project root
    set /a ERROR_COUNT+=1
)

echo.

REM ============================================================================
REM STEP 6: Check index.html
REM ============================================================================
echo [STEP 6] Verifying index.html PWA configuration...

if exist "index.html" (
    echo [OK] index.html found
    set /a SUCCESS_COUNT+=1
    
    findstr /C:"rel=\"manifest\"" index.html >nul 2>&1
    if errorlevel 1 (
        echo [ERROR] index.html missing ^<link rel="manifest"^> tag
        set /a ERROR_COUNT+=1
    ) else (
        echo [OK] index.html links to manifest.json
        set /a SUCCESS_COUNT+=1
    )
    
    findstr /C:"theme-color" index.html >nul 2>&1
    if errorlevel 1 (
        echo [WARN] index.html missing theme-color meta tag
        set /a WARNING_COUNT+=1
    ) else (
        echo [OK] index.html has theme-color meta tag
        set /a SUCCESS_COUNT+=1
    )
    
    findstr /C:"apple-touch-icon" index.html >nul 2>&1
    if errorlevel 1 (
        echo [WARN] index.html missing apple-touch-icon
        set /a WARNING_COUNT+=1
    ) else (
        echo [OK] index.html has apple-touch-icon for iOS
        set /a SUCCESS_COUNT+=1
    )
) else (
    echo [ERROR] index.html not found in project root
    set /a ERROR_COUNT+=1
)

echo.

REM ============================================================================
REM REPORT
REM ============================================================================
:REPORT
echo ================================================================================
echo VERIFICATION REPORT
echo ================================================================================
echo Successes: %SUCCESS_COUNT%
echo Warnings:  %WARNING_COUNT%
echo Errors:    %ERROR_COUNT%
echo ================================================================================
echo.

if %ERROR_COUNT% EQU 0 (
    if %WARNING_COUNT% EQU 0 (
        echo [STATUS] ALL CHECKS PASSED - Ready for deployment
        echo.
        echo Next steps:
        echo   1. Deploy to GitHub Pages
        echo   2. Test PWA install on mobile Chrome/Safari
        echo   3. Verify maskable icons appear correctly on home screen
    ) else (
        echo [STATUS] PASSED WITH WARNINGS
        echo.
        echo Review warnings above. Most are non-critical.
        echo See V0.9.0_INTEGRATION_CHECKLIST.md for fixes.
    )
) else (
    echo [STATUS] VERIFICATION FAILED
    echo.
    echo Critical errors detected. Fix before deployment:
    echo.
    if not exist "icons\" echo   - Extract icons.zip to project root
    if not exist "manifest.json" echo   - Copy manifest.json to project root
    if exist "assets\icons\british_postbox_icon_1.png" echo   - Run fix-icon-transparency.bat to replace fake icons
    echo.
    echo See ICONS_INSTALLATION_GUIDE.md for detailed instructions.
)

echo.
echo ================================================================================
echo.
pause 