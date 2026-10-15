import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { t } from "./utils/localize";
import { applyListOptions } from "./utils/list-options";
import {
  fetchRecipients,
  hasLibrusService,
  sendMessage,
  serviceErrorText,
  type MessageRecipient,
} from "./utils/services";

/** "Nowak-Kowalska Anna" and "Anna Nowak- Kowalska" -> the same key. */
function nameKey(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .split(/[\s-]+/)
    .filter(Boolean)
    .sort()
    .join(" ");
}

interface WriteTarget {
  name: string;
  subject?: string;
}

/**
 * Homeroom + subject teachers, both already-fetched data with nowhere
 * else to show it: the homeroom teacher comes from the Class sensor's
 * `homeroom_teacher` attribute, subject teachers from the School sensor's
 * `subject_teachers` attribute (subject name -> sorted teacher-name list,
 * requires `ha-librus-synergia` 0.6.0+ - a subject taught by more than
 * one teacher, e.g. split language groups, lists all of them).
 *
 * With "Allow sending messages (beta)" on in the integration, each teacher
 * has a pencil that opens a short message form right under them. The
 * teacher is found among the Wiadomości recipients by their name (word
 * order and Polish letters don't matter) and the message goes to that
 * account - the same send_message service, with the same second click to
 * confirm, as the Messages card.
 */
