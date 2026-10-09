import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor, migrateLegacyConfig } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { formatShortDate, formatDate } from "./utils/format";
import { t } from "./utils/localize";
import { applyListOptions } from "./utils/list-options";
import { fetchFullMessage, type FullMessage } from "./utils/services";
import { fetchCalendarEvents, isoDate, lessonInfo, type LibrusCalendarEvent } from "./utils/calendar";
import type { TranslationKey } from "./utils/localize";
import { activateOnKey } from "./utils/render-helpers";

type ChangeKind = "substitution" | "cancelled" | "room" | "moved";
const KINDS: { kind: ChangeKind; icon: string; label: TranslationKey; chip: TranslationKey }[] = [
  { kind: "substitution", icon: "mdi:swap-horizontal", label: "card.changes.substitution", chip: "card.changes.chip_substitution" },
  { kind: "cancelled", icon: "mdi:calendar-remove", label: "card.changes.cancelled", chip: "card.changes.chip_cancelled" },
  { kind: "room", icon: "mdi:map-marker-outline", label: "card.changes.room", chip: "card.changes.chip_room" },
  { kind: "moved", icon: "mdi:calendar-arrow-right", label: "card.changes.moved", chip: "card.changes.chip_moved" },
];
const PAST_DAYS = 14;
const PAST_SHOWN = 3;

interface LessonChange {
  event: LibrusCalendarEvent;
  kind: ChangeKind;
  subject: string;
  detail: string;
}

/** The change a timetable event carries (calendar.py's summary suffixes), or undefined. */
function toChange(event: LibrusCalendarEvent): LessonChange | undefined {
  const info = lessonInfo(event);
  const kind: ChangeKind | undefined = info.cancelled
    ? "cancelled"
    : info.substitution
      ? "substitution"
      : info.moved
        ? "moved"
        : info.roomChange
          ? "room"
          : undefined;
  if (!kind) return undefined;
  const details = info.details.filter((d) => !d.startsWith("Temat:") && !d.startsWith("Zmiana sali:"));
  const room = info.rooms ? `${info.rooms[0]} → ${info.rooms[1]}` : event.location;
  const detail = [info.teacher, ...details, kind === "cancelled" ? undefined : room].filter(Boolean).join(" · ");
  return { event, kind, subject: info.name, detail };
}

interface RecentMessage {
  id: string;
  mailbox: string;
  sender: string;
  topic: string;
  content: string;
  date: string | null;
  unread: boolean;
  has_attachment: boolean;
}

/** Key used for the click-to-expand cache/state maps below - a message id
 * alone isn't unique across two different mailboxes' lists. */
function itemKey(m: RecentMessage): string {
  return `${m.mailbox}:${m.id}`;
}

/**
 * Full content (not just an unread count) for the secondary Wiadomości
 * mailboxes worth actually reading - "Zastępstwa" (substitutions,
 * schedule changes), "Alerty" (alerts), and "Usprawiedliwienia"
 * (justifications - a parent's submitted absence excuse and the school's
 * response, added 2026-09-06 on user request). Same click-to-expand
 * pattern as `librus-messages-card`.
 */
