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
