export interface PersonCardConfig {
  person_entity: string;
  name?: string;
  photo?: string;
  devices?: DeviceConfig[];
  size?: 'auto' | 'small' | 'medium' | 'large';
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
  value: string | number;
}

export interface StyleEffect {
  background_color?: string;
  border_color?: string;
  border_width?: number;
  badge_color?: string;
  badge_icon?: string;
}

export type SizeTier = 'small' | 'medium' | 'large';

export type ConnectivityState = 'online' | 'offline' | 'unknown';
