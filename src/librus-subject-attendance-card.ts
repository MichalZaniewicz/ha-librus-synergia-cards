import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { t } from "./utils/localize";
import { abbreviate } from "./utils/subjects";
import { formatNumber } from "./utils/format";

interface SubjectAttendance {
  total: number;
  present: number;
  absent: number;
  percentage: number;
}

/** Same threshold as the backend's `_SUBJECT_ATTENDANCE_MIN_RECORDS`: with
 * fewer lessons a percentage says nothing (2 lessons, 2 absences = 0%). */
const MIN_RECORDS = 5;
/** Same line as the backend's `at_risk` attribute. */
const RISK_BELOW = 50;
const WARN_BELOW = 90;

type Level = "good" | "warn" | "bad" | "few";

const levelOf = (s: SubjectAttendance): Level =>
  s.total < MIN_RECORDS ? "few" : s.percentage < RISK_BELOW ? "bad" : s.percentage < WARN_BELOW ? "warn" : "good";

/**
 * Attendance per subject as a grid of tiles (approved mockup variant B,
 * 2026-10-07): the usual subject abbreviation, the % present and
 * present/total, coloured by how close it is to the 50% line. Reads the
 * "Lowest subject attendance" sensor's `subjects` attribute (backend
 * 0.9.0+); subjects with fewer than 5 lessons are greyed out and last.
 */
@customElement("librus-subject-attendance-card")
export class LibrusSubjectAttendanceCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-subject-attendance-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 4;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { map } = resolved;
    const hass = this.hass;

    const sensor = map.subject_attendance ? hass.states[map.subject_attendance] : undefined;
    if (!sensor) {
      return this._message(
        "mdi:calendar-check-outline",
        t(hass, "card.subject_attendance.title"),
        t(hass, "card.subject_attendance.needs_backend")
      );
    }
    const subjects = (sensor.attributes.subjects as Record<string, SubjectAttendance> | undefined) ?? {};
    const rows = Object.entries(subjects)
      .map(([name, s]) => ({ name, ...s, level: levelOf(s) }))
      .sort(
        (a, b) =>
          Number(a.level === "few") - Number(b.level === "few") ||
          a.percentage - b.percentage ||
          b.total - a.total
      );
    if (rows.length === 0) {
      return this._message("mdi:calendar-check-outline", t(hass, "card.subject_attendance.empty"));
    }

    const counted = rows.filter((r) => r.level !== "few");
    const lowest = counted[0];
    const risk = counted.filter((r) => r.level === "bad").length;
    const pct = (v: number) =>
      `${formatNumber(v, hass.language, { maximumFractionDigits: 1 })}%`;

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge ${risk ? "bad" : "good"}"><ha-icon icon="mdi:calendar-check-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title ?? t(hass, "card.subject_attendance.title")}</div>
            ${lowest
              ? html`<div class="subtitle">
                  ${t(hass, "card.subject_attendance.lowest")} <b>${lowest.name} ${pct(lowest.percentage)}</b>
                </div>`
              : nothing}
          </div>
          <span class="pill ${risk ? "bad" : "good"}"
            >${risk
              ? t(hass, "card.subject_attendance.at_risk", { count: risk })
              : t(hass, "card.subject_attendance.no_risk")}</span
          >
        </div>
        <div class="tiles">
          ${rows.map(
            (r) => html`
              <div
                class="tile ${r.level}"
                title=${t(hass, "card.subject_attendance.tooltip", {
                  subject: r.name,
                  present: r.present,
                  total: r.total,
                })}
              >
                <div class="ab">${abbreviate(r.name)}</div>
                <div class="v">${r.level === "few" ? "–" : `${Math.round(r.percentage)}%`}</div>
                <div class="n">${r.present}/${r.total}</div>
              </div>
            `
          )}
        </div>
        <div class="legend">
          <span class="legend-item"><span class="dot" style="background:var(--lc-good)"></span>${t(hass, "card.subject_attendance.legend_good")}</span>
          <span class="legend-item"><span class="dot" style="background:var(--lc-warn)"></span>${t(hass, "card.subject_attendance.legend_warn")}</span>
          <span class="legend-item"><span class="dot" style="background:var(--lc-bad)"></span>${t(hass, "card.subject_attendance.legend_bad")}</span>
          <span class="legend-item"><span class="dot" style="background:var(--lc-neutral-dot)"></span>${t(hass, "card.subject_attendance.legend_few")}</span>
        </div>
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .subtitle b {
        color: var(--primary-text-color);
      }
      .pill {
        margin-left: auto;
        flex: none;
        font-size: 0.72rem;
        font-weight: 700;
        padding: 3px 9px;
        border-radius: 999px;
        white-space: nowrap;
      }
      .pill.good {
        background: var(--lc-good-bg);
        color: var(--lc-good);
      }
      .pill.bad {
        background: var(--lc-bad-bg);
        color: var(--lc-bad);
      }
      .tiles {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
        gap: 7px;
      }
      .tile {
        border-radius: 9px;
        padding: 8px 4px 7px;
        text-align: center;
        background: var(--lc-chip-bg);
        border: 1px solid transparent;
      }
      .tile .ab {
        font-size: 0.72rem;
        font-weight: 700;
        color: var(--secondary-text-color);
      }
      .tile .v {
        font-size: 0.95rem;
        font-weight: 800;
        font-variant-numeric: tabular-nums;
        margin-top: 2px;
      }
      .tile .n {
        font-size: 0.64rem;
        color: var(--secondary-text-color);
        font-variant-numeric: tabular-nums;
      }
      .tile.good .v {
        color: var(--lc-good);
      }
      .tile.warn {
        background: var(--lc-warn-bg);
      }
      .tile.warn .v {
        color: var(--lc-warn);
      }
      .tile.bad {
        background: var(--lc-bad-bg);
        border-color: var(--lc-bad);
      }
      .tile.bad .v {
        color: var(--lc-bad);
      }
      .tile.few .v {
        color: var(--secondary-text-color);
        font-weight: 500;
        font-size: 0.8rem;
      }
    `,
  ];
}
