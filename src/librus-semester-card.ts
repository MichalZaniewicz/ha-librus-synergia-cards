import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { formatNumber, numOrNull } from "./utils/format";
import { t } from "./utils/localize";
import { librusCardEditor } from "./utils/card-editor";

/** One semester of the Overall average sensor's `semester_summary`. */
interface SemesterNumbers {
  semester: number;
  start: string;
  end: string;
  days: number;
  days_elapsed: number;
  progress: number;
  finished: boolean;
  grades: {
    count: number;
    distribution: Record<string, number>;
    sixes: number;
    plus: number;
    tests: number;
    tests_average: number | null;
    corrections: number;
    with_comments: number;
    per_week: number;
    average: number | null;
    average_change: number | null;
    average_series: [string, number][];
  };
  subjects: { subject: string; average: number; count: number }[];
  attendance: {
    percentage: number | null;
    absences: number;
    late: number;
    absences_by_weekday: number[];
    last_absence: string | null;
  };
  lessons: { held: number; cancelled: number; substitutions: number };
  notes: { positive: number; negative: number; neutral: number };
  homework: number;
  exams: { done: number; upcoming: number };
  badges: number;
}

interface SemesterSummary {
  current: number;
  semesters: Record<string, SemesterNumbers>;
  library_books: number;
}

/** The average a certificate with distinction needs. */
const HONOURS = 4.75;

/** Bar colour of a grade digit 1-6, red to the accent. */
const DIGIT_COLORS = [
  "var(--lc-bad)",
  "color-mix(in srgb, var(--lc-bad) 55%, var(--lc-warn))",
  "var(--lc-warn)",
  "color-mix(in srgb, var(--lc-warn) 40%, var(--lc-good))",
  "var(--lc-good)",
  "var(--lc-brand)",
];

/** Bar colour of an average, by the grade it points to. */
function averageColor(v: number): string {
  if (v >= 5.5) return DIGIT_COLORS[5];
  if (v >= 4.75) return DIGIT_COLORS[4];
  if (v >= 3.75) return DIGIT_COLORS[3];
  if (v >= 2.75) return DIGIT_COLORS[2];
  if (v >= 1.75) return DIGIT_COLORS[1];
  return DIGIT_COLORS[0];
}

/**
 * The semester in numbers (integration's `semester_summary` on the Overall
 * average sensor): the average with its 30-day change and a weekly line,
 * how the semester's grades split, every subject's semester average,
 * attendance by weekday and the rest of the semester counted up. Shows the
 * current semester unless `semester` picks one.
 */
