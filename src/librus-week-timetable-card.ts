import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import {
  allDayDates,
  fetchCalendarEvents,
  freeDayLessons,
  freeDayName,
  hm,
  isHappeningNow,
  hasEnded,
  isoDate,
  mondayOfSchoolWeek,
  type LibrusCalendarEvent,
  lessonInfo,
} from "./utils/calendar";
import { t } from "./utils/localize";
import { formatDate, minutesUntil, parseCategory } from "./utils/format";
import { librusCardEditor } from "./utils/card-editor";
import { abbreviate } from "./utils/subjects";

function isoWeekday(iso: string): number {
  const d = new Date(iso);
  const day = d.getDay(); // 0 = Sunday
  return day === 0 ? 7 : day;
}

/** True if `d` falls on a Saturday or Sunday - decides which Monday
 * `mondayOfSchoolWeek` rolls forward to, and which subtitle the card shows. */
function isWeekend(d: Date): boolean {
  const weekday = isoWeekday(d.toISOString());
  return weekday >= 6;
}

interface BellPeriod {
  lesson_no: number;
  start: string;
  end: string;
}


/** One entry of the Changes to the usual timetable sensor's `changes`. */
interface PlanChange {
  date: string;
  lesson_no: number | null;
  kind: "cancelled" | "missing" | "extra" | "subject" | "room" | "no_lessons";
  subject: string | null;
  planned_subject: string | null;
  classroom: string | null;
  planned_classroom: string | null;
}

/** A day off in one column: its name, and the lessons it frees when only
 * some are ("Rekolekcje (lekcje 3–4)"); `lessons` unset = the whole day. */
interface FreeDay {
  name: string;
  lessons?: [number, number];
}

/** Lesson number for an event, from the School sensor's `bell_schedule`:
 * an exact start-time match first, else the period the start falls inside
 * (a lesson that starts a few minutes late). `undefined` if neither. */
function lessonNoFor(ev: LibrusCalendarEvent, periods: BellPeriod[]): number | undefined {
  const start = hm(new Date(ev.start));
  const exact = periods.find((p) => p.start === start);
  if (exact) return exact.lesson_no;
  return periods.find((p) => p.start <= start && start < p.end)?.lesson_no;
}

/** Minutes since local midnight. */
function minutesOf(iso: string): number {
  const d = new Date(iso);
  return d.getHours() * 60 + d.getMinutes();
}

/** How far the arrows go - the integration fetches weeks on demand up to
 * 12 weeks either side of this one. */
const MAX_WEEKS = 12;
/** Timeline height per minute of the school day, in px. */
const PX_PER_MINUTE = 0.8;

