# Icon Files - Installation Instructions
# © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
# Author: Barry Ward
# Date: 2025-02-14 10:05:00

## 📦 What's Inside icons.zip

**14 Files Total (5.2 MB):**

### PWA Icon Sizes (10 files)
- icon-16x16.png (1.2 KB)
- icon-32x32.png (2.3 KB)
- icon-72x72.png (6.9 KB)
- icon-96x96.png (9.3 KB)
- icon-120x120.png (12 KB)
- icon-144x144.png (15 KB)
- icon-152x152.png (16 KB)
- icon-192x192.png (21 KB) **← Maskable**
- icon-384x384.png (46 KB)
- icon-512x512.png (66 KB) **← Maskable**

### Master Source Files (4 files)
- british_postbox_master.png (1.3 MB) **← Primary app icon**
- ludlow_postbox_master.png (1.4 MB)
- penfold_postbox_master.png (1.2 MB)
- wall_postbox_master.png (1.2 MB)

**All files verified:** Type: TrueColorAlpha ✅

---

## 📂 Installation Instructions

### Step 1: Extract icons.zip

**Extract to:**
```
G:\Insight_Workspace\Projects\postbox-logger\
```

**Result:**
```
postbox-logger/
└── icons/              ← NEW folder created
    ├── icon-16x16.png
    ├── icon-32x32.png
    ├── ... (all 10 PWA sizes)
    ├── icon-512x512.png
    ├── british_postbox_master.png
    ├── ludlow_postbox_master.png
    ├── penfold_postbox_master.png
    └── wall_postbox_master.png
```

### Step 2: Replace Fake Transparency Icons in assets/

**Your current `/assets/icons/` contains fake transparency files (4.9-5.0 MB each).**

**Action:**
```batch
cd G:\Insight_Workspace\Projects\postbox-logger\assets\icons
del *.png
copy ..\..\icons\*_master.png .
```

**Expected result:**
```
assets/icons/
├── british_postbox_master.png (1.3 MB) ✅
├── ludlow_postbox_master.png (1.4 MB) ✅
├── penfold_postbox_master.png (1.2 MB) ✅
└── wall_postbox_master.png (1.2 MB) ✅
```

---

## ✅ Verification Checklist

After extraction:

- [ ] `/icons/` folder exists at project root
- [ ] 10 PWA sizes present (icon-16x16.png through icon-512x512.png)
- [ ] 4 master files present (*_master.png)
- [ ] `/assets/icons/` now has 1.2-1.4 MB files (not 4-5 MB)
- [ ] `manifest.json` paths match: `"/icons/icon-XXX.png"`
- [ ] `index.html` references: `href="/icons/icon-32x32.png"`

---

## 🧪 Quick Test: Verify True Alpha

**Windows PowerShell:**
```powershell
Get-Item "G:\Insight_Workspace\Projects\postbox-logger\icons\icon-192x192.png" | Select-Object Name, Length

# Should show: ~21 KB (not 500+ KB)
```

**If you have ImageMagick installed:**
```bash
identify -verbose icons/icon-192x192.png | findstr "Type"

# Should show: Type: TrueColorAlpha
```

---

## 🚨 Critical: Do NOT Use Old Files

**These files have fake transparency (checkered backgrounds):**
- british_postbox_icon_1.png (4.9 MB) ❌
- ludlow_postbox_icon_1.png (5.0 MB) ❌
- penfold_postbox_icon_1.png (4.5 MB) ❌
- wall_postbox_icon_1.png (3.7 MB) ❌

**Delete or archive these - do not use in production.**

---

## 📋 Next Steps After Installation

1. Test PWA manifest: Open `index.html` in Chrome
2. Check DevTools Console for icon loading errors
3. Verify theme color shows as Royal Mail Red (#DC2626)
4. Deploy to GitHub Pages
5. Test PWA install prompt on mobile

---

**All icons ready for production deployment.**
