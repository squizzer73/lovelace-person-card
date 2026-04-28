// src/family-grid-styles.ts
import { css } from 'lit';

export const familyGridStyles = css`
  :host {
    display: block;
    font-family: var(--person-card-font-family, 'Segoe UI', system-ui, sans-serif);
    border-radius: var(--person-card-border-radius, 16px);
    overflow: hidden;
    background: var(--ha-card-background, #1c1c2e);
    color: #ffffff;
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
  }

  .card-content {
    padding: 14px;
  }

  /* ── Optional header ─────────────────────────────────────── */
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }
  .card-title {
    font-size: 0.82rem;
    font-weight: 600;
    color: rgba(255,255,255,0.5);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .card-summary {
    font-size: 0.75rem;
    color: rgba(255,255,255,0.3);
  }

  /* ── Grid ────────────────────────────────────────────────── */
  .person-grid {
    display: grid;
    grid-template-columns: repeat(var(--fgc-cols, 3), 1fr);
    gap: 12px;
  }

  /* ── Tile ────────────────────────────────────────────────── */
  .tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 12px 6px 10px;
    border-radius: 12px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.05);
  }

  /* ── Ring wrapper ────────────────────────────────────────── */
  .ring-wrap {
    position: relative;
    width: var(--fgc-ring-size, 70px);
    height: var(--fgc-ring-size, 70px);
    flex-shrink: 0;
  }

  /* Main ring: border + animated glow */
  .ring-wrap::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 4px solid var(--ring-color, rgba(255,255,255,0.25));
    box-shadow:
      0 0 10px 2px var(--ring-color, rgba(255,255,255,0.25)),
      0 0 22px 5px var(--ring-glow, rgba(255,255,255,0.1));
    z-index: 1;
    animation: fgc-breathe var(--fgc-speed, 3s) ease-in-out infinite;
  }

  /* Ripple ring: expands and fades out */
  .ring-wrap::after {
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    border: 2px solid var(--ring-color, rgba(255,255,255,0.25));
    opacity: 0;
    animation: fgc-ripple var(--fgc-speed, 3s) ease-in-out infinite;
    z-index: 0;
  }

  @keyframes fgc-breathe {
    0%, 100% {
      box-shadow:
        0 0 10px 2px var(--ring-color, rgba(255,255,255,0.25)),
        0 0 22px 5px var(--ring-glow, rgba(255,255,255,0.1));
    }
    50% {
      box-shadow:
        0 0 18px 6px var(--ring-color, rgba(255,255,255,0.25)),
        0 0 36px 12px var(--ring-glow, rgba(255,255,255,0.15));
    }
  }

  @keyframes fgc-ripple {
    0%   { opacity: 0.5; transform: scale(1); }
    100% { opacity: 0; transform: scale(1.35); }
  }

  /* ── Avatar (photo) ──────────────────────────────────────── */
  .avatar {
    width: var(--fgc-avatar-size, 58px);
    height: var(--fgc-avatar-size, 58px);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: cover;
    z-index: 2;
  }

  /* ── Avatar (initials fallback) ──────────────────────────── */
  .avatar-initials {
    width: var(--fgc-avatar-size, 58px);
    height: var(--fgc-avatar-size, 58px);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--ring-bg, #2d2d50);
    font-weight: 700;
    color: rgba(255,255,255,0.9);
    font-size: var(--fgc-initial-size, 20px);
    z-index: 2;
  }

  /* ── Tile text ───────────────────────────────────────────── */
  .tile-name {
    font-size: 0.78rem;
    font-weight: 700;
    color: rgba(255,255,255,0.9);
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  .tile-badge {
    display: flex;
    align-items: center;
    gap: 4px;
    background: var(--ring-bg-badge, rgba(255,255,255,0.06));
    border: 1px solid var(--ring-border-badge, rgba(255,255,255,0.15));
    border-radius: 20px;
    padding: 2px 8px;
    font-size: 0.6rem;
    font-weight: 600;
    color: var(--ring-color, rgba(255,255,255,0.7));
    white-space: nowrap;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tile-badge ha-icon {
    --mdc-icon-size: 11px;
    flex-shrink: 0;
  }
`;
