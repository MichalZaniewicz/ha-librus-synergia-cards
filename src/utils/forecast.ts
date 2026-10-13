import type { HassEntity } from "home-assistant-js-websocket";
import type { LibrusHass } from "./types";
import type { SubjectStat } from "./hero-archetypes";

/**
 * Helpers for the integration's grade forecast (0.12.0+): the Grade
 * forecast sensor carries the school's thresholds, each subject-average
 * sensor its own `predicted_grade` plus the exact average and weight total
 * the forecast is computed on. Everything degrades to "no forecast" on an
 * older integration.
 */

export const DEFAULT_THRESHOLDS = [1.75, 2.75, 3.75, 4.75, 5.5];

export function thresholdsOf(hass: LibrusHass, map: Record<string, string>): number[] {
  const raw = map.grade_forecast ? hass.states[map.grade_forecast]?.attributes.thresholds : undefined;
  return Array.isArray(raw) && raw.length === 5 ? raw.map(Number) : DEFAULT_THRESHOLDS;
}

/**
 * Minimum percentages for a 2..6 in point-graded subjects - the Grade
 * forecast sensor's `point_thresholds` (integration option "Point grade
 * forecast thresholds"). Undefined when not set or on an older integration:
 * point-graded subjects then have no grade to compare.
 */
export function pointThresholdsOf(hass: LibrusHass, map: Record<string, string>): number[] | undefined {
  const raw = map.grade_forecast ? hass.states[map.grade_forecast]?.attributes.point_thresholds : undefined;
  return Array.isArray(raw) && raw.length === 5 ? raw.map(Number) : undefined;
}

/**
 * The point-grade scale for one subject: its own (the subject sensor's
 * `point_thresholds`, integration 0.12.19+ - per-subject scales from the
 * options) or the general one. Undefined when neither is set.
 */
export function pointThresholdsFor(
  hass: LibrusHass,
  map: Record<string, string>,
  state: HassEntity | undefined
): number[] | undefined {
  const own = state?.attributes.point_thresholds;
  return Array.isArray(own) && own.length === 5 ? own.map(Number) : pointThresholdsOf(hass, map);
}

/** What the point-grade cards need about one subject graded in points. */
export interface PointSubject {
  /** Weighted points earned / possible - on the forecast's basis when the
   * integration gives it (this semester or the year), else all of them. */
  earned: number;
  possible: number;
  percentage: number;
  /** The most common maximum among its scores: what "one more test" is out of. */
  typicalMax: number;
  /** Its percentage scale for a 2..6, when the integration has one. */
  thresholds?: number[];
}

/**
 * A subject graded in points (integration 0.12.19+: `points_earned` /
 * `points_possible` on its average sensor), or undefined for a 1-6 subject
 * or an older integration.
 */
export function pointSubjectOf(
  hass: LibrusHass,
  map: Record<string, string>,
  state: HassEntity | undefined
): PointSubject | undefined {
  if (!state || Number.isFinite(Number(state.state))) return undefined;
  const a = state.attributes;
  const num = (v: unknown): number | undefined => (typeof v === "number" && Number.isFinite(v) ? v : undefined);
  const earned = num(a.forecast_points_earned) ?? num(a.points_earned);
  const possible = num(a.forecast_points_possible) ?? num(a.points_possible);
  if (earned === undefined || possible === undefined || possible <= 0) return undefined;
  const maxima = new Map<number, number>();
  for (const g of (a.point_grades as { max_points?: number | null }[] | undefined) ?? []) {
    if (typeof g.max_points === "number" && g.max_points > 0) maxima.set(g.max_points, (maxima.get(g.max_points) ?? 0) + 1);
  }
  let typicalMax = 20;
  let seen = 0;
  for (const [max, count] of maxima) {
    if (count > seen) {
      typicalMax = max;
      seen = count;
    }
  }
  return { earned, possible, percentage: (100 * earned) / possible, typicalMax, thresholds: pointThresholdsFor(hass, map, state) };
}

/** A point-graded subject's percentage (`points_percentage`) - only when the
 * sensor has no 1-6 average of its own (its state isn't a number). */
export function pointsPercentage(state: HassEntity | undefined): number | undefined {
  if (!state || Number.isFinite(Number(state.state))) return undefined;
  const raw = state.attributes.points_percentage;
  return typeof raw === "number" && Number.isFinite(raw) ? raw : undefined;
}

/**
 * One subject-average sensor as a hero-card subject: its 1-6 average and
 * grade count - or, for a point-graded subject with a forecast, the forecast
 * grade and its number of point grades (`points: true`).
 */
export function heroSubjectStat(subject: string, state: HassEntity | undefined): SubjectStat {
  const raw = state ? Number(state.state) : NaN;
  const gradeCount = ((state?.attributes.grades as unknown[] | undefined) ?? []).length;
  if (Number.isFinite(raw) || pointsPercentage(state) === undefined) {
    return { subject, average: Number.isFinite(raw) ? raw : null, gradeCount };
  }
  const predicted = subjectForecast(state)?.predicted;
  const pointCount = ((state?.attributes.point_grades as { percentage?: number | null }[] | undefined) ?? []).filter(
    (g) => typeof g.percentage === "number"
  ).length;
  if (predicted === undefined || pointCount === 0) return { subject, average: null, gradeCount };
  return { subject, average: predicted, gradeCount: pointCount, points: true };
}

export function predictedGrade(average: number, thresholds: number[]): number {
  return 1 + thresholds.filter((t) => average >= t).length;
}

export interface SubjectForecast {
  predicted: number;
  average: number;
  weight: number;
  declining: boolean;
  sixesToNext?: number;
}

/** The forecast attributes of one subject-average sensor, if present. */
export function subjectForecast(state: HassEntity | undefined): SubjectForecast | undefined {
  const a = state?.attributes;
  if (!a || a.predicted_grade === null || a.predicted_grade === undefined) return undefined;
  const sixes = a.sixes_to_next_grade;
  return {
    predicted: Number(a.predicted_grade),
    average: Number(a.forecast_average),
    weight: Number(a.forecast_weight),
    declining: a.forecast_declining === true,
    sixesToNext: sixes === null || sixes === undefined ? undefined : Number(sixes),
  };
}

/** How many 6s (weight 1) take `average` (over `weight`) to `target`. */
export function sixesToReach(average: number, weight: number, target: number): number | null {
  if (average >= target) return 0;
  if (target >= 6 || !(weight > 0)) return null;
  return Math.max(1, Math.ceil((target * weight - average * weight) / (6 - target) - 1e-9));
}

/** "ok" / "warn" (fell recently) / "bad" (heading for a 1). */
export function forecastTone(f: SubjectForecast): "ok" | "warn" | "bad" {
  if (f.predicted <= 1) return "bad";
  return f.declining ? "warn" : "ok";
}
