import { html, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { fetchCalendarEvents, mondayOfSchoolWeek, type LibrusCalendarEvent, lessonInfo } from "./utils/calendar";
import { hBarChart, type HBarRow } from "./utils/render-helpers";
import { t } from "./utils/localize";

// 16 distinct hues (style-tokens.ts) - a real timetable easily has more
// subjects than the 5-6 core semantic colors can tell apart at a glance.
const PALETTE = Array.from({ length: 16 }, (_, i) => `var(--lc-chart-${i + 1})`);

/**
 * How the week's lesson slots split across subjects - a ranked horizontal
 * bar chart counting timetable periods per subject (Mon-Sat, same week
 * `librus-week-timetable-card` shows), not real clock hours: Librus
 * doesn't report a per-lesson duration, and every period is the same
 * length in practice. A bar chart reads as "X vs Y" far better than a
 * donut for a dozen-plus categories.
 */
@customElement("librus-subject-time-card")
export class LibrusSubjectTimeCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  @state() private _events: LibrusCalendarEvent[] = [];
  private _fetchedFor?: string;
  private _refreshTimer?: ReturnType<typeof setInterval>;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
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

  private get _dayCount(): number {
    return this._config?.show_saturday ? 6 : 5;
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
      return this._message("mdi:chart-bar", t(hass, "card.subject_time.empty"));
    }

    const counts = new Map<string, number>();
    for (const ev of this._events) {
      if (!ev.summary) continue;
      // A cancelled lesson isn't time spent on the subject, and a
      // substitution is still that subject (found live: "Język niemiecki
      // (zastępstwo)" showed up as a separate bar).
      const info = lessonInfo(ev);
      if (info.cancelled) continue;
      counts.set(info.name, (counts.get(info.name) ?? 0) + 1);
    }
    const rows: HBarRow[] = [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([subject, value], i) => ({
        label: subject,
        value,
        colorVar: PALETTE[i % PALETTE.length],
      }));

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-bar"></ha-icon></div>
          <div class="title-block">
            <div class="title">${t(hass, "card.subject_time.title")}</div>
            <div class="subtitle">${t(hass, "card.subject_time.subtitle")}</div>
          </div>
        </div>
        ${hBarChart(rows)}
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
