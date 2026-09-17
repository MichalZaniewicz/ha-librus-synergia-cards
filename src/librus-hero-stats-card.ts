import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { mapAllByTranslationKey } from "./utils/entities";
import { radarChart, type RadarAxis } from "./utils/render-helpers";
import { computeHeroStats } from "./utils/hero-stats";
import type { SubjectStat } from "./utils/hero-archetypes";
import { t } from "./utils/localize";

const SCALE_MAX = 10;
const PALETTE = ["1", "2", "3", "4", "5", "7"]; // --lc-chart-N, skipping 6 (a low-contrast neutral)

function num(v: unknown): number | null {
  if (v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

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

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { deviceId, map } = resolved;
    const hass = this.hass;

    const subjects: SubjectStat[] = mapAllByTranslationKey(hass, deviceId, "subject_average").map((s) => {
      const state = hass.states[s.entityId];
      const gradeCount = ((state?.attributes.grades as { value: string }[] | undefined) ?? []).length;
      return { subject: s.subject, average: state ? num(state.state) : null, gradeCount };
    });

    const attendanceStreak = map.attendance_streak ? hass.states[map.attendance_streak] : undefined;
    const behaviourGrade = map.behaviour_grade ? hass.states[map.behaviour_grade] : undefined;
    const rank = map.rank ? hass.states[map.rank] : undefined;

    const stats = computeHeroStats({
      subjects,
      attendanceStreak: num(attendanceStreak?.state),
      behaviourShortName:
        behaviourGrade && !["unknown", "unavailable"].includes(behaviourGrade.state) ? behaviourGrade.state : null,
      rankTier: rank && !["unknown", "unavailable"].includes(rank.state) ? rank.state : null,
    });

    if (stats.every((s) => s.value === 0)) {
      return this._message("mdi:arm-flex-outline", t(hass, "card.hero_stats.empty"));
    }

    const axes: RadarAxis[] = stats.map((s) => ({ label: t(hass, s.labelKey), value: s.value }));
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
        <div class="chart-wrap glow">${radarChart(axes, { max: SCALE_MAX, width: 260, height: 240 })}</div>
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
