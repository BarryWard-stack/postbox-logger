# Firebase Deployment Checklist

© 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.

---

## ✅ **Follow These Steps in Order:**

### **Step 1: Install Node.js** ⏳ IN PROGRESS

**What to do:**
1. Go to: https://nodejs.org/
2. Download the LTS version (green button)
3. Run the installer
4. Accept all defaults
5. **Restart Cursor** after installation

**How to verify:**
- Open new terminal in Cursor
- Type: `node -v`
- Should show: `v20.x.x` or similar

---

### **Step 2: Run Deployment Script** ⏳ WAITING

**After Node.js is installed and Cursor is restarted:**

1. Find file: `DEPLOY_TO_FIREBASE.bat`
2. Right-click → "Run in Terminal"
3. Follow the prompts

**The script will automatically:**
- ✅ Check Node.js installation
- ✅ Install Firebase CLI
- ✅ Login to Firebase (opens browser)
- ✅ Configure Firebase (if needed)
- ✅ Deploy v0.9.1 to live site

---

### **Step 3: Authorize Firebase** ⏳ WAITING

**When browser opens:**
1. Click "Allow" to give Firebase CLI access
2. Return to Cursor
3. Script will continue automatically

---

### **Step 4: Configure Firebase** ⏳ WAITING

**If asked these questions:**

**"What do you want to use as your public directory?"**
- Type: `.` (just a dot)
- Press Enter

**"Configure as a single-page app?"**
- Type: `n` (No)
- Press Enter

**"File index.html already exists. Overwrite?"**
- Type: `n` (No)
- Press Enter

---

### **Step 5: Wait for Deployment** ⏳ WAITING

**The script will:**
- Upload all files to Firebase
- Show progress bar
- Display "Deploy complete!" when done

**Time:** 30-60 seconds

---

## 🎯 **After Deployment:**

### **Test Your Live Site:**

1. **Visit:** https://barryward2070-dotcom.github.io/heritage-postbox/
2. **Test Edward VIII:**
   - Open "Add Postbox"
   - Toggle to Visual Mode
   - Find Edward VIII
   - Click info button (i)
   - Should show: 500 points, "Holy Grail"
3. **Test GPS Marker:**
   - Allow location access
   - Blue dot should pulsate
4. **Test SatNav:**
   - Click any postbox marker
   - Click "🧭 Directions"
   - Should open native maps app

---

## 🚨 **Troubleshooting:**

### **"node is not recognized"**
- Node.js not installed or Cursor not restarted
- Solution: Restart Cursor after installing Node.js

### **"firebase is not recognized"**
- Firebase CLI installation failed
- Solution: Run manually: `npm install -g firebase-tools`

### **"Permission denied"**
- Not logged in to Firebase
- Solution: Run: `firebase login`

### **"No project found"**
- Firebase not initialized
- Solution: Run: `firebase init hosting`

### **Broken images on live site**
- Assets not uploaded
- Solution: Check `assets/icons/` folder has PNG files
- Redeploy: `firebase deploy`

---

## 📊 **Current Status:**

- [x] v0.9.1 code complete
- [x] Files committed to git
- [ ] Node.js installed ← **YOU ARE HERE**
- [ ] Firebase CLI installed
- [ ] Firebase configured
- [ ] Deployed to live site

---

## 🎯 **Next Action:**

**Install Node.js from https://nodejs.org/**

Then come back and run: `DEPLOY_TO_FIREBASE.bat`

---

**Estimated time remaining: 15 minutes**

---

**END OF CHECKLIST**
