// src/person-card-theme.ts
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { PersonCardThemeConfig } from './shared/types';
import { themeCardStyles } from './theme-styles';
import { setTheme } from './shared/theme-registry';
import './person-card-theme-editor';

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description: string; preview?: boolean }>;
  }
}
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: 'person-card-theme',
  name: 'Person Card Theme',
  description: 'Shared zone colour scheme for Person Card and Family Card.',
  preview: false,
});

@customElement('person-card-theme')
export class PersonCardTheme extends LitElement {
  @property({ attribute: false }) hass: unknown;
  private _config!: PersonCardThemeConfig;

  static styles = themeCardStyles;

  static getConfigElement(): HTMLElement {
    return document.createElement('person-card-theme-editor');
  }

  static getStubConfig(): PersonCardThemeConfig {
    return { zone_styles: [] };
  }

  setConfig(config: PersonCardThemeConfig): void {
    this._config = { ...config, zone_styles: config.zone_styles ?? [] };
    setTheme(this._config.zone_styles);
  }

  getCardSize(): number { return 1; }

  render() {
    const zones = this._config?.zone_styles ?? [];
    if (zones.length === 0) {
      return html`<div class="legend-title">Zone Legend</div><div class="legend-dots" style="color:rgba(255,255,255,0.3);font-size:0.78rem">No zones configured</div>`;
    }
    return html`
      <div class="legend-title">Zone Legend</div>
      <div class="legend-dots">
        ${zones.map(z => html`
          <div class="legend-item">
            <div class="legend-dot" style="background:${z.border_color ?? 'rgba(255,255,255,0.4)'};box-shadow:0 0 4px ${z.border_color ?? 'transparent'}66"></div>
            <span class="legend-label">${z.label ?? z.zone}</span>
          </div>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'person-card-theme': PersonCardTheme;
  }
}
