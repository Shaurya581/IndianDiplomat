import { countriesIndex } from './country-data'
import searchIndexData from '@/data/search-index.json'

export type SearchRow = {
  type: 'event' | 'agreement' | 'leader'
  title: string
  subtitle: string
  year?: number
  countryId: string
  countryName: string
  countryFlag: string
}

const searchIndex = searchIndexData as SearchRow[]

export interface SearchResults {
  countries: { id: string; name: string; flag: string; capital: string; region: string }[]
  events: SearchRow[]
  agreements: SearchRow[]
  leaders: SearchRow[]
}

export function search(query: string, limit = 8): SearchResults {
  const q = query.trim().toLowerCase()
  if (q.length < 2) return { countries: [], events: [], agreements: [], leaders: [] }

  const countries = countriesIndex
    .filter((c) =>
      c.name.toLowerCase().includes(q) ||
      c.capital.toLowerCase().includes(q) ||
      c.region.toLowerCase().includes(q) ||
      (c.aliases ?? []).some((a) => a.toLowerCase().includes(q))
    )
    .slice(0, limit)
    .map((c) => ({ id: c.id, name: c.name, flag: c.flag, capital: c.capital, region: c.region }))

  const matches = (row: SearchRow) => row.title.toLowerCase().includes(q) || row.subtitle.toLowerCase().includes(q)

  const events = searchIndex.filter((r) => r.type === 'event' && matches(r)).slice(0, limit)
  const agreements = searchIndex.filter((r) => r.type === 'agreement' && matches(r)).slice(0, limit)
  const leaders = searchIndex.filter((r) => r.type === 'leader' && matches(r)).slice(0, limit)

  return { countries, events, agreements, leaders }
}
