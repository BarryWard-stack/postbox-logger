# Asset Integration Guide - Plogger PWA

© 2025 Insight Geospatial, Eurotech Marine Data Services Ltd. All rights reserved.  
Author: Barry Ward

**Date:** 17 February 2026  
**Version:** 1.0.0

---

## Overview

This document describes the integration of new refactored postbox assets into the Plogger PWA state management system. The integration maintains surgical precision by extending the existing architecture without refactoring core components.

---

## Architecture Changes

### 1. New Configuration File: `postboxAssets.js`

**Location:** `/postboxAssets.js`

**Purpose:** Centralized configuration for postbox types and monarch ciphers, including:
- Asset file paths
- Rarity levels and multipliers
- Scoring metadata
- Display labels and colors
- Development status flags

**Key Features:**
- **10x multiplier** for Airmail Blue postboxes
- **5x multiplier** for Bronze Green postboxes
- **Legendary status** for Scottish Crown and Anonymous variants
- Development status tracking for 3D renders (e.g., Lamp Box)

**Exports:**
```javascript
- postboxTypes: Object containing all postbox type configurations
- monarchCiphers: Object containing all monarch cipher configurations
- getPostboxTypeConfig(typeName): Helper function
- getMonarchCipherConfig(cipherCode): Helper function
- getAllPostboxTypes(): Returns array of all type names
- getAllMonarchCiphers(): Returns array of all cipher codes
- calculatePoints(typeName): Calculates final points with multiplier
```

---

### 2. Updated Scoring Logic

**File:** `plogger.js` and `index.html` (embedded code)

**Function:** `getRarityInfo(type)`

**Changes:**
- Now checks for `postboxAssets.js` configuration first
- Applies multipliers automatically (10x for Airmail Blue, 5x for Bronze Green)
- Falls back to legacy rarityMap if configuration not loaded
- Returns extended metadata including asset path and development status

**Example:**
```javascript
const rarityInfo = getRarityInfo('Special: Airmail Blue');
// Returns:
// {
//   level: 10,
//   label: 'LEGENDARY AIRMAIL',
//   color: '#0ea5e9',
//   points: 1500,  // 150 * 10x multiplier
//   asset: 'assets/airmail_blue_box.png',
//   description: 'Rare airmail blue postbox'
// }
```

---

### 3. New UI Component: `PostboxIcon`

**Location:** Added to both `plogger.js` and `index.html`

**Purpose:** Displays postbox type icons with proper handling of unstandardized whitespace

**Features:**
- **object-fit: contain** for proper aspect ratio handling
- **10% padding buffer** to accommodate whitespace variations
- **Development status overlay** for 3D renders (e.g., "LAMP" text)
- **Graceful fallback** to colored circles if image fails to load
- **Optional label display** for rarity information

**Props:**
```javascript
{
  type: string,           // Postbox type name
  size: number = 60,      // Icon size in pixels
  showLabel: boolean = false  // Show rarity label below icon
}
```

**Usage Example:**
```javascript
React.createElement(PostboxIcon, { 
  type: 'Lamp Box: Standard Oval', 
  size: 80, 
  showLabel: false 
})
```

---

### 4. Enhanced PostboxList Component

**Changes:**
- Now displays `PostboxIcon` component for each postbox
- Shows rarity badge with color coding
- Displays points value for each postbox
- Improved layout with flex display (icon + content columns)

**Visual Improvements:**
- Icon displayed on the left (80px)
- Rarity label badge with color coding
- Points information visible
- Better spacing and organization

---

### 5. Updated PostboxForm

**Changes:**
- Dynamically loads postbox types from `postboxAssets.js`
- Falls back to legacy list if configuration not available
- Includes new types: Airmail Blue, Bronze Green

---

## Asset Requirements

### Expected Asset Files

Place all asset files in the `/assets/` directory:

#### Postbox Types
- `ludlow_postbox_master.png` - Ludlow postbox reference
- `fluted_pillar_box_silhouette_1.png` - Fluted pillar box
- `lamp_box_3d_render.png` - Lamp box 3D render (shows "LAMP" overlay)
- `penfold_hexagonal.png` - Penfold hexagonal pillar box
- `wall_box_first_type.png` - First type wall box
- `airmail_blue_box.png` - **Airmail Blue (10x multiplier)**
- `bronze_green_box.png` - **Bronze Green (5x multiplier)**
- `olympic_gold.png` - Olympic gold postbox

#### Monarch Ciphers
- `vr_cipher.png` - Victorian (VR) cipher
- `evii_cipher.png` - Edward VII (EVIIR) cipher
- `gv_cipher.png` - George V (GVR) cipher
- `gvi_cipher.png` - George VI (GVIR) cipher
- `eii_cipher.png` - Elizabeth II (EIIR) cipher
- `ciii_cipher.png` - Charles III (CIIIR) cipher
- `scottish_crown.png` - **Scottish Crown (Legendary)**
- `anonymous_cipher.png` - **Anonymous (Legendary)**

### Asset Guidelines

1. **Use As-Is:** Assets are used without refactoring or background removal
2. **Whitespace:** Unstandardized whitespace is handled by CSS (object-fit: contain + 10% padding)
3. **Format:** PNG format recommended for transparency support
4. **Size:** No specific size requirement - CSS handles scaling

---

## Rarity Multipliers

### Special Rarity Multipliers

| Postbox Type | Base Points | Multiplier | Final Points | Status |
|--------------|-------------|------------|--------------|---------|
| Airmail Blue | 150 | 10x | **1500** | Legendary |
| Bronze Green | 100 | 5x | **500** | Rare |
| Scottish Crown | - | - | - | Legendary |
| Anonymous | - | - | - | Legendary |

### Standard Rarity Levels

