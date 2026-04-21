# Heritage Postbox App - Roadmap to Google Play Store

**© 2025 Insight Geospatial, Eurotech Marine Data Services Ltd. All rights reserved.**  
**Author:** Barry Ward  
**Created:** 2025-02-14  
**Project:** Heritage Postbox Gamified Data Collection Tool  

---

## Project Vision

Build a gamified mobile app for curating a provenance-tracked database of UK heritage postboxes. Think "Geocaching meets Pokémon Go" - engaging data collection with full attribution and quality controls. Proof-of-concept to be configurable for other geolocated heritage features (telephone boxes, waymarkers, standing stones, etc.).

**End Goal:** Published Android app on Google Play Store with 100+ active users validating the concept.

---

## Current State (Baseline: v0.8.0)

**Technology Stack:**
- React 18 (web app)
- Firebase Firestore (real-time database)
- Firebase Auth (anonymous users)
- Leaflet maps
- Mobile-optimized single HTML file

**Functionality:**
- Basic postbox logging (GPS, photo, notes)
- Real-time data sync
- Map visualization
- Anonymous user sessions

**Limitations:**
- Web-only (not installable)
- No offline support
- No gamification
- No data quality controls
- No user accounts/profiles
- Clunky UX

---

## Architecture Decision: PWA → Capacitor Path

**Chosen Approach:** Progressive Web App → Capacitor Native Wrapper

**Why:**
- Reuse 90% of existing React/Firebase code
- Fastest path to Play Store (16-23 weeks vs 6+ months full rebuild)
- Cross-platform potential (iOS later)
- Can migrate to React Native if performance becomes limiting

**Alternatives Considered:**
- React Native: Better performance, but complete rewrite (6+ months)
- Flutter: Excellent UI, but new language/framework (7+ months)

---

## Phase 1: PWA Foundation (2-3 weeks)

**Goal:** Convert web app to installable Progressive Web App with offline support

**Tasks:**
1. Create manifest.json
   - App name, description, icons
   - Theme colors
   - Display mode (standalone)
   
2. Implement Service Worker
   - Cache static assets (HTML, CSS, JS)
   - Cache map tiles
   - Offline data queue for Firebase sync
   
3. Generate App Icons
   - 512×512 (high-res)
   - 192×192 (standard)
   - Adaptive icons for Android
   
4. Add Install Prompts
   - "Add to Home Screen" banner
   - iOS install instructions
   
5. Offline Data Queue
   - Store submissions locally when offline
   - Auto-sync when connection restored
   - User feedback on sync status

**Success Criteria:**
- App installs on Android home screen
- Works without internet (cached data)
- Submissions queue and sync properly

**Estimated Effort:** 15-20 hours

---

## Phase 2: Gamification Core (3-4 weeks)

**Goal:** Build engaging mechanics that encourage quality data collection

### 2.1 Points System

**Discovery Points:**
- First discovery: 100 pts
- Photo added: +50 pts
- Complete data: +25 pts
- GPS accuracy <5m: +10 pts

**Era Rarity Multipliers:**
- VR (Victorian): 2x
- EVII (Edward VII): 3x
- GV (George V): 1.5x
- GVIR (George VI): 1.5x
- EIIR (Elizabeth II): 1x
- CIIIR (Charles III): 1.2x

**Quality Bonuses:**
- High-res photo (>2MP): +10 pts
- Multiple angles: +15 pts
- Condition notes: +5 pts
- Historical context: +20 pts

**Streak Bonuses:**
- 3 days: +50 pts
- 7 days: +150 pts
- 30 days: +500 pts

### 2.2 Achievement System

**Badges:**
- First Steps (1 find)
- Getting Started (10 finds)
- Enthusiast (50 finds)
- Collector (100 finds)
- Expert (500 finds)
- Era Specialist (complete set from one era)
- Regional Explorer (finds in 5+ counties)
- Night Owl (find after sunset)
- Early Bird (find before 8am)
- Weather Warrior (find in rain)

