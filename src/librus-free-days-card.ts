import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { fetchCalendarEvents, type LibrusCalendarEvent } from "./utils/calendar";
import { daysBetween, formatShortDate } from "./utils/format";
import { t } from "./utils/localize";

const RANGE_DAYS = 240;

@customElement("librus-free-days-card")
export class LibrusFreeDaysCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  @state() private _events: LibrusCalendarEvent[] = [];
  private _fetchedFor?: string;
  private _refreshTimer?: ReturnType<typeof setInterval>;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-free-days-card" };
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
    this._refreshTimer = setInterval(() => void this._fetch(true), 60 * 60_000);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this._refreshTimer);
  }

  private async _fetch(force = false): Promise<void> {
    if (!this.hass || !this._config) return;
    const resolved = this._resolveEntities();
    if ("error" in resolved) return;
    const entityId = resolved.map.free_days;
    if (!entityId) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const end = new Date(today);
    end.setDate(end.getDate() + RANGE_DAYS);
    const cacheKey = `${entityId}:${today.toDateString()}`;
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
      return this._message("mdi:beach", t(hass, "card.free_days.empty"));
    }

    const today = new Date();
    const [next, ...rest] = this._events;
    const days = daysBetween(today, new Date(`${next.start}T00:00:00`));

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:beach"></ha-icon></div>
          <div class="title-block">
            <div class="title">${t(hass, "card.free_days.title")}</div>
            <div class="subtitle">${next.summary}</div>
          </div>
        </div>
        <div class="countdown">
          <span class="big">${days}</span>
          <span class="unit">${t(hass, "label.days_until")}<br /><b>${next.summary}</b></span>
        </div>
        ${rest.length
          ? html`
              <hr />
              <div class="chips">
                ${rest.slice(0, 4).map(
                  (ev) => html`<span class="chip">${ev.summary} <span class="n">${formatShortDate(ev.start, hass.language)}</span></span>`
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
      .countdown {
        display: flex;
        align-items: baseline;
        gap: 10px;
      }
      .countdown .big {
        font-size: 2rem;
        font-weight: 800;
        color: var(--lc-brand);
        line-height: 1;
        font-variant-numeric: tabular-nums;
      }
      .countdown .unit {
        font-size: 0.76rem;
        color: var(--secondary-text-color);
        line-height: 1.4;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-free-days-card": LibrusFreeDaysCard;
  }
}
