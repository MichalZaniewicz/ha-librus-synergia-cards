import { isoDate } from "./calendar";

/** One entry from a `subject_average` sensor's `grades` attribute. */
export interface GradeLogEntry {
  value: string;
  category: string | null;
  date: string | null;
  comments: string[];
  /** On a correction ("poprawa"): the value of the grade it improves (backend 0.10.1+). */
  improves?: string | null;
  /** True on a grade that was later corrected (backend 0.10.1+). */
  improved?: boolean;
  /** Point grades only: the share of the maximum, e.g. 85 for 17/20. */
  percentage?: number | null;
  /** True for an entry built from `point_grades` (see `pointGradeEntries`). */
  points?: boolean;
  /** True for an entry built from `text_grades` (see `textGradeEntries`). */
  text?: boolean;
  /** Who gave the grade (backend 0.9.2+ on ordinary grades). */
  teacher?: string | null;
  /** True for an entry built from the Descriptive grades sensor (see `descriptiveGradeEntries`). */
  descriptive?: boolean;
  /** False for a grade that doesn't count towards the average (its category's
   * "Licz do śr.", integration 0.12.37+ on ordinary grades). */
  counts_to_average?: boolean | null;
  /** When the integration noticed a teacher editing the grade after giving
   * it (ISO time, integration 0.12.42+; issue #28). */
  changed_at?: string | null;
  /** The edited fields before the first edit, e.g. `{ value: "bz" }`. */
  previous?: Record<string, unknown> | null;
}

