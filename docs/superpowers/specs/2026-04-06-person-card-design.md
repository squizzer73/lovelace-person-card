# Person Card — Design Spec

**Date:** 2026-04-06
**Status:** Approved
**Repo:** `lovelace-person-card`
**Target:** HACS (Home Assistant Community Store)

---

## Overview

A bold, opinionated Lovelace custom card for Home Assistant that provides at-a-glance status for a person — their current location zone, device battery and connectivity, ETA when travelling, and conditional visual styling driven by a full rule builder.

Primary purpose: **"Where is this person right now, and are they reachable?"**

---

## Tech Stack

| Concern | Choice | Reason |
|---------|--------|--------|
| Framework | Lit 3.x | HA standard for custom cards |
| Language | TypeScript | Required for condition builder complexity |
| Bundler | esbuild | Fast, minimal config, single output file |
| HA utilities | `custom-card-helpers` | Entity subscriptions, editor helpers |
| Output | `person-card.js` | Single file, drop into HA |
| Distribution | HACS via GitHub releases | GitHub Actions on tag push |

---

## File Structure

```
src/
  person-card.ts              # Main card element (<person-card>)
  person-card-editor.ts       # GUI editor element (<person-card-editor>)
  components/
    device-tile.ts            # Single device: icon + battery bar + connectivity dot
    location-badge.ts         # Zone name + icon
    notification-badge.ts     # Attention dot/badge overlay
    eta-display.ts            # ETA when travelling
    last-seen.ts              # Timestamp of last data update
  lib/
    condition-engine.ts       # Evaluates condition rules against HA states
    ha-helpers.ts             # HA state/entity utility functions
  types.ts                    # All TypeScript interfaces
  styles.ts                   # Lit CSS styles (bold/opinionated theme)
docs/
  superpowers/specs/
    2026-04-06-person-card-design.md
hacs.json
info.md
package.json
tsconfig.json
esbuild.config.mjs
.github/
  workflows/
    release.yml               # Build + publish on tag push
```

---

## Configuration Schema

```typescript
interface PersonCardConfig {
  // Core
  person_entity: string;            // e.g. person.mark
  name?: string;                    // override display name
  photo?: string;                   // override photo URL

  // Devices
  devices?: DeviceConfig[];         // default: []

  // Display toggles
  size: 'auto' | 'small' | 'medium' | 'large';  // default: 'auto'
  show_eta: boolean;                // default: true
  show_last_seen: boolean;          // default: true
  show_notification_badge: boolean; // default: true

  // Styling
  background_image?: string;        // optional background image URL (with overlay)
  zone_styles?: ZoneStyleConfig[];  // per-zone colour/icon overrides (default: [])
  conditions?: ConditionRule[];     // condition builder rules (default: [])
}

interface DeviceConfig {
  entity: string;                   // device_tracker or sensor
  name?: string;                    // display name
  icon?: string;                    // mdi icon override
  battery_entity?: string;          // separate battery sensor (optional)
  connectivity_entity?: string;     // separate connectivity sensor (optional)
}

interface ZoneStyleConfig {
  zone: string;                     // matches the person entity state value (e.g. 'home', 'Work', 'not_home', 'unknown')
  label?: string;                   // friendly display override
  icon?: string;                    // mdi icon override
  background_color?: string;
  border_color?: string;
}

interface ConditionRule {
  id: string;                       // uuid, generated on creation
  label?: string;                   // user-facing name
  operator: 'and' | 'or';          // how conditions within the rule combine
  conditions: Condition[];
  effect: StyleEffect;
}

interface Condition {
  entity: string;
  attribute?: string;               // if checking an attribute, not the state value
  operator: 'eq' | 'neq' | 'lt' | 'gt' | 'lte' | 'gte' | 'contains';
  value: string | number;
}

interface StyleEffect {
  background_color?: string;
  border_color?: string;
  border_width?: number;            // px
  badge_color?: string;
  badge_icon?: string;              // mdi icon for notification badge
}
```

**Condition rule precedence:** rules evaluated top-to-bottom; last matching rule wins (CSS-like). Users reorder via drag in the editor.

---

## Adaptive Sizing

The card uses a `ResizeObserver` on its root element to automatically select a size tier. Users can override via the `size` config field.

| Tier | Trigger width | Content shown |
|------|--------------|---------------|
| `small` | < 200px | Avatar, name, location zone, notification badge |
| `medium` | 200–400px | Above + device tiles (icon, battery bar, online dot) |
| `large` | > 400px | Above + device labels, last seen timestamp, ETA |

**Layout (medium/large):**

