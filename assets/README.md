# Postbox Logger Assets

© 2025 Insight Geospatial, Eurotech Marine Data Services Ltd. All rights reserved.
Author: Barry Ward

## Asset Directory Structure

This folder contains postbox type icons and monarch cipher images for the Plogger PWA.

### Expected Asset Files

#### Postbox Types
- `ludlow_postbox_master.png` - Ludlow postbox reference image
- `fluted_pillar_box_silhouette_1.png` - Fluted pillar box silhouette
- `royal_mail_lamp_box_1.jpg` - Royal Mail lamp box (shows "LAMP" overlay)
- `penfold_hexagonal.png` - Penfold hexagonal pillar box
- `wall_box_first_type.png` - First type wall box
- `airmail_blue_box.png` - Airmail Blue postbox (10x rarity multiplier)
- `bronze_green_box.png` - Bronze Green postbox (5x rarity multiplier)

#### Monarch Ciphers
- `vr_cipher.png` - Victorian (VR) cipher
- `evii_cipher.png` - Edward VII (EVIIR) cipher
- `gv_cipher.png` - George V (GVR) cipher
- `gvi_cipher.png` - George VI (GVIR) cipher
- `eii_cipher.png` - Elizabeth II (EIIR) cipher
- `ciii_cipher.png` - Charles III (CIIIR) cipher
- `scottish_crown.png` - Scottish Crown variant (Legendary status - 2500 points)
- `anonymous_cipher.png` - Anonymous variant (Legendary status - 2500 points)

### Asset Guidelines

1. **Use As-Is**: All assets should be used without refactoring or background removal
2. **Whitespace Handling**: Assets have unstandardized whitespace - UI uses `object-fit: contain` with 10% padding buffer
3. **Development Status**: 3D renders display temporary text overlay indicating development status
4. **Licensing**: All assets are proprietary and subject to the project license

### UI Display Requirements

- `object-fit: contain` for all icon displays
- 10% padding buffer to handle whitespace variations
- Text overlays for development-status assets (e.g., "LAMP" for lamp box)
