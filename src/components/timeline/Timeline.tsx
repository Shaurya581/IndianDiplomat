'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

export type TimelineEvent = {
  id: string
  year: number
  title: string
  category: string
  description: string
  impact: string | null
  country: { id: string; name: string; flag: string }
}

const CATEGORIES = ['Diplomacy', 'Trade', 'Defence', 'Technology', 'Energy', 'Security', 'Treaty', 'Summit', 'Conflict'] as const

const CATEGORY_COLOR: Record<string, string> = {
  Conflict: 'bg-poor/15 text-poor border-poor/30',
  Security: 'bg-poor/15 text-poor border-poor/30',
  Treaty: 'bg-accent/15 text-accent border-accent/30',
  Summit: 'bg-accent/15 text-accent border-accent/30',
  Trade: 'bg-good/15 text-good border-good/30',
  Technology: 'bg-good/15 text-good border-good/30',
  Energy: 'bg-average/15 text-average border-average/30',
  Defence: 'bg-muted-blue/40 text-off-white/80 border-muted-blue',
  Diplomacy: 'bg-muted-blue/40 text-off-white/80 border-muted-blue',
}

type SortOrder = 'asc' | 'desc'

export function Timeline({ events }: { events: TimelineEvent[] }) {
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set())
  const [sort, setSort] = useState<SortOrder>('asc')
  const [countryFilter, setCountryFilter] = useState('All')

  const countries = useMemo(() => {
    const map = new Map<string, { id: string; name: string; flag: string }>()
    events.forEach((e) => map.set(e.country.id, e.country))
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name))
  }, [events])

  const toggleCategory = (cat: string) => {
    setActiveCategories((prev) => {
      const next = new Set(prev)
      if (next.has(cat)) next.delete(cat)
      else next.add(cat)
      return next
    })
  }

  const filtered = useMemo(() => {
    let list = events
    if (activeCategories.size > 0) {
      list = list.filter((e) => activeCategories.has(e.category))
    }
    if (countryFilter !== 'All') {
      list = list.filter((e) => e.country.id === countryFilter)
    }
    return [...list].sort((a, b) => (sort === 'asc' ? a.year - b.year : b.year - a.year))
  }, [events, activeCategories, countryFilter, sort])

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-4 mb-12 bg-primary-light p-4 border border-muted-blue/30">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const active = activeCategories.has(cat)
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`text-xs font-bold uppercase tracking-wide px-3 py-1.5 border transition-colors ${
                  active ? 'bg-accent text-primary border-accent' : 'bg-transparent text-off-white/70 border-muted-blue/50 hover:border-accent/50'
                }`}
              >
                {cat}
              </button>
            )
          })}
          {activeCategories.size > 0 && (
            <button
              onClick={() => setActiveCategories(new Set())}
              className="text-xs font-bold uppercase tracking-wide px-3 py-1.5 text-off-white/50 hover:text-off-white"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-4 items-center pt-2 border-t border-muted-blue/20">
          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="bg-primary border border-muted-blue/50 px-3 py-2 text-sm text-off-white focus:outline-none focus:border-accent"
          >
            <option value="All">All Countries</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>{c.flag} {c.name}</option>
            ))}
          </select>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-off-white/50">Sort:</span>
            <button
              onClick={() => setSort('asc')}
              className={`px-3 py-1.5 border text-xs font-bold uppercase ${sort === 'asc' ? 'border-accent text-accent' : 'border-muted-blue/50 text-off-white/60'}`}
            >
              Oldest first
            </button>
            <button
              onClick={() => setSort('desc')}
              className={`px-3 py-1.5 border text-xs font-bold uppercase ${sort === 'desc' ? 'border-accent text-accent' : 'border-muted-blue/50 text-off-white/60'}`}
            >
              Newest first
            </button>
          </div>

          <span className="ml-auto text-xs text-off-white/40">{filtered.length} events</span>
        </div>
      </div>

      {/* Events */}
      {filtered.length === 0 ? (
        <p className="text-off-white/50 text-center py-20">No events match the selected filters.</p>
      ) : (
        <div className="relative border-l-2 border-muted-blue/30 ml-3 md:ml-4 space-y-10">
          {filtered.map((event) => (
            <div key={event.id} className="relative pl-8">
              <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-accent border-4 border-primary"></div>
              <div className="flex flex-wrap items-baseline gap-3 mb-2">
                <span className="text-2xl font-heading font-bold text-accent">{event.year}</span>
                <span className={`text-xs px-2 py-1 border ${CATEGORY_COLOR[event.category] || 'border-muted-blue text-off-white/70'}`}>
                  {event.category}
                </span>
                <Link href={`/countries/${event.country.id}`} className="text-sm text-off-white/60 hover:text-accent transition-colors">
                  {event.country.flag} {event.country.name}
                </Link>
              </div>
              <h4 className="text-xl font-bold mb-2 text-off-white">{event.title}</h4>
              <p className="text-off-white/80 leading-relaxed max-w-3xl">{event.description}</p>
              {event.impact && (
                <p className="mt-3 text-sm text-off-white/60 max-w-3xl"><strong className="text-off-white/80">Impact:</strong> {event.impact}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
