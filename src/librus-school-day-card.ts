import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import {
  fetchCalendarEvents,
  hasEnded,
  isHappeningNow,
  isoDate,
  lessonInfo,
  type LessonInfo,
  type LibrusCalendarEvent,
} from "./utils/calendar";
import { formatTime } from "./utils/format";
import { formatCountdown, t } from "./utils/localize";
import { abbreviate } from "./utils/subjects";

/** How far ahead to look for the next school day (a long weekend or a
 * short break still finds it). */
const LOOKAHEAD_DAYS = 10;

interface Lesson extends LessonInfo {
  ev: LibrusCalendarEvent;
}

function toLesson(ev: LibrusCalendarEvent): Lesson {
  return { ev, ...lessonInfo(ev) };
}

type Status = "before" | "in" | "after" | "free";

const STATUS_ICON: Record<Status, string> = {
  before: "mdi:weather-sunset-up",
  in: "mdi:bag-personal-outline",
  after: "mdi:home-outline",
  free: "mdi:palm-tree",
};
const STATUS_BADGE: Record<Status, string> = { before: "", in: "good", after: "", free: "amber" };
const STATUS_LABEL = {
  before: "card.school_day.status_before",
  in: "card.school_day.status_in",
  after: "card.school_day.status_after",
  free: "card.school_day.status_free",
} as const;

/**
 * One school day as a strip of lessons - today while school is on (or
 * hasn't started), otherwise the next school day. Each lesson is a cell
 * with the subject's short name; the current one is highlighted, past
 * ones dimmed, cancelled ones struck through, substitutions outlined.
 * Under the strip: the lesson now, the break before the next one, or the
 * first lesson of the day shown. Approved mockup variant B (2026-10-07),
 * with lesson names in the cells. Reads only the Timetable calendar, so it
 * works with any backend version.
 */
