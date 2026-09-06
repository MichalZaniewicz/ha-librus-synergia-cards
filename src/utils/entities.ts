import type { LibrusHass } from "./types";

export const LIBRUS_PLATFORM = "librus_synergia";

export type LibrusConfigErrorCode = "no_device" | "multiple_devices" | "device_missing";

/**
 * Thrown for configuration problems that should render as a friendly card
 * error, not a crash. Carries a code rather than a pre-localized message -
 * the message text is decided at the point that has access to `hass` (see
 * `LibrusBaseCard._resolveEntities`), so it can be translated.
 */
export class LibrusConfigError extends Error {
  constructor(
    public readonly code: LibrusConfigErrorCode,
    public readonly deviceId?: string
  ) {
    super(code);
  }
}

/** All device_ids that own at least one librus_synergia entity. */
export function findLibrusDeviceIds(hass: LibrusHass): string[] {
  const ids = new Set<string>();
  for (const entity of Object.values(hass.entities ?? {})) {
    if (entity.platform === LIBRUS_PLATFORM && entity.device_id) {
      ids.add(entity.device_id);
    }
  }
  return [...ids];
}

/**
 * Resolves which Librus device (student) a card instance should read from.
 * Zero-config works for the common case (one child's e-dziennik); a second
 * child only requires `device_id` once it's actually ambiguous.
 */
export function resolveLibrusDevice(hass: LibrusHass, configuredDeviceId?: string): string {
  const devices = findLibrusDeviceIds(hass);

  if (configuredDeviceId) {
    if (!devices.includes(configuredDeviceId)) {
      throw new LibrusConfigError("device_missing", configuredDeviceId);
    }
    return configuredDeviceId;
  }

  if (devices.length === 1) return devices[0];
  if (devices.length === 0) {
    throw new LibrusConfigError("no_device");
  }
  throw new LibrusConfigError("multiple_devices");
}

/**
 * `translation_key` on this integration's sensors/calendars equals their
 * internal key (`lucky_number`, `attendance`, `agenda`, ...), so it doubles
 * as a stable, language-independent lookup - unlike entity_id, which is
 * derived from the user's localized friendly name. Assumes at most one
 * entity per key, which holds for every key except `subject_average` (see
 * `mapAllByTranslationKey` below).
 */
export function mapByTranslationKey(hass: LibrusHass, deviceId: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const entity of Object.values(hass.entities ?? {})) {
    if (
      entity.device_id === deviceId &&
      entity.platform === LIBRUS_PLATFORM &&
      entity.translation_key
    ) {
      map[entity.translation_key] = entity.entity_id;
    }
  }
  return map;
}

/**
 * `subject_average` is the ONE translation_key shared by every
 * dynamically-discovered per-subject sensor (`sensor.py`'s
 * `LibrusSubjectAverageSensor` - one instance per subject Librus reports,
 * all with the same translation_key). The resolved subject NAME comes
 * from each entity's own `subject` attribute (CONFIRMED via
 * ha-librus-synergia v0.4.7) - not from the entity's `friendly_name`,
 * which is built from a per-language translation string ("{subject}
 * average" in English, "Średnia - {subject}" in Polish) and would need
 * per-language parsing to pull the name back out.
 */
export interface SubjectEntity {
  entityId: string;
  subject: string;
  /** The numeric Librus subject id (from the entity's own `subject_id`
   * attribute) - NOT derivable from `entity_id`, which is a user-renameable
   * slug of the friendly name, not the sensor's internal unique_id suffix. */
  subjectId?: number;
}

export function mapAllByTranslationKey(
  hass: LibrusHass,
  deviceId: string,
  translationKey: string
): SubjectEntity[] {
  const result: SubjectEntity[] = [];
  for (const entity of Object.values(hass.entities ?? {})) {
    if (
      entity.device_id === deviceId &&
      entity.platform === LIBRUS_PLATFORM &&
      entity.translation_key === translationKey
    ) {
      const state = hass.states[entity.entity_id];
      const attrs = state?.attributes as { subject?: string; subject_id?: number } | undefined;
      result.push({
        entityId: entity.entity_id,
        subject: attrs?.subject || entity.entity_id,
        subjectId: attrs?.subject_id,
      });
    }
  }
  return result.sort((a, b) => a.subject.localeCompare(b.subject));
}
