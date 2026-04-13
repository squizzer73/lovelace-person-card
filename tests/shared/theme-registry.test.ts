// tests/shared/theme-registry.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { setTheme, getTheme, resolveZoneStyles, THEME_EVENT } from '../../src/shared/theme-registry';
import type { ZoneStyleConfig } from '../../src/shared/types';

const zones: ZoneStyleConfig[] = [
  { zone: 'home', label: 'Home', border_color: '#76c442' },
];

beforeEach(() => {
  // Clear global state between tests
  (globalThis as any).personCardTheme = undefined;
});

describe('theme-registry', () => {
  it('getTheme returns undefined when no theme set', () => {
    expect(getTheme()).toBeUndefined();
  });

  it('setTheme stores zone styles globally', () => {
    setTheme(zones);
    expect(getTheme()?.zoneStyles).toEqual(zones);
  });

  it('getTheme returns the last set theme', () => {
    const zones2: ZoneStyleConfig[] = [{ zone: 'work', label: 'Office' }];
    setTheme(zones);
    setTheme(zones2);
    expect(getTheme()?.zoneStyles).toEqual(zones2);
  });
});

describe('resolveZoneStyles', () => {
  it('returns theme styles when card has no zone_styles', () => {
    setTheme([{ zone: 'home', label: 'Home', border_color: '#abc' }]);
    expect(resolveZoneStyles([])).toEqual([{ zone: 'home', label: 'Home', border_color: '#abc' }]);
  });

  it('returns empty array when no theme and no card styles', () => {
    expect(resolveZoneStyles([])).toEqual([]);
  });

  it('uses card styles when fully configured (has both colors)', () => {
    setTheme([{ zone: 'home', label: 'HomeTheme', border_color: '#theme', background_color: '#themebg' }]);
    const cardStyles: ZoneStyleConfig[] = [
      { zone: 'home', label: 'HomeCard', border_color: '#card', background_color: '#cardbg' },
    ];
    const result = resolveZoneStyles(cardStyles);
    expect(result[0].border_color).toBe('#card');
    expect(result[0].background_color).toBe('#cardbg');
  });

  it('fills missing border_color from theme when card zone has no color', () => {
    setTheme([{ zone: 'kerrys', label: "Kerry's", border_color: '#green', background_color: '#greenbg' }]);
    const cardStyles: ZoneStyleConfig[] = [
      { zone: 'kerrys', label: "Kerry's", icon: 'mdi:map-marker' }, // no colors
    ];
    const result = resolveZoneStyles(cardStyles);
    expect(result[0].border_color).toBe('#green');
    expect(result[0].background_color).toBe('#greenbg');
  });

  it('leaves card zone unchanged when not in theme', () => {
    setTheme([{ zone: 'home', border_color: '#abc' }]);
    const cardStyles: ZoneStyleConfig[] = [
      { zone: 'custom_zone', label: 'Custom' }, // not in theme
    ];
    const result = resolveZoneStyles(cardStyles);
    expect(result[0].zone).toBe('custom_zone');
    expect(result[0].border_color).toBeUndefined();
  });
});
