import { describe, it, expect } from 'vitest';
import { evaluateConditions } from '../../src/lib/condition-engine';
import type { ConditionRule } from '../../src/types';

const mockHass = {
  states: {
    'device_tracker.phone': {
      state: 'not_home',
      attributes: { battery_level: 15 },
    },
    'sensor.battery': {
      state: '15',
      attributes: {},
    },
    'person.mark': {
      state: 'Work',
      attributes: {},
    },
  },
};

describe('evaluateConditions', () => {
  it('returns empty effect when rules array is empty', () => {
    expect(evaluateConditions([], mockHass)).toEqual({});
  });

  it('returns empty effect when no rules match', () => {
    const rules: ConditionRule[] = [{
      id: '1',
      operator: 'and',
      conditions: [{ entity: 'device_tracker.phone', operator: 'eq', value: 'home' }],
      effect: { background_color: '#00ff00' },
    }];
    expect(evaluateConditions(rules, mockHass)).toEqual({});
  });

  it('applies effect when eq condition matches state', () => {
    const rules: ConditionRule[] = [{
      id: '1',
      operator: 'and',
      conditions: [{ entity: 'device_tracker.phone', operator: 'eq', value: 'not_home' }],
      effect: { background_color: '#ff0000' },
    }];
    expect(evaluateConditions(rules, mockHass)).toEqual({ background_color: '#ff0000' });
  });

  it('applies effect when neq condition matches', () => {
    const rules: ConditionRule[] = [{
      id: '1',
      operator: 'and',
      conditions: [{ entity: 'device_tracker.phone', operator: 'neq', value: 'home' }],
      effect: { border_color: '#ff8800' },
    }];
    expect(evaluateConditions(rules, mockHass)).toEqual({ border_color: '#ff8800' });
  });

  it('applies effect when lt condition matches numeric state', () => {
    const rules: ConditionRule[] = [{
      id: '1',
      operator: 'and',
      conditions: [{ entity: 'sensor.battery', operator: 'lt', value: 20 }],
      effect: { badge_color: '#ff0000' },
    }];
    expect(evaluateConditions(rules, mockHass)).toEqual({ badge_color: '#ff0000' });
  });

  it('applies effect when gt condition matches', () => {
    const rules: ConditionRule[] = [{
      id: '1',
      operator: 'and',
      conditions: [{ entity: 'sensor.battery', operator: 'gt', value: 10 }],
      effect: { badge_color: '#00ff00' },
    }];
    expect(evaluateConditions(rules, mockHass)).toEqual({ badge_color: '#00ff00' });
  });

  it('applies effect when lte matches exact value', () => {
    const rules: ConditionRule[] = [{
      id: '1',
      operator: 'and',
      conditions: [{ entity: 'sensor.battery', operator: 'lte', value: 15 }],
      effect: { background_color: '#111111' },
    }];
    expect(evaluateConditions(rules, mockHass)).toEqual({ background_color: '#111111' });
  });

  it('applies effect when gte matches exact value', () => {
    const rules: ConditionRule[] = [{
      id: '1',
      operator: 'and',
      conditions: [{ entity: 'sensor.battery', operator: 'gte', value: 15 }],
      effect: { background_color: '#222222' },
    }];
    expect(evaluateConditions(rules, mockHass)).toEqual({ background_color: '#222222' });
  });

  it('applies effect when contains matches', () => {
    const rules: ConditionRule[] = [{
      id: '1',
      operator: 'and',
      conditions: [{ entity: 'person.mark', operator: 'contains', value: 'ork' }],
      effect: { background_color: '#333333' },
    }];
    expect(evaluateConditions(rules, mockHass)).toEqual({ background_color: '#333333' });
  });

  it('checks attribute value when attribute is specified', () => {
    const rules: ConditionRule[] = [{
      id: '1',
      operator: 'and',
      conditions: [{
        entity: 'device_tracker.phone',
        attribute: 'battery_level',
        operator: 'lt',
        value: 20,
      }],
      effect: { badge_icon: 'mdi:battery-alert' },
    }];
    expect(evaluateConditions(rules, mockHass)).toEqual({ badge_icon: 'mdi:battery-alert' });
  });

  it('and rule: does not match when any condition is false', () => {
    const rules: ConditionRule[] = [{
      id: '1',
      operator: 'and',
      conditions: [
        { entity: 'device_tracker.phone', operator: 'eq', value: 'not_home' }, // true
        { entity: 'sensor.battery', operator: 'gt', value: 50 },              // false
      ],
      effect: { background_color: '#ff0000' },
    }];
    expect(evaluateConditions(rules, mockHass)).toEqual({});
  });

  it('or rule: matches when any condition is true', () => {
    const rules: ConditionRule[] = [{
      id: '1',
      operator: 'or',
      conditions: [
        { entity: 'device_tracker.phone', operator: 'eq', value: 'home' },    // false
        { entity: 'sensor.battery', operator: 'lt', value: 20 },              // true
      ],
      effect: { border_color: '#ff0000' },
    }];
    expect(evaluateConditions(rules, mockHass)).toEqual({ border_color: '#ff0000' });
  });

  it('last matching rule wins (CSS-like precedence)', () => {
    const rules: ConditionRule[] = [
      {
        id: '1',
        operator: 'and',
        conditions: [{ entity: 'device_tracker.phone', operator: 'eq', value: 'not_home' }],
        effect: { background_color: '#ff0000' },
      },
      {
        id: '2',
        operator: 'and',
        conditions: [{ entity: 'sensor.battery', operator: 'lt', value: 20 }],
        effect: { background_color: '#0000ff' },
      },
    ];
    expect(evaluateConditions(rules, mockHass)).toEqual({ background_color: '#0000ff' });
  });

  it('merges non-conflicting effects from multiple matching rules', () => {
    const rules: ConditionRule[] = [
      {
        id: '1',
        operator: 'and',
        conditions: [{ entity: 'device_tracker.phone', operator: 'eq', value: 'not_home' }],
        effect: { background_color: '#ff0000' },
      },
      {
        id: '2',
        operator: 'and',
        conditions: [{ entity: 'sensor.battery', operator: 'lt', value: 20 }],
        effect: { border_color: '#0000ff' },
      },
    ];
    expect(evaluateConditions(rules, mockHass)).toEqual({
      background_color: '#ff0000',
      border_color: '#0000ff',
    });
  });

  it('returns empty effect for unknown entity', () => {
    const rules: ConditionRule[] = [{
      id: '1',
      operator: 'and',
      conditions: [{ entity: 'sensor.missing', operator: 'eq', value: 'on' }],
      effect: { background_color: '#ff0000' },
    }];
    expect(evaluateConditions(rules, mockHass)).toEqual({});
  });
});
