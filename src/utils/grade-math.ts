import type { GradeLogEntry } from "./grade-filters";

/** A `grades` entry with its category's weight (integration 0.12.37+). */
export interface WeightedGradeEntry extends GradeLogEntry {
  weight?: number | null;
}

/** 1-6 grades only; "5+" -> 5.5, "4-" -> 3.75 (the default scale - a school
 * can set its own +/- values, which only the integration knows). */
export function gradeNumber(value: string): number | undefined {
  const m = /^([1-6])([+-]?)$/.exec(value.trim());
  if (!m) return undefined;
  return Number(m[1]) + (m[2] === "+" ? 0.5 : m[2] === "-" ? -0.25 : 0);
}

/** False when the integration's "Average mode" option is arithmetic
 * (the subject sensor's `average_mode`), so every grade weighs the same. */
export function isWeighted(attributes: Record<string, unknown> | undefined): boolean {
  return attributes?.average_mode !== "arithmetic";
}

/** The value and weight one grade adds to the average - undefined for a
 * non-numeric mark or a grade that doesn't count. */
export function averageTerm(g: WeightedGradeEntry, weighted: boolean): { value: number; weight: number } | undefined {
  if (g.counts_to_average === false) return undefined;
  const value = gradeNumber(g.value);
  if (value === undefined) return undefined;
  const weight = weighted ? (typeof g.weight === "number" ? g.weight : 1) : 1;
  return weight > 0 ? { value, weight } : undefined;
}

/** Running sums for an average. */
export class AverageSum {
  sum = 0;
  weight = 0;
  count = 0;

  add(term: { value: number; weight: number } | undefined): void {
    if (!term) return;
    this.sum += term.value * term.weight;
    this.weight += term.weight;
    this.count += 1;
  }

  get average(): number | undefined {
    return this.weight > 0 ? this.sum / this.weight : undefined;
  }
}

/** CSS color of a grade (or average) by its whole number. */
export function gradeColor(value: number): string {
  const g = Math.min(6, Math.max(1, Math.round(value)));
  return `var(--lc-grade-${g})`;
}
