// src/family-card.ts
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { FamilyCardConfig, FamilyPersonConfig, StyleEffect } from './shared/types';
import { familyCardStyles } from './family-styles';
import { resolvePersonConfig } from './shared/family-card-utils';
import { resolveZoneStyles, THEME_EVENT } from './shared/theme-registry';
import { evaluateConditions } from './shared/condition-engine';
import { getBatteryLevel, getConnectivity, shouldShowNotificationBadge } from './shared/ha-helpers';
import { formatDuration } from './shared/format-utils';
import { resolveZoneStyle } from './shared/zone-utils';
import './components/device-tile';
import './components/location-badge';
import './components/notification-badge';
import './components/last-seen';
import './components/eta-display';
import './family-card-editor';

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description: string; preview?: boolean }>;
  }
}
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: 'family-card',
  name: 'Family Card',
  description: 'At-a-glance status overview for multiple people.',
  preview: true,
});

@customElement('family-card')
export class FamilyCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: FamilyCardConfig;
  @state() private _expandedEntity: string | null = null;

  static styles = familyCardStyles;

  static getStubConfig(): FamilyCardConfig {
    return { people: [], density: 'detailed', show_devices: true, show_last_seen: true, show_notification_badge: true };
  }

  static getConfigElement(): HTMLElement {
    return document.createElement('family-card-editor');
  }

  setConfig(config: FamilyCardConfig): void {
    this._config = {
      density: 'detailed',
      show_devices: true,
      show_last_seen: true,
      show_eta: true,
      show_notification_badge: true,
      zone_styles: [],
      conditions: [],
      ...config,
    };
    this.setAttribute('density', this._config.density ?? 'detailed');
  }

  getCardSize(): number { return 4; }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(THEME_EVENT, this._onThemeUpdated);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(THEME_EVENT, this._onThemeUpdated);
  }

  private _onThemeUpdated = () => { this.requestUpdate(); };

  protected updated(): void {
    if (!this._config || !this.hass) return;
    const effect: StyleEffect = this._config.conditions?.length
      ? evaluateConditions(this._config.conditions, this.hass) : {};
    const bg = effect.background_color;
    if (bg) this.style.setProperty('--pc-background', bg);
    else this.style.removeProperty('--pc-background');
    const borderColor = effect.border_color;
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

  private _zoneStyles() {
    return resolveZoneStyles(this._config.zone_styles ?? []);
  }

  private _getPersonName(person: FamilyPersonConfig): string {
    if (person.name) return person.name;
    const state = this.hass.states[person.entity];
    return (state?.attributes?.['friendly_name'] as string | undefined)
      ?? person.entity.split('.')[1].replace(/_/g, ' ');
  }

  private _getPersonPhoto(person: FamilyPersonConfig): string | undefined {
    if (person.photo) return person.photo;
    return this.hass.states[person.entity]?.attributes?.['entity_picture'] as string | undefined;
  }

  private _getPersonZone(person: FamilyPersonConfig): string {
    return this.hass.states[person.entity]?.state ?? 'unknown';
  }

  private _isPersonStale(person: FamilyPersonConfig): boolean {
    const threshold = person.offline_threshold ?? this._config.offline_threshold;
    if (!threshold || threshold <= 0) return false;
    const lastUpdated = this.hass.states[person.entity]?.last_updated;
    if (!lastUpdated) return false;
    return ((Date.now() - new Date(lastUpdated).getTime()) / 60_000) > threshold;
  }

  private _personShowsBadge(person: FamilyPersonConfig): boolean {
    if (this._config.show_notification_badge === false) return false;
    if (person.show_notification_badge === false) return false;
    return shouldShowNotificationBadge(this.hass, person.devices ?? [], person.entity);
  }

  private _renderAvatar(person: FamilyPersonConfig, isStale: boolean) {
    const photo = this._getPersonPhoto(person);
    const name = this._getPersonName(person);
    return photo
      ? html`<img class="avatar ${isStale ? 'stale' : ''}" src=${photo} alt=${name} />`
      : html`<div class="avatar-placeholder ${isStale ? 'stale' : ''}"><ha-icon icon="mdi:account"></ha-icon></div>`;
  }

  private _renderCompactRow(person: FamilyPersonConfig) {
    const zone = this._getPersonZone(person);
    const zoneStyles = this._zoneStyles();
    const zoneStyle = resolveZoneStyle(zone, zoneStyles);
    const isStale = this._isPersonStale(person);
    const showBadge = this._personShowsBadge(person);
    const devices = person.devices ?? [];
    const batteries = devices.map(d => getBatteryLevel(this.hass, d)).filter(b => b !== null) as number[];
    const worstBattery = batteries.length > 0 ? Math.min(...batteries) : null;
    const dotColor = worstBattery !== null && worstBattery <= (devices[0]?.battery_threshold ?? 20)
      ? '#f44336' : worstBattery !== null && worstBattery < 50 ? '#ff9800' : '#4caf50';

    return html`
      <div class="person-row" style="--row-accent:${zoneStyle?.border_color ?? 'rgba(255,255,255,0.1)'}">
        <div class="person-row-inner">
          ${this._renderAvatar(person, isStale)}
          <div class="person-info">
            <div class="person-name">${this._getPersonName(person)}</div>
            <div class="person-zone">
              <person-card-location-badge
                .zone=${zone}
                .zoneStyles=${zoneStyles}
              ></person-card-location-badge>
            </div>
          </div>
          <div class="person-row-meta">
            ${worstBattery !== null ? html`<div class="status-dot" style="background:${dotColor}"></div>` : ''}
            ${showBadge ? html`<person-card-notification-badge color="#f44336" icon="mdi:alert-circle"></person-card-notification-badge>` : ''}
          </div>
        </div>
      </div>
    `;
  }

  private _renderMiniRow(person: FamilyPersonConfig) {
    const zone = this._getPersonZone(person);
    const zoneStyles = this._zoneStyles();
    const zoneStyle = resolveZoneStyle(zone, zoneStyles);
    const isStale = this._isPersonStale(person);
    const showBadge = this._personShowsBadge(person);
    const devices = person.devices ?? [];

    return html`
      <div class="person-row" style="--row-accent:${zoneStyle?.border_color ?? 'rgba(255,255,255,0.1)'}">
        <div class="person-row-inner">
          ${this._renderAvatar(person, isStale)}
          <div class="person-info">
            <div class="person-name">${this._getPersonName(person)}</div>
            <div class="person-zone">
              <person-card-location-badge .zone=${zone} .zoneStyles=${zoneStyles}></person-card-location-badge>
            </div>
          </div>
          <div class="person-row-meta">
            ${devices.slice(0, 3).map(device => {
              const battery = getBatteryLevel(this.hass, device);
              const threshold = device.battery_threshold ?? 20;
              const color = battery !== null
                ? (battery <= threshold ? '#f44336' : battery < 50 ? '#ff9800' : '#4caf50')
                : '#888';
              return html`
                <div class="device-summary">
                  <ha-icon .icon=${device.icon ?? 'mdi:devices'} style="--mdc-icon-size:14px;color:rgba(255,255,255,0.5)"></ha-icon>
                  ${battery !== null ? html`<span class="device-summary-pct" style="color:${color}">${Math.round(battery)}%</span>` : ''}
                  <div class="status-dot" style="background:${getConnectivity(this.hass, device) === 'online' ? '#4caf50' : '#f44336'}"></div>
                </div>
              `;
            })}
            ${showBadge ? html`<person-card-notification-badge color="#f44336" icon="mdi:alert-circle"></person-card-notification-badge>` : ''}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    if (!this._config || !this.hass) return html``;
    const people = resolvePersonConfig(this.hass, this._config);
    const density = this._config.density ?? 'detailed';

    return html`
      <div class="card-content">
        ${this._config.background_image ? html`<div class="card-background"></div>` : ''}
        <div class="person-rows">
          ${people.map(person => {
            if (density === 'compact') return this._renderCompactRow(person);
            if (density === 'mini') return this._renderMiniRow(person);
            return this._renderDetailedRow(person);
          })}
        </div>
      </div>
    `;
  }

  // Detailed tier — implemented in Task 16
  private _renderDetailedRow(_person: FamilyPersonConfig) {
    return html`<!-- detailed tier: Task 16 -->`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'family-card': FamilyCard;
  }
}
