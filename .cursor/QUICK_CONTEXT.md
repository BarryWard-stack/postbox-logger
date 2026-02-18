# Quick Context - Heritage Postbox Logger

**Last Updated:** 17 February 2026  
**Version:** 0.9.0

---

## 🚀 What This Project Does

Progressive Web App for logging heritage postboxes in the UK with gamification, real-time sync, and digital postcard generation.

---

## 📁 Core Files (6)

1. **index.html** - PWA entry point, script loading
2. **plogger.js** - Main React app, all components
3. **postboxAssets.js** - 21 postbox type configurations
4. **postcard-engine.js** - Digital postcard module (NEW)
5. **manifest.json** - PWA manifest
6. **service-worker.js** - Offline support

---

## 🎨 Recent Addition: PostcardCanvas Module

**What:** Vintage-style digital postcards from logged postboxes  
**Where:** `postcard-engine.js` (standalone module)  
**How:** Canvas-based rendering, PNG export (1200x800px)

**Features:**
- Cream/sepia background with texture
- Handwritten message (Pinyon Script font)
- Wavy-line postmark cancellation
- Postbox image in stamp area
- Real-time preview
- Export as PNG

**Integration:**
- Button in List view: "📮 Create Postcard"
- Modal opens with customization options
- Downloads PNG file on export

---

## 🏗️ Architecture

**Frontend:** React 18 (CDN), Vanilla JS, Leaflet, Canvas  
**Backend:** Firebase Firestore (real-time sync)  
**PWA:** Service Worker, Manifest, Installable

**Component Pattern:**
- React functional components
- React.createElement() (no JSX)
- Hooks: useState, useEffect, useRef

---

## 📂 Directory Structure

```
/postbox-logger/
├── [6 core files]           # Root
├── /assets/icons/           # 36 PNG files
├── /docs/                   # Documentation
├── /tools/                  # 12 utility scripts
└── /docs_backup_20262/      # Backup (delete March 2026)
```

---

## 🎯 Key Asset Paths

**All verified and correct:**

- manifest.json: `/assets/icons/icon-*.png`
- service-worker.js: `/assets/icons/icon-*.png`
- postboxAssets.js: `assets/icons/*.png`

---

## 🔥 Firebase

**Project:** heritage-postbox  
**Auth:** Anonymous  
**Database:** Firestore (`postboxes` collection)

---

## 🎮 Gamification

**21 Postbox Types** (Rarity 1-10)  
**5 Player Levels** (Rookie → LBSG Collaborator)  
**Points System** (Base points × multipliers)  
**Regional Bonuses** (Wales, SW Peninsula, etc.)

---

## 📝 Latest Changes (v0.9.0)

1. ✅ PostcardCanvas module implemented
2. ✅ Environment cleanup completed
3. ✅ All asset paths verified
4. ✅ Documentation updated

---

## 🐛 Known Issues

None.

---

## 📚 Full Documentation

See `PROJECT_KNOWLEDGE.md` for complete details.

---

© 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
