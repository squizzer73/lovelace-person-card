import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ZoneStyleConfig } from '../types';

@customElement('person-card-location-badge')
export class LocationBadge extends LitElement {
  @property() zone = '';
  @property({ type: Array }) zoneStyles: ZoneStyleConfig[] = [];

  static styles = css`
    :host { display: inline-flex; align-items: center; gap: 4px; }
    .zone-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: rgba(255,255,255,0.8);
      text-transform: capitalize;
      letter-spacing: 0.04em;
    }
    ha-icon {
      --mdc-icon-size: 16px;
      color: rgba(255,255,255,0.7);
    }
  `;

  private get zoneStyle(): ZoneStyleConfig | undefined {
    return this.zoneStyles.find(s => s.zone === this.zone);
  }

  private get displayLabel(): string {
    const style = this.zoneStyle;
    if (style?.label) return style.label;
    if (this.zone === 'not_home') return 'Away';
    if (this.zone === 'unknown') return 'Unknown';
    return this.zone;
  }

  private get icon(): string {
    const style = this.zoneStyle;
    if (style?.icon) return style.icon;
    if (this.zone === 'home') return 'mdi:home';
    if (this.zone === 'not_home') return 'mdi:map-marker-off';
    if (this.zone === 'unknown') return 'mdi:help-circle';
    return 'mdi:map-marker';
  }

  render() {
    return html`
      <ha-icon .icon=${this.icon}></ha-icon>
      <span class="zone-label">${this.displayLabel}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'person-card-location-badge': LocationBadge;
  }
}
