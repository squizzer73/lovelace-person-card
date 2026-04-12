# Family Card & Shared Theme — Design Spec

**Date:** 2026-04-12
**Version:** v0.4.0
**Status:** Approved

---

## Overview

Extend the Person Card repo to produce three custom elements from a single codebase:

1. **Person Card** (`<person-card>`) — existing single-person card, refactored to use shared modules
2. **Family Card** (`<family-card>`) — new multi-person overview card
3. **Theme Card** (`<person-card-theme>`) — new shared zone config + visible legend card

Zone styles are configured once in the theme card and automatically consumed by person-card and family-card, with per-card overrides available.

---

## Architecture

### Three Cards, Shared Core

| Card | Element | Purpose |
|------|---------|---------|
| Person Card | `<person-card>` | Single-person deep dive (existing) |
| Family Card | `<family-card>` | Multi-person overview (new) |
| Theme Card | `<person-card-theme>` | Shared zone config + visible legend (new) |

### Build Output

esbuild gets a second entry point:

- `dist/person-card.js` — person-card + theme card (theme is lightweight, bundles with person-card since it's always needed)
- `dist/family-card.js` — family card (imports shared modules, standalone resource)

Users add one or both resources in HA depending on which cards they use. The theme card comes free with person-card.

### Shared Module Extraction

The following are extracted from their current locations into `src/shared/`:

| Module | Contents | Currently in |
|--------|----------|-------------|
| `shared/zone-utils.ts` | Zone style resolution, zone label/icon lookup | Inline in `person-card.ts` and `location-badge.ts` |
| `shared/battery-utils.ts` | Battery colour logic, threshold evaluation, `getBatteryColor()` | `ha-helpers.ts` + inline in `person-card.ts` |
| `shared/format-utils.ts` | `formatDuration()`, `formatLastSeen()` | `person-card.ts` + `ha-helpers.ts` |
| `shared/condition-engine.ts` | Rule evaluation (moved from `lib/`) | `lib/condition-engine.ts` |
| `shared/theme-registry.ts` | Global `window.personCardTheme` read/write + event bus | New |
| `shared/types.ts` | All shared types (moved from `src/types.ts`) | `src/types.ts` |
| `shared/constants.ts` | `COLOR_SCHEMES` array | `person-card-editor.ts` |

Existing sub-components (`device-tile`, `location-badge`, `notification-badge`, `last-seen`, `eta-display`) stay as-is — both cards import them.

### Theme Sharing Mechanism

The theme card registers its config on `window.personCardTheme` when it renders. Person-card and family-card read from that global. The theme card also fires a `person-card-theme-updated` CustomEvent on `window` so consuming cards re-render when the theme changes.

**Override precedence (highest wins):**

1. Per-card `zone_styles` config (explicit override)
2. Theme card global (`window.personCardTheme`)
3. Built-in defaults (generic icons/labels, no colours)

This is fully backwards-compatible — existing setups without a theme card continue to work using their own `zone_styles`.

---

## Theme Card (`<person-card-theme>`)

### Config

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
    background_color: "#2e1b1b"
    border_color: "#ff6d00"
```

### Behaviour

- On render, writes `zone_styles` to `window.personCardTheme.zoneStyles`
- Fires `person-card-theme-updated` CustomEvent on `window`
- Renders as a compact dot legend: coloured dots (using `border_color`), zone label beside each
- Has its own GUI editor with the same zone style + colour scheme picker UI (extracted to shared `<person-card-zone-editor>` component)
- Dark card background consistent with person-card styling

### Rendering

Compact dot legend layout:

```
● Home   ● Office   ● School   ● Away   ● Unknown
```

Dots use `border_color`. Labels from zone config. Wraps on narrow columns.

---

## Family Card (`<family-card>`)

### Config

```yaml
type: custom:family-card

# People — explicit list, group entity, or both
people:
  - entity: person.mark
    name: Mark                    # optional override
    photo: /local/mark.jpg        # optional override
    devices:                      # optional per-person device list
      - entity: device_tracker.marks_phone
        name: Phone
        icon: mdi:cellphone
        battery_entity: sensor.marks_phone_battery
        connectivity_entity: binary_sensor.marks_phone_connected
        battery_threshold: 25
    show_eta: true                # per-person override
    address_entity: sensor.marks_phone_geocoded_location
  - entity: person.jane
  - entity: person.sophie
    show_eta: false               # per-person override

group_entity: group.family        # alternative — pulls members automatically
# If both people[] and group_entity are set, people[] wins

# Card-level defaults (apply to all people unless overridden)
density: detailed                 # compact | mini | detailed
show_devices: true
show_last_seen: true
show_eta: true
show_notification_badge: true
offline_threshold: 30

# Per-card zone style override (optional — falls back to theme card)
zone_styles: []

# Condition rules (card-level)
conditions: []

background_image: /local/backgrounds/family.jpg  # optional
```

### Density Tiers

| Tier | Shows per person | Expand |
|------|-----------------|--------|
| `compact` | Avatar, name, zone badge, worst-device status dot | No |
| `mini` | Avatar, name, zone, device battery bars + connectivity dots | No |
| `detailed` | Avatar, name, zone + duration, device summaries, expand chevron | Yes |

All three tiers are selectable in the GUI editor.

### Detailed Tier — Expand Behaviour

- Tap a person row to expand/collapse inline
- One person expanded at a time (default) or allow multiple (card-level toggle)
- Expanded view shows:
  - Full device list with battery bars, percentage, connectivity dots
  - Last seen timestamp
  - ETA (if configured and person is away)
  - "View full card →" link
- "View full card →" default action: fires `hass-more-info` event for the person entity (standard HA dialog). Optional per-person `tap_action: { action: navigate, navigation_path: /lovelace/mark }` to navigate to a dedicated view instead.

### Collapsed Row (Detailed Tier)

Each collapsed row shows:
- 44px avatar (with stale indicator if applicable)
- Name
- Zone badge + zone duration (e.g. "Home · 2h 14m")
- Device battery summaries (icon + percentage per device)
- Notification badge if any alert is active
- Expand chevron

### Notification Badges

- Per-person badges: low battery, stale/offline, condition-triggered
- Card-level summary badge in the card header if any person has an alert
- Zone-coloured left border on each person row (using the theme/zone `border_color`)

### Group Entity Behaviour

When using `group_entity`:
- Reads group members and creates a person entry for each
- Devices auto-discovered from the person entity's `device_trackers` attribute
- No per-person config available in group mode — card-level defaults apply to all
- If `people[]` is also set, `people[]` takes priority and `group_entity` is ignored

### GUI Editor

Tabbed editor similar to person-card:

| Tab | Contents |
|-----|----------|
| People | Person entity list with per-person overrides; group entity picker; density selector |
| Appearance | Background image; zone style overrides (shared `<person-card-zone-editor>`) |
| Conditions | Condition rule builder (same UI as person-card) |
| Display | Card-level toggles: show_devices, show_last_seen, show_eta, show_notification_badge, offline_threshold |

---

## Refactoring & Improvements

### 1. Extract Shared Editor Component

The zone style editor (zone list + colour scheme swatches + colour pickers) is ~100 lines in `person-card-editor.ts`. Extract as:

- `<person-card-zone-editor>` — reusable Lit component
- Used by: theme card editor, person-card editor, family-card editor
- Props: `zoneStyles`, `hass`; fires `zone-styles-changed` event

### 2. Deduplicate Battery Colour Logic

Battery colour calculation exists in:
- `device-tile.ts` — `batteryColor()` method
- `person-card.ts` — inline in `_renderHeroDevice()`

Extract to `shared/battery-utils.ts` as `getBatteryColor(level: number, threshold: number): string`.

### 3. Consolidate `HassLike` Interfaces

Both `condition-engine.ts` and `ha-helpers.ts` define their own `HassLike` interface. Merge into one definition in `shared/types.ts`.

### 4. Clean Up `__eta__` Sentinel Pattern

The ETA travel time sensor is stored as a fake device with `name: '__eta__'` in the devices array, then filtered out in every render method and editor tab.

Replace with a dedicated `eta_entity: string` config field on `PersonCardConfig`. The editor already treats it separately — this makes the data model match reality.

**Migration:** `setConfig()` detects the old `__eta__` device and migrates it to `eta_entity` on load. Backwards-compatible.

### 5. Split Person Card Render Methods

`person-card.ts` (461 lines) has three layout paths interleaved. Extract each into its own file:

- `src/layouts/standard.ts` — small/medium/large render
- `src/layouts/hero.ts` — hero render
- `src/layouts/stats.ts` — stats render

The main `person-card.ts` becomes a thin shell: config, resize observer, theme subscription, and dispatch to the right layout.

### 6. Move `lib/` to `shared/`

`lib/condition-engine.ts` and `lib/ha-helpers.ts` move to `shared/`, consolidating all shared code in one directory. The `lib/` directory is removed.

---

## File Structure (After Refactoring)

```
src/
  shared/
    types.ts              ← all shared types
    constants.ts          ← COLOR_SCHEMES
    zone-utils.ts         ← zone style resolution
    battery-utils.ts      ← getBatteryColor()
    format-utils.ts       ← formatDuration(), formatLastSeen()
    condition-engine.ts   ← rule evaluation
    theme-registry.ts     ← window.personCardTheme read/write/events
    ha-helpers.ts         ← getBatteryLevel(), getConnectivity(), shouldShowNotificationBadge()
  components/
    device-tile.ts        ← existing (uses shared/battery-utils)
    location-badge.ts     ← existing (uses shared/zone-utils)
    notification-badge.ts ← existing
    last-seen.ts          ← existing (uses shared/format-utils)
    eta-display.ts        ← existing
    zone-editor.ts        ← new shared editor component
  layouts/
    standard.ts           ← small/medium/large render
    hero.ts               ← hero render
    stats.ts              ← stats render
  person-card.ts          ← thin shell: config + resize + dispatch
  person-card-editor.ts   ← person card editor (uses zone-editor)
  person-card-theme.ts    ← theme card element + legend render
  person-card-theme-editor.ts ← theme card editor (uses zone-editor)
  family-card.ts          ← family card element
  family-card-editor.ts   ← family card editor (uses zone-editor)
  styles.ts               ← existing person-card styles
  family-styles.ts        ← family card styles
  theme-styles.ts         ← theme card styles
```

### Build Configuration

```js
// esbuild.config.mjs
entryPoints: [
  'src/person-card.ts',   // bundles person-card + theme card + shared
  'src/family-card.ts',   // bundles family card + shared
]
```

Both entry points tree-shake the shared modules — esbuild deduplicates automatically within each bundle.

---

## HACS & Resources

- `person-card.js` — add as Dashboard resource (existing users: no change)
- `family-card.js` — add as a second Dashboard resource (only if using family card)
- `hacs.json` — `filename` stays as `person-card.js` (HACS only supports a single filename). README documents that users wanting the family card must also add `family-card.js` as a manual resource: Settings → Dashboards → Resources → `/local/community/lovelace-person-card/family-card.js`

---

## Backwards Compatibility

| Scenario | Impact |
|----------|--------|
| Existing person-card config | Zero changes needed. Works as before. |
| No theme card on dashboard | Person-card uses its own `zone_styles`. No regression. |
| `__eta__` device sentinel | Auto-migrated to `eta_entity` in `setConfig()`. Old YAML continues to work. |
| Existing `zone_styles` on person-card + theme card present | Per-card config wins (override precedence). |

---

## Testing Strategy

- Existing vitest unit tests continue to pass after refactoring
- New unit tests for:
  - `shared/theme-registry.ts` — write, read, event dispatch
  - `shared/battery-utils.ts` — colour thresholds
  - `shared/zone-utils.ts` — resolution with/without theme
  - Family card density tier rendering
  - Override precedence (card > theme > defaults)
  - `__eta__` migration in `setConfig()`
  - Group entity member resolution
