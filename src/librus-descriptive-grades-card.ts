import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { formatShortDate } from "./utils/format";
import { t } from "./utils/localize";

interface RecentDescriptiveGrade {
  subject: string | null;
  value: string;
  skill_id: number | null;
  category_id: number | null;
  date: string | null;
}

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
    const recent = (entity?.attributes.recent as RecentDescriptiveGrade[] | undefined) ?? [];

    if (!entity || recent.length === 0) {
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
          ${recent.map(
            (g) => html`
              <div class="list-item">
                <span class="dot neutral"></span>
                <div class="body">
                  <div class="row1">
                    <span>${g.subject ?? ""}</span>
                    ${g.date ? html`<time>${formatShortDate(g.date, hass.language)}</time>` : nothing}
                  </div>
                  <div class="item-text">${g.value}</div>
                </div>
              </div>
            `
          )}
        </div>
      </ha-card>
    `;
  }

  static styles = [librusTokens, librusSharedStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-descriptive-grades-card": LibrusDescriptiveGradesCard;
  }
}
