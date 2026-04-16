import { css } from 'lit';

export const cardStyles = css`
  :host {
    display: block;
    font-family: var(--person-card-font-family, 'Segoe UI', system-ui, sans-serif);
    border-radius: var(--person-card-border-radius, 16px);
    overflow: hidden;
    position: relative;
    background: var(--pc-background, #1c1c2e);
    color: #ffffff;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
    transition: background 0.4s ease, border-color 0.4s ease, box-shadow 0.3s ease;
    border: var(--pc-border-width, 0px) solid var(--pc-border-color, transparent);
  }

  .card-background {
    position: absolute;
    inset: 0;
    background-image: var(--pc-background-image, none);
    background-size: cover;
    background-position: center;
    opacity: 0.25;
    pointer-events: none;
    border-radius: inherit;
  }

  .card-content {
    position: relative;
    z-index: 1;
    padding: 16px;
  }

  :host([size-tier='small']) .card-content {
    padding: 10px 12px;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
  }

  .avatar-wrapper {
    position: relative;
    flex-shrink: 0;
  }

  .stale-indicator {
    position: absolute;
    bottom: -2px;
    right: -2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #555;
    border: 2px solid var(--pc-background, #1c1c2e);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stale-indicator ha-icon {
    --mdc-icon-size: 10px;
    color: rgba(255,255,255,0.7);
  }

  .avatar.stale { opacity: 0.55; filter: grayscale(60%); }
  .avatar-placeholder.stale { opacity: 0.55; filter: grayscale(60%); }

  .avatar {
    width: var(--person-card-avatar-size, 48px);
    height: var(--person-card-avatar-size, 48px);
    border-radius: 50%;
    object-fit: cover;
    background: #2d2d50;
    border: 2px solid rgba(255,255,255,0.15);
  }

  :host([size-tier='small']) .avatar {
    width: 36px;
    height: 36px;
  }

  :host([size-tier='large']) .avatar {
    width: 64px;
    height: 64px;
  }

  :host([size-tier='small']) .avatar-placeholder {
    width: 36px;
    height: 36px;
  }

  :host([size-tier='large']) .avatar-placeholder {
    width: 64px;
    height: 64px;
  }

  .avatar-placeholder {
    width: var(--person-card-avatar-size, 48px);
    height: var(--person-card-avatar-size, 48px);
    border-radius: 50%;
    background: #2d2d50;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .avatar-placeholder ha-icon {
    --mdc-icon-size: 28px;
    color: rgba(255,255,255,0.5);
  }

  .name-zone {
    flex: 1;
    min-width: 0;
  }

  .name {
    font-size: 1.1rem;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 0.02em;
  }

  :host([size-tier='large']) .name {
    font-size: 1.3rem;
  }

  .divider {
    height: 1px;
    background: rgba(255,255,255,0.1);
    margin: 10px 0;
  }

  .devices {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .footer {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 0.78rem;
    color: rgba(255,255,255,0.55);
  }

  /* ─── Hero tier ──────────────────────────────────────── */

  :host([size-tier='hero']) .card-content {
    padding: 28px 20px 22px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  :host([size-tier='hero']) .avatar-wrapper {
    margin-bottom: 14px;
  }

  :host([size-tier='hero']) .avatar,
  :host([size-tier='hero']) .avatar-placeholder {
    width: 120px;
    height: 120px;
    border: 3px solid rgba(255,255,255,0.2);
  }

  :host([size-tier='hero']) .avatar-placeholder ha-icon {
    --mdc-icon-size: 56px;
  }

  :host([size-tier='hero']) .name {
    font-size: 1.6rem;
    font-weight: 800;
    letter-spacing: 0.01em;
    margin-bottom: 6px;
  }

  :host([size-tier='hero']) .hero-zone {
    margin-bottom: 18px;
  }

  .hero-devices {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    width: 100%;
  }

  .hero-device-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    background: rgba(255,255,255,0.07);
    border-radius: 10px;
    padding: 10px 14px;
    min-width: 68px;
  }

  .hero-device-icon ha-icon {
    --mdc-icon-size: 28px;
    color: rgba(255,255,255,0.85);
  }

  .hero-device-name {
    font-size: 0.68rem;
    color: rgba(255,255,255,0.55);
    white-space: nowrap;
    max-width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .hero-battery-bar {
    width: 48px;
    height: 4px;
    background: rgba(255,255,255,0.15);
    border-radius: 2px;
    overflow: hidden;
  }

  .hero-battery-fill {
    height: 100%;
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  .hero-battery-pct {
    font-size: 0.68rem;
    font-weight: 600;
  }

  .hero-connectivity {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    margin-top: 1px;
  }

  :host([size-tier='hero']) .footer {
    margin-top: 16px;
    flex-direction: row;
    justify-content: center;
  }

  /* ─── Stats tier ─────────────────────────────────────── */

  :host([size-tier='stats']) .card-background {
    opacity: 0.55;
  }

  :host([size-tier='stats']) .card-content {
    padding: 16px;
  }

  :host([size-tier='stats']) .avatar,
  :host([size-tier='stats']) .avatar-placeholder {
    width: 80px;
    height: 80px;
  }

  :host([size-tier='stats']) .avatar-placeholder ha-icon {
    --mdc-icon-size: 38px;
  }

  :host([size-tier='stats']) .name {
    font-size: 1.25rem;
  }

  .stats-since {
    font-size: 0.72rem;
    color: rgba(255,255,255,0.5);
    margin-top: 3px;
  }

  .stats-boxes {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin: 12px 0;
  }

  .stats-box {
    background: rgba(0,0,0,0.3);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 10px;
    padding: 10px 14px;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .stats-box-label {
    font-size: 0.68rem;
    color: rgba(255,255,255,0.45);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .stats-box-value {
    font-size: 1.3rem;
    font-weight: 700;
    color: rgba(255,255,255,0.92);
  }

  :host([size-tier='stats']) .devices {
    background: rgba(0,0,0,0.25);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border-radius: 10px;
    padding: 8px;
  }

  /* ══════════════════════════════════════════════════
     CARD THEMES
     All blocks follow the same pattern:
     - :host([card-theme="X"]) sets structural chrome
     - Zone colours flow in via --pc-border-color (accent)
       and --pc-glow-color (rgba version for box-shadow)
     - Signature defaults are shown when no zone matched
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
  :host([card-theme="glass"]) .divider {
    background: rgba(255, 255, 255, 0.07);
  }
  :host([card-theme="glass"]) .stale-indicator {
    border-color: transparent;
    background: rgba(80, 80, 80, 0.6);
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
    border-radius: inherit;
  }
  :host([card-theme="scifi"]) .avatar {
    border-radius: 2px;
    border-color: var(--pc-border-color, #00c8f0);
    background: #021020;
    box-shadow: 0 0 8px var(--pc-glow-color, rgba(0, 200, 240, 0.3));
  }
  :host([card-theme="scifi"]) .avatar-placeholder {
    background: #021020;
    border-radius: 2px;
    border: 1px solid var(--pc-border-color, #00c8f0);
    box-shadow: 0 0 8px var(--pc-glow-color, rgba(0, 200, 240, 0.3));
  }
  :host([card-theme="scifi"]) .name {
    color: var(--pc-border-color, #00c8f0);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-shadow: 0 0 8px var(--pc-glow-color, rgba(0, 200, 240, 0.5));
  }
  :host([card-theme="scifi"]) .divider {
    background: rgba(0, 200, 240, 0.15);
  }
  :host([card-theme="scifi"]) .footer {
    color: rgba(0, 200, 240, 0.35);
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
    border-color: var(--pc-border-color, #a0682a);
    background: #1a0e00;
    box-shadow: 0 0 10px var(--pc-glow-color, rgba(160, 104, 42, 0.3));
  }
  :host([card-theme="steampunk"]) .avatar-placeholder {
    background: #1a0e00;
    border: 2px solid var(--pc-border-color, #a0682a);
    box-shadow: 0 0 10px var(--pc-glow-color, rgba(160, 104, 42, 0.3));
  }
  :host([card-theme="steampunk"]) .name {
    color: #e8c070;
  }
  :host([card-theme="steampunk"]) .divider {
    background: rgba(160, 104, 42, 0.2);
  }
  :host([card-theme="steampunk"]) .footer {
    color: rgba(160, 104, 42, 0.5);
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
  :host([card-theme="terminal"]) .card-content::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 55%, rgba(0, 0, 0, 0.45) 100%);
    pointer-events: none;
    z-index: 100;
  }
  :host([card-theme="terminal"]) .avatar {
    border-radius: 0;
    border-color: var(--pc-border-color, #00ff41);
    background: #001100;
    box-shadow: 0 0 8px var(--pc-glow-color, rgba(0, 255, 65, 0.25));
  }
  :host([card-theme="terminal"]) .avatar-placeholder {
    background: #001100;
    border-radius: 0;
    border: 1px solid var(--pc-border-color, #00ff41);
    box-shadow: 0 0 8px var(--pc-glow-color, rgba(0, 255, 65, 0.25));
  }
  :host([card-theme="terminal"]) .name {
    color: var(--pc-border-color, #00ff41);
    letter-spacing: 0.08em;
    text-shadow: 0 0 6px var(--pc-glow-color, rgba(0, 255, 65, 0.5));
  }
  :host([card-theme="terminal"]) .divider {
    background: rgba(0, 255, 65, 0.12);
  }
  :host([card-theme="terminal"]) .footer {
    color: rgba(0, 255, 65, 0.35);
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
    border-color: var(--pc-border-color, #c800ff);
    background: linear-gradient(135deg, #2d0060, #600080);
    box-shadow: 0 0 14px var(--pc-glow-color, rgba(200, 0, 255, 0.4));
  }
  :host([card-theme="neon"]) .avatar-placeholder {
    background: linear-gradient(135deg, #2d0060, #600080);
    border: 2px solid var(--pc-border-color, #c800ff);
    box-shadow: 0 0 14px var(--pc-glow-color, rgba(200, 0, 255, 0.4));
  }
  :host([card-theme="neon"]) .name {
    text-shadow: 0 0 10px var(--pc-glow-color, rgba(200, 0, 255, 0.5));
  }
  :host([card-theme="neon"]) .divider {
    background: rgba(200, 0, 255, 0.12);
  }
  :host([card-theme="neon"]) .footer {
    color: rgba(200, 0, 255, 0.4);
  }
`;
