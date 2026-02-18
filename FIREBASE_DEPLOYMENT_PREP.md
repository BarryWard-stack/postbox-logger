# Firebase Deployment Preparation

© 2025 Insight Geospatial, Eurotech Marine Data Services Ltd. All rights reserved.

**Date:** 18 February 2026  
**Target:** barryward2070-dotcom.github.io/heritage-postbox/  
**Status:** 🚨 **BLOCKER IDENTIFIED**

---

## 🚨 CRITICAL BLOCKER: Missing Asset Files

### **Problem:**

The git status shows 17 icon files as **untracked**, but they are **NOT in the `assets/icons/` directory**:

```
?? assets/icons/airmail_blue_postbox_1.png
?? assets/icons/charles_iii_cipher_1.png
?? assets/icons/double_sided_pillar_box_1.png
?? assets/icons/dual_aperture_pillar_box_1.png
?? assets/icons/eviiir_cipher_design_1.png
?? assets/icons/eviiir_cipher_silhouette_1.png
?? assets/icons/fluted_pillar_box_silhouette_1.png
?? assets/icons/george_v_gr_cipher_1.png
?? assets/icons/george_vi_cipher_vector_1.png
?? assets/icons/heritage_postmark_stamp_1.png
?? assets/icons/k6_telephone_kiosk_silhouette_1.png
?? assets/icons/olympic_gold_postbox_new_1.png
?? assets/icons/postcard_back_master_1.png
?? assets/icons/royal_mail_lamp_box_1.png
?? assets/icons/scottish_crown_vector_1.png
?? assets/icons/sunday_yellow_postbox_1.png
?? assets/icons/victorian_bronze_green_postbox_1.png
?? assets/icons/vr_cipher_victorian_1.png
```

### **Current State:**

**Directory Check:**
- ✅ `assets/` folder exists
- ✅ `assets/README.md` exists
- 🚨 `assets/icons/` folder is **EMPTY**
- 🚨 No `.png` or `.jpg` files found in workspace

### **Impact:**

**If deployed now:**
- All postbox icons will show broken images (404 errors)
- Edward VIII entry will not display
- Visual picker will be empty
- PostcardCanvas will use fallback texture only
- App will be functionally broken

---

## 🔍 Root Cause Analysis

### **Possible Scenarios:**

**Scenario 1: Files Not Yet Moved**
- Icons are still in the old location (root or another folder)
- `MIGRATE_STRUCTURE.bat` didn't move them
- Need to locate and move manually

**Scenario 2: Files Not Yet Created**
- Git status is showing "expected" files, not actual files
- Icons need to be created/downloaded
- Asset creation is pending

**Scenario 3: Git Index Issue**
- Files exist but not tracked by file system tools
- Git cache needs refresh
- Need to verify with `git status` in terminal

---

## 🛠️ Immediate Action Required

### **Step 1: Locate Icon Files**

**Check these locations:**

1. **Root directory** (pre-migration location)
2. **Old backup folders** (`docs_backup_20262/`)
3. **Downloads folder** (if assets were downloaded)
4. **Desktop or other staging area**

**Command to search entire workspace:**
```powershell
Get-ChildItem -Path "c:\Insight_Workspace\Projects\postbox-logger" -Recurse -Filter "*.png" | Select-Object FullName
```

---

### **Step 2: Verify Git Status**

**Run in Cursor terminal:**
```bash
git status --porcelain
```

**Expected output if files exist:**
```
?? assets/icons/airmail_blue_postbox_1.png
?? assets/icons/charles_iii_cipher_1.png
...
```

**If files don't appear:**
- They don't exist yet
- Need to create or download

---

### **Step 3: Create Missing Directory**

**Ensure `assets/icons/` exists:**
```powershell
New-Item -ItemType Directory -Path "assets\icons" -Force
```

---

### **Step 4: Move Icon Files**

**If files are found in root or elsewhere:**
```powershell
Move-Item -Path "*.png" -Destination "assets\icons\" -Force
Move-Item -Path "*.jpg" -Destination "assets\icons\" -Force
```

**Or manually drag-and-drop in Cursor file explorer**

---

## 📋 Pre-Deployment Checklist

### **Phase 1: Asset Verification** 🚨 BLOCKED

