# Firebase Deployment - Visual Guide

© 2025 Insight Geospatial, Eurotech Marine Data Services Ltd. All rights reserved.

**For:** Barry Ward (Visual Tools Preferred)  
**Goal:** Deploy v0.9.1 to barryward2070-dotcom.github.io/heritage-postbox/

---

## 🎯 The Big Picture

**Current State:** v0.9.1 code is ready on your computer  
**Goal:** Push it live to your website  
**Blocker:** Icon files need to be in the right folder

---

## 📋 Step-by-Step Checklist

### **PHASE 1: Find Your Icon Files** 🔍

**What to do:**
1. Open File Explorer (Windows Explorer)
2. Navigate to: `c:\Insight_Workspace\Projects\postbox-logger`
3. Look for these `.png` files:
   - `airmail_blue_postbox_1.png`
   - `eviiir_cipher_design_1.png` (Edward VIII - NEW!)
   - `fluted_pillar_box_silhouette_1.png`
   - `sunday_yellow_postbox_1.png` (Isle of Man - NEW!)
   - ...and 13 more

**Where they might be:**
- [ ] In the root folder (same level as `index.html`)
- [ ] In a `Downloads` folder
- [ ] On your Desktop
- [ ] In `docs_backup_20262/` folder

**How to search:**
- Press `Windows Key + S`
- Type: `*.png`
- Look in: `c:\Insight_Workspace\Projects\postbox-logger`

---

### **PHASE 2: Move Icons to Correct Folder** 📁

**What to do:**
1. In Cursor's file explorer (left sidebar), right-click on `assets`
2. Create new folder: `icons`
3. Drag and drop all 17 `.png` files into `assets/icons/`

**Visual Check:**
```
postbox-logger/
├── assets/
│   ├── icons/          ← All 17 PNG files go here
│   │   ├── airmail_blue_postbox_1.png
│   │   ├── eviiir_cipher_design_1.png
│   │   ├── fluted_pillar_box_silhouette_1.png
│   │   └── ...
│   └── README.md
├── index.html
├── plogger.js
└── ...
```

**Verification:**
- [ ] Open `assets/icons/` in Cursor
- [ ] Count files: Should see 17 PNG files
- [ ] Double-click one to preview (should show postbox image)

---

### **PHASE 3: Install Node.js** 🟢

**What it is:** The "engine" that runs Firebase tools

