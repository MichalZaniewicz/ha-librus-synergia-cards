import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { progressRing } from "./utils/render-helpers";
import { mapAllByTranslationKey } from "./utils/entities";
import { t } from "./utils/localize";

const UNAVAILABLE = new Set(["unknown", "unavailable", ""]);

@customElement("librus-grades-card")
export class LibrusGradesCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement("librus-device-editor") as LovelaceCardEditor;
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-grades-card" };
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

    const overall = map.overall_average ? hass.states[map.overall_average] : undefined;
    const subjects = mapAllByTranslationKey(hass, deviceId, "subject_average")
      .map((s) => ({ ...s, state: hass.states[s.entityId] }))
      .filter((s) => s.state && !UNAVAILABLE.has(s.state.state));

    if ((!overall || UNAVAILABLE.has(overall.state)) && subjects.length === 0) {
      return this._message("mdi:school-outline", t(hass, "card.grades.empty"));
    }

    const overallValue = overall && !UNAVAILABLE.has(overall.state) ? Number(overall.state) : undefined;
    const maxSubject = subjects.length
      ? Math.max(...subjects.map((s) => Number(s.state!.state)))
      : 6;

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:school-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${t(hass, "card.grades.title")}</div>
            <div class="subtitle">${t(hass, "card.grades.subtitle")}</div>
          </div>
        </div>

        ${overallValue !== undefined
          ? html`
              <div class="ring-row">
                ${progressRing((overallValue / 6) * 100, "var(--lc-brand)", 68, 7)}
                <div>
                  <div class="ring-num">${overallValue.toLocaleString(hass.language, { maximumFractionDigits: 2 })}</div>
                  <div class="ring-label">${t(hass, "card.grades.subtitle")}</div>
                </div>
              </div>
            `
          : nothing}
        ${subjects.length
          ? html`
              <div class="sub-list">
                ${subjects.map((s) => {
                  const value = Number(s.state!.state);
                  return html`
                    <div class="sub-row">
                      <span class="name" title=${s.subject}>${s.subject}</span>
                      <span class="bar"
                        ><span
                          style="width:${Math.min(100, (value / maxSubject) * 100)}%"
                        ></span
                      ></span>
                      <span class="val">${value.toLocaleString(hass.language, { maximumFractionDigits: 2 })}</span>
                    </div>
                  `;
                })}
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
      .ring-row {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .ring-num {
        font-size: 1.5rem;
        font-weight: 800;
        font-variant-numeric: tabular-nums;
        line-height: 1.1;
      }
      .ring-label {
        font-size: 0.72rem;
        color: var(--secondary-text-color);
      }
      .sub-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 220px;
        overflow-y: auto;
      }
      .sub-row {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .sub-row .name {
        font-size: 0.74rem;
        color: var(--secondary-text-color);
        width: 92px;
        flex: none;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .sub-row .bar {
        flex: 1;
        height: 8px;
        border-radius: 4px;
        background: var(--divider-color);
        overflow: hidden;
        display: block;
      }
      .sub-row .bar span {
        display: block;
        height: 100%;
        background: var(--lc-brand);
        border-radius: 4px;
      }
      .sub-row .val {
        font-size: 0.76rem;
        font-weight: 800;
        width: 32px;
        text-align: right;
        font-variant-numeric: tabular-nums;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-grades-card": LibrusGradesCard;
  }
}
