'use client'

import { useState, useMemo } from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { X } from 'lucide-react'
import type { RelationshipDimensions, RelationshipLevel, RelationshipStatus } from '@/types/country'
import { LEVEL_LABEL } from '@/lib/relationship-score'

export type CompareCountry = {
  id: string
  name: string
  flag: string
  level: RelationshipLevel
  status: RelationshipStatus
  score: number
  dimensions: RelationshipDimensions
  trade: { total: string; exports: string; imports: string } | null
  agreementsCount: number
}

const colors = ["#d4af37", "#22C55E", "#3B82F6"] // Gold, Green, Blue

const DIMENSION_LABELS: [keyof RelationshipDimensions, string][] = [
  ['diplomatic', 'Diplomatic'],
  ['strategic', 'Strategic'],
  ['economic', 'Economic'],
  ['defence', 'Defence'],
  ['political', 'Political'],
  ['technology', 'Technology'],
  ['energy', 'Energy'],
  ['peopleToPeople', 'People-to-People'],
  ['multilateral', 'Multilateral'],
  ['momentum', 'Momentum'],
]

export function CompareTool({ allCountries }: { allCountries: CompareCountry[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const selectedCountries = selectedIds.map(id => allCountries.find(c => c.id === id)!)

  const radarData = useMemo(() => {
    return DIMENSION_LABELS.map(([key, label]) => {
      const dataPoint: Record<string, string | number> = { subject: label }
      selectedCountries.forEach(country => {
        dataPoint[country.name] = country.dimensions[key]
      })
      return dataPoint
    })
  }, [selectedCountries])

  const addCountry = (id: string) => {
    if (selectedIds.length < 3 && !selectedIds.includes(id) && id) {
      setSelectedIds([...selectedIds, id])
    }
  }

  const removeCountry = (id: string) => {
    setSelectedIds(selectedIds.filter(selected => selected !== id))
  }

  return (
    <div className="space-y-12">
      {/* Selector */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-primary-light p-6 border border-muted-blue/30">
        <span className="font-bold text-off-white">Add Country to Compare ({selectedIds.length}/3):</span>
        <select
          className="w-full md:w-64 appearance-none pl-4 pr-10 py-3 bg-primary border border-muted-blue/50 focus:outline-none focus:border-accent text-off-white"
          onChange={(e) => addCountry(e.target.value)}
          value=""
          disabled={selectedIds.length >= 3}
        >
          <option value="" disabled>Select a country...</option>
          {allCountries.filter(c => !selectedIds.includes(c.id)).map(c => (
            <option key={c.id} value={c.id}>{c.flag} {c.name}</option>
          ))}
        </select>
      </div>

      {selectedCountries.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Radar Chart */}
          <div className="bg-primary-light p-6 border border-muted-blue/30 aspect-square md:aspect-auto md:h-[550px]">
            <h3 className="text-xl font-heading font-bold mb-6 text-center">Metrics Comparison</h3>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#F8FAFC', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#F8FAFC' }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                {selectedCountries.map((country, idx) => (
                  <Radar
                    key={country.id}
                    name={country.name}
                    dataKey={country.name}
                    stroke={colors[idx]}
                    fill={colors[idx]}
                    fillOpacity={0.3}
                  />
                ))}
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 content-start">
            {selectedCountries.map((country, idx) => (
              <div key={country.id} className="bg-primary-light border border-muted-blue/30 overflow-hidden relative">
                <button
                  onClick={() => removeCountry(country.id)}
                  className="absolute top-4 right-4 text-off-white/50 hover:text-poor transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-3xl">{country.flag}</span>
                    <h4 className="text-xl font-bold" style={{ color: colors[idx] }}>{country.name}</h4>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-muted-blue/30">
                      <span className="text-sm text-off-white/70">Overall Score</span>
                      <span className="font-bold text-lg">{country.score}/100</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-muted-blue/30">
                      <span className="text-sm text-off-white/70">Status</span>
                      <span className="font-bold text-sm">{LEVEL_LABEL[country.level]} — {country.status}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-muted-blue/30">
                      <span className="text-sm text-off-white/70">Total Trade</span>
                      <span className="font-bold text-sm">{country.trade?.total || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-muted-blue/30">
                      <span className="text-sm text-off-white/70">Major Agreements</span>
                      <span className="font-bold text-sm">{country.agreementsCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="py-20 text-center border-2 border-dashed border-muted-blue/30">
          <p className="text-xl text-off-white/50 mb-4">Select countries above to begin comparison.</p>
        </div>
      )}
    </div>
  )
}
