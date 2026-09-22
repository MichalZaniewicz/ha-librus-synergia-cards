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
