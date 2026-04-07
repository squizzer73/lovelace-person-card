import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ZoneStyleConfig } from '../types';

@customElement('person-card-location-badge')
export class LocationBadge extends LitElement {
  @property() zone = '';
  @property({ type: Array }) zoneStyles: ZoneStyleConfig[] = [];
  @property() address = '';

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      gap: 4px;
      min-width: 0;
      overflow: hidden;
    }
    ha-icon {
      --mdc-icon-size: 16px;
      color: rgba(255,255,255,0.7);
      flex-shrink: 0;
    }
    .zone-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: rgba(255,255,255,0.8);
      text-transform: capitalize;
      letter-spacing: 0.04em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
    }
    /* Ticker for long addresses */
    .label-ticker {
      overflow: hidden;
      min-width: 0;
      flex: 1;
    }
    .ticker-inner {
      display: inline-block;
      white-space: nowrap;
      font-size: 0.85rem;
      font-weight: 600;
      color: rgba(255,255,255,0.8);
      letter-spacing: 0.04em;
      animation: ticker-scroll 14s linear infinite;
    }
    @keyframes ticker-scroll {
      0%, 12% { transform: translateX(0); }
      88%, 100% { transform: translateX(-50%); }
    }
  `;

  private get zoneStyle(): ZoneStyleConfig | undefined {
    return this.zoneStyles.find(s => s.zone === this.zone);
  }

  private get displayLabel(): string {
    const style = this.zoneStyle;
    if (style?.label) return style.label;
    if (this.zone === 'not_home') return this.address || 'Away';
    if (this.zone === 'unknown') return 'Unknown';
    return this.zone.replace(/_/g, ' ');
  }

  private get icon(): string {
    const style = this.zoneStyle;
    if (style?.icon) return style.icon;
    if (this.zone === 'home') return 'mdi:home';
    if (this.zone === 'not_home') return this.address ? 'mdi:map-marker' : 'mdi:map-marker-off';
    if (this.zone === 'unknown') return 'mdi:help-circle';
    return 'mdi:map-marker';
  }

  render() {
    const label = this.displayLabel;
    // Use ticker animation for addresses long enough to potentially overflow
    const useTicker = this.zone === 'not_home' && !!this.address && label.length >= 20;

    return html`
      <ha-icon .icon=${this.icon}></ha-icon>
      ${useTicker ? html`
        <div class="label-ticker">
          <span class="ticker-inner">${label}&nbsp;&nbsp;&nbsp;&nbsp;${label}</span>
        </div>
      ` : html`
        <span class="zone-label">${label}</span>
      `}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'person-card-location-badge': LocationBadge;
  }
}
