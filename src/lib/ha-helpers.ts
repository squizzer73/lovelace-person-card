import type { DeviceConfig, ConnectivityState } from '../types';

interface HassStateLike {
  state: string;
  attributes: Record<string, unknown>;
  last_updated: string;
}

interface HassLike {
  states: Record<string, HassStateLike>;
}

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

export function formatLastSeen(lastUpdated: string, format: 'relative' | 'absolute'): string {
  const date = new Date(lastUpdated);
  if (isNaN(date.getTime())) return 'unknown';
  if (format === 'absolute') {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  }
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60_000);
  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  return `${Math.floor(diffHr / 24)}d ago`;
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
    if (battery !== null && battery <= 20) return true;
    if (getConnectivity(hass, device) === 'offline') return true;
  }
  return false;
}
