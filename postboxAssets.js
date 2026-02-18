// © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd. All rights reserved.
// Author: Barry Ward
// License: Proprietary – Not for redistribution without written consent.

/*
 * Postbox Assets Configuration
 * Version: 1.0.0
 * Date: 17-02-2026
 * 
 * This file contains the configuration for postbox types and monarch ciphers,
 * including asset paths, rarity multipliers, and display metadata.
 */

// --- POSTBOX TYPES CONFIGURATION ---
const postboxTypes = {
  // Historic Pillar Boxes
  'Pillar Box: Penfold Hexagonal (1866-1879)': {
    asset: 'assets/icons/penfold_hexagonal.png',
    rarity: 10,
    label: 'LBSG MUSEUM PIECE',
    color: '#a855f7',
    basePoints: 200,
    multiplier: 1,
    description: 'Rare hexagonal design by J.W. Penfold',
    period: '1866-1879'
  },
  'Pillar Box: First National Standard (1859)': {
    asset: 'assets/icons/fluted_pillar_box_silhouette_1.png',
    rarity: 9,
    label: 'LBSG HISTORIC',
    color: '#dc2626',
    basePoints: 300,
    multiplier: 1,
    description: 'Design by First National Standard (1859). Notable for the vertical fluting on the column and the cap\'s acorn finial. Highly protected heritage assets. Only ~150 survive.',
    period: '1859-1879'
  },
  'Pillar Box: Victorian Cipher (VR)': {
    asset: 'assets/icons/vr_cipher.png',
    rarity: 8,
    label: 'LBSG RARE VICTORIAN',
    color: '#f97316',
    basePoints: 90,
    multiplier: 1,
    description: 'Victorian era with VR cipher',
    period: '1837-1901'
  },
  'Pillar Box: Edward VII Cipher (EVIIR)': {
    asset: 'assets/icons/evii_cipher.png',
    rarity: 7,
    label: 'LBSG EDWARDIAN',
    color: '#f59e0b',
    basePoints: 75,
    multiplier: 1,
    description: 'Edwardian era with EVIIR cipher',
    period: '1901-1910'
  },
  'Pillar Box: Edward VIII Cipher (EVIIIR)': {
    asset: 'assets/icons/eviiir_cipher_design_1.png',
    rarity: 10,
    label: 'HOLY GRAIL - 325 DAYS',
    color: '#a855f7',
    basePoints: 500,
    multiplier: 1,
    description: 'Rare 1936 edition. Features the stylized EVIIIR monogram without the Rex numbering, distinguished by a more blocky, Art Deco crown style compared to George V.',
    period: '1936 (325 days)'
  },

  // Wall Boxes
  'Wall Box: First Type (1857)': {
    asset: 'assets/icons/wall_box_first_type.png',
    rarity: 8,
    label: 'LBSG EARLY WALL BOX',
    color: '#84cc16',
    basePoints: 85,
    multiplier: 1,
    description: 'First type wall-mounted box',
    period: '1857-1870s'
  },
  'Wall Box: Large Type': {
    asset: 'assets/icons/wall_box_first_type.png',
    rarity: 4,
    label: 'LBSG COMMON WALL BOX',
    color: '#22c55e',
    basePoints: 15,
    multiplier: 1,
    description: 'Standard large wall box',
    period: '1900s-Present'
  },

  // Ludlow Boxes
  'Ludlow Box: Standard': {
    asset: 'assets/icons/ludlow_postbox_master.png',
    rarity: 7,
    label: 'LBSG LUDLOW FIND',
    color: '#10b981',
    basePoints: 60,
    multiplier: 1,
    description: 'Ludlow-type postbox',
    period: '1930s-1960s'
  },

  // Lamp Boxes
  'Lamp Box: Standard Oval': {
    asset: 'assets/icons/royal_mail_lamp_box_1.jpg',
    rarity: 3,
    label: 'LBSG COMMON LAMP BOX',
    color: '#06b6d4',
    basePoints: 10,
    multiplier: 1,
    description: 'Standard oval lamp box',
    developmentStatus: 'LAMP' // Indicates 3D render in development
  },

  // Modern Era
  'Modern: Elizabeth II Cipher (EIIR)': {
    asset: 'assets/icons/eii_cipher.png',
    rarity: 2,
    label: 'COMMON',
    color: '#059669',
    basePoints: 5,
    multiplier: 1,
    description: 'Modern EIIR cipher box',
    period: '1952-2022'
  },
  'Modern: Charles III Cipher (CIIIR)': {
    asset: 'assets/icons/ciii_cipher.png',
    rarity: 9,
    label: 'NEW ERA - RARE',
    color: '#4f46e5',
    basePoints: 80,
    multiplier: 1,
    description: 'New Charles III cipher',
    period: '2022-Present'
  },

  // Special Editions & Rare Colors
  'Special: Olympic Gold (2012)': {
    asset: 'assets/icons/olympic_gold.png',
    rarity: 8,
    label: 'SPECIAL EDITION',
    color: '#d97706',
    basePoints: 50,
    multiplier: 1,
    description: '2012 Olympic gold postbox',
    period: '2012'
  },
  'Special: Airmail Blue': {
    asset: 'assets/icons/airmail_blue_box.png',
    rarity: 10,
    label: 'LEGENDARY AIRMAIL',
    color: '#0ea5e9',
    basePoints: 150,
    multiplier: 10, // 10x multiplier for Airmail Blue
    description: 'Rare airmail blue postbox',
    period: '1930s-1960s'
  },
  'Special: Bronze Green': {
    asset: 'assets/icons/bronze_green_box.png',
    rarity: 9,
    label: 'RARE BRONZE GREEN',
    color: '#166534',
    basePoints: 100,
    multiplier: 5, // 5x multiplier for Bronze Green
    description: 'Rare Victorian bronze green livery',
    period: '1860s-1880s'
  },
  
  // Regional Variations
  'Regional: Guernsey Blue': {
    asset: 'assets/icons/airmail_blue_postbox_1.png',
    rarity: 9,
    label: 'GUERNSEY HERITAGE',
    color: '#0ea5e9',
    basePoints: 200,
    multiplier: 1,
    description: 'Historic Blue livery (pre-1980). Features the Bailiwick of Guernsey crest instead of the Royal Cypher.',
    period: 'Pre-1980'
  },
  'Regional: Isle of Man': {
    asset: 'assets/icons/sunday_yellow_postbox_1.png',
    rarity: 9,
    label: 'MANX HERITAGE',
    color: '#eab308',
    basePoints: 200,
    multiplier: 1,
    description: 'Distinctive Red/Yellow livery. Often features the Three Legs of Man (Triskelion) symbol.',
    period: 'Various'
  }
};

