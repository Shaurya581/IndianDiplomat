import Link from 'next/link'
import { Activity, Map as MapIcon, Users, TrendingUp, AlertTriangle, ArrowRight, Newspaper } from 'lucide-react'
import { WorldMap } from '@/components/map/WorldMap'
import { countriesIndex, REGIONS, getCountriesByRegion } from '@/lib/country-data'
import { getMapData } from '@/lib/map-data'
import { getRecentDevelopments, countTotalEvents } from '@/lib/recent-developments'
import { LEVEL_LABEL } from '@/lib/relationship-score'

export default async function Home() {
  const totalCountries = countriesIndex.length
  const majorCount = countriesIndex.filter((c) => c.tier === 'major').length
  const mapData = getMapData()

  const levelCounts = { EXCELLENT: 0, GOOD: 0, AVERAGE: 0, POOR: 0 }
  countriesIndex.forEach((c) => { levelCounts[c.level] += 1 })

  const strategicPartners = [...countriesIndex]
    .filter((c) => c.id !== 'india')
    .sort((a, b) => b.overall - a.overall)
    .slice(0, 6)

  const complexRelationships = [...countriesIndex]
    .filter((c) => ['Complex', 'Strained', 'Adversarial'].includes(c.status))
    .sort((a, b) => a.overall - b.overall)
    .slice(0, 6)

  const [recentDevelopments, totalEvents] = await Promise.all([
    getRecentDevelopments(6),
    countTotalEvents(),
  ])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative pt-20 pb-24 overflow-hidden border-b border-muted-blue/30">
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 border border-muted-blue/60 text-accent mb-8">
            <Activity className="h-4 w-4" />
            <span className="text-xs font-semibold tracking-wider uppercase">Diplomatic Intelligence Platform</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-6 uppercase">
            Indian Diplomatic Relations
          </h1>
          <p className="text-lg md:text-xl text-off-white/80 max-w-2xl mb-10 leading-relaxed">
            India&rsquo;s relationships with the world — mapped, explained and contextualized.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link href="/map" className="px-8 py-4 bg-accent hover:bg-accent-light text-primary font-bold transition-all flex items-center justify-center space-x-2">
              <MapIcon className="h-5 w-5" />
              <span>EXPLORE THE WORLD</span>
            </Link>
            <Link href="/countries" className="px-8 py-4 bg-transparent border border-muted-blue hover:border-off-white/50 text-off-white font-bold transition-all flex items-center justify-center space-x-2">
              <Users className="h-5 w-5" />
              <span>EXPLORE INDIA&rsquo;S RELATIONS</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-center">
            <div>
              <div className="text-3xl font-heading font-bold text-off-white">{totalCountries}</div>
              <div className="text-xs uppercase tracking-wider text-off-white/50 mt-1">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-heading font-bold text-off-white">{majorCount}+</div>
              <div className="text-xs uppercase tracking-wider text-off-white/50 mt-1">Detailed Profiles</div>
            </div>
            <div>
              <div className="text-3xl font-heading font-bold text-off-white">{totalEvents}+</div>
              <div className="text-xs uppercase tracking-wider text-off-white/50 mt-1">Diplomatic Events</div>
            </div>
            <div>
              <div className="text-3xl font-heading font-bold text-accent">2026</div>
              <div className="text-xs uppercase tracking-wider text-off-white/50 mt-1">Updated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="map" className="w-full bg-primary-light py-12 border-b border-muted-blue/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-2">Global Relationships</h2>
              <p className="text-off-white/70">India is highlighted in orange. Hover any country for its relationship classification.</p>
            </div>

            <div className="flex items-center flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-india"></span>
                <span className="text-off-white/80">India</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-excellent"></span>
                <span className="text-off-white/80">Excellent</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-good"></span>
                <span className="text-off-white/80">Good</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-average"></span>
                <span className="text-off-white/80">Average</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-poor"></span>
                <span className="text-off-white/80">Poor</span>
              </div>
            </div>
          </div>

          <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-primary border border-muted-blue/50 overflow-hidden relative">
            <WorldMap data={mapData} />
          </div>
          <p className="text-xs text-off-white/40 mt-3 max-w-3xl">
            Territorial boundaries are represented according to the Government of India&rsquo;s / Survey of India&rsquo;s map conventions. Some boundaries and territories shown are disputed and may be represented differently by other governments or international organizations. See <Link href="/methodology" className="underline hover:text-off-white/70">Methodology</Link>.
          </p>
        </div>
      </section>

      {/* Relationship distribution */}
      <section className="py-16 container mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-3xl font-heading font-bold mb-2">Relationship Distribution</h2>
          <p className="text-off-white/70">A data-driven overview of foreign relations across all {totalCountries} tracked countries.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-primary-light p-6 border border-excellent/30 border-l-4 border-l-excellent flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-bold text-excellent mb-2">{levelCounts.EXCELLENT}</span>
            <span className="text-sm font-semibold tracking-wider text-off-white/70">EXCELLENT</span>
          </div>
          <div className="bg-primary-light p-6 border border-good/30 border-l-4 border-l-good flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-bold text-good mb-2">{levelCounts.GOOD}</span>
            <span className="text-sm font-semibold tracking-wider text-off-white/70">GOOD</span>
          </div>
          <div className="bg-primary-light p-6 border border-average/30 border-l-4 border-l-average flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-bold text-average mb-2">{levelCounts.AVERAGE}</span>
            <span className="text-sm font-semibold tracking-wider text-off-white/70">AVERAGE</span>
          </div>
          <div className="bg-primary-light p-6 border border-poor/30 border-l-4 border-l-poor flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-bold text-poor mb-2">{levelCounts.POOR}</span>
            <span className="text-sm font-semibold tracking-wider text-off-white/70">POOR</span>
          </div>
        </div>
      </section>

      {/* Strategic Partners & Most Complex */}
      <section className="py-16 bg-primary-light border-y border-muted-blue/30">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-excellent" /> Strategic Partners
            </h2>
            <div className="bg-primary border border-muted-blue/30 divide-y divide-muted-blue/20">
              {strategicPartners.map((c) => (
                <Link key={c.id} href={`/countries/${c.id}`} className="flex items-center gap-4 px-5 py-4 hover:bg-primary-light transition-colors">
                  <span className="text-2xl">{c.flag}</span>
                  <div className="flex-1">
                    <span className="font-bold text-off-white block">{c.name}</span>
                    <span className="text-xs text-off-white/50">{LEVEL_LABEL[c.level]} — {c.status}</span>
                  </div>
                  <span className="text-lg font-bold text-excellent">{c.overall}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-poor" /> Most Complex Relationships
            </h2>
            <div className="bg-primary border border-muted-blue/30 divide-y divide-muted-blue/20">
              {complexRelationships.map((c) => (
                <Link key={c.id} href={`/countries/${c.id}`} className="flex items-center gap-4 px-5 py-4 hover:bg-primary-light transition-colors">
                  <span className="text-2xl">{c.flag}</span>
                  <div className="flex-1">
                    <span className="font-bold text-off-white block">{c.name}</span>
                    <span className="text-xs text-off-white/50">{LEVEL_LABEL[c.level]} — {c.status}</span>
                  </div>
                  <span className="text-lg font-bold text-poor">{c.overall}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Developments */}
      {recentDevelopments.length > 0 && (
        <section className="py-16 container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-2 flex items-center gap-3">
                <Newspaper className="h-7 w-7 text-accent" /> What Changed Recently?
              </h2>
              <p className="text-off-white/70">The latest tracked diplomatic developments, most recent first.</p>
            </div>
            <Link href="/timeline" className="hidden sm:flex items-center gap-1 text-sm text-accent hover:underline whitespace-nowrap">
              Full timeline <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentDevelopments.map((d, i) => (
              <Link key={i} href={`/countries/${d.countryId}`} className="bg-primary-light border border-muted-blue/30 p-6 hover:border-accent/50 transition-colors flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center gap-2 text-sm font-bold text-off-white">
                    <span className="text-xl">{d.countryFlag}</span> {d.countryName}
                  </span>
                  <span className="text-xs text-accent font-semibold">{d.date}</span>
                </div>
                <h3 className="font-bold text-off-white mb-2">{d.title}</h3>
                <p className="text-sm text-off-white/70 mb-3 flex-1 line-clamp-3">{d.description}</p>
                <p className="text-xs text-off-white/50 border-t border-muted-blue/20 pt-3">
                  <strong className="text-off-white/70">Why it matters:</strong> {d.whyItMatters}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Explore by Region */}
      <section className="py-16 bg-primary-light border-y border-muted-blue/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold mb-10">Explore by Region</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {REGIONS.map((region) => {
              const count = getCountriesByRegion(region).length
              return (
                <Link
                  key={region}
                  href={`/countries?region=${encodeURIComponent(region)}`}
                  className="bg-primary border border-muted-blue/30 hover:border-accent/50 p-6 transition-colors"
                >
                  <span className="text-xl font-bold text-off-white block mb-1">{region}</span>
                  <span className="text-xs text-off-white/50 uppercase tracking-wider">{count} countries</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
