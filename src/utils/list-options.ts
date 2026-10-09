/** The list options several cards share: `sort` and `max_items`. */
export interface ListOptions {
  sort?: "newest" | "oldest";
  max_items?: number;
}

/**
 * `items` ordered newest first (as the sensors provide them), turned
 * oldest first for `sort: oldest`, then cut to `max_items` (or
 * `defaultMax`; no cap when neither is set).
 */
export function applyListOptions<T>(items: readonly T[], options: ListOptions, defaultMax?: number): T[] {
  const ordered = options.sort === "oldest" ? [...items].reverse() : [...items];
  const max = options.max_items ?? defaultMax;
  return max !== undefined ? ordered.slice(0, max) : ordered;
}
