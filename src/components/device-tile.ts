import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { DeviceConfig, ConnectivityState } from '../types';
import { getBatteryLevel, getConnectivity } from '../lib/ha-helpers';
import type { HomeAssistant } from 'custom-card-helpers';

@customElement('person-card-device-tile')
export class DeviceTile extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ type: Object }) device!: DeviceConfig;
  @property({ type: Boolean }) showLabels = false;

  static styles = css`
    :host { display: flex; align-items: center; gap: 8px; }

    ha-icon {
      --mdc-icon-size: 18px;
      color: rgba(255,255,255,0.7);
      flex-shrink: 0;
    }

    .name {
      font-size: 0.82rem;
      color: rgba(255,255,255,0.75);
      min-width: 60px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .battery-bar-wrap {
      flex: 1;
      height: 4px;
      background: rgba(255,255,255,0.1);
      border-radius: 2px;
      overflow: hidden;
    }

    .battery-bar-fill {
      height: 100%;
      border-radius: 2px;
      transition: width 0.3s ease, background 0.3s ease;
    }

    .battery-pct {
      font-size: 0.75rem;
      color: rgba(255,255,255,0.55);
      min-width: 30px;
      text-align: right;
    }

    .conn-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .conn-dot.online  { background: #4caf50; }
    .conn-dot.offline { background: rgba(255,255,255,0.2); }
    .conn-dot.unknown { background: #ff9800; }
  `;

  private batteryColor(level: number): string {
    const threshold = this.device.battery_threshold ?? 20;
    if (level <= threshold) return '#f44336';
    if (level < 50) return '#ff9800';
    return '#4caf50';
  }

  render() {
    if (!this.hass || !this.device) return html``;
    const battery = getBatteryLevel(this.hass, this.device);
    const conn: ConnectivityState = getConnectivity(this.hass, this.device);
    const icon = this.device.icon ?? 'mdi:cellphone';
    const name = this.device.name ?? this.device.entity.split('.')[1].replace(/_/g, ' ');

    return html`
      <ha-icon .icon=${icon}></ha-icon>
      ${this.showLabels ? html`<span class="name">${name}</span>` : ''}
      ${battery !== null ? html`
        <div class="battery-bar-wrap">
          <div class="battery-bar-fill" style="width:${battery}%;background:${this.batteryColor(battery)}"></div>
        </div>
        <span class="battery-pct">${battery}%</span>
      ` : ''}
      <div class="conn-dot ${conn}"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'person-card-device-tile': DeviceTile;
  }
}
