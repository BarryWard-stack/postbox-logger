# Heritage Postbox Logger - Project Knowledge

© 2025 Insight Geospatial, Eurotech Marine Data Services Ltd. All rights reserved.

**Last Updated:** 17 February 2026  
**Version:** 0.9.0  
**Status:** Production-Ready

---

## 🎯 Project Overview

**Name:** Heritage Postbox Logger (Plogger)  
**Type:** Progressive Web App (PWA)  
**Purpose:** Gamified heritage postbox data collection platform with collaborative backend

**Key Features:**
- Interactive map-based postbox logging
- Rarity-based scoring system (LBSG aligned)
- Real-time Firebase sync across users
- Digital postcard generation (NEW)
- Achievement system
- Social sharing capabilities

---

## 📁 Project Structure

```
/postbox-logger/
├── Core Application Files (6)
│   ├── index.html                  # Main PWA entry point
│   ├── plogger.js                  # Core application logic (React)
│   ├── postboxAssets.js            # Asset configuration (21 postbox types)
│   ├── postcard-engine.js          # Digital postcard module (NEW)
│   ├── manifest.json               # PWA manifest
│   └── service-worker.js           # Service worker
│
├── /assets/
│   ├── /icons/                     # 36 PNG files (postbox images + PWA icons)
│   └── README.md
│
├── /docs/
│   ├── /guides/                    # Implementation guides
│   ├── /sessions/                  # Session summaries
│   ├── /pwa/                       # PWA documentation
│   ├── /future-features/           # Phase 3-4 roadmap
│   ├── /tools/                     # Tool documentation
│   ├── REORGANIZATION_2026-02-17.md
│   ├── ASSET_INTEGRATION_GUIDE.md
│   ├── BADGE_DESIGN_REFERENCE.md
│   └── [other docs...]
│
├── /tools/                         # 12 utility scripts
│   ├── capture_structure.bat
│   ├── capture_structure.py
│   ├── cleanup-assets-icons.bat
│   ├── generate-pwa-icons.js
│   ├── heritage-color-multipliers.js
│   └── [other tools...]
│
├── /docs_backup_20262/             # Backup (retain until March 2026)
│
└── Documentation (4)
    ├── ORPHAN_FILES_REPORT.md
    ├── CLEANUP_VERIFICATION_REPORT.md
    ├── REORGANIZATION_QUICK_REFERENCE.md
    ├── POSTCARD_MODULE_DOCUMENTATION.md (NEW)
    └── POSTCARD_IMPLEMENTATION_SUMMARY.md (NEW)
```

---

## 🏗️ Architecture

### Technology Stack

**Frontend:**
- React 18 (via CDN)
- Vanilla JavaScript (ES6+)
- Leaflet.js (mapping)
- HTML5 Canvas (postcards)

**Backend:**
- Firebase Firestore (real-time database)
- Firebase Auth (anonymous)

**PWA:**
- Service Worker (offline support)
- Web App Manifest
- Installable on mobile/desktop

### Component Hierarchy

```
PostboxLogger (main app)
├── MapView
│   ├── Leaflet Map
│   ├── User Markers
│   └── Official Postbox Markers
├── ListView
│   └── PostboxList
│       ├── PostboxIcon
│       └── Action Buttons
│           ├── Edit
│           ├── Delete
│           ├── Create Postcard (NEW)
│           ├── Share
│           └── Report
├── StatsView
│   └── PlayerStats
├── PostboxForm (modal)
├── PostSaveModal
└── PostcardCanvas (modal) (NEW)
```

---

## 🎨 Key Features

### 1. Map-Based Logging
- Interactive Leaflet map
- Real-time user location
- Tap-to-log functionality
- Official postbox overlay (Overpass API)

### 2. Rarity System (LBSG Aligned)
- 10 rarity levels (1-10)
- 21 postbox types configured
- Special multipliers (Airmail Blue: 10x, Bronze Green: 5x)
- Regional bonuses (Wales, SW Peninsula, etc.)

### 3. Postbox Types (21 Total)

**Historic Pillar Boxes:**
- Penfold Hexagonal (1866-1879) - Rarity 10
- First National Standard (1859) - Rarity 9
- Victorian Cipher (VR) - Rarity 8
- Edward VII Cipher (EVIIR) - Rarity 7

**Wall Boxes:**
- First Type (1857) - Rarity 8
- Large Type - Rarity 4

**Ludlow Boxes:**
- Standard - Rarity 7

**Lamp Boxes:**
- Standard Oval - Rarity 3

**Modern:**
- Elizabeth II Cipher (EIIR) - Rarity 2
- Charles III Cipher (CIIIR) - Rarity 9

**Special:**
- Olympic Gold (2012) - Rarity 8
- Airmail Blue - Rarity 10 (150 × 10x = 1500 points)
- Bronze Green - Rarity 9 (100 × 5x = 500 points)

### 4. Digital Postcard Module (NEW - v1.0.0)

