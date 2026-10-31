import type { TranslationKey } from "./localize";
import { CLUSTERS, weightedClusterAverage, type SubjectStat } from "./hero-archetypes";

export interface HeroStat {
  id: "sila" | "intelekt" | "wiedza" | "charyzma" | "wytrwalosc" | "szczescie";
  labelKey: TranslationKey;
  icon: string;
  /** Always 0-10, regardless of the underlying Librus 1-6 grade scale -
   * this is a stat sheet, not another grade average. */
  value: number;
}

// Standard Polish 6-tier "ocena zachowania" (behaviour grade) scale, set by
// national curriculum regulation, not Librus- or school-specific - safe to
// hardcode. An unrecognised short_name (a school-specific custom label)
// falls back to a middling 5 rather than 0, so an odd school setup doesn't
// read as "worst possible conduct" by default.
const BEHAVIOUR_TIER_VALUE: Record<string, number> = {
  wz: 10, // wzorowe
  bdb: 8, // bardzo dobre
  db: 6, // dobre
  popr: 4, // poprawne
  ndp: 2, // nieodpowiednie
  ng: 0, // naganne
};

/** Attendance % that counts as zero perseverance. */
const ATTENDANCE_FLOOR = 80;

const RANK_TIER_VALUE: Record<string, number> = {
  diamond: 10,
  gold: 7.5,
  silver: 5,
  bronze: 2.5,
};

export interface HeroStatsInputs {
  subjects: SubjectStat[];
  /** Attendance % of the current semester (0-100). */
  attendancePercent: number | null;
  behaviourShortName: string | null;
  rankTier: string | null;
}

function clusterStat(subjects: SubjectStat[], clusterId: string): number {
  const cluster = CLUSTERS.find((c) => c.id === clusterId);
  if (!cluster) return 0;
  const result = weightedClusterAverage(subjects, cluster.subjects);
  return result ? Math.round(((result.avg / 6) * 10 + Number.EPSILON) * 10) / 10 : 0;
}

/** Six RPG-style stats (0-10), each from exactly one real signal already
 * exposed by other sensors - deterministic, same data always gives the
 * same numbers. See `hero-archetypes.ts` for the sibling "one overall
 * result" computation this shares the subject-cluster logic with. */
export function computeHeroStats(inputs: HeroStatsInputs): HeroStat[] {
  // Perseverance = attendance: 80% or less is 0, 100% is 10. A single
  // excused absence used to zero a "days in a row" streak (found live).
  const attendanceStat =
    inputs.attendancePercent !== null
      ? Math.round(Math.min(10, Math.max(0, ((inputs.attendancePercent - ATTENDANCE_FLOOR) / (100 - ATTENDANCE_FLOOR)) * 10)) * 10) / 10
      : 0;
  const behaviourStat = inputs.behaviourShortName
    ? (BEHAVIOUR_TIER_VALUE[inputs.behaviourShortName] ?? 5)
    : 0;
  const rankStat = inputs.rankTier ? (RANK_TIER_VALUE[inputs.rankTier] ?? 0) : 0;

  return [
    { id: "sila", labelKey: "hero_stat.sila", icon: "mdi:arm-flex-outline", value: clusterStat(inputs.subjects, "sportowiec") },
    { id: "intelekt", labelKey: "hero_stat.intelekt", icon: "mdi:flask-outline", value: clusterStat(inputs.subjects, "naukowiec") },
    { id: "wiedza", labelKey: "hero_stat.wiedza", icon: "mdi:book-open-page-variant-outline", value: clusterStat(inputs.subjects, "humanista") },
    { id: "charyzma", labelKey: "hero_stat.charyzma", icon: "mdi:hand-heart-outline", value: behaviourStat },
    { id: "wytrwalosc", labelKey: "hero_stat.wytrwalosc", icon: "mdi:shield-check-outline", value: attendanceStat },
    { id: "szczescie", labelKey: "hero_stat.szczescie", icon: "mdi:clover-outline", value: rankStat },
  ];
}
