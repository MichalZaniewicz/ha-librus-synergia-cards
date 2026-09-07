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
