// src/shared/eta-migration.ts
import type { PersonCardConfig } from './types';

export function migrateEtaSentinel(config: PersonCardConfig): PersonCardConfig {
  if (config.eta_entity) return config;
  const etaDevice = config.devices?.find(d => d.name === '__eta__');
  if (!etaDevice) return config;
  return {
    ...config,
    eta_entity: etaDevice.entity,
    devices: config.devices?.filter(d => d.name !== '__eta__'),
  };
}
