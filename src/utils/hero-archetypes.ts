import type { TranslationKey } from "./localize";

export type HeroMode = "archetype" | "hero";

export interface SubjectStat {
  subject: string;
  /** The sensor's own state (its weighted average) - `null` when the
   * subject has no counted grades yet (state is "unknown"). */
  average: number | null;
  gradeCount: number;
}

/** Everything the archetype computation needs, already pulled out of raw
 * `hass` state by the card - kept separate from Lit/hass so the decision
 * logic itself stays a pure, easily-reasoned-about function. */
export interface HeroInputs {
  subjects: SubjectStat[];
  overallAverage: number | null;
  overallSemester1: number | null;
  overallSemester2: number | null;
  attendanceStreak: number | null;
  unexcusedCount: number | null;
  goodGradeStreak: number | null;
  /** The Behaviour grade sensor's own state (e.g. "wz") - `null` if the
   * module is off/empty. */
  behaviourShortName: string | null;
  /** Sentiment of the Behaviour notices sensor's `recent` items (only the
   * last few are ever exposed - see that sensor's own attribute). */
  recentNoteSentiments: (string | null)[];
  /** From `librus-achievements-card`'s own localStorage list, read-only -
   * see `readAchievementCount` below for why this degrades to 0 instead
   * of failing when that card was never added to a dashboard. */
  achievementCount: number;
}

/** One evidence chip: a translation key plus the `{n}`-style vars it needs. */
export interface EvidenceChip {
  key: TranslationKey;
  vars?: Record<string, string | number>;
}

export interface HeroResult {
  id: string;
  icon: string;
  nameKey: Record<HeroMode, TranslationKey>;
  descKey: Record<HeroMode, TranslationKey>;
  /** Two short stat chips, from the same data that produced this result -
   * real numbers, not decoration. */
  evidence: [EvidenceChip, EvidenceChip];
}

export type ClusterId = "naukowiec" | "humanista" | "poliglota" | "artysta" | "sportowiec";

export interface ClusterDef {
  id: ClusterId;
  icon: string;
  subjects: string[];
  avgChipKey: TranslationKey;
}

// Real Librus subject names (always Polish - server data, not translated)
// this school system uses. A subject not listed here (e.g. "Religia",
// "Doradztwo zawodowe") simply never counts toward any cluster - neutral,
// not a bug. Exported so librus-hero-stats-card can reuse the exact same
// subject grouping instead of re-deriving a second, possibly-drifting copy.
export const CLUSTERS: ClusterDef[] = [
  {
    id: "naukowiec",
    icon: "mdi:flask-outline",
    subjects: ["Matematyka", "Fizyka", "Chemia", "Informatyka", "Biologia", "Geografia"],
    avgChipKey: "hero.chip.avg_naukowiec",
  },
  {
    id: "humanista",
    icon: "mdi:book-open-page-variant-outline",
    subjects: ["Język polski", "Historia", "Wiedza o społeczeństwie", "Filozofia"],
    avgChipKey: "hero.chip.avg_humanista",
  },
  {
    id: "poliglota",
    icon: "mdi:translate",
    subjects: [
      "Język angielski",
      "Język niemiecki",
      "Język francuski",
      "Język hiszpański",
      "Język rosyjski",
      "Język włoski",
    ],
    avgChipKey: "hero.chip.avg_poliglota",
  },
  {
    id: "artysta",
    icon: "mdi:palette-outline",
    subjects: ["Plastyka", "Muzyka"],
    avgChipKey: "hero.chip.avg_artysta",
  },
  {
    id: "sportowiec",
    icon: "mdi:run",
    subjects: ["Wychowanie fizyczne"],
    avgChipKey: "hero.chip.avg_sportowiec",
  },
];

const OTHER_ICONS: Record<string, string> = {
  wojownik: "mdi:shield-check-outline",
  meteor: "mdi:meteor",
  feniks: "mdi:fire",
  spolecznik: "mdi:hand-heart-outline",
  kolekcjoner: "mdi:trophy-outline",
  prymus: "mdi:crown-outline",
  wszechstronny: "mdi:scale-balance",
};

/** Static per-id catalog entry (icon + translation keys) - `evidence` is
 * always computed fresh in `computeHeroResult`, never stored here. */
function catalogEntry(id: string, icon: string): Pick<HeroResult, "icon" | "nameKey" | "descKey"> {
  return {
    icon,
    nameKey: {
      archetype: `hero.${id}.archetype_name` as TranslationKey,
      hero: `hero.${id}.hero_name` as TranslationKey,
    },
    descKey: {
      archetype: `hero.${id}.archetype_desc` as TranslationKey,
      hero: `hero.${id}.hero_desc` as TranslationKey,
    },
  };
}

