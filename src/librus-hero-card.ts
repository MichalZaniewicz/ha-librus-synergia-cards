import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { mapAllByTranslationKey } from "./utils/entities";
import { t } from "./utils/localize";
import { computeHeroResult, readAchievementCount, type HeroMode, type SubjectStat } from "./utils/hero-archetypes";

interface GradeLogEntry {
  value: string;
}

function num(v: unknown): number | null {
  if (v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

/**
 * A "for fun" result card, in the same family as Rank/Level/Streak: one
 * deterministic outcome (never random - same data always gives the same
 * result) computed from subject averages, attendance, behaviour and
 * streaks already exposed by other sensors. Two tones of the SAME
 * computation, picked once in the editor's "Mode" field (not a runtime
 * toggle on the card face): "archetype" reads like a school-counsellor
 * label ("Naukowiec"), "hero" reads like an RPG class ("Archimag").
 *
 * See `utils/hero-archetypes.ts` for the actual decision logic - kept
 * separate from this file so it stays a pure, testable function.
 */
@customElement("librus-hero-card")
export class LibrusHeroCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-hero-card" };
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
    const mode: HeroMode = this._config.mode === "hero" ? "hero" : "archetype";

    const subjects: SubjectStat[] = mapAllByTranslationKey(hass, deviceId, "subject_average").map((s) => {
      const state = hass.states[s.entityId];
      const gradeList = (state?.attributes.grades as GradeLogEntry[] | undefined) ?? [];
      return {
        subject: s.subject,
        average: state ? num(state.state) : null,
        gradeCount: gradeList.length,
      };
    });

    const overall = map.overall_average ? hass.states[map.overall_average] : undefined;
    const attendance = map.attendance ? hass.states[map.attendance] : undefined;
    const attendanceStreak = map.attendance_streak ? hass.states[map.attendance_streak] : undefined;
    const goodGradeStreak = map.good_grade_streak ? hass.states[map.good_grade_streak] : undefined;
    const behaviourGrade = map.behaviour_grade ? hass.states[map.behaviour_grade] : undefined;
    const behaviourNotices = map.behaviour_notices ? hass.states[map.behaviour_notices] : undefined;
    const recentNotes =
      (behaviourNotices?.attributes.recent as { sentiment: string | null }[] | undefined) ?? [];

    const result = computeHeroResult({
      subjects,
      overallAverage: num(overall?.state),
      overallSemester1: num(overall?.attributes.average_semester_1),
      overallSemester2: num(overall?.attributes.average_semester_2),
      attendanceStreak: num(attendanceStreak?.state),
      unexcusedCount: num(attendance?.attributes.unexcused_count),
      goodGradeStreak: num(goodGradeStreak?.state),
      behaviourShortName:
        behaviourGrade && !["unknown", "unavailable"].includes(behaviourGrade.state)
          ? behaviourGrade.state
          : null,
      recentNoteSentiments: recentNotes.map((n) => n.sentiment),
      achievementCount: readAchievementCount(deviceId),
    });

    if (!result) {
      return this._message("mdi:creation-outline", t(hass, "card.hero.empty"));
    }

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:creation-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">
              ${this._config.title ?? t(hass, mode === "hero" ? "card.hero.title_hero" : "card.hero.title_archetype")}
            </div>
            <div class="subtitle">${t(hass, "card.hero.subtitle")}</div>
          </div>
        </div>
        <div class="result">
          <div class="result-badge"><ha-icon icon=${result.icon}></ha-icon></div>
          <div class="result-name">${t(hass, result.nameKey[mode])}</div>
          <div class="result-desc">${t(hass, result.descKey[mode])}</div>
        </div>
        <div class="evidence">
          ${result.evidence.map((chip) => html`<span class="evidence-chip">${t(hass, chip.key, chip.vars)}</span>`)}
        </div>
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      /* Fixed-height contract: name and description each reserve exactly 2
         lines, and there are always exactly 2 evidence chips on one row -
         so the card's height never changes across any result. The copy in
         translations/*.ts is written to fit; this is the defensive
         backstop on top of that. */
      .result {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 10px;
        padding: 6px 4px 2px;
      }
      .result-badge {
        width: 76px;
        height: 76px;
        border-radius: 50%;
        background: var(--lc-brand-bg);
        color: var(--lc-brand);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--lc-brand);
        flex: none;
      }
      .result-badge ha-icon {
        --mdc-icon-size: 40px;
      }
      .result-name {
        font-size: 1.15rem;
        font-weight: 800;
        color: var(--primary-text-color);
        line-height: 1.25;
        min-height: 2.6em;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        align-items: center;
      }
      .result-desc {
        font-size: 0.8rem;
        color: var(--secondary-text-color);
        line-height: 1.5;
        max-width: 40ch;
        min-height: 3em;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .evidence {
        display: flex;
        gap: 8px;
        flex-wrap: nowrap;
        justify-content: center;
        overflow-x: auto;
        width: 100%;
      }
      .evidence-chip {
        font-size: 0.68rem;
        font-weight: 600;
        color: var(--lc-brand-strong);
        background: var(--lc-chip-bg);
        border-radius: 999px;
        padding: 4px 9px;
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
        flex: none;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-hero-card": LibrusHeroCard;
  }
}
