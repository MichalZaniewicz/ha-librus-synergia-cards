import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { t } from "./utils/localize";
import { tapActionHandler } from "./utils/actions";

interface RecentAnnouncement {
  subject: string;
}

/** Compact single-row tile for Unread announcements - same pattern as
 * librus-next-lesson-tile-card. */
@customElement("librus-announcements-tile-card")
export class LibrusAnnouncementsTileCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement("librus-device-editor") as LovelaceCardEditor;
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-announcements-tile-card" };
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

    const entity = map.unread_announcements ? hass.states[map.unread_announcements] : undefined;
    if (!entity) return this._message("mdi:bullhorn-outline", t(hass, "empty.generic_error"));

    const unread = Number(entity.state) || 0;
    const recent = (entity.attributes.recent as RecentAnnouncement[] | undefined) ?? [];
    const latest = recent[0];

    return html`
      <ha-card class="tile" @click=${tapActionHandler(this, this._config.tap_action, map.unread_announcements)}>
        <div class="icon-badge ${unread > 0 ? "amber" : ""}">
          <ha-icon icon="mdi:bullhorn-outline"></ha-icon>
        </div>
        <div class="tile-body">
          <div class="subj">${unread} ${t(hass, "card.announcements.title").toLowerCase()}</div>
          ${latest ? html`<div class="meta">${latest.subject}</div>` : nothing}
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
    "librus-announcements-tile-card": LibrusAnnouncementsTileCard;
  }
}
