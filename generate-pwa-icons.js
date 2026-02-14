#!/usr/bin/env node
// © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd. All rights reserved.
// Author: Barry Ward
// License: Proprietary - Not for redistribution without written consent.
// Last Modified: 2025-02-14 09:15:00
// Version: 1.0.0
// Project: Heritage Postbox Logger (Plogger)

/**
 * PWA Icon Generator - Scales 2048x2048px masters to all required PWA sizes
 * 
 * CHANGELOG:
 * v1.0.0 (2025-02-14 09:15:00)
 * - FEAT: Initial implementation using sharp library
 * - FEAT: Processes 2048px PNG-24 with alpha transparency masters
 * - FEAT: Generates 10 PWA sizes (16-512px) with proper maskable safe zones
 * - ROOT CAUSE: Automated scaling needed for multiple postbox type icons
 * - CHANGES: Replaces manual ImageMagick conversion workflow
 * - TESTED: Dry-run validation only (requires npm install sharp)
 * - ROLLBACK: Revert to ImageMagick batch script if Node.js unavailable
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// PWA Icon Size Requirements
const ICON_SIZES = [16, 32, 72, 96, 120, 144, 152, 192, 384, 512];

// Maskable icon sizes (require 80% safe zone already present in 2048px source)
const MASKABLE_SIZES = [192, 512];

/**
 * Process a single master icon into all PWA sizes
 * @param {string} masterPath - Path to 2048x2048px source PNG
 * @param {string} outputDir - Directory for generated icons
 * @param {string} prefix - Filename prefix (e.g., 'british_postbox')
 */
async function generatePWAIcons(masterPath, outputDir, prefix) {
  console.log(`\n🔄 Processing: ${path.basename(masterPath)}`);
  
  // Verify source dimensions
  const metadata = await sharp(masterPath).metadata();
  if (metadata.width !== 2048 || metadata.height !== 2048) {
    console.warn(`⚠️  WARNING: ${masterPath} is ${metadata.width}x${metadata.height}, expected 2048x2048`);
  }

  // Generate each size
  for (const size of ICON_SIZES) {
    const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);
    
    await sharp(masterPath)
      .resize(size, size, {
        kernel: sharp.kernel.lanczos3, // High-quality downscaling
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
      })
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(outputPath);

    const isMaskable = MASKABLE_SIZES.includes(size);
    console.log(`✅ Generated: icon-${size}x${size}.png ${isMaskable ? '(maskable)' : ''}`);
  }

  console.log(`✅ Complete: ${ICON_SIZES.length} sizes generated from ${prefix}`);
}

/**
 * Main execution
 */
async function main() {
  const MASTER_DIR = process.argv[2] || './masters';
  const OUTPUT_DIR = process.argv[3] || './icons';

  console.log('🎨 PWA Icon Generator v1.0.0');
  console.log(`📂 Master Directory: ${MASTER_DIR}`);
  console.log(`📂 Output Directory: ${OUTPUT_DIR}`);

  // Create output directory if needed
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`✅ Created output directory: ${OUTPUT_DIR}`);
  }

  // Find all master PNG files
  const masterFiles = fs.readdirSync(MASTER_DIR)
    .filter(f => f.endsWith('_master.png') || f.endsWith('_2048.png'))
    .map(f => path.join(MASTER_DIR, f));

  if (masterFiles.length === 0) {
    console.error('❌ No master files found. Looking for *_master.png or *_2048.png');
    process.exit(1);
  }

  console.log(`\n📋 Found ${masterFiles.length} master file(s):`);
  masterFiles.forEach(f => console.log(`   - ${path.basename(f)}`));

  // Process primary icon first (british_postbox)
  const primaryIcon = masterFiles.find(f => f.includes('british_postbox'));
  if (primaryIcon) {
    await generatePWAIcons(primaryIcon, OUTPUT_DIR, 'british_postbox');
  }

  // Process remaining icons
  for (const masterFile of masterFiles) {
    if (masterFile === primaryIcon) continue; // Already processed
    const prefix = path.basename(masterFile, path.extname(masterFile));
    await generatePWAIcons(masterFile, OUTPUT_DIR, prefix);
  }

  console.log('\n✅ All icons generated successfully!');
  console.log(`\n📋 Next Steps:`);
  console.log(`   1. Verify icon-192x192.png and icon-512x512.png in ${OUTPUT_DIR}`);
  console.log(`   2. Update manifest.json "icons" array with correct paths`);
  console.log(`   3. Set "purpose": "any maskable" for 192px and 512px sizes`);
}

// Execute
main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
