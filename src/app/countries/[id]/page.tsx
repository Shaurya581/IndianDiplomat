import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, Shield, TrendingUp, Handshake, Cpu, Globe, Users, Scale, Activity, Landmark, AlertTriangle, BookOpen, ExternalLink, Zap, Rocket, CalendarClock } from 'lucide-react'
import { getCountry, countriesIndex } from '@/lib/country-data'
import { LEVEL_LABEL } from '@/lib/relationship-score'
import type { RelationshipLevel } from '@/types/country'

export function generateStaticParams() {
  return countriesIndex.map((c) => ({ id: c.id }))
}

function getLevelColor(level: RelationshipLevel) {
  switch (level) {
    case 'EXCELLENT': return 'text-excellent bg-excellent/10 border-excellent/30'
    case 'GOOD': return 'text-good bg-good/10 border-good/30'
    case 'AVERAGE': return 'text-average bg-average/10 border-average/30'
    case 'POOR': return 'text-poor bg-poor/10 border-poor/30'
    default: return 'text-muted-blue'
  }
}

function getCategoryColor(category: string) {
  const map: Record<string, string> = {
    Conflict: 'bg-poor/15 text-poor border-poor/30',
    Security: 'bg-poor/15 text-poor border-poor/30',
    Treaty: 'bg-accent/15 text-accent border-accent/30',
    Summit: 'bg-accent/15 text-accent border-accent/30',
    Trade: 'bg-good/15 text-good border-good/30',
    Defence: 'bg-muted-blue/40 text-off-white/80 border-muted-blue',
    Technology: 'bg-good/15 text-good border-good/30',
    Energy: 'bg-average/15 text-average border-average/30',
    Diplomacy: 'bg-muted-blue/40 text-off-white/80 border-muted-blue',
  }
  return map[category] || 'bg-muted-blue/40 text-off-white/70 border-muted-blue'
}

