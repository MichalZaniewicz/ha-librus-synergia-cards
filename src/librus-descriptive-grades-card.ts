import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { formatShortDate } from "./utils/format";
import { t } from "./utils/localize";
import { descriptiveGradeEntries } from "./utils/grade-filters";

@customElement("librus-descriptive-grades-card")
export class LibrusDescriptiveGradesCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-descriptive-grades-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 2;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { map } = resolved;
    const hass = this.hass;

    const entity = map.descriptive_grades ? hass.states[map.descriptive_grades] : undefined;
    // Newest first; `grades` holds all of them (integration 0.12.3+), `recent` the last five.
    const grades = descriptiveGradeEntries(entity?.attributes).sort((a, b) =>
      (b.date ?? "").localeCompare(a.date ?? "")
    );

    if (!entity || grades.length === 0) {
      return this._message("mdi:text-box-outline", t(hass, "card.descriptive_grades.empty"));
    }

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:text-box-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${t(hass, "card.descriptive_grades.title")}</div>
            <div class="subtitle">${t(hass, "card.descriptive_grades.subtitle")}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${grades.map(
            (g) => html`
              <div class="list-item">
                <div class="grade-chip">${g.value}</div>
                <div class="body">
                  <div class="row1">
                    <span>${g.subject}${g.category ? html` · <span class="cat-label">${g.category}</span>` : nothing}</span>
                    ${g.date ? html`<time>${formatShortDate(g.date, hass.language)}</time>` : nothing}
                  </div>
                  ${g.teacher ? html`<div class="item-text">${g.teacher}</div>` : nothing}
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
    "librus-descriptive-grades-card": LibrusDescriptiveGradesCard;
  }
}
