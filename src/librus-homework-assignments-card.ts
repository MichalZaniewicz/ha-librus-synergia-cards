import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { formatShortDate } from "./utils/format";
import { t } from "./utils/localize";

interface RecentAssignment {
  topic: string;
  text: string;
  due_date: string | null;
  date: string | null;
  teacher: string | null;
}

@customElement("librus-homework-assignments-card")
export class LibrusHomeworkAssignmentsCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-homework-assignments-card" };
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

    const entity = map.homework_assignments ? hass.states[map.homework_assignments] : undefined;
    const recent = (entity?.attributes.recent as RecentAssignment[] | undefined) ?? [];

    if (!entity || recent.length === 0) {
      return this._message("mdi:notebook-edit-outline", t(hass, "card.homework_assignments.empty"));
    }

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:notebook-edit-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${t(hass, "card.homework_assignments.title")}</div>
            <div class="subtitle">${entity.state}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${recent.map(
            (a) => html`
              <div class="list-item">
                <span class="dot neutral"></span>
                <div class="body">
                  <div class="row1">
                    <span>${a.topic}</span>
                    ${a.due_date
                      ? html`<time>${t(hass, "label.due")} ${formatShortDate(a.due_date, hass.language)}</time>`
                      : nothing}
                  </div>
                  <div class="item-text">${a.text}${a.teacher ? html` - ${a.teacher}` : nothing}</div>
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
    "librus-homework-assignments-card": LibrusHomeworkAssignmentsCard;
  }
}
