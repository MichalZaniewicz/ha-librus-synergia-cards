import type { HassEntity } from "home-assistant-js-websocket";
import type { LibrusHass } from "./types";

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
