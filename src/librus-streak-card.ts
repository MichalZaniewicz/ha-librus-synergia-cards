import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { daysBetween } from "./utils/format";
import { t } from "./utils/localize";
import { tapActionHandler, isActionable } from "./utils/actions";

const UNAVAILABLE = new Set(["unknown", "unavailable", ""]);

interface StreakStat {
  key: string;
  label: string;
  value: number;
  unit?: string;
}

/**
 * Three gamification "passy" (streaks) side by side - attendance,
 * behaviour, good grades. Reads the dedicated `attendance_streak`/
 * `behaviour_streak`/`good_grade_streak` sensors (ha-librus-synergia
 * 0.6.0+) directly rather than re-deriving them client-side.
 *
 * Attendance falls back to the OLD client-side computation (from the
 * Attendance sensor's `last_absence_date` + the Class sensor's
 * `school_year_start`) for a backend older than 0.6.0 - this card used to
 * ONLY do that computation, for attendance alone, before the backend grew
 * dedicated streak sensors. Behaviour/good-grade streaks have no such
 * fallback (brand new concepts) - they simply don't show a row on an
 * older backend, same "degrade gracefully, never fabricate" precedent as
 * librus-student-card.
 */
@customElement("librus-streak-card")
export class LibrusStreakCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement("librus-device-editor") as LovelaceCardEditor;
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-streak-card" };
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
    const daysUnit = t(hass, "label.days");

    const stats: StreakStat[] = [];

    const attendanceStreak = map.attendance_streak ? hass.states[map.attendance_streak] : undefined;
    if (attendanceStreak && !UNAVAILABLE.has(attendanceStreak.state)) {
      stats.push({
        key: "attendance",
        label: t(hass, "card.streak.attendance"),
        value: Number(attendanceStreak.state),
        unit: daysUnit,
      });
    } else {
      const attendance = map.attendance ? hass.states[map.attendance] : undefined;
      const lastAbsence = attendance?.attributes.last_absence_date as string | undefined;
      const schoolYearStart = map.school_class
        ? (hass.states[map.school_class]?.attributes.school_year_start as string | undefined)
        : undefined;
      const since = lastAbsence
        ? new Date(`${lastAbsence}T00:00:00`)
        : schoolYearStart
          ? new Date(`${schoolYearStart}T00:00:00`)
          : undefined;
      if (since) {
        stats.push({
          key: "attendance",
          label: t(hass, "card.streak.attendance"),
          value: Math.max(0, daysBetween(since, new Date())),
          unit: daysUnit,
        });
      }
    }

    const behaviourStreak = map.behaviour_streak ? hass.states[map.behaviour_streak] : undefined;
    if (behaviourStreak && !UNAVAILABLE.has(behaviourStreak.state)) {
      stats.push({
        key: "behaviour",
        label: t(hass, "card.streak.behaviour"),
        value: Number(behaviourStreak.state),
        unit: daysUnit,
      });
    }

    const gradeStreak = map.good_grade_streak ? hass.states[map.good_grade_streak] : undefined;
    if (gradeStreak && !UNAVAILABLE.has(gradeStreak.state)) {
      stats.push({
        key: "grades",
        label: t(hass, "card.streak.grades"),
        value: Number(gradeStreak.state),
      });
    }

    if (stats.length === 0) return this._message("mdi:fire", t(hass, "empty.generic_error"));

    return html`
      <ha-card
        class=${isActionable(this._config.tap_action) ? "" : "static"}
        @click=${tapActionHandler(this, this._config.tap_action, map.attendance_streak ?? map.attendance)}
      >
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:fire"></ha-icon></div>
          <div class="title-block">
            <div class="title">${t(hass, "card.streak.title")}</div>
          </div>
        </div>
        <div class="stats">
          ${stats.map(
            (s) => html`
              <div class="stat">
                <div class="stat-value">${s.value}${s.unit ? html`<span class="unit">${s.unit}</span>` : nothing}</div>
                <div class="stat-label">${s.label}</div>
              </div>
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
    "librus-streak-card": LibrusStreakCard;
  }
}
