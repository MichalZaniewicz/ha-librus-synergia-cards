import { html, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { fetchCalendarEvents, type LibrusCalendarEvent } from "./utils/calendar";
import { donutChart, type DonutSegment } from "./utils/render-helpers";
import { t } from "./utils/localize";

function isoWeekday(iso: string): number {
  const d = new Date(iso);
  const day = d.getDay(); // 0 = Sunday
  return day === 0 ? 7 : day;
}

// Same "roll forward on a weekend" Monday as librus-week-timetable-card -
// the ISO week containing a Sat/Sun has already fully happened, so the
// upcoming week is the more useful one to show a lesson-time split for.
function mondayOf(d: Date): Date {
  const monday = new Date(d);
  const weekday = isoWeekday(d.toISOString());
  const daysToMonday = weekday >= 6 ? 8 - weekday : 1 - weekday;
  monday.setDate(monday.getDate() + daysToMonday);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

// 16 distinct hues (style-tokens.ts) - a real timetable easily has more
// subjects than the 5-6 core semantic colors can tell apart at a glance.
const PALETTE = Array.from({ length: 16 }, (_, i) => `var(--lc-chart-${i + 1})`);

/**
 * How the week's lesson slots split across subjects - a donut counting
 * timetable periods per subject (Mon-Sat, same week `librus-week-
 * timetable-card` shows), not real clock hours - Librus doesn't report a
 * per-lesson duration, and every period is the same length in practice.
 */
@customElement("librus-subject-time-card")
export class LibrusSubjectTimeCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  @state() private _events: LibrusCalendarEvent[] = [];
  private _fetchedFor?: string;
  private _refreshTimer?: ReturnType<typeof setInterval>;

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement("librus-device-editor") as LovelaceCardEditor;
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-subject-time-card" };
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
      return this._message("mdi:chart-donut-variant", t(hass, "card.subject_time.empty"));
    }

    const counts = new Map<string, number>();
    for (const ev of this._events) {
      if (!ev.summary) continue;
      counts.set(ev.summary, (counts.get(ev.summary) ?? 0) + 1);
    }
    const entries = [...counts.entries()].sort((a, b) => b[1] - a[1]);
    const segments: DonutSegment[] = entries.map(([subject, value], i) => ({
      value,
      colorVar: PALETTE[i % PALETTE.length],
      label: subject,
    }));

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-donut-variant"></ha-icon></div>
          <div class="title-block">
            <div class="title">${t(hass, "card.subject_time.title")}</div>
            <div class="subtitle">${t(hass, "card.subject_time.subtitle")}</div>
          </div>
        </div>
        <div class="chart-wrap">${donutChart(segments, { centerLabel: t(hass, "unit.lessons_per_week") })}</div>
        <div class="legend-grid">
          ${segments.map(
            (s) => html`
              <span class="legend-cell">
                <span class="dot" style="background:${s.colorVar}"></span>
                <span class="name" title=${s.label}>${s.label}</span>
                <b>${s.value}</b>
              </span>
            `
          )}
        </div>
      </ha-card>
    `;
  }

  static styles = [librusTokens, librusSharedStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-subject-time-card": LibrusSubjectTimeCard;
  }
}
