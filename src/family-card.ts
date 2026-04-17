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
import { resolveZoneStyle, getZoneLabel, getZoneIcon, hexToRgba } from './shared/zone-utils';
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

  static getStubConfig(hass?: HomeAssistant): FamilyCardConfig {
    // Populate the preview with real person entities so the card looks alive
    const people = hass
      ? Object.keys(hass.states)
          .filter(id => id.startsWith('person.'))
          .slice(0, 6)
          .map(entity => ({ entity }))
      : [];
    return { people, density: 'detailed', show_devices: true, show_last_seen: true, show_notification_badge: true };
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
      this.style.setProperty('--pc-glow-color', hexToRgba(borderColor, 0.25));
    } else {
      this.style.removeProperty('--pc-border-color');
      this.style.removeProperty('--pc-border-width');
      this.style.removeProperty('--pc-glow-color');
    }
    if (this._config.background_image) {
      this.style.setProperty('--pc-background-image', `url('${this._config.background_image}')`);
    } else {
      this.style.removeProperty('--pc-background-image');
    }
    // Apply card theme as HTML attribute so :host([card-theme="..."]) CSS selectors fire
    this.setAttribute('card-theme', this._config.card_theme ?? 'default');
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

  // ── Summary & grouping helpers ───────────────────────────────────────────

  /** People sorted into zone buckets: home first, then by occupancy desc. */
  private _getZoneGroups(people: FamilyPersonConfig[]): Array<{ zone: string; people: FamilyPersonConfig[] }> {
    const map = new Map<string, FamilyPersonConfig[]>();
    for (const p of people) {
      const z = this._getPersonZone(p);
      if (!map.has(z)) map.set(z, []);
      map.get(z)!.push(p);
    }
    return Array.from(map.entries())
      .sort(([zA, pA], [zB, pB]) => {
        const nA = zA.toLowerCase().replace(/\s+/g, '_');
        const nB = zB.toLowerCase().replace(/\s+/g, '_');
        if (nA === 'home') return -1;
        if (nB === 'home') return 1;
        return pB.length - pA.length;
      })
      .map(([zone, people]) => ({ zone, people }));
  }

  private _renderSummary(people: FamilyPersonConfig[]) {
    const zoneStyles = this._zoneStyles();
    const counts = new Map<string, number>();
    for (const p of people) {
      const z = this._getPersonZone(p);
      counts.set(z, (counts.get(z) ?? 0) + 1);
    }
    const items = Array.from(counts.entries())
      .sort(([zA], [zB]) => {
        const nA = zA.toLowerCase().replace(/\s+/g, '_');
        const nB = zB.toLowerCase().replace(/\s+/g, '_');
        if (nA === 'home') return -1;
        if (nB === 'home') return 1;
        return counts.get(zB)! - counts.get(zA)!;
      });

    return html`
      <div class="summary-bar">
        ${items.map(([zone, count]) => {
          const style = resolveZoneStyle(zone, zoneStyles);
          const color = style?.border_color ?? 'rgba(255,255,255,0.3)';
          const label = getZoneLabel(zone, zoneStyles);
          return html`
            <div class="summary-item">
              <div class="summary-dot"
                style="background:${color};box-shadow:0 0 5px ${color}88">
              </div>
              <span class="summary-count">${count}</span>
              <span class="summary-label">${label}</span>
            </div>
          `;
        })}
      </div>
    `;
  }

  private _renderZoneGroup(zone: string, groupPeople: FamilyPersonConfig[], density: string) {
    const zoneStyles = this._zoneStyles();
    const style = resolveZoneStyle(zone, zoneStyles);
    const color = style?.border_color ?? 'rgba(255,255,255,0.2)';
    const icon = getZoneIcon(zone, zoneStyles);
    const label = getZoneLabel(zone, zoneStyles);
    const isMini = density === 'mini';

    return html`
      <div class="zone-group">
        <div class="zone-group-header" style="--group-accent:${color}">
          <ha-icon class="group-icon" .icon=${icon} style="color:${color}"></ha-icon>
          <span class="group-label">${label}</span>
          <span class="group-count">${groupPeople.length}</span>
        </div>
        <div class="person-rows ${isMini ? 'mini-grid' : ''}">
          ${groupPeople.map(p => this._renderRow(p, density))}
        </div>
      </div>
    `;
  }

  private _renderRow(person: FamilyPersonConfig, density: string) {
    if (density === 'compact') return this._renderCompactRow(person);
    if (density === 'mini') return this._renderMiniRow(person);
    return this._renderDetailedRow(person);
  }

  // ── Main render ───────────────────────────────────────────────────────────

  render() {
    if (!this._config || !this.hass) return html``;
    const people = resolvePersonConfig(this.hass, this._config);
    const density = this._config.density ?? 'detailed';
    const groupByZone = this._config.group_by_zone ?? false;
    const showSummary = this._config.show_summary ?? false;
    const isMini = density === 'mini';

    const body = groupByZone
      ? html`${this._getZoneGroups(people).map(({ zone, people: gp }) =>
          this._renderZoneGroup(zone, gp, density))}`
      : html`
          <div class="person-rows ${isMini ? 'mini-grid' : ''}">
            ${people.map(p => this._renderRow(p, density))}
          </div>
        `;

    return html`
      <div class="card-content">
        ${this._config.background_image ? html`<div class="card-background"></div>` : ''}
        ${showSummary ? this._renderSummary(people) : ''}
        ${body}
      </div>
    `;
  }

  // Detailed tier — implemented in Task 16
  private _renderDetailedRow(person: FamilyPersonConfig) {
    const zone = this._getPersonZone(person);
    const zoneStyles = this._zoneStyles();
    const zoneStyle = resolveZoneStyle(zone, zoneStyles);
    const isStale = this._isPersonStale(person);
    const showBadge = this._personShowsBadge(person);
    const devices = person.devices ?? [];
    const isExpanded = this._expandedEntity === person.entity;
    const personState = this.hass.states[person.entity];
    const zoneDuration = personState?.last_changed ? formatDuration(personState.last_changed) : '';
    const accentColor = zoneStyle?.border_color ?? 'rgba(255,255,255,0.1)';
    const address = (zone === 'not_home' && person.address_entity)
      ? (() => {
          const s = this.hass.states[person.address_entity!];
          return (s && s.state !== 'unavailable' && s.state !== 'unknown') ? s.state : '';
        })()
      : '';

    return html`
      <div class="person-row" style="--row-accent:${accentColor}"
        @click=${() => { this._expandedEntity = isExpanded ? null : person.entity; }}>
        <div class="person-row-inner">
          ${this._renderAvatar(person, isStale)}
          <div class="person-info">
            <div class="person-name">${this._getPersonName(person)}</div>
            <div class="person-zone" style="display:flex;align-items:center;gap:6px">
              <person-card-location-badge .zone=${zone} .zoneStyles=${zoneStyles} .address=${address}></person-card-location-badge>
              ${zoneDuration ? html`<span style="font-size:0.7rem;color:rgba(255,255,255,0.35)">· ${zoneDuration}</span>` : ''}
            </div>
          </div>
          <div class="person-row-meta">
            ${devices.slice(0, 3).map(device => {
              const battery = getBatteryLevel(this.hass, device);
              const threshold = device.battery_threshold ?? 20;
              const color = battery !== null
                ? (battery <= threshold ? '#f44336' : battery < 50 ? '#ff9800' : '#4caf50')
                : '#888';
              return battery !== null ? html`
                <div class="device-summary">
                  <ha-icon .icon=${device.icon ?? 'mdi:devices'} style="--mdc-icon-size:12px;color:rgba(255,255,255,0.4)"></ha-icon>
                  <span class="device-summary-pct" style="color:${color}">${Math.round(battery)}%</span>
                </div>` : '';
            })}
            ${showBadge ? html`<person-card-notification-badge color="#f44336" icon="mdi:alert-circle"></person-card-notification-badge>` : ''}
            <span class="chevron ${isExpanded ? 'open' : ''}">▾</span>
          </div>
        </div>

        ${isExpanded ? html`
          <div class="expanded-panel" @click=${(e: Event) => e.stopPropagation()}>
            ${devices.length > 0 ? html`
              <div class="device-list">
                ${devices.map(device => html`
                  <person-card-device-tile
                    .hass=${this.hass}
                    .device=${device}
                    .showLabels=${true}
                  ></person-card-device-tile>
                `)}
              </div>
            ` : ''}
            <div class="expanded-footer">
              ${(person.show_last_seen ?? this._config.show_last_seen) && personState?.last_updated ? html`
                <person-card-last-seen .lastUpdated=${personState.last_updated} .format=${'relative'}></person-card-last-seen>
              ` : ''}
              ${(person.show_eta ?? this._config.show_eta) && person.eta_entity ? html`
                <person-card-eta-display
                  .hass=${this.hass}
                  .etaEntity=${person.eta_entity}
                  .personZone=${zone}
                ></person-card-eta-display>
              ` : ''}
            </div>
            <div class="view-full-link"
              @click=${() => {
                const action = person.tap_action;
                if (action && 'navigation_path' in action) {
                  history.pushState(null, '', action.navigation_path);
                  window.dispatchEvent(new PopStateEvent('popstate'));
                } else {
                  this.dispatchEvent(new CustomEvent('hass-more-info', {
                    detail: { entityId: person.entity },
                    bubbles: true,
                    composed: true,
                  }));
                }
              }}>
              View full card →
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'family-card': FamilyCard;
  }
}
