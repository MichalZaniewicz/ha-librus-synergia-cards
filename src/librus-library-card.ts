import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { t } from "./utils/localize";
import { librusCardEditor } from "./utils/card-editor";
import { daysBetween, formatShortDate } from "./utils/format";

/** One book in the Library books sensor's `books` attribute. */
interface LibraryBook {
  id: string;
  title: string;
  author: string;
  lent_on: string | null;
}

/** The return reminder turns amber this many days before the year ends. */
const REMIND_DAYS = 30;
/** Dot colors - the 16-color chart palette, picked per title so a book
 * keeps its color between refreshes. */
const COLORS = 16;

function bookColor(title: string): string {
  let hash = 0;
  for (const ch of title) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return `var(--lc-chart-${(hash % COLORS) + 1})`;
}

/**
 * Books the school library lent to the student (integration 0.12.10+),
 * with author and lending date. Librus's own due date is left out on purpose - for the textbooks
 * lent for the whole year it's a nominal date that has usually passed -
 * the card counts down to the end of the school year (Class sensor)
 * instead and turns amber in its last REMIND_DAYS days.
 */
@customElement("librus-library-card")
export class LibrusLibraryCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

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
    const subtitle = lentDates.length
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
        ${daysLeft !== undefined ? this._renderReminder(books.length, daysLeft, yearEndIso!, soon) : nothing}
        ${this._renderList(books)}
      </ha-card>
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
          <span class="dot" style="background:${bookColor(b.title)}"></span>
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
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-library-card": LibrusLibraryCard;
  }
}
