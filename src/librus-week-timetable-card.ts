import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { fetchCalendarEvents, type LibrusCalendarEvent } from "./utils/calendar";
import { t } from "./utils/localize";

const WEEKDAY_LABELS = [1, 2, 3, 4, 5]; // Mon-Fri, ISO weekday numbers

function isoWeekday(iso: string): number {
  const d = new Date(iso);
  const day = d.getDay(); // 0 = Sunday
  return day === 0 ? 7 : day;
}

function mondayOf(d: Date): Date {
  const monday = new Date(d);
  const weekday = isoWeekday(d.toISOString());
  monday.setDate(monday.getDate() - (weekday - 1));
  monday.setHours(0, 0, 0, 0);
  return monday;
}

/** A short, deterministic abbreviation for a subject name (first syllable-ish chunk). */
function abbreviate(name: string): string {
  const clean = name.replace(/\(.*\)/, "").trim();
  return clean.length <= 4 ? clean : clean.slice(0, 3);
}

@customElement("librus-week-timetable-card")
export class LibrusWeekTimetableCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  @state() private _events: LibrusCalendarEvent[] = [];
  private _fetchedFor?: string;
  private _refreshTimer?: ReturnType<typeof setInterval>;

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement("librus-device-editor") as LovelaceCardEditor;
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-week-timetable-card" };
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
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this._refreshTimer);
  }

  private async _fetch(force = false): Promise<void> {
    if (!this.hass || !this._config) return;
    const resolved = this._resolveEntities();
    if ("error" in resolved) return;
    const entityId = resolved.map.timetable;
    if (!entityId) return;

    const monday = mondayOf(new Date());
    const saturday = new Date(monday);
    saturday.setDate(saturday.getDate() + 5);
    const cacheKey = `${entityId}:${monday.toDateString()}`;
    if (!force && this._fetchedFor === cacheKey) return;
    this._fetchedFor = cacheKey;

    try {
      this._events = await fetchCalendarEvents(this.hass, entityId, monday, saturday);
    } catch {
      this._events = [];
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
      return this._message("mdi:calendar-week-outline", t(hass, "empty.generic_error"));
    }

    const byDay: LibrusCalendarEvent[][] = [[], [], [], [], []];
    for (const ev of this._events) {
      const weekday = isoWeekday(ev.start);
      if (weekday >= 1 && weekday <= 5) byDay[weekday - 1].push(ev);
    }
    byDay.forEach((day) => day.sort((a, b) => a.start.localeCompare(b.start)));
    const maxRows = Math.max(...byDay.map((d) => d.length), 1);
    const dayNames = WEEKDAY_LABELS.map((n) =>
      new Date(2026, 0, n + 4).toLocaleDateString(hass.language, { weekday: "short" })
    );

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-week-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${t(hass, "card.week_timetable.title")}</div>
            <div class="subtitle">${t(hass, "card.week_timetable.subtitle")}</div>
          </div>
        </div>
        <div class="week-grid" style="grid-template-rows: auto repeat(${maxRows}, 1fr);">
          <span class="h"></span>
          ${dayNames.map((n) => html`<span class="h">${n}</span>`)}
          ${Array.from({ length: maxRows }, (_, row) => html`
            <span class="n">${row + 1}</span>
            ${byDay.map((day) => {
              const ev = day[row];
              return ev
                ? html`<div class="cell on" title=${ev.summary}>${abbreviate(ev.summary)}</div>`
                : html`<div class="cell empty"></div>`;
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
        grid-template-columns: 24px repeat(5, 1fr);
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
      .cell.empty {
        background: transparent;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-week-timetable-card": LibrusWeekTimetableCard;
  }
}
