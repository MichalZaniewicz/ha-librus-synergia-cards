import { LitElement, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import type { LibrusCardConfig, LibrusHass } from "./types";
import {
  resolveLibrusDevice,
  mapByTranslationKey,
  mapAllByTranslationKey,
  registryIndex,
  LibrusConfigError,
  type SubjectEntity,
} from "./entities";
import { t } from "./localize";
import { formatShortDate, formatTime } from "./format";
import { isoDate } from "./calendar";

/**
 * Shared plumbing for every Librus card: dark-mode class sync, device
 * resolution + translation_key lookup, and a consistent empty/error state.
 * Widgets extend this and only implement `render()`.
 */
type ResolvedEntities = { deviceId: string; map: Record<string, string> } | { error: TemplateResult };

/** A card with nothing else to re-render for still renders once a minute
 * when a new `hass` arrives - day changes, "X min ago" texts and the like. */
const HEARTBEAT_MS = 60_000;

/** A failed on-demand fetch is tried again no sooner than this. */
const FETCH_RETRY_MS = 60_000;

interface CardTimer {
  fn: () => void;
  handle: ReturnType<typeof setInterval>;
  /** A tick was skipped while the page was hidden. */
  missed: boolean;
}

export abstract class LibrusBaseCard extends LitElement {
  @property({ attribute: false }) public hass?: LibrusHass;

  protected _configuredDeviceId?: string;

  /**
   * Set by a card that shows every student at once (the First lesson card):
   * it then re-renders on a change of ANY Librus entity, not only its own
   * device's, and its periodic refresh looks at every student's Last
   * update sensor.
   */
  protected _watchAllDevices = false;

  // Memoizes _resolveEntities()'s result, keyed on the specific `hass.entities`
  // object reference it was computed from. Home Assistant's frontend hands
  // every card a brand-new `hass` object on ANY state change anywhere in the
  // whole instance, but it only creates a new `hass.entities` (the registry)
  // when the registry itself actually changes (a rename, a reload, a device
  // added/removed) - far rarer than state updates.
  private _resolvedCache?: {
    entities: LibrusHass["entities"];
    configuredDeviceId: string | undefined;
    result: ResolvedEntities;
  };

  // Monotonic counter behind _beginFetch()/_isCurrentFetch() - see their
  // docs below. Shared by the ~10 cards with an on-demand calendar/history
  // fetch (a `_fetch(force)` method keyed on a `_fetchedFor` cache string).
  private _fetchGeneration = 0;

  // What the last render saw of `hass`, and when it ran - see shouldUpdate().
  private _lastHass?: {
    entities: LibrusHass["entities"];
    devices: LibrusHass["devices"];
    states: LibrusHass["states"];
    language: string;
    locale: unknown;
    themes: unknown;
    darkMode: boolean;
  };
  private _lastRenderAt = 0;

  private _timers: CardTimer[] = [];
  private _memos = new Map<string, { deps: readonly unknown[]; value: unknown }>();
  // The config + dark mode _syncTheme() last applied.
  private _themedFor?: { config: unknown; dark: boolean };
  // The `icon` option updated() last stamped on the header icon.
  private _appliedIcon?: string;

  /**
   * Render only when something this card shows can have changed. Home
   * Assistant hands every card a new `hass` on ANY state change in the
   * whole instance (a light, a power meter ticking every second), and every
   * card used to re-render for each of them. Now a `hass` change alone
   * renders only when the registry, language, locale or dark mode changed,
   * when one of this card's own Librus entities changed (every Librus
   * entity with `_watchAllDevices`), or when the last render is more than a
   * minute old. Config/@state changes and a timer's `requestUpdate()`
   * always render.
   */
  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.size === 0) return true; // requestUpdate() from a timer
    for (const key of changed.keys()) if (key !== "hass") return true;
    const prev = this._lastHass;
    const hass = this.hass;
    if (!prev || !hass) return true;
    if (
      prev.entities !== hass.entities ||
      prev.devices !== hass.devices ||
      prev.language !== hass.language ||
      prev.locale !== hass.locale ||
      prev.themes !== hass.themes ||
      prev.darkMode !== Boolean(hass.themes?.darkMode)
    ) {
      return true;
    }
    if (Date.now() - this._lastRenderAt >= HEARTBEAT_MS) return true;
    if (prev.states === hass.states) return false;
    for (const id of this._watchedEntityIds()) {
      if (prev.states[id] !== hass.states[id]) return true;
    }
    return false;
  }

  protected willUpdate(changed: PropertyValues): void {
    super.willUpdate(changed);
    // A snapshot, not the object: a `hass` changed in place (as the dev
    // harness does) must still compare as changed next time.
    const hass = this.hass;
    this._lastHass = hass && {
      entities: hass.entities,
      devices: hass.devices,
      states: hass.states,
      language: hass.language,
      locale: hass.locale,
      themes: hass.themes,
      darkMode: Boolean(hass.themes?.darkMode),
    };
    this._lastRenderAt = Date.now();
  }

  /** The Librus entities whose state changes re-render this card. */
  private _watchedEntityIds(): string[] {
    const index = registryIndex(this.hass!);
    if (this._watchAllDevices) return index.allEntityIds;
    const resolved = this._resolveEntities();
    if ("error" in resolved) return index.allEntityIds;
    return index.entityIds.get(resolved.deviceId) ?? [];
  }

  public connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener("visibilitychange", this._onVisibilityChange);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener("visibilitychange", this._onVisibilityChange);
    for (const timer of this._timers) clearInterval(timer.handle);
    this._timers = [];
  }

  /**
   * Runs `fn` every `ms` while the card is on the page - call from
   * connectedCallback(); every timer is stopped on disconnect. While the
   * browser tab is hidden the ticks are skipped (no refetches nor renders
   * nobody sees) and one catch-up tick runs when it's shown again.
   */
  protected _every(ms: number, fn: () => void): void {
    const timer: CardTimer = {
      fn,
      missed: false,
      handle: setInterval(() => {
        if (document.hidden) {
          timer.missed = true;
          return;
        }
        fn();
      }, ms),
    };
    this._timers.push(timer);
  }

  private _onVisibilityChange = (): void => {
    if (document.hidden) return;
    for (const timer of this._timers) {
      if (!timer.missed) continue;
      timer.missed = false;
      timer.fn();
    }
  };

  /**
   * Whether a periodic refresh must refetch even when nothing it knows of
   * changed. With a Last update sensor (integration 0.12.0+) the cache keys
   * already change after every Librus refresh, so the timer only needs to
   * notice a new day - no forced refetch. Older integrations have no such
   * signal, so their cards still refetch on every tick.
   */
  protected _forceRefresh(): boolean {
    return this._stampIds().length === 0;
  }

  /** The Last update sensors this card's data stamp follows. */
  private _stampIds(): string[] {
    const hass = this.hass;
    if (!hass) return [];
    const index = registryIndex(hass);
    const deviceIds = this._watchAllDevices ? index.deviceIds : [];
    if (!this._watchAllDevices) {
      const resolved = this._resolveEntities();
      if ("error" in resolved) return [];
      deviceIds.push(resolved.deviceId);
    }
    return this._memo("stampIds", [index, ...deviceIds], () =>
      deviceIds.map((id) => index.keyMaps.get(id)?.last_update).filter((id): id is string => Boolean(id))
    );
  }

  /**
   * Changes after every successful Librus refresh of this card's student:
   * the state of its Last update sensor. Part of the calendar cards' cache
   * keys - the integration's calendars answer with nothing until its first
   * refresh after a restart, and a card that fetched then kept showing "no
   * lessons" until the page was reloaded (found live). Only the card's own
   * device, so with several students a card doesn't refetch on every other
   * student's refresh; `allDevices` / `_watchAllDevices` (the First lesson
   * card, which shows every student) joins every student's sensor instead.
   * Empty with an integration older than 0.12.0, which has no Last update
   * sensor - then nothing changes.
   */
  protected _dataStamp(allDevices = false): string {
    const hass = this.hass;
    if (!hass) return "";
    if (allDevices && !this._watchAllDevices) {
      const index = registryIndex(hass);
      return index.deviceIds
        .map((id) => index.keyMaps.get(id)?.last_update)
        .map((id) => (id ? (hass.states[id]?.state ?? "") : ""))
        .join(",");
    }
    return this._stampIds()
      .map((id) => hass.states[id]?.state ?? "")
      .join(",");
  }

  /**
   * Returns `compute()`'s value, recomputed only when one of `deps` (compared
   * by identity) differs from the previous call for the same `slot`. Pass the
   * state objects a derived list is built from - they stay the same object
   * until that entity actually changes.
   */
  protected _memo<T>(slot: string, deps: readonly unknown[], compute: () => T): T {
    const hit = this._memos.get(slot);
    if (hit && hit.deps.length === deps.length && hit.deps.every((d, i) => d === deps[i])) {
      return hit.value as T;
    }
    const value = compute();
    this._memos.set(slot, { deps, value });
    return value;
  }

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
    this._fetchFailedAt = undefined;
    return ++this._fetchGeneration;
  }

  /** True if `generation` (from `_beginFetch()`) is still the most recent one. */
  protected _isCurrentFetch(generation: number): boolean {
    return generation === this._fetchGeneration;
  }

  // When the latest fetch failed - see _fetchFailed()/_retryDue().
  private _fetchFailedAt?: number;

  /**
   * Call from a fetch's catch (with its `_beginFetch()` generation). A card
   * sets `_fetchedFor` before awaiting, so without this a fetch that failed
   * (e.g. during an HA restart just after midnight) was never retried while
   * the cache key stayed the same - the card stayed empty for hours.
   */
  protected _fetchFailed(generation: number): void {
    if (this._isCurrentFetch(generation)) this._fetchFailedAt = Date.now();
  }

  /**
   * True once the latest fetch failed at least a minute ago: the card's
   * `_fetch()` then runs again even though its cache key is unchanged. Not
   * sooner - render() calls `_fetch()` on every render, and an immediate
   * retry would hammer a Home Assistant that isn't answering. The retry
   * comes with the next render after that (the heartbeat brings one at
   * least once a minute) or the card's own timer.
   */
  protected _retryDue(): boolean {
    return this._fetchFailedAt !== undefined && Date.now() - this._fetchFailedAt >= FETCH_RETRY_MS;
  }

  // The range key (the cache key without the data stamp: entity, dates,
  // options) of the result the card currently shows - see _keepAfterError().
  private _goodRange?: string;

  /** Call once a successful fetch for `range` has been applied. */
  protected _fetchSucceeded(range: string): void {
    this._goodRange = range;
  }

  /**
   * After a failed fetch for `range`: true if the result on screen is for
   * the same range (a refresh after a new Librus update or the periodic
   * one), so a passing error keeps it instead of blanking the card. False
   * if it belongs to another day, week or student (or nothing loaded yet) -
   * then the card clears it rather than show the wrong data.
   */
  protected _keepAfterError(range: string): boolean {
    return this._goodRange === range;
  }

  /**
   * Every entity of this device with `translationKey` (the per-subject
   * sensors), with each subject's name and id read from the current states.
   * Only the entity ids are cached (in the shared registry index) - caching
   * the names kept a subject that was still loading labelled with its
   * entity id until the registry changed.
   */
  protected _resolveAllByTranslationKey(deviceId: string, translationKey: string): SubjectEntity[] {
    const hass = this.hass;
    if (!hass) return [];
    return this._memo(`all:${deviceId}:${translationKey}`, [hass.entities, hass.states], () =>
      mapAllByTranslationKey(hass, deviceId, translationKey)
    );
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

  /** Call at the top of render(): toggles the `.dark`/`.compact`/`.hide-*` host classes used by
   * style-tokens.ts, and sets the accent color / list height custom properties. Does the work
   * only when the config or dark mode changed since the last call. */
  protected _syncTheme(): void {
    const dark = Boolean(this.hass?.themes?.darkMode);
    const config = this._cardConfig;
    if (this._themedFor && this._themedFor.config === config && this._themedFor.dark === dark) return;
    this._themedFor = { config, dark };
    this.classList.toggle("dark", dark);
    this.classList.toggle("compact", Boolean(config?.compact));
    this.classList.toggle("hide-header", Boolean(config?.hide_header));
    this.classList.toggle("hide-icon", Boolean(config?.hide_icon));
    this.classList.toggle("hide-subtitle", Boolean(config?.hide_subtitle));
    this.classList.toggle("hide-legend", Boolean(config?.hide_legend));
    this.classList.toggle("hide-comments", Boolean(config?.hide_comments));
    this._syncAccent(config?.accent_color, dark);
    const height = config?.list_height;
    if (height && height > 0) this.style.setProperty("--lc-list-height", `${height}px`);
    else this.style.removeProperty("--lc-list-height");
  }

  /**
   * `accent_color`: inline custom properties on the host win over the
   * `:host`/`:host(.dark)` token rules, so the brand accent and the tints
   * derived from it follow the chosen color in both themes. An invalid
   * color is ignored.
   */
  private _syncAccent(color: string | undefined, dark: boolean): void {
    const props = ["--lc-brand", "--lc-brand-strong", "--lc-brand-bg", "--lc-ring-track", "--lc-chip-bg"];
    const value = color?.trim();
    if (!value || (typeof CSS !== "undefined" && !CSS.supports("color", value))) {
      for (const prop of props) this.style.removeProperty(prop);
      return;
    }
    const mix = (pct: number, other: string) => `color-mix(in srgb, ${value} ${pct}%, ${other})`;
    this.style.setProperty("--lc-brand", value);
    this.style.setProperty("--lc-brand-strong", dark ? mix(70, "white") : mix(75, "black"));
    this.style.setProperty("--lc-brand-bg", mix(dark ? 18 : 14, "transparent"));
    this.style.setProperty("--lc-ring-track", mix(dark ? 24 : 16, "transparent"));
    this.style.setProperty("--lc-chip-bg", mix(6, "transparent"));
  }

  /**
   * Post-render icon override - `<ha-icon icon=...>` bindings are owned by
   * each card's own template, so a CSS class can't swap the glyph the way
   * `.dark`/`.compact` work. Re-stamping the attribute here, after every
   * render, covers every card's `.icon-badge ha-icon` uniformly without
   * per-card template changes. The card's own icon is kept in
   * `data-orig-icon` and put back when the option is cleared. Harmless
   * no-op for the couple of cards (e.g. librus-student-card) with no
   * `.icon-badge` at all.
   */
  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    this._syncOutageStrip();
    const target = this.renderRoot.querySelector(".icon-badge ha-icon");
    if (!target) return;
    const icon = this._cardConfig?.icon;
    const current = target.getAttribute("icon") ?? "";
    if (icon) {
      // Anything but the override applied last time is the card's own icon
      // (just rendered by its template) - remember it.
      if (!target.hasAttribute("data-orig-icon") || current !== this._appliedIcon) {
        target.setAttribute("data-orig-icon", current);
      }
      if (current !== icon) target.setAttribute("icon", icon);
      this._appliedIcon = icon;
    } else if (target.hasAttribute("data-orig-icon")) {
      target.setAttribute("icon", target.getAttribute("data-orig-icon") ?? "");
      target.removeAttribute("data-orig-icon");
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
  if (isoDate(d) === isoDate(new Date())) return time;
  return `${formatShortDate(isoDate(d), locale)} ${time}`;
}
