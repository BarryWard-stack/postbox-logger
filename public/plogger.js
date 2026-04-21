// © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd. All rights reserved.
// Author: Barry Ward
// License: Proprietary – Not for redistribution without written consent.

/*
 * Script: Heritage Postbox Logger
 * Version: 0.9.1
 * Last Modified: 2026-02-18
 * 
 * Changelog:
 * v0.9.1 - 2026-02-18
 * - ADDED: Postcard Generation Engine (postcard-engine.js)
 * - UPDATE: Philately Research & Rarity Data Integration
 * - FIX: Persistence Hardening & SatNav Handover
 * - FIX: Pulsating Blue Dot GPS Marker
 * - ADDED: Visual Picker Grid (Newbie Mode)
 * 
 * v0.8.0 - 2025-02-13
 * - MAJOR: Integrated Firebase Firestore for collaborative backend
 * - Real-time data sync across all users
 * - Anonymous authentication (no login required)
 * - Cloud storage for postbox entries
 * - Removed localStorage (now uses Firestore)
 * 
 * v0.7.1 - 2025-02-13
 * - Implemented rarity-based icons for user-logged postboxes
 * - Fixed bug where user markers were not cleared on map re-render
 */

const { useState, useEffect, useRef, useCallback } = React;

// --- UTILITY FUNCTIONS (LBSG Aligned) ---
const getRarityInfo = (type) => {
  // Check if we have configuration from postboxAssets.js
  if (typeof getPostboxTypeConfig !== 'undefined') {
    const config = getPostboxTypeConfig(type);
    if (config) {
      return {
        level: config.rarity,
        label: config.label,
        color: config.color,
        points: config.basePoints * config.multiplier, // Apply multiplier (10x for Airmail Blue, 5x for Bronze Green)
        asset: config.asset,
        developmentStatus: config.developmentStatus,
        description: config.description
      };
    }
  }
  
  // Fallback to legacy rarityMap if postboxAssets.js not loaded
  const rarityMap = {
    'Pillar Box: Penfold Hexagonal (1866-1879)': { level: 10, label: 'LBSG MUSEUM PIECE', color: '#a855f7', points: 200 },
    'Pillar Box: First National Standard (1859)': { level: 9, label: 'LBSG HISTORIC', color: '#dc2626', points: 120 },
    'Pillar Box: Victorian Cipher (VR)': { level: 8, label: 'LBSG RARE VICTORIAN', color: '#f97316', points: 90 },
    'Pillar Box: Edward VII Cipher (EVIIR)': { level: 7, label: 'LBSG EDWARDIAN', color: '#f59e0b', points: 75 },
    'Wall Box: First Type (1857)': { level: 8, label: 'LBSG EARLY WALL BOX', color: '#84cc16', points: 85 },
    'Wall Box: Large Type': { level: 4, label: 'LBSG COMMON WALL BOX', color: '#22c55e', points: 15 },
    'Ludlow Box: Standard': { level: 7, label: 'LBSG LUDLOW FIND', color: '#10b981', points: 60 },
    'Lamp Box: Standard Oval': { level: 3, label: 'LBSG COMMON LAMP BOX', color: '#06b6d4', points: 10 },
    'Modern: Elizabeth II Cipher (EIIR)': { level: 2, label: 'COMMON', color: '#059669', points: 5 },
    'Modern: Charles III Cipher (CIIIR)': { level: 9, label: 'NEW ERA - RARE', color: '#4f46e5', points: 80 },
    'Special: Olympic Gold (2012)': { level: 8, label: 'SPECIAL EDITION', color: '#d97706', points: 50 },
    'Special: Airmail Blue': { level: 10, label: 'LEGENDARY AIRMAIL', color: '#0ea5e9', points: 1500 }, // 150 * 10x
    'Special: Bronze Green': { level: 9, label: 'RARE BRONZE GREEN', color: '#166534', points: 500 }, // 100 * 5x
  };
  return rarityMap[type] || { level: 1, label: 'STANDARD', color: '#6b7280', points: 2 };
};

const getPlayerLevel = (totalPoints) => {
  if (totalPoints >= 1000) return { level: 5, title: 'LBSG Collaborator', icon: '👑' };
  if (totalPoints >= 500) return { level: 4, title: 'Master Postbox Hunter', icon: '🏆' };
  if (totalPoints >= 200) return { level: 3, title: 'Seasoned Explorer', icon: '🎖️' };
  if (totalPoints >= 50) return { level: 2, title: 'Postbox Detective', icon: '🔍' };
  return { level: 1, title: 'Rookie Spotter', icon: '🚀' };
};

const getRegionalBonus = (lat, lng) => {
    const dataGaps = [
      { name: 'Wales', minLat: 51.3, maxLat: 53.5, minLng: -5.5, maxLng: -2.5, bonus: 50 },
      { name: 'SW Peninsula', minLat: 49.9, maxLat: 51.5, minLng: -6.5, maxLng: -2.5, bonus: 50 },
      { name: 'Lincolnshire', minLat: 52.7, maxLat: 53.8, minLng: -1.0, maxLng: 0.5, bonus: 50 },
      { name: 'Scottish Highlands', minLat: 56.5, maxLat: 59.0, minLng: -6.0, maxLng: -2.0, bonus: 25 }
    ];
    for (const gap of dataGaps) {
      if (lat >= gap.minLat && lat <= gap.maxLat && lng >= gap.minLng && lng <= gap.maxLng) {
        return { region: gap.name, bonus: gap.bonus };
      }
    }
    return null;
};

const QUALITY_RULES = {
  photoEvidence: 30,
  preciseGps: 25,
  typeConfirmed: 20,
  postcodeRecorded: 10,
  conditionRecorded: 5,
  researcherNotes: 10
};

const calculateQualityScore = (postbox) => {
  let score = 0;
  if ((postbox.photos || []).length > 0) score += QUALITY_RULES.photoEvidence;
  if (typeof postbox.gpsAccuracy === 'number' && postbox.gpsAccuracy <= 10) score += QUALITY_RULES.preciseGps;
  if (postbox.type) score += QUALITY_RULES.typeConfirmed;
  if (postbox.postcode) score += QUALITY_RULES.postcodeRecorded;
  if (postbox.condition) score += QUALITY_RULES.conditionRecorded;
  if (postbox.researchNotes && postbox.researchNotes.trim().length >= 20) score += QUALITY_RULES.researcherNotes;
  return score;
};

const getQualityTier = (score) => {
  if (score >= 80) return { label: 'Research Ready', color: '#166534' };
  if (score >= 55) return { label: 'Strong Field Record', color: '#1d4ed8' };
  if (score >= 30) return { label: 'Needs Review', color: '#b45309' };
  return { label: 'Sparse Record', color: '#991b1b' };
};

