import { ExternalLink } from 'lucide-react'
import { getMajorCountriesFull } from '@/lib/country-data'

export const metadata = { title: 'Data Sources | Indian Diplomatic Relations' }

export default async function SourcesPage() {
  const countries = await getMajorCountriesFull()
  const allSources = countries.flatMap((c) => c.sources)

  const unique = Array.from(new Map(allSources.map((s) => [s.publisher, s])).values())
    .sort((a, b) => a.publisher.localeCompare(b.publisher))

  return (
    <div className="min-h-screen bg-primary">
      <header className="pt-16 pb-12 bg-primary-light border-b border-muted-blue/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-off-white mb-4">Data Sources</h1>
          <p className="text-off-white/70 max-w-2xl mx-auto">
            Institutions referenced across country profiles on this platform, prioritized government and international-organization sources over secondary reporting. Individual country pages cite the specific sources relevant to their entries.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="bg-primary-light border border-muted-blue/30 divide-y divide-muted-blue/20">
          {unique.map((s) => (
            <div key={s.publisher} className="flex items-start justify-between gap-4 p-5">
              <div>
                <strong className="text-off-white block mb-1">{s.publisher}</strong>
                <p className="text-sm text-off-white/60">{s.title}</p>
                <span className="text-[10px] uppercase tracking-wider text-off-white/40">{s.type.replace('-', ' ')}</span>
              </div>
              {s.url && (
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-light flex-shrink-0 mt-1">
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          ))}
        </div>

        <p className="text-xs text-off-white/40 mt-8">
          Where verified figures were not available at the time of publication, the platform states so explicitly (&ldquo;Requires verification&rdquo;) rather than estimating values. See <a href="/methodology" className="text-accent hover:underline">Methodology</a> for the scoring framework and source-priority tiers.
        </p>
      </main>
    </div>
  )
}
