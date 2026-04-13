// tests/shared/eta-migration.test.ts
import { describe, it, expect } from 'vitest';
import { migrateEtaSentinel } from '../../src/shared/eta-migration';
import type { PersonCardConfig } from '../../src/shared/types';

describe('migrateEtaSentinel', () => {
  it('extracts __eta__ device into eta_entity field', () => {
    const config: PersonCardConfig = {
      person_entity: 'person.mark',
      devices: [
        { entity: 'device_tracker.phone', name: 'Phone' },
        { entity: 'sensor.travel_time', name: '__eta__' },
      ],
    };
    const result = migrateEtaSentinel(config);
    expect(result.eta_entity).toBe('sensor.travel_time');
    expect(result.devices?.every(d => d.name !== '__eta__')).toBe(true);
  });

  it('returns config unchanged when no __eta__ sentinel', () => {
    const config: PersonCardConfig = {
      person_entity: 'person.mark',
      devices: [{ entity: 'device_tracker.phone', name: 'Phone' }],
    };
    const result = migrateEtaSentinel(config);
    expect(result.eta_entity).toBeUndefined();
    expect(result.devices?.length).toBe(1);
  });

  it('preserves existing eta_entity if already set', () => {
    const config: PersonCardConfig = {
      person_entity: 'person.mark',
      eta_entity: 'sensor.existing',
    };
    const result = migrateEtaSentinel(config);
    expect(result.eta_entity).toBe('sensor.existing');
  });
});
