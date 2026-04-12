# Family Card & Shared Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the person-card codebase into shared modules, add a theme card for shared zone config, and add a family card for multi-person overview.

**Architecture:** Four sequential phases — (1) refactor shared modules, (2) theme card, (3) family card, (4) build/HACS/docs. Each phase leaves the codebase in a working, tested state. Person-card behaviour is unchanged after Phase 1.

**Tech Stack:** Lit 3, TypeScript, esbuild, vitest

---

## Phase 1 — Refactor & Shared Modules

### Task 1: Create `src/shared/types.ts` — move all types

**Files:**
- Create: `src/shared/types.ts`
- Modify: `src/types.ts` (re-export from shared for backwards compat)

- [ ] **Step 1: Create `src/shared/types.ts`** with all types from `src/types.ts` plus a unified `HassLike`:

```typescript
// src/shared/types.ts

export interface HassLike {
  states: Record<string, HassStateLike>;
}

export interface HassStateLike {
  state: string;
  attributes: Record<string, unknown>;
  last_updated: string;
  last_changed?: string;
}

export interface PersonCardConfig {
  person_entity: string;
  name?: string;
  photo?: string;
  devices?: DeviceConfig[];
  eta_entity?: string;
  size?: SizeConfig;
  show_eta?: boolean;
  show_last_seen?: boolean;
  show_notification_badge?: boolean;
  address_entity?: string;
  background_image?: string;
  zone_styles?: ZoneStyleConfig[];
  conditions?: ConditionRule[];
  offline_threshold?: number;
}

export interface DeviceConfig {
  entity: string;
  name?: string;
  icon?: string;
  battery_entity?: string;
  connectivity_entity?: string;
  battery_threshold?: number;
}

export interface ZoneStyleConfig {
  zone: string;
  label?: string;
  icon?: string;
  background_color?: string;
  border_color?: string;
}

export interface ConditionRule {
  id: string;
  label?: string;
  operator: 'and' | 'or';
  conditions: Condition[];
  effect: StyleEffect;
}

export interface Condition {
  entity: string;
  attribute?: string;
  operator: 'eq' | 'neq' | 'lt' | 'gt' | 'lte' | 'gte' | 'contains';
  value: string | number;
}

export interface StyleEffect {
  background_color?: string;
  border_color?: string;
  border_width?: number;
  badge_color?: string;
  badge_icon?: string;
}

export type SizeTier = 'small' | 'medium' | 'large' | 'hero' | 'stats';
export type SizeConfig = 'auto' | SizeTier;
export type ConnectivityState = 'online' | 'offline' | 'unknown';
```

- [ ] **Step 2: Update `src/types.ts` to re-export from shared** (preserves all existing imports):

```typescript
// src/types.ts — thin re-export shim
export * from './shared/types';
```

- [ ] **Step 3: Run tests — should still pass**

```bash
cd "/Users/marksquires/Person Card" && npm test
```

Expected: all tests pass.

- [ ] **Step 4: Run typecheck**

```bash
cd "/Users/marksquires/Person Card" && npm run typecheck
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
cd "/Users/marksquires/Person Card" && git add src/shared/types.ts src/types.ts && git commit -m "refactor: extract shared types to src/shared/types.ts"
```

---

### Task 2: Create `src/shared/constants.ts`

**Files:**
- Create: `src/shared/constants.ts`
- Modify: `src/person-card-editor.ts` (import from shared)

- [ ] **Step 1: Create `src/shared/constants.ts`**:

```typescript
// src/shared/constants.ts
export const COLOR_SCHEMES = [
  { name: 'Midnight',        bg: '#1c1c2e', border: '#4fc3f7' },
  { name: 'Forest Walk',     bg: '#1b2e1b', border: '#76c442' },
  { name: 'Lava Flow',       bg: '#2e1b1b', border: '#ff6d00' },
  { name: 'Arctic Drift',    bg: '#1a2332', border: '#80deea' },
  { name: 'Twilight',        bg: '#2e1b3c', border: '#ce93d8' },
  { name: 'Emerald City',    bg: '#1b2e28', border: '#ffd700' },
  { name: 'Rose Gold',       bg: '#2e1c24', border: '#f48fb1' },
  { name: 'Neon Tokyo',      bg: '#120d1f', border: '#e040fb' },
  { name: 'Desert Night',    bg: '#2e2416', border: '#ffb300' },
  { name: 'Northern Lights', bg: '#0d1f1a', border: '#69f0ae' },
] as const;
```

- [ ] **Step 2: Update the import in `src/person-card-editor.ts`** — replace the inline `COLOR_SCHEMES` constant (lines 6–17) with an import:

```typescript
import { COLOR_SCHEMES } from './shared/constants';
```

Remove the `const COLOR_SCHEMES = [...]` block from the editor file.

- [ ] **Step 3: Run tests and typecheck**

```bash
cd "/Users/marksquires/Person Card" && npm test && npm run typecheck
```

Expected: all pass.

- [ ] **Step 4: Commit**

```bash
cd "/Users/marksquires/Person Card" && git add src/shared/constants.ts src/person-card-editor.ts && git commit -m "refactor: extract COLOR_SCHEMES to src/shared/constants.ts"
```

---

### Task 3: Create `src/shared/format-utils.ts`

**Files:**
- Create: `src/shared/format-utils.ts`
- Create: `tests/shared/format-utils.test.ts`
- Modify: `src/lib/ha-helpers.ts` (import from shared)
- Modify: `src/person-card.ts` (import `_formatDuration` from shared)

- [ ] **Step 1: Write failing tests**

```typescript
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
```

- [ ] **Step 2: Run to verify tests fail**

```bash
cd "/Users/marksquires/Person Card" && npm test tests/shared/format-utils.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Create `src/shared/format-utils.ts`**

```typescript
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
```

- [ ] **Step 4: Update `src/lib/ha-helpers.ts`** — replace the `formatLastSeen` implementation with a re-export:

```typescript
// At top of file, add:
export { formatLastSeen } from '../shared/format-utils';
// Remove the existing formatLastSeen function body
```

- [ ] **Step 5: Update `src/person-card.ts`** — replace `_formatDuration` method with an import:

```typescript
// Add to imports at top of person-card.ts:
import { formatDuration } from './shared/format-utils';
```

Then replace all calls to `this._formatDuration(...)` with `formatDuration(...)` and remove the `private _formatDuration` method.

- [ ] **Step 6: Run all tests**

```bash
cd "/Users/marksquires/Person Card" && npm test
```

Expected: all pass including new format-utils tests.

- [ ] **Step 7: Commit**

```bash
cd "/Users/marksquires/Person Card" && git add src/shared/format-utils.ts tests/shared/format-utils.test.ts src/lib/ha-helpers.ts src/person-card.ts && git commit -m "refactor: extract formatDuration and formatLastSeen to src/shared/format-utils.ts"
```

---

### Task 4: Create `src/shared/battery-utils.ts`

**Files:**
- Create: `src/shared/battery-utils.ts`
- Create: `tests/shared/battery-utils.test.ts`
- Modify: `src/components/device-tile.ts`
- Modify: `src/person-card.ts`

- [ ] **Step 1: Write failing tests**

```typescript
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
```

- [ ] **Step 2: Verify tests fail**

```bash
cd "/Users/marksquires/Person Card" && npm test tests/shared/battery-utils.test.ts
```

Expected: FAIL.

- [ ] **Step 3: Create `src/shared/battery-utils.ts`**

```typescript
// src/shared/battery-utils.ts

export function getBatteryColor(level: number, threshold = 20): string {
  if (level <= threshold) return '#f44336';
  if (level < 50) return '#ff9800';
  return '#4caf50';
}
```

- [ ] **Step 4: Update `src/components/device-tile.ts`** — replace the `batteryColor` method:

```typescript
// Add import at top:
import { getBatteryColor } from '../shared/battery-utils';

// Replace batteryColor method:
private batteryColor(level: number): string {
  return getBatteryColor(level, this.device.battery_threshold ?? 20);
}
```

- [ ] **Step 5: Update `src/person-card.ts`** — replace inline battery colour logic in `_renderHeroDevice`:

```typescript
// Add import:
import { getBatteryColor } from './shared/battery-utils';

// In _renderHeroDevice, replace:
// const battColor = isNaN(battery) ? '#888'
//   : battery <= threshold ? '#f44336'
//   : battery < 50 ? '#ff9800'
//   : '#4caf50';
// With:
const battColor = isNaN(battery) ? '#888' : getBatteryColor(battery, threshold);
```

- [ ] **Step 6: Run all tests**

```bash
cd "/Users/marksquires/Person Card" && npm test
```

Expected: all pass.

- [ ] **Step 7: Commit**

```bash
cd "/Users/marksquires/Person Card" && git add src/shared/battery-utils.ts tests/shared/battery-utils.test.ts src/components/device-tile.ts src/person-card.ts && git commit -m "refactor: extract getBatteryColor to src/shared/battery-utils.ts"
```

---

### Task 5: Move `lib/` to `src/shared/` and consolidate `HassLike`

**Files:**
- Create: `src/shared/condition-engine.ts` (move from `src/lib/`)
- Create: `src/shared/ha-helpers.ts` (move from `src/lib/`)
- Modify: `src/lib/condition-engine.ts` (re-export shim)
- Modify: `src/lib/ha-helpers.ts` (re-export shim)

- [ ] **Step 1: Create `src/shared/condition-engine.ts`** — copy content from `src/lib/condition-engine.ts` and update the import to use `HassLike` from `src/shared/types.ts`:

```typescript
// src/shared/condition-engine.ts
import type { Condition, ConditionRule, StyleEffect, HassLike } from './types';

function evaluateCondition(condition: Condition, hass: HassLike): boolean {
  const entityState = hass.states[condition.entity];
  if (!entityState) return false;

  const rawValue = condition.attribute != null
    ? entityState.attributes[condition.attribute]
    : entityState.state;

  const value = String(rawValue ?? '');
  const target = String(condition.value);
  const numValue = parseFloat(value);
  const numTarget = parseFloat(target);
  const numericOk = !isNaN(numValue) && !isNaN(numTarget);

  switch (condition.operator) {
    case 'eq':       return value === target;
    case 'neq':      return value !== target;
    case 'lt':       return numericOk && numValue < numTarget;
    case 'gt':       return numericOk && numValue > numTarget;
    case 'lte':      return numericOk && numValue <= numTarget;
    case 'gte':      return numericOk && numValue >= numTarget;
    case 'contains': return value.includes(target);
    default:         return false;
  }
}

