import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { t } from "./utils/localize";
import { librusCardEditor } from "./utils/card-editor";
import { formatShortDate } from "./utils/format";

/** One document in the School documents sensor's `recent` attribute. */
interface SchoolDocument {
  id: string;
  name: string;
  added: string | null;
  url: string | null;
}

/** A document counts as new for this many days after it was added. */
const NEW_DAYS = 7;

/**
 * Forms and regulations the school shares with parents. A tap opens the
 * document in Synergia (where the parent is logged in).
 */
@customElement("librus-school-documents-card")
export class LibrusSchoolDocumentsCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

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
              ${doc.url ? html`<ha-icon class="open" icon="mdi:open-in-new"></ha-icon>` : nothing}
            `;
            return doc.url
              ? html`<a class="doc" href=${doc.url} target="_blank" rel="noopener noreferrer">${body}</a>`
              : html`<div class="doc">${body}</div>`;
          })}
        </div>
      </ha-card>
    `;
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
      }
      a.doc:hover {
        background: var(--lc-chip-bg);
      }
      a.doc:focus-visible {
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
