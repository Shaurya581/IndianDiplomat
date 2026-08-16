import type { RelationshipDimensions, RelationshipLevel } from '@/types/country'

// Weights sum to 1.0. See /methodology for the rationale behind each dimension.
export const DIMENSION_WEIGHTS: Record<keyof RelationshipDimensions, number> = {
  diplomatic: 0.15,
  strategic: 0.15,
  economic: 0.15,
  defence: 0.15,
  political: 0.10,
  technology: 0.10,
  energy: 0.05,
  peopleToPeople: 0.05,
  multilateral: 0.05,
  momentum: 0.05,
}

export function computeOverall(dimensions: RelationshipDimensions): number {
  const weighted = (Object.keys(DIMENSION_WEIGHTS) as (keyof RelationshipDimensions)[]).reduce(
    (sum, key) => sum + dimensions[key] * DIMENSION_WEIGHTS[key],
    0
  )
  return Math.round(weighted)
}

export function levelFromScore(overall: number): RelationshipLevel {
  if (overall >= 80) return 'EXCELLENT'
  if (overall >= 60) return 'GOOD'
  if (overall >= 40) return 'AVERAGE'
  return 'POOR'
}

export const LEVEL_LABEL: Record<RelationshipLevel, string> = {
  EXCELLENT: 'Excellent',
  GOOD: 'Good',
  AVERAGE: 'Average',
  POOR: 'Poor',
}

export const LEVEL_COLOR_VAR: Record<RelationshipLevel, string> = {
  EXCELLENT: 'var(--color-excellent)',
  GOOD: 'var(--color-good)',
  AVERAGE: 'var(--color-average)',
  POOR: 'var(--color-poor)',
}
