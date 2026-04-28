# Family Grid Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a new `family-grid-card` custom element that shows family members as an animated grid of glowing avatar tiles — large, configurable, readable from across a room.

**Architecture:** Three new source files (`family-grid-card.ts`, `family-grid-styles.ts`, `family-grid-card-editor.ts`) plus one new shared utility file and test file. Pure reuse of existing shared utilities (`zone-utils`, `theme-registry`). New build entry point `dist/family-grid-card.js`.

**Tech Stack:** Lit 3 + TypeScript, esbuild, vitest, custom-card-helpers, Home Assistant Lovelace card conventions.

---

## File Structure

```
src/
  family-grid-card.ts          ← CREATE: main Lit element + rendering
  family-grid-styles.ts        ← CREATE: all CSS (ring animations, grid layout)
  family-grid-card-editor.ts   ← CREATE: visual config editor
  shared/
    types.ts                   ← MODIFY: add FamilyGridCardConfig interface
    family-grid-utils.ts       ← CREATE: 3 pure helper functions (testable)
esbuild.config.mjs             ← MODIFY: add new entry point
.github/workflows/release.yml  ← MODIFY: add dist/family-grid-card.js to release assets
tests/
  shared/
    family-grid-card.test.ts   ← CREATE: tests for the 3 helper functions
dist/
  family-grid-card.js          ← BUILT: committed to git after build
```

---

## Task 1: Type definition + helper utilities + tests

**Files:**
- Modify: `src/shared/types.ts`
- Create: `src/shared/family-grid-utils.ts`
- Create: `tests/shared/family-grid-card.test.ts`

### Context

The project uses vitest. Run tests with `npm test`. All tests live under `tests/shared/`. Types are in `src/shared/types.ts`.

The `FamilyPersonConfig` type (already in `types.ts`) is reused as-is — the grid card uses only `entity` and `name` from it.

Ring sizes by column count (from spec):
| columns | ring px | avatar px |
|---------|---------|-----------|
| 1       | 110     | 98        |
| 2       | 90      | 78        |
| 3       | 70      | 58        |
| 4       | 58      | 46        |
| 5       | 50      | 38        |
| 6       | 42      | 30        |

Avatar size = ring size − 12. Font size for initials = `Math.round(avatarSize * 0.35)`.

- [ ] **Step 1: Write the failing tests**

Create `tests/shared/family-grid-card.test.ts`:

```typescript
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
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
npm test
```

Expected: FAIL — `Cannot find module '../../src/shared/family-grid-utils'`

- [ ] **Step 3: Add `FamilyGridCardConfig` to `src/shared/types.ts`**

Append to the end of `src/shared/types.ts`:

```typescript
export interface FamilyGridCardConfig {
  title?: string;                    // Optional header label. Omit to hide header entirely.
  columns?: number;                  // Grid columns 1–6. Default: 3.
  people?: FamilyPersonConfig[];     // People to display. Reuses existing type.
  zone_styles?: ZoneStyleConfig[];   // Per-zone colour/icon/label overrides (falls back to Theme Card).
}
```

- [ ] **Step 4: Create `src/shared/family-grid-utils.ts`**

```typescript
// src/shared/family-grid-utils.ts
import type { FamilyPersonConfig, HassLike } from './types';

const RING_SIZES: Record<number, number> = {
  1: 110, 2: 90, 3: 70, 4: 58, 5: 50, 6: 42,
};

/** Returns ring diameter in px for the given column count, clamped to 1–6. */
export function getRingSize(columns: number): number {
  const clamped = Math.min(6, Math.max(1, Math.round(columns)));
  return RING_SIZES[clamped] ?? 70;
}

/**
 * Returns a single uppercase initial.
 * Uses the first non-empty character of name; falls back to the
 * part of entityId after the first dot (or the whole id if no dot).
 */
export function getInitials(name: string | undefined, entityId: string): string {
  const trimmed = name?.trim();
  if (trimmed) return trimmed[0].toUpperCase();
  const id = entityId.includes('.') ? entityId.split('.')[1] : entityId;
  return (id?.[0] ?? '?').toUpperCase();
}

/**
 * Counts how many people are currently home vs away.
 * Home = zone state exactly equals 'home'. Everything else counts as away.
 */
export function countSummary(
  people: Pick<FamilyPersonConfig, 'entity'>[],
  hass: HassLike,
): { home: number; away: number } {
  let home = 0;
  let away = 0;
  for (const p of people) {
    const zone = hass.states[p.entity]?.state ?? 'unknown';
    if (zone === 'home') home++;
    else away++;
  }
  return { home, away };
}
```

