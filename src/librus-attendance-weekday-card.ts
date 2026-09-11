import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { t } from "./utils/localize";

interface WeekdayBucket {
  excused: number;
  unexcused: number;
  late: number;
}

const WEEKDAYS = [1, 2, 3, 4, 5]; // Mon-Fri, ISO weekday numbers (as by_weekday's string keys)
const CATEGORIES = ["excused", "unexcused", "late"] as const;
const COLOR: Record<(typeof CATEGORIES)[number], string> = {
  excused: "var(--lc-warn)",
  unexcused: "var(--lc-bad)",
  // Distinct from good/warn/bad on purpose - "late" isn't a form of
  // absence (it doesn't count against `unexcused_count`/`excused_count`
  // either), and reusing --lc-good here would read as endorsing lateness.
  late: "var(--lc-brand)",
};
const LABEL_KEY: Record<(typeof CATEGORIES)[number], "stat.excused" | "stat.unexcused" | "stat.late"> = {
  excused: "stat.excused",
  unexcused: "stat.unexcused",
  late: "stat.late",
};

/**
 * Which weekday absences/lates tend to land on - each weekday's bar split
 * into its own excused/unexcused/late segments (not a blended count), from
 * the Attendance sensor's `by_weekday` attribute (requires
 * `ha-librus-synergia` 0.4.21+). Deliberately Mon-Fri only, matching every
 * other week-shaped card in this family.
 */
@customElement("librus-attendance-weekday-card")
export class LibrusAttendanceWeekdayCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-attendance-weekday-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 3;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { map } = resolved;
    const hass = this.hass;

    const attendance = map.attendance ? hass.states[map.attendance] : undefined;
    const byWeekday = attendance?.attributes.by_weekday as Record<string, WeekdayBucket> | undefined;

    const totals = WEEKDAYS.map((n) => {
      const b = byWeekday?.[String(n)];
      return (b?.excused ?? 0) + (b?.unexcused ?? 0) + (b?.late ?? 0);
    });
    const grandTotal = totals.reduce((a, b) => a + b, 0);

    if (!byWeekday || grandTotal === 0) {
      return this._message("mdi:chart-bar-stacked", t(hass, "card.attendance_weekday.empty"));
    }

    const maxTotal = Math.max(...totals, 1);
    const sums: WeekdayBucket = { excused: 0, unexcused: 0, late: 0 };
    for (const n of WEEKDAYS) {
      const b = byWeekday[String(n)];
      if (!b) continue;
      sums.excused += b.excused;
      sums.unexcused += b.unexcused;
      sums.late += b.late;
    }
    const dayNames = WEEKDAYS.map((n) =>
      new Date(2026, 0, n + 4).toLocaleDateString(hass.language, { weekday: "short" })
    );

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-bar-stacked"></ha-icon></div>
          <div class="title-block">
            <div class="title">${t(hass, "card.attendance_weekday.title")}</div>
            <div class="subtitle">${t(hass, "card.attendance_weekday.subtitle")}</div>
          </div>
        </div>
        <div class="weekday-bars">
          ${WEEKDAYS.map((n, i) => {
            const b = byWeekday[String(n)];
            const total = totals[i];
            const stackHeight = total > 0 ? Math.max(22, (total / maxTotal) * 84) : 4;
            return html`
              <div class="weekday-col">
                <div class="weekday-total">${total || ""}</div>
                <div class="weekday-bar-stack" style="height:${stackHeight}px;${total === 0 ? "background:var(--divider-color);" : ""}">
                  ${CATEGORIES.filter((c) => b && b[c] > 0).map(
                    (c) => html`
                      <div
                        class="seg"
                        style="height:${((b![c] / total) * stackHeight).toFixed(1)}px;background:${COLOR[c]}"
                        title="${t(hass, LABEL_KEY[c])}: ${b![c]}"
                      ></div>
                    `
                  )}
                </div>
                <div class="weekday-label">${dayNames[i]}</div>
              </div>
            `;
          })}
        </div>
        <div class="legend">
          ${CATEGORIES.map(
            (c) => html`
              <span class="legend-item">
                <span class="dot" style="background:${COLOR[c]}"></span>${t(hass, LABEL_KEY[c])} <b>${sums[c]}</b>
              </span>
            `
          )}
        </div>
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .weekday-bars {
        display: flex;
        align-items: flex-end;
        gap: 12px;
        height: 110px;
        padding: 0 4px;
      }
      .weekday-col {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        gap: 6px;
        height: 100%;
      }
      .weekday-total {
        font-size: 0.68rem;
        font-weight: 800;
        color: var(--primary-text-color);
        height: 14px;
      }
      .weekday-bar-stack {
        width: 100%;
        max-width: 30px;
        border-radius: 6px 6px 3px 3px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .weekday-bar-stack .seg:first-child {
        border-radius: 6px 6px 0 0;
      }
      .weekday-bar-stack .seg:last-child {
        border-radius: 0 0 3px 3px;
      }
      .weekday-label {
        font-size: 0.66rem;
        color: var(--secondary-text-color);
        font-weight: 700;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-attendance-weekday-card": LibrusAttendanceWeekdayCard;
  }
}
