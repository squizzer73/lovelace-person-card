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
    background: rgba(255, 255, 255, 0.10);
    backdrop-filter: blur(28px) saturate(180%) brightness(1.05);
    -webkit-backdrop-filter: blur(28px) saturate(180%) brightness(1.05);
    border: 1px solid rgba(255, 255, 255, 0.38);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.35),
      inset 0 -1px 0 rgba(255, 255, 255, 0.08),
      inset 1px 0 0 rgba(255, 255, 255, 0.12),
      inset -1px 0 0 rgba(255, 255, 255, 0.12);
    border-radius: var(--person-card-border-radius, 20px);
    color: rgba(255, 255, 255, 0.92);
  }
  :host([card-theme="glass"]) .avatar {
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.35);
  }
  :host([card-theme="glass"]) .avatar-placeholder {
    background: rgba(255, 255, 255, 0.12);
    border: 2px solid rgba(255, 255, 255, 0.45);
  }
  :host([card-theme="glass"]) .person-row {
    background: rgba(255, 255, 255, 0.07);
    border-left-color: var(--row-accent, rgba(255, 255, 255, 0.25));
  }
  :host([card-theme="glass"]) .person-row:hover {
    background: rgba(255, 255, 255, 0.12);
  }
  :host([card-theme="glass"]) .summary-bar {
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }
  :host([card-theme="glass"]) .zone-group-header {
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }

  /* ── Sci-Fi ─────────────────────────────────────── */
  :host([card-theme="scifi"]) {
    background: linear-gradient(160deg, #030f22 0%, #010810 100%);
    border: 1px solid var(--pc-border-color, #00c8f0);
    border-radius: 2px;
    box-shadow:
      0 0 0 1px rgba(0, 200, 240, 0.12),
      0 0 20px var(--pc-glow-color, rgba(0, 200, 240, 0.2)),
      0 0 50px var(--pc-glow-color, rgba(0, 200, 240, 0.08)),
      inset 0 0 40px rgba(0, 60, 100, 0.12);
    font-family: 'Courier New', 'Consolas', monospace;
  }
  :host([card-theme="scifi"])::before {
    content: '';
    position: absolute;
    top: 5px; left: 5px;
    width: 20px; height: 20px;
    border-top: 2px solid var(--pc-border-color, #00c8f0);
    border-left: 2px solid var(--pc-border-color, #00c8f0);
    pointer-events: none;
    z-index: 10;
    filter: drop-shadow(0 0 4px var(--pc-glow-color, rgba(0, 200, 240, 0.8)));
  }
  :host([card-theme="scifi"])::after {
    content: '';
    position: absolute;
    bottom: 5px; right: 5px;
    width: 20px; height: 20px;
    border-bottom: 2px solid var(--pc-border-color, #00c8f0);
    border-right: 2px solid var(--pc-border-color, #00c8f0);
    pointer-events: none;
    z-index: 10;
    filter: drop-shadow(0 0 4px var(--pc-glow-color, rgba(0, 200, 240, 0.8)));
  }
  :host([card-theme="scifi"]) .card-content::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(160deg, rgba(0, 200, 240, 0.04) 0%, transparent 40%),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 3px,
        rgba(0, 0, 0, 0.14) 3px,
        rgba(0, 0, 0, 0.14) 4px
      );
    pointer-events: none;
    z-index: 1;
  }
  :host([card-theme="scifi"]) .avatar {
    border-radius: 2px;
    border-color: var(--row-accent, #00c8f0);
    background: #010d1e;
    box-shadow: 0 0 10px rgba(0, 200, 240, 0.25);
  }
  :host([card-theme="scifi"]) .avatar-placeholder {
    background: #010d1e;
    border-radius: 2px;
    border: 1px solid var(--row-accent, #00c8f0);
  }
  :host([card-theme="scifi"]) .person-name {
    color: var(--row-accent, #00c8f0);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    font-size: 0.85em;
    text-shadow: 0 0 6px rgba(0, 200, 240, 0.5);
  }
  :host([card-theme="scifi"]) .person-row {
    background: rgba(0, 200, 240, 0.04);
    border-radius: 2px;
  }
  :host([card-theme="scifi"]) .zone-group-header {
    border-bottom-color: rgba(0, 200, 240, 0.2);
  }
  :host([card-theme="scifi"]) .group-label {
    letter-spacing: 0.1em;
    color: rgba(0, 200, 240, 0.5);
  }
  :host([card-theme="scifi"]) .summary-bar {
    border-bottom-color: rgba(0, 200, 240, 0.2);
  }

  /* ── Steampunk ──────────────────────────────────── */
  :host([card-theme="steampunk"]) {
    background: linear-gradient(160deg, #1a0f00 0%, #0e0800 60%, #060400 100%);
    border: 3px solid var(--pc-border-color, #8a5a1e);
    border-radius: 3px;
    box-shadow:
      0 0 0 1px #2a1a08,
      0 0 0 5px #110a00,
      0 0 0 7px var(--pc-border-color, #6a4418),
      inset 0 0 30px rgba(150, 90, 20, 0.06),
      inset 0 1px 0 rgba(255, 200, 80, 0.08),
      0 8px 40px rgba(0, 0, 0, 0.7);
    font-family: Georgia, 'Times New Roman', serif;
    color: #d4a84b;
  }
  :host([card-theme="steampunk"])::before {
    content: '';
    position: absolute;
    top: 7px; left: 7px;
    width: 11px; height: 11px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #d4922a, #5a3810);
    border: 1px solid #9a6a20;
    box-shadow: inset 0 1px 2px rgba(255, 220, 100, 0.3), 0 1px 3px rgba(0, 0, 0, 0.6);
    pointer-events: none;
    z-index: 10;
  }
  :host([card-theme="steampunk"])::after {
    content: '';
    position: absolute;
    bottom: 7px; right: 7px;
    width: 11px; height: 11px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #d4922a, #5a3810);
    border: 1px solid #9a6a20;
    box-shadow: inset 0 1px 2px rgba(255, 220, 100, 0.3), 0 1px 3px rgba(0, 0, 0, 0.6);
    pointer-events: none;
    z-index: 10;
  }
  :host([card-theme="steampunk"]) .avatar {
    border-color: var(--row-accent, #a0682a);
    background: radial-gradient(circle, #1e1000, #0e0800);
    box-shadow: 0 0 10px rgba(160, 104, 42, 0.3);
  }
  :host([card-theme="steampunk"]) .avatar-placeholder {
    background: radial-gradient(circle, #1e1000, #0e0800);
    border: 2px solid var(--row-accent, #a0682a);
  }
  :host([card-theme="steampunk"]) .person-name {
    color: #e8c878;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }
  :host([card-theme="steampunk"]) .person-row {
    background: rgba(160, 104, 42, 0.06);
    border-radius: 2px;
  }
  :host([card-theme="steampunk"]) .zone-group-header {
    border-bottom-color: rgba(160, 104, 42, 0.3);
  }
  :host([card-theme="steampunk"]) .group-label {
    color: rgba(232, 192, 112, 0.5);
    font-style: italic;
  }
  :host([card-theme="steampunk"]) .summary-bar {
    border-bottom-color: rgba(160, 104, 42, 0.25);
  }

  /* ── Terminal ───────────────────────────────────── */
  @keyframes fc-terminal-scroll {
    from { background-position: 0 0; }
    to   { background-position: 0 -120px; }
  }
  :host([card-theme="terminal"]) {
    background: #000;
    border: 1px solid var(--pc-border-color, #00ff41);
    border-radius: 0;
    box-shadow:
      0 0 8px var(--pc-glow-color, rgba(0, 255, 65, 0.35)),
      0 0 30px var(--pc-glow-color, rgba(0, 255, 65, 0.12)),
      inset 0 0 40px rgba(0, 20, 0, 0.6);
    font-family: 'Courier New', 'Consolas', monospace;
    color: var(--pc-border-color, #00ff41);
  }
  :host([card-theme="terminal"]) .card-content::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      repeating-linear-gradient(
        0deg,
        rgba(0, 255, 65, 0.028) 0px,
        rgba(0, 255, 65, 0.028) 10px,
        transparent 10px,
        transparent 12px
      );
    background-size: 100% 12px;
    animation: fc-terminal-scroll 2.5s linear infinite;
    pointer-events: none;
    z-index: 1;
  }
  :host([card-theme="terminal"]) .card-content::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 3px,
        rgba(0, 0, 0, 0.18) 3px,
        rgba(0, 0, 0, 0.18) 4px
      ),
      radial-gradient(ellipse at center, transparent 45%, rgba(0, 0, 0, 0.55) 100%);
    pointer-events: none;
    z-index: 2;
  }
  :host([card-theme="terminal"]) .avatar {
    border-radius: 0;
    border-color: var(--row-accent, #00ff41);
    background: #001500;
    box-shadow: 0 0 8px rgba(0, 255, 65, 0.25);
  }
  :host([card-theme="terminal"]) .avatar-placeholder {
    background: #001500;
    border-radius: 0;
    border: 1px solid var(--row-accent, #00ff41);
  }
  :host([card-theme="terminal"]) .person-name {
    color: var(--row-accent, #00ff41);
    letter-spacing: 0.08em;
    text-shadow: 0 0 6px rgba(0, 255, 65, 0.5);
  }
  :host([card-theme="terminal"]) .person-row {
    background: rgba(0, 255, 65, 0.03);
    border-radius: 0;
  }
  :host([card-theme="terminal"]) .zone-group-header {
    border-bottom-color: rgba(0, 255, 65, 0.2);
  }
  :host([card-theme="terminal"]) .group-label {
    color: rgba(0, 255, 65, 0.4);
    letter-spacing: 0.1em;
  }
  :host([card-theme="terminal"]) .summary-bar {
    border-bottom-color: rgba(0, 255, 65, 0.2);
  }

  /* ── Neon Noir ──────────────────────────────────── */
  :host([card-theme="neon"]) {
    background: linear-gradient(160deg, #0a0018 0%, #060010 100%);
    border: 2px solid var(--pc-border-color, #e000ff);
    border-radius: 14px;
    box-shadow:
      0 0 6px var(--pc-border-color, #e000ff),
      0 0 20px var(--pc-glow-color, rgba(224, 0, 255, 0.45)),
      0 0 60px var(--pc-glow-color, rgba(224, 0, 255, 0.18)),
      inset 0 0 20px rgba(200, 0, 255, 0.04);
  }
  :host([card-theme="neon"])::before {
    content: '';
    position: absolute;
    top: -2px; left: 12%; right: 12%;
    height: 2px;
    background: var(--pc-border-color, #e000ff);
    box-shadow:
      0 0 6px 1px var(--pc-border-color, #e000ff),
      0 0 18px 4px var(--pc-glow-color, rgba(224, 0, 255, 0.6));
    border-radius: 2px;
    pointer-events: none;
    z-index: 2;
  }
  :host([card-theme="neon"])::after {
    content: '';
    position: absolute;
    bottom: -2px; left: 12%; right: 12%;
    height: 2px;
    background: var(--pc-border-color, #e000ff);
    box-shadow:
      0 0 6px 1px var(--pc-border-color, #e000ff),
      0 0 18px 4px var(--pc-glow-color, rgba(224, 0, 255, 0.6));
    border-radius: 2px;
    pointer-events: none;
    z-index: 2;
  }
  :host([card-theme="neon"]) .avatar {
    border-color: var(--row-accent, #e000ff);
    background: linear-gradient(135deg, #2a0050, #580078);
    box-shadow: 0 0 12px rgba(224, 0, 255, 0.45);
  }
  :host([card-theme="neon"]) .avatar-placeholder {
    background: linear-gradient(135deg, #2a0050, #580078);
    border: 2px solid var(--row-accent, #e000ff);
    box-shadow: 0 0 12px rgba(224, 0, 255, 0.45);
  }
  :host([card-theme="neon"]) .person-name {
    color: #fff;
    font-weight: 700;
    text-shadow: 0 0 8px var(--row-accent, #e000ff), 0 0 20px rgba(224, 0, 255, 0.4);
  }
  :host([card-theme="neon"]) .person-row {
    background: rgba(200, 0, 255, 0.05);
  }
  :host([card-theme="neon"]) .zone-group-header {
    border-bottom-color: rgba(200, 0, 255, 0.2);
  }
  :host([card-theme="neon"]) .summary-bar {
    border-bottom-color: rgba(200, 0, 255, 0.15);
  }
`;
