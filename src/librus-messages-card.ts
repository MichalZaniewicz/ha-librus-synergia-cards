import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { formatShortDate } from "./utils/format";
import { t, type TranslationKey } from "./utils/localize";

interface RecentMessage {
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
                    <div class="list-item">
                      <span class="dot ${m.unread ? "good" : "neutral"}"></span>
                      <div class="body">
                        <div class="row1">
                          <span>${m.sender}</span>
                          ${m.date ? html`<time>${formatShortDate(m.date, hass.language)}</time>` : nothing}
                        </div>
                        <div class="item-text"><b>${m.topic}</b> - ${m.content}</div>
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

  static styles = [librusTokens, librusSharedStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-messages-card": LibrusMessagesCard;
  }
}
