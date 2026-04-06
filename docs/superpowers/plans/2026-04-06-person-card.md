# Person Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `lovelace-person-card`, a bold HACS-ready Home Assistant Lovelace card showing person location, device battery/connectivity, ETA, and conditional styling via a GUI editor.

**Architecture:** Lit 3.x + TypeScript web component bundled to a single `dist/person-card.js`. Pure logic (condition evaluation, HA state helpers) is TDD'd with vitest. Lit components are built and validated against a local HA dev server. The GUI editor is registered as `<person-card-editor>` and uses HA's native editor elements.

**Tech Stack:** Lit 3.x, TypeScript 5.x, esbuild, vitest, custom-card-helpers, HACS + GitHub Actions

---

## File Map

| File | Responsibility |
|------|---------------|
| `src/types.ts` | All shared TypeScript interfaces |
| `src/lib/condition-engine.ts` | Pure fn: evaluate condition rules → StyleEffect |
| `src/lib/ha-helpers.ts` | Pure fns: battery, connectivity, last-seen, badge visibility |
| `src/styles.ts` | Lit `css` tagged template — card's bold visual theme |
| `src/components/location-badge.ts` | Renders zone name + icon |
| `src/components/device-tile.ts` | Renders one device: icon, battery bar, connectivity dot |
| `src/components/notification-badge.ts` | Renders alert dot/icon overlay |
| `src/components/eta-display.ts` | Renders ETA when person is away |
| `src/components/last-seen.ts` | Renders last-updated timestamp |
| `src/person-card.ts` | Main card element: adaptive sizing, state subscription, condition styling |
| `src/person-card-editor.ts` | Tabbed GUI editor element |
| `tests/lib/condition-engine.test.ts` | Unit tests for condition-engine |
| `tests/lib/ha-helpers.test.ts` | Unit tests for ha-helpers |
| `hacs.json` | HACS plugin metadata |
| `info.md` | HACS UI description |
| `esbuild.config.mjs` | Build script |
| `.github/workflows/release.yml` | Release on tag push |

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `esbuild.config.mjs`
- Create: `vitest.config.ts`
- Create: `.gitignore`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "lovelace-person-card",
  "version": "0.1.0",
  "description": "A bold Home Assistant person status card for HACS",
  "type": "module",
  "scripts": {
    "build": "node esbuild.config.mjs",
    "dev": "node esbuild.config.mjs --watch",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "devDependencies": {
    "custom-card-helpers": "^1.9.0",
    "esbuild": "^0.21.0",
    "lit": "^3.2.0",
    "typescript": "^5.4.0",
    "vitest": "^1.6.0"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "moduleResolution": "bundler",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "strict": true,
    "declaration": false,
    "skipLibCheck": true
  },
  "include": ["src/**/*", "tests/**/*"]
}
```

- [ ] **Step 3: Create `esbuild.config.mjs`**

```js
import * as esbuild from 'esbuild';

const isWatch = process.argv.includes('--watch');

const options = {
  entryPoints: ['src/person-card.ts'],
  bundle: true,
  outfile: 'dist/person-card.js',
  format: 'esm',
  target: 'es2020',
  minify: !isWatch,
  sourcemap: isWatch ? 'inline' : false,
};

if (isWatch) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
  console.log('Watching for changes...');
} else {
  await esbuild.build(options);
  console.log('Build complete: dist/person-card.js');
}
```

- [ ] **Step 4: Create `vitest.config.ts`**

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
```

- [ ] **Step 5: Create `.gitignore`**

```
node_modules/
dist/
.superpowers/
*.js.map
```

- [ ] **Step 6: Install dependencies**

Run: `npm install`

Expected: `node_modules/` created, no errors.

- [ ] **Step 7: Verify build toolchain**

Create `src/person-card.ts` with a single line: `export const version = '0.1.0';`

Run: `npm run build`

Expected: `dist/person-card.js` created with no errors.

- [ ] **Step 8: Commit**

```bash
git init
git add package.json tsconfig.json esbuild.config.mjs vitest.config.ts .gitignore src/person-card.ts
git commit -m "chore: project scaffold — Lit/TS/esbuild/vitest"
```

---

## Task 2: TypeScript Types

**Files:**
- Create: `src/types.ts`

- [ ] **Step 1: Create `src/types.ts`**

```typescript
export interface PersonCardConfig {
  person_entity: string;
  name?: string;
  photo?: string;
  devices?: DeviceConfig[];
  size?: 'auto' | 'small' | 'medium' | 'large';
  show_eta?: boolean;
  show_last_seen?: boolean;
  show_notification_badge?: boolean;
  background_image?: string;
  zone_styles?: ZoneStyleConfig[];
  conditions?: ConditionRule[];
}

export interface DeviceConfig {
  entity: string;
  name?: string;
  icon?: string;
  battery_entity?: string;
  connectivity_entity?: string;
}

export interface ZoneStyleConfig {
  // Matches the person entity state value: 'home', 'Work', 'not_home', 'unknown', etc.
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

export type SizeTier = 'small' | 'medium' | 'large';

export type ConnectivityState = 'online' | 'offline' | 'unknown';
```

- [ ] **Step 2: Verify types compile**

Run: `npx tsc --noEmit`

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/types.ts
git commit -m "feat: add TypeScript type definitions"
```

---

## Task 3: condition-engine (TDD)

**Files:**
- Create: `tests/lib/condition-engine.test.ts`
- Create: `src/lib/condition-engine.ts`

- [ ] **Step 1: Write the failing tests**

Create `tests/lib/condition-engine.test.ts`:

```typescript
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
```

- [ ] **Step 2: Run tests to confirm they fail**

Run: `npm test`

Expected: All tests FAIL with "Cannot find module '../../src/lib/condition-engine'"

- [ ] **Step 3: Create `src/lib/condition-engine.ts`**

```typescript
import type { Condition, ConditionRule, StyleEffect } from '../types';