@customElement("librus-school-day-card")
export class LibrusSchoolDayCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  @state() private _events: LibrusCalendarEvent[] = [];
  @state() private _loaded = false;
  private _fetchedFor?: string;
  private _refreshTimer?: ReturnType<typeof setInterval>;
  private _tickTimer?: ReturnType<typeof setInterval>;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-school-day-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 3;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._refreshTimer = setInterval(() => void this._fetch(true), 15 * 60_000);
    // Re-render (no refetch) so the highlight and countdowns move along.
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

    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + LOOKAHEAD_DAYS);
    const cacheKey = `${entityId}:${isoDate(start)}`;
    if (!force && this._fetchedFor === cacheKey) return;
    this._fetchedFor = cacheKey;

    const generation = this._beginFetch();
    try {
      const events = await fetchCalendarEvents(this.hass, entityId, start, end);
      if (this._isCurrentFetch(generation)) this._events = events.filter((e) => !e.allDay);
    } catch {
      if (this._isCurrentFetch(generation)) this._events = [];
    } finally {
      if (this._isCurrentFetch(generation)) this._loaded = true;
    }
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const hass = this.hass;
    void this._fetch();

    const now = new Date();
    const todayIso = isoDate(now);
    const byDay = new Map<string, Lesson[]>();
    for (const ev of [...this._events].sort((a, b) => a.start.localeCompare(b.start))) {
      const day = isoDate(new Date(ev.start));
      if (!byDay.has(day)) byDay.set(day, []);
      byDay.get(day)!.push(toLesson(ev));
    }
    const held = (lessons: Lesson[]) => lessons.filter((l) => !l.cancelled);
    const today = byDay.get(todayIso) ?? [];
    const todayHeld = held(today);
    const todayEnd = todayHeld.length ? new Date(todayHeld[todayHeld.length - 1].ev.end) : undefined;

    let dayIso: string | undefined;
    if (todayEnd && now < todayEnd) {
      dayIso = todayIso;
    } else {
      dayIso = [...byDay.keys()].sort().find((d) => d > todayIso && held(byDay.get(d)!).length > 0);
    }

    if (!dayIso) {
      if (!this._loaded) return this._message("mdi:calendar-clock", t(hass, "card.school_day.title"));
      return this._message("mdi:palm-tree", t(hass, "card.school_day.empty"));
    }

    const lessons = byDay.get(dayIso)!;
    const dayHeld = held(lessons);
    const first = dayHeld[0];
    const last = dayHeld[dayHeld.length - 1];
    const isToday = dayIso === todayIso;

    const status: Status = isToday
      ? now < new Date(first.ev.start)
        ? "before"
        : "in"
      : todayHeld.length
        ? "after"
        : "free";

    const dayDate = new Date(`${dayIso}T12:00:00`);
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateLabel = dayDate.toLocaleDateString(hass.language, {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    const subtitle = isToday
      ? `${t(hass, "card.school_day.today")} · ${dateLabel}`
      : dayIso === isoDate(tomorrow)
        ? `${t(hass, "card.school_day.tomorrow")} · ${dateLabel}`
        : dateLabel;

    const where = (l: Lesson) => (l.ev.location ? `${l.name} · ${l.ev.location}` : l.name);
    const minutesTo = (iso: string) => (new Date(iso).getTime() - now.getTime()) / 60_000;

    let boxLabel: string;
    let boxLesson: Lesson;
    let boxRight: string;
    const current = isToday ? dayHeld.find((l) => isHappeningNow(l.ev, now)) : undefined;
    if (current) {
      boxLabel = t(hass, "card.school_day.now");
      boxLesson = current;
      boxRight = t(hass, "card.school_day.left", { minutes: Math.max(0, Math.round(minutesTo(current.ev.end))) });
    } else if (status === "in") {
      const next = dayHeld.find((l) => new Date(l.ev.start) > now) ?? last;
      boxLabel = t(hass, "card.school_day.break");
      boxLesson = next;
      boxRight = formatCountdown(hass, minutesTo(next.ev.start));
    } else if (status === "before") {
      boxLabel = t(hass, "card.school_day.first");
      boxLesson = first;
      boxRight = formatCountdown(hass, minutesTo(first.ev.start));
    } else {
      boxLabel = t(hass, "card.school_day.first");
      boxLesson = first;
      boxRight = t(hass, "card.school_day.from", { time: formatTime(first.ev.start) });
    }

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge ${STATUS_BADGE[status]}"><ha-icon icon=${STATUS_ICON[status]}></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title ?? t(hass, "card.school_day.title")}</div>
            <div class="subtitle">${subtitle}</div>
          </div>
          <span class="pill ${status}">${t(hass, STATUS_LABEL[status])}</span>
        </div>
        <div class="daybar">
          ${lessons.map((l) => {
            const cls = l.cancelled
              ? "off"
              : isToday && isHappeningNow(l.ev, now)
                ? "now"
                : isToday && hasEnded(l.ev, now)
                  ? "past"
                  : "";
            const tip = `${formatTime(l.ev.start)}–${formatTime(l.ev.end)} ${where(l)}${
              l.cancelled ? ` (${t(hass, "card.school_day.cancelled")})` : l.substitution ? ` (${t(hass, "card.school_day.substitution")})` : ""
            }`;
            return html`<div class="seg ${cls} ${l.substitution || l.roomChange || l.moved ? "sub" : ""}" title=${tip}>${abbreviate(l.name)}</div>`;
          })}
        </div>
        <div class="ends"><span>${formatTime(first.ev.start)}</span><span>${formatTime(last.ev.end)}</span></div>
        <div class="now-box">
          <span class="lbl">${boxLabel}</span>
          <span class="s">${where(boxLesson)}</span>
          <span class="r">${boxRight}</span>
        </div>
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .pill {
        margin-left: auto;
        flex: none;
        font-size: 0.72rem;
        font-weight: 700;
        padding: 3px 9px;
        border-radius: 999px;
        white-space: nowrap;
        background: var(--lc-chip-bg);
        color: var(--secondary-text-color);
      }
      .pill.in {
        background: var(--lc-good-bg);
        color: var(--lc-good);
      }
      .pill.free {
        background: var(--lc-amber-bg);
        color: var(--lc-amber);
      }
      .daybar {
        display: flex;
        gap: 3px;
      }
      .seg {
        flex: 1;
        min-width: 0;
        height: 30px;
        border-radius: 6px;
        background: var(--lc-ring-track);
        display: grid;
        place-items: center;
        font-size: 0.7rem;
        font-weight: 700;
        color: var(--secondary-text-color);
        overflow: hidden;
        white-space: nowrap;
      }
      .seg.past {
        background: var(--lc-brand-bg);
        color: var(--lc-brand-strong);
        opacity: 0.6;
      }
      .seg.now {
        background: var(--lc-brand);
        color: #fff;
      }
      .seg.sub {
        outline: 2px dashed var(--lc-amber);
        outline-offset: -2px;
      }
      .seg.off {
        background: transparent;
        border: 1px dashed var(--divider-color);
        text-decoration: line-through;
        opacity: 0.7;
      }
      .ends {
        display: flex;
        justify-content: space-between;
        font-size: 0.72rem;
        color: var(--secondary-text-color);
        font-variant-numeric: tabular-nums;
        margin-top: -6px;
      }
      .now-box {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 10px;
        border-radius: 9px;
        background: var(--lc-chip-bg);
        min-width: 0;
      }
      .now-box .lbl {
        font-size: 0.78rem;
        color: var(--secondary-text-color);
        flex: none;
      }
      .now-box .s {
        font-weight: 700;
        font-size: 0.86rem;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .now-box .r {
        margin-left: auto;
        font-size: 0.78rem;
        color: var(--secondary-text-color);
        white-space: nowrap;
        flex: none;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-school-day-card": LibrusSchoolDayCard;
  }
}
