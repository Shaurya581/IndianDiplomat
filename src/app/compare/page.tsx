import { CompareTool } from '@/components/compare/CompareTool'
import { getMajorCountriesFull } from '@/lib/country-data'

export const metadata = { title: 'Compare Relations | Indian Diplomatic Relations' }

export default async function ComparePage() {
  const countries = await getMajorCountriesFull()

  const formattedCountries = countries
    .filter((c) => c.id !== 'india')
    .map((c) => ({
      id: c.id,
      name: c.name,
      flag: c.flag,
      level: c.relationship.level,
      status: c.relationship.status,
      score: c.relationship.overall,
      dimensions: c.relationship.dimensions,
      trade: c.trade ? { total: c.trade.total, exports: c.trade.exports, imports: c.trade.imports } : null,
      agreementsCount: c.agreements.length,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="min-h-screen bg-primary">
      <header className="pt-16 pb-12 bg-primary-light border-b border-muted-blue/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-off-white mb-4">
            Compare Relations
          </h1>
          <p className="text-off-white/70 max-w-2xl mx-auto">
            Select up to three of India&rsquo;s 50+ detailed-profile countries to compare their diplomatic, strategic, economic and defence dimensions side-by-side.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <CompareTool allCountries={formattedCountries} />
      </main>
    </div>
  )
}
