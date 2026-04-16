# Card Themes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add five optional visual themes (Glass, Sci-Fi, Steampunk, Terminal, Neon Noir) to Person Card and Family Card via a new `card_theme` config field, with zone colours from the Theme Card flowing into each theme automatically.

**Architecture:** A `CardTheme` type is added to shared types; both cards apply the value as a `card-theme` HTML attribute in `updated()`; theme CSS lives in the existing style files using `:host([card-theme="..."])` selectors; zone `border_color` feeds in via `--pc-border-color` (existing) and a new `--pc-glow-color` variable; a visual theme picker tile-grid is added to the Display tab of both editors.

**Tech Stack:** TypeScript · Lit 3 · vitest — all existing, no new dependencies.

---

## File Map

| File | Action | What changes |
|------|--------|-------------|
| `src/shared/types.ts` | Modify | Add `CardTheme` type; add `card_theme?` to `PersonCardConfig` and `FamilyCardConfig` |
| `src/shared/zone-utils.ts` | Modify | Add `hexToRgba(hex, alpha)` helper |
| `tests/shared/zone-utils.test.ts` | Modify | Tests for `hexToRgba` |
| `src/person-card.ts` | Modify | `updated()`: set `card-theme` attribute + `--pc-glow-color` |
| `src/family-card.ts` | Modify | `updated()`: set `card-theme` attribute |
| `src/styles.ts` | Modify | Five `:host([card-theme="..."])` CSS blocks for Person Card |
| `src/family-styles.ts` | Modify | Five `:host([card-theme="..."])` CSS blocks for Family Card |
| `src/person-card-editor.ts` | Modify | Theme picker in Display tab |
| `src/family-card-editor.ts` | Modify | Theme picker in Display tab |
| `CHANGELOG.md` + `package.json` | Modify | v0.6.0 entry |

---

## Task 1: `hexToRgba` helper + type additions

**Files:**
- Modify: `src/shared/types.ts`
- Modify: `src/shared/zone-utils.ts`
- Modify: `tests/shared/zone-utils.test.ts`

- [ ] **Step 1.1 — Write the failing tests for `hexToRgba`**

Add to the bottom of `tests/shared/zone-utils.test.ts`:

```typescript
import { resolveZoneStyle, getZoneLabel, getZoneIcon, hexToRgba } from '../../src/shared/zone-utils';

// ... existing tests unchanged ...

describe('hexToRgba', () => {
  it('converts 6-char hex to rgba', () => {
    expect(hexToRgba('#76c442', 0.25)).toBe('rgba(118, 196, 66, 0.25)');
  });

  it('converts 3-char hex to rgba', () => {
    expect(hexToRgba('#abc', 0.5)).toBe('rgba(170, 187, 204, 0.5)');
  });

  it('handles missing # prefix', () => {
    expect(hexToRgba('76c442', 0.25)).toBe('rgba(118, 196, 66, 0.25)');
  });

  it('returns fallback rgba(0,0,0,alpha) for invalid hex', () => {
    expect(hexToRgba('invalid', 0.25)).toBe('rgba(0, 0, 0, 0.25)');
  });

  it('alpha value is preserved exactly', () => {
    expect(hexToRgba('#ffffff', 0.1)).toBe('rgba(255, 255, 255, 0.1)');
  });
});
```

- [ ] **Step 1.2 — Run tests to confirm they fail**

```bash
cd "/Users/marksquires/Person Card" && npm test -- --reporter=verbose 2>&1 | tail -20
```

Expected: FAIL — `hexToRgba is not a function` or similar.

- [ ] **Step 1.3 — Add `CardTheme` type and `card_theme` fields to `src/shared/types.ts`**

Add after the `ThemeCardDisplayStyle` line (line 82):

```typescript
export type CardTheme = 'default' | 'glass' | 'scifi' | 'steampunk' | 'terminal' | 'neon';
```

Add `card_theme?: CardTheme;` to `PersonCardConfig` after `offline_threshold`:

```typescript
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
  card_theme?: CardTheme;
}
```

Add `card_theme?: CardTheme;` to `FamilyCardConfig` after `background_image`:

```typescript
export interface FamilyCardConfig {
  people?: FamilyPersonConfig[];
  group_entity?: string;
  density?: FamilyCardDensity;
  group_by_zone?: boolean;
  show_summary?: boolean;
  show_devices?: boolean;
  show_last_seen?: boolean;
  show_eta?: boolean;
  show_notification_badge?: boolean;
  offline_threshold?: number;
  zone_styles?: ZoneStyleConfig[];
  conditions?: ConditionRule[];
  background_image?: string;
  card_theme?: CardTheme;
}
```

