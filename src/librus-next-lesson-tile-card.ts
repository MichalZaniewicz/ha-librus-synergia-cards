import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { minutesUntil, formatTime } from "./utils/format";
import { t, formatCountdown } from "./utils/localize";
import { tapActionHandler } from "./utils/actions";

/**
 * Reads the `timetable` calendar entity's OWN state attributes rather than
 * calling the calendar-events REST API - a Home Assistant CalendarEntity
 * already exposes its current/next event via `message`/`start_time`/
 * `end_time`/`location` state attributes, regardless of whether the state
 * itself is "on" (happening now) or "off" (next one hasn't started yet).
 */
@customElement("librus-next-lesson-tile-card")
export class LibrusNextLessonTileCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  private _tickTimer?: ReturnType<typeof setInterval>;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-next-lesson-tile-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 1;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._tickTimer = setInterval(() => this.requestUpdate(), 30_000);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this._tickTimer);
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { map } = resolved;
    const hass = this.hass;

    const entity = map.timetable ? hass.states[map.timetable] : undefined;
    const message = entity?.attributes.message as string | undefined;
    const startTime = entity?.attributes.start_time as string | undefined;

    if (!entity || !message || !startTime) {
      return this._message("mdi:clock-outline", t(hass, "card.next_lesson.empty"));
    }

    const start = new Date(startTime.replace(" ", "T"));
    const now = new Date();
    const isNow = entity.state === "on";
    const minutes = minutesUntil(start, now);
    const location = entity.attributes.location as string | undefined;
    const description = entity.attributes.description as string | undefined;

    return html`
      <ha-card class="tile" @click=${tapActionHandler(this, this._config.tap_action, map.timetable)}>
        <div class="icon-badge ${isNow ? "good" : ""}"><ha-icon icon="mdi:clock-outline"></ha-icon></div>
        <div class="tile-body">
          <div class="subj">${message}</div>
          <div class="meta">
            ${isNow
              ? t(hass, "label.now")
              : `${formatTime(startTime.replace(" ", "T"))} · ${formatCountdown(hass, minutes)}`}
            ${location ? ` · ${location}` : ""}${description ? ` · ${description}` : ""}
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      ha-card.tile {
        flex-direction: row;
        align-items: center;
        padding: 12px 16px;
      }
      .tile-body {
        min-width: 0;
      }
      .subj {
        font-weight: 700;
        font-size: 0.86rem;
      }
      .meta {
        font-size: 0.7rem;
        color: var(--secondary-text-color);
        margin-top: 1px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-next-lesson-tile-card": LibrusNextLessonTileCard;
  }
}
