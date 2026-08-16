import Link from 'next/link'
import { Search as SearchIcon, Globe, CalendarClock, FileSignature, User } from 'lucide-react'
import { search } from '@/lib/search'

export const metadata = { title: 'Search | Indian Diplomatic Relations' }

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const query = (q ?? '').trim()
  const hasQuery = query.length >= 2
  const results = hasQuery ? search(query, 25) : { countries: [], events: [], agreements: [], leaders: [] }
  const totalResults = results.countries.length + results.events.length + results.agreements.length + results.leaders.length

  return (
    <div className="min-h-screen bg-primary">
      <header className="pt-16 pb-12 bg-primary-light border-b border-muted-blue/30">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-off-white mb-6 flex items-center gap-3">
            <SearchIcon className="h-8 w-8 text-accent" /> Search
          </h1>
          <form action="/search" method="GET" className="max-w-xl">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search countries, events, agreements, leaders... (e.g. Turkey, Türkiye)"
              className="w-full px-4 py-3 bg-primary border border-muted-blue/50 focus:outline-none focus:border-accent text-off-white"
              autoFocus
            />
          </form>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {!hasQuery && <p className="text-off-white/50">Enter at least 2 characters to search across the atlas.</p>}
        {hasQuery && totalResults === 0 && <p className="text-off-white/50">No results found for &ldquo;{query}&rdquo;.</p>}

        {hasQuery && totalResults > 0 && (
          <div className="space-y-12">
            {results.countries.length > 0 && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-wider text-off-white/50 mb-4 flex items-center gap-2">
                  <Globe className="h-4 w-4" /> Countries ({results.countries.length})
                </h2>
                <div className="space-y-2">
                  {results.countries.map((c) => (
                    <Link key={c.id} href={`/countries/${c.id}`} className="flex items-center gap-4 p-4 bg-primary-light border border-muted-blue/30 hover:border-accent/50 transition-colors">
                      <span className="text-2xl">{c.flag}</span>
                      <div className="flex-1">
                        <span className="font-bold text-off-white block">{c.name}</span>
                        <span className="text-xs text-off-white/50">{c.capital} • {c.region}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {results.events.length > 0 && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-wider text-off-white/50 mb-4 flex items-center gap-2">
                  <CalendarClock className="h-4 w-4" /> Historical Events ({results.events.length})
                </h2>
                <div className="space-y-2">
                  {results.events.map((e, i) => (
                    <Link key={i} href={`/countries/${e.countryId}`} className="block p-4 bg-primary-light border border-muted-blue/30 hover:border-accent/50 transition-colors">
                      <div className="flex items-center gap-2 text-xs text-off-white/50 mb-1">
                        <span>{e.countryFlag} {e.countryName}</span><span>•</span><span className="text-accent font-semibold">{e.year}</span>
                      </div>
                      <span className="font-bold text-off-white block">{e.title}</span>
                      <span className="text-sm text-off-white/60 line-clamp-2">{e.subtitle}</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {results.agreements.length > 0 && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-wider text-off-white/50 mb-4 flex items-center gap-2">
                  <FileSignature className="h-4 w-4" /> Agreements ({results.agreements.length})
                </h2>
                <div className="space-y-2">
                  {results.agreements.map((a, i) => (
                    <Link key={i} href={`/countries/${a.countryId}`} className="block p-4 bg-primary-light border border-muted-blue/30 hover:border-accent/50 transition-colors">
                      <div className="flex items-center gap-2 text-xs text-off-white/50 mb-1">
                        <span>{a.countryFlag} {a.countryName}</span><span>•</span><span className="text-accent font-semibold">{a.year}</span>
                      </div>
                      <span className="font-bold text-off-white block">{a.title}</span>
                      <span className="text-sm text-off-white/60 line-clamp-2">{a.subtitle}</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {results.leaders.length > 0 && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-wider text-off-white/50 mb-4 flex items-center gap-2">
                  <User className="h-4 w-4" /> Leaders ({results.leaders.length})
                </h2>
                <div className="space-y-2">
                  {results.leaders.map((l, i) => (
                    <Link key={i} href={`/countries/${l.countryId}`} className="flex items-center gap-4 p-4 bg-primary-light border border-muted-blue/30 hover:border-accent/50 transition-colors">
                      <div className="flex-1">
                        <span className="font-bold text-off-white block">{l.title}</span>
                        <span className="text-xs text-off-white/50">{l.subtitle} • {l.countryFlag} {l.countryName}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
