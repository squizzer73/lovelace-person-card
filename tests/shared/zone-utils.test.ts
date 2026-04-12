// tests/shared/zone-utils.test.ts
import { describe, it, expect } from 'vitest';
import { resolveZoneStyle, getZoneLabel, getZoneIcon } from '../../src/shared/zone-utils';
import type { ZoneStyleConfig } from '../../src/shared/types';

const zoneStyles: ZoneStyleConfig[] = [
  { zone: 'home', label: 'Home', icon: 'mdi:home', background_color: '#111', border_color: '#76c442' },
  { zone: 'work', label: 'Office', icon: 'mdi:briefcase' },
];

describe('resolveZoneStyle', () => {
  it('returns matching zone style', () => {
    expect(resolveZoneStyle('home', zoneStyles)).toEqual(zoneStyles[0]);
  });

  it('returns undefined when no match', () => {
    expect(resolveZoneStyle('school', zoneStyles)).toBeUndefined();
  });

  it('returns undefined for empty array', () => {
    expect(resolveZoneStyle('home', [])).toBeUndefined();
  });
});

describe('getZoneLabel', () => {
  it('returns configured label', () => {
    expect(getZoneLabel('home', zoneStyles)).toBe('Home');
  });

  it('returns "Away" for not_home with no config', () => {
    expect(getZoneLabel('not_home', [])).toBe('Away');
  });

  it('returns "Unknown" for unknown zone', () => {
    expect(getZoneLabel('unknown', [])).toBe('Unknown');
  });

  it('replaces underscores with spaces for unlisted zones', () => {
    expect(getZoneLabel('my_zone', [])).toBe('my zone');
  });
});

describe('getZoneIcon', () => {
  it('returns configured icon', () => {
    expect(getZoneIcon('home', zoneStyles)).toBe('mdi:home');
  });

  it('returns mdi:home for home with no config', () => {
    expect(getZoneIcon('home', [])).toBe('mdi:home');
  });

  it('returns mdi:map-marker-off for not_home with no config', () => {
    expect(getZoneIcon('not_home', [])).toBe('mdi:map-marker-off');
  });

  it('returns mdi:help-circle for unknown', () => {
    expect(getZoneIcon('unknown', [])).toBe('mdi:help-circle');
  });

  it('returns mdi:map-marker as fallback', () => {
    expect(getZoneIcon('school', [])).toBe('mdi:map-marker');
  });
});