@customElement("librus-semester-card")
export class LibrusSemesterCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-semester-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 10;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { map } = resolved;
    const hass = this.hass;
    const icon = "mdi:chart-box-outline";
    const title = this._config.title ?? t(hass, "card.semester.title");
    const overall = map.overall_average ? hass.states[map.overall_average] : undefined;
    if (!overall || !("semester_summary" in overall.attributes)) {
      return this._message(icon, title, t(hass, "card.semester.requires"));
    }
    const summary = overall.attributes.semester_summary as SemesterSummary | null;
    const picked = this._config.semester && this._config.semester !== "auto" ? this._config.semester : undefined;
    if (!summary) return this._message(icon, title, t(hass, "card.semester.empty"));
    const s = summary.semesters[picked ?? String(summary.current)];
    if (!s) return this._message(icon, title, t(hass, "card.semester.not_started"));

    const lang = hass.language;
    const n2 = (v: number) => formatNumber(v, lang, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const n1 = (v: number) => formatNumber(v, lang, { maximumFractionDigits: 1 });
    const g = s.grades;
    const a = s.attendance;
    // "2026/27" for both semesters of the school year that starts in 2026.
    const firstYear = Number(s.start.slice(0, 4)) - (s.semester === 1 ? 0 : 1);
    const year = `${firstYear}/${String(firstYear + 1).slice(2)}`;
    const roman = s.semester === 1 ? "I" : "II";
    const subtitle = s.finished
      ? t(hass, "card.semester.finished", { semester: roman, year })
      : t(hass, "card.semester.subtitle", { semester: roman, year, day: s.days_elapsed, days: s.days });
    const weighted = overall.attributes.average_mode !== "arithmetic";
    const change = numOrNull(g.average_change);
    const toHonours = g.average !== null && g.average < HONOURS ? HONOURS - g.average : null;

    const best = s.subjects.slice(0, 3);
    const worst = s.subjects.length > 5 ? s.subjects.slice(-2) : s.subjects.slice(3);
    const lastAbsence = a.last_absence ? new Date(`${a.last_absence}T00:00:00`) : null;
    const streak =
      !s.finished && lastAbsence
        ? Math.max(0, Math.floor((Date.now() - lastAbsence.getTime()) / 86400000))
        : null;
    const maxDigit = Math.max(1, ...Object.values(g.distribution));
    const maxWeekday = Math.max(1, ...a.absences_by_weekday);
    const weekdays = Array.from({ length: 5 }, (_, i) =>
      new Date(2026, 0, i + 5).toLocaleDateString(lang, { weekday: "short" })
    );

    const stat = (value: string | number, label: string, tone = "") =>
      html`<div class="stat ${tone}"><b>${value}</b><span>${label}</span></div>`;

    return html`
      <ha-card class="static">
        <div class="hero">
          <div class="header">
            <div class="icon-badge"><ha-icon icon=${icon}></ha-icon></div>
            <div class="title-block">
              <div class="title">${title}</div>
              <div class="subtitle">${subtitle}</div>
            </div>
            ${this._ring(s.progress)}
          </div>
          <div class="avg">
            <span class="big">${g.average !== null ? n2(g.average) : "—"}</span>
            <span class="side">
              ${t(hass, weighted ? "card.semester.weighted" : "card.semester.arithmetic")}<br />
              ${change !== null
                ? html`<b>${change > 0 ? "▲" : change < 0 ? "▼" : "="} ${n2(Math.abs(change))}</b>
                    ${t(hass, "card.semester.in_30_days")}`
                : nothing}
              ${toHonours !== null
                ? html`<span class="pill">${t(hass, "card.semester.to_honours", { value: n2(toHonours) })}</span>`
                : g.average !== null
                  ? html`<span class="pill">${t(hass, "card.semester.honours")}</span>`
                  : nothing}
            </span>
          </div>
          ${this._sparkline(g.average_series)}
        </div>
        <div class="body">
          <div class="sec">${t(hass, "card.semester.grades")}</div>
          <div class="stats">
            ${stat(g.count, t(hass, "card.semester.grade_count"))}
            ${stat(g.sixes, t(hass, "card.semester.sixes"), "hl")}
            ${stat(g.tests, t(hass, "card.semester.tests"))}
            ${stat(g.tests_average !== null ? n2(g.tests_average) : "—", t(hass, "card.semester.tests_average"))}
            ${stat(g.plus, t(hass, "card.semester.plus"))}
            ${stat(g.corrections, t(hass, "card.semester.corrections"))}
            ${stat(n1(g.per_week), t(hass, "card.semester.per_week"))}
            ${stat(g.with_comments, t(hass, "card.semester.comments"))}
          </div>
          ${g.count > 0
            ? html`<div class="hist">
                ${[1, 2, 3, 4, 5, 6].map((d) => {
                  const c = g.distribution[String(d)] ?? 0;
                  return html`<div class="col">
                    <span class="cnt">${c}</span>
                    <div class="bar" style="height:${(c / maxDigit) * 62}%;background:${DIGIT_COLORS[d - 1]}"></div>
                    <span class="lab">${d}</span>
                  </div>`;
                })}
              </div>`
            : nothing}
          ${s.subjects.length
            ? html`<div class="sec">${t(hass, "card.semester.subjects")}</div>
                <div class="subs">
                  ${[...best, ...worst].map(
                    (x) => html`<div class="sub" title=${`${x.subject}: ${n2(x.average)} (${x.count})`}>
                      <span class="name">${x.subject}</span>
                      <span class="track"><i style="width:${((x.average - 1) / 5) * 100}%;background:${averageColor(x.average)}"></i></span>
                      <span class="v">${n2(x.average)}</span>
                    </div>`
                  )}
                </div>`
            : nothing}
          <div class="sec">${t(hass, "card.semester.attendance")}</div>
          <div class="stats">
            ${stat(a.percentage !== null ? `${n1(a.percentage)}%` : "—", t(hass, "card.semester.present"), "good")}
            ${stat(a.absences, t(hass, "card.semester.absences"))}
            ${stat(a.late, t(hass, "card.semester.late"))}
            ${stat(streak !== null ? streak : "—", t(hass, "card.semester.streak"), "hl")}
          </div>
          <div class="wk">
            ${weekdays.map(
              (d, i) => html`<div style="background:color-mix(in srgb, var(--lc-bad) ${Math.round((a.absences_by_weekday[i] / maxWeekday) * 32)}%, var(--lc-soft))">
                <b>${a.absences_by_weekday[i]}</b>${d}
              </div>`
            )}
          </div>
          <div class="sec">${t(hass, "card.semester.rest")}</div>
          <div class="stats">
            ${stat(s.lessons.held, t(hass, "card.semester.held"))}
            ${stat(s.lessons.cancelled, t(hass, "card.semester.cancelled"))}
            ${stat(`+${s.notes.positive}/−${s.notes.negative}`, t(hass, "card.semester.notes"))}
            ${stat(s.badges, t(hass, "card.semester.badges"), "warn")}
            ${stat(s.homework, t(hass, "card.semester.homework"))}
            ${stat(s.exams.upcoming, t(hass, "card.semester.exams_upcoming"))}
            ${stat(s.lessons.substitutions, t(hass, "card.semester.substitutions"))}
            ${stat(summary.library_books, t(hass, "card.semester.books"))}
          </div>
        </div>
      </ha-card>
    `;
  }

  /** The semester's progress as a white ring on the band. */
  private _ring(progress: number): TemplateResult {
    const r = 22;
    const c = 2 * Math.PI * r;
    const pct = Math.max(0, Math.min(1, progress));
    return html`<svg class="ring" viewBox="0 0 54 54" aria-hidden="true">
      <circle cx="27" cy="27" r=${r} fill="none" stroke="rgba(255,255,255,.25)" stroke-width="6"></circle>
      <circle cx="27" cy="27" r=${r} fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"
        stroke-dasharray=${`${c * pct} ${c}`} transform="rotate(-90 27 27)"></circle>
      <text x="27" y="31" text-anchor="middle" font-size="12" font-weight="900" fill="#fff">${Math.round(pct * 100)}%</text>
    </svg>`;
  }

  /** The average week by week, as one line on the band. */
  private _sparkline(series: [string, number][]): TemplateResult | typeof nothing {
    if (series.length < 2) return nothing;
    const w = 300;
    const h = 40;
    const values = series.map(([, v]) => v);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = max - min || 1;
    const pts = values.map((v, i) => [(i * w) / (values.length - 1), h - 4 - ((v - min) / span) * (h - 8)]);
    const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join("");
    const last = pts[pts.length - 1];
    return html`<svg class="spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">
      <path d=${`${line}L${w},${h}L0,${h}Z`} fill="rgba(255,255,255,.18)"></path>
      <path d=${line} fill="none" stroke="#fff" stroke-width="2" vector-effect="non-scaling-stroke"></path>
      <circle cx=${last[0] - 3} cy=${last[1]} r="3.5" fill="#fff"></circle>
    </svg>`;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      :host {
        --lc-soft: color-mix(in srgb, var(--divider-color) 45%, transparent);
      }
      ha-card,
      :host(.compact) ha-card {
        padding: 0;
        gap: 0;
        overflow: hidden;
      }
      .hero {
        background: linear-gradient(
          135deg,
          color-mix(in srgb, var(--lc-brand) 80%, #000),
          color-mix(in srgb, color-mix(in srgb, var(--lc-brand) 80%, #000) 55%, #7c3aed)
        );
        color: #fff;
        padding: 16px;
      }
      .hero .header {
        margin-bottom: 0;
        align-items: flex-start;
      }
      .hero .icon-badge {
        background: rgba(255, 255, 255, 0.18);
      }
      .hero .icon-badge ha-icon,
      .hero .title,
      .hero .subtitle {
        color: #fff;
      }
      .hero .subtitle {
        opacity: 0.85;
      }
      .ring {
        width: 54px;
        height: 54px;
        flex: none;
        margin-left: auto;
      }
      .avg {
        display: flex;
        align-items: flex-end;
        gap: 12px;
        margin-top: 8px;
      }
      .avg .big {
        font-size: 3.2rem;
        font-weight: 900;
        line-height: 0.9;
        letter-spacing: -0.02em;
        font-variant-numeric: tabular-nums;
      }
      .avg .side {
        font-size: 0.75rem;
        line-height: 1.45;
        padding-bottom: 2px;
      }
      .avg .side b {
        font-size: 0.9rem;
        font-variant-numeric: tabular-nums;
      }
      .pill {
        display: inline-block;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 999px;
        padding: 0 8px;
        font-size: 0.7rem;
        font-weight: 700;
        white-space: nowrap;
      }
      .spark {
        display: block;
        width: 100%;
        height: 40px;
        margin-top: 8px;
      }
      .body {
        padding: 4px 16px 16px;
      }
      .sec {
        font-size: 0.66rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--lc-brand);
        margin: 14px 0 8px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .sec::after {
        content: "";
        flex: 1;
        height: 1px;
        background: var(--divider-color);
      }
      .stats {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 6px;
      }
      .stat {
        background: var(--lc-soft);
        border-radius: 9px;
        padding: 8px 6px;
        min-width: 0;
      }
      .stat b {
        display: block;
        font-size: 1.1rem;
        font-weight: 900;
        line-height: 1.1;
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .stat span {
        display: block;
        font-size: 0.62rem;
        color: var(--secondary-text-color);
        margin-top: 2px;
        line-height: 1.2;
      }
      .stat.hl {
        background: var(--lc-brand-bg);
      }
      .stat.hl b {
        color: var(--lc-brand-strong);
      }
      .stat.good {
        background: var(--lc-good-bg);
      }
      .stat.good b {
        color: var(--lc-good);
      }
      .stat.warn {
        background: var(--lc-warn-bg);
      }
      .stat.warn b {
        color: var(--lc-warn);
      }
      .hist {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 6px;
        align-items: end;
        height: 86px;
        margin-top: 10px;
      }
      .hist .col {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        gap: 3px;
        height: 100%;
      }
      .hist .bar {
        width: 100%;
        min-height: 3px;
        border-radius: 5px 5px 2px 2px;
      }
      .hist .cnt {
        font-size: 0.66rem;
        font-weight: 700;
        font-variant-numeric: tabular-nums;
      }
      .hist .lab {
        font-size: 0.7rem;
        font-weight: 900;
        color: var(--secondary-text-color);
      }
      .subs {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
      .sub {
        display: grid;
        grid-template-columns: minmax(0, 6.5rem) 1fr 2.2rem;
        gap: 8px;
        align-items: center;
        font-size: 0.74rem;
      }
      .sub .name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .sub .track {
        height: 8px;
        background: var(--divider-color);
        border-radius: 4px;
        overflow: hidden;
      }
      .sub .track i {
        display: block;
        height: 100%;
        border-radius: 4px;
      }
      .sub .v {
        text-align: right;
        font-weight: 700;
        font-variant-numeric: tabular-nums;
      }
      .wk {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 4px;
        margin-top: 8px;
      }
      .wk div {
        border-radius: 6px;
        text-align: center;
        padding: 5px 0;
        font-size: 0.64rem;
        color: var(--secondary-text-color);
        text-transform: capitalize;
      }
      .wk b {
        display: block;
        font-size: 0.9rem;
        color: var(--primary-text-color);
        font-variant-numeric: tabular-nums;
      }
      :host(.compact) .avg .big {
        font-size: 2.4rem;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-semester-card": LibrusSemesterCard;
  }
}
