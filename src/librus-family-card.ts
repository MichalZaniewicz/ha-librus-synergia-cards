import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { navigate, type LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig, LibrusHass } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { isoDate, nextSchoolDay } from "./utils/calendar";
import { findLibrusDeviceIds, mapAllByTranslationKey, mapByTranslationKey } from "./utils/entities";
import { formatDate, formatTime } from "./utils/format";
import { t, type TranslationKey } from "./utils/localize";
import { librusCardEditor } from "./utils/card-editor";
import { studentName } from "./librus-first-lesson-card";

const AVATAR_COLORS = [
  "var(--lc-chart-1)",
  "var(--lc-chart-2)",
  "var(--lc-chart-3)",
  "var(--lc-chart-7)",
  "var(--lc-chart-8)",
  "var(--lc-chart-10)",
];

/** At or below this many absences left in a subject, the row says so. */
const ABSENCES_LEFT_WARNING = 3;

/** How many new grades a row shows before "+N". */
const MAX_GRADES = 4;

interface UpcomingExam {
  date: string;
  subject: string | null;
  category: string | null;
}
interface HomeworkItem {
  subject: string | null;
  topic: string | null;
  due_date: string | null;
}
interface SubjectGrade {
  value: string;
  date: string | null;
}

type Tone = "warn" | "bad" | "good" | "";
interface Chip {
  tone: Tone;
  icon: string;
  text: string;
  grades?: string[];
}
type Status = { kind: "in" | "done" | "off"; text: string } | undefined;

interface Row {
  deviceId: string;
  name: string;
  className: string;
  color: string;
  status: Status;
  chips: Chip[];
}

const DAY_MS = 86_400_000;
const atMidnight = (d: Date): Date => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const daysFrom = (today: Date, iso: string): number =>
  Math.round((atMidnight(new Date(`${iso.slice(0, 10)}T00:00:00`)).getTime() - today.getTime()) / DAY_MS);

/** 1-6 grades only; "5+" -> 5.5, "4-" -> 3.75. */
function gradeNumber(value: string): number | undefined {
  const m = /^([1-6])([+-]?)$/.exec(value.trim());
  if (!m) return undefined;
  return Number(m[1]) + (m[2] === "+" ? 0.5 : m[2] === "-" ? -0.25 : 0);
}

/**
 * Every child at a glance (approved mockup: variant A, one row per child):
 * how their school day stands and only what matters today - a test soon,
 * homework due, absences to excuse, new grades, unread messages, their own
 * lucky number. Reads the sensors' states only, no extra requests.
 */
