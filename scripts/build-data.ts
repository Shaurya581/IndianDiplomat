// One-off build script: merges the raw data sources into the final
// per-country JSON files consumed by the app (src/data/countries/*.json)
// plus the lightweight index (src/data/countries-index.json).
//
// Run with: npx tsx scripts/build-data.ts

import fs from 'fs'
import path from 'path'
import { worldIndex } from '../src/data/raw/world-index'
import { countries as majorSource, type CountryRecord, type Category } from '../src/data/raw/major-source'
import { majorOverrides } from '../src/data/raw/major-overrides'
import { standardCountries } from '../src/data/raw/standard-countries'
import { computeOverall, levelFromScore } from '../src/lib/relationship-score'
import type {
  Country, RelationshipDimensions, SourceRef, SourceType, HistoricalEvent,
  Agreement, DefenceCooperation, MultilateralRelation, Note, CooperationArea, Leader,
} from '../src/types/country'

const OUT_DIR = path.join(__dirname, '..', 'src', 'data', 'countries')
const INDEX_PATH = path.join(__dirname, '..', 'src', 'data', 'countries-index.json')
const SEARCH_INDEX_PATH = path.join(__dirname, '..', 'src', 'data', 'search-index.json')

function inferSourceType(name: string): SourceType {
  if (/ministry|government|embassy|press information bureau/i.test(name)) return 'government'
  if (/united nations|world bank|imf|wto|oecd|iaea|who/i.test(name)) return 'international-org'
  return 'research'
}

function toSourceRef([name, url, description]: [string, string | null, string]): SourceRef {
  return { title: description || name, publisher: name, url: url ?? undefined, type: inferSourceType(name) }
}

// The India profile itself — not a bilateral relationship, so it's handled
// as a special case with a fixed, maximal "self" score rather than running
// through the relationship-scoring machinery.
function buildIndiaProfile(): Country {
  const worldEntry = worldIndex.find((w) => w.id === 'india')!
  return {
    id: 'india',
    name: 'India',
    officialName: 'Republic of India',
    capital: worldEntry.capital,
    region: worldEntry.region,
    subregion: worldEntry.subregion,
    flag: worldEntry.flag,
    iso2: worldEntry.iso2,
    iso3: worldEntry.iso3,
    tier: 'major',
    relationship: {
      overall: 100,
      level: 'EXCELLENT',
      status: 'Strategic Partner',
      dimensions: { diplomatic: 100, strategic: 100, economic: 100, defence: 100, political: 100, technology: 100, energy: 100, peopleToPeople: 100, multilateral: 100, momentum: 100 },
    },
    shortSummary: 'India is the world\'s most populous country and largest democracy, pursuing a foreign policy of strategic autonomy and multi-alignment — deepening ties with the United States, Europe, Japan and Australia through the QUAD while sustaining historic partnerships with Russia, and positioning itself as a leading voice of the Global South.',
    diplomaticRelationsEstablished: undefined,
    majorAreasOfCooperation: [],
    majorChallenges: [],
    recentDevelopments: [],
    historicalEvents: [],
    agreements: [],
    defenceCooperation: [],
    trade: null,
    multilateralRelations: [
      { organization: 'QUAD', detail: 'Founding member alongside the United States, Japan and Australia.' },
      { organization: 'BRICS', detail: 'Founding member.' },
      { organization: 'G20', detail: 'Member; hosted the presidency in 2023.' },
      { organization: 'SCO', detail: 'Member of the Shanghai Cooperation Organisation.' },
    ],
    leaders: [{ name: 'Narendra Modi', position: 'Prime Minister of India', isIndian: true }],
    sources: [
      { title: 'Ministry of External Affairs', publisher: 'Government of India', url: 'https://mea.gov.in', type: 'government' },
    ],
    lastVerified: '2026-08-15',
    lastMajorUpdate: '2026-08-15',
  }
}

function buildMajorCountry(rec: CountryRecord): Country {
  const worldEntry = worldIndex.find((w) => w.id === rec.id)
  if (!worldEntry) throw new Error(`No world-index entry for major country: ${rec.id}`)
  const override = majorOverrides[rec.id]
  if (!override) throw new Error(`No override entry for major country: ${rec.id}`)

  const dimensions: RelationshipDimensions = {
    diplomatic: rec.sub.dip,
    strategic: rec.sub.strat,
    economic: rec.sub.eco,
    defence: rec.sub.def,
    political: override.political,
    technology: rec.sub.tech,
    energy: override.energy,
    peopleToPeople: rec.sub.ppl,
    multilateral: override.multilateral,
    momentum: override.momentum,
  }
  const overall = computeOverall(dimensions)
  const level = levelFromScore(overall)

  const historicalEvents: HistoricalEvent[] = rec.events.map(([year, title, category, description, impact]) => ({
    year, title, category: category as Category, description, impact,
  }))
  const agreements: Agreement[] = rec.agreements.map(([name, year, category, description, status]) => ({
    name, year, category, description, status,
  }))
  const defenceCooperation: DefenceCooperation[] = rec.defence.map(([name, type, description]) => ({ name, type, description }))
  const multilateralRelations: MultilateralRelation[] = rec.multilateral.map(([organization, detail]) => ({ organization, detail }))
  const majorChallenges: Note[] = rec.challenges.map(([title, description]) => ({ title, description }))
  const majorAreasOfCooperation: CooperationArea[] = rec.cooperation.map(([area, description]) => ({ area, description }))
  const leaders: Leader[] = rec.leaders.map(([name, position, isIndian]) => ({ name, position, isIndian }))
  const sources: SourceRef[] = rec.sources.map(toSourceRef)
  const recentDevelopments = override.recentDevelopments.map((d) => ({ ...d }))

  return {
    id: rec.id,
    name: rec.name,
    officialName: worldEntry.officialName,
    capital: rec.capital,
    region: rec.region,
    subregion: worldEntry.subregion,
    flag: rec.flag,
    iso2: worldEntry.iso2,
    iso3: worldEntry.iso3,
    tier: 'major',
    relationship: { overall, level, status: override.status, dimensions },
    shortSummary: rec.summary,
    complexity: rec.complexity,
    diplomaticRelationsEstablished: override.diplomaticRelationsEstablished,
    majorAreasOfCooperation,
    majorChallenges,
    recentDevelopments,
    historicalEvents,
    agreements,
    defenceCooperation,
    trade: rec.trade ? {
      exports: rec.trade.exports, imports: rec.trade.imports, total: rec.trade.total,
      dataYear: 'Recent FY (approximate)',
      majorExports: rec.trade.majorExports, majorImports: rec.trade.majorImports, majorSectors: rec.trade.majorSectors,
    } : null,
    multilateralRelations,
    leaders,
    sources,
    lastVerified: '2026-08-15',
    lastMajorUpdate: '2026-08-10',
    aliases: rec.id === 'turkiye' ? ['Turkey'] : undefined,
  }
}

