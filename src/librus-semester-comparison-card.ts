import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { mapAllByTranslationKey } from "./utils/entities";
import { t } from "./utils/localize";
import { librusCardEditor } from "./utils/card-editor";

interface SubjectRow {
  subject: string;
  s1: number | null;
  s2: number | null;
}

/**
 * Semester 1 vs semester 2 average for every subject, side by side, with
 * the change between them. Reads the `average_semester_1` /
 * `average_semester_2` attributes each `subject_average` sensor already
 * exposes - no calendar/history fetch. Early in the school year semester
 * 2 is empty and shows "—"; the card fills in as the data lands.
 */
@customElement("librus-semester-comparison-card")
export class LibrusSemesterComparisonCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-semester-comparison-card" };
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
    const { deviceId } = resolved;
    const hass = this.hass;

    const num = (v: unknown): number | null => {
      const n = Number(v);
      return Number.isFinite(n) ? n : null;
    };

    const rows: SubjectRow[] = mapAllByTranslationKey(hass, deviceId, "subject_average")
      .map((s) => {
        const attrs = hass.states[s.entityId]?.attributes ?? {};
        return {
          subject: s.subject,
          s1: num(attrs.average_semester_1),
          s2: num(attrs.average_semester_2),
        };
      })
      .filter((r) => r.s1 !== null || r.s2 !== null)
      .sort((a, b) => a.subject.localeCompare(b.subject));

    if (rows.length === 0) {
      return this._message("mdi:swap-horizontal", t(hass, "card.semester_comparison.empty"));
    }

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:swap-horizontal"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title ?? t(hass, "card.semester_comparison.title")}</div>
            <div class="subtitle">${t(hass, "card.semester_comparison.subtitle")}</div>
          </div>
        </div>
        <div class="rows">
          <div class="row head">
            <span class="subj"></span>
            <span class="val">${t(hass, "card.semester_comparison.s1")}</span>
            <span class="val">${t(hass, "card.semester_comparison.s2")}</span>
            <span class="delta"></span>
          </div>
          ${rows.map((r) => {
            const delta = r.s1 !== null && r.s2 !== null ? Math.round((r.s2 - r.s1) * 100) / 100 : null;
            const cls = delta === null ? "" : delta > 0 ? "good" : delta < 0 ? "bad" : "";
            return html`
              <div class="row">
                <span class="subj" title=${r.subject}>${r.subject}</span>
                <span class="val">${r.s1 !== null ? r.s1.toFixed(2) : "—"}</span>
                <span class="val strong">${r.s2 !== null ? r.s2.toFixed(2) : "—"}</span>
                <span class="delta ${cls}">
                  ${delta === null
                    ? ""
                    : html`<ha-icon
                          icon=${delta > 0 ? "mdi:menu-up" : delta < 0 ? "mdi:menu-down" : "mdi:minus"}
                        ></ha-icon>${delta !== 0 ? Math.abs(delta).toFixed(2) : ""}`}
                </span>
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
      .rows {
        display: flex;
        flex-direction: column;
        gap: 3px;
      }
      .row {
        display: grid;
        grid-template-columns: 1fr 3.2rem 3.2rem 3.2rem;
        align-items: center;
        gap: 6px;
        font-size: 0.82rem;
        padding: 3px 0;
      }
      .row.head {
        font-size: 0.62rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--secondary-text-color);
      }
      .subj {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .val {
        text-align: right;
        font-variant-numeric: tabular-nums;
        color: var(--secondary-text-color);
      }
      .val.strong {
        color: var(--primary-text-color);
        font-weight: 700;
      }
      .delta {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 1px;
        font-size: 0.72rem;
        font-weight: 700;
        font-variant-numeric: tabular-nums;
        color: var(--secondary-text-color);
      }
      .delta ha-icon {
        --mdc-icon-size: 16px;
      }
      .delta.good {
        color: var(--lc-good);
      }
      .delta.bad {
        color: var(--lc-bad);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-semester-comparison-card": LibrusSemesterComparisonCard;
  }
}
