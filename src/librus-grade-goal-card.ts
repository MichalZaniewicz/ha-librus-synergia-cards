import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { progressRing } from "./utils/render-helpers";
import { t } from "./utils/localize";
import { librusCardEditor } from "./utils/card-editor";
import { tapAction } from "./utils/actions";
import { pointSubjectOf, predictedGrade, sixesToReach, subjectForecast, type PointSubject } from "./utils/forecast";
import { formatNumber } from "./utils/format";

interface GradeLogEntry {
  value: string;
}

const MAX_GRADE = 6;
const DEFAULT_TARGET = 4.5;

/**
 * A motivational "am I on track for the average I want" card. Pick a
 * subject (or leave it on the overall average) and a target in the card
 * config; the card shows a progress ring toward that target and a rough
 * "how many more top grades would get me there" estimate.
 *
 * The estimate is deliberately simple - it treats each future grade as
 * unweighted and assumes a straight "6" - so it's a nudge, not a
 * prediction. All local computation from the average sensors' own state
 * and `grade_count` / `grades` attributes; no backend change needed.
 */
@customElement("librus-grade-goal-card")
export class LibrusGradeGoalCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-grade-goal-card", target: DEFAULT_TARGET };
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

    const subjects = this._resolveAllByTranslationKey(deviceId, "subject_average");
    const subjectMatch =
      this._config.subject_id !== undefined
        ? subjects.find((s) => s.subjectId === this._config!.subject_id)
        : undefined;

    const entityId = subjectMatch ? subjectMatch.entityId : map.overall_average;
    const entityState = entityId ? hass.states[entityId] : undefined;
    const points = subjectMatch ? pointSubjectOf(hass, map, entityState) : undefined;
    if (subjectMatch && points && entityId) return this._renderPoints(subjectMatch.subject, points, entityId);
    const current = Number(entityState?.state);

    if (!entityState || Number.isNaN(current)) {
      return this._message("mdi:target", t(hass, "card.grade_goal.empty"));
    }

    const target = this._config.target ?? DEFAULT_TARGET;
    const count = subjectMatch
      ? Number(entityState.attributes.grade_count) || 0
      : subjects.reduce(
          (sum, s) =>
            sum + ((hass.states[s.entityId]?.attributes.grades as GradeLogEntry[] | undefined)?.length ?? 0),
          0
        );

    const reached = current >= target;
    const pct =
      target <= 1
        ? reached
          ? 100
          : 0
        : Math.max(0, Math.min(100, ((current - 1) / (target - 1)) * 100));
    // Exact with the integration's forecast attributes (subject goal), else
    // the rough unweighted estimate.
    const forecast = subjectMatch ? subjectForecast(entityState) : undefined;
    const exact = forecast !== undefined && forecast.weight > 0;
    const needed = reached
      ? null
      : exact
        ? sixesToReach(forecast.average, forecast.weight, target)
        : target < MAX_GRADE && count > 0
          ? Math.ceil((count * (target - current)) / (MAX_GRADE - target))
          : null;
    const reportForecast = subjectMatch
      ? forecast?.predicted
      : map.grade_forecast
        ? Number(hass.states[map.grade_forecast]?.state)
        : undefined;

    return html`
      <ha-card ${tapAction(this, this._config.tap_action, entityId)}>
        <div class="header">
          <div class="icon-badge ${reached ? "good" : ""}">
            <ha-icon icon=${reached ? "mdi:flag-checkered" : "mdi:target"}></ha-icon>
          </div>
          <div class="title-block">
            <div class="title">${this._config.title ?? subjectMatch?.subject ?? t(hass, "card.grade_goal.title")}</div>
            <div class="subtitle">
              ${subjectMatch ? t(hass, "card.grade_goal.title") : t(hass, "card.grade_goal.subtitle_overall")}
            </div>
          </div>
        </div>
        <div class="ring-row">
          ${progressRing(Math.round(pct), reached ? "var(--lc-good)" : "var(--lc-brand)", 68, 7)}
          <div>
            <div class="ring-num">${current.toFixed(2)}</div>
            <div class="ring-label">${t(hass, "label.current")}</div>
          </div>
        </div>
        <hr />
        <div class="stats">
          <div class="stat">
            <div class="stat-value">${target.toFixed(2)}</div>
            <div class="stat-label">${t(hass, "label.target")}</div>
          </div>
          <div class="stat ${reached ? "good" : ""}">
            <div class="stat-value">
              ${reached
                ? t(hass, "card.grade_goal.reached")
                : needed !== null
                  ? t(hass, exact ? "label.sixes_needed_exact" : "label.sixes_needed", { n: needed })
                  : "—"}
            </div>
            <div class="stat-label">${reached || needed === null ? "" : t(hass, "label.to_go")}</div>
          </div>
          ${reportForecast !== undefined && !Number.isNaN(reportForecast)
            ? html`<div class="stat">
                <div class="stat-value">
                  ${subjectMatch
                    ? reportForecast
                    : formatNumber(reportForecast, hass.language, { maximumFractionDigits: 2 })}
                </div>
                <div class="stat-label">
                  ${t(hass, subjectMatch ? "label.forecast" : "label.forecast_report_average")}
                </div>
              </div>`
            : nothing}
        </div>
      </ha-card>
    `;
  }

  /**
   * A subject graded in points: the goal is a grade (the `target` rounded
   * up, 2-6), its threshold comes from the subject's scale, and the hint
   * says how many full-score tests of the usual size would get there.
   */
  private _renderPoints(subject: string, p: PointSubject, entityId: string): TemplateResult {
    const hass = this.hass!;
    const one = (v: number) => formatNumber(v, hass.language, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    const goal = Math.min(6, Math.max(2, Math.ceil(this._config?.target ?? DEFAULT_TARGET)));
    const need = p.thresholds?.[goal - 2];
    const now = p.percentage;
    const reached = need !== undefined && now >= need;
    let needed: number | null = null;
    if (need !== undefined && !reached && need < 100) {
      let earned = p.earned;
      let possible = p.possible;
      for (let n = 1; n <= 50; n++) {
        earned += p.typicalMax;
        possible += p.typicalMax;
        if ((100 * earned) / possible >= need) {
          needed = n;
          break;
        }
      }
    }
    const ring = need ? Math.max(0, Math.min(100, (now / need) * 100)) : 0;
    const predicted = p.thresholds ? predictedGrade(now, p.thresholds) : undefined;
    return html`
      <ha-card ${tapAction(this, this._config?.tap_action, entityId)}>
        <div class="header">
          <div class="icon-badge ${reached ? "good" : ""}">
            <ha-icon icon=${reached ? "mdi:flag-checkered" : "mdi:target"}></ha-icon>
          </div>
          <div class="title-block">
            <div class="title">${this._config?.title ?? subject}</div>
            <div class="subtitle">${t(hass, "card.grade_goal.target_grade", { grade: goal })}</div>
          </div>
        </div>
        <div class="ring-row">
          ${progressRing(Math.round(ring), reached ? "var(--lc-good)" : "var(--lc-brand)", 68, 7)}
          <div>
            <div class="ring-num">${one(now)}%</div>
            <div class="ring-label">${t(hass, "label.current")}</div>
          </div>
        </div>
        <hr />
        <div class="stats">
          <div class="stat">
            <div class="stat-value">${need !== undefined ? `${need}%` : "—"}</div>
            <div class="stat-label">
              ${need !== undefined ? t(hass, "label.threshold_for", { grade: goal }) : t(hass, "label.no_point_scale")}
            </div>
          </div>
          <div class="stat ${reached ? "good" : ""}">
            <div class="stat-value">
              ${reached
                ? t(hass, "card.grade_goal.reached")
                : needed !== null
                  ? t(hass, "label.full_scores_needed", { n: needed, score: `${p.typicalMax}/${p.typicalMax}` })
                  : "—"}
            </div>
            <div class="stat-label">${reached || needed === null ? "" : t(hass, "label.to_go")}</div>
          </div>
          <div class="stat">
            <div class="stat-value">${predicted ?? "—"}</div>
            <div class="stat-label">${t(hass, "label.forecast")}</div>
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .ring-row {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .ring-num {
        font-size: 1.7rem;
        font-weight: 800;
        font-variant-numeric: tabular-nums;
        line-height: 1.1;
        color: var(--lc-brand);
      }
      .ring-label {
        font-size: 0.72rem;
        color: var(--secondary-text-color);
      }
      .stat .stat-value {
        font-size: 0.95rem;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-grade-goal-card": LibrusGradeGoalCard;
  }
}
