import { LitElement, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import type { LibrusCardConfig, LibrusHass } from "./types";
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

  // Monotonic counter behind _beginFetch()/_isCurrentFetch() - see their
  // docs below. Shared by the ~10 cards with an on-demand calendar/history
  // fetch (a `_fetch(force)` method keyed on a `_fetchedFor` cache string).
  private _fetchGeneration = 0;

  /**
   * Call at the START of an on-demand async fetch (after `_fetchedFor` has
   * already been updated to the new cache key), and keep the returned
   * value in a local const. Pass that same value to `_isCurrentFetch()`
   * once the fetch's own `await` resolves, before applying its result.
   *
   * Fixes a real race: a config change mid-flight (e.g. `days`/
   * `device_id`/`exam_keywords`) starts a NEW fetch for a new cache key
   * while an OLDER fetch for the previous key is still in flight. If the
   * older one resolves LAST, it would otherwise silently overwrite the
   * newer, correct result - and since `_fetchedFor` already points at the
   * newer cache key by then, a later render would see that key as
   * "current" and never refetch, leaving the card stuck showing stale data
   * until the next periodic forced refresh. Discarding a superseded
   * fetch's result (rather than letting whichever resolves last win) closes
   * that gap.
   */
  protected _beginFetch(): number {
    return ++this._fetchGeneration;
  }

  /** True if `generation` (from `_beginFetch()`) is still the most recent one. */
  protected _isCurrentFetch(generation: number): boolean {
    return generation === this._fetchGeneration;
  }

  /**
   * Reaches into the subclass's own `@state() private _config` field by
   * NAME at runtime, rather than requiring every one of the ~46 cards to
   * plumb their config through to the base class. TS `private` is a
   * compile-time-only concept - every card names this field identically
   * (a repo-wide grep confirms it), so this is safe in practice and lets
   * the universal `icon`/`hide_header`/`compact` options below work on
   * every existing AND future card for free, instead of a much larger
   * refactor touching every card's render().
   */
  private get _cardConfig(): LibrusCardConfig | undefined {
    return (this as unknown as { _config?: LibrusCardConfig })._config;
  }

  /** Call at the top of render(): toggles the `.dark`/`.compact`/`.hide-header` host classes used by style-tokens.ts. */
  protected _syncTheme(): void {
    this.classList.toggle("dark", Boolean(this.hass?.themes?.darkMode));
    const config = this._cardConfig;
    this.classList.toggle("compact", Boolean(config?.compact));
    this.classList.toggle("hide-header", Boolean(config?.hide_header));
  }

  /**
   * Post-render icon override - `<ha-icon icon=...>` bindings are owned by
   * each card's own template, so a CSS class can't swap the glyph the way
   * `.dark`/`.compact` work. Re-stamping the attribute here, after every
   * render, covers every card's `.icon-badge ha-icon` uniformly without
   * per-card template changes. Harmless no-op for the couple of cards
   * (e.g. librus-student-card) with no `.icon-badge` at all.
   */
  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    const icon = this._cardConfig?.icon;
    if (!icon) return;
    const target = this.renderRoot.querySelector(".icon-badge ha-icon");
    if (target && target.getAttribute("icon") !== icon) {
      target.setAttribute("icon", icon);
    }
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
