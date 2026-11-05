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
  isoDate,
  lessonInfo,
  mondayOfSchoolWeek,
  type LibrusCalendarEvent,
} from "./utils/calendar";
import { findLibrusDeviceIds, mapByTranslationKey } from "./utils/entities";
import { formatDate } from "./utils/format";
import { t } from "./utils/localize";
import { librusCardEditor } from "./utils/card-editor";
import { studentName } from "./librus-first-lesson-card";
import { PerChildFetch } from "./utils/per-child-fetch";

const COLORS = ["var(--lc-chart-1)", "var(--lc-chart-2)", "var(--lc-chart-3)", "var(--lc-chart-7)", "var(--lc-chart-8)", "var(--lc-chart-10)"];

interface ChildWeek {
  /** Monday ("YYYY-MM-DD") of the week the lessons are for. */
  week: string;
  timetable?: LibrusCalendarEvent[];
  free: LibrusCalendarEvent[];
}

/** A piece of a child's day on the time axis, in minutes since midnight. */
interface Segment {
  from: number;
  to: number;
  /** An activity outside the timetable (Librus's own, or from a calendar the
   * integration's "Other calendars with activities" option adds). */
  extra: boolean;
  label: string;
}

interface ChildDay {
  name: string;
  color: string;
  /** Start of the first lesson or activity and end of the last one, in minutes since midnight. */
  from?: number;
  to?: number;
  /** The lessons as one piece, then each activity outside the timetable. */
  segments: Segment[];
  /** No lesson that day: the day off's name, if the school has one. */
  off?: string;
  unknown: boolean;
}

const minutesOf = (iso: string): number => {
  const d = new Date(iso);
  return d.getHours() * 60 + d.getMinutes();
};
const clock = (min: number): string => `${Math.floor(min / 60)}:${String(min % 60).padStart(2, "0")}`;

/** The part of a timed event on `date` ("YYYY-MM-DD"), in minutes since
 * midnight; undefined when it doesn't touch that day. */
function partOn(ev: LibrusCalendarEvent, date: string): { from: number; to: number } | undefined {
  if (ev.allDay) return undefined;
  const midnight = new Date(`${date}T00:00:00`);
  const dayStart = midnight.getTime();
  midnight.setDate(midnight.getDate() + 1); // local midnight, also on a DST day
  const dayEnd = midnight.getTime();
  const s = Math.max(new Date(ev.start).getTime(), dayStart);
  const e = Math.min(new Date(ev.end).getTime(), dayEnd);
  if (!(e > s)) return undefined;
  const wall = (ms: number): number => {
    const d = new Date(ms);
    return d.getHours() * 60 + d.getMinutes();
  };
  return { from: wall(s), to: e >= dayEnd ? 24 * 60 : wall(e) };
}

/**
 * When is each child at school this week? One bar per child on a time axis
 * for the day picked in the tabs (today by default), from the first lesson
 * that takes place to the last one, with a "now" line on today. Reads every
 * student's timetable and days off. Activities outside the timetable -
 * Librus's own, and those from other calendars picked under the
 * integration's Configure (issue #13, 0.12.42+) - stretch the bar and
 * are drawn striped.
 */
