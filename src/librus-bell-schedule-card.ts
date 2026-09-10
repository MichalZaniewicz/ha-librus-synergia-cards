import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { fetchCalendarEvents, type LibrusCalendarEvent } from "./utils/calendar";
import { t, formatCountdown } from "./utils/localize";
import { librusCardEditor } from "./utils/card-editor";
import { tapActionHandler } from "./utils/actions";

interface BellPeriod {
  lesson_no: number;
  start: string;
  end: string;
}

const BAD_STATES = new Set(["unknown", "unavailable", ""]);

function hm(d: Date): string {
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
}
function isoDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/**
 * The day's period grid: bell times from the School sensor's
 * `bell_schedule` attribute, each row filled in with the subject +
 * classroom for that period from the timetable calendar. Shows the day
 * the `next_lesson` sensor points at (today while a lesson is still to
 * come, tomorrow once today is done). The period happening right now is
 * highlighted, past ones dimmed; the header shows the current-or-next
 * lesson.
 */
@customElement("librus-bell-schedule-card")
export class LibrusBellScheduleCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  @state() private _events: LibrusCalendarEvent[] = [];
  private _fetchedFor?: string;
  private _refreshTimer?: ReturnType<typeof setInterval>;
  private _tickTimer?: ReturnType<typeof setInterval>;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-bell-schedule-card" };
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
    this._tickTimer = setInterval(() => this.requestUpdate(), 30_000);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this._refreshTimer);
    clearInterval(this._tickTimer);
  }

  /** The day to show: the date of the next lesson (today or tomorrow), else today. */
  private _targetDay(): Date {
    const next = this._nextLessonDateIso();
    if (next) {
      const d = new Date(`${next}T00:00:00`);
      if (!Number.isNaN(d.getTime())) return d;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }

  private _nextLessonDateIso(): string | undefined {
    if (!this.hass) return undefined;
    const resolved = this._resolveEntities();
    if ("error" in resolved) return undefined;
    const next = resolved.map.next_lesson ? this.hass.states[resolved.map.next_lesson] : undefined;
    const date = next?.attributes.date as string | undefined;
    return date && !BAD_STATES.has(next?.state ?? "") ? date : undefined;
  }

  private async _fetch(force = false): Promise<void> {
    if (!this.hass || !this._config) return;
    const resolved = this._resolveEntities();
    if ("error" in resolved) return;
    const entityId = resolved.map.timetable;
    if (!entityId) return;

    const day = this._targetDay();
    const dayAfter = new Date(day);
    dayAfter.setDate(dayAfter.getDate() + 1);
    const cacheKey = `${entityId}:${isoDate(day)}`;
    if (!force && this._fetchedFor === cacheKey) return;
    this._fetchedFor = cacheKey;

    try {
      this._events = (await fetchCalendarEvents(this.hass, entityId, day, dayAfter)).filter(
        (e) => !e.allDay
      );
    } catch {
      this._events = [];
    }
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { map } = resolved;
    const hass = this.hass;

    void this._fetch();

    const school = map.school ? hass.states[map.school] : undefined;
    const periods = (school?.attributes.bell_schedule as BellPeriod[] | undefined) ?? [];
    if (periods.length === 0) {
      return this._message("mdi:bell-outline", t(hass, "card.bell_schedule.empty"));
    }

    // Subject + room per bell time, from the fetched day's lessons.
    const bySlot = new Map<string, { subject: string; room?: string }>();
    for (const ev of this._events) {
      const start = hm(new Date(ev.start));
      if (!bySlot.has(start) && ev.summary) {
        bySlot.set(start, { subject: ev.summary, room: ev.location || undefined });
      }
    }

    const targetIsToday = isoDate(this._targetDay()) === isoDate(new Date());
    const nowHM = hm(new Date());

    const currentSensor = map.current_lesson ? hass.states[map.current_lesson] : undefined;
    const nextSensor = map.next_lesson ? hass.states[map.next_lesson] : undefined;
    const currentSubject =
      currentSensor && !BAD_STATES.has(currentSensor.state) ? currentSensor.state : undefined;
    const nextSubject = nextSensor && !BAD_STATES.has(nextSensor.state) ? nextSensor.state : undefined;

    let subtitle: string;
    if (currentSubject) {
      subtitle = `${currentSubject} · ${t(hass, "label.now")}`;
    } else if (nextSubject) {
      const mins = Number(nextSensor?.attributes.minutes_until);
      subtitle = Number.isNaN(mins) ? nextSubject : `${nextSubject} · ${formatCountdown(hass, mins)}`;
    } else {
      subtitle = t(hass, "label.after_school");
    }

    return html`
      <ha-card @click=${tapActionHandler(this, this._config.tap_action, map.school)}>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:bell-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title ?? t(hass, "card.bell_schedule.title")}</div>
            <div class="subtitle">${subtitle}</div>
          </div>
        </div>
        <div class="periods">
          ${periods.map((p) => {
            const slot = bySlot.get(p.start);
            const isCurrent = targetIsToday && p.start <= nowHM && nowHM <= p.end;
            const isPast = targetIsToday && nowHM > p.end;
            return html`
              <div class="period ${isCurrent ? "current" : ""} ${isPast ? "past" : ""} ${slot ? "" : "free"}">
                <span class="pnum">${t(hass, "label.lesson_short", { n: p.lesson_no })}</span>
                <span class="ptime">${p.start}<span class="dash">–</span>${p.end}</span>
                ${slot
                  ? html`<span class="psubj"
                      >${slot.subject}${slot.room ? html` <span class="proom">${slot.room}</span>` : nothing}</span
                    >`
                  : nothing}
              </div>
            `;
          })}
        </div>
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .periods {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .period {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 6px 8px;
        border-radius: 8px;
        font-size: 0.82rem;
      }
      .period.past {
        opacity: 0.45;
      }
      .period.free {
        opacity: 0.55;
      }
      .period.current {
        background: var(--lc-brand-bg);
        color: var(--lc-brand-strong);
        font-weight: 700;
        opacity: 1;
      }
      .pnum {
        flex: none;
        min-width: 30px;
        font-weight: 800;
        font-size: 0.72rem;
        color: var(--secondary-text-color);
      }
      .period.current .pnum {
        color: var(--lc-brand-strong);
      }
      .ptime {
        font-variant-numeric: tabular-nums;
        flex: none;
      }
      .dash {
        margin: 0 3px;
        color: var(--secondary-text-color);
      }
      .psubj {
        margin-left: auto;
        font-weight: 700;
        text-align: right;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .proom {
        font-weight: 600;
        color: var(--secondary-text-color);
        font-size: 0.72rem;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-bell-schedule-card": LibrusBellScheduleCard;
  }
}