- [ ] **Step 1.4 — Add `hexToRgba` to `src/shared/zone-utils.ts`**

Append to the bottom of `src/shared/zone-utils.ts`:

```typescript
/**
 * Convert a CSS hex colour string to an rgba() string with the given alpha.
 * Handles 3-char and 6-char hex, with or without leading #.
 * Falls back to rgba(0,0,0,alpha) for invalid input.
 */
export function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3
    ? h.split('').map(c => c + c).join('')
    : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return `rgba(0, 0, 0, ${alpha})`;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
```

- [ ] **Step 1.5 — Run tests to confirm they pass**

```bash
cd "/Users/marksquires/Person Card" && npm test -- --reporter=verbose 2>&1 | tail -20
```

Expected: All tests PASS including the 5 new `hexToRgba` tests.

- [ ] **Step 1.6 — Commit**

```bash
cd "/Users/marksquires/Person Card" && git add src/shared/types.ts src/shared/zone-utils.ts tests/shared/zone-utils.test.ts && git commit -m "feat: add CardTheme type and hexToRgba helper"
```

---

## Task 2: Wire `card-theme` attribute + `--pc-glow-color` in Person Card

**Files:**
- Modify: `src/person-card.ts`

- [ ] **Step 2.1 — Add `hexToRgba` import to `src/person-card.ts`**

Find the line:
```typescript
import { resolveZoneStyle, getZoneIcon } from './shared/zone-utils';
```
Wait — person-card.ts does not currently import from zone-utils directly. Find the zone-utils import or add one. Look for the resolveZoneStyles import:

```typescript
import { resolveZoneStyles, THEME_EVENT } from './shared/theme-registry';
```

Add a new import line after it:

```typescript
import { hexToRgba } from './shared/zone-utils';
```

- [ ] **Step 2.2 — Update `updated()` in `src/person-card.ts`**

Find the `updated()` method. The current closing section handles `border_color` and `background_image`. Add the two new blocks **after** the `borderColor` block and **before** the `background_image` block:

```typescript
  protected updated(): void {
    if (!this._config || !this.hass) return;

    const effect: StyleEffect = this._config.conditions?.length
      ? evaluateConditions(this._config.conditions, this.hass)
      : {};
    const zoneStyle = resolveZoneStyles(this._config.zone_styles ?? []).find(s => s.zone === this._personZone);

    const bg = effect.background_color ?? zoneStyle?.background_color;
    if (bg) this.style.setProperty('--pc-background', bg);
    else this.style.removeProperty('--pc-background');

    const borderColor = effect.border_color ?? zoneStyle?.border_color;
    if (borderColor) {
      this.style.setProperty('--pc-border-color', borderColor);
      this.style.setProperty('--pc-border-width', `${effect.border_width ?? 2}px`);
      this.style.setProperty('--pc-glow-color', hexToRgba(borderColor, 0.25));
    } else {
      this.style.removeProperty('--pc-border-color');
      this.style.removeProperty('--pc-border-width');
      this.style.removeProperty('--pc-glow-color');
    }

    // Apply card theme as HTML attribute so :host([card-theme="..."]) CSS selectors fire
    this.setAttribute('card-theme', this._config.card_theme ?? 'default');

    if (this._config.background_image) {
      this.style.setProperty('--pc-background-image', `url('${this._config.background_image}')`);
    } else {
      this.style.removeProperty('--pc-background-image');
    }
  }
```

- [ ] **Step 2.3 — Run build to confirm no TypeScript errors**

```bash
cd "/Users/marksquires/Person Card" && npm run build 2>&1 | tail -8
```

Expected: `Build complete: dist/person-card.js + dist/family-card.js`

- [ ] **Step 2.4 — Commit**

```bash
cd "/Users/marksquires/Person Card" && git add src/person-card.ts && git commit -m "feat: person-card sets card-theme attribute and --pc-glow-color in updated()"
```

---

## Task 3: Wire `card-theme` attribute in Family Card

**Files:**
- Modify: `src/family-card.ts`

- [ ] **Step 3.1 — Update `updated()` in `src/family-card.ts`**

Find the `updated()` method (currently lines 84–104). Add the `card-theme` attribute setter at the end of the method, after the `background_image` block:

```typescript
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
    // Apply card theme as HTML attribute so :host([card-theme="..."]) CSS selectors fire
    this.setAttribute('card-theme', this._config.card_theme ?? 'default');
  }
```

