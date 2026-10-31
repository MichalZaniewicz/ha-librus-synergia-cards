import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { t } from "./utils/localize";
import { formatNumber } from "./utils/format";
import { fetchNumericHistories, type HistoryPoint } from "./utils/history";

const DEFAULT_DAYS = 30;
/** A change smaller than this reads as "no change". */
const FLAT = 0.05;

interface TrendRow {
  subject: string;
  points: HistoryPoint[];
  now: number;
  delta: number;
}

/**
 * Every subject's average over the last N days as a small line, with the
 * change since then - the biggest movers first (approved mockup, card 2).
 * Comes from the subject sensors' own state history (one request for all
 * of them), so it follows the integration's average mode exactly. A subject
 * without a numeric average (points only, no grades yet) is left out.
 */
@customElement("librus-subject-trends-card")
export class LibrusSubjectTrendsCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  @state() private _history = new Map<string, HistoryPoint[]>();
  private _fetchedFor?: string;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-subject-trends-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return 5;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    // Only notices a new day - a changed average changes the cache key itself.
    this._every(30 * 60_000, () => void this._fetch());
  }

  private get _days(): number {
    return this._config?.days ?? DEFAULT_DAYS;
  }

  private _entityIds(): string[] {
    if (!this.hass) return [];
    const resolved = this._resolveEntities();
    if ("error" in resolved) return [];
    return this._resolveAllByTranslationKey(resolved.deviceId, "subject_average").map((s) => s.entityId);
  }

  private async _fetch(): Promise<void> {
    const hass = this.hass;
    const ids = this._entityIds();
    if (!hass || !ids.length) return;
    const end = new Date();
    const start = new Date(end.getTime() - this._days * 86_400_000);
    const range = `${ids.join(",")}:${end.toDateString()}:${this._days}`;
    // History only grows when an average changes.
    const cacheKey = `${range}:${ids.map((id) => hass.states[id]?.last_changed ?? "").join(",")}`;
    if (this._fetchedFor === cacheKey && !this._retryDue()) return;
    this._fetchedFor = cacheKey;

    const generation = this._beginFetch();
    try {
      const history = await fetchNumericHistories(hass, ids, start, end);
      if (this._isCurrentFetch(generation)) {
        this._history = history;
        this._fetchSucceeded(range);
      }
    } catch {
      this._fetchFailed(generation);
      if (this._isCurrentFetch(generation) && !this._keepAfterError(range)) this._history = new Map();
    }
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const hass = this.hass;
    void this._fetch();

    const subjects = this._resolveAllByTranslationKey(resolved.deviceId, "subject_average");
    const states = subjects.map((s) => hass.states[s.entityId]);
    const rows = this._memo("rows", [this._history, ...states], () =>
      subjects
        .map((s, i): TrendRow | undefined => {
          const live = Number(states[i]?.state);
          const series = [...(this._history.get(s.entityId) ?? [])];
          // The recorder writes a new state a few seconds after it lands.
          if (Number.isFinite(live) && states[i]?.state !== "" && series[series.length - 1]?.value !== live) {
            series.push({ timestamp: Date.now(), value: live });
          }
          if (!series.length) return undefined;
          const now = series[series.length - 1].value;
          return { subject: s.subject, points: series, now, delta: now - series[0].value };
        })
        .filter((r): r is TrendRow => r !== undefined)
        .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta) || a.subject.localeCompare(b.subject))
    );

    const title = this._config.title ?? t(hass, "card.subject_trends.title");
    const icon = "mdi:chart-line";
    if (!rows.length) return this._message(icon, title, t(hass, "card.grade_trend.empty"));

    const up = rows.filter((r) => r.delta >= FLAT).length;
    const down = rows.filter((r) => r.delta <= -FLAT).length;
    const shown = rows.slice(0, this._config.max_items ?? rows.length);
    const two = (v: number) => formatNumber(v, hass.language, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return html`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge"><ha-icon icon=${icon}></ha-icon></div>
          <div class="title-block">
            <div class="title">${title}</div>
            <div class="subtitle">${t(hass, "card.subject_trends.subtitle", { days: this._days })}</div>
          </div>
        </div>
        <div class="rows">
          ${shown.map((r) => {
            const tone = r.delta >= FLAT ? "up" : r.delta <= -FLAT ? "down" : "flat";
            return html`
              <div class="row">
                <span class="name" title=${r.subject}>${r.subject}</span>
                ${this._spark(r.points, tone)}
                <span class="now">${two(r.now)}</span>
                <span class="delta ${tone}">${tone === "up" ? "▲" : tone === "down" ? "▼" : "•"} ${two(Math.abs(r.delta))}</span>
              </div>
            `;
          })}
        </div>
        <div class="chips">
          <span class="chip">${t(hass, "card.subject_trends.up")} <span class="n">${up}</span></span>
          <span class="chip">${t(hass, "card.subject_trends.down")} <span class="n">${down}</span></span>
          <span class="chip">${t(hass, "card.subject_trends.flat")} <span class="n">${rows.length - up - down}</span></span>
        </div>
      </ha-card>
    `;
  }

  /** A small line over the whole window (a flat line when nothing changed). */
  private _spark(points: HistoryPoint[], tone: string): TemplateResult {
    const w = 92;
    const h = 24;
    const end = Date.now();
    const start = end - this._days * 86_400_000;
    // A step line: an average holds its value until the next grade lands.
    const steps: [number, number][] = [];
    points.forEach((p, i) => {
      const x = Math.max(p.timestamp, start);
      if (i > 0) steps.push([x, points[i - 1].value]);
      steps.push([x, p.value]);
    });
    steps.unshift([start, points[0].value]);
    steps.push([end, points[points.length - 1].value]);
    const values = points.map((p) => p.value);
    const min = Math.min(...values) - 0.1;
    const max = Math.max(...values) + 0.1;
    const toX = (ts: number) => 1 + ((ts - start) / (end - start || 1)) * (w - 4);
    const toY = (v: number) => h - 2 - ((v - min) / (max - min || 1)) * (h - 4);
    const line = steps.map(([x, v]) => `${toX(x).toFixed(1)},${toY(v).toFixed(1)}`).join(" ");
    const last = steps[steps.length - 1];
    return html`
      <svg class="spark ${tone}" width=${w} height=${h} viewBox="0 0 ${w} ${h}" aria-hidden="true">
        <polyline points=${line} fill="none" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"></polyline>
        <circle cx=${toX(last[0])} cy=${toY(last[1])} r="2.2"></circle>
      </svg>
    `;
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .rows {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .row {
        display: grid;
        grid-template-columns: 1fr 92px 38px 48px;
        align-items: center;
        gap: 8px;
        font-size: 0.8rem;
        padding: 2px 0;
      }
      .name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .now {
        font-weight: 800;
        text-align: right;
        font-variant-numeric: tabular-nums;
      }
      .delta {
        font-size: 0.7rem;
        font-weight: 700;
        text-align: right;
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
      }
      .up {
        color: var(--lc-good);
      }
      .down {
        color: var(--lc-bad);
      }
      .flat {
        color: var(--secondary-text-color);
      }
      .spark polyline {
        stroke: currentColor;
      }
      .spark circle {
        fill: currentColor;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-subject-trends-card": LibrusSubjectTrendsCard;
  }
}
