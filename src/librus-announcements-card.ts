import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { formatShortDate } from "./utils/format";
import { t } from "./utils/localize";
import { applyListOptions } from "./utils/list-options";
import { activateOnKey } from "./utils/render-helpers";
import { librusCardEditor } from "./utils/card-editor";
import { hasLibrusService, markAnnouncementsRead, serviceErrorText } from "./utils/services";

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
  // this attribute (Librus doesn't truncate this endpoint) - expanding is a
  // local toggle, no fetch. Opening an unread notice also marks it read in
  // Librus (integration 0.12.17+, `mark_announcement_read`), like opening a
  // message does, unless `keep_unread` is set.
  @state() private _expandedId?: string;
  // Notices marked read from this card, shown read before the sensor
  // catches up.
  @state() private _markedRead: ReadonlySet<string> = new Set();
  @state() private _markError?: string;

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

  private _toggleExpanded(key: string, notice: RecentAnnouncement, deviceId: string): void {
    const opening = this._expandedId !== key;
    this._expandedId = opening ? key : undefined;
    if (opening && notice.id && notice.read === false && !this._config?.keep_unread) {
      void this._markRead(deviceId, [notice.id]);
    }
  }

  /** Marks the given notices (or every unread one, `ids` undefined) read in
   * Librus; they show read at once and go back to unread if Librus refuses. */
  private async _markRead(deviceId: string, ids: string[] | undefined, all: string[] = []): Promise<void> {
    if (!this.hass || !hasLibrusService(this.hass, "mark_announcement_read")) return;
    const shown = ids ?? all;
    if (shown.every((id) => this._markedRead.has(id))) return;
    const before = this._markedRead;
    this._markedRead = new Set([...before, ...shown]);
    this._markError = undefined;
    try {
      await markAnnouncementsRead(this.hass, deviceId, ids);
    } catch (err) {
      this._markedRead = before;
      this._markError = serviceErrorText(err);
    }
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { map, deviceId } = resolved;
    const hass = this.hass;

    const entity = map.unread_announcements ? hass.states[map.unread_announcements] : undefined;
    // The whole board (`notices`, read ones too) when the integration
    // provides it - Librus marks a notice read once it's opened anywhere,
    // so the unread-only `recent` is usually empty.
    const recent =
      (entity?.attributes.notices as RecentAnnouncement[] | undefined) ??
      (entity?.attributes.recent as RecentAnnouncement[] | undefined) ??
      [];
    const isRead = (a: RecentAnnouncement): boolean => a.read !== false || (!!a.id && this._markedRead.has(a.id));
    const markedHere = recent.filter((a) => a.read === false && a.id && this._markedRead.has(a.id)).length;
    const unread = Math.max(0, (Number(entity?.state) || 0) - markedHere);
    const canMark = hasLibrusService(hass, "mark_announcement_read");
    const unreadIds = recent.filter((a) => a.read === false && a.id).map((a) => a.id as string);

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
          ${canMark && unread > 0
            ? html`<div
                class="chip hot mark-all"
                role="button"
                tabindex="0"
                @click=${() => this._markRead(deviceId, undefined, unreadIds)}
                @keydown=${activateOnKey(() => this._markRead(deviceId, undefined, unreadIds))}
              >
                <ha-icon icon="mdi:email-open-multiple-outline"></ha-icon>${t(hass, "card.announcements.mark_all")}
              </div>`
            : nothing}
        </div>
        ${this._markError
          ? html`<div class="mark-error">${t(hass, "card.announcements.mark_failed", { error: this._markError })}</div>`
          : nothing}
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
              <div
                class="list-item clickable ${isRead(a) ? "read" : "unread"}"
                role="button"
                tabindex="0"
                aria-expanded=${this._expandedId === key ? "true" : "false"}
                @click=${() => this._toggleExpanded(key, a, deviceId)}
                @keydown=${activateOnKey(() => this._toggleExpanded(key, a, deviceId))}
              >
                <span class="dot ${isRead(a) ? "neutral" : "good"}"></span>
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
      .mark-all {
        margin-left: auto;
        cursor: pointer;
        flex-shrink: 0;
      }
      .mark-all ha-icon {
        --mdc-icon-size: 14px;
      }
      .mark-error {
        font-size: 0.7rem;
        color: var(--lc-bad);
        margin: -4px 0 8px;
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
