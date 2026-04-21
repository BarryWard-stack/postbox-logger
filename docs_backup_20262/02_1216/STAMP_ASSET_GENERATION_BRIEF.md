# Stamp Asset Generation Brief - Phase 2.4
# © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
# Author: Barry Ward | Architect: Gemini
# Date: 2025-02-14 11:10:00

## 📮 Philatelic Asset Requirements

**For Gemini:** When Recraft credits reset, generate these stamp designs for the Digital Philately Module.

---

## 🎨 Standard Stamp Set (9 Required)

### 1. Penny Black (1840) - Victoria (VR)
**Prompt for Recraft:**
```
Create a PNG image of the Penny Black postage stamp from 1840. 
Features: Black background, profile of Queen Victoria facing left, 
ornate border with corner stars, "POSTAGE" at top, "ONE PENNY" at bottom.
Style: Engraved portrait, Victorian ornamental design.
Canvas: 300x400px portrait, PNG-24 with alpha transparency.
Background: Fully transparent (no checkers).
```

**Reference:** World's first adhesive postage stamp  
**Rarity:** Legendary  
**Color:** #000000 (black)

---

### 2. Penny Red (1841) - Victoria (VR)
**Prompt for Recraft:**
```
Create a PNG image of the Penny Red postage stamp from 1841.
Features: Red/vermillion background, profile of Queen Victoria facing left,
ornate border with corner letters, "POSTAGE" at top, "ONE PENNY" at bottom.
Style: Engraved portrait, Victorian design, similar to Penny Black but red.
Canvas: 300x400px portrait, PNG-24 with alpha transparency.
Background: Fully transparent.
```

**Reference:** Most common Victorian stamp  
**Rarity:** Common  
**Color:** #8B0000 (dark red)

---

### 3. 1902 Profile (Red) - Edward VII (EVIIIR)
**Prompt for Recraft:**
```
Create a PNG image of the 1902 Edward VII definitive stamp in red.
Features: Red background, profile of King Edward VII facing right,
high-contrast Edwardian ornamental border, "POSTAGE & REVENUE" text.
Style: Formal Edwardian engraving, more elaborate than Victorian.
Canvas: 300x400px portrait, PNG-24 with alpha transparency.
Background: Fully transparent.
```

**Reference:** High-contrast Edwardian definitive series  
**Rarity:** Rare  
**Color:** #DC143C (crimson)

---

### 4. 1935 Silver Jubilee - George V (GR)
**Prompt for Recraft:**
```
Create a PNG image of the 1935 Silver Jubilee commemorative stamp.
Features: Silver/gray tones, profile of King George V,
"SILVER JUBILEE" text, "1910-1935" dates, royal emblems.
Style: Art Deco influenced, commemorative grandeur.
Canvas: 300x400px portrait, PNG-24 with alpha transparency.
Background: Fully transparent.
```

**Reference:** 25th year on throne commemorative  
**Rarity:** Ultra Rare  
**Color:** #C0C0C0 (silver)

---

### 5. 1936 Accession (Scarlet) - Edward VIII (EVIIIIR)
**Prompt for Recraft:**
```
Create a PNG image of the 1936 Edward VIII accession stamp in scarlet.
Features: Bright scarlet/red background, profile of King Edward VIII facing left,
"POSTAGE REVENUE" text, simple art deco border.
Style: Modern 1930s design, clean lines, less ornate than predecessors.
Canvas: 300x400px portrait, PNG-24 with alpha transparency.
Background: Fully transparent.
```

**Reference:** Rare issue (Edward VIII never crowned)  
**Rarity:** Legendary (matches EVIIIIR postbox rarity)  
**Color:** #FF2400 (scarlet)

---

### 6. 1937 Coronation - George VI (GVIR)
**Prompt for Recraft:**
```
Create a PNG image of the 1937 George VI coronation stamp.
Features: Royal blue background, profile of King George VI,
coronation crown imagery, "CORONATION 12TH MAY 1937" text.
Style: Mid-century ornate design, formal coronation theme.
Canvas: 300x400px portrait, PNG-24 with alpha transparency.
Background: Fully transparent.
```

**Reference:** Ornate definitive reflecting mid-century era  
**Rarity:** Rare  
**Color:** #4169E1 (royal blue)

---

### 7. Machin Series (Red) - Elizabeth II (EIIR)
**Prompt for Recraft:**
```
Create a PNG image of the Machin definitive stamp in red.
Features: Royal Mail red background, profile of Queen Elizabeth II facing right,
minimalist design, no ornamental border, "1st" or face value text.
Style: Arnold Machin sculpture-based design, iconic minimalism.
Canvas: 300x400px portrait, PNG-24 with alpha transparency.
Background: Fully transparent.
```

**Reference:** Most iconic British stamp design (1967-2022)  
**Rarity:** Common (most widespread stamp in history)  
**Color:** #DC2626 (Royal Mail Red)

---