const calculateDistanceMeters = (lat1, lng1, lat2, lng2) => {
  const toRadians = (value) => (value * Math.PI) / 180;
  const earthRadiusMeters = 6371000;
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * earthRadiusMeters * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const toDateKey = (value) => {
  const date = value instanceof Date ? value : new Date(value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const buildStreakSummary = (postboxes) => {
  const dateKeys = [...new Set(postboxes.map(postbox => {
    const timestamp = postbox.createdAt?.seconds ? postbox.createdAt.seconds * 1000 : Date.now();
    return toDateKey(timestamp);
  }))].sort().reverse();

  const todayKey = toDateKey(new Date());
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = toDateKey(yesterday);

  let currentStreak = 0;
  if (dateKeys[0] === todayKey || dateKeys[0] === yesterdayKey) {
    let cursor = new Date(dateKeys[0]);
    for (const key of dateKeys) {
      if (key === toDateKey(cursor)) {
        currentStreak += 1;
        cursor.setDate(cursor.getDate() - 1);
      } else {
        break;
      }
    }
  }

  let longestStreak = 0;
  let runningStreak = 0;
  let previousDate = null;
  [...dateKeys].reverse().forEach(key => {
    const currentDate = new Date(key);
    if (!previousDate) {
      runningStreak = 1;
    } else {
      const diffDays = Math.round((currentDate - previousDate) / 86400000);
      runningStreak = diffDays === 1 ? runningStreak + 1 : 1;
    }
    if (runningStreak > longestStreak) longestStreak = runningStreak;
    previousDate = currentDate;
  });

  const todayFinds = postboxes.filter(postbox => {
    const timestamp = postbox.createdAt?.seconds ? postbox.createdAt.seconds * 1000 : Date.now();
    return toDateKey(timestamp) === todayKey;
  }).length;

  const nextMilestone = [3, 7, 14, 30].find(target => target > currentStreak) || null;

  return { currentStreak, longestStreak, todayFinds, nextMilestone };
};

const EXPERIENCE_MODES = {
  balanced: {
    label: 'Balanced',
    tagline: 'Field fun with research discipline',
    rarityWeight: 1,
    qualityWeight: 1,
    discoveryWeight: 1,
    statsTitle: 'Community Stats',
    reviewTitle: 'Curator Review',
    discoveryTitle: 'Discovery Loop'
  },
  research: {
    label: 'Research',
    tagline: 'Evidence-first surveying for curators and institutions',
    rarityWeight: 0.7,
    qualityWeight: 1.5,
    discoveryWeight: 0.8,
    statsTitle: 'Research Dashboard',
    reviewTitle: 'Research Review',
    discoveryTitle: 'Survey Progress'
  },
  explorer: {
    label: 'Explorer',
    tagline: 'Game-forward discovery with collection momentum',
    rarityWeight: 1.2,
    qualityWeight: 0.8,
    discoveryWeight: 1.4,
    statsTitle: 'Explorer Stats',
    reviewTitle: 'Field Review',
    discoveryTitle: 'Quest Loop'
  }
};

const getModeConfig = (modeKey) => EXPERIENCE_MODES[modeKey] || EXPERIENCE_MODES.balanced;

const calculateModePoints = ({ postbox, rarityInfo, regionalBonus, qualityScore, modeKey }) => {
  const mode = getModeConfig(modeKey);
  const rarityPoints = Math.round((rarityInfo?.points || 0) * mode.rarityWeight);
  const qualityPoints = Math.round(qualityScore * mode.qualityWeight);
  const bonusPoints = Math.round((regionalBonus?.bonus || 0) * mode.discoveryWeight);
  const totalPoints = rarityPoints + qualityPoints + bonusPoints;

  return {
    totalPoints,
    rarityPoints,
    qualityPoints,
    bonusPoints
  };
};

const buildNearbyTargets = (officialPostboxes, userPostboxes, userLocation) => {
  if (!userLocation || !Array.isArray(officialPostboxes)) return [];

  return officialPostboxes
    .map(postbox => {
      const distanceMeters = calculateDistanceMeters(userLocation.lat, userLocation.lng, postbox.lat, postbox.lon);
      return { ...postbox, distanceMeters };
    })
    .filter(postbox => postbox.distanceMeters <= 2500)
    .filter(postbox => !userPostboxes.some(userPostbox => calculateDistanceMeters(userPostbox.lat, userPostbox.lng, postbox.lat, postbox.lon) <= 30))
    .sort((a, b) => a.distanceMeters - b.distanceMeters)
    .slice(0, 5);
};

const buildQuestCards = ({ nearbyTargets, streakSummary, experienceMode }) => {
  const modeConfig = getModeConfig(experienceMode);
  const quests = [];

  if (nearbyTargets[0]) {
    quests.push({
      id: 'best-next-target',
      title: 'Best Next Postbox',
      description: `${Math.round(nearbyTargets[0].distanceMeters)}m away${nearbyTargets[0].tags?.ref ? ` · Ref ${nearbyTargets[0].tags.ref}` : ''}`,
      reward: `${modeConfig.label} priority target`
    });
  }

  if (streakSummary.nextMilestone) {
    quests.push({
      id: 'streak-milestone',
      title: `${streakSummary.nextMilestone}-Day Streak`,
      description: `${streakSummary.nextMilestone - streakSummary.currentStreak} more active day${streakSummary.nextMilestone - streakSummary.currentStreak === 1 ? '' : 's'} to reach the next streak milestone.`,
      reward: experienceMode === 'explorer' ? 'Streak reward boost' : 'Consistency bonus'
    });
  }

  if (experienceMode === 'research') {
    quests.push({
      id: 'research-ready-upgrade',
      title: 'Upgrade One Record',
      description: 'Turn one community submission into a research-ready record with stronger evidence and review.',
      reward: 'Dataset trust increase'
    });
  } else if (experienceMode === 'explorer') {
    quests.push({
      id: 'rare-era-hunt',
      title: 'Rare Era Hunt',
      description: 'Log or verify a rarer box to accelerate your explorer-mode score.',
      reward: 'Rarity-weighted points'
    });
  } else {
    quests.push({
      id: 'balanced-quality-loop',
      title: 'Find, Then Upgrade',
      description: 'Log a nearby box, then improve one existing record with stronger notes or evidence.',
      reward: 'Balanced progress'
    });
  }

  quests.push({
    id: 'three-nearby-walk',
    title: experienceMode === 'research' ? 'Survey Cluster' : 'Three-Target Walk',
    description: nearbyTargets.length >= 3 ? 'You already have a three-stop route in range.' : 'Move the map or walk further to line up three nearby official targets.',
    reward: experienceMode === 'research' ? 'Area coverage gain' : 'Quest chain progress'
  });

  return quests.slice(0, 3);
};

const REVIEW_DECISION_REASONS = [
  'Ready for dataset inclusion',
  'Evidence needs strengthening',
  'Needs on-site confirmation',
  'Possible duplicate record',
  'Historic source mismatch',
  'Condition or type unclear'
];

const getReviewSummary = (postbox) => {
  const reviewerName = postbox.reviewerName || '';
  const reviewedAt = postbox.reviewedAt?.seconds
    ? new Date(postbox.reviewedAt.seconds * 1000).toLocaleDateString()
    : '';

  if (!reviewerName && !reviewedAt) return 'No curator review metadata yet';
  if (reviewerName && reviewedAt) return `Last reviewed by ${reviewerName} on ${reviewedAt}`;
  if (reviewerName) return `Last reviewed by ${reviewerName}`;
  return `Last reviewed on ${reviewedAt}`;
};

const buildReviewInsights = (postboxes) => {
  const insights = {};

  postboxes.forEach(postbox => {
    const duplicateCandidates = postboxes.filter(candidate => {
      if (candidate.id === postbox.id) return false;

      const distanceMeters = calculateDistanceMeters(postbox.lat, postbox.lng, candidate.lat, candidate.lng);
      const closeTogether = distanceMeters <= 35;
      const samePostcode = postbox.postcode && candidate.postcode && postbox.postcode === candidate.postcode;
      const sameCode = postbox.postboxCode && candidate.postboxCode && postbox.postboxCode === candidate.postboxCode;
      const sameType = postbox.type && candidate.type && postbox.type === candidate.type;

      return closeTogether && (samePostcode || sameCode || sameType);
    });

    const hasStrongEvidence = (postbox.photos || []).length > 0 && typeof postbox.gpsAccuracy === 'number' && postbox.gpsAccuracy <= 10;
    const hasCuratorTrail = Boolean(postbox.reviewerName || postbox.reviewerNotes || postbox.reviewerDecisionReason);

    insights[postbox.id] = {
      duplicateCount: duplicateCandidates.length,
      duplicateLabel: duplicateCandidates.length > 0
        ? `${duplicateCandidates.length} possible duplicate${duplicateCandidates.length === 1 ? '' : 's'} nearby`
        : '',
      duplicateHint: duplicateCandidates.length > 0
        ? duplicateCandidates.slice(0, 2).map(candidate => candidate.postboxCode || candidate.postcode || candidate.type || 'nearby record').join(', ')
        : '',
      needsEvidenceUpgrade: !hasStrongEvidence,
      hasCuratorTrail
    };
  });

  return insights;
};

const serializeCsvValue = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;

const buildResearchExportRows = (postboxes) => postboxes.map(postbox => {
  const qualityScore = postbox.qualityScore || calculateQualityScore(postbox);
  const qualityTier = postbox.qualityTier || getQualityTier(qualityScore).label;
  return {
    id: postbox.id,
    type: postbox.type || '',
    postboxCode: postbox.postboxCode || '',
    postcode: postbox.postcode || '',
    condition: postbox.condition || '',
    verificationStatus: postbox.verificationStatus || 'Community Submitted',
    evidenceSource: postbox.evidenceSource || 'Field Survey',
    surveyConfidence: postbox.surveyConfidence || 'Unspecified',
    gpsAccuracy: typeof postbox.gpsAccuracy === 'number' ? Math.round(postbox.gpsAccuracy) : '',
    latitude: postbox.lat ?? '',
    longitude: postbox.lng ?? '',
    qualityScore,
    qualityTier,
    researchNotes: postbox.researchNotes || '',
    reviewerName: postbox.reviewerName || '',
    reviewerDecisionReason: postbox.reviewerDecisionReason || '',
    reviewerNotes: postbox.reviewerNotes || '',
    reviewedAt: postbox.reviewedAt?.seconds ? new Date(postbox.reviewedAt.seconds * 1000).toISOString() : '',
    createdAt: new Date(postbox.createdAt?.seconds * 1000 || Date.now()).toISOString()
  };
});

const buildResearchCsv = (postboxes) => {
  const rows = buildResearchExportRows(postboxes);
  if (rows.length === 0) return 'id,type\n';
  const headers = Object.keys(rows[0]);
  return [
    headers.join(','),
    ...rows.map(row => headers.map(header => serializeCsvValue(row[header])).join(','))
  ].join('\n');
};

const downloadTextFile = (filename, content, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
};

// --- CHILD COMPONENTS ---

const PostboxIcon = ({ type, size = 60, showLabel = false }) => {
  const rarityInfo = getRarityInfo(type);
  const hasAsset = rarityInfo && rarityInfo.asset;
  const hasDevelopmentStatus = rarityInfo && rarityInfo.developmentStatus;
  
  // Container with 10% padding buffer
  const containerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    padding: `${size * 0.1}px`, // 10% padding buffer
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxSizing: 'border-box'
  };
  
  // Image with object-fit: contain
  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    objectPosition: 'center'
  };
  
  // Development status overlay - responsive and centered
  const overlayStyle = {
    position: 'absolute',
    bottom: '8%',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(0, 0, 0, 0.75)',
    color: 'white',
    padding: '0.15em 0.6em',
    borderRadius: '3px',
    fontSize: `${size * 0.15}px`,
    fontWeight: 'bold',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    textAlign: 'center'
  };
  
  return React.createElement('div', { style: containerStyle },
    hasAsset 
      ? React.createElement('img', { 
          src: rarityInfo.asset, 
          alt: type,
          style: imageStyle,
          onError: (e) => {
            // Fallback to colored circle if image fails to load
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }
        })
      : null,
    // Fallback colored circle
    React.createElement('div', {
      style: {
        display: hasAsset ? 'none' : 'block',
        width: '80%',
        height: '80%',
        borderRadius: '50%',
        background: rarityInfo ? rarityInfo.color : '#6b7280'
      }
    }),
    // Development status overlay for 3D renders
    hasDevelopmentStatus && React.createElement('div', { style: overlayStyle }, rarityInfo.developmentStatus),
    // Optional label
    showLabel && rarityInfo && React.createElement('div', {
      style: {
        position: 'absolute',
        bottom: '-20px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '10px',
        whiteSpace: 'nowrap',
        color: '#666'
      }
    }, rarityInfo.label)
  );
};

const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  return React.createElement('div', {
    style: { position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', background: toast.type === 'achievement' ? '#ca8a04' : '#059669', color: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 2000, maxWidth: '90%', textAlign: 'center' }
  },
    React.createElement('div', { style: { fontWeight: 'bold' } }, toast.title),
    React.createElement('div', { style: { fontSize: '14px', opacity: 0.9 } }, toast.message)
  );
};

const buildDirectionsButtonHtml = (lat, lng) => `
  <button onclick="window.open('geo:${lat},${lng}', '_blank')" style="margin-top:5px;padding:5px 10px;background:#3b82f6;color:white;border:none;border-radius:4px;cursor:pointer;">
    Directions
  </button>
`;

const DiscoveryPanel = ({ nearbyTargets, streakSummary, experienceMode }) => {
  const modeConfig = getModeConfig(experienceMode);
  const questCards = buildQuestCards({ nearbyTargets, streakSummary, experienceMode });
  const panelStyle = {
    position: 'absolute',
    top: '12px',
    left: '12px',
    zIndex: 1000,
    width: 'min(320px, calc(100% - 24px))',
    background: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(6px)',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.15)',
    padding: '14px'
  };

  return React.createElement('div', { style: panelStyle },
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '10px' } },
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: '12px', fontWeight: 'bold', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' } }, 'Discovery Radar'),
        React.createElement('div', { style: { fontSize: '18px', fontWeight: 'bold', color: '#0f172a' } }, `${nearbyTargets.length} nearby targets`)
      ),
      React.createElement('div', { style: { textAlign: 'right' } },
      React.createElement('div', { style: { fontSize: '12px', color: '#475569' } }, 'Current streak'),
      React.createElement('div', { style: { fontSize: '18px', fontWeight: 'bold', color: '#b45309' } }, `${streakSummary.currentStreak} day${streakSummary.currentStreak === 1 ? '' : 's'}`)
      )
    ),
    React.createElement('div', { style: { fontSize: '12px', color: '#1d4ed8', fontWeight: 'bold', marginBottom: '6px' } }, modeConfig.tagline),
    React.createElement('div', { style: { fontSize: '12px', color: '#475569', marginBottom: '10px' } },
      streakSummary.nextMilestone ? `${streakSummary.nextMilestone - streakSummary.currentStreak} more day${streakSummary.nextMilestone - streakSummary.currentStreak === 1 ? '' : 's'} to your ${streakSummary.nextMilestone}-day milestone.` : 'You have cleared every current streak milestone.'
    ),
    React.createElement('div', { style: { display: 'grid', gap: '8px', marginBottom: '10px' } },
      questCards.map((quest) => React.createElement('div', {
        key: quest.id,
        style: { background: '#f8fafc', borderRadius: '10px', padding: '10px', border: '1px solid #e2e8f0' }
      },
        React.createElement('div', { style: { fontSize: '12px', fontWeight: 'bold', color: '#991b1b', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' } }, 'Quest'),
        React.createElement('div', { style: { fontSize: '13px', fontWeight: 'bold', color: '#0f172a', marginBottom: '2px' } }, quest.title),
        React.createElement('div', { style: { fontSize: '12px', color: '#475569', marginBottom: '4px' } }, quest.description),
        React.createElement('div', { style: { fontSize: '11px', color: '#166534', fontWeight: 'bold' } }, quest.reward)
      ))
    ),
    nearbyTargets.length === 0
      ? React.createElement('div', { style: { fontSize: '13px', color: '#334155' } }, 'Scanning nearby map tiles for unlogged official boxes.')
      : React.createElement('div', { style: { display: 'grid', gap: '8px' } },
          nearbyTargets.map(target => React.createElement('div', {
            key: `${target.id || target.lat}-${target.lon}`,
            style: { borderTop: '1px solid #e2e8f0', paddingTop: '8px' }
          },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', gap: '8px', alignItems: 'baseline' } },
              React.createElement('strong', { style: { fontSize: '13px', color: '#0f172a' } }, target.tags?.ref || 'Unnumbered target'),
              React.createElement('span', { style: { fontSize: '12px', color: '#1d4ed8', fontWeight: 'bold' } }, `${Math.round(target.distanceMeters)}m`)
            ),
            React.createElement('div', { style: { fontSize: '12px', color: '#475569', marginTop: '2px' } }, target.tags?.operator || 'Royal Mail postbox')
          ))
        )
  );
};

