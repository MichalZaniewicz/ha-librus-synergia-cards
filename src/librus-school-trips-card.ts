import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { t } from "./utils/localize";
import { librusCardEditor } from "./utils/card-editor";
import { formatShortDate } from "./utils/format";

/** One trip in the Next school trip sensor's attributes (integration 0.12.0+). */
interface Trip {
  destination: string;
  route: string;
  transport: string;
  date_from: string | null;
  date_to: string | null;
  coordinator: string | null;
}

/**
 * School trips: the next one with its date, transport, route and
 * coordinator, and the ones after it. Reads the Next school trip sensor.
 */
@customElement("librus-school-trips-card")
export class LibrusSchoolTripsCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-school-trips-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 4;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const hass = this.hass;
    const entityId = resolved.map["school_trips"];
    const entity = entityId ? hass.states[entityId] : undefined;
    if (!entity) return this._message("mdi:bus-school", t(hass, "card.school_trips.requires"));

    const upcoming = (entity.attributes.upcoming as Trip[] | undefined) ?? [];
    const title = this._config.title ?? t(hass, "card.school_trips.title");
    if (upcoming.length === 0) {
      return this._message("mdi:bus-school", title, t(hass, "card.school_trips.empty"));
    }
    const next = upcoming[0];
    const daysUntil = entity.attributes.days_until as number | null | undefined;
    const start = next.date_from ? new Date(`${next.date_from.slice(0, 10)}T00:00:00`) : null;
    const max = this._config.max_items ?? 4;

    return html`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:bus-school"></ha-icon></div>
          <div class="title-block">
            <div class="title">${title}</div>
            <div class="subtitle">${t(hass, "card.school_trips.subtitle", { count: upcoming.length })}</div>
          </div>
        </div>
        <div class="hero">
          ${start
            ? html`<div class="date">
                <b>${start.getDate()}</b>
                <span>${start.toLocaleDateString(hass.language, { month: "short" })}</span>
              </div>`
            : nothing}
          <div class="hero-text">
            <div class="dest">${next.destination}</div>
            ${start
              ? html`<div class="meta">
                  ${start.toLocaleDateString(hass.language, { weekday: "long" })}${next.date_to &&
                  next.date_to.slice(0, 10) !== next.date_from?.slice(0, 10)
                    ? html` – ${formatShortDate(next.date_to, hass.language)}`
                    : nothing}
                </div>`
              : nothing}
          </div>
          ${daysUntil !== null && daysUntil !== undefined && daysUntil <= 7
            ? html`<span class="soon">${this._when(daysUntil)}</span>`
            : nothing}
        </div>
        <div class="facts">
          ${next.transport
            ? html`<div class="fact"><ha-icon icon="mdi:bus"></ha-icon><span>${next.transport}</span></div>`
            : nothing}
          ${next.route
            ? html`<div class="fact"><ha-icon icon="mdi:map-marker-outline"></ha-icon><span>${next.route}</span></div>`
            : nothing}
          ${next.coordinator
            ? html`<div class="fact"><ha-icon icon="mdi:account-outline"></ha-icon><span>${next.coordinator}</span></div>`
            : nothing}
        </div>
        ${upcoming.length > 1
          ? html`<div class="later">
              ${upcoming.slice(1, max).map(
                (trip) => html`<div class="later-row">
                  <span class="later-dest">${trip.destination}</span>
                  <time>${trip.date_from ? formatShortDate(trip.date_from, hass.language) : ""}</time>
                </div>`
              )}
            </div>`
          : nothing}
      </ha-card>
    `;
  }

  private _when(days: number): string {
    const hass = this.hass!;
    if (days <= 0) return t(hass, "card.school_trips.today");
    if (days === 1) return t(hass, "card.school_trips.tomorrow");
    return t(hass, "card.school_trips.in_days", { days });
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .hero {
        display: flex;
        gap: 14px;
        align-items: center;
      }
      .date {
        width: 54px;
        flex: none;
        border-radius: 10px;
        background: var(--lc-brand-bg);
        color: var(--lc-brand-strong);
        text-align: center;
        padding: 6px 0;
      }
      .date b {
        display: block;
        font-size: 1.35rem;
        line-height: 1.1;
      }
      .date span {
        font-size: 0.68rem;
        text-transform: uppercase;
        letter-spacing: 0.06em;
      }
      .hero-text {
        min-width: 0;
        flex: 1;
      }
      .dest {
        font-weight: 600;
        font-size: 0.92rem;
        overflow-wrap: anywhere;
      }
      .meta {
        font-size: 0.76rem;
        color: var(--secondary-text-color);
      }
      .soon {
        font-size: 0.72rem;
        font-weight: 700;
        color: var(--lc-good);
        background: var(--lc-good-bg);
        padding: 2px 8px;
        border-radius: 999px;
        white-space: nowrap;
        flex: none;
      }
      .facts {
        display: grid;
        gap: 6px;
        font-size: 0.8rem;
      }
      .fact {
        display: grid;
        grid-template-columns: 18px 1fr;
        gap: 8px;
        align-items: start;
      }
      .fact ha-icon {
        --mdc-icon-size: 16px;
        color: var(--secondary-text-color);
      }
      .fact span {
        overflow-wrap: anywhere;
      }
      .later {
        display: grid;
        gap: 6px;
        border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
        padding-top: 10px;
        font-size: 0.8rem;
      }
      .later-row {
        display: flex;
        justify-content: space-between;
        gap: 10px;
      }
      .later-dest {
        min-width: 0;
        overflow-wrap: anywhere;
      }
      .later-row time {
        color: var(--secondary-text-color);
        white-space: nowrap;
        font-variant-numeric: tabular-nums;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-school-trips-card": LibrusSchoolTripsCard;
  }
}
