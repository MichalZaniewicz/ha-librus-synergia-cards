import { html, css, nothing, type TemplateResult, type PropertyValues } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { numOrNull as num } from "./utils/format";
import { t, type TranslationKey } from "./utils/localize";
import { heroSubjectStat } from "./utils/forecast";
import {
  CATALOG,
  HERO_ORDER,
  computeHeroResult,
  overallWithPoints,
  readAchievementCount,
  recordHeroHistory,
  type HeroMode,
  type SubjectStat,
} from "./utils/hero-archetypes";

interface GradeLogEntry {
  value: string;
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
  // Set at the end of render(), read back in updated() - keeps the
  // localStorage write a lifecycle-hook side effect, not something render()
  // itself does, without recomputing the whole result a second time.
  private _pendingHistory?: { deviceId: string; resultId: string };
  // The `deviceId:resultId` last written - localStorage is only touched
  // when the result (or the student) actually changes.
  private _recorded?: string;
  /** The "how results work" explanation, opened by tapping the result. */
  @state() private _howOpen = false;

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

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    const pending = this._pendingHistory;
    if (!pending) return;
    const key = `${pending.deviceId}:${pending.resultId}`;
    if (key === this._recorded) return;
    this._recorded = key;
    recordHeroHistory(pending.deviceId, pending.resultId);
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { deviceId, map } = resolved;
    const hass = this.hass;
    const mode: HeroMode = this._config.mode === "hero" ? "hero" : "archetype";

    // Point-graded subjects count with their forecast grade (see heroSubjectStat).
    const subjects: SubjectStat[] = this._resolveAllByTranslationKey(deviceId, "subject_average").map((s) =>
      heroSubjectStat(s.subject, hass.states[s.entityId])
    );

    const overall = map.overall_average ? hass.states[map.overall_average] : undefined;
    const attendance = map.attendance ? hass.states[map.attendance] : undefined;
    const attendanceStreak = map.attendance_streak ? hass.states[map.attendance_streak] : undefined;
    const goodGradeStreak = map.good_grade_streak ? hass.states[map.good_grade_streak] : undefined;
    const behaviourGrade = map.behaviour_grade ? hass.states[map.behaviour_grade] : undefined;
    const behaviourNotices = map.behaviour_notices ? hass.states[map.behaviour_notices] : undefined;
    const rank = map.rank ? hass.states[map.rank] : undefined;
    const recentNotes =
      (behaviourNotices?.attributes.recent as { sentiment: string | null }[] | undefined) ?? [];

    const result = computeHeroResult({
      subjects,
      overallAverage: overallWithPoints(num(overall?.state), subjects),
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
      // Read (with its localStorage fallback) again only when the Rank sensor changes.
      achievementCount: this._memo("achievements", [deviceId, rank], () =>
        readAchievementCount(deviceId, rank?.attributes)
      ),
    });

    if (!result) {
      this._pendingHistory = undefined;
      return this._message("mdi:creation-outline", t(hass, "card.hero.empty"));
    }
    this._pendingHistory = { deviceId, resultId: result.id };
    const toggle = (): void => {
      this._howOpen = !this._howOpen;
    };

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
        <div
          class="result tap"
          role="button"
          tabindex="0"
          aria-expanded=${this._howOpen ? "true" : "false"}
          title=${t(hass, "card.hero.tap_hint")}
          @click=${toggle}
          @keydown=${(ev: KeyboardEvent) => {
            if (ev.key !== "Enter" && ev.key !== " ") return;
            ev.preventDefault();
            toggle();
          }}
        >
          <div class="result-badge"><ha-icon icon=${result.icon}></ha-icon></div>
          <div class="result-name">${t(hass, result.nameKey[mode])}</div>
          <div class="result-desc">${t(hass, result.descKey[mode])}</div>
        </div>
        <div class="evidence">
          ${result.evidence.map((chip) => html`<span class="evidence-chip">${t(hass, chip.key, chip.vars)}</span>`)}
        </div>
        ${this._howOpen
          ? html`<div class="explain" role="note">
              <div class="explain-title">
                <ha-icon icon=${result.icon}></ha-icon>${t(hass, result.nameKey[mode])}
              </div>
              <div>${t(hass, `hero.rule.${result.id}` as TranslationKey)}</div>
              <div class="explain-meta">${t(hass, "card.hero.how_intro")}</div>
              <ol class="how-list">
                ${HERO_ORDER.map((id) => {
                  const entry = CATALOG[id];
                  const mine = id === result.id;
                  return html`<li class=${mine ? "mine" : ""}>
                    <ha-icon icon=${entry.icon}></ha-icon>
                    <div>
                      <b>${t(hass, entry.nameKey[mode])}</b>${mine
                        ? html` <span class="you">${t(hass, "card.hero.yours")}</span>`
                        : nothing}
                      <div class="how-rule">${t(hass, `hero.rule.${id}` as TranslationKey)}</div>
                    </div>
                  </li>`;
                })}
              </ol>
            </div>`
          : nothing}
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
      .result.tap {
        border-radius: 12px;
      }
      .how-list {
        list-style: none;
        margin: 8px 0 0;
        padding: 0;
        display: grid;
        gap: 7px;
      }
      .how-list li {
        display: grid;
        grid-template-columns: 18px minmax(0, 1fr);
        gap: 8px;
        align-items: start;
        padding: 4px 6px;
        border-radius: 8px;
      }
      .how-list li ha-icon {
        --mdc-icon-size: 16px;
        color: var(--secondary-text-color);
        margin-top: 1px;
      }
      .how-list li.mine {
        background: var(--lc-brand-bg);
        outline: 1px solid var(--lc-brand);
      }
      .how-list li.mine ha-icon {
        color: var(--lc-brand);
      }
      .how-rule {
        color: var(--secondary-text-color);
        font-size: 0.72rem;
      }
      .you {
        font-size: 0.66rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--lc-brand-strong);
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
