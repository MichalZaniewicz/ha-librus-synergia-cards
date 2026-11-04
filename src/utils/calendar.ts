import type { LibrusCardConfig, LibrusHass } from "./types";
import { registryIndex } from "./entities";

export interface LibrusCalendarEvent {
  start: string; // "YYYY-MM-DD" for all-day, full ISO datetime otherwise
  end: string;
  allDay: boolean;
  summary: string;
  description?: string;
  location?: string;
  /** An activity outside the regular timetable (extra activities, the
   * individualised learning path, one-to-one teaching - integration
   * 0.12.34+), not a lesson. Only cards that ask for them get them. */
  extra?: boolean;
}

/** The integration gives activities outside the timetable a uid with this
 * prefix (calendar.py, EXTRA_ACTIVITY_UID_PREFIX). */
const EXTRA_ACTIVITY_UID_PREFIX = "librus-extra-";

interface RawCalendarDateTime {
  date?: string;
  dateTime?: string;
}

interface RawCalendarEvent {
  start: string | RawCalendarDateTime;
  end: string | RawCalendarDateTime;
  summary?: string;
  description?: string;
  location?: string;
  uid?: string;
}

function normalize(raw: string | RawCalendarDateTime): { value: string; allDay: boolean } {
  if (typeof raw === "string") {
    // A bare "YYYY-MM-DD" (10 chars) is all-day; anything longer carries a time.
    return { value: raw, allDay: raw.length <= 10 };
  }
  if (raw.date) return { value: raw.date, allDay: true };
  return { value: raw.dateTime ?? "", allDay: false };
}

/** How long a calendar request is shared, in ms. */
const SHARED_FOR_MS = 30_000;

interface SharedRequest {
  /** Entity + Last update stamp. */
  key: string;
  start: number;
  end: number;
  at: number;
  promise: Promise<LibrusCalendarEvent[]>;
}
let requests: SharedRequest[] = [];

/**
 * Fetches events for one calendar entity over [start, end) via Home
 * Assistant's REST API - the same endpoint HA's own calendar dashboard
 * card uses (`GET /api/calendars/<entity_id>?start=...&end=...`).
 *
 * Home Assistant has shipped `start`/`end` as either a bare ISO string or
 * a Google-Calendar-style `{date}`/`{dateTime}` object across versions -
 * both are normalized here defensively so the rest of this repo never has
 * to care which one a given HA version actually sends.
 *
 * Several cards on one dashboard ask for the same calendar at the same
 * moment (after every Librus refresh, the Today, Week and Bell schedule
 * cards all want this week's lessons; the Agenda, Next exam, Exam weeks and
 * Month cards all read the Agenda, each over its own range): a request made
 * within 30 s - and for the same Librus refresh, by the calendar's Last
 * update sensor - is answered from one already sent (or still on its way)
 * whose range covers it, keeping the events that overlap the range asked
 * for. A failed one isn't kept. Every caller gets its own copy of the list,
 * so sorting it in place is fine.
 *
 * Activities outside the timetable (`extra`) are left out unless
 * `options.extra` asks for them: most cards count lessons, start and end
 * times or bell periods, and an extra activity at 7:50 is none of those.
 */
export async function fetchCalendarEvents(
  hass: LibrusHass,
  entityId: string,
  start: Date,
  end: Date,
  options: { extra?: boolean } = {}
): Promise<LibrusCalendarEvent[]> {
  const key = `${entityId}|${refreshStamp(hass, entityId)}`;
  const from = start.getTime();
  const to = end.getTime();
  const now = Date.now();
  requests = requests.filter((r) => now - r.at <= SHARED_FOR_MS);
  let entry = requests.find((r) => r.key === key && r.start <= from && r.end >= to);
  if (!entry) {
    const path = `calendars/${entityId}?start=${encodeURIComponent(
      start.toISOString()
    )}&end=${encodeURIComponent(end.toISOString())}`;
    const created: SharedRequest = { key, start: from, end: to, at: now, promise: loadCalendarEvents(hass, path) };
    entry = created;
    requests.push(created);
    created.promise.catch(() => {
      requests = requests.filter((r) => r !== created);
    });
  }
  const covering = entry;
  const events = await covering.promise;
  const exact = covering.start === from && covering.end === to;
  return events
    .filter((e) => (options.extra || !e.extra) && (exact || overlapsRange(e, start, end)))
    .map((e) => ({ ...e }));
}

