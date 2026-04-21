# Heritage Postbox - Research Data Implementation Mapping
# © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd. All rights reserved.
# Author: Barry Ward (Technical Implementation)
# Research Curator: Gemini (LBSG Standards Alignment)
# Last Modified: 2025-02-14 15:35:00
# Version: 1.0.0

---

## Purpose

This document maps the curated research data (HERITAGE_POSTBOX_RESEARCH_SUMMARY.md) to technical implementation in:
- **Phase 2:** Gamification Core (points, achievements, rarity)
- **Phase 3:** Data Provenance & Quality (validation, verification)

---

## Phase 2: Gamification Implementation

### Rarity Tier System (Database Schema)

**Firebase Firestore Collection: `postbox_types`**

```javascript
{
  cipher: "E VIII R",
  era: "Edward VIII",
  rarity: "legendary",
  basePoints: 500,
  multipliers: {
    firstFind: 1.5,        // 750 points for first discovery
    photoQuality: 1.2,     // 600 points with high-quality photo
    completeness: 1.1      // 550 points with all data fields
  },
  description: "Extremely rare - only 161 Edward VIII pillar boxes exist",
  validCiphers: ["E VIII R", "E8R"],  // Acceptable variations
  color: "#FFD700",  // Gold badge color
  icon: "legendary_crown.svg"
}
```

**Implementation in Points Calculator:**

```javascript
// src/services/pointsCalculator.js (Phase 2)
function calculatePoints(postboxData) {
  const basePoints = RARITY_TIERS[postboxData.cipher].basePoints;
  let multiplier = 1.0;
  
  // First discovery bonus
  if (postboxData.isFirstFind) {
    multiplier *= 1.5;
  }
  
  // Photo quality bonus (EXIF data present, high resolution)
  if (postboxData.photoQuality === 'high') {
    multiplier *= 1.2;
  }
  
  // Data completeness bonus (all fields filled)
  if (postboxData.completenessScore === 100) {
    multiplier *= 1.1;
  }
  
  return Math.floor(basePoints * multiplier);
}
```

---

### Complete Rarity Tiers (From Research Summary)

**Firestore Document Structure:**

```javascript
// Collection: postbox_types
[
  {
    id: "edward_viii",
    cipher: "E VIII R",
    era: "Edward VIII",
    rarity: "legendary",
    basePoints: 500,
    estimatedCount: 161,  // LBSG data
    yearRange: [1936, 1936],  // Reign: Dec 1936 - Dec 1936
    badge: {
      name: "Edward VIII Finder",
      icon: "legendary_edwardviii.svg",
      color: "#8B0000"  // Dark red
    }
  },
  {
    id: "charles_iii",
    cipher: "C III R",
    era: "Charles III",
    rarity: "very_rare",
    basePoints: 250,
    estimatedCount: "Growing",  // New installations
    yearRange: [2022, null],  // Ongoing
    badge: {
      name: "Modern Royal Witness",
      icon: "rare_charlesiii.svg",
      color: "#4B0082"  // Indigo
    }
  },
  {
    id: "penfold_hex",
    cipher: "VR",
    era: "Victorian (Penfold)",
    rarity: "high",
    basePoints: 200,
    estimatedCount: "~200",  // LBSG estimate
    yearRange: [1866, 1879],
    type: "Hexagonal Penfold",
    badge: {
      name: "Victorian Hex Hunter",
      icon: "high_penfold.svg",
      color: "#FF6347"  // Tomato red
    }
  },
  {
    id: "anonymous_pillar",
    cipher: null,  // No cipher
    era: "Victorian (Anonymous)",
    rarity: "rare",
    basePoints: 150,
    estimatedCount: "Unknown",
    yearRange: [1879, 1887],
    type: "Anonymous Pillar",
    badge: {
      name: "Anonymous Era Discoverer",
      icon: "rare_anonymous.svg",
      color: "#FF8C00"  // Dark orange
    }
  },
  {
    id: "olympic_gold",
    cipher: "E II R",
    era: "Elizabeth II (Olympic)",
    rarity: "special",
    basePoints: 100,
    estimatedCount: 124,  // 2012 Olympics
    yearRange: [2012, 2012],
    type: "Gold Olympic",
    specialEvent: "2012 London Olympics",
    badge: {
      name: "Gold Medal Hunter",
      icon: "special_olympic.svg",
      color: "#FFD700"  // Gold
    }
  },
  {
    id: "victorian_standard",
    cipher: "VR",
    era: "Victorian",
    rarity: "medium",
    basePoints: 75,
    estimatedCount: "~3,000",  // LBSG estimate
    yearRange: [1837, 1901],
    badge: {
      name: "Victorian Age Collector",
      icon: "medium_victorian.svg",
      color: "#CD853F"  // Peru/tan
    }
  },
  {
    id: "elizabeth_ii",
    cipher: "E II R",
    era: "Elizabeth II",
    rarity: "standard",
    basePoints: 10,
    estimatedCount: "~100,000+",  // Most common
    yearRange: [1952, 2022],
    badge: {
      name: "Heritage Enthusiast",
      icon: "standard_eiir.svg",
      color: "#4169E1"  // Royal blue
    }
  }
]
```

