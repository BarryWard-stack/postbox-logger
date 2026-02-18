# Reorganization Quick Reference

© 2025 Insight Geospatial, Eurotech Marine Data Services Ltd. All rights reserved.

**Date:** 17 February 2026

---

## What Changed?

### ✅ File References Updated (Automatic)

| File | What Changed | Status |
|------|-------------|--------|
| `manifest.json` | Icon paths: `/icons/` → `/assets/icons/` | ✅ Done |
| `service-worker.js` | Icon paths in cache & notifications | ✅ Done |
| `postboxAssets.js` | All 21 asset paths updated | ✅ Done |

### 📁 New Directory Structure

```
Root (6 core files only)
├── /assets/icons/      ← All icons here
├── /assets/branding/   ← Brand assets
├── /docs/guides/       ← Implementation guides
├── /docs/sessions/     ← Session summaries
├── /docs/pwa/          ← PWA documentation
└── /tools/             ← All .bat & utility scripts
```

---

## Quick Migration

### Option 1: Run Migration Script

```bash
MIGRATE_STRUCTURE.bat
```

Then manually move icon files to `/assets/icons/`

### Option 2: Manual Steps

1. **Create directories:**
   ```bash
   mkdir assets\icons assets\branding
   mkdir docs\guides docs\sessions docs\pwa
   mkdir tools
   ```

2. **Move scripts to `/tools/`:**
   - All `.bat` files
   - All `.py` files
   - `generate-pwa-icons.js`
   - `heritage-color-multipliers.js`

3. **Move docs to subdirectories:**
   - Guides → `/docs/guides/`
   - Sessions → `/docs/sessions/`
   - PWA docs → `/docs/pwa/`

4. **Move icons to `/assets/icons/`:**
   - All `icon-*.png` files
   - All postbox type images
   - All cipher images

---

## Verification

### Quick Check
```bash
# Check if PWA manifest is correct
type manifest.json | findstr "assets/icons"

# Check if service worker is correct
type service-worker.js | findstr "assets/icons"

# Check if assets config is correct
type postboxAssets.js | findstr "assets/icons"
```

### Browser Test
1. Open `index.html` in browser
2. Open DevTools Console (F12)
3. Look for any 404 errors
4. Navigate to List view
5. Verify icons display

---

## Rollback

If something breaks:

```bash
git checkout manifest.json
git checkout service-worker.js
git checkout postboxAssets.js
```

---

## File Count

| Location | Before | After |
|----------|--------|-------|
| Root | 19 files | 6 files |
| /assets/ | 1 file | Organized |
| /docs/ | Mixed | 3 subdirs |
| /tools/ | N/A | 12 scripts |

---

## Need Help?

See full documentation: `docs/REORGANIZATION_2026-02-17.md`
