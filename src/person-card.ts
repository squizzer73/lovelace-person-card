import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { PersonCardConfig, SizeTier, StyleEffect } from './types';
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
  @state() private _sizeTier: SizeTier = 'medium';

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
  }

  getCardSize(): number {
    return 3;
  }

  static getConfigElement(): HTMLElement {
    return document.createElement('person-card-editor');
  }

  connectedCallback() {
    super.connectedCallback();
    if (this._config?.size === 'auto') {
      this._resizeObserver = new ResizeObserver(entries => {
        const width = entries[0]?.contentRect.width ?? 300;
        this._sizeTier = width < 200 ? 'small' : width < 400 ? 'medium' : 'large';
      });
      this._resizeObserver.observe(this);
    } else if (this._config?.size) {
      this._sizeTier = this._config.size;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
  }

  private get _personState() {
    return this.hass?.states[this._config.person_entity];
  }

  private get _personZone(): string {
    return this._personState?.state ?? 'unknown';
  }

  private get _conditionEffect(): StyleEffect {
    if (!this._config.conditions?.length) return {};
    return evaluateConditions(this._config.conditions, this.hass);
  }

  private get _zoneStyle() {
    return this._config.zone_styles?.find(s => s.zone === this._personZone);
  }

  private get _showBadge(): boolean {
    if (!this._config.show_notification_badge) return false;
    const effect = this._conditionEffect;
    if (effect.badge_color || effect.badge_icon) return true;
    return shouldShowNotificationBadge(
      this.hass,
      this._config.devices ?? [],
      this._config.person_entity,
    );
  }

  private _hostStyles(): Record<string, string> {
    const effect = this._conditionEffect;
    const zoneStyle = this._zoneStyle;
    const styles: Record<string, string> = {};

    const bg = effect.background_color ?? zoneStyle?.background_color;
    if (bg) styles['--person-card-background'] = bg;

    const borderColor = effect.border_color ?? zoneStyle?.border_color;
    if (borderColor) {
      styles['--pc-border-color'] = borderColor;
      styles['--pc-border-width'] = `${effect.border_width ?? 2}px`;
    }

    if (this._config.background_image) {
      styles['--pc-background-image'] = `url('${this._config.background_image}')`;
    }

    return styles;
  }

  render() {
    if (!this._config || !this.hass) return html``;

    const personState = this._personState;
    const name = this._config.name
      ?? (personState?.attributes?.['friendly_name'] as string | undefined)
      ?? this._config.person_entity.split('.')[1].replace(/_/g, ' ');
    const photo = this._config.photo
      ?? (personState?.attributes?.['entity_picture'] as string | undefined);
    const effect = this._conditionEffect;
    const isLarge = this._sizeTier === 'large';
    const isSmall = this._sizeTier === 'small';
    const devices = this._config.devices ?? [];
    const lastUpdated = personState?.last_updated ?? '';
    const etaEntity = this._config.devices?.find(d => d.name === '__eta__')?.entity ?? '';

    return html`
      <div style=${styleMap(this._hostStyles())} class="card-content" size-tier=${this._sizeTier}>
        ${this._config.background_image ? html`<div class="card-background"></div>` : ''}

        <!-- Header -->
        <div class="header">
          ${photo
            ? html`<img class="avatar" src=${photo} alt=${name} />`
            : html`<div class="avatar-placeholder"><ha-icon icon="mdi:account"></ha-icon></div>`
          }
          <div class="name-zone">
            <div class="name">${name}</div>
            <person-card-location-badge
              .zone=${this._personZone}
              .zoneStyles=${this._config.zone_styles ?? []}
            ></person-card-location-badge>
          </div>
          ${this._showBadge ? html`
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
        ${isLarge ? html`
          <div class="divider"></div>
          <div class="footer">
            ${this._config.show_eta && etaEntity ? html`
              <person-card-eta-display
                .hass=${this.hass}
                .etaEntity=${etaEntity}
                .personZone=${this._personZone}
              ></person-card-eta-display>
            ` : ''}
            ${this._config.show_last_seen && lastUpdated ? html`
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
