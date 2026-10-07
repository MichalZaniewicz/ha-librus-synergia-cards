import type { LibrusHass } from "./types";

/** Shape returned by the `librus_synergia.get_message` service - see that
 * integration's `services.py`. `attachments` requires integration 0.7.2+ -
 * absent (not an empty array) on an older backend, so callers must use
 * optional chaining rather than assuming it's always present. */
export interface FullMessage {
  id: string;
  mailbox: string;
  sender: string;
  topic: string;
  content: string;
  send_date: string | null;
  read_date: string | null;
  has_attachment: boolean;
  attachments?: { id: string; filename: string | null }[];
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

/** Result of `librus_synergia.download_attachment` (integration 0.11.1+). */
export interface DownloadedAttachment {
  filename: string;
  content_type: string;
  size: number;
  path: string;
  media_content_id: string;
}

/**
 * Downloads one message attachment into Home Assistant's media folder via
 * `librus_synergia.download_attachment` (doesn't open the message in
 * Librus) and returns a signed URL the browser can open, via
 * `media_source/resolve_media`.
 */
export async function downloadAttachment(
  hass: LibrusHass,
  deviceId: string,
  messageId: string,
  attachmentId: string
): Promise<string> {
  const result = await hass.callWS<{ response: DownloadedAttachment }>({
    type: "call_service",
    domain: "librus_synergia",
    service: "download_attachment",
    service_data: { device_id: deviceId, message_id: messageId, attachment_id: attachmentId },
    return_response: true,
  });
  const resolved = await hass.callWS<{ url: string }>({
    type: "media_source/resolve_media",
    media_content_id: result.response.media_content_id,
  });
  return resolved.url;
}
