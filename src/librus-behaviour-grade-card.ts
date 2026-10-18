import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { t } from "./utils/localize";
import { monthLabel, schoolMonths } from "./utils/months";

/** One grade of the year (integration 0.12.23+, `history`). */
interface BehaviourHistoryEntry {
  /** "YYYY-MM" the grade is for. */
  month: string | null;
  grade: string;
  name: string | null;
  value: number | null;
  category: string | null;
  date: string | null;
}

/** Colour of a grade: the classic scale by its short form, points by sign. */
function gradeTone(entry: BehaviourHistoryEntry): "good" | "brand" | "warn" | "bad" {
  switch (entry.grade.toLowerCase()) {
    case "wz":
    case "bdb":
      return "good";
    case "db":
      return "brand";
    case "popr":
      return "warn";
    case "ndp":
    case "ng":
      return "bad";
  }
  if (!entry.name && entry.value) return entry.value > 0 ? "good" : "bad";
  return "brand";
}

interface RecentBehaviourGrade {
  /** Short form ("bdb", or the points) - integration 0.10.0-beta.2+. */
  grade?: string;
  /** Full name of a classic-scale grade ("bardzo dobre") - integration 0.10.0-beta.2+. */
  name?: string | null;
  short_name: string;
  value: number | null;
  category: string | null;
  date: string | null;
  text: string;
  comments: string[];
}

@customElement("librus-behaviour-grade-card")
export class LibrusBehaviourGradeCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-behaviour-grade-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 3;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { map } = resolved;
    const hass = this.hass;

    const entity = map.behaviour_grade ? hass.states[map.behaviour_grade] : undefined;
    const recent = (entity?.attributes.recent as RecentBehaviourGrade[] | undefined) ?? [];
    const latest = recent[0];

    if (!latest) return this._message("mdi:medal-outline", t(hass, "card.behaviour_grade.empty"));

    // Found live (2026-10-05): a classic-scale "bdb" arrives with an empty
    // short_name and value 0 - the grade is only in `grade`/`name`, which
    // older integrations don't send, hence the short_name fallback.
    const badge = latest.grade || latest.short_name;
    // Points only for a points-based school; a classic grade's value 0 isn't a score.
    const points = !latest.name && latest.value ? latest.value : null;
    const comments = (latest.comments ?? []).map((c) => c.trim()).filter(Boolean);

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge good"><ha-icon icon="mdi:medal-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title ?? t(hass, "card.behaviour_grade.title")}</div>
            <div class="subtitle">${latest.category ?? t(hass, "card.behaviour_grade.subtitle")}</div>
          </div>
          ${badge ? html`<div class="grade-badge">${badge}</div>` : nothing}
        </div>
        ${latest.name ? html`<div class="grade-name">${latest.name}</div>` : nothing}
        ${points !== null
          ? html`<div class="stats"><div class="stat good"><div class="stat-value">${points > 0 ? "+" : ""}${points}</div><div class="stat-label">pkt</div></div></div>`
          : nothing}
        ${latest.text ? html`<div class="quote">${latest.text}</div>` : nothing}
        ${comments.length ? html`<div class="comment">${comments.join(" · ")}</div>` : nothing}
        ${this._renderHistory(entity?.attributes.history, map.school_class)}
      </ha-card>
    `;
  }

  /** The school year month by month (September-June), each with the grade
   * given for it. Shown from integration 0.12.23 on (`history`). */
  private _renderHistory(raw: unknown, classEntity: string | undefined): TemplateResult | typeof nothing {
    if (!this.hass || this._config?.hide_history || !Array.isArray(raw) || !raw.length) return nothing;
    const hass = this.hass;
    const history = raw as BehaviourHistoryEntry[];
    // The latest grade wins a month that has more than one (e.g. a monthly
    // and a semester grade); all of them go into the tooltip.
    const byMonth = new Map<string, BehaviourHistoryEntry[]>();
    for (const entry of history) {
      if (!entry.month || !entry.grade) continue;
      byMonth.set(entry.month, [...(byMonth.get(entry.month) ?? []), entry]);
    }
    if (!byMonth.size) return nothing;
    const cls = classEntity ? hass.states[classEntity] : undefined;
    const months = schoolMonths(
      cls?.attributes.school_year_start as string | undefined,
      cls?.attributes.school_year_end as string | undefined,
      [...byMonth.keys()].sort()[0]
    );
    const now = new Date();
    const current = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    return html`
      <div class="history" style="--months: ${months.length}">
        ${months.map((m) => {
          const entries = byMonth.get(m) ?? [];
          const shown = entries[entries.length - 1];
          const label = monthLabel(m, hass.language);
          const tip = entries.map((e) => `${e.grade}${e.name ? ` (${e.name})` : ""}${e.category ? ` · ${e.category}` : ""}`).join("\n");
          return html`
            <div class="month ${m > current ? "future" : ""} ${m === current ? "current" : ""}" title=${tip || label}>
              <span class="mgrade ${shown ? gradeTone(shown) : "none"}">${shown ? shown.grade : "·"}</span>
              <span class="mlabel">${label}</span>
            </div>
          `;
        })}
      </div>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .grade-badge {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--lc-good);
        flex: none;
      }
      .grade-name {
        font-size: 1.05rem;
        font-weight: 700;
        color: var(--lc-good);
      }
      .grade-name::first-letter {
        text-transform: uppercase;
      }
      .comment {
        font-size: 0.8rem;
        color: var(--secondary-text-color);
        line-height: 1.4;
      }
      .history {
        display: grid;
        grid-template-columns: repeat(var(--months), minmax(0, 1fr));
        gap: 4px;
        margin-top: 4px;
      }
      .month {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
        min-width: 0;
      }
      .month.future {
        opacity: 0.45;
      }
      .mgrade {
        width: 100%;
        box-sizing: border-box;
        padding: 5px 0;
        border-radius: 8px;
        text-align: center;
        font-size: 0.72rem;
        font-weight: 800;
        overflow: hidden;
        text-overflow: clip;
        white-space: nowrap;
        background: var(--lc-chip-bg);
        color: var(--secondary-text-color);
      }
      .mgrade.good {
        background: color-mix(in srgb, var(--lc-good) 18%, transparent);
        color: var(--lc-good);
      }
      .mgrade.brand {
        background: var(--lc-brand-bg);
        color: var(--lc-brand-strong);
      }
      .mgrade.warn {
        background: color-mix(in srgb, var(--lc-warn) 18%, transparent);
        color: var(--lc-warn);
      }
      .mgrade.bad {
        background: color-mix(in srgb, var(--lc-bad) 18%, transparent);
        color: var(--lc-bad);
      }
      .mgrade.none {
        background: transparent;
        border: 1px dashed var(--divider-color, rgba(127, 127, 127, 0.3));
      }
      .month.current .mgrade {
        outline: 2px solid var(--lc-brand);
        outline-offset: -2px;
      }
      .mlabel {
        font-size: 0.66rem;
        font-weight: 700;
        color: var(--secondary-text-color);
        letter-spacing: 0.02em;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-behaviour-grade-card": LibrusBehaviourGradeCard;
  }
}
