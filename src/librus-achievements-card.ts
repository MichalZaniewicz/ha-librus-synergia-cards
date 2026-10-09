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
/** One badge from the Rank sensor's `badges` attribute (integration 0.12.5+). */
interface BadgeInfo {
  key: string;
  title: string;
  icon: string;
  tiers: number[] | null;
  earned: string[];
  value: number | null;
  target: number | null;
  unit: string | null;
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

    const badges = (map.rank ? hass.states[map.rank]?.attributes.badges : undefined) as BadgeInfo[] | undefined;
    if (Array.isArray(badges) && badges.length) return this._renderBadges(hass, badges);

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

  private _badgeName(hass: LibrusHass, b: BadgeInfo, tierIndex?: number): string {
    const name = t(hass, `badge.${b.key}` as TranslationKey) ?? b.title;
    return tierIndex !== undefined && b.tiers ? `${name} · ${b.tiers[tierIndex]}` : name;
  }

  private _number(hass: LibrusHass, value: number, unit: string | null): string {
    return unit === "average"
      ? value.toLocaleString(hass.language, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : String(Math.round(value));
  }

  /** Progress towards the badge's next tier; undefined when complete or unknown. */
  private _goal(b: BadgeInfo): { target: number; ratio: number } | undefined {
    const done = b.earned.length >= (b.tiers?.length ?? 1);
    const target = b.tiers ? b.tiers[b.earned.length] : b.target;
    if (done || target === undefined || target === null || b.value === null || !(target > 0)) return undefined;
    return { target, ratio: Math.max(0, Math.min(1, b.value / target)) };
  }

  private _dateLabel(hass: LibrusHass, iso: string): string {
    const day = new Date(`${iso.slice(0, 10)}T12:00:00`);
    return Number.isNaN(day.getTime())
      ? iso
      : day.toLocaleDateString(hass.language, { day: "numeric", month: "short" });
  }

  /** Every earned badge, the three closest goals and the latest earned. */
  private _renderBadges(hass: LibrusHass, badges: BadgeInfo[]): TemplateResult {
    const total = badges.reduce((n, b) => n + (b.tiers?.length ?? 1), 0);
    const earnedCount = badges.reduce((n, b) => n + b.earned.length, 0);
    const earned = badges.filter((b) => b.earned.length > 0);
    const goals = badges
      .map((b) => ({ b, goal: this._goal(b) }))
      .filter((g): g is { b: BadgeInfo; goal: { target: number; ratio: number } } => !!g.goal && g.goal.ratio > 0)
      .sort((x, y) => y.goal.ratio - x.goal.ratio)
      .slice(0, 3);
    const recent = badges
      .flatMap((b) => b.earned.map((day, i) => ({ b, day, i })))
      .sort((x, y) => y.day.localeCompare(x.day))
      .slice(0, 3);
    const subtitle = goals.length
      ? t(hass, "card.achievements.closest", { title: this._badgeName(hass, goals[0].b) })
      : t(hass, "card.achievements.count", { n: earnedCount });
    const daysUnit = t(hass, "card.achievements.days");

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:trophy"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title ?? t(hass, "card.achievements.title")}</div>
            <div class="subtitle">${subtitle}</div>
          </div>
          <div class="sum"><b>${earnedCount}</b><span>${t(hass, "card.achievements.of", { n: total })}</span></div>
        </div>
        <div class="bar"><i style="width:${total ? Math.round((earnedCount / total) * 100) : 0}%"></i></div>
        ${earned.length
          ? html`<div class="strip">
              ${earned.map((b) => {
                const tier = b.tiers ? b.earned.length - 1 : undefined;
                const name = this._badgeName(hass, b, tier);
                return html`<span class="strip-ic" role="img" title=${name} aria-label=${name}
                  ><ha-icon icon=${b.icon}></ha-icon
                ></span>`;
              })}
            </div>`
          : html`<div class="none">${t(hass, "card.achievements.none_yet")}</div>`}
        ${goals.length
          ? html`<div class="section-title">${t(hass, "card.achievements.goals")}</div>
              <div class="goals">
                ${goals.map(
                  ({ b, goal }) => html`<div class="goal">
                    <span class="goal-ic"><ha-icon icon=${b.icon}></ha-icon></span>
                    <div class="goal-body">
                      <div class="goal-name">${this._badgeName(hass, b)}</div>
                      <div class="bar"><i style="width:${Math.round(goal.ratio * 100)}%"></i></div>
                    </div>
                    <span class="goal-val"
                      >${this._number(hass, b.value ?? 0, b.unit)} /
                      ${this._number(hass, goal.target, b.unit)}${b.unit === "days" ? ` ${daysUnit}` : ""}</span
                    >
                  </div>`
                )}
              </div>`
          : nothing}
        ${recent.length
          ? html`<div class="recent">
              <div class="section-title">${t(hass, "card.achievements.recent")}</div>
              ${recent.map(
                ({ b, day, i }) => html`<div class="recent-row">
                  <ha-icon icon=${b.icon}></ha-icon>
                  <span>${this._badgeName(hass, b, b.tiers ? i : undefined)}</span>
                  <time>${this._dateLabel(hass, day)}</time>
                </div>`
              )}
            </div>`
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
      .sum {
        margin-left: auto;
        text-align: right;
        line-height: 1.1;
      }
      .sum b {
        font-size: 1.3rem;
        font-weight: 800;
        font-variant-numeric: tabular-nums;
      }
      .sum span {
        display: block;
        font-size: 0.7rem;
        color: var(--secondary-text-color);
      }
      .bar {
        height: 6px;
        border-radius: 99px;
        background: var(--lc-ring-track);
        overflow: hidden;
      }
      .bar > i {
        display: block;
        height: 100%;
        border-radius: inherit;
        background: var(--lc-brand);
      }
      .strip {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 12px;
      }
      .strip-ic {
        width: 34px;
        height: 34px;
        border-radius: 10px;
        display: grid;
        place-items: center;
        background: var(--lc-amber-bg);
        color: var(--lc-amber);
        --mdc-icon-size: 19px;
      }
      .none {
        margin-top: 12px;
        font-size: 0.8rem;
        color: var(--secondary-text-color);
      }
      .section-title {
        margin: 14px 0 8px;
        font-size: 0.66rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--secondary-text-color);
      }
      .goals {
        display: grid;
        gap: 10px;
      }
      .goal {
        display: grid;
        grid-template-columns: 30px minmax(0, 1fr) auto;
        gap: 10px;
        align-items: center;
      }
      .goal-ic {
        width: 30px;
        height: 30px;
        border-radius: 9px;
        display: grid;
        place-items: center;
        background: var(--lc-chip-bg);
        color: var(--secondary-text-color);
        --mdc-icon-size: 17px;
      }
      .goal-name {
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .goal-val {
        font-size: 0.74rem;
        color: var(--secondary-text-color);
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
      }
      .recent {
        margin-top: 14px;
        border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
      }
      .recent-row {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.8rem;
        padding: 3px 0;
      }
      .recent-row ha-icon {
        --mdc-icon-size: 16px;
        color: var(--lc-good);
        flex-shrink: 0;
      }
      .recent-row time {
        margin-left: auto;
        color: var(--secondary-text-color);
        font-size: 0.74rem;
        white-space: nowrap;
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