**Leaderboards:**
- Global (all-time)
- Regional (by county)
- Monthly
- Weekly

**Progress Tracking:**
- Collection percentage by era
- Map coverage heatmap
- Personal statistics dashboard

### 2.3 Quest System

**Daily Challenges:**
- Find any postbox (+50 pts)
- Find a Victorian postbox (+100 pts)
- Add 3 photos to one postbox (+75 pts)
- Visit a new county (+150 pts)

**Regional Challenges:**
- Complete Hampshire set (all known boxes)
- Find 10 postboxes in one day
- Photograph all box types (wall, pillar, lamp, etc.)

**Photo Challenges:**
- Golden hour shot (sunrise/sunset)
- Night photography
- Action shot (person posting letter)
- Seasonal (snow, autumn leaves, etc.)

### 2.4 Social Features

**User Profiles:**
- Username and avatar
- Total finds
- Points and level
- Badges earned
- Recent activity

**Activity Feed:**
- Recent discoveries (real-time)
- Achievement notifications
- Comments on postboxes

**Interactions:**
- Like/favorite postboxes
- Comment on discoveries
- Report issues (damaged box, incorrect data)

**Success Criteria:**
- Users return 3+ times in first week
- Average session length >5 minutes
- 50%+ of users earn at least one badge

**Estimated Effort:** 25-30 hours

---

## Phase 3: Data Provenance & Quality (2-3 weeks)

**Goal:** Ensure database integrity and full traceability

### 3.1 Data Validation

**GPS Requirements:**
- Accuracy threshold: 10m for submission
- Visual indicator of GPS quality
- Manual override with reason (rural areas, GPS blocked)

**Photo Requirements:**
- Minimum resolution: 800×600
- File size limits: 5MB max
- Automatic compression
- Reject blurry/dark photos (ML validation optional)

**Mandatory Fields:**
- GPS coordinates
- At least one photo
- Era (if identifiable)
- Type (pillar, wall, lamp, etc.)
- Condition (excellent, good, fair, poor)

**Duplicate Detection:**
- 25m proximity check
- Warn user if duplicate exists
- Allow submission with justification (different angle, updated condition)

### 3.2 Provenance Tracking

**Per Submission:**
- User ID (anonymous or registered)
- Timestamp (server-side, tamper-proof)
- GPS coordinates with accuracy
- Device info (optional: model, OS)
- Photo EXIF data extraction
  - GPS from photo (cross-check with submission GPS)
  - Timestamp from photo
  - Camera model

**Edit History:**
- Track all changes to existing records
- Who edited, when, what changed
- Rollback capability (admin only)

**Attribution:**
- First discoverer badge
- Contributor list per postbox
- Photo credits

### 3.3 Moderation System

**Verification Status:**
- Pending (new submission)
- Verified (confirmed by mod or multiple users)
- Disputed (conflicting data)
- Archived (removed/no longer exists)

**Flag System:**
- Incorrect location
- Wrong era/type
- Inappropriate photo
- Duplicate entry
- Vandalism/spam

**Trust Scores:**
- User reliability rating (0-100)
- Based on:
  - Accepted submissions
  - Rejected/flagged submissions
  - Edit accuracy
  - Community reports

**Admin Tools:**
- Review queue (flagged items)
- Bulk edit (correct systematic errors)
- User moderation (ban, restrict)
- Export data (CSV, GeoJSON)

**Success Criteria:**
- <5% duplicate rate
- 90%+ submissions include photos
- Full attribution chain for all data

**Estimated Effort:** 15-20 hours

---

## Phase 4: Capacitor Integration (2-3 weeks)

**Goal:** Convert PWA to native Android app with platform features

### 4.1 Capacitor Setup

**Installation:**
```bash
npm install @capacitor/core @capacitor/cli
npx cap init
npx cap add android
```

**Build Configuration:**
- App ID: com.insightgeospatial.heritagepostbox
- App name: Heritage Postbox Logger
- Bundle web assets
- Configure build variants (debug, release)