// Exported read-only for librus-hero-history-card, which only needs the
// icon/name lookup by id (not the evidence-computing logic above).
export const CATALOG: Record<string, Pick<HeroResult, "icon" | "nameKey" | "descKey">> = {};
for (const c of CLUSTERS) CATALOG[c.id] = catalogEntry(c.id, c.icon);
for (const [id, icon] of Object.entries(OTHER_ICONS)) CATALOG[id] = catalogEntry(id, icon);

function round1(n: number): string {
  return n.toFixed(1);
}

export function weightedClusterAverage(
  subjects: SubjectStat[],
  names: string[]
): { avg: number; count: number } | null {
  let weighted = 0;
  let count = 0;
  for (const s of subjects) {
    if (!names.includes(s.subject) || s.average === null || s.gradeCount <= 0) continue;
    weighted += s.average * s.gradeCount;
    count += s.gradeCount;
  }
  return count > 0 ? { avg: weighted / count, count } : null;
}

/**
 * The one deterministic decision function - same inputs always produce the
 * same result, never random. Checked in priority order (most specific/rare
 * signal first); the first match wins. `null` only when there's genuinely
 * no data anywhere to base a result on (a brand-new setup).
 *
 * Thresholds for the streak-based results deliberately reuse the backend's
 * own achievement milestones (`good_grade_streak`: 5/10/20,
 * `attendance_streak`: 7/30/90 - see `librus-achievements-card`'s
 * `MILESTONE_TRACKS`) at their SECOND tier, so "Meteor"/"Niezłomny" read as
 * a genuinely notable streak, not just "any streak at all".
 */
export function computeHeroResult(inputs: HeroInputs): HeroResult | null {
  const gradedSubjects = inputs.subjects.filter((s) => s.gradeCount > 0);
  // Achievement count alone doesn't count as "enough to go on" - it only
  // ever unlocks from streaks this same function already reads directly,
  // so on its own (e.g. a synthetic/partial state) it isn't a meaningful
  // basis for the cluster-comparison fallback below.
  const hasAnyData =
    gradedSubjects.length > 0 || inputs.attendanceStreak !== null || inputs.behaviourShortName !== null;
  if (!hasAnyData) return null;

  // 1. Prymus/Legenda - high average held broadly, not just in one subject.
  if (inputs.overallAverage !== null && inputs.overallAverage >= 5.3 && gradedSubjects.length >= 4) {
    return {
      ...CATALOG.prymus,
      id: "prymus",
      evidence: [
        { key: "hero.chip.overall_avg_full", vars: { n: round1(inputs.overallAverage) } },
        { key: "hero.chip.subjects_count", vars: { n: gradedSubjects.length } },
      ],
    };
  }

  // 2. Kolekcjoner - a real trophy case (read-only, see readAchievementCount).
  if (inputs.achievementCount >= 5) {
    return {
      ...CATALOG.kolekcjoner,
      id: "kolekcjoner",
      evidence: [
        { key: "hero.chip.badges", vars: { n: inputs.achievementCount } },
        { key: "hero.chip.various_categories" },
      ],
    };
  }

  // 3. Feniks - this semester's average clearly up from the last one.
  if (
    inputs.overallSemester1 !== null &&
    inputs.overallSemester2 !== null &&
    inputs.overallSemester2 - inputs.overallSemester1 >= 0.5
  ) {
    return {
      ...CATALOG.feniks,
      id: "feniks",
      evidence: [
        { key: "hero.chip.semester1", vars: { n: round1(inputs.overallSemester1) } },
        { key: "hero.chip.semester2", vars: { n: round1(inputs.overallSemester2) } },
      ],
    };
  }

  // 4. Wojownik Frekwencji - a long, clean attendance streak.
  if (inputs.attendanceStreak !== null && inputs.attendanceStreak >= 30 && inputs.unexcusedCount === 0) {
    return {
      ...CATALOG.wojownik,
      id: "wojownik",
      evidence: [
        { key: "hero.chip.streak_days", vars: { n: inputs.attendanceStreak } },
        { key: "hero.chip.unexcused", vars: { n: 0 } },
      ],
    };
  }

  // 5. Meteor - a real hot streak of good grades.
  if (inputs.goodGradeStreak !== null && inputs.goodGradeStreak >= 10) {
    return {
      ...CATALOG.meteor,
      id: "meteor",
      evidence: [
        { key: "hero.chip.good_streak", vars: { n: inputs.goodGradeStreak } },
        inputs.overallAverage !== null
          ? { key: "hero.chip.overall_avg", vars: { n: round1(inputs.overallAverage) } }
          : { key: "hero.chip.various_categories" },
      ],
    };
  }

  // 6. Społecznik - model conduct AND a genuinely positive recent record
  //    (only the sensor's last few notes ever carry sentiment - this is
  //    best-effort over that small window, not the full note history).
  const positiveNotes = inputs.recentNoteSentiments.filter((s) => s === "positive").length;
  const negativeNotes = inputs.recentNoteSentiments.filter((s) => s === "negative").length;
  if (inputs.behaviourShortName === "wz" && positiveNotes >= 2 && negativeNotes === 0) {
    return {
      ...CATALOG.spolecznik,
      id: "spolecznik",
      evidence: [
        { key: "hero.chip.behaviour", vars: { name: inputs.behaviourShortName } },
        { key: "hero.chip.positive_notes", vars: { n: positiveNotes } },
      ],
    };
  }

  // 7. Subject-cluster dominance - one cluster clearly ahead of the rest.
  const clusterAverages = CLUSTERS.map((c) => ({
    cluster: c,
    result: weightedClusterAverage(inputs.subjects, c.subjects),
  })).filter((c): c is { cluster: ClusterDef; result: { avg: number; count: number } } => c.result !== null);

  if (clusterAverages.length > 0) {
    clusterAverages.sort((a, b) => b.result.avg - a.result.avg);
    const top = clusterAverages[0];
    const second = clusterAverages[1];
    const margin = second ? top.result.avg - second.result.avg : top.result.avg;
    if (top.result.count >= 2 && margin >= 0.4) {
      return {
        ...CATALOG[top.cluster.id],
        id: top.cluster.id,
        evidence: [
          { key: top.cluster.avgChipKey, vars: { n: round1(top.result.avg) } },
          { key: "hero.chip.grades", vars: { n: top.result.count } },
        ],
      };
    }
  }

  // 8. Wszechstronny Talent - the fallback: nothing else stood out.
  const spread =
    clusterAverages.length >= 2
      ? clusterAverages[0].result.avg - clusterAverages[clusterAverages.length - 1].result.avg
      : 0;
  return {
    ...CATALOG.wszechstronny,
    id: "wszechstronny",
    evidence: [
      { key: "hero.chip.spread", vars: { n: round1(spread) } },
      { key: "hero.chip.subjects_count", vars: { n: gradedSubjects.length } },
    ],
  };
}

