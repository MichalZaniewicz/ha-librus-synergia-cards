import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { mapAllByTranslationKey } from "./utils/entities";
import { formatShortDate, parseCategory } from "./utils/format";
import { t } from "./utils/localize";

const UNAVAILABLE = new Set(["unknown", "unavailable", ""]);

@customElement("librus-week-summary-card")
export class LibrusWeekSummaryCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement("librus-device-editor") as LovelaceCardEditor;
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-week-summary-card" };
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
    const { deviceId, map } = resolved;
    const hass = this.hass;

    const attendance = map.attendance ? hass.states[map.attendance] : undefined;
    const notices = map.behaviour_notices ? hass.states[map.behaviour_notices] : undefined;
    const agenda = map.agenda ? hass.states[map.agenda] : undefined;

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoIso = weekAgo.toISOString().slice(0, 10);
    const newGrades = mapAllByTranslationKey(hass, deviceId, "subject_average").filter((s) => {
      const date = hass.states[s.entityId]?.attributes.latest_grade_date as string | undefined;
      return date && date >= weekAgoIso;
    }).length;

    const agendaMessage = agenda?.attributes.message as string | undefined;

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-check-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${t(hass, "card.week_summary.title")}</div>
          </div>
        </div>
        <div class="stats">
          <div class="stat">
            <div class="stat-value">${newGrades}</div>
            <div class="stat-label">${t(hass, "stat.new_grades")}</div>
          </div>
          ${attendance && !UNAVAILABLE.has(attendance.state)
            ? (() => {
                // BUG FIX (2026-09-07, found live): this used to show the
                // blended total (excused + unexcused) - an absence the
                // parent had ALREADY gotten excused looked identical to
                // one still needing attention. `unexcused_count` (requires
                // ha-librus-synergia 0.4.19+) isolates the part that
                // actually does; falls back to the old blended state for
                // an older backend.
                const unexcused = attendance.attributes.unexcused_count as number | undefined;
                const value = unexcused ?? Number(attendance.state);
                return html`<div class="stat ${value > 0 ? "bad" : ""}"><div class="stat-value">${value}</div><div class="stat-label">${t(hass, "stat.absences")}</div></div>`;
              })()
            : nothing}
          ${notices && !UNAVAILABLE.has(notices.state)
            ? html`<div class="stat"><div class="stat-value">${notices.state}</div><div class="stat-label">${t(hass, "card.behaviour_notices.title")}</div></div>`
            : nothing}
        </div>
        ${agendaMessage
          ? (() => {
              const { category, text } = parseCategory(agendaMessage);
              return html`
                <hr />
                <div class="list-item">
                  <span class="dot neutral"></span>
                  <div class="body">
                    ${category ? html`<div class="cat-label-row"><span class="cat-label">${category}</span></div>` : nothing}
                    <div class="row1">${text}</div>
                    ${agenda?.attributes.start_time
                      ? html`<div class="item-text">${formatShortDate(String(agenda.attributes.start_time), hass.language)}</div>`
                      : nothing}
                  </div>
                </div>
              `;
            })()
          : nothing}
      </ha-card>
    `;
  }

  static styles = [librusTokens, librusSharedStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-week-summary-card": LibrusWeekSummaryCard;
  }
}
