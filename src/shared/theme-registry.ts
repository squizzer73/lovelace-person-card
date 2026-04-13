// src/shared/theme-registry.ts
import type { ZoneStyleConfig } from './types';

export const THEME_EVENT = 'person-card-theme-updated';

export interface PersonCardTheme {
  zoneStyles: ZoneStyleConfig[];
}

declare global {
  interface Window {
    personCardTheme?: PersonCardTheme;
  }
}

export function setTheme(zoneStyles: ZoneStyleConfig[]): void {
  (typeof window !== 'undefined' ? window : globalThis as any).personCardTheme = { zoneStyles };
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(THEME_EVENT));
  }
}

export function getTheme(): PersonCardTheme | undefined {
  return (typeof window !== 'undefined' ? window : globalThis as any).personCardTheme;
}

export function resolveZoneStyles(cardZoneStyles: ZoneStyleConfig[]): ZoneStyleConfig[] {
  const themeStyles = getTheme()?.zoneStyles ?? [];
  if (cardZoneStyles.length === 0) return themeStyles;

  // Card has its own zone_styles — merge with theme so missing colors are filled from the theme.
  // Card-level settings win; theme fills gaps (especially border_color / background_color).
  const themeMap = new Map(themeStyles.map(z => [z.zone, z]));
  return cardZoneStyles.map(z => {
    if (z.border_color && z.background_color) return z; // fully configured, no merge needed
    const themeZ = themeMap.get(z.zone);
    if (!themeZ) return z; // zone not in theme, nothing to fill
    return {
      ...themeZ,           // base: theme defaults
      ...z,                // card overrides take precedence
      border_color: z.border_color ?? themeZ.border_color,
      background_color: z.background_color ?? themeZ.background_color,
    };
  });
}
