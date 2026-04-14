// src/theme-styles.ts
import { css } from 'lit';

export const themeCardStyles = css`
  :host {
    display: block;
    font-family: var(--person-card-font-family, 'Segoe UI', system-ui, sans-serif);
    border-radius: var(--person-card-border-radius, 16px);
    overflow: hidden;
    background: var(--pc-background, #1c1c2e);
    color: #ffffff;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
    padding: 10px 14px;
  }

  /* hidden style — card takes no space */
  :host(.style-hidden) {
    display: none;
  }

  .section-title {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-bottom: 8px;
  }

  /* ── legend (default) ───────────────────────────────── */
  .legend-items {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 16px;
    align-items: center;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .legend-label {
    font-size: 0.78rem;
    color: rgba(255,255,255,0.7);
    white-space: nowrap;
  }

  /* ── compact ────────────────────────────────────────── */
  .compact-items {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 12px;
    align-items: center;
  }

  .compact-item {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .compact-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .compact-label {
    font-size: 0.68rem;
    color: rgba(255,255,255,0.6);
    white-space: nowrap;
  }

  /* ── pills ──────────────────────────────────────────── */
  .pills-items {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 10px 3px 7px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;
    border: 1.5px solid transparent;
  }

  .pill-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* ── list ───────────────────────────────────────────── */
  .list-items {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .list-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 5px 8px;
    border-radius: 8px;
    background: rgba(255,255,255,0.04);
    border-left: 3px solid transparent;
  }

  .list-swatch {
    width: 12px;
    height: 12px;
    border-radius: 3px;
    flex-shrink: 0;
  }

  .list-icon {
    --mdc-icon-size: 15px;
    color: rgba(255,255,255,0.55);
    flex-shrink: 0;
  }

  .list-label {
    font-size: 0.8rem;
    color: rgba(255,255,255,0.8);
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* ── grid ───────────────────────────────────────────── */
  .grid-items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));
    gap: 8px;
  }

  .grid-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    padding: 8px 4px 6px;
    border-radius: 10px;
    border: 1.5px solid transparent;
    text-align: center;
  }

  .grid-icon {
    --mdc-icon-size: 20px;
  }

  .grid-label {
    font-size: 0.65rem;
    font-weight: 600;
    color: rgba(255,255,255,0.8);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    text-align: center;
  }
`;
