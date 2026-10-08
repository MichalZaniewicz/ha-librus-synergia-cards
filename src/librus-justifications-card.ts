import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { t } from "./utils/localize";
import { librusCardEditor } from "./utils/card-editor";
import { formatShortDate } from "./utils/format";

/** One justification in the Absence justifications sensor's `recent`. */
interface Justification {
  id: number;
  status: string;
  /** accepted / rejected / pending (integration 0.12.1+). */
  decision?: "accepted" | "rejected" | "pending";
  posted: string | null;
  date_from: string | null;
  date_to: string | null;
  justified_absences: number;
  message: string;
}

/**
 * Absence justifications: the days still to excuse (nothing sent yet), then
 * the justifications sent, each with the school's decision.
 */
@customElement("librus-justifications-card")
export class LibrusJustificationsCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-justifications-card" };
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
    const entityId = resolved.map["justifications"];
    const entity = entityId ? hass.states[entityId] : undefined;
    const icon = "mdi:clipboard-check-outline";
    if (!entity) return this._message(icon, t(hass, "card.justifications.requires"));

    const unexcusedId = resolved.map["unexcused_absences"];
    const unexcused = unexcusedId ? hass.states[unexcusedId] : undefined;
    const toExcuse = [
      ...new Set(
        ((unexcused?.attributes.awaiting_justification as string[] | undefined) ?? []).map((d) => d.slice(0, 10))
      ),
    ].sort();
    const items = (entity.attributes.recent as Justification[] | undefined) ?? [];
    const pending = Number(entity.attributes.pending ?? 0);
    const accepted = Number(entity.attributes.accepted ?? 0);
    const rejected = Number(entity.attributes.rejected ?? 0);
    const title = this._config.title ?? t(hass, "card.justifications.title");
    if (items.length === 0 && toExcuse.length === 0) {
      return this._message(icon, title, t(hass, "card.justifications.empty"));
    }
    const subtitle = pending
      ? t(hass, "card.justifications.subtitle_pending", { count: pending })
      : t(hass, "card.justifications.subtitle_done");

    return html`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge ${toExcuse.length || pending ? "amber" : "good"}">
            <ha-icon icon=${icon}></ha-icon>
          </div>
          <div class="title-block">
            <div class="title">${title}</div>
            <div class="subtitle">${subtitle}</div>
          </div>
        </div>
        ${toExcuse.length
          ? html`<div class="todo">
              <ha-icon icon="mdi:clock-outline"></ha-icon>
              <div>
                <div>${t(hass, "card.justifications.to_excuse", { count: toExcuse.length })}</div>
                <div class="todo-dates">
                  ${toExcuse.map((d) => formatShortDate(d, hass.language)).join(", ")} ·
                  ${t(hass, "card.justifications.nothing_sent")}
                </div>
              </div>
            </div>`
          : nothing}
        ${items.length
          ? html`<div class="chips">
                <span class="chip">${t(hass, "card.justifications.pending")} <span class="n">${pending}</span></span>
                <span class="chip">${t(hass, "card.justifications.accepted")} <span class="n">${accepted}</span></span>
                <span class="chip">${t(hass, "card.justifications.rejected")} <span class="n">${rejected}</span></span>
              </div>
              <div class="list">
                ${items.slice(0, this._config.max_items ?? 5).map((item) => this._item(item))}
              </div>`
          : nothing}
      </ha-card>
    `;
  }

  private _decision(item: Justification): "accepted" | "rejected" | "pending" {
    if (item.decision) return item.decision;
    // Older integrations: only the raw status, seen live as "accept".
    const status = (item.status || "").toLowerCase();
    if (status.startsWith("accept")) return "accepted";
    if (status.startsWith("reject") || status.startsWith("denied") || status.startsWith("refuse")) {
      return "rejected";
    }
    return "pending";
  }

  private _item(item: Justification): TemplateResult {
    const hass = this.hass!;
    const decision = this._decision(item);
    const from = item.date_from ? formatShortDate(item.date_from, hass.language) : "";
    const to = item.date_to ? formatShortDate(item.date_to, hass.language) : "";
    const range = to && to !== from ? `${from} – ${to}` : from;
    const details = [
      item.justified_absences
        ? t(hass, "card.justifications.lessons", { count: item.justified_absences })
        : null,
      item.posted
        ? t(hass, "card.justifications.sent", { date: formatShortDate(item.posted, hass.language) })
        : null,
    ].filter(Boolean);
    return html`
      <div class="item ${decision}">
        <span class="stripe"></span>
        <div class="body">
          <div class="row1">
            <span>${range}</span>
            <span class="pill ${decision}">${t(hass, `card.justifications.${decision}`)}</span>
          </div>
          <div class="item-text">
            ${details.join(" · ")}${item.message ? html` · „${item.message.trim()}”` : nothing}
          </div>
        </div>
      </div>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .todo {
        display: flex;
        gap: 10px;
        align-items: center;
        background: var(--lc-warn-bg);
        color: var(--lc-warn);
        border-radius: 10px;
        padding: 10px 12px;
        font-size: 0.78rem;
        font-weight: 600;
      }
      .todo ha-icon {
        --mdc-icon-size: 20px;
        flex: none;
      }
      .todo-dates {
        color: var(--primary-text-color);
        font-weight: 400;
        font-size: 0.74rem;
        margin-top: 1px;
      }
      .list {
        display: grid;
        gap: 10px;
      }
      .item {
        display: flex;
        gap: 10px;
      }
      .stripe {
        width: 3px;
        flex: none;
        border-radius: 2px;
        background: var(--lc-warn);
      }
      .item.accepted .stripe {
        background: var(--lc-good);
      }
      .item.rejected .stripe {
        background: var(--lc-bad);
      }
      .body {
        flex: 1;
        min-width: 0;
      }
      .row1 {
        align-items: center;
      }
      .pill {
        font-size: 0.66rem;
        font-weight: 700;
        border-radius: 999px;
        padding: 2px 8px;
        white-space: nowrap;
        flex: none;
        background: var(--lc-warn-bg);
        color: var(--lc-warn);
      }
      .pill.accepted {
        background: var(--lc-good-bg);
        color: var(--lc-good);
      }
      .pill.rejected {
        background: var(--lc-bad-bg);
        color: var(--lc-bad);
      }
      .item-text {
        overflow-wrap: anywhere;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-justifications-card": LibrusJustificationsCard;
  }
}
