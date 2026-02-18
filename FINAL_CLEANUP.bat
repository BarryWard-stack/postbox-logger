@echo off
REM © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
REM Final project cleanup

echo.
echo ========================================
echo  Final Project Cleanup
echo ========================================
echo.

REM Step 1: Organize documentation
echo [1/4] Organizing documentation...
if not exist "docs\sessions\v0.9.1" mkdir "docs\sessions\v0.9.1"

move /Y "FIELD_TEST_FIXES_SUMMARY.md" "docs\sessions\v0.9.1\" 2>nul
move /Y "SURGICAL_STRIKE_REPORT.md" "docs\sessions\v0.9.1\" 2>nul
move /Y "V0.9.1_PHILATELY_UPDATE.md" "docs\sessions\v0.9.1\" 2>nul
move /Y "V0.9.1_ASSET_REQUIREMENTS.md" "docs\sessions\v0.9.1\" 2>nul
move /Y "V0.9.1_DEPLOYMENT_READY.md" "docs\sessions\v0.9.1\" 2>nul
move /Y "V0.9.1_QUICK_SUMMARY.md" "docs\sessions\v0.9.1\" 2>nul
move /Y "SESSION_HANDOFF_2026-02-18.md" "docs\sessions\v0.9.1\" 2>nul
move /Y "POSTCARD_IMPLEMENTATION_SUMMARY.md" "docs\sessions\v0.9.1\" 2>nul
move /Y "POSTCARD_MODULE_DOCUMENTATION.md" "docs\future-features\" 2>nul
move /Y "CLEANUP_VERIFICATION_REPORT.md" "docs\sessions\" 2>nul
move /Y "FINAL_STATE_SUMMARY.md" "docs\sessions\" 2>nul
move /Y "ORPHAN_FILES_REPORT.md" "docs\sessions\" 2>nul
move /Y "PROJECT_KNOWLEDGE_UPDATE.md" "docs\sessions\" 2>nul
move /Y "FIREBASE_LOGIN_FIX.md" "docs\sessions\" 2>nul

echo Documentation organized!

REM Step 2: Delete backup folder
echo.
echo [2/4] Removing backup folder...
if exist "docs_backup_20262" (
    rmdir /S /Q "docs_backup_20262"
    echo Backup folder deleted!
) else (
    echo Backup folder already removed.
)

REM Step 3: Remove ALL helper scripts
echo.
echo [3/4] Removing temporary helper scripts...

del /Q "COMMIT_V0.9.1.bat" 2>nul
del /Q "COMMIT_V0.9.1.ps1" 2>nul
del /Q "COMMIT_ALL_UNTRACKED.bat" 2>nul
del /Q "COMMIT_REMAINING.bat" 2>nul
del /Q "HOW_TO_COMMIT.md" 2>nul
del /Q "DEPLOY_TO_FIREBASE.bat" 2>nul
del /Q "DEPLOY_NOW.bat" 2>nul
del /Q "DEPLOYMENT_CHECKLIST.md" 2>nul
del /Q "DEPLOYMENT_VISUAL_GUIDE.md" 2>nul
del /Q "FIREBASE_DEPLOYMENT_PREP.md" 2>nul
del /Q "CREATE_DEPLOYMENT_PACKAGE.bat" 2>nul
del /Q "CHECK_PUSH_STATUS.bat" 2>nul
del /Q "PUSH_TO_GITHUB.bat" 2>nul
del /Q "CLEANUP_HELPER_SCRIPTS.bat" 2>nul
del /Q "CLEANUP_NOW.bat" 2>nul
del /Q "ORGANIZE_DOCS.bat" 2>nul
del /Q "COMMIT_VERSION_FIX.bat" 2>nul
del /Q "FINALIZE_V0.9.1.bat" 2>nul
del /Q "COMMIT_AND_PUSH.bat" 2>nul
del /Q "FINAL_DEPLOY.bat" 2>nul
del /Q "COMMIT_FIREBASE_FIX.bat" 2>nul
del /Q "DEPLOY_FIREBASE.bat" 2>nul
del /Q "DEPLOY_FIREBASE_SIMPLE.bat" 2>nul
del /Q "FIREBASE_DEPLOY_FIXED.bat" 2>nul
del /Q "FIREBASE_DEPLOY_REAL_TERMINAL.bat" 2>nul
del /Q "DEEP_CLEANUP.bat" 2>nul

echo Helper scripts removed!

REM Step 4: Remove debug logs
echo.
echo [4/4] Removing debug logs...
del /Q "firebase-debug.log" 2>nul

echo.
echo ========================================
echo  Cleanup Complete!
echo ========================================
echo.
echo Removed:
echo - docs_backup_20262/ folder
echo - 25+ temporary helper scripts
echo - firebase-debug.log
echo.
echo Organized:
echo - 14 documentation files moved to proper folders
echo.
echo Root directory now contains:
echo - 6 core application files
echo - 2 Firebase config files
echo - 1 quick reference
echo - 1 migration script
echo - 1 launch template
echo - 3 folders (assets, docs, tools)
echo.
echo Total: 11 files + 3 folders = CLEAN!
echo.
timeout /t 5 >nul
