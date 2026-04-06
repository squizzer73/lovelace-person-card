import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { PersonCardConfig, DeviceConfig, ZoneStyleConfig, ConditionRule, Condition, StyleEffect } from './types';

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
    .device-row, .zone-row, .condition-row {
      display: flex; align-items: center; gap: 8px;
      background: var(--secondary-background-color);
      padding: 8px; border-radius: 8px; margin-bottom: 6px;
    }
    .device-row > *, .zone-row > * { flex: 1; }
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
      background: var(--secondary-background-color);
      border-radius: 8px; padding: 10px; margin-bottom: 8px;
    }
    .rule-header { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
    .segment-control { display: flex; gap: 4px; }
    .segment-btn {
      padding: 4px 12px; border-radius: 6px; font-size: 0.8rem; cursor: pointer;
      border: 1px solid var(--divider-color); background: none;
    }
    .segment-btn.active { background: var(--primary-color); color: #fff; border-color: var(--primary-color); }
    ha-textfield, ha-entity-picker, ha-icon-picker { display: block; width: 100%; }
    .color-row { display: flex; align-items: center; gap: 8px; }
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
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.person_entity ?? ''}
          .includeDomains=${['person']}
          @value-changed=${(e: CustomEvent) => this._set({ person_entity: e.detail.value })}
        ></ha-entity-picker>
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
    const devices = (this._config.devices ?? []).filter(d => d.name !== '__eta__');
    return html`
      ${devices.map((device, i) => html`
        <div class="device-row">
          <ha-entity-picker
            .hass=${this.hass}
            .value=${device.entity}
            label="Entity"
            @value-changed=${(e: CustomEvent) => this._updateDevice(i, { entity: e.detail.value })}
          ></ha-entity-picker>
          <ha-textfield
            .value=${device.name ?? ''}
            label="Name"
            @input=${(e: InputEvent) => this._updateDevice(i, { name: (e.target as HTMLInputElement).value || undefined })}
          ></ha-textfield>
          <ha-icon-picker
            .value=${device.icon ?? ''}
            label="Icon"
            @value-changed=${(e: CustomEvent) => this._updateDevice(i, { icon: e.detail.value || undefined })}
          ></ha-icon-picker>
          <button class="delete-btn" @click=${() => this._removeDevice(i)}>
            <ha-icon .icon=${'mdi:delete'}></ha-icon>
          </button>
        </div>
        <div class="device-row" style="opacity:0.7;font-size:0.78rem;">
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
            @value-changed=${(e: CustomEvent) => this._updateDevice(i, { connectivity_entity: e.detail.value || undefined })}
          ></ha-entity-picker>
        </div>
      `)}
      <button class="add-btn" @click=${() => this._addDevice()}>
        <ha-icon .icon=${'mdi:plus-circle'}></ha-icon> Add Device
      </button>
    `;
  }

  private _updateDevice(visibleIndex: number, patch: Partial<DeviceConfig>) {
    // Work on non-__eta__ devices only; preserve the __eta__ sentinel
    const all = [...(this._config.devices ?? [])];
    const visibleDevices = all.filter(d => d.name !== '__eta__');
    const target = visibleDevices[visibleIndex];
    const allIndex = all.indexOf(target);
    if (allIndex === -1) return;
    all[allIndex] = { ...all[allIndex], ...patch };
    this._set({ devices: all });
  }

  private _removeDevice(visibleIndex: number) {
    const all = [...(this._config.devices ?? [])];
    const visibleDevices = all.filter(d => d.name !== '__eta__');
    const target = visibleDevices[visibleIndex];
    const allIndex = all.indexOf(target);
    if (allIndex === -1) return;
    all.splice(allIndex, 1);
    this._set({ devices: all });
  }

  private _addDevice() {
    const devices = [...(this._config.devices ?? []), { entity: '' }];
    this._set({ devices });
  }

  // ── Tab: Appearance ───────────────────────────────────────────────────────────

  private _renderAppearanceTab() {
    const zoneStyles = this._config.zone_styles ?? [];
    return html`
      <div class="row">
        <label>Card Size</label>
        <div class="segment-control">
          ${(['auto', 'small', 'medium', 'large'] as const).map(s => html`
            <button class="segment-btn ${this._config.size === s ? 'active' : ''}"
              @click=${() => this._set({ size: s })}>
              ${s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          `)}
        </div>
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
        ${zoneStyles.map((zs, i) => html`
          <div class="zone-row">
            <ha-textfield
              .value=${zs.zone}
              label="Zone name"
              @input=${(e: InputEvent) => this._updateZoneStyle(i, { zone: (e.target as HTMLInputElement).value })}
            ></ha-textfield>
            <ha-textfield
              .value=${zs.label ?? ''}
              label="Display label"
              @input=${(e: InputEvent) => this._updateZoneStyle(i, { label: (e.target as HTMLInputElement).value || undefined })}
            ></ha-textfield>
            <ha-icon-picker
              .value=${zs.icon ?? ''}
              label="Icon"
              @value-changed=${(e: CustomEvent) => this._updateZoneStyle(i, { icon: e.detail.value || undefined })}
            ></ha-icon-picker>
            <div class="color-row">
              <label style="font-size:0.75rem">BG</label>
              <input type="color" .value=${zs.background_color ?? '#1c1c2e'}
                @input=${(e: InputEvent) => this._updateZoneStyle(i, { background_color: (e.target as HTMLInputElement).value })} />
            </div>
            <div class="color-row">
              <label style="font-size:0.75rem">Border</label>
              <input type="color" .value=${zs.border_color ?? '#ffffff'}
                @input=${(e: InputEvent) => this._updateZoneStyle(i, { border_color: (e.target as HTMLInputElement).value })} />
            </div>
            <button class="delete-btn" @click=${() => this._removeZoneStyle(i)}>
              <ha-icon .icon=${'mdi:delete'}></ha-icon>
            </button>
          </div>
        `)}
        <button class="add-btn" @click=${() => this._addZoneStyle()}>
          <ha-icon .icon=${'mdi:plus-circle'}></ha-icon> Add Zone Style
        </button>
      </div>
    `;
  }

  private _updateZoneStyle(index: number, patch: Partial<ZoneStyleConfig>) {
    const zoneStyles = [...(this._config.zone_styles ?? [])];
    zoneStyles[index] = { ...zoneStyles[index], ...patch };
    this._set({ zone_styles: zoneStyles });
  }

  private _removeZoneStyle(index: number) {
    const zoneStyles = [...(this._config.zone_styles ?? [])];
    zoneStyles.splice(index, 1);
    this._set({ zone_styles: zoneStyles });
  }

  private _addZoneStyle() {
    const zoneStyles = [...(this._config.zone_styles ?? []), { zone: '' }];
    this._set({ zone_styles: zoneStyles });
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
          <div class="condition-row">
            <ha-entity-picker .hass=${this.hass} .value=${cond.entity} label="Entity"
              @value-changed=${(e: CustomEvent) => this._updateCondition(ri, ci, { entity: e.detail.value })}
            ></ha-entity-picker>
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
              @input=${(e: InputEvent) => this._updateCondition(ri, ci, { value: (e.target as HTMLInputElement).value })}
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
    const conditions = [...(this._config.conditions ?? [])];
    conditions[index] = { ...conditions[index], ...patch };
    this._set({ conditions });
  }

  private _removeRule(index: number) {
    const conditions = [...(this._config.conditions ?? [])];
    conditions.splice(index, 1);
    this._set({ conditions });
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

  private _renderDisplayTab() {
    const etaEntity = this._config.devices?.find(d => d.name === '__eta__')?.entity ?? '';
    return html`
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
        <ha-entity-picker
          .hass=${this.hass}
          .value=${etaEntity}
          .includeDomains=${['sensor']}
          label="Travel time sensor"
          @value-changed=${(e: CustomEvent) => {
            const devices = (this._config.devices ?? []).filter(d => d.name !== '__eta__');
            if (e.detail.value) devices.push({ entity: e.detail.value, name: '__eta__' });
            this._set({ devices });
          }}
        ></ha-entity-picker>
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
    `;
  }

  render() {
    if (!this._config) return html``;

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
