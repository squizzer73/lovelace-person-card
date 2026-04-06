import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getBatteryLevel,
  getConnectivity,
  formatLastSeen,
  shouldShowNotificationBadge,
} from '../../src/lib/ha-helpers';

const mockHass = {
  states: {
    'device_tracker.phone': {
      state: 'not_home',
      attributes: { battery_level: 45 },
      last_updated: '2026-01-01T00:00:00.000Z',
    },
    'sensor.phone_battery': {
      state: '15',
      attributes: {},
      last_updated: '2026-01-01T00:00:00.000Z',
    },
    'binary_sensor.phone_wifi': {
      state: 'on',
      attributes: {},
      last_updated: '',
    },
    'device_tracker.watch': {
      state: 'home',
      attributes: { battery_level: 80 },
      last_updated: '',
    },
    'person.mark': {
      state: 'home',
      attributes: {},
      last_updated: '2026-01-01T00:00:00.000Z',
    },
  },
} as any;

describe('getBatteryLevel', () => {
  it('reads battery_level attribute when no battery_entity configured', () => {
    expect(getBatteryLevel(mockHass, { entity: 'device_tracker.phone' })).toBe(45);
  });

  it('reads separate battery_entity state when configured', () => {
    expect(getBatteryLevel(mockHass, {
      entity: 'device_tracker.phone',
      battery_entity: 'sensor.phone_battery',
    })).toBe(15);
  });

  it('returns null when entity does not exist', () => {
    expect(getBatteryLevel(mockHass, { entity: 'device_tracker.missing' })).toBeNull();
  });

  it('returns null when battery attribute is absent', () => {
    const hass = {
      states: { 'device_tracker.x': { state: 'home', attributes: {}, last_updated: '' } },
    } as any;
    expect(getBatteryLevel(hass, { entity: 'device_tracker.x' })).toBeNull();
  });

  it('returns 0 when battery is at 0%', () => {
    const hass = {
      states: { 'device_tracker.x': { state: 'home', attributes: { battery_level: 0 }, last_updated: '' } },
    } as any;
    expect(getBatteryLevel(hass, { entity: 'device_tracker.x' })).toBe(0);
  });
});

describe('getConnectivity', () => {
  it('returns offline when device state is not_home', () => {
    expect(getConnectivity(mockHass, { entity: 'device_tracker.phone' })).toBe('offline');
  });

  it('returns online when device state is home', () => {
    expect(getConnectivity(mockHass, { entity: 'device_tracker.watch' })).toBe('online');
  });

  it('uses connectivity_entity (binary_sensor on = online)', () => {
    expect(getConnectivity(mockHass, {
      entity: 'device_tracker.phone',
      connectivity_entity: 'binary_sensor.phone_wifi',
    })).toBe('online');
  });

  it('returns unknown when entity is missing', () => {
    expect(getConnectivity(mockHass, { entity: 'device_tracker.missing' })).toBe('unknown');
  });

  it('returns offline when connectivity_entity state is off', () => {
    const hass = {
      states: { 'binary_sensor.wifi': { state: 'off', attributes: {}, last_updated: '' } },
    } as any;
    expect(getConnectivity(hass, { entity: 'device_tracker.phone', connectivity_entity: 'binary_sensor.wifi' })).toBe('offline');
  });

  it('returns online when device state is the literal "online"', () => {
    const hass = {
      states: { 'sensor.device': { state: 'online', attributes: {}, last_updated: '' } },
    } as any;
    expect(getConnectivity(hass, { entity: 'sensor.device' })).toBe('online');
  });
});

describe('formatLastSeen', () => {
  it('returns "just now" when under one minute ago', () => {
    const ts = new Date(Date.now() - 30_000).toISOString();
    expect(formatLastSeen(ts, 'relative')).toBe('just now');
  });

  it('returns "X min ago" for 1–59 minutes', () => {
    const ts = new Date(Date.now() - 5 * 60_000).toISOString();
    expect(formatLastSeen(ts, 'relative')).toBe('5 min ago');
  });

  it('returns "Xh ago" for 1–23 hours', () => {
    const ts = new Date(Date.now() - 3 * 3_600_000).toISOString();
    expect(formatLastSeen(ts, 'relative')).toBe('3h ago');
  });

  it('returns "Xd ago" for 24+ hours', () => {
    const ts = new Date(Date.now() - 2 * 86_400_000).toISOString();
    expect(formatLastSeen(ts, 'relative')).toBe('2d ago');
  });

  it('returns HH:MM for absolute format', () => {
    const date = new Date();
    date.setHours(14, 32, 0, 0);
    const result = formatLastSeen(date.toISOString(), 'absolute');
    expect(result).toMatch(/14:32/);
  });

  it('returns "unknown" for empty string', () => {
    expect(formatLastSeen('', 'relative')).toBe('unknown');
  });

  it('returns "unknown" for invalid date string', () => {
    expect(formatLastSeen('not-a-date', 'relative')).toBe('unknown');
  });
});

describe('shouldShowNotificationBadge', () => {
  it('returns true when battery < 20% via battery_entity', () => {
    expect(shouldShowNotificationBadge(mockHass, [
      { entity: 'device_tracker.phone', battery_entity: 'sensor.phone_battery' },
    ], 'person.mark')).toBe(true);
  });

  it('returns true when a device is offline', () => {
    expect(shouldShowNotificationBadge(mockHass, [
      { entity: 'device_tracker.phone' },
    ], 'person.mark')).toBe(true); // phone is not_home = offline
  });

  it('returns true when person state is unknown', () => {
    const hass = {
      states: {
        'person.mark': { state: 'unknown', attributes: {}, last_updated: '' },
      },
    } as any;
    expect(shouldShowNotificationBadge(hass, [], 'person.mark')).toBe(true);
  });

  it('returns true when battery is exactly 20%', () => {
    const hass = {
      states: {
        'device_tracker.phone': { state: 'home', attributes: { battery_level: 20 }, last_updated: '' },
        'person.mark': { state: 'home', attributes: {}, last_updated: '' },
      },
    } as any;
    expect(shouldShowNotificationBadge(hass, [{ entity: 'device_tracker.phone' }], 'person.mark')).toBe(true);
  });

  it('returns true when battery is 0%', () => {
    const hass = {
      states: {
        'device_tracker.phone': { state: 'home', attributes: { battery_level: 0 }, last_updated: '' },
        'person.mark': { state: 'home', attributes: {}, last_updated: '' },
      },
    } as any;
    expect(shouldShowNotificationBadge(hass, [{ entity: 'device_tracker.phone' }], 'person.mark')).toBe(true);
  });

  it('returns false when all devices have good battery and are online', () => {
    const hass = {
      states: {
        'device_tracker.watch': { state: 'home', attributes: { battery_level: 80 }, last_updated: '' },
        'person.mark': { state: 'home', attributes: {}, last_updated: '' },
      },
    } as any;
    expect(shouldShowNotificationBadge(hass, [
      { entity: 'device_tracker.watch' },
    ], 'person.mark')).toBe(false);
  });
});
