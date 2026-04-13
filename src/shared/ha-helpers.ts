// src/shared/ha-helpers.ts
import type { DeviceConfig, ConnectivityState, HassLike } from './types';

export { formatLastSeen } from './format-utils';

export function getBatteryLevel(hass: HassLike, device: DeviceConfig): number | null {
  if (device.battery_entity) {
    const s = hass.states[device.battery_entity];
    if (!s) return null;
    const v = parseFloat(s.state);
    return isNaN(v) ? null : v;
  }
  const s = hass.states[device.entity];
  if (!s) return null;
  const attr = s.attributes['battery_level'];
  if (attr == null) return null;
  const v = parseFloat(String(attr));
  return isNaN(v) ? null : v;
}

export function getConnectivity(hass: HassLike, device: DeviceConfig): ConnectivityState {
  if (device.connectivity_entity) {
    const s = hass.states[device.connectivity_entity];
    if (!s) return 'unknown';
    return s.state === 'on' ? 'online' : 'offline';
  }
  const s = hass.states[device.entity];
  if (!s) return 'unknown';
  if (s.state === 'home' || s.state === 'online') return 'online';
  if (s.state === 'not_home' || s.state === 'offline') return 'offline';
  return 'unknown';
}

export function shouldShowNotificationBadge(
  hass: HassLike,
  devices: DeviceConfig[],
  personEntity: string,
): boolean {
  const person = hass.states[personEntity];
  if (!person || person.state === 'unknown') return true;

  for (const device of devices) {
    const battery = getBatteryLevel(hass, device);
    const threshold = device.battery_threshold ?? 20;
    if (battery !== null && battery <= threshold) return true;
    if (getConnectivity(hass, device) === 'offline') return true;
  }
  return false;
}
