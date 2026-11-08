import { css } from "lit";

/**
 * E-ink mode: the `eink` option or the `librus-cards-eink` theme variable
 * puts a `.eink` class on the host (LibrusBaseCard._syncTheme), for screens
 * with one bit per pixel, or a few greys.
 *
 * Only pure black and white: no tints, gradients, shadows, transparency or
 * animation, because on such a screen they either vanish or get dithered.
 * Green and red are nearly equally bright, so colour can't carry a meaning
 * here: whatever colour said alone is said by a shape, a frame or a letter.
 *
 * Every rule sits under `:host(.eink)`, which outranks a card's own local
 * rule, so this one file covers all cards. Tracks use --lc-track rather than
 * --divider-color, which is black here.
 *
 * Screens with greys or colours add a palette on top (`.eink-gray`,
 * `.eink-red`, `.eink-yellow`, `.eink-color`). The shapes stay, so a card
 * still reads on a screen that shows a colour poorly, and the values are the
 * palette's pure colours so a screenshot tool has nothing to dither.
 */
export type EinkMode = "bw" | "gray" | "red" | "yellow" | "color";

/** Modes that add a palette, each with its own host class. */
export const EINK_PALETTES: readonly EinkMode[] = ["gray", "red", "yellow", "color"];

/** The `eink` option or theme variable as a mode; undefined means off. */
export function einkMode(value: unknown): EinkMode | undefined {
  const text = String(value ?? "")
    .trim()
    .replace(/^["']|["']$/g, "")
    .toLowerCase();
  if (["", "false", "off", "0", "no", "none"].includes(text)) return undefined;
  if (text === "grey") return "gray";
  if (text === "colour") return "color";
  return (EINK_PALETTES as readonly string[]).includes(text) ? (text as EinkMode) : "bw";
}

export const librusEinkStyles = css`
  :host(.eink) {
    --primary-text-color: #000;
    --secondary-text-color: #000;
    --disabled-text-color: #000;
    --divider-color: #000;
    --card-background-color: #fff;
    --ha-card-background: #fff;
    --ha-card-box-shadow: none;
    --ha-card-border-radius: 0;
    --lc-track: #fff;
    /* What each palette recolours. Black and white by default. */
    --lc-e-now: #000;
    --lc-e-alert: #000;
    --lc-e-on-alert: #fff;
    --lc-e-alert-edge: #000;
    --lc-e-alert-bar: #fff;
    --lc-e-second: #fff;
    --lc-e-free: #fff;
    --lc-brand: #000;
    --lc-brand-strong: #000;
    --lc-brand-bg: #fff;
    --lc-ring-track: #fff;
    --lc-soft: #fff;
    --lc-amber: #000;
    --lc-amber-bg: #fff;
    --lc-chip-bg: #fff;
    --lc-good: #000;
    --lc-good-bg: #fff;
    --lc-warn: #000;
    --lc-warn-bg: #fff;
    --lc-bad: #000;
    --lc-bad-bg: #fff;
    --lc-neutral-dot: #000;
    --lc-bronze: #000;
    --lc-bronze-bg: #fff;
    --lc-silver: #000;
    --lc-silver-bg: #fff;
    --lc-diamond: #000;
    --lc-diamond-bg: #fff;
    --lc-chart-1: #000;
    --lc-chart-2: #000;
    --lc-chart-3: #000;
    --lc-chart-4: #000;
    --lc-chart-5: #000;
    --lc-chart-6: #000;
    --lc-chart-7: #000;
    --lc-chart-8: #000;
    --lc-chart-9: #000;
    --lc-chart-10: #000;
    --lc-chart-11: #000;
    --lc-chart-12: #000;
    --lc-chart-13: #000;
    --lc-chart-14: #000;
    --lc-chart-15: #000;
    --lc-chart-16: #000;
    --lc-grade-1: #000;
    --lc-grade-2: #000;
    --lc-grade-3: #000;
    --lc-grade-4: #000;
    --lc-grade-5: #000;
    --lc-grade-6: #000;
  }
  :host(.eink) *,
  :host(.eink) *::before,
  :host(.eink) *::after {
    opacity: 1 !important;
    filter: none !important;
    animation: none !important;
    transition: none !important;
    background-image: none !important;
    text-shadow: none !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    scrollbar-width: none;
  }
  /* A wall screen can't be scrolled: lists grow, unless list_height says otherwise. */
  :host(.eink) .scroll-list,
  :host(.eink) .sub-list {
    max-height: var(--lc-list-height, none);
    overflow-y: hidden;
    padding-right: 0;
  }

  /* --- The frame of every card --- */
  :host(.eink) ha-card {
    background: #fff;
    color: #000;
    border: 1.5px solid #000;
    cursor: default;
  }
  :host(.eink) .icon-badge,
  :host(.compact.eink) .icon-badge {
    background: #fff;
    color: #000;
    border: 1.5px solid #000;
    box-sizing: border-box;
  }
  :host(.eink) .title {
    font-weight: 900;
  }
  :host(.eink) .subtitle {
    font-weight: 500;
  }
  :host(.eink) hr {
    border-top: 1px solid #000;
  }
  :host(.eink) .subj-dot {
    display: none;
  }

  /* --- Shared pieces --- */
  :host(.eink) .stats {
    gap: 6px;
  }
  :host(.eink) .stat {
    background: #fff;
    border: 1.5px solid #000;
    padding: 3px 6px;
    overflow-wrap: anywhere;
  }
  :host(.eink) .stat b,
  :host(.eink) .stat span {
    color: #000;
  }
  :host(.eink) .stat-value {
    font-weight: 900;
  }
  :host(.eink) .stat-label {
    font-weight: 700;
  }
  :host(.eink) .stat.bad {
    background: #000;
  }
  :host(.eink) .stat.bad .stat-value,
  :host(.eink) .stat.bad .stat-label,
  :host(.eink) .stat.bad .unit,
  :host(.eink) .stat.bad b,
  :host(.eink) .stat.bad span {
    color: #fff;
  }
  :host(.eink) .tile {
    background: #fff;
    color: #000;
    border: 1.5px solid #000;
  }
  :host(.eink) .tile.bad {
    background: #000;
    color: #fff;
  }
  :host(.eink) .tile.bad * {
    color: #fff;
  }
  :host(.eink) .tile.few {
    border-style: dotted;
  }
  /* The percentages are printed: no need for a colour key. */
  :host(.eink) .tone-legend {
    display: none;
  }
  :host(.eink) .pill,
  :host(.eink) .pill.good,
  :host(.eink) .pill.bad {
    background: #fff;
    color: #000;
    border: 1.5px solid #000;
  }
  :host(.eink) .bar {
    height: 12px;
    box-sizing: border-box;
    border: 1.5px solid #000;
    background: #fff;
  }
  :host(.eink) .bar .seg + .seg {
    border-left: 1.5px solid #fff;
  }
  /* The parts of a stacked bar that aren't "present" stay white. */
  :host(.eink) .bar .seg.warn,
  :host(.eink) .bar .seg.bad,
  :host(.eink) .bar .seg.late {
    background: #fff !important;
    border-left: 1.5px solid #000;
  }
  :host(.eink) .hbar-track {
    box-sizing: border-box;
    border: 1px solid #000;
    background: #fff;
  }
  :host(.eink) .track,
  :host(.eink) .strack,
  :host(.eink) .sbar-track {
    box-sizing: border-box;
    border: 1px solid #000;
    background: #fff;
  }
  :host(.eink) .hbar-fill {
    background: #000 !important;
  }
  :host(.eink) .ring circle:first-child {
    stroke: #000;
    stroke-width: 1px;
  }
  /* Translucent chart fills would come out solid, or dithered. */
  :host(.eink) svg polygon {
    fill-opacity: 0 !important;
  }
  :host(.eink) .line-chart polygon {
    display: none;
  }
  :host(.eink) .chip {
    background: #fff;
    color: #000;
    border: 1.5px solid #000;
  }
  :host(.eink) .chip.hot {
    background: #000;
    color: #fff;
  }
  :host(.eink) .chip.hot .n {
    color: #fff;
  }
  :host(.eink) .grade-chip,
  :host(.eink) .grade-chip.pt-good,
  :host(.eink) .grade-chip.pt-bad {
    background: #fff;
    color: #000;
    border: 1.5px solid #000;
    font-weight: 900;
  }
  :host(.eink) .grade-chip.nocount {
    border-style: dashed;
  }
  :host(.eink) .lc-outage {
    background: #fff;
    color: #000;
    border: 1.5px solid #000;
    font-weight: 700;
  }
  :host(.eink) .lc-outage span {
    color: #000;
  }

  :host(.eink) .type-icon {
    background: #fff;
    color: #000;
  }
  :host(.eink) .stat-icon {
    background: #fff !important;
    color: #000 !important;
    border: 1.5px solid #000;
    box-sizing: border-box;
  }
  :host(.eink) .mgrade,
  :host(.eink) .mgrade.good,
  :host(.eink) .mgrade.brand,
  :host(.eink) .mgrade.warn {
    background: #fff;
    color: #000;
    border: 1.5px solid #000;
    box-sizing: border-box;
  }
  :host(.eink) .mgrade.bad {
    background: #000;
    color: #fff;
    border: 1.5px solid #000;
    box-sizing: border-box;
  }
  :host(.eink) .mgrade.none {
    background: #fff;
    border: 1px dotted #000;
    box-sizing: border-box;
  }
  :host(.eink) .month.current .mgrade {
    border-width: 3px;
  }

  /* Four states, four shapes: a colour can't tell them apart here. */
  :host(.eink) .dot,
  :host(.eink) .legend-dot {
    width: 9px;
    height: 9px;
    box-sizing: border-box;
    border: 1.5px solid #000;
    background: #000 !important;
  }
  :host(.eink) .dot.bad,
  :host(.eink) .legend-dot.bad {
    border-radius: 50% !important;
  }
  :host(.eink) .dot.warn,
  :host(.eink) .legend-dot.warn {
    background: #fff !important;
  }
  :host(.eink) .dot.neutral,
  :host(.eink) .legend-dot.late {
    background: #fff !important;
    border-radius: 50% !important;
  }
  :host(.eink) .legend,
  :host(.eink) .legend-cell {
    font-weight: 700;
  }

  /* A lesson's tag: a box, solid for a test. Inside an inverted row the
     frame and text follow the row's colour. */
  :host(.eink) .lesson-tag,
  :host(.eink) .lesson-tag.cancelled,
  :host(.eink) .lesson-tag.substitution,
  :host(.eink) .lesson-tag.room,
  :host(.eink) .lesson-tag.extra {
    background: transparent;
    color: inherit;
    border: 1.5px solid currentColor;
    font-weight: 900;
  }
  :host(.eink) .lesson-tag.exam {
    background: #000;
    color: #fff;
    border: 1.5px solid #000;
  }

  /* --- Lists: single sharp lines between entries --- */
  :host(.eink) .scroll-list {
    gap: 0;
  }
  :host(.eink) .scroll-list > .list-item {
    border-bottom: 1px solid #000;
    padding: 5px 0;
  }
  :host(.eink) .scroll-list > .list-item:last-child {
    border-bottom: 0;
  }
  :host(.eink) .row1 time,
  :host(.eink) .item-text {
    font-weight: 500;
  }

  /* --- Week timetable --- */
  :host(.eink) .nav {
    display: none;
  }
  :host(.eink) .week-grid {
    font-size: 0.75rem;
    gap: 2px;
  }
  :host(.eink) .h .dd {
    font-size: 0.68rem;
  }
  :host(.eink) .h.today {
    background: #000;
    color: #fff;
  }
  :host(.eink) .h.today .dn,
  :host(.eink) .h.today .dd {
    color: #fff;
  }
  :host(.eink) .week-grid .cell,
  :host(.eink) .week-grid .cell.on {
    position: relative;
    box-sizing: border-box;
    min-height: 28px;
    background: #fff;
    color: #000;
    border: 1px solid #000;
    outline: none;
  }
  :host(.eink) .week-grid .cell.empty {
    border: 0;
  }
  :host(.eink) .week-grid .cell.current {
    background: #000;
    color: #fff;
  }
  :host(.eink) .week-grid .cell.next {
    border-width: 3px;
  }
  :host(.eink) .week-grid .cell.sub,
  :host(.eink) .week-grid .cell.extra {
    border: 2px dashed #000;
  }
  :host(.eink) .week-grid .cell.off,
  :host(.eink) .week-grid .cell.missing,
  :host(.eink) .week-grid .cell.free {
    border: 1px dotted #000;
    font-weight: 500;
  }
  :host(.eink) .free-note {
    color: #000;
    font-size: 0.62rem;
  }
  /* A whole day off is one cell with its name, not a column of hatching. */
  :host(.eink) .week-grid .cell.free.whole,
  :host(.eink) .free-chip.whole {
    display: none;
  }
  :host(.eink) .free-chip {
    background: #fff;
    color: #000;
    border: 1px solid #000;
  }
  .free-span,
  .eink-key {
    display: none;
  }
  :host(.eink) .free-span {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
    overflow: hidden;
  }
  :host(.eink) .free-span span {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    font-weight: 700;
    font-size: 0.72rem;
    max-height: 100%;
  }
  /* The corner letter: solid for a test, open for a change. Marked cells
     keep the name clear of it. */
  :host(.eink) .week-grid .cell[data-mark] {
    padding-left: 13px;
    padding-right: 13px;
  }
  :host(.eink) .cell[data-mark]::after,
  :host(.eink) .tl-lesson[data-mark]::after {
    content: attr(data-mark);
    position: absolute;
    top: 0;
    right: 0;
    width: 13px;
    height: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000;
    color: #fff;
    font-size: 9.5px;
    font-weight: 900;
    line-height: 1;
    text-decoration: none;
  }
  :host(.eink) .cell.sub[data-mark]::after,
  :host(.eink) .cell.off[data-mark]::after,
  :host(.eink) .cell.extra[data-mark]::after,
  :host(.eink) .tl-lesson.sub[data-mark]::after,
  :host(.eink) .tl-lesson.off[data-mark]::after {
    background: #fff;
    color: #000;
    border-left: 1px solid #000;
    border-bottom: 1px solid #000;
    box-sizing: border-box;
  }
  :host(.eink) .cell.current[data-mark]::after,
  :host(.eink) .tl-lesson.current[data-mark]::after {
    background: #fff;
    color: #000;
  }
  :host(.eink) .eink-key {
    display: flex;
    flex-wrap: wrap;
    gap: 3px 12px;
    align-items: center;
    font-size: 0.66rem;
    font-weight: 500;
  }
  :host(.eink) .eink-key span {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  :host(.eink) .eink-key b {
    width: 12px;
    height: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    background: #000;
    color: #fff;
    font-size: 9px;
    font-weight: 900;
  }
  :host(.eink) .eink-key b.open {
    background: #fff;
    color: #000;
    border: 1px solid #000;
  }
  :host(.eink) .xa,
  :host(.eink) .xa.off {
    background: #fff;
    color: #000;
    border: 1px solid #000;
  }
  :host(.eink) .xa.off {
    border-style: dotted;
  }
  :host(.eink) .xa.current {
    background: #000;
    color: #fff;
  }
  :host(.eink) .tl-chip {
    background: #fff;
    color: #000;
    border: 1px solid #000;
  }
  :host(.eink) .tl-day.today,
  :host(.eink) .tl-day.free {
    background: #fff;
  }
  :host(.eink) .tl-line {
    background: none;
    border-top: 1px dotted #000;
  }
  :host(.eink) .tl-lesson,
  :host(.eink) .tl-lesson.freed,
  :host(.eink) .tl-lesson.xa:not(.off):not(.current) {
    background: #fff;
    color: #000;
    border: 1px solid #000;
    outline: none;
  }
  :host(.eink) .tl-lesson.sub {
    background: #fff;
    color: #000;
    border: 2px dashed #000;
    outline: none;
  }
  :host(.eink) .tl-lesson.off,
  :host(.eink) .tl-lesson.freed {
    border: 1px dotted #000;
  }
  :host(.eink) .tl-lesson.next {
    border-width: 3px;
    outline: none;
  }
  :host(.eink) .tl-lesson.current {
    background: #000;
    color: #fff;
  }
  :host(.eink) .tl-lesson.current .tl-meta {
    color: #fff;
  }
  :host(.eink) .tl-now i {
    border-radius: 50% !important;
  }

  /* --- Semester in numbers --- */
  :host(.eink) .hero {
    background: #fff;
    color: #000;
    border-bottom: 1.5px solid #000;
  }
  :host(.eink) .hero .icon-badge {
    background: #fff;
  }
  :host(.eink) .hero .icon-badge ha-icon,
  :host(.eink) .hero .title,
  :host(.eink) .hero .subtitle {
    color: #000;
  }
  :host(.eink) .hero svg circle[stroke] {
    stroke: #000;
  }
  :host(.eink) .hero svg circle[stroke^="rgba"] {
    stroke-width: 1px;
  }
  :host(.eink) .hero svg circle[fill="#fff"],
  :host(.eink) .hero svg text {
    fill: #000;
  }
  :host(.eink) .hero svg path[stroke] {
    stroke: #000;
  }
  :host(.eink) .hero svg path[fill^="rgba"] {
    fill: none;
  }
  :host(.eink) .wk > div {
    background: #fff !important;
    color: #000;
    border: 1.5px solid #000;
    box-sizing: border-box;
  }

  /* --- Attendance heatmap: outline = present, a mark inside = excused,
     solid = not excused, dotted = no data. --- */
  :host(.eink) .heatmap .cell,
  :host(.eink) .heatmap-legend .cell {
    box-sizing: border-box;
    border: 1px solid #000;
    background: #fff;
    position: relative;
  }
  :host(.eink) .heatmap .cell.warn::after,
  :host(.eink) .heatmap-legend .cell.warn::after {
    content: "";
    position: absolute;
    inset: 2px;
    background: #000;
  }
  :host(.eink) .heatmap .cell.bad,
  :host(.eink) .heatmap-legend .cell.bad {
    background: #000;
  }
  :host(.eink) .heatmap .cell.none,
  :host(.eink) .heatmap-legend .cell.none {
    border-style: dotted;
  }
  :host(.eink) .heatmap .cell.future {
    border: 0;
  }

  /* --- Stacked series: solid, open, dashed --- */
  :host(.eink) .weekday-bar-stack {
    background: none !important;
  }
  :host(.eink) .weekday-bar-stack .seg.excused,
  :host(.eink) .weekday-bar-stack .seg.late,
  :host(.eink) .sbar-seg.excused,
  :host(.eink) .seg.c-amber,
  :host(.eink) .key.c-amber {
    box-sizing: border-box;
    background: #fff !important;
    border: 1.5px solid #000;
  }
  :host(.eink) .weekday-bar-stack .seg.late {
    border-style: dashed;
  }
  :host(.eink) .seg.c-amber[style*="width:0%"],
  :host(.eink) .seg.c-amber[style*="height:0%"] {
    border: 0;
  }
  :host(.eink) .dot.series-unexcused,
  :host(.eink) .dot.series-excused,
  :host(.eink) .dot.series-late {
    border-radius: 0 !important;
  }
  :host(.eink) .dot.series-excused,
  :host(.eink) .dot.series-late {
    background: #fff !important;
  }
  :host(.eink) .dot.series-late {
    border-style: dashed;
  }
  /* Grades by month prints each digit on its segment instead of a key. */
  .seg-digit {
    display: none;
  }
  :host(.eink) .seg-digit {
    display: block;
    fill: #fff;
    font-size: 10px;
    font-weight: 900;
    text-anchor: middle;
  }
  :host(.eink) .grade-legend {
    display: none;
  }
  /* Tests solid, quizzes open. */
  :host(.eink) svg rect[fill="var(--lc-amber)"] {
    fill: #fff;
    stroke: #000;
    stroke-width: 1.5px;
  }
  :host(.eink) .sw {
    box-sizing: border-box;
    border: 1.5px solid #000;
  }
  :host(.eink) .sw[style*="lc-amber"] {
    background: #fff !important;
  }

  /* --- School hours and the school day strip --- */
  :host(.eink) .daybar .seg {
    box-sizing: border-box;
    background: #fff;
    color: #000;
    border: 1px solid #000;
    outline: none;
  }
  :host(.eink) .daybar .seg.now {
    background: #000;
    color: #fff;
  }
  :host(.eink) .daybar .seg.sub {
    border: 2px dashed #000;
  }
  :host(.eink) .daybar .seg.off {
    border: 1px dotted #000;
    text-decoration: line-through;
  }
  :host(.eink) i.seg,
  :host(.eink) i.swatch {
    box-sizing: border-box;
    background: #fff !important;
    border: 1.5px solid #000;
  }
  :host(.eink) i.seg.extra,
  :host(.eink) i.swatch.extra {
    border-style: dashed;
  }

  /* --- Month calendar: one shape per kind of entry --- */
  :host(.eink) .dot.k-test,
  :host(.eink) .dot.k-quiz,
  :host(.eink) .dot.k-trip,
  :host(.eink) .dot.k-meeting,
  :host(.eink) .dot.k-homework,
  :host(.eink) .dot.k-cancelled,
  :host(.eink) .dot.k-substitution {
    width: 8px;
    height: 8px;
  }
  :host(.eink) .dot.k-quiz,
  :host(.eink) .dot.k-meeting {
    border-radius: 50% !important;
  }
  :host(.eink) .dot.k-trip,
  :host(.eink) .dot.k-meeting,
  :host(.eink) .dot.k-cancelled,
  :host(.eink) .dot.k-substitution {
    background: #fff !important;
  }
  :host(.eink) .dot.k-homework,
  :host(.eink) .dot.k-cancelled {
    transform: rotate(45deg);
    width: 7px;
    height: 7px;
  }
  :host(.eink) .dot.k-substitution {
    border-style: dashed;
  }
  :host(.eink) .dot.k-other {
    height: 3px;
    border: 0;
  }
  :host(.eink) .day.free {
    background: #fff;
    border: 1px dotted #000;
    box-sizing: border-box;
  }
  :host(.eink) .free-box {
    background: #fff;
    border: 1px dotted #000;
  }
  :host(.eink) .abs,
  :host(.eink) .abs-key {
    box-sizing: border-box;
    height: 5px;
  }
  :host(.eink) .abs.a-warn,
  :host(.eink) .abs-key.a-warn,
  :host(.eink) .abs.a-late,
  :host(.eink) .abs-key.a-late {
    background: #fff;
    border: 1px solid #000;
  }
  :host(.eink) .abs.a-late,
  :host(.eink) .abs-key.a-late {
    border-style: dashed;
  }

  /* --- Today's lessons --- */
  :host(.eink) .tl-dot,
  :host(.eink) .tl-item::after {
    display: none;
  }
  :host(.eink) .tl-item {
    gap: 6px;
    align-items: center;
    padding: 5px;
    border-bottom: 1px solid #000;
  }
  :host(.eink) .tl-item:last-child {
    border-bottom: 0;
  }
  :host(.eink) .tl-time {
    padding-top: 0;
  }
  :host(.eink) .tl-body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 2px 8px;
  }
  :host(.eink) .tl-body .meta {
    font-weight: 500;
  }
  :host(.eink) .tl-item.done .subj {
    font-weight: 500;
  }
  :host(.eink) .tl-item.lesson-cancelled .tl-body {
    font-weight: 500;
  }
  :host(.eink) .tl-item.now {
    background: #000;
    color: #fff;
  }
  :host(.eink) .tl-item.now .tl-time,
  :host(.eink) .tl-item.now .subj,
  :host(.eink) .tl-item.now .meta {
    color: #fff;
    font-weight: 900;
  }
  :host(.eink) .tl-item.now .lesson-tag.exam {
    background: #fff;
    color: #000;
    border-color: #fff;
  }
  :host(.eink) .pill-now {
    background: transparent;
    color: inherit;
    border: 1.5px solid currentColor;
    font-weight: 900;
  }
  :host(.eink) .free-label {
    color: #000;
  }

  /* --- Grades --- */
  :host(.eink) .ring-row .ring {
    display: none;
  }
  :host(.eink) .ring-row {
    align-items: baseline;
    gap: 8px;
  }
  :host(.eink) .ring-num {
    font-weight: 900;
  }
  :host(.eink) .sub-list {
    gap: 0;
  }
  :host(.eink) .sub-row {
    min-height: 26px;
    border-bottom: 1px solid #000;
  }
  :host(.eink) .sub-row:last-child {
    border-bottom: 0;
  }
  :host(.eink) .sub-row .bar {
    display: none;
  }
  :host(.eink) .sub-row .name {
    flex: 1;
    width: auto;
    min-width: 0;
    font-size: 0.8rem;
    font-weight: 700;
  }
  :host(.eink) .sub-row .val {
    font-size: 0.8rem;
    font-weight: 900;
  }
  :host(.eink) .sub-row .fc,
  :host(.eink) .sub-row .fc.warn,
  :host(.eink) .sub-row .fc.bad {
    box-sizing: border-box;
    background: #fff;
    color: #000;
    border: 1.5px solid #000;
    font-weight: 900;
  }
  :host(.eink) .sub-row .fc.bad {
    background: #000;
    color: #fff;
  }
  .fc-arrow {
    display: none;
  }
  :host(.eink) .fc-arrow {
    display: inline;
    font-weight: 900;
  }

  /* --- Palettes --- */
  :host(.eink-gray) {
    --secondary-text-color: #555;
    --lc-e-second: #aaa;
    --lc-e-free: #aaa;
  }
  :host(.eink-red) {
    --lc-e-alert: #f00;
    --lc-e-alert-edge: #f00;
    --lc-e-alert-bar: #f00;
  }
  /* Yellow text would vanish on white: yellow only ever fills under black. */
  :host(.eink-yellow) {
    --lc-e-alert: #ff0;
    --lc-e-on-alert: #000;
    --lc-e-alert-bar: #ff0;
  }
  :host(.eink-color) {
    --lc-e-alert: #f00;
    --lc-e-alert-edge: #f00;
    --lc-e-alert-bar: #f00;
    --lc-e-now: #00f;
    --lc-e-second: #ff0;
  }

  /* What needs attention: tests, unexcused absences, a grade at risk. */
  :host(.eink) .stat.bad,
  :host(.eink) .tile.bad,
  :host(.eink) .sub-row .fc.bad,
  :host(.eink) .mgrade.bad,
  :host(.eink) .lesson-tag.exam {
    background: var(--lc-e-alert);
    color: var(--lc-e-on-alert);
    border-color: var(--lc-e-alert-edge);
  }
  :host(.eink) .stat.bad .stat-value,
  :host(.eink) .stat.bad .stat-label,
  :host(.eink) .stat.bad .unit,
  :host(.eink) .stat.bad b,
  :host(.eink) .stat.bad span,
  :host(.eink) .tile.bad * {
    color: var(--lc-e-on-alert);
  }
  :host(.eink) .tl-item.now .lesson-tag.exam {
    background: #fff;
    color: #000;
    border-color: #fff;
  }
  :host(.eink) .eink-key b:not(.open),
  :host(.eink) .week-grid .cell.exam[data-mark]::after,
  :host(.eink) .tl-lesson.exam[data-mark]::after {
    background: var(--lc-e-alert);
    color: var(--lc-e-on-alert);
  }
  :host(.eink) .dot.bad,
  :host(.eink) .legend-dot.bad,
  :host(.eink) .dot.series-unexcused,
  :host(.eink) .dot.k-test,
  :host(.eink) .dot.a-bad,
  :host(.eink) .weekday-bar-stack .seg.unexcused,
  :host(.eink) .sbar-seg.unexcused,
  :host(.eink) .sw[style*="lc-bad"] {
    background: var(--lc-e-alert) !important;
  }
  :host(.eink) .heatmap .cell.bad,
  :host(.eink) .heatmap-legend .cell.bad,
  :host(.eink) .abs.a-bad,
  :host(.eink) .abs-key.a-bad {
    background: var(--lc-e-alert);
  }
  :host(.eink) svg rect[fill="var(--lc-bad)"] {
    fill: var(--lc-e-alert);
  }
  :host(.eink) .bar .seg.bad {
    background: var(--lc-e-alert-bar) !important;
  }
  :host(.eink-yellow) .eink-key b:not(.open),
  :host(.eink-yellow) .week-grid .cell.exam[data-mark]::after,
  :host(.eink-yellow) .tl-lesson.exam[data-mark]::after,
  :host(.eink-yellow) .weekday-bar-stack .seg.unexcused,
  :host(.eink-yellow) .sbar-seg.unexcused,
  :host(.eink-yellow) .abs.a-bad,
  :host(.eink-yellow) .abs-key.a-bad {
    box-sizing: border-box;
    border: 1px solid #000;
  }
  :host(.eink-yellow) svg rect[fill="var(--lc-bad)"] {
    stroke: #000;
    stroke-width: 1.5px;
  }

  /* The second series: excused absences, substitutions, quizzes. */
  :host(.eink) .bar .seg.warn,
  :host(.eink) .dot.warn,
  :host(.eink) .legend-dot.warn,
  :host(.eink) .dot.series-excused,
  :host(.eink) .weekday-bar-stack .seg.excused,
  :host(.eink) .sbar-seg.excused,
  :host(.eink) .seg.c-amber,
  :host(.eink) .key.c-amber,
  :host(.eink) .sw[style*="lc-amber"] {
    background: var(--lc-e-second) !important;
  }
  :host(.eink) .heatmap .cell.warn,
  :host(.eink) .heatmap-legend .cell.warn,
  :host(.eink) .abs.a-warn,
  :host(.eink) .abs-key.a-warn {
    background: var(--lc-e-second);
  }
  :host(.eink) svg rect[fill="var(--lc-amber)"] {
    fill: var(--lc-e-second);
  }

  /* Days off. */
  :host(.eink) .free-span,
  :host(.eink) .week-grid .cell.free,
  :host(.eink) .day.free,
  :host(.eink) .free-box,
  :host(.eink) .tl-day.free,
  :host(.eink) .tl-lesson.freed {
    background: var(--lc-e-free);
  }

  :host(.eink) .day.free .n {
    color: #000;
  }

  /* Right now. */
  :host(.eink) .h.today,
  :host(.eink) .week-grid .cell.current,
  :host(.eink) .tl-lesson.current,
  :host(.eink) .xa.current,
  :host(.eink) .tl-item.now,
  :host(.eink) .daybar .seg.now,
  :host(.eink) .day.today .n {
    background: var(--lc-e-now);
    color: #fff;
  }

  /* 4 greys: what's over or secondary steps back. */
  :host(.eink-gray) .stat-label {
    color: #000;
  }
  :host(.eink-gray) .tl-item.done .subj {
    color: #555;
  }

  /* 6 colours: present is green, a substitution yellow. */
  :host(.eink-color) .bar .seg:not(.warn):not(.bad):not(.late),
  :host(.eink-color) .legend-dot.good:not(.late) {
    background: #0f0 !important;
  }
  :host(.eink-color) .heatmap .cell.good,
  :host(.eink-color) .heatmap-legend .cell.good {
    background: #0f0;
  }
  :host(.eink-color) .week-grid .cell.sub:not(.exam)[data-mark]::after,
  :host(.eink-color) .tl-lesson.sub:not(.exam)[data-mark]::after,
  :host(.eink-color) .eink-key b.sub {
    background: #ff0;
    color: #000;
  }
  :host(.eink-color) .lesson-tag.substitution {
    background: #ff0;
    color: #000;
    border-color: #000;
  }
`;
