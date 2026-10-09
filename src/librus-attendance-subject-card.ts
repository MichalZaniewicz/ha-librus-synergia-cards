import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { t } from "./utils/localize";

interface SubjectBucket {
  excused: number;
  unexcused: number;
  late: number;
}

/**
 * Which subject is missed most often - a ranked horizontal bar per
 * subject, each bar split into its excused/unexcused portions (not a
 * blended count), from the Attendance sensor's `by_subject` attribute
 * (requires `ha-librus-synergia` 0.8.0+). "Late" isn't part of this
 * ranking - lateness isn't a form of missing the subject, unlike
 * `librus-attendance-weekday-card`'s own by_weekday breakdown, which does
 * include it. User-requested feature ("nieobecnosci wg przedmiotu, będzie
 * widać który przedmiot jest najczęściej opuszczany").
 */
@customElement("librus-attendance-subject-card")
export class LibrusAttendanceSubjectCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-attendance-subject-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 3;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const { map } = resolved;
    const hass = this.hass;

    const attendance = map.attendance ? hass.states[map.attendance] : undefined;
    const bySubject = attendance?.attributes.by_subject as Record<string, SubjectBucket> | undefined;

    const rows = Object.entries(bySubject ?? {})
      .map(([subject, b]) => ({ subject, unexcused: b.unexcused, excused: b.excused, total: b.unexcused + b.excused }))
      .filter((r) => r.total > 0)
      .sort((a, b) => b.total - a.total);

    if (rows.length === 0) {
      return this._message("mdi:book-remove-outline", t(hass, "card.attendance_subject.empty"));
    }

    const max = Math.max(1, ...rows.map((r) => r.total));

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge bad"><ha-icon icon="mdi:book-remove-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title ?? t(hass, "card.attendance_subject.title")}</div>
            <div class="subtitle">${t(hass, "card.attendance_subject.subtitle")}</div>
          </div>
        </div>
        <div class="hbar-chart">
          ${rows.map((r) => {
            const width = Math.round((r.total / max) * 100);
            const unexcusedPct = r.total ? Math.round((r.unexcused / r.total) * 100) : 0;
            const excusedPct = 100 - unexcusedPct;
            return html`
              <div class="hbar-row">
                <span class="hbar-label" title=${r.subject}>${r.subject}</span>
                <span class="sbar-track" style="width:${width}%">
                  ${r.unexcused ? html`<span class="sbar-seg unexcused" style="width:${unexcusedPct}%"></span>` : nothing}
                  ${r.excused ? html`<span class="sbar-seg excused" style="width:${excusedPct}%"></span>` : nothing}
                </span>
                <b class="hbar-val">${r.total}</b>
              </div>
            `;
          })}
        </div>
        <div class="legend">
          <span class="legend-item"><span class="dot" style="background:var(--lc-bad)"></span>${t(hass, "stat.unexcused")}</span>
          <span class="legend-item"><span class="dot" style="background:var(--lc-warn)"></span>${t(hass, "stat.excused")}</span>
        </div>
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .sbar-track {
        height: 10px;
        border-radius: 5px;
        background: var(--divider-color);
        overflow: hidden;
        display: flex;
      }
      .sbar-seg {
        height: 100%;
      }
      .sbar-seg:first-child {
        border-radius: 5px 0 0 5px;
      }
      .sbar-seg:last-child {
        border-radius: 0 5px 5px 0;
      }
      .sbar-seg.unexcused {
        background: var(--lc-bad);
      }
      .sbar-seg.excused {
        background: var(--lc-warn);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-attendance-subject-card": LibrusAttendanceSubjectCard;
  }
}
