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
  if (cardZoneStyles.length > 0) return cardZoneStyles;
  return getTheme()?.zoneStyles ?? [];
}
