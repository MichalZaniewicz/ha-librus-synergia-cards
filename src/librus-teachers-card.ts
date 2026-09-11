import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { t } from "./utils/localize";

/**
 * Homeroom + subject teachers, both already-fetched data with nowhere
 * else to show it: the homeroom teacher comes from the Class sensor's
 * `homeroom_teacher` attribute, subject teachers from the School sensor's
 * `subject_teachers` attribute (subject name -> sorted teacher-name list,
 * requires `ha-librus-synergia` 0.6.0+ - a subject taught by more than
 * one teacher, e.g. split language groups, lists all of them).
 */
@customElement("librus-teachers-card")
export class LibrusTeachersCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement("librus-device-editor") as LovelaceCardEditor;
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-teachers-card" };
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
    const subjectTeachers = (school?.attributes.subject_teachers as Record<string, string[]> | undefined) ?? {};
    const subjectRows = Object.entries(subjectTeachers);

    const cls = map.school_class ? hass.states[map.school_class] : undefined;
    const homeroomTeacher = cls?.attributes.homeroom_teacher as string | undefined;

    if (!homeroomTeacher && subjectRows.length === 0) {
      return this._message("mdi:account-group-outline", t(hass, "card.teachers.empty"));
    }

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:account-group-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title ?? t(hass, "card.teachers.title")}</div>
            <div class="subtitle">${t(hass, "card.teachers.count", { n: subjectRows.length })}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${homeroomTeacher
            ? html`
                <div class="list-item">
                  <span class="dot warn"></span>
                  <div class="body">
                    <div class="row1"><span>${t(hass, "card.teachers.homeroom")}</span></div>
                    <div class="item-text">${homeroomTeacher}</div>
                  </div>
                </div>
              `
            : nothing}
          ${subjectRows.map(
            ([subject, teachers]) => html`
              <div class="list-item">
                <span class="dot neutral"></span>
                <div class="body">
                  <div class="row1"><span>${subject}</span></div>
                  <div class="item-text">${teachers.join(", ")}</div>
                </div>
              </div>
            `
          )}
        </div>
      </ha-card>
    `;
  }

  static styles = [librusTokens, librusSharedStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-teachers-card": LibrusTeachersCard;
  }
}
