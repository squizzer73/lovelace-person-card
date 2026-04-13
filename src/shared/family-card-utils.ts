// src/shared/family-card-utils.ts
import type { FamilyCardConfig, FamilyPersonConfig, HassLike } from './types';

export function resolveGroupMembers(hass: HassLike, groupEntity: string): string[] {
  const state = hass.states[groupEntity];
  if (!state) return [];
  const ids = state.attributes['entity_id'];
  if (!Array.isArray(ids)) return [];
  return ids as string[];
}

export function resolvePersonConfig(hass: HassLike, config: FamilyCardConfig): FamilyPersonConfig[] {
  if (config.people && config.people.length > 0) return config.people;
  if (config.group_entity) {
    return resolveGroupMembers(hass, config.group_entity).map(entity => ({ entity }));
  }
  return [];
}
