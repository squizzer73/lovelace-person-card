# Changelog

All notable changes to this project will be documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versions follow [Semantic Versioning](https://semver.org/).

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
