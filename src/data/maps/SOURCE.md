# India boundary data — provenance

## What this is

`india-political.json` — India's national outline following the Survey-of-India
territorial convention (i.e. depicting the full extent of Jammu & Kashmir,
Ladakh, Aksai Chin, and Arunachal Pradesh as part of India, per India's
official maps), simplified for web use.

`india-disputed.json` — the subset of that territory India claims but does
not administer: Pakistan-administered Jammu & Kashmir (Azad Kashmir +
Gilgit-Baltistan, all 17 districts) and the Shaksgam Tract. Rendered as an
overlay so it can be styled distinctly (hatched) from India-administered
territory on the map.

## Source chain

- **Primary source**: [DataMeet Maps](https://github.com/datameet/maps) — the
  long-standing open-data community reference for Indian administrative
  boundaries. Original feature properties on the unsimplified national
  boundary read `"Source": "Survey of India State Map, Datameet"`.
- **Disputed-territory files**: `pok-districts-alhasan.geojson` (Alhasan
  Systems, Pakistan district-level data for Azad Kashmir / Gilgit-Baltistan)
  and `shaksgam-ne.geojson`, both re-published in the same DataMeet-sourced
  collection.
- **Retrieved via**: the
  [india-geodata](https://github.com/yashveeeeeeer/india-geodata) aggregation
  project (`data/administrative/country/india-soi.geojson` and
  `data/administrative/country/disputed/`), which converts and re-publishes
  the DataMeet dataset with clear per-file source metadata.
- **License**: CC BY 4.0 — DataMeet Community.

## Why not Survey of India's own vector product directly

Survey of India's free public downloads
(https://surveyofindia.gov.in/pages/political-map-of-india) are raster
PDF/image maps, not vector geometry. Survey of India's actual vector boundary
products (shapefile/geodatabase) are sold through a paid "Geospatial Data
Catalogue," not distributed as free, redistributable open data — so they
cannot be legally bundled into an open web build. The DataMeet dataset used
here is the closest openly-licensed source that is explicitly built to follow
the Survey of India convention rather than a neutral/foreign one (this is
what "SOI" in the source filename refers to), and is the de facto standard
reference for this purpose in the Indian open-data/civic-tech community.

## Processing

Both files were simplified from the original DataMeet geometry (the national
boundary was ~12.3 MB unsimplified) using `mapshaper` (Douglas-Peucker,
topology-preserving), to keep the bundle size reasonable for a web map. The
simplification preserves the full territorial extent — verified by comparing
bounding boxes before/after (unchanged: 68.19–97.42°E, 6.76–37.08°N, matching
Arunachal Pradesh in the east, Indira Point/Nicobar in the south, and the
Aksai Chin/Shaksgam claim line in the north).

```bash
npx mapshaper india-soi.geojson \
  -simplify dp 3% keep-shapes -clean \
  -o format=geojson precision=0.0005 india-political.json

npx mapshaper pok-districts-alhasan.geojson shaksgam-ne.geojson combine-files \
  -each 'this.properties = {name: "disputed"}' \
  -merge-layers force -dissolve \
  -simplify dp 5% keep-shapes -clean \
  -o format=geojson precision=0.0005 geojson-type=FeatureCollection india-disputed.json
```

**Important — ring winding.** The raw DataMeet source stores every polygon ring
clockwise (the opposite of the RFC 7946 "exterior ring counterclockwise"
convention). `mapshaper` silently reorients rings to RFC 7946-compliant
counterclockwise on import/export. That reorientation breaks `d3-geo`'s
Mercator clipping for this specific multi-part geometry — it renders as a
single runaway shape covering most of the projected plane instead of India's
actual outline (verified directly against `d3-geo`'s `path.bounds()`, with
and without the reorientation, independent of React/react-simple-maps). After
running mapshaper, every ring in both output files is therefore reversed
(`ring.reverse()`) to restore the original clockwise winding before being
committed. If this data is ever regenerated, re-run that reversal step and
confirm with:

```js
const d3geo = require('d3-geo')
const path = d3geo.geoPath().projection(d3geo.geoMercator().scale(120).translate([400, 300]).center([0, 0]))
console.log(path.bounds(require('./india-political.json').features[0]))
// Correct: roughly [[543, 216], [604, 286]]. Broken (needs rewinding): [[23, -77], [777, 677]].
```

Retrieved and processed 2026-08-15.
