# Digital Philately Module - Implementation Guide
# © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
# Author: Barry Ward (Developer) | Architect: Gemini
# Phase: 2.4 (Social Engagement & Philatelic Expansion)
# Date: 2025-02-14 11:00:00
# Version: 1.0.0

## 🎯 Feature Overview

**Name:** Digital First Day Cover Generator  
**Purpose:** Enable users to watermark postbox photos with era-appropriate stamps for social sharing  
**Scope:** Frontend-only UI enhancement to existing share dialog  
**Phase:** 2.4 (after color multipliers, photo verification)

---

## 👑 Era-to-Stamp Mapping Logic

### JavaScript Implementation

```javascript
// © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
// Author: Barry Ward
// Phase: 2.4 Digital Philately Module

/**
 * Era-to-Stamp Mapping
 * Maps postbox cipher/era to historically appropriate stamp designs
 */
const STAMP_LIBRARY = {
  VR: {
    era: "Victoria (1837-1901)",
    stamps: [
      {
        id: "penny_black_1840",
        name: "Penny Black",
        year: 1840,
        description: "World's first adhesive postage stamp",
        image: "/assets/stamps/penny_black.png",
        rarity: "Legendary",
        color: "#000000"
      },
      {
        id: "penny_red_1841",
        name: "Penny Red",
        year: 1841,
        description: "Most common Victorian stamp",
        image: "/assets/stamps/penny_red.png",
        rarity: "Common",
        color: "#8B0000"
      }
    ]
  },
  
  EVIIIR: {
    era: "Edward VII (1901-1910)",
    stamps: [
      {
        id: "1902_profile_red",
        name: "1902 Profile (Red)",
        year: 1902,
        description: "High-contrast Edwardian definitive series",
        image: "/assets/stamps/evii_profile_red.png",
        rarity: "Rare",
        color: "#DC143C"
      },
      {
        id: "1902_profile_purple",
        name: "1902 Profile (Purple)",
        year: 1902,
        description: "Alternative Edwardian definitive",
        image: "/assets/stamps/evii_profile_purple.png",
        rarity: "Rare",
        color: "#800080"
      }
    ]
  },
  
  GR: {
    era: "George V (1910-1936)",
    stamps: [
      {
        id: "1935_silver_jubilee",
        name: "1935 Silver Jubilee",
        year: 1935,
        description: "Commemorative for 25th year on throne",
        image: "/assets/stamps/gv_silver_jubilee.png",
        rarity: "Ultra Rare",
        color: "#C0C0C0"
      }
    ]
  },
  
  EVIIIIR: {
    era: "Edward VIII (1936)",
    stamps: [
      {
        id: "1936_accession_scarlet",
        name: "1936 Accession (Scarlet)",
        year: 1936,
        description: "Rare issue matching Legendary box status",
        image: "/assets/stamps/eviii_accession.png",
        rarity: "Legendary",
        color: "#FF2400"
      }
    ]
  },
  
  GVIR: {
    era: "George VI (1936-1952)",
    stamps: [
      {
        id: "1937_coronation",
        name: "1937 Coronation Series",
        year: 1937,
        description: "Ornate definitive reflecting mid-century era",
        image: "/assets/stamps/gvi_coronation.png",
        rarity: "Rare",
        color: "#4169E1"
      }
    ]
  },
  
  EIIR: {
    era: "Elizabeth II (1952-2022)",
    stamps: [
      {
        id: "machin_definitive",
        name: "Machin Series (Standard)",
        year: 1967,
        description: "Most iconic British stamp design in history",
        image: "/assets/stamps/machin_red.png",
        rarity: "Common",
        color: "#DC2626"
      }
    ]
  },
  
  CIIIR: {
    era: "Charles III (2022-Present)",
    stamps: [
      {
        id: "2023_coronation",
        name: "2023 Coronation Definitive",
        year: 2023,
        description: "First King Charles issues for new box era",
        image: "/assets/stamps/ciii_coronation.png",
        rarity: "Common",
        color: "#1E3A8A"
      }
    ]
  },
  
  SCOTTISH: {
    era: "Scottish Regional",
    stamps: [
      {
        id: "scottish_lion",
        name: "Regional Lion Definitive",
        year: 1958,
        description: "Auto-detected for boxes in Scotland",
        image: "/assets/stamps/scottish_lion.png",
        rarity: "Rare",
        color: "#003893"
      }
    ]
  }
};

/**
 * Get suggested stamps for a postbox based on cipher detection
 * @param {object} postbox - Postbox data with cipher/type field
 * @param {object} location - GPS coordinates for regional detection
 * @returns {array} 2-3 suggested stamps matching the era
 */
function getSuggestedStamps(postbox, location = null) {
  const cipher = postbox.cipher || postbox.type || 'UNKNOWN';
  
  // Scottish regional detection via GPS
  if (location && isInScotland(location.lat, location.lng)) {
    return STAMP_LIBRARY.SCOTTISH.stamps.slice(0, 2);
  }
  
  // Match cipher to era
  const eraStamps = STAMP_LIBRARY[cipher];
  
  if (!eraStamps) {
    // Default to EIIR (most common)
    return STAMP_LIBRARY.EIIR.stamps.slice(0, 2);
  }
  
  // Return up to 3 stamps for the era
  return eraStamps.stamps.slice(0, 3);
}

/**
 * Check if location is in Scotland (simplified)
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {boolean} True if in Scotland
 */
function isInScotland(lat, lng) {
  // Rough bounding box: Scotland is approximately 55°N - 61°N, -8°W - -1°W
  return lat >= 55 && lat <= 61 && lng >= -8 && lng <= -1;
}

/**
 * Apply stamp watermark to postbox image
 * @param {HTMLCanvasElement} canvas - Canvas with postbox photo
 * @param {object} stamp - Stamp object from STAMP_LIBRARY
 * @param {string} position - 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
 * @returns {Promise<string>} Data URL of watermarked image
 */
async function applyStampWatermark(canvas, stamp, position = 'top-right') {
  const ctx = canvas.getContext('2d');
  
  // Load stamp image
  const stampImg = new Image();
  await new Promise((resolve, reject) => {
    stampImg.onload = resolve;
    stampImg.onerror = reject;
    stampImg.src = stamp.image;
  });
  
  // Calculate stamp size (10% of canvas width, maintain aspect ratio)
  const stampWidth = canvas.width * 0.1;
  const stampHeight = stampImg.height * (stampWidth / stampImg.width);
  
  // Calculate position
  const padding = canvas.width * 0.02; // 2% padding from edge
  let x, y;
  
  switch (position) {
    case 'top-left':
      x = padding;
      y = padding;
      break;
    case 'top-right':
      x = canvas.width - stampWidth - padding;
      y = padding;
      break;
    case 'bottom-left':
      x = padding;
      y = canvas.height - stampHeight - padding;
      break;
    case 'bottom-right':
    default:
      x = canvas.width - stampWidth - padding;
      y = canvas.height - stampHeight - padding;
  }
  
  // Apply stamp at 85% opacity
  ctx.globalAlpha = 0.85;
  ctx.drawImage(stampImg, x, y, stampWidth, stampHeight);
  ctx.globalAlpha = 1.0;
  
  return canvas.toDataURL('image/png');
}

module.exports = {
  STAMP_LIBRARY,
  getSuggestedStamps,
  applyStampWatermark,
  isInScotland
};
```

