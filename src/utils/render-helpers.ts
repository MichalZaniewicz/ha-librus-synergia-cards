import { html, type TemplateResult } from "lit";
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
