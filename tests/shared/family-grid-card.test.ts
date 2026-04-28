// tests/shared/family-grid-card.test.ts
import { describe, it, expect } from 'vitest';
import { getRingSize, getInitials, countSummary } from '../../src/shared/family-grid-utils';

describe('getRingSize', () => {
  it('returns correct ring size for each column count', () => {
    expect(getRingSize(1)).toBe(110);
    expect(getRingSize(2)).toBe(90);
    expect(getRingSize(3)).toBe(70);
    expect(getRingSize(4)).toBe(58);
    expect(getRingSize(5)).toBe(50);
    expect(getRingSize(6)).toBe(42);
  });

  it('clamps to 1 column when given 0', () => {
    expect(getRingSize(0)).toBe(110);
  });

  it('clamps to 6 columns when given 10', () => {
    expect(getRingSize(10)).toBe(42);
  });
});

describe('getInitials', () => {
  it('returns first letter of name uppercased', () => {
    expect(getInitials('Mark', 'person.mark')).toBe('M');
  });

  it('uppercases a lowercase name', () => {
    expect(getInitials('james', 'person.james')).toBe('J');
  });

  it('falls back to entity id part after the dot when name is absent', () => {
    expect(getInitials(undefined, 'person.sarah')).toBe('S');
  });

  it('falls back to entity id part when name is empty string', () => {
    expect(getInitials('', 'person.lucy')).toBe('L');
  });

  it('handles entity id with no dot', () => {
    expect(getInitials(undefined, 'sarah')).toBe('S');
  });
});

describe('countSummary', () => {
  const hass = {
    states: {
      'person.mark':  { state: 'home',     attributes: {} },
      'person.sarah': { state: 'not_home', attributes: {} },
      'person.james': { state: 'home',     attributes: {} },
      'person.lucy':  { state: 'Work',     attributes: {} },
    },
  };

  it('counts home and non-home correctly', () => {
    const people = [
      { entity: 'person.mark' },
      { entity: 'person.sarah' },
      { entity: 'person.james' },
      { entity: 'person.lucy' },
    ];
    expect(countSummary(people, hass as any)).toEqual({ home: 2, away: 2 });
  });

  it('treats missing entity state as away', () => {
    const people = [{ entity: 'person.ghost' }];
    expect(countSummary(people, hass as any)).toEqual({ home: 0, away: 1 });
  });

  it('returns zeros for empty people list', () => {
    expect(countSummary([], hass as any)).toEqual({ home: 0, away: 0 });
  });
});
