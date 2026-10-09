import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { UNAVAILABLE } from "./utils/entities";
import { t } from "./utils/localize";

interface ForecastRow {
  subject: string;
  average: number;
  predicted: number;
  sixes_to_next: number | null;
  ones_to_drop: number | null;
  declining: boolean;
  at_risk: boolean;
}

const HONOURS = 4.75;
// The honours bar runs from a 4.00 average to the 4.75 the distinction needs.
const BAR_FROM = 4;
const MAX_CLOSEST = 3;

/**
 * "Świadectwo – prognoza" (mockup variant B, approved 2026-10-07): the
 * report card the averages point to, as a grid of subject tiles, with the
 * forecast report-card average, the progress to a certificate with
 * distinction and the subjects where one grade moves something. All from
 * the integration's Grade forecast sensor (0.12.0+); the teacher decides
 * the real grade, which the footer says.
 */
@customElement("librus-report-card-card")
export class LibrusReportCardCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-report-card-card" };
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

    const sensor = map.grade_forecast ? hass.states[map.grade_forecast] : undefined;
    if (!sensor) {
      return this._message("mdi:certificate-outline", t(hass, "card.report_card.needs_backend"));
    }
    const rows = ((sensor.attributes.subjects as ForecastRow[] | undefined) ?? []).filter(
      (r) => r && typeof r.predicted === "number"
    );
    if (UNAVAILABLE.has(sensor.state) || rows.length === 0) {
      return this._message("mdi:certificate-outline", t(hass, "card.report_card.empty"));
    }

    const average = Number(sensor.state);
    const atRisk = rows.filter((r) => r.at_risk).length;
    const declining = rows.filter((r) => r.declining).length;
    const honours = average >= HONOURS;
    const barPct = Math.max(0, Math.min(100, ((average - BAR_FROM) / (HONOURS - BAR_FROM)) * 100));
    const fmt = (v: number) =>
      v.toLocaleString(hass.language, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const basis = sensor.attributes.basis === "school_year" ? "school_year" : "semester_1";

    return html`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge ${honours ? "good" : ""}"><ha-icon icon="mdi:certificate-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title ?? t(hass, "card.report_card.title")}</div>
            <div class="subtitle">
              ${t(hass, basis === "school_year" ? "card.report_card.basis_school_year" : "card.report_card.basis_semester_1")}
            </div>
          </div>
        </div>

        <div class="summary">
          <div>
            <div class="big">${fmt(average)}</div>
            <div class="big-label">${t(hass, "card.report_card.average")}</div>
          </div>
          <div class="chips">
            ${atRisk ? html`<span class="chip bad">${t(hass, "card.report_card.at_risk", { n: atRisk })}</span>` : nothing}
            ${declining
              ? html`<span class="chip warn">${t(hass, "card.report_card.declining", { n: declining })}</span>`
              : nothing}
            ${!atRisk && !declining ? html`<span class="chip good">${t(hass, "card.report_card.all_clear")}</span>` : nothing}
          </div>
        </div>
        <div class="honours">
          <div class="hbar"><span class=${honours ? "done" : ""} style="width:${barPct}%"></span></div>
          <div class="hrow">
            <span>${t(hass, "card.report_card.honours_from", { avg: fmt(HONOURS) })}</span>
            <span>
              ${honours
                ? html`<b class="ok">${t(hass, "card.report_card.honours_ok")}</b>`
                : html`${t(hass, "card.report_card.missing")} <b>${fmt(HONOURS - average)}</b>`}
            </span>
          </div>
        </div>

        <div class="tiles">
          ${rows.map(
            (r) => html`
              <div
                class="tile g${r.predicted} ${r.at_risk ? "bad" : r.declining ? "warn" : ""}"
                title=${`${r.subject}: ${fmt(r.average)}`}
              >
                <div class="g">${r.predicted}${r.declining ? "↓" : ""}</div>
                <div class="n">${r.subject}</div>
                <div class="a">${fmt(r.average)}</div>
              </div>
            `
          )}
        </div>

        ${this._closest(rows).length
          ? html`
              <hr />
              <div class="closest">
                <div class="ct">${t(hass, "card.report_card.closest")}</div>
                ${this._closest(rows).map(
                  ([subject, hint]) => html`<div class="ci"><span>${subject}</span><span>${hint}</span></div>`
                )}
              </div>
            `
          : nothing}
        <div class="foot">
          ${t(hass, "card.report_card.footer")}${honours ? html` ${t(hass, "card.report_card.footer_behaviour")}` : nothing}
        </div>
      </ha-card>
    `;
  }

  /** Where one grade moves the forecast: a subject heading for a 1 first,
   * then one 6 lifting it, then one 1 dropping it - at most three. */
  private _closest(rows: ForecastRow[]): [string, string][] {
    const hass = this.hass!;
    const out: [string, string][] = [];
    for (const r of rows.filter((r) => r.at_risk && r.sixes_to_next)) {
      out.push([r.subject, t(hass, "card.report_card.sixes_to", { n: r.sixes_to_next!, grade: r.predicted + 1 })]);
    }
    for (const r of rows.filter((r) => !r.at_risk && r.sixes_to_next === 1)) {
      out.push([r.subject, t(hass, "card.report_card.sixes_to", { n: 1, grade: r.predicted + 1 })]);
    }
    for (const r of rows.filter((r) => r.ones_to_drop === 1)) {
      out.push([r.subject, t(hass, "card.report_card.one_drops", { grade: r.predicted - 1 })]);
    }
    return out.slice(0, MAX_CLOSEST);
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .summary {
        display: flex;
        align-items: center;
        gap: 14px;
      }
      .big {
        font-size: 2rem;
        font-weight: 800;
        font-variant-numeric: tabular-nums;
        line-height: 1;
        color: var(--lc-brand);
      }
      .big-label {
        font-size: 0.7rem;
        color: var(--secondary-text-color);
        margin-top: 3px;
      }
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-left: auto;
        justify-content: flex-end;
      }
      .chip {
        font-size: 0.7rem;
        font-weight: 700;
        padding: 4px 9px;
        border-radius: 999px;
        white-space: nowrap;
      }
      .chip.good {
        background: var(--lc-good-bg);
        color: var(--lc-good);
      }
      .chip.bad {
        background: var(--lc-bad-bg);
        color: var(--lc-bad);
      }
      .chip.warn {
        background: var(--lc-warn-bg);
        color: var(--lc-warn);
      }
      .honours {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
      .hbar {
        height: 6px;
        border-radius: 3px;
        background: var(--divider-color);
        position: relative;
        overflow: hidden;
      }
      .hbar span {
        position: absolute;
        inset: 0 auto 0 0;
        background: var(--lc-amber);
        border-radius: 3px;
      }
      .hbar span.done {
        background: var(--lc-good);
      }
      .hrow {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        font-size: 0.7rem;
        color: var(--secondary-text-color);
      }
      .hrow b {
        color: var(--primary-text-color);
      }
      .hrow b.ok {
        color: var(--lc-good);
      }
      .tiles {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(84px, 1fr));
        gap: 6px;
      }
      .tile {
        border-radius: 9px;
        padding: 8px 6px 7px;
        background: var(--lc-chip-bg);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1px;
        text-align: center;
        min-width: 0;
      }
      .tile .g {
        font-size: 1.3rem;
        font-weight: 800;
        line-height: 1.1;
        color: var(--lc-brand);
      }
      .tile .n {
        font-size: 0.66rem;
        font-weight: 600;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .tile .a {
        font-size: 0.62rem;
        color: var(--secondary-text-color);
        font-variant-numeric: tabular-nums;
      }
      /* The digit's colour follows the grade; the background alone marks
         risk (red) or a falling forecast (amber), so a falling 6 stays green. */
      .tile.g6 .g {
        color: var(--lc-good);
      }
      .tile.g3 .g {
        color: var(--lc-warn);
      }
      .tile.g1 .g,
      .tile.g2 .g {
        color: var(--lc-bad);
      }
      .tile.warn {
        background: var(--lc-warn-bg);
      }
      .tile.bad {
        background: var(--lc-bad-bg);
      }
      .closest {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .closest .ct {
        font-size: 0.68rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--secondary-text-color);
        font-weight: 700;
      }
      .closest .ci {
        font-size: 0.76rem;
        display: flex;
        justify-content: space-between;
        gap: 8px;
      }
      .closest .ci span:last-child {
        color: var(--secondary-text-color);
        white-space: nowrap;
      }
      .foot {
        font-size: 0.66rem;
        color: var(--secondary-text-color);
        line-height: 1.35;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-report-card-card": LibrusReportCardCard;
  }
}
