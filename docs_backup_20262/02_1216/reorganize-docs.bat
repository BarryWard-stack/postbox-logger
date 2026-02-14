@echo off
REM © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
REM Author: Barry Ward
REM Version: 1.0.0
REM Date: 2025-02-14 12:15:00
REM Purpose: Reorganize cluttered /docs/ folder into logical subdirectories

setlocal EnableDelayedExpansion

echo.
echo ================================================================================
echo Documentation Folder Reorganization
echo Heritage Postbox Logger (Plogger)
echo ================================================================================
echo.
echo Current structure: 26 files in flat /docs/ folder
echo.
echo Proposed structure:
echo   /docs/
echo     ├── [Core docs remain at root]
echo     ├── future-features/    [Phase 3-4 roadmap docs]
echo     ├── pwa/                [PWA and icon documentation]
echo     ├── sessions/           [Progress tracking and handoffs]
echo     ├── guides/             [Implementation and quick-start guides]
echo     └── tools/              [Batch file documentation]
echo.
echo ================================================================================
echo.

REM Check if we're in the right directory
if not exist "docs\" (
    echo [ERROR] docs\ directory not found
    echo Please run this script from the project root:
    echo   G:\Insight_Workspace\Projects\postbox-logger\
    echo.
    pause
    exit /b 1
)

echo [STEP 1] Creating backup of current docs folder...
echo.

REM Create backup with timestamp
set TIMESTAMP=%DATE:~-4%%DATE:~4,2%%DATE:~7,2%_%TIME:~0,2%%TIME:~3,2%
set TIMESTAMP=%TIMESTAMP: =0%
set BACKUP_DIR=docs_backup_%TIMESTAMP%

if not exist "%BACKUP_DIR%\" (
    mkdir "%BACKUP_DIR%"
    xcopy /E /I /Q docs "%BACKUP_DIR%" >nul
    echo [OK] Backup created: %BACKUP_DIR%\
) else (
    echo [SKIP] Backup already exists
)

echo.
echo [STEP 2] Creating new subdirectories...
echo.

mkdir "docs\future-features" 2>nul
mkdir "docs\pwa" 2>nul
mkdir "docs\sessions" 2>nul
mkdir "docs\guides" 2>nul
mkdir "docs\tools" 2>nul

echo [OK] Created 5 subdirectories

echo.
echo [STEP 3] Moving files to appropriate locations...
echo.

REM ============================================================================
REM FUTURE FEATURES (Phase 3-4 roadmap)
REM ============================================================================
echo Moving future feature documentation...

move /Y "docs\DIGITAL_PHILATELY_MODULE.md" "docs\future-features\" >nul 2>&1
if errorlevel 1 (echo [SKIP] DIGITAL_PHILATELY_MODULE.md) else (echo [MOVE] future-features\DIGITAL_PHILATELY_MODULE.md)

move /Y "docs\FUTURE_FEATURES_INDEX.md" "docs\future-features\" >nul 2>&1
if errorlevel 1 (echo [SKIP] FUTURE_FEATURES_INDEX.md) else (echo [MOVE] future-features\FUTURE_FEATURES_INDEX.md)

move /Y "docs\FUTURE_FEATURES_README.md" "docs\future-features\" >nul 2>&1
if errorlevel 1 (echo [SKIP] FUTURE_FEATURES_README.md) else (echo [MOVE] future-features\FUTURE_FEATURES_README.md)

move /Y "docs\PROXIMITY_POSTCARD_CONCEPT.md" "docs\future-features\" >nul 2>&1
if errorlevel 1 (echo [SKIP] PROXIMITY_POSTCARD_CONCEPT.md) else (echo [MOVE] future-features\PROXIMITY_POSTCARD_CONCEPT.md)

move /Y "docs\STAMP_ASSET_GENERATION_BRIEF.md" "docs\future-features\" >nul 2>&1
if errorlevel 1 (echo [SKIP] STAMP_ASSET_GENERATION_BRIEF.md) else (echo [MOVE] future-features\STAMP_ASSET_GENERATION_BRIEF.md)

REM ============================================================================
REM PWA DOCUMENTATION (Icons, manifest, installation)
REM ============================================================================
echo.
echo Moving PWA and icon documentation...

move /Y "docs\ICON_GENERATION_BRIEF.md" "docs\pwa\" >nul 2>&1
if errorlevel 1 (echo [SKIP] ICON_GENERATION_BRIEF.md) else (echo [MOVE] pwa\ICON_GENERATION_BRIEF.md)

