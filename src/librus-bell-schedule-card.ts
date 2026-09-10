import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { t, formatCountdown } from "./utils/localize";
import { librusCardEditor } from "./utils/card-editor";

interface BellPeriod {
  lesson_no: number;
  start: string;
  end: string;
}

const BAD_STATES = new Set(["unknown", "unavailable", ""]);

/**
 * The day's period grid (from the School sensor's `bell_schedule`
 * attribute), with the period happening right now highlighted and past
 * periods dimmed. The header line shows the current or next lesson's
 * subject, read from the `current_lesson` / `next_lesson` sensors when
 * present. Times are plain "HH:MM" wall-clock strings, compared as
 * strings - no timezone maths.
 */
@customElement("librus-bell-schedule-card")
export class LibrusBellScheduleCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  private _tickTimer?: ReturnType<typeof setInterval>;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-bell-schedule-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 3;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._tickTimer = setInterval(() => this.requestUpdate(), 30_000);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this._tickTimer);
  }

  private static _nowHM(): string {
    return new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { map } = resolved;
    const hass = this.hass;

    const school = map.school ? hass.states[map.school] : undefined;
    const periods = (school?.attributes.bell_schedule as BellPeriod[] | undefined) ?? [];
    if (periods.length === 0) {
      return this._message("mdi:bell-outline", t(hass, "card.bell_schedule.empty"));
    }

    const nowHM = LibrusBellScheduleCard._nowHM();
    const currentSensor = map.current_lesson ? hass.states[map.current_lesson] : undefined;
    const nextSensor = map.next_lesson ? hass.states[map.next_lesson] : undefined;
    const currentSubject =
      currentSensor && !BAD_STATES.has(currentSensor.state) ? currentSensor.state : undefined;
    const nextSubject = nextSensor && !BAD_STATES.has(nextSensor.state) ? nextSensor.state : undefined;

    let subtitle: string;
    if (currentSubject) {
      subtitle = `${currentSubject} · ${t(hass, "label.now")}`;
    } else if (nextSubject) {
      const mins = Number(nextSensor?.attributes.minutes_until);
      subtitle = Number.isNaN(mins)
        ? nextSubject
        : `${nextSubject} · ${formatCountdown(hass, mins)}`;
    } else {
      subtitle = t(hass, "label.after_school");
    }

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:bell-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title ?? t(hass, "card.bell_schedule.title")}</div>
            <div class="subtitle">${subtitle}</div>
          </div>
        </div>
        <div class="periods">
          ${periods.map((p) => {
            const isCurrent = p.start <= nowHM && nowHM <= p.end;
            const isPast = nowHM > p.end;
            return html`
              <div class="period ${isCurrent ? "current" : ""} ${isPast ? "past" : ""}">
                <span class="pnum">${t(hass, "label.lesson_short", { n: p.lesson_no })}</span>
                <span class="ptime">${p.start}<span class="dash">–</span>${p.end}</span>
                ${isCurrent && currentSubject ? html`<span class="psubj">${currentSubject}</span>` : nothing}
              </div>
            `;
          })}
        </div>
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .periods {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .period {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 6px 8px;
        border-radius: 8px;
        font-size: 0.82rem;
      }
      .period.past {
        opacity: 0.45;
      }
      .period.current {
        background: var(--lc-brand-bg);
        color: var(--lc-brand-strong);
        font-weight: 700;
      }
      .pnum {
        flex: none;
        min-width: 30px;
        font-weight: 800;
        font-size: 0.72rem;
        color: var(--secondary-text-color);
      }
      .period.current .pnum {
        color: var(--lc-brand-strong);
      }
      .ptime {
        font-variant-numeric: tabular-nums;
      }
      .dash {
        margin: 0 3px;
        color: var(--secondary-text-color);
      }
      .psubj {
        margin-left: auto;
        font-weight: 700;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-bell-schedule-card": LibrusBellScheduleCard;
  }
}
