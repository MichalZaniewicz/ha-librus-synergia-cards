import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { formatShortDate } from "./utils/format";
import { t } from "./utils/localize";
import { tapActionHandler, isActionable } from "./utils/actions";

const UNAVAILABLE = new Set(["unknown", "unavailable", ""]);

@customElement("librus-lucky-number-card")
export class LibrusLuckyNumberCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement("librus-device-editor") as LovelaceCardEditor;
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-lucky-number-card" };
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

    const entity = map.lucky_number ? hass.states[map.lucky_number] : undefined;
    if (!entity || UNAVAILABLE.has(entity.state)) {
      return this._message("mdi:dice-5-outline", t(hass, "empty.generic_error"));
    }

    // CONFIRMED live (integration 0.4.15+): Librus can publish the NEXT
    // school day's number a day ahead (e.g. Monday's already visible on
    // Sunday) - `is_today`/`day` let this card say which day it's
    // actually for instead of always claiming "today". Older integration
    // versions don't send these attributes yet - `is_today === undefined`
    // falls back to the original "today" copy rather than showing
    // anything broken.
    const isToday = entity.attributes.is_today as boolean | null | undefined;
    const day = entity.attributes.day as string | null | undefined;
    const subtitle =
      isToday === false && day
        ? t(hass, "card.lucky_number.subtitle_for_date", { date: formatShortDate(day, hass.language) })
        : t(hass, "card.lucky_number.subtitle");

    return html`
      <ha-card
        class=${isActionable(this._config.tap_action) ? "" : "static"}
        @click=${tapActionHandler(this, this._config.tap_action, map.lucky_number)}
      >
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:dice-5-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${t(hass, "card.lucky_number.title")}</div>
            <div class="subtitle">${subtitle}</div>
          </div>
        </div>
        <div class="number-wrap">
          <div class="number">${entity.state}</div>
        </div>
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .number-wrap {
        display: flex;
        justify-content: center;
        padding: 4px 0 2px;
      }
      .number {
        font-size: 3rem;
        font-weight: 800;
        color: var(--lc-brand);
        line-height: 1;
        font-variant-numeric: tabular-nums;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-lucky-number-card": LibrusLuckyNumberCard;
  }
}
