import { LitElement, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import type { LibrusCardConfig, LibrusHass } from "./types";
import { resolveLibrusDevice, mapByTranslationKey, mapAllByTranslationKey, LibrusConfigError, type SubjectEntity } from "./entities";
import { t } from "./localize";
import { formatShortDate, formatTime } from "./format";

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

  // Memoizes _resolveAllByTranslationKey()'s results, same reasoning and
  // same `hass.entities` reference-identity keying as `_resolvedCache`
  // above (see its comment) - `mapAllByTranslationKey` is its own full
  // linear registry scan, called directly and uncached by 17+ cards. A
  // second Map layer keys by translationKey, in case a future card ever
  // looks up more than one on the same instance.
  private _subjectsCache?: {
    entities: LibrusHass["entities"];
    deviceId: string;
    byKey: Map<string, SubjectEntity[]>;
  };

  /** Memoized `mapAllByTranslationKey()` - see `_subjectsCache`'s own comment. */
  protected _resolveAllByTranslationKey(deviceId: string, translationKey: string): SubjectEntity[] {
    if (!this.hass) return [];
    let cache = this._subjectsCache;
    if (!cache || cache.entities !== this.hass.entities || cache.deviceId !== deviceId) {
      cache = { entities: this.hass.entities, deviceId, byKey: new Map() };
      this._subjectsCache = cache;
    }
    let result = cache.byKey.get(translationKey);
    if (!result) {
      result = mapAllByTranslationKey(this.hass, deviceId, translationKey);
      cache.byKey.set(translationKey, result);
    }
    return result;
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
    this._syncOutageStrip();
    const icon = this._cardConfig?.icon;
    if (!icon) return;
    const target = this.renderRoot.querySelector(".icon-badge ha-icon");
    if (target && target.getAttribute("icon") !== icon) {
      target.setAttribute("icon", icon);
    }
  }

  /**
   * "Librus nie odpowiada · dane z 14:20" strip right under the header,
   * while the integration's Status sensor (translation_key `status`) is
   * `stale` - i.e. Librus isn't answering and every entity shows the last
   * good data. Inserted after render, same reasoning as the icon override
   * above: one place instead of every card's template. Cards without a
   * `.header` (tiles, the student card) get no strip - it would crowd them.
   * Off with the universal `hide_outage_warning` option.
   */
  private _syncOutageStrip(): void {
    const root = this.renderRoot;
    const existing = root.querySelector<HTMLElement>(".lc-outage");
    const text = this._outageText();
    const header = root.querySelector(".header");
    if (!text || !header) {
      existing?.remove();
      return;
    }
    const strip = existing ?? document.createElement("div");
    if (!existing) {
      strip.className = "lc-outage";
      strip.setAttribute("role", "status");
    }
    if (strip.dataset.text !== text.join("|")) {
      strip.dataset.text = text.join("|");
      const icon = document.createElement("ha-icon");
      icon.setAttribute("icon", "mdi:cloud-alert-outline");
      const title = document.createElement("b");
      title.textContent = text[0];
      const detail = document.createElement("span");
      detail.textContent = `· ${text[1]}`;
      strip.replaceChildren(icon, title, detail);
    }
    if (strip.previousElementSibling !== header) header.after(strip);
  }

  private _outageText(): [string, string] | null {
    if (!this.hass || this._cardConfig?.hide_outage_warning) return null;
    const resolved = this._resolveEntities();
    if ("error" in resolved) return null;
    const statusId = resolved.map["status"];
    const status = statusId ? this.hass.states[statusId] : undefined;
    if (status?.state !== "stale") return null;
    const since = status.attributes["last_success"];
    return [
      t(this.hass, "outage.title"),
      t(this.hass, "outage.data_from", { time: outageTime(typeof since === "string" ? since : undefined, this.hass.language) }),
    ];
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

/** "14:20" for today, "6 paź 14:20" for an older day, "?" when unknown. */
export function outageTime(iso: string | undefined, locale: string | undefined): string {
  if (!iso) return "?";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "?";
  const time = formatTime(iso);
  const today = new Date();
  const sameDay =
    d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate();
  if (sameDay) return time;
  const local = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  return `${formatShortDate(local, locale)} ${time}`;
}
