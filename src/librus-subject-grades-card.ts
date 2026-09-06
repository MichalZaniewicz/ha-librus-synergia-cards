import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { mapAllByTranslationKey } from "./utils/entities";
import { formatShortDate } from "./utils/format";
import { t } from "./utils/localize";
import type { LibrusSubjectCardConfig } from "./librus-subject-picker-editor";

interface GradeLogEntry {
  value: string;
  category: string | null;
  date: string | null;
  comments: string[];
}

/**
 * Shows the full grade log for ONE subject, chosen in the card's own
 * config (`subject_id`) - not just device_id like every other card here.
 * Uses `librus-subject-picker-editor` for its visual config UI.
 */
@customElement("librus-subject-grades-card")
export class LibrusSubjectGradesCard extends LibrusBaseCard {
  @state() private _config?: LibrusSubjectCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement("librus-subject-picker-editor") as unknown as LovelaceCardEditor;
  }

  public static getStubConfig(): LibrusSubjectCardConfig {
    return { type: "custom:librus-subject-grades-card" };
  }

  public setConfig(config: LibrusSubjectCardConfig): void {
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

    const subjects = mapAllByTranslationKey(hass, deviceId, "subject_average");
    const match =
      this._config.subject_id !== undefined
        ? subjects.find((s) => s.subjectId === this._config!.subject_id)
        : subjects[0];

    if (!match) return this._message("mdi:notebook-outline", t(hass, "card.grades.empty"));

    const state = hass.states[match.entityId];
    const grades = (state?.attributes.grades as GradeLogEntry[] | undefined) ?? [];

    if (grades.length === 0) return this._message("mdi:notebook-outline", t(hass, "card.grades.empty"));

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:notebook-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${match.subject}</div>
            <div class="subtitle">${state.state}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${grades.map(
            (g) => html`
              <div class="list-item">
                <div class="grade-chip">${g.value}</div>
                <div class="body">
                  <div class="row1">
                    <span class="cat-label">${g.category ?? ""}</span>
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
    "librus-subject-grades-card": LibrusSubjectGradesCard;
  }
}
