import { html, svg, nothing, type TemplateResult } from "lit";
import type { HistoryPoint } from "./history";

/** A single flex-grow-sized, colored segment of a horizontal stacked bar. */
export interface BarSegment {
  flexGrow: number;
  colorVar: string;
  title?: string;
}

/** Reused by Attendance, mailbox breakdowns, and any proportional breakdown. */
export function segmentedBar(segments: BarSegment[]): TemplateResult {
  return html`
    <div class="bar">
      ${segments.map(
        (s) =>
          html`<div
            class="seg"
            style="flex-grow:${s.flexGrow};background:${s.colorVar}"
            title=${s.title ?? ""}
          ></div>`
      )}
    </div>
  `;
}

export interface HBarRow {
  label: string;
  value: number;
  colorVar: string;
}

/**
 * A ranked horizontal bar chart - one row per item (label, proportional
 * bar, value), bar width relative to the largest value. Rows are drawn in
 * the order given, so sort before calling. Styles live in
 * `librusSharedStyles` (`.hbar-*`).
 */
export function hBarChart(rows: HBarRow[]): TemplateResult {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return html`
    <div class="hbar-chart">
      ${rows.map(
        (r) => html`
          <div class="hbar-row">
            <span class="hbar-label" title=${r.label}>${r.label}</span>
            <span class="hbar-track">
              <span
                class="hbar-fill"
                style="width:${Math.round((r.value / max) * 100)}%;background:${r.colorVar}"
              ></span>
            </span>
            <b class="hbar-val">${r.value}</b>
          </div>
        `
      )}
    </div>
  `;
}

/**
 * A circular progress ring (grade averages, streaks, ...).
 * Self-contained SVG root so it's safe to splice into any `html` template.
 */
export function progressRing(pct: number, colorVar: string, size = 64, stroke = 6): TemplateResult {
  const clamped = Math.max(0, Math.min(100, pct));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (clamped / 100) * c;
  const center = size / 2;
  return html`
    <svg width=${size} height=${size} viewBox="0 0 ${size} ${size}" class="ring">
      <circle
        cx=${center}
        cy=${center}
        r=${r}
        fill="none"
        stroke="var(--lc-ring-track)"
        stroke-width=${stroke}
      ></circle>
      <circle
        cx=${center}
        cy=${center}
        r=${r}
        fill="none"
        stroke=${colorVar}
        stroke-width=${stroke}
        stroke-linecap="round"
        stroke-dasharray=${c}
        stroke-dashoffset=${offset}
        transform="rotate(-90 ${center} ${center})"
      ></circle>
    </svg>
  `;
}

/**
 * A minimal line+area chart for a numeric history series (grade average
 * over time, ...). Self-contained SVG root, `viewBox`-scaled so it fills
 * whatever width the caller gives it in CSS.
 */
export function lineChart(
  points: HistoryPoint[],
  opts: { width?: number; height?: number; colorVar?: string; min?: number; max?: number } = {}
): TemplateResult {
  const width = opts.width ?? 280;
  const height = opts.height ?? 72;
  const colorVar = opts.colorVar ?? "var(--lc-brand)";
  const pad = 6;

  if (points.length < 2) {
    return html`<svg width=${width} height=${height} viewBox="0 0 ${width} ${height}" class="line-chart"></svg>`;
  }

  const xs = points.map((p) => p.timestamp);
  const ys = points.map((p) => p.value);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = opts.min ?? Math.min(...ys);
  const maxY = opts.max ?? Math.max(...ys);
  const rangeX = maxX - minX || 1;
  const rangeY = maxY - minY || 1;

  const toX = (t: number) => pad + ((t - minX) / rangeX) * (width - pad * 2);
  const toY = (v: number) => height - pad - ((v - minY) / rangeY) * (height - pad * 2);

  const linePoints = points.map((p) => `${toX(p.timestamp).toFixed(1)},${toY(p.value).toFixed(1)}`).join(" ");
  const first = points[0];
  const last = points[points.length - 1];
  const areaPoints =
    `${toX(first.timestamp).toFixed(1)},${(height - pad).toFixed(1)} ` +
    `${linePoints} ` +
    `${toX(last.timestamp).toFixed(1)},${(height - pad).toFixed(1)}`;

  return html`
    <svg width=${width} height=${height} viewBox="0 0 ${width} ${height}" class="line-chart">
      <polygon points=${areaPoints} fill=${colorVar} opacity="0.12"></polygon>
      <polyline
        points=${linePoints}
        fill="none"
        stroke=${colorVar}
        stroke-width="2"
        stroke-linejoin="round"
        stroke-linecap="round"
      ></polyline>
      <circle cx=${toX(last.timestamp)} cy=${toY(last.value)} r="3" fill=${colorVar}></circle>
    </svg>
  `;
}

/** One axis of a `radarChart` - a subject name + its value on that axis. */
export interface RadarAxis {
  label: string;
  value: number;
}

