# Changelog

All notable changes to this project will be documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versions follow [Semantic Versioning](https://semver.org/).

---

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

## [0.5.1] — 2026-04-14

### Added

- **Family Card: zone summary bar** (`show_summary: true`) — a compact bar above the rows showing a coloured dot, count, and zone label for every zone that has at least one person in it. Home appears first, remaining zones ordered by occupancy descending. Toggle via the Display tab in the card editor.

- **Family Card: group by zone** (`group_by_zone: true`) — people are clustered under a coloured zone group header (icon · name · count badge) rather than displayed in a flat list. Home group appears first, then other zones by occupancy. Works across all three density modes (detailed, compact, mini). Toggle via the Display tab in the card editor.

Both features are off by default and independent — you can use either or both together.

---

## [0.5.0] — 2026-04-14

### Added

- **Theme Card display styles**: new `display_style` config option with six choices, selectable via a visual button grid in the card editor:
  - `legend` *(default)* — coloured dots + labels in a wrapping row (existing behaviour)
  - `compact` — smaller dots and tighter spacing for crowded dashboards
  - `pills` — filled pill/badge tags using each zone's background and border colour
  - `list` — vertical list with colour swatch, zone icon, and label; best for many zones
  - `grid` — zone icon tiles in a responsive auto-fill grid with colour accents
  - `hidden` — card takes no space and has no visual output; purely provides the shared zone theme to Person Cards and Family Cards on the same dashboard

---

## [0.4.7] — 2026-04-13

### Added

- **Live card picker preview with real entities**: `getStubConfig` now receives the `hass` object and populates the preview with real person entities from the instance. Person Card finds the first `person.*` entity and its associated device trackers + battery sensors. Family Card finds up to 6 `person.*` entities. The card picker / "Add card" dialog will now show a populated preview instead of an empty/placeholder card.

---

## [0.4.6] — 2026-04-13

### Fixed

- **Person Card editor — entity picker non-interactive when editing existing card**: opening the editor on a card that already had a person entity set rendered the picker with a value but without `hass`, causing it to initialise in a broken state. Added `!this.hass` guard to `render()` so the editor waits until both config and hass are available before rendering (same pattern already applied to Family Card editor in v0.4.2)

---

## [0.4.5] — 2026-04-13

### Fixed

- **Root cause of zone colour mismatch identified and fixed**: HA returns the zone's *friendly name* as `person.state` (e.g. `"Uni House"`) rather than the entity-id suffix (`"uni_house"`). Auto-detect was storing entity-id keys so they never matched. Fixed on two fronts:
  1. `resolveZoneStyle` now tries an exact match first, then a normalised fallback — converting both sides to lowercase entity-id style — so `"Uni House"` matches `"uni_house"` and `"Kerry's"` matches `"kerrys"`. This fixes all existing configs immediately without any user action.
  2. Auto-detect now stores the zone's friendly name as the zone key (e.g. `Uni House`) so newly detected zones work out of the box. Exception: `zone.home` continues to use `"home"` (HA hard-codes this lowercase state value).

---

## [0.4.4] — 2026-04-13

### Fixed

- **Zone colours now show even when Family/Person card has its own zone_styles**: if a card has zone_styles saved in its own config (e.g. configured via the Appearance tab in the card editor), those entries previously blocked all theme card colours. `resolveZoneStyles` now merges card-level zone styles with the theme, so any zone missing `border_color`/`background_color` in the card config gets those values from the theme card automatically

---

## [0.4.3] — 2026-04-13

### Fixed

- **Zone auto-detect backfills missing colours**: clicking "Auto-detect zones from HA" now also assigns colour schemes to any existing zones in the config that were previously detected without colours (e.g. zones added before v0.4.2); no need to delete and re-add zones manually

---

## [0.4.2] — 2026-04-13

### Fixed

- **Family Card editor — entity pickers now interactive**: entity picker fields in the Family Card GUI editor (People tab person/ETA entity, Conditions tab) were rendering but not responding to clicks; fixed by matching the same `<div>` wrapper pattern applied to Person Card editor in v0.3.x
- **Zone auto-detect now assigns colours**: the "Auto-detect zones from HA" button in the zone editor previously set zone name, label, and icon but left `border_color` unset, so auto-detected zones showed no accent colour in cards; auto-detect now cycles through the 10 built-in colour schemes and assigns one to each new zone automatically

---

## [0.4.1] — 2026-04-13

### Fixed

- **Family Card and Theme Card now available in Home Assistant via HACS**: HACS installs only the single file listed in `hacs.json`; bundled family-card and person-card-theme into `person-card.js` via side-effect imports so all three cards are registered from the one file

---

## [0.4.0] — 2026-04-13

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

---

## [0.3.0] — 2026-04-10

### Added

- **Hero layout** (`size: hero`) — centred portrait card with a 120 px avatar, zone-coloured glow ring, horizontal device icon grid (icon, name, battery bar, connectivity dot per device), and last-seen footer. Notification badge pinned top-right.
- **Stats layout** (`size: stats`) — immersive full-bleed background at 55 % opacity with backdrop-blur frosted panels. Header shows avatar, name, zone, and how long the person has been in the current zone. Two stat boxes display *In zone* duration (from `last_changed`) and *Last seen* (from `last_updated`). Full device list in a frosted-glass panel below.
- Size picker in the editor now includes **Hero** and **Stats** buttons with inline descriptions.

---

## [0.2.0] — 2026-04-08

### Added

- **Configurable battery threshold per device** — set `battery_threshold` on each device (default 20 %); the bar turns red and the notification badge triggers at this level. Configurable in the Devices tab editor.
- **Zone auto-detect** — "Auto-detect zones from HA" button in the Appearance tab reads all `zone.*` entities from HA and pre-populates the zone styles list with their friendly name and icon. Skips zones already configured.
- **Offline / stale indicator** — set `offline_threshold` (minutes) in the Display tab; when the person entity hasn't updated within that window the avatar dims with a greyscale filter and a small clock badge appears at the bottom-right corner.

---

## [0.1.0] — 2026-04-07

Initial release.

### Added

- **Person entity** display with avatar, name, and zone-based location badge
- **Zone styles** — custom background colour, border, icon, and label per zone
- **10 built-in colour schemes** — Midnight, Forest Walk, Lava Flow, Arctic Drift, Twilight, Emerald City, Rose Gold, Neon Tokyo, Desert Night, Northern Lights
- **Device tiles** — battery bar (green/amber/red) and connectivity dot per tracked device
- **Condition rule builder** — AND/OR rules against any HA entity; last-match-wins; effects: background, border, notification badge
- **Geocoded address** — live address sensor shown on medium/large when person is `not_home`; CSS ticker animation for long addresses; falls back to "Away"
- **ETA display** — travel time sensor shown on large size when away
- **Last seen timestamp** — relative format, auto-refreshes every 60 s
- **Notification badge** — auto-triggers on device battery ≤ 20 %; fully overridable via condition rules
- **Adaptive sizing** — `auto` (ResizeObserver), `small`, `medium`, `large`
- **Full GUI editor** — 5-tab editor (Person · Devices · Appearance · Conditions · Display); no YAML required
- **CSS custom properties** — `--person-card-font-family`, `--person-card-border-radius`, `--person-card-avatar-size`
- Background image support with 25 % opacity overlay
- HACS-compatible packaging with GitHub Actions release workflow
