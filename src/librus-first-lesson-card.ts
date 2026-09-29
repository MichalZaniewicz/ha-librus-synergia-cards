import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig, LibrusHass } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { fetchCalendarEvents, isoDate, type LibrusCalendarEvent } from "./utils/calendar";
import { findLibrusDeviceIds, mapByTranslationKey } from "./utils/entities";
import { formatTime } from "./utils/format";
import { t } from "./utils/localize";
import { librusCardEditor } from "./utils/card-editor";

/** The integration appends these to a lesson's summary (calendar.py). */
const STATUS_RE = /\s*\((odwołane|zastępstwo)\)\s*$/i;
const AVATAR_COLORS = [
  "var(--lc-chart-1)",
  "var(--lc-chart-2)",
  "var(--lc-chart-3)",
  "var(--lc-chart-7)",
  "var(--lc-chart-8)",
  "var(--lc-chart-10)",
];

interface FirstLesson {
  start: string;
  subject: string;
  room?: string;
  substitution: boolean;
}

interface DaySummary {
  lesson?: FirstLesson;
  /** Cancelled lessons before the first one that takes place. */
  skipped: number;
  /** No lesson takes place that day. */
  free: boolean;
  /** The first lesson has already started ("you're too late to plan for it"). */
  started: boolean;
  /** The timetable couldn't be fetched. */
  unknown: boolean;
}

interface Student {
  deviceId: string;
  name: string;
  color: string;
  today: DaySummary;
  next: DaySummary;
}

/** Next Mon-Fri after `from` (skips the weekend; does not know about holidays). */
function nextSchoolDay(from: Date): Date {
  const d = new Date(from);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 1);
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
  return d;
}

/** Event times can arrive in different ISO forms; compare real instants. */
const ms = (iso: string): number => new Date(iso).getTime();

function summarize(events: LibrusCalendarEvent[] | undefined, day: string, now: Date): DaySummary {
  if (events === undefined) return { skipped: 0, free: false, started: false, unknown: true };
  const lessons = events
    .filter((e) => !e.allDay && e.start.slice(0, 10) === day)
    .sort((a, b) => ms(a.start) - ms(b.start));
  const held = lessons.filter((e) => !/\(odwołane\)\s*$/i.test(e.summary));
  const first = held[0];
  if (!first) return { skipped: 0, free: true, started: false, unknown: false };
  return {
    lesson: {
      start: first.start,
      subject: first.summary.replace(STATUS_RE, ""),
      room: first.location || undefined,
      substitution: /\(zastępstwo\)\s*$/i.test(first.summary),
    },
    skipped: lessons.filter((e) => ms(e.start) < ms(first.start) && !held.includes(e)).length,
    free: false,
    started: ms(first.start) <= now.getTime(),
    unknown: false,
  };
}

/** "E-dziennik Kacper Zaniewicz" (the integration's default title) -> "Kacper". */
export function studentName(hass: LibrusHass, deviceId: string, override?: string): string {
  if (override?.trim()) return override.trim();
  const device = hass.devices?.[deviceId];
  if (device?.name_by_user) return device.name_by_user;
  const name = (device?.name ?? "").replace(/^e-dziennik\s+/i, "").trim();
  return name.split(/\s+/)[0] || device?.name || deviceId;
}

/**
 * When does each child start - today and on the next school day? The one
 * card that shows every student at once (issue #6: a parent of three kept
 * switching between them). Reads each child's timetable calendar.
 */
