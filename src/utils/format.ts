// Building an Intl formatter is far slower than using one, and
// `toLocaleDateString`/`toLocaleString` build a new one on every call -
// noticeable in lists and the month grid. One per locale + options here.
const dateFormats = new Map<string, Intl.DateTimeFormat>();
const numberFormats = new Map<string, Intl.NumberFormat>();

/** `d.toLocaleDateString(locale, options)` / `toLocaleTimeString`, with the formatter reused. */
export function formatDate(d: Date, locale: string | undefined, options: Intl.DateTimeFormatOptions): string {
  const key = `${locale ?? ""}|${JSON.stringify(options)}`;
  let format = dateFormats.get(key);
  if (!format) {
    format = new Intl.DateTimeFormat(locale, options);
    dateFormats.set(key, format);
  }
  return format.format(d);
}

/** `n.toLocaleString(locale, options)`, with the formatter reused. */
export function formatNumber(n: number, locale: string | undefined, options: Intl.NumberFormatOptions = {}): string {
  const key = `${locale ?? ""}|${JSON.stringify(options)}`;
  let format = numberFormats.get(key);
  if (!format) {
    format = new Intl.NumberFormat(locale, options);
    numberFormats.set(key, format);
  }
  return format.format(n);
}

/** "08:55" from an ISO datetime, in the viewer's local time. */
export function formatTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return formatDate(d, undefined, { hour: "2-digit", minute: "2-digit" });
}

/** Locale-aware short date, e.g. "9 wrz" / "Sep 9". */
export function formatShortDate(isoDate: string, locale: string | undefined): string {
  const d = new Date(`${isoDate.slice(0, 10)}T00:00:00`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return formatDate(d, locale, { day: "numeric", month: "short" });
}

/** Whole days between two calendar dates (ignores time-of-day). */
export function daysBetween(from: Date, to: Date): number {
  const a = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());
  const b = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate());
  return Math.round((b - a) / 86_400_000);
}

/** Minutes between two instants, rounded down, never negative. */
export function minutesUntil(target: Date, now: Date): number {
  return Math.max(0, Math.floor((target.getTime() - now.getTime()) / 60_000));
}

/**
 * Minutes from `now` to a Next/Current lesson sensor's `start` (or `end`)
 * attribute - an ISO datetime, or "HH:MM" on the sensor's `date`. Worked
 * out here rather than read from `minutes_until` / `minutes_left`, which
 * newer integrations no longer write (they only changed when the sensor
 * did, so the countdown stood still between Librus refreshes); those are
 * only the fallback for an older integration. `null` when unknown.
 */
export function lessonMinutes(
  attributes: Record<string, unknown> | undefined,
  which: "start" | "end",
  now: Date = new Date()
): number | null {
  const raw = attributes?.[which];
  if (typeof raw === "string" && raw) {
    const date = typeof attributes?.date === "string" ? attributes.date : "";
    const iso = /^\d{1,2}:\d{2}/.test(raw) && date ? `${date.slice(0, 10)}T${raw.padStart(5, "0")}` : raw;
    const target = new Date(iso);
    if (!Number.isNaN(target.getTime())) return minutesUntil(target, now);
  }
  const legacy = numOrNull(attributes?.[which === "start" ? "minutes_until" : "minutes_left"]);
  return legacy === null ? null : Math.max(0, legacy);
}

/**
 * A state/attribute value as a finite number, or `null` if it genuinely
 * isn't one - NOT `Number(v)`, which turns a legitimately-absent
 * `null`/`undefined` value (e.g. `average_semester_2` before that
 * semester has any counted grades) into a real `0`, producing a false,
 * alarming-looking drop against a genuine earlier average. Written to fix
 * exactly that shipped bug in librus-semester-comparison-card, then
 * found duplicated byte-for-byte in librus-hero-card and
 * librus-hero-stats-card.
 */
export function numOrNull(v: unknown): number | null {
  if (v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

const CATEGORY_RE = /^\[([^\]]+)\]\s*/;

/**
 * Splits an Agenda event's `"[Category] rest of the text"` summary
 * (server-side prefixing, see ha-librus-synergia's coordinator.py) into
 * its category and the remaining text. Found live: showing the raw
 * "[Zebranie z Rodzicami] ..." bracket text inline read as unpolished -
 * every card that displays an Agenda summary should show the category as
 * its own label (`.cat-label`, matching how the grade/behaviour-notice
 * cards already show a category) instead of literal brackets.
 */
export function parseCategory(summary: string): { category: string | null; text: string } {
  const match = CATEGORY_RE.exec(summary);
  return match ? { category: match[1], text: summary.slice(match[0].length) } : { category: null, text: summary };
}
