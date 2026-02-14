// © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd. All rights reserved.
// Author: Barry Ward
// License: Proprietary - Not for redistribution without written consent.
// Last Modified: 2025-02-14 09:20:00
// Version: 1.0.0
// Project: Heritage Postbox Logger (Plogger) - Phase 2 Gamification

/**
 * HERITAGE COLOR MULTIPLIERS - PHASE 2 IMPLEMENTATION
 * 
 * Based on Letter Box Study Group (LBSG) historical research.
 * These color variants represent rare heritage finds with increased point values.
 * 
 * INTEGRATION TARGET: heritage-postbox-v0_8_0-firebase.html
 * FUNCTION: getRarityInfo()
 * CURRENT LOGIC: Cipher-based rarity only (VR, EVIIIR, GR, etc.)
 * NEW LOGIC: Cipher + Color multiplier stacking
 */

// === COLOR VARIANT DEFINITIONS (Curated by Gemini/Technical Architect) ===

const HERITAGE_COLORS = {
  BRONZE_GREEN: {
    hex: '#2E3B23',
    name: 'Victorian Bronze-Green',
    era: 'Pre-1874',
    description: 'Original Victorian-era standard color before adoption of red',
    rarity: 'Ultra Rare',
    multiplier: 5,
    researchNote: 'LBSG documentation shows bronze-green as standard 1866-1874'
  },
  
  AIRMAIL_BLUE: {
    hex: '#87CEEB',
    name: 'Airmail Blue',
    era: '1930s',
    description: 'Special airmail service designation boxes',
    rarity: 'Legendary',
    multiplier: 10,
    researchNote: 'Sky blue boxes indicated airmail collection points, extremely rare survivors'
  },
  
  SUNDAY_YELLOW: {
    hex: '#FACC15',
    name: 'Sunday Collection Yellow',
    era: '1980s',
    description: 'Weekend collection status markers',
    rarity: 'Rare',
    multiplier: 3,
    researchNote: 'Yellow bands/markers indicated Sunday collection availability'
  },
  
  DECOMMISSIONED: {
    hex: '#000000',
    name: 'Decommissioned Black',
    era: 'Various',
    description: 'Retired or sealed heritage boxes preserved in situ',
    rarity: 'Special',
    multiplier: 2,
    researchNote: 'Black paint indicates official decommissioning, often historically significant'
  }
};

// === IMPLEMENTATION LOGIC ===

/**
 * Detect color variant from photo analysis or user tag
 * @param {string} colorHex - Dominant color from image (future: ML color detection)
 * @param {object} userTags - User-submitted tags {hasAirmailBlue: bool, etc.}
 * @returns {object|null} Color variant data or null
 */
function detectColorVariant(colorHex, userTags = {}) {
  // Priority 1: User-verified tags (Phase 3: Photo Verification)
  if (userTags.hasAirmailBlue) return HERITAGE_COLORS.AIRMAIL_BLUE;
  if (userTags.hasBronzeGreen) return HERITAGE_COLORS.BRONZE_GREEN;
  if (userTags.hasSundayYellow) return HERITAGE_COLORS.SUNDAY_YELLOW;
  if (userTags.isDecommissioned) return HERITAGE_COLORS.DECOMMISSIONED;
  
  // Priority 2: Automated color matching (future implementation)
  if (!colorHex) return null;
  
  // Simple hex proximity matching (±10% tolerance)
  const tolerance = 0.1;
  for (const [key, variant] of Object.entries(HERITAGE_COLORS)) {
    if (colorMatches(colorHex, variant.hex, tolerance)) {
      return variant;
    }
  }
  
  return null;
}

/**
 * Enhanced rarity calculation with color multiplier stacking
 * SURGICAL EDIT TARGET: Extend existing getRarityInfo() function
 */
function getEnhancedRarityInfo(postbox) {
  // STEP 1: Get base rarity from existing cipher logic (DO NOT MODIFY)
  const baseRarity = getExistingCipherRarity(postbox); // Existing function
  let { level, points, title } = baseRarity;
  
  // STEP 2: Apply color multiplier if detected
  const colorVariant = detectColorVariant(postbox.dominantColor, postbox.userTags);
  
  if (colorVariant) {
    points *= colorVariant.multiplier;
    title = `${colorVariant.name} ${title}`; // e.g., "Airmail Blue Victorian Pillar (VR)"
    level = Math.min(level + 2, 10); // Cap at level 10
    
    // Add color badge to achievements
    return {
      level,
      points,
      title,
      colorVariant: colorVariant.name,
      colorMultiplier: colorVariant.multiplier,
      colorBadge: colorVariant.rarity,
      researchNote: colorVariant.researchNote
    };
  }
  
  return baseRarity; // No color variant detected, return cipher-only rarity
}

// === SURGICAL INTEGRATION STEPS ===

/**
 * STEP-BY-STEP INTEGRATION (v0.9.0):
 * 
 * 1. LOCATE existing getRarityInfo() function in heritage-postbox-v0_8_0-firebase.html
 *    (Current lines: ~450-480, inside postbox data processing logic)
 * 
 * 2. ADD HERITAGE_COLORS constant at top of <script> section (after Firebase config)
 * 
 * 3. CREATE detectColorVariant() helper function above getRarityInfo()
 * 
 * 4. RENAME existing getRarityInfo() → getExistingCipherRarity()
 * 
 * 5. CREATE new getRarityInfo() wrapper that calls getEnhancedRarityInfo()
 * 
 * 6. UPDATE UI display logic to show colorBadge when present:
 *    - Add color badge icon to postbox popup
 *    - Display colorMultiplier in stats panel
 *    - Show researchNote in achievement modal
 * 
 * 7. TEST with mock data:
 *    - Airmail Blue VR box = 10x base points
 *    - Bronze Green E VIII R = 5x legendary base
 *    - Standard red GR = no multiplier (baseline)
 */

// === DATA STRUCTURE EXTENSIONS ===

/**
 * Firestore postbox document schema additions (Phase 2):
 * 
 * {
 *   // ... existing fields ...
 *   dominantColor: '#DC2626',        // ML-detected or manual (Phase 3)
 *   userTags: {
 *     hasAirmailBlue: false,
 *     hasBronzeGreen: false,
 *     hasSundayYellow: false,
 *     isDecommissioned: false
 *   },
 *   colorVariant: 'Airmail Blue',    // Auto-populated if detected
 *   colorMultiplier: 10,              // Points multiplier applied
 *   colorBadge: 'Legendary'           // Achievement tier
 * }
 */

// === HELPER FUNCTIONS ===

function colorMatches(hex1, hex2, tolerance) {
  // Convert hex to RGB and calculate Euclidean distance
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  
  const distance = Math.sqrt(
    Math.pow(rgb1.r - rgb2.r, 2) +
    Math.pow(rgb1.g - rgb2.g, 2) +
    Math.pow(rgb1.b - rgb2.b, 2)
  );
  
  const maxDistance = Math.sqrt(3 * Math.pow(255, 2));
  return (distance / maxDistance) <= tolerance;
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * ROLLBACK PLAN:
 * If color multipliers cause gameplay imbalance:
 * 1. Set all multipliers to 1.0 (disable feature)
 * 2. Keep color badges as cosmetic-only achievements
 * 3. Preserve colorVariant data for future research queries
 */

module.exports = {
  HERITAGE_COLORS,
  detectColorVariant,
  getEnhancedRarityInfo
};