function ProgressBar({ label, value, icon: Icon }: { label: string; value: number; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center space-x-2 text-off-white/80">
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </div>
        <span className="font-bold">{value}</span>
      </div>
      <div className="h-1.5 w-full bg-primary rounded-full overflow-hidden border border-muted-blue/30">
        <div className="h-full bg-accent" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const country = await getCountry(id)
  if (!country) return { title: 'Country Not Found — Indian Diplomatic Relations' }
  if (country.id === 'india') return { title: 'India — Indian Diplomatic Relations', description: country.shortSummary }
  return {
    title: `India–${country.name} Relations | Indian Diplomatic Relations`,
    description: country.shortSummary,
  }
}

export default async function CountryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const country = await getCountry(id)

  if (!country) notFound()

  if (country.id === 'india') {
    return (
      <div className="min-h-screen bg-primary">
        <header className="relative pt-12 pb-16 bg-primary-light border-b border-muted-blue/30">
          <div className="container mx-auto px-4">
            <Link href="/countries" className="inline-flex items-center text-sm text-off-white/50 hover:text-accent mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to all countries
            </Link>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-6xl">{country.flag}</span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-off-white">India</h1>
            </div>
            <p className="text-lg text-off-white/80 max-w-3xl leading-relaxed">{country.shortSummary}</p>
          </div>
        </header>
        <main className="container mx-auto px-4 py-16 max-w-3xl space-y-12">
          <section>
            <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-3"><Landmark className="h-6 w-6 text-india" /> Multilateral Memberships</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {country.multilateralRelations.map((m, i) => (
                <div key={i} className="p-5 bg-primary-light border border-muted-blue/30">
                  <h4 className="font-bold text-off-white mb-1">{m.organization}</h4>
                  <p className="text-sm text-off-white/70">{m.detail}</p>
                </div>
              ))}
            </div>
          </section>
          <div className="p-6 border border-india/30 bg-india/5 text-off-white/80">
            This page is India&rsquo;s own profile, not a bilateral relationship. Explore India&rsquo;s relationship with any other country from the <Link href="/countries" className="text-india hover:underline">country explorer</Link>.
          </div>
        </main>
      </div>
    )
  }

  const { relationship: score } = country

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <header className="relative pt-12 pb-16 bg-primary-light border-b border-muted-blue/30">
        <div className="container mx-auto px-4">
          <Link href="/countries" className="inline-flex items-center text-sm text-off-white/50 hover:text-accent mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to all countries
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-6xl">{country.flag}</span>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-off-white">
                  India ↔ {country.name}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
                <span className="px-3 py-1 rounded-sm bg-primary border border-muted-blue/50 text-off-white/70">
                  {country.region}{country.subregion !== country.region ? ` · ${country.subregion}` : ''}
                </span>
                <span className="px-3 py-1 rounded-sm bg-primary border border-muted-blue/50 text-off-white/70">
                  Capital: {country.capital}
                </span>
                <span className={`px-4 py-1 rounded-sm border font-bold tracking-wider uppercase ${getLevelColor(score.level)}`}>
                  {LEVEL_LABEL[score.level]} — {score.status}
                </span>
              </div>

              <p className="text-lg text-off-white/80 max-w-3xl leading-relaxed">{country.shortSummary}</p>

              {country.complexity && (
                <div className="mt-4 p-4 border border-average/30 bg-average/5 rounded-sm flex items-start space-x-3 max-w-3xl">
                  <Scale className="h-5 w-5 text-average mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-off-white/80"><strong className="text-average">Relationship Complexity:</strong> {country.complexity}</p>
                </div>
              )}

              <p className="text-xs text-off-white/40 mt-4">
                {country.diplomaticRelationsEstablished && <>Diplomatic relations established {country.diplomaticRelationsEstablished} · </>}
                Last verified {country.lastVerified}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-6 bg-primary border border-muted-blue/50 min-w-[150px]">
              <span className="text-sm text-off-white/50 uppercase tracking-widest font-semibold mb-1">Score</span>
              <span className="text-5xl font-bold text-accent">{score.overall}<span className="text-2xl text-off-white/30">/100</span></span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-12">
          {country.tier === 'major' ? (
            <section>
              <h3 className="text-xl font-heading font-bold mb-6 flex items-center">
                <Activity className="mr-2 h-5 w-5 text-accent" /> Relationship Dashboard
              </h3>
              <div className="bg-primary-light p-6 rounded-sm border border-muted-blue/30 space-y-5">
                <ProgressBar label="Diplomatic" value={score.dimensions.diplomatic} icon={Globe} />
                <ProgressBar label="Strategic" value={score.dimensions.strategic} icon={Handshake} />
                <ProgressBar label="Economic" value={score.dimensions.economic} icon={TrendingUp} />
                <ProgressBar label="Defence" value={score.dimensions.defence} icon={Shield} />
                <ProgressBar label="Political" value={score.dimensions.political} icon={Landmark} />
                <ProgressBar label="Technology" value={score.dimensions.technology} icon={Cpu} />
                <ProgressBar label="Energy" value={score.dimensions.energy} icon={Zap} />
                <ProgressBar label="People-to-People" value={score.dimensions.peopleToPeople} icon={Users} />
                <ProgressBar label="Multilateral" value={score.dimensions.multilateral} icon={Landmark} />
                <ProgressBar label="Momentum" value={score.dimensions.momentum} icon={Activity} />
              </div>
            </section>
          ) : (
            <section>
              <h3 className="text-xl font-heading font-bold mb-6 flex items-center">
                <Activity className="mr-2 h-5 w-5 text-accent" /> Relationship Overview
              </h3>
              <div className="bg-primary-light p-6 rounded-sm border border-muted-blue/30">
                <p className="text-sm text-off-white/70">
                  A dimension-by-dimension breakdown is only published for India&rsquo;s 50+ detailed-profile
                  relationships. This country carries a single overall score of <strong className="text-accent">{score.overall}/100</strong> rather
                  than a scored sub-dimension breakdown.
                </p>
              </div>
            </section>
          )}

          {country.trade && (
            <section>
              <h3 className="text-xl font-heading font-bold mb-6 flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-accent" /> Trade & Economy
              </h3>
              <div className="bg-primary-light p-6 rounded-sm border border-muted-blue/30 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-off-white/50 uppercase">Exports (to {country.name})</p>
                    <p className="text-lg font-bold text-excellent">{country.trade.exports}</p>
                  </div>
                  <div>
                    <p className="text-xs text-off-white/50 uppercase">Imports (from {country.name})</p>
                    <p className="text-lg font-bold text-poor">{country.trade.imports}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-muted-blue/30">
                  <p className="text-xs text-off-white/50 uppercase">Total Bilateral Trade</p>
                  <p className="text-xl font-bold text-off-white">{country.trade.total}</p>
                  <p className="text-[10px] text-off-white/40 mt-1">Data year: {country.trade.dataYear}</p>
                </div>
                <div className="pt-4 border-t border-muted-blue/30 space-y-3 text-sm">
                  <div><strong className="text-off-white/70 block mb-1">Major Exports:</strong><span className="text-off-white/90">{country.trade.majorExports}</span></div>
                  <div><strong className="text-off-white/70 block mb-1">Major Imports:</strong><span className="text-off-white/90">{country.trade.majorImports}</span></div>
                  <div><strong className="text-off-white/70 block mb-1">Key Sectors:</strong><span className="text-off-white/90">{country.trade.majorSectors}</span></div>
                </div>
              </div>
            </section>
          )}

          {country.defenceCooperation.length > 0 && (
            <section>
              <h3 className="text-xl font-heading font-bold mb-6 flex items-center"><Shield className="mr-2 h-5 w-5 text-accent" /> Defence & Security</h3>
              <div className="space-y-3">
                {country.defenceCooperation.map((d, i) => (
                  <div key={i} className="bg-primary-light p-4 rounded-sm border border-muted-blue/30">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-off-white text-sm">{d.name}</span>
                      <span className="text-xs text-accent uppercase tracking-wide">{d.type}</span>
                    </div>
                    <p className="text-xs text-off-white/70">{d.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {(country.technologyCooperation || country.energyCooperation || country.spaceCooperation) && (
            <section>
              <h3 className="text-xl font-heading font-bold mb-6 flex items-center"><Rocket className="mr-2 h-5 w-5 text-accent" /> Technology, Energy & Space</h3>
              <div className="space-y-3 text-sm">
                {country.technologyCooperation && <div className="bg-primary-light p-4 rounded-sm border border-muted-blue/30"><strong className="text-off-white block mb-1">Technology</strong><p className="text-off-white/70">{country.technologyCooperation}</p></div>}
                {country.energyCooperation && <div className="bg-primary-light p-4 rounded-sm border border-muted-blue/30"><strong className="text-off-white block mb-1">Energy</strong><p className="text-off-white/70">{country.energyCooperation}</p></div>}
                {country.spaceCooperation && <div className="bg-primary-light p-4 rounded-sm border border-muted-blue/30"><strong className="text-off-white block mb-1">Space</strong><p className="text-off-white/70">{country.spaceCooperation}</p></div>}
              </div>
            </section>
          )}

          {country.multilateralRelations.length > 0 && (
            <section>
              <h3 className="text-xl font-heading font-bold mb-6 flex items-center"><Landmark className="mr-2 h-5 w-5 text-accent" /> Multilateral Cooperation</h3>
              <div className="space-y-3">
                {country.multilateralRelations.map((m, i) => (
                  <div key={i} className="bg-primary-light p-4 rounded-sm border border-muted-blue/30">
                    <span className="font-bold text-off-white text-sm block mb-1">{m.organization}</span>
                    <p className="text-xs text-off-white/70">{m.detail}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {country.sources.length > 0 && (
            <section>
              <h3 className="text-xl font-heading font-bold mb-6 flex items-center"><BookOpen className="mr-2 h-5 w-5 text-accent" /> Sources</h3>
              <div className="space-y-2">
                {country.sources.map((s, i) => (
                  <div key={i} className="flex items-start justify-between gap-2 text-sm border-b border-muted-blue/20 pb-2">
                    <div>
                      <span className="text-off-white/90 block">{s.publisher}</span>
                      <span className="text-xs text-off-white/50">{s.title}</span>
                    </div>
                    {s.url && (
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-light flex-shrink-0 mt-0.5">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-16">
          {country.recentDevelopments.length > 0 && (
            <section>
              <h2 className="text-3xl font-heading font-bold mb-8 flex items-center gap-3"><CalendarClock className="h-7 w-7 text-accent" /> Recent Developments</h2>
              <div className="space-y-4">
                {country.recentDevelopments.map((d, i) => (
                  <div key={i} className="p-6 bg-primary-light border border-accent/20 border-l-4 border-l-accent">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-accent font-semibold text-sm">{d.date}</span>
                    </div>
                    <h4 className="text-lg font-bold text-off-white mb-2">{d.title}</h4>
                    <p className="text-off-white/80 text-sm mb-3">{d.description}</p>
                    <p className="text-xs text-off-white/60"><strong className="text-off-white/80">Why it matters:</strong> {d.whyItMatters}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="text-3xl font-heading font-bold mb-8">Diplomatic History</h2>
            <div className="relative border-l-2 border-muted-blue/30 ml-3 md:ml-4 space-y-12">
              {country.historicalEvents.length > 0 ? country.historicalEvents.map((event, i) => (
                <div key={i} className="relative pl-8">
                  <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-accent border-4 border-primary"></div>
                  <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                    <span className="text-2xl font-heading font-bold text-accent">{event.year}</span>
                    <span className={`text-xs px-2 py-1 rounded-sm border ${getCategoryColor(event.category)}`}>{event.category}</span>
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-off-white">{event.title}</h4>
                  <p className="text-off-white/80 leading-relaxed">{event.description}</p>
                  {event.impact && <p className="mt-3 text-sm text-off-white/60"><strong className="text-off-white/80">Impact:</strong> {event.impact}</p>}
                </div>
              )) : (
                <p className="pl-8 text-off-white/50">Detailed timeline data is currently being verified for this country.</p>
              )}
            </div>
          </section>

          {country.agreements.length > 0 && (
            <section>
              <h2 className="text-3xl font-heading font-bold mb-8">Major Agreements & Deals</h2>
              <div className="grid gap-4">
                {country.agreements.map((agreement, i) => (
                  <div key={i} className="p-6 bg-primary-light rounded-sm border border-muted-blue/30 hover:border-muted-blue transition-colors">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-3">
                      <div>
                        <h4 className="text-lg font-bold text-off-white">{agreement.name}</h4>
                        <div className="flex items-center gap-3 mt-1 text-sm">
                          <span className="text-accent font-semibold">{agreement.year}</span>
                          <span className="text-off-white/50">•</span>
                          <span className="text-off-white/70">{agreement.category}</span>
                          {agreement.status && <><span className="text-off-white/50">•</span><span className="text-good">{agreement.status}</span></>}
                        </div>
                      </div>
                    </div>
                    <p className="text-off-white/80 text-sm">{agreement.description}</p>
                    {agreement.significance && <p className="text-off-white/60 text-xs mt-2"><strong className="text-off-white/80">Significance:</strong> {agreement.significance}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {country.majorAreasOfCooperation.length > 0 && (
            <section>
              <h2 className="text-3xl font-heading font-bold mb-8">Areas of Cooperation</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {country.majorAreasOfCooperation.map((coop, i) => (
                  <div key={i} className="p-5 bg-primary-light rounded-sm border border-good/20 border-l-4 border-l-good">
                    <h4 className="font-bold text-off-white mb-1">{coop.area}</h4>
                    <p className="text-sm text-off-white/70">{coop.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {country.majorChallenges.length > 0 && (
            <section>
              <h2 className="text-3xl font-heading font-bold mb-8 flex items-center gap-3"><AlertTriangle className="h-7 w-7 text-average" /> Major Disputes & Challenges</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {country.majorChallenges.map((ch, i) => (
                  <div key={i} className="p-5 bg-primary-light rounded-sm border border-average/20 border-l-4 border-l-average">
                    <h4 className="font-bold text-off-white mb-1">{ch.title}</h4>
                    <p className="text-sm text-off-white/70">{ch.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {country.leaders.length > 0 && (
            <section>
              <h2 className="text-3xl font-heading font-bold mb-4">Key Leaders</h2>
              <p className="text-xs text-off-white/40 mb-6">Current as of {country.lastVerified} — verify for recent changes in office.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {country.leaders.map((leader, i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 bg-primary-light rounded-sm border border-muted-blue/30">
                    <div className="flex flex-col">
                      <span className="text-xs text-off-white/50 uppercase tracking-wider mb-1">{leader.isIndian ? 'India 🇮🇳' : `${country.name} ${country.flag}`}</span>
                      <span className="font-bold text-off-white text-lg">{leader.name}</span>
                      <span className="text-sm text-accent">{leader.position}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {country.tier === 'standard' && (
            <div className="p-6 border border-muted-blue/30 bg-primary-light text-sm text-off-white/60">
              This is a Level 1 summary profile. Detailed diplomatic history, agreements and trade data are available for India&rsquo;s 50+ most closely tracked relationships — see the <Link href="/countries" className="text-accent hover:underline">country explorer</Link> for the full list.
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
