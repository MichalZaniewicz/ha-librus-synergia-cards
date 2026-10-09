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

/**
 * Downloads one message attachment straight to this device, through the
 * integration's logged-in endpoint `/api/librus_synergia/attachment/...`
 * (integration 0.12.0+). Nothing is saved in Home Assistant and the message
 * isn't opened in Librus. The browser saves it under the file's own name.
 */
export async function downloadAttachment(
  hass: LibrusHass,
  deviceId: string,
  messageId: string,
  attachmentId: string,
  fallbackName: string
): Promise<void> {
  await downloadFile(
    hass,
    `/api/librus_synergia/attachment/${encodeURIComponent(deviceId)}/${encodeURIComponent(
      messageId
    )}/${encodeURIComponent(attachmentId)}`,
    fallbackName
  );
}

/** A file attached to a homework assignment, through `/api/librus_synergia/homework_attachment/...`. */
export async function downloadHomeworkAttachment(
  hass: LibrusHass,
  deviceId: string,
  attachmentId: string,
  fallbackName: string
): Promise<void> {
  await downloadFile(
    hass,
    `/api/librus_synergia/homework_attachment/${encodeURIComponent(deviceId)}/${encodeURIComponent(
      attachmentId
    )}`,
    fallbackName
  );
}

async function downloadFile(hass: LibrusHass, path: string, fallbackName: string): Promise<void> {
  const withAuth = hass as unknown as {
    fetchWithAuth?: (path: string, init?: RequestInit) => Promise<Response>;
    auth?: { data?: { access_token?: string } };
  };
  const response = withAuth.fetchWithAuth
    ? await withAuth.fetchWithAuth(path)
    : await fetch(path, { headers: { Authorization: `Bearer ${withAuth.auth?.data?.access_token ?? ""}` } });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filenameFrom(response.headers.get("Content-Disposition")) ?? fallbackName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

/** The file name from a Content-Disposition header (`filename*` first). */
function filenameFrom(header: string | null): string | null {
  if (!header) return null;
  const star = /filename\*=UTF-8''([^;]+)/i.exec(header);
  if (star) {
    try {
      return decodeURIComponent(star[1]);
    } catch {
      /* fall through */
    }
  }
  const plain = /filename="?([^";]+)"?/i.exec(header);
  return plain ? plain[1] : null;
}
