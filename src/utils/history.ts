import type { LibrusHass } from "./types";

export interface HistoryPoint {
  timestamp: number;
  value: number;
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
    `&end_time=${encodeURIComponent(end.toISOString())}`;
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
