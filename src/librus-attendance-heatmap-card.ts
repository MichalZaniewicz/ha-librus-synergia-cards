import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { t } from "./utils/localize";

type DayStatus = "good" | "warn" | "bad";

function isoWeekday(d: Date): number {
  const day = d.getDay(); // 0 = Sunday
  return day === 0 ? 7 : day;
}

function mondayOf(d: Date): Date {
  const monday = new Date(d);
  monday.setDate(monday.getDate() - (isoWeekday(d) - 1));
  monday.setHours(0, 0, 0, 0);
  return monday;
}

function isoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const WEEKDAY_ROWS = [0, 1, 2, 3, 4]; // Mon-Fri offsets from each week's Monday
// Attendance is only tracked on school days - a fixed 16-week lookback is a
// reasonable "recent months" default when the school year's own start date
// isn't available yet (an older backend, or the Class sensor not loaded).
const FALLBACK_LOOKBACK_WEEKS = 16;

/**
 * A GitHub-contributions-style calendar of the school year so far, one
 * square per school day, colored by that day's worst attendance status
 * (a single unexcused-absence period outweighs an otherwise-present day -
 * matches the backend's own `by_date` aggregation). Grows as the year
 * does; a day with no record yet (weekend, free day, or just not reached
 * yet) renders as an empty cell. Requires `ha-librus-synergia` 0.4.20+
 * for the `by_date` attribute.
 */
@customElement("librus-attendance-heatmap-card")
export class LibrusAttendanceHeatmapCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-attendance-heatmap-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 2;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { map } = resolved;
    const hass = this.hass;

    const attendance = map.attendance ? hass.states[map.attendance] : undefined;
    const byDate = attendance?.attributes.by_date as Record<string, DayStatus> | undefined;

    if (!attendance || !byDate || Object.keys(byDate).length === 0) {
      return this._message("mdi:calendar-blank-outline", t(hass, "card.attendance_heatmap.empty"));
    }

    const schoolClass = map.school_class ? hass.states[map.school_class] : undefined;
    const yearStartIso = schoolClass?.attributes.school_year_start as string | undefined;
    const today = new Date();
    const todayMonday = mondayOf(today);
    const startMonday = yearStartIso
      ? mondayOf(new Date(`${yearStartIso}T00:00:00`))
      : new Date(todayMonday.getTime() - FALLBACK_LOOKBACK_WEEKS * 7 * 86400000);

    const weeks: Date[] = [];
    for (let w = new Date(startMonday); w <= todayMonday; w.setDate(w.getDate() + 7)) {
      weeks.push(new Date(w));
    }

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-blank-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${t(hass, "card.attendance_heatmap.title")}</div>
            <div class="subtitle">${t(hass, "card.attendance_heatmap.subtitle")}</div>
          </div>
        </div>
        <div class="heatmap-scroll">
          <div class="heatmap" style="grid-template-columns: repeat(${weeks.length}, 11px);">
            ${weeks.map(
              (weekStart) => html`
                <div class="heatmap-col">
                  ${WEEKDAY_ROWS.map((offset) => {
                    const day = new Date(weekStart);
                    day.setDate(day.getDate() + offset);
                    if (day > today) return html`<span class="cell future"></span>`;
                    const dateStr = isoDate(day);
                    const status = byDate[dateStr];
                    return html`<span class="cell ${status ?? "none"}" title=${`${dateStr}${status ? ` - ${t(hass, `card.attendance_heatmap.status.${status}`)}` : ""}`}></span>`;
                  })}
                </div>
              `
            )}
          </div>
        </div>
        <div class="heatmap-legend">
          <span class="legend-item"><span class="cell good"></span>${t(hass, "card.attendance_heatmap.status.good")}</span>
          <span class="legend-item"><span class="cell warn"></span>${t(hass, "card.attendance_heatmap.status.warn")}</span>
          <span class="legend-item"><span class="cell bad"></span>${t(hass, "card.attendance_heatmap.status.bad")}</span>
          <span class="legend-item"><span class="cell none"></span>${t(hass, "card.attendance_heatmap.no_data")}</span>
        </div>
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .heatmap-scroll {
        overflow-x: auto;
        padding-bottom: 2px;
      }
      .heatmap {
        display: grid;
        grid-auto-flow: column;
        gap: 3px;
        width: max-content;
      }
      .heatmap-col {
        display: flex;
        flex-direction: column;
        gap: 3px;
      }
      .cell {
        width: 11px;
        height: 11px;
        border-radius: 3px;
        display: inline-block;
        background: var(--divider-color);
      }
      .cell.good {
        background: var(--lc-good);
      }
      .cell.warn {
        background: var(--lc-warn);
      }
      .cell.bad {
        background: var(--lc-bad);
      }
      .cell.future {
        background: transparent;
      }
      .heatmap-legend {
        display: flex;
        flex-wrap: wrap;
        gap: 4px 12px;
        margin-top: 10px;
        font-size: 0.66rem;
        color: var(--secondary-text-color);
      }
      .legend-item {
        display: inline-flex;
        align-items: center;
        gap: 5px;
      }
      .legend-item .cell {
        width: 9px;
        height: 9px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-attendance-heatmap-card": LibrusAttendanceHeatmapCard;
  }
}