- [ ] **Step 3.2 — Run build to confirm no TypeScript errors**

```bash
cd "/Users/marksquires/Person Card" && npm run build 2>&1 | tail -8
```

Expected: `Build complete: dist/person-card.js + dist/family-card.js`

- [ ] **Step 3.3 — Commit**

```bash
cd "/Users/marksquires/Person Card" && git add src/family-card.ts && git commit -m "feat: family-card sets card-theme attribute in updated()"
```

---

## Task 4: Theme CSS for Person Card (`src/styles.ts`)

**Files:**
- Modify: `src/styles.ts`

- [ ] **Step 4.1 — Append theme CSS blocks to `src/styles.ts`**

Add the following at the very end of the `css` template literal in `src/styles.ts` (before the closing backtick):

```css
  /* ══════════════════════════════════════════════════
     CARD THEMES
     All blocks follow the same pattern:
     - :host([card-theme="X"]) sets structural chrome
     - Zone colours flow in via --pc-border-color (accent)
       and --pc-glow-color (rgba version for box-shadow)
     - Signature defaults are shown when no zone matched
  ══════════════════════════════════════════════════ */

  /* ── Glass ──────────────────────────────────────── */
  :host([card-theme="glass"]) {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(24px) saturate(160%);
    -webkit-backdrop-filter: blur(24px) saturate(160%);
    border: 1px solid var(--pc-border-color, rgba(255, 255, 255, 0.22));
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.18);
    border-radius: var(--person-card-border-radius, 16px);
  }
  :host([card-theme="glass"]) .avatar {
    border-color: rgba(255, 255, 255, 0.35);
    background: rgba(255, 255, 255, 0.12);
  }
  :host([card-theme="glass"]) .avatar-placeholder {
    background: rgba(255, 255, 255, 0.12);
    border: 2px solid rgba(255, 255, 255, 0.35);
  }
  :host([card-theme="glass"]) .divider {
    background: rgba(255, 255, 255, 0.07);
  }
  :host([card-theme="glass"]) .stale-indicator {
    border-color: transparent;
    background: rgba(80, 80, 80, 0.6);
  }

  /* ── Sci-Fi ─────────────────────────────────────── */
  :host([card-theme="scifi"]) {
    background: #030f22;
    border: 1px solid var(--pc-border-color, #00c8f0);
    border-radius: 4px;
    box-shadow: 0 0 22px var(--pc-glow-color, rgba(0, 200, 240, 0.22));
    font-family: 'Courier New', 'Consolas', monospace;
  }
  :host([card-theme="scifi"]) .card-content::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.18) 2px,
      rgba(0, 0, 0, 0.18) 4px
    );
    pointer-events: none;
    z-index: 100;
    border-radius: inherit;
  }
  :host([card-theme="scifi"]) .avatar {
    border-radius: 2px;
    border-color: var(--pc-border-color, #00c8f0);
    background: #021020;
    box-shadow: 0 0 8px var(--pc-glow-color, rgba(0, 200, 240, 0.3));
  }
  :host([card-theme="scifi"]) .avatar-placeholder {
    background: #021020;
    border-radius: 2px;
    border: 1px solid var(--pc-border-color, #00c8f0);
    box-shadow: 0 0 8px var(--pc-glow-color, rgba(0, 200, 240, 0.3));
  }
  :host([card-theme="scifi"]) .name {
    color: var(--pc-border-color, #00c8f0);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-shadow: 0 0 8px var(--pc-glow-color, rgba(0, 200, 240, 0.5));
  }
  :host([card-theme="scifi"]) .divider {
    background: rgba(0, 200, 240, 0.15);
  }
  :host([card-theme="scifi"]) .footer {
    color: rgba(0, 200, 240, 0.35);
  }

  /* ── Steampunk ──────────────────────────────────── */
  :host([card-theme="steampunk"]) {
    background: linear-gradient(160deg, #1e1200 0%, #140c00 100%);
    border: 2px solid var(--pc-border-color, #a0682a);
    border-radius: 6px;
    box-shadow: 0 4px 24px rgba(160, 104, 42, 0.25), inset 0 1px 0 rgba(255, 210, 120, 0.08);
    font-family: Georgia, 'Times New Roman', serif;
  }
  :host([card-theme="steampunk"]) .avatar {
    border-color: var(--pc-border-color, #a0682a);
    background: #1a0e00;
    box-shadow: 0 0 10px var(--pc-glow-color, rgba(160, 104, 42, 0.3));
  }
  :host([card-theme="steampunk"]) .avatar-placeholder {
    background: #1a0e00;
    border: 2px solid var(--pc-border-color, #a0682a);
    box-shadow: 0 0 10px var(--pc-glow-color, rgba(160, 104, 42, 0.3));
  }
  :host([card-theme="steampunk"]) .name {
    color: #e8c070;
  }
  :host([card-theme="steampunk"]) .divider {
    background: rgba(160, 104, 42, 0.2);
  }
  :host([card-theme="steampunk"]) .footer {
    color: rgba(160, 104, 42, 0.5);
  }

  /* ── Terminal ───────────────────────────────────── */
  :host([card-theme="terminal"]) {
    background: #000;
    border: 1px solid var(--pc-border-color, #00ff41);
    border-radius: 0;
    box-shadow: 0 0 14px var(--pc-glow-color, rgba(0, 255, 65, 0.3));
    font-family: 'Courier New', 'Consolas', monospace;
  }
  :host([card-theme="terminal"]) .card-content::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.22) 2px,
      rgba(0, 0, 0, 0.22) 4px
    );
    pointer-events: none;
    z-index: 100;
  }
  :host([card-theme="terminal"]) .card-content::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 55%, rgba(0, 0, 0, 0.45) 100%);
    pointer-events: none;
    z-index: 100;
  }
  :host([card-theme="terminal"]) .avatar {
    border-radius: 0;
    border-color: var(--pc-border-color, #00ff41);
    background: #001100;
    box-shadow: 0 0 8px var(--pc-glow-color, rgba(0, 255, 65, 0.25));
  }
  :host([card-theme="terminal"]) .avatar-placeholder {
    background: #001100;
    border-radius: 0;
    border: 1px solid var(--pc-border-color, #00ff41);
    box-shadow: 0 0 8px var(--pc-glow-color, rgba(0, 255, 65, 0.25));
  }
  :host([card-theme="terminal"]) .name {
    color: var(--pc-border-color, #00ff41);
    letter-spacing: 0.08em;
    text-shadow: 0 0 6px var(--pc-glow-color, rgba(0, 255, 65, 0.5));
  }
  :host([card-theme="terminal"]) .divider {
    background: rgba(0, 255, 65, 0.12);
  }
  :host([card-theme="terminal"]) .footer {
    color: rgba(0, 255, 65, 0.35);
  }

  /* ── Neon Noir ──────────────────────────────────── */
  :host([card-theme="neon"]) {
    background: linear-gradient(160deg, #0d001f 0%, #090016 100%);
    border: 1px solid var(--pc-border-color, #c800ff);
    border-radius: 12px;
    box-shadow: 0 0 28px var(--pc-glow-color, rgba(200, 0, 255, 0.28));
  }
  :host([card-theme="neon"]) .card-content::before {
    content: '';
    position: absolute;
    top: 0;
    left: 15%;
    right: 15%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--pc-border-color, #c800ff), transparent);
    pointer-events: none;
    z-index: 2;
  }
  :host([card-theme="neon"]) .avatar {
    border-color: var(--pc-border-color, #c800ff);
    background: linear-gradient(135deg, #2d0060, #600080);
    box-shadow: 0 0 14px var(--pc-glow-color, rgba(200, 0, 255, 0.4));
  }
  :host([card-theme="neon"]) .avatar-placeholder {
    background: linear-gradient(135deg, #2d0060, #600080);
    border: 2px solid var(--pc-border-color, #c800ff);
    box-shadow: 0 0 14px var(--pc-glow-color, rgba(200, 0, 255, 0.4));
  }
  :host([card-theme="neon"]) .name {
    text-shadow: 0 0 10px var(--pc-glow-color, rgba(200, 0, 255, 0.5));
  }
  :host([card-theme="neon"]) .divider {
    background: rgba(200, 0, 255, 0.12);
  }
  :host([card-theme="neon"]) .footer {
    color: rgba(200, 0, 255, 0.4);
  }
```

