// src/shared/battery-utils.ts

export function getBatteryColor(level: number, threshold = 20): string {
  if (level <= threshold) return '#f44336';
  if (level < 50) return '#ff9800';
  return '#4caf50';
}
