import { countriesIndex } from './country-data'
import type { CountryMapData } from '@/components/map/WorldMapCore'

export function getMapData(): CountryMapData[] {
  return countriesIndex
    .filter((c) => c.id !== 'india')
    .map((c) => ({ id: c.id, name: c.name, level: c.level, score: c.overall }))
}
