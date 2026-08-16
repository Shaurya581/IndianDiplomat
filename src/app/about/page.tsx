import { Globe, Layers, ShieldAlert, CalendarClock } from 'lucide-react'
import { countriesIndex } from '@/lib/country-data'

export const metadata = { title: 'About | Indian Diplomatic Relations' }

export default function AboutPage() {
  const majorCount = countriesIndex.filter((c) => c.tier === 'major').length

  return (
    <div className="min-h-screen bg-primary">
      <header className="pt-16 pb-12 bg-primary-light border-b border-muted-blue/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-off-white mb-4">
            About the Project
          </h1>
          <p className="text-off-white/70 max-w-2xl mx-auto">
            An independent, analytical reference for India&rsquo;s diplomatic relationships with the world.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 max-w-3xl space-y-12">
        <section className="flex gap-4">
          <Globe className="h-7 w-7 text-accent flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-heading font-bold mb-2 text-off-white">What this is</h2>
            <p className="text-off-white/80 leading-relaxed">
              Indian Diplomatic Relations is an interactive reference covering India&rsquo;s ties with all
              {' '}{countriesIndex.length} UN member states plus Palestine and the Holy See, with significantly deeper
              coverage — full diplomatic history, agreements, trade, defence and recent developments — for
              {' '}{majorCount}+ of India&rsquo;s most closely tracked relationships. It combines an interactive map, a
              country-by-country database, a chronological timeline, and side-by-side comparison tools.
            </p>
          </div>
        </section>

        <section className="flex gap-4">
          <Layers className="h-7 w-7 text-accent flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-heading font-bold mb-2 text-off-white">Two levels of detail</h2>
            <p className="text-off-white/80 leading-relaxed">
              Every country has a Level 1 profile: flag, capital, region, relationship score and status, a short
              summary, key cooperation areas and challenges. India&rsquo;s {majorCount}+ most significant relationships
              additionally get a Level 2 profile — complete diplomatic history, major agreements, defence
              cooperation, trade data, multilateral engagement and a dedicated Recent Developments section
              covering 2024&ndash;2026.
            </p>
          </div>
        </section>

        <section className="flex gap-4">
          <CalendarClock className="h-7 w-7 text-accent flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-heading font-bold mb-2 text-off-white">Kept current, not real-time</h2>
            <p className="text-off-white/80 leading-relaxed">
              This is a periodically-updated reference, not a live feed. Every country record carries a{' '}
              <code className="text-accent">lastVerified</code> date so it&rsquo;s always clear how current the
              information is — see the date shown at the top of each country page.
            </p>
          </div>
        </section>

        <section className="flex gap-4">
          <ShieldAlert className="h-7 w-7 text-accent flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-heading font-bold mb-2 text-off-white">What it is not</h2>
            <p className="text-off-white/80 leading-relaxed">
              This is not an official Government of India publication, and the relationship classifications are
              an independent analytical index for comparative context — not an official rating. See{' '}
              <a href="/methodology" className="text-accent hover:underline">Methodology</a> for how scores are
              derived, and <a href="/sources" className="text-accent hover:underline">Sources</a> for the
              institutions referenced.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
