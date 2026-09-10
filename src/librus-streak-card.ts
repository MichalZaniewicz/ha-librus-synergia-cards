import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { daysBetween } from "./utils/format";
import { t } from "./utils/localize";
import { tapActionHandler, isActionable } from "./utils/actions";

const FLAME_COUNT = 10;
const FLAME_STEP_DAYS = 3;

@customElement("librus-streak-card")
export class LibrusStreakCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement("librus-device-editor") as LovelaceCardEditor;
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-streak-card" };
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
    const { map } = resolved;
    const hass = this.hass;

    const entity = map.attendance ? hass.states[map.attendance] : undefined;
    const lastAbsence = entity?.attributes.last_absence_date as string | undefined;
    const schoolYearStart = map.school_class
      ? (hass.states[map.school_class]?.attributes.school_year_start as string | undefined)
      : undefined;

    if (!entity) return this._message("mdi:fire", t(hass, "empty.generic_error"));

    const since = lastAbsence
      ? new Date(`${lastAbsence}T00:00:00`)
      : schoolYearStart
        ? new Date(`${schoolYearStart}T00:00:00`)
        : undefined;
    const days = since ? Math.max(0, daysBetween(since, new Date())) : 0;
    const litFlames = Math.min(FLAME_COUNT, Math.ceil(days / FLAME_STEP_DAYS));

    return html`
      <ha-card
        class=${isActionable(this._config.tap_action) ? "" : "static"}
        @click=${tapActionHandler(this, this._config.tap_action, map.attendance)}
      >
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:fire"></ha-icon></div>
          <div class="title-block">
            <div class="title">${t(hass, "card.streak.title")}</div>
            <div class="subtitle">${t(hass, "card.streak.subtitle")}</div>
          </div>
        </div>
        <div class="streak-num">${days} ${t(hass, "label.days")}</div>
        <div class="flames">
          ${Array.from({ length: FLAME_COUNT }, (_, i) => html`<span class="flame ${i < litFlames ? "on" : ""}"></span>`)}
        </div>
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .streak-num {
        font-size: 2rem;
        font-weight: 800;
        color: var(--lc-amber);
        line-height: 1;
        font-variant-numeric: tabular-nums;
      }
      .flames {
        display: flex;
        gap: 3px;
      }
      .flame {
        width: 15px;
        height: 15px;
        border-radius: 3px;
        background: var(--divider-color);
      }
      .flame.on {
        background: var(--lc-amber);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-streak-card": LibrusStreakCard;
  }
}