/**
 * True if the event falls in [start, end) the way the integration's
 * calendars decide it: a timed event that starts before the end and ends
 * after the start; an all-day event (dates, end exclusive) whose days meet
 * the dates the range touches.
 */
function overlapsRange(ev: LibrusCalendarEvent, start: Date, end: Date): boolean {
  if (ev.allDay) {
    const startDay = isoDate(start);
    const lastDay = isoDate(new Date(end.getTime() - 1));
    const first = ev.start.slice(0, 10);
    const after = (ev.end ?? "").slice(0, 10); // the day after the last one
    // An end not after the start: a one-day event.
    const endsInRange = after > first ? after > startDay : first >= startDay;
    return first <= lastDay && endsInRange;
  }
  const s = new Date(ev.start).getTime();
  const e = new Date(ev.end).getTime();
  return s < end.getTime() && e > start.getTime();
}

/** The state of the Last update sensor of the calendar's own device ("" without one). */
function refreshStamp(hass: LibrusHass, entityId: string): string {
  const deviceId = hass.entities?.[entityId]?.device_id;
  const stampId = deviceId ? registryIndex(hass).keyMaps.get(deviceId)?.last_update : undefined;
  return stampId ? (hass.states[stampId]?.state ?? "") : "";
}

/** An emoji (or flag) and the space after it at the start of a title. */
const LEADING_EMOJI_RE =
  /^(?:\p{Extended_Pictographic}|\p{Regional_Indicator})[\p{Extended_Pictographic}\p{Regional_Indicator}\p{Emoji_Modifier}️‍]*\s+/u;

/** "📐 Matematyka" -> "Matematyka". The integration's "Emoji in calendar
 * titles" option (0.12.28+) puts one in front of timetable and Agenda
 * titles for phones and watches; the cards show subjects and categories
 * by name, so every title is read without it. */
export function stripLeadingEmoji(summary: string): string {
  return summary.replace(LEADING_EMOJI_RE, "");
}

async function loadCalendarEvents(hass: LibrusHass, path: string): Promise<LibrusCalendarEvent[]> {
  const raw = (await hass.callApi("GET", path)) as RawCalendarEvent[] | undefined;
  if (!Array.isArray(raw)) return [];
  return raw.map((item) => {
    const s = normalize(item.start);
    const e = normalize(item.end);
    return {
      start: s.value,
      end: e.value,
      allDay: s.allDay,
      summary: stripLeadingEmoji(item.summary ?? ""),
      description: item.description,
      location: item.location,
      extra: typeof item.uid === "string" && item.uid.startsWith(EXTRA_ACTIVITY_UID_PREFIX),
    };
  });
}

/** What a Timetable calendar event says about the lesson. The integration
 * appends " (odwołane)", " (zastępstwo)", " (zmiana sali)" or
 * " (przeniesiona)" to the summary (calendar.py) and puts the teacher on the
 * description's first line, then details such as "Zmiana sali: 12 → 21"
 * (backend 0.12.0+). `name` is the subject without the suffix, so a changed
 * lesson still counts as its subject. */
export interface LessonInfo {
  name: string;
  cancelled: boolean;
  substitution: boolean;
  roomChange: boolean;
  moved: boolean;
  /** The teacher (description's first line), if any. */
  teacher?: string;
  /** Detail lines ("Zastępstwo za: ...", "Zmiana sali: 12 → 21", ...). */
  details: string[];
  /** For a room change: [old room, new room]. */
  rooms?: [string, string];
  /** An activity outside the regular timetable, not a lesson. */
  extra: boolean;
  /** A test in the Agenda for this lesson ("Sprawdzian: ..." / "Kartkówka: ..."
   * description line, integration 0.12.37+): the kind and the Agenda text. */
  exam?: { kind: "test" | "quiz"; text?: string };
}

const SUFFIX_RE = /\s*\((odwołane|zastępstwo|zmiana sali|przeniesiona)\)\s*$/i;
const ROOM_RE = /^Zmiana sali:\s*(.+?)\s*→\s*(.+)$/;
const EXAM_RE = /^(Sprawdzian|Kartkówka)(?::\s*(.*))?$/;

/** Detail lines the integration writes below the teacher (calendar.py):
 * "Zastępstwo za: ...", "Temat: ...", "Przeniesiona z: ...", "Odwołane: ..."
 * (a merged slot) - "Zmiana sali: ..." and tests are ROOM_RE / EXAM_RE. */