**First Build:**
```bash
npm run build
npx cap sync
npx cap open android
```

### 4.2 Native Features

**Camera Plugin:**
- High-resolution capture (up to device max)
- Front/rear camera selection
- Flash control
- Gallery selection fallback

**Geolocation Plugin:**
- Background location updates
- Geofencing (alert when near unlogged box)
- Location accuracy improvements

**Local Notifications:**
- Daily reminder ("Log a postbox today!")
- Nearby box alerts (within 100m)
- Achievement unlocked notifications
- Quest completion

**Haptic Feedback:**
- Button presses
- Discovery confirmation
- Achievement unlocked
- Level up

**Share Plugin:**
- Share discovery to social media
- Share collection stats
- Share map view

### 4.3 Platform Optimization

**Android Lifecycle:**
- Handle back button (confirm exit)
- Pause/resume state management
- Background task handling

**UI Polish:**
- Status bar theming (transparent with icons)
- Splash screen (branded)
- App icon (adaptive for Android 8+)
- Navigation gestures

**Performance:**
- Native map rendering (faster than web view)
- Image loading optimization
- Database query optimization

**Success Criteria:**
- APK builds without errors
- All native features functional
- App feels responsive on mid-range Android devices

**Estimated Effort:** 18-22 hours

---

## Phase 5: Polish & Play Store Prep (3-4 weeks)

**Goal:** Production-ready app meeting Google Play requirements

### 5.1 UI/UX Polish

**Design System:**
- Consistent color palette
- Typography scale
- Spacing system
- Component library

**Animations:**
- Screen transitions
- Loading states (skeleton screens)
- Micro-interactions (button presses, swipes)
- Map marker animations

**Error Handling:**
- Graceful degradation (no internet, GPS off)
- Retry mechanisms
- Clear error messages
- Fallback UI states

**Accessibility:**
- Screen reader support
- Minimum touch target 48×48dp
- Color contrast WCAG AA
- Alternative text for images

### 5.2 Performance Optimization

**Image Optimization:**
- Automatic compression (80% quality JPEG)
- WebP format where supported
- Lazy loading (off-screen images)
- Thumbnail generation (200×200 for lists)

**Database Optimization:**
- Pagination (load 20 items at a time)
- Index frequently queried fields
- Denormalize for read performance
- Cache frequently accessed data

**Map Optimization:**
- Tile caching (reduce network requests)
- Cluster markers (many boxes in small area)
- Lazy load marker details
- Optimize marker icons (SVG preferred)

**Bundle Optimization:**
- Code splitting (route-based)
- Tree shaking (remove unused code)
- Minification and compression
- Remove source maps in production

### 5.3 Play Store Assets

**Required Assets:**
- Feature graphic: 1024×500 PNG
- Screenshots:
  - Phone: 4-8 screenshots (16:9, 1080×1920)
  - 7" tablet: 4-8 screenshots (optional)
  - 10" tablet: 4-8 screenshots (optional)
- High-res icon: 512×512 PNG
- App icon (uploaded via Android Studio)

**Store Listing:**
- Title (max 50 chars): "Heritage Postbox Logger"
- Short description (max 80 chars): "Discover & log UK heritage postboxes. Geocaching meets Pokémon Go!"
- Full description (max 4000 chars): Feature highlights, how it works, benefits
- Keywords: heritage, postbox, geocaching, collection, UK, Royal Mail, Victorian

**Required Policies:**
- Privacy policy (hosted on web, URL required)
- Content rating questionnaire
- Target audience (Everyone)
- Data safety form (what data collected, how used)

**Developer Account:**
- Google Play Console registration
- £20 one-time fee
- Tax/business info
- Payment setup (if monetizing later)

### 5.4 Testing Strategy

**Internal Testing:**
- 5-10 trusted users
- Install via internal test track
- 1-2 week feedback cycle
- Focus on critical bugs

