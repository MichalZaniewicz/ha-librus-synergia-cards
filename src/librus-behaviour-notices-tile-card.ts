import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { t } from "./utils/localize";

interface RecentNote {
  category: string | null;
  sentiment: "positive" | "negative" | "neutral" | null;
}

/** Compact single-row tile for Behaviour notices - same pattern as
 * librus-next-lesson-tile-card. */
@customElement("librus-behaviour-notices-tile-card")
export class LibrusBehaviourNoticesTileCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement("librus-device-editor") as LovelaceCardEditor;
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-behaviour-notices-tile-card" };
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

    const entity = map.behaviour_notices ? hass.states[map.behaviour_notices] : undefined;
    if (!entity) return this._message("mdi:alert-circle-outline", t(hass, "empty.generic_error"));

    const count = Number(entity.state) || 0;
    const recent = (entity.attributes.recent as RecentNote[] | undefined) ?? [];
    const latest = recent[0];
    const badgeClass = latest?.sentiment === "negative" ? "bad" : latest?.sentiment === "positive" ? "good" : "";

    return html`
      <ha-card class="tile">
        <div class="icon-badge ${badgeClass}"><ha-icon icon="mdi:alert-circle-outline"></ha-icon></div>
        <div class="tile-body">
          <div class="subj">${count}</div>
          ${latest?.category ? html`<div class="meta">${latest.category}</div>` : nothing}
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
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-behaviour-notices-tile-card": LibrusBehaviourNoticesTileCard;
  }
}
