import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { isoDate } from "./utils/calendar";
import { UNAVAILABLE } from "./utils/entities";
import { formatShortDate, parseCategory } from "./utils/format";
import { t } from "./utils/localize";
import { tapAction } from "./utils/actions";

@customElement("librus-week-summary-card")
export class LibrusWeekSummaryCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-week-summary-card" };
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

    const attendance = map.attendance ? hass.states[map.attendance] : undefined;
    const notices = map.behaviour_notices ? hass.states[map.behaviour_notices] : undefined;
    const agenda = map.agenda ? hass.states[map.agenda] : undefined;

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    // isoDate(), not toISOString().slice(0, 10) - the latter converts
    // through UTC first and can land on the wrong calendar date depending
    // on the viewer's timezone.
    const weekAgoIso = isoDate(weekAgo);
    const recentDate = (date: unknown): boolean => typeof date === "string" && date.slice(0, 10) >= weekAgoIso;

    // Grades given in the last 7 days (each grade, not each subject with a
    // new one); an integration without the `grades` list only says which
    // subjects got a grade, so that's counted there.
    let newGrades = 0;
    for (const s of this._resolveAllByTranslationKey(deviceId, "subject_average")) {
      const attrs = hass.states[s.entityId]?.attributes;
      const grades = attrs?.grades as { date?: string | null }[] | undefined;
      if (Array.isArray(grades)) newGrades += grades.filter((g) => recentDate(g.date)).length;
      else if (recentDate(attrs?.latest_grade_date)) newGrades += 1;
    }

    // Days with an absence in the last 7 days, from the per-day map; an older
    // integration without it only has the school-year total of unexcused
    // absences, shown under that name.
    const byDate = attendance?.attributes.by_date as Record<string, string> | undefined;
    const absence =
      attendance && !UNAVAILABLE.has(attendance.state)
        ? byDate
          ? (() => {
              const week = Object.entries(byDate).filter(([date, status]) => recentDate(date) && status !== "good");
              // Red only for a day with an absence still to excuse.
              return { value: week.length, bad: week.some(([, status]) => status === "bad"), label: t(hass, "stat.absence_days") };
            })()
          : (() => {
              const value = (attendance.attributes.unexcused_count as number | undefined) ?? Number(attendance.state);
              return { value, bad: value > 0, label: t(hass, "stat.unexcused") };
            })()
        : undefined;

    // Notes from the last 7 days (the sensor's recent list); without it, the
    // total under the sensor's own name.
    const recentNotes = notices?.attributes.recent as { date?: string | null }[] | undefined;
    const notes =
      notices && !UNAVAILABLE.has(notices.state)
        ? Array.isArray(recentNotes)
          ? { value: recentNotes.filter((n) => recentDate(n.date)).length, label: t(hass, "stat.new_notes") }
          : { value: Number(notices.state) || 0, label: t(hass, "card.behaviour_notices.title") }
        : undefined;

    const agendaMessage = agenda?.attributes.message as string | undefined;

    return html`
      <ha-card ${tapAction(this, this._config.tap_action, map.overall_average)}>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-check-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title ?? t(hass, "card.week_summary.title")}</div>
          </div>
        </div>
        <div class="stats">
          <div class="stat">
            <div class="stat-value">${newGrades}</div>
            <div class="stat-label">${t(hass, "stat.new_grades")}</div>
          </div>
          ${absence
            ? html`<div class="stat ${absence.bad ? "bad" : ""}">
                <div class="stat-value">${absence.value}</div>
                <div class="stat-label">${absence.label}</div>
              </div>`
            : nothing}
          ${notes
            ? html`<div class="stat"><div class="stat-value">${notes.value}</div><div class="stat-label">${notes.label}</div></div>`
            : nothing}
        </div>
        ${agendaMessage
          ? (() => {
              const { category, text } = parseCategory(agendaMessage);
              return html`
                <hr />
                <div class="list-item">
                  <span class="dot neutral"></span>
                  <div class="body">
                    ${category ? html`<div class="cat-label-row"><span class="cat-label">${category}</span></div>` : nothing}
                    <div class="row1">${text}</div>
                    ${agenda?.attributes.start_time
                      ? html`<div class="item-text">${formatShortDate(String(agenda.attributes.start_time), hass.language)}</div>`
                      : nothing}
                  </div>
                </div>
              `;
            })()
          : nothing}
      </ha-card>
    `;
  }

  static styles = [librusTokens, librusSharedStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-week-summary-card": LibrusWeekSummaryCard;
  }
}
