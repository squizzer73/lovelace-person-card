// src/shared/zone-utils.ts
import type { ZoneStyleConfig } from './types';

/** Normalise a zone key to entity-id style for loose matching: "Uni House" → "uni_house", "Kerry's" → "kerrys" */
function normalizeZoneKey(s: string): string {
  return s.toLowerCase().replace(/[\s-]+/g, '_').replace(/[^a-z0-9_]/g, '');
}

export function resolveZoneStyle(zone: string, zoneStyles: ZoneStyleConfig[]): ZoneStyleConfig | undefined {
  // Exact match first (fastest path, handles correctly-keyed entries)
  const exact = zoneStyles.find(s => s.zone === zone);
  if (exact) return exact;
  // Normalised fallback: "Uni House" matches "uni_house" and vice-versa.
  // HA returns the zone's friendly name as person.state (e.g. "Uni House"),
  // but configs generated before this fix stored the entity-id key ("uni_house").
  const normZone = normalizeZoneKey(zone);
  return zoneStyles.find(s => normalizeZoneKey(s.zone) === normZone);
}

export function getZoneLabel(zone: string, zoneStyles: ZoneStyleConfig[], address = ''): string {
  const style = resolveZoneStyle(zone, zoneStyles);
  if (style?.label) return style.label;
  if (zone === 'not_home') return address || 'Away';
  if (zone === 'unknown') return 'Unknown';
  return zone.replace(/_/g, ' ');
}

export function getZoneIcon(zone: string, zoneStyles: ZoneStyleConfig[], hasAddress = false): string {
  const style = resolveZoneStyle(zone, zoneStyles);
  if (style?.icon) return style.icon;
  if (zone === 'home') return 'mdi:home';
  if (zone === 'not_home') return hasAddress ? 'mdi:map-marker' : 'mdi:map-marker-off';
  if (zone === 'unknown') return 'mdi:help-circle';
  return 'mdi:map-marker';
}

/**
 * Convert a CSS hex colour string to an rgba() string with the given alpha.
 * Handles 3-char and 6-char hex, with or without leading #.
 * Falls back to rgba(0,0,0,alpha) for invalid input.
 */
export function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3
    ? h.split('').map(c => c + c).join('')
    : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return `rgba(0, 0, 0, ${alpha})`;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
