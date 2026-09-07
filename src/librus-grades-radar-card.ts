import { html, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { mapAllByTranslationKey } from "./utils/entities";
import { radarChart, type RadarAxis } from "./utils/render-helpers";
import { t } from "./utils/localize";

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
    return document.createElement("librus-device-editor") as LovelaceCardEditor;
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
    for (const s of mapAllByTranslationKey(hass, deviceId, "subject_average")) {
      const raw = hass.states[s.entityId]?.state;
      const value = raw !== undefined ? Number(raw) : NaN;
      if (Number.isFinite(value)) axes.push({ label: s.subject, value });
    }

    if (axes.length < MIN_SUBJECTS) {
      return this._message("mdi:chart-timeline-variant", t(hass, "card.grades_radar.empty"));
    }

    const average = axes.reduce((sum, a) => sum + a.value, 0) / axes.length;

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-timeline-variant"></ha-icon></div>
          <div class="title-block">
            <div class="title">${t(hass, "card.grades_radar.title")}</div>
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

declare global {
  interface HTMLElementTagNameMap {
    "librus-grades-radar-card": LibrusGradesRadarCard;
  }
}
