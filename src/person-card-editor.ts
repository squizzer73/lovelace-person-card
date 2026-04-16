import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { PersonCardConfig, DeviceConfig, ConditionRule, Condition, StyleEffect, CardTheme } from './types';
import { COLOR_SCHEMES } from './shared/constants';
import './components/zone-editor';

const CARD_THEMES: Array<{ value: CardTheme; label: string; icon: string }> = [
  { value: 'default',   label: 'Default',   icon: 'mdi:palette-outline' },
  { value: 'glass',     label: 'Glass',     icon: 'mdi:blur' },
  { value: 'scifi',     label: 'Sci-Fi',    icon: 'mdi:chip' },
  { value: 'steampunk', label: 'Steampunk', icon: 'mdi:cog-outline' },
  { value: 'terminal',  label: 'Terminal',  icon: 'mdi:console' },
  { value: 'neon',      label: 'Neon',      icon: 'mdi:led-on' },
];

@customElement('person-card-editor')
export class PersonCardEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: PersonCardConfig;
  @state() private _activeTab: 'person' | 'devices' | 'appearance' | 'conditions' | 'display' = 'person';

  static styles = css`
    .tabs {
      display: flex;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      margin-bottom: 16px;
      gap: 0;
    }
    .tab {
      padding: 8px 14px;
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      color: var(--secondary-text-color);
      user-select: none;
      transition: color 0.2s, border-color 0.2s;
    }
    .tab.active {
      color: var(--primary-color);
      border-bottom-color: var(--primary-color);
    }
    .row { margin-bottom: 12px; }
    .row label { display: block; font-size: 0.8rem; color: var(--secondary-text-color); margin-bottom: 4px; }
    .device-block, .zone-block {
      border: 1px solid var(--divider-color, rgba(0,0,0,0.15));
      border-radius: 8px; padding: 8px; margin-bottom: 8px;
    }
    .device-block ha-entity-picker { display: block; width: 100%; }
    .device-header-row {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 4px;
    }
    .device-label { font-size: 0.78rem; color: var(--secondary-text-color); }
    .device-row, .zone-row, .condition-row {
      display: flex; align-items: center; gap: 8px;
      margin-bottom: 6px;
    }
    .device-block .device-row, .zone-block .device-row { margin-bottom: 4px; }
    .device-block .device-row:last-child, .zone-block .device-row:last-child { margin-bottom: 0; }
    .device-row > *, .zone-row > * { flex: 1; min-width: 0; }
    .condition-row {
      border: 1px solid var(--divider-color, rgba(0,0,0,0.15));
      padding: 8px; border-radius: 8px;
    }
    .scheme-row {
      display: flex; align-items: center; flex-wrap: wrap; gap: 6px;
      margin: 2px 0 4px;
    }
    .scheme-swatch {
      width: 26px; height: 26px; border-radius: 5px;
      cursor: pointer; flex-shrink: 0;
      transition: transform 0.1s, box-shadow 0.1s;
    }
    .scheme-swatch:hover { transform: scale(1.2); box-shadow: 0 2px 6px rgba(0,0,0,0.4); }
    .scheme-divider { width: 1px; height: 24px; background: var(--divider-color, #e0e0e0); flex-shrink: 0; }
    .add-btn {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: 0.82rem; cursor: pointer;
      color: var(--primary-color); padding: 6px 0; background: none; border: none;
    }
    .delete-btn {
      cursor: pointer; color: var(--error-color, #f44336);
      background: none; border: none; flex: 0 0 auto;
    }
    .rule-block {
      border: 1px solid var(--divider-color, rgba(0,0,0,0.15));
      border-radius: 8px; padding: 10px; margin-bottom: 8px;
    }
    .rule-header { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
    .segment-control { display: flex; gap: 4px; flex-wrap: wrap; }
    .segment-btn {
      padding: 4px 12px; border-radius: 6px; font-size: 0.8rem; cursor: pointer;
      border: 1px solid var(--divider-color); background: none;
    }
    .segment-btn.active { background: var(--primary-color); color: #fff; border-color: var(--primary-color); }
    ha-textfield, ha-entity-picker, ha-icon-picker { display: block; width: 100%; }
    .color-row { display: flex; align-items: center; gap: 8px; }
    .theme-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }
    .theme-btn {
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
    .theme-btn:hover {
      background: rgba(var(--rgb-primary-color, 33,150,243), 0.06);
    }
    .theme-btn.active {
      border-color: var(--primary-color);
      background: rgba(var(--rgb-primary-color, 33,150,243), 0.1);
    }
    .theme-btn-label {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .theme-icon {
      --mdc-icon-size: 22px;
      color: var(--secondary-text-color);
    }
    .theme-btn.active .theme-icon {
      color: var(--primary-color);
    }
  `;

  setConfig(config: PersonCardConfig) {
    this._config = config;
  }

  private _fire(config: PersonCardConfig) {
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }));
    this._config = config;
  }

  private _set(patch: Partial<PersonCardConfig>) {
    this._fire({ ...this._config, ...patch });
  }

  // ── Tab: Person ──────────────────────────────────────────────────────────────

  private _renderPersonTab() {
    return html`
      <div class="row">
        <label>Person Entity</label>
        <div>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${this._config.person_entity ?? ''}
            .includeDomains=${['person']}
            @value-changed=${(e: CustomEvent) => this._set({ person_entity: e.detail.value })}
          ></ha-entity-picker>
        </div>
      </div>
      <div class="row">
        <label>Display Name (optional)</label>
        <ha-textfield
          .value=${this._config.name ?? ''}
          placeholder="Leave blank to use entity name"
          @input=${(e: InputEvent) => this._set({ name: (e.target as HTMLInputElement).value || undefined })}
        ></ha-textfield>
      </div>
      <div class="row">
        <label>Photo URL (optional — overrides entity photo)</label>
        <ha-textfield
          .value=${this._config.photo ?? ''}
          placeholder="https://..."
          @input=${(e: InputEvent) => this._set({ photo: (e.target as HTMLInputElement).value || undefined })}
        ></ha-textfield>
      </div>
    `;
  }

  // ── Tab: Devices ─────────────────────────────────────────────────────────────

  private _renderDevicesTab() {
    const devices = this._config.devices ?? [];
    return html`
      ${devices.map((device, i) => html`
        <div class="device-block">
          <div class="device-header-row">
            <span class="device-label">Device entity</span>
            <button class="delete-btn" @click=${() => this._removeDevice(i)}>
              <ha-icon .icon=${'mdi:delete'}></ha-icon>
            </button>
          </div>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${device.entity}
            @value-changed=${(e: CustomEvent) => this._updateDevice(i, { entity: e.detail.value })}
          ></ha-entity-picker>
          <div class="device-row" style="margin-top:6px">
            <ha-textfield
              .value=${device.name ?? ''}
              label="Name"
              @input=${(e: InputEvent) => this._updateDevice(i, { name: (e.target as HTMLInputElement).value || undefined })}
            ></ha-textfield>
            <div style="flex:1;min-width:0">
              <ha-icon-picker
                .value=${device.icon ?? ''}
                label="Icon"
                @value-changed=${(e: CustomEvent) => this._updateDevice(i, { icon: e.detail.value || undefined })}
              ></ha-icon-picker>
            </div>
          </div>
          <div style="margin-top:4px;opacity:0.75">
            <ha-entity-picker
              .hass=${this.hass}
              .value=${device.battery_entity ?? ''}
              label="Battery entity (optional)"
              @value-changed=${(e: CustomEvent) => this._updateDevice(i, { battery_entity: e.detail.value || undefined })}
            ></ha-entity-picker>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${device.connectivity_entity ?? ''}
              label="Connectivity entity (optional)"
              style="margin-top:4px"
              @value-changed=${(e: CustomEvent) => this._updateDevice(i, { connectivity_entity: e.detail.value || undefined })}
            ></ha-entity-picker>
          </div>
          <div class="device-row" style="margin-top:4px;opacity:0.8">
            <ha-textfield
              .value=${String(device.battery_threshold ?? '')}
              label="Battery alert threshold % (default 20)"
              type="number"
              min="0"
              max="100"
              @input=${(e: InputEvent) => this._updateDevice(i, {
                battery_threshold: parseInt((e.target as HTMLInputElement).value) || undefined
              })}
            ></ha-textfield>
          </div>
        </div>
      `)}
      <button class="add-btn" @click=${() => this._addDevice()}>
        <ha-icon .icon=${'mdi:plus-circle'}></ha-icon> Add Device
      </button>
    `;
  }

  private _updateDevice(index: number, patch: Partial<DeviceConfig>) {
    const devices = [...(this._config.devices ?? [])];
    devices[index] = { ...devices[index], ...patch };
    this._set({ devices });
  }

  private _removeDevice(index: number) {
    const devices = [...(this._config.devices ?? [])];
    devices.splice(index, 1);
    this._set({ devices });
  }

  private _addDevice() {
    const devices = [...(this._config.devices ?? []), { entity: '' }];
    this._set({ devices });
  }

  // ── Tab: Appearance ───────────────────────────────────────────────────────────

  private _renderAppearanceTab() {
    return html`
      <div class="row">
        <label>Card Size</label>
        <div class="segment-control">
          ${([
            { value: 'auto',   label: 'Auto'   },
            { value: 'small',  label: 'Small'  },
            { value: 'medium', label: 'Medium' },
            { value: 'large',  label: 'Large'  },
            { value: 'hero',   label: 'Hero'   },
            { value: 'stats',  label: 'Stats'  },
          ] as const).map(s => html`
            <button class="segment-btn ${this._config.size === s.value ? 'active' : ''}"
              @click=${() => this._set({ size: s.value })}>
              ${s.label}
            </button>
          `)}
        </div>
        <p style="font-size:0.75rem;color:var(--secondary-text-color);margin:6px 0 0;line-height:1.4">
          <strong>Hero</strong> — centred portrait with large avatar, glow ring, and device icon grid.<br>
          <strong>Stats</strong> — immersive background with zone duration and last-seen stat boxes.
        </p>
      </div>
      <div class="row">
        <label>Background Image URL (optional)</label>
        <ha-textfield
          .value=${this._config.background_image ?? ''}
          placeholder="https://..."
          @input=${(e: InputEvent) => this._set({ background_image: (e.target as HTMLInputElement).value || undefined })}
        ></ha-textfield>
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

  // ── Tab: Conditions ───────────────────────────────────────────────────────────

  private _renderConditionsTab() {
    const rules = this._config.conditions ?? [];
    return html`
      <p style="font-size:0.8rem;color:var(--secondary-text-color);margin:0 0 12px">
        Rules are evaluated top-to-bottom. The last matching rule wins.
      </p>
      ${rules.map((rule, ri) => this._renderRule(rule, ri))}
      <button class="add-btn" @click=${() => this._addRule()}>
        <ha-icon .icon=${'mdi:plus-circle'}></ha-icon> Add Rule
      </button>
    `;
  }

  private _renderRule(rule: ConditionRule, ri: number) {
    return html`
      <div class="rule-block">
        <div class="rule-header">
          <ha-textfield
            .value=${rule.label ?? ''}
            label="Rule label"
            style="flex:1"
            @input=${(e: InputEvent) => this._updateRule(ri, { label: (e.target as HTMLInputElement).value || undefined })}
          ></ha-textfield>
          <div class="segment-control">
            <button class="segment-btn ${rule.operator === 'and' ? 'active' : ''}"
              @click=${() => this._updateRule(ri, { operator: 'and' })}>AND</button>
            <button class="segment-btn ${rule.operator === 'or' ? 'active' : ''}"
              @click=${() => this._updateRule(ri, { operator: 'or' })}>OR</button>
          </div>
          <button class="delete-btn" @click=${() => this._removeRule(ri)}>
            <ha-icon .icon=${'mdi:delete'}></ha-icon>
          </button>
        </div>

        ${rule.conditions.map((cond, ci) => html`
          <ha-entity-picker .hass=${this.hass} .value=${cond.entity} label="Entity"
            style="display:block;width:100%;margin-bottom:4px"
            @value-changed=${(e: CustomEvent) => this._updateCondition(ri, ci, { entity: e.detail.value })}
          ></ha-entity-picker>
          <div class="condition-row">
            <ha-textfield .value=${cond.attribute ?? ''} label="Attribute (opt.)"
              @input=${(e: InputEvent) => this._updateCondition(ri, ci, { attribute: (e.target as HTMLInputElement).value || undefined })}
            ></ha-textfield>
            <select @change=${(e: Event) => this._updateCondition(ri, ci, { operator: (e.target as HTMLSelectElement).value as Condition['operator'] })}
              style="padding:6px;border-radius:6px;border:1px solid var(--divider-color)">
              ${(['eq','neq','lt','gt','lte','gte','contains'] as Condition['operator'][]).map(op => html`
                <option value=${op} ?selected=${cond.operator === op}>${op}</option>
              `)}
            </select>
            <ha-textfield .value=${String(cond.value)} label="Value"
              @input=${(e: InputEvent) => {
                const raw = (e.target as HTMLInputElement).value;
                const numericOps: Condition['operator'][] = ['lt', 'gt', 'lte', 'gte'];
                const numVal = parseFloat(raw);
                const value = numericOps.includes(cond.operator) && !isNaN(numVal) ? numVal : raw;
                this._updateCondition(ri, ci, { value });
              }}
            ></ha-textfield>
            <button class="delete-btn" @click=${() => this._removeCondition(ri, ci)}>
              <ha-icon .icon=${'mdi:close'}></ha-icon>
            </button>
          </div>
        `)}
        <button class="add-btn" @click=${() => this._addCondition(ri)}>
          <ha-icon .icon=${'mdi:plus'}></ha-icon> Add Condition
        </button>

        <div style="margin-top:10px;font-size:0.8rem;font-weight:600;color:var(--secondary-text-color)">Effect</div>
        <div class="scheme-row" style="margin-bottom:6px">
          ${COLOR_SCHEMES.map(s => html`
            <div class="scheme-swatch"
              title=${s.name}
              style="background:${s.bg};border:3px solid ${s.border}"
              @click=${() => this._updateEffect(ri, { background_color: s.bg, border_color: s.border })}
            ></div>
          `)}
        </div>
        <div class="condition-row" style="flex-wrap:wrap;gap:6px">
          <div class="color-row"><label>Background</label>
            <input type="color" .value=${rule.effect.background_color ?? '#1c1c2e'}
              @input=${(e: InputEvent) => this._updateEffect(ri, { background_color: (e.target as HTMLInputElement).value })} />
          </div>
          <div class="color-row"><label>Border</label>
            <input type="color" .value=${rule.effect.border_color ?? '#ffffff'}
              @input=${(e: InputEvent) => this._updateEffect(ri, { border_color: (e.target as HTMLInputElement).value })} />
          </div>
          <ha-textfield .value=${String(rule.effect.border_width ?? '')} label="Border width (px)"
            type="number" style="width:120px"
            @input=${(e: InputEvent) => this._updateEffect(ri, { border_width: parseInt((e.target as HTMLInputElement).value) || undefined })}
          ></ha-textfield>
          <div class="color-row"><label>Badge color</label>
            <input type="color" .value=${rule.effect.badge_color ?? '#f44336'}
              @input=${(e: InputEvent) => this._updateEffect(ri, { badge_color: (e.target as HTMLInputElement).value })} />
          </div>
          <ha-icon-picker .value=${rule.effect.badge_icon ?? ''} label="Badge icon"
            @value-changed=${(e: CustomEvent) => this._updateEffect(ri, { badge_icon: e.detail.value || undefined })}
          ></ha-icon-picker>
        </div>
      </div>
    `;
  }

  private _updateRule(index: number, patch: Partial<ConditionRule>) {
    const rules = [...(this._config.conditions ?? [])];
    rules[index] = { ...rules[index], ...patch };
    this._set({ conditions: rules });
  }

  private _removeRule(index: number) {
    const rules = [...(this._config.conditions ?? [])];
    rules.splice(index, 1);
    this._set({ conditions: rules });
  }

  private _addRule() {
    const newRule: ConditionRule = {
      id: crypto.randomUUID(),
      operator: 'and',
      conditions: [{ entity: '', operator: 'eq', value: '' }],
      effect: {},
    };
    this._set({ conditions: [...(this._config.conditions ?? []), newRule] });
  }

  private _updateCondition(ruleIndex: number, condIndex: number, patch: Partial<Condition>) {
    const rules = [...(this._config.conditions ?? [])];
    const conditions = [...rules[ruleIndex].conditions];
    conditions[condIndex] = { ...conditions[condIndex], ...patch };
    rules[ruleIndex] = { ...rules[ruleIndex], conditions };
    this._set({ conditions: rules });
  }

  private _removeCondition(ruleIndex: number, condIndex: number) {
    const rules = [...(this._config.conditions ?? [])];
    const conditions = [...rules[ruleIndex].conditions];
    conditions.splice(condIndex, 1);
    rules[ruleIndex] = { ...rules[ruleIndex], conditions };
    this._set({ conditions: rules });
  }

  private _addCondition(ruleIndex: number) {
    const rules = [...(this._config.conditions ?? [])];
    rules[ruleIndex] = {
      ...rules[ruleIndex],
      conditions: [...rules[ruleIndex].conditions, { entity: '', operator: 'eq', value: '' }],
    };
    this._set({ conditions: rules });
  }

  private _updateEffect(ruleIndex: number, patch: Partial<StyleEffect>) {
    const rules = [...(this._config.conditions ?? [])];
    rules[ruleIndex] = { ...rules[ruleIndex], effect: { ...rules[ruleIndex].effect, ...patch } };
    this._set({ conditions: rules });
  }

  // ── Tab: Display ─────────────────────────────────────────────────────────────

  private _renderThemePicker() {
    const current = this._config.card_theme ?? 'default';
    return html`
      <div class="row">
        <label>Card Theme</label>
        <div class="theme-grid">
          ${CARD_THEMES.map(t => html`
            <button
              class="theme-btn ${current === t.value ? 'active' : ''}"
              @click=${() => this._set({ card_theme: t.value === 'default' ? undefined : t.value as CardTheme })}
              title=${t.label}
            >
              <ha-icon class="theme-icon" .icon=${t.icon}></ha-icon>
              <span class="theme-btn-label">${t.label}</span>
            </button>
          `)}
        </div>
      </div>
    `;
  }

  private _renderDisplayTab() {
    return html`
      ${this._renderThemePicker()}
      <div class="row">
        <ha-formfield label="Show ETA when away">
          <ha-switch
            .checked=${this._config.show_eta !== false}
            @change=${(e: Event) => this._set({ show_eta: (e.target as HTMLInputElement).checked })}
          ></ha-switch>
        </ha-formfield>
      </div>
      <div class="row">
        <label>ETA Travel Time Sensor (optional)</label>
        <div>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${this._config.eta_entity ?? ''}
            .includeDomains=${['sensor']}
            label="Travel time sensor"
            @value-changed=${(e: CustomEvent) => {
              this._set({ eta_entity: e.detail.value || undefined });
            }}
          ></ha-entity-picker>
        </div>
      </div>
      <div class="row">
        <label>Geocoded Address Entity (optional)</label>
        <div>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${this._config.address_entity ?? ''}
            label="Address sensor"
            @value-changed=${(e: CustomEvent) => this._set({ address_entity: e.detail.value || undefined })}
          ></ha-entity-picker>
        </div>
        <p style="font-size:0.75rem;color:var(--secondary-text-color);margin:4px 0 0;line-height:1.4">
          Shown on medium &amp; large when the person is outside all zones.
          Falls back to "Away" if unavailable. Long addresses scroll automatically.
        </p>
      </div>
      <div class="row">
        <ha-formfield label="Show last seen">
          <ha-switch
            .checked=${this._config.show_last_seen !== false}
            @change=${(e: Event) => this._set({ show_last_seen: (e.target as HTMLInputElement).checked })}
          ></ha-switch>
        </ha-formfield>
      </div>
      <div class="row">
        <ha-formfield label="Show notification badge">
          <ha-switch
            .checked=${this._config.show_notification_badge !== false}
            @change=${(e: Event) => this._set({ show_notification_badge: (e.target as HTMLInputElement).checked })}
          ></ha-switch>
        </ha-formfield>
      </div>
      <div class="row">
        <label>Offline threshold (minutes, 0 = disabled)</label>
        <ha-textfield
          .value=${String(this._config.offline_threshold ?? 0)}
          type="number"
          min="0"
          placeholder="0"
          @input=${(e: InputEvent) => {
            const v = parseInt((e.target as HTMLInputElement).value);
            this._set({ offline_threshold: v > 0 ? v : undefined });
          }}
        ></ha-textfield>
        <p style="font-size:0.75rem;color:var(--secondary-text-color);margin:4px 0 0;line-height:1.4">
          Show a stale indicator on the avatar if the person entity hasn't updated within this many minutes.
        </p>
      </div>
    `;
  }

  render() {
    if (!this._config || !this.hass) return html``;

    type TabKey = 'person' | 'devices' | 'appearance' | 'conditions' | 'display';
    const tabs: Array<{ key: TabKey; label: string }> = [
      { key: 'person', label: 'Person' },
      { key: 'devices', label: 'Devices' },
      { key: 'appearance', label: 'Appearance' },
      { key: 'conditions', label: 'Conditions' },
      { key: 'display', label: 'Display' },
    ];

    return html`
      <div class="tabs">
        ${tabs.map(t => html`
          <div class="tab ${this._activeTab === t.key ? 'active' : ''}"
            @click=${() => { this._activeTab = t.key; }}>
            ${t.label}
          </div>
        `)}
      </div>
      ${this._activeTab === 'person'      ? this._renderPersonTab()     : ''}
      ${this._activeTab === 'devices'     ? this._renderDevicesTab()    : ''}
      ${this._activeTab === 'appearance'  ? this._renderAppearanceTab() : ''}
      ${this._activeTab === 'conditions'  ? this._renderConditionsTab() : ''}
      ${this._activeTab === 'display'     ? this._renderDisplayTab()    : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'person-card-editor': PersonCardEditor;
  }
}
