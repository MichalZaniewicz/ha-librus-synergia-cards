import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { formatShortDate } from "./utils/format";
import { t } from "./utils/localize";
import { applyListOptions } from "./utils/list-options";
import { librusCardEditor } from "./utils/card-editor";

interface RecentAnnouncement {
  id?: string;
  subject: string;
  content: string;
  start_date: string | null;
  end_date: string | null;
  creation_date: string | null;
  /** Integration 0.12.5+: the notice board lists read notices too. */
  read?: boolean;
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
    return librusCardEditor();
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
    // The whole board (`notices`, read ones too) when the integration
    // provides it - Librus marks a notice read once it's opened anywhere,
    // so the unread-only `recent` is usually empty.
    const recent =
      (entity?.attributes.notices as RecentAnnouncement[] | undefined) ??
      (entity?.attributes.recent as RecentAnnouncement[] | undefined) ??
      [];
    const unread = Number(entity?.state) || 0;

    if (!entity || recent.length === 0) {
      return this._message("mdi:bullhorn-outline", t(hass, "card.announcements.empty"));
    }

    const shown = applyListOptions(recent, this._config, 10);

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:bullhorn-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title ?? t(hass, "card.announcements.title")}</div>
            <div class="subtitle">
              ${unread ? t(hass, "card.announcements.unread", { n: unread }) : t(hass, "card.announcements.all_read")}
            </div>
          </div>
        </div>
        <div class="scroll-list">
          ${shown.map((a, i) => {
            // Fall back to the array index when `id` is missing (an
            // ha-librus-synergia older than 0.4.17, which added this
            // field) - REAL BUG found live: comparing against `undefined`
            // on every row made the toggle a permanent no-op
            // (`undefined === undefined` is always true, so it kept
            // resetting itself back to collapsed on every click).
            const key = a.id ?? String(i);
            return html`
              <div class="list-item clickable ${a.read ? "read" : "unread"}" @click=${() => this._toggleExpanded(key)}>
                <span class="dot ${a.read === false ? "good" : "neutral"}"></span>
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
      .list-item.unread .row1 {
        font-weight: 700;
      }
      .list-item.read .row1 {
        color: var(--secondary-text-color);
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
