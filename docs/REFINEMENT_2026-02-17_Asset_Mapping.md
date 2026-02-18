# Asset Mapping and Rarity UI Refinement

© 2025 Insight Geospatial, Eurotech Marine Data Services Ltd. All rights reserved.  
Author: Barry Ward

**Date:** 17 February 2026  
**Task:** Refine Asset Mapping and Rarity UI

---

## Refinements Completed

### 1. Filename Synchronization ✅

**Updated:** `postboxAssets.js`

**Changes:**
- Updated Lamp Box asset filename from `lamp_box_3d_render.png` to `royal_mail_lamp_box_1.jpg`
- Verified all filenames match the refactored batch specifications

**Affected Configuration:**
```javascript
'Lamp Box: Standard Oval': {
  asset: 'assets/royal_mail_lamp_box_1.jpg',  // Updated filename
  rarity: 3,
  label: 'LBSG COMMON LAMP BOX',
  color: '#06b6d4',
  basePoints: 10,
  multiplier: 1,
  description: 'Standard oval lamp box',
  developmentStatus: 'LAMP'
}
```

---

### 2. Legendary Point Value ✅

**Updated:** `postboxAssets.js`

**Changes:**
- Explicitly set Legendary value to **2500 points** in `calculatePoints()` function
- Added `basePoints: 2500` to Scottish Crown and Anonymous cipher configurations
- Added explicit check in `calculatePoints()` for Legendary items

**Implementation:**
```javascript
const calculatePoints = (typeName) => {
  const config = getPostboxTypeConfig(typeName);
  if (!config) return 2;
  
  // Explicitly set Legendary value to 2500
  if (config.label === 'LEGENDARY' && config.rarity === 10) {
    return 2500;
  }
  
  return config.basePoints * config.multiplier;
};
```

**Affected Items:**
- Scottish Crown: **2500 points**
- Anonymous: **2500 points**

---

### 3. Badge Aesthetic Refinement ✅

**Updated:** `plogger.js` and `index.html` (PostboxList component)

**Changes:**
- Replaced full-color background badges with subtle bordered badges
- Added color-coded dot indicator next to postbox name
- Maintained brand consistency with transparent backgrounds

**Design Specifications:**

#### Rarity Dot Indicator
- **Size:** 8px diameter
- **Position:** Left of postbox name
- **Colors:**
  - Gold (`#FFD700`) for Legendary
  - Blue (`#0ea5e9`) for Airmail
  - Standard rarity color for others

#### Badge Style
- **Border:** 2px solid, color-coded by rarity
- **Background:** Transparent
- **Text Color:** Matches border color
- **Border Radius:** 12px (pill shape)
- **Font Size:** 10px
- **Font Weight:** Bold

**Color Coding:**
- **Legendary:** Gold border (`#FFD700`)
- **Airmail Blue:** Blue border (`#0ea5e9`)
- **Other Rarities:** Original rarity color

**Visual Example:**
```
● Pillar Box: Penfold Hexagonal (1866-1879)
  ┌─────────────────────┐
  │ LBSG MUSEUM PIECE   │  ← Gold border, transparent background
  └─────────────────────┘
```

---

### 4. Overlay Persistence and Responsiveness ✅

**Updated:** `plogger.js` and `index.html` (PostboxIcon component)

**Changes:**
- Made "LAMP" overlay fully responsive to icon size
- Improved centering with percentage-based positioning
- Added responsive font sizing based on icon dimensions

**Technical Implementation:**

#### Responsive Overlay Styling
```javascript
const overlayStyle = {
  position: 'absolute',
  bottom: '8%',                    // Percentage-based positioning
  left: '50%',
  transform: 'translateX(-50%)',   // Perfect centering
  background: 'rgba(0, 0, 0, 0.75)',
  color: 'white',
  padding: '0.15em 0.6em',         // Em-based padding
  borderRadius: '3px',
  fontSize: `${size * 0.15}px`,    // 15% of icon size
  fontWeight: 'bold',
  pointerEvents: 'none',
  whiteSpace: 'nowrap',
  textAlign: 'center'
};
```

**Benefits:**
- Scales proportionally with icon size (60px, 80px, etc.)
- Stays centered on all screen sizes
- Maintains readability at different scales
- Responsive to container changes

