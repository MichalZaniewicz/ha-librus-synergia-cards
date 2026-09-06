import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { mapAllByTranslationKey } from "./utils/entities";
import { formatShortDate } from "./utils/format";
import { t } from "./utils/localize";

interface FeedItem {
  date: string;
  icon: string;
  title: string;
  text: string;
}

interface GradeLogEntry {
  value: string;
  category: string | null;
  date: string | null;
}

interface RecentNote {
  date: string | null;
  category: string | null;
  text: string;
}

interface RecentAnnouncement {
  subject: string;
  creation_date: string | null;
}

interface RecentMessage {
  sender: string;
  topic: string;
  content: string;
  date: string | null;
}

const MAX_SHOWN = 15;

/**
 * Normalizes a feed item's date for chronological comparison. Grades/notes/
 * announcements carry a bare `YYYY-MM-DD` date, while messages carry a full
 * `YYYY-MM-DDTHH:MM:SS` timestamp. Comparing those two shapes directly with
 * `localeCompare` still sorts different calendar days correctly (the fixed-
 * width date prefix compares fine either way), but on the SAME day a bare
 * date is a strict prefix of any timestamp starting with it, so it always
 * sorts as "later" than every specific time that day - a grade added at
 * 07:00 would show up ABOVE a message received at 20:00 the same day.
 * Padding every bare date out to midnight gives every item the same
 * precision, so same-day items interleave in a defined order: a bare-date
 * item reads as "start of that day", the only sensible default when its
 * exact time isn't known.
 */
function comparableTimestamp(date: string): string {
  return date.length <= 10 ? `${date}T00:00:00` : date;
}

/**
 * One chronological feed merging the most recent grades, behaviour
 * notices, announcements and messages - every other card here only shows
 * ONE of these at a time; this is the "what's new across everything"
 * view none of them cover.
 */
@customElement("librus-recent-activity-card")
export class LibrusRecentActivityCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement("librus-device-editor") as LovelaceCardEditor;
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-recent-activity-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 4;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { deviceId, map } = resolved;
    const hass = this.hass;

    const items: FeedItem[] = [];

    for (const s of mapAllByTranslationKey(hass, deviceId, "subject_average")) {
      const grades = (hass.states[s.entityId]?.attributes.grades as GradeLogEntry[] | undefined) ?? [];
      for (const g of grades) {
        if (!g.date) continue;
        items.push({
          date: g.date,
          icon: "mdi:notebook-outline",
          title: `${g.value} · ${s.subject}`,
          text: g.category ?? "",
        });
      }
    }

    const notesEntity = map.behaviour_notices ? hass.states[map.behaviour_notices] : undefined;
    for (const n of (notesEntity?.attributes.recent as RecentNote[] | undefined) ?? []) {
      if (!n.date) continue;
      items.push({
        date: n.date,
        icon: "mdi:alert-circle-outline",
        title: n.category ?? "",
        text: n.text,
      });
    }

    const announcementsEntity = map.unread_announcements ? hass.states[map.unread_announcements] : undefined;
    for (const a of (announcementsEntity?.attributes.recent as RecentAnnouncement[] | undefined) ?? []) {
      if (!a.creation_date) continue;
      items.push({
        date: a.creation_date,
        icon: "mdi:bullhorn-outline",
        title: a.subject,
        text: "",
      });
    }

    const messagesEntity = map.unread_messages ? hass.states[map.unread_messages] : undefined;
    for (const m of (messagesEntity?.attributes.recent as RecentMessage[] | undefined) ?? []) {
      if (!m.date) continue;
      items.push({
        date: m.date,
        icon: "mdi:email-outline",
        title: `${m.sender} · ${m.topic}`,
        text: m.content,
      });
    }

    items.sort((a, b) => comparableTimestamp(b.date).localeCompare(comparableTimestamp(a.date)));
    const shown = items.slice(0, MAX_SHOWN);

    if (shown.length === 0) return this._message("mdi:bell-outline", t(hass, "card.recent_activity.empty"));

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:bell-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${t(hass, "card.recent_activity.title")}</div>
            <div class="subtitle">${t(hass, "card.recent_activity.subtitle")}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${shown.map(
            (item) => html`
              <div class="list-item">
                <div class="type-icon"><ha-icon icon=${item.icon}></ha-icon></div>
                <div class="body">
                  <div class="row1">
                    <span>${item.title}</span>
                    <time>${formatShortDate(item.date, hass.language)}</time>
                  </div>
                  ${item.text ? html`<div class="item-text">${item.text}</div>` : nothing}
                </div>
              </div>
            `
          )}
        </div>
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .type-icon {
        flex: none;
        width: 26px;
        height: 26px;
        border-radius: 8px;
        background: var(--lc-chip-bg);
        color: var(--lc-brand);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 1px;
      }
      .type-icon ha-icon {
        --mdc-icon-size: 15px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-recent-activity-card": LibrusRecentActivityCard;
  }
}
