import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { HassEntity } from "home-assistant-js-websocket";
import type { LibrusCardConfig, LibrusHass } from "./utils/types";
import type { SubjectEntity } from "./utils/entities";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { formatDate, formatShortDate } from "./utils/format";
import { t, type TranslationKey } from "./utils/localize";
import { applyListOptions } from "./utils/list-options";
import { librusCardEditor } from "./utils/card-editor";
import { isoDate } from "./utils/calendar";
import {
  activityDate,
  isEdited,
  pointGradeEntries,
  previousValue,
  textGradeEntries,
  type GradeLogEntry,
} from "./utils/grade-filters";

/** The kinds of entry, each with its own filter chip and editor switch. */
type FeedType = "grades" | "attendance" | "homework" | "agenda" | "plan" | "messages" | "notes";

const TYPES: { type: FeedType; label: TranslationKey; hide: keyof LibrusCardConfig }[] = [
  { type: "grades", label: "card.recent_activity.type_grades", hide: "hide_grades" },
  { type: "attendance", label: "card.recent_activity.type_attendance", hide: "hide_absences" },
  { type: "homework", label: "card.recent_activity.type_homework", hide: "hide_homework" },
  { type: "agenda", label: "card.recent_activity.type_agenda", hide: "hide_agenda" },
  { type: "plan", label: "card.recent_activity.type_plan", hide: "hide_plan" },
  { type: "messages", label: "card.recent_activity.type_messages", hide: "hide_messages" },
  { type: "notes", label: "card.recent_activity.type_notes", hide: "hide_notes" },
];

/** Colour of the entry's icon and kind line (see the CSS classes below). */
type Tone = "grade" | "edit" | "bad" | "late" | "excused" | "hw" | "agenda" | "plan" | "msg" | "notice" | "good";

interface FeedItem {
  type: FeedType;
  /** "YYYY-MM-DDTHH:MM:SS" (local), for ordering. */
  at: string;
  /** "HH:MM" when Librus gives the time, else undefined. */
  time?: string;
  tone: Tone;
  /** A grade's value in the icon square, or an mdi icon. */
  grade?: string;
  icon?: string;
  title: string;
  kind: string;
  text: string;
  /** Short highlighted note after the title ("changed from bz"). */
  tag?: string;
}