move /Y "docs\ICON_TRANSPARENCY_VERIFICATION.md" "docs\pwa\" >nul 2>&1
if errorlevel 1 (echo [SKIP] ICON_TRANSPARENCY_VERIFICATION.md) else (echo [MOVE] pwa\ICON_TRANSPARENCY_VERIFICATION.md)

move /Y "docs\ICONS_INSTALLATION_GUIDE.md" "docs\pwa\" >nul 2>&1
if errorlevel 1 (echo [SKIP] ICONS_INSTALLATION_GUIDE.md) else (echo [MOVE] pwa\ICONS_INSTALLATION_GUIDE.md)

move /Y "docs\PWA icon processing summary.md" "docs\pwa\" >nul 2>&1
if errorlevel 1 (echo [SKIP] PWA icon processing summary.md) else (echo [MOVE] pwa\PWA icon processing summary.md)

move /Y "docs\PWA_ICON_PROCESSING_SUMMARY.md" "docs\pwa\" >nul 2>&1
if errorlevel 1 (echo [SKIP] PWA_ICON_PROCESSING_SUMMARY.md) else (echo [MOVE] pwa\PWA_ICON_PROCESSING_SUMMARY.md)

move /Y "docs\V0.9.0_INTEGRATION_CHECKLIST.md" "docs\pwa\" >nul 2>&1
if errorlevel 1 (echo [SKIP] V0.9.0_INTEGRATION_CHECKLIST.md) else (echo [MOVE] pwa\V0.9.0_INTEGRATION_CHECKLIST.md)

REM ============================================================================
REM SESSION TRACKING (Progress and handoffs)
REM ============================================================================
echo.
echo Moving session and progress tracking...

move /Y "docs\SESSION_HANDOFF.md" "docs\sessions\" >nul 2>&1
if errorlevel 1 (echo [SKIP] SESSION_HANDOFF.md) else (echo [MOVE] sessions\SESSION_HANDOFF.md)

move /Y "docs\SESSION_SUMMARY_2025-02-14.md" "docs\sessions\" >nul 2>&1
if errorlevel 1 (echo [SKIP] SESSION_SUMMARY_2025-02-14.md) else (echo [MOVE] sessions\SESSION_SUMMARY_2025-02-14.md)

move /Y "docs\PROGRESS_TRACKER.md" "docs\sessions\" >nul 2>&1
if errorlevel 1 (echo [SKIP] PROGRESS_TRACKER.md) else (echo [MOVE] sessions\PROGRESS_TRACKER.md)

REM ============================================================================
REM IMPLEMENTATION GUIDES
REM ============================================================================
echo.
echo Moving implementation guides...

move /Y "docs\PHASE_1_IMPLEMENTATION_GUIDE.md" "docs\guides\" >nul 2>&1
if errorlevel 1 (echo [SKIP] PHASE_1_IMPLEMENTATION_GUIDE.md) else (echo [MOVE] guides\PHASE_1_IMPLEMENTATION_GUIDE.md)

move /Y "docs\QUICK_START_ADAPTED.md" "docs\guides\" >nul 2>&1
if errorlevel 1 (echo [SKIP] QUICK_START_ADAPTED.md) else (echo [MOVE] guides\QUICK_START_ADAPTED.md)

move /Y "docs\QUICK_START_GUIDE.md" "docs\guides\" >nul 2>&1
if errorlevel 1 (echo [SKIP] QUICK_START_GUIDE.md) else (echo [MOVE] guides\QUICK_START_GUIDE.md)

move /Y "docs\RESEARCH_IMPLEMENTATION_MAPPING.md" "docs\guides\" >nul 2>&1
if errorlevel 1 (echo [SKIP] RESEARCH_IMPLEMENTATION_MAPPING.md) else (echo [MOVE] guides\RESEARCH_IMPLEMENTATION_MAPPING.md)

move /Y "docs\GIT_COMMIT_GUIDE.md" "docs\guides\" >nul 2>&1
if errorlevel 1 (echo [SKIP] GIT_COMMIT_GUIDE.md) else (echo [MOVE] guides\GIT_COMMIT_GUIDE.md)

REM ============================================================================
REM TOOLS DOCUMENTATION
REM ============================================================================
echo.
echo Moving tools documentation...

move /Y "docs\BATCH_FILES_README.md" "docs\tools\" >nul 2>&1
if errorlevel 1 (echo [SKIP] BATCH_FILES_README.md) else (echo [MOVE] tools\BATCH_FILES_README.md)

REM ============================================================================
REM CORE DOCS (Stay at root)
REM ============================================================================
echo.
echo Files remaining at /docs/ root:
echo   - README.md
echo   - MASTER_FILE_INDEX.md
echo   - CURRENT_STATE_SUMMARY.md
echo   - HERITAGE_POSTBOX_ROADMAP.md
echo   - HERITAGE_POSTBOX_RESEARCH_SUMMARY.md
echo   - heritage-postbox-v0.8.0-firebase.html