interface HassLike {
  states: Record<string, { state: string; attributes: Record<string, unknown> }>;
}

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
    const matches = rule.operator === 'or'
      ? rule.conditions.some(c => evaluateCondition(c, hass))
      : rule.conditions.every(c => evaluateCondition(c, hass));

    if (matches) {
      result = { ...result, ...rule.effect };
    }
  }

  return result;
}
```

- [ ] **Step 4: Run tests to confirm they pass**

Run: `npm test`

Expected: All 14 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/condition-engine.ts tests/lib/condition-engine.test.ts
git commit -m "feat: condition engine with full operator support (TDD)"
```

---

## Task 4: ha-helpers (TDD)

**Files:**
- Create: `tests/lib/ha-helpers.test.ts`
- Create: `src/lib/ha-helpers.ts`

- [ ] **Step 1: Write the failing tests**

Create `tests/lib/ha-helpers.test.ts`:

```typescript
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
    // Use a fixed date string to avoid locale issues
    const date = new Date();
    date.setHours(14, 32, 0, 0);
    const result = formatLastSeen(date.toISOString(), 'absolute');
    expect(result).toMatch(/14:32/);
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
```

- [ ] **Step 2: Run tests to confirm they fail**

Run: `npm test`

Expected: FAIL with "Cannot find module '../../src/lib/ha-helpers'"

- [ ] **Step 3: Create `src/lib/ha-helpers.ts`**

```typescript
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
  if (format === 'absolute') {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
    if (battery !== null && battery < 20) return true;
    if (getConnectivity(hass, device) === 'offline') return true;
  }
  return false;
}
```

- [ ] **Step 4: Run tests to confirm they pass**

Run: `npm test`

Expected: All tests PASS (condition-engine + ha-helpers suites).

- [ ] **Step 5: Commit**

```bash
git add src/lib/ha-helpers.ts tests/lib/ha-helpers.test.ts
git commit -m "feat: HA state helper functions (TDD)"
```

---

## Task 5: Visual Styles

**Files:**
- Create: `src/styles.ts`

- [ ] **Step 1: Create `src/styles.ts`**

```typescript
import { css } from 'lit';

export const cardStyles = css`
  :host {
    display: block;
    font-family: var(--person-card-font-family, 'Segoe UI', system-ui, sans-serif);
    border-radius: var(--person-card-border-radius, 16px);
    overflow: hidden;
    position: relative;
    background: var(--person-card-background, #1c1c2e);
    color: #ffffff;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
    transition: background 0.4s ease, border-color 0.4s ease, box-shadow 0.3s ease;
    border: var(--pc-border-width, 0px) solid var(--pc-border-color, transparent);
  }

  .card-background {
    position: absolute;
    inset: 0;
    background-image: var(--pc-background-image, none);
    background-size: cover;
    background-position: center;
    opacity: 0.25;
    pointer-events: none;
    border-radius: inherit;
  }

  .card-content {
    position: relative;
    z-index: 1;
    padding: 16px;
  }

  /* Size: small */
  :host([size-tier='small']) .card-content {
    padding: 10px 12px;
  }

  /* Header row */
  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
  }

  .avatar {
    width: var(--person-card-avatar-size, 48px);
    height: var(--person-card-avatar-size, 48px);
    border-radius: 50%;
    object-fit: cover;
    background: #2d2d50;
    flex-shrink: 0;
    border: 2px solid rgba(255,255,255,0.15);
  }

  :host([size-tier='small']) .avatar {
    width: 36px;
    height: 36px;
  }

  :host([size-tier='large']) .avatar {
    width: 64px;
    height: 64px;
  }

  .avatar-placeholder {
    width: var(--person-card-avatar-size, 48px);
    height: var(--person-card-avatar-size, 48px);
    border-radius: 50%;
    background: #2d2d50;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .avatar-placeholder ha-icon {
    --mdc-icon-size: 28px;
    color: rgba(255,255,255,0.5);
  }

  .name-zone {
    flex: 1;
    min-width: 0;
  }

  .name {
    font-size: 1.1rem;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 0.02em;
  }

  :host([size-tier='large']) .name {
    font-size: 1.3rem;
  }

  /* Divider */
  .divider {
    height: 1px;
    background: rgba(255,255,255,0.1);
    margin: 10px 0;
  }

  /* Device list */
  .devices {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  /* Footer row */
  .footer {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 0.78rem;
    color: rgba(255,255,255,0.55);
  }
`;
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/styles.ts
git commit -m "feat: card visual styles (bold/opinionated theme)"
```

---

## Task 6: location-badge Component

**Files:**
- Create: `src/components/location-badge.ts`

- [ ] **Step 1: Create `src/components/location-badge.ts`**

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ZoneStyleConfig } from '../types';

@customElement('person-card-location-badge')
export class LocationBadge extends LitElement {
  @property() zone = '';
  @property({ type: Array }) zoneStyles: ZoneStyleConfig[] = [];

  static styles = css`
    :host { display: inline-flex; align-items: center; gap: 4px; }
    .zone-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: rgba(255,255,255,0.8);
      text-transform: capitalize;
      letter-spacing: 0.04em;
    }
    ha-icon {
      --mdc-icon-size: 16px;
      color: rgba(255,255,255,0.7);
    }
  `;

  private get zoneStyle(): ZoneStyleConfig | undefined {
    return this.zoneStyles.find(s => s.zone === this.zone);
  }

  private get displayLabel(): string {
    const style = this.zoneStyle;
    if (style?.label) return style.label;
    if (this.zone === 'not_home') return 'Away';
    if (this.zone === 'unknown') return 'Unknown';
    return this.zone;
  }

  private get icon(): string {
    const style = this.zoneStyle;
    if (style?.icon) return style.icon;
    if (this.zone === 'home') return 'mdi:home';
    if (this.zone === 'not_home') return 'mdi:map-marker-off';
    if (this.zone === 'unknown') return 'mdi:help-circle';
    return 'mdi:map-marker';
  }

