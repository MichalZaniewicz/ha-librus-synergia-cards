import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { allDayDates, fetchCalendarEvents, isoDate, type LibrusCalendarEvent } from "./utils/calendar";
import { parseCategory, formatDate } from "./utils/format";
import { t, type TranslationKey } from "./utils/localize";
import { librusCardEditor } from "./utils/card-editor";

type Kind = "test" | "quiz" | "trip" | "meeting" | "homework" | "other" | "cancelled" | "substitution";
const KINDS: Kind[] = ["test", "quiz", "trip", "meeting", "homework", "other", "cancelled", "substitution"];
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

/** One lesson change in the Cancelled lessons sensor's `by_date` attribute. */
interface LessonChangeItem {
  lesson_no: number | null;
  subject: string | null;
  kind: "cancelled" | "substitution" | "shifted";
}
type ChangesByDate = Record<string, LessonChangeItem[]>;

interface MonthIndex {
  entries: Map<string, DayEntry[]>;
  free: Map<string, string>;
  partial: Set<string>;
  absences: Map<string, AbsenceDay>;
}

// Shared empty values, so _index()'s memo still hits without them.
const NO_HOMEWORK: HomeworkItem[] = [];
const NO_CHANGES: ChangesByDate = {};

function kindOf(category: string | null, text: string): Kind {
  const haystack = `${category ?? ""} ${text}`;
  return KIND_RE.find(([, re]) => re.test(haystack))?.[0] ?? "other";
}

/**
 * A month grid: Agenda entries (tests, quizzes, trips, meetings, other),
 * homework due dates and free days as coloured dots. Arrows switch the
 * month; tapping a day lists its entries under the grid.
 */
/** The integration's title for a free day that frees only some lessons. */
const PARTIAL_FREE_DAY = /\(lekcje [\d–-]+\)$/;

/** A day on the Absences calendar (integration 0.12.28+): "bad" while an
 * absence is unexcused, "warn" when every absence is excused, "late" for
 * late arrivals only. Read from the integration's titles
 * ("Nieobecność nieusprawiedliwiona (2 lekcje)", "Nieobecność: 1 uspr.,
 * 1 nieuspr.", "Spóźnienie (lekcja 3)"). */
type AbsenceKind = "bad" | "warn" | "late";
interface AbsenceDay {
  kind: AbsenceKind;
  title: string;
  lines: string[];
}

function absenceKind(summary: string): AbsenceKind {
  if (/nieuspr/i.test(summary)) return "bad";
  if (/nieobecno/i.test(summary)) return "warn";
  return "late";
}

