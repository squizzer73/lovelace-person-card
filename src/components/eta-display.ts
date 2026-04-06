import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';

@customElement('person-card-eta-display')
export class EtaDisplay extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property() etaEntity = '';
  @property() personZone = '';

  static styles = css`
    :host { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: rgba(255,255,255,0.65); }
    ha-icon { --mdc-icon-size: 14px; }
  `;

  render() {
    if (!this.etaEntity || this.personZone === 'home') return html``;

    const etaState = this.hass.states[this.etaEntity];
    if (!etaState) return html``;

    const minutes = parseFloat(etaState.state);
    if (isNaN(minutes)) return html``;

    const display = minutes < 1 ? 'arriving' : `${Math.round(minutes)} min`;

    return html`
      <ha-icon icon="mdi:clock-outline"></ha-icon>
      <span>ETA home: ${display}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'person-card-eta-display': EtaDisplay;
  }
}