  render() {
    return html`
      <ha-icon .icon=${this.icon}></ha-icon>
      <span class="zone-label">${this.displayLabel}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'person-card-location-badge': LocationBadge;
  }
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/location-badge.ts
git commit -m "feat: location-badge component"
```

---

## Task 7: device-tile Component

**Files:**
- Create: `src/components/device-tile.ts`

- [ ] **Step 1: Create `src/components/device-tile.ts`**

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { DeviceConfig, ConnectivityState } from '../types';
import { getBatteryLevel, getConnectivity } from '../lib/ha-helpers';
import type { HomeAssistant } from 'custom-card-helpers';

@customElement('person-card-device-tile')
export class DeviceTile extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ type: Object }) device!: DeviceConfig;
  @property({ type: Boolean }) showLabels = false;

  static styles = css`
    :host { display: flex; align-items: center; gap: 8px; }

    ha-icon {
      --mdc-icon-size: 18px;
      color: rgba(255,255,255,0.7);
      flex-shrink: 0;
    }

    .name {
      font-size: 0.82rem;
      color: rgba(255,255,255,0.75);
      min-width: 60px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .battery-bar-wrap {
      flex: 1;
      height: 4px;
      background: rgba(255,255,255,0.1);
      border-radius: 2px;
      overflow: hidden;
    }

    .battery-bar-fill {
      height: 100%;
      border-radius: 2px;
      transition: width 0.3s ease, background 0.3s ease;
    }

    .battery-pct {
      font-size: 0.75rem;
      color: rgba(255,255,255,0.55);
      min-width: 30px;
      text-align: right;
    }

    .conn-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .conn-dot.online  { background: #4caf50; }
    .conn-dot.offline { background: rgba(255,255,255,0.2); }
    .conn-dot.unknown { background: #ff9800; }
  `;

  private batteryColor(level: number): string {
    if (level < 20) return '#f44336';
    if (level < 50) return '#ff9800';
    return '#4caf50';
  }

  render() {
    const battery = getBatteryLevel(this.hass, this.device);
    const conn: ConnectivityState = getConnectivity(this.hass, this.device);
    const icon = this.device.icon ?? 'mdi:cellphone';
    const name = this.device.name ?? this.device.entity.split('.')[1].replace(/_/g, ' ');

    return html`
      <ha-icon .icon=${icon}></ha-icon>
      ${this.showLabels ? html`<span class="name">${name}</span>` : ''}
      ${battery !== null ? html`
        <div class="battery-bar-wrap">
          <div class="battery-bar-fill" style="width:${battery}%;background:${this.batteryColor(battery)}"></div>
        </div>
        <span class="battery-pct">${battery}%</span>
      ` : ''}
      <div class="conn-dot ${conn}"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'person-card-device-tile': DeviceTile;
  }
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/device-tile.ts
git commit -m "feat: device-tile component with battery bar and connectivity dot"
```

---

## Task 8: notification-badge Component

**Files:**
- Create: `src/components/notification-badge.ts`

- [ ] **Step 1: Create `src/components/notification-badge.ts`**

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('person-card-notification-badge')
export class NotificationBadge extends LitElement {
  @property() color = '#f44336';
  @property() icon = 'mdi:alert-circle';

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    ha-icon {
      --mdc-icon-size: 16px;
    }
  `;

  render() {
    return html`
      <div style="
        background:${this.color};
        border-radius:50%;
        width:22px;
        height:22px;
        display:flex;
        align-items:center;
        justify-content:center;
        box-shadow:0 0 8px ${this.color}88;
      ">
        <ha-icon .icon=${this.icon} style="color:#fff;--mdc-icon-size:14px"></ha-icon>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'person-card-notification-badge': NotificationBadge;
  }
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/notification-badge.ts
git commit -m "feat: notification-badge component"
```

---

## Task 9: eta-display Component

**Files:**
- Create: `src/components/eta-display.ts`

- [ ] **Step 1: Create `src/components/eta-display.ts`**

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';

@customElement('person-card-eta-display')
export class EtaDisplay extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property() etaEntity = '';
  @property() personZone = '';

  static styles = css`
    :host { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: rgba(255,255,255,0.65); }
    ha-icon { --mdc-icon-size: 14px; }
  `;

  render() {
    // Only render when person is away and ETA entity is configured
    if (!this.etaEntity || this.personZone === 'home') return html``;

    const etaState = this.hass.states[this.etaEntity];
    if (!etaState) return html``;

    const minutes = parseFloat(etaState.state);
    if (isNaN(minutes)) return html``;

    const display = minutes < 1 ? 'arriving' : `${Math.round(minutes)} min`;

    return html`
      <ha-icon icon="mdi:clock-outline"></ha-icon>
      <span>ETA home: ${display}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'person-card-eta-display': EtaDisplay;
  }
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/eta-display.ts
git commit -m "feat: eta-display component"
```

---

## Task 10: last-seen Component

**Files:**
- Create: `src/components/last-seen.ts`

- [ ] **Step 1: Create `src/components/last-seen.ts`**

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { formatLastSeen } from '../lib/ha-helpers';

@customElement('person-card-last-seen')
export class LastSeen extends LitElement {
  @property() lastUpdated = '';
  @property() format: 'relative' | 'absolute' = 'relative';

  @state() private _tick = 0;
  private _interval?: ReturnType<typeof setInterval>;

  static styles = css`
    :host { display: flex; align-items: center; gap: 6px; font-size: 0.78rem; color: rgba(255,255,255,0.45); }
    ha-icon { --mdc-icon-size: 13px; }
  `;

  connectedCallback() {
    super.connectedCallback();
    if (this.format === 'relative') {
      this._interval = setInterval(() => { this._tick++; }, 60_000);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._interval) clearInterval(this._interval);
  }

  render() {
    if (!this.lastUpdated) return html``;
    // _tick forces re-render every minute for relative mode
    void this._tick;
    const text = formatLastSeen(this.lastUpdated, this.format);
    return html`
      <ha-icon icon="mdi:clock-check-outline"></ha-icon>
      <span>Last seen: ${text}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'person-card-last-seen': LastSeen;
  }
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/last-seen.ts
git commit -m "feat: last-seen component with auto-refresh for relative mode"
```

---

## Task 11: Main Card Element

**Files:**
- Modify: `src/person-card.ts` (replace stub)

- [ ] **Step 1: Replace `src/person-card.ts` with the full card element**

```typescript
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { PersonCardConfig, SizeTier, StyleEffect } from './types';
import { cardStyles } from './styles';
import { evaluateConditions } from './lib/condition-engine';
import { shouldShowNotificationBadge } from './lib/ha-helpers';

