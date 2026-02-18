# © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
# Commit v0.9.1 Philately Update + Field Test #1 Fixes

Write-Host ""
Write-Host "========================================"
Write-Host " Committing v0.9.1 Changes"
Write-Host "========================================"
Write-Host ""

# Stage modified core files
Write-Host "[1/4] Staging modified core files..."
git add index.html
git add plogger.js
git add postboxAssets.js
git add postcard-engine.js
git add manifest.json
git add service-worker.js

# Stage new documentation
Write-Host "[2/4] Staging documentation..."
git add FIELD_TEST_FIXES_SUMMARY.md
git add SURGICAL_STRIKE_REPORT.md
git add V0.9.1_PHILATELY_UPDATE.md
git add V0.9.1_ASSET_REQUIREMENTS.md
git add V0.9.1_DEPLOYMENT_READY.md
git add V0.9.1_QUICK_SUMMARY.md
git add SESSION_HANDOFF_2026-02-18.md
git add FIREBASE_DEPLOYMENT_PREP.md
git add DEPLOYMENT_VISUAL_GUIDE.md

# Stage templates
Write-Host "[3/4] Staging Firebase templates..."
git add firebase.json.template
git add .firebaserc.template

# Stage updated progress tracker
git add docs\sessions\PROGRESS_TRACKER.md

# Create commit with multi-line message
Write-Host "[4/4] Creating commit..."
$commitMessage = @"
v0.9.1: Philately Update + Field Test #1 Fixes

Field Test #1 Fixes:
- Add pulsating blue dot GPS marker (CSS animation)
- Implement SatNav handover (geo: URI scheme)
- Harden persistence with localStorage fallback
- Create visual picker grid (Newbie Mode with info panels)

Philately Research Integration:
- Add Edward VIII Holy Grail entry (500 points, rarity 10/10)
- Enhance Victorian Fluted (300 points, ~150 survive)
- Add regional variations (Guernsey Blue, Isle of Man)
- Integrate heritage postmark stamp (with fallback)
- Add period metadata to all 23 postbox types

Documentation:
- Field Test fixes summary and surgical strike report
- Philately update and asset requirements
- Firebase deployment preparation guides
- Session handoff and deployment readiness

Files Modified: index.html, plogger.js, postboxAssets.js, postcard-engine.js
New Types: Edward VIII, Guernsey Blue, Isle of Man
Total Types: 21 → 23

© 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
"@

git commit -m $commitMessage

Write-Host ""
Write-Host "========================================"
Write-Host " Commit Complete!"
Write-Host "========================================"
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Review commit: git log -1"
Write-Host "2. Push to remote: git push origin main"
Write-Host ""

Read-Host "Press Enter to continue"