**Closed Beta:**
- 20-50 users (geocaching communities, heritage groups)
- Opt-in email list
- 2-3 week testing period
- Collect feedback via in-app form + analytics

**Bug Priorities:**
- P0: Crashes, data loss - fix immediately
- P1: Core feature broken - fix before launch
- P2: UX issues - fix if time allows
- P3: Minor polish - defer to v1.1

**Success Criteria:**
- <1% crash rate
- <5% negative feedback
- All P0/P1 bugs resolved
- Privacy policy approved

**Estimated Effort:** 25-30 hours

---

## Phase 6: Configurability Framework (4-6 weeks)

**Goal:** Make platform work for any geolocated heritage feature type

### 6.1 Feature Schema System

**JSON Configuration Format:**
```json
{
  "featureType": "postbox",
  "displayName": "Heritage Postboxes",
  "icon": "postbox.svg",
  "color": "#E41E26",
  "fields": [
    {
      "name": "era",
      "type": "select",
      "required": true,
      "options": ["VR", "EVII", "GV", "GVIR", "EIIR", "CIIIR"]
    },
    {
      "name": "boxType",
      "type": "select",
      "required": true,
      "options": ["Pillar", "Wall", "Lamp", "Post Office"]
    }
  ],
  "validation": {
    "minPhotos": 1,
    "gpsAccuracy": 10,
    "proximityDuplicate": 25
  },
  "gamification": {
    "basePoints": 100,
    "rarityMultipliers": {
      "VR": 2.0,
      "EVII": 3.0
    }
  }
}
```

**Feature Type Examples:**
- Postboxes (current)
- Telephone boxes (K2, K6, K8)
- Standing stones
- Historical plaques
- War memorials
- Waymarkers
- Heritage buildings

### 6.2 Multi-Collection Support

**Collection Switching:**
- Dropdown/tabs to switch feature types
- Separate databases per collection
- Shared user accounts/profiles
- Cross-collection statistics

**Data Isolation:**
- Firestore subcollections per feature type
- Shared users collection
- Per-collection leaderboards
- Global achievements (cross-collection milestones)

**Import/Export:**
- Export configuration as JSON
- Import community-created configs
- Template library (common feature types)
- Configuration validation

### 6.3 Admin Interface

**Web-Based Config Editor:**
- No-code interface for creating feature types
- Field builder (drag-and-drop)
- Validation rule editor
- Gamification customizer (points, badges)
- Preview mode (test before deploy)

**Deployment:**
- Push config to Firebase
- App auto-updates on next launch
- Versioning (rollback if issues)
- A/B testing (try different point systems)

**Success Criteria:**
- Non-developer can configure new feature type in <1 hour
- Config changes deploy without app rebuild
- Multiple collections running simultaneously

**Estimated Effort:** 30-40 hours

---

## Technology Stack (Final)

**Frontend:**
- React 18 (UI framework)
- TypeScript (type safety)
- Zustand (state management)
- React Query (data fetching/caching)
- Tailwind CSS (styling)

**Mobile:**
- Capacitor 6 (native wrapper)
- Capacitor plugins (camera, geolocation, notifications)

**Backend:**
- Firebase Firestore (database)
- Firebase Auth (user accounts)
- Firebase Storage (photo hosting)
- Firebase Cloud Functions (serverless logic)

**Maps:**
- Leaflet (web maps)
- Mapbox GL (optional upgrade for better mobile performance)

**Build/Deploy:**
- Vite (build tool, faster than Webpack)
- GitHub Actions (CI/CD pipeline, when git added)
- Capacitor CLI (Android builds)

**Testing:**
- Vitest (unit tests)
- Playwright (E2E tests)
- Firebase Emulator Suite (local testing)

---

## Timeline Summary

