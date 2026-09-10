import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { fetchCalendarEvents, type LibrusCalendarEvent } from "./utils/calendar";
import { daysBetween, formatShortDate, parseCategory } from "./utils/format";
import { t } from "./utils/localize";
import { tapActionHandler } from "./utils/actions";

const RANGE_DAYS = 90;
const BAD_STATES = new Set(["unknown", "unavailable", ""]);
// Agenda events are prefixed "[Category] ..." server-side (HomeWorks/
// Categories, e.g. "Sprawdzian"/"Wycieczka"/"Apel"/"Konkurs"/"Diagnoza").
// That category list is fetched per-school, not a fixed enum this client
// can rely on - "sprawdzian" (the common Polish word for a written test)
// is the best available signal without a structured "is this an exam"
// flag, but a school using different wording for the same thing won't
// match. Not exact, but the only signal there is. Only used as a FALLBACK
// now - the `next_exam` sensor (ha-librus-synergia with next_exam) does
// the same detection server-side and is preferred when present.
const EXAM_CATEGORY_RE = /sprawdzian/i;

function isExam(ev: LibrusCalendarEvent): boolean {
  const { category } = parseCategory(ev.summary);
  return category !== null && EXAM_CATEGORY_RE.test(category);
}

interface SensorExam {
  date: string;
  subject: string | null;
  category: string | null;
  content: string | null;
}

/** Normalized "date + one-line label" for an upcoming exam, from either
 * the next_exam sensor or the Agenda calendar fallback. */
interface ExamRef {
  date: string;
  text: string;
}

/**
 * A focused countdown to the NEXT upcoming test/exam. Prefers the
 * integration's `next_exam` sensor (server-side detection + an `upcoming`
 * list); falls back to scanning the Agenda calendar for "[Sprawdzian]"-
 * prefixed events when that sensor isn't present.
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

  private _sensorExams(): ExamRef[] | undefined {
    if (!this.hass) return undefined;
    const resolved = this._resolveEntities();
    if ("error" in resolved) return undefined;
    const entity = resolved.map.next_exam ? this.hass.states[resolved.map.next_exam] : undefined;
    if (!entity || BAD_STATES.has(entity.state)) return undefined;

    const todayIso = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD, local
    const list = (entity.attributes.upcoming as SensorExam[] | undefined) ?? [];
    const refs = list
      .filter((e) => e.date >= todayIso)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((e) => ({
        date: e.date,
        text: [e.subject, e.content].filter(Boolean).join(" — ") || e.category || "",
      }));
    // Sensor present but `upcoming` empty/older integration - still honour
    // its own state (the next exam's date) with the subject attribute.
    if (refs.length === 0) {
      return [{ date: entity.state, text: (entity.attributes.subject as string | undefined) ?? "" }];
    }
    return refs;
  }

  private async _fetch(force = false): Promise<void> {
    if (!this.hass || !this._config) return;
    const resolved = this._resolveEntities();
    if ("error" in resolved) return;
    // The next_exam sensor covers this - skip the calendar scan entirely.
    if (this._sensorExams() !== undefined) return;
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

    const exams: ExamRef[] =
      this._sensorExams() ??
      this._events.map((ev) => ({ date: ev.start, text: parseCategory(ev.summary).text }));

    if (exams.length === 0) {
      return this._message("mdi:clipboard-text-outline", t(hass, "card.exam_countdown.empty"));
    }

    const [next, ...rest] = exams;
    const days = daysBetween(new Date(), new Date(`${next.date.slice(0, 10)}T00:00:00`));

    return html`
      <ha-card @click=${tapActionHandler(this, this._config.tap_action, resolved.map.next_exam || resolved.map.agenda)}>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:clipboard-text-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${t(hass, "card.exam_countdown.title")}</div>
            <div class="subtitle">${formatShortDate(next.date, hass.language)}</div>
          </div>
        </div>
        <div class="countdown">
          <span class="big">${days}</span>
          <span class="unit">${t(hass, "label.days_until")}<br /><b>${next.text}</b></span>
        </div>
        ${rest.length
          ? html`
              <hr />
              <div class="chips">
                ${rest.slice(0, 4).map(
                  (e) => html`<span class="chip">${e.text} <span class="n">${formatShortDate(e.date, hass.language)}</span></span>`
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