- [ ] Locate all 17 icon files
- [ ] Create `assets/icons/` directory
- [ ] Move/copy files to `assets/icons/`
- [ ] Verify files with `Get-ChildItem assets\icons\`
- [ ] Test one icon path in browser (e.g., open `assets/icons/fluted_pillar_box_silhouette_1.png`)

### **Phase 2: Node.js Installation** ⏳ PENDING

- [ ] Download Node.js from [nodejs.org](https://nodejs.org/)
- [ ] Install Node.js (LTS version recommended)
- [ ] Verify installation: `node -v` (should show version like `v20.x.x`)
- [ ] Verify npm: `npm -v` (should show version like `10.x.x`)

### **Phase 3: Firebase CLI Installation** ⏳ PENDING

- [ ] Open Cursor terminal (`Ctrl + backtick`)
- [ ] Run: `npm install -g firebase-tools`
- [ ] Verify: `firebase --version`
- [ ] Login: `firebase login` (opens browser)

### **Phase 4: Firebase Configuration** ⏳ PENDING

- [ ] Run: `firebase init hosting`
- [ ] Select existing project: `heritage-postbox` (or your project ID)
- [ ] Set public directory: `.` (current directory)
- [ ] Configure as single-page app: `No`
- [ ] Don't overwrite `index.html`: `No`
- [ ] Verify `firebase.json` created

### **Phase 5: Deployment** ⏳ PENDING

- [ ] Run: `firebase deploy`
- [ ] Verify deployment URL
- [ ] Test live site for broken images
- [ ] Test Edward VIII entry in visual picker
- [ ] Test PostcardCanvas

---

## 📁 Required Firebase Configuration

### **firebase.json (Template)**

```json
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**",
      "docs/**",
      "docs_backup_20262/**",
      "tools/**",
      "*.md"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      },
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=86400"
          }
        ]
      }
    ]
  }
}
```

**Key Points:**
- ✅ `public: "."` - Deploys from root directory
- ✅ Ignores documentation and tools folders
- ✅ Includes `assets/**` by default (not in ignore list)
- ✅ Cache headers for performance

---

### **.firebaserc (Template)**

```json
{
  "projects": {
    "default": "heritage-postbox"
  }
}
```

**Replace `heritage-postbox` with your actual Firebase project ID**

---

## 🎯 Deployment Workflow (Once Unblocked)

### **One-Time Setup:**

```bash
# 1. Install Firebase CLI
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Initialize project
firebase init hosting

# 4. Verify configuration
cat firebase.json
```

### **Every Deployment:**

```bash
# 1. Verify assets exist
ls assets/icons/

# 2. Deploy
firebase deploy

# 3. Test live site
# Visit: https://barryward2070-dotcom.github.io/heritage-postbox/
```

---

## 🚨 Critical Path to Deployment

### **Current Blocker:**

**Missing icon files in `assets/icons/` directory**

### **Resolution Steps:**

1. **Locate Files** - Search workspace for `.png` files
2. **Move Files** - Copy to `assets/icons/`
3. **Verify Files** - Confirm with file explorer
4. **Test Locally** - Open `index.html` in browser
5. **Install Node.js** - Download from nodejs.org
6. **Install Firebase CLI** - `npm install -g firebase-tools`
7. **Configure Firebase** - `firebase init hosting`
8. **Deploy** - `firebase deploy`

---

## 📊 Asset Inventory Required

### **Expected Files (17):**

| File | Purpose | Priority |
|------|---------|----------|
| `airmail_blue_postbox_1.png` | Airmail Blue type | HIGH |
| `charles_iii_cipher_1.png` | Charles III cipher | HIGH |
| `eviiir_cipher_design_1.png` | Edward VIII (NEW) | CRITICAL |
| `fluted_pillar_box_silhouette_1.png` | Victorian Fluted | CRITICAL |
| `george_v_gr_cipher_1.png` | George V cipher | HIGH |
| `george_vi_cipher_vector_1.png` | George VI cipher | HIGH |
| `olympic_gold_postbox_new_1.png` | Olympic Gold | MEDIUM |
| `royal_mail_lamp_box_1.png` | Lamp Box | MEDIUM |
| `scottish_crown_vector_1.png` | Scottish Crown | HIGH |
| `sunday_yellow_postbox_1.png` | Isle of Man (NEW) | HIGH |
| `victorian_bronze_green_postbox_1.png` | Bronze Green | HIGH |
| `vr_cipher_victorian_1.png` | Victorian cipher | HIGH |
| `double_sided_pillar_box_1.png` | Double-sided type | MEDIUM |
| `dual_aperture_pillar_box_1.png` | Dual aperture type | MEDIUM |
| `eviiir_cipher_silhouette_1.png` | Edward VIII alt | MEDIUM |
| `k6_telephone_kiosk_silhouette_1.png` | K6 kiosk | LOW |
| `postcard_back_master_1.png` | Postcard template | MEDIUM |
| `heritage_postmark_stamp_1.png` | Heritage stamp | MEDIUM |

---

## 🎯 Recommended Next Steps

### **For Gemini (Architect):**

**Decision Required:**
1. Should we locate existing icon files?
2. Or create placeholder assets for deployment?
3. Or wait for proper asset creation?

### **For Barry Ward (Lead):**

**Action Required:**
1. Locate the 17 icon files
2. Move to `assets/icons/` directory
3. Verify files appear in Cursor file explorer
4. Confirm ready for Node.js installation

### **For Claude (Developer):**

**Standing By:**
- Ready to create `firebase.json` once assets are in place
- Ready to guide Node.js installation
- Ready to execute deployment once unblocked

---

## 📞 Status Report

**Current State:**
- ✅ v0.9.1 code complete
- ✅ Documentation complete
- 🚨 Assets missing (BLOCKER)
- ⏳ Node.js not installed
- ⏳ Firebase CLI not installed
- ⏳ Firebase not configured

**Estimated Time to Deploy (once unblocked):**
- Asset location/move: 10 minutes
- Node.js installation: 5 minutes
- Firebase CLI installation: 5 minutes
- Firebase configuration: 5 minutes
- Deployment: 2 minutes
- **Total: ~30 minutes**

---

**Licensing:** © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.

**Status:** 🚨 **BLOCKED - AWAITING ASSET LOCATION**

---

**END OF REPORT**
