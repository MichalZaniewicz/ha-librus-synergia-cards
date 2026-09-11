import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { mapAllByTranslationKey } from "./utils/entities";
import { formatShortDate } from "./utils/format";
import { t } from "./utils/localize";
import { librusCardEditor } from "./utils/card-editor";
import { filterAndSortGrades, type GradeLogEntry } from "./utils/grade-filters";

interface FlatGrade extends GradeLogEntry {
  subject: string;
}

const DEFAULT_MAX = 25;

/** All grades, from every subject, in one chronological log. */
@customElement("librus-grade-log-card")
export class LibrusGradeLogCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-grade-log-card" };
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
    const { deviceId } = resolved;
    const hass = this.hass;

    const flat: FlatGrade[] = [];
    for (const s of mapAllByTranslationKey(hass, deviceId, "subject_average")) {
      const grades = (hass.states[s.entityId]?.attributes.grades as GradeLogEntry[] | undefined) ?? [];
      for (const g of grades) flat.push({ ...g, subject: s.subject });
    }

    if (flat.length === 0) return this._message("mdi:notebook-multiple", t(hass, "card.grades.empty"));

    const filtered = filterAndSortGrades(flat, this._config);
    if (filtered.length === 0) {
      return this._message("mdi:notebook-multiple", t(hass, "card.grade_log.empty_filtered"));
    }

    const max = this._config.max_items ?? DEFAULT_MAX;

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:notebook-multiple"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title ?? t(hass, "card.grade_log.title")}</div>
            <div class="subtitle">${t(hass, "card.grade_log.subtitle")}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${filtered.slice(0, max).map(
            (g) => html`
              <div class="list-item">
                <div class="grade-chip">${g.value}</div>
                <div class="body">
                  <div class="row1">
                    <span>${g.subject}${g.category ? html` · <span class="cat-label">${g.category}</span>` : nothing}</span>
                    ${g.date ? html`<time>${formatShortDate(g.date, hass.language)}</time>` : nothing}
                  </div>
                  ${g.comments.length ? html`<div class="quote">${g.comments.join(" · ")}</div>` : nothing}
                </div>
              </div>
            `
          )}
        </div>
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .grade-chip {
        flex: none;
        min-width: 26px;
        height: 26px;
        border-radius: 8px;
        background: var(--lc-brand-bg);
        color: var(--lc-brand-strong);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        font-size: 0.78rem;
        padding: 0 4px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-grade-log-card": LibrusGradeLogCard;
  }
}