---

### Achievement System (Based on Rarity Tiers)

**Firestore Collection: `achievements`**

```javascript
[
  {
    id: "legendary_collector",
    name: "Legendary Collector",
    description: "Find at least one legendary-tier postbox",
    tier: "legendary",
    requirement: {
      type: "rarity_find",
      rarity: "legendary",
      count: 1
    },
    reward: {
      badge: "legendary_star.svg",
      points: 1000
    }
  },
  {
    id: "era_specialist",
    name: "Era Specialist",
    description: "Find postboxes from 5 different monarchs",
    tier: "expert",
    requirement: {
      type: "era_diversity",
      uniqueEras: 5
    },
    reward: {
      badge: "era_crown.svg",
      points: 500
    }
  },
  {
    id: "penfold_enthusiast",
    name: "Penfold Enthusiast",
    description: "Find 10 Penfold hexagonal postboxes",
    tier: "specialist",
    requirement: {
      type: "specific_type",
      typeId: "penfold_hex",
      count: 10
    },
    reward: {
      badge: "penfold_collector.svg",
      points: 750
    }
  },
  {
    id: "lbsg_contributor",
    name: "LBSG Contributor",
    description: "Submit 100 verified postboxes to the database",
    tier: "contributor",
    requirement: {
      type: "submission_count",
      verified: true,
      count: 100
    },
    reward: {
      badge: "verified_contributor.svg",
      points: 300,
      title: "Research Contributor"
    }
  }
]
```

---

## Phase 3: Data Validation Implementation

### Cipher Accuracy Validation

**Validation Service:**

```javascript
// src/services/cipherValidator.js (Phase 3)

const VALID_CIPHERS = {
  "VR": ["Victorian", "1837-1901"],
  "E VII R": ["Edward VII", "1901-1910"],
  "E VIII R": ["Edward VIII", "1936"],
  "G V R": ["George V", "1910-1936"],
  "G VI R": ["George VI", "1936-1952"],
  "E II R": ["Elizabeth II", "1952-2022"],
  "C III R": ["Charles III", "2022-present"],
  // Common variations/errors
  "ER": "INVALID - Ambiguous",
  "VRI": "INVALID - Use VR",
  "E8R": "VALID - E VIII R variant"
};

function validateCipher(inputCipher, claimedEra) {
  const normalized = inputCipher.trim().toUpperCase();
  
  // Check if cipher exists
  if (!VALID_CIPHERS[normalized]) {
    return {
      valid: false,
      error: "Unknown cipher. Please verify against postbox.",
      suggestion: "Common ciphers: VR, E VII R, G V R, G VI R, E II R, C III R"
    };
  }
  
  // Check era alignment
  const [correctEra, yearRange] = VALID_CIPHERS[normalized];
  if (correctEra !== claimedEra) {
    return {
      valid: false,
      error: `Cipher ${normalized} belongs to ${correctEra}, not ${claimedEra}`,
      correctEra: correctEra,
      yearRange: yearRange
    };
  }
  
  return {
    valid: true,
    era: correctEra,
    yearRange: yearRange
  };
}
```

---

### EXIF Metadata Verification

**Photo Validation Service:**

