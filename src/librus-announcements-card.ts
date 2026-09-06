import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { formatShortDate } from "./utils/format";
import { t } from "./utils/localize";

interface RecentAnnouncement {
  id?: string;
  subject: string;
  content: string;
  start_date: string | null;
  end_date: string | null;
  creation_date: string | null;
}

@customElement("librus-announcements-card")
export class LibrusAnnouncementsCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  // Unlike librus-messages-card, the full content is already present in
  // this attribute (Librus doesn't truncate this endpoint, and reading it
  // has no server-side "mark as read" side effect) - this is just a local
  // expand/collapse toggle, no fetch, no loading/error state needed.
  @state() private _expandedId?: string;

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement("librus-device-editor") as LovelaceCardEditor;
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-announcements-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 2;
  }

  private _toggleExpanded(id: string): void {
    this._expandedId = this._expandedId === id ? undefined : id;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { map } = resolved;
    const hass = this.hass;

    const entity = map.unread_announcements ? hass.states[map.unread_announcements] : undefined;
    const recent = (entity?.attributes.recent as RecentAnnouncement[] | undefined) ?? [];

    if (!entity || recent.length === 0) {
      return this._message("mdi:bullhorn-outline", t(hass, "card.announcements.empty"));
    }

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:bullhorn-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${t(hass, "card.announcements.title")}</div>
            <div class="subtitle">${entity.state}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${recent.map((a, i) => {
            // Fall back to the array index when `id` is missing (an
            // ha-librus-synergia older than 0.4.17, which added this
            // field) - REAL BUG found live: comparing against `undefined`
            // on every row made the toggle a permanent no-op
            // (`undefined === undefined` is always true, so it kept
            // resetting itself back to collapsed on every click).
            const key = a.id ?? String(i);
            return html`
              <div class="list-item clickable" @click=${() => this._toggleExpanded(key)}>
                <span class="dot neutral"></span>
                <div class="body">
                  <div class="row1">${a.subject}</div>
                  ${a.start_date && a.end_date
                    ? html`<div class="item-text">
                        ${formatShortDate(a.start_date, hass.language)} –
                        ${formatShortDate(a.end_date, hass.language)}
                      </div>`
                    : nothing}
                  ${this._expandedId === key ? html`<div class="full-text">${a.content}</div>` : nothing}
                </div>
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
      .list-item.clickable {
        cursor: pointer;
      }
      .full-text {
        font-size: 0.75rem;
        color: var(--primary-text-color);
        margin-top: 4px;
        line-height: 1.5;
        white-space: pre-wrap;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-announcements-card": LibrusAnnouncementsCard;
  }
}
