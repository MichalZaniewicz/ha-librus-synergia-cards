import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { mapAllByTranslationKey } from "./utils/entities";
import { t } from "./utils/localize";

const UNAVAILABLE = new Set(["unknown", "unavailable", ""]);

/**
 * The strongest and weakest subject, side by side, computed client-side
 * from the already-fetched per-subject average sensors - no backend
 * changes needed. Requires at least 2 subjects with a real numeric
 * average; with fewer, there's nothing meaningful to compare yet.
 */
@customElement("librus-subject-spotlight-card")
export class LibrusSubjectSpotlightCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement("librus-device-editor") as LovelaceCardEditor;
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-subject-spotlight-card" };
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
    const { deviceId } = resolved;
    const hass = this.hass;

    const subjects = mapAllByTranslationKey(hass, deviceId, "subject_average")
      .map((s) => ({ subject: s.subject, state: hass.states[s.entityId] }))
      .filter((s) => s.state && !UNAVAILABLE.has(s.state.state))
      .map((s) => ({ subject: s.subject, value: Number(s.state!.state) }))
      .filter((s) => !Number.isNaN(s.value));

    if (subjects.length < 2) {
      return this._message("mdi:podium-gold", t(hass, "card.subject_spotlight.empty"));
    }

    const best = subjects.reduce((a, b) => (b.value > a.value ? b : a));
    const weakest = subjects.reduce((a, b) => (b.value < a.value ? b : a));
    const fmt = (v: number) => v.toLocaleString(hass.language, { maximumFractionDigits: 2 });

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:podium-gold"></ha-icon></div>
          <div class="title-block">
            <div class="title">${t(hass, "card.subject_spotlight.title")}</div>
            <div class="subtitle">${t(hass, "card.subject_spotlight.subtitle")}</div>
          </div>
        </div>
        <div class="spotlight-row">
          <div class="spotlight-tile good">
            <ha-icon icon="mdi:trophy-outline"></ha-icon>
            <div class="spotlight-value">${fmt(best.value)}</div>
            <div class="spotlight-subject">${best.subject}</div>
            <div class="spotlight-label">${t(hass, "card.subject_spotlight.best")}</div>
          </div>
          <div class="spotlight-tile warn">
            <ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon>
            <div class="spotlight-value">${fmt(weakest.value)}</div>
            <div class="spotlight-subject">${weakest.subject}</div>
            <div class="spotlight-label">${t(hass, "card.subject_spotlight.weakest")}</div>
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .spotlight-row {
        display: flex;
        gap: 10px;
      }
      .spotlight-tile {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 2px;
        padding: 12px 8px;
        border-radius: var(--ha-card-border-radius, 12px);
        background: var(--divider-color);
      }
      .spotlight-tile.good {
        background: var(--lc-good-bg);
      }
      .spotlight-tile.good ha-icon {
        color: var(--lc-good);
      }
      .spotlight-tile.warn {
        background: var(--lc-warn-bg);
      }
      .spotlight-tile.warn ha-icon {
        color: var(--lc-warn);
      }
      .spotlight-value {
        font-size: 1.3rem;
        font-weight: 800;
        font-variant-numeric: tabular-nums;
        margin-top: 2px;
      }
      .spotlight-subject {
        font-size: 0.78rem;
        font-weight: 700;
        color: var(--primary-text-color);
      }
      .spotlight-label {
        font-size: 0.62rem;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-subject-spotlight-card": LibrusSubjectSpotlightCard;
  }
}