**How to install:**
1. Go to: [https://nodejs.org/](https://nodejs.org/)
2. Click the big green button: **"Download Node.js (LTS)"**
3. Run the installer (accept all defaults)
4. Restart Cursor after installation

**Verification:**
1. In Cursor, press `Ctrl + backtick` (opens terminal)
2. Type: `node -v`
3. Press Enter
4. Should see: `v20.11.0` (or similar)

---

### **PHASE 4: Install Firebase Tools** 🔥

**What it is:** The "upload button" for your website

**How to install:**
1. In Cursor terminal (bottom panel), type:
   ```
   npm install -g firebase-tools
   ```
2. Press Enter
3. Wait 1-2 minutes (you'll see progress bars)
4. When done, type: `firebase --version`
5. Should see: `13.0.0` (or similar)

**Verification:**
- [ ] No error messages
- [ ] `firebase --version` shows a number

---

### **PHASE 5: Login to Firebase** 🔐

**What it does:** Connects Cursor to your Google account

**How to login:**
1. In Cursor terminal, type:
   ```
   firebase login
   ```
2. Press Enter
3. Your browser will open
4. Click **"Allow"** to give Firebase access
5. Return to Cursor (browser tab will say "Success!")

**Verification:**
- [ ] Browser shows "Firebase CLI Login Successful"
- [ ] Terminal shows "✔ Success! Logged in as your-email@gmail.com"

---

### **PHASE 6: Configure Firebase** ⚙️

**What it does:** Tells Firebase which files to upload

**How to configure:**
1. In Cursor terminal, type:
   ```
   firebase init hosting
   ```
2. Press Enter
3. Answer the questions:

   **"Select a default Firebase project"**
   - Use arrow keys to select: `heritage-postbox` (or your project name)
   - Press Enter

   **"What do you want to use as your public directory?"**
   - Type: `.` (just a dot)
   - Press Enter

   **"Configure as a single-page app?"**
   - Type: `n` (for No)
   - Press Enter

   **"File index.html already exists. Overwrite?"**
   - Type: `n` (for No)
   - Press Enter

**Verification:**
- [ ] New file appears in Cursor: `firebase.json`
- [ ] New file appears in Cursor: `.firebaserc`

---

### **PHASE 7: Deploy to Live Site** 🚀

**What it does:** Uploads v0.9.1 to your website

**How to deploy:**
1. In Cursor terminal, type:
   ```
   firebase deploy
   ```
2. Press Enter
3. Wait 30-60 seconds (you'll see progress)
4. When done, you'll see:
   ```
   ✔ Deploy complete!
   
   Hosting URL: https://barryward2070-dotcom.github.io/heritage-postbox/
   ```

**Verification:**
1. Click the URL (or copy-paste into browser)
2. Your website should load
3. Check for broken images (should see postbox icons)
4. Test Edward VIII in visual picker

---

## 🎯 Quick Reference Card

### **Every Time You Want to Deploy:**

```bash
# 1. Open Cursor terminal (Ctrl + backtick)

# 2. Deploy
firebase deploy

# 3. Wait for "Deploy complete!"

# 4. Visit your site
# https://barryward2070-dotcom.github.io/heritage-postbox/
```

**That's it!** No need to repeat the setup steps.

---

## 🚨 Troubleshooting

### **Problem: "node is not recognized"**

**Solution:**
- Node.js not installed or not in PATH
- Restart Cursor after installing Node.js
- Or restart your computer

---

### **Problem: "firebase is not recognized"**

**Solution:**
- Firebase CLI not installed
- Run: `npm install -g firebase-tools`
- Restart Cursor terminal

---

### **Problem: "Permission denied"**

**Solution:**
- Not logged in to Firebase
- Run: `firebase login`
- Allow access in browser

---

### **Problem: "No project found"**

**Solution:**
- Firebase not initialized
- Run: `firebase init hosting`
- Select your project

---

### **Problem: "Broken images on live site"**

**Solution:**
- Icons not in `assets/icons/` folder
- Check Phase 2 above
- Redeploy: `firebase deploy`

---

## 📊 Deployment Checklist Summary

**Before First Deployment:**
- [ ] Icons in `assets/icons/` (17 files)
- [ ] Node.js installed (`node -v` works)
- [ ] Firebase CLI installed (`firebase --version` works)
- [ ] Logged in (`firebase login` complete)
- [ ] Configured (`firebase.json` exists)

**Every Deployment:**
- [ ] Open Cursor terminal
- [ ] Run: `firebase deploy`
- [ ] Wait for "Deploy complete!"
- [ ] Test live site

---

## 🎯 Expected Timeline

**First-Time Setup:**
- Phase 1 (Find icons): 5-10 minutes
- Phase 2 (Move icons): 2 minutes
- Phase 3 (Install Node.js): 5 minutes
- Phase 4 (Install Firebase): 5 minutes
- Phase 5 (Login): 2 minutes
- Phase 6 (Configure): 3 minutes
- Phase 7 (Deploy): 2 minutes
- **Total: ~25-35 minutes**

**Future Deployments:**
- Just Phase 7: 2 minutes

---

## 📞 When to Ask for Help

**Ask Gemini if:**
- Can't find the 17 icon files
- Node.js installation fails
- Firebase login doesn't work
- Deployment shows errors

**Ask Claude (me) if:**
- Need to modify `firebase.json`
- Need to change deployment settings
- Need to troubleshoot technical errors

---

## ✅ Success Indicators

**You'll know it worked when:**
1. Terminal shows: `✔ Deploy complete!`
2. Live site loads without errors
3. Edward VIII appears in visual picker
4. Postcard engine works
5. No 404 errors in browser console

---

**Licensing:** © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.

**Ready to begin? Start with Phase 1!** 🚀

---

**END OF GUIDE**
