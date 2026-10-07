import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import {
  fetchCalendarEvents,
  isHappeningNow,
  hasEnded,
  mondayOfSchoolWeek,
  type LibrusCalendarEvent,
  lessonInfo,
} from "./utils/calendar";
import { t, formatCountdown } from "./utils/localize";
import { minutesUntil } from "./utils/format";
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

function hm(d: Date): string {
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
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

@customElement("librus-week-timetable-card")
export class LibrusWeekTimetableCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  @state() private _events: LibrusCalendarEvent[] = [];
  private _fetchedFor?: string;
  private _refreshTimer?: ReturnType<typeof setInterval>;
  private _tickTimer?: ReturnType<typeof setInterval>;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-week-timetable-card" };
  }

  private get _dayCount(): number {
    return this._config?.show_saturday ? 6 : 5;
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
    this._refreshTimer = setInterval(() => void this._fetch(true), 30 * 60_000);
    // Only re-renders (no refetch) - moves the "current lesson" highlight
    // along as one lesson ends and the next begins, without waiting for
    // the next full calendar refresh.
    this._tickTimer = setInterval(() => this.requestUpdate(), 30_000);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this._refreshTimer);
    clearInterval(this._tickTimer);
  }

  private async _fetch(force = false): Promise<void> {
    if (!this.hass || !this._config) return;
    const resolved = this._resolveEntities();
    if ("error" in resolved) return;
    const entityId = resolved.map.timetable;
    if (!entityId) return;

    const monday = mondayOfSchoolWeek(new Date());
    const rangeEnd = new Date(monday);
    rangeEnd.setDate(rangeEnd.getDate() + this._dayCount);
    const cacheKey = `${entityId}:${monday.toDateString()}:${this._dayCount}`;
    if (!force && this._fetchedFor === cacheKey) return;
    this._fetchedFor = cacheKey;

    const generation = this._beginFetch();
    try {
      const events = await fetchCalendarEvents(this.hass, entityId, monday, rangeEnd);
      if (this._isCurrentFetch(generation)) this._events = events;
    } catch {
      if (this._isCurrentFetch(generation)) this._events = [];
    }
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const hass = this.hass;

    void this._fetch();

    if (this._events.length === 0) {
      return this._message("mdi:calendar-week-outline", t(hass, "card.week_timetable.empty"));
    }

    const dayCount = this._dayCount;
    const byDay: LibrusCalendarEvent[][] = Array.from({ length: dayCount }, () => []);
    for (const ev of this._events) {
      const weekday = isoWeekday(ev.start);
      if (weekday >= 1 && weekday <= dayCount) byDay[weekday - 1].push(ev);
    }
    byDay.forEach((day) => day.sort((a, b) => a.start.localeCompare(b.start)));

    // Rows are real lesson numbers when the School sensor's bell_schedule
    // can place every lesson - so a day starting with lesson 2 leaves row 1
    // empty instead of sliding up (issue #7). Otherwise fall back to "nth
    // lesson of the day", the only layout possible without bell times.
    const school = resolved.map.school ? hass.states[resolved.map.school] : undefined;
    const periods = (school?.attributes.bell_schedule as BellPeriod[] | undefined) ?? [];
    const numbered = byDay.map((day) => day.map((ev) => lessonNoFor(ev, periods)));
    const allPlaced = periods.length > 0 && numbered.every((day) => day.every((n) => n !== undefined));
    let rowLabels: number[];
    let grid: LibrusCalendarEvent[][][]; // [row][day] -> events in that slot
    if (allPlaced) {
      const nums = numbered.flat() as number[];
      const first = Math.min(...nums);
      const last = Math.max(...nums);
      rowLabels = Array.from({ length: last - first + 1 }, (_, i) => first + i);
      grid = rowLabels.map((no) =>
        byDay.map((day, d) => day.filter((_, i) => numbered[d][i] === no))
      );
    } else {
      const maxRows = Math.max(...byDay.map((d) => d.length), 1);
      rowLabels = Array.from({ length: maxRows }, (_, i) => i + 1);
      grid = rowLabels.map((_, row) => byDay.map((day) => (day[row] ? [day[row]] : [])));
    }
    const dayNames = Array.from({ length: dayCount }, (_, i) =>
      new Date(2026, 0, i + 5).toLocaleDateString(hass.language, { weekday: "short" })
    );
    const now = new Date();
    const todayColumn = isoWeekday(now.toISOString()) - 1; // out of range on days not shown

    // "Break now": today has a lesson already ended and one still to come,
    // but none happening right now.
    const todayEvents = (todayColumn >= 0 && todayColumn < dayCount ? byDay[todayColumn] : []).filter(
      (e) => !lessonInfo(e).cancelled
    );
    const lessonNow = todayEvents.find((e) => isHappeningNow(e, now));
    const nextToday = todayEvents.find((e) => new Date(e.start) > now);
    const breakNow = !lessonNow && !!nextToday && todayEvents.some((e) => hasEnded(e, now));

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-week-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${t(hass, "card.week_timetable.title")}</div>
            <div class="subtitle">
              ${breakNow
                ? t(hass, "card.week_timetable.break_now", {
                    minutes: minutesUntil(new Date(nextToday!.start), now),
                  })
                : t(
                    hass,
                    isWeekend(new Date())
                      ? "card.week_timetable.subtitle_upcoming"
                      : "card.week_timetable.subtitle"
                  )}
            </div>
          </div>
        </div>
        <div
          class="week-grid"
          style="grid-template-columns: 24px repeat(${dayCount}, 1fr); grid-template-rows: auto repeat(${rowLabels.length}, 1fr);"
        >
          <span class="h"></span>
          ${dayNames.map((n) => html`<span class="h">${n}</span>`)}
          ${rowLabels.map((label, row) => html`
            <span class="n">${label}</span>
            ${grid[row].map((slot, dayIndex) => {
              if (!slot.length) return html`<div class="cell empty"></div>`;
              const infos = slot.map((e) => lessonInfo(e));
              // A held lesson is shown over a cancelled one in the same slot.
              const shownIndex = Math.max(0, infos.findIndex((i) => !i.cancelled));
              const info = infos[shownIndex];
              const cancelled = infos.every((i) => i.cancelled);
              const substitution = infos.some((i) => i.substitution || i.roomChange || i.moved);
              const isToday = dayIndex === todayColumn;
              const current = isToday && slot.some((e, i) => !infos[i].cancelled && isHappeningNow(e, now));
              const next = breakNow && isToday && slot.includes(nextToday!);
              const tip = infos
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
              // Parallel groups (e.g. split language classes) share one slot.
              return html`<div
                class="cell on ${current ? "current" : ""} ${next ? "next" : ""} ${cancelled ? "off" : ""} ${substitution && !cancelled ? "sub" : ""}"
                title=${tip}
              >${abbreviate(info.name)}${slot.length > 1 ? "+" : ""}</div>`;
            })}
          `)}
        </div>
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .week-grid {
        display: grid;
        grid-template-columns: 24px repeat(5, 1fr); /* overridden inline per show_saturday */
        gap: 4px;
        font-size: 0.62rem;
      }
      .h {
        color: var(--secondary-text-color);
        text-align: center;
        font-weight: 700;
        padding-bottom: 2px;
        text-transform: capitalize;
      }
      .n {
        color: var(--secondary-text-color);
        text-align: center;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
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
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-week-timetable-card": LibrusWeekTimetableCard;
  }
}