// --- MONARCH CIPHERS CONFIGURATION ---
const monarchCiphers = {
  'VR': {
    name: 'Victoria Regina',
    asset: 'assets/icons/vr_cipher.png',
    period: '1837-1901',
    rarity: 8,
    description: 'Victorian era cipher'
  },
  'EVIIR': {
    name: 'Edward VII Rex',
    asset: 'assets/icons/evii_cipher.png',
    period: '1901-1910',
    rarity: 7,
    description: 'Edwardian era cipher'
  },
  'GVR': {
    name: 'George V Rex',
    asset: 'assets/icons/gv_cipher.png',
    period: '1910-1936',
    rarity: 6,
    description: 'George V era cipher'
  },
  'EVIIIR': {
    name: 'Edward VIII Rex',
    asset: 'assets/icons/eviiir_cipher_design_1.png',
    period: '1936 (325 days)',
    rarity: 10,
    description: 'Holy Grail for collectors. Rare 1936 edition from the 325-day reign. Features the stylized EVIIIR monogram without the Rex numbering, distinguished by a more blocky, Art Deco crown style compared to George V.'
  },
  'GVIR': {
    name: 'George VI Rex',
    asset: 'assets/icons/gvi_cipher.png',
    period: '1936-1952',
    rarity: 5,
    description: 'George VI era cipher'
  },
  'EIIR': {
    name: 'Elizabeth II Regina',
    asset: 'assets/icons/eii_cipher.png',
    period: '1952-2022',
    rarity: 2,
    description: 'Elizabeth II era cipher'
  },
  'CIIIR': {
    name: 'Charles III Rex',
    asset: 'assets/icons/ciii_cipher.png',
    period: '2022-Present',
    rarity: 9,
    description: 'Charles III era cipher'
  },
  'Scottish Crown': {
    name: 'Scottish Crown',
    asset: 'assets/icons/scottish_crown.png',
    period: 'Various',
    rarity: 10,
    label: 'LEGENDARY',
    basePoints: 2500,
    multiplier: 1,
    description: 'Legendary Scottish Crown variant'
  },
  'Anonymous': {
    name: 'Anonymous (No Cipher)',
    asset: 'assets/icons/anonymous_cipher.png',
    period: 'Various',
    rarity: 10,
    label: 'LEGENDARY',
    basePoints: 2500,
    multiplier: 1,
    description: 'Legendary anonymous variant'
  }
};

// --- HELPER FUNCTIONS ---

/**
 * Get postbox type configuration by name
 * @param {string} typeName - The postbox type name
 * @returns {object} Configuration object with asset path, rarity, etc.
 */
const getPostboxTypeConfig = (typeName) => {
  return postboxTypes[typeName] || null;
};

/**
 * Get monarch cipher configuration by code
 * @param {string} cipherCode - The cipher code (e.g., 'VR', 'EIIR')
 * @returns {object} Configuration object with asset path, period, etc.
 */
const getMonarchCipherConfig = (cipherCode) => {
  return monarchCiphers[cipherCode] || null;
};

/**
 * Get all postbox type names for dropdown/selection
 * @returns {array} Array of postbox type names
 */
const getAllPostboxTypes = () => {
  return Object.keys(postboxTypes);
};

/**
 * Get all monarch cipher codes
 * @returns {array} Array of cipher codes
 */
const getAllMonarchCiphers = () => {
  return Object.keys(monarchCiphers);
};

/**
 * Calculate final points with multiplier
 * @param {string} typeName - The postbox type name
 * @returns {number} Final points including multiplier
 */
const calculatePoints = (typeName) => {
  const config = getPostboxTypeConfig(typeName);
  if (!config) return 2; // Default points
  
  // Explicitly set Legendary value to 2500
  if (config.label === 'LEGENDARY' && config.rarity === 10) {
    return 2500;
  }
  
  return config.basePoints * config.multiplier;
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    postboxTypes,
    monarchCiphers,
    getPostboxTypeConfig,
    getMonarchCipherConfig,
    getAllPostboxTypes,
    getAllMonarchCiphers,
    calculatePoints
  };
}
