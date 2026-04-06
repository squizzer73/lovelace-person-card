export interface PersonCardConfig {
  person_entity: string;
  name?: string;
  photo?: string;
  devices?: DeviceConfig[];
  size?: SizeConfig;
  show_eta?: boolean;
  show_last_seen?: boolean;
  show_notification_badge?: boolean;
  background_image?: string;
  zone_styles?: ZoneStyleConfig[];
  conditions?: ConditionRule[];
}

export interface DeviceConfig {
  entity: string;
  name?: string;
  icon?: string;
  battery_entity?: string;
  connectivity_entity?: string;
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
export type SizeTier = 'small' | 'medium' | 'large';

/** Config value for size — includes 'auto' which resolves via ResizeObserver. */
export type SizeConfig = 'auto' | SizeTier;

export type ConnectivityState = 'online' | 'offline' | 'unknown';