export function evaluateConditions(rules: ConditionRule[], hass: HassLike): StyleEffect {
  let result: StyleEffect = {};
  for (const rule of rules) {
    if (rule.conditions.length === 0) continue;
    const matches = rule.operator === 'or'
      ? rule.conditions.some(c => evaluateCondition(c, hass))
      : rule.conditions.every(c => evaluateCondition(c, hass));
    if (matches) result = { ...result, ...rule.effect };
  }
  return result;
}
```

- [ ] **Step 2: Create `src/shared/ha-helpers.ts`** — copy content from `src/lib/ha-helpers.ts`, update imports to use `HassLike` from shared types, and remove the local `HassLike`/`HassStateLike` interfaces (they're now in `src/shared/types.ts`):

```typescript
// src/shared/ha-helpers.ts
import type { DeviceConfig, ConnectivityState, HassLike } from './types';
import { formatLastSeen } from './format-utils';
import { getBatteryColor } from './battery-utils';

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
```

- [ ] **Step 3: Replace `src/lib/condition-engine.ts`** with a re-export shim:

```typescript
// src/lib/condition-engine.ts
export * from '../shared/condition-engine';
```

- [ ] **Step 4: Replace `src/lib/ha-helpers.ts`** with a re-export shim:

```typescript
// src/lib/ha-helpers.ts
export * from '../shared/ha-helpers';
```

- [ ] **Step 5: Run all tests**

```bash
cd "/Users/marksquires/Person Card" && npm test
```

Expected: all pass (tests still import from `../../src/lib/...` which now re-exports from shared).

- [ ] **Step 6: Run typecheck**

```bash
cd "/Users/marksquires/Person Card" && npm run typecheck
```

Expected: no errors.

- [ ] **Step 7: Commit**

```bash
cd "/Users/marksquires/Person Card" && git add src/shared/condition-engine.ts src/shared/ha-helpers.ts src/lib/condition-engine.ts src/lib/ha-helpers.ts && git commit -m "refactor: move lib/ logic to src/shared/, add re-export shims"
```

---

### Task 6: Clean up `__eta__` sentinel — add `eta_entity` to config

**Files:**
- Modify: `src/shared/types.ts` (add `eta_entity` field — already done in Task 1)
- Modify: `src/person-card.ts` (migrate old sentinel, use `eta_entity`)
- Modify: `src/person-card-editor.ts` (bind to `eta_entity` instead of fake device)
- Create: `tests/shared/eta-migration.test.ts`

- [ ] **Step 1: Write failing test for migration**

```typescript
// tests/shared/eta-migration.test.ts
import { describe, it, expect } from 'vitest';
import { migrateEtaSentinel } from '../../src/shared/eta-migration';
import type { PersonCardConfig } from '../../src/shared/types';

describe('migrateEtaSentinel', () => {
  it('extracts __eta__ device into eta_entity field', () => {
    const config: PersonCardConfig = {
      person_entity: 'person.mark',
      devices: [
        { entity: 'device_tracker.phone', name: 'Phone' },
        { entity: 'sensor.travel_time', name: '__eta__' },
      ],
    };
    const result = migrateEtaSentinel(config);
    expect(result.eta_entity).toBe('sensor.travel_time');
    expect(result.devices?.every(d => d.name !== '__eta__')).toBe(true);
  });

  it('returns config unchanged when no __eta__ sentinel', () => {
    const config: PersonCardConfig = {
      person_entity: 'person.mark',
      devices: [{ entity: 'device_tracker.phone', name: 'Phone' }],
    };
    const result = migrateEtaSentinel(config);
    expect(result.eta_entity).toBeUndefined();
    expect(result.devices?.length).toBe(1);
  });

  it('preserves existing eta_entity if already set', () => {
    const config: PersonCardConfig = {
      person_entity: 'person.mark',
      eta_entity: 'sensor.existing',
    };
    const result = migrateEtaSentinel(config);
    expect(result.eta_entity).toBe('sensor.existing');
  });
});
```

- [ ] **Step 2: Verify tests fail**

```bash
cd "/Users/marksquires/Person Card" && npm test tests/shared/eta-migration.test.ts
```

Expected: FAIL.

- [ ] **Step 3: Create `src/shared/eta-migration.ts`**

```typescript
// src/shared/eta-migration.ts
import type { PersonCardConfig } from './types';

export function migrateEtaSentinel(config: PersonCardConfig): PersonCardConfig {
  if (config.eta_entity) return config;
  const etaDevice = config.devices?.find(d => d.name === '__eta__');
  if (!etaDevice) return config;
  return {
    ...config,
    eta_entity: etaDevice.entity,
    devices: config.devices?.filter(d => d.name !== '__eta__'),
  };
}
```

- [ ] **Step 4: Update `src/person-card.ts`** — call `migrateEtaSentinel` in `setConfig`, replace all `__eta__` filter patterns:

In `setConfig`:
```typescript
import { migrateEtaSentinel } from './shared/eta-migration';

setConfig(config: PersonCardConfig): void {
  if (!config.person_entity) throw new Error('person_entity is required');
  this._config = migrateEtaSentinel({
    size: 'auto',
    show_eta: true,
    show_last_seen: true,
    show_notification_badge: true,
    devices: [],
    zone_styles: [],
    conditions: [],
    ...config,
  });
  if (this.isConnected) this._setupResizeObserver();
}
```

In `render()`, replace:
```typescript
const etaEntity = this._config.devices?.find(d => d.name === '__eta__')?.entity ?? '';
```
With:
```typescript
const etaEntity = this._config.eta_entity ?? '';
```

Also replace all `.filter(d => d.name !== '__eta__')` in render methods with just using `devices` directly (no longer needed).

- [ ] **Step 5: Update `src/person-card-editor.ts`** — Display tab ETA entity picker:

Replace the ETA entity picker's `@value-changed` handler:
```typescript
@value-changed=${(e: CustomEvent) => {
  this._set({ eta_entity: e.detail.value || undefined });
}}
```

Replace the ETA entity picker's `.value`:
```typescript
.value=${this._config.eta_entity ?? ''}
```

Update `_renderDevicesTab` to remove the `__eta__` filter:
```typescript
const devices = this._config.devices ?? [];
```

Update `_addDevice`, `_removeDevice`, `_updateDevice` to remove all `__eta__` sentinel logic.

- [ ] **Step 6: Run all tests**

```bash
cd "/Users/marksquires/Person Card" && npm test
```

Expected: all pass.

- [ ] **Step 7: Run build to verify no errors**

```bash
cd "/Users/marksquires/Person Card" && npm run build
```

Expected: `Build complete: dist/person-card.js`

- [ ] **Step 8: Commit**

```bash
cd "/Users/marksquires/Person Card" && git add src/shared/eta-migration.ts tests/shared/eta-migration.test.ts src/person-card.ts src/person-card-editor.ts && git commit -m "refactor: replace __eta__ sentinel with eta_entity config field"
```

---

### Task 7: Create `src/shared/zone-utils.ts`

**Files:**
- Create: `src/shared/zone-utils.ts`
- Create: `tests/shared/zone-utils.test.ts`

- [ ] **Step 1: Write failing tests**

```typescript
// tests/shared/zone-utils.test.ts
import { describe, it, expect } from 'vitest';
import { resolveZoneStyle, getZoneLabel, getZoneIcon } from '../../src/shared/zone-utils';
import type { ZoneStyleConfig } from '../../src/shared/types';

const zoneStyles: ZoneStyleConfig[] = [
  { zone: 'home', label: 'Home', icon: 'mdi:home', background_color: '#111', border_color: '#76c442' },
  { zone: 'work', label: 'Office', icon: 'mdi:briefcase' },
];

describe('resolveZoneStyle', () => {
  it('returns matching zone style', () => {
    expect(resolveZoneStyle('home', zoneStyles)).toEqual(zoneStyles[0]);
  });

  it('returns undefined when no match', () => {
    expect(resolveZoneStyle('school', zoneStyles)).toBeUndefined();
  });

  it('returns undefined for empty array', () => {
    expect(resolveZoneStyle('home', [])).toBeUndefined();
  });
});

describe('getZoneLabel', () => {
  it('returns configured label', () => {
    expect(getZoneLabel('home', zoneStyles)).toBe('Home');
  });

  it('returns "Away" for not_home with no config', () => {
    expect(getZoneLabel('not_home', [])).toBe('Away');
  });

  it('returns "Unknown" for unknown zone', () => {
    expect(getZoneLabel('unknown', [])).toBe('Unknown');
  });

  it('replaces underscores with spaces for unlisted zones', () => {
    expect(getZoneLabel('my_zone', [])).toBe('my zone');
  });
});

describe('getZoneIcon', () => {
  it('returns configured icon', () => {
    expect(getZoneIcon('home', zoneStyles)).toBe('mdi:home');
  });

  it('returns mdi:home for home with no config', () => {
    expect(getZoneIcon('home', [])).toBe('mdi:home');
  });

  it('returns mdi:map-marker-off for not_home with no config', () => {
    expect(getZoneIcon('not_home', [])).toBe('mdi:map-marker-off');
  });

  it('returns mdi:help-circle for unknown', () => {
    expect(getZoneIcon('unknown', [])).toBe('mdi:help-circle');
  });

  it('returns mdi:map-marker as fallback', () => {
    expect(getZoneIcon('school', [])).toBe('mdi:map-marker');
  });
});
```

- [ ] **Step 2: Verify tests fail**

```bash
cd "/Users/marksquires/Person Card" && npm test tests/shared/zone-utils.test.ts
```

Expected: FAIL.

- [ ] **Step 3: Create `src/shared/zone-utils.ts`**

```typescript
// src/shared/zone-utils.ts
import type { ZoneStyleConfig } from './types';

export function resolveZoneStyle(zone: string, zoneStyles: ZoneStyleConfig[]): ZoneStyleConfig | undefined {
  return zoneStyles.find(s => s.zone === zone);
}

export function getZoneLabel(zone: string, zoneStyles: ZoneStyleConfig[], address = ''): string {
  const style = resolveZoneStyle(zone, zoneStyles);
  if (style?.label) return style.label;
  if (zone === 'not_home') return address || 'Away';
  if (zone === 'unknown') return 'Unknown';
  return zone.replace(/_/g, ' ');
}

