import type { LibrusHass } from "./types";

export interface HistoryPoint {
  timestamp: number;
  value: number;
}

/**
 * Daily means of one long-term statistic over [start, end] - for a
 * point-graded subject's percentage series, which the integration writes as
 * external statistics (`points_statistic_id` on the subject sensor).
 */
export async function fetchStatisticMeans(
  hass: LibrusHass,
  statisticId: string,
  start: Date,
  end: Date
): Promise<HistoryPoint[]> {
  const result = await hass.callWS<Record<string, { start: number | string; mean?: number | null }[]>>({
    type: "recorder/statistics_during_period",
    start_time: start.toISOString(),
    end_time: end.toISOString(),
    statistic_ids: [statisticId],
    period: "day",
    types: ["mean"],
  });
  const points: HistoryPoint[] = [];
  for (const row of result?.[statisticId] ?? []) {
    const value = row.mean;
    const timestamp = typeof row.start === "number" ? row.start : new Date(row.start).getTime();
    if (typeof value !== "number" || !Number.isFinite(value) || Number.isNaN(timestamp)) continue;
    const prev = points[points.length - 1];
    if (prev && prev.value === value) continue;
    points.push({ timestamp, value });
  }
  return points;
}

interface RawHistoryEntry {
  state: string;
  last_changed: string;
}

/**
 * Numeric state history for ONE entity over [start, end], via Home
 * Assistant's REST history API (`GET /api/history/period/...`) - the
 * same endpoint the frontend's own history-graph card uses.
 *
 * Non-numeric states (`unknown`/`unavailable`, or anything else that
 * doesn't parse as a number) are dropped. Consecutive identical values
 * are thinned to just their first occurrence - this integration polls
 * every ~20 minutes and a grade average only meaningfully changes when a
 * new grade actually lands, so a long flat stretch between changes is
 * correctly ONE flat line here, not one point per poll (which would be
 * hundreds of redundant points over a few weeks).
 */
export async function fetchNumericHistory(
  hass: LibrusHass,
  entityId: string,
  start: Date,
  end: Date
): Promise<HistoryPoint[]> {
  const path =
    `history/period/${encodeURIComponent(start.toISOString())}` +
    `?filter_entity_id=${encodeURIComponent(entityId)}` +
    `&end_time=${encodeURIComponent(end.toISOString())}` +
    // Only state + time per point: no attributes (a subject sensor carries
    // its whole grade list) and no repeated entity_id/last_updated.
    "&minimal_response&no_attributes";
  const raw = (await hass.callApi("GET", path)) as RawHistoryEntry[][] | undefined;
  const series = raw?.[0] ?? [];

  const points: HistoryPoint[] = [];
  for (const entry of series) {
    const value = Number(entry.state);
    if (!Number.isFinite(value)) continue;
    const timestamp = new Date(entry.last_changed).getTime();
    if (Number.isNaN(timestamp)) continue;
    const prev = points[points.length - 1];
    if (prev && prev.value === value) continue;
    points.push({ timestamp, value });
  }
  return points;
}
