import { LitElement, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { LibrusCardConfig, LibrusHass } from "./utils/types";
import { findLibrusDeviceIds } from "./utils/entities";

/**
 * Shared visual editor for every card in this repo - every card's config is
 * currently just an optional `device_id`, so a single generic device-picker
 * covers all of them. Only renders a picker at all when there's more than
 * one Librus device to choose from (matches the zero-config default).
 */
@customElement("librus-device-editor")
export class LibrusDeviceEditor extends LitElement {
  @property({ attribute: false }) public hass?: LibrusHass;
  @state() private _config?: LibrusCardConfig;

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const devices = findLibrusDeviceIds(this.hass);
    if (devices.length < 2) return nothing;

    return html`
      <ha-select
        label="Uczeń / Student"
        .value=${this._config.device_id ?? ""}
        naturalMenuWidth
        fixedMenuPosition
        @selected=${(e: Event) => this._onSelected(e)}
        @closed=${(e: Event) => {
          e.stopPropagation();
          this._onSelected(e);
        }}
      >
        ${devices.map((id) => {
          const device = this.hass!.devices?.[id];
          const name = device?.name_by_user || device?.name || id;
          return html`<ha-list-item .value=${id}>${name}</ha-list-item>`;
        })}
      </ha-select>
    `;
  }

  private _onSelected(ev: Event): void {
    // `ha-select`'s `selected` event does not reliably cross its shadow
    // boundary; `closed` does, and `ha-select.value` is up to date by then.
    const deviceId = (ev.currentTarget as (Element & { value?: string }) | null)?.value;
    if (!deviceId || !this._config || deviceId === this._config.device_id) return;
    const newConfig = { ...this._config, device_id: deviceId };
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: newConfig }, bubbles: true, composed: true })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-device-editor": LibrusDeviceEditor;
  }
}
