# Heritage Postbox Icon Production Brief
# © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
# Author: Barry Ward | Project: Plogger (Heritage Postbox)

## 📋 Initial Icon Set Status
- [ ] Base Pillar Box (Type B)
- [ ] Penfold Hexagonal (Ornate)
- [ ] Standard Wall Box
- [ ] Ludlow Wall Box (White Enamel Plate)
- [ ] Lamp Box (Slim)
- [ ] Dual Aperture (Wide)

## 👑 Royal Ciphers (Achievement Set)
- [ ] Victoria (VR)
- [ ] Edward VII (E VII R)
- [ ] George V (GR)
- [ ] Edward VIII (E VIII R) - *Legendary*
- [ ] George VI (G VI R)
- [ ] Elizabeth II (E II R)
- [ ] Charles III (C III R)
- [ ] Scottish Crown (No lettering)

## 🎨 Special Variants
- [ ] Olympic Gold (#D4AF37)
- [ ] Decommissioned Black/Gold (#000000 / #D4AF37)
- [ ] Airmail Blue (#87CEEB)
- [ ] Victorian Bronze-Green (#2E3B23)

## ⚙️ Technical Specs for Generation
- **Master Size:** 1024 x 1024 px
- **Format:** PNG (Transparent Background)
- **Safe Zone:** Core graphic within center 80% (Safe for Masking)
- **Primary Color:** Royal Mail Red (#DC2626) where applicable

## 🛠️ Handoff to Claude (Developer Role)
Once these master assets are created, pass them to Claude with these instructions:
1. Run assets through a PWA Icon Generator (e.g., PWA Builder).
2. Populate `/icons/` directory with all 8 sizes defined in manifest.json.
3. Update `manifest.json` `src` paths to match new filenames.
4. Set `"purpose": "any maskable"` for the 192px and 512px variants.