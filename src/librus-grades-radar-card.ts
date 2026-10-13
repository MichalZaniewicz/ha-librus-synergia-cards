import { html, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { radarChart, type RadarAxis } from "./utils/render-helpers";
import { abbreviate } from "./utils/subjects";
import { t } from "./utils/localize";
import { pointsPercentage, subjectForecast } from "./utils/forecast";
import { formatNumber } from "./utils/format";

const MIN_SUBJECTS = 3; // fewer than 3 axes degenerates to a line, not a shape
const SCALE_MAX = 6; // Polish grading scale

/**
 * Every subject's average on one radar/spider chart - lets a strong or weak
 * subject stand out at a glance instead of scanning a list of numbers.
 * Reads the same per-subject average sensors `librus-grades-card` and
 * `librus-subject-spotlight-card` already use - no backend changes needed.
 */
@customElement("librus-grades-radar-card")
export class LibrusGradesRadarCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-grades-radar-card" };
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
    const { deviceId } = resolved;
    const hass = this.hass;

    const axes: RadarAxis[] = [];
    for (const s of this._resolveAllByTranslationKey(deviceId, "subject_average")) {
      const state = hass.states[s.entityId];
      const value = state !== undefined ? Number(state.state) : NaN;
      if (Number.isFinite(value)) {
        axes.push({ label: abbreviate(s.subject), title: s.subject, value });
        continue;
      }
      // A point-graded subject has no 1-6 average - it goes on the chart
      // with the grade its percentage forecasts (integration option
      // "Point grade forecast thresholds"), the percentage in the tooltip.
      const percentage = pointsPercentage(state);
      const predicted = subjectForecast(state)?.predicted;
      if (percentage !== undefined && predicted !== undefined) {
        const pct = formatNumber(percentage, hass.language, { maximumFractionDigits: 1 });
        axes.push({ label: abbreviate(s.subject), title: `${s.subject}: ${pct} % → ${predicted}`, value: predicted });
      }
    }
    distinctLabels(axes);

    if (axes.length < MIN_SUBJECTS) {
      return this._message("mdi:chart-timeline-variant", t(hass, "card.grades_radar.empty"));
    }

    const average = axes.reduce((sum, a) => sum + a.value, 0) / axes.length;

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-timeline-variant"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title ?? t(hass, "card.grades_radar.title")}</div>
            <div class="subtitle">${t(hass, "card.grades_radar.subtitle")}</div>
          </div>
        </div>
        <div class="chart-wrap">${radarChart(axes, { max: SCALE_MAX })}</div>
        <div class="legend">
          <span class="legend-item">
            <span class="dot" style="background:var(--lc-brand)"></span>
            ${t(hass, "label.average")} <b>${average.toFixed(2)}</b>
          </span>
        </div>
      </ha-card>
    `;
  }

  static styles = [librusTokens, librusSharedStyles];
}

/** Two subjects can shorten to the same label ("język angielski" and
 * "język angielski zawodowy" are both "Ang") and then overlap on the chart -
 * each repeat gets the start of the word that tells it apart ("Ang zaw"). */
function distinctLabels(axes: RadarAxis[]): void {
  const byLabel = new Map<string, RadarAxis[]>();
  for (const axis of axes) byLabel.set(axis.label, [...(byLabel.get(axis.label) ?? []), axis]);
  for (const group of byLabel.values()) {
    if (group.length < 2) continue;
    const names = group.map((a) => (a.title ?? a.label).split(":")[0].trim().split(/\s+/));
    group.forEach((axis, i) => {
      const extra = names[i].find((word, j) => names.some((other, k) => k !== i && other[j] !== word));
      if (extra && extra.length) axis.label = `${axis.label} ${extra.slice(0, 3).toLowerCase()}`;
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-grades-radar-card": LibrusGradesRadarCard;
  }
}
