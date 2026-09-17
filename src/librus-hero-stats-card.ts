import { html, nothing, type TemplateResult } from "lit";
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
 * budget, and a 6-axis radar plus legend doesn't fit that contract.
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

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:arm-flex-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title ?? t(hass, "card.hero_stats.title")}</div>
            <div class="subtitle">${t(hass, "card.hero_stats.subtitle")}</div>
          </div>
        </div>
        <div class="chart-wrap">${radarChart(axes, { max: SCALE_MAX })}</div>
        <div class="legend-grid">
          ${stats.map(
            (s, i) => html`
              <div class="legend-cell">
                <span class="dot" style="background:var(--lc-chart-${PALETTE[i % PALETTE.length]})"></span>
                <span class="name">${t(hass, s.labelKey)}</span>
                <b>${s.value.toFixed(1)}</b>
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
    "librus-hero-stats-card": LibrusHeroStatsCard;
  }
}
