// src/shared/types.ts

export interface HassLike {
  states: Record<string, HassStateLike>;
}

export interface HassStateLike {
  state: string;
  attributes: Record<string, unknown>;
  last_updated?: string;
  last_changed?: string;
}

export interface PersonCardConfig {
  person_entity: string;
  name?: string;
  photo?: string;
  devices?: DeviceConfig[];
  eta_entity?: string;
  size?: SizeConfig;
  show_eta?: boolean;
  show_last_seen?: boolean;
  show_notification_badge?: boolean;
  address_entity?: string;
  background_image?: string;
  zone_styles?: ZoneStyleConfig[];
  conditions?: ConditionRule[];
  offline_threshold?: number; // minutes since last update before showing stale indicator; 0 or undefined = disabled
  card_theme?: CardTheme;
}

export interface DeviceConfig {
  entity: string;
  name?: string;
  icon?: string;
  battery_entity?: string;
  connectivity_entity?: string;
  battery_threshold?: number; // % — card turns red/triggers badge at this level; default 20
}

export interface ZoneStyleConfig {
  // Matches the person entity state value: 'home', 'Work', 'not_home', 'unknown', etc.
  zone: string;
  label?: string;
  icon?: string;
  background_color?: string;
  border_color?: string;
}

export interface ConditionRule {
  /** UUID generated on creation — use crypto.randomUUID() */
  id: string;
  label?: string;
  operator: 'and' | 'or';
  conditions: Condition[];
  effect: StyleEffect;
}

export interface Condition {
  entity: string;
  attribute?: string;
  operator: 'eq' | 'neq' | 'lt' | 'gt' | 'lte' | 'gte' | 'contains';
  /** number when operator is lt|gt|lte|gte; string when operator is contains; either for eq|neq */
  value: string | number;
}

export interface StyleEffect {
  background_color?: string;
  border_color?: string;
  border_width?: number;
  badge_color?: string;
  badge_icon?: string;
}

/** Resolved display tier — never 'auto'. Use SizeConfig for the config field. */
export type SizeTier = 'small' | 'medium' | 'large' | 'hero' | 'stats';

/** Config value for size — includes 'auto' which resolves via ResizeObserver. */
export type SizeConfig = 'auto' | SizeTier;

export type ConnectivityState = 'online' | 'offline' | 'unknown';

export type ThemeCardDisplayStyle = 'legend' | 'compact' | 'pills' | 'list' | 'grid' | 'hidden';

export type CardTheme = 'default' | 'glass' | 'scifi' | 'steampunk' | 'terminal' | 'neon';

export interface PersonCardThemeConfig {
  zone_styles: ZoneStyleConfig[];
  display_style?: ThemeCardDisplayStyle;
}

export type FamilyCardDensity = 'compact' | 'mini' | 'detailed';

export interface FamilyPersonConfig {
  entity: string;
  name?: string;
  photo?: string;
  devices?: DeviceConfig[];
  eta_entity?: string;
  address_entity?: string;
  show_eta?: boolean;
  show_last_seen?: boolean;
  show_notification_badge?: boolean;
  offline_threshold?: number;
  tap_action?: { action: 'more-info' } | { action: 'navigate'; navigation_path: string };
}

export interface FamilyCardConfig {
  people?: FamilyPersonConfig[];
  group_entity?: string;
  density?: FamilyCardDensity;
  group_by_zone?: boolean;
  show_summary?: boolean;
  show_devices?: boolean;
  show_last_seen?: boolean;
  show_eta?: boolean;
  show_notification_badge?: boolean;
  offline_threshold?: number;
  zone_styles?: ZoneStyleConfig[];
  conditions?: ConditionRule[];
  background_image?: string;
  card_theme?: CardTheme;
}

export interface FamilyGridCardConfig {
  title?: string;                    // Optional header label. Omit to hide header entirely.
  columns?: number;                  // Grid columns 1–6. Default: 3.
  people?: FamilyPersonConfig[];     // People to display. Reuses existing type.
  zone_styles?: ZoneStyleConfig[];   // Per-zone colour/icon/label overrides (falls back to Theme Card).
}
