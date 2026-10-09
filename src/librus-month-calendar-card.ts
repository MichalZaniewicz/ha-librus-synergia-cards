import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { fetchCalendarEvents, isoDate, type LibrusCalendarEvent } from "./utils/calendar";
import { parseCategory, formatDate } from "./utils/format";
import { t, type TranslationKey } from "./utils/localize";
import { librusCardEditor } from "./utils/card-editor";

type Kind = "test" | "quiz" | "trip" | "meeting" | "homework" | "other";
const KINDS: Kind[] = ["test", "quiz", "trip", "meeting", "homework", "other"];
// Agenda categories are each school's own names, so they're matched by text.
const KIND_RE: [Kind, RegExp][] = [
  ["quiz", /kartk|quiz/i],
  ["test", /sprawdzian|praca klasowa|\btest|egzamin|diagnoz/i],
  ["trip", /wycieczk|wyjści/i],
  ["meeting", /zebrani|konsultacj|wywiadówk/i],
];

interface DayEntry {
  kind: Kind;
  title: string;
  detail?: string;
}

interface HomeworkItem {
  topic?: string;
  subject?: string | null;
  due_date?: string | null;
}

// One shared empty list, so _index()'s memo still hits without homework.
const NO_HOMEWORK: HomeworkItem[] = [];

function kindOf(category: string | null, text: string): Kind {
  const haystack = `${category ?? ""} ${text}`;
  return KIND_RE.find(([, re]) => re.test(haystack))?.[0] ?? "other";
}

/** Every date an all-day event covers ([start, end), end exclusive). */
function coveredDays(ev: LibrusCalendarEvent): string[] {
  const days: string[] = [];
  const d = new Date(`${ev.start.slice(0, 10)}T12:00:00`);
  const end = new Date(`${(ev.end || ev.start).slice(0, 10)}T12:00:00`);
  do {
    days.push(isoDate(d));
    d.setDate(d.getDate() + 1);
  } while (d < end);
  return days;
}

/**
 * A month grid: Agenda entries (tests, quizzes, trips, meetings, other),
 * homework due dates and free days as coloured dots. Arrows switch the
 * month; tapping a day lists its entries under the grid.
 */
