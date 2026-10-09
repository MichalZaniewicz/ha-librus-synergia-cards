import type { LibrusHass } from "./types";

export const LIBRUS_PLATFORM = "librus_synergia";

/**
 * HA states meaning "no real value to show" - a genuinely unknown/
 * unavailable entity, or an empty string state. Shared by every card that
 * needs to treat these as an empty/loading state rather than a real
 * falsy value (was independently declared, byte-for-byte identical, in 9
 * separate card files before being extracted here).
 */
export const UNAVAILABLE = new Set(["unknown", "unavailable", ""]);

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

/**
 * Everything the cards look up in the entity registry, built in ONE pass
 * and shared by every card, the editor and the update checks. Keyed on the
 * `hass.entities` object: the frontend hands out a new `hass` on every
 * state change anywhere, but only a new `hass.entities` when the registry
 * itself changes (a rename, a reload, a device added) - so with dozens of
 * cards on a dashboard the registry is scanned once per registry change,
 * not once per card per render. Treat the returned lists/maps as read-only.
 */
export interface RegistryIndex {
  /** Devices owning at least one librus_synergia entity, in registry order. */
  deviceIds: string[];
  /** device_id -> translation_key -> entity_id (the last one per key). */
  keyMaps: Map<string, Record<string, string>>;
  /** device_id -> translation_key -> every entity_id with it (subject sensors share one key). */
  idsByKey: Map<string, Map<string, string[]>>;
  /** device_id -> every librus_synergia entity_id of that device. */
  entityIds: Map<string, string[]>;
  /** Every librus_synergia entity_id. */
  allEntityIds: string[];
}

const EMPTY_INDEX: RegistryIndex = {
  deviceIds: [],
  keyMaps: new Map(),
  idsByKey: new Map(),
  entityIds: new Map(),
  allEntityIds: [],
};
const INDEXES = new WeakMap<object, RegistryIndex>();

export function registryIndex(hass: LibrusHass): RegistryIndex {
  const registry = hass.entities;
  if (!registry) return EMPTY_INDEX;
  let index = INDEXES.get(registry);
  if (index) return index;
  index = { deviceIds: [], keyMaps: new Map(), idsByKey: new Map(), entityIds: new Map(), allEntityIds: [] };
  for (const entity of Object.values(registry)) {
    if (entity.platform !== LIBRUS_PLATFORM) continue;
    index.allEntityIds.push(entity.entity_id);
    const deviceId = entity.device_id;
    if (!deviceId) continue;
    let ids = index.entityIds.get(deviceId);
    let keyMap = index.keyMaps.get(deviceId);
    let byKey = index.idsByKey.get(deviceId);
    if (!ids || !keyMap || !byKey) {
      ids = [];
      keyMap = {};
      byKey = new Map();
      index.entityIds.set(deviceId, ids);
      index.keyMaps.set(deviceId, keyMap);
      index.idsByKey.set(deviceId, byKey);
      index.deviceIds.push(deviceId);
    }
    ids.push(entity.entity_id);
    const key = entity.translation_key;
    if (key) {
      keyMap[key] = entity.entity_id;
      const list = byKey.get(key);
      if (list) list.push(entity.entity_id);
      else byKey.set(key, [entity.entity_id]);
    }
  }
  INDEXES.set(registry, index);
  return index;
}

/** All device_ids that own at least one librus_synergia entity. */
export function findLibrusDeviceIds(hass: LibrusHass): string[] {
  return registryIndex(hass).deviceIds;
}

/** The display name of a device (the user's rename wins), else its id. */
export function deviceName(hass: LibrusHass, deviceId: string): string {
  const device = hass.devices?.[deviceId];
  return device?.name_by_user || device?.name || deviceId;
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
 * `mapAllByTranslationKey` below). The returned map is shared - don't
 * modify it.
 */
export function mapByTranslationKey(hass: LibrusHass, deviceId: string): Record<string, string> {
  return registryIndex(hass).keyMaps.get(deviceId) ?? {};
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
  // Entity ids come from the shared registry index; the subject name and id
  // are read from the CURRENT states on every call - a sensor that was
  // still loading (no `subject` yet) or a renamed subject shows its real
  // name as soon as the state has it, not only after a registry change.
  const ids = registryIndex(hass).idsByKey.get(deviceId)?.get(translationKey) ?? [];
  return ids
    .map((entityId) => {
      const attrs = hass.states[entityId]?.attributes as { subject?: string; subject_id?: number } | undefined;
      return { entityId, subject: attrs?.subject || entityId, subjectId: attrs?.subject_id };
    })
    .sort((a, b) => a.subject.localeCompare(b.subject));
}

/** Class register number ("nr w dzienniku"): the Class sensor's
 * `student_number` (backend 0.10.1+), else the Lucky number sensor's (it
 * carries none while Librus has no number published). */
export function studentNumberOf(hass: LibrusHass, map: Record<string, string>): number | undefined {
  for (const key of ["school_class", "lucky_number"]) {
    const v = map[key] ? hass.states[map[key]]?.attributes.student_number : undefined;
    if (typeof v === "number") return v;
  }
  return undefined;
}
