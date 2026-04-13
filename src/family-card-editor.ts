// src/family-card-editor.ts
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { FamilyCardConfig, FamilyPersonConfig, ConditionRule, Condition } from './shared/types';
import { COLOR_SCHEMES } from './shared/constants';
import './components/zone-editor';

@customElement('family-card-editor')
export class FamilyCardEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: FamilyCardConfig;
  @state() private _activeTab: 'people' | 'appearance' | 'conditions' | 'display' = 'people';

  static styles = css`
    .tabs { display: flex; border-bottom: 1px solid var(--divider-color, #e0e0e0); margin-bottom: 16px; }
    .tab { padding: 8px 14px; font-size: 0.82rem; font-weight: 600; cursor: pointer;
      border-bottom: 2px solid transparent; color: var(--secondary-text-color); user-select: none; }
    .tab.active { color: var(--primary-color); border-bottom-color: var(--primary-color); }
    .row { margin-bottom: 12px; }
    .row label { display: block; font-size: 0.8rem; color: var(--secondary-text-color); margin-bottom: 4px; }
    .person-block { border: 1px solid var(--divider-color, rgba(0,0,0,0.15)); border-radius: 8px; padding: 8px; margin-bottom: 8px; }
    .person-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
    .person-label { font-size: 0.78rem; color: var(--secondary-text-color); }
    .add-btn { display: inline-flex; align-items: center; gap: 4px; font-size: 0.82rem; cursor: pointer;
      color: var(--primary-color); padding: 6px 0; background: none; border: none; }
    .delete-btn { cursor: pointer; color: var(--error-color, #f44336); background: none; border: none; }
    .segment-control { display: flex; gap: 4px; flex-wrap: wrap; }
    .segment-btn { padding: 4px 12px; border-radius: 6px; font-size: 0.8rem; cursor: pointer;
      border: 1px solid var(--divider-color); background: none; }
    .segment-btn.active { background: var(--primary-color); color: #fff; border-color: var(--primary-color); }
    ha-textfield, ha-entity-picker { display: block; width: 100%; }
    .detail-row { margin-top: 4px; opacity: 0.8; }
    .rule-block { border: 1px solid var(--divider-color, rgba(0,0,0,0.15)); border-radius: 8px; padding: 10px; margin-bottom: 8px; }
    .rule-header { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
    .condition-row { display: flex; align-items: center; gap: 8px; border: 1px solid var(--divider-color, rgba(0,0,0,0.15)); padding: 8px; border-radius: 8px; margin-bottom: 6px; }
    .scheme-row { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; margin: 2px 0 4px; }
    .scheme-swatch { width: 26px; height: 26px; border-radius: 5px; cursor: pointer; flex-shrink: 0; }
    .color-row { display: flex; align-items: center; gap: 8px; }
  `;

  setConfig(config: FamilyCardConfig) { this._config = config; }

  private _fire(config: FamilyCardConfig) {
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }));
    this._config = config;
  }

  private _set(patch: Partial<FamilyCardConfig>) { this._fire({ ...this._config, ...patch }); }

  private _renderPeopleTab() {
    const people = this._config.people ?? [];
    return html`
      <div class="row">
        <label>Density</label>
        <div class="segment-control">
          ${(['compact', 'mini', 'detailed'] as const).map(d => html`
            <button class="segment-btn ${this._config.density === d ? 'active' : ''}"
              @click=${() => this._set({ density: d })}>${d.charAt(0).toUpperCase() + d.slice(1)}</button>
          `)}
        </div>
      </div>
      <div class="row">
        <label>Group Entity (optional — overridden by people list)</label>
        <div>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${this._config.group_entity ?? ''}
            @value-changed=${(e: CustomEvent) => this._set({ group_entity: e.detail.value || undefined })}
          ></ha-entity-picker>
        </div>
      </div>
      <div class="row">
        <label>People</label>
        ${people.map((person, i) => html`
          <div class="person-block">
            <div class="person-header">
              <span class="person-label">Person entity</span>
              <button class="delete-btn" @click=${() => {
                const updated = [...people]; updated.splice(i, 1); this._set({ people: updated });
              }}><ha-icon .icon=${'mdi:delete'}></ha-icon></button>
            </div>
            <div>
              <ha-entity-picker
                .hass=${this.hass}
                .value=${person.entity ?? ''}
                .includeDomains=${['person']}
                @value-changed=${(e: CustomEvent) => {
                  const updated = [...people]; updated[i] = { ...updated[i], entity: e.detail.value }; this._set({ people: updated });
                }}
              ></ha-entity-picker>
            </div>
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
            <div class="detail-row">
              <div>
                <ha-entity-picker
                  .hass=${this.hass}
                  .value=${person.eta_entity ?? ''}
                  .includeDomains=${['sensor']}
                  label="ETA travel time sensor (optional)"
                  @value-changed=${(e: CustomEvent) => {
                    const updated = [...people];
                    updated[i] = { ...updated[i], eta_entity: e.detail.value || undefined };
                    this._set({ people: updated });
                  }}
                ></ha-entity-picker>
              </div>
            </div>
          </div>
        `)}
        <button class="add-btn" @click=${() => this._set({ people: [...people, { entity: '' }] })}>
          <ha-icon .icon=${'mdi:plus-circle'}></ha-icon> Add Person
        </button>
      </div>
    `;
  }

  private _renderAppearanceTab() {
    return html`
      <div class="row">
        <label>Background Image URL (optional)</label>
        <ha-textfield
          .value=${this._config.background_image ?? ''}
          placeholder="https://..."
          @input=${(e: InputEvent) => this._set({ background_image: (e.target as HTMLInputElement).value || undefined })}
        ></ha-textfield>
      </div>
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

  private _renderConditionsTab() {
    const rules = this._config.conditions ?? [];
    return html`
      <p style="font-size:0.8rem;color:var(--secondary-text-color);margin:0 0 12px">
        Rules are evaluated top-to-bottom. The last matching rule wins.
      </p>
      ${rules.map((rule, ri) => html`
        <div class="rule-block">
          <div class="rule-header">
            <ha-textfield .value=${rule.label ?? ''} label="Rule label" style="flex:1"
              @input=${(e: InputEvent) => {
                const updated = [...rules];
                updated[ri] = { ...updated[ri], label: (e.target as HTMLInputElement).value || undefined };
                this._set({ conditions: updated });
              }}></ha-textfield>
            <div class="segment-control">
              <button class="segment-btn ${rule.operator === 'and' ? 'active' : ''}"
                @click=${() => { const r = [...rules]; r[ri] = { ...r[ri], operator: 'and' }; this._set({ conditions: r }); }}>AND</button>
              <button class="segment-btn ${rule.operator === 'or' ? 'active' : ''}"
                @click=${() => { const r = [...rules]; r[ri] = { ...r[ri], operator: 'or' }; this._set({ conditions: r }); }}>OR</button>
            </div>
            <button class="delete-btn" @click=${() => { const r = [...rules]; r.splice(ri, 1); this._set({ conditions: r }); }}>
              <ha-icon .icon=${'mdi:delete'}></ha-icon>
            </button>
          </div>
          ${rule.conditions.map((cond, ci) => html`
            <div style="margin-bottom:4px">
              <ha-entity-picker .hass=${this.hass} .value=${cond.entity ?? ''} label="Entity"
                style="display:block;width:100%"
                @value-changed=${(e: CustomEvent) => {
                  const r = [...rules]; const conds = [...r[ri].conditions];
                  conds[ci] = { ...conds[ci], entity: e.detail.value }; r[ri] = { ...r[ri], conditions: conds }; this._set({ conditions: r });
                }}></ha-entity-picker>
            </div>
            <div class="condition-row">
              <ha-textfield .value=${cond.attribute ?? ''} label="Attribute (opt.)"
                @input=${(e: InputEvent) => {
                  const r = [...rules]; const conds = [...r[ri].conditions];
                  conds[ci] = { ...conds[ci], attribute: (e.target as HTMLInputElement).value || undefined };
                  r[ri] = { ...r[ri], conditions: conds }; this._set({ conditions: r });
                }}></ha-textfield>
              <select @change=${(e: Event) => {
                const r = [...rules]; const conds = [...r[ri].conditions];
                conds[ci] = { ...conds[ci], operator: (e.target as HTMLSelectElement).value as Condition['operator'] };
                r[ri] = { ...r[ri], conditions: conds }; this._set({ conditions: r });
              }} style="padding:6px;border-radius:6px;border:1px solid var(--divider-color)">
                ${(['eq','neq','lt','gt','lte','gte','contains'] as Condition['operator'][]).map(op => html`
                  <option value=${op} ?selected=${cond.operator === op}>${op}</option>
                `)}
              </select>
              <ha-textfield .value=${String(cond.value)} label="Value"
                @input=${(e: InputEvent) => {
                  const r = [...rules]; const conds = [...r[ri].conditions];
                  const raw = (e.target as HTMLInputElement).value;
                  const numericOps: Condition['operator'][] = ['lt', 'gt', 'lte', 'gte'];
                  const numVal = parseFloat(raw);
                  conds[ci] = { ...conds[ci], value: numericOps.includes(cond.operator) && !isNaN(numVal) ? numVal : raw };
                  r[ri] = { ...r[ri], conditions: conds }; this._set({ conditions: r });
                }}></ha-textfield>
              <button class="delete-btn" @click=${() => {
                const r = [...rules]; const conds = [...r[ri].conditions];
                conds.splice(ci, 1); r[ri] = { ...r[ri], conditions: conds }; this._set({ conditions: r });
              }}><ha-icon .icon=${'mdi:close'}></ha-icon></button>
            </div>
          `)}
          <button class="add-btn" @click=${() => {
            const r = [...rules];
            r[ri] = { ...r[ri], conditions: [...r[ri].conditions, { entity: '', operator: 'eq', value: '' }] };
            this._set({ conditions: r });
          }}><ha-icon .icon=${'mdi:plus'}></ha-icon> Add Condition</button>
          <div style="margin-top:10px;font-size:0.8rem;font-weight:600;color:var(--secondary-text-color)">Effect</div>
          <div class="scheme-row" style="margin-bottom:6px">
            ${COLOR_SCHEMES.map(s => html`
              <div class="scheme-swatch" title=${s.name} style="background:${s.bg};border:3px solid ${s.border}"
                @click=${() => {
                  const r = [...rules]; r[ri] = { ...r[ri], effect: { ...r[ri].effect, background_color: s.bg, border_color: s.border } };
                  this._set({ conditions: r });
                }}></div>
            `)}
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <div class="color-row"><label>Background</label>
              <input type="color" .value=${rule.effect.background_color ?? '#1c1c2e'}
                @input=${(e: InputEvent) => {
                  const r = [...rules]; r[ri] = { ...r[ri], effect: { ...r[ri].effect, background_color: (e.target as HTMLInputElement).value } };
                  this._set({ conditions: r });
                }} /></div>
            <div class="color-row"><label>Border</label>
              <input type="color" .value=${rule.effect.border_color ?? '#ffffff'}
                @input=${(e: InputEvent) => {
                  const r = [...rules]; r[ri] = { ...r[ri], effect: { ...r[ri].effect, border_color: (e.target as HTMLInputElement).value } };
                  this._set({ conditions: r });
                }} /></div>
          </div>
        </div>
      `)}
      <button class="add-btn" @click=${() => {
        const newRule: ConditionRule = { id: crypto.randomUUID(), operator: 'and', conditions: [{ entity: '', operator: 'eq', value: '' }], effect: {} };
        this._set({ conditions: [...rules, newRule] });
      }}><ha-icon .icon=${'mdi:plus-circle'}></ha-icon> Add Rule</button>
    `;
  }

  private _renderDisplayTab() {
    return html`
      <div class="row"><ha-formfield label="Show devices">
        <ha-switch .checked=${this._config.show_devices !== false}
          @change=${(e: Event) => this._set({ show_devices: (e.target as HTMLInputElement).checked })}></ha-switch>
      </ha-formfield></div>
      <div class="row"><ha-formfield label="Show last seen">
        <ha-switch .checked=${this._config.show_last_seen !== false}
          @change=${(e: Event) => this._set({ show_last_seen: (e.target as HTMLInputElement).checked })}></ha-switch>
      </ha-formfield></div>
      <div class="row"><ha-formfield label="Show ETA when away">
        <ha-switch .checked=${this._config.show_eta !== false}
          @change=${(e: Event) => this._set({ show_eta: (e.target as HTMLInputElement).checked })}></ha-switch>
      </ha-formfield></div>
      <div class="row"><ha-formfield label="Show notification badge">
        <ha-switch .checked=${this._config.show_notification_badge !== false}
          @change=${(e: Event) => this._set({ show_notification_badge: (e.target as HTMLInputElement).checked })}></ha-switch>
      </ha-formfield></div>
      <div class="row">
        <label>Offline threshold (minutes, 0 = disabled)</label>
        <ha-textfield
          .value=${String(this._config.offline_threshold ?? 0)}
          type="number" min="0" placeholder="0"
          @input=${(e: InputEvent) => {
            const v = parseInt((e.target as HTMLInputElement).value);
            this._set({ offline_threshold: v > 0 ? v : undefined });
          }}></ha-textfield>
      </div>
    `;
  }

  render() {
    if (!this._config || !this.hass) return html``;
    type Tab = 'people' | 'appearance' | 'conditions' | 'display';
    const tabs: Array<{ key: Tab; label: string }> = [
      { key: 'people', label: 'People' },
      { key: 'appearance', label: 'Appearance' },
      { key: 'conditions', label: 'Conditions' },
      { key: 'display', label: 'Display' },
    ];
    return html`
      <div class="tabs">
        ${tabs.map(t => html`
          <div class="tab ${this._activeTab === t.key ? 'active' : ''}"
            @click=${() => { this._activeTab = t.key; }}>${t.label}</div>
        `)}
      </div>
      ${this._activeTab === 'people'      ? this._renderPeopleTab()      : ''}
      ${this._activeTab === 'appearance'  ? this._renderAppearanceTab()  : ''}
      ${this._activeTab === 'conditions'  ? this._renderConditionsTab()  : ''}
      ${this._activeTab === 'display'     ? this._renderDisplayTab()     : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'family-card-editor': FamilyCardEditor;
  }
}