- [ ] **Step 5: Run tests — verify they pass**

```bash
npm test
```

Expected: all tests pass including the 9 new ones (total should be 100).

- [ ] **Step 6: Commit**

```bash
git add src/shared/types.ts src/shared/family-grid-utils.ts tests/shared/family-grid-card.test.ts
git commit -m "feat: add FamilyGridCardConfig type and family-grid-utils helpers"
```

---

## Task 2: CSS (`src/family-grid-styles.ts`)

**Files:**
- Create: `src/family-grid-styles.ts`

### Context

All visual styles for the grid card live here. The card uses CSS custom properties set inline on elements at render time:

**On `.person-grid`** (same for all tiles in the card):
- `--fgc-cols` — grid column count (e.g. `3`)
- `--fgc-ring-size` — ring diameter (e.g. `70px`)
- `--fgc-avatar-size` — avatar diameter = ring size − 12px (e.g. `58px`)
- `--fgc-initial-size` — initials font size = Math.round(avatarSize × 0.35) (e.g. `20px`)

**On each `.tile`** (varies per person based on their zone):
- `--ring-color` — hex or rgba ring/glow/badge text colour (e.g. `#4caf50`)
- `--ring-glow` — rgba version at 0.3 opacity for softer outer glow
- `--ring-bg` — rgba version at 0.2 opacity for initials circle background
- `--ring-bg-badge` — rgba at 0.18 opacity for badge pill background
- `--ring-border-badge` — rgba at 0.4 opacity for badge pill border
- `--fgc-speed` — animation duration: `3s` for home, `1.8s` for all other zones

Two CSS animations (prefixed `fgc-` to avoid collisions with other cards):
- `fgc-breathe` — box-shadow pulses on `::before` (the main ring)
- `fgc-ripple` — `::after` pseudo-element expands outward and fades

- [ ] **Step 1: Create `src/family-grid-styles.ts`**