// Register sub-components so they are available in the template
import './components/location-badge';
import './components/device-tile';
import './components/notification-badge';
import './components/eta-display';
import './components/last-seen';

// HACS / HA card registration
declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description: string; preview?: boolean }>;
  }
}
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: 'person-card',
  name: 'Person Card',
  description: 'At-a-glance person status: location, devices, ETA, and conditional styling.',
  preview: true,
});

@customElement('person-card')
export class PersonCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: PersonCardConfig;
  @state() private _sizeTier: SizeTier = 'medium';

  private _resizeObserver?: ResizeObserver;

  static styles = cardStyles;

  static getStubConfig(): PersonCardConfig {
    return {
      person_entity: 'person.example',
      devices: [],
      size: 'auto',
      show_eta: true,
      show_last_seen: true,
      show_notification_badge: true,
      zone_styles: [],
      conditions: [],
    };
  }

  setConfig(config: PersonCardConfig): void {
    if (!config.person_entity) {
      throw new Error('person_entity is required');
    }
    this._config = {
      size: 'auto',
      show_eta: true,
      show_last_seen: true,
      show_notification_badge: true,
      devices: [],
      zone_styles: [],
      conditions: [],
      ...config,
    };
  }

  getCardSize(): number {
    return 3;
  }

  static getConfigElement(): HTMLElement {
    return document.createElement('person-card-editor');
  }

  connectedCallback() {
    super.connectedCallback();
    if (this._config?.size === 'auto') {
      this._resizeObserver = new ResizeObserver(entries => {
        const width = entries[0]?.contentRect.width ?? 300;
        this._sizeTier = width < 200 ? 'small' : width < 400 ? 'medium' : 'large';
      });
      this._resizeObserver.observe(this);
    } else if (this._config?.size && this._config.size !== 'auto') {
      this._sizeTier = this._config.size;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
  }

  private get _personState() {
    return this.hass?.states[this._config.person_entity];
  }

  private get _personZone(): string {
    return this._personState?.state ?? 'unknown';
  }

  private get _conditionEffect(): StyleEffect {
    if (!this._config.conditions?.length) return {};
    return evaluateConditions(this._config.conditions, this.hass);
  }

  private get _zoneStyle() {
    return this._config.zone_styles?.find(s => s.zone === this._personZone);
  }

  private get _showBadge(): boolean {
    if (!this._config.show_notification_badge) return false;
    const effect = this._conditionEffect;
    if (effect.badge_color || effect.badge_icon) return true;
    return shouldShowNotificationBadge(
      this.hass,
      this._config.devices ?? [],
      this._config.person_entity,
    );
  }

  private _hostStyles(): Record<string, string> {
    const effect = this._conditionEffect;
    const zoneStyle = this._zoneStyle;
    const styles: Record<string, string> = {};

    const bg = effect.background_color ?? zoneStyle?.background_color;
    if (bg) styles['--person-card-background'] = bg;

    if (effect.border_color ?? zoneStyle?.border_color) {
      styles['--pc-border-color'] = (effect.border_color ?? zoneStyle?.border_color)!;
      styles['--pc-border-width'] = `${effect.border_width ?? 2}px`;
    }

    if (this._config.background_image) {
      styles['--pc-background-image'] = `url('${this._config.background_image}')`;
    }

    return styles;
  }

  render() {
    if (!this._config || !this.hass) return html``;

    const personState = this._personState;
    const name = this._config.name
      ?? personState?.attributes?.['friendly_name'] as string
      ?? this._config.person_entity.split('.')[1].replace(/_/g, ' ');
    const photo = this._config.photo ?? personState?.attributes?.['entity_picture'] as string;
    const effect = this._conditionEffect;
    const isLarge = this._sizeTier === 'large';
    const isSmall = this._sizeTier === 'small';
    const devices = this._config.devices ?? [];
    const lastUpdated = personState?.last_updated ?? '';

    return html`
      <div style=${styleMap(this._hostStyles())} class="card-content" size-tier=${this._sizeTier}>
        ${this._config.background_image ? html`<div class="card-background"></div>` : ''}

        <!-- Header -->
        <div class="header">
          ${photo
            ? html`<img class="avatar" src=${photo} alt=${name} />`
            : html`<div class="avatar-placeholder"><ha-icon icon="mdi:account"></ha-icon></div>`
          }
          <div class="name-zone">
            <div class="name">${name}</div>
            <person-card-location-badge
              .zone=${this._personZone}
              .zoneStyles=${this._config.zone_styles ?? []}
            ></person-card-location-badge>
          </div>
          ${this._showBadge ? html`
            <person-card-notification-badge
              .color=${effect.badge_color ?? '#f44336'}
              .icon=${effect.badge_icon ?? 'mdi:alert-circle'}
            ></person-card-notification-badge>
          ` : ''}
        </div>

        <!-- Devices (medium + large) -->
        ${!isSmall && devices.length > 0 ? html`
          <div class="divider"></div>
          <div class="devices">
            ${devices.map(device => html`
              <person-card-device-tile
                .hass=${this.hass}
                .device=${device}
                .showLabels=${isLarge}
              ></person-card-device-tile>
            `)}
          </div>
        ` : ''}

        <!-- Footer (large only) -->
        ${isLarge ? html`
          <div class="divider"></div>
          <div class="footer">
            ${this._config.show_eta ? html`
              <person-card-eta-display
                .hass=${this.hass}
                .etaEntity=${this._config.devices?.find(d => d.entity.includes('travel'))?.entity ?? ''}
                .personZone=${this._personZone}
              ></person-card-eta-display>
            ` : ''}
            ${this._config.show_last_seen && lastUpdated ? html`
              <person-card-last-seen
                .lastUpdated=${lastUpdated}
                .format=${'relative'}
              ></person-card-last-seen>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'person-card': PersonCard;
  }
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`

Expected: No errors.

- [ ] **Step 3: Build the bundle**

Run: `npm run build`

Expected: `dist/person-card.js` created with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/person-card.ts
git commit -m "feat: main PersonCard element with adaptive sizing and condition styling"
```

---

## Task 12: Editor Element

**Files:**
- Create: `src/person-card-editor.ts`

- [ ] **Step 1: Create `src/person-card-editor.ts`**

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { PersonCardConfig, DeviceConfig, ZoneStyleConfig, ConditionRule, Condition, StyleEffect } from './types';
// crypto.randomUUID() is a native browser API — no import needed

@customElement('person-card-editor')
export class PersonCardEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: PersonCardConfig;
  @state() private _activeTab: 'person' | 'devices' | 'appearance' | 'conditions' | 'display' = 'person';

  static styles = css`
    .tabs {
      display: flex;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      margin-bottom: 16px;
      gap: 0;
    }
    .tab {
      padding: 8px 14px;
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      color: var(--secondary-text-color);
      user-select: none;
      transition: color 0.2s, border-color 0.2s;
    }
    .tab.active {
      color: var(--primary-color);
      border-bottom-color: var(--primary-color);
    }
    .row { margin-bottom: 12px; }
    .row label { display: block; font-size: 0.8rem; color: var(--secondary-text-color); margin-bottom: 4px; }
    .device-row, .zone-row, .condition-row {
      display: flex; align-items: center; gap: 8px;
      background: var(--secondary-background-color);
      padding: 8px; border-radius: 8px; margin-bottom: 6px;
    }
    .device-row > *, .zone-row > * { flex: 1; }
    .add-btn {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: 0.82rem; cursor: pointer;
      color: var(--primary-color); padding: 6px 0; background: none; border: none;
    }
    .delete-btn {
      cursor: pointer; color: var(--error-color, #f44336);
      background: none; border: none; flex: 0 0 auto;
    }
    .rule-block {
      background: var(--secondary-background-color);
      border-radius: 8px; padding: 10px; margin-bottom: 8px;
    }
    .rule-header { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
    .segment-control { display: flex; gap: 4px; }
    .segment-btn {
      padding: 4px 12px; border-radius: 6px; font-size: 0.8rem; cursor: pointer;
      border: 1px solid var(--divider-color); background: none;
    }
    .segment-btn.active { background: var(--primary-color); color: #fff; border-color: var(--primary-color); }
    ha-textfield, ha-entity-picker, ha-icon-picker { display: block; width: 100%; }
    .color-row { display: flex; align-items: center; gap: 8px; }
    .color-swatch { width: 28px; height: 28px; border-radius: 6px; border: 1px solid var(--divider-color); cursor: pointer; }
  `;

  setConfig(config: PersonCardConfig) {
    this._config = config;
  }

  private _fire(config: PersonCardConfig) {
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }));
    this._config = config;
  }

  private _set(patch: Partial<PersonCardConfig>) {
    this._fire({ ...this._config, ...patch });
  }

  // ── Tab: Person ──────────────────────────────────────────────────────────────

  private _renderPersonTab() {
    return html`
      <div class="row">
        <label>Person Entity</label>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.person_entity ?? ''}
          .includeDomains=${['person']}
          @value-changed=${(e: CustomEvent) => this._set({ person_entity: e.detail.value })}
        ></ha-entity-picker>
      </div>
      <div class="row">
        <label>Display Name (optional)</label>
        <ha-textfield
          .value=${this._config.name ?? ''}
          placeholder="Leave blank to use entity name"
          @input=${(e: InputEvent) => this._set({ name: (e.target as HTMLInputElement).value || undefined })}
        ></ha-textfield>
      </div>
      <div class="row">
        <label>Photo URL (optional — overrides entity photo)</label>
        <ha-textfield
          .value=${this._config.photo ?? ''}
          placeholder="https://..."
          @input=${(e: InputEvent) => this._set({ photo: (e.target as HTMLInputElement).value || undefined })}
        ></ha-textfield>
      </div>
    `;
  }

  // ── Tab: Devices ─────────────────────────────────────────────────────────────

  private _renderDevicesTab() {
    const devices = this._config.devices ?? [];
    return html`
      ${devices.map((device, i) => html`
        <div class="device-row">
          <ha-entity-picker
            .hass=${this.hass}
            .value=${device.entity}
            label="Entity"
            @value-changed=${(e: CustomEvent) => this._updateDevice(i, { entity: e.detail.value })}
          ></ha-entity-picker>
          <ha-textfield
            .value=${device.name ?? ''}
            label="Name"
            @input=${(e: InputEvent) => this._updateDevice(i, { name: (e.target as HTMLInputElement).value || undefined })}
          ></ha-textfield>
          <ha-icon-picker
            .value=${device.icon ?? ''}
            label="Icon"
            @value-changed=${(e: CustomEvent) => this._updateDevice(i, { icon: e.detail.value || undefined })}
          ></ha-icon-picker>
          <button class="delete-btn" @click=${() => this._removeDevice(i)}>
            <ha-icon icon="mdi:delete"></ha-icon>
          </button>
        </div>
        <div class="device-row" style="opacity:0.7;font-size:0.78rem;">
          <ha-entity-picker
            .hass=${this.hass}
            .value=${device.battery_entity ?? ''}
            label="Battery entity (optional)"
            @value-changed=${(e: CustomEvent) => this._updateDevice(i, { battery_entity: e.detail.value || undefined })}
          ></ha-entity-picker>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${device.connectivity_entity ?? ''}
            label="Connectivity entity (optional)"
            @value-changed=${(e: CustomEvent) => this._updateDevice(i, { connectivity_entity: e.detail.value || undefined })}
          ></ha-entity-picker>
        </div>
      `)}
      <button class="add-btn" @click=${this._addDevice}>
        <ha-icon icon="mdi:plus-circle"></ha-icon> Add Device
      </button>
    `;
  }

  private _updateDevice(index: number, patch: Partial<DeviceConfig>) {
    const devices = [...(this._config.devices ?? [])];
    devices[index] = { ...devices[index], ...patch };
    this._set({ devices });
  }

  private _removeDevice(index: number) {
    const devices = [...(this._config.devices ?? [])];
    devices.splice(index, 1);
    this._set({ devices });
  }

  private _addDevice() {
    const devices = [...(this._config.devices ?? []), { entity: '' }];
    this._set({ devices });
  }

  // ── Tab: Appearance ───────────────────────────────────────────────────────────

  private _renderAppearanceTab() {
    const zoneStyles = this._config.zone_styles ?? [];
    return html`
      <div class="row">
        <label>Card Size</label>
        <div class="segment-control">
          ${(['auto', 'small', 'medium', 'large'] as const).map(s => html`
            <button class="segment-btn ${this._config.size === s ? 'active' : ''}"
              @click=${() => this._set({ size: s })}>
              ${s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          `)}
        </div>
      </div>
      <div class="row">
        <label>Background Image URL (optional)</label>
        <ha-textfield
          .value=${this._config.background_image ?? ''}
          placeholder="https://..."
          @input=${(e: InputEvent) => this._set({ background_image: (e.target as HTMLInputElement).value || undefined })}
        ></ha-textfield>
      </div>
      <div class="row">
        <label>Zone Styles</label>
        ${zoneStyles.map((zs, i) => html`
          <div class="zone-row">
            <ha-textfield
              .value=${zs.zone}
              label="Zone name"
              @input=${(e: InputEvent) => this._updateZoneStyle(i, { zone: (e.target as HTMLInputElement).value })}
            ></ha-textfield>
            <ha-textfield
              .value=${zs.label ?? ''}
              label="Display label"
              @input=${(e: InputEvent) => this._updateZoneStyle(i, { label: (e.target as HTMLInputElement).value || undefined })}
            ></ha-textfield>
            <ha-icon-picker
              .value=${zs.icon ?? ''}
              label="Icon"
              @value-changed=${(e: CustomEvent) => this._updateZoneStyle(i, { icon: e.detail.value || undefined })}
            ></ha-icon-picker>
            <div class="color-row">
              <label style="font-size:0.75rem">BG</label>
              <input type="color" .value=${zs.background_color ?? '#1c1c2e'}
                @input=${(e: InputEvent) => this._updateZoneStyle(i, { background_color: (e.target as HTMLInputElement).value })} />
            </div>
            <div class="color-row">
              <label style="font-size:0.75rem">Border</label>
              <input type="color" .value=${zs.border_color ?? '#ffffff'}
                @input=${(e: InputEvent) => this._updateZoneStyle(i, { border_color: (e.target as HTMLInputElement).value })} />
            </div>
            <button class="delete-btn" @click=${() => this._removeZoneStyle(i)}>
              <ha-icon icon="mdi:delete"></ha-icon>
            </button>
          </div>
        `)}
        <button class="add-btn" @click=${this._addZoneStyle}>
          <ha-icon icon="mdi:plus-circle"></ha-icon> Add Zone Style
        </button>
      </div>
    `;
  }

  private _updateZoneStyle(index: number, patch: Partial<ZoneStyleConfig>) {
    const zoneStyles = [...(this._config.zone_styles ?? [])];
    zoneStyles[index] = { ...zoneStyles[index], ...patch };
    this._set({ zone_styles: zoneStyles });
  }

  private _removeZoneStyle(index: number) {
    const zoneStyles = [...(this._config.zone_styles ?? [])];
    zoneStyles.splice(index, 1);
    this._set({ zone_styles: zoneStyles });
  }

  private _addZoneStyle() {
    const zoneStyles = [...(this._config.zone_styles ?? []), { zone: '' }];
    this._set({ zone_styles: zoneStyles });
  }

  // ── Tab: Conditions ───────────────────────────────────────────────────────────

  private _renderConditionsTab() {
    const rules = this._config.conditions ?? [];
    return html`
      <p style="font-size:0.8rem;color:var(--secondary-text-color);margin:0 0 12px">
        Rules are evaluated top-to-bottom. The last matching rule wins.
      </p>
      ${rules.map((rule, ri) => this._renderRule(rule, ri))}
      <button class="add-btn" @click=${this._addRule}>
        <ha-icon icon="mdi:plus-circle"></ha-icon> Add Rule
      </button>
    `;
  }

  private _renderRule(rule: ConditionRule, ri: number) {
    return html`
      <div class="rule-block">
        <div class="rule-header">
          <ha-textfield
            .value=${rule.label ?? ''}
            label="Rule label"
            style="flex:1"
            @input=${(e: InputEvent) => this._updateRule(ri, { label: (e.target as HTMLInputElement).value || undefined })}
          ></ha-textfield>
          <div class="segment-control">
            <button class="segment-btn ${rule.operator === 'and' ? 'active' : ''}"
              @click=${() => this._updateRule(ri, { operator: 'and' })}>AND</button>
            <button class="segment-btn ${rule.operator === 'or' ? 'active' : ''}"
              @click=${() => this._updateRule(ri, { operator: 'or' })}>OR</button>
          </div>
          <button class="delete-btn" @click=${() => this._removeRule(ri)}>
            <ha-icon icon="mdi:delete"></ha-icon>
          </button>
        </div>

        ${rule.conditions.map((cond, ci) => html`
          <div class="condition-row">
            <ha-entity-picker .hass=${this.hass} .value=${cond.entity} label="Entity"
              @value-changed=${(e: CustomEvent) => this._updateCondition(ri, ci, { entity: e.detail.value })}
            ></ha-entity-picker>
            <ha-textfield .value=${cond.attribute ?? ''} label="Attribute (opt.)"
              @input=${(e: InputEvent) => this._updateCondition(ri, ci, { attribute: (e.target as HTMLInputElement).value || undefined })}
            ></ha-textfield>
            <select @change=${(e: Event) => this._updateCondition(ri, ci, { operator: (e.target as HTMLSelectElement).value as Condition['operator'] })}
              style="padding:6px;border-radius:6px;border:1px solid var(--divider-color)">
              ${(['eq','neq','lt','gt','lte','gte','contains'] as Condition['operator'][]).map(op => html`
                <option value=${op} ?selected=${cond.operator === op}>${op}</option>
              `)}
            </select>
            <ha-textfield .value=${String(cond.value)} label="Value"
              @input=${(e: InputEvent) => this._updateCondition(ri, ci, { value: (e.target as HTMLInputElement).value })}
            ></ha-textfield>
            <button class="delete-btn" @click=${() => this._removeCondition(ri, ci)}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
        `)}
        <button class="add-btn" @click=${() => this._addCondition(ri)}>
          <ha-icon icon="mdi:plus"></ha-icon> Add Condition
        </button>

        <div style="margin-top:10px;font-size:0.8rem;font-weight:600;color:var(--secondary-text-color)">Effect</div>
        <div class="condition-row" style="flex-wrap:wrap;gap:6px">
          <div class="color-row"><label>Background</label>
            <input type="color" .value=${rule.effect.background_color ?? '#1c1c2e'}
              @input=${(e: InputEvent) => this._updateEffect(ri, { background_color: (e.target as HTMLInputElement).value })} />
          </div>
          <div class="color-row"><label>Border</label>
            <input type="color" .value=${rule.effect.border_color ?? '#ffffff'}
              @input=${(e: InputEvent) => this._updateEffect(ri, { border_color: (e.target as HTMLInputElement).value })} />
          </div>
          <ha-textfield .value=${String(rule.effect.border_width ?? '')} label="Border width (px)"
            type="number" style="width:120px"
            @input=${(e: InputEvent) => this._updateEffect(ri, { border_width: parseInt((e.target as HTMLInputElement).value) || undefined })}
          ></ha-textfield>
          <div class="color-row"><label>Badge color</label>
            <input type="color" .value=${rule.effect.badge_color ?? '#f44336'}
              @input=${(e: InputEvent) => this._updateEffect(ri, { badge_color: (e.target as HTMLInputElement).value })} />
          </div>
          <ha-icon-picker .value=${rule.effect.badge_icon ?? ''} label="Badge icon"
            @value-changed=${(e: CustomEvent) => this._updateEffect(ri, { badge_icon: e.detail.value || undefined })}
          ></ha-icon-picker>
        </div>
      </div>
    `;
  }

  private _updateRule(index: number, patch: Partial<ConditionRule>) {
    const conditions = [...(this._config.conditions ?? [])];
    conditions[index] = { ...conditions[index], ...patch };
    this._set({ conditions });
  }

  private _removeRule(index: number) {
    const conditions = [...(this._config.conditions ?? [])];
    conditions.splice(index, 1);
    this._set({ conditions });
  }

  private _addRule() {
    const newRule: ConditionRule = {
      id: crypto.randomUUID(),
      operator: 'and',
      conditions: [{ entity: '', operator: 'eq', value: '' }],
      effect: {},
    };
    this._set({ conditions: [...(this._config.conditions ?? []), newRule] });
  }

  private _updateCondition(ruleIndex: number, condIndex: number, patch: Partial<Condition>) {
    const rules = [...(this._config.conditions ?? [])];
    const conditions = [...rules[ruleIndex].conditions];
    conditions[condIndex] = { ...conditions[condIndex], ...patch };
    rules[ruleIndex] = { ...rules[ruleIndex], conditions };
    this._set({ conditions: rules });
  }

  private _removeCondition(ruleIndex: number, condIndex: number) {
    const rules = [...(this._config.conditions ?? [])];
    const conditions = [...rules[ruleIndex].conditions];
    conditions.splice(condIndex, 1);
    rules[ruleIndex] = { ...rules[ruleIndex], conditions };
    this._set({ conditions: rules });
  }

  private _addCondition(ruleIndex: number) {
    const rules = [...(this._config.conditions ?? [])];
    rules[ruleIndex] = {
      ...rules[ruleIndex],
      conditions: [...rules[ruleIndex].conditions, { entity: '', operator: 'eq', value: '' }],
    };
    this._set({ conditions: rules });
  }

  private _updateEffect(ruleIndex: number, patch: Partial<StyleEffect>) {
    const rules = [...(this._config.conditions ?? [])];
    rules[ruleIndex] = { ...rules[ruleIndex], effect: { ...rules[ruleIndex].effect, ...patch } };
    this._set({ conditions: rules });
  }

  // ── Tab: Display ─────────────────────────────────────────────────────────────

  private _renderDisplayTab() {
    return html`
      <div class="row">
        <ha-formfield label="Show ETA when away">
          <ha-switch
            .checked=${this._config.show_eta !== false}
            @change=${(e: Event) => this._set({ show_eta: (e.target as HTMLInputElement).checked })}
          ></ha-switch>
        </ha-formfield>
      </div>
      <div class="row">
        <label>ETA Travel Time Sensor (optional)</label>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.devices?.find(d => d.name === '__eta__')?.entity ?? ''}
          .includeDomains=${['sensor']}
          label="Travel time sensor"
          @value-changed=${(e: CustomEvent) => {
            // Store ETA entity as a special device entry with name '__eta__'
            const devices = (this._config.devices ?? []).filter(d => d.name !== '__eta__');
            if (e.detail.value) devices.push({ entity: e.detail.value, name: '__eta__' });
            this._set({ devices });
          }}
        ></ha-entity-picker>
      </div>
      <div class="row">
        <ha-formfield label="Show last seen">
          <ha-switch
            .checked=${this._config.show_last_seen !== false}
            @change=${(e: Event) => this._set({ show_last_seen: (e.target as HTMLInputElement).checked })}
          ></ha-switch>
        </ha-formfield>
      </div>
      <div class="row">
        <ha-formfield label="Show notification badge">
          <ha-switch
            .checked=${this._config.show_notification_badge !== false}
            @change=${(e: Event) => this._set({ show_notification_badge: (e.target as HTMLInputElement).checked })}
          ></ha-switch>
        </ha-formfield>
      </div>
    `;
  }

  render() {
    if (!this._config) return html``;

    const tabs: Array<{ key: typeof this._activeTab; label: string }> = [
      { key: 'person', label: 'Person' },
      { key: 'devices', label: 'Devices' },
      { key: 'appearance', label: 'Appearance' },
      { key: 'conditions', label: 'Conditions' },
      { key: 'display', label: 'Display' },
    ];

    return html`
      <div class="tabs">
        ${tabs.map(t => html`
          <div class="tab ${this._activeTab === t.key ? 'active' : ''}"
            @click=${() => { this._activeTab = t.key; }}>
            ${t.label}
          </div>
        `)}
      </div>
      ${this._activeTab === 'person'      ? this._renderPersonTab()     : ''}
      ${this._activeTab === 'devices'     ? this._renderDevicesTab()    : ''}
      ${this._activeTab === 'appearance'  ? this._renderAppearanceTab() : ''}
      ${this._activeTab === 'conditions'  ? this._renderConditionsTab() : ''}
      ${this._activeTab === 'display'     ? this._renderDisplayTab()    : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'person-card-editor': PersonCardEditor;
  }
}
```

- [ ] **Step 2: Fix ETA lookup in person-card.ts**

The main card's ETA lookup uses a `__eta__` sentinel device name. Update the ETA section in `src/person-card.ts` render method:

Find this block:
```typescript
${this._config.show_eta ? html`
  <person-card-eta-display
    .hass=${this.hass}
    .etaEntity=${this._config.devices?.find(d => d.entity.includes('travel'))?.entity ?? ''}
    .personZone=${this._personZone}
  ></person-card-eta-display>
` : ''}
```

Replace with:
```typescript
${this._config.show_eta ? html`
  <person-card-eta-display
    .hass=${this.hass}
    .etaEntity=${this._config.devices?.find(d => d.name === '__eta__')?.entity ?? ''}
    .personZone=${this._personZone}
  ></person-card-eta-display>
` : ''}
```

- [ ] **Step 3: Import editor in person-card.ts**

Add this import at the top of `src/person-card.ts` (after the other component imports):

```typescript
import './person-card-editor';
```

- [ ] **Step 4: Verify it compiles**

Run: `npx tsc --noEmit`

Expected: No errors.

- [ ] **Step 5: Build**

Run: `npm run build`

Expected: `dist/person-card.js` built with no errors.

- [ ] **Step 6: Run all tests**

Run: `npm test`

Expected: All tests PASS.

- [ ] **Step 7: Commit**

```bash
git add src/person-card-editor.ts src/person-card.ts
git commit -m "feat: tabbed GUI editor with all 5 tabs"
```

---

## Task 13: HACS Metadata & GitHub Actions Release

**Files:**
- Create: `hacs.json`
- Create: `info.md`
- Create: `.github/workflows/release.yml`

- [ ] **Step 1: Create `hacs.json`**

```json
{
  "name": "Person Card",
  "render_readme": true,
  "homeassistant": "2023.9.0"
}
```

- [ ] **Step 2: Create `info.md`**

```markdown
# Person Card

A bold, at-a-glance status card for a person in Home Assistant.

**Features:**
- Location zone display with custom icons and labels
- Per-device battery bars and connectivity indicators
- ETA display when the person is travelling
- Last seen timestamp
- Full condition rule builder — change card colours and badge based on any HA entity state
- Tabbed GUI editor — no YAML required
- Adaptive sizing: works from phone to wall display

**Requirements:** Home Assistant 2023.9+
```

- [ ] **Step 3: Create `.github/workflows/release.yml`**

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          files: dist/person-card.js
          generate_release_notes: true
```

- [ ] **Step 4: Final build and test**

Run: `npm test && npm run build`

Expected: All tests pass, `dist/person-card.js` created.

- [ ] **Step 5: Commit**

```bash
git add hacs.json info.md .github/workflows/release.yml
git commit -m "chore: HACS metadata and GitHub Actions release workflow"
```

- [ ] **Step 6: Tag v0.1.0**

```bash
git tag v0.1.0
```

Do NOT push the tag until you have tested the card in a real HA dev environment (see Task 14).

---

## Task 14: HA Dev Server Smoke Test

This task verifies the card loads and renders correctly in a real Home Assistant dev environment before publishing.

- [ ] **Step 1: Copy built file to HA www folder**

```bash
cp dist/person-card.js /path/to/your/ha/config/www/person-card.js
```

(Adjust path to match your HA config directory.)

- [ ] **Step 2: Add resource to HA**

In Home Assistant: Settings → Dashboards → Resources → Add Resource:
- URL: `/local/person-card.js`
- Type: JavaScript module

- [ ] **Step 3: Add card to a dashboard**

Add a manual card with this YAML:
```yaml
type: custom:person-card
person_entity: person.YOUR_PERSON
devices:
  - entity: device_tracker.YOUR_PHONE
    name: Phone
    icon: mdi:cellphone
size: auto
show_eta: false
show_last_seen: true
show_notification_badge: true
zone_styles:
  - zone: home
    background_color: "#1a3a1a"
    border_color: "#4caf50"
  - zone: not_home
    background_color: "#3a1a1a"
    border_color: "#f44336"
```

- [ ] **Step 4: Verify each size tier**

Resize the card column or use the size config to verify:
- `small`: only avatar + name + zone + badge visible
- `medium`: devices shown
- `large`: footer with last seen visible

- [ ] **Step 5: Verify the GUI editor**

Click the pencil icon on the card → verify all 5 tabs open and save correctly.

- [ ] **Step 6: Push tag to trigger release**

```bash
git push origin main
git push origin v0.1.0
```

Expected: GitHub Actions builds and attaches `person-card.js` to a v0.1.0 release.