@customElement("librus-month-calendar-card")
export class LibrusMonthCalendarCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  /** The month picked with the arrows; unset = follow today's month (also
   * across midnight into a new month on a dashboard left open). */
  @state() private _month?: Date;
  @state() private _selected?: string;
  @state() private _agenda: LibrusCalendarEvent[] = [];
  @state() private _free: LibrusCalendarEvent[] = [];
  @state() private _absences: LibrusCalendarEvent[] = [];
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
    const absences = this._config.hide_absences ? undefined : resolved.map.absences;
    const shown = this._shownMonth;
    const start = new Date(shown);
    const end = new Date(shown.getFullYear(), shown.getMonth() + 1, 1);
    const range = `${agenda}:${freeDays}:${absences}:${isoDate(start)}`;
    const cacheKey = `${range}:${this._dataStamp()}`;
    if (!force && this._fetchedFor === cacheKey && !this._retryDue()) return;
    this._fetchedFor = cacheKey;
    const generation = this._beginFetch();
    // undefined = the fetch failed (an entity that isn't there loads as []).
    const load = async (id?: string): Promise<LibrusCalendarEvent[] | undefined> =>
      id ? fetchCalendarEvents(this.hass!, id, start, end).catch(() => undefined) : [];
    const [agendaEvents, freeEvents, absenceEvents] = await Promise.all([
      load(agenda),
      load(freeDays),
      load(absences),
    ]);
    if (!this._isCurrentFetch(generation)) return;
    // A failed calendar keeps what the card already shows for this month.
    const keep = this._keepAfterError(range);
    this._agenda = agendaEvents ?? (keep ? this._agenda : []);
    this._free = freeEvents ?? (keep ? this._free : []);
    this._absences = absenceEvents ?? (keep ? this._absences : []);
    if (agendaEvents && freeEvents && absenceEvents) this._fetchSucceeded(range);
    else this._fetchFailed(generation);
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
    absences: LibrusCalendarEvent[];
    homework: HomeworkItem[];
    changes: ChangesByDate;
    month: string;
    language: string;
    result: MonthIndex;
  };

  /** date -> entries, and date -> free-day name, for the shown month. */
  private _index(homework: HomeworkItem[], changes: ChangesByDate): MonthIndex {
    const hass = this.hass!;
    const month = isoDate(this._shownMonth);
    const c = this._indexCache;
    if (
      c &&
      c.agenda === this._agenda &&
      c.free === this._free &&
      c.absences === this._absences &&
      c.homework === homework &&
      c.changes === changes &&
      c.month === month &&
      c.language === hass.language
    ) {
      return c.result;
    }
    const result = this._buildIndex(homework, changes);
    this._indexCache = {
      agenda: this._agenda,
      free: this._free,
      absences: this._absences,
      homework,
      changes,
      month,
      language: hass.language,
      result,
    };
    return result;
  }

  private _buildIndex(homework: HomeworkItem[], changes: ChangesByDate): MonthIndex {
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
      for (const day of ev.allDay ? allDayDates(ev) : [ev.start.slice(0, 10)]) add(day, entry);
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
    // Lessons the school cancelled or covered with a substitute: one entry
    // per kind and day, listing the lessons.
    for (const [day, items] of Object.entries(changes)) {
      for (const kind of ["cancelled", "substitution"] as const) {
        const lessons = items.filter((c) => (kind === "cancelled" ? c.kind === "cancelled" : c.kind !== "cancelled"));
        if (!lessons.length) continue;
        add(day, {
          kind,
          title: t(hass, kind === "cancelled" ? "card.month.cancelled_n" : "card.month.substitution_n", {
            n: lessons.length,
          }),
          detail: lessons
            .map((c) =>
              [c.lesson_no ? t(hass, "card.changes.lesson_no", { n: c.lesson_no }) : "", c.subject ?? ""]
                .filter(Boolean)
                .join(" ")
            )
            .join(", "),
        });
      }
    }
    const free = new Map<string, string>();
    // A free day that frees only some lessons (integration 0.12.19+:
    // "Rekolekcje (lekcje 3–4)") is listed but the day isn't shaded as off.
    const partial = new Set<string>();
    for (const ev of this._free) {
      for (const day of allDayDates(ev)) {
        free.set(day, ev.summary);
        if (PARTIAL_FREE_DAY.test(ev.summary)) partial.add(day);
        else partial.delete(day);
      }
    }
    const absences = new Map<string, AbsenceDay>();
    for (const ev of this._absences) {
      absences.set(ev.start.slice(0, 10), {
        kind: absenceKind(ev.summary),
        title: ev.summary,
        lines: (ev.description ?? "").split("\n").map((l) => l.trim()).filter(Boolean),
      });
    }
    return { entries, free, partial, absences };
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
    // Cancelled lessons and substitutions (integration 0.12.10+), unless hidden.
    const changesEntity =
      !this._config.hide_changes && map.cancelled_lessons ? hass.states[map.cancelled_lessons] : undefined;
    const changes = (changesEntity?.attributes.by_date as ChangesByDate | undefined) ?? NO_CHANGES;
    const { entries, free, partial, absences } = this._index(homework, changes);

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
      const absence = absences.get(iso);
      cells.push(html`<button
        class="day ${(free.has(iso) && !partial.has(iso)) || weekend ? "free" : ""} ${iso === todayIso ? "today" : ""} ${iso === selected
          ? "sel"
          : ""}"
        @click=${() => (this._selected = iso)}
        aria-pressed=${iso === selected ? "true" : "false"}
        aria-current=${iso === todayIso ? "date" : nothing}
        aria-label=${formatDate(date, hass.language, { day: "numeric", month: "long" })}
      >
        <span class="n">${d}</span>
        <span class="dots">${dayEntries.slice(0, 4).map((e) => html`<i class="dot k-${e.kind}"></i>`)}</span>
        ${absence ? html`<i class="abs a-${absence.kind}"></i>` : nothing}
      </button>`);
    }

    const kindsShown = KINDS.filter((k) => counts.get(k));
    const absenceKinds = (["bad", "warn", "late"] as AbsenceKind[]).filter((k) =>
      [...absences].some(([day, a]) => day.startsWith(monthPrefix) && a.kind === k)
    );
    const selectedAbsence = selected ? absences.get(selected) : undefined;
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
              ${absenceKinds.map(
                (k) => html`<span><i class="abs-key a-${k}"></i>${t(hass, `card.month.absence_${k}` as TranslationKey)}</span>`
              )}
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
              ${selectedAbsence
                ? html`<div class="ev">
                    <i class="dot a-${selectedAbsence.kind}"></i>
                    <div>
                      ${selectedAbsence.title}
                      ${selectedAbsence.lines.map((l) => html`<small>${l}</small>`)}
                    </div>
                  </div>`
                : nothing}
              ${!selectedFree && !selectedAbsence && selectedEntries.length === 0
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
        position: relative;
      }
      /* Absences (integration 0.12.28+): a bar along the bottom of the day,
         in the flow under the dots so the two never overlap. */
      .abs {
        align-self: stretch;
        margin: auto 1px 0;
        height: 3px;
        flex: none;
        border-radius: 2px;
      }
      .abs-key {
        width: 12px;
        height: 3px;
        border-radius: 2px;
        display: inline-block;
        flex: none;
      }
      .a-bad {
        background: var(--lc-bad);
      }
      .a-warn {
        background: var(--lc-warn);
      }
      .a-late {
        background: var(--lc-chart-10);
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
      /* The school's lesson changes are rings, so they don't read as a test
         (red) or a quiz (amber) dot. */
      .k-cancelled,
      .k-substitution {
        background: transparent;
        box-sizing: border-box;
        border: 2px solid var(--lc-bad);
      }
      .k-substitution {
        border-color: var(--lc-amber);
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
