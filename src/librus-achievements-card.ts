import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig, LibrusHass } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { UNAVAILABLE } from "./utils/entities";
import { t, type TranslationKey } from "./utils/localize";

const EVENT_TYPE = "librus_synergia_achievement_unlocked";
const STORAGE_PREFIX = "librus-achievements:";
// Well above the backend's own fixed vocabulary (~10 keys as of
// ha-librus-synergia 0.6.0) - just a sane upper bound so a stored list
// can't grow without limit if the vocabulary ever grows a lot.
const MAX_STORED = 50;

interface AchievementEventData {
  entry_id: string | null;
  id: string;
  title: string;
}
interface UnlockedAchievement {
  id: string;
  title: string;
  when: string;
}

// Mirrors the backend's own milestone thresholds (coordinator.py's
// `_GOOD_GRADE_STREAK_MILESTONES`/`_STREAK_DAY_MILESTONES`) - these are
// fixed, hardcoded constants on the backend too, not something a sensor
// exposes, so duplicating them here is the only option short of a new
// attribute. If the backend ever changes these, this hint just quietly
// goes stale (shows a wrong "N more") rather than breaking outright.
interface MilestoneTrack {
  sensorKey: "good_grade_streak" | "attendance_streak" | "behaviour_streak";
  idPrefix: string;
  thresholds: readonly number[];
}
const MILESTONE_TRACKS: readonly MilestoneTrack[] = [
  { sensorKey: "good_grade_streak", idPrefix: "good_grade_streak", thresholds: [5, 10, 20] },
  { sensorKey: "attendance_streak", idPrefix: "attendance_streak", thresholds: [7, 30, 90] },
  { sensorKey: "behaviour_streak", idPrefix: "behaviour_streak", thresholds: [7, 30, 90] },
];

/**
 * A "trophy case" for `librus_synergia_achievement_unlocked` - this event
 * is NOT surfaced on any sensor (only fired, once, on the bus), so this
 * card subscribes to it directly via `hass.connection.subscribeEvents`
 * and keeps its own running list in `localStorage` (per viewer/browser,
 * same convention as librus-homework-checklist-card's done-state).
 *
 * IMPORTANT LIMITATION, surfaced in the empty-state copy: an achievement
 * already unlocked before this card was ever added has no way to be
 * recovered - the event that announced it is long gone, and there is no
 * backend sensor listing "all achievements ever unlocked" to catch up
 * from. This card only ever grows going forward from whenever it was
 * first added to a dashboard.
 *
 * The event fires domain-wide (every configured student), not scoped to
 * one device - `hass.devices[deviceId].config_entries` is used to filter
 * to just the entry_id this specific card's device belongs to, so a
 * multi-student household's cards don't cross-pollinate each other's
 * achievements.
 */
