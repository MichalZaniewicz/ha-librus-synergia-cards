import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { formatShortDate } from "./utils/format";
import { t, type TranslationKey } from "./utils/localize";
import { applyListOptions } from "./utils/list-options";
import {
  fetchFullMessage,
  type FullMessage,
  downloadAttachment,
  fetchRecipients,
  sendMessage,
  withdrawMessage,
  serviceErrorText,
  type MessageRecipient,
} from "./utils/services";
import { librusCardEditor } from "./utils/card-editor";
import { activateOnKey } from "./utils/render-helpers";

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
  /** Sent messages from the last 30 days (integration 0.12.5+): who has read it. */
  read_by?: string[];
  read_count?: number;
  receivers_count?: number;
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

  // Writing (integration 0.12.12+, only while the "Message sending (beta)"
  // switch is on). A send always takes two clicks: the first arms
  // `_confirm`, the second sends.
  @state() private _replyFor?: string;
  @state() private _replyText = "";
  @state() private _confirm?: "reply" | "compose";
  @state() private _sending = false;
  @state() private _sendError?: string;
  @state() private _sent?: { id?: number; to: string[]; withdrawn?: boolean; withdrawError?: string };
  @state() private _composeOpen = false;
  @state() private _recipients?: MessageRecipient[];
  @state() private _recipientsError?: string;
  @state() private _recipientQuery = "";
  /** The recipient dropdown is open. */
  @state() private _pickerOpen = false;
  @state() private _composeTo?: string;
  @state() private _composeTopic = "";
  @state() private _composeText = "";

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

  /** Whether the "Message sending (beta)" switch is on. */
  private _sendingOn(map: Record<string, string>): boolean {
    const id = map.message_sending;
    return !!id && this.hass?.states[id]?.state === "on";
  }

  private _deviceId(): string | undefined {
    const resolved = this._resolveEntities();
    return "error" in resolved ? undefined : resolved.deviceId;
  }

  private _openCompose(): void {
    this._composeOpen = true;
    this._confirm = undefined;
    this._sendError = undefined;
    this._sent = undefined;
    if (!this._recipients) void this._loadRecipients();
  }

  private _closeCompose(): void {
    this._composeOpen = false;
    this._confirm = undefined;
    this._sendError = undefined;
  }

  private async _loadRecipients(): Promise<void> {
    const deviceId = this._deviceId();
    if (!this.hass || !deviceId) return;
    this._recipientsError = undefined;
    try {
      this._recipients = await fetchRecipients(this.hass, deviceId);
    } catch (err) {
      this._recipientsError = serviceErrorText(err);
    }
  }

  /** First click arms the confirmation, the second sends. */
  private async _send(kind: "reply" | "compose", replyTo?: string): Promise<void> {
    if (this._sending) return;
    if (this._confirm !== kind) {
      this._confirm = kind;
      return;
    }
    const deviceId = this._deviceId();
    if (!this.hass || !deviceId) return;
    this._sending = true;
    this._sendError = undefined;
    try {
      const sent = await sendMessage(
        this.hass,
        deviceId,
        kind === "reply"
          ? { reply_to: replyTo, message: this._replyText }
          : { recipient: this._composeTo, topic: this._composeTopic, message: this._composeText }
      );
      this._sent = { id: sent.message_id, to: sent.to ?? [] };
      this._replyFor = undefined;
      this._replyText = "";
      this._composeOpen = false;
      this._composeTo = undefined;
      this._composeTopic = "";
      this._composeText = "";
    } catch (err) {
      this._sendError = serviceErrorText(err);
    } finally {
      this._sending = false;
      this._confirm = undefined;
    }
  }

  private async _withdraw(): Promise<void> {
    const sent = this._sent;
    const deviceId = this._deviceId();
    if (!this.hass || !deviceId || !sent?.id) return;
    try {
      await withdrawMessage(this.hass, deviceId, String(sent.id));
      this._sent = { ...sent, withdrawn: true, withdrawError: undefined };
    } catch (err) {
      this._sent = { ...sent, withdrawError: serviceErrorText(err) };
    }
  }

  protected updated(changed: Map<string, unknown>): void {
    super.updated(changed);
    if (changed.has("_pickerOpen") && this._pickerOpen) {
      this.shadowRoot?.querySelector<HTMLInputElement>(".dropdown .search")?.focus();
    }
  }

  /** Keeps typing and clicks inside a form from toggling the message row. */
  private _stop(ev: Event): void {
    ev.stopPropagation();
  }

  private _renderSent(): TemplateResult | typeof nothing {
    const sent = this._sent;
    if (!sent) return nothing;
    const hass = this.hass!;
    return html`<div class="sent-bar ${sent.withdrawn ? "withdrawn" : ""}">
      <ha-icon icon=${sent.withdrawn ? "mdi:undo" : "mdi:check"}></ha-icon>
      <span
        >${sent.withdrawn
          ? t(hass, "card.messages.withdrawn")
          : t(hass, "card.messages.sent", { names: sent.to.join(", ") })}${sent.withdrawError
          ? html` - ${sent.withdrawError}`
          : nothing}</span
      >
      ${sent.withdrawn || !sent.id
        ? nothing
        : html`<button class="link-btn" type="button" @click=${() => this._withdraw()}>
            ${t(hass, "card.messages.withdraw")}
          </button>`}
      <button class="link-btn close" type="button" aria-label=${t(hass, "card.messages.cancel")} @click=${() => (this._sent = undefined)}>×</button>
    </div>`;
  }

  private _renderReply(m: RecentMessage, full: FullMessage): TemplateResult | typeof nothing {
    const hass = this.hass!;
    if (this._replyFor !== m.id) {
      return html`<div class="reply-actions">
        <button
          class="pill-btn"
          type="button"
          @click=${(ev: Event) => {
            ev.stopPropagation();
            this._replyFor = m.id;
            this._replyText = "";
            this._confirm = undefined;
            this._sendError = undefined;
          }}
        >
          <ha-icon icon="mdi:reply"></ha-icon>${t(hass, "card.messages.reply")}
        </button>
      </div>`;
    }
    const topic = /^re:/i.test(full.topic) ? full.topic : `Re: ${full.topic}`;
    const confirming = this._confirm === "reply";
    return html`<div class="form" @click=${this._stop} @keydown=${this._stop}>
      <div class="to-line">${t(hass, "card.messages.reply_to", { name: full.sender, topic })}</div>
      <textarea
        .value=${this._replyText}
        aria-label=${t(hass, "card.messages.text_label")}
        @input=${(ev: Event) => {
          this._replyText = (ev.target as HTMLTextAreaElement).value;
          this._confirm = undefined;
        }}
      ></textarea>
      ${this._sendError ? html`<div class="form-error">${this._sendError}</div>` : nothing}
      <div class="form-actions">
        ${confirming ? html`<span class="confirm-hint">${t(hass, "card.messages.confirm_hint", { name: full.sender })}</span>` : nothing}
        <button class="pill-btn ghost" type="button" @click=${() => {
          this._replyFor = undefined;
          this._confirm = undefined;
        }}>${t(hass, "card.messages.cancel")}</button>
        <button
          class="pill-btn ${confirming ? "warn" : "solid"}"
          type="button"
          ?disabled=${this._sending || !this._replyText.trim()}
          @click=${() => this._send("reply", m.id)}
        >
          <ha-icon icon="mdi:send"></ha-icon>${this._sending
            ? t(hass, "card.messages.sending")
            : confirming
              ? t(hass, "card.messages.confirm_send")
              : t(hass, "card.messages.send")}
        </button>
      </div>
    </div>`;
  }

  private _renderCompose(): TemplateResult {
    const hass = this.hass!;
    const all = this._recipients ?? [];
    const query = this._recipientQuery.trim().toLocaleLowerCase();
    const matches = (r: MessageRecipient) =>
      !query ||
      r.name.toLocaleLowerCase().includes(query) ||
      r.subjects.some((s) => s.toLocaleLowerCase().includes(query));
    const groups: { label: string; people: MessageRecipient[] }[] = [
      { label: t(hass, "card.messages.group_tutor"), people: all.filter((r) => r.group === "tutors") },
      {
        label: t(hass, "card.messages.group_teachers"),
        people: all
          .filter((r) => r.group === "teachers" && r.subjects.length)
          .sort((a, b) => a.subjects[0].localeCompare(b.subjects[0], hass.language)),
      },
      { label: t(hass, "card.messages.group_school"), people: all.filter((r) => r.group !== "tutors" && r.group !== "teachers") },
      // Teachers who don't teach the student only show up in a search.
      {
        label: t(hass, "card.messages.group_other"),
        people: query ? all.filter((r) => r.group === "teachers" && !r.subjects.length) : [],
      },
    ]
      .map((g) => ({ ...g, people: g.people.filter(matches) }))
      .filter((g) => g.people.length);
    const chosen = all.find((r) => r.account_id === this._composeTo);
    const confirming = this._confirm === "compose";
    const ready = !!chosen && !!this._composeTopic.trim() && !!this._composeText.trim();
    return html`
      <ha-card class="static">
        <div class="compose">
          <div class="compose-head">
            <button class="icon-btn" type="button" aria-label=${t(hass, "card.messages.back")} @click=${() => this._closeCompose()}>
              <ha-icon icon="mdi:arrow-left"></ha-icon>
            </button>
            <div class="title">${t(hass, "card.messages.new_title")}<span class="beta">BETA</span></div>
          </div>
          <div class="field">
            <label>${t(hass, "card.messages.to_label")}</label>
            <button
              class="select ${this._pickerOpen ? "open" : ""}"
              type="button"
              aria-haspopup="listbox"
              aria-expanded=${this._pickerOpen ? "true" : "false"}
              @click=${() => {
                this._pickerOpen = !this._pickerOpen;
                this._recipientQuery = "";
              }}
            >
              ${chosen
                ? html`<span class="select-name">${chosen.name}</span>
                    <small>${chosen.subjects.join(", ") || chosen.group_name}</small>`
                : html`<span class="select-placeholder">${t(hass, "card.messages.pick_recipient")}</span>`}
              <ha-icon icon=${this._pickerOpen ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
            </button>
            ${this._pickerOpen
              ? html`<div class="dropdown" @keydown=${(ev: KeyboardEvent) => {
                  if (ev.key === "Escape") this._pickerOpen = false;
                }}>
                  <input
                    class="input search"
                    type="search"
                    autofocus
                    .value=${this._recipientQuery}
                    placeholder=${t(hass, "card.messages.search")}
                    aria-label=${t(hass, "card.messages.search")}
                    @input=${(ev: Event) => (this._recipientQuery = (ev.target as HTMLInputElement).value)}
                  />
                  <div class="picker" role="listbox">
                    ${this._recipientsError
                      ? html`<div class="picker-note">${t(hass, "card.messages.recipients_failed", { error: this._recipientsError })}</div>`
                      : !this._recipients
                        ? html`<div class="picker-note">${t(hass, "empty.loading")}</div>`
                        : groups.length
                          ? groups.map(
                              (g) => html`<div class="pgroup">${g.label}</div>
                                ${g.people.map(
                                  (r) => html`<button
                                    class="popt ${r.account_id === this._composeTo ? "sel" : ""}"
                                    type="button"
                                    role="option"
                                    aria-selected=${r.account_id === this._composeTo ? "true" : "false"}
                                    @click=${() => {
                                      this._composeTo = r.account_id;
                                      this._pickerOpen = false;
                                      this._recipientQuery = "";
                                      this._confirm = undefined;
                                    }}
                                  >
                                    <span>${r.name}</span>
                                    <small>${r.subjects.join(", ") || r.group_name}${r.available === false
                                      ? ` · ${t(hass, "card.messages.away")}`
                                      : ""}</small>
                                  </button>`
                                )}`
                            )
                          : html`<div class="picker-note">${t(hass, "card.messages.no_match")}</div>`}
                  </div>
                  ${query ? nothing : html`<div class="picker-hint">${t(hass, "card.messages.search_hint")}</div>`}
                </div>`
              : nothing}
          </div>
          <div class="field">
            <label>${t(hass, "card.messages.topic_label")}</label>
            <input
              class="input"
              .value=${this._composeTopic}
              maxlength="200"
              aria-label=${t(hass, "card.messages.topic_label")}
              @input=${(ev: Event) => {
                this._composeTopic = (ev.target as HTMLInputElement).value;
                this._confirm = undefined;
              }}
            />
          </div>
          <div class="field">
            <label>${t(hass, "card.messages.text_label")}</label>
            <textarea
              .value=${this._composeText}
              aria-label=${t(hass, "card.messages.text_label")}
              @input=${(ev: Event) => {
                this._composeText = (ev.target as HTMLTextAreaElement).value;
                this._confirm = undefined;
              }}
            ></textarea>
          </div>
          ${this._sendError ? html`<div class="form-error">${this._sendError}</div>` : nothing}
          <div class="form-actions">
            ${confirming && chosen
              ? html`<span class="confirm-hint">${t(hass, "card.messages.confirm_hint", { name: chosen.name })}</span>`
              : nothing}
            <button
              class="pill-btn ${confirming ? "warn" : "solid"}"
              type="button"
              ?disabled=${this._sending || !ready}
              @click=${() => this._send("compose")}
            >
              <ha-icon icon="mdi:send"></ha-icon>${this._sending
                ? t(hass, "card.messages.sending")
                : confirming
                  ? t(hass, "card.messages.confirm_send")
                  : t(hass, "card.messages.send")}
            </button>
          </div>
        </div>
      </ha-card>
    `;
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
        ${full.attachments?.length && this._mailbox === "archive"
          ? html`
              <div class="attachments" @click=${(ev: Event) => ev.stopPropagation()}>
                ${full.attachments.map(
                  (a) => html`<div class="attachment archived">
                    <ha-icon icon="mdi:paperclip"></ha-icon>
                    <span class="attachment-name">${a.filename ?? a.id}</span>
                  </div>`
                )}
                <div class="read-notice">${t(hass, "card.messages.attachment_archived")}</div>
              </div>
            `
          : full.attachments?.length
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
        ${this._mailbox === "inbox" && this._canWrite && !full.no_reply ? this._renderReply(m, full) : nothing}
      `;
    }
    if (this._errorIds.has(m.id)) {
      return html`<div class="item-text"><b>${m.topic}</b> - ${t(hass, "card.messages.fetch_failed")}</div>`;
    }
    return html`<div class="item-text"><b>${m.topic}</b> - ${t(hass, "empty.loading")}</div>`;
  }

  /** Set in render(): the "Message sending (beta)" switch is on. */
  private _canWrite = false;

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { map } = resolved;
    const hass = this.hass;
    this._canWrite = this._sendingOn(map);
    if (this._composeOpen && this._canWrite) return this._renderCompose();

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
          ${this._canWrite
            ? html`<button class="pill-btn" type="button" @click=${() => this._openCompose()}>
                <ha-icon icon="mdi:pencil"></ha-icon>${t(hass, "card.messages.write")}<span class="beta">BETA</span>
              </button>`
            : nothing}
        </div>
        ${this._renderSent()}
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
                  tabindex=${pickable ? "0" : nothing}
                  aria-pressed=${pickable ? (key === mailbox ? "true" : "false") : nothing}
                  @click=${pickable ? () => this._pickMailbox(key) : nothing}
                  @keydown=${pickable ? activateOnKey(() => this._pickMailbox(key)) : nothing}
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
                    <div
                      class="list-item clickable"
                      role="button"
                      tabindex="0"
                      aria-expanded=${this._expandedId === m.id ? "true" : "false"}
                      @click=${() => this._onMessageClick(m)}
                      @keydown=${activateOnKey(() => void this._onMessageClick(m))}
                    >
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
                        ${this._renderReadState(m)}
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

  /** A sent message's read receipt: read by everyone, by some, or not yet. */
  private _renderReadState(m: RecentMessage): TemplateResult | typeof nothing {
    const total = m.receivers_count;
    if (!m.receiver || total === undefined || total === 0) return nothing;
    const hass = this.hass!;
    const read = m.read_count ?? 0;
    const names = (m.read_by ?? []).join(", ");
    if (read >= total) {
      return html`<div class="read-state all" title=${names}>
        <ha-icon icon="mdi:check-all"></ha-icon>${t(hass, "card.messages.read_all")}
      </div>`;
    }
    if (read > 0) {
      return html`<div class="read-state some" title=${names}>
        <ha-icon icon="mdi:check"></ha-icon>${t(hass, "card.messages.read_some", { read, total })}
      </div>`;
    }
    return html`<div class="read-state">${t(hass, "card.messages.read_none")}</div>`;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .pill-btn {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        border: 0;
        border-radius: 999px;
        padding: 5px 11px;
        font: inherit;
        font-size: 0.78rem;
        font-weight: 600;
        cursor: pointer;
        background: var(--lc-brand-bg);
        color: var(--lc-brand);
        flex: none;
      }
      .pill-btn ha-icon {
        --mdc-icon-size: 15px;
      }
      .pill-btn.solid {
        background: var(--lc-brand);
        color: #fff;
      }
      .pill-btn.warn {
        background: var(--lc-amber);
        color: #fff;
      }
      .pill-btn.ghost {
        background: transparent;
        color: var(--secondary-text-color);
      }
      .pill-btn:disabled {
        opacity: 0.5;
        cursor: default;
      }
      .pill-btn:focus-visible,
      .link-btn:focus-visible,
      .icon-btn:focus-visible,
      .popt:focus-visible {
        outline: 2px solid var(--lc-brand);
        outline-offset: 2px;
      }
      .beta {
        font-size: 0.58rem;
        font-weight: 800;
        letter-spacing: 0.05em;
        padding: 1px 5px;
        border-radius: 4px;
        background: var(--lc-amber-bg);
        color: var(--lc-amber);
        margin-left: 5px;
      }
      .reply-actions {
        margin-top: 8px;
      }
      .form {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 8px;
        cursor: default;
      }
      .to-line {
        font-size: 0.74rem;
        color: var(--secondary-text-color);
      }
      textarea,
      .input {
        font: inherit;
        font-size: 0.82rem;
        color: var(--primary-text-color);
        background: var(--lc-chip-bg);
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        padding: 8px 10px;
        width: 100%;
        box-sizing: border-box;
      }
      textarea {
        min-height: 90px;
        resize: vertical;
        line-height: 1.4;
      }
      .form-actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
      }
      .confirm-hint {
        font-size: 0.74rem;
        color: var(--lc-amber);
        margin-right: auto;
      }
      .form-error {
        font-size: 0.74rem;
        color: var(--lc-bad);
      }
      .sent-bar {
        display: flex;
        align-items: center;
        gap: 6px;
        border-radius: 8px;
        padding: 3px 8px;
        font-size: 0.74rem;
        line-height: 1.3;
        background: var(--lc-good-bg);
        color: var(--lc-good);
      }
      .sent-bar.withdrawn {
        background: var(--lc-chip-bg);
        color: var(--secondary-text-color);
      }
      .sent-bar span {
        flex: 1;
        min-width: 0;
      }
      .sent-bar ha-icon {
        --mdc-icon-size: 14px;
        flex: none;
      }
      .link-btn {
        border: 0;
        background: none;
        font: inherit;
        font-size: 0.76rem;
        font-weight: 600;
        color: inherit;
        cursor: pointer;
        padding: 2px 4px;
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      .link-btn.close {
        text-decoration: none;
        font-size: 1rem;
        line-height: 1;
      }
      .compose {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .compose-head {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .compose-head .title {
        font-size: 0.95rem;
        font-weight: 700;
      }
      .icon-btn {
        width: 34px;
        height: 34px;
        border-radius: 10px;
        border: 0;
        background: var(--lc-brand-bg);
        color: var(--lc-brand);
        display: grid;
        place-items: center;
        cursor: pointer;
        flex: none;
      }
      .field {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .field label {
        font-size: 0.7rem;
        font-weight: 600;
        color: var(--secondary-text-color);
      }
      .picker {
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        max-height: 220px;
        overflow-y: auto;
        scrollbar-width: thin;
      }
      .pgroup {
        font-size: 0.64rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--secondary-text-color);
        padding: 6px 10px 2px;
        background: var(--lc-chip-bg);
      }
      .popt {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        width: 100%;
        border: 0;
        border-top: 1px solid var(--divider-color);
        background: none;
        font: inherit;
        font-size: 0.82rem;
        color: var(--primary-text-color);
        padding: 7px 10px;
        cursor: pointer;
        text-align: left;
      }
      .popt:hover {
        background: var(--lc-brand-bg);
      }
      .popt small {
        color: var(--secondary-text-color);
        font-size: 0.72rem;
        text-align: right;
      }
      .picker-note {
        font-size: 0.76rem;
        color: var(--secondary-text-color);
        padding: 8px 10px;
      }
      .select {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        box-sizing: border-box;
        font: inherit;
        font-size: 0.84rem;
        color: var(--primary-text-color);
        background: var(--lc-chip-bg);
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        padding: 7px 10px;
        cursor: pointer;
        text-align: left;
      }
      .select.open {
        border-color: var(--lc-brand);
      }
      .select:focus-visible {
        outline: 2px solid var(--lc-brand);
        outline-offset: 1px;
      }
      .select-name {
        font-weight: 600;
      }
      .select-placeholder {
        color: var(--secondary-text-color);
        flex: 1;
      }
      .select small {
        flex: 1;
        color: var(--secondary-text-color);
        font-size: 0.72rem;
        text-align: right;
      }
      .select ha-icon {
        --mdc-icon-size: 18px;
        color: var(--secondary-text-color);
        flex: none;
      }
      .dropdown {
        display: flex;
        flex-direction: column;
        gap: 6px;
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        padding: 6px;
        background: var(--ha-card-background, var(--card-background-color, transparent));
      }
      .picker-hint {
        font-size: 0.68rem;
        color: var(--secondary-text-color);
        padding: 0 4px;
      }
      .popt.sel {
        background: var(--lc-brand-bg);
        color: var(--lc-brand);
        font-weight: 600;
      }
      .read-state {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 0.72rem;
        color: var(--secondary-text-color);
        margin-top: 2px;
      }
      .read-state ha-icon {
        --mdc-icon-size: 14px;
      }
      .read-state.all {
        color: var(--lc-good);
      }
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
      /* Files of an archived message: listed, but not downloadable. */
      .attachment.archived {
        color: var(--secondary-text-color);
        cursor: default;
      }
      .attachment.archived .attachment-name {
        text-decoration: none;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-messages-card": LibrusMessagesCard;
  }
}