/**
 * A radar/spider chart - every axis scaled 0..max from a shared center, one
 * filled polygon connecting each axis's value. Needs at least 3 axes to
 * read as a shape at all (2 axes would degenerate to a line).
 */
export function radarChart(
  axes: RadarAxis[],
  opts: { width?: number; height?: number; max?: number; colorVar?: string; ringCount?: number } = {}
): TemplateResult {
  const width = opts.width ?? 220;
  const height = opts.height ?? 200;
  const max = opts.max ?? 6;
  const colorVar = opts.colorVar ?? "var(--lc-brand)";
  const ringCount = opts.ringCount ?? 3;
  const cx = width / 2;
  const cy = height / 2 - 4;
  const maxR = Math.min(width, height) / 2 - 32;
  const n = axes.length;

  if (n < 3) {
    return html`<svg width=${width} height=${height} viewBox="0 0 ${width} ${height}" class="radar-chart"></svg>`;
  }

  const angle = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const point = (i: number, val: number): [number, number] => {
    const r = (Math.max(0, Math.min(max, val)) / max) * maxR;
    return [cx + r * Math.cos(angle(i)), cy + r * Math.sin(angle(i))];
  };

  const rings = Array.from({ length: ringCount }, (_, i) => (max * (i + 1)) / ringCount);
  const axisEnds = axes.map((_, i) => point(i, max));
  const dataPoints = axes.map((a, i) => point(i, a.value));
  const dataPolygon = dataPoints.map((p) => p.join(",")).join(" ");

  return html`
    <svg width=${width} height=${height} viewBox="0 0 ${width} ${height}" class="radar-chart">
      ${rings.map(
        (ringVal) =>
          svg`<polygon
            points=${axes.map((_, i) => point(i, ringVal).join(",")).join(" ")}
            class="radar-grid"
          ></polygon>`
      )}
      ${axisEnds.map(([x, y]) => svg`<line x1=${cx} y1=${cy} x2=${x} y2=${y} class="radar-axis"></line>`)}
      <polygon
        points=${dataPolygon}
        fill=${colorVar}
        fill-opacity="0.22"
        stroke=${colorVar}
        stroke-width="2"
        stroke-linejoin="round"
      ></polygon>
      ${dataPoints.map(([x, y]) => svg`<circle cx=${x} cy=${y} r="3.2" fill=${colorVar}></circle>`)}
      ${axes.map((a, i) => {
        const [lx, ly] = point(i, max * 1.18);
        const cosA = Math.cos(angle(i));
        const anchor = Math.abs(cosA) < 0.3 ? "middle" : cosA > 0 ? "start" : "end";
        return svg`<text x=${lx} y=${ly + 3} text-anchor=${anchor} class="radar-label">${a.label}</text>`;
      })}
    </svg>
  `;
}

/** One slice of a `donutChart` - a value + the CSS color var to draw it in. */
export interface DonutSegment {
  value: number;
  colorVar: string;
  label?: string;
}

/**
 * A multi-segment ring chart (grade categories, lesson-time-by-subject,
 * ...) - segments drawn proportionally via stroke-dasharray on stacked
 * circles, with the total shown in the center. An empty/zero-total input
 * renders the bare track with no center text, same "nothing to show yet"
 * convention as this file's other chart helpers.
 */
export function donutChart(
  segments: DonutSegment[],
  opts: { size?: number; stroke?: number; centerValue?: string | number; centerLabel?: string } = {}
): TemplateResult {
  const size = opts.size ?? 160;
  const stroke = opts.stroke ?? 20;
  const cx = size / 2;
  const cy = size / 2;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const total = segments.reduce((sum, s) => sum + s.value, 0);

  let offset = 0;
  const arcs =
    total > 0
      ? segments
          .filter((s) => s.value > 0)
          .map((s) => {
            const len = (s.value / total) * circumference;
            const arc = svg`
              <circle
                cx=${cx}
                cy=${cy}
                r=${r}
                fill="none"
                stroke=${s.colorVar}
                stroke-width=${stroke}
                stroke-dasharray="${len} ${circumference - len}"
                stroke-dashoffset=${-offset}
                transform="rotate(-90 ${cx} ${cy})"
              >
                <title>${s.label ?? ""}</title>
              </circle>
            `;
            offset += len;
            return arc;
          })
      : [];

  const centerValue = opts.centerValue ?? total;

  return html`
    <svg width=${size} height=${size} viewBox="0 0 ${size} ${size}" class="donut-chart">
      <circle cx=${cx} cy=${cy} r=${r} fill="none" stroke="var(--divider-color)" stroke-width=${stroke}></circle>
      ${arcs}
      ${total > 0
        ? svg`
            <text x=${cx} y=${cy - 2} text-anchor="middle" class="donut-total" fill="var(--primary-text-color)">
              ${centerValue}
            </text>
            ${opts.centerLabel
              ? svg`<text x=${cx} y=${cy + 14} text-anchor="middle" class="donut-unit" fill="var(--secondary-text-color)">
                  ${opts.centerLabel}
                </text>`
              : nothing}
          `
        : nothing}
    </svg>
  `;
}
