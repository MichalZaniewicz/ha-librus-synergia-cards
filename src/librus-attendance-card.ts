import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { segmentedBar, type BarSegment } from "./utils/render-helpers";
import { t } from "./utils/localize";

// Fallback ONLY, for an older librus_synergia (pre-0.4.16) that doesn't yet
// expose `presence_by_type` - anchored to the START of the name so it
// doesn't match "Nieobecność" (absence), which contains "obecność" as a
// literal substring (a real bug: both "Obecność" and "Nieobecność" used to
// render with the same color because of that). Even anchored, this is
// still a guess from Polish text - it can't know that "Spóźnienie"/late or
// "Zwolnienie"/excused-release also count as presence for THIS school, only
// `presence_by_type` (sourced from the school's own AttendanceTypes
// config) knows that.
const PRESENT_HINT = /^obecno|^present/i;

// A second, purely cosmetic guess: an EXCUSED absence ("Nieobecność
// uspr.") is still `presence_by_type: false` (the student genuinely
// wasn't there - Librus's own IsPresenceKind correctly says so, and the
// main absence count must keep including it), but visually lumping it in
// with a plain unexcused "Nieobecność" under the same red/bad color hides
// a real distinction a parent cares about: one is already resolved, the
// other may still need action. Librus has no separate "is this an excused
// type" flag - "uspr." (skrót od "usprawiedliwiona") is the only signal in
// the type's own name, same class of best-effort text match as
// PRESENT_HINT above.
const EXCUSED_HINT = /uspr\.?/i;

type AttendanceStatus = "good" | "warn" | "bad";

function attendanceStatus(name: string, presenceByType: Record<string, boolean> | undefined): AttendanceStatus {
  const isPresent = presenceByType?.[name] ?? PRESENT_HINT.test(name);
  if (isPresent) return "good";
  return EXCUSED_HINT.test(name) ? "warn" : "bad";
}

@customElement("librus-attendance-card")
export class LibrusAttendanceCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-attendance-card" };
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

    const entity = map.attendance ? hass.states[map.attendance] : undefined;
    if (!entity) return this._message("mdi:calendar-remove", t(hass, "empty.generic_error"));

    const breakdown = (entity.attributes.breakdown as Record<string, number> | undefined) ?? {};
    const presenceByType = entity.attributes.presence_by_type as Record<string, boolean> | undefined;
    const total = (entity.attributes.total_records as number | undefined) ?? 0;
    const percentage = entity.attributes.percentage as number | null | undefined;
    const bySemester =
      (entity.attributes.by_semester as
        | Record<string, { total: number; present: number; percentage: number | null }>
        | undefined) ?? {};
    const semesters = Object.entries(bySemester).sort(([a], [b]) => Number(a) - Number(b));
    const absences = Number(entity.state) || 0;
    // BUG FIX (2026-09-07, found live): the blended "Nieobecności" stat
    // meant a parent had to read the legend below to see whether the "1"
    // needed their attention or was already resolved - split into its own
    // two stat tiles instead, same split the tile/summary cards already
    // use. Requires ha-librus-synergia 0.4.19+; on an older backend
    // (`unexcused_count` absent) falls back to the original single
    // blended stat rather than presenting a guessed split as real.
    const unexcused = entity.attributes.unexcused_count as number | undefined;
    const excused = entity.attributes.excused_count as number | undefined;
    const hasSplit = unexcused !== undefined;
    const entries = Object.entries(breakdown);
    const statusColorVar: Record<AttendanceStatus, string> = {
      good: "var(--lc-good)",
      warn: "var(--lc-warn)",
      bad: "var(--lc-bad)",
    };

    const segments: BarSegment[] = entries.map(([name, count]) => ({
      flexGrow: Math.max(count, 0.001),
      colorVar: statusColorVar[attendanceStatus(name, presenceByType)],
      title: `${name}: ${count}`,
    }));

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge bad"><ha-icon icon="mdi:calendar-remove"></ha-icon></div>
          <div class="title-block">
            <div class="title">${t(hass, "card.attendance.title")}</div>
            <div class="subtitle">${t(hass, "card.attendance.subtitle")}</div>
          </div>
        </div>
        <div class="stats">
          ${percentage != null
            ? html`
                <div class="stat ${percentage >= 90 ? "good" : percentage < 75 ? "bad" : ""}">
                  <div class="stat-value">${percentage}<span class="unit">%</span></div>
                  <div class="stat-label">${t(hass, "stat.percentage")}</div>
                </div>
              `
            : nothing}
          ${hasSplit
            ? html`
                <div class="stat ${unexcused! > 0 ? "bad" : ""}">
                  <div class="stat-value">${unexcused}</div>
                  <div class="stat-label">${t(hass, "stat.unexcused")}</div>
                </div>
                <div class="stat ${excused! > 0 ? "warn" : ""}">
                  <div class="stat-value">${excused}</div>
                  <div class="stat-label">${t(hass, "stat.excused")}</div>
                </div>
              `
            : html`
                <div class="stat bad">
                  <div class="stat-value">${absences}</div>
                  <div class="stat-label">${t(hass, "stat.absences")}</div>
                </div>
              `}
          <div class="stat">
            <div class="stat-value">${total}</div>
            <div class="stat-label">${t(hass, "stat.records")}</div>
          </div>
        </div>
        ${segments.length ? segmentedBar(segments) : nothing}
        ${entries.length
          ? html`
              <div class="legend">
                ${entries.map(
                  ([name, count]) => html`
                    <span class="legend-item">
                      <span class="legend-dot ${attendanceStatus(name, presenceByType)}"></span>${name}
                      <b>${count}</b>
                    </span>
                  `
                )}
              </div>
            `
          : nothing}
        ${semesters.length > 1
          ? html`
              <hr />
              <div class="semester-block">
                <div class="semester-title">${t(hass, "card.attendance.by_semester")}</div>
                ${semesters.map(
                  ([n, s]) => html`
                    <div class="semester-row">
                      <span>${t(hass, "card.attendance.semester", { n })}</span>
                      <span class="semester-pct">${s.percentage != null ? `${s.percentage}%` : "–"}</span>
                    </div>
                  `
                )}
              </div>
            `
          : nothing}
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .legend {
        display: flex;
        flex-wrap: wrap;
        gap: 8px 14px;
        font-size: 0.7rem;
        color: var(--secondary-text-color);
      }
      .legend-item {
        display: inline-flex;
        align-items: center;
        gap: 5px;
      }
      .legend-item b {
        color: var(--primary-text-color);
      }
      .legend-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        display: inline-block;
      }
      .legend-dot.good {
        background: var(--lc-good);
      }
      .legend-dot.bad {
        background: var(--lc-bad);
      }
      .legend-dot.warn {
        background: var(--lc-warn);
      }
      .semester-title {
        font-size: 0.65rem;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.04em;
        margin-bottom: 4px;
      }
      .semester-row {
        display: flex;
        justify-content: space-between;
        font-size: 0.78rem;
        padding: 3px 0;
      }
      .semester-pct {
        font-weight: 700;
        font-variant-numeric: tabular-nums;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-attendance-card": LibrusAttendanceCard;
  }
}
