@echo off
REM © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
REM Master script to finalize v0.9.1 release

echo.
echo ========================================
echo  Finalizing v0.9.1 Release
echo ========================================
echo.

REM Step 1: Organize documentation
echo [1/4] Organizing documentation files...
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

echo Documentation organized!

echo.
REM Step 2: Clean up helper scripts
echo [2/4] Cleaning up temporary helper scripts...

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

echo Helper scripts removed!

echo.
REM Step 3: Stage all changes
echo [3/4] Staging all changes for commit...
git add .

echo.
REM Step 4: Create comprehensive commit
echo [4/4] Creating commit...
git commit -m "Finalize v0.9.1 release: organize docs and clean up helpers" -m "Changes:" -m "- Organize v0.9.1 documentation into docs/sessions/v0.9.1/" -m "- Move postcard module docs to docs/future-features/" -m "- Move cleanup reports to docs/sessions/" -m "- Remove 17 temporary helper scripts from deployment session" -m "- Update version labels in index.html to v0.9.1" -m "" -m "Documentation organized:" -m "- 8 files moved to docs/sessions/v0.9.1/" -m "- 1 file moved to docs/future-features/" -m "- 4 files moved to docs/sessions/" -m "" -m "Helper scripts removed:" -m "- Commit helpers (5 files)" -m "- Deployment helpers (6 files)" -m "- Status check helpers (2 files)" -m "- Cleanup scripts (4 files)" -m "" -m "Root directory now contains only:" -m "- Core application files (6)" -m "- Firebase templates (2)" -m "- Quick reference (1)" -m "- Organized folders (3)" -m "" -m "© 2025 Insight Geospatial, Eurotech Marine Data Services Ltd."

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Commit failed!
    echo.
    timeout /t 5 >nul
    exit /b 1
)

echo.
echo Pushing to GitHub...
git push origin main

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Push failed!
    echo Try: git push origin master
    echo.
    timeout /t 5 >nul
    exit /b 1
)

echo.
echo ========================================
echo  v0.9.1 Release Finalized!
echo ========================================
echo.
echo Completed:
echo - Documentation organized
echo - Helper scripts cleaned up
echo - Changes committed and pushed
echo.
echo Your site will update in 1-2 minutes at:
echo https://barryward2070-dotcom.github.io/heritage-postbox/
echo.
echo Project is now clean and production-ready!
echo.
timeout /t 5 >nul

REM Self-delete
(goto) 2>nul & del "%~f0"
