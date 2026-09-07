import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { fetchCalendarEvents, type LibrusCalendarEvent } from "./utils/calendar";
import { daysBetween } from "./utils/format";
import { t } from "./utils/localize";

const RANGE_DAYS = 240;

/** Compact single-row tile for the Free days calendar - same pattern as
 * librus-next-lesson-tile-card, for denser dashboards that don't want the
 * full Free days card's upcoming-list chips. */
@customElement("librus-free-days-tile-card")
export class LibrusFreeDaysTileCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  @state() private _events: LibrusCalendarEvent[] = [];
  private _fetchedFor?: string;
  private _refreshTimer?: ReturnType<typeof setInterval>;

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement("librus-device-editor") as LovelaceCardEditor;
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-free-days-tile-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 1;
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

    const [next] = this._events;
    const days = daysBetween(new Date(), new Date(`${next.start}T00:00:00`));

    return html`
      <ha-card class="tile">
        <div class="icon-badge amber"><ha-icon icon="mdi:beach"></ha-icon></div>
        <div class="tile-body">
          <div class="subj">${days} ${t(hass, "label.days").toLowerCase()}</div>
          <div class="meta">${next.summary}</div>
        </div>
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      ha-card.tile {
        flex-direction: row;
        align-items: center;
        padding: 12px 16px;
      }
      .tile-body {
        min-width: 0;
      }
      .subj {
        font-weight: 700;
        font-size: 0.86rem;
      }
      .meta {
        font-size: 0.7rem;
        color: var(--secondary-text-color);
        margin-top: 1px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-free-days-tile-card": LibrusFreeDaysTileCard;
  }
}
