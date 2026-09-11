import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { mapAllByTranslationKey } from "./utils/entities";
import { progressRing } from "./utils/render-helpers";
import { t } from "./utils/localize";

interface GradeLogEntry {
  value: string;
}

// Deliberately simple, and shown IN the card (the two XP-source tiles)
// rather than hidden - this is a motivational nudge, not a real metric,
// same "rough estimate" framing as librus-grade-simulator-card.
const XP_PER_GRADE = 8;
const XP_BONUS_GOOD_GRADE = 7; // grade digit >= 4 - mirrors the backend's good-grade-streak threshold
const XP_PER_PRESENT_RECORD = 1;
const LEVEL_BASE_STEP = 100;

/**
 * A pure "for fun" level/XP meter - unlike Rank (librus-rank-card), which
 * tracks the CURRENT average and can go back down, this only ever goes up:
 * XP accrues for every grade ever recorded (a bonus for a good one) and
 * every attendance record that isn't an absence. No backend changes -
 * computed client-side from the same `grades`/attendance attributes other
 * cards already read, so a brand-new account with zero data legitimately
 * starts at Level 1 / 0 XP - not an error/empty state, unlike Rank (which
 * genuinely can't compute a tier with no average to rank).
 */
function levelFromXp(xp: number): { level: number; into: number; span: number } {
  let level = 1;
  let consumed = 0;
  let step = LEVEL_BASE_STEP;
  while (xp >= consumed + step) {
    consumed += step;
    level += 1;
    step += LEVEL_BASE_STEP;
  }
  return { level, into: xp - consumed, span: step };
}

@customElement("librus-level-card")
export class LibrusLevelCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-level-card" };
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
    const { deviceId, map } = resolved;
    const hass = this.hass;

    let gradeCount = 0;
    let goodGradeCount = 0;
    for (const s of mapAllByTranslationKey(hass, deviceId, "subject_average")) {
      const grades = (hass.states[s.entityId]?.attributes.grades as GradeLogEntry[] | undefined) ?? [];
      for (const g of grades) {
        gradeCount += 1;
        const digit = /^([1-6])/.exec(g.value.trim())?.[1];
        if (digit && Number(digit) >= 4) goodGradeCount += 1;
      }
    }

    const attendance = map.attendance ? hass.states[map.attendance] : undefined;
    const totalRecords = (attendance?.attributes.total_records as number | undefined) ?? 0;
    const unexcused = (attendance?.attributes.unexcused_count as number | undefined) ?? 0;
    const excused = (attendance?.attributes.excused_count as number | undefined) ?? 0;
    const presentRecords = Math.max(0, totalRecords - unexcused - excused);

    const gradeXp = gradeCount * XP_PER_GRADE + goodGradeCount * XP_BONUS_GOOD_GRADE;
    const attendanceXp = presentRecords * XP_PER_PRESENT_RECORD;
    const xp = gradeXp + attendanceXp;
    const { level, into, span } = levelFromXp(xp);
    const pct = (into / span) * 100;

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:progress-star"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title ?? t(hass, "card.level.title")}</div>
            <div class="subtitle">${t(hass, "card.level.subtitle")}</div>
          </div>
        </div>
        <div class="ring-row">
          ${progressRing(Math.round(pct), "var(--lc-brand)", 68, 7)}
          <div>
            <div class="ring-num">${t(hass, "label.level", { n: level })}</div>
            <div class="ring-label">${t(hass, "label.xp_to_next", { n: span - into })}</div>
          </div>
        </div>
        <div class="stats">
          <div class="stat">
            <div class="stat-value">${gradeXp}</div>
            <div class="stat-label">${t(hass, "label.xp_from_grades")}</div>
          </div>
          <div class="stat">
            <div class="stat-value">${attendanceXp}</div>
            <div class="stat-label">${t(hass, "label.xp_from_attendance")}</div>
          </div>
          <div class="stat">
            <div class="stat-value">${xp}</div>
            <div class="stat-label">${t(hass, "label.xp_total")}</div>
          </div>
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
        color: var(--lc-brand);
      }
      .ring-label {
        font-size: 0.76rem;
        color: var(--secondary-text-color);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-level-card": LibrusLevelCard;
  }
}
