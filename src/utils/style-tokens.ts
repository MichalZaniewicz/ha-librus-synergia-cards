import { css } from "lit";

/**
 * Brand palette sampled from the librus_synergia integration's own brand
 * icon (an indigo notebook with an amber bookmark ribbon - see
 * `ha-librus-synergia/custom_components/librus_synergia/brand/icon.png`),
 * so this card family reads as the same product. Semantic severity colors
 * (good/warning/bad - used for attendance, sentiment, streaks) are
 * deliberately separate from that brand accent.
 */
export const librusTokens = css`
  :host {
    --lc-brand: #4f46e5;
    --lc-brand-strong: #3730a3;
    --lc-brand-bg: #ebe9fc;
    --lc-ring-track: #e4e1f7;
    --lc-amber: #e08e1d;
    --lc-amber-bg: #fbebd1;
    --lc-chip-bg: rgba(79, 70, 229, 0.06);
    --lc-good: #2e8f57;
    --lc-good-bg: #e1f3e7;
    --lc-warn: #e08e1d;
    --lc-warn-bg: #fbebd1;
    --lc-bad: #c6444b;
    --lc-bad-bg: #f9e3e4;
    --lc-neutral-dot: #b4b0cf;
    /* 16-color chart palette (grade categories, subjects, ...) - the first
       6 alias the tokens above for continuity; the rest are new hues, kept
       in the same muted-professional family as the brand indigo/amber.
       Needed once a breakdown can have more distinct entries than the core
       5-6 semantic colors sensibly cover (e.g. a real timetable's ~16
       subjects) - found live: cycling through only 6 colors on 16 segments
       made several of them visually indistinguishable from each other. */
    --lc-chart-1: var(--lc-brand);
    --lc-chart-2: var(--lc-good);
    --lc-chart-3: var(--lc-warn);
    --lc-chart-4: var(--lc-bad);
    --lc-chart-5: var(--lc-brand-strong);
    --lc-chart-6: var(--lc-neutral-dot);
    --lc-chart-7: #0f9488;
    --lc-chart-8: #9333ea;
    --lc-chart-9: #c2703a;
    --lc-chart-10: #2563a8;
    --lc-chart-11: #db5a7b;
    --lc-chart-12: #6b8e3d;
    --lc-chart-13: #a8763e;
    --lc-chart-14: #1591b0;
    --lc-chart-15: #7c5cd4;
    --lc-chart-16: #a68a1f;
    /* Rank tiers (librus-rank-card) - Gold deliberately reuses --lc-amber
       above rather than a near-duplicate hue. */
    --lc-bronze: #b87333;
    --lc-bronze-bg: #f1e2d3;
    --lc-silver: #7c8794;
    --lc-silver-bg: #e6e9ec;
    --lc-diamond: #1f9cb8;
    --lc-diamond-bg: #d9f1f6;
  }
  :host(.dark) {
    --lc-brand: #948cf2;
    --lc-brand-strong: #b4acf7;
    --lc-brand-bg: rgba(148, 140, 242, 0.16);
    --lc-ring-track: #302d4e;
    --lc-amber: #f3ae4e;
    --lc-amber-bg: rgba(243, 174, 78, 0.15);
    --lc-chip-bg: rgba(255, 255, 255, 0.06);
    --lc-good: #5fc98a;
    --lc-good-bg: rgba(95, 201, 138, 0.14);
    --lc-warn: #f3ae4e;
    --lc-warn-bg: rgba(243, 174, 78, 0.15);
    --lc-bad: #e27c81;
    --lc-bad-bg: rgba(226, 124, 129, 0.14);
    --lc-neutral-dot: #6d698c;
    --lc-chart-1: var(--lc-brand);
    --lc-chart-2: var(--lc-good);
    --lc-chart-3: var(--lc-warn);
    --lc-chart-4: var(--lc-bad);
    --lc-chart-5: var(--lc-brand-strong);
    --lc-chart-6: var(--lc-neutral-dot);
    --lc-chart-7: #7dd3c0;
    --lc-chart-8: #c98cf2;
    --lc-chart-9: #f2b88c;
    --lc-chart-10: #8cc9f2;
    --lc-chart-11: #f28ca0;
    --lc-chart-12: #a8d16a;
    --lc-chart-13: #d1a86a;
    --lc-chart-14: #6ab8d1;
    --lc-chart-15: #b88cf2;
    --lc-chart-16: #f2e08c;
    --lc-bronze: #d9925a;
    --lc-bronze-bg: rgba(217, 146, 90, 0.16);
    --lc-silver: #a7b0ba;
    --lc-silver-bg: rgba(167, 176, 186, 0.16);
    --lc-diamond: #4dd0e8;
    --lc-diamond-bg: rgba(77, 208, 232, 0.16);
  }
`;