@customElement("librus-achievements-card")
export class LibrusAchievementsCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  @state() private _unlocked: UnlockedAchievement[] = [];
  private _storageKey = "";
  private _subscribedDeviceId?: string;
  private _unsubscribe?: () => void;
  // Guards the async gap in `_subscribe()` between starting
  // `subscribeEvents()` and it resolving - see that method's own comment.
  private _subscribeGeneration = 0;
  private _torndown = false;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-achievements-card" };
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
    this._torndown = false;
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    // Invalidates any `_subscribe()` currently awaiting `subscribeEvents()`
    // - once its await resolves it will see `_torndown` and immediately
    // unsubscribe itself instead of assigning `_unsubscribe` to a
    // subscription nothing will ever clean up otherwise (see `_subscribe`).
    this._torndown = true;
    this._subscribeGeneration++;
    this._unsubscribe?.();
    this._unsubscribe = undefined;
    this._subscribedDeviceId = undefined;
  }

  private _load(deviceId: string): void {
    const key = `${STORAGE_PREFIX}${deviceId}`;
    if (this._storageKey === key) return;
    this._storageKey = key;
    try {
      const raw = window.localStorage.getItem(key);
      this._unlocked = raw ? (JSON.parse(raw) as UnlockedAchievement[]) : [];
    } catch {
      this._unlocked = [];
    }
  }

  private _persist(): void {
    try {
      window.localStorage.setItem(this._storageKey, JSON.stringify(this._unlocked.slice(-MAX_STORED)));
    } catch {
      /* private mode / storage disabled - the in-memory list still works for this session */
    }
  }

  /**
   * `subscribeEvents()` is itself async - it doesn't resolve until the
   * websocket round-trip completes, so there's a real gap between calling
   * it and having an `_unsubscribe` callback to hold onto. Two races live
   * in that gap: (a) the card can be torn down (disconnectedCallback)
   * while still awaiting it, in which case the OLD disconnect's
   * `_unsubscribe?.()` call is a no-op (nothing to call yet) and the
   * subscription would otherwise leak for the rest of the tab's session
   * once it finally resolves; (b) this method can be called again for a
   * genuinely different `deviceId` before the first call resolves, and
   * whichever resolves last would otherwise win regardless of call order,
   * possibly leaving the card listening on the wrong device's stream. The
   * `generation` guard below and the `_torndown` flag close both: a
   * resolution that's no longer current unsubscribes itself immediately
   * instead of overwriting `_unsubscribe`.
   */
  private async _subscribe(deviceId: string): Promise<void> {
    if (this._subscribedDeviceId === deviceId || !this.hass) return;
    this._subscribedDeviceId = deviceId;
    this._unsubscribe?.();
    this._unsubscribe = undefined;
    const generation = ++this._subscribeGeneration;

    const entryIds = this.hass.devices[deviceId]?.config_entries ?? [];
    const unsubscribe = await this.hass.connection.subscribeEvents<{ data: AchievementEventData }>((ev) => {
      const data = ev.data;
      if (entryIds.length && data.entry_id && !entryIds.includes(data.entry_id)) return;
      if (this._unlocked.some((u) => u.id === data.id)) return;
      this._unlocked = [...this._unlocked, { id: data.id, title: data.title, when: new Date().toISOString() }];
      this._persist();
    }, EVENT_TYPE);

    if (this._torndown || generation !== this._subscribeGeneration) {
      unsubscribe();
      return;
    }
    this._unsubscribe = unsubscribe;
  }

  private _nextMilestoneHint(hass: LibrusHass, map: Record<string, string>): { remaining: number; title: string } | undefined {
    let best: { gap: number; remaining: number; title: string } | undefined;
    for (const track of MILESTONE_TRACKS) {
      const entityId = map[track.sensorKey];
      const entity = entityId ? hass.states[entityId] : undefined;
      if (!entity || UNAVAILABLE.has(entity.state)) continue;
      const current = Number(entity.state);
      if (!Number.isFinite(current)) continue;
      for (const threshold of track.thresholds) {
        if (current >= threshold) continue;
        const gap = threshold - current;
        if (!best || gap < best.gap) {
          const key = `achievement.${track.idPrefix}_${threshold}` as TranslationKey;
          best = { gap, remaining: gap, title: t(hass, key) };
        }
        break; // thresholds are ascending - the first uncrossed one is this track's nearest
      }
    }
    return best ? { remaining: best.remaining, title: best.title } : undefined;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { deviceId, map } = resolved;
    const hass = this.hass;

    this._load(deviceId);
    void this._subscribe(deviceId);

    const nextHint = this._nextMilestoneHint(hass, map);

    // Everything the integration has recorded (Rank sensor, 0.12.5+) - the
    // first sync records achievements silently, so the event alone misses
    // those - plus what this browser saw arrive (with the time it did).
    const recorded =
      ((map.rank ? hass.states[map.rank]?.attributes.achievements : undefined) as
        | { key: string; title: string }[]
        | undefined) ?? [];
    const unlocked = [...this._unlocked];
    for (const a of recorded) {
      if (!unlocked.some((u) => u.id === a.key)) unlocked.push({ id: a.key, title: a.title, when: "" });
    }

    if (unlocked.length === 0) {
      return this._message(
        "mdi:trophy-outline",
        t(hass, "card.achievements.empty"),
        nextHint ? t(hass, "card.achievements.next_hint", { n: nextHint.remaining, title: nextHint.title }) : undefined
      );
    }

    const sorted = unlocked.sort((a, b) => b.when.localeCompare(a.when));

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:trophy"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title ?? t(hass, "card.achievements.title")}</div>
            <div class="subtitle">${t(hass, "card.achievements.count", { n: sorted.length })}</div>
          </div>
        </div>
        <div class="chips">
          ${sorted.map(
            (a) => html`<span class="chip hot"><ha-icon icon="mdi:trophy-award"></ha-icon>${a.title}</span>`
          )}
        </div>
        ${nextHint
          ? html`
              <div class="next-hint">
                <ha-icon icon="mdi:target"></ha-icon>
                <span>${t(hass, "card.achievements.next_hint", { n: nextHint.remaining, title: nextHint.title })}</span>
              </div>
            `
          : nothing}
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .chip.hot {
        gap: 6px;
      }
      .chip.hot ha-icon {
        --mdc-icon-size: 15px;
      }
      .next-hint {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
        font-size: 0.78rem;
        color: var(--secondary-text-color);
      }
      .next-hint ha-icon {
        --mdc-icon-size: 16px;
        flex-shrink: 0;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-achievements-card": LibrusAchievementsCard;
  }
}
