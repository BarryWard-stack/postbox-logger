# Orphan Files & Cleanup Report

© 2025 Insight Geospatial, Eurotech Marine Data Services Ltd. All rights reserved.

**Date:** 17 February 2026  
**Author:** Barry Ward  
**Purpose:** Identify duplicate, obsolete, and redundant files for manual deletion approval

---

## Executive Summary

This report identifies **candidates for deletion** following the folder reorganization completed on 17 February 2026. The migration script `MIGRATE_STRUCTURE.bat` was designed to move files to organized locations, but several duplicates and obsolete files remain in the root and `/docs/` directories.

**Total Candidates for Deletion:** 15 files  
**Estimated Disk Space to Recover:** ~40 KB (excluding backup directory)

---

## Category 1: Orphaned Batch Files (Root Directory)

### Files Successfully Moved to `/tools/` - Root Duplicates Remain

According to `MIGRATE_STRUCTURE.bat` (lines 38-49), the following batch files **should have been moved** to `/tools/` but still exist in the root directory:

| File | Size | Status | Justification |
|------|------|--------|---------------|
| `cleanup-assets-icons.bat` | 5.1 KB | **ORPHAN** | Duplicate - should be in `/tools/` per MIGRATE_STRUCTURE.bat line 46 |
| `reorganize-docs.bat` | 12.0 KB | **ORPHAN** | Duplicate - should be in `/tools/` per MIGRATE_STRUCTURE.bat line 47 |
| `capture_structure.bat` | 1.2 KB | **ORPHAN** | Duplicate - should be in `/tools/` per MIGRATE_STRUCTURE.bat line 38 |
| `setup_pwa.bat` | 2.7 KB | **ORPHAN** | Duplicate - should be in `/tools/` per MIGRATE_STRUCTURE.bat line 42 |
| `verify-pwa-installation.bat` | 9.6 KB | **ORPHAN** | Duplicate - should be in `/tools/` per MIGRATE_STRUCTURE.bat line 43 |
| `fix-icon-transparency.bat` | 6.1 KB | **ORPHAN** | Duplicate - should be in `/tools/` per MIGRATE_STRUCTURE.bat line 44 |
| `quick-check-icons.bat` | 3.8 KB | **ORPHAN** | Duplicate - should be in `/tools/` per MIGRATE_STRUCTURE.bat line 45 |
| `RESET_ENV.bat` | 1.4 KB | **ORPHAN** | Duplicate - should be in `/tools/` per MIGRATE_STRUCTURE.bat line 48 |
| `launch_template.bat` | 1.7 KB | **ORPHAN** | Duplicate - should be in `/tools/` per MIGRATE_STRUCTURE.bat line 49 |

**Subtotal:** 9 batch files, ~43.8 KB

**Verification Note:** The `/tools/` directory does not currently exist, indicating `MIGRATE_STRUCTURE.bat` was **not yet executed**. These files are marked as orphans because they are **intended** to be moved per the migration plan documented in `REORGANIZATION_2026-02-17.md`.

---

## Category 2: Orphaned Utility Scripts (Root Directory)

### Python & JavaScript Files Intended for `/tools/`

According to `MIGRATE_STRUCTURE.bat` (lines 38-40), these utility scripts should be moved to `/tools/`:

| File | Size | Status | Justification |
|------|------|--------|---------------|
| `capture_structure.py` | 6.9 KB | **ORPHAN** | Duplicate - should be in `/tools/` per MIGRATE_STRUCTURE.bat line 39 |
| `generate-pwa-icons.js` | 4.4 KB | **ORPHAN** | Duplicate - should be in `/tools/` per MIGRATE_STRUCTURE.bat line 40 |
| `heritage-color-multipliers.js` | 6.5 KB | **ORPHAN** | Duplicate - should be in `/tools/` per MIGRATE_STRUCTURE.bat line 41 |

**Subtotal:** 3 utility scripts, ~17.8 KB

---

## Category 3: Duplicate Batch Files in `/docs/`

### Files That Should Only Exist in `/tools/`

