import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { formatShortDate } from "./utils/format";
import { t } from "./utils/localize";

interface RecentNote {
  date: string | null;
  sentiment: "positive" | "negative" | "neutral" | null;
  category: string | null;
  text: string;
}

const DOT_CLASS: Record<string, string> = { positive: "good", negative: "bad", neutral: "neutral" };

@customElement("librus-behaviour-notices-card")
export class LibrusBehaviourNoticesCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-behaviour-notices-card" };
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

    const entity = map.behaviour_notices ? hass.states[map.behaviour_notices] : undefined;
    const recent = (entity?.attributes.recent as RecentNote[] | undefined) ?? [];
    const count = entity ? Number(entity.state) || 0 : 0;

    if (!entity || recent.length === 0) {
      return this._message("mdi:alert-circle-outline", t(hass, "card.behaviour_notices.empty"));
    }

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:alert-circle-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${t(hass, "card.behaviour_notices.title")}</div>
            <div class="subtitle">${count}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${recent.map(
            (n) => html`
              <div class="list-item">
                <span class="dot ${DOT_CLASS[n.sentiment ?? "neutral"]}"></span>
                <div class="body">
                  <div class="row1">
                    <span class="cat-label">${n.category ?? ""}</span>
                    ${n.date ? html`<time>${formatShortDate(n.date, hass.language)}</time>` : nothing}
                  </div>
                  <div class="item-text">${n.text}</div>
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
    "librus-behaviour-notices-card": LibrusBehaviourNoticesCard;
  }
}
