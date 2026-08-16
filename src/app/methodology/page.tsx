import { Database, CheckCircle, Scale, ShieldAlert, MapPin } from 'lucide-react'

export const metadata = { title: 'Methodology | Indian Diplomatic Relations' }

const DIMENSIONS = [
  ['Diplomatic Relations', '15%', 'Consistency of diplomatic engagement, frequency of high-level visits, and the presence of formal partnership frameworks.'],
  ['Strategic Alignment', '15%', 'Convergence on regional security, Indo-Pacific/Indian Ocean posture, and shared long-term strategic interests.'],
  ['Economic Relations', '15%', 'Bilateral trade volume and trend, investment flows, and trade agreements.'],
  ['Defence & Security', '15%', 'Military exercises, arms trade, defence-industrial cooperation, and security/counterterrorism coordination.'],
  ['Political Cooperation', '10%', 'Alignment on international political issues and mutual diplomatic support, including at the UN.'],
  ['Technology & Science', '10%', 'Cooperation on critical and emerging technology, R&D, and scientific exchange.'],
  ['Energy & Infrastructure', '5%', 'Energy trade, infrastructure financing, and connectivity projects.'],
  ['People-to-People', '5%', 'Diaspora size, tourism, education exchange, and cultural ties.'],
  ['Multilateral Cooperation', '5%', 'Joint membership and coordination in forums such as the UN, G20, BRICS, QUAD, SCO and regional groupings.'],
  ['Current Diplomatic Momentum', '5%', 'The direction of the relationship over the past 1&ndash;2 years — whether recent developments are improving, stable, or straining it.'],
]