interface RecentNote {
  date: string | null;
  category: string | null;
  sentiment?: "positive" | "negative" | "neutral" | null;
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

interface AttendanceMark {
  date: string;
  lesson_no: number | null;
  subject: string | null;
  kind: "unexcused" | "excused" | "late";
}

interface HomeworkItem {
  subject: string | null;
  topic: string;
  date: string | null;
  due_date: string | null;
}

interface AgendaAdded {
  seen: string;
  date: string | null;
  category: string | null;
  subject: string | null;
  content: string;
}

interface PlanAdded {
  seen: string;
  date: string | null;
  lesson_no: number | null;
  subject: string | null;
  kind: "cancelled" | "substitution" | "shifted";
  new_subject: string | null;
  new_teacher: string | null;
}

const DEFAULT_MAX = 30;

/**
 * "YYYY-MM-DDTHH:MM:SS" from any date Librus or the integration gives:
 * a bare date reads as the start of that day, "2026-11-04 10:12:00" and an
 * ISO time with an offset (already local) are cut to the same shape, so
 * every kind of entry sorts on one scale.
 */
function stamp(value: string): string {
  const v = value.replace(" ", "T");
  if (v.length <= 10) return `${v.slice(0, 10)}T00:00:00`;
  const hm = v.slice(0, 16); // "YYYY-MM-DDTHH:MM"
  const seconds = /^\d\d$/.test(v.slice(17, 19)) && v[16] === ":" ? v.slice(17, 19) : "00";
  return `${hm}:${seconds}`;
}

/** "HH:MM" of a value that has a time of day, else undefined. */
function timeOf(value: string): string | undefined {
  return value.length > 10 ? value.replace(" ", "T").slice(11, 16) : undefined;
}

interface FeedSources {
  subjects: SubjectEntity[];
  attendance?: HassEntity;
  homework?: HassEntity;
  exam?: HassEntity;
  plan?: HassEntity;
  notes?: HassEntity;
  announcements?: HassEntity;
  messages?: HassEntity;
}

/** Everything that happened in the gradebook as one list, newest first. */
function buildFeed(hass: LibrusHass, sources: FeedSources): FeedItem[] {
  const items: FeedItem[] = [];
  const tr = (key: TranslationKey, params?: Record<string, string | number>): string => t(hass, key, params);

  for (const s of sources.subjects) {
    const attributes = hass.states[s.entityId]?.attributes;
    const grades: GradeLogEntry[] = [
      ...((attributes?.grades as GradeLogEntry[] | undefined) ?? []),
      ...pointGradeEntries(attributes),
      ...textGradeEntries(attributes),
    ];
    for (const g of grades) {
      const when = activityDate(g);
      if (!when) continue;
      const edited = isEdited(g);
      const before = previousValue(g);
      items.push({
        type: "grades",
        at: stamp(when),
        time: timeOf(when),
        tone: edited ? "edit" : "grade",
        grade: g.value,
        title: s.subject,
        kind: tr(edited ? "card.recent_activity.grade_edited" : "card.recent_activity.grade"),
        text: [g.category, g.text ? g.comments.join(" · ") : ""].filter(Boolean).join(" · "),
        tag: edited
          ? before !== undefined
            ? tr("label.grade_edited_from", { value: before })
            : tr("label.grade_edited")
          : undefined,
      });
    }
  }

  for (const m of (sources.attendance?.attributes.recent as AttendanceMark[] | undefined) ?? []) {
    const lesson = m.lesson_no !== null && m.lesson_no !== undefined ? tr("card.recent_activity.lesson", { n: m.lesson_no }) : "";
    items.push({
      type: "attendance",
      at: stamp(m.date),
      tone: m.kind === "unexcused" ? "bad" : m.kind === "late" ? "late" : "excused",
      icon: m.kind === "late" ? "mdi:clock-alert-outline" : "mdi:account-cancel-outline",
      title: [m.subject, lesson].filter(Boolean).join(" · ") || tr("card.recent_activity.type_attendance"),
      kind: tr(`card.recent_activity.${m.kind}` as TranslationKey),
      text: "",
    });
  }

  for (const h of (sources.homework?.attributes.recent as HomeworkItem[] | undefined) ?? []) {
    if (!h.date) continue;
    items.push({
      type: "homework",
      at: stamp(h.date),
      tone: "hw",
      icon: "mdi:clipboard-check-outline",
      title: h.subject ?? h.topic,
      kind: tr("card.recent_activity.homework"),
      text: [h.subject ? h.topic : "", h.due_date ? tr("card.recent_activity.due", { date: formatShortDate(h.due_date, hass.language) }) : ""]
        .filter(Boolean)
        .join(" · "),
    });
  }

  for (const a of (sources.exam?.attributes.recently_added as AgendaAdded[] | undefined) ?? []) {
    items.push({
      type: "agenda",
      at: stamp(a.seen),
      tone: "agenda",
      icon: "mdi:calendar-plus",
      title: a.subject ?? a.category ?? tr("card.recent_activity.type_agenda"),
      kind: a.category
        ? tr("card.recent_activity.agenda_named", { category: a.category })
        : tr("card.recent_activity.agenda"),
      text: [a.date ? formatShortDate(a.date, hass.language) : "", a.content].filter(Boolean).join(" · "),
    });
  }

  for (const p of (sources.plan?.attributes.recently_added as PlanAdded[] | undefined) ?? []) {
    const when = [
      p.date ? formatShortDate(p.date, hass.language) : "",
      p.lesson_no !== null && p.lesson_no !== undefined ? tr("card.recent_activity.lesson", { n: p.lesson_no }) : "",
    ]
      .filter(Boolean)
      .join(", ");
    const instead = p.kind !== "cancelled" ? [p.new_subject !== p.subject ? p.new_subject : "", p.new_teacher].filter(Boolean).join(", ") : "";
    items.push({
      type: "plan",
      at: stamp(p.seen),
      tone: "plan",
      icon: p.kind === "cancelled" ? "mdi:cancel" : "mdi:swap-horizontal",
      title: p.subject ?? tr("card.recent_activity.type_plan"),
      kind: tr(`card.recent_activity.plan_${p.kind}` as TranslationKey),
      text: [when, instead].filter(Boolean).join(" · "),
    });
  }

  for (const m of (sources.messages?.attributes.recent as RecentMessage[] | undefined) ?? []) {
    if (!m.date) continue;
    items.push({
      type: "messages",
      at: stamp(m.date),
      time: timeOf(m.date),
      tone: "msg",
      icon: "mdi:email-outline",
      title: m.sender,
      kind: tr("card.recent_activity.message"),
      text: [m.topic, m.content].filter(Boolean).join(" – "),
    });
  }

  // `notices` (integration 0.12.5+) is the whole notice board; older
  // versions only have `recent` (the unread ones).
  const announcements =
    (sources.announcements?.attributes.notices as RecentAnnouncement[] | undefined) ??
    (sources.announcements?.attributes.recent as RecentAnnouncement[] | undefined) ??
    [];
  for (const a of announcements) {
    if (!a.creation_date) continue;
    items.push({
      type: "messages",
      at: stamp(a.creation_date),
      tone: "notice",
      icon: "mdi:bullhorn-outline",
      title: a.subject,
      kind: tr("card.recent_activity.announcement"),
      text: "",
    });
  }

  for (const n of (sources.notes?.attributes.recent as RecentNote[] | undefined) ?? []) {
    if (!n.date) continue;
    const sentiment = n.sentiment ?? "neutral";
    items.push({
      type: "notes",
      at: stamp(n.date),
      tone: sentiment === "positive" ? "good" : sentiment === "negative" ? "bad" : "notice",
      icon: "mdi:message-alert-outline",
      title: n.category ?? tr("card.recent_activity.type_notes"),
      kind: tr(`card.recent_activity.note_${sentiment}` as TranslationKey),
      text: n.text,
    });
  }

  return items.sort((a, b) => b.at.localeCompare(a.at));
}

/**
 * One chronological feed of everything that happens in the gradebook -
 * grades (an edited grade comes back to the top), absences and late
 * arrivals, homework, new Agenda entries, plan changes, messages,
 * announcements and notes - grouped by day, with a filter chip per kind
 * (issue #28: like Librus's own timeline). Each kind can be switched off in
 * the editor.
 */
@customElement("librus-recent-activity-card")
export class LibrusRecentActivityCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  @state() private _filter: FeedType | "all" = "all";

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-recent-activity-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 5;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { deviceId, map } = resolved;
    const hass = this.hass;
    const config = this._config;
    const entity = (key?: string): HassEntity | undefined => (key ? hass.states[key] : undefined);