export function getZoneIcon(zone: string, zoneStyles: ZoneStyleConfig[], hasAddress = false): string {
  const style = resolveZoneStyle(zone, zoneStyles);
  if (style?.icon) return style.icon;
  if (zone === 'home') return 'mdi:home';
  if (zone === 'not_home') return hasAddress ? 'mdi:map-marker' : 'mdi:map-marker-off';
  if (zone === 'unknown') return 'mdi:help-circle';
  return 'mdi:map-marker';
}
```

- [ ] **Step 4: Run all tests**

```bash
cd "/Users/marksquires/Person Card" && npm test
```

Expected: all pass.

- [ ] **Step 5: Commit**

```bash
cd "/Users/marksquires/Person Card" && git add src/shared/zone-utils.ts tests/shared/zone-utils.test.ts && git commit -m "refactor: add zone-utils to src/shared/"
```

---

### Task 8: Create `src/shared/theme-registry.ts`

**Files:**
- Create: `src/shared/theme-registry.ts`
- Create: `tests/shared/theme-registry.test.ts`

- [ ] **Step 1: Write failing tests**

```typescript
// tests/shared/theme-registry.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { setTheme, getTheme, THEME_EVENT } from '../../src/shared/theme-registry';
import type { ZoneStyleConfig } from '../../src/shared/types';

const zones: ZoneStyleConfig[] = [
  { zone: 'home', label: 'Home', border_color: '#76c442' },
];

beforeEach(() => {
  // Clear global state between tests
  (globalThis as any).personCardTheme = undefined;
});

describe('theme-registry', () => {
  it('getTheme returns undefined when no theme set', () => {
    expect(getTheme()).toBeUndefined();
  });

  it('setTheme stores zone styles globally', () => {
    setTheme(zones);
    expect(getTheme()?.zoneStyles).toEqual(zones);
  });

  it('getTheme returns the last set theme', () => {
    const zones2: ZoneStyleConfig[] = [{ zone: 'work', label: 'Office' }];
    setTheme(zones);
    setTheme(zones2);
    expect(getTheme()?.zoneStyles).toEqual(zones2);
  });
});
```

- [ ] **Step 2: Verify tests fail**

```bash
cd "/Users/marksquires/Person Card" && npm test tests/shared/theme-registry.test.ts
```

Expected: FAIL.

- [ ] **Step 3: Create `src/shared/theme-registry.ts`**

```typescript
// src/shared/theme-registry.ts
import type { ZoneStyleConfig } from './types';

export const THEME_EVENT = 'person-card-theme-updated';

export interface PersonCardTheme {
  zoneStyles: ZoneStyleConfig[];
}

declare global {
  interface Window {
    personCardTheme?: PersonCardTheme;
  }
}

export function setTheme(zoneStyles: ZoneStyleConfig[]): void {
  (typeof window !== 'undefined' ? window : globalThis as any).personCardTheme = { zoneStyles };
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(THEME_EVENT));
  }
}

export function getTheme(): PersonCardTheme | undefined {
  return (typeof window !== 'undefined' ? window : globalThis as any).personCardTheme;
}

export function resolveZoneStyles(cardZoneStyles: ZoneStyleConfig[]): ZoneStyleConfig[] {
  if (cardZoneStyles.length > 0) return cardZoneStyles;
  return getTheme()?.zoneStyles ?? [];
}
```

- [ ] **Step 4: Run all tests**

```bash
cd "/Users/marksquires/Person Card" && npm test
```

Expected: all pass.

- [ ] **Step 5: Commit**

```bash
cd "/Users/marksquires/Person Card" && git add src/shared/theme-registry.ts tests/shared/theme-registry.test.ts && git commit -m "feat: add theme-registry for shared zone styles"
```

---

### Task 9: Wire theme registry into `person-card.ts`

**Files:**
- Modify: `src/person-card.ts`

- [ ] **Step 1: Add theme listener to `person-card.ts`**

Add import:
```typescript
import { resolveZoneStyles, THEME_EVENT } from './shared/theme-registry';
```

Add theme listener setup in `connectedCallback`:
```typescript
connectedCallback() {
  super.connectedCallback();
  if (this._config) this._setupResizeObserver();
  window.addEventListener(THEME_EVENT, this._onThemeUpdated);
}

disconnectedCallback() {
  super.disconnectedCallback();
  this._resizeObserver?.disconnect();
  window.removeEventListener(THEME_EVENT, this._onThemeUpdated);
}

private _onThemeUpdated = () => { this.requestUpdate(); };
```

- [ ] **Step 2: Update zone style resolution throughout `person-card.ts`**

Replace all occurrences of `this._config.zone_styles ?? []` with:
```typescript
resolveZoneStyles(this._config.zone_styles ?? [])
```

This applies in `updated()`, `_renderHero()`, `_renderStats()`, and `render()` (all the places that pass `zoneStyles` to sub-components or look up the zone style).

- [ ] **Step 3: Run build**

```bash
cd "/Users/marksquires/Person Card" && npm run build
```

Expected: Build complete.

- [ ] **Step 4: Run all tests**

```bash
cd "/Users/marksquires/Person Card" && npm test
```

Expected: all pass.

- [ ] **Step 5: Commit**

```bash
cd "/Users/marksquires/Person Card" && git add src/person-card.ts && git commit -m "feat: wire theme-registry into person-card zone style resolution"
```

---

## Phase 2 — Theme Card

### Task 10: Create `src/person-card-theme.ts` and `src/theme-styles.ts`

**Files:**
- Create: `src/person-card-theme.ts`
- Create: `src/theme-styles.ts`

- [ ] **Step 1: Create `src/theme-styles.ts`**

```typescript
// src/theme-styles.ts
import { css } from 'lit';

export const themeCardStyles = css`
  :host {
    display: block;
    font-family: var(--person-card-font-family, 'Segoe UI', system-ui, sans-serif);
    border-radius: var(--person-card-border-radius, 16px);
    overflow: hidden;
    background: var(--pc-background, #1c1c2e);
    color: #ffffff;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
    padding: 10px 14px;
  }

  .legend-title {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-bottom: 8px;
  }

  .legend-dots {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 16px;
    align-items: center;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .legend-label {
    font-size: 0.78rem;
    color: rgba(255,255,255,0.7);
    white-space: nowrap;
  }
`;
```

- [ ] **Step 2: Create `src/person-card-theme.ts`**

```typescript
// src/person-card-theme.ts
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { PersonCardThemeConfig } from './shared/types';
import { themeCardStyles } from './theme-styles';
import { setTheme } from './shared/theme-registry';
import './person-card-theme-editor';

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description: string; preview?: boolean }>;
  }
}
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: 'person-card-theme',
  name: 'Person Card Theme',
  description: 'Shared zone colour scheme for Person Card and Family Card.',
  preview: false,
});

@customElement('person-card-theme')
export class PersonCardTheme extends LitElement {
  @property({ attribute: false }) hass: unknown;
  private _config!: PersonCardThemeConfig;

  static styles = themeCardStyles;

  static getConfigElement(): HTMLElement {
    return document.createElement('person-card-theme-editor');
  }

  static getStubConfig(): PersonCardThemeConfig {
    return { zone_styles: [] };
  }

  setConfig(config: PersonCardThemeConfig): void {
    this._config = { zone_styles: [], ...config };
    setTheme(this._config.zone_styles);
  }

  getCardSize(): number { return 1; }

  render() {
    const zones = this._config?.zone_styles ?? [];
    if (zones.length === 0) {
      return html`<div class="legend-title">Zone Legend</div><div class="legend-dots" style="color:rgba(255,255,255,0.3);font-size:0.78rem">No zones configured</div>`;
    }
    return html`
      <div class="legend-title">Zone Legend</div>
      <div class="legend-dots">
        ${zones.map(z => html`
          <div class="legend-item">
            <div class="legend-dot" style="background:${z.border_color ?? 'rgba(255,255,255,0.4)'};box-shadow:0 0 4px ${z.border_color ?? 'transparent'}66"></div>
            <span class="legend-label">${z.label ?? z.zone}</span>
          </div>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'person-card-theme': PersonCardTheme;
  }
}
```

- [ ] **Step 3: Add `PersonCardThemeConfig` to `src/shared/types.ts`**

```typescript
export interface PersonCardThemeConfig {
  zone_styles: ZoneStyleConfig[];
}
```

- [ ] **Step 4: Run typecheck**

```bash
cd "/Users/marksquires/Person Card" && npm run typecheck
```

Expected: errors about missing `person-card-theme-editor` (we'll create it next). Note the errors for now.

- [ ] **Step 5: Commit**

```bash
cd "/Users/marksquires/Person Card" && git add src/person-card-theme.ts src/theme-styles.ts src/shared/types.ts && git commit -m "feat: add person-card-theme element and legend renderer"
```

---

### Task 11: Create `src/components/zone-editor.ts` (shared editor component)

**Files:**
- Create: `src/components/zone-editor.ts`

- [ ] **Step 1: Create `src/components/zone-editor.ts`**

```typescript
// src/components/zone-editor.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { ZoneStyleConfig } from '../shared/types';
import { COLOR_SCHEMES } from '../shared/constants';