const STATUS_LABELS = [
  ['Strategic Partner', 'A top-tier, deeply institutionalized relationship across most dimensions.'],
  ['Strong Partner', 'Consistently positive and broad-based, without the full depth of a strategic partnership.'],
  ['Cooperative', 'Generally positive and functional, with room to deepen.'],
  ['Developing', 'An emerging relationship, often constrained by capacity, distance, or limited engagement to date.'],
  ['Balanced', 'India actively manages competing considerations rather than leaning fully in either direction.'],
  ['Complex', 'Substantial cooperation coexists with real friction — neither erases the other.'],
  ['Strained', 'Meaningful tension currently dominates the relationship, though channels remain open.'],
  ['Adversarial', 'The relationship is fundamentally contested, with unresolved disputes central to it.'],
]

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-primary">
      <header className="pt-16 pb-12 bg-primary-light border-b border-muted-blue/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-off-white mb-4">
            Methodology
          </h1>
          <p className="text-off-white/70 max-w-2xl mx-auto">
            How India&rsquo;s diplomatic relationships are tracked, scored, and presented on this platform.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 max-w-4xl space-y-16">

        {/* Scoring Methodology */}
        <section>
          <h2 className="text-3xl font-heading font-bold mb-6 flex items-center">
            <Scale className="mr-3 text-accent h-8 w-8" />
            Relationship Scoring Framework
          </h2>
          <div className="prose prose-invert max-w-none text-off-white/80">
            <p className="mb-4">
              The Relationship Score (0&ndash;100) is an <em>independent analytical index</em> built from ten weighted
              dimensions, designed to provide comparative context. It is <strong>not an official government rating</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {DIMENSIONS.map(([name, weight, desc]) => (
                <div key={name} className="bg-primary-light p-4 border border-muted-blue/30">
                  <div className="flex justify-between items-baseline mb-1">
                    <strong className="text-off-white">{name}</strong>
                    <span className="text-accent font-bold text-sm">{weight}</span>
                  </div>
                  <span className="text-sm" dangerouslySetInnerHTML={{ __html: desc }} />
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold text-off-white mt-8 mb-4">Classification Tiers</h3>
            <ul className="space-y-3 list-none p-0 mb-8">
              <li className="flex items-center space-x-3"><span className="w-4 h-4 rounded-full bg-excellent flex-shrink-0"></span><span><strong>EXCELLENT (80&ndash;100):</strong> Deep strategic alignment, high trade, strong defence ties.</span></li>
              <li className="flex items-center space-x-3"><span className="w-4 h-4 rounded-full bg-good flex-shrink-0"></span><span><strong>GOOD (60&ndash;79):</strong> Positive relations, growing trade, regular diplomatic engagement.</span></li>
              <li className="flex items-center space-x-3"><span className="w-4 h-4 rounded-full bg-average flex-shrink-0"></span><span><strong>AVERAGE (40&ndash;59):</strong> Functional relations, limited strategic depth, or a complex mix of cooperation and dispute.</span></li>
              <li className="flex items-center space-x-3"><span className="w-4 h-4 rounded-full bg-poor flex-shrink-0"></span><span><strong>POOR (0&ndash;39):</strong> Minimal engagement, severe disputes, or hostile relations.</span></li>
            </ul>

            <h3 className="text-xl font-bold text-off-white mt-8 mb-4">Relationship Status</h3>
            <p className="mb-4">
              A single 0&ndash;100 score can hide real nuance — two countries can land in the same numeric band for very
              different reasons. Every country therefore also carries a qualitative <strong>Relationship Status</strong>{' '}
              label shown alongside the score (for example, <span className="text-accent font-semibold">&ldquo;AVERAGE &mdash; COMPLEX&rdquo;</span>{' '}
              or <span className="text-accent font-semibold">&ldquo;POOR &mdash; STRAINED&rdquo;</span>), so a
              relationship with deep strategic ties under active trade tension isn&rsquo;t collapsed into the same
              label as one that&rsquo;s simply distant.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {STATUS_LABELS.map(([label, desc]) => (
                <div key={label} className="flex gap-3 text-sm">
                  <strong className="text-off-white whitespace-nowrap">{label}</strong>
                  <span className="text-off-white/60">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Two levels of detail */}
        <section>
          <h2 className="text-3xl font-heading font-bold mb-6 flex items-center">
            <Database className="mr-3 text-accent h-8 w-8" />
            Two Levels of Coverage
          </h2>
          <div className="prose prose-invert max-w-none text-off-white/80 space-y-4">
            <p><strong className="text-off-white">Level 1 (all ~195 countries):</strong> flag, capital, region, relationship score and status, a short summary, key cooperation areas and challenges, and sources.</p>
            <p><strong className="text-off-white">Level 2 (50+ major relationships):</strong> everything in Level 1, plus complete diplomatic history, major agreements, defence cooperation, trade data, technology/energy/space cooperation where applicable, multilateral engagement, and a Recent Developments section covering 2024&ndash;2026.</p>
          </div>
        </section>

        {/* Data Sources */}
        <section>
          <h2 className="text-3xl font-heading font-bold mb-6 flex items-center">
            <CheckCircle className="mr-3 text-accent h-8 w-8" />
            Source Priority
          </h2>
          <div className="prose prose-invert max-w-none text-off-white/80">
            <p className="mb-6">Claims are prioritized by source tier, highest first:</p>
            <div className="bg-primary-light p-6 border border-muted-blue/30 space-y-4">
              <div><strong className="text-off-white">Tier 1 — Government sources.</strong><p className="text-sm mt-1">India&rsquo;s Ministry of External Affairs, Indian missions abroad, partner-country foreign ministries, official treaty texts.</p></div>
              <div><strong className="text-off-white">Tier 2 — International organizations.</strong><p className="text-sm mt-1">UN, World Bank, IMF, WTO, OECD, IAEA, WHO.</p></div>
              <div><strong className="text-off-white">Tier 3 — Research institutions.</strong><p className="text-sm mt-1">CFR, Brookings, Carnegie, CSIS, Chatham House, IISS and reputable academic sources.</p></div>
              <div><strong className="text-off-white">Tier 4 — Major reputable news organizations,</strong><p className="text-sm mt-1">used mainly for recent developments not yet reflected in Tier 1&ndash;3 sources.</p></div>
            </div>
            <div className="mt-8 p-4 border border-accent/50 bg-accent/10 flex items-start space-x-3">
              <ShieldAlert className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <strong className="text-off-white block mb-1">Disclaimer regarding unavailable data</strong>
                <p className="text-sm">If specific trade figures, dates or agreements are not confidently verifiable, the platform states &ldquo;Requires verification&rdquo; or omits the field rather than estimating.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Map methodology */}
        <section>
          <h2 className="text-3xl font-heading font-bold mb-6 flex items-center">
            <MapPin className="mr-3 text-accent h-8 w-8" />
            Map & Territorial Depictions
          </h2>
          <div className="prose prose-invert max-w-none text-off-white/80 space-y-4">
            <p>India is shown in solid orange on the map, distinct from every relationship-classification color, so it always reads as &ldquo;this is India&rdquo; rather than a score. India&rsquo;s outline follows the Government of India&rsquo;s / Survey of India&rsquo;s territorial convention — including Jammu &amp; Kashmir, Ladakh, Aksai Chin and Arunachal Pradesh as part of India&rsquo;s represented territory. The area India claims but does not administer (Pakistan-administered Jammu &amp; Kashmir — Azad Kashmir and Gilgit-Baltistan — and the Shaksgam Tract) is shown as a distinct hatched overlay rather than plain, uncontested orange.</p>

            <div className="bg-primary-light p-6 border border-muted-blue/30 space-y-3">
              <strong className="text-off-white block">Source</strong>
              <p className="text-sm">
                Survey of India&rsquo;s own free public downloads (<a href="https://surveyofindia.gov.in/pages/political-map-of-india" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">surveyofindia.gov.in</a>) are raster PDF maps, not vector geometry; Survey of India&rsquo;s vector boundary products are sold through a paid geospatial data catalogue and cannot be legally redistributed in an open build. India&rsquo;s outline here is instead sourced from the <a href="https://github.com/datameet/maps" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">DataMeet India open geospatial community dataset</a> (CC BY 4.0) — the de facto open reference for Indian administrative boundaries, whose national-boundary file is explicitly built to the Survey of India convention (its source metadata reads <code className="text-xs">&ldquo;Survey of India State Map, Datameet&rdquo;</code>) rather than a neutral or foreign one. The disputed-territory overlay is sourced from the same collection&rsquo;s Pakistan-administered Kashmir district data (Alhasan Systems) and Shaksgam Tract boundary, dissolved into a single overlay. Both layers were simplified for web performance; the simplification was verified to preserve the full territorial extent.
              </p>
            </div>

            <p className="text-sm text-off-white/60">Territorial boundaries and depictions reflect these source conventions. Some boundaries and territories are disputed and may be represented differently by other governments and international organizations.</p>
          </div>
        </section>

      </main>
    </div>
  )
}
