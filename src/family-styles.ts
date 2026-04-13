// src/family-styles.ts
import { css } from 'lit';

export const familyCardStyles = css`
  :host {
    display: block;
    font-family: var(--person-card-font-family, 'Segoe UI', system-ui, sans-serif);
    border-radius: var(--person-card-border-radius, 16px);
    overflow: hidden;
    position: relative;
    background: var(--pc-background, #1c1c2e);
    color: #ffffff;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
    border: var(--pc-border-width, 0px) solid var(--pc-border-color, transparent);
  }

  .card-background {
    position: absolute; inset: 0;
    background-image: var(--pc-background-image, none);
    background-size: cover; background-position: center;
    opacity: 0.25; pointer-events: none; border-radius: inherit;
  }

  .card-content { position: relative; z-index: 1; padding: 12px 14px; }

  .card-header {
    display: flex; align-items: center; gap: 8px;
    margin-bottom: 10px; padding-bottom: 8px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .card-title {
    flex: 1; font-size: 0.85rem; font-weight: 700;
    letter-spacing: 0.04em; color: rgba(255,255,255,0.6);
    text-transform: uppercase;
  }

  /* Person row — all tiers */
  .person-row {
    border-radius: 10px;
    margin-bottom: 6px;
    overflow: hidden;
    border-left: 3px solid var(--row-accent, rgba(255,255,255,0.1));
    background: rgba(255,255,255,0.05);
    cursor: pointer;
    transition: background 0.15s;
  }
  .person-row:last-child { margin-bottom: 0; }
  .person-row:hover { background: rgba(255,255,255,0.08); }

  .person-row-inner {
    display: flex; align-items: center; gap: 10px; padding: 9px 10px;
  }

  .avatar {
    width: 36px; height: 36px; border-radius: 50%; object-fit: cover;
    background: #2d2d50; border: 2px solid rgba(255,255,255,0.1); flex-shrink: 0;
  }
  .avatar-placeholder {
    width: 36px; height: 36px; border-radius: 50%; background: #2d2d50;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .avatar-placeholder ha-icon { --mdc-icon-size: 18px; color: rgba(255,255,255,0.4); }
  .avatar.stale, .avatar-placeholder.stale { opacity: 0.55; filter: grayscale(60%); }

  /* compact tier */
  :host([density='compact']) .avatar,
  :host([density='compact']) .avatar-placeholder { width: 32px; height: 32px; }

  .person-info { flex: 1; min-width: 0; }
  .person-name { font-size: 0.9rem; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .person-zone { font-size: 0.72rem; color: rgba(255,255,255,0.55); margin-top: 1px; }

  .person-row-meta { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }

  .device-summary { display: flex; align-items: center; gap: 4px; }
  .device-summary-pct { font-size: 0.72rem; font-weight: 600; }

  .status-dot { width: 8px; height: 8px; border-radius: 50%; }

  .chevron { color: rgba(255,255,255,0.3); font-size: 0.75rem; flex-shrink: 0; transition: transform 0.2s; }
  .chevron.open { transform: rotate(180deg); }

  /* Expanded panel */
  .expanded-panel {
    padding: 0 10px 10px 10px;
    margin-left: 46px;
    border-top: 1px solid rgba(255,255,255,0.08);
    padding-top: 8px;
  }

  .device-list { display: flex; flex-direction: column; gap: 5px; margin-bottom: 8px; }

  .expanded-footer {
    display: flex; gap: 14px; flex-wrap: wrap;
    font-size: 0.72rem; color: rgba(255,255,255,0.4);
    margin-top: 6px;
  }

  .view-full-link {
    font-size: 0.72rem; cursor: pointer;
    text-align: right; margin-top: 6px;
    color: var(--row-accent, #80deea);
    text-decoration: none;
  }

  /* mini tier grid */
  :host([density='mini']) .card-content > .person-rows {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 8px;
  }
  :host([density='mini']) .person-row { margin-bottom: 0; }
`;
