import { html, css, nothing, type TemplateResult } from "lit";
import { t } from "./localize";
import type { LibrusHass } from "./types";
import { downloadHomeworkAttachment } from "./services";

/** A file a teacher attached to a homework assignment (newer integration). */
export interface HomeworkFile {
  id: string;
  filename: string | null;
}

export type FileState = Record<string, "loading" | "error">;

/**
 * Download one homework file; `setState` gets the new per-file state map.
 * Stops the click so a surrounding row (e.g. a checklist tick) isn't toggled.
 */
export async function downloadHomeworkFile(
  ev: Event,
  hass: LibrusHass,
  deviceId: string,
  file: HomeworkFile,
  state: FileState,
  setState: (next: FileState) => void
): Promise<void> {
  ev.stopPropagation();
  setState({ ...state, [file.id]: "loading" });
  try {
    await downloadHomeworkAttachment(hass, deviceId, file.id, file.filename ?? file.id);
    const next = { ...state };
    delete next[file.id];
    setState(next);
  } catch {
    setState({ ...state, [file.id]: "error" });
  }
}

/** The list of a homework's files, each a download button. */
export function renderHomeworkFiles(
  hass: LibrusHass,
  files: HomeworkFile[] | undefined,
  state: FileState,
  onDownload: (ev: Event, file: HomeworkFile) => void
): TemplateResult | typeof nothing {
  if (!files?.length) return nothing;
  return html`
    <div class="files">
      ${files.map((file) => {
        const fileState = state[file.id];
        return html`<button
          class="file"
          type="button"
          ?disabled=${fileState === "loading"}
          @click=${(ev: Event) => onDownload(ev, file)}
          @keydown=${(ev: KeyboardEvent) => ev.stopPropagation()}
        >
          <ha-icon icon=${fileState === "loading" ? "mdi:progress-download" : "mdi:paperclip"}></ha-icon>
          <span class="file-name">${file.filename ?? file.id}</span>
          ${fileState === "error"
            ? html`<span class="file-error">${t(hass, "card.homework_checklist.file_error")}</span>`
            : nothing}
        </button>`;
      })}
    </div>
  `;
}

export const homeworkFileStyles = css`
  .files {
    margin-top: 4px;
  }
  .file {
    display: flex;
    align-items: center;
    gap: 4px;
    font: inherit;
    font-size: 0.75rem;
    color: var(--lc-brand);
    background: none;
    border: 0;
    padding: 2px 0;
    cursor: pointer;
    text-align: left;
  }
  .file:disabled {
    cursor: progress;
    opacity: 0.7;
  }
  .file ha-icon {
    --mdc-icon-size: 14px;
    flex: none;
  }
  .file-name {
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .file-error {
    color: var(--lc-bad);
    margin-left: 6px;
  }
`;