    const sources: FeedSources = {
      subjects: this._resolveAllByTranslationKey(deviceId, "subject_average"),
      attendance: entity(map.attendance),
      homework: entity(map.homework_assignments),
      exam: entity(map.next_exam),
      plan: entity(map.cancelled_lessons),
      notes: entity(map.behaviour_notices),
      announcements: entity(map.unread_announcements),
      messages: entity(map.unread_messages),
    };
    // Rebuilt only when one of these entities (or the language) changed.
    const all = this._memo(
      "feed",
      [
        hass.language,
        ...sources.subjects.map((s) => hass.states[s.entityId]),
        sources.attendance,
        sources.homework,
        sources.exam,
        sources.plan,
        sources.notes,
        sources.announcements,
        sources.messages,
      ],
      () => buildFeed(hass, sources)
    );
    const hidden = new Set(TYPES.filter((k) => config[k.hide]).map((k) => k.type));
    const items = all.filter((i) => !hidden.has(i.type));
    const present = TYPES.filter((k) => !hidden.has(k.type) && items.some((i) => i.type === k.type));
    const filter = this._filter !== "all" && present.some((k) => k.type === this._filter) ? this._filter : "all";
    const shown = applyListOptions(
      filter === "all" ? items : items.filter((i) => i.type === filter),
      config,
      DEFAULT_MAX
    );

    if (items.length === 0) return this._message("mdi:bell-outline", t(hass, "card.recent_activity.empty"));