```javascript
// src/services/photoValidator.js (Phase 3)
import EXIF from 'exif-js';

async function validatePhotoMetadata(photoFile, userSubmittedData) {
  return new Promise((resolve) => {
    EXIF.getData(photoFile, function() {
      const exifData = {
        gps: {
          lat: EXIF.getTag(this, "GPSLatitude"),
          lon: EXIF.getTag(this, "GPSLongitude"),
          latRef: EXIF.getTag(this, "GPSLatitudeRef"),
          lonRef: EXIF.getTag(this, "GPSLongitudeRef")
        },
        timestamp: EXIF.getTag(this, "DateTime"),
        device: EXIF.getTag(this, "Model"),
        resolution: {
          width: EXIF.getTag(this, "PixelXDimension"),
          height: EXIF.getTag(this, "PixelYDimension")
        }
      };
      
      // Convert GPS to decimal degrees
      const exifLocation = convertGPSToDecimal(exifData.gps);
      
      // Compare with user-submitted location
      const distance = calculateDistance(
        exifLocation,
        userSubmittedData.location
      );
      
      // Validation results
      const validation = {
        locationMatch: distance < 50, // Within 50 meters
        gpsAccuracy: distance,
        timestampPresent: !!exifData.timestamp,
        resolutionAdequate: (
          exifData.resolution.width >= 1920 &&
          exifData.resolution.height >= 1080
        ),
        deviceInfo: exifData.device,
        trustScore: calculateTrustScore(exifData, userSubmittedData)
      };
      
      resolve(validation);
    });
  });
}

function calculateTrustScore(exifData, userData) {
  let score = 100;
  
  // GPS mismatch penalty
  if (!validation.locationMatch) {
    score -= 30;
  }
  
  // Missing EXIF timestamp
  if (!exifData.timestamp) {
    score -= 20;
  }
  
  // Low resolution
  if (!validation.resolutionAdequate) {
    score -= 10;
  }
  
  // Historical consistency check
  // (e.g., Charles III photo can't have 2020 timestamp)
  if (!checkHistoricalConsistency(userData.era, exifData.timestamp)) {
    score -= 40;
  }
  
  return Math.max(0, score);
}
```

---

### Manufacturer Mark Identification (Optional Enhancement)

**Future Phase 3 Feature:**

```javascript
// src/services/manufacturerDetector.js (Phase 3 - optional)

const MANUFACTURERS = {
  "HANDYSIDE": {
    name: "Andrew Handyside & Co.",
    location: "Derby",
    period: [1850, 1920],
    commonCiphers: ["VR", "E VII R"]
  },
  "CARRON": {
    name: "Carron Company",
    location: "Falkirk, Scotland",
    period: [1759, 1982],
    commonCiphers: ["VR", "E VII R", "G V R"]
  },
  "MACFARLANE": {
    name: "Walter Macfarlane & Co.",
    location: "Glasgow",
    period: [1850, 1965],
    commonCiphers: ["VR", "E VII R"]
  }
};

// OCR or manual input to identify foundry marks
function identifyManufacturer(foundryMark) {
  const normalized = foundryMark.toUpperCase().trim();
  
  for (const [key, data] of Object.entries(MANUFACTURERS)) {
    if (normalized.includes(key)) {
      return {
        identified: true,
        manufacturer: data.name,
        location: data.location,
        activePeriod: data.period,
        bonus: 50  // Bonus points for identifying manufacturer
      };
    }
  }
  
  return {
    identified: false,
    suggestion: "Check base plate or door for foundry marks"
  };
}
```

---

## Phase 3: Maintenance Reporting Integration

### Automated Royal Mail Reporting

**Contact Service:**

```javascript
// src/services/maintenanceReporter.js (Phase 3)

const ROYAL_MAIL_CONTACTS = {
  appearance: {
    email: "postbox.appearance@royalmail.com",
    subject: "Postbox Appearance Report",
    categories: ["Rust", "Paint damage", "Graffiti", "General wear"]
  },
  removal: {
    email: "monitor@royalmailpfs.com",
    subject: "Postbox Removal/Relocation Concern",
    categories: ["Removed", "Relocated", "Access blocked"]
  },
  general: {
    phone: "03457 740 740",
    hours: "Mon-Fri 9am-5pm"
  }
};

function generateMaintenanceReport(postboxData, issueType) {
  const contact = ROYAL_MAIL_CONTACTS[issueType];
  
  const emailBody = `
Subject: ${contact.subject}

Postbox Details:
- Location: ${postboxData.address}
- GPS: ${postboxData.lat}, ${postboxData.lon}
- Cipher: ${postboxData.cipher}
- Issue: ${postboxData.reportedIssue}

