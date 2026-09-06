import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { t } from "./utils/localize";

/** Compact single-row tile - same pattern as librus-next-lesson-tile-card,
 * for denser dashboards that don't want the full Attendance card's
 * breakdown/legend. */
@customElement("librus-attendance-tile-card")
export class LibrusAttendanceTileCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement("librus-device-editor") as LovelaceCardEditor;
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-attendance-tile-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 1;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { map } = resolved;
    const hass = this.hass;

    const entity = map.attendance ? hass.states[map.attendance] : undefined;
    if (!entity) return this._message("mdi:calendar-remove", t(hass, "empty.generic_error"));

    const absences = Number(entity.state) || 0;
    const percentage = entity.attributes.percentage as number | null | undefined;

    return html`
      <ha-card class="tile">
        <div class="icon-badge ${absences === 0 ? "good" : "bad"}">
          <ha-icon icon="mdi:calendar-remove"></ha-icon>
        </div>
        <div class="tile-body">
          <div class="subj">
            ${absences} ${t(hass, "stat.absences").toLowerCase()}
          </div>
          ${percentage != null
            ? html`<div class="meta">${t(hass, "stat.percentage")}: ${percentage}%</div>`
            : nothing}
        </div>
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      ha-card.tile {
        flex-direction: row;
        align-items: center;
        padding: 12px 16px;
      }
      .tile-body {
        min-width: 0;
      }
      .subj {
        font-weight: 700;
        font-size: 0.86rem;
      }
      .meta {
        font-size: 0.7rem;
        color: var(--secondary-text-color);
        margin-top: 1px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-attendance-tile-card": LibrusAttendanceTileCard;
  }
}
