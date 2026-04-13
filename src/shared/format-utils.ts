// src/shared/format-utils.ts

export function formatDuration(isoString: string): string {
  if (!isoString) return '—';
  const ms = Date.now() - new Date(isoString).getTime();
  if (ms < 0) return '—';
  const totalMins = Math.floor(ms / 60_000);
  if (totalMins < 1) return '< 1m';
  if (totalMins < 60) return `${totalMins}m`;
  const hrs = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  if (hrs < 24) return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
  const days = Math.floor(hrs / 24);
  const remainHrs = hrs % 24;
  return remainHrs > 0 ? `${days}d ${remainHrs}h` : `${days}d`;
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
