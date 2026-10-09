import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { formatShortDate } from "./utils/format";
import { t, type TranslationKey } from "./utils/localize";
import { applyListOptions } from "./utils/list-options";
import { fetchFullMessage, type FullMessage, downloadAttachment } from "./utils/services";
import { librusCardEditor } from "./utils/card-editor";

interface RecentMessage {
  id: string;
  mailbox?: string;
  sender: string;
  /** Set for sent messages (outbox). */
  receiver?: string | null;
  topic: string;
  content: string;
  date: string | null;
  unread: boolean;
  has_attachment: boolean;
}

/** Which sensor attribute holds each mailbox's preview list. */
const RECENT_ATTR: Record<string, string> = {
  inbox: "recent",
  substitutions: "substitutions_recent",
  alerts: "alerts_recent",
  justifications: "justifications_recent",
  outbox: "outbox_recent",
  archive: "archive_recent",
};

/** Mailboxes without an unread count. */
const NO_COUNT = new Set(["outbox", "archive"]);

/** The integration's mailbox name, where it differs from the tab key. */
const SERVICE_MAILBOX: Record<string, string> = { archive: "archive/inbox" };

const MAILBOXES: { key: string; label: TranslationKey }[] = [
  { key: "inbox", label: "mailbox.inbox" },
  { key: "notes", label: "mailbox.notes" },
  { key: "alerts", label: "mailbox.alerts" },
  { key: "substitutions", label: "mailbox.substitutions" },
  { key: "absences", label: "mailbox.absences" },
  { key: "justifications", label: "mailbox.justifications" },
  { key: "trash", label: "mailbox.trash" },
  { key: "outbox", label: "mailbox.outbox" },
  { key: "archive", label: "mailbox.archive" },
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
  /** Mailbox picked by tapping a chip; overrides the configured one. */
  @state() private _viewMailbox?: string;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-messages-card" };
  }

  private get _mailbox(): string {
    if (this._viewMailbox) return this._viewMailbox;
    return this._config?.mailbox && RECENT_ATTR[this._config.mailbox] ? this._config.mailbox : "inbox";
  }

  private _pickMailbox(key: string): void {
    if (!RECENT_ATTR[key] || key === this._mailbox) return;
    this._viewMailbox = key;
    this._expandedId = undefined;
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

    const mailbox = m.mailbox ?? SERVICE_MAILBOX[this._mailbox] ?? this._mailbox;
    this._pendingIds = new Set(this._pendingIds).add(m.id);
    const nextErrors = new Set(this._errorIds);
    nextErrors.delete(m.id);
    this._errorIds = nextErrors;

    try {
      const full = await fetchFullMessage(this.hass, resolved.deviceId, m.id, mailbox);
      this._fullById = { ...this._fullById, [m.id]: full };
    } catch {
      this._errorIds = new Set(this._errorIds).add(m.id);
    } finally {
      const stillPending = new Set(this._pendingIds);
      stillPending.delete(m.id);
      this._pendingIds = stillPending;
    }
  }

  /** Attachment key ("message:attachment") -> download state. */
  @state() private _attachmentState: Record<string, "loading" | "error"> = {};

  private async _download(ev: Event, messageId: string, attachmentId: string, key: string, name: string): Promise<void> {
    ev.stopPropagation();
    const resolved = this._resolveEntities();
    if (!this.hass || "error" in resolved) return;
    this._attachmentState = { ...this._attachmentState, [key]: "loading" };
    try {
      await downloadAttachment(this.hass, resolved.deviceId, messageId, attachmentId, name);
      const next = { ...this._attachmentState };
      delete next[key];
      this._attachmentState = next;
    } catch {
      this._attachmentState = { ...this._attachmentState, [key]: "error" };
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
        ${full.attachments?.length
          ? html`
              <div class="attachments">
                ${full.attachments.map((a) => {
                  const key = `${m.id}:${a.id}`;
                  const state = this._attachmentState[key];
                  return html`<button
                    class="attachment"
                    type="button"
                    ?disabled=${state === "loading"}
                    @click=${(ev: Event) => this._download(ev, m.id, a.id, key, a.filename ?? a.id)}
                  >
                    <ha-icon icon=${state === "loading" ? "mdi:progress-download" : "mdi:paperclip"}></ha-icon>
                    <span class="attachment-name">${a.filename ?? a.id}</span>
                    ${state === "error"
                      ? html`<span class="attachment-error">${t(hass, "card.messages.attachment_error")}</span>`
                      : nothing}
                  </button>`;
                })}
                <div class="read-notice">${t(hass, "card.messages.attachment_notice")}</div>
              </div>
            `
          : nothing}
        ${this._mailbox === "outbox"
          ? nothing
          : html`<div class="read-notice">${t(hass, "card.messages.read_notice")}</div>`}
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

    const mailbox = this._mailbox;
    const breakdown = (entity.attributes.mailbox_breakdown as Record<string, number> | undefined) ?? {};
    const recent =
      (entity.attributes[RECENT_ATTR[mailbox]] as RecentMessage[] | undefined) ?? [];
    const missing = new Set((entity.attributes.missing_mailboxes as string[] | undefined) ?? []);
    const unread = Number(entity.state) || 0;
    const max = this._config.max_items ?? 6;

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:email-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title ?? t(hass, "card.messages.title")}</div>
            <div class="subtitle">${t(hass, `mailbox.${mailbox}` as TranslationKey)}</div>
          </div>
        </div>
        <div class="chips">
          ${MAILBOXES.filter(
            // Sent/archive only once the integration provides them; no chip
            // for a mailbox this account doesn't have.
            ({ key }) =>
              (!NO_COUNT.has(key) || entity.attributes[RECENT_ATTR[key]] !== undefined) &&
              !missing.has(SERVICE_MAILBOX[key] ?? key)
          ).map(
            ({ key, label }) => {
              const list = entity.attributes[RECENT_ATTR[key]] as RecentMessage[] | undefined;
              // Greyed out: a listed mailbox with no messages, or a
              // count-only one with nothing unread.
              const empty =
                key !== mailbox && (list !== undefined ? list.length === 0 : !breakdown[key]);
              const pickable = list !== undefined && !empty;
              return html`
                <span
                  class="chip ${key === mailbox ? "hot" : ""} ${pickable ? "pickable" : ""} ${empty
                    ? "muted"
                    : ""}"
                  role=${pickable ? "button" : nothing}
                  @click=${pickable ? () => this._pickMailbox(key) : nothing}
                  >${t(hass, label)}${NO_COUNT.has(key)
                    ? nothing
                    : html` <span class="n">${breakdown[key] ?? 0}</span>`}</span
                >
              `;
            }
          )}
        </div>
        ${recent.length
          ? html`
              <hr />
              <div class="scroll-list">
                ${applyListOptions(recent, { sort: this._config.sort, max_items: max }).map(
                  (m) => html`
                    <div class="list-item clickable" @click=${() => this._onMessageClick(m)}>
                      <span class="dot ${m.unread && !m.receiver ? "good" : "neutral"}"></span>
                      <div class="body">
                        <div class="row1">
                          <span class="sender"
                            >${m.receiver
                              ? t(hass, "card.messages.to", { name: m.receiver })
                              : m.sender}${m.has_attachment
                              ? html`<ha-icon class="clip" icon="mdi:paperclip"></ha-icon>`
                              : nothing}</span
                          >
                          ${m.date ? html`<time>${formatShortDate(m.date, hass.language)}</time>` : nothing}
                        </div>
                        ${this._renderMessageBody(m)}
                      </div>
                    </div>
                  `
                )}
              </div>
            `
          : html`<div class="empty-box">${t(hass, "card.messages.empty")}</div>`}
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
      .chip.pickable {
        cursor: pointer;
      }
      .chip.muted {
        opacity: 0.45;
      }
      .empty-box {
        font-size: 0.75rem;
        color: var(--secondary-text-color);
        padding: 10px 2px 2px;
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
      .clip {
        --mdc-icon-size: 13px;
        color: var(--secondary-text-color);
        display: inline-flex;
        vertical-align: -2px;
        margin-left: 4px;
      }
      .attachments {
        margin-top: 6px;
      }
      .attachment {
        display: flex;
        align-items: center;
        gap: 4px;
        font: inherit;
        font-size: 0.75rem;
        color: var(--lc-brand);
        background: none;
        border: 0;
        padding: 2px 0;
        cursor: pointer;
        text-align: left;
      }
      .attachment:disabled {
        cursor: progress;
        opacity: 0.7;
      }
      .attachment-name {
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      .attachment-error {
        color: var(--lc-bad);
        margin-left: 6px;
      }
      .attachment ha-icon {
        --mdc-icon-size: 14px;
        flex: none;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-messages-card": LibrusMessagesCard;
  }
}
