/** A failed fetch for one student is tried again no sooner than this. */
const RETRY_MS = 60_000;

interface ChildFetch {
  key: string;
  generation: number;
  failedAt?: number;
}

/**
 * Bookkeeping for a card that fetches a calendar for every student at once
 * (the First lesson and School hours cards). Each student is fetched on its
 * own key - the day or week plus THAT student's Last update stamp - so a
 * Librus refresh of one child refetches only that child, not all of them.
 * A failed fetch for a student is retried after a minute; a fetch that a
 * newer one for the same student overtook is dropped (see `isCurrent`).
 */
export class PerChildFetch {
  private _children = new Map<string, ChildFetch>();
  private _generation = 0;

  /** The students to fetch now: a new key, `force`, or a failure a minute old. */
  due(ids: string[], keyOf: (id: string) => string, force = false): string[] {
    const now = Date.now();
    return ids.filter((id) => {
      const child = this._children.get(id);
      if (force || !child || child.key !== keyOf(id)) return true;
      return child.failedAt !== undefined && now - child.failedAt >= RETRY_MS;
    });
  }

  /** Call when a student's fetch starts; keep the number for `isCurrent`. */
  begin(id: string, key: string): number {
    const generation = ++this._generation;
    this._children.set(id, { key, generation });
    return generation;
  }

  /** True if no newer fetch for this student started since `generation`. */
  isCurrent(id: string, generation: number): boolean {
    return this._children.get(id)?.generation === generation;
  }

  /** The fetch failed - retried a minute later. */
  failed(id: string, generation: number): void {
    const child = this._children.get(id);
    if (child?.generation === generation) child.failedAt = Date.now();
  }
}