Photo evidence attached: ${postboxData.photoUrl}

Reported via Heritage Postbox App
Timestamp: ${new Date().toISOString()}

---
This report was generated by a heritage postbox enthusiast.
For urgent issues, please call: ${ROYAL_MAIL_CONTACTS.general.phone}
  `.trim();
  
  return {
    to: contact.email,
    subject: contact.subject,
    body: emailBody,
    attachments: [postboxData.photoUrl]
  };
}
```

**UI Integration (List View):**

```javascript
// Feature: Report Issue button on each postbox entry
<Button onClick={() => openReportModal(postbox)}>
  Report Issue
</Button>

// Modal with issue categories
<Select>
  <option>Paint damage / Rust</option>
  <option>Graffiti</option>
  <option>Removal / Relocation</option>
  <option>Access blocked</option>
  <option>Other</option>
</Select>

// Auto-populate email with postbox details
```

---

## Data Sources for Research Validation

### Essential Links (To Be Integrated)

**For NotebookLM / Documentation:**
- LBSG Official: https://lbsg.org
- Identification Guide: https://postboxmap.co.uk/identify
- Postal Museum Archives: https://www.postalmuseum.org

**API Integration Considerations (Phase 6):**
- LBSG maintains directory of ~115,500 postboxes
- Potential future partnership: API access to LBSG database for duplicate checking
- Historic England listings: API for conservation status verification

---

## Firebase Security Rules (Research-Grade Data Protection)

**Firestore Rules for Data Integrity:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Postbox submissions
    match /postboxes/{postboxId} {
      // Anyone can read
      allow read: if true;
      
      // Only authenticated users can create
      allow create: if request.auth != null
        && request.resource.data.cipher in validCiphers()
        && request.resource.data.photo != null
        && request.resource.data.gps != null;
      
      // Only original submitter or admin can update
      allow update: if request.auth != null
        && (request.auth.uid == resource.data.userId
            || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true);
      
      // Only admin can delete
      allow delete: if request.auth != null
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
    
    // Validation function
    function validCiphers() {
      return ["VR", "E VII R", "E VIII R", "G V R", "G VI R", "E II R", "C III R"];
    }
  }
}
```

---

## Implementation Timeline

**Phase 2 (Gamification) - Weeks 4-7:**
- Week 4: Implement rarity tier database
- Week 5: Build points calculator with multipliers
- Week 6: Create achievement system
- Week 7: Leaderboards and user profiles

**Phase 3 (Data Provenance) - Weeks 8-10:**
- Week 8: Cipher validation service
- Week 9: EXIF metadata verification
- Week 10: Moderation system and trust scores

**Phase 3 Enhancement (Weeks 11-12):**
- Week 11: Manufacturer mark identification
- Week 12: Royal Mail maintenance reporting

---

## Research Data Updates

**Responsibility:** Gemini (Technical Architect & Product Curator)

**Update Schedule:**
- LBSG data refresh: Quarterly
- New cipher additions: As new monarchs ascend
- Rarity tier adjustments: Annually (based on discovery rates)
- Manufacturer database: Ongoing (community contributions)

**Version Control:**
- HERITAGE_POSTBOX_RESEARCH_SUMMARY.md maintained in `/docs/`
- Changes tracked in Git with detailed commit messages
- Major updates require roadmap review

---

## Quality Assurance Checklist

**Before Phase 2 Launch:**
- [ ] All LBSG rarity tiers implemented in database
- [ ] Point values tested with sample data
- [ ] Achievement triggers verified
- [ ] Badge icons designed and loaded

**Before Phase 3 Launch:**
- [ ] Cipher validation tested against all known ciphers
- [ ] EXIF verification tested with various devices
- [ ] Trust score algorithm validated
- [ ] Royal Mail contact details verified (current as of implementation date)

---

## Document Control

**Version:** 1.0.0
**Last Modified:** 2025-02-14 15:35:00
**Research Source:** HERITAGE_POSTBOX_RESEARCH_SUMMARY.md (Gemini)
**Technical Implementation:** Barry Ward

**Dependencies:**
- Phase 2: Points system, achievements, badges
- Phase 3: Data validation, EXIF verification, moderation

**Next Review:** After Phase 1 completion (before Phase 2 starts)

---

**This mapping ensures gamification aligns with LBSG research standards and maintains data integrity for academic use.** 📊