@customElement("librus-teachers-card")
export class LibrusTeachersCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  @state() private _writeTo?: WriteTarget;
  @state() private _topic = "";
  @state() private _text = "";
  @state() private _confirm = false;
  @state() private _sending = false;
  @state() private _error?: string;
  @state() private _sentTo?: string;
  private _recipients?: MessageRecipient[];

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-teachers-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 2;
  }

  private _deviceId(): string | undefined {
    const resolved = this._resolveEntities();
    return "error" in resolved ? undefined : resolved.deviceId;
  }

  private _open(target: WriteTarget): void {
    const same = this._writeTo?.name === target.name && this._writeTo?.subject === target.subject;
    this._writeTo = same ? undefined : target;
    this._topic = "";
    this._text = "";
    this._confirm = false;
    this._error = undefined;
    this._sentTo = undefined;
  }

  /** The teacher's Wiadomości account: by name, then by subject among namesakes. */
  private async _accountFor(target: WriteTarget, deviceId: string): Promise<MessageRecipient> {
    this._recipients ??= await fetchRecipients(this.hass!, deviceId);
    const key = nameKey(target.name);
    let found = this._recipients.filter((r) => nameKey(r.name) === key);
    if (found.length > 1 && target.subject) {
      const bySubject = found.filter((r) => r.subjects.includes(target.subject!));
      if (bySubject.length) found = bySubject;
    }
    if (found.length !== 1) {
      throw new Error(t(this.hass, "card.teachers.not_found", { name: target.name }));
    }
    return found[0];
  }

  private async _send(): Promise<void> {
    const target = this._writeTo;
    const deviceId = this._deviceId();
    if (!target || !deviceId || !this.hass || this._sending) return;
    if (!this._confirm) {
      this._confirm = true;
      return;
    }
    this._sending = true;
    this._error = undefined;
    try {
      const account = await this._accountFor(target, deviceId);
      const sent = await sendMessage(this.hass, deviceId, {
        recipient: account.account_id,
        topic: this._topic,
        message: this._text,
      });
      this._sentTo = (sent.to ?? []).join(", ") || target.name;
      this._writeTo = undefined;
      this._topic = "";
      this._text = "";
    } catch (err) {
      this._error = serviceErrorText(err);
      // A recipient list from before a failure may be stale.
      this._recipients = undefined;
    } finally {
      this._sending = false;
      this._confirm = false;
    }
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { map } = resolved;
    const hass = this.hass;

    const school = map.school ? hass.states[map.school] : undefined;
    const subjectTeachers = (school?.attributes.subject_teachers as Record<string, string[]> | undefined) ?? {};
    const subjectRows = Object.entries(subjectTeachers);

    const cls = map.school_class ? hass.states[map.school_class] : undefined;
    const homeroomTeacher = cls?.attributes.homeroom_teacher as string | undefined;

    if (!homeroomTeacher && subjectRows.length === 0) {
      return this._message("mdi:account-group-outline", t(hass, "card.teachers.empty"));
    }

    const messages = map.unread_messages ? hass.states[map.unread_messages] : undefined;
    const canWrite = messages?.attributes.sending_enabled === true && hasLibrusService(hass, "send_message");

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:account-group-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title ?? t(hass, "card.teachers.title")}</div>
            <div class="subtitle">${t(hass, "card.teachers.count", { n: subjectRows.length })}</div>
          </div>
        </div>
        ${this._sentTo
          ? html`<div class="sent-bar">
              <ha-icon icon="mdi:check"></ha-icon><span>${t(hass, "card.messages.sent", { names: this._sentTo })}</span>
            </div>`
          : nothing}
        <div class="scroll-list">
          ${homeroomTeacher
            ? this._row(t(hass, "card.teachers.homeroom"), [homeroomTeacher], "warn", canWrite, undefined)
            : nothing}
          ${applyListOptions(subjectRows, { max_items: this._config?.max_items }).map(([subject, teachers]) =>
            this._row(subject, teachers, "neutral", canWrite, subject)
          )}
        </div>
      </ha-card>
    `;
  }

  private _row(
    label: string,
    teachers: string[],
    dot: string,
    canWrite: boolean,
    subject: string | undefined
  ): TemplateResult {
    const hass = this.hass!;
    const writing = this._writeTo && this._writeTo.subject === subject && teachers.includes(this._writeTo.name);
    return html`
      <div class="list-item">
        <span class="dot ${dot}"></span>
        <div class="body">
          <div class="row1"><span>${label}</span></div>
          <div class="item-text names">
            ${teachers.map(
              (name, i) => html`${i ? ", " : ""}<span class="name"
                  >${name}${canWrite
                    ? html`<button
                        class="write ${this._writeTo?.name === name && this._writeTo?.subject === subject ? "on" : ""}"
                        type="button"
                        title=${t(hass, "card.teachers.write_to", { name })}
                        aria-label=${t(hass, "card.teachers.write_to", { name })}
                        @click=${() => this._open({ name, subject })}
                      >
                        <ha-icon icon="mdi:pencil-outline"></ha-icon>
                      </button>`
                    : nothing}</span
                >`
            )}
          </div>
          ${writing ? this._renderForm() : nothing}
        </div>
      </div>
    `;
  }

  private _renderForm(): TemplateResult {
    const hass = this.hass!;
    const target = this._writeTo!;
    const ready = this._text.trim().length > 0 && this._topic.trim().length > 0;
    return html`
      <div class="form">
        <div class="to-line">${t(hass, "card.teachers.to", { name: target.name })}</div>
        <input
          class="input"
          .value=${this._topic}
          maxlength="200"
          placeholder=${t(hass, "card.messages.topic_label")}
          aria-label=${t(hass, "card.messages.topic_label")}
          @input=${(ev: Event) => {
            this._topic = (ev.target as HTMLInputElement).value;
            this._confirm = false;
          }}
        />
        <textarea
          .value=${this._text}
          placeholder=${t(hass, "card.messages.text_label")}
          aria-label=${t(hass, "card.messages.text_label")}
          @input=${(ev: Event) => {
            this._text = (ev.target as HTMLTextAreaElement).value;
            this._confirm = false;
          }}
        ></textarea>
        ${this._error ? html`<div class="form-error">${this._error}</div>` : nothing}
        <div class="form-actions">
          ${this._confirm
            ? html`<span class="confirm-hint">${t(hass, "card.messages.confirm_hint", { name: target.name })}</span>`
            : nothing}
          <button class="pill-btn ghost" type="button" @click=${() => this._open(target)}>
            ${t(hass, "card.messages.cancel")}
          </button>
          <button
            class="pill-btn ${this._confirm ? "warn" : "solid"}"
            type="button"
            ?disabled=${this._sending || !ready}
            @click=${() => this._send()}
          >
            <ha-icon icon="mdi:send"></ha-icon>${this._sending
              ? t(hass, "card.messages.sending")
              : this._confirm
                ? t(hass, "card.messages.confirm_send")
                : t(hass, "card.messages.send")}
          </button>
        </div>
      </div>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .name {
        white-space: nowrap;
      }
      .write {
        border: 0;
        background: none;
        padding: 0 2px;
        margin-left: 2px;
        line-height: 0;
        vertical-align: middle;
        color: var(--secondary-text-color);
        cursor: pointer;
        border-radius: 4px;
      }
      .write:hover,
      .write.on {
        color: var(--lc-brand);
      }
      .write:focus-visible,
      .pill-btn:focus-visible {
        outline: 2px solid var(--lc-brand);
        outline-offset: 2px;
      }
      .write ha-icon {
        --mdc-icon-size: 14px;
      }
      .form {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 8px;
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
      .sent-bar ha-icon {
        --mdc-icon-size: 14px;
        flex: none;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-teachers-card": LibrusTeachersCard;
  }
}