@customElement('person-card-zone-editor')
export class ZoneEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ type: Array }) zoneStyles: ZoneStyleConfig[] = [];

  static styles = css`
    .zone-block {
      border: 1px solid var(--divider-color, rgba(0,0,0,0.15));
      border-radius: 8px; padding: 8px; margin-bottom: 8px;
    }
    .zone-row { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
    .zone-row > * { flex: 1; min-width: 0; }
    .scheme-row {
      display: flex; align-items: center; flex-wrap: wrap; gap: 6px;
      margin: 2px 0 4px;
    }
    .scheme-swatch {
      width: 26px; height: 26px; border-radius: 5px;
      cursor: pointer; flex-shrink: 0;
      transition: transform 0.1s, box-shadow 0.1s;
    }
    .scheme-swatch:hover { transform: scale(1.2); box-shadow: 0 2px 6px rgba(0,0,0,0.4); }
    .scheme-divider { width: 1px; height: 24px; background: var(--divider-color, #e0e0e0); flex-shrink: 0; }
    .add-btn {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: 0.82rem; cursor: pointer;
      color: var(--primary-color); padding: 6px 0; background: none; border: none;
    }
    .delete-btn {
      cursor: pointer; color: var(--error-color, #f44336);
      background: none; border: none; flex: 0 0 auto;
    }
    .color-row { display: flex; align-items: center; gap: 8px; }
    ha-textfield, ha-icon-picker { display: block; width: 100%; }
  `;

  private _fire(zoneStyles: ZoneStyleConfig[]) {
    this.dispatchEvent(new CustomEvent('zone-styles-changed', {
      detail: { zoneStyles },
      bubbles: true,
      composed: true,
    }));
  }

  private _update(index: number, patch: Partial<ZoneStyleConfig>) {
    const updated = [...this.zoneStyles];
    updated[index] = { ...updated[index], ...patch };
    this._fire(updated);
  }

  private _remove(index: number) {
    const updated = [...this.zoneStyles];
    updated.splice(index, 1);
    this._fire(updated);
  }

  private _add() {
    this._fire([...this.zoneStyles, { zone: '' }]);
  }

  private _autoDetect() {
    if (!this.hass) return;
    const existing = new Set(this.zoneStyles.map(z => z.zone));
    const detected = Object.entries(this.hass.states)
      .filter(([id]) => id.startsWith('zone.'))
      .map(([id, state]) => {
        const zoneName = id.replace('zone.', '');
        return {
          zone: zoneName,
          label: (state.attributes['friendly_name'] as string | undefined) ?? zoneName,
          icon: (state.attributes['icon'] as string | undefined) ?? 'mdi:map-marker',
        };
      })
      .filter(z => !existing.has(z.zone));
    if (detected.length === 0) return;
    this._fire([...this.zoneStyles, ...detected]);
  }

  render() {
    return html`
      <button class="add-btn" style="margin-bottom:8px" @click=${() => this._autoDetect()}>
        <ha-icon .icon=${'mdi:magnify'}></ha-icon> Auto-detect zones from HA
      </button>
      ${this.zoneStyles.map((zs, i) => html`
        <div class="zone-block">
          <div class="zone-row">
            <ha-textfield
              .value=${zs.zone}
              label="Zone name"
              @input=${(e: InputEvent) => this._update(i, { zone: (e.target as HTMLInputElement).value })}
            ></ha-textfield>
            <ha-textfield
              .value=${zs.label ?? ''}
              label="Display label"
              @input=${(e: InputEvent) => this._update(i, { label: (e.target as HTMLInputElement).value || undefined })}
            ></ha-textfield>
            <div style="flex:1;min-width:0">
              <ha-icon-picker
                .value=${zs.icon ?? ''}
                label="Icon"
                @value-changed=${(e: CustomEvent) => this._update(i, { icon: e.detail.value || undefined })}
              ></ha-icon-picker>
            </div>
            <button class="delete-btn" @click=${() => this._remove(i)}>
              <ha-icon .icon=${'mdi:delete'}></ha-icon>
            </button>
          </div>
          <div class="scheme-row">
            ${COLOR_SCHEMES.map(s => html`
              <div class="scheme-swatch"
                title=${s.name}
                style="background:${s.bg};border:3px solid ${s.border}"
                @click=${() => this._update(i, { background_color: s.bg, border_color: s.border })}
              ></div>
            `)}
            <div class="scheme-divider"></div>
            <div class="color-row">
              <label style="font-size:0.75rem">BG</label>
              <input type="color" .value=${zs.background_color ?? '#1c1c2e'}
                @input=${(e: InputEvent) => this._update(i, { background_color: (e.target as HTMLInputElement).value })} />
            </div>
            <div class="color-row">
              <label style="font-size:0.75rem">Border</label>
              <input type="color" .value=${zs.border_color ?? '#ffffff'}
                @input=${(e: InputEvent) => this._update(i, { border_color: (e.target as HTMLInputElement).value })} />
            </div>
          </div>
        </div>
      `)}
      <button class="add-btn" @click=${() => this._add()}>
        <ha-icon .icon=${'mdi:plus-circle'}></ha-icon> Add Zone Style
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'person-card-zone-editor': ZoneEditor;
  }
}
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/marksquires/Person Card" && git add src/components/zone-editor.ts && git commit -m "feat: add shared zone-editor Lit component"
```

---

### Task 12: Create `src/person-card-theme-editor.ts`

**Files:**
- Create: `src/person-card-theme-editor.ts`
- Modify: `src/person-card-editor.ts` (replace inline zone editor with `<person-card-zone-editor>`)

- [ ] **Step 1: Create `src/person-card-theme-editor.ts`**

```typescript
// src/person-card-theme-editor.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { PersonCardThemeConfig } from './shared/types';
import './components/zone-editor';

@customElement('person-card-theme-editor')
export class PersonCardThemeEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  private _config!: PersonCardThemeConfig;

  static styles = css`
    .row { margin-bottom: 12px; }
    .row label { display: block; font-size: 0.8rem; color: var(--secondary-text-color); margin-bottom: 4px; }
  `;

  setConfig(config: PersonCardThemeConfig) {
    this._config = config;
  }

  private _fire(config: PersonCardThemeConfig) {
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }));
    this._config = config;
  }

  render() {
    if (!this._config) return html``;
    return html`
      <div class="row">
        <label>Zone Styles</label>
        <person-card-zone-editor
          .hass=${this.hass}
          .zoneStyles=${this._config.zone_styles ?? []}
          @zone-styles-changed=${(e: CustomEvent) => this._fire({ ...this._config, zone_styles: e.detail.zoneStyles })}
        ></person-card-zone-editor>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'person-card-theme-editor': PersonCardThemeEditor;
  }
}
```

- [ ] **Step 2: Update `src/person-card-editor.ts`** — replace the inline zone editor in `_renderAppearanceTab` with the shared component:

Replace the zone styles section (the `zoneStyles.map(...)` block and the auto-detect button) with:

```typescript
<div class="row">
  <label>Zone Styles</label>
  <person-card-zone-editor
    .hass=${this.hass}
    .zoneStyles=${this._config.zone_styles ?? []}
    @zone-styles-changed=${(e: CustomEvent) => this._set({ zone_styles: e.detail.zoneStyles })}
  ></person-card-zone-editor>
</div>
```

Add import at the top:
```typescript
import './components/zone-editor';
```

Remove the `_updateZoneStyle`, `_removeZoneStyle`, `_addZoneStyle`, `_autoDetectZones` methods from the editor (now handled by `zone-editor` component).

- [ ] **Step 3: Register theme card import in `src/person-card.ts`**

Add at the bottom of the imports block:
```typescript
import './person-card-theme';
```

- [ ] **Step 4: Run typecheck and build**

```bash
cd "/Users/marksquires/Person Card" && npm run typecheck && npm run build
```

Expected: no errors, build complete.

- [ ] **Step 5: Run tests**

```bash
cd "/Users/marksquires/Person Card" && npm test
```

Expected: all pass.

- [ ] **Step 6: Commit**

```bash
cd "/Users/marksquires/Person Card" && git add src/person-card-theme-editor.ts src/person-card-editor.ts src/person-card.ts src/components/zone-editor.ts && git commit -m "feat: add theme card editor, refactor person-card-editor to use shared zone-editor"
```

---

## Phase 3 — Family Card

### Task 13: Add family card types to `src/shared/types.ts`

**Files:**
- Modify: `src/shared/types.ts`
- Create: `tests/shared/family-card-utils.test.ts`

- [ ] **Step 1: Add family card types to `src/shared/types.ts`**

```typescript
export type FamilyCardDensity = 'compact' | 'mini' | 'detailed';

export interface FamilyPersonConfig {
  entity: string;
  name?: string;
  photo?: string;
  devices?: DeviceConfig[];
  eta_entity?: string;
  address_entity?: string;
  show_eta?: boolean;
  show_last_seen?: boolean;
  show_notification_badge?: boolean;
  offline_threshold?: number;
  tap_action?: { action: 'more-info' } | { action: 'navigate'; navigation_path: string };
}

export interface FamilyCardConfig {
  people?: FamilyPersonConfig[];
  group_entity?: string;
  density?: FamilyCardDensity;
  show_devices?: boolean;
  show_last_seen?: boolean;
  show_eta?: boolean;
  show_notification_badge?: boolean;
  offline_threshold?: number;
  zone_styles?: ZoneStyleConfig[];
  conditions?: ConditionRule[];
  background_image?: string;
}
```

- [ ] **Step 2: Write failing tests for group entity resolution**

```typescript
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
```

- [ ] **Step 3: Verify tests fail**

```bash
cd "/Users/marksquires/Person Card" && npm test tests/shared/family-card-utils.test.ts
```

Expected: FAIL.

- [ ] **Step 4: Create `src/shared/family-card-utils.ts`**

```typescript
// src/shared/family-card-utils.ts
import type { FamilyCardConfig, FamilyPersonConfig, HassLike } from './types';

export function resolveGroupMembers(hass: HassLike, groupEntity: string): string[] {
  const state = hass.states[groupEntity];
  if (!state) return [];
  const ids = state.attributes['entity_id'];
  if (!Array.isArray(ids)) return [];
  return ids as string[];
}

export function resolvePersonConfig(hass: HassLike, config: FamilyCardConfig): FamilyPersonConfig[] {
  if (config.people && config.people.length > 0) return config.people;
  if (config.group_entity) {
    return resolveGroupMembers(hass, config.group_entity).map(entity => ({ entity }));
  }
  return [];
}
```

- [ ] **Step 5: Run all tests**

```bash
cd "/Users/marksquires/Person Card" && npm test
```

Expected: all pass.

- [ ] **Step 6: Commit**

```bash
cd "/Users/marksquires/Person Card" && git add src/shared/types.ts src/shared/family-card-utils.ts tests/shared/family-card-utils.test.ts && git commit -m "feat: add family card types and group entity resolution utilities"
```

---

### Task 14: Create `src/family-styles.ts`

**Files:**
- Create: `src/family-styles.ts`

- [ ] **Step 1: Create `src/family-styles.ts`**

```typescript
// src/family-styles.ts
import { css } from 'lit';

