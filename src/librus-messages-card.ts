import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { formatShortDate } from "./utils/format";
import { t, type TranslationKey } from "./utils/localize";
import { fetchFullMessage, type FullMessage } from "./utils/services";

interface RecentMessage {
  id: string;
  sender: string;
  topic: string;
  content: string;
  date: string | null;
  unread: boolean;
  has_attachment: boolean;
}

const MAILBOXES: { key: string; label: TranslationKey }[] = [
  { key: "inbox", label: "mailbox.inbox" },
  { key: "notes", label: "mailbox.notes" },
  { key: "alerts", label: "mailbox.alerts" },
  { key: "substitutions", label: "mailbox.substitutions" },
  { key: "absences", label: "mailbox.absences" },
  { key: "justifications", label: "mailbox.justifications" },
  { key: "trash", label: "mailbox.trash" },
];

@customElement("librus-messages-card")
export class LibrusMessagesCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  // Click-to-expand full message content (see utils/services.ts). Keyed by
  // message id so switching between messages, or re-rendering for an
  // unrelated reason (a poll cycle), doesn't lose what's already loaded.
  @state() private _expandedId?: string;
  @state() private _fullById: Record<string, FullMessage> = {};
  @state() private _pendingIds: Set<string> = new Set();
  @state() private _errorIds: Set<string> = new Set();

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement("librus-device-editor") as LovelaceCardEditor;
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-messages-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 3;
  }

  /**
   * Fetches a message's full content via the `get_message` service on
   * first click, caches it, and toggles the expanded row. CONFIRMED (see
   * the integration's README/changelog): this marks the message read on
   * Librus's own servers - deliberately only ever triggered by this
   * direct click handler, never by anything automatic.
   */
  private async _onMessageClick(m: RecentMessage): Promise<void> {
    if (this._expandedId === m.id) {
      this._expandedId = undefined;
      return;
    }
    this._expandedId = m.id;
    if (this._fullById[m.id] || this._pendingIds.has(m.id)) return;

    const resolved = this._resolveEntities();
    if ("error" in resolved || !this.hass) return;

    this._pendingIds = new Set(this._pendingIds).add(m.id);
    const nextErrors = new Set(this._errorIds);
    nextErrors.delete(m.id);
    this._errorIds = nextErrors;

    try {
      const full = await fetchFullMessage(this.hass, resolved.deviceId, m.id);
      this._fullById = { ...this._fullById, [m.id]: full };
    } catch {
      this._errorIds = new Set(this._errorIds).add(m.id);
    } finally {
      const stillPending = new Set(this._pendingIds);
      stillPending.delete(m.id);
      this._pendingIds = stillPending;
    }
  }

  private _renderMessageBody(m: RecentMessage): TemplateResult {
    const hass = this.hass!;
    if (this._expandedId !== m.id) {
      return html`<div class="item-text"><b>${m.topic}</b> - ${m.content}</div>`;
    }
    const full = this._fullById[m.id];
    if (full) {
      return html`
        <div class="item-text"><b>${full.topic}</b></div>
        <div class="full-text">${full.content}</div>
        <div class="read-notice">${t(hass, "card.messages.read_notice")}</div>
      `;
    }
    if (this._errorIds.has(m.id)) {
      return html`<div class="item-text"><b>${m.topic}</b> - ${t(hass, "card.messages.fetch_failed")}</div>`;
    }
    return html`<div class="item-text"><b>${m.topic}</b> - ${t(hass, "empty.loading")}</div>`;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { map } = resolved;
    const hass = this.hass;

    const entity = map.unread_messages ? hass.states[map.unread_messages] : undefined;
    if (!entity || entity.state === "unavailable") {
      return this._message("mdi:email-outline", t(hass, "card.messages.unavailable"));
    }

    const breakdown = (entity.attributes.mailbox_breakdown as Record<string, number> | undefined) ?? {};
    const recent = (entity.attributes.recent as RecentMessage[] | undefined) ?? [];
    const unread = Number(entity.state) || 0;

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:email-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${t(hass, "card.messages.title")}</div>
            <div class="subtitle">${t(hass, "mailbox.inbox")}</div>
          </div>
        </div>
        <div class="chips">
          ${MAILBOXES.map(
            ({ key, label }) => html`
              <span class="chip ${key === "inbox" && unread > 0 ? "hot" : ""}"
                >${t(hass, label)} <span class="n">${breakdown[key] ?? 0}</span></span
              >
            `
          )}
        </div>
        ${recent.length
          ? html`
              <hr />
              <div class="scroll-list">
                ${recent.slice(0, 6).map(
                  (m) => html`
                    <div class="list-item clickable" @click=${() => this._onMessageClick(m)}>
                      <span class="dot ${m.unread ? "good" : "neutral"}"></span>
                      <div class="body">
                        <div class="row1">
                          <span>${m.sender}</span>
                          ${m.date ? html`<time>${formatShortDate(m.date, hass.language)}</time>` : nothing}
                        </div>
                        ${this._renderMessageBody(m)}
                      </div>
                    </div>
                  `
                )}
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
      .read-notice {
        font-size: 0.65rem;
        color: var(--secondary-text-color);
        font-style: italic;
        margin-top: 6px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-messages-card": LibrusMessagesCard;
  }
}
