'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Filter } from 'lucide-react'
import type { CountryIndexEntry, RelationshipLevel } from '@/types/country'
import { LEVEL_LABEL } from '@/lib/relationship-score'

function getLevelColor(level: RelationshipLevel) {
  switch (level) {
    case 'EXCELLENT': return 'text-excellent bg-excellent/10 border-excellent/30'
    case 'GOOD': return 'text-good bg-good/10 border-good/30'
    case 'AVERAGE': return 'text-average bg-average/10 border-average/30'
    case 'POOR': return 'text-poor bg-poor/10 border-poor/30'
    default: return 'text-muted-blue'
  }
}

export function CountryGrid({ initialCountries, initialRegion }: { initialCountries: CountryIndexEntry[]; initialRegion?: string }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLevel, setFilterLevel] = useState('All')
  const [filterRegion, setFilterRegion] = useState(initialRegion && initialCountries.some((c) => c.region === initialRegion) ? initialRegion : 'All')
  const [filterTier, setFilterTier] = useState('All')

  const nonIndia = initialCountries.filter((c) => c.id !== 'india')
  const regions = ['All', ...Array.from(new Set(nonIndia.map((c) => c.region))).sort()]
  const levels = ['All', 'EXCELLENT', 'GOOD', 'AVERAGE', 'POOR']

  const filteredCountries = nonIndia.filter((country) => {
    const q = searchTerm.toLowerCase()
    const matchesSearch =
      country.name.toLowerCase().includes(q) ||
      country.capital.toLowerCase().includes(q) ||
      (country.aliases ?? []).some((a) => a.toLowerCase().includes(q))
    const matchesLevel = filterLevel === 'All' || country.level === filterLevel
    const matchesRegion = filterRegion === 'All' || country.region === filterRegion
    const matchesTier = filterTier === 'All' || country.tier === filterTier
    return matchesSearch && matchesLevel && matchesRegion && matchesTier
  })

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-primary-light p-4 border border-muted-blue/30">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-off-white/50" />
          <input
            type="text"
            placeholder="Search countries or capitals..."
            className="w-full pl-10 pr-4 py-3 bg-primary border border-muted-blue/50 focus:outline-none focus:border-accent text-off-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex w-full md:w-auto gap-4 flex-wrap">
          <div className="relative flex-1 md:flex-none">
            <select
              className="w-full md:w-44 appearance-none pl-4 pr-10 py-3 bg-primary border border-muted-blue/50 focus:outline-none focus:border-accent text-off-white"
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
            >
              {levels.map((l) => <option key={l} value={l}>{l === 'All' ? 'All Relationships' : LEVEL_LABEL[l as RelationshipLevel]}</option>)}
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-off-white/50 pointer-events-none" />
          </div>
          <div className="relative flex-1 md:flex-none">
            <select
              className="w-full md:w-48 appearance-none pl-4 pr-10 py-3 bg-primary border border-muted-blue/50 focus:outline-none focus:border-accent text-off-white"
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
            >
              {regions.map((r) => <option key={r} value={r}>{r === 'All' ? 'All Regions' : r}</option>)}
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-off-white/50 pointer-events-none" />
          </div>
          <div className="relative flex-1 md:flex-none">
            <select
              className="w-full md:w-40 appearance-none pl-4 pr-10 py-3 bg-primary border border-muted-blue/50 focus:outline-none focus:border-accent text-off-white"
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value)}
            >
              <option value="All">All Profiles</option>
              <option value="major">Detailed Profiles</option>
              <option value="standard">Summary Profiles</option>
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-off-white/50 pointer-events-none" />
          </div>
        </div>
      </div>

      <p className="text-sm text-off-white/50">{filteredCountries.length} of {nonIndia.length} countries</p>

      {/* Grid */}
      {filteredCountries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCountries.map((country) => (
            <div key={country.id} className="group flex flex-col bg-primary-light border border-muted-blue/30 overflow-hidden hover:border-accent/50 transition-all duration-300">
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-4xl">{country.flag}</span>
                  <span className={`px-2 py-1 text-xs font-bold tracking-wider border ${getLevelColor(country.level)}`}>
                    {country.overall}/100
                  </span>
                </div>

                <h3 className="text-xl font-bold text-off-white mb-1 group-hover:text-accent transition-colors">
                  {country.name}
                </h3>
                <p className="text-xs text-off-white/50 uppercase tracking-wider mb-1">
                  {country.capital} • {country.region}
                </p>
                <p className="text-xs text-accent/80 font-semibold uppercase tracking-wider mb-4">
                  {LEVEL_LABEL[country.level]} — {country.status}
                </p>

                <p className="text-sm text-off-white/70 line-clamp-3 mb-6 flex-1">
                  {country.shortSummary}
                </p>

                <Link href={`/countries/${country.id}`} className="mt-auto w-full py-3 bg-primary border border-muted-blue hover:border-accent hover:text-accent text-off-white text-sm font-bold transition-all text-center">
                  EXPLORE RELATIONSHIP
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-xl text-off-white/50">No countries match your search and filters.</p>
          <button
            onClick={() => { setSearchTerm(''); setFilterLevel('All'); setFilterRegion('All'); setFilterTier('All') }}
            className="mt-4 text-accent hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
