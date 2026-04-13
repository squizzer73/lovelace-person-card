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
