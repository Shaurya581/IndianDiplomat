import { Timeline } from '@/components/timeline/Timeline'
import { getMajorCountriesFull } from '@/lib/country-data'

export const metadata = { title: 'Diplomatic Timeline | Indian Diplomatic Relations' }

export default async function TimelinePage() {
  const countries = await getMajorCountriesFull()

  const events = countries.flatMap((c) =>
    c.historicalEvents.map((e, i) => ({
      id: `${c.id}-${i}`,
      year: e.year,
      title: e.title,
      category: e.category,
      description: e.description,
      impact: e.impact ?? null,
      country: { id: c.id, name: c.name, flag: c.flag },
    }))
  ).sort((a, b) => a.year - b.year)

  return (
    <div className="min-h-screen bg-primary">
      <header className="pt-16 pb-10 bg-primary-light border-b border-muted-blue/30">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-off-white mb-4">
            Diplomatic Timeline
          </h1>
          <p className="text-off-white/70 max-w-2xl">
            Every tracked event across India&rsquo;s detailed-profile relationships, in chronological order. Filter by category to focus on a specific dimension of the relationship.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <Timeline events={events} />
      </main>
    </div>
  )
}