    const groups: { day: string; items: FeedItem[] }[] = [];
    for (const item of shown) {
      const day = item.at.slice(0, 10);
      const last = groups[groups.length - 1];
      if (last?.day === day) last.items.push(item);
      else groups.push({ day, items: [item] });
    }

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:bell-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${config.title ?? t(hass, "card.recent_activity.title")}</div>
            <div class="subtitle">${t(hass, "card.recent_activity.subtitle")}</div>
          </div>
        </div>
        ${!config.hide_filters && present.length > 1
          ? html`<div class="chips" role="toolbar">
              ${this._chip("all", t(hass, "card.recent_activity.all"), items.length, filter)}
              ${present.map((k) =>
                this._chip(k.type, t(hass, k.label), items.filter((i) => i.type === k.type).length, filter)
              )}
            </div>`
          : nothing}
        <div class="scroll-list">
          ${groups.map(
            (g) => html`
              <div class="day">${this._dayLabel(g.day)}</div>
              ${g.items.map(
                (item) => html`
                  <div class="list-item tone-${item.tone}">
                    <div class="type-icon">
                      ${item.grade !== undefined ? item.grade : html`<ha-icon icon=${item.icon}></ha-icon>`}
                    </div>
                    <div class="body">
                      <div class="row1">
                        <span>${item.title}${item.tag ? html` · <span class="tag">${item.tag}</span>` : nothing}</span>
                        ${item.time ? html`<time>${item.time}</time>` : nothing}
                      </div>
                      <div class="kind">${item.kind}</div>
                      ${item.text ? html`<div class="item-text">${item.text}</div>` : nothing}
                    </div>
                  </div>
                `
              )}
            `
          )}
        </div>
      </ha-card>
    `;
  }

  private _chip(type: FeedType | "all", label: string, count: number, current: FeedType | "all"): TemplateResult {
    return html`<button
      type="button"
      class="chip ${type === current ? "on" : ""}"
      aria-pressed=${type === current ? "true" : "false"}
      @click=${() => (this._filter = type)}
    >
      ${label}<span class="n">${count}</span>
    </button>`;
  }

  /** "Dziś · środa, 4 listopada" / "Wczoraj · ..." / "poniedziałek, 2 listopada". */
  private _dayLabel(day: string): string {
    const hass = this.hass!;
    const date = new Date(`${day}T00:00:00`);
    const label = formatDate(date, hass.language, { weekday: "long", day: "numeric", month: "long" });
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (day === isoDate(today)) return `${t(hass, "card.recent_activity.today")} · ${label}`;
    if (day === isoDate(yesterday)) return `${t(hass, "card.recent_activity.yesterday")} · ${label}`;
    return label;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-bottom: 10px;
      }
      .chip {
        border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
        background: none;
        color: var(--primary-text-color);
        font: inherit;
        font-size: 0.72rem;
        font-weight: 600;
        padding: 3px 9px;
        border-radius: 14px;
        cursor: pointer;
      }
      .chip.on {
        background: var(--lc-brand-bg);
        border-color: var(--lc-brand);
        color: var(--lc-brand-strong);
      }
      .chip .n {
        color: var(--secondary-text-color);
        font-weight: 500;
        margin-left: 3px;
      }
      .day {
        font-size: 0.66rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--secondary-text-color);
        margin: 10px 0 2px;
      }
      .day:first-child {
        margin-top: 0;
      }
      .type-icon {
        flex: none;
        min-width: 26px;
        height: 26px;
        padding: 0 3px;
        box-sizing: border-box;
        border-radius: 8px;
        background: var(--t-bg);
        color: var(--t-c);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 1px;
        font-weight: 800;
        font-size: 0.74rem;
        white-space: nowrap;
      }
      .type-icon ha-icon {
        --mdc-icon-size: 15px;
      }
      .kind {
        font-size: 0.66rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--t-c);
      }
      .tag {
        color: var(--lc-amber);
        font-weight: 700;
      }
      .tone-grade {
        --t-c: var(--lc-brand);
        --t-bg: var(--lc-brand-bg);
      }
      .tone-edit,
      .tone-late,
      .tone-plan {
        --t-c: var(--lc-amber);
        --t-bg: var(--lc-amber-bg);
      }
      .tone-bad {
        --t-c: var(--lc-bad);
        --t-bg: var(--lc-bad-bg);
      }
      .tone-good {
        --t-c: var(--lc-good);
        --t-bg: var(--lc-good-bg);
      }
      .tone-hw {
        --t-c: var(--lc-chart-7);
        --t-bg: color-mix(in srgb, var(--lc-chart-7) 15%, transparent);
      }
      .tone-agenda {
        --t-c: var(--lc-chart-8);
        --t-bg: color-mix(in srgb, var(--lc-chart-8) 15%, transparent);
      }
      .tone-msg {
        --t-c: var(--lc-chart-10);
        --t-bg: color-mix(in srgb, var(--lc-chart-10) 15%, transparent);
      }
      .tone-excused,
      .tone-notice {
        --t-c: var(--secondary-text-color);
        --t-bg: var(--lc-chip-bg);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-recent-activity-card": LibrusRecentActivityCard;
  }
}