- [ ] **Step 4.2 — Build and confirm no errors**

```bash
cd "/Users/marksquires/Person Card" && npm run build 2>&1 | tail -8
```

Expected: `Build complete: dist/person-card.js + dist/family-card.js`

- [ ] **Step 4.3 — Commit**

```bash
cd "/Users/marksquires/Person Card" && git add src/styles.ts && git commit -m "feat: add five visual theme CSS blocks to person card"
```

---

## Task 5: Theme CSS for Family Card (`src/family-styles.ts`)

**Files:**
- Modify: `src/family-styles.ts`

- [ ] **Step 5.1 — Append theme CSS blocks to `src/family-styles.ts`**

Add the following at the very end of the `css` template literal in `src/family-styles.ts` (before the closing backtick):

```css
  /* ══════════════════════════════════════════════════
     CARD THEMES — Family Card
     Same five themes as Person Card.
     Per-person row accents (--row-accent) are zone-driven
     inline styles and continue to work unchanged within
     each theme.
  ══════════════════════════════════════════════════ */

  /* ── Glass ──────────────────────────────────────── */
  :host([card-theme="glass"]) {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(24px) saturate(160%);
    -webkit-backdrop-filter: blur(24px) saturate(160%);
    border: 1px solid var(--pc-border-color, rgba(255, 255, 255, 0.22));
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.18);
    border-radius: var(--person-card-border-radius, 16px);
  }
  :host([card-theme="glass"]) .avatar {
    border-color: rgba(255, 255, 255, 0.35);
    background: rgba(255, 255, 255, 0.12);
  }
  :host([card-theme="glass"]) .avatar-placeholder {
    background: rgba(255, 255, 255, 0.12);
    border: 2px solid rgba(255, 255, 255, 0.35);
  }
  :host([card-theme="glass"]) .person-row {
    background: rgba(255, 255, 255, 0.06);
    border-left-color: var(--row-accent, rgba(255, 255, 255, 0.2));
  }
  :host([card-theme="glass"]) .person-row:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  :host([card-theme="glass"]) .summary-bar {
    border-bottom-color: rgba(255, 255, 255, 0.07);
  }
  :host([card-theme="glass"]) .zone-group-header {
    border-bottom-color: rgba(255, 255, 255, 0.07);
  }

  /* ── Sci-Fi ─────────────────────────────────────── */
  :host([card-theme="scifi"]) {
    background: #030f22;
    border: 1px solid var(--pc-border-color, #00c8f0);
    border-radius: 4px;
    box-shadow: 0 0 22px var(--pc-glow-color, rgba(0, 200, 240, 0.22));
    font-family: 'Courier New', 'Consolas', monospace;
  }
  :host([card-theme="scifi"]) .card-content::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.18) 2px,
      rgba(0, 0, 0, 0.18) 4px
    );
    pointer-events: none;
    z-index: 100;
  }
  :host([card-theme="scifi"]) .avatar {
    border-radius: 2px;
    border-color: var(--row-accent, #00c8f0);
    background: #021020;
  }
  :host([card-theme="scifi"]) .avatar-placeholder {
    background: #021020;
    border-radius: 2px;
    border: 1px solid var(--row-accent, #00c8f0);
  }
  :host([card-theme="scifi"]) .person-name {
    color: var(--row-accent, #00c8f0);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  :host([card-theme="scifi"]) .person-row {
    background: rgba(0, 200, 240, 0.04);
    border-radius: 2px;
  }
  :host([card-theme="scifi"]) .zone-group-header {
    border-bottom-color: rgba(0, 200, 240, 0.15);
  }
  :host([card-theme="scifi"]) .group-label {
    letter-spacing: 0.1em;
  }
  :host([card-theme="scifi"]) .summary-bar {
    border-bottom-color: rgba(0, 200, 240, 0.15);
  }

  /* ── Steampunk ──────────────────────────────────── */
  :host([card-theme="steampunk"]) {
    background: linear-gradient(160deg, #1e1200 0%, #140c00 100%);
    border: 2px solid var(--pc-border-color, #a0682a);
    border-radius: 6px;
    box-shadow: 0 4px 24px rgba(160, 104, 42, 0.25), inset 0 1px 0 rgba(255, 210, 120, 0.08);
    font-family: Georgia, 'Times New Roman', serif;
  }
  :host([card-theme="steampunk"]) .avatar {
    border-color: var(--row-accent, #a0682a);
    background: #1a0e00;
  }
  :host([card-theme="steampunk"]) .avatar-placeholder {
    background: #1a0e00;
    border: 2px solid var(--row-accent, #a0682a);
  }
  :host([card-theme="steampunk"]) .person-name {
    color: #e8c070;
  }
  :host([card-theme="steampunk"]) .person-row {
    background: rgba(160, 104, 42, 0.06);
    border-radius: 3px;
  }
  :host([card-theme="steampunk"]) .zone-group-header {
    border-bottom-color: rgba(160, 104, 42, 0.25);
  }
  :host([card-theme="steampunk"]) .group-label {
    color: rgba(232, 192, 112, 0.5);
  }
  :host([card-theme="steampunk"]) .summary-bar {
    border-bottom-color: rgba(160, 104, 42, 0.2);
  }

  /* ── Terminal ───────────────────────────────────── */
  :host([card-theme="terminal"]) {
    background: #000;
    border: 1px solid var(--pc-border-color, #00ff41);
    border-radius: 0;
    box-shadow: 0 0 14px var(--pc-glow-color, rgba(0, 255, 65, 0.3));
    font-family: 'Courier New', 'Consolas', monospace;
  }
  :host([card-theme="terminal"]) .card-content::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.22) 2px,
      rgba(0, 0, 0, 0.22) 4px
    );
    pointer-events: none;
    z-index: 100;
  }
  :host([card-theme="terminal"]) .avatar {
    border-radius: 0;
    border-color: var(--row-accent, #00ff41);
    background: #001100;
  }
  :host([card-theme="terminal"]) .avatar-placeholder {
    background: #001100;
    border-radius: 0;
    border: 1px solid var(--row-accent, #00ff41);
  }
  :host([card-theme="terminal"]) .person-name {
    color: var(--row-accent, #00ff41);
    letter-spacing: 0.08em;
  }
  :host([card-theme="terminal"]) .person-row {
    background: rgba(0, 255, 65, 0.03);
    border-radius: 0;
  }
  :host([card-theme="terminal"]) .zone-group-header {
    border-bottom-color: rgba(0, 255, 65, 0.15);
  }
  :host([card-theme="terminal"]) .group-label {
    color: rgba(0, 255, 65, 0.4);
    letter-spacing: 0.1em;
  }
  :host([card-theme="terminal"]) .summary-bar {
    border-bottom-color: rgba(0, 255, 65, 0.15);
  }

  /* ── Neon Noir ──────────────────────────────────── */
  :host([card-theme="neon"]) {
    background: linear-gradient(160deg, #0d001f 0%, #090016 100%);
    border: 1px solid var(--pc-border-color, #c800ff);
    border-radius: 12px;
    box-shadow: 0 0 28px var(--pc-glow-color, rgba(200, 0, 255, 0.28));
  }
  :host([card-theme="neon"]) .card-content::before {
    content: '';
    position: absolute;
    top: 0;
    left: 15%;
    right: 15%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--pc-border-color, #c800ff), transparent);
    pointer-events: none;
    z-index: 2;
  }
  :host([card-theme="neon"]) .avatar {
    border-color: var(--row-accent, #c800ff);
    background: linear-gradient(135deg, #2d0060, #600080);
    box-shadow: 0 0 10px rgba(200, 0, 255, 0.35);
  }
  :host([card-theme="neon"]) .avatar-placeholder {
    background: linear-gradient(135deg, #2d0060, #600080);
    border: 2px solid var(--row-accent, #c800ff);
    box-shadow: 0 0 10px rgba(200, 0, 255, 0.35);
  }
  :host([card-theme="neon"]) .person-row {
    background: rgba(200, 0, 255, 0.05);
  }
  :host([card-theme="neon"]) .zone-group-header {
    border-bottom-color: rgba(200, 0, 255, 0.15);
  }
  :host([card-theme="neon"]) .summary-bar {
    border-bottom-color: rgba(200, 0, 255, 0.12);
  }
```

