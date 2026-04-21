# Momentum Next Steps

© 2025 Insight Geospatial, Eurotech Marine Data Services Ltd. All rights reserved.

## North Star

Build a field app that feels like geocaching meets Pokemon Go while quietly producing a provenance-aware, research-grade heritage postbox dataset.

That means every release should improve at least one of these:

- Field delight: easier, more rewarding discovery and collection.
- Data trust: better evidence, traceability, and reviewability.
- Network effects: stronger community visibility, shared standards, and repeat participation.

## What Just Improved

The current deployable app now captures lightweight curation metadata alongside each find:

- verification status
- evidence source
- survey confidence
- GPS accuracy carried from device location
- freeform research notes
- automatic quality score and quality tier

This is the first real bridge between a fun discovery app and a dataset that researchers can filter and trust.

## Recommended Work Queue

### 1. Review Workflow

Add a curator-facing filter/screen for:

- `Research Ready`
- `Needs Review`
- `Needs Follow-up`

Then support one-tap promotion from community submission to reviewed record.

Why this matters:
Without a review loop, richer metadata still piles up as raw submissions rather than becoming a curated database.

### 2. Discovery Loop

Add map-driven collection goals:

- nearby unlogged targets
- streaks for consecutive survey days
- county or era progress bars
- first-in-area bonuses

Why this matters:
This is the shortest path toward the geocaching / Pokemon Go feel without needing a full native rebuild.

### 3. Research Export

Create a simple export path for researchers and stakeholders:

- CSV or JSON export
- include provenance fields and quality score
- filter by review status, era, county, or confidence

Why this matters:
Interested parties will want evidence that the dataset is becoming usable, not just larger.

## Operating Rule

For the next few iterations, prioritize features that improve both engagement and curation at the same time. If a feature is only fun or only administrative, it should usually come after dual-purpose work.