/** "YYYY-MM-DD HH:MM:SS" in local time - the shape of a grade's `date`. */
function localStamp(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const p = (n: number): string => String(n).padStart(2, "0");
  return `${isoDate(d)} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

/** The newest thing that happened to a grade: the edit if there was one,
 * else when it was given. Grade lists sort and date by it, so an edited
 * grade comes back to the top with the day of the change. */
export function activityDate(g: GradeLogEntry): string | null {
  const edited = g.changed_at ? localStamp(g.changed_at) : "";
  return edited && edited > (g.date ?? "") ? edited : g.date;
}

/** True for a grade edited after it was given (and the edit is newer than the grade). */
export function isEdited(g: GradeLogEntry): boolean {
  return activityDate(g) !== g.date;
}

/** What an edit changed, for a label: the value before when the grade
 * itself changed ("bz" for "bz -> 5"), else undefined (a weight or counting
 * change). */
export function previousValue(g: GradeLogEntry): string | undefined {
  const value = g.previous?.value;
  return value === undefined || value === null || value === "" ? undefined : String(value);
}

/** True only when Librus says the grade doesn't count (unknown = counts). */
export function notCounted(g: GradeLogEntry): boolean {
  return g.counts_to_average === false;
}

/** One entry of the Descriptive grades sensor's `grades` / `recent` attribute. */
export interface DescriptiveGradeAttr {
  subject: string | null;
  value: string;
  skill?: string | null;
  teacher?: string | null;
  date: string | null;
  comments?: string[];
  changed_at?: string | null;
  previous?: Record<string, unknown> | null;
}

/**
 * The Descriptive grades sensor's grades as grade-log entries: the skill
 * ("Ekspresja muzyczna. Śpiew") is shown where an ordinary grade shows its
 * category. Reads `grades` (every grade, integration 0.12.3+) and falls back
 * to `recent` (the newest five) on older versions.
 */
export function descriptiveGradeEntries(
  attributes: Record<string, unknown> | undefined
): (GradeLogEntry & { subject: string })[] {
  const raw = Array.isArray(attributes?.grades) ? attributes?.grades : attributes?.recent;
  if (!Array.isArray(raw)) return [];
  return (raw as DescriptiveGradeAttr[]).map((g) => ({
    subject: g.subject ?? "",
    value: g.value,
    category: g.skill ?? null,
    date: g.date,
    comments: g.comments ?? [],
    teacher: g.teacher ?? null,
    descriptive: true,
    changed_at: g.changed_at ?? null,
    previous: g.previous ?? null,
  }));
}

/**
 * A subject sensor's text grades (`text_grades`, integration 0.12.0+): a
 * grade the teacher entered as text. Shown with a pencil chip and the text
 * as the quote line.
 */
export function textGradeEntries(attributes: Record<string, unknown> | undefined): GradeLogEntry[] {
  const raw = attributes?.text_grades;
  if (!Array.isArray(raw)) return [];
  return (
    raw as {
      value: string;
      category: string | null;
      date: string | null;
      changed_at?: string | null;
      previous?: Record<string, unknown> | null;
    }[]
  ).map((g) => ({
    value: "✎",
    category: g.category,
    date: g.date,
    comments: g.value ? [g.value] : [],
    text: true,
    changed_at: g.changed_at ?? null,
    // A text grade's chip is a pencil: an edited text isn't "changed from X".
    previous: null,
  }));
}

/** One entry of a subject sensor's `point_grades` attribute (backend: schools grading in points). */
interface PointGradeAttr {
  value: string;
  points: number | null;
  max_points: number | null;
  percentage: number | null;
  category: string | null;
  date: string | null;
  counts_to_average?: boolean | null;
  changed_at?: string | null;
  previous?: Record<string, unknown> | null;
}

/**
 * A subject sensor's point grades as grade-log entries ("17/20", or the raw
 * value when the maximum is unknown), so the grade lists show them next to
 * ordinary 1-6 grades. Empty for schools without point grades.
 */
export function pointGradeEntries(attributes: Record<string, unknown> | undefined): GradeLogEntry[] {
  const raw = attributes?.point_grades;
  if (!Array.isArray(raw)) return [];
  return (raw as PointGradeAttr[]).map((p) => ({
    value: p.points !== null && p.max_points ? `${formatPoints(p.points)}/${formatPoints(p.max_points)}` : p.value,
    category: p.category,
    date: p.date,
    comments: [],
    percentage: p.percentage,
    points: true,
    counts_to_average: p.counts_to_average,
    changed_at: p.changed_at ?? null,
    previous: p.previous?.points !== undefined && p.previous?.points !== null
      ? { value: formatPoints(Number(p.previous.points)) }
      : (p.previous ?? null),
  }));
}

function formatPoints(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1).replace(".", ",");
}

/** Chip tone for a point grade: green from 75%, red under 50%. */
export function pointTone(percentage: number | null | undefined): string {
  if (percentage === null || percentage === undefined) return "";
  if (percentage >= 75) return "pt-good";
  if (percentage < 50) return "pt-bad";
  return "";
}

export interface GradeFilterConfig {
  /** Comma-separated keywords - keeps a grade if its category contains ANY of them (case-insensitive). */
  category_filter?: string;
  /** Only keep grades dated within the last N days. */
  days?: number;
  /** "newest" (default: an edited grade by the day of the edit), "given"
   * (newest first by the date given) or "oldest" first. */
  sort?: "newest" | "oldest" | "given";
}

/**
 * Shared by `librus-grade-log-card` and `librus-subject-grades-card` - both
 * render the same `grades` attribute shape, just scoped differently
 * (every subject vs. one). A grade with no `date` always survives the
 * `days` filter (can't tell how old it is) but sorts as if oldest, same
 * "don't hide data just because a field is missing" precedent as the rest
 * of this card family.
 */
export function filterAndSortGrades<T extends GradeLogEntry>(grades: readonly T[], config: GradeFilterConfig): T[] {
  let result: readonly T[] = grades;

  const keywords = (config.category_filter ?? "")
    .split(",")
    .map((k) => k.trim().toLowerCase())
    .filter(Boolean);
  if (keywords.length) {
    result = result.filter((g) => {
      const cat = (g.category ?? "").toLowerCase();
      return keywords.some((k) => cat.includes(k));
    });
  }

  if (config.days) {
    const cutoff = new Date();
    cutoff.setHours(0, 0, 0, 0);
    cutoff.setDate(cutoff.getDate() - config.days);
    // isoDate(), not toISOString().slice(0, 10) - the latter converts
    // through UTC first and can land on the wrong calendar date depending
    // on the viewer's timezone.
    const cutoffIso = isoDate(cutoff);
    const when = (g: T): string | null => (config.sort === "newest" || !config.sort ? activityDate(g) : g.date);
    result = result.filter((g) => !when(g) || when(g)! >= cutoffIso);
  }

  // Newest first counts an edit as the grade's newest moment (issue #28).
  const key = (g: T): string => (config.sort === "newest" || !config.sort ? activityDate(g) : g.date) ?? "";
  const sorted = [...result].sort((a, b) => key(a).localeCompare(key(b)));
  return config.sort === "oldest" ? sorted : sorted.reverse();
}
