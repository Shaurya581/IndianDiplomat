import type { Country, CountryIndexEntry } from '@/types/country'
import countriesIndexData from '@/data/countries-index.json'

export const countriesIndex = countriesIndexData as CountryIndexEntry[]

export function getCountryIndex(): CountryIndexEntry[] {
  return countriesIndex
}

export function getMajorCountries(): CountryIndexEntry[] {
  return countriesIndex.filter((c) => c.tier === 'major')
}

export function getCountriesByRegion(region: string): CountryIndexEntry[] {
  return countriesIndex.filter((c) => c.region === region)
}

export const REGIONS = Array.from(new Set(countriesIndex.map((c) => c.region))).sort()

/** Full country record, code-split per id so the ~195-country dataset never
 *  ships in one bundle. Returns null for unknown ids instead of throwing. */
export async function getCountry(id: string): Promise<Country | null> {
  try {
    const mod = await import(`@/data/countries/${id}.json`)
    return (mod.default ?? mod) as Country
  } catch {
    return null
  }
}

export async function getAllCountriesFull(): Promise<Country[]> {
  const modules = await Promise.all(
    countriesIndex.map((c) => import(`@/data/countries/${c.id}.json`))
  )
  return modules.map((m) => (m.default ?? m) as Country)
}

/** Only the ~50+ Level 2 ("major") countries — the ones with historical
 *  events, agreements and recent developments. Much lighter than loading
 *  the full 195-country set. */
export async function getMajorCountriesFull(): Promise<Country[]> {
  const majorIds = countriesIndex.filter((c) => c.tier === 'major').map((c) => c.id)
  const modules = await Promise.all(majorIds.map((id) => import(`@/data/countries/${id}.json`)))
  return modules.map((m) => (m.default ?? m) as Country)
}