@customElement("librus-family-card")
export class LibrusFamilyCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  protected _watchAllDevices = true;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-family-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
  }

  public getCardSize(): number {
    return 1 + 2 * Math.max(1, this.hass ? this._deviceIds().length : 1);
  }

  public connectedCallback(): void {
    super.connectedCallback();
    // The school-day status ("in school until 14:20") moves with the clock.
    this._every(60_000, () => this.requestUpdate());
  }

  private _deviceIds(): string[] {
    const hass = this.hass!;
    const config = this._config;
    return this._memo("ids", [hass.entities, hass.devices, config], () => {
      const all = findLibrusDeviceIds(hass);
      const wanted = config?.devices;
      if (wanted?.length) return wanted.filter((id) => all.includes(id));
      return [...all].sort((a, b) =>
        studentName(hass, a, config?.names?.[a]).localeCompare(studentName(hass, b, config?.names?.[b]))
      );
    });
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();
    const hass = this.hass;
    const config = this._config;
    const ids = this._deviceIds();
    if (ids.length === 0) return this._message("mdi:alert-circle-outline", t(hass, "error.no_device"));

    const now = new Date();
    const rows: Row[] = ids.map((id, i) => this._row(hass, id, i, now));
    const urgent = rows.reduce((n, r) => n + r.chips.filter((c) => c.tone === "bad" || c.tone === "warn").length, 0);
    const day = formatDate(now, hass.language, { weekday: "long", day: "numeric", month: "long" });
    const date = day.charAt(0).toUpperCase() + day.slice(1);
    const subtitle = urgent ? `${date} · ${t(hass, "card.family.urgent", { n: urgent })}` : date;

    return html`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:account-group-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${config.title ?? t(hass, "card.family.title")}</div>
            <div class="subtitle">${subtitle}</div>
          </div>
        </div>
        <div class="kids">
          ${rows.map(
            (row, i) => html`
              ${i > 0 ? html`<hr />` : nothing}
              <div
                class="kid ${config.links?.[row.deviceId] ? "link" : ""}"
                role=${config.links?.[row.deviceId] ? "link" : nothing}
                tabindex=${config.links?.[row.deviceId] ? 0 : nothing}
                @click=${() => this._open(row.deviceId)}
                @keydown=${(ev: KeyboardEvent) => {
                  if (ev.key === "Enter" || ev.key === " ") this._open(row.deviceId);
                }}
              >
                <div class="top">
                  <div class="avatar" style="background:${row.color}">${row.name.slice(0, 1).toUpperCase()}</div>
                  <div class="who">
                    <div class="kname">${row.name}</div>
                    ${row.className ? html`<div class="kclass">${row.className}</div>` : nothing}
                  </div>
                  ${row.status ? html`<span class="pill ${row.status.kind}">${row.status.text}</span>` : nothing}
                </div>
                <div class="chips">
                  ${row.chips.length
                    ? row.chips.map(
                        (c) => html`<span class="fchip ${c.tone}">
                          <ha-icon icon=${c.icon}></ha-icon>${c.text}${c.grades?.map(
                            (g) => html`<span class="g ${this._gradeTone(g)}">${g}</span>`
                          )}
                        </span>`
                      )
                    : html`<span class="calm">${t(hass, "card.family.nothing")}</span>`}
                </div>
              </div>
            `
          )}
        </div>
      </ha-card>
    `;
  }

  private _open(deviceId: string): void {
    const path = this._config?.links?.[deviceId];
    if (path) navigate(this, path);
  }

  private _gradeTone(value: string): string {
    if (value.startsWith("+")) return "more";
    const n = gradeNumber(value);
    if (n === undefined) return "";
    return n >= 4.75 ? "hi" : n < 2.75 ? "lo" : "";
  }

  private _row(hass: LibrusHass, deviceId: string, index: number, now: Date): Row {
    const config = this._config!;
    const map = mapByTranslationKey(hass, deviceId);
    const attrs = (key: string): Record<string, unknown> => (map[key] ? hass.states[map[key]]?.attributes : undefined) ?? {};
    const value = (key: string): string | undefined => {
      const s = map[key] ? hass.states[map[key]]?.state : undefined;
      return s === undefined || s === "unknown" || s === "unavailable" ? undefined : s;
    };
    const today = atMidnight(now);
    const chips: Chip[] = [];

    // Tests within `days_ahead` days (3 by default), the nearest two.
    if (!config.hide_exams) {
      const ahead = config.days_ahead ?? 3;
      const exams = ((attrs("next_exam").upcoming as UpcomingExam[] | undefined) ?? [])
        .filter((e) => e.date && daysFrom(today, e.date) >= 0 && daysFrom(today, e.date) <= ahead)
        .slice(0, 2);
      for (const exam of exams) {
        const days = daysFrom(today, exam.date);
        const kind = exam.category?.trim() || t(hass, "card.family.exam");
        const subject = exam.subject ?? "";
        const day = new Date(`${exam.date.slice(0, 10)}T00:00:00`);
        const text =
          days === 0
            ? t(hass, "card.family.exam_today", { kind: kind.toLowerCase(), subject })
            : days === 1
              ? t(hass, "card.family.exam_tomorrow", { kind: kind.toLowerCase(), subject })
              : t(hass, "card.family.exam_on", {
                  kind,
                  day: t(hass, `card.family.on_${day.getDay()}` as TranslationKey),
                  subject,
                });
        chips.push({ tone: days <= 1 ? "warn" : "", icon: "mdi:file-document-alert-outline", text });
      }
    }

    // Absences still to excuse.
    if (!config.hide_absences) {
      const open = Number(value("unexcused_absences") ?? 0);
      if (open > 0) chips.push({ tone: "bad", icon: "mdi:account-alert-outline", text: t(hass, "card.family.unexcused", { n: open }) });

      // Few lessons of some subject left to miss this semester (integration
      // 0.12.21+: the Lowest subject attendance sensor's estimate).
      const budget = attrs("subject_attendance");
      const left = budget.fewest_absences_left;
      const subject = budget.fewest_absences_left_subject;
      if (typeof left === "number" && typeof subject === "string" && left <= ABSENCES_LEFT_WARNING) {
        const key: TranslationKey =
          left < 0
            ? "card.family.absences_left_over"
            : left === 0
              ? "card.family.absences_left_none"
              : left === 1
                ? "card.family.absences_left_one"
                : left <= 4
                  ? "card.family.absences_left_few"
                  : "card.family.absences_left_many";
        chips.push({
          tone: left <= 0 ? "bad" : "warn",
          icon: "mdi:calendar-alert-outline",
          text: t(hass, key, { subject, n: left }),
        });
      }
    }

    // Homework due on the next school day.
    if (!config.hide_homework) {
      const next = nextSchoolDay(now);
      const nextIso = isoDate(next);
      const due = ((attrs("homework_assignments").recent as HomeworkItem[] | undefined) ?? []).filter(
        (h) => (h.due_date ?? "").slice(0, 10) === nextIso
      );
      if (due.length) {
        const isTomorrow = daysFrom(today, nextIso) === 1;
        const when = isTomorrow ? t(hass, "card.family.tomorrow") : t(hass, `card.family.for_${next.getDay()}` as TranslationKey);
        const text =
          due.length === 1
            ? t(hass, "card.family.homework_one", { when, what: due[0].subject || due[0].topic || "" })
            : t(hass, "card.family.homework_many", { when, n: due.length });
        chips.push({ tone: "warn", icon: "mdi:notebook-edit-outline", text });
      }
    }

    // Grades added in the last `days` days (today and yesterday by default).
    if (!config.hide_grades) {
      const days = config.days ?? 2;
      const since = isoDate(new Date(today.getTime() - (days - 1) * DAY_MS));
      const fresh: SubjectGrade[] = [];
      for (const subject of mapAllByTranslationKey(hass, deviceId, "subject_average")) {
        const grades = (hass.states[subject.entityId]?.attributes.grades as SubjectGrade[] | undefined) ?? [];
        fresh.push(...grades.filter((g) => g.value && (g.date ?? "").slice(0, 10) >= since));
      }
      if (fresh.length) {
        fresh.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
        const shown = fresh.slice(0, MAX_GRADES).map((g) => g.value);
        if (fresh.length > MAX_GRADES) shown.push(`+${fresh.length - MAX_GRADES}`);
        chips.push({ tone: "", icon: "mdi:star-outline", text: t(hass, "card.family.new_grades"), grades: shown });
      }
    }

    // Unread messages.
    if (!config.hide_messages) {
      const unread = Number(value("unread_messages") ?? 0);
      if (unread > 0) {
        const key: TranslationKey =
          unread === 1
            ? "card.family.messages_one"
            : unread % 10 >= 2 && unread % 10 <= 4 && (unread % 100 < 12 || unread % 100 > 14)
              ? "card.family.messages_few"
              : "card.family.messages_many";
        chips.push({ tone: "", icon: "mdi:email-outline", text: t(hass, key, { n: unread }) });
      }
    }

    // Today's lucky number is theirs.
    if (!config.hide_lucky) {
      const lucky = attrs("lucky_number");
      if (lucky.is_yours === true && lucky.is_today === true) {
        chips.push({ tone: "good", icon: "mdi:clover", text: t(hass, "card.family.lucky", { n: value("lucky_number") ?? "" }) });
      }
    }

    // Most pressing first: absences, then today's / tomorrow's things.
    const order: Record<Tone, number> = { bad: 0, warn: 1, good: 2, "": 3 };
    chips.sort((a, b) => order[a.tone] - order[b.tone]);

    return {
      deviceId,
      name: studentName(hass, deviceId, config.names?.[deviceId]),
      className: value("school_class") ?? "",
      color: AVATAR_COLORS[index % AVATAR_COLORS.length],
      status: this._status(hass, map, now),
      chips,
    };
  }

  /** From the School day today sensor: free, before / during / after lessons. */
  private _status(hass: LibrusHass, map: Record<string, string>, now: Date): Status {
    const entity = map.school_day_today ? hass.states[map.school_day_today] : undefined;
    if (!entity || entity.state === "unavailable" || entity.state === "unknown") return undefined;
    if (entity.state === "off") return { kind: "off", text: t(hass, "card.family.free_today") };
    const start = entity.attributes.first_lesson_start as string | undefined;
    const end = entity.attributes.last_lesson_end as string | undefined;
    if (!start || !end) return undefined;
    if (now.getTime() < new Date(start).getTime()) {
      return { kind: "in", text: t(hass, "card.family.from", { time: formatTime(start) }) };
    }
    if (now.getTime() < new Date(end).getTime()) {
      return { kind: "in", text: t(hass, "card.family.until", { time: formatTime(end) }) };
    }
    return { kind: "done", text: t(hass, "card.family.after") };
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .kids {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .kid {
        display: flex;
        flex-direction: column;
        gap: 7px;
        border-radius: 8px;
      }
      .kid.link {
        cursor: pointer;
      }
      .kid.link:focus-visible {
        outline: 2px solid var(--lc-brand);
        outline-offset: 3px;
      }
      .top {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        color: #fff;
        font-weight: 800;
        font-size: 0.85rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: none;
      }
      :host(.dark) .avatar {
        color: rgba(0, 0, 0, 0.78);
      }
      .who {
        flex: 1;
        min-width: 0;
      }
      .kname {
        font-weight: 700;
        font-size: 0.9rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .kclass {
        font-size: 0.74rem;
        color: var(--secondary-text-color);
      }
      .pill {
        font-size: 0.7rem;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 999px;
        white-space: nowrap;
        background: var(--lc-chip-bg);
        color: var(--secondary-text-color);
      }
      .pill.in {
        background: var(--lc-brand-bg);
        color: var(--lc-brand);
      }
      .pill.done {
        background: var(--lc-good-bg);
        color: var(--lc-good);
      }
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        padding-left: 40px;
      }
      .fchip {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        font-size: 0.76rem;
        line-height: 1.3;
        padding: 3px 8px;
        border-radius: 8px;
        background: var(--lc-chip-bg);
        max-width: 100%;
      }
      .fchip ha-icon {
        --mdc-icon-size: 14px;
        flex: none;
      }
      .fchip.warn {
        background: var(--lc-warn-bg);
        color: var(--lc-warn);
      }
      .fchip.bad {
        background: var(--lc-bad-bg);
        color: var(--lc-bad);
      }
      .fchip.good {
        background: var(--lc-good-bg);
        color: var(--lc-good);
      }
      .g {
        display: inline-grid;
        place-items: center;
        min-width: 20px;
        height: 20px;
        padding: 0 3px;
        border-radius: 6px;
        font-weight: 800;
        font-size: 0.74rem;
        background: var(--lc-brand-bg);
        color: var(--lc-brand);
      }
      .g.hi {
        background: var(--lc-good-bg);
        color: var(--lc-good);
      }
      .g.lo {
        background: var(--lc-bad-bg);
        color: var(--lc-bad);
      }
      .g.more {
        background: none;
        color: var(--secondary-text-color);
        font-weight: 600;
      }
      .calm {
        font-size: 0.76rem;
        color: var(--secondary-text-color);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-family-card": LibrusFamilyCard;
  }
}
