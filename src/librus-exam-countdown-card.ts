import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { fetchCalendarEvents, type LibrusCalendarEvent } from "./utils/calendar";
import { daysBetween, formatShortDate } from "./utils/format";
import { t } from "./utils/localize";

const RANGE_DAYS = 90;
// Agenda events are prefixed "[Category] ..." server-side (HomeWorks/
// Categories, e.g. "Sprawdzian"/"Wycieczka"/"Apel"/"Konkurs"/"Diagnoza").
// That category list is fetched per-school, not a fixed enum this client
// can rely on - "sprawdzian" (the common Polish word for a written test)
// is the best available signal without a structured "is this an exam"
// flag, but a school using different wording for the same thing won't
// match. Not exact, but the only signal there is.
const CATEGORY_RE = /^\[([^\]]+)\]\s*/;
const EXAM_CATEGORY_RE = /sprawdzian/i;

function isExam(ev: LibrusCalendarEvent): boolean {
  const match = CATEGORY_RE.exec(ev.summary);
  return match !== null && EXAM_CATEGORY_RE.test(match[1]);
}

function stripCategory(summary: string): string {
  return summary.replace(CATEGORY_RE, "");
}

/**
 * A focused countdown to the NEXT upcoming test/exam, pulled out of the
 * general Agenda feed - the full Agenda card mixes these in with
 * meetings/trips/everything else, so this answers "when's my next
 * sprawdzian?" without having to scan the whole list.
 */
@customElement("librus-exam-countdown-card")
export class LibrusExamCountdownCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  @state() private _events: LibrusCalendarEvent[] = [];
  private _fetchedFor?: string;
  private _refreshTimer?: ReturnType<typeof setInterval>;

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement("librus-device-editor") as LovelaceCardEditor;
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-exam-countdown-card" };
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

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const end = new Date(today);
    end.setDate(end.getDate() + RANGE_DAYS);
    const cacheKey = `${entityId}:${today.toDateString()}`;
    if (!force && this._fetchedFor === cacheKey) return;
    this._fetchedFor = cacheKey;

    try {
      const events = await fetchCalendarEvents(this.hass, entityId, today, end);
      this._events = events.filter(isExam).sort((a, b) => a.start.localeCompare(b.start));
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
      return this._message("mdi:clipboard-text-outline", t(hass, "card.exam_countdown.empty"));
    }

    const [next, ...rest] = this._events;
    const days = daysBetween(new Date(), new Date(`${next.start}T00:00:00`));
    const nextText = stripCategory(next.summary);

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:clipboard-text-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${t(hass, "card.exam_countdown.title")}</div>
            <div class="subtitle">${formatShortDate(next.start, hass.language)}</div>
          </div>
        </div>
        <div class="countdown">
          <span class="big">${days}</span>
          <span class="unit">${t(hass, "label.days_until")}<br /><b>${nextText}</b></span>
        </div>
        ${rest.length
          ? html`
              <hr />
              <div class="chips">
                ${rest.slice(0, 4).map(
                  (ev) => html`<span class="chip">${stripCategory(ev.summary)} <span class="n">${formatShortDate(ev.start, hass.language)}</span></span>`
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
    "librus-exam-countdown-card": LibrusExamCountdownCard;
  }
}
