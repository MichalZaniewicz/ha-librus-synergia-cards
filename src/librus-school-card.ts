import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { formatShortDate } from "./utils/format";
import { t } from "./utils/localize";

@customElement("librus-school-card")
export class LibrusSchoolCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-school-card" };
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

    const school = map.school ? hass.states[map.school] : undefined;
    const cls = map.school_class ? hass.states[map.school_class] : undefined;

    if (!school) return this._message("mdi:school", t(hass, "empty.generic_error"));

    const town = school.attributes.town as string | undefined;
    const street = school.attributes.street as string | undefined;
    const headTeacher = school.attributes.head_teacher as string | undefined;
    const tutor = cls?.attributes.homeroom_teacher as string | undefined;
    const semesterEnd = cls?.attributes.first_semester_end as string | undefined;
    const yearEnd = cls?.attributes.school_year_end as string | undefined;

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:school"></ha-icon></div>
          <div class="title-block">
            <div class="title">${school.state}</div>
            <div class="subtitle">${[town, street].filter(Boolean).join(", ")}</div>
          </div>
        </div>
        <div class="stats">
          ${cls
            ? html`<div class="stat"><div class="stat-value">${cls.state}</div><div class="stat-label">Klasa</div></div>`
            : nothing}
          ${tutor
            ? html`<div class="stat"><div class="stat-value" style="font-size:0.95rem;">${tutor}</div><div class="stat-label">${t(hass, "label.tutor")}</div></div>`
            : nothing}
        </div>
        ${headTeacher
          ? html`<div class="item-text">${t(hass, "label.head_teacher")}: ${headTeacher}</div>`
          : nothing}
        ${semesterEnd || yearEnd
          ? html`
              <hr />
              <div class="chips">
                ${semesterEnd
                  ? html`<span class="chip">${t(hass, "label.semester_ends")} <span class="n">${formatShortDate(semesterEnd, hass.language)}</span></span>`
                  : nothing}
                ${yearEnd
                  ? html`<span class="chip">${t(hass, "label.year_ends")} <span class="n">${formatShortDate(yearEnd, hass.language)}</span></span>`
                  : nothing}
              </div>
            `
          : nothing}
      </ha-card>
    `;
  }

  static styles = [librusTokens, librusSharedStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-school-card": LibrusSchoolCard;
  }
}
