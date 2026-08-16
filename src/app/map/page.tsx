import Link from 'next/link'
import { WorldMap } from '@/components/map/WorldMap'
import { countriesIndex } from '@/lib/country-data'
import { getMapData } from '@/lib/map-data'
import { LEVEL_LABEL } from '@/lib/relationship-score'
import type { RelationshipLevel } from '@/types/country'

export const metadata = { title: 'Interactive Map | Indian Diplomatic Relations' }

const LEVEL_ORDER: RelationshipLevel[] = ['EXCELLENT', 'GOOD', 'AVERAGE', 'POOR']
const LEVEL_COLOR: Record<RelationshipLevel, string> = {
  EXCELLENT: 'text-excellent', GOOD: 'text-good', AVERAGE: 'text-average', POOR: 'text-poor',
}

export default function MapPage() {
  const mapData = getMapData()
  const countries = countriesIndex.filter((c) => c.id !== 'india')

  const grouped = LEVEL_ORDER.map((level) => ({
    level,
    countries: countries.filter((c) => c.level === level).sort((a, b) => b.overall - a.overall),
  }))

  return (
    <div className="min-h-screen bg-primary">
      <header className="pt-16 pb-10 bg-primary-light border-b border-muted-blue/30">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-off-white mb-4">
            Interactive Diplomatic Map
          </h1>
          <p className="text-off-white/70 max-w-2xl">
            Hover any country to see its relationship classification and score. Click to open its full profile. India is highlighted in orange.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="w-full aspect-[16/10] bg-primary border border-muted-blue/50 overflow-hidden relative">
            <WorldMap data={mapData} />
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold mt-4">
            <div className="flex items-center space-x-2"><span className="w-3 h-3 bg-india"></span><span className="text-off-white/80">India</span></div>
            <div className="flex items-center space-x-2"><span className="w-3 h-3 bg-india" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, var(--color-india) 2px, var(--color-india) 3px)' }}></span><span className="text-off-white/80">Disputed / claimed boundary</span></div>
            <div className="flex items-center space-x-2"><span className="w-3 h-3 bg-excellent"></span><span className="text-off-white/80">Excellent</span></div>
            <div className="flex items-center space-x-2"><span className="w-3 h-3 bg-good"></span><span className="text-off-white/80">Good</span></div>
            <div className="flex items-center space-x-2"><span className="w-3 h-3 bg-average"></span><span className="text-off-white/80">Average</span></div>
            <div className="flex items-center space-x-2"><span className="w-3 h-3 bg-poor"></span><span className="text-off-white/80">Poor</span></div>
          </div>
          <p className="text-xs text-off-white/40 mt-4 max-w-3xl">
            Territorial boundaries are represented according to the Government of India&rsquo;s / Survey of India&rsquo;s map conventions. Some boundaries and territories shown are disputed and may be represented differently by other governments or international organizations. See <Link href="/methodology" className="underline hover:text-off-white/70">Methodology</Link> for sourcing.
          </p>
        </div>

        <aside className="lg:col-span-1 space-y-8">
          {grouped.map(({ level, countries: list }) => (
            <div key={level}>
              <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 ${LEVEL_COLOR[level]}`}>
                {LEVEL_LABEL[level]} ({list.length})
              </h3>
              <div className="space-y-1">
                {list.map((c) => (
                  <Link
                    key={c.id}
                    href={`/countries/${c.id}`}
                    className="flex items-center justify-between text-sm py-1.5 px-2 -mx-2 hover:bg-primary-light transition-colors group"
                  >
                    <span className="text-off-white/80 group-hover:text-off-white flex items-center gap-2">
                      <span>{c.flag}</span>{c.name}
                    </span>
                    <span className="text-off-white/40 text-xs">{c.overall}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </aside>
      </main>
    </div>
  )
}
