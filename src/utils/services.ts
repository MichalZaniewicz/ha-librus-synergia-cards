import type { LibrusHass } from "./types";

/** Shape returned by the `librus_synergia.get_message` service - see that
 * integration's `services.py`. */
export interface FullMessage {
  id: string;
  mailbox: string;
  sender: string;
  topic: string;
  content: string;
  send_date: string | null;
  read_date: string | null;
  has_attachment: boolean;
}

/**
 * Calls `librus_synergia.get_message` for one message's full, untruncated
 * content. CONFIRMED (integration README/changelog): this marks the
 * message read on Librus's own servers - only call it in direct response
 * to a person explicitly opening a specific message, never automatically.
 *
 * `mailbox` defaults to "inbox" - pass "substitutions"/"alerts" for a
 * message from the Unread messages sensor's `substitutions_recent`/
 * `alerts_recent` attributes (requires integration 0.4.13+).
 *
 * Uses the raw `call_service` WebSocket command (via `hass.callWS`, not
 * `hass.callService`) because only the WS command supports
 * `return_response` - `callService` in `custom-card-helpers`'s type
 * doesn't surface a service's response data at all.
 */
export async function fetchFullMessage(
  hass: LibrusHass,
  deviceId: string,
  messageId: string,
  mailbox = "inbox"
): Promise<FullMessage> {
  const result = await hass.callWS<{ response: FullMessage }>({
    type: "call_service",
    domain: "librus_synergia",
    service: "get_message",
    service_data: { device_id: deviceId, message_id: messageId, mailbox },
    return_response: true,
  });
  return result.response;
}
