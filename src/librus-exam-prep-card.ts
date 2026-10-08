import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { t } from "./utils/localize";
import { librusCardEditor } from "./utils/card-editor";
import { formatShortDate } from "./utils/format";

/** A topic to revise (Next exam sensor, integration 0.12.1+). */
interface Topic {
  date: string;
  lesson_no: number | null;
  topic: string;
  absent: boolean;
  /** Every lesson with this topic (integration 0.12.1-beta.2+). */
  dates?: string[];
}

/** One test in the Next exam sensor's `upcoming` attribute. */
interface Exam {
  id?: number;
  date: string;
  days_until?: number;
  subject: string | null;
  category: string | null;
  content: string;
  topics?: Topic[];
  topics_since?: string | null;
  missed_topics?: number;
  more_topics?: number;
}

/**
 * Tests of the coming days, each with the topics to revise: the lessons
 * taught in that subject since the previous test, the missed ones marked.
 * The soonest test is open; a tap opens or closes any other.
 */
@customElement("librus-exam-prep-card")
export class LibrusExamPrepCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  @state() private _open: Record<string, boolean> = {};

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-exam-prep-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 5;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const hass = this.hass;
    const entityId = resolved.map["next_exam"];
    const entity = entityId ? hass.states[entityId] : undefined;
    const icon = "mdi:book-education-outline";
    if (!entity) return this._message(icon, t(hass, "card.exam_prep.requires"));

    const all = (entity.attributes.upcoming as Exam[] | undefined) ?? [];
    const title = this._config.title ?? t(hass, "card.exam_prep.title");
    if (all.length > 0 && all.every((e) => e.topics === undefined)) {
      return this._message(icon, title, t(hass, "card.exam_prep.requires"));
    }
    const horizon = this._config.days_ahead ?? 14;
    const exams = all.filter((e) => (e.days_until ?? 0) <= horizon);
    if (exams.length === 0) {
      return this._message(icon, title, t(hass, "card.exam_prep.empty", { days: horizon }));
    }

    return html`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge"><ha-icon icon=${icon}></ha-icon></div>
          <div class="title-block">
            <div class="title">${title}</div>
            <div class="subtitle">
              ${t(hass, "card.exam_prep.subtitle", { count: exams.length, days: horizon })}
            </div>
          </div>
        </div>
        <div class="exams">${exams.map((exam, index) => this._exam(exam, index))}</div>
      </ha-card>
    `;
  }

  private _key(exam: Exam, index: number): string {
    return String(exam.id ?? `${exam.date}-${index}`);
  }

  private _exam(exam: Exam, index: number): TemplateResult {
    const hass = this.hass!;
    const key = this._key(exam, index);
    const open = this._open[key] ?? index === 0;
    const day = new Date(`${exam.date.slice(0, 10)}T00:00:00`);
    const topics = exam.topics ?? [];
    const days = exam.days_until ?? 0;
    const since = exam.topics_since
      ? t(hass, "card.exam_prep.since", { date: formatShortDate(exam.topics_since, hass.language) })
      : t(hass, "card.exam_prep.since_start");
    const meta = [
      exam.category,
      topics.length ? `${t(hass, "card.exam_prep.topics", { count: topics.length })} ${since}` : null,
      exam.missed_topics ? t(hass, "card.exam_prep.missed", { count: exam.missed_topics }) : null,
    ]
      .filter(Boolean)
      .join(" · ");
    return html`
      <div class="exam ${open ? "open" : ""}">
        <button class="top" @click=${() => this._toggle(key, open)} aria-expanded=${open ? "true" : "false"}>
          <div class="date">
            <b>${day.getDate()}</b>
            <span>${day.toLocaleDateString(hass.language, { month: "short" })}</span>
          </div>
          <div class="body">
            <div class="row1">
              <span class="subject">${exam.subject ?? exam.content}</span>
              <span class="pill ${days <= 3 ? "warn" : ""}">${this._when(days)}</span>
            </div>
            <div class="meta">${meta}</div>
          </div>
          <ha-icon class="caret" icon=${open ? "mdi:menu-up" : "mdi:menu-down"}></ha-icon>
        </button>
        ${open
          ? topics.length
            ? html`<div class="topics">
                ${exam.more_topics
                  ? html`<div class="more">${t(hass, "card.exam_prep.more", { count: exam.more_topics })}</div>`
                  : nothing}
                ${topics.map(
                  (topic) => html`<div class="topic">
                    <time>${formatShortDate(topic.date, hass.language)}</time>
                    <span class="text"
                      >${topic.topic}${(topic.dates?.length ?? 1) > 1
                        ? html` <span
                            class="times"
                            title=${topic.dates!.map((d) => formatShortDate(d, hass.language)).join(", ")}
                            >×${topic.dates!.length}</span
                          >`
                        : nothing}${topic.absent
                        ? html` <span class="tag">${t(hass, "card.exam_prep.absent")}</span>`
                        : nothing}</span
                    >
                  </div>`
                )}
              </div>`
            : html`<div class="none">
                ${exam.content ? html`<div>${exam.content}</div>` : nothing}
                <div>${t(hass, "card.exam_prep.no_topics")}</div>
              </div>`
          : nothing}
      </div>
    `;
  }

  private _toggle(key: string, open: boolean): void {
    this._open = { ...this._open, [key]: !open };
  }

  private _when(days: number): string {
    const hass = this.hass!;
    if (days <= 0) return t(hass, "card.exam_prep.today");
    if (days === 1) return t(hass, "card.exam_prep.tomorrow");
    return t(hass, "card.exam_prep.in_days", { days });
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .exams {
        display: grid;
        gap: 8px;
      }
      .exam {
        border-radius: 10px;
        background: var(--lc-chip-bg);
        overflow: hidden;
      }
      .exam.open {
        background: var(--lc-brand-bg);
      }
      .top {
        all: unset;
        box-sizing: border-box;
        width: 100%;
        display: flex;
        gap: 10px;
        align-items: center;
        padding: 10px 12px;
        cursor: pointer;
      }
      .top:focus-visible {
        outline: 2px solid var(--lc-brand);
        outline-offset: -2px;
        border-radius: 10px;
      }
      .date {
        width: 46px;
        flex: none;
        border-radius: 9px;
        background: var(--lc-brand-bg);
        color: var(--lc-brand-strong);
        text-align: center;
        padding: 5px 0;
      }
      .exam.open .date {
        background: var(--card-background-color, var(--ha-card-background));
      }
      .date b {
        display: block;
        font-size: 1.15rem;
        line-height: 1.1;
      }
      .date span {
        font-size: 0.62rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .body {
        flex: 1;
        min-width: 0;
      }
      .row1 {
        align-items: center;
      }
      .subject {
        min-width: 0;
        overflow-wrap: anywhere;
      }
      .pill {
        font-size: 0.66rem;
        font-weight: 700;
        border-radius: 999px;
        padding: 2px 8px;
        white-space: nowrap;
        background: var(--lc-brand-bg);
        color: var(--lc-brand-strong);
        flex: none;
      }
      .pill.warn {
        background: var(--lc-warn-bg);
        color: var(--lc-warn);
      }
      .meta {
        font-size: 0.72rem;
        color: var(--secondary-text-color);
        margin-top: 2px;
      }
      .caret {
        --mdc-icon-size: 20px;
        color: var(--secondary-text-color);
        flex: none;
      }
      .topics,
      .none {
        display: grid;
        gap: 7px;
        padding: 0 12px 12px;
        font-size: 0.78rem;
        line-height: 1.35;
      }
      .none {
        color: var(--secondary-text-color);
      }
      .topic {
        display: grid;
        grid-template-columns: 44px 1fr;
        gap: 8px;
      }
      .topic time {
        font-size: 0.68rem;
        color: var(--secondary-text-color);
        padding-top: 2px;
        font-variant-numeric: tabular-nums;
      }
      .text {
        min-width: 0;
        overflow-wrap: anywhere;
      }
      .tag {
        font-size: 0.6rem;
        font-weight: 700;
        color: var(--lc-bad);
        background: var(--lc-bad-bg);
        border-radius: 999px;
        padding: 1px 6px;
        white-space: nowrap;
      }
      .times {
        font-size: 0.62rem;
        font-weight: 700;
        color: var(--secondary-text-color);
        background: var(--lc-chip-bg);
        border-radius: 999px;
        padding: 1px 6px;
        white-space: nowrap;
      }
      .more {
        font-size: 0.7rem;
        color: var(--secondary-text-color);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-exam-prep-card": LibrusExamPrepCard;
  }
}
