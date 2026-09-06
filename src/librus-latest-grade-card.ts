import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig, LibrusHass } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { mapAllByTranslationKey } from "./utils/entities";
import { formatShortDate } from "./utils/format";
import { t } from "./utils/localize";

interface LatestGradeAttrs {
  subject?: string;
  latest_grade?: string | null;
  latest_grade_date?: string | null;
  latest_grade_comments?: string[];
}

/** Scans every subject_average sensor's attributes for the most recent grade. */
function findLatestGrade(
  hass: LibrusHass,
  deviceId: string
): { subject: string; grade: string; date: string; comments: string[] } | null {
  let best: { subject: string; grade: string; date: string; comments: string[] } | null = null;
  for (const s of mapAllByTranslationKey(hass, deviceId, "subject_average")) {
    const attrs = hass.states[s.entityId]?.attributes as LatestGradeAttrs | undefined;
    if (!attrs?.latest_grade || !attrs.latest_grade_date) continue;
    if (!best || attrs.latest_grade_date > best.date) {
      best = {
        subject: s.subject,
        grade: attrs.latest_grade,
        date: attrs.latest_grade_date,
        comments: attrs.latest_grade_comments ?? [],
      };
    }
  }
  return best;
}

@customElement("librus-latest-grade-card")
export class LibrusLatestGradeCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement("librus-device-editor") as LovelaceCardEditor;
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-latest-grade-card" };
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

    const latest = findLatestGrade(hass, deviceId);
    if (!latest) return this._message("mdi:star-outline", t(hass, "card.latest_grade.empty"));

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:star-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${t(hass, "card.latest_grade.title")}</div>
            <div class="subtitle">${latest.subject} &middot; ${formatShortDate(latest.date, hass.language)}</div>
          </div>
          <div class="grade-badge">${latest.grade}</div>
        </div>
        ${latest.comments.length
          ? html`
              <hr />
              ${latest.comments.map((c) => html`<div class="quote">${c}</div>`)}
            `
          : nothing}
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .grade-badge {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--lc-brand);
        flex: none;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-latest-grade-card": LibrusLatestGradeCard;
  }
}
