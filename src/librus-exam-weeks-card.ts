import { html, svg, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { t } from "./utils/localize";
import { formatDate, parseCategory } from "./utils/format";
import { fetchCalendarEvents, isoDate, mondayOfWeek, type LibrusCalendarEvent } from "./utils/calendar";

/** The same words the integration's Next exam sensor matches (sensor.py,
 * _EXAM_CATEGORY_RE), in the Agenda category or, failing that, the text. */
const EXAM_RE = /sprawdzian|praca klasowa|kartków|egzamin|diagnoz|quiz/i;
const QUIZ_RE = /kartków|quiz/i;
/** As the Family card and the Heavy week blueprint: 3 or more is a heavy week. */
const HEAVY_WEEK = 3;
const DAY_MS = 86_400_000;

interface Week {
  monday: string; // YYYY-MM-DD
  tests: number;
  quizzes: number;
}

interface Semester {
  number: 1 | 2;
  start: Date;
  end: Date;
}

const day = (iso: string): Date => new Date(`${iso.slice(0, 10)}T00:00:00`);

/**
 * Tests and quizzes week by week across the whole semester, from the Agenda
 * calendar (approved mockup, card 4): past weeks solid, the rest faded,
 * this week outlined and a dashed line at a heavy week. Tells a test from a
 * quiz the way the integration does.
 */
@customElement("librus-exam-weeks-card")
export class LibrusExamWeeksCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  @state() private _events: LibrusCalendarEvent[] = [];
  private _fetchedFor?: string;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-exam-weeks-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 4;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._every(30 * 60_000, () => void this._fetch(this._forceRefresh()));
  }

  /** The semester to show: the one picked in the editor, else today's. */
  private _semester(): Semester | undefined {
    const hass = this.hass;
    if (!hass) return undefined;
    const resolved = this._resolveEntities();
    if ("error" in resolved) return undefined;
    const cls = resolved.map.school_class ? hass.states[resolved.map.school_class] : undefined;
    const startIso = cls?.attributes.school_year_start as string | undefined;
    const firstEndIso = cls?.attributes.first_semester_end as string | undefined;
    const endIso = cls?.attributes.school_year_end as string | undefined;
    if (!startIso || !firstEndIso || !endIso) return undefined;
    const firstEnd = day(firstEndIso);
    const today = day(isoDate(new Date()));
    const picked = this._config?.semester;
    const number: 1 | 2 = picked === "1" ? 1 : picked === "2" ? 2 : today <= firstEnd ? 1 : 2;
    return number === 1
      ? { number, start: day(startIso), end: firstEnd }
      : { number, start: new Date(firstEnd.getTime() + DAY_MS), end: day(endIso) };
  }

  private async _fetch(force = false): Promise<void> {
    if (!this.hass || !this._config) return;
    const resolved = this._resolveEntities();
    if ("error" in resolved) return;
    const entityId = resolved.map.agenda;
    const semester = this._semester();
    if (!entityId || !semester) return;

    const end = new Date(semester.end.getTime() + DAY_MS);
    const range = `${entityId}:${isoDate(semester.start)}:${isoDate(end)}`;
    const cacheKey = `${range}:${new Date().toDateString()}:${this._dataStamp()}`;
    if (!force && this._fetchedFor === cacheKey && !this._retryDue()) return;
    this._fetchedFor = cacheKey;

    const generation = this._beginFetch();
    try {
      const events = await fetchCalendarEvents(this.hass, entityId, semester.start, end);
      if (this._isCurrentFetch(generation)) {
        this._events = events;
        this._fetchSucceeded(range);
      }
    } catch {
      this._fetchFailed(generation);
      if (this._isCurrentFetch(generation) && !this._keepAfterError(range)) this._events = [];
    }
  }

  private _weeks(semester: Semester): Week[] {
    const weeks = new Map<string, Week>();
    for (const m = mondayOfWeek(semester.start); m <= semester.end; m.setDate(m.getDate() + 7)) {
      // Whole weeks off at the edges (a semester ending on a Sunday) stay out.
      const key = isoDate(m);
      weeks.set(key, { monday: key, tests: 0, quizzes: 0 });
    }
    for (const ev of this._events) {
      const { category, text } = parseCategory(ev.summary);
      const hay = category && EXAM_RE.test(category) ? category : EXAM_RE.test(text) ? text : undefined;
      if (!hay) continue;
      const week = weeks.get(isoDate(mondayOfWeek(day(ev.start))));
      if (!week) continue;
      if (QUIZ_RE.test(hay)) week.quizzes += 1;
      else week.tests += 1;
    }
    return [...weeks.values()];
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const hass = this.hass;
    void this._fetch();

    const title = this._config.title ?? t(hass, "card.exam_weeks.title");
    const icon = "mdi:chart-bar";
    const semester = this._semester();
    if (!semester || !resolved.map.agenda) return this._message(icon, title, t(hass, "card.exam_weeks.no_semester"));

    const weeks = this._memo("weeks", [this._events, semester.start.getTime(), semester.end.getTime()], () =>
      this._weeks(semester)
    );
    if (!weeks.some((w) => w.tests + w.quizzes > 0)) return this._message(icon, title, t(hass, "card.exam_weeks.empty"));

    const thisMonday = isoDate(mondayOfWeek(new Date()));
    const ahead = weeks.filter((w) => w.monday >= thisMonday);
    const left = ahead.reduce((a, w) => a + w.tests + w.quizzes, 0);
    const heavy = ahead.find((w) => w.tests + w.quizzes >= HEAVY_WEEK);
    const roman = semester.number === 1 ? "I" : "II";

    return html`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon=${icon}></ha-icon></div>
          <div class="title-block">
            <div class="title">${title}</div>
            <div class="subtitle">${t(hass, "card.exam_weeks.subtitle", { semester: roman })}</div>
          </div>
        </div>
        ${this._chart(weeks, thisMonday)}
        <div class="legend">
          <span class="legend-item"><span class="sw" style="background:var(--lc-bad)"></span>${t(hass, "card.exam_weeks.tests")}</span>
          <span class="legend-item"><span class="sw" style="background:var(--lc-amber)"></span>${t(hass, "card.exam_weeks.quizzes")}</span>
          <span class="legend-item"><span class="dash"></span>${t(hass, "card.exam_weeks.heavy", { count: HEAVY_WEEK })}</span>
        </div>
        <div class="chips">
          <span class="chip">${t(hass, "card.exam_weeks.left")} <span class="n">${left}</span></span>
          ${heavy
            ? html`<span class="chip">${t(hass, "card.exam_weeks.next_heavy")} <span class="n">${this._weekLabel(heavy.monday)}</span></span>`
            : nothing}
        </div>
      </ha-card>
    `;
  }

  /** "16–20 lis" (or "30 lis – 4 gru") for a week's Monday to Friday. */
  private _weekLabel(monday: string): string {
    const lang = this.hass?.language;
    const from = day(monday);
    const to = day(monday);
    to.setDate(to.getDate() + 4);
    const month = (d: Date) => formatDate(d, lang, { month: "short" }).replace(".", "");
    return from.getMonth() === to.getMonth()
      ? `${from.getDate()}–${to.getDate()} ${month(to)}`
      : `${from.getDate()} ${month(from)} – ${to.getDate()} ${month(to)}`;
  }

  private _chart(weeks: Week[], thisMonday: string): TemplateResult {
    const hass = this.hass!;
    const lang = hass.language;
    const slot = 14;
    const barW = 10;
    const x0 = 6;
    const width = Math.max(200, x0 * 2 + weeks.length * slot);
    const base = 112;
    const maxTotal = Math.max(...weeks.map((w) => w.tests + w.quizzes), HEAVY_WEEK + 1);
    const unit = (base - 10) / maxTotal;
    const heavyY = base - HEAVY_WEEK * unit;
    let lastMonth = -1;

    return html`
      <svg class="chart" viewBox="0 0 ${width} ${base + 30}" role="img" aria-label=${t(hass, "card.exam_weeks.title")}>
        <line x1="2" x2=${width - 2} y1=${heavyY} y2=${heavyY} class="heavy"></line>
        <line x1="2" x2=${width - 2} y1=${base + 0.5} y2=${base + 0.5} stroke="var(--divider-color)"></line>
        ${weeks.map((w, i) => {
          const x = x0 + i * slot + (slot - barW) / 2;
          const future = w.monday > thisMonday;
          const now = w.monday === thisMonday;
          const tH = w.tests * unit;
          const qH = w.quizzes * unit;
          const top = base - tH - qH;
          // A week belongs to the month its Thursday is in.
          const thursday = day(w.monday);
          thursday.setDate(thursday.getDate() + 3);
          const showMonth = thursday.getMonth() !== lastMonth;
          lastMonth = thursday.getMonth();
          const tip = `${this._weekLabel(w.monday)}: ${t(hass, "card.exam_weeks.tests")} ${w.tests}, ${t(hass, "card.exam_weeks.quizzes")} ${w.quizzes}`;
          return svg`
            <g class=${future ? "future" : ""}>
              <title>${tip}</title>
              <rect x=${x - 2} y="0" width=${barW + 4} height=${base} fill="transparent"></rect>
              ${w.tests ? svg`<rect x=${x} y=${base - tH} width=${barW} height=${Math.max(tH - 1.5, 1)} rx="2" fill="var(--lc-bad)"></rect>` : nothing}
              ${w.quizzes ? svg`<rect x=${x} y=${top} width=${barW} height=${Math.max(qH - 1.5, 1)} rx="2" fill="var(--lc-amber)"></rect>` : nothing}
            </g>
            ${now
              ? svg`<rect x=${x - 2} y=${Math.min(top, base - 2 * unit) - 3} width=${barW + 4} height=${base - Math.min(top, base - 2 * unit) + 4} rx="3" class="now"></rect>
                  <text x=${x + barW / 2} y=${base + 26} text-anchor="middle" class="now-label">${t(hass, "card.exam_weeks.now")}</text>`
              : nothing}
            ${showMonth
              ? svg`<text x=${x} y=${base + 13} class="month">${formatDate(thursday, lang, { month: "short" }).replace(".", "")}</text>`
              : nothing}
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
      .chart .future {
        opacity: 0.45;
      }
      .chart .heavy {
        stroke: var(--lc-bad);
        stroke-dasharray: 3 3;
        opacity: 0.7;
      }
      .chart .now {
        fill: none;
        stroke: var(--primary-text-color);
        stroke-width: 1.2;
      }
      .chart .now-label {
        font-size: 9px;
        font-weight: 700;
        fill: var(--primary-text-color);
      }
      .chart .month {
        font-size: 9.5px;
        fill: var(--secondary-text-color);
      }
      .sw {
        width: 9px;
        height: 9px;
        border-radius: 2px;
        display: inline-block;
      }
      .dash {
        width: 12px;
        border-top: 1.5px dashed var(--lc-bad);
        display: inline-block;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-exam-weeks-card": LibrusExamWeeksCard;
  }
}