/** Layout/component classes shared by every card - keeps the family visually consistent. */
export const librusSharedStyles = css`
  ha-card {
    cursor: pointer;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 13px;
  }
  ha-card.static {
    cursor: default;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 11px;
  }
  .icon-badge {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: var(--lc-brand-bg);
    color: var(--lc-brand);
    display: flex;
    align-items: center;
    justify-content: center;
    flex: none;
  }
  .icon-badge.amber {
    background: var(--lc-amber-bg);
    color: var(--lc-amber);
  }
  .icon-badge.good {
    background: var(--lc-good-bg);
    color: var(--lc-good);
  }
  .icon-badge.bad {
    background: var(--lc-bad-bg);
    color: var(--lc-bad);
  }
  .icon-badge.bronze {
    background: var(--lc-bronze-bg);
    color: var(--lc-bronze);
  }
  .icon-badge.silver {
    background: var(--lc-silver-bg);
    color: var(--lc-silver);
  }
  .icon-badge.diamond {
    background: var(--lc-diamond-bg);
    color: var(--lc-diamond);
  }
  .title-block {
    min-width: 0;
    flex: 1;
  }
  .title {
    font-size: 0.95rem;
    font-weight: 700;
    line-height: 1.25;
  }
  .subtitle {
    font-size: 0.76rem;
    color: var(--secondary-text-color);
    margin-top: 1px;
  }

  hr {
    border: none;
    border-top: 1px dashed var(--divider-color);
    margin: 0;
  }

  .stat-value {
    font-variant-numeric: tabular-nums;
  }

  .bar {
    display: flex;
    height: 9px;
    border-radius: 5px;
    overflow: hidden;
    background: var(--divider-color);
  }
  .seg {
    min-width: 2px;
  }

  /* Ranked horizontal bar chart (hBarChart in render-helpers) - one row
     per item: label, proportional bar, value. */
  .hbar-chart {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .hbar-row {
    display: grid;
    grid-template-columns: minmax(0, 6.5rem) 1fr auto;
    align-items: center;
    gap: 8px;
    font-size: 0.78rem;
  }
  .hbar-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--secondary-text-color);
  }
  .hbar-track {
    height: 10px;
    border-radius: 5px;
    background: var(--divider-color);
    overflow: hidden;
  }
  .hbar-fill {
    display: block;
    height: 100%;
    border-radius: 5px;
    min-width: 3px;
  }
  .hbar-val {
    font-variant-numeric: tabular-nums;
    font-weight: 800;
  }

  .ring {
    flex: none;
  }

  .radar-chart {
    flex: none;
  }
  .radar-grid {
    fill: none;
    stroke: var(--divider-color);
    stroke-width: 1;
  }
  .radar-axis {
    stroke: var(--divider-color);
    stroke-width: 1;
  }
  .radar-label {
    fill: var(--secondary-text-color);
    font-size: 10.5px;
  }

  .donut-chart {
    flex: none;
  }
  .donut-total {
    font-size: 20px;
    font-weight: 800;
  }
  .donut-unit {
    font-size: 9px;
  }

  /* Shared "centered chart + legend row below" layout - used by the radar
     and donut chart cards (grades-radar, grade-category-distribution,
     subject-time). Cards with their own bespoke legend markup (Attendance,
     Attendance heatmap) define a local .legend/.legend-item after this in
     their own static styles array, which wins at equal specificity. */
  .chart-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 0 8px;
  }
  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 14px;
    font-size: 0.7rem;
    color: var(--secondary-text-color);
    justify-content: center;
  }
  .legend-item {
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }
  .legend-item b {
    color: var(--primary-text-color);
  }
  /* .dot's margin-top:5px (below) is tuned for .list-item, where it aligns
     a dot with the first line of a possibly-multi-line body - found live:
     the same margin inside a single-line .legend-item pushes the dot
     below center instead, since align-items:center no longer has a
     symmetric box to center. */
  .legend-item .dot {
    margin-top: 0;
  }

  /* A denser alternative to .legend for a breakdown with many entries
     (subjects, categories) - found live: with 16 real subjects, the
     wrapped-pill .legend ran to several ragged rows. A fixed 2-column
     grid reads as a tidy list instead, same "many rows, not many pills"
     shape a mockup (approved by the user, Variant B) compared against a
     grouped "top N + Other" alternative for. */
  .legend-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3px 14px;
  }
  .legend-cell {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 3px 0;
    font-size: 0.72rem;
    color: var(--secondary-text-color);
    min-width: 0;
  }
  .legend-cell .dot {
    margin-top: 0;
  }
  .legend-cell .name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .legend-cell b {
    color: var(--primary-text-color);
    font-variant-numeric: tabular-nums;
  }

  .scroll-list {
    display: flex;
    flex-direction: column;
    gap: 9px;
    max-height: 320px;
    overflow-y: auto;
    /* A gutter before the scrollbar, and a slim, theme-aware thumb instead
       of the browser's default boxy grey scrollbar (which clashes with
       this card family's rounded, colored look and otherwise sits flush
       against the text with no breathing room). Firefox via
       scrollbar-width/-color, Chromium via ::-webkit-scrollbar. */
    padding-right: 8px;
    scrollbar-width: thin;
    scrollbar-color: var(--lc-neutral-dot) transparent;
  }
  .scroll-list::-webkit-scrollbar {
    width: 6px;
  }
  .scroll-list::-webkit-scrollbar-track {
    background: transparent;
  }
  .scroll-list::-webkit-scrollbar-thumb {
    background: var(--lc-neutral-dot);
    border-radius: 999px;
  }
  .scroll-list::-webkit-scrollbar-thumb:hover {
    background: var(--lc-brand);
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: block;
    flex: none;
    margin-top: 5px;
  }
  .dot.good {
    background: var(--lc-good);
  }
  .dot.bad {
    background: var(--lc-bad);
  }
  .dot.neutral {
    background: var(--lc-neutral-dot);
  }
  .dot.warn {
    background: var(--lc-warn);
  }

  .stats {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 8px;
  }
  .stat {
    flex: 1 1 74px;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .stat-value {
    font-size: 1.15rem;
    font-weight: 800;
    line-height: 1.2;
    display: flex;
    align-items: baseline;
    gap: 3px;
  }
  .stat-value .unit {
    font-size: 0.66rem;
    font-weight: 600;
    color: var(--secondary-text-color);
  }
  .stat-label {
    font-size: 0.66rem;
    color: var(--secondary-text-color);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .stat.good .stat-value {
    color: var(--lc-good);
  }
  .stat.bad .stat-value {
    color: var(--lc-bad);
  }
  .stat.warn .stat-value {
    color: var(--lc-warn);
  }

  .list-item {
    display: flex;
    gap: 9px;
    align-items: flex-start;
  }
  .list-item .body {
    min-width: 0;
    flex: 1;
  }
  .row1 {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    font-size: 0.78rem;
    font-weight: 700;
  }
  .row1 time {
    font-weight: 600;
    color: var(--secondary-text-color);
    font-size: 0.68rem;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }
  .cat-label {
    font-size: 0.65rem;
    color: var(--lc-brand);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  /* A category badge on its own line, above the event text - found live:
     inlining the badge into .row1 alongside larger text left it looking
     vertically off (no shared baseline between the two font sizes in a
     flex row with no align-items set). Its own row sidesteps the
     alignment question entirely instead of trying to fix it in place. */
  .cat-label-row {
    margin-bottom: 2px;
  }
  .item-text {
    font-size: 0.75rem;
    color: var(--secondary-text-color);
    margin-top: 2px;
    line-height: 1.4;
  }
  .quote {
    font-size: 0.72rem;
    color: var(--secondary-text-color);
    font-style: italic;
    margin-top: 3px;
  }
  .quote::before {
    content: "\\201C";
  }
  .quote::after {
    content: "\\201D";
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: var(--lc-chip-bg);
    color: var(--secondary-text-color);
    border-radius: 999px;
    padding: 3px 9px 3px 7px;
    font-size: 0.68rem;
    font-weight: 600;
  }
  .chip .n {
    font-weight: 800;
    color: var(--primary-text-color);
  }
  .chip.hot {
    background: var(--lc-brand-bg);
    color: var(--lc-brand-strong);
  }
  .chip.hot .n {
    color: var(--lc-brand-strong);
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 24px 16px;
    text-align: center;
    color: var(--secondary-text-color);
  }
  .empty ha-icon {
    --mdc-icon-size: 28px;
    opacity: 0.7;
  }
  .empty .t1 {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--primary-text-color);
  }
  .empty .t2 {
    font-size: 0.76rem;
    max-width: 26ch;
  }
`;
