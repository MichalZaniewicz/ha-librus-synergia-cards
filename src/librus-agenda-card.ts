import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { fetchCalendarEvents, type LibrusCalendarEvent } from "./utils/calendar";
import { formatShortDate, parseCategory } from "./utils/format";
import { t } from "./utils/localize";
import { librusCardEditor } from "./utils/card-editor";

const DEFAULT_RANGE_DAYS = 14;

@customElement("librus-agenda-card")
export class LibrusAgendaCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  @state() private _events: LibrusCalendarEvent[] = [];
  private _fetchedFor?: string;
  private _refreshTimer?: ReturnType<typeof setInterval>;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-agenda-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 4;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._refreshTimer = setInterval(() => void this._fetch(true), 15 * 60_000);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this._refreshTimer);
  }

  private async _fetch(force = false): Promise<void> {
    if (!this.hass || !this._config) return;
    const resolved = this._resolveEntities();
    if ("error" in resolved) return;
    const entityId = resolved.map.agenda;
    if (!entityId) return;

    const rangeDays = this._config.days_ahead ?? DEFAULT_RANGE_DAYS;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const end = new Date(today);
    end.setDate(end.getDate() + rangeDays);
    const cacheKey = `${entityId}:${today.toDateString()}:${rangeDays}`;
    if (!force && this._fetchedFor === cacheKey) return;
    this._fetchedFor = cacheKey;

    try {
      const events = await fetchCalendarEvents(this.hass, entityId, today, end);
      this._events = events.sort((a, b) => a.start.localeCompare(b.start));
    } catch {
      this._events = [];
    }
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const hass = this.hass;

    void this._fetch();

    if (this._events.length === 0) {
      return this._message("mdi:calendar-text-outline", t(hass, "card.agenda.empty"));
    }

    const groups = new Map<string, LibrusCalendarEvent[]>();
    for (const ev of this._events) {
      const day = ev.start.slice(0, 10);
      if (!groups.has(day)) groups.set(day, []);
      groups.get(day)!.push(ev);
    }

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-text-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title ?? t(hass, "card.agenda.title")}</div>
            <div class="subtitle">${t(hass, "card.agenda.subtitle")}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${[...groups.entries()].map(
            ([day, events]) => html`
              <div class="day-group">
                <div class="day-label">${formatShortDate(day, hass.language)}</div>
                ${events.map((ev) => {
                  const { category, text } = parseCategory(ev.summary);
                  return html`
                    <div class="list-item">
                      <span class="dot neutral"></span>
                      <div class="body">
                        ${category ? html`<div class="cat-label-row"><span class="cat-label">${category}</span></div>` : nothing}
                        <div class="row1">${text}</div>
                        ${ev.description ? html`<div class="item-text">${ev.description}</div>` : nothing}
                      </div>
                    </div>
                  `;
                })}
              </div>
            `
          )}
        </div>
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .day-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .day-group:not(:last-child) {
        margin-bottom: 4px;
      }
      .day-label {
        font-size: 0.66rem;
        font-weight: 800;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-agenda-card": LibrusAgendaCard;
  }
}