const DETAIL_PREFIX_RE = /^(Zastępstwo za|Temat|Przeniesiona z|Odwołane):/;
/** The kind line of an activity outside the timetable (calendar.py,
 * _EXTRA_ACTIVITY_LABELS, plus its fallback "Zajęcia"). */
const EXTRA_KIND_LINES = new Set([
  "Zajęcia dodatkowe",
  "Zindywidualizowana ścieżka kształcenia",
  "Nauczanie indywidualne",
  "Zajęcia",
]);

/** True for a description line that is a detail, never a teacher's name. */
function isDetailLine(line: string): boolean {
  return EXAM_RE.test(line) || ROOM_RE.test(line) || DETAIL_PREFIX_RE.test(line) || EXTRA_KIND_LINES.has(line);
}

// lessonInfo() per event object: the week timetable asks for the same
// events on every render (30 s tick, hover...). The events come from
// fetchCalendarEvents() and are never changed in place.
const lessonInfoCache = new WeakMap<
  LibrusCalendarEvent,
  { summary: string; description?: string; value: LessonInfo }
>();

export function lessonInfo(event: LibrusCalendarEvent): LessonInfo {
  const hit = lessonInfoCache.get(event);
  if (hit && hit.summary === event.summary && hit.description === event.description) return hit.value;
  const value = readLessonInfo(event);
  lessonInfoCache.set(event, { summary: event.summary, description: event.description, value });
  return value;
}

function readLessonInfo(event: LibrusCalendarEvent): LessonInfo {
  const kind = SUFFIX_RE.exec(event.summary)?.[1]?.toLowerCase();
  const name = event.summary.replace(SUFFIX_RE, "");
  const lines = (event.description ?? "").split("\n").map((l) => l.trim());
  // The first line is the teacher - unless it's a detail: Home Assistant (or
  // an older integration) drops the empty first line of a lesson without a
  // teacher, and "Sprawdzian: ..." then moved up into the teacher's place.
  const teacherLine = lines[0] && !isDetailLine(lines[0]) ? lines[0] : undefined;
  const rest = lines[0] && !teacherLine ? lines : lines.slice(1);
  // Test lines become `exam` (shown as a tag), not a detail line.
  const examLines = rest.map((l) => EXAM_RE.exec(l)).filter((m): m is RegExpExecArray => Boolean(m));
  const details = rest.filter((l) => l && !EXAM_RE.test(l));
  const roomLine = details.map((l) => ROOM_RE.exec(l)).find(Boolean);
  const exam = examLines.length
    ? {
        // A full test wins over a short one on the same lesson.
        kind: examLines.some((m) => m[1] === "Sprawdzian") ? ("test" as const) : ("quiz" as const),
        text: examLines.map((m) => m[2]).filter(Boolean).join(" · ") || undefined,
      }
    : undefined;
  return {
    exam,
    name,
    cancelled: kind === "odwołane",
    substitution: kind === "zastępstwo",
    roomChange: kind === "zmiana sali" || Boolean(roomLine),
    moved: kind === "przeniesiona",
    teacher: teacherLine,
    details,
    rooms: roomLine ? [roomLine[1], roomLine[2]] : undefined,
    extra: Boolean(event.extra),
  };
}

/** "sala 12 · Anna Nowak · Zastępstwo za: Chemia" - one meta line under a lesson
 * (without the room when `hideRoom`). */
export function lessonMeta(
  event: LibrusCalendarEvent,
  info: LessonInfo = lessonInfo(event),
  hideRoom = false
): string {
  return [hideRoom ? undefined : event.location, info.teacher, ...info.details.filter((d) => !ROOM_RE.test(d))]
    .filter(Boolean)
    .join(" · ");
}

/** True if `now` falls within [event.start, event.end) - timed events only. */
export function isHappeningNow(event: LibrusCalendarEvent, now: Date): boolean {
  if (event.allDay) return false;
  const start = new Date(event.start).getTime();
  const end = new Date(event.end).getTime();
  const t = now.getTime();
  return t >= start && t < end;
}

/** Local "YYYY-MM-DD" of an event's first day. */
function firstDayOf(event: LibrusCalendarEvent): string {
  return event.allDay ? event.start.slice(0, 10) : isoDate(new Date(event.start));
}

/** Local "YYYY-MM-DD" of an event's last day - an all-day event's `end` is
 * the day AFTER it (exclusive), a timed one ends inside its last day. */
