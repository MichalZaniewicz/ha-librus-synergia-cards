import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { formatShortDate } from "./utils/format";
import { t } from "./utils/localize";
import { fetchFullMessage, type FullMessage } from "./utils/services";

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

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement("librus-device-editor") as LovelaceCardEditor;
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-substitutions-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 2;
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
        ${items.map(
          (m) => html`
            <div class="list-item clickable" @click=${() => this._onClick(m)}>
              <span class="dot ${m.unread ? "good" : "neutral"}"></span>
              <div class="body">
                <div class="row1">
                  <span>${m.sender}</span>
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

    const entity = map.unread_messages ? hass.states[map.unread_messages] : undefined;
    const substitutions = (entity?.attributes.substitutions_recent as RecentMessage[] | undefined) ?? [];
    const alerts = (entity?.attributes.alerts_recent as RecentMessage[] | undefined) ?? [];
    const justifications = (entity?.attributes.justifications_recent as RecentMessage[] | undefined) ?? [];

    if (!entity || (substitutions.length === 0 && alerts.length === 0 && justifications.length === 0)) {
      return this._message("mdi:bell-alert-outline", t(hass, "card.substitutions.empty"));
    }

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:bell-alert-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${t(hass, "card.substitutions.title")}</div>
            <div class="subtitle">${t(hass, "card.substitutions.subtitle")}</div>
          </div>
        </div>
        ${this._renderSection(t(hass, "mailbox.substitutions"), substitutions)}
        ${this._renderSection(t(hass, "mailbox.alerts"), alerts)}
        ${this._renderSection(t(hass, "mailbox.justifications"), justifications)}
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
    "librus-substitutions-card": LibrusSubstitutionsCard;
  }
}
