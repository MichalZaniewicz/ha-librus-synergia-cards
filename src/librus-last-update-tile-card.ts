import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard, outageTime } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { t, formatTimeAgo } from "./utils/localize";

// Fallback for an integration without the Last successful update sensor:
// any core sensor works - every librus_synergia entity on one device updates
// together (same coordinator, same poll cycle).
const REFERENCE_KEYS = ["overall_average", "attendance", "school"];

/**
 * A tiny diagnostic tile: how long ago the integration's own data was last
 * refreshed, so a family relying on this daily has a quick "is this still
 * fresh" signal without digging into Settings -> Devices & Services.
 * Reads the integration's *Last successful update* sensor (translation_key
 * `last_update`): when Librus last answered. While Librus is down the
 * integration keeps re-publishing the last data, so a sensor's
 * `last_reported` would wrongly read "just now". With the *Connection
 * status* sensor at `stale` the tile turns amber and shows the next attempt.
 * Older integrations without that sensor fall back to a core sensor's
 * `last_reported`.
 */
@customElement("librus-last-update-tile-card")
export class LibrusLastUpdateTileCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  private _tickTimer?: ReturnType<typeof setInterval>;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-last-update-tile-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 1;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._tickTimer = setInterval(() => this.requestUpdate(), 30_000);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this._tickTimer);
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { map } = resolved;
    const hass = this.hass;

    let timestamp: string | undefined;
    const lastUpdate = map["last_update"] ? hass.states[map["last_update"]] : undefined;
    if (lastUpdate && !["unknown", "unavailable"].includes(lastUpdate.state)) {
      timestamp = lastUpdate.state;
    } else {
      const entityId = REFERENCE_KEYS.map((k) => map[k]).find((id) => id && hass.states[id]);
      const entity = entityId ? hass.states[entityId] : undefined;
      if (!entity) return this._message("mdi:clock-check-outline", t(hass, "empty.generic_error"));
      timestamp = (entity as unknown as { last_reported?: string }).last_reported ?? entity.last_updated;
    }

    const status = map["status"] ? hass.states[map["status"]] : undefined;
    const stale = status?.state === "stale" || status?.state === "error";
    const next = status?.attributes["next_attempt"];
    const meta = stale
      ? t(hass, "card.last_update.not_responding", {
          time: typeof next === "string" ? outageTime(next, hass.language) : "?",
        })
      : t(hass, "card.last_update.subtitle");

    return html`
      <ha-card class="tile ${stale ? "stale" : ""}">
        <div class="icon-badge"><ha-icon icon="mdi:clock-check-outline"></ha-icon></div>
        <div class="tile-body">
          <div class="subj">${formatTimeAgo(hass, timestamp)}</div>
          <div class="meta">${meta}</div>
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
      ha-card.stale .icon-badge {
        background: var(--lc-warn-bg);
        color: var(--lc-warn);
      }
      ha-card.stale .subj {
        color: var(--lc-warn);
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
    "librus-last-update-tile-card": LibrusLastUpdateTileCard;
  }
}
