# Heritage Postbox - Quick Start Guide
# © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd. All rights reserved.
# Author: Barry Ward
# Last Modified: 2025-02-14 15:00:00
# Version: 1.0.0

---

## ✅ Already Complete

- [x] Git installed
- [x] VS Code installed
- [x] Architecture decided (PWA→Capacitor)
- [x] manifest.json created
- [x] service-worker.js created
- [x] Implementation guide created

---

## 🚀 Next Steps (Do These In Order)

### Step 1: Install Node.js (15 minutes)

**Download:**
- Go to: https://nodejs.org/
- Download: LTS version (v20.x recommended)
- Run installer (accept defaults)

**Verify:**
```bash
# Open Windows PowerShell or Command Prompt
node --version
# Should show: v20.x.x or v18.x.x

npm --version
# Should show: v10.x.x or v9.x.x
```

**If not showing versions:** Restart VS Code and terminal, try again.

---

### Step 2: Create Project Structure (10 minutes)

**Open PowerShell/Command Prompt:**

```bash
# Navigate to where you want the project (example)
cd C:\Users\Barry\Projects

# Create project folder
mkdir heritage-postbox-app
cd heritage-postbox-app

# Initialize Git repository
git init

# Create directory structure
mkdir icons
mkdir baseline_v0.8.0
```

---
  
### Step 3: Copy Baseline Files (5 minutes)

**Copy your current v0.8.0 web app:**

```bash
# From wherever your current files are, copy to baseline_v0.8.0\
# Example files to copy:
# - heritage-postbox-v0_8_0-firebase.html
# - uk-postbox-logger.js
# - app.js
# - Any other current working files
```

**In Git:**
```bash
git add baseline_v0.8.0/
git commit -m "Archive baseline v0.8.0 - working web app"
git tag v0.8.0
```

---

### Step 4: Copy PWA Files (2 minutes)

**From portable drive to project root:**

Copy these files from `/mnt/user-data/outputs/` to `heritage-postbox-app/`:
- manifest.json
- service-worker.js

**Result:**
```
heritage-postbox-app/
├── baseline_v0.8.0/
│   └── (your current files)
├── icons/
│   └── (empty for now)
├── manifest.json
└── service-worker.js
```

---

### Step 5: Initialize NPM (2 minutes)

```bash
# Inside heritage-postbox-app/
npm init -y
```

This creates `package.json`. Edit it:

```json
{
  "name": "heritage-postbox-app",
  "version": "0.9.0",
  "description": "Gamified UK heritage postbox discovery app",
  "scripts": {
    "start": "npx http-server -p 8080 -c-1"
  },
  "keywords": ["postbox", "heritage", "pwa"],
  "author": "Barry Ward - Insight Geospatial",
  "license": "PROPRIETARY"
}
```

**Install local server:**
```bash
npm install --save-dev http-server
```

---

### Step 6: Generate App Icons (30 min - 2 hours)

**OPTION A: Online Tool (Recommended - Fast)**

1. Create 512×512 base icon:
   - Use Canva (free): https://www.canva.com/
   - Or AI image generator
   - Design: Simple red postbox silhouette on white/transparent background
   - Export as PNG, 512×512 pixels

2. Generate all sizes:
   - Go to: https://www.pwabuilder.com/imageGenerator
   - Upload your 512×512 PNG
   - Click "Generate"
   - Download zip file
   - Extract all PNGs to `heritage-postbox-app/icons/`

**OPTION B: Temporary Placeholder (5 minutes)**

For testing only - use any red 512×512 image:

```bash
# Create basic placeholders just to test PWA install
# You can replace with proper icons later
# Just need files named correctly in /icons/ folder
```

**Required icon files:**
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

---

### Step 7: Integrate PWA into HTML (15 minutes)

**Create index.html:**

Copy your `heritage-postbox-v0_8_0-firebase.html` to `index.html`:

```bash
cp baseline_v0.8.0/heritage-postbox-v0_8_0-firebase.html index.html
```

**Edit index.html - Add to `<head>` section (after line 8):**

```html
<!-- PWA Manifest -->
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#DC2626">

<!-- iOS -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Postbox">
<link rel="apple-touch-icon" href="/icons/icon-192x192.png">
```

**Edit index.html - Add BEFORE closing `</body>` tag (near end of file):**

```html
<!-- Service Worker Registration -->
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(reg => console.log('SW registered:', reg.scope))
        .catch(err => console.error('SW registration failed:', err));
    });
  }
</script>
```

---

### Step 8: Test Locally (10 minutes)

**Start server:**
```bash
npm start
# Server runs at http://localhost:8080
```

**Open browser:**
- Go to http://localhost:8080
- Press F12 (DevTools)
- Go to "Application" tab
- Check "Manifest" section - should show your app details
- Check "Service Workers" - should show "activated and is running"

**If errors:** Check console for messages, review file paths

---

### Step 9: Test on Android (20 minutes)

