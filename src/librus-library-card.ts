import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { t } from "./utils/localize";
import { librusCardEditor } from "./utils/card-editor";
import { daysBetween, formatShortDate } from "./utils/format";
import { activateOnKey } from "./utils/render-helpers";

/** One book in the Library books sensor's `books` attribute. */
interface LibraryBook {
  id: string;
  title: string;
  author: string;
  lent_on: string | null;
}

/** The return reminder turns amber this many days before the year ends. */
const REMIND_DAYS = 30;
/** Spine colors - the 16-color chart palette, picked per title so a book
 * keeps its color between refreshes. */
const SPINES = 16;
/** Spine heights (% of the shelf), cycled so the row looks like real books. */
const HEIGHTS = [88, 80, 92, 76, 84, 90, 78, 86, 74, 82, 70, 88];

function spineColor(title: string): string {
  let hash = 0;
  for (const ch of title) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return `var(--lc-chart-${(hash % SPINES) + 1})`;
}

/**
 * Books the school library lent to the student (integration 0.12.10+).
 * Two styles, picked in the editor: a list (`style: list`, default) or
 * book spines on a shelf (`style: shelf`) that a tap opens into the same
 * list. Librus's own due date is left out on purpose - for the textbooks
 * lent for the whole year it's a nominal date that has usually passed -
 * the card counts down to the end of the school year (Class sensor)
 * instead and turns amber in its last REMIND_DAYS days.
 */
