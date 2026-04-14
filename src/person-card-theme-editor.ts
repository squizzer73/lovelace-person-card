// src/person-card-theme-editor.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { PersonCardThemeConfig, ThemeCardDisplayStyle } from './shared/types';
import './components/zone-editor';

const DISPLAY_STYLES: Array<{ value: ThemeCardDisplayStyle; label: string; description: string }> = [
  { value: 'legend',  label: 'Legend',  description: 'Coloured dots with labels in a wrapping row (default)' },
  { value: 'compact', label: 'Compact', description: 'Smaller dots and tighter spacing' },
  { value: 'pills',   label: 'Pills',   description: 'Filled pill/badge tags using zone colours' },
  { value: 'list',    label: 'List',    description: 'Vertical list with swatch, icon, and label' },
  { value: 'grid',    label: 'Grid',    description: 'Zone icon tiles in a responsive grid' },
  { value: 'hidden',  label: 'Hidden',  description: 'Invisible — provides theme with no visual footprint' },
];

const STYLE_ICONS: Record<ThemeCardDisplayStyle, string> = {
  legend:  'mdi:dots-horizontal',
  compact: 'mdi:minus',
  pills:   'mdi:label-multiple',
  list:    'mdi:format-list-bulleted',
  grid:    'mdi:view-grid',
  hidden:  'mdi:eye-off',
};

@customElement('person-card-theme-editor')
export class PersonCardThemeEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  private _config!: PersonCardThemeConfig;

  static styles = css`
    .row { margin-bottom: 16px; }
    .row label {
      display: block;
      font-size: 0.8rem;
      color: var(--secondary-text-color);
      margin-bottom: 6px;
    }
    .style-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }
    .style-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 10px 6px 8px;
      border-radius: 10px;
      border: 2px solid var(--divider-color, rgba(0,0,0,0.15));
      background: none;
      cursor: pointer;
      transition: border-color 0.15s, background 0.15s;
      text-align: center;
    }
    .style-btn:hover {
      background: rgba(var(--rgb-primary-color, 33,150,243), 0.06);
    }
    .style-btn.active {
      border-color: var(--primary-color);
      background: rgba(var(--rgb-primary-color, 33,150,243), 0.1);
    }
    .style-btn-label {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .style-btn-desc {
      font-size: 0.68rem;
      color: var(--secondary-text-color);
      line-height: 1.3;
    }
    .style-icon {
      --mdc-icon-size: 22px;
      color: var(--secondary-text-color);
    }
    .style-btn.active .style-icon {
      color: var(--primary-color);
    }
  `;

  setConfig(config: PersonCardThemeConfig) {
    this._config = config;
  }

  private _fire(config: PersonCardThemeConfig) {
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }));
    this._config = config;
  }

  private _set(patch: Partial<PersonCardThemeConfig>) {
    this._fire({ ...this._config, ...patch });
  }

  render() {
    if (!this._config) return html``;
    const current = this._config.display_style ?? 'legend';

    return html`
      <div class="row">
        <label>Display Style</label>
        <div class="style-grid">
          ${DISPLAY_STYLES.map(s => html`
            <button
              class="style-btn ${current === s.value ? 'active' : ''}"
              @click=${() => this._set({ display_style: s.value })}
              title=${s.description}
            >
              <ha-icon class="style-icon" .icon=${STYLE_ICONS[s.value]}></ha-icon>
              <span class="style-btn-label">${s.label}</span>
              <span class="style-btn-desc">${s.description}</span>
            </button>
          `)}
        </div>
      </div>

      <div class="row">
        <label>Zone Styles</label>
        <person-card-zone-editor
          .hass=${this.hass}
          .zoneStyles=${this._config.zone_styles ?? []}
          @zone-styles-changed=${(e: CustomEvent) => this._set({ zone_styles: e.detail.zoneStyles })}
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
