# Family Grid Card Design Spec

## Goal

A new standalone card — `family-grid-card` — that displays all family members as a configurable grid of large glowing avatar tiles. Designed to be readable from across a room. Each person's tile has a breathing coloured ring whose colour comes from the zone style system, plus their name and a colour-matched zone badge.

## Architecture

Three new files following the same pattern as the existing `family-card`:

- `src/family-grid-card.ts` — main Lit element, rendering and state
- `src/family-grid-styles.ts` — all CSS (ring animations, tile layout, responsive grid)
- `src/family-grid-card-editor.ts` — visual config editor

Reuses existing shared utilities without modification:
- `src/shared/types.ts` — `FamilyPersonConfig`, `ZoneStyleConfig` (new `FamilyGridCardConfig` added here)
- `src/shared/zone-utils.ts` — `resolveZoneStyle`, `getZoneLabel`, `getZoneIcon`
- `src/shared/family-card-utils.ts` — `resolvePersonConfig` (resolves entity list to rendered people)
- `src/shared/theme-registry.ts` — `resolveZoneStyles`, `THEME_EVENT` (listens for theme card zone updates)
- `src/components/zone-editor.ts` — reused in editor for zone_styles config

Build output: `dist/family-grid-card.js` (new entry point added to `esbuild.config.mjs` and `release.yml`).

## Configuration Schema

Added to `src/shared/types.ts`:

```typescript
export interface FamilyGridCardConfig {
  title?: string;           // Optional card header label. Default: no header.
  columns?: number;         // Grid columns. 1–6. Default: 3.
  people?: FamilyPersonConfig[];   // Person entities to display (reuses existing type).
  zone_styles?: ZoneStyleConfig[]; // Per-zone colour/icon/label overrides (same system as family-card).
}
```

`FamilyPersonConfig` is already defined and reused as-is. The grid card only uses `entity` and `name` from it — `devices`, `conditions`, etc. are ignored.

## Rendering

### Card structure

```
┌─────────────────────────────────┐
│  Family          4 home · 2 away│  ← optional header (shown only if title configured)
├─────────────────────────────────┤
│  ●  ●  ●                        │
│ Mark Sarah James                │  ← grid tiles
│  ●  ●  ●                        │
│ Lucy  Emma  Ryan                │
└─────────────────────────────────┘
```

The header shows the configured `title` on the left and a live summary on the right:
- **Home count**: people whose zone state === `'home'`
- **Away count**: everyone else (any other zone, including `not_home` and named zones)

If `title` is not set, the header is omitted entirely.

### Tile structure

Each tile is a flex column: `ring-wrap → name → zone-badge`.

```
    ╭───────╮
   ╱         ╲    ← outer ripple ring (fades out, animated)
  │  ┌─────┐  │   ← main glow ring (border + box-shadow)
  │  │ HA  │  │   ← avatar (entity_picture) or initials fallback
  │  └─────┘  │
   ╲         ╱
    ╰───────╯
     Mark
  ╭─────────╮
  │ 🏠 Home │     ← coloured zone badge pill
  ╰─────────╯
```

**Avatar**: `entity_picture` attribute on the person entity state. If absent, render a circle with the person's initials (first letter of name, or first letter of entity friendly name).

**Ring colour**: resolved from `zone_styles` via `resolveZoneStyle(zone, zoneStyles)`. Falls back to `rgba(255,255,255,0.25)` if no zone style matches. The badge background/border/text uses the same colour.

**Zone badge**: coloured pill using zone colour at 18% opacity background, 40% opacity border, full colour for text. Label from `getZoneLabel(zone, zoneStyle)`, icon from `getZoneIcon(zone, zoneStyle)`.

### Ring animation

Two CSS animations on the ring, controlled by a `--speed` CSS variable:

1. **`breathe`** — `box-shadow` pulses between a tighter and broader glow on the main ring border element. Full cycle.
2. **`ripple`** — A second pseudo-element ring expands outward from the avatar and fades to opacity 0. Repeats on the same cycle.

Speed:
- Zone === `'home'`: `--speed: 3s` (slow, calm)
- All other zones: `--speed: 1.8s` (slightly faster, draws the eye)

The ring size (diameter in px) scales with column count via a `--ring-size` CSS variable set inline on the grid element:

| Columns | Ring size | Avatar size |
|---------|-----------|-------------|
| 1       | 110px     | 98px        |
| 2       | 90px      | 78px        |
| 3       | 70px      | 58px        |
| 4       | 58px      | 46px        |
| 5       | 50px      | 38px        |
| 6       | 42px      | 30px        |

Avatar diameter = ring size − 12px. Font size for initials = avatar diameter × 0.35.

### Zone style updates from Theme Card

The grid card listens for `THEME_EVENT` on the window (same pattern as `family-card`) and calls `requestUpdate()` so ring colours reflect live theme card changes.

## Editor

`family-grid-card-editor` with two sections:

**Display tab:**
- Title — text input, placeholder "Family"
- Columns — number input, min 1 max 6, default 3

**People tab:**
- List of person entity pickers (entity selector for `person` domain)
- Optional name override per person
- Add/remove people

**Zone Styles tab:**
- Reuses `<person-card-zone-editor>` component (same as family-card editor)

## File Structure

```
src/
  family-grid-card.ts          ← new
  family-grid-styles.ts        ← new
  family-grid-card-editor.ts   ← new
  shared/
    types.ts                   ← add FamilyGridCardConfig
esbuild.config.mjs             ← add new entry point
.github/workflows/release.yml  ← add dist/family-grid-card.js to assets
dist/
  family-grid-card.js          ← new build output (committed to git)
```

## Testing

`resolvePersonConfig` and `resolveZoneStyle` are already tested. No new shared utilities are introduced.

One new test file: `tests/shared/family-grid-card.test.ts` covering:
- Summary count logic (home vs away split)
- Ring size lookup by column count
- Initials extraction from name / entity id

## Out of Scope

- Card themes (`card_theme`) — the ring design is the aesthetic; themes don't apply
- Device battery display — grid is presence-only
- Expand-on-click — no expanded panel
- `group_by_zone` — not applicable to grid layout
