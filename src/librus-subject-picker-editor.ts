import { LitElement, html, css, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { LibrusHass } from "./utils/types";
import { findLibrusDeviceIds, resolveLibrusDevice, mapAllByTranslationKey } from "./utils/entities";

export interface LibrusSubjectCardConfig {
  type: string;
  device_id?: string;
  subject_id?: number;
}

/**
 * Editor for `librus-subject-grades-card` - a device picker (only shown
 * with more than one Librus device, same as `librus-device-editor`) plus a
 * subject picker populated from that device's `subject_average` entities.
 */
@customElement("librus-subject-picker-editor")
export class LibrusSubjectPickerEditor extends LitElement {
  @property({ attribute: false }) public hass?: LibrusHass;
  @state() private _config?: LibrusSubjectCardConfig;

  public setConfig(config: LibrusSubjectCardConfig): void {
    this._config = config;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const devices = findLibrusDeviceIds(this.hass);

    let deviceId: string | undefined;
    try {
      deviceId = resolveLibrusDevice(this.hass, this._config.device_id);
    } catch {
      deviceId = undefined;
    }
    const subjects = deviceId ? mapAllByTranslationKey(this.hass, deviceId, "subject_average") : [];

    return html`
      <div class="editor">
        ${devices.length > 1
          ? html`
              <ha-select
                label="Uczeń / Student"
                .value=${this._config.device_id ?? ""}
                @selected=${this._onDeviceSelected}
                @closed=${(e: Event) => e.stopPropagation()}
              >
                ${devices.map((id) => {
                  const device = this.hass!.devices?.[id];
                  const name = device?.name_by_user || device?.name || id;
                  return html`<ha-list-item .value=${id}>${name}</ha-list-item>`;
                })}
              </ha-select>
            `
          : nothing}
        <ha-select
          label="Przedmiot / Subject"
          .value=${this._config.subject_id !== undefined ? String(this._config.subject_id) : ""}
          @selected=${this._onSubjectSelected}
          @closed=${(e: Event) => e.stopPropagation()}
        >
          ${subjects.map((s) =>
            s.subjectId !== undefined
              ? html`<ha-list-item .value=${String(s.subjectId)}>${s.subject}</ha-list-item>`
              : nothing
          )}
        </ha-select>
      </div>
    `;
  }

  private _onDeviceSelected(ev: CustomEvent<{ index: number }>): void {
    const devices = findLibrusDeviceIds(this.hass!);
    const deviceId = devices[ev.detail.index];
    if (!deviceId || !this._config) return;
    this._emit({ ...this._config, device_id: deviceId });
  }

  private _onSubjectSelected(ev: CustomEvent<{ index: number }>): void {
    if (!this._config || !this.hass) return;
    let deviceId: string | undefined;
    try {
      deviceId = resolveLibrusDevice(this.hass, this._config.device_id);
    } catch {
      return;
    }
    const subjects = mapAllByTranslationKey(this.hass, deviceId, "subject_average");
    const subjectId = subjects[ev.detail.index]?.subjectId;
    if (subjectId === undefined) return;
    this._emit({ ...this._config, subject_id: subjectId });
  }

  private _emit(config: LibrusSubjectCardConfig): void {
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true })
    );
  }

  static styles = css`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 4px 0;
    }
    ha-select {
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-subject-picker-editor": LibrusSubjectPickerEditor;
  }
}
