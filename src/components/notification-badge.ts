import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

@customElement('person-card-notification-badge')
export class NotificationBadge extends LitElement {
  @property() color = '#f44336';
  @property() icon = 'mdi:alert-circle';

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .badge {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--badge-bg, #f44336);
      box-shadow: 0 0 8px var(--badge-bg, #f44336);
    }
  `;

  render() {
    return html`
      <div class="badge" style=${styleMap({ '--badge-bg': this.color } as Record<string, string>)}>
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