@customElement("librus-siblings-card")
export class LibrusSiblingsCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  protected _watchAllDevices = true;
  @state() private _weeks = new Map<string, ChildWeek>();
  /** The column picked in the tabs (0 = Monday); unset = today / Monday. */
  @state() private _day?: number;
  private _fetches = new PerChildFetch();

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-siblings-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
  }

  public getCardSize(): number {
    return 3 + Math.max(1, this._weeks.size);
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._every(30 * 60_000, () => void this._fetch(this._forceRefresh()));
    // Moves the "now" line along.
    this._every(60_000, () => this.requestUpdate());
  }

  private _deviceIds(): string[] {
    const hass = this.hass!;
    const config = this._config;
    return this._memo("ids", [hass.entities, hass.devices, config], () => {
      const all = findLibrusDeviceIds(hass);
      const wanted = config?.devices;
      if (wanted?.length) return wanted.filter((id) => all.includes(id));
      return [...all].sort((a, b) =>
        studentName(hass, a, config?.names?.[a]).localeCompare(studentName(hass, b, config?.names?.[b]))
      );
    });
  }

  private async _fetch(force = false): Promise<void> {
    if (!this.hass || !this._config) return;
    const hass = this.hass;
    const monday = mondayOfSchoolWeek(new Date());
    const end = new Date(monday);
    end.setDate(end.getDate() + 5);
    const week = isoDate(monday);
    // Each student on its own Last update stamp: a Librus refresh of one
    // child refetches only that child's week.
    const keyOf = (id: string): string => `${week}:${this._deviceDataStamp(id)}`;
    const due = this._fetches.due(this._deviceIds(), keyOf, force);
    await Promise.all(
      due.map(async (id) => {
        const generation = this._fetches.begin(id, keyOf(id));
        const map = mapByTranslationKey(hass, id);
        let failed = false;
        const load = async (entityId?: string, extra = false): Promise<LibrusCalendarEvent[] | undefined> => {
          if (!entityId) return [];
          try {
            return await fetchCalendarEvents(hass, entityId, monday, end, { extra });
          } catch {
            failed = true;
            return undefined;
          }
        };
        // Activities outside the timetable (Librus's own, 0.12.34+, and
        // other calendars' from the integration's Configure, 0.12.42+)
        // count as time at school too.
        const [timetable, free] = await Promise.all([load(map.timetable, true), load(map.free_days)]);
        if (!this._fetches.isCurrent(id, generation)) return;
        // A failed refresh keeps that student's week from before.
        const previous = this._weeks.get(id);
        const kept = previous?.week === week ? previous : undefined;
        const weeks = new Map(this._weeks);
        weeks.set(id, {
          week,
          timetable: map.timetable ? (timetable ?? kept?.timetable) : undefined,
          free: free ?? kept?.free ?? [],
        });
        this._weeks = weeks;
        if (failed) this._fetches.failed(id, generation);
      })
    );
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();
    const hass = this.hass;
    const config = this._config;

    const ids = this._deviceIds();
    if (ids.length === 0) return this._message("mdi:alert-circle-outline", t(hass, "error.no_device"));
    void this._fetch();
    if (this._weeks.size === 0) return this._message("mdi:account-multiple-outline", t(hass, "empty.loading"));

    const now = new Date();
    const monday = mondayOfSchoolWeek(now);
    const dates = Array.from({ length: 5 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(d.getDate() + i);
      return d;
    });
    const todayIndex = dates.findIndex((d) => isoDate(d) === isoDate(now));
    const day = this._day ?? Math.max(0, todayIndex);
    const date = isoDate(dates[day]);

    const shownWeek = isoDate(monday);
    const children: ChildDay[] = ids.map((id, i) => {
      const loaded = this._weeks.get(id);
      // Another week's lessons (before the new week has loaded) count as unknown.
      const week = loaded?.week === shownWeek ? loaded : undefined;
      const base = { name: studentName(hass, id, config.names?.[id]), color: COLORS[i % COLORS.length] };
      if (!week?.timetable) return { ...base, segments: [], unknown: true };
      const held = week.timetable
        .filter((e) => !e.allDay && isoDate(new Date(e.start)) === date && !lessonInfo(e).cancelled)
        .sort((a, b) => a.start.localeCompare(b.start));
      const lessons = held.filter((e) => !e.extra);
      const segments: Segment[] = [];
      if (lessons.length) {
        segments.push({
          from: minutesOf(lessons[0].start),
          to: Math.max(...lessons.map((e) => minutesOf(e.end))),
          extra: false,
          label: t(hass, "card.siblings.lessons"),
        });
      }
      // An activity counts only where it makes the day longer: the child is
      // at school during the lessons anyway, so a part inside them (e.g.
      // "omówienie lektury" entered as an activity during a lesson - cards
      // issue #13) isn't drawn.
      const lessonSpan = segments[0];
      for (const e of held.filter((e) => e.extra)) {
        const part = partOn(e, date);
        if (!part) continue;
        const label = lessonInfo(e).name || t(hass, "card.siblings.extra");
        const pieces = lessonSpan
          ? [
              { from: part.from, to: Math.min(part.to, lessonSpan.from) },
              { from: Math.max(part.from, lessonSpan.to), to: part.to },
            ]
          : [part];
        for (const piece of pieces) {
          if (piece.to > piece.from) segments.push({ ...piece, extra: true, label });
        }
      }
      if (!segments.length) {
        const free = week.free.find((e) => allDayDates(e).includes(date) && !freeDayLessons(e.summary));
        return { ...base, segments, unknown: false, off: free ? freeDayName(free.summary) : undefined };
      }
      segments.sort((a, b) => a.from - b.from);
      return {
        ...base,
        segments,
        unknown: false,
        from: Math.min(...segments.map((s) => s.from)),
        to: Math.max(...segments.map((s) => s.to)),
      };
    });
    const anyExtra = children.some((c) => c.segments.some((s) => s.extra));

    const timed = children.filter((c) => c.from !== undefined);
    const start = timed.length ? Math.floor(Math.min(...timed.map((c) => c.from!)) / 60) * 60 : 8 * 60;
    const end = timed.length ? Math.max(start + 60, Math.ceil(Math.max(...timed.map((c) => c.to!)) / 60) * 60) : 15 * 60;
    const pct = (min: number): number => ((min - start) / (end - start)) * 100;
    const hours: number[] = [];
    for (let m = start; m <= end; m += 60) hours.push(m);
    const nowMin = now.getHours() * 60 + now.getMinutes();
    const showNow = day === todayIndex && nowMin >= start && nowMin <= end;

    const dayLabel = formatDate(dates[day], hass.language, { weekday: "long", day: "numeric", month: "long" });
    const subtitle = day === todayIndex ? `${t(hass, "card.first_lesson.today")}, ${dayLabel}` : dayLabel;

    return html`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:account-multiple-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${config.title ?? t(hass, "card.siblings.title")}</div>
            <div class="subtitle">${subtitle}</div>
          </div>
        </div>
        <div class="tabs" role="tablist">
          ${dates.map(
            (d, i) => html`<button
              role="tab"
              aria-selected=${i === day ? "true" : "false"}
              class="tab ${i === day ? "on" : ""} ${i === todayIndex ? "today" : ""}"
              @click=${() => (this._day = i)}
            >
              ${formatDate(d, hass.language, { weekday: "short" }).replace(".", "")}
            </button>`
          )}
        </div>
        <div class="chart">
          <div class="axis">
            ${hours.map((m) => html`<span class="hour" style="left:${pct(m)}%">${Math.floor(m / 60)}</span>`)}
          </div>
          <div class="rows">
            <div class="overlay">
              ${hours.map((m) => html`<span class="grid-line" style="left:${pct(m)}%"></span>`)}
            </div>
            ${showNow
              ? html`<div class="overlay front"><span class="now" style="left:${pct(nowMin)}%"></span></div>`
              : nothing}
            ${children.map(
              (c) => html`<div class="row">
                <span class="who"><i style="background:${c.color}"></i>${c.name}</span>
                <div class="track">
                  ${c.from !== undefined
                    ? this._bar(c, pct(c.from), pct(c.to!))
                    : html`<span class="off">${c.unknown
                        ? t(hass, "card.first_lesson.no_data")
                        : c.off
                          ? t(hass, "card.siblings.off_named", { name: c.off })
                          : t(hass, "card.first_lesson.free")}</span>`}
                </div>
              </div>`
            )}
          </div>
        </div>
        ${anyExtra
          ? html`<div class="legend key">
              <span class="legend-item"><i class="swatch"></i>${t(hass, "card.siblings.lessons")}</span>
              <span class="legend-item"><i class="swatch extra"></i>${t(hass, "card.siblings.extra")}</span>
            </div>`
          : nothing}
      </ha-card>
    `;
  }

  /** A child's bar; a short day's times go next to it instead of inside. */
  private _bar(c: ChildDay, left: number, right: number): TemplateResult {
    const label = `${clock(c.from!)}–${clock(c.to!)}`;
    const narrow = right - left < 22;
    const length = c.to! - c.from!;
    // Each piece placed inside the bar, as a share of the whole day shown.
    const at = (min: number): number => (length > 0 ? ((min - c.from!) / length) * 100 : 0);
    const details = c.segments.map((s) => `${s.label}: ${clock(s.from)}–${clock(s.to)}`);
    const title = c.segments.some((s) => s.extra) ? [`${c.name}: ${label}`, ...details].join("\n") : `${c.name}: ${label}`;
    return html`<span
        class="span"
        style="left:${left}%;width:${right - left}%;--c:${c.color}"
        title=${title}
      >
        ${c.segments.map(
          (s) => html`<i
            class="seg ${s.extra ? "extra" : ""}"
            style="left:${at(s.from)}%;width:${at(s.to) - at(s.from)}%"
          ></i>`
        )}
        ${narrow ? nothing : html`<span class="time">${clock(c.from!)}</span><span class="time">${clock(c.to!)}</span>`}
      </span>
      ${narrow
        ? html`<span class="beside ${right > 70 ? "before" : ""}" style=${right > 70 ? `right:${100 - left}%` : `left:${right}%`}
            >${label}</span
          >`
        : nothing}`;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .tabs {
        display: flex;
        gap: 6px;
        margin-bottom: 12px;
      }
      .tab {
        flex: 1;
        min-height: 32px;
        border-radius: 16px;
        border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
        background: none;
        color: var(--primary-text-color);
        font: inherit;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: capitalize;
        cursor: pointer;
      }
      .tab.today {
        color: var(--lc-brand);
      }
      .tab.on {
        background: var(--lc-brand-bg);
        border-color: var(--lc-brand);
        color: var(--lc-brand-strong);
      }
      .chart {
        --who: 72px;
      }
      .axis {
        position: relative;
        height: 16px;
        margin-left: var(--who);
      }
      .hour {
        position: absolute;
        transform: translateX(-50%);
        font-size: 0.62rem;
        color: var(--secondary-text-color);
        font-variant-numeric: tabular-nums;
      }
      .rows {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 4px 0;
      }
      /* Over the tracks only (right of the names), so the hour lines and the
         "now" line use the same percentages as the bars. */
      .overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        left: var(--who);
        right: 0;
        pointer-events: none;
      }
      .overlay.front {
        z-index: 2;
      }
      .grid-line,
      .now {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 1px;
        background: var(--divider-color, rgba(127, 127, 127, 0.25));
        opacity: 0.6;
      }
      .now {
        width: 2px;
        background: var(--lc-bad);
        opacity: 1;
        z-index: 1;
      }
      .row {
        display: grid;
        grid-template-columns: var(--who) minmax(0, 1fr);
        align-items: center;
        min-height: 30px;
      }
      .who {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.85rem;
        font-weight: 600;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .who i {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex: none;
      }
      .track {
        position: relative;
        height: 26px;
      }
      .span {
        position: absolute;
        top: 0;
        bottom: 0;
        box-sizing: border-box;
        border-radius: 8px;
        border: 1px solid var(--c);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 4px;
        padding: 0 6px;
        font-size: 0.7rem;
        font-weight: 600;
        font-variant-numeric: tabular-nums;
        overflow: hidden;
        white-space: nowrap;
      }
      /* The bar's fill: the lessons solid, activities outside the timetable
         striped, a gap between them left empty. */
      .seg,
      .swatch {
        background: color-mix(in srgb, var(--c) 22%, transparent);
      }
      .seg {
        position: absolute;
        top: 0;
        bottom: 0;
      }
      .seg.extra,
      .swatch.extra {
        background: repeating-linear-gradient(
          -45deg,
          color-mix(in srgb, var(--c) 32%, transparent) 0 4px,
          color-mix(in srgb, var(--c) 8%, transparent) 4px 8px
        );
      }
      .span .time {
        position: relative;
      }
      .key {
        margin-top: 10px;
        --c: var(--secondary-text-color);
      }
      .swatch {
        display: inline-block;
        width: 18px;
        height: 10px;
        border-radius: 3px;
        border: 1px solid var(--c);
      }
      .beside {
        position: absolute;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        padding: 0 6px;
        font-size: 0.7rem;
        font-weight: 600;
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
        color: var(--secondary-text-color);
      }
      .off {
        position: absolute;
        inset: 0;
        border-radius: 8px;
        border: 1px dashed var(--lc-amber);
        color: var(--lc-amber);
        font-size: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-siblings-card": LibrusSiblingsCard;
  }
}