```typescript
// src/family-grid-styles.ts
import { css } from 'lit';

export const familyGridStyles = css`
  :host {
    display: block;
    font-family: var(--person-card-font-family, 'Segoe UI', system-ui, sans-serif);
    border-radius: var(--person-card-border-radius, 16px);
    overflow: hidden;
    background: var(--ha-card-background, #1c1c2e);
    color: #ffffff;
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
  }

  .card-content {
    padding: 14px;
  }

  /* ── Optional header ─────────────────────────────────────── */
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }
  .card-title {
    font-size: 0.82rem;
    font-weight: 600;
    color: rgba(255,255,255,0.5);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .card-summary {
    font-size: 0.75rem;
    color: rgba(255,255,255,0.3);
  }

  /* ── Grid ────────────────────────────────────────────────── */
  .person-grid {
    display: grid;
    grid-template-columns: repeat(var(--fgc-cols, 3), 1fr);
    gap: 12px;
  }

  /* ── Tile ────────────────────────────────────────────────── */
  .tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 12px 6px 10px;
    border-radius: 12px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.05);
  }

  /* ── Ring wrapper ────────────────────────────────────────── */
  .ring-wrap {
    position: relative;
    width: var(--fgc-ring-size, 70px);
    height: var(--fgc-ring-size, 70px);
    flex-shrink: 0;
  }

  /* Main ring: border + animated glow */
  .ring-wrap::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 4px solid var(--ring-color, rgba(255,255,255,0.25));
    box-shadow:
      0 0 10px 2px var(--ring-color, rgba(255,255,255,0.25)),
      0 0 22px 5px var(--ring-glow, rgba(255,255,255,0.1));
    z-index: 1;
    animation: fgc-breathe var(--fgc-speed, 3s) ease-in-out infinite;
  }

  /* Ripple ring: expands and fades out */
  .ring-wrap::after {
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    border: 2px solid var(--ring-color, rgba(255,255,255,0.25));
    opacity: 0;
    animation: fgc-ripple var(--fgc-speed, 3s) ease-in-out infinite;
    z-index: 0;
  }

  @keyframes fgc-breathe {
    0%, 100% {
      box-shadow:
        0 0 10px 2px var(--ring-color, rgba(255,255,255,0.25)),
        0 0 22px 5px var(--ring-glow, rgba(255,255,255,0.1));
    }
    50% {
      box-shadow:
        0 0 18px 6px var(--ring-color, rgba(255,255,255,0.25)),
        0 0 36px 12px var(--ring-glow, rgba(255,255,255,0.15));
    }
  }

  @keyframes fgc-ripple {
    0%   { opacity: 0.5; transform: scale(1); }
    100% { opacity: 0; transform: scale(1.35); }
  }

  /* ── Avatar (photo) ──────────────────────────────────────── */
  .avatar {
    width: var(--fgc-avatar-size, 58px);
    height: var(--fgc-avatar-size, 58px);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: cover;
    z-index: 2;
  }

  /* ── Avatar (initials fallback) ──────────────────────────── */
  .avatar-initials {
    width: var(--fgc-avatar-size, 58px);
    height: var(--fgc-avatar-size, 58px);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--ring-bg, #2d2d50);
    font-weight: 700;
    color: rgba(255,255,255,0.9);
    font-size: var(--fgc-initial-size, 20px);
    z-index: 2;
  }

  /* ── Tile text ───────────────────────────────────────────── */
  .tile-name {
    font-size: 0.78rem;
    font-weight: 700;
    color: rgba(255,255,255,0.9);
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  .tile-badge {
    display: flex;
    align-items: center;
    gap: 4px;
    background: var(--ring-bg-badge, rgba(255,255,255,0.06));
    border: 1px solid var(--ring-border-badge, rgba(255,255,255,0.15));
    border-radius: 20px;
    padding: 2px 8px;
    font-size: 0.6rem;
    font-weight: 600;
    color: var(--ring-color, rgba(255,255,255,0.7));
    white-space: nowrap;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tile-badge ha-icon {
    --mdc-icon-size: 11px;
    flex-shrink: 0;
  }
`;
```

- [ ] **Step 2: Commit**

```bash
git add src/family-grid-styles.ts
git commit -m "feat: add family-grid-card CSS styles"
```

---

## Task 3: Main card element (`src/family-grid-card.ts`)

**Files:**
- Create: `src/family-grid-card.ts`

### Context

**Pattern to follow:** `src/family-card.ts` — same Lit + Home Assistant conventions.

**Key decisions:**
- Does NOT call `resolvePersonConfig` (that function takes `FamilyCardConfig` which has `group_entity`; this card just uses `this._config.people ?? []` directly)
- Listens to `THEME_EVENT` on `window` so ring colours update when the Theme Card broadcasts zone style changes
- Per-tile CSS vars (`--ring-color`, `--ring-glow`, `--ring-bg`, `--ring-bg-badge`, `--ring-border-badge`, `--fgc-speed`) are set via `style` string on each tile element
- Grid CSS vars (`--fgc-cols`, `--fgc-ring-size`, `--fgc-avatar-size`, `--fgc-initial-size`) are set on the grid container

**Colour derivation per tile:**
- `borderColor` = `zoneStyle?.border_color` (hex string like `#4caf50`), or undefined if no style
- `ringColor` = `borderColor` if set, else `'rgba(255,255,255,0.25)'`
- `ringGlow` = `hexToRgba(borderColor, 0.3)` if set, else `'rgba(255,255,255,0.1)'`
- `ringBg` = `hexToRgba(borderColor, 0.2)` if set, else `'#2d2d50'`
- `ringBgBadge` = `hexToRgba(borderColor, 0.18)` if set, else `'rgba(255,255,255,0.06)'`
- `ringBorderBadge` = `hexToRgba(borderColor, 0.4)` if set, else `'rgba(255,255,255,0.15)'`
- `speed` = zone === `'home'` ? `'3s'` : `'1.8s'`

**`getZoneLabel` signature:** `getZoneLabel(zone: string, zoneStyles: ZoneStyleConfig[], address?: string): string` — pass empty string for address (grid card has no address_entity).

**`getZoneIcon` signature:** `getZoneIcon(zone: string, zoneStyles: ZoneStyleConfig[], hasAddress?: boolean): string` — pass `false` for hasAddress.

- [ ] **Step 1: Create `src/family-grid-card.ts`**

```typescript
// src/family-grid-card.ts
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { FamilyGridCardConfig, FamilyPersonConfig } from './shared/types';
import { familyGridStyles } from './family-grid-styles';
import { resolveZoneStyles, THEME_EVENT } from './shared/theme-registry';
import { resolveZoneStyle, getZoneLabel, getZoneIcon, hexToRgba } from './shared/zone-utils';
import { getRingSize, getInitials, countSummary } from './shared/family-grid-utils';
import './family-grid-card-editor';

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description: string; preview?: boolean }>;
  }
}
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: 'family-grid-card',
  name: 'Family Grid Card',
  description: 'Grid of family members with animated zone rings — readable from across a room.',
  preview: true,
});

@customElement('family-grid-card')
export class FamilyGridCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  private _config!: FamilyGridCardConfig;

  static styles = familyGridStyles;

  static getStubConfig(hass?: HomeAssistant): FamilyGridCardConfig {
    const people = hass
      ? Object.keys(hass.states)
          .filter(id => id.startsWith('person.'))
          .slice(0, 6)
          .map(entity => ({ entity }))
      : [];
    return { people, columns: 3 };
  }

  static getConfigElement(): HTMLElement {
    return document.createElement('family-grid-card-editor');
  }

  setConfig(config: FamilyGridCardConfig): void {
    this._config = { columns: 3, zone_styles: [], ...config };
  }

  getCardSize(): number { return 3; }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(THEME_EVENT, this._onThemeUpdated);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(THEME_EVENT, this._onThemeUpdated);
  }

  private _onThemeUpdated = () => { this.requestUpdate(); };

  private _zoneStyles() {
    return resolveZoneStyles(this._config.zone_styles ?? []);
  }

  private _renderTile(person: FamilyPersonConfig) {
    const zone = this.hass.states[person.entity]?.state ?? 'unknown';
    const zoneStyles = this._zoneStyles();
    const zoneStyle = resolveZoneStyle(zone, zoneStyles);
    const personState = this.hass.states[person.entity];
    const picture = personState?.attributes?.entity_picture as string | undefined;
    const friendlyName = personState?.attributes?.friendly_name as string | undefined;
    const displayName = person.name || friendlyName || person.entity;
    const initials = getInitials(person.name || friendlyName, person.entity);

    const borderColor = zoneStyle?.border_color;
    const ringColor = borderColor ?? 'rgba(255,255,255,0.25)';
    const ringGlow = borderColor ? hexToRgba(borderColor, 0.3) : 'rgba(255,255,255,0.1)';
    const ringBg = borderColor ? hexToRgba(borderColor, 0.2) : '#2d2d50';
    const ringBgBadge = borderColor ? hexToRgba(borderColor, 0.18) : 'rgba(255,255,255,0.06)';
    const ringBorderBadge = borderColor ? hexToRgba(borderColor, 0.4) : 'rgba(255,255,255,0.15)';
    const speed = zone === 'home' ? '3s' : '1.8s';

    const tileStyle = [
      `--ring-color:${ringColor}`,
      `--ring-glow:${ringGlow}`,
      `--ring-bg:${ringBg}`,
      `--ring-bg-badge:${ringBgBadge}`,
      `--ring-border-badge:${ringBorderBadge}`,
      `--fgc-speed:${speed}`,
    ].join(';');

    const label = getZoneLabel(zone, zoneStyles, '');
    const icon = getZoneIcon(zone, zoneStyles, false);

    return html`
      <div class="tile" style=${tileStyle}>
        <div class="ring-wrap">
          ${picture
            ? html`<img class="avatar" src=${picture} alt=${displayName}>`
            : html`<div class="avatar-initials">${initials}</div>`
          }
        </div>
        <div class="tile-name">${displayName}</div>
        <div class="tile-badge">
          <ha-icon .icon=${icon}></ha-icon>
          ${label}
        </div>
      </div>
    `;
  }

  render() {
    if (!this._config || !this.hass) return html``;

    const people = this._config.people ?? [];
    const cols = Math.min(6, Math.max(1, this._config.columns ?? 3));
    const ringSize = getRingSize(cols);
    const avatarSize = ringSize - 12;
    const initialSize = Math.round(avatarSize * 0.35);

    const gridStyle = [
      `--fgc-cols:${cols}`,
      `--fgc-ring-size:${ringSize}px`,
      `--fgc-avatar-size:${avatarSize}px`,
      `--fgc-initial-size:${initialSize}px`,
    ].join(';');

    const showHeader = !!this._config.title;
    const summary = showHeader ? countSummary(people, this.hass) : null;

    return html`
      <div class="card-content">
        ${showHeader ? html`
          <div class="card-header">
            <span class="card-title">${this._config.title}</span>
            <span class="card-summary">${summary!.home} home · ${summary!.away} away</span>
          </div>
        ` : ''}
        <div class="person-grid" style=${gridStyle}>
          ${people.map(p => this._renderTile(p))}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'family-grid-card': FamilyGridCard;
  }
}
```

- [ ] **Step 2: Build to verify no TypeScript errors**

```bash
npm run build 2>&1
```

Expected output ends with: `Build complete: dist/person-card.js + dist/family-card.js`

The build will NOT yet include `family-grid-card.js` — that's wired up in Task 5. This step just checks there are no TS errors by piping through esbuild's type checking. If errors appear, fix them before continuing.

- [ ] **Step 3: Run tests to confirm nothing is broken**

```bash
npm test
```

Expected: all 100 tests pass.

- [ ] **Step 4: Commit**

```bash
git add src/family-grid-card.ts
git commit -m "feat: add family-grid-card main element"
```

---

## Task 4: Editor (`src/family-grid-card-editor.ts`)

**Files:**
- Create: `src/family-grid-card-editor.ts`

### Context

**Pattern to follow:** `src/family-card-editor.ts` — same tab structure, `_fire`/`_set` pattern, same CSS classes.

The editor has **three tabs**: Display, People, Zone Styles.

- **Display tab**: title (text input), columns (number 1–6)
- **People tab**: list of entity pickers + optional name override per person; add/remove buttons
- **Zone Styles tab**: `<person-card-zone-editor>` component (already registered in `src/components/zone-editor.ts`)

The editor dispatches `config-changed` CustomEvent with `{ detail: { config } }` on every change — HA picks this up automatically.

- [ ] **Step 1: Create `src/family-grid-card-editor.ts`**

```typescript
// src/family-grid-card-editor.ts
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { FamilyGridCardConfig, FamilyPersonConfig } from './shared/types';
import './components/zone-editor';

