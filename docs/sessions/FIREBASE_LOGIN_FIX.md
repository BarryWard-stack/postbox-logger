# Firebase Login Fix

© 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.

---

## 🚨 **Problem:**

Firebase login fails with: "Cannot run login in non-interactive mode"

This happens when running from Code Runner or certain terminal types.

---

## ✅ **Solution: Use PowerShell or CMD Directly**

### **Option 1: Open New PowerShell Window**

1. Press `Windows Key`
2. Type: `PowerShell`
3. Right-click → "Run as Administrator"
4. Navigate to project:
   ```powershell
   cd C:\Insight_Workspace\Projects\postbox-logger
   ```
5. Login:
   ```powershell
   firebase login
   ```
6. Browser will open → Click "Allow"
7. Deploy:
   ```powershell
   firebase deploy
   ```

---

### **Option 2: Use Cursor's Integrated Terminal**

1. In Cursor, press `Ctrl + Shift + P`
2. Type: "Terminal: Select Default Profile"
3. Choose: **"PowerShell"** or **"Command Prompt"**
4. Open new terminal: `Ctrl + Shift + backtick`
5. Type:
   ```bash
   firebase login
   ```
6. Browser opens → Click "Allow"
7. Deploy:
   ```bash
   firebase deploy
   ```

---

### **Option 3: Use GitHub Pages Instead**

Since you're already using GitHub Pages, you can skip Firebase entirely:

1. Just push to GitHub:
   ```bash
   git add .
   git commit -m "Deploy v0.9.1"
   git push origin main
   ```

2. GitHub Pages auto-deploys to:
   https://barryward2070-dotcom.github.io/heritage-postbox/

---

## 🎯 **Recommended: Use GitHub Pages**

Since your site is already on GitHub Pages and working, you don't actually need Firebase!

**Just commit and push:**
```bash
git add firebase.json .firebaserc
git commit -m "Add Firebase config for future use"
git push origin main
```

Your site will update automatically on GitHub Pages in 1-2 minutes.

---

## 📊 **Comparison:**

| Method | Pros | Cons |
|--------|------|------|
| **GitHub Pages** | Already working, auto-deploys | Tied to GitHub |
| **Firebase** | More features, faster | Login issues in some terminals |

---

**For now, stick with GitHub Pages - it's working perfectly!** ✅

---

**END OF GUIDE**
