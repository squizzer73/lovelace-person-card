// src/person-card-theme-editor.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { PersonCardThemeConfig } from './shared/types';
import './components/zone-editor';

@customElement('person-card-theme-editor')
export class PersonCardThemeEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  private _config!: PersonCardThemeConfig;

  static styles = css`
    .row { margin-bottom: 12px; }
    .row label { display: block; font-size: 0.8rem; color: var(--secondary-text-color); margin-bottom: 4px; }
  `;

  setConfig(config: PersonCardThemeConfig) {
    this._config = config;
  }

  private _fire(config: PersonCardThemeConfig) {
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }));
    this._config = config;
  }

  render() {
    if (!this._config) return html``;
    return html`
      <div class="row">
        <label>Zone Styles</label>
        <person-card-zone-editor
          .hass=${this.hass}
          .zoneStyles=${this._config.zone_styles ?? []}
          @zone-styles-changed=${(e: CustomEvent) => this._fire({ ...this._config, zone_styles: e.detail.zoneStyles })}
        ></person-card-zone-editor>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'person-card-theme-editor': PersonCardThemeEditor;
  }
}
