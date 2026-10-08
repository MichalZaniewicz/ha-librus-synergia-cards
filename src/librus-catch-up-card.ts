import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { t } from "./utils/localize";
import { librusCardEditor } from "./utils/card-editor";
import { formatShortDate } from "./utils/format";

/** The Lesson topics sensor's `catch_up` attribute (integration 0.12.2+). */
interface CatchUp {
  from: string;
  to: string;
  days: number;
  back_on: string | null;
  back_today: boolean;
  lessons: { date: string; lesson_no: number | null; subject: string | null; topic: string | null }[];
  homework: { id: number | string; date: string; due_date: string | null; subject: string | null; topic: string }[];
}

interface Row {
  key: string;
  date: string;
  text: string | null;
  homework?: { due: string | null };
}

/**
 * What to catch up on after the latest absence, per subject: the lessons
 * missed with their topics and the homework given meanwhile. Ticks are kept
 * in `localStorage` (per browser), pruned to the current absence.
 */
@customElement("librus-catch-up-card")
export class LibrusCatchUpCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  @state() private _done: Set<string> = new Set();
  private _storageKey = "";

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-catch-up-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 5;
  }

  private _load(deviceId: string): void {
    const key = `librus-catch-up-done:${deviceId}`;
    if (this._storageKey === key) return;
    this._storageKey = key;
    try {
      const raw = window.localStorage.getItem(key);
      this._done = new Set(raw ? (JSON.parse(raw) as string[]) : []);
    } catch {
      this._done = new Set();
    }
  }

  private _toggle(key: string, current: Set<string>): void {
    const next = new Set(this._done);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    this._done = next;
    // Only keep the keys of the current absence - bounds the stored size.
    try {
      window.localStorage.setItem(
        this._storageKey,
        JSON.stringify([...next].filter((k) => current.has(k)))
      );
    } catch {
      /* private mode / storage disabled - the in-memory set still works */
    }
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const hass = this.hass;
    const { deviceId, map } = resolved;
    const icon = "mdi:book-refresh-outline";
    const entity = map["lesson_topics"] ? hass.states[map["lesson_topics"]] : undefined;
    if (!entity) return this._message(icon, t(hass, "card.catch_up.requires"));
    const title = this._config.title ?? t(hass, "card.catch_up.title");
    if (!("catch_up" in entity.attributes)) {
      return this._message(icon, title, t(hass, "card.catch_up.requires"));
    }
    const cu = entity.attributes.catch_up as CatchUp | null;
    if (!cu || (cu.lessons.length === 0 && cu.homework.length === 0)) {
      return this._message(icon, title, t(hass, "card.catch_up.empty"));
    }
    this._load(deviceId);

    // One group per subject, in the order the subjects were first missed.
    const groups = new Map<string, Row[]>();
    const add = (subject: string | null, row: Row) => {
      const name = subject ?? t(hass, "card.catch_up.other");
      if (!groups.has(name)) groups.set(name, []);
      groups.get(name)!.push(row);
    };
    for (const l of cu.lessons) {
      add(l.subject, { key: `${l.date}|${l.lesson_no ?? ""}`, date: l.date, text: l.topic });
    }
    for (const h of cu.homework) {
      add(h.subject, { key: `hw:${h.id}`, date: h.date, text: h.topic, homework: { due: h.due_date } });
    }
    const keys = new Set([...groups.values()].flat().map((r) => r.key));
    const done = [...keys].filter((k) => this._done.has(k)).length;
    const period =
      cu.from === cu.to
        ? formatShortDate(cu.from, hass.language)
        : `${formatShortDate(cu.from, hass.language)} – ${formatShortDate(cu.to, hass.language)}`;
    const back = cu.back_today
      ? t(hass, "card.catch_up.back_today")
      : cu.back_on
        ? t(hass, "card.catch_up.back_on", { date: formatShortDate(cu.back_on, hass.language) })
        : null;

    return html`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon=${icon}></ha-icon></div>
          <div class="title-block">
            <div class="title">${title}</div>
            <div class="subtitle">
              ${t(hass, "card.catch_up.subtitle", { period, count: groups.size })}
            </div>
          </div>
          ${back ? html`<span class="pill">${back}</span>` : nothing}
        </div>
        <div class="progress">
          <div class="bar"><div style="width:${keys.size ? Math.round((100 * done) / keys.size) : 0}%"></div></div>
          <span>${t(hass, "card.catch_up.progress", { done, total: keys.size })}</span>
        </div>
        ${[...groups.entries()].map(([subject, rows]) => {
          const lessons = rows.filter((r) => !r.homework).length;
          const homework = rows.length - lessons;
          const meta = [
            lessons ? t(hass, "card.catch_up.lessons", { count: lessons }) : null,
            homework ? t(hass, "card.catch_up.homework", { count: homework }) : null,
          ]
            .filter(Boolean)
            .join(" · ");
          return html`<div class="subj">
            <div class="head"><span class="name">${subject}</span><span class="meta">${meta}</span></div>
            ${rows.map((row) => {
              const ticked = this._done.has(row.key);
              return html`<button
                class="row ${ticked ? "done" : ""} ${row.homework ? "hw" : ""}"
                @click=${() => this._toggle(row.key, keys)}
                aria-pressed=${ticked ? "true" : "false"}
              >
                <time>${formatShortDate(row.date, hass.language)}</time>
                <ha-icon
                  class="box"
                  icon=${ticked ? "mdi:checkbox-marked" : "mdi:checkbox-blank-outline"}
                ></ha-icon>
                ${row.homework ? html`<ha-icon class="hw-icon" icon="mdi:notebook-edit-outline"></ha-icon>` : nothing}
                <span class="text ${row.text ? "" : "muted"}"
                  >${row.text ?? t(hass, "card.catch_up.no_topic")}</span
                >
                ${row.homework?.due
                  ? html`<span class="due"
                      >${t(hass, "card.catch_up.due", { date: formatShortDate(row.homework.due, hass.language) })}</span
                    >`
                  : nothing}
              </button>`;
            })}
          </div>`;
        })}
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .pill {
        font-size: 0.66rem;
        font-weight: 700;
        border-radius: 999px;
        padding: 2px 8px;
        white-space: nowrap;
        background: var(--lc-good-bg);
        color: var(--lc-good);
        flex: none;
      }
      .progress {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 0.72rem;
        color: var(--secondary-text-color);
      }
      .bar {
        flex: 1;
        height: 6px;
        border-radius: 999px;
        background: var(--lc-ring-track);
        overflow: hidden;
      }
      .bar > div {
        height: 100%;
        background: var(--lc-brand);
      }
      .subj {
        border-radius: 10px;
        background: var(--lc-chip-bg);
        padding: 10px 12px;
        display: grid;
        gap: 6px;
      }
      .head {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 8px;
        font-size: 0.82rem;
        font-weight: 700;
      }
      .name {
        min-width: 0;
        overflow-wrap: anywhere;
      }
      .meta {
        font-size: 0.68rem;
        color: var(--secondary-text-color);
        font-weight: 600;
        white-space: nowrap;
      }
      .row {
        all: unset;
        box-sizing: border-box;
        display: flex;
        gap: 8px;
        align-items: flex-start;
        font-size: 0.78rem;
        line-height: 1.35;
        cursor: pointer;
        border-radius: 6px;
      }
      .row:focus-visible {
        outline: 2px solid var(--lc-brand);
      }
      .row time {
        font-size: 0.66rem;
        color: var(--secondary-text-color);
        width: 40px;
        flex: none;
        padding-top: 2px;
        font-variant-numeric: tabular-nums;
      }
      .box {
        --mdc-icon-size: 17px;
        color: var(--secondary-text-color);
        flex: none;
      }
      .row.done .box {
        color: var(--lc-good);
      }
      .hw-icon {
        --mdc-icon-size: 16px;
        color: var(--lc-brand);
        flex: none;
      }
      .text {
        flex: 1;
        min-width: 0;
        overflow-wrap: anywhere;
      }
      .text.muted {
        color: var(--secondary-text-color);
        font-style: italic;
      }
      .row.done .text {
        color: var(--secondary-text-color);
        text-decoration: line-through;
      }
      .due {
        font-size: 0.66rem;
        font-weight: 700;
        color: var(--lc-warn);
        white-space: nowrap;
        flex: none;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-catch-up-card": LibrusCatchUpCard;
  }
}
