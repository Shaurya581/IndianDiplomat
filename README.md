# Indian Diplomatic Relations

India's relationships with the world — mapped, explained and contextualized.

An interactive reference covering India's diplomatic ties with all 195 UN member states plus Palestine and the Holy See, with significantly deeper coverage (full diplomatic history, agreements, trade, defence, recent developments) for 50+ of India's most closely tracked relationships.

## Stack

- **Next.js 16** (App Router, Turbopack) + TypeScript + Tailwind CSS 4
- **Data**: static, versioned TypeScript/JSON — no database required
- **Map**: `react-simple-maps` over a bundled world-atlas TopoJSON
- **Charts**: Recharts

The app is fully static-data driven — every country's full profile is a code-split JSON file under `src/data/countries/`, generated from the sources in `src/data/raw/` by `scripts/build-data.ts`. There is no runtime database dependency.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # eslint
```

No environment variables are required to run or build this app.

## Updating country data

Country data lives in `src/data/raw/`:

- `world-index.ts` — geography (capital, region, ISO codes) for all ~195 entities
- `major-source.ts` — full Level 2 detail (history, agreements, trade, etc.) for the 50+ major countries
- `major-overrides.ts` — the newer scoring dimensions, status labels and recent developments for major countries
- `standard-countries.ts` — Level 1 summary profiles for the remaining countries

After editing any of these, regenerate the derived data:

```bash
npm run build:data
```

This writes `src/data/countries/*.json`, `src/data/countries-index.json` and `src/data/search-index.json` — all committed to the repo and consumed directly by the app at build time.

## Deploying to Vercel

This is a standard Next.js App Router project — connect the repo in Vercel and deploy with the default settings. No custom `vercel.json` or environment variables are needed.

## Data disclaimer

Relationship classifications are an independent analytical index based on publicly available information — not an official rating from the Government of India or any other government. See `/methodology` in the running app for the scoring framework and source-priority tiers.
