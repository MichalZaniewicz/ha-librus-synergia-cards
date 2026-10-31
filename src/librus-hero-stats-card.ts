import { html, svg, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig, LibrusHass } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { computeHeroStats, type HeroStat } from "./utils/hero-stats";
import type { SubjectStat } from "./utils/hero-archetypes";
import { numOrNull as num } from "./utils/format";
import { t } from "./utils/localize";
import { heroSubjectStat } from "./utils/forecast";

const SCALE_MAX = 10;

interface SemesterAttendance {
  total?: number;
  percentage?: number | null;
}

/** Attendance % of the current semester (the Attendance sensor's
 * `by_semester`), else of the whole year (`percentage`). */
function semesterAttendance(
  attendance: Record<string, unknown> | undefined,
  schoolClass: Record<string, unknown> | undefined
): number | null {
  const firstEnd = schoolClass?.first_semester_end as string | undefined;
  const today = new Date();
  const todayIso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const semester = firstEnd && todayIso > firstEnd.slice(0, 10) ? "2" : "1";
  const bySemester = attendance?.by_semester as Record<string, SemesterAttendance> | undefined;
  const current = bySemester?.[semester];
  if (current && (current.total ?? 0) > 0 && typeof current.percentage === "number") return current.percentage;
  return num(attendance?.percentage);
}
const PALETTE = ["1", "2", "3", "4", "5", "7"]; // --lc-chart-N, skipping 6 (a low-contrast neutral)
const CHART_WIDTH = 300;
const CHART_HEIGHT = 240;

/**
 * An RPG-style character sheet, computed from the same data
 * `librus-hero-card` uses (see `utils/hero-stats.ts`) - six stats, each
 * from exactly one real signal, always 0-10 regardless of the underlying
 * Librus grading scale. A separate card from the Hero/Archetype result on
 * purpose: that card's height is deliberately fixed to a 2-line name/desc
 * budget, and a 6-axis radar plus a stat sheet doesn't fit that contract.
 *
 * Redesigned 2026-09-17 after live feedback that the first version ("just
 * a radar chart + a plain number list") didn't read as a game stat sheet -
 * approved mockup: a "MOC" (power) badge in the header (sum of all six
 * stats), a bigger radar with a brand-colored glow, and each stat as an
 * icon + a filled progress bar instead of a bare legend row.
 */