export const familyCardStyles = css`
  :host {
    display: block;
    font-family: var(--person-card-font-family, 'Segoe UI', system-ui, sans-serif);
    border-radius: var(--person-card-border-radius, 16px);
    overflow: hidden;
    position: relative;
    background: var(--pc-background, #1c1c2e);
    color: #ffffff;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
    border: var(--pc-border-width, 0px) solid var(--pc-border-color, transparent);
  }

  .card-background {
    position: absolute; inset: 0;
    background-image: var(--pc-background-image, none);
    background-size: cover; background-position: center;
    opacity: 0.25; pointer-events: none; border-radius: inherit;
  }

  .card-content { position: relative; z-index: 1; padding: 12px 14px; }

  .card-header {
    display: flex; align-items: center; gap: 8px;
    margin-bottom: 10px; padding-bottom: 8px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .card-title {
    flex: 1; font-size: 0.85rem; font-weight: 700;
    letter-spacing: 0.04em; color: rgba(255,255,255,0.6);
    text-transform: uppercase;
  }

  /* Person row — all tiers */
  .person-row {
    border-radius: 10px;
    margin-bottom: 6px;
    overflow: hidden;
    border-left: 3px solid var(--row-accent, rgba(255,255,255,0.1));
    background: rgba(255,255,255,0.05);
    cursor: pointer;
    transition: background 0.15s;
  }
  .person-row:last-child { margin-bottom: 0; }
  .person-row:hover { background: rgba(255,255,255,0.08); }

  .person-row-inner {
    display: flex; align-items: center; gap: 10px; padding: 9px 10px;
  }

  .avatar {
    width: 36px; height: 36px; border-radius: 50%; object-fit: cover;
    background: #2d2d50; border: 2px solid rgba(255,255,255,0.1); flex-shrink: 0;
  }
  .avatar-placeholder {
    width: 36px; height: 36px; border-radius: 50%; background: #2d2d50;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .avatar-placeholder ha-icon { --mdc-icon-size: 18px; color: rgba(255,255,255,0.4); }
  .avatar.stale, .avatar-placeholder.stale { opacity: 0.55; filter: grayscale(60%); }

  /* compact tier */
  :host([density='compact']) .avatar,
  :host([density='compact']) .avatar-placeholder { width: 32px; height: 32px; }

  .person-info { flex: 1; min-width: 0; }
  .person-name { font-size: 0.9rem; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .person-zone { font-size: 0.72rem; color: rgba(255,255,255,0.55); margin-top: 1px; }

  .person-row-meta { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }

  .device-summary { display: flex; align-items: center; gap: 4px; }
  .device-summary-pct { font-size: 0.72rem; font-weight: 600; }

  .status-dot { width: 8px; height: 8px; border-radius: 50%; }

  .chevron { color: rgba(255,255,255,0.3); font-size: 0.75rem; flex-shrink: 0; transition: transform 0.2s; }
  .chevron.open { transform: rotate(180deg); }

  /* Expanded panel */
  .expanded-panel {
    padding: 0 10px 10px 10px;
    margin-left: 46px;
    border-top: 1px solid rgba(255,255,255,0.08);
    padding-top: 8px;
  }

  .device-list { display: flex; flex-direction: column; gap: 5px; margin-bottom: 8px; }

  .expanded-footer {
    display: flex; gap: 14px; flex-wrap: wrap;
    font-size: 0.72rem; color: rgba(255,255,255,0.4);
    margin-top: 6px;
  }

  .view-full-link {
    font-size: 0.72rem; cursor: pointer;
    text-align: right; margin-top: 6px;
    color: var(--row-accent, #80deea);
    text-decoration: none;
  }

  /* mini tier grid */
  :host([density='mini']) .card-content > .person-rows {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 8px;
  }
  :host([density='mini']) .person-row { margin-bottom: 0; }
`;
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/marksquires/Person Card" && git add src/family-styles.ts && git commit -m "feat: add family card CSS styles"
```

---

### Task 15: Create `src/family-card.ts` — compact and mini tiers

**Files:**
- Create: `src/family-card.ts`

- [ ] **Step 1: Create `src/family-card.ts`** with compact and mini tier rendering:

```typescript
// src/family-card.ts
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { FamilyCardConfig, FamilyPersonConfig, StyleEffect } from './shared/types';
import { familyCardStyles } from './family-styles';
import { resolvePersonConfig } from './shared/family-card-utils';
import { resolveZoneStyles, THEME_EVENT } from './shared/theme-registry';
import { evaluateConditions } from './shared/condition-engine';
import { getBatteryLevel, getConnectivity, shouldShowNotificationBadge } from './shared/ha-helpers';
import { formatDuration } from './shared/format-utils';
import { resolveZoneStyle } from './shared/zone-utils';
import './components/device-tile';
import './components/location-badge';
import './components/notification-badge';
import './components/last-seen';
import './components/eta-display';
import './family-card-editor';

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description: string; preview?: boolean }>;
  }
}
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: 'family-card',
  name: 'Family Card',
  description: 'At-a-glance status overview for multiple people.',
  preview: true,
});

