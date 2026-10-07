import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { t } from "./utils/localize";
import { librusCardEditor } from "./utils/card-editor";
import { isoDate } from "./utils/calendar";

/** One row of the Lesson topics sensor's `recent` attribute (integration 0.11.1+). */
interface TopicRow {
  date: string;
  lesson_no: number | null;
  subject: string | null;
  topic: string;
  is_trip: boolean;
  absent?: boolean;
}

const DEFAULT_DAYS = 3;

/**
 * "Co było na lekcji": the topics of the last few school days, day by day
 * and lesson by lesson, from the Lesson topics sensor. Lessons the student
 * missed are marked, so it doubles as a "what to catch up on" list.
 */
@customElement("librus-lesson-topics-card")
export class LibrusLessonTopicsCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-lesson-topics-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 5;
  }

  private _dayLabel(day: string): string {
    const hass = this.hass!;
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const date = new Date(`${day}T00:00:00`);
    const formatted = date.toLocaleDateString(hass.language, { weekday: "short", day: "numeric", month: "short" });
    if (day === isoDate(today)) return `${t(hass, "card.lesson_topics.today")} · ${formatted}`;
    if (day === isoDate(yesterday)) return `${t(hass, "card.lesson_topics.yesterday")} · ${formatted}`;
    return formatted;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const hass = this.hass;
    const entityId = resolved.map["lesson_topics"];
    const entity = entityId ? hass.states[entityId] : undefined;
    if (!entity) {
      return this._message("mdi:book-open-page-variant-outline", t(hass, "card.lesson_topics.requires"));
    }

    const rows = ((entity.attributes.recent as TopicRow[] | undefined) ?? []).filter((r) => r.date);
    const days = [...new Set(rows.map((r) => r.date))].sort().reverse().slice(0, this._config.days ?? DEFAULT_DAYS);
    if (days.length === 0) {
      return this._message("mdi:book-open-page-variant-outline", t(hass, "card.lesson_topics.empty"));
    }
    const shown = rows.filter((r) => days.includes(r.date));
    const missed = shown.filter((r) => r.absent).length;

    return html`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title ?? t(hass, "card.lesson_topics.title")}</div>
            <div class="subtitle">
              ${missed
                ? t(hass, "card.lesson_topics.missed", { count: missed })
                : t(hass, "card.lesson_topics.subtitle", { days: days.length })}
            </div>
          </div>
        </div>
        <div class="scroll-list">
          ${days.map(
            (day) => html`
              <div class="day">${this._dayLabel(day)}</div>
              ${shown
                .filter((r) => r.date === day)
                .sort((a, b) => (a.lesson_no ?? 99) - (b.lesson_no ?? 99))
                .map(
                  (r) => html`
                    <div class="topic-row ${r.absent ? "missed" : ""}">
                      <span class="no">${r.lesson_no ?? "·"}</span>
                      <div class="body">
                        <div class="subj">
                          ${r.subject ?? t(hass, "card.lesson_topics.lesson")}${r.is_trip
                            ? html`<span class="lesson-tag substitution">${t(hass, "card.lesson_topics.trip")}</span>`
                            : nothing}${r.absent
                            ? html`<span class="lesson-tag cancelled">${t(hass, "card.lesson_topics.absent")}</span>`
                            : nothing}
                        </div>
                        <div class="topic">${r.topic}</div>
                      </div>
                    </div>
                  `
                )}
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
      .day {
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--secondary-text-color);
        margin: 6px 0 2px;
      }
      .day:first-child {
        margin-top: 0;
      }
      .topic-row {
        display: grid;
        grid-template-columns: 26px 1fr;
        gap: 10px;
        padding: 5px 0;
      }
      .topic-row.missed {
        border-left: 3px solid var(--lc-warn);
        padding-left: 8px;
      }
      .no {
        width: 26px;
        height: 26px;
        border-radius: 8px;
        background: var(--lc-brand-bg);
        color: var(--lc-brand-strong);
        display: grid;
        place-items: center;
        font-weight: 800;
        font-size: 0.78rem;
      }
      .body {
        min-width: 0;
      }
      .subj {
        font-weight: 600;
        font-size: 0.84rem;
      }
      .topic {
        font-size: 0.8rem;
        color: var(--primary-text-color);
        opacity: 0.85;
        overflow-wrap: anywhere;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-lesson-topics-card": LibrusLessonTopicsCard;
  }
}