@customElement("librus-month-calendar-card")
export class LibrusMonthCalendarCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  /** The month picked with the arrows; unset = follow today's month (also
   * across midnight into a new month on a dashboard left open). */
  @state() private _month?: Date;
  @state() private _selected?: string;
  @state() private _agenda: LibrusCalendarEvent[] = [];
  @state() private _free: LibrusCalendarEvent[] = [];
  private _fetchedFor?: string;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-month-calendar-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 6;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._every(30 * 60_000, () => void this._fetch(this._forceRefresh()));
  }


  private get _shownMonth(): Date {
    if (this._month) return this._month;
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  }

  private async _fetch(force = false): Promise<void> {
    if (!this.hass || !this._config) return;
    const resolved = this._resolveEntities();
    if ("error" in resolved) return;
    const { agenda, free_days: freeDays } = resolved.map;
    const shown = this._shownMonth;
    const start = new Date(shown);
    const end = new Date(shown.getFullYear(), shown.getMonth() + 1, 1);
    const range = `${agenda}:${freeDays}:${isoDate(start)}`;
    const cacheKey = `${range}:${this._dataStamp()}`;
    if (!force && this._fetchedFor === cacheKey) return;
    this._fetchedFor = cacheKey;
    const generation = this._beginFetch();
    // undefined = the fetch failed (an entity that isn't there loads as []).
    const load = async (id?: string): Promise<LibrusCalendarEvent[] | undefined> =>
      id ? fetchCalendarEvents(this.hass!, id, start, end).catch(() => undefined) : [];
    const [agendaEvents, freeEvents] = await Promise.all([load(agenda), load(freeDays)]);
    if (!this._isCurrentFetch(generation)) return;
    // A failed calendar keeps what the card already shows for this month.
    const keep = this._keepAfterError(range);
    this._agenda = agendaEvents ?? (keep ? this._agenda : []);
    this._free = freeEvents ?? (keep ? this._free : []);
    if (agendaEvents && freeEvents) this._fetchSucceeded(range);
  }

  private _shift(months: number): void {
    const shown = this._shownMonth;
    const target = new Date(shown.getFullYear(), shown.getMonth() + months, 1);
    const today = new Date();
    const isTodaysMonth = target.getFullYear() === today.getFullYear() && target.getMonth() === today.getMonth();
    // Back on today's month: follow today again (also across midnight into
    // a new month), as if the arrows had never been used.
    this._month = isTodaysMonth ? undefined : target;
    this._selected = undefined;
    void this._fetch();
  }

  // _index()'s last result and what it was built from - render() runs on
  // every hass update, the index only changes with these.
  private _indexCache?: {
    agenda: LibrusCalendarEvent[];
    free: LibrusCalendarEvent[];
    homework: HomeworkItem[];
    month: string;
    language: string;
    result: { entries: Map<string, DayEntry[]>; free: Map<string, string> };
  };

  /** date -> entries, and date -> free-day name, for the shown month. */
  private _index(homework: HomeworkItem[]): { entries: Map<string, DayEntry[]>; free: Map<string, string> } {
    const hass = this.hass!;
    const month = isoDate(this._shownMonth);
    const c = this._indexCache;
    if (
      c &&
      c.agenda === this._agenda &&
      c.free === this._free &&
      c.homework === homework &&
      c.month === month &&
      c.language === hass.language
    ) {
      return c.result;
    }
    const result = this._buildIndex(homework);
    this._indexCache = { agenda: this._agenda, free: this._free, homework, month, language: hass.language, result };
    return result;
  }

  private _buildIndex(homework: HomeworkItem[]): { entries: Map<string, DayEntry[]>; free: Map<string, string> } {
    const hass = this.hass!;
    const entries = new Map<string, DayEntry[]>();
    const add = (day: string, entry: DayEntry) => entries.set(day, [...(entries.get(day) ?? []), entry]);
    for (const ev of this._agenda) {
      const { category, text } = parseCategory(ev.summary);
      const entry: DayEntry = {
        kind: kindOf(category, text),
        title: text,
        detail: [category, ev.description].filter(Boolean).join(" · ") || undefined,
      };
      // A multi-day all-day entry (e.g. a trip) gets a dot on every day it covers.
      for (const day of ev.allDay ? coveredDays(ev) : [ev.start.slice(0, 10)]) add(day, entry);
    }
    for (const hw of homework) {
      const due = (hw.due_date ?? "").slice(0, 10);
      if (!due) continue;
      add(due, {
        kind: "homework",
        title: hw.subject ? t(hass, "card.month.homework_for", { subject: hw.subject }) : t(hass, "card.month.homework"),
        detail: hw.topic || undefined,
      });
    }
    const free = new Map<string, string>();
    for (const ev of this._free) for (const day of coveredDays(ev)) free.set(day, ev.summary);
    return { entries, free };
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { map } = resolved;
    const hass = this.hass;
    void this._fetch();

    const homeworkEntity = map.homework_assignments ? hass.states[map.homework_assignments] : undefined;
    const homework = (homeworkEntity?.attributes.recent as HomeworkItem[] | undefined) ?? NO_HOMEWORK;
    const { entries, free } = this._index(homework);

    const shownMonth = this._shownMonth;
    const year = shownMonth.getFullYear();
    const month = shownMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const lead = (shownMonth.getDay() + 6) % 7;
    const todayIso = isoDate(new Date());
    const monthPrefix = `${year}-${String(month + 1).padStart(2, "0")}`;
    const inMonth = [...entries.keys()].filter((d) => d.startsWith(monthPrefix)).sort();
    // A day picked in another month (e.g. before the month followed today
    // across midnight) doesn't count.
    const picked = this._selected?.startsWith(monthPrefix) ? this._selected : undefined;
    const selected =
      picked ?? (todayIso.startsWith(monthPrefix) ? todayIso : (inMonth.find((d) => d >= todayIso) ?? inMonth[0]));

    // A multi-day entry sits on several days as the same object - count it once.
    const monthEntries = new Set(inMonth.flatMap((day) => entries.get(day) ?? []));
    const counts = new Map<Kind, number>();
    for (const e of monthEntries) counts.set(e.kind, (counts.get(e.kind) ?? 0) + 1);
    const summary = (["test", "quiz", "trip"] as Kind[])
      .filter((k) => counts.get(k))
      .map((k) => `${t(hass, `card.month.kind_${k}` as TranslationKey)} ${counts.get(k)}`)
      .join(" · ");
    const title = formatDate(shownMonth, hass.language, { month: "long", year: "numeric" });

    const cells: TemplateResult[] = [];
    for (let i = 0; i < lead; i++) cells.push(html`<span class="day other"></span>`);
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const iso = isoDate(date);
      const weekend = date.getDay() === 0 || date.getDay() === 6;
      const dayEntries = entries.get(iso) ?? [];
      cells.push(html`<button
        class="day ${free.has(iso) || weekend ? "free" : ""} ${iso === todayIso ? "today" : ""} ${iso === selected
          ? "sel"
          : ""}"
        @click=${() => (this._selected = iso)}
        aria-pressed=${iso === selected ? "true" : "false"}
        aria-current=${iso === todayIso ? "date" : nothing}
        aria-label=${formatDate(date, hass.language, { day: "numeric", month: "long" })}
      >
        <span class="n">${d}</span>
        <span class="dots">${dayEntries.slice(0, 4).map((e) => html`<i class="dot k-${e.kind}"></i>`)}</span>
      </button>`);
    }

    const kindsShown = KINDS.filter((k) => counts.get(k));
    const selectedEntries = selected ? (entries.get(selected) ?? []) : [];
    const selectedFree = selected ? free.get(selected) : undefined;
    const selectedLabel = selected
      ? new Date(`${selected}T12:00:00`).toLocaleDateString(hass.language, { weekday: "long", day: "numeric", month: "long" })
      : "";

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-month-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title ?? title.charAt(0).toUpperCase() + title.slice(1)}</div>
            <div class="subtitle">${summary || t(hass, "card.month.nothing_month")}</div>
          </div>
          <div class="nav">
            <button @click=${() => this._shift(-1)} aria-label=${t(hass, "card.month.previous")}>‹</button>
            <button @click=${() => this._shift(1)} aria-label=${t(hass, "card.month.next")}>›</button>
          </div>
        </div>
        <div class="grid">
          ${[0, 1, 2, 3, 4, 5, 6].map(
            (i) =>
              html`<span class="wd"
                >${new Date(2026, 0, 5 + i)
                  .toLocaleDateString(hass.language, { weekday: "short" })
                  .replace(".", "")
                  .slice(0, 3)}</span
              >`
          )}
          ${cells}
        </div>
        ${this._config.hide_legend
          ? nothing
          : html`<div class="legend">
              ${kindsShown.map(
                (k) => html`<span><i class="dot k-${k}"></i>${t(hass, `card.month.kind_${k}` as TranslationKey)}</span>`
              )}
              <span><i class="free-box"></i>${t(hass, "card.month.free")}</span>
            </div>`}
        ${selected
          ? html`<div class="list">
              <div class="list-title">${selectedLabel}</div>
              ${selectedFree ? html`<div class="ev"><i class="free-box"></i><div>${selectedFree}</div></div>` : nothing}
              ${selectedEntries.map(
                (e) => html`<div class="ev">
                  <i class="dot k-${e.kind}"></i>
                  <div>${e.title}${e.detail ? html`<small>${e.detail}</small>` : nothing}</div>
                </div>`
              )}
              ${!selectedFree && selectedEntries.length === 0
                ? html`<div class="none">${t(hass, "card.month.nothing_day")}</div>`
                : nothing}
            </div>`
          : nothing}
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .nav {
        margin-left: auto;
        display: flex;
        gap: 4px;
      }
      .nav button {
        width: 30px;
        height: 30px;
        border-radius: 8px;
        border: 0;
        background: var(--lc-chip-bg);
        color: var(--primary-text-color);
        font: inherit;
        font-size: 1.05rem;
        cursor: pointer;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(7, minmax(0, 1fr));
        gap: 3px;
      }
      .wd {
        font-size: 0.62rem;
        font-weight: 700;
        text-transform: uppercase;
        text-align: center;
        color: var(--secondary-text-color);
        padding-bottom: 2px;
      }
      .day {
        min-height: 42px;
        border-radius: 8px;
        border: 1px solid transparent;
        background: none;
        color: inherit;
        font: inherit;
        padding: 4px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
        cursor: pointer;
      }
      .day.other {
        cursor: default;
      }
      .day.free {
        background: var(--lc-chip-bg);
      }
      .day.free .n {
        color: var(--secondary-text-color);
      }
      .day .n {
        font-size: 0.74rem;
        font-variant-numeric: tabular-nums;
        line-height: 20px;
      }
      .day.today .n {
        background: var(--lc-brand);
        color: #fff;
        border-radius: 99px;
        width: 20px;
        text-align: center;
        font-weight: 700;
      }
      .day.sel {
        border-color: var(--lc-brand);
      }
      .dots {
        display: flex;
        flex-wrap: wrap;
        gap: 2px;
      }
      .dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        display: inline-block;
        flex: none;
        /* The shared .dot's margin-top (tuned for .list-item) would push
           the day-cell and legend dots down; only .ev .dot keeps it. */
        margin-top: 0;
      }
      .k-test {
        background: var(--lc-bad);
      }
      .k-quiz {
        background: var(--lc-amber);
      }
      .k-trip {
        background: var(--lc-good);
      }
      .k-meeting {
        background: var(--lc-brand);
      }
      .k-homework {
        background: var(--lc-chart-8);
      }
      .k-other {
        background: var(--secondary-text-color);
      }
      .free-box {
        width: 9px;
        height: 9px;
        border-radius: 2px;
        background: var(--lc-chip-bg);
        border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
        display: inline-block;
        flex: none;
      }
      .legend {
        display: flex;
        flex-wrap: wrap;
        gap: 6px 12px;
        margin-top: 10px;
        font-size: 0.7rem;
        color: var(--secondary-text-color);
      }
      .legend span {
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .list {
        margin-top: 12px;
        padding-top: 10px;
        border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
        display: grid;
        gap: 8px;
      }
      .list-title {
        font-size: 0.78rem;
        font-weight: 700;
      }
      .ev {
        display: grid;
        grid-template-columns: 10px minmax(0, 1fr);
        gap: 8px;
        align-items: start;
        font-size: 0.82rem;
      }
      .ev .dot,
      .ev .free-box {
        margin-top: 5px;
      }
      .ev small {
        display: block;
        color: var(--secondary-text-color);
        font-size: 0.74rem;
      }
      .none {
        font-size: 0.8rem;
        color: var(--secondary-text-color);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-month-calendar-card": LibrusMonthCalendarCard;
  }
}