function buildStandardCountry(id: string): Country {
  const worldEntry = worldIndex.find((w) => w.id === id)!
  const std = standardCountries.find((s) => s.id === id)!

  const level = levelFromScore(std.overall)
  // Standard-tier countries don't have hand-tuned 10-axis breakdowns; the
  // dashboard/compare views only need the overall + level for these, so the
  // dimensions are populated at a flat baseline matching the overall score.
  const dimensions: RelationshipDimensions = {
    diplomatic: std.overall, strategic: std.overall, economic: std.overall, defence: std.overall,
    political: std.overall, technology: std.overall, energy: std.overall, peopleToPeople: std.overall,
    multilateral: std.overall, momentum: std.overall,
  }

  return {
    id,
    name: worldEntry.name,
    officialName: worldEntry.officialName,
    capital: worldEntry.capital,
    region: worldEntry.region,
    subregion: worldEntry.subregion,
    flag: worldEntry.flag,
    iso2: worldEntry.iso2,
    iso3: worldEntry.iso3,
    tier: 'standard',
    relationship: { overall: std.overall, level, status: std.status, dimensions },
    shortSummary: std.summary,
    diplomaticRelationsEstablished: std.diplomaticRelationsEstablished,
    majorAreasOfCooperation: std.cooperation.map(([area, description]) => ({ area, description })),
    majorChallenges: std.challenges.map(([title, description]) => ({ title, description })),
    recentDevelopments: [],
    historicalEvents: [],
    agreements: [],
    defenceCooperation: [],
    trade: null,
    multilateralRelations: [],
    leaders: [],
    sources: [
      { title: 'Bilateral brief', publisher: 'Ministry of External Affairs, Government of India', url: 'https://mea.gov.in', type: 'government' },
    ],
    lastVerified: '2026-08-15',
    lastMajorUpdate: '2026-08-15',
    aliases: std.aliases,
  }
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true })

  const all: Country[] = []
  all.push(buildIndiaProfile())
  for (const rec of majorSource) all.push(buildMajorCountry(rec))
  for (const std of standardCountries) all.push(buildStandardCountry(std.id))

  if (all.length !== worldIndex.length) {
    throw new Error(`Count mismatch: built ${all.length} countries, world index has ${worldIndex.length}`)
  }

  for (const country of all) {
    fs.writeFileSync(path.join(OUT_DIR, `${country.id}.json`), JSON.stringify(country, null, 2))
  }

  const index = all
    .map((c) => ({
      id: c.id, name: c.name, flag: c.flag, capital: c.capital, region: c.region, subregion: c.subregion,
      tier: c.tier, overall: c.relationship.overall, level: c.relationship.level, status: c.relationship.status,
      shortSummary: c.shortSummary,
      aliases: c.aliases,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

  fs.writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2))

  // Flat search index over events / agreements / leaders across the major
  // (Level 2) countries — the only ones with this kind of granular data.
  // Built once at data-build time so search never needs a database.
  type SearchRow = { type: 'event' | 'agreement' | 'leader'; title: string; subtitle: string; year?: number; countryId: string; countryName: string; countryFlag: string }
  const searchRows: SearchRow[] = []
  for (const c of all) {
    for (const e of c.historicalEvents) {
      searchRows.push({ type: 'event', title: e.title, subtitle: e.description, year: e.year, countryId: c.id, countryName: c.name, countryFlag: c.flag })
    }
    for (const a of c.agreements) {
      searchRows.push({ type: 'agreement', title: a.name, subtitle: a.description, year: a.year, countryId: c.id, countryName: c.name, countryFlag: c.flag })
    }
    for (const l of c.leaders) {
      searchRows.push({ type: 'leader', title: l.name, subtitle: l.position, countryId: c.id, countryName: c.name, countryFlag: c.flag })
    }
  }
  fs.writeFileSync(SEARCH_INDEX_PATH, JSON.stringify(searchRows, null, 2))

  console.log(`Wrote ${all.length} country files to ${OUT_DIR}`)
  console.log(`Wrote index (${index.length} entries) to ${INDEX_PATH}`)
  console.log(`Wrote search index (${searchRows.length} rows) to ${SEARCH_INDEX_PATH}`)
}

main()