@customElement("librus-library-card")
export class LibrusLibraryCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  /** Shelf style: whether the full list is open below the shelf. */
  @state() private _open = false;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-library-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 4;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    // Only the day count changes on its own - once an hour is plenty.
    this._every(60 * 60_000, () => this.requestUpdate());
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { map } = resolved;
    const hass = this.hass;
    const icon = "mdi:bookshelf";
    const entity = map.library_books ? hass.states[map.library_books] : undefined;
    if (!entity) return this._message(icon, t(hass, "card.library.requires"));

    const books = (entity.attributes.books as LibraryBook[] | undefined) ?? [];
    const title = this._config.title ?? t(hass, "card.library.title");
    if (books.length === 0) return this._message(icon, title, t(hass, "card.library.empty"));

    const cls = map.school_class ? hass.states[map.school_class] : undefined;
    const yearEndIso = cls?.attributes.school_year_end as string | undefined;
    const daysLeft = yearEndIso
      ? Math.max(0, daysBetween(new Date(), new Date(`${yearEndIso.slice(0, 10)}T00:00:00`)))
      : undefined;
    const soon = daysLeft !== undefined && daysLeft <= REMIND_DAYS;
    const lentDates = books.map((b) => b.lent_on).filter((d): d is string => !!d).sort();
    const shelf = this._config.style === "shelf";

    const subtitle = shelf
      ? t(hass, "card.library.subtitle_shelf")
      : lentDates.length
        ? t(hass, "card.library.subtitle", {
            count: books.length,
            date: formatShortDate(lentDates[0], hass.language),
          })
        : t(hass, "card.library.count", { count: books.length });

    return html`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon=${icon}></ha-icon></div>
          <div class="title-block">
            <div class="title">${title}</div>
            <div class="subtitle">${subtitle}</div>
          </div>
        </div>
        ${shelf ? this._renderShelf(books, lentDates, daysLeft) : nothing}
        ${daysLeft !== undefined && (!shelf || soon) ? this._renderReminder(books.length, daysLeft, yearEndIso!, soon) : nothing}
        ${!shelf || this._open ? this._renderList(books) : nothing}
      </ha-card>
    `;
  }

  private _renderShelf(books: LibraryBook[], lentDates: string[], daysLeft: number | undefined): TemplateResult {
    const hass = this.hass!;
    const toggle = () => (this._open = !this._open);
    return html`
      <div
        class="shelf"
        role="button"
        tabindex="0"
        aria-expanded=${this._open ? "true" : "false"}
        aria-label=${t(hass, "card.library.toggle")}
        @click=${toggle}
        @keydown=${activateOnKey(toggle)}
      >
        ${books.map(
          (b, i) => html`<span
            class="spine"
            title=${b.author ? `${b.title} · ${b.author}` : b.title}
            style="background:${spineColor(b.title)};height:${HEIGHTS[i % HEIGHTS.length]}%"
            ><span>${b.title}</span></span
          >`
        )}
      </div>
      <div class="shelf-stats">
        <span>${t(hass, "card.library.count", { count: books.length })}</span>
        ${lentDates.length
          ? html`<span>${t(hass, "card.library.lent", { date: formatShortDate(lentDates[0], hass.language) })}</span>`
          : nothing}
        ${daysLeft !== undefined
          ? html`<span>${t(hass, "card.library.year_ends_in", { days: daysLeft })}</span>`
          : nothing}
      </div>
    `;
  }

  private _renderReminder(count: number, daysLeft: number, yearEndIso: string, soon: boolean): TemplateResult {
    const hass = this.hass!;
    return html`<div class="reminder ${soon ? "soon" : ""}">
      <ha-icon icon="mdi:book-clock-outline"></ha-icon>
      <span
        >${soon
          ? t(hass, "card.library.return_soon", { days: daysLeft, count })
          : t(hass, "card.library.return_by", {
              date: formatShortDate(yearEndIso, hass.language),
              days: daysLeft,
            })}</span
      >
    </div>`;
  }

  private _renderList(books: LibraryBook[]): TemplateResult {
    const hass = this.hass!;
    return html`<div class="books scroll-list">
      ${books.map(
        (b) => html`<div class="book">
          <span class="dot" style="background:${spineColor(b.title)}"></span>
          <div class="body">
            <div class="book-title">${b.title}</div>
            <div class="meta">
              ${[
                b.author,
                b.lent_on ? t(hass, "card.library.lent", { date: formatShortDate(b.lent_on, hass.language) }) : "",
              ]
                .filter(Boolean)
                .join(" · ")}
            </div>
          </div>
        </div>`
      )}
    </div>`;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .reminder {
        display: flex;
        align-items: center;
        gap: 8px;
        border-radius: 9px;
        padding: 7px 10px;
        font-size: 0.78rem;
        line-height: 1.35;
        background: var(--lc-chip-bg);
        color: var(--secondary-text-color);
      }
      .reminder.soon {
        background: var(--lc-amber-bg);
        color: var(--lc-amber);
        border: 1px solid color-mix(in srgb, var(--lc-amber) 35%, transparent);
      }
      .reminder ha-icon {
        --mdc-icon-size: 17px;
        flex: none;
      }
      .books {
        display: grid;
        gap: 9px;
      }
      .book {
        display: flex;
        gap: 10px;
        align-items: flex-start;
      }
      .book .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-top: 6px;
        flex: none;
      }
      .body {
        min-width: 0;
        flex: 1;
      }
      .book-title {
        font-size: 0.88rem;
        font-weight: 600;
        line-height: 1.3;
        overflow-wrap: anywhere;
      }
      .meta {
        font-size: 0.72rem;
        color: var(--secondary-text-color);
        margin-top: 1px;
      }
      .shelf {
        display: flex;
        align-items: flex-end;
        gap: 3px;
        height: 92px;
        padding: 0 4px;
        border-bottom: 4px solid color-mix(in srgb, var(--lc-amber) 55%, var(--divider-color));
        cursor: pointer;
        border-radius: 4px 4px 0 0;
      }
      .shelf:focus-visible {
        outline: 2px solid var(--lc-brand);
        outline-offset: 3px;
      }
      .spine {
        flex: 1;
        min-width: 0;
        max-width: 34px;
        border-radius: 3px 3px 1px 1px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      .spine span {
        writing-mode: vertical-rl;
        transform: rotate(180deg);
        font-size: 0.58rem;
        font-weight: 700;
        color: #fff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-height: 92%;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
      }
      /* The dark theme's chart colors are light pastels - dark text there. */
      :host(.dark) .spine span {
        color: #17161f;
        text-shadow: none;
      }
      .shelf-stats {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 4px 12px;
        font-size: 0.76rem;
        color: var(--secondary-text-color);
        font-variant-numeric: tabular-nums;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-library-card": LibrusLibraryCard;
  }
}