@customElement("librus-substitutions-card")
export class LibrusSubstitutionsCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  @state() private _expandedKey?: string;
  @state() private _fullByKey: Record<string, FullMessage> = {};
  @state() private _pendingKeys: Set<string> = new Set();
  @state() private _errorKeys: Set<string> = new Set();
  @state() private _changes: LessonChange[] = [];
  @state() private _filter: ChangeKind | "all" = "all";
  private _fetchedFor?: string;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-substitutions-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    // An older `show_past: false` becomes `hide_past: true`.
    this._config = migrateLegacyConfig(config);
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 4;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._every(30 * 60_000, () => void this._fetch(this._forceRefresh()));
  }


  private get _daysAhead(): number {
    return Math.max(1, Math.min(30, Number(this._config?.days_ahead) || 7));
  }

  /** `hide_past: true` (setConfig turns an older `show_past: false` into it). */
  private get _hidePast(): boolean {
    return Boolean(this._config?.hide_past);
  }

  /** Changed lessons from the timetable calendar: the last PAST_DAYS days
   * (only when they're shown - fewer on-demand Librus fetches otherwise)
   * and the next `days_ahead` days. */
  private async _fetch(force = false): Promise<void> {
    if (!this.hass || !this._config) return;
    const resolved = this._resolveEntities();
    if ("error" in resolved) return;
    const entityId = resolved.map.timetable;
    if (!entityId) return;
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    if (!this._hidePast) start.setDate(start.getDate() - PAST_DAYS);
    const end = new Date();
    end.setHours(0, 0, 0, 0);
    end.setDate(end.getDate() + this._daysAhead + 1);
    const range = `${entityId}:${isoDate(start)}:${isoDate(end)}`;
    const cacheKey = `${range}:${this._dataStamp()}`;
    if (!force && this._fetchedFor === cacheKey) return;
    this._fetchedFor = cacheKey;
    const generation = this._beginFetch();
    try {
      const events = await fetchCalendarEvents(this.hass, entityId, start, end);
      const changes = events
        .filter((e) => !e.allDay)
        .map(toChange)
        .filter((c): c is LessonChange => !!c)
        .sort((a, b) => a.event.start.localeCompare(b.event.start));
      if (this._isCurrentFetch(generation)) {
        this._changes = changes;
        this._fetchSucceeded(range);
      }
    } catch {
      if (this._isCurrentFetch(generation) && !this._keepAfterError(range)) this._changes = [];
    }
  }

  private _when(event: LibrusCalendarEvent): string {
    const start = new Date(event.start);
    const day = formatDate(start, this.hass?.language, { weekday: "short", day: "numeric", month: "numeric" });
    const time = formatDate(start, this.hass?.language, { hour: "2-digit", minute: "2-digit" });
    return `${day} · ${time}`;
  }

  private _changeRow(c: LessonChange, past: boolean): TemplateResult {
    const hass = this.hass!;
    const meta = KINDS.find((k) => k.kind === c.kind)!;
    return html`<div class="change ${past ? "past" : ""}">
      <span class="ci ${c.kind}"><ha-icon icon=${meta.icon}></ha-icon></span>
      <div class="cbody">
        <div class="csubj">${c.subject}<span class="ctag ${c.kind}">${t(hass, meta.label)}</span></div>
        ${c.detail ? html`<div class="cdet">${c.detail}</div>` : nothing}
      </div>
      <time>${this._when(c.event)}</time>
    </div>`;
  }

  private async _onClick(m: RecentMessage): Promise<void> {
    const key = itemKey(m);
    if (this._expandedKey === key) {
      this._expandedKey = undefined;
      return;
    }
    this._expandedKey = key;
    if (this._fullByKey[key] || this._pendingKeys.has(key)) return;

    const resolved = this._resolveEntities();
    if ("error" in resolved || !this.hass) return;

    this._pendingKeys = new Set(this._pendingKeys).add(key);
    const nextErrors = new Set(this._errorKeys);
    nextErrors.delete(key);
    this._errorKeys = nextErrors;

    try {
      const full = await fetchFullMessage(this.hass, resolved.deviceId, m.id, m.mailbox);
      this._fullByKey = { ...this._fullByKey, [key]: full };
    } catch {
      this._errorKeys = new Set(this._errorKeys).add(key);
    } finally {
      const stillPending = new Set(this._pendingKeys);
      stillPending.delete(key);
      this._pendingKeys = stillPending;
    }
  }

  private _renderBody(m: RecentMessage): TemplateResult {
    const hass = this.hass!;
    const key = itemKey(m);
    if (this._expandedKey !== key) {
      return html`<div class="item-text"><b>${m.topic}</b> - ${m.content}</div>`;
    }
    const full = this._fullByKey[key];
    if (full) {
      return html`
        <div class="item-text"><b>${full.topic}</b></div>
        <div class="full-text">${full.content}</div>
        ${full.attachments?.length
          ? html`
              <div class="attachments">
                ${full.attachments.map(
                  (a) => html`<div class="attachment">
                    <ha-icon icon="mdi:paperclip"></ha-icon>${a.filename ?? a.id}
                  </div>`
                )}
                <div class="read-notice">${t(hass, "card.messages.attachment_notice")}</div>
              </div>
            `
          : nothing}
        <div class="read-notice">${t(hass, "card.messages.read_notice")}</div>
      `;
    }
    if (this._errorKeys.has(key)) {
      return html`<div class="item-text"><b>${m.topic}</b> - ${t(hass, "card.messages.fetch_failed")}</div>`;
    }
    return html`<div class="item-text"><b>${m.topic}</b> - ${t(hass, "empty.loading")}</div>`;
  }

  private _renderSection(title: string, items: RecentMessage[]): TemplateResult | typeof nothing {
    if (items.length === 0) return nothing;
    const hass = this.hass!;
    return html`
      <div class="section-title">${title}</div>
      <div class="scroll-list">
        ${applyListOptions(items, { max_items: this._config?.max_items }).map(
          (m) => html`
            <div
              class="list-item clickable"
              role="button"
              tabindex="0"
              aria-expanded=${this._expandedKey === itemKey(m) ? "true" : "false"}
              @click=${() => this._onClick(m)}
              @keydown=${activateOnKey(() => void this._onClick(m))}
            >
              <span class="dot ${m.unread ? "good" : "neutral"}"></span>
              <div class="body">
                <div class="row1">
                  <span class="sender"
                    >${m.sender}${m.has_attachment
                      ? html`<ha-icon class="clip" icon="mdi:paperclip"></ha-icon>`
                      : nothing}</span
                  >
                  ${m.date ? html`<time>${formatShortDate(m.date, hass.language)}</time>` : nothing}
                </div>
                ${this._renderBody(m)}
              </div>
            </div>
          `
        )}
      </div>
    `;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { map } = resolved;
    const hass = this.hass;
    void this._fetch();

    const entity = map.unread_messages ? hass.states[map.unread_messages] : undefined;
    const substitutions = (entity?.attributes.substitutions_recent as RecentMessage[] | undefined) ?? [];
    const alerts = (entity?.attributes.alerts_recent as RecentMessage[] | undefined) ?? [];
    const justifications = (entity?.attributes.justifications_recent as RecentMessage[] | undefined) ?? [];
    const hasMessages = substitutions.length + alerts.length + justifications.length > 0;

    const now = Date.now();
    const upcoming = this._changes.filter((c) => new Date(c.event.end).getTime() > now);
    const counts = new Map(KINDS.map((k) => [k.kind, upcoming.filter((c) => c.kind === k.kind).length]));
    // A picked kind whose chip has since disappeared (no upcoming change of
    // that kind any more) falls back to "all" instead of hiding everything.
    const filter = this._filter !== "all" && (counts.get(this._filter) ?? 0) > 0 ? this._filter : "all";
    const matches = (c: LessonChange) => filter === "all" || c.kind === filter;
    const shown = upcoming.filter(matches).slice(0, this._config.max_items ?? 30);
    const shownPast = this._hidePast
      ? []
      : this._changes
          .filter((c) => new Date(c.event.end).getTime() <= now && matches(c))
          .slice(-PAST_SHOWN)
          .reverse();
    const next = upcoming[0];
    const subtitle = next
      ? t(hass, "card.changes.next", { subject: next.subject, when: this._when(next.event) })
      : t(hass, "card.changes.none", { n: this._daysAhead });

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:swap-horizontal"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title ?? t(hass, "card.substitutions.title")}</div>
            <div class="subtitle">${subtitle}</div>
          </div>
        </div>
        ${upcoming.length
          ? html`<div class="chips">
              <span
                class="chip pickable ${filter === "all" ? "hot" : ""}"
                role="button"
                tabindex="0"
                aria-pressed=${filter === "all" ? "true" : "false"}
                @click=${() => (this._filter = "all")}
                @keydown=${activateOnKey(() => (this._filter = "all"))}
                >${t(hass, "card.changes.chip_all")} <span class="n">${upcoming.length}</span></span
              >
              ${KINDS.filter((k) => (counts.get(k.kind) ?? 0) > 0).map(
                (k) => html`<span
                  class="chip pickable ${filter === k.kind ? "hot" : ""}"
                  role="button"
                  tabindex="0"
                  aria-pressed=${filter === k.kind ? "true" : "false"}
                  @click=${() => (this._filter = k.kind)}
                  @keydown=${activateOnKey(() => (this._filter = k.kind))}
                  >${t(hass, k.chip)} <span class="n">${counts.get(k.kind)}</span></span
                >`
              )}
            </div>`
          : html`<div class="no-changes"><ha-icon icon="mdi:check"></ha-icon>${t(hass, "card.substitutions.empty")}</div>`}
        <div class="changes scroll-list">
          ${shown.map((c) => this._changeRow(c, false))}
          ${shownPast.length
            ? html`<div class="section-title">${t(hass, "card.changes.recent")}</div>
                ${shownPast.map((c) => this._changeRow(c, true))}`
            : nothing}
        </div>
        ${hasMessages
          ? html`<div class="messages">
              ${this._renderSection(t(hass, "mailbox.substitutions"), substitutions)}
              ${this._renderSection(t(hass, "mailbox.alerts"), alerts)}
              ${this._renderSection(t(hass, "mailbox.justifications"), justifications)}
            </div>`
          : nothing}
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .section-title {
        font-size: 0.65rem;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.04em;
        margin-top: 2px;
      }
      .section-title:not(:first-of-type) {
        margin-top: 10px;
      }
      .chips {
        margin-bottom: 10px;
      }
      .chip.pickable {
        cursor: pointer;
      }
      .no-changes {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.8rem;
        color: var(--secondary-text-color);
        margin-bottom: 4px;
      }
      .no-changes ha-icon {
        --mdc-icon-size: 16px;
        color: var(--lc-good);
      }
      .changes {
        display: grid;
        gap: 8px;
      }
      .change {
        display: grid;
        grid-template-columns: 30px minmax(0, 1fr) auto;
        gap: 10px;
        align-items: center;
      }
      .change.past {
        opacity: 0.55;
      }
      .ci {
        width: 30px;
        height: 30px;
        border-radius: 9px;
        display: grid;
        place-items: center;
        --mdc-icon-size: 17px;
      }
      .ci.substitution,
      .ctag.substitution {
        background: var(--lc-amber-bg);
        color: var(--lc-amber);
      }
      .ci.cancelled,
      .ctag.cancelled {
        background: var(--lc-bad-bg);
        color: var(--lc-bad);
      }
      .ci.room,
      .ctag.room {
        background: var(--lc-brand-bg);
        color: var(--lc-brand-strong);
      }
      .ci.moved,
      .ctag.moved {
        background: var(--lc-good-bg);
        color: var(--lc-good);
      }
      .csubj {
        font-size: 0.86rem;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .ctag {
        font-size: 0.62rem;
        font-weight: 700;
        padding: 1px 7px;
        border-radius: 99px;
        margin-left: 6px;
        vertical-align: 1px;
      }
      .cdet {
        font-size: 0.74rem;
        color: var(--secondary-text-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .change time {
        font-size: 0.72rem;
        color: var(--secondary-text-color);
        white-space: nowrap;
        text-align: right;
      }
      .messages {
        margin-top: 12px;
        padding-top: 10px;
        border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
      }
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
        font-size: 0.75rem;
        color: var(--primary-text-color);
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
    "librus-substitutions-card": LibrusSubstitutionsCard;
  }
}