export function lastDayOf(event: LibrusCalendarEvent): string {
  if (event.allDay) {
    const d = new Date(`${event.end.slice(0, 10)}T00:00:00`);
    d.setDate(d.getDate() - 1);
    const last = isoDate(d);
    return last < event.start.slice(0, 10) ? event.start.slice(0, 10) : last;
  }
  return isoDate(new Date(new Date(event.end).getTime() - 1));
}

/**
 * Splits free-day events (sorted by start) into the one going on today, if
 * any, and the ones that haven't started yet. A break that began before
 * today still comes back from the calendar (it overlaps the range), and
 * counting down to its start gave a negative number of days.
 */
export function splitOngoing(
  events: LibrusCalendarEvent[],
  now: Date
): { ongoing?: LibrusCalendarEvent; upcoming: LibrusCalendarEvent[] } {
  const today = isoDate(now);
  const ongoing = events.find((e) => firstDayOf(e) <= today && lastDayOf(e) >= today);
  const upcoming = events.filter((e) => firstDayOf(e) > today);
  return { ongoing, upcoming };
}

/** True if the event has already ended relative to `now`. */
/** A gap between two lessons that take place, longer than a break. */
export interface FreePeriod {
  start: string;
  end: string;
  minutes: number;
}

/** Breaks between lessons are 5-20 minutes; this long or more is a free period ("okienko"). */
export const FREE_PERIOD_MINUTES = 30;

/**
 * Free periods ("okienka") in one day's lessons: gaps of at least
 * FREE_PERIOD_MINUTES between lessons that take place. A cancelled lesson
 * in the middle of the day leaves one too.
 */
export function freePeriods(events: LibrusCalendarEvent[]): FreePeriod[] {
  // Lessons only: an extra activity at 7:15 before lessons from 12:00 is not
  // a free period between lessons.
  const held = events
    .filter((e) => !e.allDay && !e.extra && !lessonInfo(e).cancelled)
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  const out: FreePeriod[] = [];
  let lastEnd: string | undefined;
  for (const lesson of held) {
    if (lastEnd) {
      const minutes = Math.round((new Date(lesson.start).getTime() - new Date(lastEnd).getTime()) / 60_000);
      if (minutes >= FREE_PERIOD_MINUTES) out.push({ start: lastEnd, end: lesson.start, minutes });
    }
    if (!lastEnd || new Date(lesson.end).getTime() > new Date(lastEnd).getTime()) lastEnd = lesson.end;
  }
  return out;
}

export function hasEnded(event: LibrusCalendarEvent, now: Date): boolean {
  const end = event.allDay ? new Date(`${event.end}T23:59:59`) : new Date(event.end);
  return end.getTime() < now.getTime();
}

/**
 * Local-timezone "YYYY-MM-DD" - NOT via `toISOString()`, which converts
 * through UTC first and can land on the wrong calendar date depending on
 * the viewer's timezone and time of day. Any date-only comparison (a
 * cutoff, a "which day is this" check) should go through this, not
 * `date.toISOString().slice(0, 10)`.
 */
export function isoDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Every local date an all-day event covers ([start, end), end exclusive). */
export function allDayDates(ev: LibrusCalendarEvent): string[] {
  const days: string[] = [];
  const d = new Date(`${ev.start.slice(0, 10)}T12:00:00`);
  const end = new Date(`${(ev.end || ev.start).slice(0, 10)}T12:00:00`);
  do {
    days.push(isoDate(d));
    d.setDate(d.getDate() + 1);
  } while (d < end);
  return days;
}

const FREE_LESSONS_RE = /\s*\(lekcje (\d+)(?:[–-](\d+))?\)$/;

/** A free day that frees only some lessons - the integration titles it
 * "Rekolekcje (lekcje 3–4)" (0.12.19+): `[3, 4]`. `undefined` for a whole
 * day off. */
export function freeDayLessons(summary: string): [number, number] | undefined {
  const m = FREE_LESSONS_RE.exec(summary);
  return m ? [Number(m[1]), Number(m[2] ?? m[1])] : undefined;
}

/** The free day's name without the "(lekcje 3–4)" part. */
export function freeDayName(summary: string): string {
  return summary.replace(FREE_LESSONS_RE, "");
}

/** Local "HH:MM" (24 h) of `d` - for comparing against bell-schedule times. */
export function hm(d: Date): string {
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

/** "HH:MM" in an ISO datetime that carries its own offset (or none) -
 * not "Z", which is UTC, not the server's clock. */
const WALL_TIME_RE = /^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2})(?::\d{2}(?:\.\d+)?)?([+-]\d{2}:?\d{2})?$/;

