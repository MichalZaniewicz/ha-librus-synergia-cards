import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { formatShortDate } from "./utils/format";
import { t } from "./utils/localize";
import { librusCardEditor } from "./utils/card-editor";

interface HomeworkItem {
  id?: number;
  topic: string;
  text: string;
  due_date: string | null;
  teacher: string | null;
}

/**
 * The Homework assignments list with a tick-box per item. "Done" is
 * per-viewer local state (`localStorage`, keyed by device + item id) -
 * Librus has no "mark homework done" API, and this is a personal
 * convenience, not shared state. Ticked items drop to the bottom, dimmed
 * and struck through. Stored ids are pruned to what's currently in the
 * list, so it can't grow without bound.
 */
@customElement("librus-homework-checklist-card")
export class LibrusHomeworkChecklistCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  @state() private _done: Set<string> = new Set();
  private _storageKey = "";

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-homework-checklist-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 3;
  }

  private _load(deviceId: string): void {
    const key = `librus-hw-done:${deviceId}`;
    if (this._storageKey === key) return;
    this._storageKey = key;
    try {
      const raw = window.localStorage.getItem(key);
      this._done = new Set(raw ? (JSON.parse(raw) as string[]) : []);
    } catch {
      this._done = new Set();
    }
  }

  private _persist(currentIds: Set<string>): void {
    // Only keep ids that are still in the list - bounds the stored size.
    const kept = [...this._done].filter((id) => currentIds.has(id));
    try {
      window.localStorage.setItem(this._storageKey, JSON.stringify(kept));
    } catch {
      /* private mode / storage disabled - the in-memory set still works for this render */
    }
  }

  private _toggle(id: string, currentIds: Set<string>): void {
    const next = new Set(this._done);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    this._done = next;
    this._persist(currentIds);
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { deviceId, map } = resolved;
    const hass = this.hass;

    this._load(deviceId);

    const entity = map.homework_assignments ? hass.states[map.homework_assignments] : undefined;
    const items = ((entity?.attributes.recent as HomeworkItem[] | undefined) ?? []).map((it, i) => ({
      ...it,
      key: it.id !== undefined ? String(it.id) : `${it.topic}|${it.due_date ?? i}`,
    }));

    if (items.length === 0) {
      return this._message("mdi:notebook-edit-outline", t(hass, "card.homework_assignments.empty"));
    }

    const currentIds = new Set(items.map((it) => it.key));
    const max = this._config.max_items ?? 12;
    const sorted = [...items].sort((a, b) => {
      const da = this._done.has(a.key) ? 1 : 0;
      const db = this._done.has(b.key) ? 1 : 0;
      if (da !== db) return da - db; // not-done first
      return (a.due_date ?? "").localeCompare(b.due_date ?? "");
    });
    const doneCount = items.filter((it) => this._done.has(it.key)).length;

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:notebook-edit-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title ?? t(hass, "card.homework_checklist.title")}</div>
            <div class="subtitle">
              ${t(hass, "card.homework_checklist.progress", { done: doneCount, total: items.length })}
            </div>
          </div>
        </div>
        <div class="scroll-list">
          ${sorted.slice(0, max).map((it) => {
            const isDone = this._done.has(it.key);
            return html`
              <div
                class="hw-item ${isDone ? "done" : ""}"
                role="checkbox"
                aria-checked=${isDone}
                tabindex="0"
                @click=${() => this._toggle(it.key, currentIds)}
                @keydown=${(e: KeyboardEvent) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    this._toggle(it.key, currentIds);
                  }
                }}
              >
                <span class="box"><ha-icon icon=${isDone ? "mdi:checkbox-marked" : "mdi:checkbox-blank-outline"}></ha-icon></span>
                <div class="body">
                  <div class="row1">
                    <span>${it.topic || it.text}</span>
                    ${it.due_date
                      ? html`<time>${formatShortDate(it.due_date, hass.language)}</time>`
                      : nothing}
                  </div>
                  ${it.text && it.text !== it.topic
                    ? html`<div class="item-text">${it.text}</div>`
                    : nothing}
                </div>
              </div>
            `;
          })}
        </div>
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .hw-item {
        display: flex;
        gap: 10px;
        padding: 7px 4px;
        border-radius: 8px;
        cursor: pointer;
      }
      .hw-item:hover {
        background: var(--lc-chip-bg);
      }
      .box {
        flex: none;
        color: var(--lc-brand);
        display: flex;
        align-items: flex-start;
        padding-top: 1px;
      }
      .box ha-icon {
        --mdc-icon-size: 20px;
      }
      .hw-item.done {
        opacity: 0.5;
      }
      .hw-item.done .box {
        color: var(--lc-good);
      }
      .hw-item.done .row1 span {
        text-decoration: line-through;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-homework-checklist-card": LibrusHomeworkChecklistCard;
  }
}
