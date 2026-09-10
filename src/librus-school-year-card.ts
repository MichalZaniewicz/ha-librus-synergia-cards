import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { progressRing } from "./utils/render-helpers";
import { daysBetween, formatShortDate } from "./utils/format";
import { t } from "./utils/localize";
import { tapActionHandler } from "./utils/actions";

/**
 * Countdown to the end of the school year, plus a "how far through it are
 * we" progress ring and the current semester's own end date. Entirely
 * local computation from the `school_class` sensor's own attributes
 * (`school_year_start`/`first_semester_end`/`school_year_end`, already
 * shipped for the School & class card) - no calendar fetch needed.
 */
@customElement("librus-school-year-card")
export class LibrusSchoolYearCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  private _tickTimer?: ReturnType<typeof setInterval>;

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement("librus-device-editor") as LovelaceCardEditor;
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-school-year-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 2;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    // A day boundary crossing is the only thing that changes this card's
    // numbers - checking once an hour is plenty and costs nothing idle.
    this._tickTimer = setInterval(() => this.requestUpdate(), 60 * 60_000);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this._tickTimer);
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { map } = resolved;
    const hass = this.hass;

    const cls = map.school_class ? hass.states[map.school_class] : undefined;
    const yearStartIso = cls?.attributes.school_year_start as string | undefined;
    const semesterEndIso = cls?.attributes.first_semester_end as string | undefined;
    const yearEndIso = cls?.attributes.school_year_end as string | undefined;

    if (!cls || !yearStartIso || !yearEndIso) {
      return this._message("mdi:party-popper", t(hass, "card.school_year.empty"));
    }

    const today = new Date();
    const yearStart = new Date(`${yearStartIso}T00:00:00`);
    const yearEnd = new Date(`${yearEndIso}T00:00:00`);
    const totalDays = Math.max(1, daysBetween(yearStart, yearEnd));
    const elapsedDays = Math.min(totalDays, Math.max(0, daysBetween(yearStart, today)));
    const pct = Math.round((elapsedDays / totalDays) * 100);
    const daysLeft = Math.max(0, daysBetween(today, yearEnd));

    const isFirstSemester = semesterEndIso ? today < new Date(`${semesterEndIso}T00:00:00`) : true;
    const currentSemesterEndIso = isFirstSemester && semesterEndIso ? semesterEndIso : yearEndIso;
    const semesterDaysLeft = Math.max(0, daysBetween(today, new Date(`${currentSemesterEndIso}T00:00:00`)));

    return html`
      <ha-card @click=${tapActionHandler(this, this._config.tap_action, map.school_class)}>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:party-popper"></ha-icon></div>
          <div class="title-block">
            <div class="title">${t(hass, "card.school_year.title")}</div>
            <div class="subtitle">${formatShortDate(yearEndIso, hass.language)}</div>
          </div>
        </div>
        <div class="ring-row">
          ${progressRing(pct, "var(--lc-brand)", 68, 7)}
          <div>
            <div class="ring-num">${daysLeft}</div>
            <div class="ring-label">${t(hass, "label.days_until_year_end")}</div>
          </div>
        </div>
        <hr />
        <div class="stats">
          <div class="stat">
            <div class="stat-value">${t(hass, "card.attendance.semester", { n: isFirstSemester ? 1 : 2 })}</div>
            <div class="stat-label">${t(hass, "label.current_semester")}</div>
          </div>
          <div class="stat">
            <div class="stat-value">${semesterDaysLeft}</div>
            <div class="stat-label">${t(hass, "label.days_until_semester_end")}</div>
          </div>
          <div class="stat">
            <div class="stat-value">${pct}<span class="unit">%</span></div>
            <div class="stat-label">${t(hass, "label.year_progress")}</div>
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
        font-size: 1.7rem;
        font-weight: 800;
        font-variant-numeric: tabular-nums;
        line-height: 1.1;
        color: var(--lc-brand);
      }
      .ring-label {
        font-size: 0.72rem;
        color: var(--secondary-text-color);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-school-year-card": LibrusSchoolYearCard;
  }
}