echo.
echo [STEP 4] Creating README files in each subdirectory...
echo.

REM ============================================================================
REM Create README in future-features
REM ============================================================================
(
echo # Future Features Documentation
echo.
echo **Status:** Phase 3-4 features, deferred until core app stable
echo.
echo **Files:**
echo - `FUTURE_FEATURES_INDEX.md` - Master roadmap with decision gates
echo - `DIGITAL_PHILATELY_MODULE.md` - Stamps and postcards implementation
echo - `STAMP_ASSET_GENERATION_BRIEF.md` - Asset generation when Recraft resets
echo - `PROXIMITY_POSTCARD_CONCEPT.md` - Crowdsourced data collection via proximity
echo - `FUTURE_FEATURES_README.md` - Organization and usage guide
echo.
echo **When to use:** After Phase 1-2 complete (100+ active users^)
) > "docs\future-features\README.md"

echo [CREATE] future-features\README.md

REM ============================================================================
REM Create README in pwa
REM ============================================================================
(
echo # PWA Documentation
echo.
echo **Status:** v0.9.0 implementation guides
echo.
echo **Files:**
echo - `V0.9.0_INTEGRATION_CHECKLIST.md` - Deployment checklist
echo - `ICON_TRANSPARENCY_VERIFICATION.md` - Asset quality workflow
echo - `ICONS_INSTALLATION_GUIDE.md` - Installation instructions
echo - `PWA_ICON_PROCESSING_SUMMARY.md` - Technical processing summary
echo - `ICON_GENERATION_BRIEF.md` - Icon requirements
echo.
echo **When to use:** Deploying v0.9.0 or processing new icon batches
) > "docs\pwa\README.md"

echo [CREATE] pwa\README.md

REM ============================================================================
REM Create README in sessions
REM ============================================================================
(
echo # Session Tracking
echo.
echo **Status:** Progress tracking and development handoffs
echo.
echo **Files:**
echo - `SESSION_HANDOFF.md` - Latest development session summary
echo - `SESSION_SUMMARY_2025-02-14.md` - Detailed session notes
echo - `PROGRESS_TRACKER.md` - Sprint and milestone tracking
echo.
echo **When to use:** Reviewing recent work or planning next sprint
) > "docs\sessions\README.md"

echo [CREATE] sessions\README.md

REM ============================================================================
REM Create README in guides
REM ============================================================================
(
echo # Implementation Guides
echo.
echo **Status:** Quick-start and implementation documentation
echo.
echo **Files:**
echo - `PHASE_1_IMPLEMENTATION_GUIDE.md` - Phase 1 detailed guide
echo - `QUICK_START_GUIDE.md` - Quick start instructions
echo - `QUICK_START_ADAPTED.md` - Adapted quick start
echo - `RESEARCH_IMPLEMENTATION_MAPPING.md` - Research to code mapping
echo - `GIT_COMMIT_GUIDE.md` - Git workflow and commit messages
echo.
echo **When to use:** Onboarding new developers or implementing new phases
) > "docs\guides\README.md"

echo [CREATE] guides\README.md

REM ============================================================================
REM Create README in tools
REM ============================================================================
(
echo # Tools Documentation
echo.
echo **Status:** Batch file and automation tool guides
echo.
echo **Files:**
echo - `BATCH_FILES_README.md` - Verification and automation tools
echo.
echo **When to use:** Running verification scripts or automating workflows
) > "docs\tools\README.md"

echo [CREATE] tools\README.md

echo.
echo ================================================================================
echo REORGANIZATION COMPLETE
echo ================================================================================
echo.
echo New structure:
tree /F docs

echo.
echo ================================================================================
echo ROLLBACK INSTRUCTIONS
echo ================================================================================
echo.
echo If you need to undo this reorganization:
echo   1. Delete all subdirectories: rmdir /S /Q docs\future-features docs\pwa docs\sessions docs\guides docs\tools
echo   2. Restore backup: xcopy /E /I /Y %BACKUP_DIR% docs
echo   3. Delete backup: rmdir /S /Q %BACKUP_DIR%
echo.
echo Backup location: %BACKUP_DIR%\
echo.
echo ================================================================================
echo NEXT STEPS
echo ================================================================================
echo.
echo 1. Review new structure with: tree docs
echo 2. Update any documentation links that referenced old paths
echo 3. Commit changes:
echo      git add docs/
echo      git commit -m "docs: reorganize into logical subdirectories"
echo.
echo ================================================================================

pause
