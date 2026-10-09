import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { t } from "./utils/localize";

interface RecentBehaviourGrade {
  /** Short form ("bdb", or the points) - integration 0.10.0-beta.2+. */
  grade?: string;
  /** Full name of a classic-scale grade ("bardzo dobre") - integration 0.10.0-beta.2+. */
  name?: string | null;
  short_name: string;
  value: number | null;
  category: string | null;
  date: string | null;
  text: string;
  comments: string[];
}

@customElement("librus-behaviour-grade-card")
export class LibrusBehaviourGradeCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-behaviour-grade-card" };
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

    const entity = map.behaviour_grade ? hass.states[map.behaviour_grade] : undefined;
    const recent = (entity?.attributes.recent as RecentBehaviourGrade[] | undefined) ?? [];
    const latest = recent[0];

    if (!latest) return this._message("mdi:medal-outline", t(hass, "card.behaviour_grade.empty"));

    // Found live (2026-10-05): a classic-scale "bdb" arrives with an empty
    // short_name and value 0 - the grade is only in `grade`/`name`, which
    // older integrations don't send, hence the short_name fallback.
    const badge = latest.grade || latest.short_name;
    // Points only for a points-based school; a classic grade's value 0 isn't a score.
    const points = !latest.name && latest.value ? latest.value : null;
    const comments = (latest.comments ?? []).map((c) => c.trim()).filter(Boolean);

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge good"><ha-icon icon="mdi:medal-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title ?? t(hass, "card.behaviour_grade.title")}</div>
            <div class="subtitle">${latest.category ?? t(hass, "card.behaviour_grade.subtitle")}</div>
          </div>
          ${badge ? html`<div class="grade-badge">${badge}</div>` : nothing}
        </div>
        ${latest.name ? html`<div class="grade-name">${latest.name}</div>` : nothing}
        ${points !== null
          ? html`<div class="stats"><div class="stat good"><div class="stat-value">${points > 0 ? "+" : ""}${points}</div><div class="stat-label">pkt</div></div></div>`
          : nothing}
        ${latest.text ? html`<div class="quote">${latest.text}</div>` : nothing}
        ${comments.length ? html`<div class="comment">${comments.join(" · ")}</div>` : nothing}
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
        color: var(--lc-good);
        flex: none;
      }
      .grade-name {
        font-size: 1.05rem;
        font-weight: 700;
        color: var(--lc-good);
      }
      .grade-name::first-letter {
        text-transform: uppercase;
      }
      .comment {
        font-size: 0.8rem;
        color: var(--secondary-text-color);
        line-height: 1.4;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-behaviour-grade-card": LibrusBehaviourGradeCard;
  }
}
