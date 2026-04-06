import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { formatLastSeen } from '../lib/ha-helpers';

@customElement('person-card-last-seen')
export class LastSeen extends LitElement {
  @property() lastUpdated = '';
  @property() format: 'relative' | 'absolute' = 'relative';

  @state() private _tick = 0;
  private _interval?: ReturnType<typeof setInterval>;

  static styles = css`
    :host { display: flex; align-items: center; gap: 6px; font-size: 0.78rem; color: rgba(255,255,255,0.45); }
    ha-icon { --mdc-icon-size: 13px; }
  `;

  connectedCallback() {
    super.connectedCallback();
    if (this.format === 'relative') {
      this._interval = setInterval(() => { this._tick++; }, 60_000);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._interval) clearInterval(this._interval);
  }

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('format')) {
      if (this._interval) clearInterval(this._interval);
      this._interval = undefined;
      if (this.format === 'relative') {
        this._interval = setInterval(() => { this._tick++; }, 60_000);
      }
    }
  }

  render() {
    if (!this.lastUpdated) return html``;
    void this._tick;
    const text = formatLastSeen(this.lastUpdated, this.format);
    return html`
      <ha-icon icon="mdi:clock-check-outline"></ha-icon>
      <span>Last seen: ${text}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'person-card-last-seen': LastSeen;
  }
}