### 8. 2023 Coronation - Charles III (CIIIR)
**Prompt for Recraft:**
```
Create a PNG image of the 2023 Charles III coronation definitive stamp.
Features: Navy/royal blue background, profile of King Charles III facing left,
modern clean design, coronation crown emblem, "CORONATION 2023" text.
Style: Contemporary minimalist with traditional elements.
Canvas: 300x400px portrait, PNG-24 with alpha transparency.
Background: Fully transparent.
```

**Reference:** First King Charles issues  
**Rarity:** Common (new standard)  
**Color:** #1E3A8A (navy blue)

---

### 9. Scottish Lion Regional
**Prompt for Recraft:**
```
Create a PNG image of the Scottish regional definitive stamp.
Features: Scottish royal blue background, rampant lion (Lion of Scotland),
thistle emblems, "SCOTLAND" text, regional definitive styling.
Style: Heraldic design with Scottish national symbols.
Canvas: 300x400px portrait, PNG-24 with alpha transparency.
Background: Fully transparent.
```

**Reference:** Auto-detected for boxes in Scotland  
**Rarity:** Rare  
**Color:** #003893 (Scottish blue)

---

## 🌟 Special Variants (Future Phase 2.5)

### Olympic Gold Stamp
**For Olympic Gold postboxes (#D4AF37)**
```
Create a PNG image of a special Olympic commemorative stamp in gold.
Features: Metallic gold background, Olympic rings, torch imagery,
"LONDON 2012" or generic Olympic text.
Style: Commemorative sporting theme, celebratory gold tones.
Canvas: 300x400px portrait, PNG-24 with alpha transparency.
```

**Rarity:** Legendary  
**Multiplier:** 10x (matches Olympic postbox)

---

### Airmail Blue Stamp
**For Airmail Blue postboxes (#87CEEB)**
```
Create a PNG image of a 1930s airmail service stamp in sky blue.
Features: Sky blue background, airplane silhouette, clouds,
"AIR MAIL" or "PAR AVION" text, art deco styling.
Style: 1930s aviation theme, streamlined art deco.
Canvas: 300x400px portrait, PNG-24 with alpha transparency.
```

**Rarity:** Legendary  
**Multiplier:** 10x (matches Airmail postbox)

---

## ✅ Asset Verification Checklist

**For each stamp asset:**
- [ ] Resolution: 300x400px (portrait orientation)
- [ ] Format: PNG-24 with alpha transparency
- [ ] Type: TrueColorAlpha (verify with ImageMagick)
- [ ] File size: <100 KB
- [ ] No fake transparency (no checkered background pixels)
- [ ] Centered in canvas with 10% padding
- [ ] Clean edges (no white/gray halos)

**Transparency Verification:**
```bash
identify -verbose assets/stamps/[stamp].png | grep Type
# MUST show: Type: TrueColorAlpha
```

**If fake transparency detected:**
```bash
convert assets/stamps/[stamp].png -fuzz 15% -transparent white assets/stamps/[stamp]_fixed.png
```

---

## 📋 Asset Naming Convention

**Standard format:** `[era]_[variant]_[year].png`

Examples:
- `vr_penny_black_1840.png`
- `vr_penny_red_1841.png`
- `eviiir_profile_red_1902.png`
- `gr_silver_jubilee_1935.png`
- `eviiiir_accession_scarlet_1936.png`
- `gvir_coronation_1937.png`
- `eiir_machin_red_1967.png`
- `ciiir_coronation_2023.png`
- `scottish_lion_regional.png`

**Special variants:**
- `olympic_gold_commemorative_2012.png`
- `airmail_blue_definitive_1930s.png`

---

## 🎯 Delivery Format

**When Gemini provides Recraft prompts:**
1. Generate each stamp at 1024x1024px (master size)
2. Barry downloads and verifies transparency
3. Resize to 300x400px portrait
4. Place in `/assets/stamps/` directory
5. Update `STAMP_LIBRARY` in implementation code
6. Test in stamp carousel on mobile

---

## 📊 Priority Order

**Phase 2.4 Launch (Required):**
1. Penny Black (VR) - Most iconic
2. Machin Red (EIIR) - Most common era
3. 2023 Coronation (CIIIR) - Current era
4. 1936 Accession (EVIIIIR) - Legendary rarity

**Phase 2.4.1 Expansion:**
5. Penny Red (VR)
6. 1902 Profile (EVIIIR)
7. 1937 Coronation (GVIR)
8. Scottish Lion Regional

**Phase 2.5 Special Variants:**
9. Olympic Gold
10. Airmail Blue

---

## 🎓 Historical Accuracy Notes

**For Gemini when generating prompts:**
- Penny Black used Maltese Cross cancellation (1840-1841)
- Penny Red introduced perforations in 1854
- Edward VIII stamps are extremely rare (abdication before coronation)
- Machin design has been in continuous use since 1967
- Scottish regionals introduced 1958, still in use today

**Public domain sources for reference:**
- The Postal Museum digital collection
- Wikimedia Commons (Category: Postage stamps of the United Kingdom)
- British Library philatelic collection

---

**All stamp assets must follow same transparency verification workflow as postbox icons (ICON_TRANSPARENCY_VERIFICATION.md).**