@customElement('family-card')
export class FamilyCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: FamilyCardConfig;
  @state() private _expandedEntity: string | null = null;

  static styles = familyCardStyles;

  static getStubConfig(): FamilyCardConfig {
    return { people: [], density: 'detailed', show_devices: true, show_last_seen: true, show_notification_badge: true };
  }

  static getConfigElement(): HTMLElement {
    return document.createElement('family-card-editor');
  }

  setConfig(config: FamilyCardConfig): void {
    this._config = {
      density: 'detailed',
      show_devices: true,
      show_last_seen: true,
      show_eta: true,
      show_notification_badge: true,
      zone_styles: [],
      conditions: [],
      ...config,
    };
    this.setAttribute('density', this._config.density ?? 'detailed');
  }

  getCardSize(): number { return 4; }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(THEME_EVENT, this._onThemeUpdated);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(THEME_EVENT, this._onThemeUpdated);
  }

  private _onThemeUpdated = () => { this.requestUpdate(); };

  protected updated(): void {
    if (!this._config || !this.hass) return;
    const effect: StyleEffect = this._config.conditions?.length
      ? evaluateConditions(this._config.conditions, this.hass) : {};
    const bg = effect.background_color;
    if (bg) this.style.setProperty('--pc-background', bg);
    else this.style.removeProperty('--pc-background');
    const borderColor = effect.border_color;
    if (borderColor) {
      this.style.setProperty('--pc-border-color', borderColor);
      this.style.setProperty('--pc-border-width', `${effect.border_width ?? 2}px`);
    } else {
      this.style.removeProperty('--pc-border-color');
      this.style.removeProperty('--pc-border-width');
    }
    if (this._config.background_image) {
      this.style.setProperty('--pc-background-image', `url('${this._config.background_image}')`);
    } else {
      this.style.removeProperty('--pc-background-image');
    }
  }

  private _zoneStyles() {
    return resolveZoneStyles(this._config.zone_styles ?? []);
  }

  private _getPersonName(person: FamilyPersonConfig): string {
    if (person.name) return person.name;
    const state = this.hass.states[person.entity];
    return (state?.attributes?.['friendly_name'] as string | undefined)
      ?? person.entity.split('.')[1].replace(/_/g, ' ');
  }

  private _getPersonPhoto(person: FamilyPersonConfig): string | undefined {
    if (person.photo) return person.photo;
    return this.hass.states[person.entity]?.attributes?.['entity_picture'] as string | undefined;
  }

  private _getPersonZone(person: FamilyPersonConfig): string {
    return this.hass.states[person.entity]?.state ?? 'unknown';
  }

  private _isPersonStale(person: FamilyPersonConfig): boolean {
    const threshold = person.offline_threshold ?? this._config.offline_threshold;
    if (!threshold || threshold <= 0) return false;
    const lastUpdated = this.hass.states[person.entity]?.last_updated;
    if (!lastUpdated) return false;
    return ((Date.now() - new Date(lastUpdated).getTime()) / 60_000) > threshold;
  }

  private _personShowsBadge(person: FamilyPersonConfig): boolean {
    if (this._config.show_notification_badge === false) return false;
    if (person.show_notification_badge === false) return false;
    return shouldShowNotificationBadge(this.hass, person.devices ?? [], person.entity);
  }

  private _renderAvatar(person: FamilyPersonConfig, isStale: boolean) {
    const photo = this._getPersonPhoto(person);
    const name = this._getPersonName(person);
    return photo
      ? html`<img class="avatar ${isStale ? 'stale' : ''}" src=${photo} alt=${name} />`
      : html`<div class="avatar-placeholder ${isStale ? 'stale' : ''}"><ha-icon icon="mdi:account"></ha-icon></div>`;
  }

  private _renderCompactRow(person: FamilyPersonConfig) {
    const zone = this._getPersonZone(person);
    const zoneStyles = this._zoneStyles();
    const zoneStyle = resolveZoneStyle(zone, zoneStyles);
    const isStale = this._isPersonStale(person);
    const showBadge = this._personShowsBadge(person);
    // Worst device: find lowest battery
    const devices = person.devices ?? [];
    const batteries = devices.map(d => getBatteryLevel(this.hass, d)).filter(b => b !== null) as number[];
    const worstBattery = batteries.length > 0 ? Math.min(...batteries) : null;
    const dotColor = worstBattery !== null && worstBattery <= (devices[0]?.battery_threshold ?? 20)
      ? '#f44336' : worstBattery !== null && worstBattery < 50 ? '#ff9800' : '#4caf50';

    return html`
      <div class="person-row" style="--row-accent:${zoneStyle?.border_color ?? 'rgba(255,255,255,0.1)'}">
        <div class="person-row-inner">
          ${this._renderAvatar(person, isStale)}
          <div class="person-info">
            <div class="person-name">${this._getPersonName(person)}</div>
            <div class="person-zone">
              <person-card-location-badge
                .zone=${zone}
                .zoneStyles=${zoneStyles}
              ></person-card-location-badge>
            </div>
          </div>
          <div class="person-row-meta">
            ${worstBattery !== null ? html`<div class="status-dot" style="background:${dotColor}"></div>` : ''}
            ${showBadge ? html`<person-card-notification-badge color="#f44336" icon="mdi:alert-circle"></person-card-notification-badge>` : ''}
          </div>
        </div>
      </div>
    `;
  }

  private _renderMiniRow(person: FamilyPersonConfig) {
    const zone = this._getPersonZone(person);
    const zoneStyles = this._zoneStyles();
    const zoneStyle = resolveZoneStyle(zone, zoneStyles);
    const isStale = this._isPersonStale(person);
    const showBadge = this._personShowsBadge(person);
    const devices = person.devices ?? [];

    return html`
      <div class="person-row" style="--row-accent:${zoneStyle?.border_color ?? 'rgba(255,255,255,0.1)'}">
        <div class="person-row-inner">
          ${this._renderAvatar(person, isStale)}
          <div class="person-info">
            <div class="person-name">${this._getPersonName(person)}</div>
            <div class="person-zone">
              <person-card-location-badge .zone=${zone} .zoneStyles=${zoneStyles}></person-card-location-badge>
            </div>
          </div>
          <div class="person-row-meta">
            ${devices.slice(0, 3).map(device => {
              const battery = getBatteryLevel(this.hass, device);
              const threshold = device.battery_threshold ?? 20;
              const color = battery !== null
                ? (battery <= threshold ? '#f44336' : battery < 50 ? '#ff9800' : '#4caf50')
                : '#888';
              return html`
                <div class="device-summary">
                  <ha-icon .icon=${device.icon ?? 'mdi:devices'} style="--mdc-icon-size:14px;color:rgba(255,255,255,0.5)"></ha-icon>
                  ${battery !== null ? html`<span class="device-summary-pct" style="color:${color}">${Math.round(battery)}%</span>` : ''}
                  <div class="status-dot" style="background:${getConnectivity(this.hass, device) === 'online' ? '#4caf50' : '#f44336'}"></div>
                </div>
              `;
            })}
            ${showBadge ? html`<person-card-notification-badge color="#f44336" icon="mdi:alert-circle"></person-card-notification-badge>` : ''}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    if (!this._config || !this.hass) return html``;
    const people = resolvePersonConfig(this.hass, this._config);
    const density = this._config.density ?? 'detailed';

    return html`
      <div class="card-content">
        ${this._config.background_image ? html`<div class="card-background"></div>` : ''}
        <div class="person-rows">
          ${people.map(person => {
            if (density === 'compact') return this._renderCompactRow(person);
            if (density === 'mini') return this._renderMiniRow(person);
            return this._renderDetailedRow(person);
          })}
        </div>
      </div>
    `;
  }

  // Detailed tier — implemented in Task 16
  private _renderDetailedRow(_person: FamilyPersonConfig) {
    return html`<!-- detailed tier: Task 16 -->`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'family-card': FamilyCard;
  }
}
```

- [ ] **Step 2: Run typecheck**

```bash
cd "/Users/marksquires/Person Card" && npm run typecheck
```

Expected: errors about missing `family-card-editor` — acceptable, we'll fix next task.

- [ ] **Step 3: Commit**

```bash
cd "/Users/marksquires/Person Card" && git add src/family-card.ts && git commit -m "feat: add family-card with compact and mini density tiers"
```

---

### Task 16: Implement detailed tier in `src/family-card.ts`

**Files:**
- Modify: `src/family-card.ts`

- [ ] **Step 1: Replace `_renderDetailedRow` stub with full implementation**

Replace the stub method in `src/family-card.ts`:

```typescript
private _renderDetailedRow(person: FamilyPersonConfig) {
  const zone = this._getPersonZone(person);
  const zoneStyles = this._zoneStyles();
  const zoneStyle = resolveZoneStyle(zone, zoneStyles);
  const isStale = this._isPersonStale(person);
  const showBadge = this._personShowsBadge(person);
  const devices = person.devices ?? [];
  const isExpanded = this._expandedEntity === person.entity;
  const personState = this.hass.states[person.entity];
  const zoneDuration = personState?.last_changed ? formatDuration(personState.last_changed) : '';
  const accentColor = zoneStyle?.border_color ?? 'rgba(255,255,255,0.1)';

  return html`
    <div class="person-row" style="--row-accent:${accentColor}"
      @click=${() => { this._expandedEntity = isExpanded ? null : person.entity; }}>
      <div class="person-row-inner">
        ${this._renderAvatar(person, isStale)}
        <div class="person-info">
          <div class="person-name">${this._getPersonName(person)}</div>
          <div class="person-zone" style="display:flex;align-items:center;gap:6px">
            <person-card-location-badge .zone=${zone} .zoneStyles=${zoneStyles}></person-card-location-badge>
            ${zoneDuration ? html`<span style="font-size:0.7rem;color:rgba(255,255,255,0.35)">· ${zoneDuration}</span>` : ''}
          </div>
        </div>
        <div class="person-row-meta">
          ${devices.slice(0, 3).map(device => {
            const battery = getBatteryLevel(this.hass, device);
            const threshold = device.battery_threshold ?? 20;
            const color = battery !== null
              ? (battery <= threshold ? '#f44336' : battery < 50 ? '#ff9800' : '#4caf50')
              : '#888';
            return battery !== null ? html`
              <div class="device-summary">
                <ha-icon .icon=${device.icon ?? 'mdi:devices'} style="--mdc-icon-size:12px;color:rgba(255,255,255,0.4)"></ha-icon>
                <span class="device-summary-pct" style="color:${color}">${Math.round(battery)}%</span>
              </div>` : '';
          })}
          ${showBadge ? html`<person-card-notification-badge color="#f44336" icon="mdi:alert-circle"></person-card-notification-badge>` : ''}
          <span class="chevron ${isExpanded ? 'open' : ''}">▾</span>
        </div>
      </div>

      ${isExpanded ? html`
        <div class="expanded-panel" @click=${(e: Event) => e.stopPropagation()}>
          ${devices.length > 0 ? html`
            <div class="device-list">
              ${devices.map(device => html`
                <person-card-device-tile
                  .hass=${this.hass}
                  .device=${device}
                  .showLabels=${true}
                ></person-card-device-tile>
              `)}
            </div>
          ` : ''}
          <div class="expanded-footer">
            ${(person.show_last_seen ?? this._config.show_last_seen) && personState?.last_updated ? html`
              <person-card-last-seen .lastUpdated=${personState.last_updated} .format=${'relative'}></person-card-last-seen>
            ` : ''}
            ${(person.show_eta ?? this._config.show_eta) && person.eta_entity ? html`
              <person-card-eta-display
                .hass=${this.hass}
                .etaEntity=${person.eta_entity}
                .personZone=${zone}
              ></person-card-eta-display>
            ` : ''}
          </div>
          <div class="view-full-link"
            @click=${() => {
              const action = person.tap_action;
              if (action && 'navigation_path' in action) {
                history.pushState(null, '', action.navigation_path);
                window.dispatchEvent(new PopStateEvent('popstate'));
              } else {
                this.dispatchEvent(new CustomEvent('hass-more-info', {
                  detail: { entityId: person.entity },
                  bubbles: true,
                  composed: true,
                }));
              }
            }}>
            View full card →
          </div>
        </div>
      ` : ''}
    </div>
  `;
}
```

Add missing import at the top of `src/family-card.ts`:
```typescript
import './components/device-tile';
```

- [ ] **Step 2: Run typecheck**

```bash
cd "/Users/marksquires/Person Card" && npm run typecheck
```

Expected: only the missing `family-card-editor` error remains.

- [ ] **Step 3: Commit**

```bash
cd "/Users/marksquires/Person Card" && git add src/family-card.ts && git commit -m "feat: implement detailed density tier with inline expand on family-card"
```

---

### Task 17: Create `src/family-card-editor.ts`

**Files:**
- Create: `src/family-card-editor.ts`

- [ ] **Step 1: Create `src/family-card-editor.ts`**

```typescript
// src/family-card-editor.ts
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { FamilyCardConfig, FamilyPersonConfig, ConditionRule, Condition, StyleEffect } from './shared/types';
import { COLOR_SCHEMES } from './shared/constants';
import './components/zone-editor';

@customElement('family-card-editor')
export class FamilyCardEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: FamilyCardConfig;
  @state() private _activeTab: 'people' | 'appearance' | 'conditions' | 'display' = 'people';

  static styles = css`
    .tabs { display: flex; border-bottom: 1px solid var(--divider-color, #e0e0e0); margin-bottom: 16px; }
    .tab { padding: 8px 14px; font-size: 0.82rem; font-weight: 600; cursor: pointer;
      border-bottom: 2px solid transparent; color: var(--secondary-text-color); user-select: none; }
    .tab.active { color: var(--primary-color); border-bottom-color: var(--primary-color); }
    .row { margin-bottom: 12px; }
    .row label { display: block; font-size: 0.8rem; color: var(--secondary-text-color); margin-bottom: 4px; }
    .person-block { border: 1px solid var(--divider-color, rgba(0,0,0,0.15)); border-radius: 8px; padding: 8px; margin-bottom: 8px; }
    .person-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
    .person-label { font-size: 0.78rem; color: var(--secondary-text-color); }
    .add-btn { display: inline-flex; align-items: center; gap: 4px; font-size: 0.82rem; cursor: pointer;
      color: var(--primary-color); padding: 6px 0; background: none; border: none; }
    .delete-btn { cursor: pointer; color: var(--error-color, #f44336); background: none; border: none; }
    .segment-control { display: flex; gap: 4px; flex-wrap: wrap; }
    .segment-btn { padding: 4px 12px; border-radius: 6px; font-size: 0.8rem; cursor: pointer;
      border: 1px solid var(--divider-color); background: none; }
    .segment-btn.active { background: var(--primary-color); color: #fff; border-color: var(--primary-color); }
    ha-textfield, ha-entity-picker { display: block; width: 100%; }
    .detail-row { margin-top: 4px; opacity: 0.8; }
    .rule-block { border: 1px solid var(--divider-color, rgba(0,0,0,0.15)); border-radius: 8px; padding: 10px; margin-bottom: 8px; }
    .rule-header { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
    .condition-row { display: flex; align-items: center; gap: 8px; border: 1px solid var(--divider-color, rgba(0,0,0,0.15)); padding: 8px; border-radius: 8px; margin-bottom: 6px; }
    .scheme-row { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; margin: 2px 0 4px; }
    .scheme-swatch { width: 26px; height: 26px; border-radius: 5px; cursor: pointer; flex-shrink: 0; }
    .color-row { display: flex; align-items: center; gap: 8px; }
  `;

  setConfig(config: FamilyCardConfig) { this._config = config; }

  private _fire(config: FamilyCardConfig) {
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }));
    this._config = config;
  }

  private _set(patch: Partial<FamilyCardConfig>) { this._fire({ ...this._config, ...patch }); }

  private _renderPeopleTab() {
    const people = this._config.people ?? [];
    return html`
      <div class="row">
        <label>Density</label>
        <div class="segment-control">
          ${(['compact', 'mini', 'detailed'] as const).map(d => html`
            <button class="segment-btn ${this._config.density === d ? 'active' : ''}"
              @click=${() => this._set({ density: d })}>${d.charAt(0).toUpperCase() + d.slice(1)}</button>
          `)}
        </div>
      </div>
      <div class="row">
        <label>Group Entity (optional — overridden by people list)</label>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.group_entity ?? ''}
          @value-changed=${(e: CustomEvent) => this._set({ group_entity: e.detail.value || undefined })}
        ></ha-entity-picker>
      </div>
      <div class="row">
        <label>People</label>
        ${people.map((person, i) => html`
          <div class="person-block">
            <div class="person-header">
              <span class="person-label">Person entity</span>
              <button class="delete-btn" @click=${() => {
                const updated = [...people]; updated.splice(i, 1); this._set({ people: updated });
              }}><ha-icon .icon=${'mdi:delete'}></ha-icon></button>
            </div>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${person.entity}
              .includeDomains=${['person']}
              @value-changed=${(e: CustomEvent) => {
                const updated = [...people]; updated[i] = { ...updated[i], entity: e.detail.value }; this._set({ people: updated });
              }}
            ></ha-entity-picker>
            <div class="detail-row">
              <ha-textfield
                .value=${person.name ?? ''}
                label="Display name (optional)"
                @input=${(e: InputEvent) => {
                  const updated = [...people];
                  updated[i] = { ...updated[i], name: (e.target as HTMLInputElement).value || undefined };
                  this._set({ people: updated });
                }}
              ></ha-textfield>
            </div>
            <div class="detail-row">
              <ha-entity-picker
                .hass=${this.hass}
                .value=${person.eta_entity ?? ''}
                .includeDomains=${['sensor']}
                label="ETA travel time sensor (optional)"
                @value-changed=${(e: CustomEvent) => {
                  const updated = [...people];
                  updated[i] = { ...updated[i], eta_entity: e.detail.value || undefined };
                  this._set({ people: updated });
                }}
              ></ha-entity-picker>
            </div>
          </div>
        `)}
        <button class="add-btn" @click=${() => this._set({ people: [...people, { entity: '' }] })}>
          <ha-icon .icon=${'mdi:plus-circle'}></ha-icon> Add Person
        </button>
      </div>
    `;
  }

  private _renderAppearanceTab() {
    return html`
      <div class="row">
        <label>Background Image URL (optional)</label>
        <ha-textfield
          .value=${this._config.background_image ?? ''}
          placeholder="https://..."
          @input=${(e: InputEvent) => this._set({ background_image: (e.target as HTMLInputElement).value || undefined })}
        ></ha-textfield>
      </div>
      <div class="row">
        <label>Zone Style Overrides (optional — falls back to Theme Card)</label>
        <person-card-zone-editor
          .hass=${this.hass}
          .zoneStyles=${this._config.zone_styles ?? []}
          @zone-styles-changed=${(e: CustomEvent) => this._set({ zone_styles: e.detail.zoneStyles })}
        ></person-card-zone-editor>
      </div>
    `;
  }

  private _renderConditionsTab() {
    const rules = this._config.conditions ?? [];
    return html`
      <p style="font-size:0.8rem;color:var(--secondary-text-color);margin:0 0 12px">
        Rules are evaluated top-to-bottom. The last matching rule wins.
      </p>
      ${rules.map((rule, ri) => html`
        <div class="rule-block">
          <div class="rule-header">
            <ha-textfield .value=${rule.label ?? ''} label="Rule label" style="flex:1"
              @input=${(e: InputEvent) => {
                const updated = [...rules];
                updated[ri] = { ...updated[ri], label: (e.target as HTMLInputElement).value || undefined };
                this._set({ conditions: updated });
              }}></ha-textfield>
            <div class="segment-control">
              <button class="segment-btn ${rule.operator === 'and' ? 'active' : ''}"
                @click=${() => { const r = [...rules]; r[ri] = { ...r[ri], operator: 'and' }; this._set({ conditions: r }); }}>AND</button>
              <button class="segment-btn ${rule.operator === 'or' ? 'active' : ''}"
                @click=${() => { const r = [...rules]; r[ri] = { ...r[ri], operator: 'or' }; this._set({ conditions: r }); }}>OR</button>
            </div>
            <button class="delete-btn" @click=${() => { const r = [...rules]; r.splice(ri, 1); this._set({ conditions: r }); }}>
              <ha-icon .icon=${'mdi:delete'}></ha-icon>
            </button>
          </div>
          ${rule.conditions.map((cond, ci) => html`
            <ha-entity-picker .hass=${this.hass} .value=${cond.entity} label="Entity"
              style="display:block;width:100%;margin-bottom:4px"
              @value-changed=${(e: CustomEvent) => {
                const r = [...rules]; const conds = [...r[ri].conditions];
                conds[ci] = { ...conds[ci], entity: e.detail.value }; r[ri] = { ...r[ri], conditions: conds }; this._set({ conditions: r });
              }}></ha-entity-picker>
            <div class="condition-row">
              <ha-textfield .value=${cond.attribute ?? ''} label="Attribute (opt.)"
                @input=${(e: InputEvent) => {
                  const r = [...rules]; const conds = [...r[ri].conditions];
                  conds[ci] = { ...conds[ci], attribute: (e.target as HTMLInputElement).value || undefined };
                  r[ri] = { ...r[ri], conditions: conds }; this._set({ conditions: r });
                }}></ha-textfield>
              <select @change=${(e: Event) => {
                const r = [...rules]; const conds = [...r[ri].conditions];
                conds[ci] = { ...conds[ci], operator: (e.target as HTMLSelectElement).value as Condition['operator'] };
                r[ri] = { ...r[ri], conditions: conds }; this._set({ conditions: r });
              }} style="padding:6px;border-radius:6px;border:1px solid var(--divider-color)">
                ${(['eq','neq','lt','gt','lte','gte','contains'] as Condition['operator'][]).map(op => html`
                  <option value=${op} ?selected=${cond.operator === op}>${op}</option>
                `)}
              </select>
              <ha-textfield .value=${String(cond.value)} label="Value"
                @input=${(e: InputEvent) => {
                  const r = [...rules]; const conds = [...r[ri].conditions];
                  const raw = (e.target as HTMLInputElement).value;
                  const numericOps: Condition['operator'][] = ['lt', 'gt', 'lte', 'gte'];
                  const numVal = parseFloat(raw);
                  conds[ci] = { ...conds[ci], value: numericOps.includes(cond.operator) && !isNaN(numVal) ? numVal : raw };
                  r[ri] = { ...r[ri], conditions: conds }; this._set({ conditions: r });
                }}></ha-textfield>
              <button class="delete-btn" @click=${() => {
                const r = [...rules]; const conds = [...r[ri].conditions];
                conds.splice(ci, 1); r[ri] = { ...r[ri], conditions: conds }; this._set({ conditions: r });
              }}><ha-icon .icon=${'mdi:close'}></ha-icon></button>
            </div>
          `)}
          <button class="add-btn" @click=${() => {
            const r = [...rules];
            r[ri] = { ...r[ri], conditions: [...r[ri].conditions, { entity: '', operator: 'eq', value: '' }] };
            this._set({ conditions: r });
          }}><ha-icon .icon=${'mdi:plus'}></ha-icon> Add Condition</button>
          <div style="margin-top:10px;font-size:0.8rem;font-weight:600;color:var(--secondary-text-color)">Effect</div>
          <div class="scheme-row" style="margin-bottom:6px">
            ${COLOR_SCHEMES.map(s => html`
              <div class="scheme-swatch" title=${s.name} style="background:${s.bg};border:3px solid ${s.border}"
                @click=${() => {
                  const r = [...rules]; r[ri] = { ...r[ri], effect: { ...r[ri].effect, background_color: s.bg, border_color: s.border } };
                  this._set({ conditions: r });
                }}></div>
            `)}
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <div class="color-row"><label>Background</label>
              <input type="color" .value=${rule.effect.background_color ?? '#1c1c2e'}
                @input=${(e: InputEvent) => {
                  const r = [...rules]; r[ri] = { ...r[ri], effect: { ...r[ri].effect, background_color: (e.target as HTMLInputElement).value } };
                  this._set({ conditions: r });
                }} /></div>
            <div class="color-row"><label>Border</label>
              <input type="color" .value=${rule.effect.border_color ?? '#ffffff'}
                @input=${(e: InputEvent) => {
                  const r = [...rules]; r[ri] = { ...r[ri], effect: { ...r[ri].effect, border_color: (e.target as HTMLInputElement).value } };
                  this._set({ conditions: r });
                }} /></div>
          </div>
        </div>
      `)}
      <button class="add-btn" @click=${() => {
        const newRule: ConditionRule = { id: crypto.randomUUID(), operator: 'and', conditions: [{ entity: '', operator: 'eq', value: '' }], effect: {} };
        this._set({ conditions: [...rules, newRule] });
      }}><ha-icon .icon=${'mdi:plus-circle'}></ha-icon> Add Rule</button>
    `;
  }

  private _renderDisplayTab() {
    return html`
      <div class="row"><ha-formfield label="Show devices">
        <ha-switch .checked=${this._config.show_devices !== false}
          @change=${(e: Event) => this._set({ show_devices: (e.target as HTMLInputElement).checked })}></ha-switch>
      </ha-formfield></div>
      <div class="row"><ha-formfield label="Show last seen">
        <ha-switch .checked=${this._config.show_last_seen !== false}
          @change=${(e: Event) => this._set({ show_last_seen: (e.target as HTMLInputElement).checked })}></ha-switch>
      </ha-formfield></div>
      <div class="row"><ha-formfield label="Show ETA when away">
        <ha-switch .checked=${this._config.show_eta !== false}
          @change=${(e: Event) => this._set({ show_eta: (e.target as HTMLInputElement).checked })}></ha-switch>
      </ha-formfield></div>
      <div class="row"><ha-formfield label="Show notification badge">
        <ha-switch .checked=${this._config.show_notification_badge !== false}
          @change=${(e: Event) => this._set({ show_notification_badge: (e.target as HTMLInputElement).checked })}></ha-switch>
      </ha-formfield></div>
      <div class="row">
        <label>Offline threshold (minutes, 0 = disabled)</label>
        <ha-textfield
          .value=${String(this._config.offline_threshold ?? 0)}
          type="number" min="0" placeholder="0"
          @input=${(e: InputEvent) => {
            const v = parseInt((e.target as HTMLInputElement).value);
            this._set({ offline_threshold: v > 0 ? v : undefined });
          }}></ha-textfield>
      </div>
    `;
  }

  render() {
    if (!this._config) return html``;
    type Tab = 'people' | 'appearance' | 'conditions' | 'display';
    const tabs: Array<{ key: Tab; label: string }> = [
      { key: 'people', label: 'People' },
      { key: 'appearance', label: 'Appearance' },
      { key: 'conditions', label: 'Conditions' },
      { key: 'display', label: 'Display' },
    ];
    return html`
      <div class="tabs">
        ${tabs.map(t => html`
          <div class="tab ${this._activeTab === t.key ? 'active' : ''}"
            @click=${() => { this._activeTab = t.key; }}>${t.label}</div>
        `)}
      </div>
      ${this._activeTab === 'people'      ? this._renderPeopleTab()      : ''}
      ${this._activeTab === 'appearance'  ? this._renderAppearanceTab()  : ''}
      ${this._activeTab === 'conditions'  ? this._renderConditionsTab()  : ''}
      ${this._activeTab === 'display'     ? this._renderDisplayTab()     : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'family-card-editor': FamilyCardEditor;
  }
}
```

- [ ] **Step 2: Run typecheck**

```bash
cd "/Users/marksquires/Person Card" && npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Run all tests**

```bash
cd "/Users/marksquires/Person Card" && npm test
```

Expected: all pass.

- [ ] **Step 4: Commit**

```bash
cd "/Users/marksquires/Person Card" && git add src/family-card-editor.ts && git commit -m "feat: add family-card GUI editor with People/Appearance/Conditions/Display tabs"
```

---

## Phase 4 — Build, HACS & Docs

### Task 18: Add family-card entry point to esbuild

**Files:**
- Modify: `esbuild.config.mjs`
- Modify: `package.json` (bump version to 0.4.0)

- [ ] **Step 1: Update `esbuild.config.mjs`**

```javascript
import * as esbuild from 'esbuild';

const isWatch = process.argv.includes('--watch');

const sharedOptions = {
  bundle: true,
  format: 'esm',
  target: 'es2020',
  minify: !isWatch,
  sourcemap: isWatch ? 'inline' : false,
};

if (isWatch) {
  const ctx1 = await esbuild.context({ ...sharedOptions, entryPoints: ['src/person-card.ts'], outfile: 'dist/person-card.js' });
  const ctx2 = await esbuild.context({ ...sharedOptions, entryPoints: ['src/family-card.ts'], outfile: 'dist/family-card.js' });
  await Promise.all([ctx1.watch(), ctx2.watch()]);
  console.log('Watching for changes...');
} else {
  await Promise.all([
    esbuild.build({ ...sharedOptions, entryPoints: ['src/person-card.ts'], outfile: 'dist/person-card.js' }),
    esbuild.build({ ...sharedOptions, entryPoints: ['src/family-card.ts'], outfile: 'dist/family-card.js' }),
  ]);
  console.log('Build complete: dist/person-card.js + dist/family-card.js');
}
```

- [ ] **Step 2: Update version in `package.json`**

Change `"version": "0.1.0"` to `"version": "0.4.0"`.

- [ ] **Step 3: Run build**

```bash
cd "/Users/marksquires/Person Card" && npm run build
```

Expected: `Build complete: dist/person-card.js + dist/family-card.js`
Verify both files exist: `ls -lh dist/`

- [ ] **Step 4: Run all tests**

```bash
cd "/Users/marksquires/Person Card" && npm test
```

Expected: all pass.

- [ ] **Step 5: Commit**

```bash
cd "/Users/marksquires/Person Card" && git add esbuild.config.mjs package.json && git commit -m "build: add family-card.js entry point, bump version to 0.4.0"
```

---

### Task 19: Update GitHub Actions release workflow

**Files:**
- Modify: `.github/workflows/release.yml`

- [ ] **Step 1: Read current workflow**

```bash
cat "/Users/marksquires/Person Card/.github/workflows/release.yml"
```

- [ ] **Step 2: Update the release assets section** — add `dist/family-card.js` alongside `dist/person-card.js` in the upload-release-asset step. The exact edit depends on the current workflow content (read in step 1), but the pattern is to duplicate the upload step or update it to use a glob pattern like `dist/*.js`.

If the workflow uses `softprops/action-gh-release`, change the `files:` key to:
```yaml
files: |
  dist/person-card.js
  dist/family-card.js
```

- [ ] **Step 3: Commit**

```bash
cd "/Users/marksquires/Person Card" && git add .github/workflows/release.yml && git commit -m "ci: include family-card.js in release assets"
```

---

### Task 20: Update CHANGELOG and README for v0.4.0

**Files:**
- Modify: `CHANGELOG.md`
- Modify: `README.md`

- [ ] **Step 1: Add v0.4.0 entry to `CHANGELOG.md`** at the top (after the header, before `## [0.3.0]`):

```markdown
## [0.4.0] — 2026-04-12

### Added

- **Family Card** (`family-card`) — multi-person overview card with three density tiers: Compact (one row per person), Mini (device tile grid), and Detailed (expandable rows with full device list, last seen, ETA, and "View full card" link)
- **Theme Card** (`person-card-theme`) — shared zone colour scheme card; configure zone styles once and all person-card and family-card instances pick them up automatically; renders as a compact dot legend
- **Shared zone styles** — zone styles set in the theme card are automatically applied to all cards; per-card `zone_styles` overrides the theme

### Changed

- `eta_entity` is now a first-class config field on person-card (replaces the `__eta__` device sentinel hack); old configs auto-migrate transparently
- Zone editor extracted as a reusable component — same UI in person-card editor, family-card editor, and theme card editor

### Internal

- Extracted shared modules: `src/shared/` — types, constants, format-utils, battery-utils, zone-utils, condition-engine, ha-helpers, theme-registry, eta-migration, family-card-utils
- Build now produces two files: `dist/person-card.js` and `dist/family-card.js`
```

- [ ] **Step 2: Update README.md** — add sections for Family Card and Theme Card (after the existing Stats Layout section). Add `family-card.js` to the Installation section. Update the Features list.

Family Card section to add:
```markdown
## Family Card

A multi-person overview card for tracking the whole household at a glance.

```yaml
type: custom:family-card
people:
  - entity: person.mark
    eta_entity: sensor.marks_travel_time
  - entity: person.jane
  - entity: person.sophie
density: detailed          # compact | mini | detailed
show_devices: true
show_last_seen: true
offline_threshold: 30
```

Three density tiers:
- **Compact** — one row per person: avatar, name, zone badge, status dot
- **Mini** — tile grid per person with device battery bars
- **Detailed** — expandable rows; tap to see full device list, last seen, ETA, and "View full card" link

Alternatively, point at a HA group entity and people are auto-discovered:

```yaml
type: custom:family-card
group_entity: group.family
density: detailed
```

Add `family-card.js` as a second Dashboard resource:
**Settings → Dashboards → Resources** → `/local/community/lovelace-person-card/family-card.js`
```

Theme Card section to add:
```markdown
## Theme Card

Configure zone colours once and share them across all person-card and family-card instances.

```yaml
type: custom:person-card-theme
zone_styles:
  - zone: home
    label: Home
    icon: mdi:home
    background_color: "#1b2e1b"
    border_color: "#76c442"
  - zone: work
    label: Office
    icon: mdi:briefcase
    background_color: "#1a2332"
    border_color: "#80deea"
  - zone: not_home
    label: Away
    icon: mdi:map-marker-off
    border_color: "#ff6d00"
```

Renders as a compact dot legend — `● Home  ● Office  ● Away` — using each zone's border colour. Place it anywhere on the dashboard; all cards on the same page pick it up automatically. Per-card `zone_styles` overrides the theme if set.
```

- [ ] **Step 3: Commit**

```bash
cd "/Users/marksquires/Person Card" && git add CHANGELOG.md README.md && git commit -m "docs: update README and CHANGELOG for v0.4.0 family card and theme card"
```

---

### Task 21: Tag v0.4.0 release

- [ ] **Step 1: Final build and test run**

```bash
cd "/Users/marksquires/Person Card" && npm run build && npm test
```

Expected: both build files produced, all tests pass.

- [ ] **Step 2: Tag and push**

```bash
cd "/Users/marksquires/Person Card" && git tag v0.4.0 && git push origin master --tags
```

Expected: push succeeds, GitHub Actions release workflow triggers and attaches both `person-card.js` and `family-card.js`.

---

## Self-Review Checklist

- [x] **Theme card** — Tasks 10–12 cover element, styles, legend render, editor, and zone-editor component
- [x] **Theme registry** — Tasks 8–9 cover write/read/event, and wiring into person-card
- [x] **Family card compact/mini/detailed tiers** — Tasks 13–16
- [x] **Family card expand behaviour** — Task 16 (`_renderDetailedRow`)
- [x] **Group entity resolution** — Task 13 (`resolveGroupMembers`, `resolvePersonConfig`)
- [x] **"View full card" tap action** — Task 16 (fires `hass-more-info` or `navigate`)
- [x] **Per-card zone style override precedence** — Task 9 (`resolveZoneStyles` returns card styles if non-empty)
- [x] **`__eta__` migration** — Task 6 (`migrateEtaSentinel`)
- [x] **Battery colour deduplication** — Task 4 (`getBatteryColor`)
- [x] **Shared zone-editor component** — Task 11
- [x] **Build dual entry points** — Task 18
- [x] **HACS/release workflow** — Task 19
- [x] **Backwards compatibility** — existing tests pass throughout; `src/types.ts` re-exports from shared; `src/lib/` re-exports from shared
- [x] **No placeholders** — all code blocks are complete
- [x] **Type consistency** — `FamilyPersonConfig`, `FamilyCardConfig`, `PersonCardThemeConfig` defined in Task 13/1 and used consistently
