import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { t } from "./utils/localize";
import { librusCardEditor } from "./utils/card-editor";
import { formatShortDate } from "./utils/format";
import { downloadSchoolFile, DownloadHttpError } from "./utils/services";

/** One document in the School documents sensor's `recent` attribute. */
interface SchoolDocument {
  id: string;
  name: string;
  added: string | null;
  url: string | null;
}

/** A document counts as new for this many days after it was added. */
const NEW_DAYS = 7;

/** The document's Synergia link, only if it's a plain web address (never
 * e.g. a `javascript:` one) - used as an `href` and opened in a new tab. */
function webUrl(doc: SchoolDocument): string | undefined {
  return doc.url && /^https?:\/\//i.test(doc.url) ? doc.url : undefined;
}

/**
 * Forms and regulations the school shares with parents. A tap downloads the
 * document through Home Assistant (integration 0.12.5+) - its Synergia link
 * only works in a browser logged in to Synergia. When the download answers
 * 404 (an older integration without the download view), the card opens that
 * document's link instead, and from then on renders that one row as a plain
 * link so its tab opens straight from the tap (a `window.open` after an
 * await can be stopped by popup blockers). Other rows keep downloading.
 */
@customElement("librus-school-documents-card")
export class LibrusSchoolDocumentsCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  /** Per-document download state; "link" = the download answered 404, the
   * row links to Synergia now. */
  @state() private _fileState: Record<string, "loading" | "error" | "link"> = {};

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-school-documents-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 4;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const hass = this.hass;
    const deviceId = resolved.deviceId;
    const entityId = resolved.map["school_documents"];
    const entity = entityId ? hass.states[entityId] : undefined;
    const icon = "mdi:file-document-multiple-outline";
    if (!entity) return this._message(icon, t(hass, "card.school_documents.requires"));

    const documents = (entity.attributes.recent as SchoolDocument[] | undefined) ?? [];
    const title = this._config.title ?? t(hass, "card.school_documents.title");
    if (documents.length === 0) {
      return this._message(icon, title, t(hass, "card.school_documents.empty"));
    }
    const fresh = documents.filter((d) => this._isNew(d)).length;
    const shown = documents.slice(0, this._config.max_items ?? 6);
    const subtitle = fresh
      ? t(hass, "card.school_documents.subtitle_new", { count: documents.length, fresh })
      : t(hass, "card.school_documents.subtitle", { count: documents.length });

    return html`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge"><ha-icon icon=${icon}></ha-icon></div>
          <div class="title-block">
            <div class="title">${title}</div>
            <div class="subtitle">${subtitle}</div>
          </div>
        </div>
        <div class="docs">
          ${shown.map((doc) => {
            const isNew = this._isNew(doc);
            const link = this._fileState[doc.id] === "link" ? webUrl(doc) : undefined;
            const body = html`
              <span class="file ${isNew ? "new" : ""}"><ha-icon icon="mdi:file-document-outline"></ha-icon></span>
              <span class="body">
                <span class="row1">
                  <span class="name">${doc.name}</span>
                  ${isNew ? html`<span class="pill">${t(hass, "card.school_documents.new")}</span>` : nothing}
                </span>
                ${doc.added
                  ? html`<span class="meta"
                      >${t(hass, "card.school_documents.added", {
                        date: formatShortDate(doc.added, hass.language),
                      })}</span
                    >`
                  : nothing}
              </span>
              ${this._fileState[doc.id] === "error"
                ? html`<span class="doc-error">${t(hass, "card.school_documents.download_error")}</span>`
                : nothing}
              <ha-icon
                class="open"
                icon=${link
                  ? "mdi:open-in-new"
                  : this._fileState[doc.id] === "loading"
                    ? "mdi:progress-download"
                    : "mdi:download"}
              ></ha-icon>
            `;
            if (link) {
              return html`<a class="doc" href=${link} target="_blank" rel="noopener noreferrer">
                ${body}
              </a>`;
            }
            return html`<button
              class="doc"
              type="button"
              ?disabled=${this._fileState[doc.id] === "loading"}
              @click=${() => this._download(deviceId, doc)}
            >
              ${body}
            </button>`;
          })}
        </div>
      </ha-card>
    `;
  }

  private async _download(deviceId: string, doc: SchoolDocument): Promise<void> {
    if (!this.hass) return;
    this._fileState = { ...this._fileState, [doc.id]: "loading" };
    try {
      await downloadSchoolFile(this.hass, deviceId, doc.id, doc.name);
      const next = { ...this._fileState };
      delete next[doc.id];
      this._fileState = next;
    } catch (err) {
      // A 404 (an integration older than 0.12.5 has no download view, or
      // this document can't be fetched) falls back to this document's
      // Synergia page; any other failure is a real error.
      const url = webUrl(doc);
      if (err instanceof DownloadHttpError && err.status === 404 && url) {
        // Usually still allowed right after the tap; if a popup blocker
        // stops it, the row is a plain link now and the next tap opens it.
        window.open(url, "_blank", "noopener,noreferrer");
        this._fileState = { ...this._fileState, [doc.id]: "link" };
      } else {
        this._fileState = { ...this._fileState, [doc.id]: "error" };
      }
    }
  }

  private _isNew(doc: SchoolDocument): boolean {
    if (!doc.added) return false;
    const added = new Date(doc.added.replace(" ", "T"));
    if (Number.isNaN(added.getTime())) return false;
    return Date.now() - added.getTime() < NEW_DAYS * 86_400_000;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .docs {
        display: grid;
        gap: 4px;
      }
      .doc {
        display: flex;
        gap: 10px;
        align-items: center;
        padding: 6px;
        margin: 0 -6px;
        border-radius: 10px;
        color: inherit;
        text-decoration: none;
        /* A button (the download goes through Home Assistant), or a link
           with an integration older than 0.12.5. */
        width: calc(100% + 12px);
        box-sizing: border-box;
        background: none;
        border: 0;
        font: inherit;
        text-align: left;
        cursor: pointer;
      }
      .doc:disabled {
        cursor: progress;
      }
      .doc-error {
        font-size: 0.72rem;
        color: var(--lc-bad);
        white-space: nowrap;
      }
      .doc:hover {
        background: var(--lc-chip-bg);
      }
      .doc:focus-visible {
        outline: 2px solid var(--lc-brand);
      }
      .file {
        width: 32px;
        height: 32px;
        flex: none;
        border-radius: 8px;
        background: var(--lc-chip-bg);
        color: var(--secondary-text-color);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .file.new {
        background: var(--lc-brand-bg);
        color: var(--lc-brand);
      }
      .file ha-icon {
        --mdc-icon-size: 18px;
      }
      .body {
        flex: 1;
        min-width: 0;
        display: grid;
        gap: 1px;
      }
      .row1 {
        align-items: center;
      }
      .name {
        min-width: 0;
        overflow-wrap: anywhere;
      }
      .pill {
        font-size: 0.64rem;
        font-weight: 700;
        border-radius: 999px;
        padding: 2px 8px;
        background: var(--lc-brand-bg);
        color: var(--lc-brand-strong);
        white-space: nowrap;
        flex: none;
      }
      .meta {
        font-size: 0.7rem;
        color: var(--secondary-text-color);
      }
      .open {
        --mdc-icon-size: 16px;
        color: var(--secondary-text-color);
        flex: none;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-school-documents-card": LibrusSchoolDocumentsCard;
  }
}
