# Changelog

All notable changes to this project will be documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versions follow [Semantic Versioning](https://semver.org/).

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
