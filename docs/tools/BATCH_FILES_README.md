# PWA Installation Verification Tools
© 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
Author: Barry Ward | Date: 2025-02-14 10:25:00

---

## 📋 Three Batch Files - Usage Guide

### 🔍 **1. quick-check-icons.bat** (Run This FIRST)

**Purpose:** Quick scan for fake transparency icons (30 seconds)

**What it checks:**
- Scans `/assets/icons/` for oversized files (4-5 MB = fake transparency)
- Shows which files need replacement
- Lists current file sizes

**When to use:** 
- After extracting icons.zip
- To verify current state before fixing

**Output example:**
```
[CHECK] british_postbox_icon_1.png: 4 MB
        ^^^ FAKE TRANSPARENCY - DELETE THIS FILE
[CHECK] british_postbox_master.png: 1 MB ✓
```

---

### 🛠️ **2. fix-icon-transparency.bat** (Run This IF Issues Found)

**Purpose:** Automated fix for fake transparency icons

**What it does:**
1. Creates backup in `/assets/icons_backup/`
2. Deletes fake transparency files (*_icon_1.png)
3. Copies cleaned masters from `/icons/` to `/assets/icons/`
4. Verifies file sizes after replacement

**⚠️ WARNING:** This permanently deletes files (but creates backup first)

**When to use:**
- If quick-check-icons.bat found fake transparency files
- To automatically replace icons without manual copy/paste

**Requires:**
- icons.zip must be extracted to project root first
- `/icons/` directory must exist with all master files

**Safety:**
- Asks for confirmation (type "YES" to proceed)
- Creates backup before deleting anything
- Verifies results after completion

---

### ✅ **3. verify-pwa-installation.bat** (Run This LAST)

**Purpose:** Comprehensive PWA deployment verification

**What it checks:**
- ✅ `/icons/` directory exists
- ✅ All 10 PWA sizes present (16-512px)
- ✅ 4 master files in `/icons/`
- ✅ `/assets/icons/` has correct file sizes (1-2 MB)
- ✅ `manifest.json` exists with maskable config
- ✅ `index.html` has PWA meta tags
- ✅ Maskable icons (192px, 512px) correct size

**Output:**
- Success count
- Warning count
- Error count
- Overall status (PASSED / WARNINGS / FAILED)

**When to use:**
- After running fix-icon-transparency.bat
- Before deploying to GitHub Pages
- As final pre-deployment check

---

## 🎯 Recommended Workflow

### First-Time Setup:
```
1. Extract icons.zip to project root
2. Run: quick-check-icons.bat
3. If issues found → Run: fix-icon-transparency.bat
4. Run: verify-pwa-installation.bat
5. Fix any remaining warnings
6. Deploy to GitHub Pages
```

### Quick Verification (Already Set Up):
```
1. Run: verify-pwa-installation.bat
2. Review any warnings/errors
3. Deploy if all checks pass
```

---

## 📊 Understanding Results

### ✓ Success (Green)
All checks passed. Ready for deployment.

### ⚠ Warnings (Yellow)
Non-critical issues. Project may work, but best practices recommend fixing.

**Common warnings:**
- Missing theme-color meta tag
- Missing apple-touch-icon
- File size slightly off expected range

**Action:** Review V0.9.0_INTEGRATION_CHECKLIST.md for fixes

### ✗ Errors (Red)
Critical issues preventing PWA functionality.

**Common errors:**
- Missing /icons/ directory
- Missing PWA icon sizes
- Fake transparency files detected (4-5 MB)
- Missing manifest.json

**Action:** 
1. Extract icons.zip
2. Run fix-icon-transparency.bat
3. Re-verify with verify-pwa-installation.bat

---

## 🚨 Troubleshooting

**"icons.zip not extracted"**
- Extract icons.zip to project root
- Should create `/icons/` folder with 14 files

**"Fake transparency detected"**
- Run: fix-icon-transparency.bat
- Or manually: Delete *_icon_1.png, copy *_master.png from /icons/

**"manifest.json not found"**
- Copy manifest.json from deliverables to project root

**"index.html missing PWA tags"**
- See V0.9.0_INTEGRATION_CHECKLIST.md Step 1.3

**"Permission denied" errors**
- Run batch file as Administrator
- Close any programs using the files (VS Code, image viewers)

---

## 📁 Required Files Before Running

**Must have:**
- icons.zip (extracted to project root)
- manifest.json (in project root)
- index.html (in project root)

**Optional but recommended:**
- V0.9.0_INTEGRATION_CHECKLIST.md (for fixing warnings)
- ICONS_INSTALLATION_GUIDE.md (for manual setup)

---

## 🎓 What Each File Size Means

| File Type | Fake Transparency | TrueColorAlpha |
|-----------|-------------------|----------------|
| Master (2000px) | 4-5 MB ❌ | 1.2-1.4 MB ✅ |
| icon-192x192.png | 500+ KB ❌ | ~21 KB ✅ |
| icon-512x512.png | 2+ MB ❌ | ~66 KB ✅ |

**If you see 4-5 MB files → FAKE TRANSPARENCY (checkered background baked in)**  
**If you see 1-2 MB masters → CORRECT (TrueColorAlpha)**

---

## 📞 Support

If all three batch files show errors:
1. Re-download icons.zip
2. Extract to project root
3. Run verification sequence again
4. Check SESSION_HANDOFF.md for detailed context

For persistent issues, see:
- ICONS_INSTALLATION_GUIDE.md (manual installation)
- ICON_TRANSPARENCY_VERIFICATION.md (verification methodology)
- V0.9.0_INTEGRATION_CHECKLIST.md (complete integration steps)

---

**All batch files are safe to run multiple times.**
