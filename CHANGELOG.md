# Changelog

All notable changes to this project will be documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versions follow [Semantic Versioning](https://semver.org/).

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