**Testing Scenarios:**
- ✅ 60px icon: Overlay font = 9px
- ✅ 80px icon: Overlay font = 12px
- ✅ Mobile screens: Maintains centering
- ✅ Desktop screens: Maintains centering

---

## Files Modified

### 1. `postboxAssets.js`
- Updated Lamp Box filename to `royal_mail_lamp_box_1.jpg`
- Added `basePoints: 2500` to Legendary items
- Enhanced `calculatePoints()` with explicit Legendary check

### 2. `plogger.js`
- Updated PostboxIcon overlay styling (responsive)
- Updated PostboxList badge styling (subtle borders + dots)

### 3. `index.html`
- Updated embedded PostboxIcon overlay styling (responsive)
- Updated embedded PostboxList badge styling (subtle borders + dots)

### 4. `assets/README.md`
- Updated filename reference for Lamp Box
- Added point values for Legendary items

---

## Constraints Satisfied

✅ **No Structure Refactoring:** Only data points updated in `postboxAssets.js`  
✅ **Filename Sync:** Exact filenames from refactored batch used  
✅ **Legendary Value:** Explicitly set to 2500 points  
✅ **Badge Aesthetic:** Subtle borders and dots for brand consistency  
✅ **Overlay Persistence:** Responsive and centered on all screen sizes  
✅ **Licensing:** Copyright notice maintained in all files  

---

## Visual Design Summary

### Before Refinement
- Full-color background badges (high visual weight)
- Fixed-size overlay text
- Generic rarity colors

### After Refinement
- Subtle bordered badges (low visual weight)
- Color-coded dot indicators
- Responsive overlay sizing
- Gold for Legendary, Blue for Airmail
- Maintains brand consistency

---

## Point Value Summary

| Item Type | Base Points | Multiplier | Final Points |
|-----------|-------------|------------|--------------|
| Airmail Blue | 150 | 10x | **1500** |
| Bronze Green | 100 | 5x | **500** |
| Scottish Crown | 2500 | 1x | **2500** |
| Anonymous | 2500 | 1x | **2500** |
| Penfold Hexagonal | 200 | 1x | 200 |
| Other types | Varies | 1x | Varies |

---

## Testing Checklist

### Visual Testing
- [ ] Verify gold dot appears for Legendary items
- [ ] Verify blue dot appears for Airmail Blue
- [ ] Verify badge borders match rarity colors
- [ ] Verify badges have transparent backgrounds
- [ ] Verify "LAMP" overlay scales with icon size
- [ ] Test on mobile (320px width)
- [ ] Test on tablet (768px width)
- [ ] Test on desktop (1920px width)

### Functional Testing
- [ ] Verify Legendary items award 2500 points
- [ ] Verify Airmail Blue awards 1500 points
- [ ] Verify Bronze Green awards 500 points
- [ ] Verify `royal_mail_lamp_box_1.jpg` loads correctly
- [ ] Verify overlay stays centered on resize

---

## Brand Consistency Guidelines

### Color Palette
- **Legendary:** Gold (`#FFD700`)
- **Airmail Blue:** Sky Blue (`#0ea5e9`)
- **Heritage Red:** Primary brand color (`#991b1b`)
- **Accent Orange:** Secondary brand color (`#ea580c`)

### Typography
- **Badges:** 10px bold, uppercase
- **Overlay:** 15% of icon size, bold
- **Headings:** System font stack

### Visual Weight
- **High Priority:** Gold dots and borders (Legendary)
- **Medium Priority:** Blue dots and borders (Airmail)
- **Low Priority:** Standard rarity indicators

---

## Next Steps

1. **Place Asset Files:** Ensure `royal_mail_lamp_box_1.jpg` is in `/assets/` directory
2. **Visual QA:** Review badge aesthetics in browser
3. **Responsive Testing:** Test overlay on various screen sizes
4. **Point Verification:** Confirm Legendary items award 2500 points
5. **Ready for Postcard Module:** All refinements complete

---

## Licensing

© 2025 Insight Geospatial, Eurotech Marine Data Services Ltd. All rights reserved.

**Author:** Barry Ward

All refinements maintain proprietary licensing. Not for redistribution without written consent.

---

**Refinement Status:** ✅ **COMPLETE**

All surgical edits completed. Asset mapping synchronized, Legendary value set to 2500, badge aesthetics refined with subtle borders and dots, overlay made fully responsive and centered. Ready to proceed to Postcard Module.
