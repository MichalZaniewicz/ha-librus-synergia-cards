import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { progressRing } from "./utils/render-helpers";
import { t } from "./utils/localize";
import { tapActionHandler } from "./utils/actions";

const UNAVAILABLE = new Set(["unknown", "unavailable", ""]);

// Mirrors ha-librus-synergia's own `sensor.py::_RANK_TIERS` (0.6.0+) -
// the sensor exposes the resolved tier key + `average`/`points_to_next_tier`
// attributes, but not the tier's own lower bound, so the boundary needed
// to draw "how far through THIS tier" is duplicated here. Keep in sync if
// the backend's thresholds ever change.
const RANK_ORDER = ["bronze", "silver", "gold", "diamond"] as const;
type Rank = (typeof RANK_ORDER)[number];
const RANK_LOWER_BOUND: Record<Rank, number> = { bronze: 0, silver: 3, gold: 4, diamond: 5 };
// Gold deliberately reuses the existing --lc-amber token/`.icon-badge.amber`
// class (see style-tokens.ts) rather than a near-duplicate hue.
const RANK_COLOR: Record<Rank, string> = {
  bronze: "var(--lc-bronze)",
  silver: "var(--lc-silver)",
  gold: "var(--lc-amber)",
  diamond: "var(--lc-diamond)",
};
const RANK_BADGE_CLASS: Record<Rank, string> = { bronze: "bronze", silver: "silver", gold: "amber", diamond: "diamond" };
const RANK_ICON: Record<Rank, string> = {
  bronze: "mdi:medal-outline",
  silver: "mdi:trophy-outline",
  gold: "mdi:trophy",
  diamond: "mdi:diamond-stone",
};

function isRank(value: string): value is Rank {
  return (RANK_ORDER as readonly string[]).includes(value);
}

/**
 * The cosmetic Bronze/Silver/Gold/Diamond tier (ha-librus-synergia 0.6.0+
 * `sensor.*_rank`, `device_class: enum`) as a progress ring - how far
 * through the CURRENT tier the average is, not just the bare tier name.
 */
@customElement("librus-rank-card")
export class LibrusRankCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-rank-card" };
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

    const entity = map.rank ? hass.states[map.rank] : undefined;
    if (!entity) {
      return this._message("mdi:alert-circle-outline", t(hass, "empty.generic_error"));
    }
    // FOUND LIVE (2026-09-11): the entity existing with state "unknown" is
    // the NORMAL, expected state for an account with no numeric grades yet
    // (the backend sensor can't compute a tier without an average to rank)
    // - not an error. Showing the generic "something went wrong" message
    // for this was actively misleading (a real device/entity problem looks
    // identical to "no grades yet" otherwise) - same "empty state, not an
    // error state" precedent as librus-grade-goal-card's own
    // card.grade_goal.empty.
    if (UNAVAILABLE.has(entity.state) || !isRank(entity.state)) {
      return this._message("mdi:trophy-outline", t(hass, "card.rank.empty"));
    }
    const tier = entity.state;
    const average = entity.attributes.average as number | undefined;
    const pointsToNext = entity.attributes.points_to_next_tier as number | null | undefined;

    const tierIndex = RANK_ORDER.indexOf(tier);
    const nextTier = RANK_ORDER[tierIndex + 1];
    const lower = RANK_LOWER_BOUND[tier];
    const upper = nextTier ? RANK_LOWER_BOUND[nextTier] : undefined;
    const pct =
      average !== undefined && upper !== undefined
        ? ((average - lower) / (upper - lower)) * 100
        : 100; // top tier (Diamond) - always a full ring

    return html`
      <ha-card @click=${tapActionHandler(this, this._config.tap_action, map.rank)}>
        <div class="header">
          <div class="icon-badge ${RANK_BADGE_CLASS[tier]}">
            <ha-icon icon=${RANK_ICON[tier]}></ha-icon>
          </div>
          <div class="title-block">
            <div class="title">${this._config.title ?? t(hass, "card.rank.title")}</div>
          </div>
        </div>
        <div class="ring-row">
          ${progressRing(Math.round(pct), RANK_COLOR[tier], 68, 7)}
          <div>
            <div class="ring-num" style="color:${RANK_COLOR[tier]}">${t(hass, `rank.${tier}`)}</div>
            <div class="ring-label">${average !== undefined ? average.toFixed(2) : "—"}</div>
          </div>
        </div>
        <div class="hint">
          ${pointsToNext != null ? html`${pointsToNext.toFixed(2)} ${t(hass, "label.to_next_rank")}` : t(hass, "label.top_rank")}
        </div>
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .ring-row {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .ring-num {
        font-size: 1.3rem;
        font-weight: 800;
        line-height: 1.2;
      }
      .ring-label {
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--secondary-text-color);
        font-variant-numeric: tabular-nums;
      }
      .hint {
        font-size: 0.72rem;
        color: var(--secondary-text-color);
        margin-top: 10px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-rank-card": LibrusRankCard;
  }
}
