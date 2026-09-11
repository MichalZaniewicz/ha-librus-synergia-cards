import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { mapAllByTranslationKey } from "./utils/entities";
import { t } from "./utils/localize";

interface GradeLogEntry {
  value: string;
}

const NUMERIC_BUCKETS = ["1", "2", "3", "4", "5", "6"] as const;
const BUCKET_COLOR: Record<string, string> = {
  "1": "var(--lc-bad)",
  "2": "var(--lc-bad)",
  "3": "var(--lc-warn)",
  "4": "var(--lc-good)",
  "5": "var(--lc-good)",
  "6": "var(--lc-good)",
  other: "var(--lc-neutral-dot)",
};

/**
 * How many 6s/5s/4s/... across every subject - a histogram over the same
 * `grades` attribute librus-grade-log-card already flattens. Buckets by
 * the LEADING digit only (e.g. "5+" and "5-" both count as "5") - the
 * exact +/- numeric modifier is still unverified project-wide (see
 * ha-librus-synergia's README), but which whole number a grade is stays
 * reliable regardless. Non-numeric marks (bz/np/nk/...) land in an
 * "other" bucket rather than being silently dropped.
 */
@customElement("librus-grade-distribution-card")
export class LibrusGradeDistributionCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-grade-distribution-card" };
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
    const { deviceId } = resolved;
    const hass = this.hass;

    const counts: Record<string, number> = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, other: 0 };
    let total = 0;
    for (const s of mapAllByTranslationKey(hass, deviceId, "subject_average")) {
      const grades = (hass.states[s.entityId]?.attributes.grades as GradeLogEntry[] | undefined) ?? [];
      for (const g of grades) {
        const digit = /^([1-6])/.exec(g.value.trim())?.[1];
        counts[digit ?? "other"] += 1;
        total += 1;
      }
    }

    if (total === 0) return this._message("mdi:chart-bar", t(hass, "card.grades.empty"));

    const maxCount = Math.max(...Object.values(counts), 1);
    const buckets = [...NUMERIC_BUCKETS, "other"] as const;

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-bar"></ha-icon></div>
          <div class="title-block">
            <div class="title">${t(hass, "card.grade_distribution.title")}</div>
            <div class="subtitle">${t(hass, "card.grade_distribution.subtitle", { count: total })}</div>
          </div>
        </div>
        <div class="histogram">
          ${buckets.map((b) => {
            const count = counts[b];
            const heightPct = (count / maxCount) * 100;
            return html`
              <div class="col">
                <div class="col-count">${count > 0 ? count : ""}</div>
                <div class="col-bar-track">
                  <div
                    class="col-bar"
                    style="height:${heightPct}%;background:${BUCKET_COLOR[b]}"
                  ></div>
                </div>
                <div class="col-label">${b === "other" ? t(hass, "card.grade_distribution.other") : b}</div>
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
      .histogram {
        display: flex;
        align-items: flex-end;
        gap: 6px;
        height: 110px;
      }
      .col {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        min-width: 0;
      }
      .col-count {
        font-size: 0.68rem;
        font-weight: 800;
        min-height: 14px;
      }
      .col-bar-track {
        flex: 1;
        width: 100%;
        display: flex;
        align-items: flex-end;
      }
      .col-bar {
        width: 100%;
        min-height: 3px;
        border-radius: 4px 4px 0 0;
        transition: height 0.2s ease;
      }
      .col-label {
        font-size: 0.66rem;
        color: var(--secondary-text-color);
        font-weight: 700;
        margin-top: 4px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-grade-distribution-card": LibrusGradeDistributionCard;
  }
}
