@echo off
REM © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd. All rights reserved.
REM Author: Barry Ward
REM Folder Reorganization Migration Script
REM Date: 2026-02-17

echo ========================================
echo Plogger Folder Reorganization
echo ========================================
echo.
echo This script will reorganize the postbox-logger directory
echo into a production-ready structure.
echo.
echo WARNING: This will move files and folders.
echo Make sure you have a backup or are in a git repository.
echo.
pause

echo.
echo Step 1: Creating new directory structure...
echo.

REM Create new directories if they don't exist
if not exist "assets\icons" mkdir "assets\icons"
if not exist "assets\branding" mkdir "assets\branding"
if not exist "docs\guides" mkdir "docs\guides"
if not exist "docs\sessions" mkdir "docs\sessions"
if not exist "docs\pwa" mkdir "docs\pwa"
if not exist "tools" mkdir "tools"

echo ✓ Directories created

echo.
echo Step 2: Moving tool scripts to /tools/...
echo.

REM Move .bat scripts (except this one and core PWA scripts)
if exist "capture_structure.bat" move "capture_structure.bat" "tools\"
if exist "capture_structure.py" move "capture_structure.py" "tools\"
if exist "generate-pwa-icons.js" move "generate-pwa-icons.js" "tools\"
if exist "heritage-color-multipliers.js" move "heritage-color-multipliers.js" "tools\"
if exist "setup_pwa.bat" move "setup_pwa.bat" "tools\"
if exist "verify-pwa-installation.bat" move "verify-pwa-installation.bat" "tools\"
if exist "fix-icon-transparency.bat" move "fix-icon-transparency.bat" "tools\"
if exist "quick-check-icons.bat" move "quick-check-icons.bat" "tools\"
if exist "cleanup-assets-icons.bat" move "cleanup-assets-icons.bat" "tools\"
if exist "reorganize-docs.bat" move "reorganize-docs.bat" "tools\"
if exist "RESET_ENV.bat" move "RESET_ENV.bat" "tools\"
if exist "launch_template.bat" move "launch_template.bat" "tools\"

echo ✓ Tools moved

echo.
echo Step 3: Moving documentation to organized structure...
echo.

REM Move guides
if exist "docs\QUICK_START_GUIDE.md" move "docs\QUICK_START_GUIDE.md" "docs\guides\"
if exist "docs\PHASE_1_IMPLEMENTATION_GUIDE.md" move "docs\PHASE_1_IMPLEMENTATION_GUIDE.md" "docs\guides\"
if exist "docs\RESEARCH_IMPLEMENTATION_MAPPING.md" move "docs\RESEARCH_IMPLEMENTATION_MAPPING.md" "docs\guides\"
if exist "docs\QUICK_START_ADAPTED.md" move "docs\QUICK_START_ADAPTED.md" "docs\guides\"

REM Move session docs
if exist "docs\SESSION_SUMMARY_2025-02-14.md" move "docs\SESSION_SUMMARY_2025-02-14.md" "docs\sessions\"
if exist "docs\SESSION_HANDOFF.md" move "docs\SESSION_HANDOFF.md" "docs\sessions\"
if exist "docs\PROGRESS_TRACKER.md" move "docs\PROGRESS_TRACKER.md" "docs\sessions\"

REM Move PWA docs
if exist "docs\ICONS_INSTALLATION_GUIDE.md" move "docs\ICONS_INSTALLATION_GUIDE.md" "docs\pwa\"
if exist "docs\PWA_ICON_PROCESSING_SUMMARY.md" move "docs\PWA_ICON_PROCESSING_SUMMARY.md" "docs\pwa\"
if exist "docs\ICON_TRANSPARENCY_VERIFICATION.md" move "docs\ICON_TRANSPARENCY_VERIFICATION.md" "docs\pwa\"
if exist "docs\ICON_GENERATION_BRIEF.md" move "docs\ICON_GENERATION_BRIEF.md" "docs\pwa\"
if exist "docs\V0.9.0_INTEGRATION_CHECKLIST.md" move "docs\V0.9.0_INTEGRATION_CHECKLIST.md" "docs\pwa\"
if exist "docs\PWA icon processing summary.md" move "docs\PWA icon processing summary.md" "docs\pwa\"

echo ✓ Documentation organized

echo.
echo Step 4: Asset reorganization instructions...
echo.

echo MANUAL STEP REQUIRED:
echo.
echo Please manually move the following to /assets/icons/:
echo   - All icon-*.png files (PWA icons)
echo   - All postbox type images
echo   - All monarch cipher images
echo.
echo If you have branding assets, move them to /assets/branding/
echo.

echo.
echo ========================================
echo Reorganization Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Move icon files to /assets/icons/ manually
echo 2. Test PWA functionality
echo 3. Verify all assets load correctly
echo 4. Review docs\REORGANIZATION_2026-02-17.md
echo.
echo File references have already been updated in:
echo   - manifest.json
echo   - service-worker.js
echo   - postboxAssets.js
echo.

pause