const MapView = ({ userPostboxes, officialPostboxes, userLocation, nearbyTargets, streakSummary, experienceMode, onMapClick, onMapViewChange }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const officialMarkersRef = useRef([]);
  const userMarkersRef = useRef([]);

  const userIconDefault = new window.L.Icon({ iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] });
  const userIconRare = new window.L.Icon({ iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] });
  const userIconLegendary = new window.L.Icon({ iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] });
  const greyIcon = new window.L.Icon({ iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] });

  useEffect(() => {
    if (userLocation && mapRef.current && !mapInstanceRef.current) {
      const map = window.L.map(mapRef.current).setView([userLocation.lat, userLocation.lng], 16);
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
      
      const userIcon = window.L.divIcon({
        html: '<div class="user-location-marker"></div>',
        className: 'user-location-div-icon',
        iconSize: [26, 26],
        iconAnchor: [13, 13]
      });
      window.L.marker([userLocation.lat, userLocation.lng], { icon: userIcon }).addTo(map).bindPopup('Your Location');
      
      map.on('click', (e) => onMapClick(e.latlng));

      let moveTimeout;
      map.on('moveend', () => {
          clearTimeout(moveTimeout);
          moveTimeout = setTimeout(() => onMapViewChange(map.getBounds()), 500);
      });

      mapInstanceRef.current = map;
      onMapViewChange(map.getBounds());
    }
  }, [userLocation, onMapClick, onMapViewChange]);
  
  useEffect(() => {
    if (mapInstanceRef.current) {
        officialMarkersRef.current.forEach(marker => marker.remove());
        officialMarkersRef.current = [];
        
        userMarkersRef.current.forEach(marker => marker.remove());
        userMarkersRef.current = [];

        if (Array.isArray(officialPostboxes)) {
            officialPostboxes.forEach(p => {
                const popupContent = `
                    <div>
                        <b>Existing Postbox</b><br>
                        <small>${p.tags?.ref || ''}</small><br>
                        ${buildDirectionsButtonHtml(p.lat, p.lon)}
                    </div>
                `;
                const marker = window.L.marker([p.lat, p.lon], { icon: greyIcon }).addTo(mapInstanceRef.current).bindPopup(popupContent);
                officialMarkersRef.current.push(marker);
            });
        }
        
        userPostboxes.forEach(p => {
            const rarity = getRarityInfo(p.type);
            let icon = userIconDefault;
            if (rarity.level >= 10) icon = userIconLegendary;
            else if (rarity.level >= 8) icon = userIconRare;

            const userPopupContent = `
                <div>
                    <b>Community Find:</b> ${p.type || 'Postbox'}<br>
                    <small>Added: ${new Date(p.createdAt?.seconds * 1000 || Date.now()).toLocaleDateString()}</small><br>
                    ${buildDirectionsButtonHtml(p.lat, p.lng)}
                </div>
            `;
            const marker = window.L.marker([p.lat, p.lng], { icon: icon })
                .addTo(mapInstanceRef.current)
                .bindPopup(userPopupContent);
            
            userMarkersRef.current.push(marker);
        });
    }
  }, [officialPostboxes, userPostboxes]);

  return React.createElement('div', { style: { position: 'relative', width: '100%', height: '100%' } },
    React.createElement('div', { ref: mapRef, style: { width: '100%', height: '100%' } }),
    React.createElement(DiscoveryPanel, { nearbyTargets, streakSummary, experienceMode })
  );
};

