'use client'

import dynamic from 'next/dynamic'
import type { CountryMapData } from './WorldMapCore'

export type { CountryMapData }

// react-simple-maps reads window/SVG layout details that don't exist during
// SSR, so it's loaded client-only rather than gated behind a mounted-state
// effect.
export const WorldMap = dynamic(() => import('./WorldMapCore'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-off-white/50 text-sm">
      Loading interactive map...
    </div>
  ),
})