The following batch files exist in `/docs/` but should be consolidated into `/tools/`:

| File | Size | Status | Justification |
|------|------|--------|---------------|
| `docs\cleanup-assets-icons.bat` | 5.1 KB | **DUPLICATE** | Same as root version - redundant after migration to `/tools/` |
| `docs\reorganize-docs.bat` | 12.0 KB | **DUPLICATE** | Same as root version - redundant after migration to `/tools/` |

**Subtotal:** 2 batch files, ~17.1 KB

**Note:** These files were likely created during an earlier reorganization attempt and should be removed once the canonical versions are moved to `/tools/`.

---

## Category 4: Obsolete Structure Snapshots

### Version-Stamped Structure Files

| File | Date | Status | Justification |
|------|------|--------|---------------|
| `structure_-02-2026_0715.txt` | 17 Feb 2026, 07:15 | **OBSOLETE** | Superseded by git-tracked structure documentation in `REORGANIZATION_2026-02-17.md` and `REORGANIZATION_QUICK_REFERENCE.md` |

**Subtotal:** 1 text file, ~3.7 KB

**Rationale:** The structure capture was useful during the reorganization planning phase, but is now redundant. The canonical structure is documented in:
- `docs/REORGANIZATION_2026-02-17.md` (lines 19-76)
- `REORGANIZATION_QUICK_REFERENCE.md` (lines 21-29)
- `structure_-02-2026_0715.txt` itself (captured at 07:15, before final reorganization)

The deleted file `structure_-02-2026_1211.txt` (shown in git status) was likely a later snapshot that has already been removed.

---

## Category 5: Backup Directory Review

### `docs_backup_20262\02_1216\` - Full Backup

**Status:** **RETAIN FOR NOW**  
**Size:** ~29 files, estimated 200+ KB  
**Created:** 12 February 2026, 12:16 (based on timestamp)

**Justification for Retention:**
- Created by `reorganize-docs.bat` (lines 40-54) as a safety backup
- Contains pre-reorganization state of `/docs/` folder
- Should be retained until reorganization is verified stable
- Recommended retention period: 30-60 days post-deployment

**Recommended Action:**
- Keep until March 2026 (1 month after reorganization)
- Delete after successful v0.9.0 deployment and verification
- Add to `.gitignore` if not already excluded

---

## Summary of Deletion Candidates

### Immediate Deletion Candidates (After `/tools/` Migration)

**Root Directory:**
1. `cleanup-assets-icons.bat` - Duplicate, move to `/tools/` first
2. `reorganize-docs.bat` - Duplicate, move to `/tools/` first
3. `capture_structure.bat` - Duplicate, move to `/tools/` first
4. `setup_pwa.bat` - Duplicate, move to `/tools/` first
5. `verify-pwa-installation.bat` - Duplicate, move to `/tools/` first
6. `fix-icon-transparency.bat` - Duplicate, move to `/tools/` first
7. `quick-check-icons.bat` - Duplicate, move to `/tools/` first
8. `RESET_ENV.bat` - Duplicate, move to `/tools/` first
9. `launch_template.bat` - Duplicate, move to `/tools/` first
10. `capture_structure.py` - Duplicate, move to `/tools/` first
11. `generate-pwa-icons.js` - Duplicate, move to `/tools/` first
12. `heritage-color-multipliers.js` - Duplicate, move to `/tools/` first

**`/docs/` Directory:**
13. `docs\cleanup-assets-icons.bat` - Duplicate of root version
14. `docs\reorganize-docs.bat` - Duplicate of root version

**Obsolete Files:**
15. `structure_-02-2026_0715.txt` - Superseded by documentation

---

## Recommended Deletion Workflow

### Phase 1: Execute Migration (PREREQUISITE)

**CRITICAL:** Do NOT delete files until migration is complete.

```batch
REM Step 1: Run the migration script
MIGRATE_STRUCTURE.bat

REM Step 2: Verify /tools/ directory was created and files were moved
dir tools\

REM Step 3: Verify no broken references
REM Open index.html in browser, check for 404 errors
```

