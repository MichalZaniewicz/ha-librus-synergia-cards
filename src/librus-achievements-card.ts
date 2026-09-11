import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { t } from "./utils/localize";

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

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement("librus-device-editor") as LovelaceCardEditor;
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

  public disconnectedCallback(): void {
    super.disconnectedCallback();
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

  private async _subscribe(deviceId: string): Promise<void> {
    if (this._subscribedDeviceId === deviceId || !this.hass) return;
    this._subscribedDeviceId = deviceId;
    this._unsubscribe?.();
    this._unsubscribe = undefined;

    const entryIds = this.hass.devices[deviceId]?.config_entries ?? [];
    this._unsubscribe = await this.hass.connection.subscribeEvents<{ data: AchievementEventData }>((ev) => {
      const data = ev.data;
      if (entryIds.length && data.entry_id && !entryIds.includes(data.entry_id)) return;
      if (this._unlocked.some((u) => u.id === data.id)) return;
      this._unlocked = [...this._unlocked, { id: data.id, title: data.title, when: new Date().toISOString() }];
      this._persist();
    }, EVENT_TYPE);
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { deviceId } = resolved;
    const hass = this.hass;

    this._load(deviceId);
    void this._subscribe(deviceId);

    if (this._unlocked.length === 0) {
      return this._message("mdi:trophy-outline", t(hass, "card.achievements.empty"));
    }

    const sorted = [...this._unlocked].sort((a, b) => b.when.localeCompare(a.when));

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
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-achievements-card": LibrusAchievementsCard;
  }
}
