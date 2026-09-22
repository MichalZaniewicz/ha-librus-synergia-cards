/** "08:55" from an ISO datetime, in the viewer's local time. */
export function formatTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

/** Locale-aware short date, e.g. "9 wrz" / "Sep 9". */
export function formatShortDate(isoDate: string, locale: string | undefined): string {
  const d = new Date(`${isoDate.slice(0, 10)}T00:00:00`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString(locale, { day: "numeric", month: "short" });
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
