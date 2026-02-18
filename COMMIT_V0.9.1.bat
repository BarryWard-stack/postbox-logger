@echo off
REM © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
REM Commit v0.9.1 Philately Update + Field Test #1 Fixes

echo.
echo ========================================
echo  Committing v0.9.1 Changes
echo ========================================
echo.

REM Stage modified core files
echo [1/4] Staging modified core files...
git add index.html
git add plogger.js
git add postboxAssets.js
git add postcard-engine.js
git add manifest.json
git add service-worker.js

REM Stage new documentation
echo [2/4] Staging documentation...
git add FIELD_TEST_FIXES_SUMMARY.md
git add SURGICAL_STRIKE_REPORT.md
git add V0.9.1_PHILATELY_UPDATE.md
git add V0.9.1_ASSET_REQUIREMENTS.md
git add V0.9.1_DEPLOYMENT_READY.md
git add V0.9.1_QUICK_SUMMARY.md
git add SESSION_HANDOFF_2026-02-18.md
git add FIREBASE_DEPLOYMENT_PREP.md
git add DEPLOYMENT_VISUAL_GUIDE.md

REM Stage templates
echo [3/4] Staging Firebase templates...
git add firebase.json.template
git add .firebaserc.template

REM Stage updated progress tracker
git add docs\sessions\PROGRESS_TRACKER.md

REM Create commit
echo [4/4] Creating commit...
git commit -m "v0.9.1: Philately Update + Field Test #1 Fixes" -m "Field Test #1 Fixes:" -m "- Add pulsating blue dot GPS marker (CSS animation)" -m "- Implement SatNav handover (geo: URI scheme)" -m "- Harden persistence with localStorage fallback" -m "- Create visual picker grid (Newbie Mode with info panels)" -m "" -m "Philately Research Integration:" -m "- Add Edward VIII Holy Grail entry (500 points, rarity 10/10)" -m "- Enhance Victorian Fluted (300 points, ~150 survive)" -m "- Add regional variations (Guernsey Blue, Isle of Man)" -m "- Integrate heritage postmark stamp (with fallback)" -m "- Add period metadata to all 23 postbox types" -m "" -m "Documentation:" -m "- Field Test fixes summary and surgical strike report" -m "- Philately update and asset requirements" -m "- Firebase deployment preparation guides" -m "- Session handoff and deployment readiness" -m "" -m "Files Modified: index.html, plogger.js, postboxAssets.js, postcard-engine.js" -m "New Types: Edward VIII, Guernsey Blue, Isle of Man" -m "Total Types: 21 → 23" -m "" -m "© 2025 Insight Geospatial, Eurotech Marine Data Services Ltd."

echo.
echo ========================================
echo  Commit Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Review commit: git log -1
echo 2. Push to remote: git push origin main
echo.

pause
