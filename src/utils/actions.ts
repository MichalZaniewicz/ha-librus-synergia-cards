import { handleAction, hasAction, type ActionConfig } from "custom-card-helpers";
import type { LibrusHass } from "./types";

type ActionHost = HTMLElement & { hass?: LibrusHass };

/**
 * A `@click` handler for a card's root `<ha-card>` that runs the config's
 * `tap_action` (navigate / more-info / url / call-service / none). Returns
 * `undefined` when there's nothing to do, so the card can leave the
 * listener off entirely and keep its normal (non-pointer) cursor.
 *
 * `more-info` needs a target entity - pass the card's primary entity id.
 */
export function tapActionHandler(
  host: ActionHost,
  tapAction: ActionConfig | undefined,
  entityId?: string
): ((ev: Event) => void) | undefined {
  if (!tapAction || !hasAction(tapAction)) return undefined;
  return (ev: Event) => {
    if (!host.hass) return;
    ev.stopPropagation();
    handleAction(host, host.hass, { tap_action: tapAction, entity: entityId }, "tap");
  };
}

/** True when the card should show a pointer cursor / actionable affordance. */
export function isActionable(tapAction: ActionConfig | undefined): boolean {
  return hasAction(tapAction);
}
