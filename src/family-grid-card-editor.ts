// src/family-grid-card-editor.ts
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { FamilyGridCardConfig, FamilyPersonConfig } from './shared/types';
import './components/zone-editor';

@customElement('family-grid-card-editor')
export class FamilyGridCardEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: FamilyGridCardConfig;
  @state() private _activeTab: 'display' | 'people' | 'zones' = 'display';

  static styles = css`
    .tabs { display: flex; border-bottom: 1px solid var(--divider-color, #e0e0e0); margin-bottom: 16px; }
    .tab { padding: 8px 14px; font-size: 0.82rem; font-weight: 600; cursor: pointer;
      border-bottom: 2px solid transparent; color: var(--secondary-text-color); user-select: none; }
    .tab.active { color: var(--primary-color); border-bottom-color: var(--primary-color); }
    .row { margin-bottom: 12px; }
    .row label { display: block; font-size: 0.8rem; color: var(--secondary-text-color); margin-bottom: 4px; }
    .person-block { border: 1px solid var(--divider-color, rgba(0,0,0,0.15)); border-radius: 8px;
      padding: 8px; margin-bottom: 8px; }
    .person-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
    .person-label { font-size: 0.78rem; color: var(--secondary-text-color); }
    .add-btn { display: inline-flex; align-items: center; gap: 4px; font-size: 0.82rem; cursor: pointer;
      color: var(--primary-color); padding: 6px 0; background: none; border: none; }
    .delete-btn { cursor: pointer; color: var(--error-color, #f44336); background: none; border: none; }
    .detail-row { margin-top: 6px; }
    ha-textfield, ha-entity-picker { display: block; width: 100%; }
  `;

  setConfig(config: FamilyGridCardConfig) { this._config = config; }

  private _fire(config: FamilyGridCardConfig) {
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }));
    this._config = config;
  }

  private _set(patch: Partial<FamilyGridCardConfig>) { this._fire({ ...this._config, ...patch }); }

  private _renderDisplayTab() {
    return html`
      <div class="row">
        <label>Title (optional — shown above the grid with a home/away count)</label>
        <ha-textfield
          .value=${this._config.title ?? ''}
          placeholder="Family"
          @input=${(e: InputEvent) => {
            this._set({ title: (e.target as HTMLInputElement).value || undefined });
          }}
        ></ha-textfield>
      </div>
      <div class="row">
        <label>Columns (1–6, default 3 — tiles resize automatically)</label>
        <ha-textfield
          type="number"
          .value=${String(this._config.columns ?? 3)}
          min="1"
          max="6"
          @input=${(e: InputEvent) => {
            const v = parseInt((e.target as HTMLInputElement).value, 10);
            if (v >= 1 && v <= 6) this._set({ columns: v });
          }}
        ></ha-textfield>
      </div>
    `;
  }

  private _renderPeopleTab() {
    const people = this._config.people ?? [];
    return html`
      <div class="row">
        <label>People</label>
        ${people.map((person, i) => html`
          <div class="person-block">
            <div class="person-header">
              <span class="person-label">Person ${i + 1}</span>
              <button class="delete-btn" @click=${() => {
                const updated = [...people];
                updated.splice(i, 1);
                this._set({ people: updated });
              }}>
                <ha-icon .icon=${'mdi:delete'}></ha-icon>
              </button>
            </div>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${person.entity ?? ''}
              .includeDomains=${['person']}
              @value-changed=${(e: CustomEvent) => {
                const updated = [...people];
                updated[i] = { ...updated[i], entity: e.detail.value };
                this._set({ people: updated });
              }}
            ></ha-entity-picker>
            <div class="detail-row">
              <ha-textfield
                .value=${person.name ?? ''}
                label="Display name (optional)"
                @input=${(e: InputEvent) => {
                  const updated = [...people];
                  updated[i] = { ...updated[i], name: (e.target as HTMLInputElement).value || undefined };
                  this._set({ people: updated });
                }}
              ></ha-textfield>
            </div>
          </div>
        `)}
        <button class="add-btn" @click=${() => {
          this._set({ people: [...people, { entity: '' } as FamilyPersonConfig] });
        }}>
          <ha-icon .icon=${'mdi:plus-circle'}></ha-icon> Add Person
        </button>
      </div>
    `;
  }

  private _renderZonesTab() {
    return html`
      <div class="row">
        <label>Zone Style Overrides (optional — falls back to Theme Card)</label>
        <person-card-zone-editor
          .hass=${this.hass}
          .zoneStyles=${this._config.zone_styles ?? []}
          @zone-styles-changed=${(e: CustomEvent) => this._set({ zone_styles: e.detail.zoneStyles })}
        ></person-card-zone-editor>
      </div>
    `;
  }

  render() {
    if (!this._config) return html``;
    const TAB_LABELS: Record<typeof this._activeTab, string> = {
      display: 'Display', people: 'People', zones: 'Zone Styles',
    };
    return html`
      <div class="tabs">
        ${(['display', 'people', 'zones'] as const).map(t => html`
          <div class="tab ${this._activeTab === t ? 'active' : ''}"
            @click=${() => { this._activeTab = t; }}>
            ${TAB_LABELS[t]}
          </div>
        `)}
      </div>
      ${this._activeTab === 'display' ? this._renderDisplayTab() : ''}
      ${this._activeTab === 'people'  ? this._renderPeopleTab()  : ''}
      ${this._activeTab === 'zones'   ? this._renderZonesTab()   : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'family-grid-card-editor': FamilyGridCardEditor;
  }
}
