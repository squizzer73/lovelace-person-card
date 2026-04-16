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

  /* ── Summary bar ─────────────────────────────────────── */
  .summary-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 14px;
    padding-bottom: 10px;
    margin-bottom: 6px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .summary-item {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .summary-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .summary-count {
    font-size: 0.85rem;
    font-weight: 700;
    color: rgba(255,255,255,0.9);
  }

  .summary-label {
    font-size: 0.75rem;
    color: rgba(255,255,255,0.45);
    white-space: nowrap;
  }

  /* ── Zone group header ───────────────────────────────── */
  .zone-group {
    margin-bottom: 4px;
  }

  .zone-group + .zone-group {
    margin-top: 10px;
  }

  .zone-group-header {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 5px 2px 4px;
    margin-bottom: 4px;
    border-bottom: 1px solid var(--group-accent, rgba(255,255,255,0.1));
  }

  .group-icon {
    --mdc-icon-size: 13px;
    flex-shrink: 0;
  }

  .group-label {
    flex: 1;
    font-size: 0.66rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
  }

  .group-count {
    font-size: 0.66rem;
    font-weight: 700;
    color: rgba(255,255,255,0.3);
    background: rgba(255,255,255,0.07);
    border-radius: 8px;
    padding: 1px 6px;
  }

  /* ── Person row — all tiers ──────────────────────────── */
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

  /* ── Expanded panel ──────────────────────────────────── */
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

  /* ── Mini tier grid ──────────────────────────────────── */
  .person-rows.mini-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 8px;
  }
  .person-rows.mini-grid .person-row { margin-bottom: 0; }

  /* ══════════════════════════════════════════════════
     CARD THEMES — Family Card
     Same five themes as Person Card.
     Per-person row accents (--row-accent) are zone-driven
     inline styles and continue to work unchanged within
     each theme.
  ══════════════════════════════════════════════════ */

  /* ── Glass ──────────────────────────────────────── */
  :host([card-theme="glass"]) {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(24px) saturate(160%);
    -webkit-backdrop-filter: blur(24px) saturate(160%);
    border: 1px solid var(--pc-border-color, rgba(255, 255, 255, 0.22));
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.18);
    border-radius: var(--person-card-border-radius, 16px);
  }
  :host([card-theme="glass"]) .avatar {
    border-color: rgba(255, 255, 255, 0.35);
    background: rgba(255, 255, 255, 0.12);
  }
  :host([card-theme="glass"]) .avatar-placeholder {
    background: rgba(255, 255, 255, 0.12);
    border: 2px solid rgba(255, 255, 255, 0.35);
  }
  :host([card-theme="glass"]) .person-row {
    background: rgba(255, 255, 255, 0.06);
    border-left-color: var(--row-accent, rgba(255, 255, 255, 0.2));
  }
  :host([card-theme="glass"]) .person-row:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  :host([card-theme="glass"]) .summary-bar {
    border-bottom-color: rgba(255, 255, 255, 0.07);
  }
  :host([card-theme="glass"]) .zone-group-header {
    border-bottom-color: rgba(255, 255, 255, 0.07);
  }

  /* ── Sci-Fi ─────────────────────────────────────── */
  :host([card-theme="scifi"]) {
    background: #030f22;
    border: 1px solid var(--pc-border-color, #00c8f0);
    border-radius: 4px;
    box-shadow: 0 0 22px var(--pc-glow-color, rgba(0, 200, 240, 0.22));
    font-family: 'Courier New', 'Consolas', monospace;
  }
  :host([card-theme="scifi"]) .card-content::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.18) 2px,
      rgba(0, 0, 0, 0.18) 4px
    );
    pointer-events: none;
    z-index: 100;
  }
  :host([card-theme="scifi"]) .avatar {
    border-radius: 2px;
    border-color: var(--row-accent, #00c8f0);
    background: #021020;
  }
  :host([card-theme="scifi"]) .avatar-placeholder {
    background: #021020;
    border-radius: 2px;
    border: 1px solid var(--row-accent, #00c8f0);
  }
  :host([card-theme="scifi"]) .person-name {
    color: var(--row-accent, #00c8f0);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  :host([card-theme="scifi"]) .person-row {
    background: rgba(0, 200, 240, 0.04);
    border-radius: 2px;
  }
  :host([card-theme="scifi"]) .zone-group-header {
    border-bottom-color: rgba(0, 200, 240, 0.15);
  }
  :host([card-theme="scifi"]) .group-label {
    letter-spacing: 0.1em;
  }
  :host([card-theme="scifi"]) .summary-bar {
    border-bottom-color: rgba(0, 200, 240, 0.15);
  }

  /* ── Steampunk ──────────────────────────────────── */
  :host([card-theme="steampunk"]) {
    background: linear-gradient(160deg, #1e1200 0%, #140c00 100%);
    border: 2px solid var(--pc-border-color, #a0682a);
    border-radius: 6px;
    box-shadow: 0 4px 24px rgba(160, 104, 42, 0.25), inset 0 1px 0 rgba(255, 210, 120, 0.08);
    font-family: Georgia, 'Times New Roman', serif;
  }
  :host([card-theme="steampunk"]) .avatar {
    border-color: var(--row-accent, #a0682a);
    background: #1a0e00;
  }
  :host([card-theme="steampunk"]) .avatar-placeholder {
    background: #1a0e00;
    border: 2px solid var(--row-accent, #a0682a);
  }
  :host([card-theme="steampunk"]) .person-name {
    color: #e8c070;
  }
  :host([card-theme="steampunk"]) .person-row {
    background: rgba(160, 104, 42, 0.06);
    border-radius: 3px;
  }
  :host([card-theme="steampunk"]) .zone-group-header {
    border-bottom-color: rgba(160, 104, 42, 0.25);
  }
  :host([card-theme="steampunk"]) .group-label {
    color: rgba(232, 192, 112, 0.5);
  }
  :host([card-theme="steampunk"]) .summary-bar {
    border-bottom-color: rgba(160, 104, 42, 0.2);
  }

  /* ── Terminal ───────────────────────────────────── */
  :host([card-theme="terminal"]) {
    background: #000;
    border: 1px solid var(--pc-border-color, #00ff41);
    border-radius: 0;
    box-shadow: 0 0 14px var(--pc-glow-color, rgba(0, 255, 65, 0.3));
    font-family: 'Courier New', 'Consolas', monospace;
  }
  :host([card-theme="terminal"]) .card-content::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.22) 2px,
      rgba(0, 0, 0, 0.22) 4px
    );
    pointer-events: none;
    z-index: 100;
  }
  :host([card-theme="terminal"]) .avatar {
    border-radius: 0;
    border-color: var(--row-accent, #00ff41);
    background: #001100;
  }
  :host([card-theme="terminal"]) .avatar-placeholder {
    background: #001100;
    border-radius: 0;
    border: 1px solid var(--row-accent, #00ff41);
  }
  :host([card-theme="terminal"]) .person-name {
    color: var(--row-accent, #00ff41);
    letter-spacing: 0.08em;
  }
  :host([card-theme="terminal"]) .person-row {
    background: rgba(0, 255, 65, 0.03);
    border-radius: 0;
  }
  :host([card-theme="terminal"]) .zone-group-header {
    border-bottom-color: rgba(0, 255, 65, 0.15);
  }
  :host([card-theme="terminal"]) .group-label {
    color: rgba(0, 255, 65, 0.4);
    letter-spacing: 0.1em;
  }
  :host([card-theme="terminal"]) .summary-bar {
    border-bottom-color: rgba(0, 255, 65, 0.15);
  }

  /* ── Neon Noir ──────────────────────────────────── */
  :host([card-theme="neon"]) {
    background: linear-gradient(160deg, #0d001f 0%, #090016 100%);
    border: 1px solid var(--pc-border-color, #c800ff);
    border-radius: 12px;
    box-shadow: 0 0 28px var(--pc-glow-color, rgba(200, 0, 255, 0.28));
  }
  :host([card-theme="neon"]) .card-content::before {
    content: '';
    position: absolute;
    top: 0;
    left: 15%;
    right: 15%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--pc-border-color, #c800ff), transparent);
    pointer-events: none;
    z-index: 2;
  }
  :host([card-theme="neon"]) .avatar {
    border-color: var(--row-accent, #c800ff);
    background: linear-gradient(135deg, #2d0060, #600080);
    box-shadow: 0 0 10px rgba(200, 0, 255, 0.35);
  }
  :host([card-theme="neon"]) .avatar-placeholder {
    background: linear-gradient(135deg, #2d0060, #600080);
    border: 2px solid var(--row-accent, #c800ff);
    box-shadow: 0 0 10px rgba(200, 0, 255, 0.35);
  }
  :host([card-theme="neon"]) .person-row {
    background: rgba(200, 0, 255, 0.05);
  }
  :host([card-theme="neon"]) .zone-group-header {
    border-bottom-color: rgba(200, 0, 255, 0.15);
  }
  :host([card-theme="neon"]) .summary-bar {
    border-bottom-color: rgba(200, 0, 255, 0.12);
  }
`;