/**
 * "HH:MM" of an event time as Home Assistant's clock shows it. Home
 * Assistant sends timetable times in its own time zone ("...T08:00:00+01:00"),
 * and the School sensor's bell schedule is in that zone too - so comparing
 * against `hm(new Date(iso))` (the BROWSER's clock) put no lesson in any
 * period on a phone set to another time zone. Falls back to the browser's
 * clock for a UTC ("Z") time.
 */
export function wallTime(iso: string): string {
  const m = WALL_TIME_RE.exec(iso);
  return m ? `${m[2]}:${m[3]}` : hm(new Date(iso));
}

/** "YYYY-MM-DD" of an event time on Home Assistant's clock (see wallTime). */
export function wallDate(iso: string): string {
  const m = WALL_TIME_RE.exec(iso);
  return m ? m[1] : isoDate(new Date(iso));
}

/** Minutes since midnight of an event time on Home Assistant's clock. */
export function wallMinutes(iso: string): number {
  const [h, m] = wallTime(iso).split(":").map(Number);
  return h * 60 + m;
}

/** Minutes since midnight of `now` on the clock of `sample`'s offset
 * ("+01:00"), so a "now" line sits right against wallMinutes() times;
 * the browser's clock without one. */
export function wallMinutesNow(now: Date, sample: string | undefined): number {
  const offset = sample ? WALL_TIME_RE.exec(sample)?.[4] : undefined;
  if (!offset) return now.getHours() * 60 + now.getMinutes();
  const sign = offset.startsWith("-") ? -1 : 1;
  const digits = offset.replace(/[+:-]/g, "");
  const shift = sign * (Number(digits.slice(0, 2)) * 60 + Number(digits.slice(2, 4)));
  const utc = now.getUTCHours() * 60 + now.getUTCMinutes();
  return (((utc + shift) % 1440) + 1440) % 1440;
}

/** Next Mon-Fri after `from`, at local midnight (skips the weekend; does not know about holidays). */
export function nextSchoolDay(from: Date): Date {
  const d = new Date(from);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 1);
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
  return d;
}

/** ISO weekday of `d` in LOCAL time (1=Monday..7=Sunday). */
function isoWeekdayOf(d: Date): number {
  const day = d.getDay(); // 0 = Sunday
  return day === 0 ? 7 : day;
}

/**
 * Monday of the calendar week containing `d`, at local midnight - a plain
 * "this week's Monday", with no weekend roll-forward. Use this when the
 * caller genuinely wants the week `d` falls in (e.g. an attendance
 * heatmap's last column must be THIS week, not a future one that hasn't
 * happened yet). See `mondayOfSchoolWeek` below for the other, DIFFERENT
 * semantics some cards need instead - don't conflate the two.
 */
export function mondayOfWeek(d: Date): Date {
  const monday = new Date(d);
  monday.setDate(monday.getDate() - (isoWeekdayOf(d) - 1));
  monday.setHours(0, 0, 0, 0);
  return monday;
}

/**
 * Monday of the week most useful to look at right now. On a school day
 * (Mon-Fri) that's the ISO week containing today, same as `mondayOfWeek`.
 * On a weekend (Sat/Sun) the ISO week containing today has ALREADY
 * happened in full (Mon-Fri are all in the past) - rolling forward to next
 * Monday instead shows the week the viewer is actually about to live
 * through, matching how the next-lesson/today cards already favor "what's
 * coming" over "what just happened". Confirmed live (2026-09-06): without
 * this, opening a week-timetable card on a Sunday showed a stale,
 * mostly-elapsed week and looked broken. Shared by
 * librus-week-timetable-card and librus-subject-time-card - previously
 * duplicated byte-for-byte between the two.
 */
export function mondayOfSchoolWeek(d: Date): Date {
  const monday = new Date(d);
  const weekday = isoWeekdayOf(d);
  const daysToMonday = weekday >= 6 ? 8 - weekday : 1 - weekday;
  monday.setDate(monday.getDate() + daysToMonday);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

/** The `extra_calendars` a card's config gives one student (School hours
 * card): always a list of calendar entity ids, whether YAML used a single
 * id or a list. */
export function extraCalendarsOf(config: LibrusCardConfig | undefined, deviceId: string): string[] {
  const raw = config?.extra_calendars?.[deviceId];
  const list = Array.isArray(raw) ? raw : raw ? [raw] : [];
  return list.filter((id): id is string => typeof id === "string" && id.startsWith("calendar."));
}
