import { html, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { mapAllByTranslationKey } from "./utils/entities";
import { donutChart, type DonutSegment } from "./utils/render-helpers";
import { t } from "./utils/localize";

interface GradeLogEntry {
  category: string | null;
}

// Cycled through in insertion order (first-seen category gets the first
// color) - categories are per-school data (Sprawdzian/Kartkówka/Odpowiedź/
// ...), not a fixed enum this repo can hardcode colors for by name.
const PALETTE = [
  "var(--lc-brand)",
  "var(--lc-good)",
  "var(--lc-warn)",
  "var(--lc-bad)",
  "var(--lc-amber)",
  "var(--lc-brand-strong)",
  "var(--lc-neutral-dot)",
];

/**
 * How the year's grades split across categories (Sprawdzian/Kartkówka/
 * Odpowiedź/...) - a donut over the same `grades` attribute
 * `librus-grade-log-card`/`librus-grade-distribution-card` already read,
 * just grouped by `category` instead of by numeric value. No backend
 * changes needed.
 */
@customElement("librus-grade-category-distribution-card")
export class LibrusGradeCategoryDistributionCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement("librus-device-editor") as LovelaceCardEditor;
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-grade-category-distribution-card" };
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

    const counts = new Map<string, number>();
    for (const s of mapAllByTranslationKey(hass, deviceId, "subject_average")) {
      const grades = (hass.states[s.entityId]?.attributes.grades as GradeLogEntry[] | undefined) ?? [];
      for (const g of grades) {
        const key = g.category ?? "__uncategorized";
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
    }

    const total = [...counts.values()].reduce((a, b) => a + b, 0);
    if (total === 0) {
      return this._message("mdi:chart-donut", t(hass, "card.grade_category_distribution.empty"));
    }

    const entries = [...counts.entries()].sort((a, b) => b[1] - a[1]);
    const segments: DonutSegment[] = entries.map(([category, value], i) => ({
      value,
      colorVar: PALETTE[i % PALETTE.length],
      label: category === "__uncategorized" ? t(hass, "card.grade_category_distribution.uncategorized") : category,
    }));

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-donut"></ha-icon></div>
          <div class="title-block">
            <div class="title">${t(hass, "card.grade_category_distribution.title")}</div>
            <div class="subtitle">${t(hass, "card.grade_category_distribution.subtitle")}</div>
          </div>
        </div>
        <div class="chart-wrap">${donutChart(segments, { centerLabel: t(hass, "unit.grades") })}</div>
        <div class="legend">
          ${segments.map(
            (s) => html`
              <span class="legend-item">
                <span class="dot" style="background:${s.colorVar}"></span>${s.label} <b>${s.value}</b>
              </span>
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
    "librus-grade-category-distribution-card": LibrusGradeCategoryDistributionCard;
  }
}
