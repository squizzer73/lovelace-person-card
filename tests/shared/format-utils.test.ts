// tests/shared/format-utils.test.ts
import { describe, it, expect } from 'vitest';
import { formatDuration, formatLastSeen } from '../../src/shared/format-utils';

describe('formatDuration', () => {
  it('returns "< 1m" for durations under 1 minute', () => {
    const ts = new Date(Date.now() - 30_000).toISOString();
    expect(formatDuration(ts)).toBe('< 1m');
  });

  it('returns "5m" for 5 minutes', () => {
    const ts = new Date(Date.now() - 5 * 60_000).toISOString();
    expect(formatDuration(ts)).toBe('5m');
  });

  it('returns "2h 10m" for 2h10m', () => {
    const ts = new Date(Date.now() - (2 * 60 + 10) * 60_000).toISOString();
    expect(formatDuration(ts)).toBe('2h 10m');
  });

  it('returns "3h" when no remaining minutes', () => {
    const ts = new Date(Date.now() - 3 * 3_600_000).toISOString();
    expect(formatDuration(ts)).toBe('3h');
  });

  it('returns "2d 3h" for over a day', () => {
    const ts = new Date(Date.now() - (2 * 24 * 60 + 3 * 60) * 60_000).toISOString();
    expect(formatDuration(ts)).toBe('2d 3h');
  });

  it('returns "—" for empty string', () => {
    expect(formatDuration('')).toBe('—');
  });

  it('returns "—" for future timestamps', () => {
    const ts = new Date(Date.now() + 60_000).toISOString();
    expect(formatDuration(ts)).toBe('—');
  });
});

describe('formatLastSeen', () => {
  it('returns "just now" when under one minute ago', () => {
    const ts = new Date(Date.now() - 30_000).toISOString();
    expect(formatLastSeen(ts, 'relative')).toBe('just now');
  });

  it('returns "5 min ago" for 5 minutes', () => {
    const ts = new Date(Date.now() - 5 * 60_000).toISOString();
    expect(formatLastSeen(ts, 'relative')).toBe('5 min ago');
  });

  it('returns "unknown" for invalid date', () => {
    expect(formatLastSeen('not-a-date', 'relative')).toBe('unknown');
  });
});