```
┌─────────────────────────────────────┐
│  [PHOTO]  Mark Squires          [!] │  ← notification badge top-right
│           📍 Work                   │  ← zone icon + label
│  ─────────────────────────────────  │
│  📱 iPhone   ████░  78%  ● Online  │  ← device tile
│  ⌚ Watch    ██░░░  42%  ● Online  │
│  📱 iPad     ░░░░░   8%  ○ Offline │
│  ─────────────────────────────────  │
│  🕐 ETA home: 22 min               │  ← hidden when at home
│  Last seen: 3 min ago               │
└─────────────────────────────────────┘
```

**Photo:** circular avatar from `person` entity picture. Falls back to `mdi:account`. Customisable via editor.

**Conditional styling** is applied as CSS custom properties on the card's root element — background colour, border colour/width — layering cleanly on the base theme without overriding component internals.

---

## GUI Editor (Tabbed — 5 Tabs)

Registered as `<person-card-editor>` via `getConfigElement()`.

### Tab 1 — Person
- `ha-entity-picker` filtered to `person` domain
- Name override (text input, placeholder: entity friendly name)
- Photo: toggle between HA entity photo and custom URL; URL input + thumbnail preview

### Tab 2 — Devices
- Sortable list of device rows (drag-to-reorder)
- Each row: entity picker, name override, icon picker, optional battery entity picker, optional connectivity entity picker
- "+ Add Device" button; delete button per row

### Tab 3 — Appearance
- Size: segmented control (Auto / Small / Medium / Large)
- Zone styles: one row per zone (zone name, label, icon, background colour swatch, border colour swatch)
- "+ Add Zone Style" to map additional zones
- Optional background image URL (applied behind content with a semi-transparent overlay)

### Tab 4 — Conditions
- Sortable list of condition rules (drag = precedence order)
- Each rule: label input, AND/OR toggle, list of condition rows, effect pickers (background colour, border colour, border width, badge colour, badge icon)
- Each condition row: entity picker, optional attribute input, operator dropdown, value input
- Rules collapse/expand to keep the list manageable
- "+ Add Rule"; "+ Add Condition" within each rule

### Tab 5 — Display
- Toggles: Show ETA / Show Last Seen / Show Notification Badge
- ETA sensor picker (optional travel time sensor entity)
- Last seen format: relative ("3 min ago") or absolute ("14:32")

---

## Key Components

### `condition-engine.ts`
- Input: array of `ConditionRule[]` + current HA `hass` object
- Output: merged `StyleEffect` (last matching rule wins)
- Pure function — no side effects, easily unit-tested
- Handles `attribute` lookups, numeric coercion for `lt`/`gt`/`lte`/`gte`

### `device-tile.ts`
- Resolves battery level from `battery_entity` or falls back to `battery_level` attribute on the main entity
- Resolves connectivity from `connectivity_entity` or `connectivity` attribute
- Battery bar: colour shifts green → orange → red at fixed thresholds (<50% orange, <20% red) — configurable thresholds are post-v1
- Online dot: green (online/home), grey (offline/away), amber (unknown)

### `eta-display.ts`
- Only renders when person is not in `home` zone
- Reads state from configured travel time sensor entity
- Hidden when `show_eta: false` or no ETA entity configured

### `last-seen.ts`
- Reads `last_updated` from the person entity's state object
- Updates every 60s via `setInterval` (relative display) or on each state change (absolute display)

### `notification-badge.ts`
- Renders when: any device is offline, battery < 20%, location is unknown, or a condition rule sets a `badge_color`/`badge_icon`
- Badge icon defaults to `mdi:alert-circle`; overridable per condition rule

---

## Visual Style

- Bold, opinionated — does not attempt to mimic default HA card styling
- Rich typography, strong colour use, distinct from stock Mushroom/generic cards
- CSS custom properties exposed for user theming:
  - `--person-card-background`
  - `--person-card-border-radius`
  - `--person-card-font-family`
  - `--person-card-avatar-size`
- Conditional styles applied via inline CSS vars on the card root, not by overriding component classes

---

## HACS & Release

- `hacs.json`: category `plugin`, `homeassistant` minimum version `2023.9.0`
- GitHub Actions workflow: on `v*` tag push → run esbuild → attach `person-card.js` to GitHub release
- `info.md`: rendered in HACS UI as card description
- Semantic versioning: `MAJOR.MINOR.PATCH`

---

## Out of Scope (v1)

- Map-based location display (zone-based only)
- Activity timeline / location history strip (post-v1)
- Quick action buttons (post-v1)
- Multi-person comparison layout (post-v1)
