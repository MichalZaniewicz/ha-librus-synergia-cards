import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { t } from "./utils/localize";
import { librusCardEditor } from "./utils/card-editor";
import { formatDate, formatShortDate } from "./utils/format";
import { monthLabel, schoolMonths } from "./utils/months";

type Counts = { cancelled: number; substitutions: number };

/** At most this many subjects in the ranking (editor: max_items). */
const DEFAULT_SUBJECTS = 6;

/**
 * Every lesson cancelled or covered by a substitute this school year
 * (integration 0.12.10+, Cancelled lessons sensor): three numbers, the
 * subjects ranked with cancelled and substituted lessons on one bar, and a
 * column per month of the school year.
 */
@customElement("librus-cancelled-lessons-card")
export class LibrusCancelledLessonsCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-cancelled-lessons-card" };
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
    const { map } = resolved;
    const hass = this.hass;
    const icon = "mdi:calendar-remove-outline";
    const entity = map.cancelled_lessons ? hass.states[map.cancelled_lessons] : undefined;
    if (!entity) return this._message(icon, t(hass, "card.cancelled.requires"));

    const a = entity.attributes;
    const cancelled = Number(entity.state);
    const substitutions = Number(a.substitutions ?? 0);
    const title = this._config.title ?? t(hass, "card.cancelled.title");
    if (!Number.isFinite(cancelled) || cancelled + substitutions === 0) {
      return this._message(icon, title, t(hass, "card.cancelled.empty"));
    }
    const since = a.since as string | undefined;
    const percent = a.cancelled_percent as number | null | undefined;
    const bySubject = Object.entries((a.by_subject as Record<string, Counts> | undefined) ?? {}).slice(
      0,
      this._config.max_items ?? DEFAULT_SUBJECTS
    );
    const byMonth = (a.by_month as Record<string, Counts> | undefined) ?? {};
    const cls = map.school_class ? hass.states[map.school_class] : undefined;
    const months = schoolMonths(
      cls?.attributes.school_year_start as string | undefined,
      cls?.attributes.school_year_end as string | undefined,
      since
    );
    const maxSubject = Math.max(1, ...bySubject.map(([, c]) => c.cancelled + c.substitutions));
    const maxMonth = Math.max(1, ...months.map((m) => (byMonth[m]?.cancelled ?? 0) + (byMonth[m]?.substitutions ?? 0)));
    const pct = (v: number, max: number) => `${((v / max) * 100).toFixed(1)}%`;
    const now = new Date();
    const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    return html`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge bad"><ha-icon icon=${icon}></ha-icon></div>
          <div class="title-block">
            <div class="title">${title}</div>
            <div class="subtitle">
              ${since
                ? t(hass, "card.cancelled.since", { date: formatShortDate(since, hass.language) })
                : t(hass, "card.cancelled.this_year")}
            </div>
          </div>
        </div>
        <div class="tiles">
          <div class="tile bad"><span class="v">${cancelled}</span><span class="l">${t(hass, "card.cancelled.cancelled")}</span></div>
          <div class="tile brand">
            <span class="v">${substitutions}</span><span class="l">${t(hass, "card.cancelled.substitutions")}</span>
          </div>
          <div class="tile">
            ${typeof percent === "number"
              ? html`<span class="v"
                    >${percent.toLocaleString(hass.language, { maximumFractionDigits: 1 })}<small>%</small></span
                  ><span class="l">${t(hass, "card.cancelled.share")}</span>`
              : html`<span class="v">${bySubject.length}</span><span class="l">${t(hass, "card.cancelled.subjects")}</span>`}
          </div>
        </div>
        <div class="legend">
          <span class="legend-item"><span class="key c-bad"></span>${t(hass, "card.cancelled.legend_cancelled")}</span>
          <span class="legend-item"><span class="key c-amber"></span>${t(hass, "card.cancelled.legend_substitutions")}</span>
        </div>
        <div class="subjects">
          ${bySubject.map(
            ([name, c]) => html`<div class="srow" title="${name}: ${c.cancelled} / ${c.substitutions}">
              <span class="slabel">${name}</span>
              <span class="strack">
                <span class="seg c-bad" style="width:${pct(c.cancelled, maxSubject)}"></span>
                <span class="seg c-amber" style="width:${pct(c.substitutions, maxSubject)}"></span>
              </span>
              <span class="sval">${c.cancelled} <small>/ ${c.substitutions}</small></span>
            </div>`
          )}
        </div>
        <hr />
        <div class="months" style="grid-template-columns:repeat(${months.length}, 1fr)">
          ${months.map((m) => {
            const c = byMonth[m] ?? { cancelled: 0, substitutions: 0 };
            const label = formatDate(new Date(`${m}-01T00:00:00`), hass.language, { month: "long" });
            return html`<div class="mcol ${m === thisMonth ? "now" : ""}">
              <div class="mbar" title="${label}: ${c.cancelled} / ${c.substitutions}">
                <span class="seg c-bad" style="height:${pct(c.cancelled, maxMonth)}"></span>
                <span class="seg c-amber" style="height:${pct(c.substitutions, maxMonth)}"></span>
              </div>
              <span class="mlabel">${monthLabel(m, hass.language)}</span>
            </div>`;
          })}
        </div>
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .tiles {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px;
      }
      .tile {
        background: var(--lc-chip-bg);
        border-radius: 10px;
        padding: 8px 10px;
        display: grid;
        gap: 2px;
        min-width: 0;
      }
      .tile .v {
        font-size: 1.3rem;
        font-weight: 800;
        line-height: 1.1;
        font-variant-numeric: tabular-nums;
      }
      .tile .v small {
        font-size: 0.75rem;
        font-weight: 700;
      }
      .tile .l {
        font-size: 0.7rem;
        color: var(--secondary-text-color);
      }
      .tile.bad .v {
        color: var(--lc-bad);
      }
      .tile.brand .v {
        color: var(--lc-brand);
      }
      .legend {
        justify-content: flex-start;
      }
      .key {
        width: 9px;
        height: 9px;
        border-radius: 3px;
        display: inline-block;
      }
      .c-bad {
        background: var(--lc-bad);
      }
      .c-amber {
        background: var(--lc-amber);
      }
      .subjects {
        display: grid;
        gap: 6px;
      }
      .srow {
        display: grid;
        grid-template-columns: minmax(0, 6.6rem) 1fr auto;
        gap: 8px;
        align-items: center;
        font-size: 0.78rem;
      }
      .slabel {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--secondary-text-color);
      }
      .strack {
        display: flex;
        height: 10px;
        border-radius: 5px;
        background: var(--divider-color);
        overflow: hidden;
      }
      .strack .seg {
        height: 100%;
      }
      .sval {
        font-variant-numeric: tabular-nums;
        font-weight: 800;
        font-size: 0.76rem;
        min-width: 3.2rem;
        text-align: right;
      }
      .sval small {
        font-weight: 500;
        color: var(--secondary-text-color);
      }
      .months {
        display: grid;
        gap: 4px;
      }
      .mcol {
        display: grid;
        gap: 3px;
        justify-items: center;
      }
      .mbar {
        width: 100%;
        height: 56px;
        border-radius: 4px;
        background: var(--lc-chip-bg);
        overflow: hidden;
        display: flex;
        flex-direction: column-reverse;
      }
      .mbar .seg {
        width: 100%;
      }
      .mlabel {
        font-size: 0.62rem;
        color: var(--secondary-text-color);
        white-space: nowrap;
      }
      .mcol.now .mlabel {
        color: var(--lc-brand);
        font-weight: 700;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-cancelled-lessons-card": LibrusCancelledLessonsCard;
  }
}