### Phase 2: Delete Root Orphans (After Migration Verified)

```batch
REM Delete batch files (now in /tools/)
del cleanup-assets-icons.bat
del reorganize-docs.bat
del capture_structure.bat
del setup_pwa.bat
del verify-pwa-installation.bat
del fix-icon-transparency.bat
del quick-check-icons.bat
del RESET_ENV.bat
del launch_template.bat

REM Delete utility scripts (now in /tools/)
del capture_structure.py
del generate-pwa-icons.js
del heritage-color-multipliers.js
```

### Phase 3: Delete `/docs/` Duplicates

```batch
REM Delete duplicate batch files in /docs/
del docs\cleanup-assets-icons.bat
del docs\reorganize-docs.bat
```

### Phase 4: Delete Obsolete Structure File

```batch
REM Delete superseded structure snapshot
del structure_-02-2026_0715.txt
```

### Phase 5: Verify Clean State

```batch
REM Verify root directory only contains core files
dir /b

REM Expected output (6 core files only):
REM   index.html
REM   plogger.js
REM   postboxAssets.js
REM   manifest.json
REM   service-worker.js
REM   .gitignore
```

---

## Automated Cleanup Script (OPTIONAL)

If you prefer a single-command cleanup after migration verification:

```batch
@echo off
REM © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
REM Orphan File Cleanup Script
REM Date: 2026-02-17
REM ONLY RUN AFTER MIGRATE_STRUCTURE.BAT COMPLETES SUCCESSFULLY

echo ========================================
echo Orphan File Cleanup
echo ========================================
echo.
echo This will delete 15 orphaned/duplicate files.
echo.
echo PREREQUISITE: MIGRATE_STRUCTURE.bat must have completed successfully
echo.
pause

echo Deleting root orphans...
del /Q cleanup-assets-icons.bat 2>nul
del /Q reorganize-docs.bat 2>nul
del /Q capture_structure.bat 2>nul
del /Q setup_pwa.bat 2>nul
del /Q verify-pwa-installation.bat 2>nul
del /Q fix-icon-transparency.bat 2>nul
del /Q quick-check-icons.bat 2>nul
del /Q RESET_ENV.bat 2>nul
del /Q launch_template.bat 2>nul
del /Q capture_structure.py 2>nul
del /Q generate-pwa-icons.js 2>nul
del /Q heritage-color-multipliers.js 2>nul

echo Deleting /docs/ duplicates...
del /Q docs\cleanup-assets-icons.bat 2>nul
del /Q docs\reorganize-docs.bat 2>nul

echo Deleting obsolete structure file...
del /Q structure_-02-2026_0715.txt 2>nul

echo.
echo ========================================
echo Cleanup Complete
echo ========================================
echo.
echo Verify clean state with: dir /b
echo.
pause
```

---

## Risk Assessment

### Low Risk (Safe to Delete)

- **All 15 files** are safe to delete **after migration completes**
- All functionality is preserved in `/tools/` directory
- Structure documentation is preserved in markdown files
- No breaking changes to PWA functionality

### Verification Required

Before deletion, verify:
1. ✅ `MIGRATE_STRUCTURE.bat` completed successfully
2. ✅ `/tools/` directory exists and contains all batch files
3. ✅ PWA functionality tested (icons load, service worker registers)
4. ✅ No 404 errors in browser console

---

## Files to KEEP (Not Deletion Candidates)

### Root Directory (Core Application)
- ✅ `index.html` - Main PWA entry point
- ✅ `plogger.js` - Core application logic
- ✅ `postboxAssets.js` - Asset configuration (updated paths)
- ✅ `manifest.json` - PWA manifest (updated paths)
- ✅ `service-worker.js` - Service worker (updated paths)
- ✅ `.gitignore` - Git configuration

### New Files (Created During Reorganization)
- ✅ `MIGRATE_STRUCTURE.bat` - Migration script (keep for reference)
- ✅ `REORGANIZATION_QUICK_REFERENCE.md` - Quick reference guide
- ✅ `postboxAssets.js` - Updated asset paths

