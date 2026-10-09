import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { formatShortDate } from "./utils/format";
import { t } from "./utils/localize";
import { librusCardEditor } from "./utils/card-editor";
import {
  downloadHomeworkFile,
  homeworkFileStyles,
  renderHomeworkFiles,
  type FileState,
  type HomeworkFile,
} from "./utils/homework-files";

interface HomeworkItem {
  id?: number;
  topic: string;
  text: string;
  due_date: string | null;
  teacher: string | null;
  /** Homework category name (integration 0.12.0+). */
  category?: string | null;
  subject?: string | null;
  /** Files the teacher attached (newer integration). */
  attachments?: HomeworkFile[];
}

/**
 * The Homework assignments list with a tick-box per item. Ticked items
 * drop to the bottom, dimmed and struck through.
 *
 * Where "done" lives: with backend 0.10.1+ the integration has a Homework
 * to-do list (`todo` entity, same item ids), so ticks go through
 * `todo.update_item` and are shared by every device. Ticks made earlier in
 * this browser are pushed there once. On an older backend the ticks stay
 * in `localStorage` (per browser), pruned to the ids still in the list.
 */
@customElement("librus-homework-checklist-card")
export class LibrusHomeworkChecklistCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  @state() private _done: Set<string> = new Set();
  private _storageKey = "";
  /** The todo entity's `last_updated` the current `_done` was read for. */
  private _todoReadFor?: string;
  /** Item ids the Homework to-do list currently holds (backend 0.10.1+). */
  @state() private _todoUids?: Set<string>;
  private _todoReading = false;
  private _migrated = false;
  /** Attachment id -> download state. */
  @state() private _fileState: FileState = {};

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

  private _localDone(): Set<string> {
    try {
      const raw = window.localStorage.getItem(this._storageKey);
      return new Set(raw ? (JSON.parse(raw) as string[]) : []);
    } catch {
      return new Set();
    }
  }

  /** Read the done ticks from the Homework to-do list (once per change of
   * that entity), and push this browser's old local ticks there once. */
  private async _readTodo(todoId: string, currentIds: Set<string>): Promise<void> {
    const stateObj = this.hass?.states[todoId];
    const marker = stateObj?.last_updated;
    if (!this.hass || this._todoReading || marker === this._todoReadFor) return;
    this._todoReading = true;
    try {
      const result = await this.hass.callWS<{ items: { uid: string; status: string }[] }>({
        type: "todo/item/list",
        entity_id: todoId,
      });
      const done = new Set(result.items.filter((i) => i.status === "completed").map((i) => i.uid));
      if (!this._migrated) {
        this._migrated = true;
        const listed = new Set(result.items.map((i) => i.uid));
        for (const id of this._localDone()) {
          if (currentIds.has(id) && listed.has(id) && !done.has(id)) {
            done.add(id);
            void this._setTodoStatus(todoId, id, true);
          }
        }
        try {
          window.localStorage.removeItem(this._storageKey);
        } catch {
          /* storage disabled - nothing to clean up */
        }
      }
      this._done = done;
      this._todoUids = new Set(result.items.map((i) => i.uid));
      this._todoReadFor = marker;
    } catch {
      // No todo/item/list (very old HA) - stay on local ticks.
      this._todoReadFor = marker;
    } finally {
      this._todoReading = false;
    }
  }

  private async _setTodoStatus(todoId: string, id: string, done: boolean): Promise<void> {
    await this.hass?.callService("todo", "update_item", {
      entity_id: todoId,
      item: id,
      status: done ? "completed" : "needs_action",
    });
  }

  private _toggle(id: string, currentIds: Set<string>, todoId?: string): void {
    const next = new Set(this._done);
    const nowDone = !next.has(id);
    if (nowDone) next.add(id);
    else next.delete(id);
    this._done = next;
    if (todoId) {
      this._setTodoStatus(todoId, id, nowDone).catch(() => {
        // Put it back if Home Assistant refused (e.g. the homework is gone).
        this._todoReadFor = undefined;
        this.requestUpdate();
      });
    } else {
      this._persist(currentIds);
    }
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { deviceId, map } = resolved;
    const hass = this.hass;

    this._load(deviceId);
    // The Homework to-do list (backend 0.10.1+) keeps ticks shared.
    const todoId = map.homework;

    const entity = map.homework_assignments ? hass.states[map.homework_assignments] : undefined;
    const items = ((entity?.attributes.recent as HomeworkItem[] | undefined) ?? []).map((it, i) => ({
      ...it,
      key: it.id !== undefined ? String(it.id) : `${it.topic}|${it.due_date ?? i}`,
    }));

    if (items.length === 0) {
      return this._message("mdi:notebook-edit-outline", t(hass, "card.homework_assignments.empty"));
    }

    const currentIds = new Set(items.map((it) => it.key));
    if (todoId) void this._readTodo(todoId, currentIds);
    // With the to-do list, show exactly its items: it drops homework that
    // was ticked off more than 14 days after its due date, and ticking one
    // of those here failed with "item not found" (found live).
    const shown = todoId && this._todoUids ? items.filter((it) => this._todoUids!.has(it.key)) : items;
    if (shown.length === 0) {
      return this._message("mdi:notebook-edit-outline", t(hass, "card.homework_assignments.empty"));
    }
    const max = this._config.max_items ?? 12;
    const sorted = [...shown].sort((a, b) => {
      const da = this._done.has(a.key) ? 1 : 0;
      const db = this._done.has(b.key) ? 1 : 0;
      if (da !== db) return da - db; // not-done first
      return (a.due_date ?? "").localeCompare(b.due_date ?? "");
    });
    const doneCount = shown.filter((it) => this._done.has(it.key)).length;

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:notebook-edit-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title ?? t(hass, "card.homework_checklist.title")}</div>
            <div class="subtitle">
              ${t(hass, "card.homework_checklist.progress", { done: doneCount, total: shown.length })}
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
                @click=${() => this._toggle(it.key, currentIds, todoId)}
                @keydown=${(e: KeyboardEvent) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    this._toggle(it.key, currentIds, todoId);
                  }
                }}
              >
                <span class="box"><ha-icon icon=${isDone ? "mdi:checkbox-marked" : "mdi:checkbox-blank-outline"}></ha-icon></span>
                <div class="body">
                  <div class="row1">
                    <span
                      >${it.category ? html`<span class="cat-label">${it.category}</span> ` : nothing}${it.topic ||
                      it.text}</span
                    >
                    ${it.due_date
                      ? html`<time>${formatShortDate(it.due_date, hass.language)}</time>`
                      : nothing}
                  </div>
                  ${it.text && it.text !== it.topic
                    ? html`<div class="item-text">${it.text}</div>`
                    : nothing}
                  ${renderHomeworkFiles(hass, it.attachments, this._fileState, (ev, file) =>
                    downloadHomeworkFile(ev, hass, deviceId, file, this._fileState, (next) => {
                      this._fileState = next;
                    })
                  )}
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
    homeworkFileStyles,
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
