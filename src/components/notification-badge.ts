import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('person-card-notification-badge')
export class NotificationBadge extends LitElement {
  @property() color = '#f44336';
  @property() icon = 'mdi:alert-circle';

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      flex-shrink: 0;
    }
  `;

  render() {
    return html`
      <div style="
        background:${this.color};
        border-radius:50%;
        width:22px;
        height:22px;
        display:flex;
        align-items:center;
        justify-content:center;
        box-shadow:0 0 8px ${this.color}88;
      ">
        <ha-icon .icon=${this.icon} style="color:#fff;--mdc-icon-size:14px"></ha-icon>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'person-card-notification-badge': NotificationBadge;
  }
}
