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
}

/**
 * A subject sensor's text grades (`text_grades`, integration 0.12.0+): a
 * grade the teacher entered as text. Shown with a pencil chip and the text
 * as the quote line.
 */
export function textGradeEntries(attributes: Record<string, unknown> | undefined): GradeLogEntry[] {
  const raw = attributes?.text_grades;
  if (!Array.isArray(raw)) return [];
  return (raw as { value: string; category: string | null; date: string | null }[]).map((g) => ({
    value: "✎",
    category: g.category,
    date: g.date,
    comments: g.value ? [g.value] : [],
    text: true,
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
  /** "newest" (default) or "oldest" first. */
  sort?: "newest" | "oldest";
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
    result = result.filter((g) => !g.date || g.date >= cutoffIso);
  }

  const sorted = [...result].sort((a, b) => (a.date ?? "").localeCompare(b.date ?? ""));
  return config.sort === "oldest" ? sorted : sorted.reverse();
}