**Features:**
- Vintage-style digital postcards
- Canvas-based rendering (1200x800px)
- Cream/sepia background with texture
- Handwritten message (Pinyon Script font)
- Wavy-line postmark cancellation
- Postbox image in stamp area
- Real-time preview
- PNG export

**Integration:**
- Accessible from List view
- "Create Postcard" button (red, prominent)
- Modal interface
- Toast notification on export

**Files:**
- `postcard-engine.js` - Standalone module
- `POSTCARD_MODULE_DOCUMENTATION.md` - Full docs
- `POSTCARD_IMPLEMENTATION_SUMMARY.md` - Quick reference

---

## 🔧 Core Files

### index.html
- PWA entry point
- Firebase SDK initialization
- Script loading orchestration
- React/Leaflet CDN imports

**Script Loading Order:**
1. Firebase SDK
2. React 18
3. React DOM 18
4. Leaflet
5. postboxAssets.js
6. postcard-engine.js (NEW)
7. initApp() / plogger.js

### plogger.js
- Main application logic
- React components
- State management
- Firebase integration
- Postcard integration (NEW)

**Key State:**
```javascript
const [userPostboxes, setUserPostboxes] = useState([]);
const [officialPostboxes, setOfficialPostboxes] = useState([]);
const [selectedPostbox, setSelectedPostbox] = useState(null);
const [postcardPostbox, setPostcardPostbox] = useState(null); // NEW
const [viewMode, setViewMode] = useState('map');
const [userLocation, setUserLocation] = useState(null);
const [toast, setToast] = useState(null);
```

### postboxAssets.js
- Asset configuration
- 21 postbox type definitions
- Rarity levels and points
- Asset paths (all use `assets/icons/`)
- Development status overlays

### postcard-engine.js (NEW)
- Standalone React component
- Canvas rendering engine
- Export functionality
- Modal UI
- Google Fonts integration (Pinyon Script)

### manifest.json
- PWA configuration
- App metadata
- Icon references (10 sizes)
- All paths use `/assets/icons/`

### service-worker.js
- Offline support
- Cache management
- Static asset caching
- Runtime caching

---

## 🎨 Asset Management

### Icon Paths (VERIFIED)

**All asset paths updated to use organized structure:**

**manifest.json:**
```json
"src": "/assets/icons/icon-192x192.png"
```

**service-worker.js:**
```javascript
'/assets/icons/icon-192x192.png'
```

**postboxAssets.js:**
```javascript
asset: 'assets/icons/ludlow_postbox_master.png'
```

### Asset Inventory

**PWA Icons (10 files):**
- icon-16x16.png through icon-512x512.png

**Postbox Images (26 files):**
- Master images (*_master.png)
- Silhouettes (*_silhouette_*.png)
- Ciphers (*_cipher_*.png)
- Special editions (airmail, olympic, etc.)

**Total:** 36 PNG files in `/assets/icons/`

---

## 🔥 Firebase Configuration

**Project:** heritage-postbox  
**Authentication:** Anonymous (no login required)  
**Database:** Firestore

**Collections:**
- `postboxes` - User-logged postboxes
- Real-time sync across all users

**Security:**
- Read: Public
- Write: Authenticated (anonymous)

---

## 📱 PWA Features

### Installation
- Installable on iOS/Android
- Desktop installation support
- Offline functionality

### Service Worker
- Cache-first strategy
- Static asset caching
- Runtime caching for CDN resources

### Manifest
- Standalone display mode
- Portrait orientation
- Theme color: #DC2626 (red)
- Background: #ffffff

---

## 🎮 Gamification

### Player Levels
1. Rookie Spotter (0-49 points) 🚀
2. Postbox Detective (50-199 points) 🔍
3. Seasoned Explorer (200-499 points) 🎖️
4. Master Postbox Hunter (500-999 points) 🏆
5. LBSG Collaborator (1000+ points) 👑

### Achievements
- First find
- Rare finds
- Regional bonuses
- Special editions

### Points System
- Base points per rarity level
- Multipliers for special types
- Regional bonuses (up to 50 points)

---

## 🛠️ Development Tools

### Utility Scripts (/tools/)

**Structure Capture:**
- `capture_structure.bat` - Directory tree capture
- `capture_structure.py` - Python version

**PWA Tools:**
- `generate-pwa-icons.js` - Icon generation
- `heritage-color-multipliers.js` - Color processing
- `setup_pwa.bat` - PWA setup
- `verify-pwa-installation.bat` - PWA verification

**Asset Management:**
- `cleanup-assets-icons.bat` - Asset cleanup
- `fix-icon-transparency.bat` - Transparency fix
- `quick-check-icons.bat` - Quick verification

**Documentation:**
- `reorganize-docs.bat` - Doc reorganization

**Environment:**
- `RESET_ENV.bat` - Environment reset
- `launch_template.bat` - Launch template

---

## 📝 Recent Changes

### v0.9.0 - 17 February 2026

