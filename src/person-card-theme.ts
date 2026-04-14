// src/person-card-theme.ts
import { LitElement, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { PersonCardThemeConfig, ZoneStyleConfig, ThemeCardDisplayStyle } from './shared/types';
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

const STYLE_TITLES: Record<ThemeCardDisplayStyle, string> = {
  legend:  'Zone Legend',
  compact: 'Zone Legend',
  pills:   'Zone Legend',
  list:    'Zone Legend',
  grid:    'Zone Legend',
  hidden:  '',
};

@customElement('person-card-theme')
export class PersonCardTheme extends LitElement {
  @property({ attribute: false }) hass: unknown;
  private _config!: PersonCardThemeConfig;

  static styles = themeCardStyles;

  static getConfigElement(): HTMLElement {
    return document.createElement('person-card-theme-editor');
  }

  static getStubConfig(): PersonCardThemeConfig {
    return { zone_styles: [], display_style: 'legend' };
  }

  setConfig(config: PersonCardThemeConfig): void {
    this._config = { ...config, zone_styles: config.zone_styles ?? [] };
    setTheme(this._config.zone_styles);
    // Reflect hidden class on host so CSS can collapse the card entirely
    this.classList.toggle('style-hidden', this._config.display_style === 'hidden');
  }

  getCardSize(): number {
    return this._config?.display_style === 'hidden' ? 0 : 1;
  }

  // ── per-style renderers ───────────────────────────────────────────────────

  private _renderLegend(zones: ZoneStyleConfig[]): TemplateResult {
    return html`
      <div class="legend-items">
        ${zones.map(z => html`
          <div class="legend-item">
            <div class="legend-dot"
              style="background:${z.border_color ?? 'rgba(255,255,255,0.4)'};
                     box-shadow:0 0 4px ${z.border_color ?? 'transparent'}66">
            </div>
            <span class="legend-label">${z.label ?? z.zone}</span>
          </div>
        `)}
      </div>
    `;
  }

  private _renderCompact(zones: ZoneStyleConfig[]): TemplateResult {
    return html`
      <div class="compact-items">
        ${zones.map(z => html`
          <div class="compact-item">
            <div class="compact-dot"
              style="background:${z.border_color ?? 'rgba(255,255,255,0.4)'}">
            </div>
            <span class="compact-label">${z.label ?? z.zone}</span>
          </div>
        `)}
      </div>
    `;
  }

  private _renderPills(zones: ZoneStyleConfig[]): TemplateResult {
    return html`
      <div class="pills-items">
        ${zones.map(z => {
          const bg = z.background_color ?? 'rgba(255,255,255,0.08)';
          const border = z.border_color ?? 'rgba(255,255,255,0.2)';
          return html`
            <div class="pill" style="background:${bg};border-color:${border}">
              <div class="pill-dot" style="background:${border}"></div>
              <span>${z.label ?? z.zone}</span>
            </div>
          `;
        })}
      </div>
    `;
  }

  private _renderList(zones: ZoneStyleConfig[]): TemplateResult {
    return html`
      <div class="list-items">
        ${zones.map(z => html`
          <div class="list-item"
            style="border-left-color:${z.border_color ?? 'rgba(255,255,255,0.2)'}">
            <div class="list-swatch"
              style="background:${z.border_color ?? 'rgba(255,255,255,0.4)'}">
            </div>
            <ha-icon class="list-icon"
              .icon=${z.icon ?? 'mdi:map-marker'}
              style="color:${z.border_color ?? 'rgba(255,255,255,0.5)'}">
            </ha-icon>
            <span class="list-label">${z.label ?? z.zone}</span>
          </div>
        `)}
      </div>
    `;
  }

  private _renderGrid(zones: ZoneStyleConfig[]): TemplateResult {
    return html`
      <div class="grid-items">
        ${zones.map(z => {
          const bg = z.background_color ?? 'rgba(255,255,255,0.06)';
          const border = z.border_color ?? 'rgba(255,255,255,0.2)';
          return html`
            <div class="grid-item" style="background:${bg};border-color:${border}">
              <ha-icon class="grid-icon"
                .icon=${z.icon ?? 'mdi:map-marker'}
                style="color:${border}">
              </ha-icon>
              <span class="grid-label">${z.label ?? z.zone}</span>
            </div>
          `;
        })}
      </div>
    `;
  }

  // ── main render ───────────────────────────────────────────────────────────

  render() {
    const style = this._config?.display_style ?? 'legend';
    if (style === 'hidden') return html``;

    const zones = this._config?.zone_styles ?? [];
    const title = STYLE_TITLES[style];

    const empty = html`
      <div class="section-title">${title}</div>
      <div style="color:rgba(255,255,255,0.3);font-size:0.78rem">No zones configured</div>
    `;

    if (zones.length === 0) return empty;

    const body: TemplateResult = style === 'compact' ? this._renderCompact(zones)
      : style === 'pills'   ? this._renderPills(zones)
      : style === 'list'    ? this._renderList(zones)
      : style === 'grid'    ? this._renderGrid(zones)
      : this._renderLegend(zones);

    return html`
      <div class="section-title">${title}</div>
      ${body}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'person-card-theme': PersonCardTheme;
  }
}
