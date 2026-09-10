import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { fetchCalendarEvents, type LibrusCalendarEvent } from "./utils/calendar";
import { formatTime } from "./utils/format";
import { t } from "./utils/localize";
import { librusCardEditor } from "./utils/card-editor";

interface HomeworkItem {
  topic: string;
  due_date: string | null;
}
interface UpcomingExam {
  date: string;
  subject: string | null;
  category: string | null;
}

/** Local-timezone "YYYY-MM-DD" (not via toISOString, which goes through UTC). */
function isoDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Next Mon-Fri after `from` (skips the weekend; does not know about holidays). */
function nextSchoolDay(from: Date): Date {
  const d = new Date(from);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 1);
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
  return d;
}

/**
 * The next school day at a glance - its lessons, plus any homework due or
 * exam scheduled that day. `today-card` covers *today*; this is the
 * "what's tomorrow (or Monday, from a Friday evening) going to be like"
 * companion. Lessons come from the timetable calendar; homework/exams
 * from the Homework assignments / Next exam sensors' own attributes.
 */
@customElement("librus-tomorrow-card")
export class LibrusTomorrowCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  @state() private _lessons: LibrusCalendarEvent[] = [];
  private _fetchedFor?: string;
  private _refreshTimer?: ReturnType<typeof setInterval>;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-tomorrow-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 3;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._refreshTimer = setInterval(() => void this._fetch(true), 30 * 60_000);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this._refreshTimer);
  }

  private async _fetch(force = false): Promise<void> {
    if (!this.hass || !this._config) return;
    const resolved = this._resolveEntities();
    if ("error" in resolved) return;
    const entityId = resolved.map.timetable;
    if (!entityId) return;

    const target = nextSchoolDay(new Date());
    const dayAfter = new Date(target);
    dayAfter.setDate(dayAfter.getDate() + 1);
    const cacheKey = `${entityId}:${isoDate(target)}`;
    if (!force && this._fetchedFor === cacheKey) return;
    this._fetchedFor = cacheKey;

    try {
      const events = await fetchCalendarEvents(this.hass, entityId, target, dayAfter);
      this._lessons = events.filter((e) => !e.allDay).sort((a, b) => a.start.localeCompare(b.start));
    } catch {
      this._lessons = [];
    }
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { map } = resolved;
    const hass = this.hass;

    void this._fetch();

    const target = nextSchoolDay(new Date());
    const targetIso = isoDate(target);

    const homeworkEntity = map.homework_assignments ? hass.states[map.homework_assignments] : undefined;
    const homeworkDue = ((homeworkEntity?.attributes.recent as HomeworkItem[] | undefined) ?? []).filter(
      (h) => (h.due_date ?? "").slice(0, 10) === targetIso
    );

    const examEntity = map.next_exam ? hass.states[map.next_exam] : undefined;
    const exams = ((examEntity?.attributes.upcoming as UpcomingExam[] | undefined) ?? []).filter(
      (e) => e.date === targetIso
    );

    if (this._lessons.length === 0 && homeworkDue.length === 0 && exams.length === 0) {
      return this._message("mdi:calendar-arrow-right", t(hass, "card.tomorrow.empty"));
    }

    const first = this._lessons[0];
    const last = this._lessons[this._lessons.length - 1];

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-arrow-right"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title ?? t(hass, "card.tomorrow.title")}</div>
            <div class="subtitle">
              ${target.toLocaleDateString(hass.language, { weekday: "long", day: "numeric", month: "long" })}
            </div>
          </div>
        </div>
        ${this._lessons.length
          ? html`
              <div class="stats">
                <div class="stat">
                  <div class="stat-value">${this._lessons.length}</div>
                  <div class="stat-label">${t(hass, "card.tomorrow.lessons")}</div>
                </div>
                <div class="stat">
                  <div class="stat-value">${formatTime(first.start)}</div>
                  <div class="stat-label">${t(hass, "card.tomorrow.starts")}</div>
                </div>
                <div class="stat">
                  <div class="stat-value">${formatTime(last.end)}</div>
                  <div class="stat-label">${t(hass, "card.tomorrow.ends")}</div>
                </div>
              </div>
            `
          : nothing}
        ${exams.length || homeworkDue.length
          ? html`
              <div class="alerts">
                ${exams.map(
                  (e) => html`
                    <div class="alert-row">
                      <span class="dot bad"></span>
                      <span>${e.category ? `${e.category}: ` : ""}${e.subject ?? ""}</span>
                    </div>
                  `
                )}
                ${homeworkDue.length
                  ? html`
                      <div class="alert-row">
                        <span class="dot warn"></span>
                        <span>${t(hass, "card.tomorrow.homework", { n: homeworkDue.length })}</span>
                      </div>
                    `
                  : nothing}
              </div>
            `
          : nothing}
        ${this._lessons.length
          ? html`
              <hr />
              <div class="scroll-list">
                ${this._lessons.map(
                  (ev) => html`
                    <div class="list-item">
                      <span class="lt">${formatTime(ev.start)}</span>
                      <div class="body">
                        <div class="row1">${ev.summary}</div>
                        ${ev.location || ev.description
                          ? html`<div class="item-text">${[ev.location, ev.description].filter(Boolean).join(" · ")}</div>`
                          : nothing}
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

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .alerts {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-top: 4px;
      }
      .alert-row {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.8rem;
      }
      .lt {
        flex: none;
        width: 40px;
        font-size: 0.7rem;
        font-weight: 700;
        color: var(--secondary-text-color);
        font-variant-numeric: tabular-nums;
        padding-top: 1px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-tomorrow-card": LibrusTomorrowCard;
  }
}