**Major:**
- ✅ Implemented PostcardCanvas digital collectible module
- ✅ Added vintage-style postcard generation
- ✅ Integrated canvas-based rendering
- ✅ Added "Create Postcard" button to List view

**Cleanup:**
- ✅ Surgical environment cleanup completed
- ✅ Moved 12 utility scripts to `/tools/`
- ✅ Deleted 3 orphaned files
- ✅ Root directory now clean (6 core + 4 docs)

**Asset Paths:**
- ✅ Verified all paths use `/assets/icons/`
- ✅ manifest.json: 10 icon paths
- ✅ service-worker.js: 2 icon paths
- ✅ postboxAssets.js: 21 asset paths

---

## 🐛 Known Issues

**None at this time.**

Previous issues resolved:
- ✅ Asset path inconsistencies (fixed)
- ✅ Orphaned files in root (cleaned)
- ✅ Duplicate files in /docs/ (removed)

---

## 🚀 Deployment

### Prerequisites
- Web server (or local file access)
- HTTPS required for PWA features
- Modern browser (Chrome 90+, Firefox 88+, Safari 14+)

### Deployment Steps
1. Upload all files to web server
2. Ensure HTTPS is enabled
3. Verify manifest.json paths
4. Test PWA installation
5. Verify offline functionality

### Testing Checklist
- [ ] Map loads and displays user location
- [ ] Postbox logging works
- [ ] Firebase sync works
- [ ] List view displays postboxes
- [ ] Create Postcard button appears
- [ ] Postcard modal opens and renders
- [ ] Postcard export downloads PNG
- [ ] PWA installs on mobile
- [ ] Offline mode works

---

## 📚 Documentation

### Core Documentation
- `REORGANIZATION_QUICK_REFERENCE.md` - Quick reference
- `CLEANUP_VERIFICATION_REPORT.md` - Cleanup verification
- `FINAL_STATE_SUMMARY.md` - Current state

### Postcard Module (NEW)
- `POSTCARD_MODULE_DOCUMENTATION.md` - Full technical docs
- `POSTCARD_IMPLEMENTATION_SUMMARY.md` - Quick overview

### Guides (/docs/guides/)
- `QUICK_START_GUIDE.md`
- `PHASE_1_IMPLEMENTATION_GUIDE.md`
- `RESEARCH_IMPLEMENTATION_MAPPING.md`
- `GIT_COMMIT_GUIDE.md`

### PWA Documentation (/docs/pwa/)
- `ICONS_INSTALLATION_GUIDE.md`
- `PWA_ICON_PROCESSING_SUMMARY.md`
- `V0.9.0_INTEGRATION_CHECKLIST.md`

---

## 🔮 Future Enhancements

### Phase 2 (Planned)
- Multiple postcard templates
- Batch postcard export
- Social media sharing integration
- Print optimization (300 DPI)
- QR code integration

### Phase 3 (Roadmap)
- Digital philately module
- Stamp asset generation
- Proximity postcard concept
- Crowdsourced data collection

See `/docs/future-features/` for detailed roadmap.

---

## 🔒 Licensing

© 2025 Insight Geospatial, Eurotech Marine Data Services Ltd. All rights reserved.

**License:** Proprietary – Not for redistribution without written consent.

**Author:** Barry Ward

---

## 📞 Support

**Insight Geospatial**  
Eurotech Marine Data Services Ltd.

---

## 🎯 Quick Commands

### Start Development
```bash
# Open index.html in browser
# Or use local server:
python -m http.server 8000
# Navigate to http://localhost:8000
```

### Generate Structure Capture
```bash
cd tools
capture_structure.bat
```

### Verify PWA Installation
```bash
cd tools
verify-pwa-installation.bat
```

---

## 🔑 Key Concepts

### Rarity System
- Based on Letter Box Study Group (LBSG) classifications
- 10 levels (1 = common, 10 = legendary)
- Points = basePoints × multiplier
- Regional bonuses add extra points

### Asset Organization
- All icons in `/assets/icons/`
- Relative paths in postboxAssets.js
- Absolute paths in manifest.json and service-worker.js
- "As-Is" assets (no renaming required)

### Component Pattern
- React functional components
- React.createElement() syntax (no JSX)
- Hooks: useState, useEffect, useRef, useCallback
- Global window exports for cross-file access

### Postcard Design
- Standard postcard ratio (3:2)
- Safe zone: 40px (20px border + 20px padding)
- Canvas rendering for high quality
- Export as PNG (1200x800px)

---

## 📊 Project Statistics

**Total Files:** ~150  
**Core Application:** 6 files  
**Documentation:** 60+ markdown files  
**Assets:** 36 PNG files  
**Tools:** 12 utility scripts  
**Lines of Code:** ~2000 (plogger.js + postcard-engine.js)

**Last Major Update:** 17 February 2026  
**Version:** 0.9.0  
**Status:** Production-Ready

---

**END OF PROJECT KNOWLEDGE**

This document should be updated whenever major changes are made to the project structure, features, or architecture.
