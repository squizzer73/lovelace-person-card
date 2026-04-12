// src/shared/zone-utils.ts
import type { ZoneStyleConfig } from './types';

export function resolveZoneStyle(zone: string, zoneStyles: ZoneStyleConfig[]): ZoneStyleConfig | undefined {
  return zoneStyles.find(s => s.zone === zone);
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