---

## 🎨 UI Integration: Stamp Carousel Component

### React Component (Surgical Addition to Share Dialog)

```jsx
// © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
// Author: Barry Ward
// Phase: 2.4 Digital Philately Module

import React, { useState, useEffect } from 'react';
import { getSuggestedStamps, applyStampWatermark } from './stampLibrary';

/**
 * StampCarousel Component
 * Horizontal carousel showing 2-3 era-appropriate stamps for watermarking
 * Integrates into existing Share Dialog
 */
function StampCarousel({ postbox, photoCanvas, onStampSelected }) {
  const [stamps, setStamps] = useState([]);
  const [selectedStamp, setSelectedStamp] = useState(null);
  const [position, setPosition] = useState('top-right');
  
  useEffect(() => {
    // Get suggested stamps based on postbox cipher
    const location = { lat: postbox.lat, lng: postbox.lng };
    const suggested = getSuggestedStamps(postbox, location);
    setStamps(suggested);
  }, [postbox]);
  
  const handleStampClick = async (stamp) => {
    setSelectedStamp(stamp);
    
    // Apply watermark to canvas
    const watermarkedImage = await applyStampWatermark(
      photoCanvas, 
      stamp, 
      position
    );
    
    // Notify parent component
    onStampSelected(watermarkedImage, stamp);
  };
  
  if (stamps.length === 0) return null;
  
  return (
    <div className="stamp-carousel">
      <h4 className="stamp-carousel-title">
        📮 Add Era-Appropriate Stamp
      </h4>
      
      <div className="stamp-carousel-subtitle">
        Suggested for {postbox.cipher || 'this era'}
      </div>
      
      {/* Horizontal scrollable stamp list */}
      <div className="stamp-list">
        {stamps.map((stamp) => (
          <div
            key={stamp.id}
            className={`stamp-card ${selectedStamp?.id === stamp.id ? 'selected' : ''}`}
            onClick={() => handleStampClick(stamp)}
          >
            <img 
              src={stamp.image} 
              alt={stamp.name}
              className="stamp-preview"
            />
            <div className="stamp-info">
              <div className="stamp-name">{stamp.name}</div>
              <div className="stamp-year">{stamp.year}</div>
              <div className="stamp-rarity">{stamp.rarity}</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Position selector (optional) */}
      {selectedStamp && (
        <div className="stamp-position-selector">
          <label>Watermark Position:</label>
          <select 
            value={position} 
            onChange={(e) => {
              setPosition(e.target.value);
              handleStampClick(selectedStamp); // Re-apply with new position
            }}
          >
            <option value="top-right">Top Right</option>
            <option value="top-left">Top Left</option>
            <option value="bottom-right">Bottom Right</option>
            <option value="bottom-left">Bottom Left</option>
          </select>
        </div>
      )}
    </div>
  );
}

export default StampCarousel;
```

