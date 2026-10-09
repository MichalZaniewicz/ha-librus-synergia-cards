import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { fetchCalendarEvents, isHappeningNow, hasEnded, lessonInfo, lessonMeta, type LibrusCalendarEvent } from "./utils/calendar";
import { lessonTag } from "./utils/render-helpers";
import { formatTime } from "./utils/format";
import { t } from "./utils/localize";

@customElement("librus-today-lessons-card")
export class LibrusTodayLessonsCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  @state() private _events: LibrusCalendarEvent[] = [];
  private _fetchedFor?: string;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-today-lessons-card" };
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
    this._every(5 * 60_000, () => void this._fetch(this._forceRefresh()));
    this._every(60_000, () => this.requestUpdate());
  }


  private async _fetch(force = false): Promise<void> {
    if (!this.hass || !this._config) return;
    const resolved = this._resolveEntities();
    if ("error" in resolved) return;
    const entityId = resolved.map.timetable;
    if (!entityId) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const range = `${entityId}:${today.toDateString()}`;
    const cacheKey = `${range}:${this._dataStamp()}`;
    if (!force && this._fetchedFor === cacheKey) return;
    this._fetchedFor = cacheKey;

    const generation = this._beginFetch();
    try {
      const events = await fetchCalendarEvents(this.hass, entityId, today, tomorrow);
      const sorted = events
        .filter((e) => !e.allDay)
        .sort((a, b) => a.start.localeCompare(b.start));
      if (this._isCurrentFetch(generation)) {
        this._events = sorted;
        this._fetchSucceeded(range);
      }
    } catch {
      if (this._isCurrentFetch(generation) && !this._keepAfterError(range)) this._events = [];
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
      return this._message("mdi:calendar-clock", t(hass, "card.today_lessons.empty"));
    }

    const now = new Date();

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-clock"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title ?? t(hass, "card.today_lessons.title")}</div>
            <div class="subtitle">${t(hass, "card.today_lessons.subtitle")}</div>
          </div>
        </div>
        <div class="timeline">
          ${this._events.map((ev) => {
            const info = lessonInfo(ev);
            const now_ = !info.cancelled && isHappeningNow(ev, now);
            const done = hasEnded(ev, now);
            const meta = lessonMeta(ev, info, this._config?.hide_room);
            return html`
              <div class="tl-item ${now_ ? "now" : ""} ${done ? "done" : ""} ${info.cancelled ? "lesson-cancelled" : ""}">
                <span class="tl-time">${formatTime(ev.start)}</span>
                <span class="tl-dot"></span>
                <div class="tl-body">
                  <div class="subj">
                    <span class="lesson-name">${info.name}</span>${lessonTag(hass, info)}
                    ${now_ ? html`<span class="pill-now">${t(hass, "label.now")}</span>` : nothing}
                  </div>
                  ${meta ? html`<div class="meta">${meta}</div>` : nothing}
                </div>
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
      .timeline {
        display: flex;
        flex-direction: column;
      }
      .tl-item {
        display: flex;
        gap: 11px;
        padding: 6px 0;
        position: relative;
      }
      .tl-item:not(:last-child)::after {
        content: "";
        position: absolute;
        left: 26px;
        top: 28px;
        bottom: -6px;
        width: 1px;
        background: var(--divider-color);
      }
      .tl-time {
        width: 38px;
        flex: none;
        font-size: 0.66rem;
        color: var(--secondary-text-color);
        font-weight: 700;
        padding-top: 2px;
        font-variant-numeric: tabular-nums;
      }
      .tl-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-top: 3px;
        flex: none;
        background: var(--card-background-color);
        border: 2px solid var(--lc-neutral-dot);
      }
      .tl-item.now .tl-dot {
        background: var(--lc-brand);
        border-color: var(--lc-brand);
        box-shadow: 0 0 0 4px var(--lc-brand-bg);
      }
      .tl-item.done {
        opacity: 0.5;
      }
      .subj {
        font-weight: 700;
        font-size: 0.8rem;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .tl-item.now .subj {
        color: var(--lc-brand-strong);
      }
      .meta {
        font-size: 0.68rem;
        color: var(--secondary-text-color);
      }
      .pill-now {
        font-size: 0.58rem;
        font-weight: 800;
        background: var(--lc-brand);
        color: #fff;
        padding: 1px 6px;
        border-radius: 999px;
        letter-spacing: 0.03em;
        text-transform: uppercase;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-today-lessons-card": LibrusTodayLessonsCard;
  }
}