- [ ] **Step 5.2 — Build and confirm no errors**

```bash
cd "/Users/marksquires/Person Card" && npm run build 2>&1 | tail -8
```

Expected: `Build complete: dist/person-card.js + dist/family-card.js`

- [ ] **Step 5.3 — Commit**

```bash
cd "/Users/marksquires/Person Card" && git add src/family-styles.ts && git commit -m "feat: add five visual theme CSS blocks to family card"
```

---

## Task 6: Theme picker in Person Card editor

**Files:**
- Modify: `src/person-card-editor.ts`

- [ ] **Step 6.1 — Add `CardTheme` import to `src/person-card-editor.ts`**

Find the existing types import line:
```typescript
import type { PersonCardConfig, DeviceConfig, ConditionRule, Condition, StyleEffect } from './types';
```

Replace with:
```typescript
import type { PersonCardConfig, DeviceConfig, ConditionRule, Condition, StyleEffect, CardTheme } from './types';
```

- [ ] **Step 6.2 — Add `CARD_THEMES` constant above the class definition**

Add after the imports block and before `@customElement('person-card-editor')`:

```typescript
const CARD_THEMES: Array<{ value: CardTheme; label: string; icon: string }> = [
  { value: 'default',   label: 'Default',   icon: 'mdi:palette-outline' },
  { value: 'glass',     label: 'Glass',     icon: 'mdi:blur' },
  { value: 'scifi',     label: 'Sci-Fi',    icon: 'mdi:chip' },
  { value: 'steampunk', label: 'Steampunk', icon: 'mdi:cog-outline' },
  { value: 'terminal',  label: 'Terminal',  icon: 'mdi:console' },
  { value: 'neon',      label: 'Neon',      icon: 'mdi:led-on' },
];
```

