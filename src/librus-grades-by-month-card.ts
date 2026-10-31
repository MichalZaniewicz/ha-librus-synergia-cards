import { html, svg, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { t } from "./utils/localize";
import { formatNumber } from "./utils/format";
import { isoDate } from "./utils/calendar";
import { monthLabel, schoolMonths } from "./utils/months";
import { AverageSum, averageTerm, isWeighted, type WeightedGradeEntry } from "./utils/grade-math";

const GRADES = [1, 2, 3, 4, 5, 6] as const;

interface MonthBar {
  month: string;
  counts: number[]; // index 0 = grade 1
  total: number;
  average?: number;
}

/**
 * How many grades of each value came in every month of the school year,
 * with that month's average above its bar (approved mockup, card 3). Reads
 * the subject sensors' `grades` - every subject, or one picked in the
 * editor. A grade counts in its bar by its whole number ("5+" is a 5); the
 * average follows the integration's average mode, so a grade that doesn't
 * count to the average still shows in the bar but not in the number.
 */
@customElement("librus-grades-by-month-card")
export class LibrusGradesByMonthCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-grades-by-month-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 4;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { deviceId, map } = resolved;
    const hass = this.hass;

    const subjects = this._resolveAllByTranslationKey(deviceId, "subject_average").filter(
      (s) => this._config!.subject_id === undefined || s.subjectId === this._config!.subject_id
    );
    const states = subjects.map((s) => hass.states[s.entityId]);
    const cls = map.school_class ? hass.states[map.school_class] : undefined;
    const todayMonth = isoDate(new Date()).slice(0, 7);

    const bars = this._memo("bars", [cls, todayMonth, ...states], () => {
      const months = schoolMonths(
        cls?.attributes.school_year_start as string | undefined,
        cls?.attributes.school_year_end as string | undefined,
        todayMonth
      );
      const byMonth = new Map<string, { counts: number[]; sum: AverageSum }>(
        months.map((m) => [m, { counts: [0, 0, 0, 0, 0, 0], sum: new AverageSum() }])
      );
      for (const st of states) {
        const weighted = isWeighted(st?.attributes);
        for (const g of (st?.attributes.grades as WeightedGradeEntry[] | undefined) ?? []) {
          const bucket = g.date ? byMonth.get(g.date.slice(0, 7)) : undefined;
          const digit = /^([1-6])/.exec(g.value.trim())?.[1];
          if (!bucket || !digit) continue;
          bucket.counts[Number(digit) - 1] += 1;
          bucket.sum.add(averageTerm(g, weighted));
        }
      }
      return months.map(
        (month): MonthBar => {
          const b = byMonth.get(month)!;
          return { month, counts: b.counts, total: b.counts.reduce((a, c) => a + c, 0), average: b.sum.average };
        }
      );
    });

    const subjectName = this._config.subject_id !== undefined ? subjects[0]?.subject : undefined;
    const title = this._config.title ?? t(hass, "card.grades_by_month.title");
    const icon = "mdi:chart-bar-stacked";
    if (!bars.some((b) => b.total > 0)) return this._message(icon, title, t(hass, "card.grades.empty"));

    return html`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge"><ha-icon icon=${icon}></ha-icon></div>
          <div class="title-block">
            <div class="title">${title}</div>
            <div class="subtitle">
              ${subjectName ? `${subjectName} · ` : ""}${t(hass, "card.grades_by_month.subtitle")}
            </div>
          </div>
        </div>
        ${this._chart(bars, todayMonth)}
        <div class="legend">
          ${[...GRADES].reverse().map(
            (g) => html`<span class="legend-item"><span class="sw" style="background:var(--lc-grade-${g})"></span>${g}</span>`
          )}
        </div>
      </ha-card>
    `;
  }

  private _chart(bars: MonthBar[], todayMonth: string): TemplateResult {
    const hass = this.hass!;
    // Always the width of a whole school year, so the bars keep their size
    // in September too; months still ahead stay empty.
    const width = 300;
    const slot = (width - 12) / Math.max(bars.length, 10);
    const height = 158;
    const base = 132;
    const top = 26;
    const barW = Math.min(20, slot - 8);
    const max = Math.max(...bars.map((b) => b.total), 1);
    const scale = (base - top) / max;
    const two = (v: number) => formatNumber(v, hass.language, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return html`
      <svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label=${t(hass, "card.grades_by_month.title")}>
        <line x1="4" x2=${width - 4} y1=${base + 0.5} y2=${base + 0.5} stroke="var(--divider-color)"></line>
        ${bars.map((b, i) => {
          const x = 6 + i * slot + (slot - barW) / 2;
          let y = base;
          const segments = b.counts.map((count, gi) => {
            if (!count) return nothing;
            const h = count * scale;
            y -= h;
            return svg`<rect x=${x} y=${y} width=${barW} height=${Math.max(h - 1.5, 1)} rx="3"
              fill="var(--lc-grade-${gi + 1})"><title>${gi + 1}: ${count}</title></rect>`;
          });
          const label = monthLabel(b.month, hass.language);
          return svg`
            ${segments}
            ${b.average !== undefined
              ? svg`<text x=${x + barW / 2} y=${y - 6} text-anchor="middle" class="avg">${two(b.average)}</text>`
              : nothing}
            <text x=${x + barW / 2} y=${base + 15} text-anchor="middle" class=${b.month === todayMonth ? "month now" : b.month > todayMonth ? "month ahead" : "month"}>${label}</text>
          `;
        })}
      </svg>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .chart {
        width: 100%;
        height: auto;
        display: block;
      }
      .chart .avg {
        font-size: 10.5px;
        font-weight: 800;
        fill: var(--primary-text-color);
      }
      .chart .month {
        font-size: 10px;
        fill: var(--secondary-text-color);
      }
      .chart .month.ahead {
        opacity: 0.45;
      }
      .chart .month.now {
        font-weight: 800;
        fill: var(--primary-text-color);
      }
      .sw {
        width: 9px;
        height: 9px;
        border-radius: 2px;
        display: inline-block;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-grades-by-month-card": LibrusGradesByMonthCard;
  }
}
