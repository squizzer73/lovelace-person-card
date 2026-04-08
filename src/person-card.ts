import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { PersonCardConfig, SizeTier, StyleEffect, ZoneStyleConfig } from './types';
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

    const isLarge = this._sizeTier === 'large';
    const isSmall = this._sizeTier === 'small';
    const devices = this._config.devices ?? [];
    const lastUpdated = personState?.last_updated ?? '';
    const etaEntity = this._config.devices?.find(d => d.name === '__eta__')?.entity ?? '';

    // Stale/offline indicator
    const isStale = !!(this._config.offline_threshold && this._config.offline_threshold > 0 && personState?.last_updated)
      && ((Date.now() - new Date(personState!.last_updated).getTime()) / 60_000) > this._config.offline_threshold;

    // Geocoded address — only on medium/large, only when outside all zones
    const address = (!isSmall && this._personZone === 'not_home' && this._config.address_entity)
      ? (() => {
          const s = this.hass.states[this._config.address_entity!];
          return (s && s.state !== 'unavailable' && s.state !== 'unknown') ? s.state : '';
        })()
      : '';

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
