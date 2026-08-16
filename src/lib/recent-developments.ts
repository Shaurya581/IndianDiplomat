import { getMajorCountriesFull } from './country-data'
import type { RecentDevelopment } from '@/types/country'

export interface RecentDevelopmentWithCountry extends RecentDevelopment {
  countryId: string
  countryName: string
  countryFlag: string
}

function dateKey(d: string) {
  // Dates are stored as "YYYY", "YYYY-MM" or "YYYY-MM-DD" — pad so string
  // comparison sorts chronologically.
  return d.length === 4 ? `${d}-13` : d.length === 7 ? `${d}-32` : d
}

export async function getRecentDevelopments(limit = 6): Promise<RecentDevelopmentWithCountry[]> {
  const countries = await getMajorCountriesFull()
  const all: RecentDevelopmentWithCountry[] = countries.flatMap((c) =>
    c.recentDevelopments.map((d) => ({ ...d, countryId: c.id, countryName: c.name, countryFlag: c.flag }))
  )
  return all.sort((a, b) => dateKey(b.date).localeCompare(dateKey(a.date))).slice(0, limit)
}

export async function countTotalEvents(): Promise<number> {
  const countries = await getMajorCountriesFull()
  return countries.reduce((sum, c) => sum + c.historicalEvents.length, 0)
}
