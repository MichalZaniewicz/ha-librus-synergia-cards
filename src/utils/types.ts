import type { ActionConfig, HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

// custom-card-helpers' Themes type predates `darkMode`, which the real
// frontend has sent for years - augment rather than casting at every call site.
declare module "custom-card-helpers" {
  interface Themes {
    darkMode?: boolean;
  }
}

/**
 * Card config. `device_id` is the only field every card reads; the rest
 * are optional per-card overrides surfaced by `librus-card-editor` (see
 * `utils/card-editor.ts` for which card exposes which). All optional, so
 * a bare `{ type: ... }` stays valid.
 */
export interface LibrusCardConfig extends LovelaceCardConfig {
  device_id?: string;
  /** Header title override. */
  title?: string;
  /** Numeric Librus subject id, for the per-subject cards. */
  subject_id?: number;
  /** Row cap for the list cards. */
  max_items?: number;
  /** Forward-looking window, in days (Agenda). */
  days_ahead?: number;
  /** History window, in days (grade trend). */
  days?: number;
  /** Target average for the grade-goal card. */
  target?: number;
  /** Which mailbox the Messages card reads. */
  mailbox?: string;
  /** Tap behaviour for the glanceable cards (navigate / more-info / url / call-service).
   * Configured via YAML - see the README. */
  tap_action?: ActionConfig;
}

/** Entity registry entry shape available on `hass.entities` (HA 2024.8+). */
export interface EntityRegistryEntry {
  entity_id: string;
  device_id?: string;
  platform?: string;
  translation_key?: string;
  hidden?: boolean;
  disabled_by?: string | null;
}

export interface DeviceRegistryEntry {
  id: string;
  name?: string;
  name_by_user?: string | null;
}

/**
 * `custom-card-helpers`'s HomeAssistant type predates the entity/device
 * registry dictionaries the frontend now exposes - extend it locally
 * rather than widening every call site to `any`.
 */
export interface LibrusHass extends HomeAssistant {
  entities: Record<string, EntityRegistryEntry>;
  devices: Record<string, DeviceRegistryEntry>;
}