| Phase | Duration | Can Start | Must Complete Before |
|-------|----------|-----------|----------------------|
| 1. PWA Foundation | 2-3 weeks | Now | Phase 4 |
| 2. Gamification | 3-4 weeks | After Phase 1 | Phase 5 |
| 3. Data Provenance | 2-3 weeks | After Phase 1 | Phase 5 |
| 4. Capacitor | 2-3 weeks | After Phase 1 | Phase 5 |
| 5. Play Store Prep | 3-4 weeks | After Phases 2-4 | Launch |
| 6. Configurability | 4-6 weeks | Parallel with Phase 5 | Post-launch |

**Critical Path:** 1 → 2 → 3 → 4 → 5 (16-20 weeks minimum)  
**With Configurability:** Add 4-6 weeks (20-26 weeks total)  
**Realistic Target:** 5-6 months to Play Store launch

---

## Cost Breakdown

**Required:**
- Google Play Developer Account: £20 (one-time)

**Optional (Free Tiers Sufficient for PoC):**
- Firebase: Free (50k reads/day, 20k writes/day, 1GB storage)
- Capacitor: Free (open source)
- Hosting: Free (Firebase Hosting)

**Future Costs (If Scaling):**
- Firebase Blaze: Pay-as-you-go (typical: £5-20/month for 1000+ users)
- Domain: £10-30/year (custom domain)
- Professional icon design: £50-200 (optional, can DIY)

**Total minimum to launch: £20**

---

## Risk Mitigation

**Technical Risks:**
| Risk | Impact | Mitigation |
|------|--------|------------|
| Firebase quota limits | High | Implement aggressive caching, pagination |
| GPS accuracy (rural areas) | Medium | Allow manual override with photo evidence |
| Photo storage costs | Medium | Compress images, set size limits |
| App size bloat | Low | Code splitting, lazy loading |
| Performance on low-end devices | Medium | Test on budget Android phones, optimize early |

**Business Risks:**
| Risk | Impact | Mitigation |
|------|--------|------------|
| Low user adoption | High | Beta test with geocaching communities first |
| Poor data quality | High | Verification system, trust scores |
| Scope creep | Medium | Stick to roadmap, defer configurability if needed |
| Maintenance burden | Medium | Automate deployments, monitoring, backups |

**Contingency Plans:**
- If Firebase costs spike: Migrate to self-hosted PostgreSQL + PostGIS
- If Capacitor performance issues: Migrate to React Native
- If gamification doesn't engage: Focus on research tool market
- If Play Store rejection: Deploy as APK via website (sideload)

---

## Success Metrics (Launch)

**Technical:**
- <2% crash rate
- <3s app startup time
- <500KB initial download (excluding assets)
- 90%+ uptime (Firebase)

**User Engagement:**
- 100 installs in first month
- 50% return after 7 days
- Average 3 postboxes logged per user
- 20% earn at least one badge

**Data Quality:**
- 90%+ submissions include photos
- <5% duplicate rate
- 80%+ GPS accuracy within 10m
- Full provenance chain for all data

---

## Post-Launch Roadmap

**v1.1 (1-2 months post-launch):**
- User registration (email/Google sign-in)
- Profile customization (avatar, bio)
- Export personal data (GDPR compliance)
- Bug fixes from user feedback

**v1.2 (3-4 months):**
- iOS version (Capacitor cross-compile)
- Advanced search/filters
- Map layer controls (satellite, terrain)
- Offline map downloads

**v1.3 (6 months):**
- Configurability framework (Phase 6)
- Community feature templates
- Multi-collection support

**v2.0 (12 months):**
- Machine learning (auto-detect era from photo)
- AR mode (point camera, see nearby boxes)
- Social features (teams, competitions)
- Commercial licensing for orgs

---

## Contact & Attribution

**Project Lead:** Barry Ward  
**Organisation:** Insight Geospatial, Eurotech Marine Data Services Ltd  
**License:** Proprietary - Not for redistribution without written consent  

For inquiries about commercial licensing, partnerships, or custom feature types, contact: [contact info to be added]

---

**Document Version:** 1.0  
**Last Updated:** 2025-02-14  
**Next Review:** 2025-03-14 (monthly)