@customElement("librus-hero-stats-card")
export class LibrusHeroStatsCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-hero-stats-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 3;
  }

  /**
   * A bespoke radar, not the shared `radarChart()` helper - that one is
   * also used by librus-grades-radar-card (subjects, no consistent icon
   * per axis) and shouldn't grow a one-off icon-vertex feature only this
   * card needs. Mirrors radarChart()'s own math (angle/point/rings) - see
   * that function's comments for the derivation.
   *
   * IMPORTANT: every per-shape template produced inside a `.map()` here
   * uses Lit's `svg` tag, never `html` - using `html` for an element
   * interpolated as a child of an outer `<svg>` creates that element in
   * the HTML namespace instead of SVG, which resolves a color via
   * getComputedStyle and shows NO console error, so it fails silently
   * (invisible) rather than throwing. Found live before, in this exact
   * card family (librus-subject-time-card's donut) - see
   * render-helpers.ts's own module comment for the full story. The one
   * exception is intentional: `<ha-icon>` inside `<foreignObject>` SHOULD
   * be HTML-namespaced, so that one nested template correctly uses `html`.
   */
  private _renderStatRadar(stats: HeroStat[], hass: LibrusHass): TemplateResult {
    const cx = CHART_WIDTH / 2;
    const cy = CHART_HEIGHT / 2 - 4;
    const maxR = Math.min(CHART_WIDTH, CHART_HEIGHT) / 2 - 44;
    const n = stats.length;
    const angle = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
    const point = (i: number, val: number): [number, number] => {
      const r = (Math.max(0, Math.min(SCALE_MAX, val)) / SCALE_MAX) * maxR;
      return [cx + r * Math.cos(angle(i)), cy + r * Math.sin(angle(i))];
    };

    const rings = [1 / 3, 2 / 3, 1].map((f) => stats.map((_, i) => point(i, SCALE_MAX * f).join(",")).join(" "));
    const axisEnds = stats.map((_, i) => point(i, SCALE_MAX));
    const dataPolygon = stats.map((s, i) => point(i, s.value).join(",")).join(" ");
    // Badge markers get a minimum radius floor (15% of max) purely so a
    // 0-value stat's icon doesn't pile up exactly on top of its
    // neighbours at dead center - the data polygon above stays
    // mathematically honest, only the icon *marker position* is floored.
    const badgePoints = stats.map((s, i) => point(i, Math.max(s.value, SCALE_MAX * 0.15)));

    return html`
      <svg width=${CHART_WIDTH} height=${CHART_HEIGHT} viewBox="0 0 ${CHART_WIDTH} ${CHART_HEIGHT}" class="radar-chart">
        ${rings.map((r) => svg`<polygon points=${r} class="radar-grid"></polygon>`)}
        ${axisEnds.map(([x, y]) => svg`<line x1=${cx} y1=${cy} x2=${x} y2=${y} class="radar-axis"></line>`)}
        <polygon points=${dataPolygon} class="radar-fill-polygon"></polygon>
        ${badgePoints.map(([x, y], i) => {
          const colorVar = `var(--lc-chart-${PALETTE[i % PALETTE.length]})`;
          return svg`
            <circle cx=${x} cy=${y} r="11" class="vertex-badge" style="stroke:${colorVar}"></circle>
            <foreignObject x=${x - 9} y=${y - 9} width="18" height="18">
              ${html`<div class="vertex-icon" style="color:${colorVar}"><ha-icon icon=${stats[i].icon}></ha-icon></div>`}
            </foreignObject>
          `;
        })}
        ${stats.map((s, i) => {
          // Outside the reach of a full stat's icon badge (r=11 at maxR),
          // which used to cover the label of a stat near 10 (found live).
          const cosA = Math.cos(angle(i));
          const sinA = Math.sin(angle(i));
          const r = maxR + 17;
          const lx = cx + r * cosA;
          const ly = cy + r * sinA + (sinA < -0.9 ? -2 : sinA > 0.9 ? 9 : 4);
          const anchor = Math.abs(cosA) < 0.3 ? "middle" : cosA > 0 ? "start" : "end";
          return svg`<text x=${lx} y=${ly} text-anchor=${anchor} class="radar-label">${t(hass, s.labelKey)}</text>`;
        })}
      </svg>
    `;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { deviceId, map } = resolved;
    const hass = this.hass;

    // Point-graded subjects count with their forecast grade (see heroSubjectStat).
    const subjects: SubjectStat[] = this._resolveAllByTranslationKey(deviceId, "subject_average").map((s) =>
      heroSubjectStat(s.subject, hass.states[s.entityId])
    );

    const attendance = map.attendance ? hass.states[map.attendance] : undefined;
    const schoolClass = map.school_class ? hass.states[map.school_class] : undefined;
    const behaviourGrade = map.behaviour_grade ? hass.states[map.behaviour_grade] : undefined;
    const rank = map.rank ? hass.states[map.rank] : undefined;

    const stats = computeHeroStats({
      subjects,
      attendancePercent: semesterAttendance(attendance?.attributes, schoolClass?.attributes),
      behaviourShortName:
        behaviourGrade && !["unknown", "unavailable"].includes(behaviourGrade.state) ? behaviourGrade.state : null,
      rankTier: rank && !["unknown", "unavailable"].includes(rank.state) ? rank.state : null,
    });

    if (stats.every((s) => s.value === 0)) {
      return this._message("mdi:arm-flex-outline", t(hass, "card.hero_stats.empty"));
    }

    const power = Math.round(stats.reduce((sum, s) => sum + s.value, 0));

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:arm-flex-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title ?? t(hass, "card.hero_stats.title")}</div>
            <div class="subtitle">${t(hass, "card.hero_stats.subtitle")}</div>
          </div>
          <div class="power-badge">
            <div class="power-n">${power}</div>
            <div class="power-l">${t(hass, "card.hero_stats.power")}</div>
          </div>
        </div>
        <div class="chart-wrap glow">${this._renderStatRadar(stats, hass)}</div>
        <div class="stat-bars">
          ${stats.map((s, i) => {
            const colorVar = `var(--lc-chart-${PALETTE[i % PALETTE.length]})`;
            return html`
              <div class="stat-row">
                <div class="stat-icon" style="background:color-mix(in srgb, ${colorVar} 16%, transparent); color:${colorVar}">
                  <ha-icon icon=${s.icon}></ha-icon>
                </div>
                <div class="stat-mid">
                  <span class="stat-name">${t(hass, s.labelKey)}</span>
                  <div class="stat-track">
                    <div class="stat-fill" style="width:${(s.value / SCALE_MAX) * 100}%; background:${colorVar}"></div>
                  </div>
                </div>
                <span class="stat-value" style="color:${colorVar}">${s.value.toFixed(1)}</span>
              </div>
            `;
          })}
        </div>
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .header {
        align-items: center;
      }
      .power-badge {
        margin-left: auto;
        flex: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        border-radius: 12px;
        background: linear-gradient(155deg, var(--lc-brand-bg), transparent);
        border: 1px solid var(--lc-brand);
      }
      .power-n {
        font-size: 1rem;
        font-weight: 800;
        color: var(--lc-brand);
        line-height: 1;
        font-variant-numeric: tabular-nums;
      }
      .power-l {
        font-size: 0.5rem;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--lc-brand-strong);
        margin-top: 2px;
      }
      .chart-wrap {
        display: flex;
        justify-content: center;
      }
      .chart-wrap svg {
        max-width: 100%;
        height: auto;
      }
      .radar-fill-polygon {
        fill: var(--lc-brand);
        fill-opacity: 0.24;
        stroke: var(--lc-brand);
        stroke-width: 2.5;
        stroke-linejoin: round;
      }
      .vertex-badge {
        fill: var(--ha-card-background, var(--card-background-color, #fff));
        stroke-width: 1.5;
      }
      .vertex-icon {
        width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .vertex-icon ha-icon {
        --mdc-icon-size: 12px;
      }
      .chart-wrap.glow svg {
        filter: drop-shadow(0 0 7px color-mix(in srgb, var(--lc-brand) 45%, transparent));
      }
      .stat-bars {
        display: flex;
        flex-direction: column;
        gap: 11px;
        margin-top: 4px;
      }
      .stat-row {
        display: grid;
        grid-template-columns: 28px 1fr auto;
        align-items: center;
        gap: 10px;
      }
      .stat-icon {
        width: 28px;
        height: 28px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: none;
      }
      .stat-icon ha-icon {
        --mdc-icon-size: 15px;
      }
      .stat-mid {
        min-width: 0;
      }
      .stat-name {
        display: block;
        font-size: 0.74rem;
        font-weight: 700;
        color: var(--primary-text-color);
        margin-bottom: 3px;
      }
      .stat-track {
        height: 6px;
        border-radius: 4px;
        background: var(--lc-ring-track);
        overflow: hidden;
      }
      .stat-fill {
        height: 100%;
        border-radius: 4px;
      }
      .stat-value {
        font-size: 0.78rem;
        font-weight: 800;
        font-variant-numeric: tabular-nums;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-hero-stats-card": LibrusHeroStatsCard;
  }
}