### CSS Styling (Surgical Addition)

```css
/* © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd. */
/* Author: Barry Ward - Phase: 2.4 Digital Philately Module */

.stamp-carousel {
  margin: 16px 0;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.stamp-carousel-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px 0;
}

.stamp-carousel-subtitle {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 12px;
}

.stamp-list {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.stamp-card {
  flex-shrink: 0;
  width: 120px;
  padding: 12px;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.stamp-card:hover {
  border-color: #DC2626;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.stamp-card.selected {
  border-color: #DC2626;
  background: #fef2f2;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.stamp-preview {
  width: 100%;
  height: 80px;
  object-fit: contain;
  margin-bottom: 8px;
}

.stamp-info {
  text-align: center;
}

.stamp-name {
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 2px;
}

.stamp-year {
  font-size: 11px;
  color: #6b7280;
}

.stamp-rarity {
  font-size: 10px;
  font-weight: 600;
  color: #DC2626;
  text-transform: uppercase;
  margin-top: 4px;
}

.stamp-position-selector {
  margin-top: 12px;
  font-size: 13px;
}

.stamp-position-selector label {
  display: block;
  margin-bottom: 4px;
  color: #6b7280;
}

.stamp-position-selector select {
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 13px;
}
```

---

## 📦 Asset Preparation Workflow

### Phase 1: Source Public Domain Stamps

**Primary Sources:**
1. **The Postal Museum** - https://postalmuseum.org/collections/
2. **Wikimedia Commons (Philately)** - Search: "British postage stamp [year]"
3. **British Postal Museum & Archive**

**Required Stamps (Priority Order):**
- [ ] Penny Black (1840) - VR
- [ ] Penny Red (1841) - VR
- [ ] 1902 Profile Red - EVIIIR
- [ ] 1935 Silver Jubilee - GR
- [ ] 1936 Accession Scarlet - EVIIIIR (Legendary)
- [ ] 1937 Coronation - GVIR
- [ ] Machin Series Red - EIIR
- [ ] 2023 Coronation - CIIIR
- [ ] Scottish Lion Regional

### Phase 2: Asset Processing (MANDATORY)

**Same workflow as postbox icons:**

1. **Download at highest resolution available**
2. **Verify transparency:**
   ```bash
   identify -verbose [stamp].png | grep Type
   # Must show: Type: TrueColorAlpha
   ```
3. **If shows "TrueColor" (fake transparency):**
   ```bash
   convert [stamp].png -fuzz 15% -transparent white [stamp]_alpha.png
   ```
4. **Resize to standard:**
   ```bash
   # Target: 300x400px (portrait orientation)
   convert [stamp]_alpha.png -resize 300x400 assets/stamps/[stamp].png
   ```

### Phase 3: Verification

**Checklist per stamp:**
- [ ] PNG-24 with alpha transparency
- [ ] Size: ~300x400px (portrait)
- [ ] File size: <100 KB
- [ ] No white/checkered halos
- [ ] Centered in canvas with padding
- [ ] Proper naming: `[era]_[variant].png`

---

## 🔧 Integration Points

### Modify Existing Share Dialog

**File:** `heritage-postbox-v0_8_0-firebase.html` (or equivalent)

