// Core data model for INDIAN DIPLOMATIC RELATIONS.
//
// Two tiers of coverage:
//   - "major"    (~50+ countries): full Level 2 detail — history, agreements,
//                 trade, defence, recent developments, etc.
//   - "standard" (remaining ~140 countries): Level 1 profile only — the
//                 fields every country has, kept honest and concise.
//
// Nothing here should be populated with invented specifics. Where a precise
// fact (a date, a figure, an agreement name) isn't confidently verifiable,
// the corresponding field is omitted or the text says so explicitly rather
// than estimating.

export type RelationshipLevel = 'EXCELLENT' | 'GOOD' | 'AVERAGE' | 'POOR'

export type RelationshipStatus =
  | 'Strategic Partner'
  | 'Strong Partner'
  | 'Cooperative'
  | 'Developing'
  | 'Balanced'
  | 'Complex'
  | 'Strained'
  | 'Adversarial'

export type SourceType = 'government' | 'international-org' | 'research' | 'news'

export interface SourceRef {
  title: string
  publisher: string
  url?: string
  /** Date the underlying event/document occurred, if applicable. */
  date?: string
  type: SourceType
}

/** The ten weighted dimensions behind the overall analytical score. */
export interface RelationshipDimensions {
  diplomatic: number   // 15%
  strategic: number    // 15%
  economic: number     // 15%
  defence: number      // 15%
  political: number    // 10%
  technology: number   // 10%
  energy: number        // 5%
  peopleToPeople: number // 5%
  multilateral: number   // 5%
  momentum: number       // 5%
}

export interface RelationshipScore {
  overall: number
  level: RelationshipLevel
  /** Qualitative label shown alongside the level, e.g. "GOOD — COMPLEX". */
  status: RelationshipStatus
  dimensions: RelationshipDimensions
}

export interface HistoricalEvent {
  year: number
  date?: string
  title: string
  category: EventCategory
  description: string
  impact?: string
  source?: SourceRef
}

export type EventCategory =
  | 'Diplomacy' | 'Trade' | 'Defence' | 'Technology'
  | 'Energy' | 'Security' | 'Treaty' | 'Summit' | 'Conflict'

export interface Agreement {
  name: string
  year: number
  category: string
  status?: string
  description: string
  significance?: string
  source?: SourceRef
}

export interface DefenceCooperation {
  name: string
  type: string
  description: string
}

export interface TradeData {
  exports: string
  imports: string
  total: string
  dataYear: string
  majorExports: string
  majorImports: string
  majorSectors: string
  investment?: string
  trend?: string
  source?: SourceRef
}

export interface RecentDevelopment {
  date: string
  title: string
  description: string
  whyItMatters: string
  source?: SourceRef
}

export interface Note {
  title: string
  description: string
}

export interface CooperationArea {
  area: string
  description: string
}

export interface Leader {
  name: string
  position: string
  isIndian: boolean
}

export interface MultilateralRelation {
  organization: string
  detail: string
}

export interface Country {
  id: string
  name: string
  officialName?: string
  capital: string
  region: string
  subregion: string
  flag: string
  iso2: string
  iso3: string
  tier: 'major' | 'standard'

  relationship: RelationshipScore
  shortSummary: string
  complexity?: string

  diplomaticRelationsEstablished?: string

  majorAreasOfCooperation: CooperationArea[]
  majorChallenges: Note[]
  recentDevelopments: RecentDevelopment[]

  // Level 2 (major countries) only — empty arrays / null for standard tier.
  historicalEvents: HistoricalEvent[]
  agreements: Agreement[]
  defenceCooperation: DefenceCooperation[]
  trade: TradeData | null
  technologyCooperation?: string
  energyCooperation?: string
  spaceCooperation?: string
  multilateralRelations: MultilateralRelation[]
  leaders: Leader[]

  sources: SourceRef[]
  lastVerified: string
  lastMajorUpdate: string

  /** Alternate names/spellings the search index should also match (e.g. "Turkey" for Türkiye). */
  aliases?: string[]
}

export interface CountryIndexEntry {
  id: string
  name: string
  flag: string
  capital: string
  region: string
  subregion: string
  tier: 'major' | 'standard'
  overall: number
  level: RelationshipLevel
  status: RelationshipStatus
  shortSummary: string
  aliases?: string[]
}