| Level | Label | Example |
|-------|-------|---------|
| 10 | LBSG MUSEUM PIECE | Penfold Hexagonal |
| 9 | LBSG HISTORIC / NEW ERA - RARE | First National Standard, Charles III |
| 8 | LBSG RARE VICTORIAN / SPECIAL EDITION | Victorian Cipher, Olympic Gold |
| 7 | LBSG EDWARDIAN / LUDLOW FIND | Edward VII, Ludlow Box |
| 4 | LBSG COMMON WALL BOX | Wall Box Large Type |
| 3 | LBSG COMMON LAMP BOX | Lamp Box Standard Oval |
| 2 | COMMON | Elizabeth II |
| 1 | STANDARD | Default |

---

## Development Status Overlays

For assets still in development (3D renders), a text overlay is displayed:

**Example:** Lamp Box displays "LAMP" overlay at the bottom of the icon

**Implementation:**
```javascript
developmentStatus: 'LAMP'  // In postboxAssets.js configuration
```

The `PostboxIcon` component automatically renders this as a dark overlay with white text.

---

## Integration Checklist

- [x] Created `postboxAssets.js` configuration file
- [x] Updated `getRarityInfo()` to use new configuration
- [x] Applied 10x multiplier for Airmail Blue
- [x] Applied 5x multiplier for Bronze Green
- [x] Added Legendary status for Scottish Crown/Anonymous
- [x] Created `PostboxIcon` component with object-fit: contain
- [x] Implemented 10% padding buffer for whitespace handling
- [x] Added development status overlay for 3D renders
- [x] Updated `PostboxForm` to include new types
- [x] Enhanced `PostboxList` to display icons
- [x] Updated `index.html` to load `postboxAssets.js`
- [x] Maintained backward compatibility with fallback logic

---

## File Structure

```
/postbox-logger/
├── assets/
│   ├── README.md                    # Asset documentation
│   ├── ludlow_postbox_master.png
│   ├── fluted_pillar_box_silhouette_1.png
│   ├── lamp_box_3d_render.png
│   ├── airmail_blue_box.png         # 10x multiplier
│   ├── bronze_green_box.png         # 5x multiplier
│   ├── scottish_crown.png           # Legendary
│   ├── anonymous_cipher.png         # Legendary
│   └── [other asset files...]
├── postboxAssets.js                 # NEW: Asset configuration
├── plogger.js                       # UPDATED: Integrated new assets
├── index.html                       # UPDATED: Loads postboxAssets.js
└── docs/
    └── ASSET_INTEGRATION_GUIDE.md   # This document
```

---

## Usage Examples

### Adding a New Postbox Type

1. Add asset file to `/assets/` directory
2. Update `postboxAssets.js`:

```javascript
'New Type: Description': {
  asset: 'assets/new_type.png',
  rarity: 8,
  label: 'RARE FIND',
  color: '#ff6b6b',
  basePoints: 100,
  multiplier: 1,  // or higher for special types
  description: 'Description of the new type'
}
```

3. The UI will automatically pick up the new type

### Checking Asset Loading

Open browser console and check:
```javascript
console.log(typeof getPostboxTypeConfig);  // Should be 'function'
console.log(getAllPostboxTypes());         // Should show all types
```

---

## Testing

### Manual Testing Steps

1. **Load Application:**
   - Open `index.html` in browser
   - Check console for errors

2. **Verify Asset Loading:**
   - Open browser DevTools → Network tab
   - Confirm `postboxAssets.js` loads successfully
   - Check for 404 errors on asset images

3. **Test Icon Display:**
   - Navigate to List view
   - Verify icons display with proper padding
   - Check development status overlays (e.g., "LAMP" on Lamp Box)

4. **Test Scoring:**
   - Add an Airmail Blue postbox
   - Verify points = 1500 (150 × 10)
   - Add a Bronze Green postbox
   - Verify points = 500 (100 × 5)

5. **Test Fallback:**
   - Temporarily rename `postboxAssets.js`
   - Reload application
   - Verify legacy rarity map still works

---

## Troubleshooting

### Icons Not Displaying

**Problem:** Icons show as colored circles instead of images

**Solutions:**
1. Check asset files exist in `/assets/` directory
2. Verify file names match configuration in `postboxAssets.js`
3. Check browser console for 404 errors
4. Ensure `postboxAssets.js` loads before `plogger.js`

### Incorrect Points Calculation

**Problem:** Points don't reflect multipliers

**Solutions:**
1. Check `getRarityInfo()` is using `postboxAssets.js` configuration
2. Verify multiplier values in configuration
3. Check console: `console.log(getRarityInfo('Special: Airmail Blue'))`

### Development Overlay Not Showing

**Problem:** "LAMP" text not appearing on Lamp Box icon

**Solutions:**
1. Verify `developmentStatus: 'LAMP'` in configuration
2. Check `PostboxIcon` component is rendering overlay
3. Inspect element CSS for overlay positioning

---

## Future Enhancements

### Potential Additions

1. **Asset Preloading:** Implement image preloading for better performance
2. **Asset Versioning:** Add cache-busting for asset updates
3. **Lazy Loading:** Load assets on-demand for better initial load time
4. **Asset Validation:** Add runtime checks for missing assets
5. **Monarch Cipher UI:** Create dedicated UI for cipher exploration
6. **Asset Gallery:** Add admin view to preview all assets

---

## License

© 2025 Insight Geospatial, Eurotech Marine Data Services Ltd. All rights reserved.

This integration and all associated assets are proprietary and subject to the project license. Not for redistribution without written consent.

---

## Support

For questions or issues related to this integration, contact:
- **Author:** Barry Ward
- **Project:** Plogger PWA (Heritage Postbox Logger)
- **Date:** 17 February 2026
