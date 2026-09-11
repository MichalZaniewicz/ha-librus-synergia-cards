import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { minutesUntil } from "./utils/format";
import { t, formatCountdown } from "./utils/localize";
import { tapActionHandler } from "./utils/actions";

const UNAVAILABLE = new Set(["unknown", "unavailable", ""]);

@customElement("librus-today-card")
export class LibrusTodayCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  private _tickTimer?: ReturnType<typeof setInterval>;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-today-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 2;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._tickTimer = setInterval(() => this.requestUpdate(), 60_000);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this._tickTimer);
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { map } = resolved;
    const hass = this.hass;
    const get = (key: string) => (map[key] ? hass.states[map[key]] : undefined);

    const lucky = get("lucky_number");
    const messages = get("unread_messages");
    const announcements = get("unread_announcements");
    const timetable = get("timetable");

    const message = timetable?.attributes.message as string | undefined;
    const startTime = timetable?.attributes.start_time as string | undefined;
    const isNow = timetable?.state === "on";

    return html`
      <ha-card @click=${tapActionHandler(this, this._config.tap_action, map.timetable)}>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:white-balance-sunny"></ha-icon></div>
          <div class="title-block">
            <div class="title">${t(hass, "card.today.title")}</div>
            <div class="subtitle">${new Date().toLocaleDateString(hass.language, { weekday: "long", day: "numeric", month: "long" })}</div>
          </div>
        </div>
        <div class="stats">
          ${// CONFIRMED live (integration 0.4.15+): Librus can publish
          // the NEXT school day's number a day ahead of when it's
          // actually "today's" - this card's whole premise is "what
          // matters today", so only show the tile when it genuinely
          // is today's number (older integration versions don't send
          // is_today yet - undefined still shows it, matching the
          // original behavior for anyone who hasn't updated).
          lucky && !UNAVAILABLE.has(lucky.state) && lucky.attributes.is_today !== false
            ? html`<div class="stat"><div class="stat-value">${lucky.state}</div><div class="stat-label">${t(hass, "stat.lucky_number")}</div></div>`
            : nothing}
          ${// BUG FIX (2026-09-07, found live): both tiles used the same
          // generic "Nieprzeczytane" (Unread) label - the previous fix for
          // the "Nowe" mislabeling made this one honest but created a new
          // problem, two adjacent stat tiles reading "1 / Nieprzeczytane"
          // with no way to tell messages from announcements apart. Each
          // now names what it's actually counting (still an unread count
          // either way - that hasn't changed), matching how the dedicated
          // Messages/Announcements tile cards already label themselves.
          messages && !UNAVAILABLE.has(messages.state)
            ? html`<div class="stat"><div class="stat-value">${messages.state}</div><div class="stat-label">${t(hass, "card.messages.title")}</div></div>`
            : nothing}
          ${announcements && !UNAVAILABLE.has(announcements.state)
            ? html`<div class="stat"><div class="stat-value">${announcements.state}</div><div class="stat-label">${t(hass, "card.announcements.title")}</div></div>`
            : nothing}
        </div>
        ${message && startTime
          ? html`
              <hr />
              <div class="list-item">
                <span class="dot ${isNow ? "good" : "neutral"}"></span>
                <div class="body">
                  <div class="row1">${message}</div>
                  ${!isNow
                    ? html`<div class="item-text">${formatCountdown(hass, minutesUntil(new Date(startTime.replace(" ", "T")), new Date()))}</div>`
                    : nothing}
                </div>
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
    "librus-today-card": LibrusTodayCard;
  }
}
