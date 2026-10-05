import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig } from "./utils/types";
import { LibrusBaseCard } from "./utils/base-card";
import { librusCardEditor } from "./utils/card-editor";
import { librusTokens, librusSharedStyles } from "./utils/style-tokens";
import { UNAVAILABLE } from "./utils/entities";
import { t, type TranslationKey } from "./utils/localize";

/** Section order as the integration (0.10+) writes them; `school_news` only when opted in. */
export const AI_SECTIONS = ["grades", "attendance", "behaviour", "next_week", "school_news"] as const;
export type AiSection = (typeof AI_SECTIONS)[number];

const STATUS_CLASS: Record<string, string> = { good: "good", ok: "ok", caution: "caution" };

interface AiSectionData {
  status?: string | null;
  text?: string;
}

/**
 * The weekly AI summary from the integration's `weekly_summary` sensor
 * (ha-librus-synergia 0.10+): headline and overall status on top, then
 * one tab per section, each with its own status dot, then the to-dos for
 * the coming week and a "Generate now" button wired to the integration's
 * own `weekly_summary_generate` button entity. Tabs keep the card at a
 * predictable height while every section's status stays visible
 * (variant A of the approved mockup, after ha-suunto-cards' AI card).
 */
@customElement("librus-ai-summary-card")
export class LibrusAiSummaryCard extends LibrusBaseCard {
  @state() private _config?: LibrusCardConfig;
  @state() private _tab?: AiSection;
  @state() private _pressing = false;
  @state() private _pressError?: string;

  public static getConfigElement(): LovelaceCardEditor {
    return librusCardEditor();
  }

