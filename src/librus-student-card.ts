import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { mapAllByTranslationKey } from "./utils/entities";
import { t } from "./utils/localize";

const UNAVAILABLE = new Set(["unknown", "unavailable", ""]);

interface Score {
  key: string;
  label: string;
  value: number;
  colorVar: string;
}

/**
 * A playful "trading card" summary, in the spirit of ha-suunto-cards'
 * Player Card - computed from whatever real data is available, degrading
 * gracefully (fewer bars) rather than fabricating a number for a metric
 * with no underlying data yet. Explicitly a fun extra, not a serious
 * academic assessment.
 */
@customElement("librus-student-card")
export class LibrusStudentCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement("librus-device-editor") as LovelaceCardEditor;
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-student-card" };
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
    const { deviceId, map } = resolved;
    const hass = this.hass;

    const deviceName = hass.devices?.[deviceId]?.name_by_user || hass.devices?.[deviceId]?.name || "";
    const className = map.school_class ? hass.states[map.school_class]?.state : undefined;

    const scores: Score[] = [];

    const attendance = map.attendance ? hass.states[map.attendance] : undefined;
    const totalRecords = attendance?.attributes.total_records as number | undefined;
    if (attendance && totalRecords) {
      const absences = Number(attendance.state) || 0;
      scores.push({
        key: "attendance",
        label: t(hass, "stat.attendance_score"),
        value: Math.round(((totalRecords - absences) / totalRecords) * 100),
        colorVar: "var(--lc-good)",
      });
    }

    const notices = map.behaviour_notices ? hass.states[map.behaviour_notices] : undefined;
    if (notices && !UNAVAILABLE.has(notices.state)) {
      scores.push({
        key: "behaviour",
        label: t(hass, "stat.behaviour_score"),
        value: Math.max(0, 100 - Number(notices.state) * 10),
        colorVar: "var(--lc-brand)",
      });
    }

    const overall = map.overall_average ? hass.states[map.overall_average] : undefined;
    if (overall && !UNAVAILABLE.has(overall.state)) {
      scores.push({
        key: "grades",
        label: t(hass, "stat.grades_score"),
        value: Math.round((Number(overall.state) / 6) * 100),
        colorVar: "var(--lc-amber)",
      });
    }

    const subjects = mapAllByTranslationKey(hass, deviceId, "subject_average");
    if (subjects.length) {
      const graded = subjects.filter((s) => {
        const count = hass.states[s.entityId]?.attributes.grade_count as number | undefined;
        return count && count > 0;
      }).length;
      scores.push({
        key: "activity",
        label: t(hass, "stat.activity_score"),
        value: Math.round((graded / subjects.length) * 100),
        colorVar: "var(--lc-brand)",
      });
    }

    if (scores.length === 0) return this._message("mdi:cards-outline", t(hass, "empty.generic_error"));

    const overallScore = Math.round(scores.reduce((sum, s) => sum + s.value, 0) / scores.length);

    return html`
      <ha-card class="tcard">
        <div class="tcard-inner">
          <div class="tcard-head">
            <div>
              <div class="tcard-name">${deviceName}</div>
              ${className ? html`<div class="tcard-class">${className}</div>` : nothing}
            </div>
            <div class="tcard-rating">
              <div class="v">${overallScore}</div>
              <div class="l">${t(hass, "stat.overall_rating")}</div>
            </div>
          </div>
          <div class="tcard-bars">
            ${scores.map(
              (s) => html`
                <div class="tbar-row">
                  <span class="name">${s.label}</span>
                  <span class="bar"
                    ><span style="width:${Math.max(4, Math.min(100, s.value))}%;background:${s.colorVar}"></span
                  ></span>
                  <span class="val">${s.value}</span>
                </div>
              `
            )}
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      ha-card.tcard {
        padding: 3px;
        background: linear-gradient(165deg, var(--lc-brand-strong), var(--lc-brand) 55%, var(--lc-amber) 165%);
      }
      .tcard-inner {
        background: var(--card-background-color);
        border-radius: 13px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .tcard-head {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      .tcard-name {
        font-weight: 700;
        font-size: 1rem;
      }
      .tcard-class {
        font-size: 0.7rem;
        color: var(--secondary-text-color);
      }
      .tcard-rating {
        text-align: right;
      }
      .tcard-rating .v {
        font-size: 1.6rem;
        font-weight: 800;
        color: var(--lc-amber);
        line-height: 1;
      }
      .tcard-rating .l {
        font-size: 0.6rem;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .tcard-bars {
        display: flex;
        flex-direction: column;
        gap: 7px;
      }
      .tbar-row {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .tbar-row .name {
        font-size: 0.68rem;
        color: var(--secondary-text-color);
        width: 78px;
        flex: none;
      }
      .tbar-row .bar {
        flex: 1;
        height: 6px;
        border-radius: 3px;
        background: var(--divider-color);
        overflow: hidden;
        display: block;
      }
      .tbar-row .bar span {
        display: block;
        height: 100%;
        border-radius: 3px;
      }
      .tbar-row .val {
        font-size: 0.68rem;
        font-weight: 800;
        width: 22px;
        text-align: right;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-student-card": LibrusStudentCard;
  }
}
