import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { PersonCardConfig, DeviceConfig, SizeTier, StyleEffect } from './types';

type RenderParams = {
  name: string;
  photo: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  personState: any;
  effect: StyleEffect;
  showBadge: boolean;
  isStale: boolean;
  address: string;
  devices: DeviceConfig[];
};
import { cardStyles } from './styles';
import { evaluateConditions } from './lib/condition-engine';
import { shouldShowNotificationBadge } from './lib/ha-helpers';

// Register sub-components
import './components/location-badge';
import './components/device-tile';
import './components/notification-badge';
import './components/eta-display';
import './components/last-seen';
import './person-card-editor';

// HACS / HA card registration
declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description: string; preview?: boolean }>;
  }
}
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: 'person-card',
  name: 'Person Card',
  description: 'At-a-glance person status: location, devices, ETA, and conditional styling.',
  preview: true,
});

@customElement('person-card')
export class PersonCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: PersonCardConfig;
  private _sizeTier: SizeTier = 'medium';

  private _resizeObserver?: ResizeObserver;

  static styles = cardStyles;

  static getStubConfig(): PersonCardConfig {
    return {
      person_entity: 'person.example',
      devices: [],
      size: 'auto',
      show_eta: true,
      show_last_seen: true,
      show_notification_badge: true,
      zone_styles: [],
      conditions: [],
    };
  }

  setConfig(config: PersonCardConfig): void {
    if (!config.person_entity) {
      throw new Error('person_entity is required');
    }
    this._config = {
      size: 'auto',
      show_eta: true,
      show_last_seen: true,
      show_notification_badge: true,
      devices: [],
      zone_styles: [],
      conditions: [],
      ...config,
    };
    if (this.isConnected) this._setupResizeObserver();
  }

  getCardSize(): number {
    return 3;
  }

  static getConfigElement(): HTMLElement {
    return document.createElement('person-card-editor');
  }

  connectedCallback() {
    super.connectedCallback();
    if (this._config) this._setupResizeObserver();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
  }

  private _setSizeTier(tier: SizeTier) {
    if (this._sizeTier === tier) return;
    this._sizeTier = tier;
    this.setAttribute('size-tier', tier);
    this.requestUpdate();
  }

  private _setupResizeObserver(): void {
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
    if (this._config.size === 'auto') {
      this._resizeObserver = new ResizeObserver(entries => {
        const width = entries[0]?.contentRect.width ?? 300;
        this._setSizeTier(width < 200 ? 'small' : width < 400 ? 'medium' : 'large');
      });
      this._resizeObserver.observe(this);
    } else if (this._config.size) {
      this._setSizeTier(this._config.size);
    }
  }

  private get _personState() {
    return this.hass?.states[this._config.person_entity];
  }

  private get _personZone(): string {
    return this._personState?.state ?? 'unknown';
  }

  protected updated(): void {
    if (!this._config || !this.hass) return;

    const effect: StyleEffect = this._config.conditions?.length
      ? evaluateConditions(this._config.conditions, this.hass)
      : {};
    const zoneStyle = this._config.zone_styles?.find(s => s.zone === this._personZone);

    const bg = effect.background_color ?? zoneStyle?.background_color;
    if (bg) this.style.setProperty('--pc-background', bg);
    else this.style.removeProperty('--pc-background');

    const borderColor = effect.border_color ?? zoneStyle?.border_color;
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
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  /** Format a duration from an ISO timestamp to now as a human-readable string. */
  private _formatDuration(isoString: string): string {
    if (!isoString) return '—';
    const ms = Date.now() - new Date(isoString).getTime();
    if (ms < 0) return '—';
    const totalMins = Math.floor(ms / 60_000);
    if (totalMins < 1) return '< 1m';
    if (totalMins < 60) return `${totalMins}m`;
    const hrs = Math.floor(totalMins / 60);
    const mins = totalMins % 60;
    if (hrs < 24) return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
    const days = Math.floor(hrs / 24);
    const remainHrs = hrs % 24;
    return remainHrs > 0 ? `${days}d ${remainHrs}h` : `${days}d`;
  }

  /** Renders a single device as a vertical card for the hero layout. */
  private _renderHeroDevice(device: DeviceConfig) {
    const battState = device.battery_entity ? this.hass.states[device.battery_entity] : undefined;
    const battery = battState ? parseFloat(battState.state) : NaN;
    const threshold = device.battery_threshold ?? 20;
    const battColor = isNaN(battery) ? '#888'
      : battery <= threshold ? '#f44336'
      : battery < 50 ? '#ff9800'
      : '#4caf50';
    const connState = device.connectivity_entity ? this.hass.states[device.connectivity_entity] : undefined;
    const isOnline = connState ? connState.state === 'on' : null;
    const icon = device.icon ?? 'mdi:devices';
    const label = device.name ?? device.entity.split('.')[1]?.replace(/_/g, ' ') ?? '';

    return html`
      <div class="hero-device-card">
        <div class="hero-device-icon"><ha-icon .icon=${icon}></ha-icon></div>
        <div class="hero-device-name">${label}</div>
        ${!isNaN(battery) ? html`
          <div class="hero-battery-bar">
            <div class="hero-battery-fill" style="width:${Math.min(battery, 100)}%;background:${battColor}"></div>
          </div>
          <div class="hero-battery-pct" style="color:${battColor}">${Math.round(battery)}%</div>
        ` : ''}
        ${isOnline !== null ? html`
          <div class="hero-connectivity" style="background:${isOnline ? '#4caf50' : '#f44336'}"></div>
        ` : ''}
      </div>
    `;
  }

  // ── Layout: Hero ────────────────────────────────────────────────────────────

  private _renderHero(p: RenderParams) {
    const { name, photo, personState, effect, showBadge, isStale, address, devices } = p;
    const zoneStyle = this._config.zone_styles?.find(s => s.zone === this._personZone);
    const glowColor = effect.border_color ?? zoneStyle?.border_color;
    const avatarStyle = glowColor
      ? `box-shadow: 0 0 0 4px ${glowColor}66, 0 0 32px ${glowColor}44;`
      : 'box-shadow: 0 0 0 4px rgba(255,255,255,0.15), 0 0 20px rgba(255,255,255,0.05);';
    const showLastSeen = !!(this._config.show_last_seen && personState?.last_updated);
    const visibleDevices = devices.filter(d => d.name !== '__eta__');

    return html`
      <div class="card-content">
        ${this._config.background_image ? html`<div class="card-background"></div>` : ''}

        ${showBadge ? html`
          <div style="position:absolute;top:12px;right:12px;z-index:2">
            <person-card-notification-badge
              .color=${effect.badge_color ?? '#f44336'}
              .icon=${effect.badge_icon ?? 'mdi:alert-circle'}
            ></person-card-notification-badge>
          </div>
        ` : ''}

        <!-- Avatar -->
        <div class="avatar-wrapper">
          ${photo
            ? html`<img class="avatar ${isStale ? 'stale' : ''}" src=${photo} alt=${name} style=${avatarStyle} />`
            : html`<div class="avatar-placeholder ${isStale ? 'stale' : ''}" style=${avatarStyle}><ha-icon icon="mdi:account"></ha-icon></div>`
          }
          ${isStale ? html`<div class="stale-indicator"><ha-icon .icon=${'mdi:clock-alert-outline'}></ha-icon></div>` : ''}
        </div>

        <!-- Name + Zone -->
        <div class="name">${name}</div>
        <div class="hero-zone">
          <person-card-location-badge
            .zone=${this._personZone}
            .zoneStyles=${this._config.zone_styles ?? []}
            .address=${address}
          ></person-card-location-badge>
        </div>

        <!-- Device grid -->
        ${visibleDevices.length > 0 ? html`
          <div class="hero-devices">
            ${visibleDevices.map(d => this._renderHeroDevice(d))}
          </div>
        ` : ''}

        <!-- Last seen -->
        ${showLastSeen ? html`
          <div class="footer">
            <person-card-last-seen
              .lastUpdated=${personState.last_updated}
              .format=${'relative'}
            ></person-card-last-seen>
          </div>
        ` : ''}
      </div>
    `;
  }

  // ── Layout: Stats ───────────────────────────────────────────────────────────

  private _renderStats(p: RenderParams) {
    const { name, photo, personState, effect, showBadge, isStale, address, devices } = p;
    const zoneSince = personState?.last_changed ? this._formatDuration(personState.last_changed) : '—';
    const lastSeenAgo = personState?.last_updated ? this._formatDuration(personState.last_updated) : '—';
    const visibleDevices = devices.filter(d => d.name !== '__eta__');

    return html`
      <div class="card-content">
        ${this._config.background_image ? html`<div class="card-background"></div>` : ''}

        <!-- Header -->
        <div class="header">
          <div class="avatar-wrapper">
            ${photo
              ? html`<img class="avatar ${isStale ? 'stale' : ''}" src=${photo} alt=${name} />`
              : html`<div class="avatar-placeholder ${isStale ? 'stale' : ''}"><ha-icon icon="mdi:account"></ha-icon></div>`
            }
            ${isStale ? html`<div class="stale-indicator"><ha-icon .icon=${'mdi:clock-alert-outline'}></ha-icon></div>` : ''}
          </div>
          <div class="name-zone">
            <div class="name">${name}</div>
            <person-card-location-badge
              .zone=${this._personZone}
              .zoneStyles=${this._config.zone_styles ?? []}
              .address=${address}
            ></person-card-location-badge>
            <div class="stats-since">In zone ${zoneSince}</div>
          </div>
          ${showBadge ? html`
            <person-card-notification-badge
              .color=${effect.badge_color ?? '#f44336'}
              .icon=${effect.badge_icon ?? 'mdi:alert-circle'}
            ></person-card-notification-badge>
          ` : ''}
        </div>

        <!-- Stat boxes -->
        <div class="stats-boxes">
          <div class="stats-box">
            <div class="stats-box-label">In zone</div>
            <div class="stats-box-value">${zoneSince}</div>
          </div>
          <div class="stats-box">
            <div class="stats-box-label">Last seen</div>
            <div class="stats-box-value">${lastSeenAgo}</div>
          </div>
        </div>

        <!-- Devices -->
        ${visibleDevices.length > 0 ? html`
          <div class="divider"></div>
          <div class="devices">
            ${visibleDevices.map(device => html`
              <person-card-device-tile
                .hass=${this.hass}
                .device=${device}
                .showLabels=${true}
              ></person-card-device-tile>
            `)}
          </div>
        ` : ''}
      </div>
    `;
  }

  // ── Main render ─────────────────────────────────────────────────────────────

  render() {
    if (!this._config || !this.hass) return html``;

    const personState = this._personState;
    const name = this._config.name
      ?? (personState?.attributes?.['friendly_name'] as string | undefined)
      ?? this._config.person_entity.split('.')[1].replace(/_/g, ' ');
    const photo = this._config.photo
      ?? (personState?.attributes?.['entity_picture'] as string | undefined);

    const effect: StyleEffect = this._config.conditions?.length
      ? evaluateConditions(this._config.conditions, this.hass)
      : {};

    const showBadge = this._config.show_notification_badge !== false
      && (effect.badge_color || effect.badge_icon
        ? true
        : shouldShowNotificationBadge(this.hass, this._config.devices ?? [], this._config.person_entity));

    const isSmall = this._sizeTier === 'small';
    const isLarge = this._sizeTier === 'large';
    const devices = this._config.devices ?? [];
    const lastUpdated = personState?.last_updated ?? '';
    const etaEntity = this._config.devices?.find(d => d.name === '__eta__')?.entity ?? '';

    // Stale/offline indicator
    const isStale = !!(this._config.offline_threshold && this._config.offline_threshold > 0 && personState?.last_updated)
      && ((Date.now() - new Date(personState!.last_updated).getTime()) / 60_000) > this._config.offline_threshold;

    // Geocoded address — only when outside all zones (not applicable for small)
    const address = (!isSmall && this._personZone === 'not_home' && this._config.address_entity)
      ? (() => {
          const s = this.hass.states[this._config.address_entity!];
          return (s && s.state !== 'unavailable' && s.state !== 'unknown') ? s.state : '';
        })()
      : '';

    // Dispatch to specialised layouts
    const rp: RenderParams = { name, photo, personState, effect, showBadge, isStale, address, devices };
    if (this._sizeTier === 'hero') return this._renderHero(rp);
    if (this._sizeTier === 'stats') return this._renderStats(rp);

    // ── Standard layouts (small / medium / large) ───────────────────────────
    const showEta = !!(this._config.show_eta && etaEntity);
    const showLastSeen = !!(this._config.show_last_seen && lastUpdated);

    return html`
      <div class="card-content">
        ${this._config.background_image ? html`<div class="card-background"></div>` : ''}

        <!-- Header -->
        <div class="header">
          <div class="avatar-wrapper">
            ${photo
              ? html`<img class="avatar ${isStale ? 'stale' : ''}" src=${photo} alt=${name} />`
              : html`<div class="avatar-placeholder ${isStale ? 'stale' : ''}"><ha-icon icon="mdi:account"></ha-icon></div>`
            }
            ${isStale ? html`
              <div class="stale-indicator">
                <ha-icon .icon=${'mdi:clock-alert-outline'}></ha-icon>
              </div>
            ` : ''}
          </div>
          <div class="name-zone">
            <div class="name">${name}</div>
            <person-card-location-badge
              .zone=${this._personZone}
              .zoneStyles=${this._config.zone_styles ?? []}
              .address=${address}
            ></person-card-location-badge>
          </div>
          ${showBadge ? html`
            <person-card-notification-badge
              .color=${effect.badge_color ?? '#f44336'}
              .icon=${effect.badge_icon ?? 'mdi:alert-circle'}
            ></person-card-notification-badge>
          ` : ''}
        </div>

        <!-- Devices (medium + large) -->
        ${!isSmall && devices.length > 0 ? html`
          <div class="divider"></div>
          <div class="devices">
            ${devices.filter(d => d.name !== '__eta__').map(device => html`
              <person-card-device-tile
                .hass=${this.hass}
                .device=${device}
                .showLabels=${isLarge}
              ></person-card-device-tile>
            `)}
          </div>
        ` : ''}

        <!-- Footer (large only) -->
        ${isLarge && (showEta || showLastSeen) ? html`
          <div class="divider"></div>
          <div class="footer">
            ${showEta ? html`
              <person-card-eta-display
                .hass=${this.hass}
                .etaEntity=${etaEntity}
                .personZone=${this._personZone}
              ></person-card-eta-display>
            ` : ''}
            ${showLastSeen ? html`
              <person-card-last-seen
                .lastUpdated=${lastUpdated}
                .format=${'relative'}
              ></person-card-last-seen>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'person-card': PersonCard;
  }
}
