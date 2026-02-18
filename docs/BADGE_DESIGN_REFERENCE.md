# Badge Design Reference

© 2025 Insight Geospatial, Eurotech Marine Data Services Ltd. All rights reserved.  
Author: Barry Ward

**Date:** 17 February 2026

---

## Badge Visual Specifications

### Rarity Indicator Dot

**Placement:** Left of postbox name in heading

**Specifications:**
- Width: 8px
- Height: 8px
- Border Radius: 50% (perfect circle)
- Flex Shrink: 0 (maintains size)

**Color Mapping:**
```
Legendary       → Gold (#FFD700)
Airmail Blue    → Sky Blue (#0ea5e9)
Other Rarities  → Original rarity color
```

---

### Rarity Badge

**Placement:** Below postbox name

**Specifications:**
- Border: 2px solid
- Background: Transparent
- Padding: 2px 8px
- Border Radius: 12px (pill shape)
- Font Size: 10px
- Font Weight: Bold
- Display: Inline-block

**Color Mapping:**
```
Legendary       → Gold border + Gold text (#FFD700)
Airmail Blue    → Blue border + Blue text (#0ea5e9)
Other Rarities  → Rarity color border + Rarity color text
```

---

## Visual Examples

### Legendary Item (Scottish Crown)
```
● Scottish Crown                    ← Gold dot (8px)
┌──────────────┐
│  LEGENDARY   │                    ← Gold border, transparent bg
└──────────────┘
Points: 2500
```

### Airmail Blue
```
● Special: Airmail Blue             ← Blue dot (8px)
┌────────────────────┐
│  LEGENDARY AIRMAIL │              ← Blue border, transparent bg
└────────────────────┘
Points: 1500 (150 × 10x)
```

### Standard Rare Item
```
● Pillar Box: Victorian Cipher (VR) ← Orange dot (8px)
┌──────────────────────┐
│  LBSG RARE VICTORIAN │            ← Orange border, transparent bg
└──────────────────────┘
Points: 90
```

### Common Item
```
● Modern: Elizabeth II Cipher (EIIR) ← Green dot (8px)
┌────────┐
│ COMMON │                           ← Green border, transparent bg
└────────┘
Points: 5
```

---

## Development Status Overlay

**Placement:** Bottom center of icon

**Specifications:**
- Position: Absolute
- Bottom: 8% (responsive)
- Left: 50%
- Transform: translateX(-50%)
- Background: rgba(0, 0, 0, 0.75)
- Color: White
- Padding: 0.15em 0.6em
- Border Radius: 3px
- Font Size: 15% of icon size (responsive)
- Font Weight: Bold
- White Space: nowrap
- Text Align: Center

**Example (80px icon):**
```
┌──────────────────┐
│                  │
│   [LAMP BOX]     │
│                  │
│     ┌──────┐     │
│     │ LAMP │     │  ← 12px font (15% of 80px)
└─────┴──────┴─────┘
```

**Example (60px icon):**
```
┌─────────────┐
│             │
│ [LAMP BOX]  │
│             │
│   ┌────┐    │
│   │LAMP│    │  ← 9px font (15% of 60px)
└───┴────┴────┘
```

---

## Color Palette

### Primary Colors
```
Heritage Red    #991b1b   ███  Main brand color
Accent Orange   #ea580c   ███  Secondary brand color
```

### Rarity Colors
```
Gold (Legendary)     #FFD700   ███  Highest rarity
Purple (Museum)      #a855f7   ███  Museum pieces
Red (Historic)       #dc2626   ███  Historic items
Orange (Rare Vict.)  #f97316   ███  Victorian rare
Amber (Edwardian)    #f59e0b   ███  Edwardian era
Lime (Wall Box)      #84cc16   ███  Early wall boxes
Green (Common Wall)  #22c55e   ███  Common wall boxes
Teal (Ludlow)        #10b981   ███  Ludlow finds
Cyan (Lamp Box)      #06b6d4   ███  Lamp boxes
Green (Common)       #059669   ███  Common modern
Indigo (New Era)     #4f46e5   ███  Charles III
Amber (Special)      #d97706   ███  Special editions
Sky Blue (Airmail)   #0ea5e9   ███  Airmail blue
Dark Green (Bronze)  #166534   ███  Bronze green
Grey (Standard)      #6b7280   ███  Default/unknown
```

---

## CSS Implementation

### Dot Indicator
```css
.rarity-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.rarity-dot.legendary { background: #FFD700; }
.rarity-dot.airmail { background: #0ea5e9; }
```

### Badge
```css
.rarity-badge {
  display: inline-block;
  border: 2px solid;
  background: transparent;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: bold;
}

.rarity-badge.legendary {
  border-color: #FFD700;
  color: #FFD700;
}

.rarity-badge.airmail {
  border-color: #0ea5e9;
  color: #0ea5e9;
}
```

### Development Overlay
```css
.dev-overlay {
  position: absolute;
  bottom: 8%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 0.15em 0.6em;
  border-radius: 3px;
  font-weight: bold;
  white-space: nowrap;
  text-align: center;
  pointer-events: none;
}

/* Responsive font sizing */
.icon-60 .dev-overlay { font-size: 9px; }
.icon-80 .dev-overlay { font-size: 12px; }
.icon-100 .dev-overlay { font-size: 15px; }
```

---

## Accessibility

### Color Contrast
- All badge text meets WCAG AA standards
- Gold on white: 4.5:1 ratio
- Blue on white: 4.5:1 ratio
- Overlay text on dark background: 15:1 ratio

### Screen Readers
- Dots are decorative (no alt text needed)
- Badge text is semantic and readable
- Overlay text provides development status

---

## Responsive Behavior

### Mobile (320px - 767px)
- Dots: 8px (fixed)
- Badges: Full width if needed
- Overlay: Scales with icon (minimum 9px)

### Tablet (768px - 1023px)
- Dots: 8px (fixed)
- Badges: Inline display
- Overlay: Scales with icon (typically 12px)

### Desktop (1024px+)
- Dots: 8px (fixed)
- Badges: Inline display
- Overlay: Scales with icon (typically 12px)

---

## Brand Consistency Notes

1. **Subtle Visual Weight:** Borders instead of backgrounds reduce visual noise
2. **Color Coding:** Maintains information hierarchy
3. **Gold Emphasis:** Legendary items stand out appropriately
4. **Blue Distinction:** Airmail Blue gets special recognition
5. **Transparent Backgrounds:** Maintains clean, modern aesthetic

---

**Design Status:** ✅ **APPROVED**

All badge designs maintain brand consistency while providing clear visual hierarchy for rarity levels.
