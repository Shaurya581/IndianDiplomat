'use client'

import { useState } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import { useRouter } from 'next/navigation'
import indiaPolitical from '@/data/maps/india-political.json'
import indiaDisputed from '@/data/maps/india-disputed.json'

// 50m resolution — finer coastlines/borders than the default 110m atlas.
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"

export type CountryMapData = {
  id: string;
  name: string;
  level: string;
  score: number;
}

interface WorldMapProps {
  data: CountryMapData[];
}

type Tooltip =
  | { kind: 'india' }
  | { kind: 'disputed' }
  | { kind: 'tracked'; data: CountryMapData }
  | { kind: 'untracked'; name: string }
  | null

// Names in the world-atlas/Natural Earth dataset that differ from the names
// used in our country dataset.
const ALIAS_MAP: Record<string, string> = {
  "United States of America": "United States",
  "Russian Federation": "Russia",
  "Dem. Rep. Korea": "North Korea",
  "Republic of Korea": "South Korea",
  "United Republic of Tanzania": "Tanzania",
  "Republic of Serbia": "Serbia",
  "Lao PDR": "Laos",
  "Turkey": "Türkiye",
  "Macedonia": "North Macedonia",
  "Vatican": "Vatican City",
  "eSwatini": "Eswatini",
  "Antigua and Barb.": "Antigua and Barbuda",
  "Bosnia and Herz.": "Bosnia and Herzegovina",
  "Central African Rep.": "Central African Republic",
  "Congo": "Republic of the Congo",
  "Dem. Rep. Congo": "Democratic Republic of the Congo",
  "Dominican Rep.": "Dominican Republic",
  "Eq. Guinea": "Equatorial Guinea",
  "Marshall Is.": "Marshall Islands",
  "S. Sudan": "South Sudan",
  "Solomon Is.": "Solomon Islands",
  "St. Kitts and Nevis": "Saint Kitts and Nevis",
  "St. Vin. and Gren.": "Saint Vincent and the Grenadines",
  "São Tomé and Principe": "São Tomé and Príncipe",
}

const LEVEL_COLOR: Record<string, string> = {
  EXCELLENT: 'var(--color-excellent)',
  GOOD: 'var(--color-good)',
  AVERAGE: 'var(--color-average)',
  POOR: 'var(--color-poor)',
}

export default function WorldMapCore({ data }: WorldMapProps) {
  const [tooltip, setTooltip] = useState<Tooltip>(null)
  const router = useRouter()

  const dataMap = new Map(data.map(d => [d.name, d]))

  const getCountryData = (geoName: string) => {
    if (dataMap.has(geoName)) return dataMap.get(geoName)
    const alias = ALIAS_MAP[geoName]
    if (alias && dataMap.has(alias)) return dataMap.get(alias)
    return null
  }

  const getColor = (level: string) => LEVEL_COLOR[level] || '#334155'

  return (
    <div className="w-full h-full relative bg-[#0a1122]">
      {tooltip && (
        <div className="absolute top-4 right-4 bg-primary-light border border-muted-blue p-4 rounded-sm shadow-xl pointer-events-none z-10 min-w-[200px]">
          {tooltip.kind === 'india' && (
            <>
              <div className="font-bold text-india text-lg mb-1">India 🇮🇳</div>
              <div className="text-xs text-off-white/70">Home country</div>
              <div className="text-[10px] text-off-white/40 mt-2 uppercase tracking-wide">Click to view profile</div>
            </>
          )}
          {tooltip.kind === 'disputed' && (
            <>
              <div className="font-bold text-off-white text-lg mb-1">Disputed territory</div>
              <div className="text-xs text-india font-semibold mb-1">Claimed by India, administered by Pakistan</div>
              <div className="text-xs text-off-white/70">Pakistan-administered Jammu &amp; Kashmir (Azad Kashmir, Gilgit-Baltistan) and the Shaksgam Tract.</div>
            </>
          )}
          {tooltip.kind === 'tracked' && (
            <>
              <div className="font-bold text-off-white text-lg mb-1">{tooltip.data.name}</div>
              <div className="text-sm font-semibold mb-2" style={{ color: getColor(tooltip.data.level) }}>
                {tooltip.data.level}
              </div>
              <div className="text-xs text-off-white/70">
                Score: <span className="font-bold text-off-white">{tooltip.data.score}/100</span>
              </div>
              <div className="text-[10px] text-off-white/40 mt-2 uppercase tracking-wide">Click to view profile</div>
            </>
          )}
          {tooltip.kind === 'untracked' && (
            <>
              <div className="font-bold text-off-white text-md">{tooltip.name}</div>
              <div className="text-xs text-off-white/50 mt-1">No tracked data</div>
            </>
          )}
        </div>
      )}

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 120 }}
        className="w-full h-full outline-none"
      >
        <defs>
          <pattern id="india-disputed-hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
            <rect width="6" height="6" fill="var(--color-india)" />
            <line x1="0" y1="0" x2="0" y2="6" stroke="#0a1122" strokeWidth="2" />
          </pattern>
        </defs>
        <ZoomableGroup center={[0, 20]} zoom={1} minZoom={1} maxZoom={8}>
          {/* Rest of the world, from the bundled world-atlas dataset. India's
              own feature here is rendered without fill — its accurate shape
              is drawn as a dedicated layer below so it isn't affected by
              this base dataset's (non-Survey-of-India) convention. */}
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const geoName = geo.properties.name
                if (geoName === 'India') {
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="transparent"
                      stroke="none"
                      style={{ default: { outline: 'none' }, hover: { outline: 'none' }, pressed: { outline: 'none' } }}
                    />
                  )
                }

                const countryData = getCountryData(geoName)
                const fillColor = countryData ? getColor(countryData.level) : "#1e293b"

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fillColor}
                    stroke="#0a1122"
                    strokeWidth={0.5}
                    className="outline-none transition-colors duration-200"
                    onMouseEnter={() => {
                      if (countryData) {
                        setTooltip({ kind: 'tracked', data: countryData })
                      } else {
                        setTooltip({ kind: 'untracked', name: geoName })
                      }
                    }}
                    onMouseLeave={() => setTooltip(null)}
                    onClick={() => {
                      if (countryData) router.push(`/countries/${countryData.id}`)
                    }}
                    style={{
                      default: { outline: "none" },
                      hover: { fill: countryData ? "#fde047" : "#334155", outline: "none", cursor: countryData ? 'pointer' : 'default' },
                      pressed: { outline: "none" },
                    }}
                  />
                )
              })
            }
          </Geographies>

          {/* India — Survey-of-India-convention territorial outline. See
              src/data/maps/SOURCE.md for provenance. */}
          <Geographies geography={indiaPolitical}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="var(--color-india)"
                  stroke="#0a1122"
                  strokeWidth={0.5}
                  className="outline-none transition-colors duration-200"
                  onMouseEnter={() => setTooltip({ kind: 'india' })}
                  onMouseLeave={() => setTooltip(null)}
                  onClick={() => router.push('/countries/india')}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#fde047", outline: "none", cursor: 'pointer' },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {/* India-claimed / Pakistan-administered territory overlay. */}
          <Geographies geography={indiaDisputed}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="url(#india-disputed-hatch)"
                  stroke="#0a1122"
                  strokeWidth={0.5}
                  className="outline-none"
                  onMouseEnter={() => setTooltip({ kind: 'disputed' })}
                  onMouseLeave={() => setTooltip(null)}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", cursor: 'default' },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
}
