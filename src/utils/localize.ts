import { en } from "../translations/en";
import { pl } from "../translations/pl";
import type { LibrusHass } from "./types";

export type TranslationKey = keyof typeof en;

const LANGUAGES: Record<string, Record<TranslationKey, string>> = {
  en,
  pl,
};

function dictFor(hass: LibrusHass | undefined): Record<TranslationKey, string> {
  const raw = hass?.language ?? "en";
  const base = raw.split("-")[0]?.toLowerCase();
  return LANGUAGES[base] ?? en;
}

/** Plain `{name}` substitution - no ICU plural rules, matches this card family's scope. */
export function t(
  hass: LibrusHass | undefined,
  key: TranslationKey,
  vars?: Record<string, string | number>
): string {
  let str = dictFor(hass)[key] ?? en[key];
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replace(`{${k}}`, String(v));
    }
  }
  return str;
}

/**
 * Locale-aware "in X" countdown, picking minutes/hours(+minutes)/days(+hours)
 * granularity by magnitude - "in 612 min" for a lesson ~10h away is much
 * harder to read at a glance than "in 10h 12m".
 */
export function formatCountdown(hass: LibrusHass | undefined, totalMinutes: number): string {
  const minutes = Math.max(0, Math.round(totalMinutes));
  if (minutes < 60) {
    return t(hass, "label.in_minutes", { minutes });
  }
  if (minutes < 60 * 24) {
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    return rest === 0
      ? t(hass, "label.in_hours", { hours })
      : t(hass, "label.in_hours_minutes", { hours, minutes: rest });
  }
  const days = Math.floor(minutes / (60 * 24));
  const hours = Math.floor((minutes % (60 * 24)) / 60);
  return hours === 0
    ? t(hass, "label.in_days", { days })
    : t(hass, "label.in_days_hours", { days, hours });
}

/** Picks a `*_one` / `*_other` key pair by count - a two-way plural split. */
export function tPlural(
  hass: LibrusHass | undefined,
  count: number,
  oneKey: TranslationKey,
  otherKey: TranslationKey,
  vars?: Record<string, string | number>
): string {
  return t(hass, count === 1 ? oneKey : otherKey, { count, ...vars });
}
