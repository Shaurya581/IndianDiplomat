'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, Globe, CalendarClock, FileSignature, User } from 'lucide-react'
import type { SearchResults } from '@/lib/search'

const EMPTY: SearchResults = { countries: [], events: [], agreements: [], leaders: [] }

// Mounted by the parent only while open, so every open is a fresh instance —
// no need to reset state via an effect when closing.
export function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResults>(EMPTY)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (query.trim().length < 2) return
    const handle = setTimeout(() => {
      setLoading(true)
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then((r) => r.json())
        .then((data) => setResults(data))
        .finally(() => setLoading(false))
    }, 250)
    return () => clearTimeout(handle)
  }, [query])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const effectiveResults = query.trim().length < 2 ? EMPTY : results
  const totalResults = effectiveResults.countries.length + effectiveResults.events.length + effectiveResults.agreements.length + effectiveResults.leaders.length

  function go(path: string) {
    onClose()
    router.push(path)
  }

  return (
    <div className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-sm flex items-start justify-center pt-24 px-4" onClick={onClose}>
      <div className="w-full max-w-2xl bg-primary-light border border-muted-blue/50 max-h-[70vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 p-4 border-b border-muted-blue/30">
          <Search className="h-5 w-5 text-off-white/50 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query.trim().length >= 2) go(`/search?q=${encodeURIComponent(query)}`)
            }}
            placeholder="Search countries, events, agreements, leaders... (try Turkey)"
            className="flex-1 bg-transparent outline-none text-off-white placeholder:text-off-white/40"
          />
          <button onClick={onClose} aria-label="Close search" className="text-off-white/50 hover:text-off-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          {loading && <p className="p-4 text-sm text-off-white/40">Searching...</p>}

          {!loading && query.trim().length >= 2 && totalResults === 0 && (
            <p className="p-4 text-sm text-off-white/40">No results for &ldquo;{query}&rdquo;.</p>
          )}

          {!loading && effectiveResults.countries.length > 0 && (
            <div className="p-2">
              <p className="px-2 py-1 text-xs font-bold uppercase tracking-wider text-off-white/40 flex items-center gap-1.5"><Globe className="h-3.5 w-3.5" /> Countries</p>
              {effectiveResults.countries.map((c) => (
                <button key={c.id} onClick={() => go(`/countries/${c.id}`)} className="w-full text-left flex items-center gap-3 px-2 py-2 hover:bg-primary transition-colors">
                  <span className="text-xl">{c.flag}</span>
                  <span className="text-off-white text-sm">{c.name}</span>
                  <span className="text-xs text-off-white/40">{c.capital}</span>
                </button>
              ))}
            </div>
          )}

          {!loading && effectiveResults.events.length > 0 && (
            <div className="p-2 border-t border-muted-blue/20">
              <p className="px-2 py-1 text-xs font-bold uppercase tracking-wider text-off-white/40 flex items-center gap-1.5"><CalendarClock className="h-3.5 w-3.5" /> Events</p>
              {effectiveResults.events.map((e, i) => (
                <button key={i} onClick={() => go(`/countries/${e.countryId}`)} className="w-full text-left flex items-center gap-3 px-2 py-2 hover:bg-primary transition-colors">
                  <span className="text-xs text-accent font-semibold w-12 flex-shrink-0">{e.year}</span>
                  <span className="text-off-white text-sm flex-1">{e.title}</span>
                  <span className="text-xs text-off-white/40">{e.countryFlag}</span>
                </button>
              ))}
            </div>
          )}

          {!loading && effectiveResults.agreements.length > 0 && (
            <div className="p-2 border-t border-muted-blue/20">
              <p className="px-2 py-1 text-xs font-bold uppercase tracking-wider text-off-white/40 flex items-center gap-1.5"><FileSignature className="h-3.5 w-3.5" /> Agreements</p>
              {effectiveResults.agreements.map((a, i) => (
                <button key={i} onClick={() => go(`/countries/${a.countryId}`)} className="w-full text-left flex items-center gap-3 px-2 py-2 hover:bg-primary transition-colors">
                  <span className="text-xs text-accent font-semibold w-12 flex-shrink-0">{a.year}</span>
                  <span className="text-off-white text-sm flex-1">{a.title}</span>
                  <span className="text-xs text-off-white/40">{a.countryFlag}</span>
                </button>
              ))}
            </div>
          )}

          {!loading && effectiveResults.leaders.length > 0 && (
            <div className="p-2 border-t border-muted-blue/20">
              <p className="px-2 py-1 text-xs font-bold uppercase tracking-wider text-off-white/40 flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> Leaders</p>
              {effectiveResults.leaders.map((l, i) => (
                <button key={i} onClick={() => go(`/countries/${l.countryId}`)} className="w-full text-left flex items-center gap-3 px-2 py-2 hover:bg-primary transition-colors">
                  <span className="text-off-white text-sm flex-1">{l.title}</span>
                  <span className="text-xs text-off-white/40">{l.subtitle}</span>
                </button>
              ))}
            </div>
          )}

          {query.trim().length >= 2 && totalResults > 0 && (
            <button
              onClick={() => go(`/search?q=${encodeURIComponent(query)}`)}
              className="w-full text-center py-3 text-xs font-bold uppercase tracking-wider text-accent hover:bg-primary transition-colors border-t border-muted-blue/20"
            >
              View all results
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
