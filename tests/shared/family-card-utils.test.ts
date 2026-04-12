// tests/shared/family-card-utils.test.ts
import { describe, it, expect } from 'vitest';
import { resolveGroupMembers, resolvePersonConfig } from '../../src/shared/family-card-utils';
import type { FamilyCardConfig, FamilyPersonConfig } from '../../src/shared/types';

const mockHass = {
  states: {
    'group.family': {
      state: 'home',
      attributes: { entity_id: ['person.mark', 'person.jane'] },
      last_updated: '',
    },
    'person.mark': {
      state: 'home',
      attributes: { friendly_name: 'Mark', entity_picture: '/local/mark.jpg', device_trackers: ['device_tracker.marks_phone'] },
      last_updated: '',
    },
    'person.jane': {
      state: 'work',
      attributes: { friendly_name: 'Jane' },
      last_updated: '',
    },
  },
};

describe('resolveGroupMembers', () => {
  it('returns entity IDs from group entity_id attribute', () => {
    expect(resolveGroupMembers(mockHass as any, 'group.family')).toEqual(['person.mark', 'person.jane']);
  });

  it('returns empty array when group entity missing', () => {
    expect(resolveGroupMembers(mockHass as any, 'group.missing')).toEqual([]);
  });
});

describe('resolvePersonConfig', () => {
  it('people[] overrides group_entity', () => {
    const config: FamilyCardConfig = {
      people: [{ entity: 'person.mark' }],
      group_entity: 'group.family',
    };
    const result = resolvePersonConfig(mockHass as any, config);
    expect(result.map(p => p.entity)).toEqual(['person.mark']);
  });

  it('uses group_entity when no people list', () => {
    const config: FamilyCardConfig = { group_entity: 'group.family' };
    const result = resolvePersonConfig(mockHass as any, config);
    expect(result.map(p => p.entity)).toEqual(['person.mark', 'person.jane']);
  });

  it('returns empty when neither people nor group_entity', () => {
    expect(resolvePersonConfig(mockHass as any, {})).toEqual([]);
  });
});
