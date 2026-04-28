// src/family-grid-card.ts
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { FamilyGridCardConfig, FamilyPersonConfig } from './shared/types';
import { familyGridStyles } from './family-grid-styles';
import { resolveZoneStyles, THEME_EVENT } from './shared/theme-registry';
import { resolveZoneStyle, getZoneLabel, getZoneIcon, hexToRgba } from './shared/zone-utils';
import { getRingSize, getInitials, countSummary } from './shared/family-grid-utils';
// import './family-grid-card-editor'; // added in Task 4

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description: string; preview?: boolean }>;
  }
}
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: 'family-grid-card',
  name: 'Family Grid Card',
  description: 'Grid of family members with animated zone rings — readable from across a room.',
  preview: true,
});

@customElement('family-grid-card')
export class FamilyGridCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  private _config!: FamilyGridCardConfig;

  static styles = familyGridStyles;

  static getStubConfig(hass?: HomeAssistant): FamilyGridCardConfig {
    const people = hass
      ? Object.keys(hass.states)
          .filter(id => id.startsWith('person.'))
          .slice(0, 6)
          .map(entity => ({ entity }))
      : [];
    return { people, columns: 3 };
  }

  static getConfigElement(): HTMLElement {
    return document.createElement('family-grid-card-editor');
  }

  setConfig(config: FamilyGridCardConfig): void {
    this._config = { columns: 3, zone_styles: [], ...config };
  }

  getCardSize(): number { return 3; }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(THEME_EVENT, this._onThemeUpdated);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(THEME_EVENT, this._onThemeUpdated);
  }

  private _onThemeUpdated = () => { this.requestUpdate(); };

  private _zoneStyles() {
    return resolveZoneStyles(this._config.zone_styles ?? []);
  }

  private _renderTile(person: FamilyPersonConfig) {
    const zone = this.hass.states[person.entity]?.state ?? 'unknown';
    const zoneStyles = this._zoneStyles();
    const zoneStyle = resolveZoneStyle(zone, zoneStyles);
    const personState = this.hass.states[person.entity];
    const picture = personState?.attributes?.entity_picture as string | undefined;
    const friendlyName = personState?.attributes?.friendly_name as string | undefined;
    const displayName = person.name || friendlyName || person.entity;
    const initials = getInitials(person.name || friendlyName, person.entity);

    const borderColor = zoneStyle?.border_color;
    const ringColor = borderColor ?? 'rgba(255,255,255,0.25)';
    const ringGlow = borderColor ? hexToRgba(borderColor, 0.3) : 'rgba(255,255,255,0.1)';
    const ringBg = borderColor ? hexToRgba(borderColor, 0.2) : '#2d2d50';
    const ringBgBadge = borderColor ? hexToRgba(borderColor, 0.18) : 'rgba(255,255,255,0.06)';
    const ringBorderBadge = borderColor ? hexToRgba(borderColor, 0.4) : 'rgba(255,255,255,0.15)';
    const speed = zone === 'home' ? '3s' : '1.8s';

    const tileStyle = [
      `--ring-color:${ringColor}`,
      `--ring-glow:${ringGlow}`,
      `--ring-bg:${ringBg}`,
      `--ring-bg-badge:${ringBgBadge}`,
      `--ring-border-badge:${ringBorderBadge}`,
      `--fgc-speed:${speed}`,
    ].join(';');

    const label = getZoneLabel(zone, zoneStyles, '');
    const icon = getZoneIcon(zone, zoneStyles, false);

    return html`
      <div class="tile" style=${tileStyle}>
        <div class="ring-wrap">
          ${picture
            ? html`<img class="avatar" src=${picture} alt=${displayName}>`
            : html`<div class="avatar-initials">${initials}</div>`
          }
        </div>
        <div class="tile-name">${displayName}</div>
        <div class="tile-badge">
          <ha-icon .icon=${icon}></ha-icon>
          ${label}
        </div>
      </div>
    `;
  }

  render() {
    if (!this._config || !this.hass) return html``;

    const people = this._config.people ?? [];
    const cols = Math.min(6, Math.max(1, this._config.columns ?? 3));
    const ringSize = getRingSize(cols);
    const avatarSize = ringSize - 12;
    const initialSize = Math.round(avatarSize * 0.35);

    const gridStyle = [
      `--fgc-cols:${cols}`,
      `--fgc-ring-size:${ringSize}px`,
      `--fgc-avatar-size:${avatarSize}px`,
      `--fgc-initial-size:${initialSize}px`,
    ].join(';');

    const showHeader = !!this._config.title;
    const summary = showHeader ? countSummary(people, this.hass) : null;

    return html`
      <div class="card-content">
        ${showHeader ? html`
          <div class="card-header">
            <span class="card-title">${this._config.title}</span>
            <span class="card-summary">${summary!.home} home · ${summary!.away} away</span>
          </div>
        ` : ''}
        <div class="person-grid" style=${gridStyle}>
          ${people.map(p => this._renderTile(p))}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'family-grid-card': FamilyGridCard;
  }
}
