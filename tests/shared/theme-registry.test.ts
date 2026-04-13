// tests/shared/theme-registry.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { setTheme, getTheme, THEME_EVENT } from '../../src/shared/theme-registry';
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