  public static getStubConfig(): LibrusCardConfig {
    return { type: "custom:librus-ai-summary-card" };
  }

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
    this._configuredDeviceId = config.device_id;
  }

  public getCardSize(): number {
    return this._config?.summary_only ? 4 : 8;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    this._syncTheme();

    const resolved = this._resolveEntities();
    if ("error" in resolved) return resolved.error;
    const hass = this.hass;
    const entityId = resolved.map.weekly_summary;
    const buttonId = resolved.map.weekly_summary_generate;
    const entity = entityId ? hass.states[entityId] : undefined;
    if (!entity) {
      return this._message("mdi:creation-outline", t(hass, "card.ai_summary.setup"), t(hass, "card.ai_summary.setup_hint"));
    }
    const attrs = entity.attributes as Record<string, unknown>;
    const generating = Boolean(attrs.generating) || this._pressing;
    const headline = UNAVAILABLE.has(entity.state) ? undefined : entity.state;

    if (!headline) {
      return html`
        <ha-card class="static">
          <div class="empty">
            <ha-icon icon="mdi:creation-outline"></ha-icon>
            <div class="t1">${t(hass, generating ? "card.ai_summary.generating" : "card.ai_summary.waiting")}</div>
            <div class="t2">${attrs.error ? String(attrs.error) : this._nextRun(attrs)}</div>
          </div>
          ${this._footer(attrs, buttonId, generating, false)}
        </ha-card>
      `;
    }

    const status = typeof attrs.status === "string" ? attrs.status : undefined;
    const sections = (attrs.sections ?? {}) as Partial<Record<AiSection, AiSectionData>>;
    const present = AI_SECTIONS.filter((key) => sections[key]?.text);
    const advice = Array.isArray(attrs.advice) ? (attrs.advice as string[]) : [];
    const warning = typeof attrs.warning === "string" && attrs.warning ? attrs.warning : undefined;
    const summary = typeof attrs.summary === "string" && attrs.summary ? attrs.summary : undefined;
    const tab = this._tab && present.includes(this._tab) ? this._tab : present[0];
    const summaryOnly = this._config.summary_only === true;

    return html`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:creation"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title || t(hass, "card.ai_summary.title")}</div>
            <div class="subtitle">${this._subtitle(attrs)}</div>
          </div>
          ${status && STATUS_CLASS[status]
            ? html`<span class="pill ${STATUS_CLASS[status]}">${t(hass, `ai_summary.status.${status}` as TranslationKey)}</span>`
            : nothing}
        </div>
        <div class="headline">${headline}</div>
        ${warning
          ? html`<div class="warning"><ha-icon icon="mdi:alert"></ha-icon><div>${warning}</div></div>`
          : nothing}
        ${summaryOnly
          ? nothing
          : present.length && tab
            ? html`${this._tabs(sections, present, tab)} ${this._panel(tab, sections[tab]!)}`
            : summary
              ? html`<div class="prose">${this._paragraphs(summary)}</div>`
              : nothing}
        ${advice.length
          ? html`
              <div class="advice">
                <div class="label">${t(hass, "card.ai_summary.advice")}</div>
                <ol>
                  ${advice.map((item) => html`<li>${item}</li>`)}
                </ol>
              </div>
            `
          : nothing}
        ${this._footer(attrs, buttonId, generating, true)}
      </ha-card>
    `;
  }

  private _subtitle(attrs: Record<string, unknown>): string {
    const hass = this.hass!;
    const parts: string[] = [];
    const fmt = new Intl.DateTimeFormat(hass.language, { day: "numeric", month: "numeric" });
    const from = typeof attrs.week_from === "string" ? new Date(`${attrs.week_from}T12:00:00`) : undefined;
    const to = typeof attrs.week_to === "string" ? new Date(`${attrs.week_to}T12:00:00`) : undefined;
    if (from && to && !Number.isNaN(from.getTime()) && !Number.isNaN(to.getTime())) {
      parts.push(`${fmt.format(from)} – ${fmt.format(to)}`);
    }
    if (attrs.audience === "student" || attrs.audience === "parent") {
      parts.push(t(hass, `card.ai_summary.for_${attrs.audience}` as TranslationKey));
    }
    return parts.join(" · ");
  }

  private _nextRun(attrs: Record<string, unknown>): string {
    const hass = this.hass!;
    if (attrs.paused) return t(hass, "card.ai_summary.paused");
    const next = typeof attrs.next_run === "string" ? new Date(attrs.next_run) : undefined;
    if (!next || Number.isNaN(next.getTime())) return "";
    const when = new Intl.DateTimeFormat(hass.language, {
      weekday: "short",
      day: "numeric",
      month: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(next);
    return t(hass, "card.ai_summary.next_run", { when });
  }

  private _footer(
    attrs: Record<string, unknown>,
    buttonId: string | undefined,
    generating: boolean,
    withMeta: boolean
  ): TemplateResult {
    const hass = this.hass!;
    const showButton = buttonId && this._config?.hide_generate !== true;
    const error = this._pressError ?? (withMeta && attrs.error ? String(attrs.error) : undefined);
    return html`
      <div class="foot">
        <div class="foot-text">
          ${withMeta ? html`<span>${this._nextRun(attrs)}</span><span>${t(hass, "card.ai_summary.disclaimer")}</span>` : nothing}
          ${error ? html`<span class="err">${error}</span>` : nothing}
        </div>
        ${showButton
          ? html`<button class="gen" type="button" ?disabled=${generating} @click=${() => this._generate(buttonId!)}>
              <ha-icon icon=${generating ? "mdi:timer-sand" : "mdi:refresh"}></ha-icon>
              ${t(hass, generating ? "card.ai_summary.generating" : "card.ai_summary.generate")}
            </button>`
          : nothing}
      </div>
    `;
  }

  private async _generate(buttonId: string): Promise<void> {
    if (!this.hass || this._pressing) return;
    this._pressing = true;
    this._pressError = undefined;
    try {
      await this.hass.callService("button", "press", { entity_id: buttonId });
    } catch (err) {
      this._pressError = err instanceof Error ? err.message : String((err as { message?: string })?.message ?? err);
    } finally {
      this._pressing = false;
    }
  }

  private _tabs(sections: Partial<Record<AiSection, AiSectionData>>, present: AiSection[], active: AiSection): TemplateResult {
    const hass = this.hass!;
    return html`
      <div class="tabs" role="tablist">
        ${present.map((key) => {
          const cls = STATUS_CLASS[sections[key]?.status ?? ""] ?? "none";
          return html`
            <button
              class="tab"
              type="button"
              role="tab"
              aria-selected=${key === active ? "true" : "false"}
              @click=${() => (this._tab = key)}
            >
              <span class="sdot ${cls}"></span>${t(hass, `ai_summary.section.${key}` as TranslationKey)}
            </button>
          `;
        })}
      </div>
    `;
  }

  private _panel(key: AiSection, data: AiSectionData): TemplateResult {
    const hass = this.hass!;
    const cls = data.status ? STATUS_CLASS[data.status] : undefined;
    return html`
      <div class="panel" role="tabpanel">
        <div class="panel-head">
          <span>${t(hass, `ai_summary.section.${key}` as TranslationKey)}</span>
          ${cls ? html`<span class="pill small ${cls}">${t(hass, `ai_summary.status.${data.status}` as TranslationKey)}</span>` : nothing}
        </div>
        <div class="prose">${this._paragraphs(data.text ?? "")}</div>
      </div>
    `;
  }

  private _paragraphs(text: string): TemplateResult[] {
    return text
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => html`<p>${p}</p>`);
  }

  static styles = [
    librusTokens,
    librusSharedStyles,
    css`
      .pill {
        font-size: 0.72rem;
        font-weight: 700;
        padding: 3px 9px;
        border-radius: 999px;
        white-space: nowrap;
      }
      .pill.small {
        font-size: 0.68rem;
        padding: 2px 8px;
      }
      .pill.good {
        color: var(--lc-good);
        background: var(--lc-good-bg);
      }
      .pill.ok {
        color: var(--lc-brand);
        background: var(--lc-brand-bg);
      }
      .pill.caution {
        color: var(--lc-warn);
        background: var(--lc-warn-bg);
      }
      .headline {
        font-size: 1.02rem;
        font-weight: 600;
        line-height: 1.35;
        text-wrap: pretty;
      }
      .warning {
        display: flex;
        gap: 8px;
        align-items: flex-start;
        background: var(--lc-warn-bg);
        border-radius: 9px;
        padding: 9px 11px;
        font-size: 0.82rem;
        line-height: 1.4;
      }
      .warning ha-icon {
        color: var(--lc-warn);
        --mdc-icon-size: 18px;
        flex: none;
      }
      .tabs {
        display: flex;
        gap: 6px;
        overflow-x: auto;
        scrollbar-width: none;
      }
      .tabs::-webkit-scrollbar {
        display: none;
      }
      .tab {
        font: inherit;
        font-size: 0.78rem;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        white-space: nowrap;
        border: 1px solid var(--divider-color);
        background: none;
        color: var(--secondary-text-color);
        border-radius: 999px;
        padding: 5px 10px;
        cursor: pointer;
      }
      .tab[aria-selected="true"] {
        background: var(--lc-brand-bg);
        border-color: transparent;
        color: var(--lc-brand);
        font-weight: 600;
      }
      .tab:focus-visible,
      .gen:focus-visible {
        outline: 2px solid var(--lc-brand);
        outline-offset: 2px;
      }
      .sdot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex: none;
        background: var(--lc-neutral-dot);
      }
      .sdot.good {
        background: var(--lc-good);
      }
      .sdot.ok {
        background: var(--lc-brand);
      }
      .sdot.caution {
        background: var(--lc-warn);
      }
      .panel {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .panel-head {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.8rem;
        font-weight: 700;
      }
      .prose {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .prose p {
        margin: 0;
        font-size: 0.86rem;
        line-height: 1.55;
        text-wrap: pretty;
      }
      .advice {
        background: var(--lc-chip-bg);
        border-radius: 10px;
        padding: 10px 12px;
      }
      .advice .label {
        font-size: 0.7rem;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--secondary-text-color);
        font-weight: 700;
        margin-bottom: 6px;
      }
      .advice ol {
        margin: 0;
        padding-left: 18px;
        font-size: 0.84rem;
        line-height: 1.45;
        display: flex;
        flex-direction: column;
        gap: 3px;
      }
      .foot {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        font-size: 0.7rem;
        color: var(--secondary-text-color);
        border-top: 1px dashed var(--divider-color);
        padding-top: 10px;
      }
      .foot-text {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
      }
      .foot-text span:empty {
        display: none;
      }
      .err {
        color: var(--lc-bad);
      }
      .gen {
        font: inherit;
        font-size: 0.74rem;
        font-weight: 600;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        border: 0;
        background: var(--lc-brand-bg);
        color: var(--lc-brand);
        padding: 5px 10px;
        border-radius: 8px;
        cursor: pointer;
      }
      .gen[disabled] {
        opacity: 0.7;
        cursor: progress;
      }
      .gen ha-icon {
        --mdc-icon-size: 14px;
      }
      :host(.compact) .foot-text {
        display: none;
      }
    `,
  ];
}
