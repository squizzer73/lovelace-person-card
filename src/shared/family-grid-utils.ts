// src/shared/family-grid-utils.ts
import type { FamilyPersonConfig, HassLike } from './types';

const RING_SIZES: Record<number, number> = {
  1: 110, 2: 90, 3: 70, 4: 58, 5: 50, 6: 42,
};

/** Returns ring diameter in px for the given column count, clamped to 1–6. */
export function getRingSize(columns: number): number {
  const clamped = Math.min(6, Math.max(1, Math.round(columns)));
  return RING_SIZES[clamped] ?? 70;
}

/**
 * Returns a single uppercase initial.
 * Uses the first non-empty character of name; falls back to the
 * part of entityId after the first dot (or the whole id if no dot).
 */
export function getInitials(name: string | undefined, entityId: string): string {
  const trimmed = name?.trim();
  if (trimmed) return trimmed[0].toUpperCase();
  const id = entityId.includes('.') ? entityId.split('.')[1] : entityId;
  return (id?.[0] ?? '?').toUpperCase();
}

/**
 * Counts how many people are currently home vs away.
 * Home = zone state exactly equals 'home'. Everything else counts as away.
 */
export function countSummary(
  people: Pick<FamilyPersonConfig, 'entity'>[],
  hass: HassLike,
): { home: number; away: number } {
  let home = 0;
  let away = 0;
  for (const p of people) {
    const zone = hass.states[p.entity]?.state ?? 'unknown';
    if (zone === 'home') home++;
    else away++;
  }
  return { home, away };
}
