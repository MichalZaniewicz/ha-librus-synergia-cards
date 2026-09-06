import { LitElement, html, nothing, type TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import type { LibrusHass } from "./types";
import { resolveLibrusDevice, mapByTranslationKey, LibrusConfigError } from "./entities";
import { t } from "./localize";

/**
 * Shared plumbing for every Librus card: dark-mode class sync, device
 * resolution + translation_key lookup, and a consistent empty/error state.
 * Widgets extend this and only implement `render()`.
 */
type ResolvedEntities = { deviceId: string; map: Record<string, string> } | { error: TemplateResult };

export abstract class LibrusBaseCard extends LitElement {
  @property({ attribute: false }) public hass?: LibrusHass;

  protected _configuredDeviceId?: string;

  // Memoizes _resolveEntities()'s result, keyed on the specific `hass.entities`
  // object reference it was computed from. Home Assistant's frontend hands
  // every card a brand-new `hass` object on ANY state change anywhere in the
  // whole instance, but it only creates a new `hass.entities` (the registry)
  // when the registry itself actually changes (a rename, a reload, a device
  // added/removed) - far rarer than state updates. Without this, every card
  // re-ran a full linear scan of `hass.entities` (via resolveLibrusDevice's
  // findLibrusDeviceIds + mapByTranslationKey) on every single render, most
  // of which were triggered by an unrelated entity's state changing
  // elsewhere in the user's HA instance.
  private _resolvedCache?: {
    entities: LibrusHass["entities"];
    configuredDeviceId: string | undefined;
    result: ResolvedEntities;
  };

  /** Call at the top of render(): toggles the `.dark` host class used by style-tokens.ts. */
  protected _syncTheme(): void {
    this.classList.toggle("dark", Boolean(this.hass?.themes?.darkMode));
  }

  /** Resolves the device + translation_key map, or a ready-to-return error template. */
  protected _resolveEntities(): ResolvedEntities {
    if (!this.hass) {
      return { error: this._message("mdi:alert-circle-outline", t(this.hass, "empty.loading")) };
    }
    const cached = this._resolvedCache;
    if (cached && cached.entities === this.hass.entities && cached.configuredDeviceId === this._configuredDeviceId) {
      return cached.result;
    }
    let result: ResolvedEntities;
    try {
      const deviceId = resolveLibrusDevice(this.hass, this._configuredDeviceId);
      result = { deviceId, map: mapByTranslationKey(this.hass, deviceId) };
    } catch (err) {
      result = { error: this._message("mdi:alert-circle-outline", this._configErrorMessage(err)) };
    }
    this._resolvedCache = { entities: this.hass.entities, configuredDeviceId: this._configuredDeviceId, result };
    return result;
  }

  private _configErrorMessage(err: unknown): string {
    if (err instanceof LibrusConfigError) {
      if (err.code === "device_missing") {
        return t(this.hass, "error.device_missing", { device: err.deviceId ?? "" });
      }
      if (err.code === "multiple_devices") return t(this.hass, "error.multiple_devices");
      return t(this.hass, "error.no_device");
    }
    return t(this.hass, "empty.generic_error");
  }

  protected _message(icon: string, title: string, subtitle?: string): TemplateResult {
    return html`
      <ha-card class="static">
        <div class="empty">
          <ha-icon .icon=${icon}></ha-icon>
          <div class="t1">${title}</div>
          ${subtitle ? html`<div class="t2">${subtitle}</div>` : nothing}
        </div>
      </ha-card>
    `;
  }
}
