# .cursor Directory - Project Knowledge Files

© 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.

**Purpose:** Store project context and knowledge for AI assistants (Cursor, Claude Desktop, etc.)

---

## 📄 Files in This Directory

### 1. **PROJECT_KNOWLEDGE.md** (Comprehensive)
**Use:** Full project documentation for AI context  
**Contains:**
- Complete project overview
- Architecture details
- All file descriptions
- Recent changes
- Asset management
- Deployment guide
- Future roadmap

**When to use:**
- Onboarding new AI assistant
- Major feature development
- Architecture questions
- Complete context needed

**Size:** ~15KB  
**Update frequency:** After major changes

---

### 2. **QUICK_CONTEXT.md** (Summary)
**Use:** Quick reference for AI assistants  
**Contains:**
- Project purpose
- Core files (6)
- Recent additions
- Key concepts
- Latest changes

**When to use:**
- Quick refresher
- Minor updates
- Fast context loading
- Desktop Claude sync

**Size:** ~2KB  
**Update frequency:** After each session

---

### 3. **README.md** (This File)
**Use:** Explains the .cursor directory structure  
**Contains:**
- File descriptions
- Usage guidelines
- Update instructions

---

## 🔄 How to Use These Files

### For Cursor AI (Built-in)
Cursor automatically reads files in `.cursor/` directory for project context.

**No action needed** - just keep files updated.

### For Desktop Claude
1. Copy contents of `QUICK_CONTEXT.md` or `PROJECT_KNOWLEDGE.md`
2. Paste into Claude Desktop conversation
3. Prefix with: "Here's the project context:"

### For Other AI Assistants
Share `PROJECT_KNOWLEDGE.md` for complete context or `QUICK_CONTEXT.md` for quick overview.

---

## 📝 When to Update

### Update PROJECT_KNOWLEDGE.md when:
- ✅ New major feature added (e.g., PostcardCanvas)
- ✅ Architecture changes
- ✅ File structure reorganization
- ✅ New dependencies added
- ✅ Deployment process changes

### Update QUICK_CONTEXT.md when:
- ✅ Any code changes
- ✅ Bug fixes
- ✅ Minor feature additions
- ✅ Version bumps

### Update frequency:
- **PROJECT_KNOWLEDGE.md:** After major milestones
- **QUICK_CONTEXT.md:** After each development session

---

## 🎯 Quick Update Checklist

After making changes to the project:

1. [ ] Update version number in both files
2. [ ] Update "Last Updated" date
3. [ ] Add changes to "Recent Changes" section
4. [ ] Update file counts if structure changed
5. [ ] Update "Known Issues" if applicable
6. [ ] Commit to git with descriptive message

---

## 📊 Current State

**Last Updated:** 17 February 2026  
**Version:** 0.9.0  
**Major Features:**
- Map-based postbox logging
- Real-time Firebase sync
- Rarity-based gamification
- Digital postcard generation (NEW)

**File Structure:**
- 6 core application files
- 36 asset files (PNG)
- 60+ documentation files
- 12 utility scripts

---

## 🔒 Licensing

© 2025 Insight Geospatial, Eurotech Marine Data Services Ltd. All rights reserved.

These knowledge files are part of the Heritage Postbox Logger project and subject to the same proprietary license.

---

## 💡 Tips

### For Efficient Context Sharing

**Quick sync (Desktop Claude):**
```
Copy: QUICK_CONTEXT.md
Time: ~30 seconds
Use: Minor updates, bug fixes
```

**Full sync (Desktop Claude):**
```
Copy: PROJECT_KNOWLEDGE.md
Time: ~2 minutes
Use: Major features, architecture changes
```

**Selective sync:**
```
Copy: Specific sections from PROJECT_KNOWLEDGE.md
Time: ~1 minute
Use: Focused questions (e.g., just "PostcardCanvas Module")
```

---

## 📁 File Sizes

- `PROJECT_KNOWLEDGE.md`: ~15KB
- `QUICK_CONTEXT.md`: ~2KB
- `README.md`: ~3KB

**Total:** ~20KB (negligible storage impact)

---

## 🚀 Best Practices

1. **Keep files updated** - Outdated context leads to confusion
2. **Use QUICK_CONTEXT for speed** - Most updates don't need full context
3. **Version control** - Commit knowledge files with code changes
4. **Clear descriptions** - Write for future you (or future AI)
5. **Remove obsolete info** - Delete outdated sections

---

## 🔮 Future Enhancements

Potential additions to this directory:

- `API_REFERENCE.md` - Component API documentation
- `TROUBLESHOOTING.md` - Common issues and solutions
- `CHANGELOG.md` - Detailed version history
- `TESTING_GUIDE.md` - Testing procedures

---

**END OF README**

Keep this directory updated to maintain effective AI assistance!
