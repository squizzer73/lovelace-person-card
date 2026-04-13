import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { ZoneStyleConfig } from '../shared/types';
import { COLOR_SCHEMES } from '../shared/constants';

@customElement('person-card-zone-editor')
export class ZoneEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ type: Array }) zoneStyles: ZoneStyleConfig[] = [];

  static styles = css`
    .zone-block {
      border: 1px solid var(--divider-color, rgba(0,0,0,0.15));
      border-radius: 8px; padding: 8px; margin-bottom: 8px;
    }
    .zone-row { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
    .zone-row > * { flex: 1; min-width: 0; }
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
    .color-row { display: flex; align-items: center; gap: 8px; }
    ha-textfield, ha-icon-picker { display: block; width: 100%; }
  `;

  private _fire(zoneStyles: ZoneStyleConfig[]) {
    this.dispatchEvent(new CustomEvent('zone-styles-changed', {
      detail: { zoneStyles },
      bubbles: true,
      composed: true,
    }));
  }

  private _update(index: number, patch: Partial<ZoneStyleConfig>) {
    const updated = [...this.zoneStyles];
    updated[index] = { ...updated[index], ...patch };
    this._fire(updated);
  }

  private _remove(index: number) {
    const updated = [...this.zoneStyles];
    updated.splice(index, 1);
    this._fire(updated);
  }

  private _add() {
    this._fire([...this.zoneStyles, { zone: '' }]);
  }

  private _autoDetect() {
    if (!this.hass) return;
    const existingMap = new Map(this.zoneStyles.map((z, i) => [z.zone, i]));

    // Backfill colours for existing zones that are missing them
    let updated = [...this.zoneStyles];
    let colorIndex = 0;
    updated = updated.map((z, i) => {
      if (!z.border_color) {
        const scheme = COLOR_SCHEMES[(i + colorIndex) % COLOR_SCHEMES.length];
        colorIndex++;
        return { ...z, background_color: z.background_color ?? scheme.bg, border_color: scheme.border };
      }
      return z;
    });

    // Add newly detected zones that don't yet exist in the config
    const detected = Object.entries(this.hass.states)
      .filter(([id]) => id.startsWith('zone.'))
      .map(([id, state]) => {
        const zoneName = id.replace('zone.', '');
        return {
          zone: zoneName,
          label: (state.attributes['friendly_name'] as string | undefined) ?? zoneName,
          icon: (state.attributes['icon'] as string | undefined) ?? 'mdi:map-marker',
        };
      })
      .filter(z => !existingMap.has(z.zone));

    if (detected.length > 0) {
      // Assign a colour scheme to each new zone, cycling through the palette
      const startIndex = updated.length;
      const detectedWithColors = detected.map((z, i) => {
        const scheme = COLOR_SCHEMES[(startIndex + i) % COLOR_SCHEMES.length];
        return { ...z, background_color: scheme.bg, border_color: scheme.border };
      });
      updated = [...updated, ...detectedWithColors];
    }

    this._fire(updated);
  }

  render() {
    return html`
      <button class="add-btn" style="margin-bottom:8px" @click=${() => this._autoDetect()}>
        <ha-icon .icon=${'mdi:magnify'}></ha-icon> Auto-detect zones from HA
      </button>
      ${this.zoneStyles.map((zs, i) => html`
        <div class="zone-block">
          <div class="zone-row">
            <ha-textfield
              .value=${zs.zone}
              label="Zone name"
              @input=${(e: InputEvent) => this._update(i, { zone: (e.target as HTMLInputElement).value })}
            ></ha-textfield>
            <ha-textfield
              .value=${zs.label ?? ''}
              label="Display label"
              @input=${(e: InputEvent) => this._update(i, { label: (e.target as HTMLInputElement).value || undefined })}
            ></ha-textfield>
            <div style="flex:1;min-width:0">
              <ha-icon-picker
                .value=${zs.icon ?? ''}
                label="Icon"
                @value-changed=${(e: CustomEvent) => this._update(i, { icon: e.detail.value || undefined })}
              ></ha-icon-picker>
            </div>
            <button class="delete-btn" @click=${() => this._remove(i)}>
              <ha-icon .icon=${'mdi:delete'}></ha-icon>
            </button>
          </div>
          <div class="scheme-row">
            ${COLOR_SCHEMES.map(s => html`
              <div class="scheme-swatch"
                title=${s.name}
                style="background:${s.bg};border:3px solid ${s.border}"
                @click=${() => this._update(i, { background_color: s.bg, border_color: s.border })}
              ></div>
            `)}
            <div class="scheme-divider"></div>
            <div class="color-row">
              <label style="font-size:0.75rem">BG</label>
              <input type="color" .value=${zs.background_color ?? '#1c1c2e'}
                @input=${(e: InputEvent) => this._update(i, { background_color: (e.target as HTMLInputElement).value })} />
            </div>
            <div class="color-row">
              <label style="font-size:0.75rem">Border</label>
              <input type="color" .value=${zs.border_color ?? '#ffffff'}
                @input=${(e: InputEvent) => this._update(i, { border_color: (e.target as HTMLInputElement).value })} />
            </div>
          </div>
        </div>
      `)}
      <button class="add-btn" @click=${() => this._add()}>
        <ha-icon .icon=${'mdi:plus-circle'}></ha-icon> Add Zone Style
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'person-card-zone-editor': ZoneEditor;
  }
}
