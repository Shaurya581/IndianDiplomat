import Link from 'next/link'
import { DashboardCharts } from '@/components/dashboard/DashboardCharts'
import { countriesIndex, getMajorCountriesFull } from '@/lib/country-data'

export const metadata = { title: 'Global Dashboard | Indian Diplomatic Relations' }

export default async function DashboardPage() {
  const withoutIndia = countriesIndex.filter((c) => c.id !== 'india')

  const levelCounts = { EXCELLENT: 0, GOOD: 0, AVERAGE: 0, POOR: 0 }
  withoutIndia.forEach((c) => { levelCounts[c.level] += 1 })

  const regionMap = new Map<string, { total: number; count: number }>()
  withoutIndia.forEach((c) => {
    const entry = regionMap.get(c.region) ?? { total: 0, count: 0 }
    entry.total += c.overall
    entry.count += 1
    regionMap.set(c.region, entry)
  })
  const regionData = Array.from(regionMap.entries())
    .map(([region, { total, count }]) => ({ region, avgScore: Math.round(total / count), count }))
    .sort((a, b) => b.avgScore - a.avgScore)

  const levelData = Object.entries(levelCounts).map(([level, count]) => ({ level, count }))

  const topPartners = [...withoutIndia].sort((a, b) => b.overall - a.overall).slice(0, 10)

  const majorCountries = await getMajorCountriesFull()
  const eventCount = majorCountries.reduce((sum, c) => sum + c.historicalEvents.length, 0)
  const agreementCount = majorCountries.reduce((sum, c) => sum + c.agreements.length, 0)

  const avgScore = Math.round(withoutIndia.reduce((sum, c) => sum + c.overall, 0) / withoutIndia.length)

  return (
    <div className="min-h-screen bg-primary">
      <header className="pt-16 pb-10 bg-primary-light border-b border-muted-blue/30">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-off-white mb-4">
            Global Diplomatic Dashboard
          </h1>
          <p className="text-off-white/70 max-w-2xl">
            An aggregate, data-driven overview of India&rsquo;s foreign relations across {withoutIndia.length} tracked countries.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-primary-light p-6 border border-muted-blue/30 text-center">
            <span className="text-4xl font-bold text-accent block mb-1">{withoutIndia.length}</span>
            <span className="text-xs font-semibold tracking-wider text-off-white/70 uppercase">Countries Tracked</span>
          </div>
          <div className="bg-primary-light p-6 border border-muted-blue/30 text-center">
            <span className="text-4xl font-bold text-accent block mb-1">{avgScore}</span>
            <span className="text-xs font-semibold tracking-wider text-off-white/70 uppercase">Average Score</span>
          </div>
          <div className="bg-primary-light p-6 border border-muted-blue/30 text-center">
            <span className="text-4xl font-bold text-accent block mb-1">{eventCount}</span>
            <span className="text-xs font-semibold tracking-wider text-off-white/70 uppercase">Historical Events</span>
          </div>
          <div className="bg-primary-light p-6 border border-muted-blue/30 text-center">
            <span className="text-4xl font-bold text-accent block mb-1">{agreementCount}</span>
            <span className="text-xs font-semibold tracking-wider text-off-white/70 uppercase">Agreements Tracked</span>
          </div>
        </div>

        <DashboardCharts levelData={levelData} regionData={regionData} />

        <section>
          <h2 className="text-2xl font-heading font-bold mb-6">Top 10 Relationships by Score</h2>
          <div className="bg-primary-light border border-muted-blue/30 divide-y divide-muted-blue/20">
            {topPartners.map((c, idx) => (
              <Link key={c.id} href={`/countries/${c.id}`} className="flex items-center gap-4 px-5 py-4 hover:bg-primary transition-colors">
                <span className="text-off-white/30 font-heading font-bold w-6">{idx + 1}</span>
                <span className="text-2xl">{c.flag}</span>
                <div className="flex-1">
                  <span className="font-bold text-off-white block">{c.name}</span>
                  <span className="text-xs text-off-white/50">{c.region} — {c.status}</span>
                </div>
                <span className="text-lg font-bold text-accent">{c.overall}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