**Location:** Inside share dialog modal (after photo preview, before share buttons)

```javascript
// SURGICAL ADDITION - Phase 2.4
// Add after photo canvas render, before social share buttons

function renderShareDialog(postbox, photoData) {
  // ... existing photo preview code ...
  
  // NEW: Add stamp carousel
  const stampCarousel = React.createElement(StampCarousel, {
    postbox: postbox,
    photoCanvas: photoCanvas,
    onStampSelected: (watermarkedImage, stamp) => {
      // Update preview with watermarked version
      previewImg.src = watermarkedImage;
      
      // Store for social share
      currentShareImage = watermarkedImage;
      
      // Optional: Track stamp usage for analytics
      logStampUsage(postbox.id, stamp.id);
    }
  });
  
  // Render carousel into share dialog
  shareDialogContainer.appendChild(stampCarousel);
  
  // ... existing share button code ...
}
```

### Social Share Metadata Enhancement

```javascript
// Add stamp attribution to Facebook share
function shareToFacebook(watermarkedImage, postbox, stamp) {
  const caption = `Found a ${postbox.era} heritage postbox! 📮
  
${stamp ? `Commemorated with ${stamp.name} (${stamp.year})` : ''}
Logged via Plogger - Heritage Postbox Logger`;
  
  // ... existing Facebook share API call ...
}
```

---

## 📊 Data Schema (NO CHANGES REQUIRED)

**Critical:** This feature operates entirely in the UI layer.

**What we USE from existing data:**
- `postbox.cipher` or `postbox.type` - for era detection
- `postbox.lat`, `postbox.lng` - for Scottish regional detection
- Photo canvas from camera capture

**What we DON'T modify:**
- Firestore database schema
- Postbox document structure
- Authentication flow
- Storage rules

---

## 🎯 User Flow

1. **User captures postbox photo**
2. **Taps "Share" button**
3. **Share dialog opens with photo preview**
4. **NEW: Stamp carousel appears** (2-3 stamps auto-suggested)
5. **User taps desired stamp** (optional)
6. **Stamp watermark applied at 85% opacity**
7. **Position can be adjusted** (top-right, top-left, etc.)
8. **User taps Facebook/Twitter/Instagram share**
9. **Watermarked image shared with caption**

---

## 🚨 Quality Gates

**Before merging to main:**
- [ ] All stamps verified as PNG-24 with alpha
- [ ] Carousel renders correctly on mobile (320px width)
- [ ] Watermark opacity exactly 85%
- [ ] No performance degradation (stamp load <500ms)
- [ ] Scottish regional detection tested with GPS mock
- [ ] Facebook share includes stamp attribution
- [ ] Works with existing share dialog (no conflicts)

**Testing checklist:**
- [ ] Test with VR postbox (shows Penny Black/Red)
- [ ] Test with EVIIIIR postbox (shows Legendary stamp)
- [ ] Test with EIIR postbox (shows Machin)
- [ ] Test in Scotland coordinates (shows Scottish Lion)
- [ ] Test with unknown cipher (defaults to EIIR)

---

## 📋 Future Enhancements (Post-v1.0)

**Gemini's next curation:**
> "Once your Recraft credits reset, I can provide specific prompts for 'Golden' or 'Blue' philatelic variant watermarks to match your rare boxes."

**Potential additions:**
- [ ] Olympic Gold stamp variant (for Olympic postboxes)
- [ ] Airmail Blue stamp variant (for Airmail boxes)
- [ ] Animated "stamp cancellation" effect on watermark
- [ ] User stamp collection tracker
- [ ] "Complete the philatelic set" achievement

---

## ✅ Rollout Plan

**Phase 2.4 Timeline:**
1. **Week 1:** Source and process stamp assets (9 stamps)
2. **Week 2:** Implement StampCarousel component
3. **Week 3:** Integrate into share dialog
4. **Week 4:** Testing + Facebook API integration
5. **Week 5:** Deploy to production

**Prerequisites:**
- Phase 2.1: Color multipliers implemented
- Phase 2.2: Photo verification working
- Phase 2.3: Achievement system functional

---

## 🎓 Educational Component

**Optional tooltip for users:**
```
💡 Did you know?
The Penny Black (1840) was the world's first adhesive postage stamp!
It revolutionized postal services and inspired the design of all modern stamps.
```

**Show on first stamp selection, can be dismissed.**

---

**This feature bridges digital heritage collection with philatelic history—a perfect "side quest" that enhances engagement without bloating the core experience.**
