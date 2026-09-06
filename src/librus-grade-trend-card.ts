import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import { LibrusBaseCard } from "./utils/base-card";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { mapAllByTranslationKey } from "./utils/entities";
import { fetchNumericHistory, type HistoryPoint } from "./utils/history";
import { lineChart } from "./utils/render-helpers";
import { t } from "./utils/localize";
import type { LibrusSubjectCardConfig } from "./librus-subject-picker-editor";

const HISTORY_DAYS = 60;

/**
 * How the overall (or one subject's) grade average has moved over the
 * last ~60 days, from that sensor's own state history - no new backend
 * data needed, HA already tracks state history for every entity.
 *
 * `subject_id` is OPTIONAL here (unlike librus-subject-grades-card, which
 * requires one) - leaving it unset shows the Overall average's trend,
 * which is the more useful zero-config default for this particular card.
 */
@customElement("librus-grade-trend-card")
export class LibrusGradeTrendCard extends LibrusBaseCard {
  @state() private _config?: LibrusSubjectCardConfig;
  @state() private _points: HistoryPoint[] = [];
  private _fetchedFor?: string;
  private _refreshTimer?: ReturnType<typeof setInterval>;

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement("librus-subject-picker-editor") as unknown as LovelaceCardEditor;
  }

  public static getStubConfig(): LibrusSubjectCardConfig {
    return { type: "custom:librus-grade-trend-card" };
  }

  public setConfig(config: LibrusSubjectCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 3;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._refreshTimer = setInterval(() => void this._fetch(true), 30 * 60_000);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this._refreshTimer);
  }

  private _resolveEntityId(): string | undefined {
    if (!this.hass || !this._config) return undefined;
    const resolved = this._resolveEntities();
    if ("error" in resolved) return undefined;
    const { deviceId, map } = resolved;
    if (this._config.subject_id !== undefined) {
      const subjects = mapAllByTranslationKey(this.hass, deviceId, "subject_average");
      return subjects.find((s) => s.subjectId === this._config!.subject_id)?.entityId;
    }
    return map.overall_average;
  }

  private async _fetch(force = false): Promise<void> {
    const entityId = this._resolveEntityId();
    if (!this.hass || !entityId) return;

    const end = new Date();
    const start = new Date(end.getTime() - HISTORY_DAYS * 86_400_000);
    const cacheKey = `${entityId}:${end.toDateString()}`;
    if (!force && this._fetchedFor === cacheKey) return;
    this._fetchedFor = cacheKey;

    try {
      this._points = await fetchNumericHistory(this.hass, entityId, start, end);
    } catch {
      this._points = [];
    }
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const hass = this.hass;

    void this._fetch();

    const entityId = this._resolveEntityId();
    const subjectName =
      this._config.subject_id !== undefined
        ? mapAllByTranslationKey(hass, resolved.deviceId, "subject_average").find(
            (s) => s.subjectId === this._config!.subject_id
          )?.subject
        : undefined;

    if (!entityId || this._points.length < 2) {
      return this._message("mdi:chart-line", t(hass, "card.grade_trend.empty"));
    }

    const first = this._points[0];
    const last = this._points[this._points.length - 1];
    const delta = Math.round((last.value - first.value) * 100) / 100;
    const trendIcon = delta > 0 ? "mdi:trending-up" : delta < 0 ? "mdi:trending-down" : "mdi:trending-neutral";
    const trendClass = delta > 0 ? "good" : delta < 0 ? "bad" : "";

    return html`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-line"></ha-icon></div>
          <div class="title-block">
            <div class="title">${subjectName ?? t(hass, "card.grade_trend.title")}</div>
            <div class="subtitle">${t(hass, "card.grade_trend.subtitle", { days: HISTORY_DAYS })}</div>
          </div>
          <div class="trend ${trendClass}">
            <ha-icon icon=${trendIcon}></ha-icon>
            <span>${delta > 0 ? "+" : ""}${delta}</span>
          </div>
        </div>
        <div class="chart-row">
          <div class="current-value">${last.value.toFixed(2)}</div>
          ${lineChart(this._points, { colorVar: "var(--lc-brand)" })}
        </div>
      </ha-card>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .header {
        align-items: flex-start;
      }
      .trend {
        display: flex;
        align-items: center;
        gap: 3px;
        font-size: 0.78rem;
        font-weight: 700;
        color: var(--secondary-text-color);
      }
      .trend.good {
        color: var(--lc-good);
      }
      .trend.bad {
        color: var(--lc-bad);
      }
      .trend ha-icon {
        --mdc-icon-size: 18px;
      }
      .chart-row {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .current-value {
        font-size: 1.6rem;
        font-weight: 800;
        flex: none;
        font-variant-numeric: tabular-nums;
      }
      .line-chart {
        flex: 1;
        min-width: 0;
        height: 56px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-grade-trend-card": LibrusGradeTrendCard;
  }
}
