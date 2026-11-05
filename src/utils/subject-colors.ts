import type { LibrusCardConfig, LibrusHass } from "./types";
import { mapByTranslationKey } from "./entities";

/** A subject name as the integration compares them: case, Polish letters
 * and extra spaces don't matter ("Język  polski" = "jezyk polski"). */
function subjectKey(name: string): string {
  return name
    .replace(/ł/g, "l")
    .replace(/Ł/g, "L")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .join(" ");
}

type Colorer = (subject: string | null | undefined) => string | undefined;

const NONE: Colorer = () => undefined;
const cache = new WeakMap<object, Map<string, string>>();

/**
 * The colour of each subject, the same in every card (integration 0.12.43+):
 * the School sensor's `subject_colors` (picked under Configure) win, else
 * `subject_palette`'s slot of the cards' 16-colour palette
 * (`--lc-chart-1..16`, so it follows the light/dark theme). Undefined for a
 * subject the integration doesn't list (an activity, a merged "A + B"
 * slot), with an older integration, and when the card's
 * `hide_subject_colors` is on - the card then looks as before.
 */
export function subjectColorer(
  hass: LibrusHass,
  deviceId: string | undefined,
  config: LibrusCardConfig | undefined
): Colorer {
  if (!deviceId || config?.hide_subject_colors) return NONE;
  const schoolId = mapByTranslationKey(hass, deviceId).school;
  const state = schoolId ? hass.states[schoolId] : undefined;
  if (!state) return NONE;
  let colors = cache.get(state);
  if (!colors) {
    colors = new Map();
    const palette = (state.attributes.subject_palette ?? {}) as Record<string, number>;
    const picked = (state.attributes.subject_colors ?? {}) as Record<string, string>;
    for (const [name, slot] of Object.entries(palette)) {
      if (Number.isInteger(slot) && slot >= 1 && slot <= 16) colors.set(subjectKey(name), `var(--lc-chart-${slot})`);
    }
    for (const [name, color] of Object.entries(picked)) {
      if (typeof color === "string" && color) colors.set(subjectKey(name), color);
    }
    cache.set(state, colors);
  }
  if (colors.size === 0) return NONE;
  const map = colors;
  return (subject) => (subject ? map.get(subjectKey(subject)) : undefined);
}
