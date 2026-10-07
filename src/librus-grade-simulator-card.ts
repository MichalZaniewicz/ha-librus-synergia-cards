import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { t } from "./utils/localize";
import { librusCardEditor } from "./utils/card-editor";
import { predictedGrade, subjectForecast, thresholdsOf } from "./utils/forecast";

const GRADES = [1, 2, 3, 4, 5, 6];
const MAX_WEIGHT = 5;

/**
 * "What if I got a __ (weight __) next?" - pick a subject in the config,
 * tap a grade and adjust the weight, see where the average would land.
 *
 * With the integration's grade forecast (0.11.1+) the projection is exact:
 * the subject sensor carries the average and the sum of weights it is
 * computed on, and the card shows what the new average would make of the
 * report-card grade. On an older integration it falls back to treating
 * every existing grade as weight 1 (the subtitle then says "rough").
 */
@customElement("librus-grade-simulator-card")
export class LibrusGradeSimulatorCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  @state() private _grade = 5;
  @state() private _weight = 1;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-grade-simulator-card" };
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
    const match =
      this._config.subject_id !== undefined
        ? subjects.find((s) => s.subjectId === this._config!.subject_id)
        : subjects[0];

    const subjectState = match ? hass.states[match.entityId] : undefined;
    const current = Number(subjectState?.state);
    const count = Number(subjectState?.attributes.grade_count) || 0;

    if (!match || Number.isNaN(current)) {
      return this._message("mdi:calculator-variant-outline", t(hass, "card.grade_simulator.empty"));
    }

    const forecast = subjectForecast(subjectState);
    const exact = forecast !== undefined && forecast.weight > 0;
    const base = exact ? forecast.average : current;
    const baseWeight = exact ? forecast.weight : count;
    const projected = (base * baseWeight + this._grade * this._weight) / (baseWeight + this._weight);
    const delta = Math.round((projected - base) * 100) / 100;
    const thresholds = thresholdsOf(hass, map);
    const gradeAfter = predictedGrade(projected, thresholds);
    const deltaClass = delta > 0 ? "good" : delta < 0 ? "bad" : "";

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calculator-variant-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${match.subject}</div>
            <div class="subtitle">
              ${t(hass, exact ? "card.grade_simulator.subtitle_exact" : "card.grade_simulator.subtitle")}
            </div>
          </div>
        </div>
        <div class="projection">
          <span class="from">${base.toFixed(2)}</span>
          <ha-icon icon="mdi:arrow-right-thin"></ha-icon>
          <span class="to ${deltaClass}">${projected.toFixed(2)}</span>
          ${delta !== 0
            ? html`<span class="delta ${deltaClass}">${delta > 0 ? "+" : ""}${delta}</span>`
            : nothing}
        </div>
        ${forecast
          ? html`<div class="report">
              ${t(hass, "card.grade_simulator.report")}
              <b>${forecast.predicted}</b>
              <ha-icon icon="mdi:arrow-right-thin"></ha-icon>
              <b class=${gradeAfter > forecast.predicted ? "good" : gradeAfter < forecast.predicted ? "bad" : ""}
                >${gradeAfter}</b
              >
            </div>`
          : nothing}
        <div class="grade-row">
          ${GRADES.map(
            (g) => html`
              <button
                class="gbtn ${g === this._grade ? "active" : ""}"
                @click=${() => {
                  this._grade = g;
                }}
              >
                ${g}
              </button>
            `
          )}
        </div>
        <div class="weight-row">
          <span class="wlabel">${t(hass, "label.weight")}</span>
          <button
            class="wbtn"
            ?disabled=${this._weight <= 1}
            @click=${() => {
              this._weight = Math.max(1, this._weight - 1);
            }}
          >
            −
          </button>
          <span class="wval">${this._weight}</span>
          <button
            class="wbtn"
            ?disabled=${this._weight >= MAX_WEIGHT}
            @click=${() => {
              this._weight = Math.min(MAX_WEIGHT, this._weight + 1);
            }}
          >
            +
          </button>
        </div>
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .projection {
        display: flex;
        align-items: baseline;
        gap: 10px;
      }
      .projection .from {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--secondary-text-color);
        font-variant-numeric: tabular-nums;
      }
      .projection ha-icon {
        --mdc-icon-size: 20px;
        color: var(--secondary-text-color);
        align-self: center;
      }
      .projection .to {
        font-size: 1.9rem;
        font-weight: 800;
        color: var(--lc-brand);
        font-variant-numeric: tabular-nums;
      }
      .projection .to.good {
        color: var(--lc-good);
      }
      .projection .to.bad {
        color: var(--lc-bad);
      }
      .delta {
        font-size: 0.8rem;
        font-weight: 700;
      }
      .delta.good {
        color: var(--lc-good);
      }
      .delta.bad {
        color: var(--lc-bad);
      }
      .report {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.8rem;
        color: var(--secondary-text-color);
      }
      .report b {
        font-size: 0.95rem;
        color: var(--primary-text-color);
      }
      .report b.good {
        color: var(--lc-good);
      }
      .report b.bad {
        color: var(--lc-bad);
      }
      .report ha-icon {
        --mdc-icon-size: 16px;
      }
      .grade-row {
        display: flex;
        gap: 6px;
      }
      .gbtn {
        flex: 1;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: var(--primary-text-color);
        border-radius: 8px;
        padding: 8px 0;
        font-size: 0.95rem;
        font-weight: 700;
        cursor: pointer;
        font-family: inherit;
      }
      .gbtn.active {
        background: var(--lc-brand);
        border-color: var(--lc-brand);
        color: #fff;
      }
      .weight-row {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .wlabel {
        font-size: 0.78rem;
        color: var(--secondary-text-color);
        font-weight: 600;
        margin-right: auto;
      }
      .wbtn {
        width: 28px;
        height: 28px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: var(--primary-text-color);
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 800;
        cursor: pointer;
        font-family: inherit;
      }
      .wbtn[disabled] {
        opacity: 0.4;
        cursor: default;
      }
      .wval {
        font-size: 1rem;
        font-weight: 800;
        min-width: 16px;
        text-align: center;
        font-variant-numeric: tabular-nums;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-grade-simulator-card": LibrusGradeSimulatorCard;
  }
}