@customElement("librus-week-timetable-card")
export class LibrusWeekTimetableCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  @state() private _events: LibrusCalendarEvent[] = [];
  @state() private _free: LibrusCalendarEvent[] = [];
  @state() private _agenda: LibrusCalendarEvent[] = [];
  /** Weeks before (-) or after (+) the school week the card opens on. */
  @state() private _offset = 0;
  /** The week the events above belong to (a fetch for another week may still be running). */
  @state() private _loadedWeek?: string;
  private _fetchedFor?: string;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-week-timetable-card" };
  }

  private get _dayCount(): number {
    return this._config?.show_saturday ? 6 : 5;
  }

  private get _showHours(): boolean {
    return this._config?.show_hours ?? false;
  }

  private get _timeline(): boolean {
    return this._config?.layout === "timeline";
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return this._timeline ? 7 : 4;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._every(30 * 60_000, () => void this._fetch(this._forceRefresh()));
    // Only re-renders (no refetch) - moves the "current lesson" highlight
    // along as one lesson ends and the next begins, without waiting for
    // the next full calendar refresh.
    this._every(30_000, () => this.requestUpdate());
  }

  /** Monday of the week shown. */
  private _monday(): Date {
    const monday = mondayOfSchoolWeek(new Date());
    monday.setDate(monday.getDate() + 7 * this._offset);
    return monday;
  }

  private _shift(weeks: number): void {
    this._offset = weeks === 0 ? 0 : Math.max(-MAX_WEEKS, Math.min(MAX_WEEKS, this._offset + weeks));
    void this._fetch();
  }

  private async _fetch(force = false): Promise<void> {
    if (!this.hass || !this._config) return;
    const resolved = this._resolveEntities();
    if ("error" in resolved) return;
    const { timetable, free_days: freeDays, agenda } = resolved.map;
    if (!timetable) return;
    const withAgenda = this._timeline ? agenda : undefined;

    const monday = this._monday();
    const rangeEnd = new Date(monday);
    rangeEnd.setDate(rangeEnd.getDate() + this._dayCount);
    const week = isoDate(monday);
    const range = `${timetable}:${freeDays}:${withAgenda}:${week}:${this._dayCount}`;
    const cacheKey = `${range}:${this._dataStamp()}`;
    if (!force && this._fetchedFor === cacheKey && !this._retryDue()) return;
    this._fetchedFor = cacheKey;

    const generation = this._beginFetch();
    // undefined = that calendar failed; a missing entity loads as [].
    const load = async (id?: string): Promise<LibrusCalendarEvent[] | undefined> =>
      id ? fetchCalendarEvents(this.hass!, id, monday, rangeEnd).catch(() => undefined) : [];
    const [events, free, agendaEvents] = await Promise.all([load(timetable), load(freeDays), load(withAgenda)]);
    if (!this._isCurrentFetch(generation)) return;
    const keep = this._keepAfterError(range);
    this._events = events ?? (keep ? this._events : []);
    this._free = free ?? (keep ? this._free : []);
    this._agenda = agendaEvents ?? (keep ? this._agenda : []);
    this._loadedWeek = week;
    if (events && free && agendaEvents) this._fetchSucceeded(range);
    else this._fetchFailed(generation);
  }

  /** "YYYY-MM-DD" of each column. */
  private _columnDates(): string[] {
    const monday = this._monday();
    return Array.from({ length: this._dayCount }, (_, i) =>
      isoDate(new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i))
    );
  }

  /** Column date -> the day off on it. */
  private _freeByDate(): Map<string, FreeDay> {
    const result = new Map<string, FreeDay>();
    for (const ev of this._free) {
      const lessons = freeDayLessons(ev.summary);
      for (const day of allDayDates(ev)) {
        // A whole day off wins over a partial one on the same date.
        if (lessons && result.has(day)) continue;
        result.set(day, { name: freeDayName(ev.summary), lessons });
      }
    }
    return result;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const hass = this.hass;

    void this._fetch();

    const dates = this._columnDates();
    const loaded = this._loadedWeek === dates[0];
    const events = loaded ? this._events : [];
    const freeByDate = loaded ? this._freeByDate() : new Map<string, FreeDay>();
    const anyFree = dates.some((d) => freeByDate.has(d));

    if (!loaded && this._offset === 0 && this._loadedWeek === undefined) {
      return this._message("mdi:calendar-week-outline", t(hass, "empty.loading"));
    }

    const dayCount = this._dayCount;
    const byDay: LibrusCalendarEvent[][] = Array.from({ length: dayCount }, () => []);
    for (const ev of events) {
      const index = dates.indexOf(isoDate(new Date(ev.start)));
      if (index >= 0) byDay[index].push(ev);
    }
    byDay.forEach((day) => day.sort((a, b) => a.start.localeCompare(b.start)));

    const now = new Date();
    const todayColumn = dates.indexOf(isoDate(now)); // -1 when today isn't shown

    // "Break now": today has a lesson already ended and one still to come,
    // but none happening right now.
    const todayEvents = (todayColumn >= 0 ? byDay[todayColumn] : []).filter((e) => !lessonInfo(e).cancelled);
    const lessonNow = todayEvents.find((e) => isHappeningNow(e, now));
    const nextToday = todayEvents.find((e) => new Date(e.start) > now);
    const breakNow = !lessonNow && !!nextToday && todayEvents.some((e) => hasEnded(e, now));

    const dayNames = Array.from({ length: dayCount }, (_, i) =>
      new Date(2026, 0, i + 5).toLocaleDateString(hass.language, { weekday: "short" })
    );
    const dayHeads = dates.map((date, i) => {
      const free = freeByDate.get(date);
      const label = free
        ? free.lessons
          ? `${free.name} · ${t(hass, "card.week_timetable.lessons_short", {
              lessons: free.lessons[0] === free.lessons[1] ? `${free.lessons[0]}` : `${free.lessons[0]}–${free.lessons[1]}`,
            })}`
          : free.name
        : "";
      return html`<div class="h ${i === todayColumn ? "today" : ""}">
        <span class="dn">${dayNames[i]}</span>
        <span class="dd">${date.slice(8, 10)}.${date.slice(5, 7)}</span>
        ${label ? html`<span class="free-chip" title=${label}>${label}</span>` : nothing}
      </div>`;
    });

    let body: TemplateResult;
    if (!loaded) {
      body = html`<div class="empty-week">${t(hass, "empty.loading")}</div>`;
    } else if (events.length === 0 && !anyFree) {
      body = html`<div class="empty-week">${t(hass, "card.week_timetable.empty")}</div>`;
    } else if (this._timeline) {
      body = this._renderTimeline(byDay, dates, dayHeads, freeByDate, todayColumn, now, nextToday, breakNow);
    } else {
      body = this._renderGrid(resolved.map, byDay, dates, dayHeads, freeByDate, todayColumn, now, nextToday, breakNow);
    }

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-week-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title ?? t(hass, "card.week_timetable.title")}</div>
            <div class="subtitle">${this._subtitle(dates, breakNow, nextToday, now)}</div>
          </div>
          <div class="nav">
            ${this._offset !== 0
              ? html`<button class="now-btn" @click=${() => this._shift(0)}>${t(hass, "card.week_timetable.this_week")}</button>`
              : nothing}
            <button
              @click=${() => this._shift(-1)}
              ?disabled=${this._offset <= -MAX_WEEKS}
              aria-label=${t(hass, "card.week_timetable.previous")}
            >‹</button>
            <button
              @click=${() => this._shift(1)}
              ?disabled=${this._offset >= MAX_WEEKS}
              aria-label=${t(hass, "card.week_timetable.next")}
            >›</button>
          </div>
        </div>
        ${body}
      </ha-card>
    `;
  }

  private _subtitle(dates: string[], breakNow: boolean, nextToday: LibrusCalendarEvent | undefined, now: Date): string {
    const hass = this.hass!;
    if (this._offset !== 0) {
      const first = new Date(`${dates[0]}T12:00:00`);
      const last = new Date(`${dates[dates.length - 1]}T12:00:00`);
      const sameMonth = first.getMonth() === last.getMonth();
      const from = formatDate(first, hass.language, sameMonth ? { day: "numeric" } : { day: "numeric", month: "short" });
      return `${from} – ${formatDate(last, hass.language, { day: "numeric", month: "long" })}`;
    }
    if (breakNow && nextToday) {
      return t(hass, "card.week_timetable.break_now", { minutes: minutesUntil(new Date(nextToday.start), now) });
    }
    return t(hass, isWeekend(now) ? "card.week_timetable.subtitle_upcoming" : "card.week_timetable.subtitle");
  }

  /** The lesson-number grid (rows = lessons, columns = days). */
  private _renderGrid(
    map: Record<string, string>,
    byDay: LibrusCalendarEvent[][],
    dates: string[],
    dayHeads: TemplateResult[],
    freeByDate: Map<string, FreeDay>,
    todayColumn: number,
    now: Date,
    nextToday: LibrusCalendarEvent | undefined,
    breakNow: boolean
  ): TemplateResult {
    const hass = this.hass!;
    const dayCount = this._dayCount;
    // Rows are real lesson numbers when the School sensor's bell_schedule
    // can place every lesson - so a day starting with lesson 2 leaves row 1
    // empty instead of sliding up (issue #7). Otherwise fall back to "nth
    // lesson of the day", the only layout possible without bell times.
    const school = map.school ? hass.states[map.school] : undefined;
    const periods = (school?.attributes.bell_schedule as BellPeriod[] | undefined) ?? [];
    const numbered = byDay.map((day) => day.map((ev) => lessonNoFor(ev, periods)));
    const allPlaced = periods.length > 0 && numbered.every((day) => day.every((n) => n !== undefined));
    const showHours = this._showHours && allPlaced;
    let rowLabels: number[];
    let grid: LibrusCalendarEvent[][][]; // [row][day] -> events in that slot
    if (allPlaced) {
      const nums = numbered.flat() as number[];
      // A week with no lessons at all (a holiday week) still shows its
      // days off over the usual lesson numbers.
      const first = nums.length ? Math.min(...nums) : Math.min(...periods.map((p) => p.lesson_no));
      const last = nums.length ? Math.max(...nums) : Math.max(...periods.map((p) => p.lesson_no));
      rowLabels = Array.from({ length: last - first + 1 }, (_, i) => first + i);
      grid = rowLabels.map((no) => byDay.map((day, d) => day.filter((_, i) => numbered[d][i] === no)));
    } else {
      const maxRows = Math.max(...byDay.map((d) => d.length), 1);
      rowLabels = Array.from({ length: maxRows }, (_, i) => i + 1);
      grid = rowLabels.map((_, row) => byDay.map((day) => (day[row] ? [day[row]] : [])));
    }

    // How the week differs from the usual plan (Changes to the usual
    // timetable sensor, integration 0.12.1+): an extra lesson, another
    // subject or room, a planned lesson that isn't there. Needs real lesson
    // numbers as rows. Cancelled lessons are already marked by the calendar.
    const planEntity = map.plan_changes ? hass.states[map.plan_changes] : undefined;
    const planChanges = new Map<string, PlanChange>();
    if (allPlaced) {
      for (const change of (planEntity?.attributes.changes as PlanChange[] | undefined) ?? []) {
        if (change.kind !== "cancelled" && change.lesson_no !== null) {
          planChanges.set(`${change.date}|${change.lesson_no}`, change);
        }
      }
    }
    // show_hours: the bell times under each lesson number (only with real
    // lesson-number rows - the fallback layout has no times to show).
    const hoursByLesson = new Map(
      showHours ? periods.map((period) => [period.lesson_no, `${period.start} - ${period.end}`]) : []
    );
    /** Whether lesson `no` is free on column `dayIndex` (a day off). */
    const isFree = (dayIndex: number, no: number): boolean => {
      const free = freeByDate.get(dates[dayIndex]);
      if (!free) return false;
      if (!free.lessons) return true;
      return allPlaced && no >= free.lessons[0] && no <= free.lessons[1];
    };

    return html`
      <div
        class="week-grid"
        style="grid-template-columns: ${showHours ? "64px" : "24px"} repeat(${dayCount}, minmax(0, 1fr));"
      >
        <span class="h"></span>
        ${dayHeads}
        ${rowLabels.map((label, row) => html`
          <span class="n ${showHours ? "with-hours" : ""}">
            ${label}
            ${showHours && hoursByLesson.has(label)
              ? html`<span class="n-time">${hoursByLesson.get(label)}</span>`
              : nothing}
          </span>
          ${grid[row].map((slot, dayIndex) => {
            const free = isFree(dayIndex, label);
            const change = planChanges.get(`${dates[dayIndex]}|${label}`);
            if (!slot.length) {
              if (free) return html`<div class="cell free"></div>`;
              if (change?.kind === "missing" && change.planned_subject) {
                return html`<div
                  class="cell missing"
                  title=${`${change.planned_subject} (${t(hass, "label.lesson_missing")})`}
                >${abbreviate(change.planned_subject)}</div>`;
              }
              return html`<div class="cell empty"></div>`;
            }
            const infos = slot.map((e) => lessonInfo(e));
            // A held lesson is shown over a cancelled one in the same slot.
            const shownIndex = Math.max(0, infos.findIndex((i) => !i.cancelled));
            const info = infos[shownIndex];
            const [firstName, ...otherNames] = info.name.split(" + ");
            const parallel = slot.length > 1 || otherNames.length > 0;
            if (free) {
              return html`<div class="cell free" title=${`${info.name} (${t(hass, "card.week_timetable.free")})`}>
                <span>${abbreviate(firstName)}${parallel ? "+" : ""}</span>
                <span class="free-note">${t(hass, "card.week_timetable.free")}</span>
              </div>`;
            }
            const cancelled = infos.every((i) => i.cancelled);
            const planNote =
              change?.kind === "extra"
                ? t(hass, "label.lesson_extra")
                : change?.kind === "subject" && change.planned_subject
                  ? t(hass, "label.lesson_instead_of", { subject: change.planned_subject })
                  : change?.kind === "room" && change.planned_classroom && change.classroom
                    ? t(hass, "label.lesson_room_change", { from: change.planned_classroom, to: change.classroom })
                    : null;
            const substitution =
              infos.some((i) => i.substitution || i.roomChange || i.moved) ||
              change?.kind === "subject" ||
              change?.kind === "room";
            const extra = change?.kind === "extra";
            const isToday = dayIndex === todayColumn;
            const current = isToday && slot.some((e, i) => !infos[i].cancelled && isHappeningNow(e, now));
            const next = breakNow && isToday && slot.includes(nextToday!);
            const tip = this._tip(infos) + (planNote ? ` (${planNote})` : "");
            return html`<div
              class="cell on ${current ? "current" : ""} ${next ? "next" : ""} ${cancelled ? "off" : ""} ${substitution && !cancelled ? "sub" : ""} ${extra && !cancelled ? "extra" : ""}"
              title=${tip}
            >${abbreviate(firstName)}${parallel ? "+" : ""}</div>`;
          })}
        `)}
      </div>
    `;
  }

  /** "Matematyka (zastępstwo) / Fizyka" - a slot's tooltip. */
  private _tip(infos: ReturnType<typeof lessonInfo>[]): string {
    const hass = this.hass!;
    return infos
      .map((i) =>
        i.cancelled
          ? `${i.name} (${t(hass, "label.lesson_cancelled")})`
          : i.roomChange && i.rooms
            ? `${i.name} (${t(hass, "label.lesson_room_change", { from: i.rooms[0], to: i.rooms[1] })})`
            : i.moved
              ? `${i.name} (${t(hass, "label.lesson_moved")})`
              : i.substitution
                ? `${i.name} (${t(hass, "label.lesson_substitution")})`
                : i.name
      )
      .join(" / ");
  }

  /** Lessons as blocks on a time axis, with the Agenda's all-day entries
   * (tests, trips) and days off above them and a "now" line on today. */
  private _renderTimeline(
    byDay: LibrusCalendarEvent[][],
    dates: string[],
    dayHeads: TemplateResult[],
    freeByDate: Map<string, FreeDay>,
    todayColumn: number,
    now: Date,
    nextToday: LibrusCalendarEvent | undefined,
    breakNow: boolean
  ): TemplateResult {
    const hass = this.hass!;
    const dayCount = this._dayCount;
    const timed = byDay.flat();
    // Whole hours around the week's lessons (8:00-15:00 for an empty week).
    const startMin = timed.length ? Math.floor(Math.min(...timed.map((e) => minutesOf(e.start))) / 60) * 60 : 8 * 60;
    const endMin = timed.length
      ? Math.max(startMin + 60, Math.ceil(Math.max(...timed.map((e) => minutesOf(e.end))) / 60) * 60)
      : 15 * 60;
    const height = (endMin - startMin) * PX_PER_MINUTE;
    const y = (min: number): number => (min - startMin) * PX_PER_MINUTE;
    const hours: number[] = [];
    for (let m = startMin; m <= endMin; m += 60) hours.push(m);

    const allDay = dates.map((date) =>
      this._agenda
        .filter((ev) => ev.allDay && allDayDates(ev).includes(date))
        .map((ev) => {
          const { category, text } = parseCategory(ev.summary);
          return category ? `${category}: ${text}` : text;
        })
    );
    const nowMin = now.getHours() * 60 + now.getMinutes();
    const nowShown = todayColumn >= 0 && nowMin >= startMin && nowMin <= endMin;

    return html`
      <div class="tl" style="grid-template-columns: 34px repeat(${dayCount}, minmax(0, 1fr));">
        <span class="h"></span>
        ${dayHeads}
        <span></span>
        ${allDay.map(
          (items, i) => html`<div class="tl-allday ${i === todayColumn ? "today" : ""}">
            ${items.map((text) => html`<span class="tl-chip" title=${text}>${text}</span>`)}
          </div>`
        )}
        <div class="tl-axis" style="height:${height}px">
          ${hours.map(
            (m) => html`<span class="tl-hour" style="top:${y(m)}px">${Math.floor(m / 60)}:00</span>`
          )}
        </div>
        ${byDay.map((day, i) => {
          const free = freeByDate.get(dates[i]);
          // Lessons starting together (split groups) share the width.
          const groups = new Map<number, LibrusCalendarEvent[]>();
          for (const ev of day) {
            const key = minutesOf(ev.start);
            groups.set(key, [...(groups.get(key) ?? []), ev]);
          }
          return html`<div class="tl-day ${i === todayColumn ? "today" : ""} ${free && !free.lessons ? "free" : ""}" style="height:${height}px">
            ${hours.map((m) => html`<span class="tl-line" style="top:${y(m)}px"></span>`)}
            ${[...groups.values()].flatMap((group) =>
              group.map((ev, k) => {
                const info = lessonInfo(ev);
                const top = y(minutesOf(ev.start));
                const h = Math.max(14, y(minutesOf(ev.end)) - top - 2);
                const width = 100 / group.length;
                const current = i === todayColumn && !info.cancelled && isHappeningNow(ev, now);
                const next = breakNow && i === todayColumn && ev === nextToday;
                const changed = info.substitution || info.roomChange || info.moved;
                const [firstName] = info.name.split(" + ");
                return html`<div
                  class="tl-lesson ${current ? "current" : ""} ${next ? "next" : ""} ${info.cancelled ? "off" : ""} ${changed && !info.cancelled ? "sub" : ""}"
                  style="top:${top}px;height:${h}px;left:calc(${width * k}% + 2px);width:calc(${width}% - 4px)"
                  title=${`${hm(new Date(ev.start))}–${hm(new Date(ev.end))} ${this._tip([info])}${ev.location ? ` · ${ev.location}` : ""}`}
                >
                  <span class="tl-subj">${abbreviate(firstName)}</span>
                  ${h >= 26
                    ? html`<span class="tl-meta">${info.cancelled
                        ? t(hass, "label.lesson_cancelled")
                        : `${hm(new Date(ev.start))}${ev.location ? ` · ${ev.location}` : ""}`}</span>`
                    : nothing}
                </div>`;
              })
            )}
            ${i === todayColumn && nowShown
              ? html`<span class="tl-now" style="top:${y(nowMin)}px"><i></i></span>`
              : nothing}
          </div>`;
        })}
      </div>
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
        align-items: center;
      }
      .nav button {
        min-width: 30px;
        height: 30px;
        border-radius: 8px;
        border: 0;
        background: var(--lc-chip-bg);
        color: var(--primary-text-color);
        font: inherit;
        font-size: 1.05rem;
        cursor: pointer;
      }
      .nav button:disabled {
        opacity: 0.35;
        cursor: default;
      }
      .nav .now-btn {
        font-size: 0.72rem;
        font-weight: 700;
        padding: 0 10px;
        color: var(--lc-brand);
      }
      .empty-week {
        color: var(--secondary-text-color);
        font-size: 0.85rem;
        padding: 8px 0;
      }
      .week-grid {
        display: grid;
        grid-template-columns: 24px repeat(5, 1fr); /* overridden inline per card options */
        gap: 4px;
        font-size: 0.62rem;
      }
      .h {
        color: var(--secondary-text-color);
        text-align: center;
        font-weight: 700;
        padding-bottom: 2px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1px;
        min-width: 0;
      }
      .h .dn {
        text-transform: capitalize;
      }
      .h .dd {
        font-weight: 500;
        font-size: 0.56rem;
      }
      .h.today .dn,
      .h.today .dd {
        color: var(--lc-brand);
      }
      .free-chip {
        max-width: 100%;
        box-sizing: border-box;
        font-size: 0.52rem;
        font-weight: 700;
        line-height: 1.2;
        padding: 1px 4px;
        border-radius: 5px;
        background: var(--lc-amber-bg);
        color: var(--lc-amber);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .n {
        color: var(--secondary-text-color);
        text-align: center;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .n.with-hours {
        flex-direction: column;
      }
      .n-time {
        font-size: 0.48rem;
        font-weight: 500;
        white-space: nowrap;
        font-variant-numeric: tabular-nums;
      }
      .cell {
        background: var(--divider-color);
        border-radius: 5px;
        padding: 3px 2px;
        text-align: center;
        font-weight: 700;
        color: var(--secondary-text-color);
        min-height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1.1;
      }
      .cell.on {
        background: var(--lc-brand-bg);
        color: var(--lc-brand-strong);
      }
      .cell.current {
        background: var(--lc-brand);
        color: #fff;
        box-shadow: 0 0 0 2px var(--lc-brand-strong);
      }
      /* The lesson coming up right after the break we're currently in. */
      .cell.next {
        background: var(--lc-brand-bg);
        color: var(--lc-brand-strong);
        outline: 2px dashed var(--lc-brand);
        outline-offset: -2px;
      }
      .cell.empty {
        background: transparent;
      }
      /* A day off (whole day, or only some lessons): hatched amber. */
      .cell.free {
        flex-direction: column;
        background: repeating-linear-gradient(
          135deg,
          var(--lc-amber-bg) 0 5px,
          transparent 5px 10px
        );
        color: var(--secondary-text-color);
        opacity: 0.85;
      }
      .free-note {
        font-size: 0.5rem;
        font-weight: 500;
        color: var(--lc-amber);
      }
      /* Cancelled: struck through on a dashed outline; substitution: amber
         dashed outline (same marks as the School day card). */
      .cell.off {
        background: transparent;
        border: 1px dashed var(--divider-color);
        text-decoration: line-through;
        opacity: 0.7;
      }
      .cell.sub {
        outline: 2px dashed var(--lc-amber);
        outline-offset: -2px;
      }
      /* Against the usual plan: an extra lesson (green outline), a planned
         lesson that isn't there (ghost cell, struck through). */
      .cell.extra {
        outline: 2px dashed var(--lc-good);
        outline-offset: -2px;
      }
      .cell.missing {
        background: transparent;
        border: 1px dashed var(--divider-color);
        text-decoration: line-through;
        opacity: 0.55;
      }

      /* Timeline layout. */
      .tl {
        display: grid;
        column-gap: 4px;
        font-size: 0.62rem;
      }
      .tl-allday {
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 2px 0 4px;
        min-width: 0;
      }
      .tl-chip {
        font-size: 0.55rem;
        font-weight: 700;
        line-height: 1.2;
        padding: 2px 4px;
        border-radius: 5px;
        background: var(--lc-brand-bg);
        color: var(--lc-brand-strong);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .tl-axis {
        position: relative;
      }
      .tl-hour {
        position: absolute;
        right: 4px;
        transform: translateY(-50%);
        color: var(--secondary-text-color);
        font-size: 0.55rem;
        font-variant-numeric: tabular-nums;
      }
      .tl-day {
        position: relative;
        border-radius: 6px;
      }
      .tl-day.today {
        background: var(--lc-chip-bg);
      }
      .tl-day.free {
        background: repeating-linear-gradient(135deg, var(--lc-amber-bg) 0 6px, transparent 6px 12px);
      }
      .tl-line {
        position: absolute;
        left: 0;
        right: 0;
        height: 1px;
        background: var(--divider-color);
        opacity: 0.5;
      }
      .tl-lesson {
        position: absolute;
        box-sizing: border-box;
        border-radius: 5px;
        padding: 2px 4px;
        background: var(--lc-brand-bg);
        color: var(--lc-brand-strong);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        line-height: 1.15;
      }
      .tl-subj {
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tl-meta {
        font-size: 0.52rem;
        color: var(--secondary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tl-lesson.current {
        background: var(--lc-brand);
        color: #fff;
      }
      .tl-lesson.current .tl-meta {
        color: rgba(255, 255, 255, 0.8);
      }
      .tl-lesson.next {
        outline: 2px dashed var(--lc-brand);
        outline-offset: -2px;
      }
      .tl-lesson.sub {
        background: var(--lc-amber-bg);
        color: var(--lc-amber);
        outline: 1px solid var(--lc-amber);
        outline-offset: -1px;
      }
      .tl-lesson.off {
        background: transparent;
        border: 1px dashed var(--lc-bad);
        color: var(--secondary-text-color);
      }
      .tl-lesson.off .tl-subj {
        text-decoration: line-through;
      }
      .tl-now {
        position: absolute;
        left: -3px;
        right: 0;
        height: 2px;
        background: var(--lc-bad);
        z-index: 1;
      }
      .tl-now i {
        position: absolute;
        left: -3px;
        top: -4px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--lc-bad);
        animation: lc-now-pulse 1.8s infinite;
      }
      @keyframes lc-now-pulse {
        0% {
          box-shadow: 0 0 0 0 color-mix(in srgb, var(--lc-bad) 70%, transparent);
        }
        70% {
          box-shadow: 0 0 0 7px transparent;
        }
        100% {
          box-shadow: 0 0 0 0 transparent;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .tl-now i {
          animation: none;
        }
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-week-timetable-card": LibrusWeekTimetableCard;
  }
}