const PostboxForm = ({ postbox, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    photos: [],
    postboxCode: '',
    postcode: '',
    verificationStatus: 'Community Submitted',
    evidenceSource: 'Field Survey',
    surveyConfidence: 'Confident',
    researchNotes: '',
    gpsAccuracy: postbox.gpsAccuracy ?? null,
    ...postbox
  });
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  
  const handlePhotoCapture = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhoto = { data: e.target.result, name: file.name };
        setFormData(prev => ({ ...prev, photos: [...(prev.photos || []), newPhoto] }));
      };
      reader.readAsDataURL(file);
    });
  };
  
  const removePhoto = (index) => {
      setFormData(prev => ({ ...prev, photos: prev.photos.filter((_, i) => i !== index) }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(formData);
    } catch (error) {
      alert('Error saving: ' + error.message);
      setSaving(false);
    }
  };

  // Use postbox types from postboxAssets.js if available, otherwise use legacy list
  const postboxTypes = (typeof getAllPostboxTypes !== 'undefined') 
    ? getAllPostboxTypes()
    : [
        'Pillar Box: Penfold Hexagonal (1866-1879)', 
        'Pillar Box: First National Standard (1859)', 
        'Pillar Box: Victorian Cipher (VR)', 
        'Pillar Box: Edward VII Cipher (EVIIR)',
        'Wall Box: First Type (1857)', 
        'Wall Box: Large Type',
        'Ludlow Box: Standard',
        'Lamp Box: Standard Oval',
        'Modern: Elizabeth II Cipher (EIIR)', 
        'Modern: Charles III Cipher (CIIIR)',
        'Special: Olympic Gold (2012)',
        'Special: Airmail Blue',
        'Special: Bronze Green'
      ];
  const conditions = ['Excellent', 'Good', 'Fair', 'Poor', 'Derelict', 'Needs Maintenance'];
  const verificationStatuses = ['Community Submitted', 'Research Reviewed', 'Verified on Site', 'Needs Follow-up'];
  const evidenceSources = ['Field Survey', 'Historic Reference', 'Community Tip', 'Desk Research'];
  const surveyConfidenceLevels = ['Confident', 'Probable', 'Needs Verification'];
  const qualityScore = calculateQualityScore(formData);
  const qualityPreview = getQualityTier(qualityScore);

  return React.createElement('div', { style: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '10px' } },
    React.createElement('div', { style: { background: 'white', padding: '20px', borderRadius: '8px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' } },
      React.createElement('h2', { style: { marginTop: 0 } }, postbox.id ? 'Edit Postbox' : 'Add New Postbox'),
      React.createElement('div', { style: { display: 'grid', gap: '15px' } },
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' } },
          React.createElement('div', null,
            React.createElement('label', { style: { fontSize: '14px', display: 'block' } }, 'Postbox Number'),
            React.createElement('input', { type: 'text', placeholder: 'e.g. AB1 23', value: formData.postboxCode || '', onChange: e => updateField('postboxCode', e.target.value), style: {width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'} })
          ),
          React.createElement('div', null,
            React.createElement('label', { style: { fontSize: '14px', display: 'block' } }, 'Postcode'),
            React.createElement('input', { type: 'text', placeholder: 'e.g. SW1A 0AA', value: formData.postcode || '', onChange: e => updateField('postcode', e.target.value), style: {width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'} })
          )
        ),
        React.createElement('div', null,
            React.createElement('label', { style: { fontSize: '14px', display: 'block' } }, 'Type'),
            React.createElement('select', { value: formData.type || '', onChange: e => updateField('type', e.target.value), style: {width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'} },
              React.createElement('option', { value: '' }, 'Select type...'),
              postboxTypes.map(type => React.createElement('option', { key: type, value: type }, type))
            )
        ),
        React.createElement('div', null,
            React.createElement('label', { style: { fontSize: '14px', display: 'block' } }, 'Condition'),
            React.createElement('select', { value: formData.condition || '', onChange: e => updateField('condition', e.target.value), style: {width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'} },
              React.createElement('option', { value: '' }, 'Select condition...'),
              conditions.map(c => React.createElement('option', { key: c, value: c }, c))
            )
        ),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' } },
          React.createElement('div', null,
            React.createElement('label', { style: { fontSize: '14px', display: 'block' } }, 'Verification'),
            React.createElement('select', { value: formData.verificationStatus || 'Community Submitted', onChange: e => updateField('verificationStatus', e.target.value), style: {width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'} },
              verificationStatuses.map(status => React.createElement('option', { key: status, value: status }, status))
            )
          ),
          React.createElement('div', null,
            React.createElement('label', { style: { fontSize: '14px', display: 'block' } }, 'Confidence'),
            React.createElement('select', { value: formData.surveyConfidence || 'Confident', onChange: e => updateField('surveyConfidence', e.target.value), style: {width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'} },
              surveyConfidenceLevels.map(level => React.createElement('option', { key: level, value: level }, level))
            )
          )
        ),
        React.createElement('div', null,
          React.createElement('label', { style: { fontSize: '14px', display: 'block' } }, 'Evidence Source'),
          React.createElement('select', { value: formData.evidenceSource || 'Field Survey', onChange: e => updateField('evidenceSource', e.target.value), style: {width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'} },
            evidenceSources.map(source => React.createElement('option', { key: source, value: source }, source))
          )
        ),
        React.createElement('div', { style: { background: '#f8fafc', borderRadius: '8px', padding: '12px', border: '1px solid #e2e8f0' } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center', flexWrap: 'wrap' } },
            React.createElement('strong', null, 'Quality Preview'),
            React.createElement('span', { style: { color: qualityPreview.color, fontWeight: 'bold', fontSize: '13px' } }, `${qualityScore}/100 - ${qualityPreview.label}`)
          ),
          React.createElement('div', { style: { fontSize: '12px', color: '#475569', marginTop: '6px' } },
            `GPS accuracy: ${typeof formData.gpsAccuracy === 'number' ? `${Math.round(formData.gpsAccuracy)}m` : 'Unavailable'}`
          )
        ),
        React.createElement('div', null,
            React.createElement('label', { style: { display: 'block', marginBottom: '5px', fontSize: '14px' } }, 'Photos'),
            React.createElement('button', { type: 'button', onClick: () => fileInputRef.current.click(), style: { background: '#2563eb', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer', width: '100%' } }, '📷 Add Photos from Camera'),
            React.createElement('input', {
                ref: fileInputRef, type: 'file', accept: 'image/*', capture: 'environment', multiple: true, onChange: handlePhotoCapture, style: { display: 'none' }
            }),
            React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' } },
                (formData.photos || []).map((photo, index) =>
                    React.createElement('div', { key: index, style: { position: 'relative' } },
                        React.createElement('img', { src: photo.data, style: { width: '70px', height: '70px', objectFit: 'cover', borderRadius: '5px' } }),
                        React.createElement('button', { type: 'button', onClick: () => removePhoto(index), style: { position: 'absolute', top: '-5px', right: '-5px', background: 'red', color: 'white', border: '1px solid white', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' } }, '×')
                    )
                )
            )
        ),
        React.createElement('div', null,
          React.createElement('label', { style: { fontSize: '14px', display: 'block', marginBottom: '5px' } }, 'Research Notes'),
          React.createElement('textarea', {
            value: formData.researchNotes || '',
            onChange: e => updateField('researchNotes', e.target.value),
            placeholder: 'Record cipher details, unusual paint, aperture layout, nearby heritage context, or anything a reviewer should verify later.',
            rows: 4,
            style: { width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical', fontFamily: 'inherit' }
          })
        ),
        React.createElement('div', { style: { display: 'flex', gap: '10px', marginTop: '20px' } },
            React.createElement('button', { onClick: handleSave, disabled: saving, style: { flex: 1, background: saving ? '#9ca3af' : '#dc2626', color: 'white', border: 'none', padding: '12px', borderRadius: '5px', cursor: saving ? 'not-allowed' : 'pointer', fontSize: '16px' } }, saving ? 'Saving...' : 'Save Postbox'),
            React.createElement('button', { onClick: onCancel, disabled: saving, style: { padding: '12px 20px', border: '1px solid #ccc', borderRadius: '5px', cursor: saving ? 'not-allowed' : 'pointer', fontSize: '16px' } }, 'Cancel')
        )
      )
    )
  );
};

// --- MAIN APP COMPONENT ---

const APP_VERSION = '0.9.2';

const PostboxLogger = () => {
  const [userPostboxes, setUserPostboxes] = useState([]);
  const [officialPostboxes, setOfficialPostboxes] = useState([]);
  const [selectedPostbox, setSelectedPostbox] = useState(null);
  const [viewMode, setViewMode] = useState('map');
  const [userLocation, setUserLocation] = useState(null);
  const [toast, setToast] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [experienceMode, setExperienceMode] = useState('balanced');
  const [reviewFilters, setReviewFilters] = useState({
    verificationStatus: 'All',
    qualityTier: 'All',
    evidenceSource: 'All',
    duplicateStatus: 'All'
  });
  const modeConfig = getModeConfig(experienceMode);
  const streakSummary = buildStreakSummary(userPostboxes);
  const nearbyTargets = buildNearbyTargets(officialPostboxes, userPostboxes, userLocation);
  const reviewInsights = buildReviewInsights(userPostboxes);
  
  // Firebase auth listener
  useEffect(() => {
    let cancelled = false;
    let unsubscribe = null;
    let intervalId = null;

    const attachAuthListener = () => {
      if (!window.firebaseOnAuthStateChanged || !window.firebaseAuth || cancelled) {
        return false;
      }

      unsubscribe = window.firebaseOnAuthStateChanged(window.firebaseAuth, (user) => {
        if (user) {
          setAuthReady(true);
        }
      });

      return true;
    };

    if (!attachAuthListener()) {
      intervalId = setInterval(() => {
        if (attachAuthListener() && intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      }, 250);
    }

    return () => {
      cancelled = true;
      if (intervalId) clearInterval(intervalId);
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // Real-time Firestore listener
  useEffect(() => {
    if (!authReady || !window.firebaseQuery || !window.firebaseCollection || !window.firebaseOnSnapshot || !window.firebaseOrderBy || !window.firebaseDb) return;
    
    const q = window.firebaseQuery(
      window.firebaseCollection(window.firebaseDb, 'postboxes'),
      window.firebaseOrderBy('createdAt', 'desc')
    );
    
    const unsubscribe = window.firebaseOnSnapshot(q, (snapshot) => {
      const postboxes = [];
      snapshot.forEach((doc) => {
        postboxes.push({ id: doc.id, ...doc.data() });
      });
      setUserPostboxes(postboxes);
    }, (error) => {
      console.error('Firestore listener error:', error);
      setUserPostboxes([]);
      showToast('Offline Research Mode', 'Live community data is unavailable right now. You can still explore the app locally.', 'warning');
    });
    
    return () => unsubscribe();
  }, [authReady]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy }),
      () => setUserLocation({ lat: 54.5, lng: -3.5, accuracy: null })
    );
  }, []);
  
  const fetchPostboxesForView = useCallback((bounds) => {
    const bbox = `${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()}`;
    const overpassQuery = `[out:json];node["amenity"="post_box"](${bbox});out;`;
    const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;
    
    fetch(overpassUrl)
        .then(response => response.json())
        .then(data => setOfficialPostboxes(data.elements))
        .catch(error => console.error("Error fetching Overpass data:", error));
  }, []);

  const showToast = (title, message, type = 'info') => setToast({ title, message, type });

  const handleMapClick = (latlng) => {
    setSelectedPostbox({ lat: latlng.lat, lng: latlng.lng, photos: [], postboxCode: '', postcode: '', gpsAccuracy: userLocation?.accuracy ?? null });
  };
  
  const handleAddClick = () => {
      if (userLocation) {
          setSelectedPostbox({ lat: userLocation.lat, lng: userLocation.lng, photos: [], postboxCode: '', postcode: '', gpsAccuracy: userLocation.accuracy ?? null });
      } else {
          alert("Getting your location... please try again in a moment.");
      }
  };
  
  const deletePostbox = async (id) => {
      if (confirm('Are you sure you want to delete this postbox?')) {
          try {
              await window.firebaseDeleteDoc(window.firebaseDoc(window.firebaseDb, 'postboxes', id));
              showToast('Postbox Deleted', 'The entry has been removed.');
          } catch (error) {
              alert('Error deleting: ' + error.message);
          }
      }
  };

  const updatePostboxReview = async (id, updates) => {
      const existingPostbox = userPostboxes.find(postbox => postbox.id === id);
      if (!existingPostbox) return;

      const mergedPostbox = { ...existingPostbox, ...updates };
      const qualityScore = calculateQualityScore(mergedPostbox);
      const qualityTier = getQualityTier(qualityScore);

      await window.firebaseUpdateDoc(window.firebaseDoc(window.firebaseDb, 'postboxes', id), {
          ...updates,
          qualityScore,
          qualityTier: qualityTier.label,
          updatedAt: window.firebaseServerTimestamp()
      });

      showToast('Review Updated', `${mergedPostbox.type || 'Postbox'} moved to ${updates.verificationStatus || existingPostbox.verificationStatus || qualityTier.label}.`);
  };

  const savePostbox = async (data) => {
      try {
          const qualityScore = calculateQualityScore(data);
          const qualityTier = getQualityTier(qualityScore);
          if (data.id) {
              // Update existing
              const docRef = window.firebaseDoc(window.firebaseDb, 'postboxes', data.id);
              await window.firebaseUpdateDoc(docRef, {
                  ...data,
                  qualityScore,
                  qualityTier: qualityTier.label,
                  updatedAt: window.firebaseServerTimestamp()
              });
              showToast("Postbox Updated!", "Your changes have been saved.");
          } else {
              // Add new
              const postboxData = {
                  ...data,
                  lat: parseFloat(data.lat),
                  lng: parseFloat(data.lng),
                  qualityScore,
                  qualityTier: qualityTier.label,
                  createdAt: window.firebaseServerTimestamp(),
                  userId: window.firebaseAuth.currentUser?.uid || 'anonymous'
              };
              
              await window.firebaseAddDoc(window.firebaseCollection(window.firebaseDb, 'postboxes'), postboxData);
              
              const rarity = getRarityInfo(data.type);
              const regionalBonus = getRegionalBonus(data.lat, data.lng);
              const modePoints = calculateModePoints({
                  postbox: data,
                  rarityInfo: rarity,
                  regionalBonus,
                  qualityScore,
                  modeKey: experienceMode
              });
              
              showToast("Postbox Added!", `+${modePoints.totalPoints} points in ${modeConfig.label} mode! ${regionalBonus ? `(+${modePoints.bonusPoints} discovery bonus for ${regionalBonus.region})` : ''}`);
          }
          setSelectedPostbox(null);
      } catch (error) {
          throw error;
      }
  };
  
  const generateFacebookPost = (postbox) => {
    const rarity = getRarityInfo(postbox.type);
    const text = `🎯 POSTBOX SPOTTED! 🎯\n\n🔮 ${postbox.type || 'Mystery Postbox'}\n📍 Postcode: ${postbox.postcode || 'N/A'}\n⭐ Rarity: ${rarity.label}\n\n#OldPostBoxesUK #PostboxHunting #RoyalMail`;
    return `https://www.facebook.com/groups/oldpostboxesuk/search/?q=${encodeURIComponent(text)}`;
  };
  
  const generateMaintenanceEmail = (postbox) => {
    const subject = `Postbox Maintenance Report: ${postbox.postboxCode || 'Unknown Number'} at ${postbox.postcode || 'Unknown Postcode'}`;
    const body = `Dear Royal Mail,\n\nI would like to report a postbox that requires maintenance attention.\n\nDETAILS:\n- Postbox Number: ${postbox.postboxCode || 'Not recorded'}\n- Postcode: ${postbox.postcode || 'Not recorded'}\n- GPS Coordinates: ${postbox.lat}, ${postbox.lng}\n- Reported Condition: ${postbox.condition}\n\nPhotographic evidence of the postbox's condition has been captured and can be provided upon request.\n\nThank you for your attention to our postal heritage.\n\n---\nSent via Heritage Postbox app`;
    return `mailto:postbox.appearance@royalmailpfs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const getFilteredReviewPostboxes = useCallback(() => {
      return userPostboxes.filter(postbox => {
          const qualityScore = postbox.qualityScore || calculateQualityScore(postbox);
          const qualityTier = postbox.qualityTier || getQualityTier(qualityScore).label;
          const matchesVerification = reviewFilters.verificationStatus === 'All' || (postbox.verificationStatus || 'Community Submitted') === reviewFilters.verificationStatus;
          const matchesQuality = reviewFilters.qualityTier === 'All' || qualityTier === reviewFilters.qualityTier;
          const matchesSource = reviewFilters.evidenceSource === 'All' || (postbox.evidenceSource || 'Field Survey') === reviewFilters.evidenceSource;
          const duplicateCount = reviewInsights[postbox.id]?.duplicateCount || 0;
          const matchesDuplicate = reviewFilters.duplicateStatus === 'All'
            || (reviewFilters.duplicateStatus === 'Possible Duplicates' && duplicateCount > 0)
            || (reviewFilters.duplicateStatus === 'Clear Records' && duplicateCount === 0);
          return matchesVerification && matchesQuality && matchesSource && matchesDuplicate;
      });
  }, [reviewFilters, reviewInsights, userPostboxes]);

  const exportResearchDataset = (format = 'csv') => {
      const exportPostboxes = getFilteredReviewPostboxes();
      const stamp = new Date().toISOString().slice(0, 10);
      if (format === 'json') {
          downloadTextFile(`heritage-postbox-export-${stamp}.json`, JSON.stringify(buildResearchExportRows(exportPostboxes), null, 2), 'application/json');
      } else {
          downloadTextFile(`heritage-postbox-export-${stamp}.csv`, buildResearchCsv(exportPostboxes), 'text/csv;charset=utf-8;');
      }
      showToast('Export Ready', `${exportPostboxes.length} records exported as ${format.toUpperCase()}.`);
  };
  
  const renderContent = () => {
      if (!userLocation) return React.createElement('div', { style: { display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' } }, 'Getting location...');
      
      switch (viewMode) {
          case 'map':
              return React.createElement(MapView, { userPostboxes, officialPostboxes, userLocation, nearbyTargets, streakSummary, experienceMode, onMapClick: handleMapClick, onMapViewChange: fetchPostboxesForView });
          case 'stats':
              return React.createElement(PlayerStats, { userPostboxes, nearbyTargets, streakSummary, experienceMode, modeConfig });
          case 'list':
              return React.createElement(PostboxList, { postboxes: userPostboxes, onSelect: setSelectedPostbox, onDelete: deletePostbox, onShare: generateFacebookPost, onReport: generateMaintenanceEmail });
          case 'review':
              return React.createElement(ReviewQueue, {
                  postboxes: getFilteredReviewPostboxes(),
                  filters: reviewFilters,
                  reviewInsights,
                  modeConfig,
                  onFilterChange: (field, value) => setReviewFilters(prev => ({ ...prev, [field]: value })),
                  onPromote: updatePostboxReview,
                  onEdit: setSelectedPostbox,
                  onExport: exportResearchDataset
              });
          default: return null;
      }
  };

  return React.createElement('div', { style: { height: '100vh', display: 'flex', flexDirection: 'column' } },
    React.createElement('header', { style: { background: '#991b1b', color: 'white', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
        React.createElement('h1', { style: { margin: 0, fontSize: '18px' } }, 'Heritage Postbox'),
        React.createElement('span', { style: { fontSize: '10px', opacity: 0.7, background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '3px' } }, `v${APP_VERSION}`)
      ),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' } },
        React.createElement('span', { style: { fontSize: '12px', opacity: 0.9 } }, `🌐 ${userPostboxes.length} community finds`),
        React.createElement('span', { style: { fontSize: '12px', opacity: 0.95, background: 'rgba(255,255,255,0.14)', padding: '4px 8px', borderRadius: '999px' } }, `🔥 ${streakSummary.currentStreak}-day streak`),
        React.createElement('select', {
          value: experienceMode,
          onChange: (e) => setExperienceMode(e.target.value),
          style: { background: 'rgba(255,255,255,0.14)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 10px', borderRadius: '999px' }
        },
          Object.entries(EXPERIENCE_MODES).map(([key, config]) => React.createElement('option', { key, value: key, style: { color: '#111827' } }, config.label))
        ),
        React.createElement('span', { style: { fontSize: '12px', opacity: 0.85 } }, modeConfig.tagline),
        React.createElement('button', { onClick: () => setViewMode('map'), style: {background: viewMode === 'map' ? '#ea580c' : '#7f1d1d', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer'} }, 'Map'),
        React.createElement('button', { onClick: () => setViewMode('list'), style: {background: viewMode === 'list' ? '#ea580c' : '#7f1d1d', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer'} }, 'List'),
        React.createElement('button', { onClick: () => setViewMode('stats'), style: {background: viewMode === 'stats' ? '#ea580c' : '#7f1d1d', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer'} }, '📊 Stats'),
        React.createElement('button', { onClick: () => setViewMode('review'), style: {background: viewMode === 'review' ? '#ea580c' : '#7f1d1d', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer'} }, 'Review'),
        React.createElement('button', { onClick: handleAddClick, style: { background: '#059669', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer'} }, '+ Add')
      )
    ),
    React.createElement('main', { style: { flex: 1, position: 'relative', overflowY: 'auto' } }, renderContent()),
    React.createElement(Toast, { toast, onClose: () => setToast(null) }),
    selectedPostbox && React.createElement(PostboxForm, {
        postbox: selectedPostbox,
        onSave: savePostbox,
        onCancel: () => setSelectedPostbox(null)
    })
  );
};

const PostboxList = ({ postboxes, onSelect, onDelete, onShare, onReport }) => {
    if (postboxes.length === 0) return React.createElement('div', { style: { padding: '20px', textAlign: 'center' } }, 'No postboxes logged yet. Add one!');
    
    return React.createElement('div', { style: { padding: '10px' } },
        postboxes.map(p => {
            const rarityInfo = getRarityInfo(p.type);
            const qualityScore = p.qualityScore || calculateQualityScore(p);
            const qualityTier = p.qualityTier || getQualityTier(qualityScore).label;
            const qualityColor = getQualityTier(qualityScore).color;
            return React.createElement('div', { key: p.id, style: { background: 'white', borderLeft: `5px solid ${rarityInfo.color}`, marginBottom: '10px', padding: '15px', borderRadius: '5px', display: 'flex', gap: '15px' } },
                // Icon column
                React.createElement('div', { style: { flexShrink: 0 } },
                    React.createElement(PostboxIcon, { type: p.type, size: 80, showLabel: false })
                ),
                // Content column
                React.createElement('div', { style: { flex: 1 } },
                    React.createElement('h3', { style: { marginTop: 0, marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '8px' } }, 
                        // Subtle rarity indicator dot
                        React.createElement('span', { 
                            style: { 
                                display: 'inline-block', 
                                width: '8px', 
                                height: '8px', 
                                borderRadius: '50%', 
                                background: rarityInfo.label === 'LEGENDARY' ? '#FFD700' : (rarityInfo.label.includes('AIRMAIL') ? '#0ea5e9' : rarityInfo.color),
                                flexShrink: 0
                            } 
                        }),
                        p.type || 'Postbox'
                    ),
                    React.createElement('div', { 
                        style: { 
                            display: 'inline-block', 
                            border: `2px solid ${rarityInfo.label === 'LEGENDARY' ? '#FFD700' : (rarityInfo.label.includes('AIRMAIL') ? '#0ea5e9' : rarityInfo.color)}`, 
                            color: rarityInfo.label === 'LEGENDARY' ? '#FFD700' : (rarityInfo.label.includes('AIRMAIL') ? '#0ea5e9' : rarityInfo.color),
                            background: 'transparent',
                            padding: '2px 8px', 
                            borderRadius: '12px', 
                            fontSize: '10px', 
                            fontWeight: 'bold', 
                            marginBottom: '10px' 
                        } 
                    }, rarityInfo.label),
                    React.createElement('div', {
                        style: {
                            display: 'inline-block',
                            marginLeft: '8px',
                            marginBottom: '10px',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '10px',
                            fontWeight: 'bold',
                            background: '#eff6ff',
                            color: qualityColor
                        }
                    }, `${qualityScore}/100 ${qualityTier}`),
                    (p.photos || []).length > 0 && React.createElement('img', { src: p.photos[0].data, style: { maxWidth: '100px', borderRadius: '5px', float: 'right', marginLeft: '10px' } }),
                    React.createElement('p', { style: { margin: '5px 0', fontSize: '14px' } }, `Condition: ${p.condition || 'N/A'}`),
                    React.createElement('p', { style: { margin: '5px 0', fontSize: '14px' } }, `Postbox Number: ${p.postboxCode || 'N/A'}`),
                    React.createElement('p', { style: { margin: '5px 0', fontSize: '14px' } }, `Postcode: ${p.postcode || 'N/A'}`),
                    React.createElement('p', { style: { margin: '5px 0', fontSize: '13px', color: '#334155' } }, `Verification: ${p.verificationStatus || 'Community Submitted'} | Source: ${p.evidenceSource || 'Field Survey'} | Confidence: ${p.surveyConfidence || 'Unspecified'}`),
                    React.createElement('p', { style: { margin: '5px 0', fontSize: '13px', color: '#334155' } }, `GPS Accuracy: ${typeof p.gpsAccuracy === 'number' ? `${Math.round(p.gpsAccuracy)}m` : 'Unavailable'}`),
                    p.researchNotes && React.createElement('p', { style: { margin: '5px 0', fontSize: '13px', color: '#475569' } }, `Notes: ${p.researchNotes}`),
                    React.createElement('p', { style: { margin: '5px 0', fontSize: '12px', color: '#666' } }, `Points: ${rarityInfo.points || 0} | Added: ${new Date(p.createdAt?.seconds * 1000 || Date.now()).toLocaleDateString()}`),
                    React.createElement('div', { style: { marginTop: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' } },
                        React.createElement('button', { onClick: () => onDelete(p.id), style: { padding: '5px 10px', borderRadius: '3px', border: '1px solid #ccc', cursor: 'pointer', background: 'white' } }, 'Delete'),
                        React.createElement('a', { href: onShare(p), target: '_blank', rel: 'noopener noreferrer', style: { padding: '5px 10px', borderRadius: '3px', border: '1px solid #ccc', textDecoration: 'none', color: 'black' } }, 'Share'),
                        (p.condition === 'Poor' || p.condition === 'Derelict' || p.condition === 'Needs Maintenance') && 
                            React.createElement('a', { href: onReport(p), style: { padding: '5px 10px', borderRadius: '3px', border: '1px solid #ccc', textDecoration: 'none', color: 'black' } }, 'Report')
                    )
                )
            );
        })
    );
};

const ReviewQueue = ({ postboxes, filters, reviewInsights, modeConfig, onFilterChange, onPromote, onEdit, onExport }) => {
    const verificationOptions = ['All', 'Community Submitted', 'Research Reviewed', 'Verified on Site', 'Needs Follow-up'];
    const qualityOptions = ['All', 'Research Ready', 'Strong Field Record', 'Needs Review', 'Sparse Record'];
    const sourceOptions = ['All', 'Field Survey', 'Historic Reference', 'Community Tip', 'Desk Research'];
    const duplicateOptions = ['All', 'Possible Duplicates', 'Clear Records'];
    const [reviewDrafts, setReviewDrafts] = useState({});

    const getDraft = (postbox) => reviewDrafts[postbox.id] || {
      reviewerName: postbox.reviewerName || '',
      reviewerDecisionReason: postbox.reviewerDecisionReason || '',
      reviewerNotes: postbox.reviewerNotes || ''
    };

    const setDraftField = (postboxId, field, value, postbox) => {
      setReviewDrafts(prev => ({
        ...prev,
        [postboxId]: {
          ...getDraft(postbox),
          ...prev[postboxId],
          [field]: value
        }
      }));
    };

    const saveReviewMetadata = (postbox) => {
      const draft = getDraft(postbox);
      onPromote(postbox.id, {
        reviewerName: draft.reviewerName,
        reviewerDecisionReason: draft.reviewerDecisionReason,
        reviewerNotes: draft.reviewerNotes,
        reviewedAt: window.firebaseServerTimestamp()
      });
    };

    const duplicateFlaggedCount = postboxes.filter(postbox => (reviewInsights[postbox.id]?.duplicateCount || 0) > 0).length;
    const evidenceUpgradeCount = postboxes.filter(postbox => reviewInsights[postbox.id]?.needsEvidenceUpgrade).length;

    return React.createElement('div', { style: { padding: '16px' } },
        React.createElement('div', { style: { background: 'white', borderRadius: '10px', padding: '16px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '12px' } },
                React.createElement('div', null,
                    React.createElement('h2', { style: { margin: 0, fontSize: '18px' } }, modeConfig.reviewTitle),
                    React.createElement('p', { style: { margin: '4px 0 0 0', fontSize: '13px', color: '#475569' } }, `${postboxes.length} records in the current review slice`),
                    React.createElement('p', { style: { margin: '6px 0 0 0', fontSize: '12px', color: '#64748b' } }, `${duplicateFlaggedCount} possible duplicate clusters, ${evidenceUpgradeCount} records still need stronger evidence`)
                ),
                React.createElement('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } },
                    React.createElement('button', { onClick: () => onExport('csv'), style: { background: '#1d4ed8', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 12px', cursor: 'pointer' } }, 'Export CSV'),
                    React.createElement('button', { onClick: () => onExport('json'), style: { background: '#334155', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 12px', cursor: 'pointer' } }, 'Export JSON')
                )
            ),
            React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' } },
                React.createElement('div', null,
                    React.createElement('label', { style: { display: 'block', fontSize: '12px', marginBottom: '4px', color: '#475569' } }, 'Verification'),
                    React.createElement('select', { value: filters.verificationStatus, onChange: e => onFilterChange('verificationStatus', e.target.value), style: { width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' } },
                        verificationOptions.map(option => React.createElement('option', { key: option, value: option }, option))
                    )
                ),
                React.createElement('div', null,
                    React.createElement('label', { style: { display: 'block', fontSize: '12px', marginBottom: '4px', color: '#475569' } }, 'Quality'),
                    React.createElement('select', { value: filters.qualityTier, onChange: e => onFilterChange('qualityTier', e.target.value), style: { width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' } },
                        qualityOptions.map(option => React.createElement('option', { key: option, value: option }, option))
                    )
                ),
                React.createElement('div', null,
                    React.createElement('label', { style: { display: 'block', fontSize: '12px', marginBottom: '4px', color: '#475569' } }, 'Evidence Source'),
                    React.createElement('select', { value: filters.evidenceSource, onChange: e => onFilterChange('evidenceSource', e.target.value), style: { width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' } },
                        sourceOptions.map(option => React.createElement('option', { key: option, value: option }, option))
                    )
                ),
                React.createElement('div', null,
                    React.createElement('label', { style: { display: 'block', fontSize: '12px', marginBottom: '4px', color: '#475569' } }, 'Duplicate Signal'),
                    React.createElement('select', { value: filters.duplicateStatus, onChange: e => onFilterChange('duplicateStatus', e.target.value), style: { width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' } },
                        duplicateOptions.map(option => React.createElement('option', { key: option, value: option }, option))
                    )
                )
            )
        ),
        postboxes.length === 0
            ? React.createElement('div', { style: { background: 'white', borderRadius: '10px', padding: '24px', textAlign: 'center', color: '#475569' } }, 'No records match the current review filters.')
            : postboxes.map(postbox => {
                const qualityScore = postbox.qualityScore || calculateQualityScore(postbox);
                const qualityTier = postbox.qualityTier || getQualityTier(qualityScore).label;
                const qualityColor = getQualityTier(qualityScore).color;
                const reviewInsight = reviewInsights[postbox.id] || {};
                const draft = getDraft(postbox);

                return React.createElement('div', { key: postbox.id, style: { background: 'white', borderRadius: '10px', padding: '16px', marginBottom: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' } },
                    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'flex-start', flexWrap: 'wrap' } },
                        React.createElement('div', null,
                            React.createElement('h3', { style: { margin: '0 0 6px 0' } }, postbox.type || 'Postbox'),
                            React.createElement('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } },
                                React.createElement('span', { style: { padding: '3px 8px', borderRadius: '999px', background: '#fef3c7', fontSize: '11px', fontWeight: 'bold', color: '#92400e' } }, postbox.verificationStatus || 'Community Submitted'),
                                React.createElement('span', { style: { padding: '3px 8px', borderRadius: '999px', background: '#eff6ff', fontSize: '11px', fontWeight: 'bold', color: qualityColor } }, `${qualityScore}/100 ${qualityTier}`),
                                reviewInsight.duplicateCount > 0 && React.createElement('span', { style: { padding: '3px 8px', borderRadius: '999px', background: '#fee2e2', fontSize: '11px', fontWeight: 'bold', color: '#991b1b' } }, reviewInsight.duplicateLabel)
                            )
                        ),
                        React.createElement('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } },
                            React.createElement('button', { onClick: () => onPromote(postbox.id, { verificationStatus: 'Research Reviewed', reviewedAt: window.firebaseServerTimestamp() }), style: { background: '#1d4ed8', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 10px', cursor: 'pointer' } }, 'Mark Reviewed'),
                            React.createElement('button', { onClick: () => onPromote(postbox.id, { verificationStatus: 'Verified on Site', reviewedAt: window.firebaseServerTimestamp() }), style: { background: '#166534', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 10px', cursor: 'pointer' } }, 'Verify On Site'),
                            React.createElement('button', { onClick: () => onPromote(postbox.id, { verificationStatus: 'Needs Follow-up', surveyConfidence: 'Needs Verification', reviewedAt: window.firebaseServerTimestamp() }), style: { background: '#b45309', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 10px', cursor: 'pointer' } }, 'Needs Follow-up'),
                            React.createElement('button', { onClick: () => onEdit(postbox), style: { background: 'white', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '8px 10px', cursor: 'pointer' } }, 'Edit')
                        )
                    ),
                    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px', marginTop: '12px', fontSize: '13px', color: '#334155' } },
                        React.createElement('div', null, `Source: ${postbox.evidenceSource || 'Field Survey'}`),
                        React.createElement('div', null, `Confidence: ${postbox.surveyConfidence || 'Unspecified'}`),
                        React.createElement('div', null, `GPS Accuracy: ${typeof postbox.gpsAccuracy === 'number' ? `${Math.round(postbox.gpsAccuracy)}m` : 'Unavailable'}`),
                        React.createElement('div', null, `Postcode: ${postbox.postcode || 'N/A'}`)
                    ),
                    React.createElement('div', { style: { marginTop: '12px', padding: '12px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0' } },
                        React.createElement('div', { style: { fontSize: '12px', color: '#475569', marginBottom: '8px' } }, getReviewSummary(postbox)),
                        reviewInsight.needsEvidenceUpgrade && React.createElement('div', { style: { fontSize: '12px', color: '#92400e', marginBottom: '8px' } }, 'Evidence upgrade suggested: add at least one photo and a precise GPS fix to strengthen dataset readiness.'),
                        reviewInsight.duplicateCount > 0 && React.createElement('div', { style: { fontSize: '12px', color: '#991b1b', marginBottom: '8px' } }, `Duplicate watch: ${reviewInsight.duplicateHint}`),
                        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' } },
                            React.createElement('div', null,
                                React.createElement('label', { style: { display: 'block', fontSize: '12px', marginBottom: '4px', color: '#475569' } }, 'Reviewer'),
                                React.createElement('input', {
                                  type: 'text',
                                  value: draft.reviewerName,
                                  onChange: e => setDraftField(postbox.id, 'reviewerName', e.target.value, postbox),
                                  placeholder: 'Curator name or initials',
                                  style: { width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }
                                })
                            ),
                            React.createElement('div', null,
                                React.createElement('label', { style: { display: 'block', fontSize: '12px', marginBottom: '4px', color: '#475569' } }, 'Decision Reason'),
                                React.createElement('select', {
                                  value: draft.reviewerDecisionReason,
                                  onChange: e => setDraftField(postbox.id, 'reviewerDecisionReason', e.target.value, postbox),
                                  style: { width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }
                                },
                                  React.createElement('option', { value: '' }, 'Select reason...'),
                                  REVIEW_DECISION_REASONS.map(reason => React.createElement('option', { key: reason, value: reason }, reason))
                                )
                            )
                        ),
                        React.createElement('div', { style: { marginTop: '10px' } },
                            React.createElement('label', { style: { display: 'block', fontSize: '12px', marginBottom: '4px', color: '#475569' } }, 'Reviewer Notes'),
                            React.createElement('textarea', {
                              value: draft.reviewerNotes,
                              onChange: e => setDraftField(postbox.id, 'reviewerNotes', e.target.value, postbox),
                              rows: 3,
                              placeholder: 'Record why this is accepted, what still needs checking, or how it relates to a nearby record.',
                              style: { width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', resize: 'vertical', fontFamily: 'inherit' }
                            })
                        ),
                        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'center', flexWrap: 'wrap', marginTop: '10px' } },
                            React.createElement('div', { style: { fontSize: '12px', color: '#64748b' } }, reviewInsight.hasCuratorTrail ? 'Curator trail present in export' : 'Save curator metadata to strengthen provenance'),
                            React.createElement('button', { onClick: () => saveReviewMetadata(postbox), style: { background: '#0f766e', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 12px', cursor: 'pointer' } }, 'Save Review Notes')
                        )
                    ),
                    postbox.researchNotes && React.createElement('p', { style: { margin: '10px 0 0 0', fontSize: '13px', color: '#475569' } }, `Notes: ${postbox.researchNotes}`)
                );
            })
    );
};

const PlayerStats = ({ userPostboxes, nearbyTargets, streakSummary }) => {
    const totalPoints = userPostboxes.reduce((sum, p) => sum + (getRarityInfo(p.type).points || 0), 0);
    const researchReadyCount = userPostboxes.filter(p => (p.qualityScore || calculateQualityScore(p)) >= 80).length;
    const averageQuality = userPostboxes.length > 0
      ? Math.round(userPostboxes.reduce((sum, p) => sum + (p.qualityScore || calculateQualityScore(p)), 0) / userPostboxes.length)
      : 0;
    const level = getPlayerLevel(totalPoints);
    
    return React.createElement('div', { style: { padding: '20px' } },
        React.createElement('div', { style: { textAlign: 'center', background: 'white', padding: '20px', borderRadius: '8px' } },
            React.createElement('div', { style: { fontSize: '4rem' } }, level.icon),
            React.createElement('h2', { style: { margin: '10px 0' } }, modeConfig.statsTitle),
            React.createElement('p', null, `${userPostboxes.length} postboxes documented`)
        ),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', margin: '20px 0' } },
            React.createElement('div', { style: { background: 'white', padding: '15px', borderRadius: '8px', textAlign: 'center' } },
                React.createElement('h3', { style: { margin: 0 } }, userPostboxes.length),
                React.createElement('p', { style: { margin: 0, fontSize: '14px' } }, 'Total Finds')
            ),
            React.createElement('div', { style: { background: 'white', padding: '15px', borderRadius: '8px', textAlign: 'center' } },
                React.createElement('h3', { style: { margin: 0 } }, totalPoints),
                React.createElement('p', { style: { margin: 0, fontSize: '14px' } }, 'Community Points')
            )
        ),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', margin: '0 0 20px 0' } },
            React.createElement('div', { style: { background: 'white', padding: '15px', borderRadius: '8px', textAlign: 'center' } },
                React.createElement('h3', { style: { margin: 0 } }, researchReadyCount),
                React.createElement('p', { style: { margin: 0, fontSize: '14px' } }, 'Research-Ready Records')
            ),
            React.createElement('div', { style: { background: 'white', padding: '15px', borderRadius: '8px', textAlign: 'center' } },
                React.createElement('h3', { style: { margin: 0 } }, `${averageQuality}/100`),
                React.createElement('p', { style: { margin: 0, fontSize: '14px' } }, 'Average Quality')
            )
        ),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', margin: '0 0 20px 0' } },
            React.createElement('div', { style: { background: 'white', padding: '15px', borderRadius: '8px', textAlign: 'center' } },
                React.createElement('h3', { style: { margin: 0 } }, `${streakSummary.currentStreak}d`),
                React.createElement('p', { style: { margin: 0, fontSize: '14px' } }, 'Current Streak')
            ),
            React.createElement('div', { style: { background: 'white', padding: '15px', borderRadius: '8px', textAlign: 'center' } },
                React.createElement('h3', { style: { margin: 0 } }, `${streakSummary.longestStreak}d`),
                React.createElement('p', { style: { margin: 0, fontSize: '14px' } }, 'Longest Streak')
            )
        ),
        React.createElement('div', { style: { background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' } },
            React.createElement('h3', { style: { marginTop: 0, marginBottom: '10px' } }, modeConfig.discoveryTitle),
            React.createElement('p', { style: { margin: '0 0 8px 0', fontSize: '14px', color: '#334155' } }, `${nearbyTargets.length} unlogged official targets are currently in your radar.`),
            React.createElement('p', { style: { margin: '0 0 8px 0', fontSize: '14px', color: '#334155' } }, `${streakSummary.todayFinds} finds logged today.`),
            React.createElement('p', { style: { margin: 0, fontSize: '14px', color: '#334155' } }, streakSummary.nextMilestone ? `Keep the streak alive for ${streakSummary.nextMilestone - streakSummary.currentStreak} more day${streakSummary.nextMilestone - streakSummary.currentStreak === 1 ? '' : 's'} to hit ${streakSummary.nextMilestone}.` : 'You have cleared every current streak milestone.')
        ),
        React.createElement('div', { style: { background: '#dbeafe', padding: '15px', borderRadius: '8px', marginTop: '20px' } },
            React.createElement('p', { style: { fontSize: '14px', margin: 0 } }, '🌐 All postboxes are now shared across all users in real-time!')
        )
    );
};

// --- RENDER THE APP ---
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(PostboxLogger));
