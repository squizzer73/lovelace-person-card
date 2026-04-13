// tests/shared/battery-utils.test.ts
import { describe, it, expect } from 'vitest';
import { getBatteryColor } from '../../src/shared/battery-utils';

describe('getBatteryColor', () => {
  it('returns red when battery at or below threshold', () => {
    expect(getBatteryColor(20, 20)).toBe('#f44336');
    expect(getBatteryColor(10, 20)).toBe('#f44336');
  });

  it('returns amber when battery below 50% but above threshold', () => {
    expect(getBatteryColor(30, 20)).toBe('#ff9800');
    expect(getBatteryColor(49, 20)).toBe('#ff9800');
  });

  it('returns green when battery 50% or above', () => {
    expect(getBatteryColor(50, 20)).toBe('#4caf50');
    expect(getBatteryColor(100, 20)).toBe('#4caf50');
  });

  it('uses default threshold of 20 when not provided', () => {
    expect(getBatteryColor(20)).toBe('#f44336');
    expect(getBatteryColor(21)).toBe('#ff9800');
  });
});
