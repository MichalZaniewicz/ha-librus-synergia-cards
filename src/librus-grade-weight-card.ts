import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { t } from "./utils/localize";
import { formatNumber } from "./utils/format";
import { activateOnKey } from "./utils/render-helpers";
import { AverageSum, averageTerm, gradeColor, isWeighted, type WeightedGradeEntry } from "./utils/grade-math";

const PALETTE = Array.from({ length: 16 }, (_, i) => `var(--lc-chart-${i + 1})`);
const ALL = "all";

interface CategoryRow {
  name: string;
  /** The category's grade weight (one value per category in Librus). */
  weight: number | undefined;
  count: number;
  /** Share of the whole average's weight, 0-100. */
  share: number;
  average: number | undefined;
  color: string;
}

/**
 * What each grade category (test, quiz, answer...) weighs in a subject's
 * average - its weight times its grades, as a share of the whole - and the
 * average within it (approved mockup, card 5). Chips switch between the
 * subjects with grades and all of them together; the editor's subject is
 * the one shown first. Needs the `weight` on each grade (integration
 * 0.12.36+); in the arithmetic average mode every grade weighs the same.
 */
@customElement("librus-grade-weight-card")
export class LibrusGradeWeightCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  @state() private _picked?: string;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-grade-weight-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
    this._picked = undefined;
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
    const title = this._config.title ?? t(hass, "card.grade_weight.title");
    const icon = "mdi:scale-balance";

    const subjects = this._resolveAllByTranslationKey(resolved.deviceId, "subject_average")
      .map((s) => ({ ...s, state: hass.states[s.entityId] }))
      .filter((s) => ((s.state?.attributes.grades as WeightedGradeEntry[] | undefined) ?? []).some((g) => averageTerm(g, true)));
    if (!subjects.length) return this._message(icon, title, t(hass, "card.grades.empty"));
    const hasWeights = subjects.some((s) =>
      ((s.state?.attributes.grades as WeightedGradeEntry[] | undefined) ?? []).some((g) => typeof g.weight === "number")
    );
    if (!hasWeights) return this._message(icon, title, t(hass, "card.grade_weight.requires"));

    const configured = this._config.subject_id !== undefined ? String(this._config.subject_id) : undefined;
    let picked = this._picked ?? configured ?? ALL;
    if (picked !== ALL && !subjects.some((s) => String(s.subjectId) === picked)) picked = ALL;
    const shown = picked === ALL ? subjects : subjects.filter((s) => String(s.subjectId) === picked);
    const weighted = isWeighted(shown[0]?.state?.attributes);

    const { rows, total } = this._memo("rows", [picked, ...shown.map((s) => s.state)], () => this._rows(shown));
    const two = (v: number) => formatNumber(v, hass.language, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const pct = (v: number) => `${Math.round(v)}%`;

    const subjectState = picked === ALL ? undefined : shown[0]?.state;
    const subjectAverage = subjectState ? Number(subjectState.state) : NaN;
    const subtitle =
      picked === ALL
        ? t(hass, "card.grade_weight.all_subjects")
        : Number.isFinite(subjectAverage)
          ? t(hass, weighted ? "card.grade_weight.weighted" : "card.grade_weight.arithmetic", {
              subject: shown[0].subject,
              average: two(subjectAverage),
            })
          : shown[0].subject;

    const top = rows[0];
    const weakest = rows
      .filter((r) => r.average !== undefined && r.share >= 10)
      .sort((a, b) => a.average! - b.average!)[0];

    const chip = (value: string, label: string) => html`
      <span
        class="pick ${picked === value ? "on" : ""}"
        role="button"
        tabindex="0"
        aria-pressed=${picked === value ? "true" : "false"}
        @click=${() => (this._picked = value)}
        @keydown=${activateOnKey(() => (this._picked = value))}
        >${label}</span
      >
    `;

    return html`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge"><ha-icon icon=${icon}></ha-icon></div>
          <div class="title-block">
            <div class="title">${title}</div>
            <div class="subtitle">${subtitle}</div>
          </div>
        </div>
        ${subjects.length > 1
          ? html`<div class="picker">
              ${chip(ALL, t(hass, "card.grade_weight.all"))}
              ${subjects.map((s) => chip(String(s.subjectId), s.subject))}
            </div>`
          : nothing}
        ${total > 0
          ? html`
              <div class="stacked">
                ${rows.map((r) => html`<div style="width:${r.share}%;background:${r.color}" title="${r.name} ${pct(r.share)}"></div>`)}
              </div>
              <div class="rows">
                ${rows.map(
                  (r) => html`
                    <div class="row">
                      <span class="name">${r.name}</span>
                      <div class="track">
                        <div class="fill" style="width:${Math.max(r.share, 2)}%;background:${r.color}"></div>
                        ${r.share >= 70
                          ? html`<span class="share inside">${pct(r.share)}</span>`
                          : html`<span class="share" style="left:calc(${Math.max(r.share, 2)}% + 5px)">${pct(r.share)}</span>`}
                      </div>
                      <span class="avg" style=${r.average !== undefined ? `color:${gradeColor(r.average)}` : ""}
                        >${r.average !== undefined ? two(r.average) : "–"}</span
                      >
                      <span class="meta">
                        ${weighted && r.weight !== undefined
                          ? `${t(hass, "card.grade_weight.weight", { weight: r.weight })} · `
                          : ""}${t(hass, "card.grade_weight.grades", { count: r.count })}
                      </span>
                    </div>
                  `
                )}
              </div>
              <div class="chips">
                <span class="chip">${t(hass, "card.grade_weight.top", { category: top.name })} <span class="n">${pct(top.share)}</span> ${t(hass, "card.grade_weight.of_average")}</span>
                ${weakest
                  ? html`<span class="chip">${t(hass, "card.grade_weight.weakest")} <span class="n">${weakest.name} ${two(weakest.average!)}</span></span>`
                  : nothing}
              </div>
            `
          : html`<div class="empty-note">${t(hass, "card.grade_weight.nothing_counts")}</div>`}
      </ha-card>
    `;
  }

  private _rows(shown: { state?: { attributes: Record<string, unknown> } }[]): { rows: CategoryRow[]; total: number } {
    const hass = this.hass!;
    const byCategory = new Map<string, { sum: AverageSum; weights: Set<number> }>();
    for (const s of shown) {
      const weighted = isWeighted(s.state?.attributes);
      for (const g of (s.state?.attributes.grades as WeightedGradeEntry[] | undefined) ?? []) {
        const term = averageTerm(g, weighted);
        if (!term) continue;
        const name = g.category || t(hass, "card.grade_category_distribution.uncategorized");
        let entry = byCategory.get(name);
        if (!entry) byCategory.set(name, (entry = { sum: new AverageSum(), weights: new Set() }));
        entry.sum.add(term);
        if (typeof g.weight === "number") entry.weights.add(g.weight);
      }
    }
    const total = [...byCategory.values()].reduce((a, e) => a + e.sum.weight, 0);
    const rows = [...byCategory.entries()]
      .map(([name, e]) => ({
        name,
        weight: e.weights.size === 1 ? [...e.weights][0] : undefined,
        count: e.sum.count,
        share: total > 0 ? (e.sum.weight / total) * 100 : 0,
        average: e.sum.average,
        color: "",
      }))
      .sort((a, b) => b.share - a.share || a.name.localeCompare(b.name))
      .map((r, i) => ({ ...r, color: PALETTE[i % PALETTE.length] }));
    return { rows, total };
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .picker {
        display: flex;
        gap: 5px;
        overflow-x: auto;
        scrollbar-width: thin;
        padding-bottom: 2px;
      }
      .pick {
        flex: none;
        font-size: 0.7rem;
        font-weight: 600;
        padding: 3px 10px;
        border-radius: 999px;
        background: var(--lc-chip-bg);
        color: var(--secondary-text-color);
        cursor: pointer;
        white-space: nowrap;
      }
      .pick.on {
        background: var(--lc-brand-bg);
        color: var(--lc-brand);
      }
      .stacked {
        display: flex;
        height: 20px;
        border-radius: 6px;
        overflow: hidden;
        gap: 2px;
      }
      .stacked div {
        height: 100%;
      }
      .rows {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .row {
        display: grid;
        grid-template-columns: minmax(70px, 30%) 1fr 36px;
        align-items: center;
        column-gap: 8px;
        font-size: 0.8rem;
      }
      .row .name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .track {
        position: relative;
        height: 16px;
        border-radius: 5px;
        background: var(--lc-chip-bg);
        overflow: hidden;
      }
      .fill {
        height: 100%;
        border-radius: 5px;
      }
      .share {
        position: absolute;
        left: 6px;
        top: 0;
        line-height: 16px;
        font-size: 0.64rem;
        font-weight: 700;
        color: var(--secondary-text-color);
      }
      .share.inside {
        color: #fff;
      }
      .avg {
        font-weight: 800;
        text-align: right;
        font-variant-numeric: tabular-nums;
      }
      .meta {
        grid-column: 2 / 4;
        font-size: 0.66rem;
        color: var(--secondary-text-color);
        margin-top: 1px;
      }
      .empty-note {
        font-size: 0.78rem;
        color: var(--secondary-text-color);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-grade-weight-card": LibrusGradeWeightCard;
  }
}