- [ ] **Step 6.3 — Add theme picker CSS to the editor's `static styles`**

Find the `static styles = css\`` block. Add the following CSS **before** the closing backtick of the `css` template literal:

```css
    .theme-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }
    .theme-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 10px 6px 8px;
      border-radius: 10px;
      border: 2px solid var(--divider-color, rgba(0,0,0,0.15));
      background: none;
      cursor: pointer;
      transition: border-color 0.15s, background 0.15s;
      text-align: center;
    }
    .theme-btn:hover {
      background: rgba(var(--rgb-primary-color, 33,150,243), 0.06);
    }
    .theme-btn.active {
      border-color: var(--primary-color);
      background: rgba(var(--rgb-primary-color, 33,150,243), 0.1);
    }
    .theme-btn-label {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .theme-icon {
      --mdc-icon-size: 22px;
      color: var(--secondary-text-color);
    }
    .theme-btn.active .theme-icon {
      color: var(--primary-color);
    }
```

- [ ] **Step 6.4 — Add `_renderThemePicker()` method to the class**

Add the following method to the `PersonCardEditor` class, after `_renderConditionsTab()` and before `_renderDisplayTab()`:

```typescript
  private _renderThemePicker() {
    const current = this._config.card_theme ?? 'default';
    return html`
      <div class="row">
        <label>Card Theme</label>
        <div class="theme-grid">
          ${CARD_THEMES.map(t => html`
            <button
              class="theme-btn ${current === t.value ? 'active' : ''}"
              @click=${() => this._set({ card_theme: t.value === 'default' ? undefined : t.value as CardTheme })}
              title=${t.label}
            >
              <ha-icon class="theme-icon" .icon=${t.icon}></ha-icon>
              <span class="theme-btn-label">${t.label}</span>
            </button>
          `)}
        </div>
      </div>
    `;
  }
```

