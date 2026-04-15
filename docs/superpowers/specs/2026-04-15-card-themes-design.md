# Card Themes — Design Spec

**Date:** 2026-04-15  
**Status:** Approved  
**Version:** 0.6.0

---

## Overview

Add five optional visual themes to Person Card and Family Card. Each card sets its own theme independently. Zone colours from the Theme Card continue to apply to all cards on the dashboard regardless of which theme is selected — the theme controls structural chrome; zone colours drive location awareness.

---

## Goals

- Five named themes (Glass, Sci-Fi, Steampunk, Terminal, Neon Noir) plus the unchanged Default
- One new `card_theme` config field per card — fully optional, backward-compatible
- Zone accent colours (from Theme Card `zone_styles`) flow into every theme automatically via CSS variables
- Theme picker added to the Display tab of the Person Card and Family Card editors
- No changes required to existing configs or Theme Card zone setups

---

## Non-Goals

- Animated or transitioning themes
- User-defined custom themes (not in this version)
- Per-zone theme overrides
- Changing which card_theme the Theme Card itself uses to provide zone styles (the Theme Card's `display_style` already handles its own presentation)

---

## Config Changes

### New type

```typescript
// src/shared/types.ts
export type CardTheme =
  | 'default'
  | 'glass'
  | 'scifi'
  | 'steampunk'
  | 'terminal'
  | 'neon';
```

### PersonCardConfig

```typescript
export interface PersonCardConfig {
  // ... existing fields ...
  card_theme?: CardTheme;   // default: 'default'
}
```

### FamilyCardConfig

```typescript
export interface FamilyCardConfig {
  // ... existing fields ...
  card_theme?: CardTheme;   // default: 'default'
}
```

`PersonCardThemeConfig` does **not** get `card_theme` — the Theme Card's visual presentation is already controlled by `display_style`.

### YAML examples

```yaml
type: custom:person-card
person_entity: person.james
card_theme: scifi

type: custom:family-card
card_theme: neon
```

---

## CSS Architecture

### Attribute binding

Both cards set the `card-theme` attribute on their host element whenever the config changes:

```typescript
// person-card.ts and family-card.ts — in updated()
const theme = this._config?.card_theme ?? 'default';
this.setAttribute('card-theme', theme);
```

### CSS variable bridge

Zone colours already land on the host element as CSS variables set by the card's render logic:

| Variable | Source | Description |
|----------|--------|-------------|
| `--pc-border-color` | `zone_styles[matched].border_color` | Zone accent colour |
| `--pc-background` | `zone_styles[matched].background_color` | Zone background colour |

One new variable is added, computed in JS when a zone is matched:

| Variable | Computation | Description |
|----------|-------------|-------------|
| `--pc-glow-color` | `border_color` hex → `rgba(..., 0.25)` | Pre-multiplied glow colour for box-shadow |

### Theme CSS pattern

Each theme is a CSS block in the existing style files (`person-card-styles.ts`, `family-styles.ts`) using `:host([card-theme="..."])` selectors. The zone colour variables are used as the accent input:

```css
:host([card-theme="scifi"]) {
  background: #030f22;
  border: 1px solid var(--pc-border-color, #00c8f0);
  border-radius: 4px;
  box-shadow: 0 0 22px var(--pc-glow-color, rgba(0, 200, 240, 0.22));
  font-family: 'Courier New', 'Consolas', monospace;
}
```

The second argument to `var()` is the theme's **signature default** — shown when no zone is matched or when the person is in an unknown location.

### Signature defaults per theme

| Theme | Default accent | Rationale |
|-------|---------------|-----------|
| `default` | n/a (current behaviour) | Unchanged |
| `glass` | `rgba(255,255,255,0.22)` | Neutral frosted border |
| `scifi` | `#00c8f0` | Electric cyan |
| `steampunk` | `#a0682a` | Copper/brass |
| `terminal` | `#00ff41` | Phosphor green |
| `neon` | `#c800ff` | Hot magenta |

### Zone colour behaviour per theme

| Theme | `--pc-border-color` use | `--pc-background` use |
|-------|------------------------|----------------------|
| `default` | Card border (current) | Card background (current) |
| `glass` | Border tint + glow ring | Very low-opacity colour wash behind blur |
| `scifi` | Neon glow + border colour | Ignored |
| `steampunk` | Border + gauge fill tint | Ignored (fixed dark mahogany) |
| `terminal` | Phosphor colour (border + bars) | Ignored (always black) |
| `neon` | Neon glow + border colour | Very low-opacity tint |

### Decorative chrome elements

| Theme | Technique | Elements |
|-------|-----------|----------|
| `scifi` | `::before` pseudo-element | Corner bracket overlays; CRT scanline texture |
| `terminal` | `::before` pseudo-element | CRT scanlines; screen vignette |
| `steampunk` | `::after` pseudo-element | Rivet corner decorations |
| `glass` | CSS `backdrop-filter` | Blur + saturation on card background |
| `neon` | `::before` pseudo-element | Top/bottom edge glow streaks |

### Sub-element overrides per theme

Each theme block also overrides:
- `.avatar` / `.avatar-placeholder` — shape, border, background, glow
- `.person-zone`, `.pc-zone` — text colour
- `.device-summary-pct`, `.pc-device` — label and percentage text colour
- Battery bar fills (`.bar-fill`) — colour and optional glow
- Connectivity dots — colour and optional glow
- Dividers — colour
- `.pc-foot`, `.expanded-footer` — footer text colour
- Notification badge — shape, border, glow

---

## Editor UI

### Placement

Theme picker added to the **Display** tab of both the Person Card editor (`person-card-editor.ts`) and Family Card editor (`family-card-editor.ts`), above the existing display toggles.

### Appearance

A row of six clickable tiles matching the pattern of the Theme Card's `display_style` picker:

```
Card Theme
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│  ●  ●  ● │ │  glass   │ │  [SCI]   │ │  ⚙ stm   │ │ >_ term  │ │  ◈ neon  │
│ Default  │ │  Glass   │ │  Sci-Fi  │ │Steampunk │ │ Terminal │ │   Neon   │
└──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘
```

- Selected tile gets the active/highlighted border (same as `display_style` picker)
- Each tile has a small representative icon or mini colour swatch
- Clicking fires `_dispatchConfig({ card_theme: value })` — the live preview updates immediately

### YAML fallback

No GUI required. `card_theme: scifi` in YAML is sufficient.

---

## File Changes

| File | Change |
|------|--------|
| `src/shared/types.ts` | Add `CardTheme` type; add `card_theme?` to `PersonCardConfig` and `FamilyCardConfig` |
| `src/person-card.ts` | Set `card-theme` attribute in `updated()`; call `hexToRgba` alongside existing `--pc-border-color` / `--pc-background` variable writes to also set `--pc-glow-color` |
| `src/person-card-styles.ts` | Add six `:host([card-theme="..."])` blocks with full sub-element overrides |
| `src/family-card.ts` | Same pattern as `person-card.ts` |
| `src/family-styles.ts` | Add six `:host([card-theme="..."])` blocks |
| `src/person-card-editor.ts` | Add theme picker tile row to Display tab |
| `src/family-card-editor.ts` | Add theme picker tile row to Display tab |
| `src/shared/zone-utils.ts` | Add `hexToRgba(hex: string, alpha: number): string` helper; exported for use in both cards |

---

## Backward Compatibility

- `card_theme` is optional; omitting it is equivalent to `card_theme: default`
- `default` renders identically to the current card in all versions
- No changes to zone_styles format, Theme Card config, or any existing YAML
- Existing dashboards are unaffected

---

## Testing

- Unit tests for `hexToRgba` helper
- Unit tests confirming `card-theme` attribute is set correctly for each config value
- Unit tests confirming `card-theme` defaults to `default` when field is absent
- Visual verification in HA for all five themes × common zone colour combinations
- Verify Family Card group-by-zone and summary bar render correctly within each theme

---

## Version

Released as **v0.6.0** — additive feature, no breaking changes.
