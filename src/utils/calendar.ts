import type { LibrusHass } from "./types";

export interface LibrusCalendarEvent {
  start: string; // "YYYY-MM-DD" for all-day, full ISO datetime otherwise
  end: string;
  allDay: boolean;
  summary: string;
  description?: string;
  location?: string;
}

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
}

function normalize(raw: string | RawCalendarDateTime): { value: string; allDay: boolean } {
  if (typeof raw === "string") {
    // A bare "YYYY-MM-DD" (10 chars) is all-day; anything longer carries a time.
    return { value: raw, allDay: raw.length <= 10 };
  }
  if (raw.date) return { value: raw.date, allDay: true };
  return { value: raw.dateTime ?? "", allDay: false };
}

/**
 * Fetches events for one calendar entity over [start, end) via Home
 * Assistant's REST API - the same endpoint HA's own calendar dashboard
 * card uses (`GET /api/calendars/<entity_id>?start=...&end=...`).
 *
 * Home Assistant has shipped `start`/`end` as either a bare ISO string or
 * a Google-Calendar-style `{date}`/`{dateTime}` object across versions -
 * both are normalized here defensively so the rest of this repo never has
 * to care which one a given HA version actually sends.
 */
export async function fetchCalendarEvents(
  hass: LibrusHass,
  entityId: string,
  start: Date,
  end: Date
): Promise<LibrusCalendarEvent[]> {
  const path = `calendars/${entityId}?start=${encodeURIComponent(
    start.toISOString()
  )}&end=${encodeURIComponent(end.toISOString())}`;
  const raw = (await hass.callApi("GET", path)) as RawCalendarEvent[] | undefined;
  if (!Array.isArray(raw)) return [];
  return raw.map((item) => {
    const s = normalize(item.start);
    const e = normalize(item.end);
    return {
      start: s.value,
      end: e.value,
      allDay: s.allDay,
      summary: item.summary ?? "",
      description: item.description,
      location: item.location,
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
}

const SUFFIX_RE = /\s*\((odwołane|zastępstwo|zmiana sali|przeniesiona)\)\s*$/i;
const ROOM_RE = /^Zmiana sali:\s*(.+?)\s*→\s*(.+)$/;

export function lessonInfo(event: LibrusCalendarEvent): LessonInfo {
  const kind = SUFFIX_RE.exec(event.summary)?.[1]?.toLowerCase();
  const name = event.summary.replace(SUFFIX_RE, "");
  const lines = (event.description ?? "").split("\n").map((l) => l.trim());
  const details = lines.slice(1).filter(Boolean);
  const roomLine = details.map((l) => ROOM_RE.exec(l)).find(Boolean);
  return {
    name,
    cancelled: kind === "odwołane",
    substitution: kind === "zastępstwo",
    roomChange: kind === "zmiana sali" || Boolean(roomLine),
    moved: kind === "przeniesiona",
    teacher: lines[0] || undefined,
    details,
    rooms: roomLine ? [roomLine[1], roomLine[2]] : undefined,
  };
}

/** "sala 12 · Anna Nowak · Zastępstwo za: Chemia" - one meta line under a lesson. */
export function lessonMeta(event: LibrusCalendarEvent, info: LessonInfo = lessonInfo(event)): string {
  return [event.location, info.teacher, ...info.details.filter((d) => !ROOM_RE.test(d))]
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

/** True if the event has already ended relative to `now`. */
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