### Documentation
- ✅ All files in `/docs/` subdirectories (guides, sessions, pwa, future-features, tools)
- ✅ `docs/REORGANIZATION_2026-02-17.md` - Reorganization documentation
- ✅ `docs/REORGANIZATION_SUMMARY.md` - Summary documentation

### Backup Directory (Temporary Retention)
- ⏳ `docs_backup_20262/02_1216/` - Keep until March 2026, then delete

---

## Git Status Impact

### Files Marked as Deleted in Git
```
D structure_-02-2026_1211.txt
```
**Status:** Already deleted, no action needed

### Files Marked as Untracked in Git
```
?? MIGRATE_STRUCTURE.bat
?? REORGANIZATION_QUICK_REFERENCE.md
?? assets/README.md
?? assets/icons/ (36 PNG files)
?? docs/ (multiple new .md files)
?? postboxAssets.js
?? launch_template.bat
?? structure_-02-2026_0715.txt
```

**Recommendation:** After cleanup, stage only the essential files:
```bash
git add MIGRATE_STRUCTURE.bat
git add REORGANIZATION_QUICK_REFERENCE.md
git add assets/
git add docs/REORGANIZATION_2026-02-17.md
git add docs/REORGANIZATION_SUMMARY.md
git add docs/ASSET_INTEGRATION_GUIDE.md
git add docs/BADGE_DESIGN_REFERENCE.md
git add docs/INTEGRATION_SUMMARY_2026-02-17.md
git add docs/REFINEMENT_2026-02-17_Asset_Mapping.md

# Do NOT stage orphan files that will be deleted
```

---

## Next Steps for Lead (Barry Ward)

### Immediate Actions

1. **Review this report** - Verify deletion candidates are correct
2. **Execute migration** - Run `MIGRATE_STRUCTURE.bat`
3. **Verify migration** - Check `/tools/` directory exists and contains files
4. **Test PWA** - Open `index.html`, verify icons load, check console for errors
5. **Approve deletion** - If all tests pass, proceed with Phase 2-4 cleanup

### Optional Actions

6. **Create cleanup script** - Save the automated cleanup script as `CLEANUP_ORPHANS.bat`
7. **Schedule backup deletion** - Set reminder for March 2026 to delete `docs_backup_20262/`
8. **Update .gitignore** - Add `docs_backup_*/` pattern if not already present

---

## Licensing

© 2025 Insight Geospatial, Eurotech Marine Data Services Ltd. All rights reserved.

**Author:** Barry Ward  
**Report Date:** 17 February 2026

---

## Appendix: File Comparison Matrix

| File | Root | /tools/ | /docs/ | Action |
|------|------|---------|--------|--------|
| cleanup-assets-icons.bat | ✓ | (pending) | ✓ | Move root to /tools/, delete /docs/ duplicate |
| reorganize-docs.bat | ✓ | (pending) | ✓ | Move root to /tools/, delete /docs/ duplicate |
| capture_structure.bat | ✓ | (pending) | ✗ | Move to /tools/ |
| capture_structure.py | ✓ | (pending) | ✗ | Move to /tools/ |
| setup_pwa.bat | ✓ | (pending) | ✗ | Move to /tools/ |
| verify-pwa-installation.bat | ✓ | (pending) | ✗ | Move to /tools/ |
| fix-icon-transparency.bat | ✓ | (pending) | ✗ | Move to /tools/ |
| quick-check-icons.bat | ✓ | (pending) | ✗ | Move to /tools/ |
| RESET_ENV.bat | ✓ | (pending) | ✗ | Move to /tools/ |
| launch_template.bat | ✓ | (pending) | ✗ | Move to /tools/ |
| generate-pwa-icons.js | ✓ | (pending) | ✗ | Move to /tools/ |
| heritage-color-multipliers.js | ✓ | (pending) | ✗ | Move to /tools/ |
| structure_-02-2026_0715.txt | ✓ | ✗ | ✗ | Delete (obsolete) |

---

**END OF REPORT**