@customElement("librus-first-lesson-card")
export class LibrusFirstLessonCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  @state() private _events = new Map<string, LibrusCalendarEvent[] | undefined>();
  private _fetchedFor?: string;
  private _refreshTimer?: ReturnType<typeof setInterval>;
  private _tickTimer?: ReturnType<typeof setInterval>;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-first-lesson-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
  }

  public getCardSize(): number {
    return 1 + 2 * Math.max(1, this._events.size);
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._refreshTimer = setInterval(() => void this._fetch(true), 30 * 60_000);
    // Re-render once a minute so a started first lesson fades out on time.
    this._tickTimer = setInterval(() => this.requestUpdate(), 60_000);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this._refreshTimer);
    clearInterval(this._tickTimer);
  }

  private _deviceIds(): string[] {
    const all = findLibrusDeviceIds(this.hass!);
    const wanted = this._config?.devices;
    if (wanted?.length) return wanted.filter((id) => all.includes(id));
    return [...all].sort((a, b) =>
      studentName(this.hass!, a, this._config?.names?.[a]).localeCompare(
        studentName(this.hass!, b, this._config?.names?.[b])
      )
    );
  }

  private async _fetch(force = false): Promise<void> {
    if (!this.hass || !this._config) return;
    const hass = this.hass;
    const ids = this._deviceIds();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const end = nextSchoolDay(today);
    end.setDate(end.getDate() + 1);
    const cacheKey = `${ids.join(",")}:${isoDate(today)}`;
    if (!force && this._fetchedFor === cacheKey) return;
    this._fetchedFor = cacheKey;

    const generation = this._beginFetch();
    const results = await Promise.all(
      ids.map(async (id): Promise<[string, LibrusCalendarEvent[] | undefined]> => {
        const entityId = mapByTranslationKey(hass, id).timetable;
        if (!entityId) return [id, undefined];
        try {
          return [id, await fetchCalendarEvents(hass, entityId, today, end)];
        } catch {
          return [id, undefined];
        }
      })
    );
    if (this._isCurrentFetch(generation)) this._events = new Map(results);
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();
    const hass = this.hass;
    const config = this._config;

    const ids = this._deviceIds();
    if (ids.length === 0) return this._message("mdi:alert-circle-outline", t(hass, "error.no_device"));
    void this._fetch();
    if (this._events.size === 0) return this._message("mdi:alarm", t(hass, "empty.loading"));

    const now = new Date();
    const todayIso = isoDate(now);
    const next = nextSchoolDay(now);
    const nextIso = isoDate(next);
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextIsTomorrow = nextIso === isoDate(tomorrow);
    const onlyNext = Boolean(config.only_tomorrow);

    const students: Student[] = ids.map((id, i) => ({
      deviceId: id,
      name: studentName(hass, id, config.names?.[id]),
      color: AVATAR_COLORS[i % AVATAR_COLORS.length],
      today: summarize(this._events.get(id), todayIso, now),
      next: summarize(this._events.get(id), nextIso, now),
    }));

    if (students.every((s) => (onlyNext || s.today.free) && s.next.free)) {
      return this._message("mdi:alarm", t(hass, "card.first_lesson.empty"));
    }

    // Focus today while some child's first lesson is still ahead - that's
    // when "who has to leave first" matters. Once every child is at school,
    // the card looks at the next school day.
    const focusToday = !onlyNext && students.some((s) => s.today.lesson && !s.today.started);
    const focusKey: "today" | "next" = focusToday ? "today" : "next";
    const earliest = students
      .filter((s) => s[focusKey].lesson && !s[focusKey].started)
      .reduce<Student | undefined>(
        (best, s) =>
          !best || ms(s[focusKey].lesson!.start) < ms(best[focusKey].lesson!.start) ? s : best,
        undefined
      );

    const nextLabel = nextIsTomorrow
      ? t(hass, "card.first_lesson.tomorrow")
      : next.toLocaleDateString(hass.language, { weekday: "short" });
    let subtitle: TemplateResult | string = "";
    if (earliest) {
      const key = focusToday
        ? "card.first_lesson.earliest_today"
        : nextIsTomorrow
          ? "card.first_lesson.earliest_tomorrow"
          : "card.first_lesson.earliest_on";
      const [before, after] = t(hass, key, {
        day: next.toLocaleDateString(hass.language, { weekday: "long" }),
        who: "\u0000",
      }).split("\u0000");
      subtitle = html`${before}<b>${earliest.name} ${formatTime(earliest[focusKey].lesson!.start)}</b>${after ?? ""}`;
    }

    return html`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:alarm"></ha-icon></div>
          <div class="title-block">
            <div class="title">${config.title ?? t(hass, "card.first_lesson.title")}</div>
            ${subtitle ? html`<div class="subtitle">${subtitle}</div>` : nothing}
          </div>
        </div>
        <div class="kids">
          ${students.map(
            (s, i) => html`
              ${i > 0 ? html`<hr />` : nothing}
              <div class="kid">
                <div class="avatar" style="background:${s.color}">${s.name.slice(0, 1).toUpperCase()}</div>
                <div class="kname">${s.name}</div>
                <div class="lines">
                  ${onlyNext
                    ? nothing
                    : this._line(t(hass, "card.first_lesson.today"), s.today, {
                        on: focusToday,
                        first: focusToday && earliest === s,
                        past: s.today.started || !focusToday,
                      })}
                  ${this._line(nextLabel, s.next, {
                    on: !focusToday,
                    first: !focusToday && earliest === s,
                    past: false,
                  })}
                </div>
              </div>
            `
          )}
        </div>
      </ha-card>
    `;
  }

  private _line(
    label: string,
    day: DaySummary,
    opts: { on: boolean; first: boolean; past: boolean }
  ): TemplateResult {
    const hass = this.hass!;
    const cls = `line${opts.first ? " first" : ""}${opts.past ? " past" : ""}`;
    const lbl = html`<span class="day ${opts.on ? "on" : ""}">${label}</span>`;
    if (day.unknown || day.free || !day.lesson) {
      const text = day.unknown ? t(hass, "card.first_lesson.no_data") : t(hass, "card.first_lesson.free");
      return html`<div class=${cls}>${lbl}<span class="time">–</span><span class="subj muted">${text}</span></div>`;
    }
    const lesson = day.lesson;
    const chips: string[] = [];
    if (day.skipped === 1) chips.push(t(hass, "card.first_lesson.first_canceled"));
    if (day.skipped > 1) chips.push(t(hass, "card.first_lesson.first_n_canceled", { n: day.skipped }));
    if (lesson.substitution) chips.push(t(hass, "card.first_lesson.substitution"));
    return html`
      <div class=${cls}>
        ${lbl}
        <span class="time">${formatTime(lesson.start)}</span>
        <span class="subj"
          >${lesson.subject}${lesson.room && !this._config?.hide_room
            ? html`<span class="muted"> · ${lesson.room}</span>`
            : nothing}${chips.map((c) => html` <span class="chip">${c}</span>`)}</span
        >
      </div>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .kids {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .kid {
        display: grid;
        grid-template-columns: 30px 1fr;
        column-gap: 10px;
        align-items: start;
      }
      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        color: #fff;
        font-weight: 800;
        font-size: 0.85rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      :host(.dark) .avatar {
        color: rgba(0, 0, 0, 0.78);
      }
      .kname {
        font-weight: 700;
        font-size: 0.88rem;
        line-height: 30px;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .lines {
        grid-column: 2;
        display: flex;
        flex-direction: column;
        gap: 3px;
      }
      .line {
        display: grid;
        grid-template-columns: 3.4rem 3rem 1fr;
        gap: 6px;
        align-items: baseline;
        font-size: 0.84rem;
      }
      .day {
        color: var(--secondary-text-color);
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .day.on {
        color: var(--lc-brand);
      }
      .time {
        font-size: 0.95rem;
        font-weight: 600;
        font-variant-numeric: tabular-nums;
      }
      .line.first .time {
        color: var(--lc-brand);
        font-weight: 800;
      }
      .line.past {
        opacity: 0.45;
      }
      .subj {
        min-width: 0;
      }
      .muted {
        color: var(--secondary-text-color);
      }
      .chip {
        display: inline-block;
        font-size: 0.68rem;
        font-weight: 700;
        padding: 1px 7px;
        border-radius: 999px;
        background: var(--lc-amber-bg);
        color: var(--lc-amber);
        white-space: nowrap;
      }
      .subtitle b {
        color: var(--lc-brand);
        font-weight: 700;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-first-lesson-card": LibrusFirstLessonCard;
  }
}