@customElement('family-grid-card-editor')
export class FamilyGridCardEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: FamilyGridCardConfig;
  @state() private _activeTab: 'display' | 'people' | 'zones' = 'display';

  static styles = css`
    .tabs { display: flex; border-bottom: 1px solid var(--divider-color, #e0e0e0); margin-bottom: 16px; }
    .tab { padding: 8px 14px; font-size: 0.82rem; font-weight: 600; cursor: pointer;
      border-bottom: 2px solid transparent; color: var(--secondary-text-color); user-select: none; }
    .tab.active { color: var(--primary-color); border-bottom-color: var(--primary-color); }
    .row { margin-bottom: 12px; }
    .row label { display: block; font-size: 0.8rem; color: var(--secondary-text-color); margin-bottom: 4px; }
    .person-block { border: 1px solid var(--divider-color, rgba(0,0,0,0.15)); border-radius: 8px;
      padding: 8px; margin-bottom: 8px; }
    .person-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
    .person-label { font-size: 0.78rem; color: var(--secondary-text-color); }
    .add-btn { display: inline-flex; align-items: center; gap: 4px; font-size: 0.82rem; cursor: pointer;
      color: var(--primary-color); padding: 6px 0; background: none; border: none; }
    .delete-btn { cursor: pointer; color: var(--error-color, #f44336); background: none; border: none; }
    .detail-row { margin-top: 6px; }
    ha-textfield, ha-entity-picker { display: block; width: 100%; }
  `;

  setConfig(config: FamilyGridCardConfig) { this._config = config; }

  private _fire(config: FamilyGridCardConfig) {
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }));
    this._config = config;
  }

  private _set(patch: Partial<FamilyGridCardConfig>) { this._fire({ ...this._config, ...patch }); }

  private _renderDisplayTab() {
    return html`
      <div class="row">
        <label>Title (optional — shown above the grid with a home/away count)</label>
        <ha-textfield
          .value=${this._config.title ?? ''}
          placeholder="Family"
          @input=${(e: InputEvent) => {
            this._set({ title: (e.target as HTMLInputElement).value || undefined });
          }}
        ></ha-textfield>
      </div>
      <div class="row">
        <label>Columns (1–6, default 3 — tiles resize automatically)</label>
        <ha-textfield
          type="number"
          .value=${String(this._config.columns ?? 3)}
          min="1"
          max="6"
          @input=${(e: InputEvent) => {
            const v = parseInt((e.target as HTMLInputElement).value, 10);
            if (v >= 1 && v <= 6) this._set({ columns: v });
          }}
        ></ha-textfield>
      </div>
    `;
  }

  private _renderPeopleTab() {
    const people = this._config.people ?? [];
    return html`
      <div class="row">
        <label>People</label>
        ${people.map((person, i) => html`
          <div class="person-block">
            <div class="person-header">
              <span class="person-label">Person ${i + 1}</span>
              <button class="delete-btn" @click=${() => {
                const updated = [...people];
                updated.splice(i, 1);
                this._set({ people: updated });
              }}>
                <ha-icon .icon=${'mdi:delete'}></ha-icon>
              </button>
            </div>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${person.entity ?? ''}
              .includeDomains=${['person']}
              @value-changed=${(e: CustomEvent) => {
                const updated = [...people];
                updated[i] = { ...updated[i], entity: e.detail.value };
                this._set({ people: updated });
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
          </div>
        `)}
        <button class="add-btn" @click=${() => {
          this._set({ people: [...people, { entity: '' } as FamilyPersonConfig] });
        }}>
          <ha-icon .icon=${'mdi:plus-circle'}></ha-icon> Add Person
        </button>
      </div>
    `;
  }

  private _renderZonesTab() {
    return html`
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

  render() {
    if (!this._config) return html``;
    const TAB_LABELS: Record<typeof this._activeTab, string> = {
      display: 'Display', people: 'People', zones: 'Zone Styles',
    };
    return html`
      <div class="tabs">
        ${(['display', 'people', 'zones'] as const).map(t => html`
          <div class="tab ${this._activeTab === t ? 'active' : ''}"
            @click=${() => { this._activeTab = t; }}>
            ${TAB_LABELS[t]}
          </div>
        `)}
      </div>
      ${this._activeTab === 'display' ? this._renderDisplayTab() : ''}
      ${this._activeTab === 'people'  ? this._renderPeopleTab()  : ''}
      ${this._activeTab === 'zones'   ? this._renderZonesTab()   : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'family-grid-card-editor': FamilyGridCardEditor;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/family-grid-card-editor.ts
git commit -m "feat: add family-grid-card editor"
```

---

## Task 5: Wire up build + release

**Files:**
- Modify: `esbuild.config.mjs`
- Modify: `.github/workflows/release.yml`

### Context

The current `esbuild.config.mjs` builds two entry points: `src/person-card.ts` → `dist/person-card.js` and `src/family-card.ts` → `dist/family-card.js`. We need to add a third: `src/family-grid-card.ts` → `dist/family-grid-card.js`.

The current `release.yml` attaches `dist/person-card.js` and `dist/family-card.js` as release assets. Add `dist/family-grid-card.js`.

- [ ] **Step 1: Update `esbuild.config.mjs`**

Replace the entire file with:

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
  const ctx1 = await esbuild.context({ ...sharedOptions, entryPoints: ['src/person-card.ts'],      outfile: 'dist/person-card.js' });
  const ctx2 = await esbuild.context({ ...sharedOptions, entryPoints: ['src/family-card.ts'],      outfile: 'dist/family-card.js' });
  const ctx3 = await esbuild.context({ ...sharedOptions, entryPoints: ['src/family-grid-card.ts'], outfile: 'dist/family-grid-card.js' });
  await Promise.all([ctx1.watch(), ctx2.watch(), ctx3.watch()]);
  console.log('Watching for changes...');
} else {
  await Promise.all([
    esbuild.build({ ...sharedOptions, entryPoints: ['src/person-card.ts'],      outfile: 'dist/person-card.js' }),
    esbuild.build({ ...sharedOptions, entryPoints: ['src/family-card.ts'],      outfile: 'dist/family-card.js' }),
    esbuild.build({ ...sharedOptions, entryPoints: ['src/family-grid-card.ts'], outfile: 'dist/family-grid-card.js' }),
  ]);
  console.log('Build complete: dist/person-card.js + dist/family-card.js + dist/family-grid-card.js');
}
```

- [ ] **Step 2: Update `.github/workflows/release.yml`**

Replace the `files:` block under `Create GitHub Release`:

```yaml
      - name: Verify build output
        run: test -f dist/person-card.js && test -f dist/family-card.js && test -f dist/family-grid-card.js

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          files: |
            dist/person-card.js
            dist/family-card.js
            dist/family-grid-card.js
          generate_release_notes: true
```

- [ ] **Step 3: Build and verify**

```bash
npm run build
```

Expected:
```
Build complete: dist/person-card.js + dist/family-card.js + dist/family-grid-card.js
```

Verify the file exists:
```bash
ls -lh dist/family-grid-card.js
```

Expected: file present, non-zero size.

- [ ] **Step 4: Run all tests**

```bash
npm test
```

Expected: all 100 tests pass.

- [ ] **Step 5: Commit**

```bash
git add esbuild.config.mjs .github/workflows/release.yml dist/family-grid-card.js
git commit -m "feat: wire up family-grid-card build entry point and release asset"
```

---

## Task 6: Changelog, version bump, tag

**Files:**
- Modify: `CHANGELOG.md`
- Modify: `package.json`

### Context

Current version: `0.6.2`. New version: `0.7.0` (new card = minor feature bump).

- [ ] **Step 1: Update `CHANGELOG.md`**

Insert this block at the top, after the `# Changelog` header and before the `## [0.6.2]` entry:

```markdown
## [0.7.0] — 2026-04-28

### Added

- **Family Grid Card** (`family-grid-card`) — new standalone card displaying all family members as an animated grid of glowing avatar tiles:
  - Each person gets a coloured ring whose colour comes from your zone styles (same system as `family-card` and Theme Card)
  - Rings breathe slowly for people at home (3 s cycle) and pulse slightly faster for everyone else (1.8 s) — draws the eye to who's out
  - Name + colour-matched zone badge pill below each avatar
  - `columns` config (1–6, default 3) — tiles resize automatically to fill the card width
  - Optional `title` shows a header with a live "X home · Y away" summary
  - Falls back to initials when no `entity_picture` is set
  - Full visual editor with Display, People, and Zone Styles tabs
  - `dist/family-grid-card.js` — add as a separate Lovelace resource alongside `person-card.js` and `family-card.js`

```

- [ ] **Step 2: Bump version in `package.json`**

```bash
sed -i '' 's/"version": "0.6.2"/"version": "0.7.0"/' package.json
```

Verify:
```bash
node -p "require('./package.json').version"
```

Expected: `0.7.0`

- [ ] **Step 3: Final build**

```bash
npm run build
```

Expected: `Build complete: dist/person-card.js + dist/family-card.js + dist/family-grid-card.js`

- [ ] **Step 4: Run all tests**

```bash
npm test
```

Expected: all 100 tests pass.

- [ ] **Step 5: Commit, tag, push**

```bash
git add CHANGELOG.md package.json dist/person-card.js dist/family-card.js dist/family-grid-card.js
git commit -m "feat: release v0.7.0 — family-grid-card

New family-grid-card with animated zone rings, configurable grid
columns, and breathing glow effects readable from across the room.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
git tag v0.7.0
git push origin master --tags
```

---

## Self-Review

**Spec coverage:**
- ✅ New standalone card `family-grid-card` → Tasks 3–5
- ✅ `FamilyGridCardConfig` type → Task 1
- ✅ Breathing ring animation (fgc-breathe + fgc-ripple) → Task 2
- ✅ Home = 3s, away = 1.8s speed → Task 3 (`_renderTile`)
- ✅ Ring size table (1–6 columns) → Task 1 (`RING_SIZES`) + Task 3 (`getRingSize`)
- ✅ Avatar = entity_picture fallback to initials → Task 3
- ✅ Name + colour-matched zone badge → Task 3
- ✅ Optional header with title + summary → Task 3 (`render`)
- ✅ Zone colour from `resolveZoneStyle` + `hexToRgba` → Task 3
- ✅ Fallback ring colour `rgba(255,255,255,0.25)` → Task 3
- ✅ THEME_EVENT listener → Task 3
- ✅ Editor (Display, People, Zone Styles tabs) → Task 4
- ✅ Build entry point + release asset → Task 5
- ✅ Tests for `getRingSize`, `getInitials`, `countSummary` → Task 1
- ✅ Changelog + version → Task 6

**Type consistency:**
- `getRingSize` defined in Task 1, called in Task 3 ✅
- `getInitials` defined in Task 1, called in Task 3 ✅
- `countSummary` defined in Task 1, called in Task 3 ✅
- `FamilyGridCardConfig` defined in Task 1, used in Tasks 3, 4 ✅
- `familyGridStyles` defined in Task 2, imported in Task 3 ✅
- CSS vars (`--fgc-cols`, `--fgc-ring-size`, `--fgc-avatar-size`, `--fgc-initial-size`, `--ring-color`, `--ring-glow`, `--ring-bg`, `--ring-bg-badge`, `--ring-border-badge`, `--fgc-speed`) defined in Task 2, set in Task 3 ✅
