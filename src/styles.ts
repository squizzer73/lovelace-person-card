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
    background: rgba(255, 255, 255, 0.10);
    backdrop-filter: blur(28px) saturate(180%) brightness(1.05);
    -webkit-backdrop-filter: blur(28px) saturate(180%) brightness(1.05);
    border: 1px solid rgba(255, 255, 255, 0.38);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.35),
      inset 0 -1px 0 rgba(255, 255, 255, 0.08),
      inset 1px 0 0 rgba(255, 255, 255, 0.12),
      inset -1px 0 0 rgba(255, 255, 255, 0.12),
      0 0 0 1px rgba(255, 255, 255, 0.06);
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
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }
  :host([card-theme="glass"]) .divider {
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
  }
  :host([card-theme="glass"]) .stale-indicator {
    border-color: transparent;
    background: rgba(80, 80, 80, 0.5);
  }
  :host([card-theme="glass"]) .zone-label {
    color: rgba(255, 255, 255, 0.65);
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
  /* TL + BR corner brackets */
  :host([card-theme="scifi"])::before {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: 20px;
    height: 20px;
    border-top: 2px solid var(--pc-border-color, #00c8f0);
    border-left: 2px solid var(--pc-border-color, #00c8f0);
    pointer-events: none;
    z-index: 10;
    filter: drop-shadow(0 0 4px var(--pc-glow-color, rgba(0, 200, 240, 0.8)));
  }
  /* TR + BL corner brackets */
  :host([card-theme="scifi"])::after {
    content: '';
    position: absolute;
    bottom: 5px;
    right: 5px;
    width: 20px;
    height: 20px;
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
    border-radius: inherit;
  }
  :host([card-theme="scifi"]) .avatar {
    border-radius: 2px;
    border-color: var(--pc-border-color, #00c8f0);
    background: #010d1e;
    box-shadow: 0 0 12px var(--pc-glow-color, rgba(0, 200, 240, 0.35)),
      inset 0 0 8px rgba(0, 200, 240, 0.05);
  }
  :host([card-theme="scifi"]) .avatar-placeholder {
    background: #010d1e;
    border-radius: 2px;
    border: 1px solid var(--pc-border-color, #00c8f0);
    box-shadow: 0 0 12px var(--pc-glow-color, rgba(0, 200, 240, 0.35));
  }
  :host([card-theme="scifi"]) .name {
    color: var(--pc-border-color, #00c8f0);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-size: 0.85em;
    text-shadow: 0 0 8px var(--pc-glow-color, rgba(0, 200, 240, 0.8));
  }
  :host([card-theme="scifi"]) .zone-label {
    color: rgba(0, 200, 240, 0.5);
    letter-spacing: 0.08em;
  }
  :host([card-theme="scifi"]) .divider {
    background: linear-gradient(90deg, transparent, var(--pc-border-color, rgba(0, 200, 240, 0.3)), transparent);
  }
  :host([card-theme="scifi"]) .footer {
    color: rgba(0, 200, 240, 0.3);
    letter-spacing: 0.08em;
    font-size: 0.75em;
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
  /* Rivet: top-left */
  :host([card-theme="steampunk"])::before {
    content: '';
    position: absolute;
    top: 7px;
    left: 7px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #d4922a, #5a3810);
    border: 1px solid #9a6a20;
    box-shadow: inset 0 1px 2px rgba(255, 220, 100, 0.3), 0 1px 3px rgba(0, 0, 0, 0.6);
    pointer-events: none;
    z-index: 10;
  }
  /* Rivet: bottom-right */
  :host([card-theme="steampunk"])::after {
    content: '';
    position: absolute;
    bottom: 7px;
    right: 7px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #d4922a, #5a3810);
    border: 1px solid #9a6a20;
    box-shadow: inset 0 1px 2px rgba(255, 220, 100, 0.3), 0 1px 3px rgba(0, 0, 0, 0.6);
    pointer-events: none;
    z-index: 10;
  }
  :host([card-theme="steampunk"]) .avatar {
    border-color: var(--pc-border-color, #a0682a);
    background: radial-gradient(circle, #1e1000, #0e0800);
    box-shadow: 0 0 12px var(--pc-glow-color, rgba(160, 104, 42, 0.35)),
      inset 0 1px 2px rgba(255, 200, 80, 0.08);
  }
  :host([card-theme="steampunk"]) .avatar-placeholder {
    background: radial-gradient(circle, #1e1000, #0e0800);
    border: 2px solid var(--pc-border-color, #a0682a);
    box-shadow: 0 0 12px var(--pc-glow-color, rgba(160, 104, 42, 0.35));
  }
  :host([card-theme="steampunk"]) .name {
    color: #e8c878;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }
  :host([card-theme="steampunk"]) .zone-label {
    color: rgba(200, 160, 80, 0.55);
  }
  :host([card-theme="steampunk"]) .divider {
    background: linear-gradient(90deg, transparent, var(--pc-border-color, rgba(160, 104, 42, 0.5)), transparent);
  }
  :host([card-theme="steampunk"]) .footer {
    color: rgba(160, 104, 42, 0.45);
    font-style: italic;
  }

  /* ── Terminal ───────────────────────────────────── */
  @keyframes pc-terminal-scroll {
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
  /* Scrolling code-line background */
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
    animation: pc-terminal-scroll 2.5s linear infinite;
    pointer-events: none;
    z-index: 1;
  }
  /* Scanlines + vignette overlay */
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
    border-color: var(--pc-border-color, #00ff41);
    background: #001500;
    box-shadow: 0 0 10px var(--pc-glow-color, rgba(0, 255, 65, 0.3)),
      inset 0 0 6px rgba(0, 255, 65, 0.05);
  }
  :host([card-theme="terminal"]) .avatar-placeholder {
    background: #001500;
    border-radius: 0;
    border: 1px solid var(--pc-border-color, #00ff41);
    box-shadow: 0 0 10px var(--pc-glow-color, rgba(0, 255, 65, 0.3));
  }
  :host([card-theme="terminal"]) .name {
    color: var(--pc-border-color, #00ff41);
    letter-spacing: 0.08em;
    text-shadow: 0 0 8px var(--pc-glow-color, rgba(0, 255, 65, 0.7));
  }
  :host([card-theme="terminal"]) .zone-label {
    color: rgba(0, 255, 65, 0.45);
  }
  :host([card-theme="terminal"]) .divider {
    background: linear-gradient(90deg, transparent, var(--pc-border-color, rgba(0, 255, 65, 0.25)), transparent);
  }
  :host([card-theme="terminal"]) .footer {
    color: rgba(0, 255, 65, 0.3);
    letter-spacing: 0.08em;
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
  /* Top neon tube streak */
  :host([card-theme="neon"])::before {
    content: '';
    position: absolute;
    top: -2px;
    left: 12%;
    right: 12%;
    height: 2px;
    background: var(--pc-border-color, #e000ff);
    box-shadow:
      0 0 6px 1px var(--pc-border-color, #e000ff),
      0 0 18px 4px var(--pc-glow-color, rgba(224, 0, 255, 0.6));
    border-radius: 2px;
    pointer-events: none;
    z-index: 2;
  }
  /* Bottom neon tube streak */
  :host([card-theme="neon"])::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 12%;
    right: 12%;
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
    border-color: var(--pc-border-color, #e000ff);
    background: linear-gradient(135deg, #2a0050, #580078);
    box-shadow:
      0 0 14px var(--pc-glow-color, rgba(224, 0, 255, 0.5)),
      inset 0 0 10px rgba(200, 0, 255, 0.08);
  }
  :host([card-theme="neon"]) .avatar-placeholder {
    background: linear-gradient(135deg, #2a0050, #580078);
    border: 2px solid var(--pc-border-color, #e000ff);
    box-shadow: 0 0 14px var(--pc-glow-color, rgba(224, 0, 255, 0.5));
  }
  :host([card-theme="neon"]) .name {
    color: #fff;
    font-weight: 700;
    text-shadow:
      0 0 8px var(--pc-border-color, #e000ff),
      0 0 20px var(--pc-glow-color, rgba(224, 0, 255, 0.5));
  }
  :host([card-theme="neon"]) .zone-label {
    color: rgba(224, 0, 255, 0.45);
  }
  :host([card-theme="neon"]) .divider {
    background: linear-gradient(90deg, transparent, var(--pc-border-color, rgba(224, 0, 255, 0.3)), transparent);
    box-shadow: 0 0 6px var(--pc-glow-color, rgba(224, 0, 255, 0.2));
  }
  :host([card-theme="neon"]) .footer {
    color: rgba(224, 0, 255, 0.35);
  }
`;