**Requirements:**
- Android phone with Chrome
- Phone and PC on same WiFi network

**Find your PC's local IP:**
```bash
ipconfig
# Look for "IPv4 Address" under your WiFi adapter
# Example: 192.168.1.100
```

**On Android Chrome:**
- Navigate to: `http://192.168.1.100:8080` (use YOUR IP)
- App should load
- Chrome menu (⋮) → "Add to Home Screen"
- Confirm installation
- Find app icon on home screen
- Tap to launch - should open full screen (no browser UI)

**Test offline:**
- Turn on Airplane Mode
- Open app from home screen
- Should still load (cached assets)

---

### Step 10: Commit to Git (2 minutes)

```bash
git add .
git commit -m "feat: Add PWA manifest and service worker - v0.9.0"
git tag v0.9.0
```

---

## ✅ Success Criteria

**You've completed Week 1 of Phase 1 when:**
- [ ] App installs on Android home screen
- [ ] Manifest shows in DevTools with no errors
- [ ] Service worker shows as "activated and is running"
- [ ] App works offline (at least shows cached content)
- [ ] Icons display correctly (not blank)

**If all checked:** Phase 1 Week 1 COMPLETE ✅

---

## 🐛 Troubleshooting

### "Add to Home Screen" not showing

**Check:**
1. Are you on localhost or your local IP? (both work for testing)
2. Does DevTools → Application → Manifest show data?
3. Any red errors in DevTools console?
4. Try interacting with page (click around) then check Chrome menu again

### Service Worker not registering

**Check:**
1. Is `service-worker.js` in project root (same level as index.html)?
2. Console showing any errors?
3. DevTools → Application → Service Workers - see any errors?

**Fix:**
```bash
# Clear browser cache completely
# DevTools → Application → Clear storage → "Clear site data"
```

### Icons not showing

**Check:**
1. Are icon files in `/icons/` folder?
2. Are they named exactly as in manifest.json?
3. Are they PNG format (not JPG)?

**Temporary fix:**
- Use any 512×512 red image for now
- Resize/copy to all required sizes
- Replace with proper icons later

---

## 📞 If Stuck

**Provide to Claude:**
```
Phase 1 Week 1 - [specific step you're on]

Error: [exact error message from console]

What I tried:
1. [action 1]
2. [action 2]

Files in project root: [list main files]

Next steps?
```

---

## ⏱️ Time Budget

| Task | Time |
|------|------|
| Install Node.js | 15 min |
| Create project structure | 10 min |
| Copy baseline files | 5 min |
| Copy PWA files | 2 min |
| Initialize NPM | 2 min |
| Generate icons | 30 min - 2 hours |
| Integrate HTML | 15 min |
| Test locally | 10 min |
| Test on Android | 20 min |
| Commit to Git | 2 min |

**Total: 1.5 - 3.5 hours** (depending on icon creation method)

---

## 📋 Checklist (Copy to Progress Tracker)

**Week 1 Tasks:**
- [ ] Node.js installed and verified
- [ ] Project folder created with Git initialized
- [ ] Baseline v0.8.0 archived and tagged
- [ ] PWA files (manifest.json, service-worker.js) copied to root
- [ ] NPM initialized (package.json created)
- [ ] App icons generated (8 sizes)
- [ ] Icons copied to /icons/ folder
- [ ] index.html created with PWA integration
- [ ] Manifest link added to HTML
- [ ] Service worker registration added to HTML
- [ ] Local server tested (localhost:8080)
- [ ] Android installation tested successfully
- [ ] Offline functionality verified
- [ ] Changes committed to Git (v0.9.0 tagged)

---

## 🎯 After Week 1

**Update progress tracker:**
```markdown
#### 2025-02-15 (or your date)
**Hours:** X
**Completed:**
- Node.js installed
- Project structure created
- PWA integration complete
- Tested on Android device - successful install

**Blockers:** None (or list any)
```

**Week 2 focus:**
- Offline data queue (IndexedDB)
- Offline UI indicator
- Multiple device testing

**Full details in:** `PHASE_1_IMPLEMENTATION_GUIDE.md`

---

## 📦 Project Structure After Week 1

```
heritage-postbox-app/
├── baseline_v0.8.0/          # Archived working version
│   ├── heritage-postbox-v0_8_0-firebase.html
│   ├── uk-postbox-logger.js
│   └── app.js
├── icons/                     # All 8 icon sizes
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png
│   ├── icon-384x384.png
│   └── icon-512x512.png
├── node_modules/              # NPM packages
├── index.html                 # Main app file (PWA-enabled)
├── manifest.json              # PWA manifest
├── service-worker.js          # Service worker
├── package.json               # NPM config
├── package-lock.json          # NPM lock file
└── .git/                      # Git repository

```

---

**You're ready! Start with Step 1 (Install Node.js) and work through sequentially.** 🚀

**Estimated time to first successful Android install: 1.5 - 3.5 hours**
