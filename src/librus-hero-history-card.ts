import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { formatShortDate, daysBetween } from "./utils/format";
import { t } from "./utils/localize";
import { CATALOG, readHeroHistory, type HeroMode } from "./utils/hero-archetypes";

/**
 * A timeline of `librus-hero-card`'s own past results, read from the same
 * localStorage log that card writes to (`recordHeroHistory` in
 * `utils/hero-archetypes.ts`) - a new entry is only ever appended there
 * when the computed result actually changes, so this never spams one
 * entry per poll cycle. Same limitation as `librus-achievements-card`:
 * only grows going forward from whenever the Hero card was first added to
 * a dashboard - there is no backend history to recover from before that.
 */
@customElement("librus-hero-history-card")
export class LibrusHeroHistoryCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-hero-history-card" };
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
    const mode: HeroMode = this._config.mode === "hero" ? "hero" : "archetype";

    const history = readHeroHistory(deviceId);
    if (history.length === 0) {
      return this._message("mdi:history", t(hass, "card.hero_history.empty"));
    }

    const now = new Date();
    // Newest first for display; each entry's span runs from its own `when`
    // to the NEXT (chronologically later) entry's `when`, or to now for
    // the current (last-recorded) one.
    const rows = [...history].reverse().map((entry, i) => {
      const catalog = CATALOG[entry.id];
      const start = new Date(entry.when);
      const end = i === 0 ? now : new Date(history[history.length - i].when);
      const days = Math.max(0, daysBetween(start, end));
      return { entry, catalog, isCurrent: i === 0, days };
    });

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:history"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title ?? t(hass, "card.hero_history.title")}</div>
            <div class="subtitle">${t(hass, "card.hero_history.subtitle")}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${rows.map(
            (r) => html`
              <div class="list-item">
                <div class="type-icon"><ha-icon icon=${r.catalog?.icon ?? "mdi:help-circle"}></ha-icon></div>
                <div class="body">
                  <div class="row1">
                    <span>${r.catalog ? t(hass, r.catalog.nameKey[mode]) : r.entry.id}</span>
                    <time>${formatShortDate(r.entry.when, hass.language)}</time>
                  </div>
                  <div class="item-text">
                    ${r.isCurrent
                      ? t(hass, "card.hero_history.current", { n: r.days })
                      : `${r.days} ${t(hass, "label.days")}`}
                  </div>
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
      .type-icon {
        flex: none;
        width: 26px;
        height: 26px;
        border-radius: 8px;
        background: var(--lc-chip-bg);
        color: var(--lc-brand);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 1px;
      }
      .type-icon ha-icon {
        --mdc-icon-size: 15px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-hero-history-card": LibrusHeroHistoryCard;
  }
}