const HISTORY_STORAGE_PREFIX = "librus-hero-history:";
// Generous but bounded, same order of magnitude as achievements-card's own
// MAX_STORED - this is a "recent trend" log, not a full career record.
const HISTORY_MAX_STORED = 30;

export interface HeroHistoryEntry {
  id: string;
  when: string; // ISO timestamp
}

/**
 * Appends to the result-history log in `localStorage`, read by
 * `librus-hero-history-card` - ONLY when the result id actually changed
 * since the last recorded entry, so staying the same archetype for weeks
 * doesn't spam the log with a duplicate entry on every render. Call from
 * a lifecycle hook like `updated()`, never from `render()` itself (a Lit
 * render should stay a pure function of state - this is a side effect).
 * Never throws; a full/blocked localStorage just means history silently
 * stops growing, same degrade-quietly behaviour as `readAchievementCount`.
 */
export function recordHeroHistory(deviceId: string, resultId: string): void {
  try {
    const key = `${HISTORY_STORAGE_PREFIX}${deviceId}`;
    const raw = window.localStorage.getItem(key);
    const history: HeroHistoryEntry[] = raw ? JSON.parse(raw) : [];
    const last = history[history.length - 1];
    if (last && last.id === resultId) return;
    history.push({ id: resultId, when: new Date().toISOString() });
    window.localStorage.setItem(key, JSON.stringify(history.slice(-HISTORY_MAX_STORED)));
  } catch {
    /* private mode / storage disabled - history just doesn't grow this time */
  }
}

/** Read-only for `librus-hero-history-card` - oldest first, same order
 * they were recorded in. */
export function readHeroHistory(deviceId: string): HeroHistoryEntry[] {
  try {
    const raw = window.localStorage.getItem(`${HISTORY_STORAGE_PREFIX}${deviceId}`);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Read-only peek at `librus-achievements-card`'s own localStorage list
 * (`librus-achievements:<deviceId>`) - a deliberate, soft, read-only
 * coupling: if that card was never added to this dashboard the key simply
 * doesn't exist and this returns 0, which just means "Kolekcjoner" never
 * wins here rather than failing. Never written to from this card.
 */
export function readAchievementCount(deviceId: string): number {
  try {
    const raw = window.localStorage.getItem(`librus-achievements:${deviceId}`);
    if (!raw) return 0;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.length : 0;
  } catch {
    return 0;
  }
}