- [ ] **Step 6.5 — Call `_renderThemePicker()` at the top of `_renderDisplayTab()`**

Find `_renderDisplayTab()`. The method currently returns a `html\`` template starting with the "Show ETA when away" row. Prepend the theme picker:

```typescript
  private _renderDisplayTab() {
    return html`
      ${this._renderThemePicker()}
      <div class="row">
        <ha-formfield label="Show ETA when away">
      ... (rest of method unchanged)
```

- [ ] **Step 6.6 — Build and confirm no TypeScript errors**

```bash
cd "/Users/marksquires/Person Card" && npm run build 2>&1 | tail -8
```

Expected: `Build complete: dist/person-card.js + dist/family-card.js`

- [ ] **Step 6.7 — Commit**

```bash
cd "/Users/marksquires/Person Card" && git add src/person-card-editor.ts && git commit -m "feat: add card theme picker to person card editor Display tab"
```

---

## Task 7: Theme picker in Family Card editor

**Files:**
- Modify: `src/family-card-editor.ts`

- [ ] **Step 7.1 — Add `CardTheme` import to `src/family-card-editor.ts`**

Find:
```typescript
import type { FamilyCardConfig, FamilyPersonConfig, ConditionRule, Condition } from './shared/types';
```

Replace with:
```typescript
import type { FamilyCardConfig, FamilyPersonConfig, ConditionRule, Condition, CardTheme } from './shared/types';
```

- [ ] **Step 7.2 — Add `CARD_THEMES` constant above the class definition**

Add after the imports block and before `@customElement('family-card-editor')`:

```typescript
const CARD_THEMES: Array<{ value: CardTheme; label: string; icon: string }> = [
  { value: 'default',   label: 'Default',   icon: 'mdi:palette-outline' },
  { value: 'glass',     label: 'Glass',     icon: 'mdi:blur' },
  { value: 'scifi',     label: 'Sci-Fi',    icon: 'mdi:chip' },
  { value: 'steampunk', label: 'Steampunk', icon: 'mdi:cog-outline' },
  { value: 'terminal',  label: 'Terminal',  icon: 'mdi:console' },
  { value: 'neon',      label: 'Neon',      icon: 'mdi:led-on' },
];
```

- [ ] **Step 7.3 — Add theme picker CSS to `static styles`**

Find the `static styles = css\`` block in `FamilyCardEditor`. Add the following CSS before the closing backtick:

```css
    .theme-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }
    .theme-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 10px 6px 8px;
      border-radius: 10px;
      border: 2px solid var(--divider-color, rgba(0,0,0,0.15));
      background: none;
      cursor: pointer;
      transition: border-color 0.15s, background 0.15s;
      text-align: center;
    }
    .theme-btn:hover {
      background: rgba(var(--rgb-primary-color, 33,150,243), 0.06);
    }
    .theme-btn.active {
      border-color: var(--primary-color);
      background: rgba(var(--rgb-primary-color, 33,150,243), 0.1);
    }
    .theme-btn-label {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .theme-icon {
      --mdc-icon-size: 22px;
      color: var(--secondary-text-color);
    }
    .theme-btn.active .theme-icon {
      color: var(--primary-color);
    }
```

- [ ] **Step 7.4 — Add `_renderThemePicker()` method to `FamilyCardEditor`**

Add after `_renderConditionsTab()` and before `_renderDisplayTab()`:

```typescript
  private _renderThemePicker() {
    const current = this._config.card_theme ?? 'default';
    return html`
      <div class="row">
        <label>Card Theme</label>
        <div class="theme-grid">
          ${CARD_THEMES.map(t => html`
            <button
              class="theme-btn ${current === t.value ? 'active' : ''}"
              @click=${() => this._set({ card_theme: t.value === 'default' ? undefined : t.value as CardTheme })}
              title=${t.label}
            >
              <ha-icon class="theme-icon" .icon=${t.icon}></ha-icon>
              <span class="theme-btn-label">${t.label}</span>
            </button>
          `)}
        </div>
      </div>
    `;
  }
```

- [ ] **Step 7.5 — Call `_renderThemePicker()` at the top of `_renderDisplayTab()`**

Find `_renderDisplayTab()` in `FamilyCardEditor`. The method currently starts with the "Group people by zone" row. Prepend:

```typescript
  private _renderDisplayTab() {
    return html`
      ${this._renderThemePicker()}
      <div class="row"><ha-formfield label="Group people by zone">
      ... (rest of method unchanged)
```

- [ ] **Step 7.6 — Run full build + tests**

```bash
cd "/Users/marksquires/Person Card" && npm run build 2>&1 | tail -8 && npm test 2>&1 | tail -10
```

Expected: Build complete. All tests pass.

- [ ] **Step 7.7 — Commit**

```bash
cd "/Users/marksquires/Person Card" && git add src/family-card-editor.ts && git commit -m "feat: add card theme picker to family card editor Display tab"
```

---

## Task 8: Changelog, version bump, and release

**Files:**
- Modify: `CHANGELOG.md`
- Modify: `package.json`

- [ ] **Step 8.1 — Update `CHANGELOG.md`**

Insert the following block at the top of the changelog (after the header, before the `## [0.5.1]` entry):

```markdown
## [0.6.0] — 2026-04-16

### Added

- **Card themes** — five optional visual skins for Person Card and Family Card, selectable per card via `card_theme` or from the new theme picker in the Display tab of each editor:
  - `glass` — frosted glass with backdrop blur; inherits the colour of whatever is behind it
  - `scifi` — dark cyberpunk with neon accent, corner brackets, and CRT scanlines
  - `steampunk` — warm copper/brass with aged mahogany background and serif type
  - `terminal` — Matrix-green phosphor on black with CRT scanlines and screen vignette
  - `neon` — deep purple-black with hot magenta neon glow and edge light streaks
  - `default` *(unchanged)* — existing appearance; no migration required

  Zone colours from the Theme Card continue to apply automatically within every theme — the zone's `border_color` drives the neon/accent colour and a new `--pc-glow-color` variable (pre-computed rgba version) drives glow effects.

---
```

- [ ] **Step 8.2 — Bump version in `package.json`**

Change `"version": "0.5.1"` to `"version": "0.6.0"`.

- [ ] **Step 8.3 — Final build and test**

```bash
cd "/Users/marksquires/Person Card" && npm run build 2>&1 | tail -8 && npm test 2>&1 | tail -10
```

Expected: Build complete. All tests pass.

- [ ] **Step 8.4 — Commit, tag, and push**

```bash
cd "/Users/marksquires/Person Card" && git add CHANGELOG.md package.json && git commit -m "chore: release v0.6.0 — card themes" && git tag v0.6.0 && git push && git push --tags
```
