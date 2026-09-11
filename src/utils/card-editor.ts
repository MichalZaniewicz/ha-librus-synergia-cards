import { LitElement, html, css, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { LibrusCardConfig, LibrusHass } from "./types";
import { findLibrusDeviceIds, resolveLibrusDevice, mapAllByTranslationKey } from "./entities";
import { t, type TranslationKey } from "./localize";

/**
 * One shared visual editor for every Librus card. Which controls it shows
 * is looked up from `EDITOR_FIELDS` by the config's `type`, so a card only
 * needs `static getConfigElement = librusCardEditor` plus an entry below -
 * no per-card editor element. A student (device) picker is always added
 * when more than one Librus device exists; a subject picker is added
 * whenever a card declares a `subject` field.
 */

type EditorField =
  | { kind: "subject" }
  | { kind: "text"; key: "title" | "exam_keywords" | "category_filter" | "icon"; label: TranslationKey }
  | { kind: "boolean"; key: "show_saturday" | "hide_header" | "compact"; label: TranslationKey }
  | {
      kind: "number";
      key: "max_items" | "days_ahead" | "days" | "target";
      label: TranslationKey;
      min: number;
      max: number;
      float?: boolean;
    }
  | { kind: "select"; key: "mailbox" | "sort"; label: TranslationKey; options: { value: string; label: TranslationKey }[] };

/**
 * Rendered for EVERY card, appended after its own type-specific fields -
 * these three options are honored generically by `LibrusBaseCard`
 * (icon override, `.hide-header`/`.compact` host classes), so every card
 * gets them for free without an `EDITOR_FIELDS` entry.
 */
const COMMON_FIELDS: EditorField[] = [
  { kind: "text", key: "icon", label: "editor.icon" },
  { kind: "boolean", key: "hide_header", label: "editor.hide_header" },
  { kind: "boolean", key: "compact", label: "editor.compact" },
];

const MAILBOX_OPTIONS: { value: string; label: TranslationKey }[] = [
  { value: "inbox", label: "mailbox.inbox" },
  { value: "substitutions", label: "mailbox.substitutions" },
  { value: "alerts", label: "mailbox.alerts" },
  { value: "justifications", label: "mailbox.justifications" },
];

const SORT_OPTIONS: { value: string; label: TranslationKey }[] = [
  { value: "newest", label: "sort.newest" },
  { value: "oldest", label: "sort.oldest" },
];

const CATEGORY_FILTER_FIELD: EditorField = { kind: "text", key: "category_filter", label: "editor.category_filter" };
const SORT_FIELD: EditorField = { kind: "select", key: "sort", label: "editor.sort", options: SORT_OPTIONS };
const DAYS_BACK_FIELD: EditorField = { kind: "number", key: "days", label: "editor.days_back", min: 7, max: 365 };

const TITLE_FIELD: EditorField = { kind: "text", key: "title", label: "editor.title" };
const MAX_ITEMS_FIELD = (max: number): EditorField => ({
  kind: "number",
  key: "max_items",
  label: "editor.max_items",
  min: 1,
  max,
});

/** type (with the `custom:` prefix, as it appears in a card config) -> fields. */
export const EDITOR_FIELDS: Record<string, EditorField[]> = {
  "custom:librus-grade-log-card": [TITLE_FIELD, MAX_ITEMS_FIELD(100), CATEGORY_FILTER_FIELD, DAYS_BACK_FIELD, SORT_FIELD],
  "custom:librus-recent-activity-card": [TITLE_FIELD, MAX_ITEMS_FIELD(50)],
  "custom:librus-homework-checklist-card": [TITLE_FIELD, MAX_ITEMS_FIELD(30)],
  "custom:librus-announcements-card": [TITLE_FIELD, MAX_ITEMS_FIELD(20)],
  "custom:librus-agenda-card": [
    TITLE_FIELD,
    { kind: "number", key: "days_ahead", label: "editor.days_ahead", min: 1, max: 60 },
  ],
  "custom:librus-messages-card": [
    TITLE_FIELD,
    { kind: "select", key: "mailbox", label: "editor.mailbox", options: MAILBOX_OPTIONS },
    MAX_ITEMS_FIELD(20),
  ],
  "custom:librus-grade-trend-card": [
    { kind: "subject" },
    { kind: "number", key: "days", label: "editor.days_back", min: 7, max: 180 },
  ],
  "custom:librus-subject-grades-card": [
    { kind: "subject" },
    MAX_ITEMS_FIELD(100),
    CATEGORY_FILTER_FIELD,
    DAYS_BACK_FIELD,
    SORT_FIELD,
  ],
  "custom:librus-grade-goal-card": [
    { kind: "subject" },
    { kind: "number", key: "target", label: "editor.target", min: 1, max: 6, float: true },
    TITLE_FIELD,
  ],
  "custom:librus-bell-schedule-card": [TITLE_FIELD],
  "custom:librus-tomorrow-card": [TITLE_FIELD],
  "custom:librus-grade-simulator-card": [{ kind: "subject" }],
  "custom:librus-semester-comparison-card": [TITLE_FIELD],
  "custom:librus-week-timetable-card": [
    { kind: "boolean", key: "show_saturday", label: "editor.show_saturday" },
  ],
  "custom:librus-subject-time-card": [
    { kind: "boolean", key: "show_saturday", label: "editor.show_saturday" },
  ],
  "custom:librus-exam-countdown-card": [
    TITLE_FIELD,
    { kind: "text", key: "exam_keywords", label: "editor.exam_keywords" },
  ],
};

export function librusCardEditor(): LovelaceCardEditor {
  return document.createElement("librus-card-editor") as unknown as LovelaceCardEditor;
}

@customElement("librus-card-editor")
export class LibrusCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: LibrusHass;
  @state() private _config?: LibrusCardConfig;

  public setConfig(config: LibrusCardConfig): void {
    this._config = config;
  }

  protected async firstUpdated(): Promise<void> {
    // On first paint an <ha-select>'s value can be applied before its
    // <ha-list-item>s upgrade, so it shows the raw value instead of the
    // option label. Re-assigning the value once the items exist fixes it.
    await this.updateComplete;
    this.renderRoot
      .querySelectorAll<Element & { value: string }>("ha-select")
      .forEach((sel) => {
        const v = sel.value;
        if (!v) return;
        sel.value = "";
        sel.value = v;
      });
  }

  private get _fields(): EditorField[] {
    return (this._config && EDITOR_FIELDS[this._config.type]) || [];
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const hass = this.hass;
    const config = this._config;
    const devices = findLibrusDeviceIds(hass);
    const fields = this._fields;
    const wantsSubject = fields.some((f) => f.kind === "subject");

    let subjectDeviceId: string | undefined;
    try {
      subjectDeviceId = resolveLibrusDevice(hass, config.device_id);
    } catch {
      subjectDeviceId = undefined;
    }
    const subjects = wantsSubject && subjectDeviceId
      ? mapAllByTranslationKey(hass, subjectDeviceId, "subject_average")
      : [];

    return html`
      <div class="form">
        ${devices.length > 1
          ? html`
              <ha-select
                label=${t(hass, "editor.student")}
                .value=${config.device_id ?? ""}
                naturalMenuWidth
                fixedMenuPosition
                @selected=${(e: Event) => this._pickDevice(e)}
                @closed=${(e: Event) => {
                  e.stopPropagation();
                  this._pickDevice(e);
                }}
              >
                ${devices.map((id) => {
                  const device = hass.devices?.[id];
                  return html`<ha-list-item .value=${id}>${device?.name_by_user || device?.name || id}</ha-list-item>`;
                })}
              </ha-select>
            `
          : nothing}
        ${wantsSubject
          ? html`
              <ha-select
                label=${t(hass, "editor.subject")}
                .value=${config.subject_id !== undefined ? String(config.subject_id) : ""}
                naturalMenuWidth
                fixedMenuPosition
                @selected=${(e: Event) => this._pickSubject(e)}
                @closed=${(e: Event) => {
                  e.stopPropagation();
                  this._pickSubject(e);
                }}
              >
                <ha-list-item .value=${""}>${t(hass, "editor.subject_auto")}</ha-list-item>
                ${subjects.map((s) =>
                  s.subjectId !== undefined
                    ? html`<ha-list-item .value=${String(s.subjectId)}>${s.subject}</ha-list-item>`
                    : nothing
                )}
              </ha-select>
            `
          : nothing}
        ${fields.map((field) => this._renderField(field))}
        <hr class="sep" />
        ${COMMON_FIELDS.map((field) => this._renderField(field))}
      </div>
    `;
  }

  private _renderField(field: EditorField): TemplateResult | typeof nothing {
    if (field.kind === "subject") return nothing; // rendered above
    const hass = this.hass!;
    const config = this._config!;
    if (field.kind === "text") {
      return html`
        <ha-textfield
          label=${t(hass, field.label)}
          .value=${(config[field.key] as string | undefined) ?? ""}
          @change=${(ev: Event) => this._onText(field.key, (ev.target as HTMLInputElement).value)}
        ></ha-textfield>
      `;
    }
    if (field.kind === "boolean") {
      return html`
        <ha-formfield label=${t(hass, field.label)}>
          <ha-switch
            .checked=${Boolean(config[field.key])}
            @change=${(ev: Event) =>
              this._patch({ [field.key]: (ev.target as HTMLInputElement).checked || undefined })}
          ></ha-switch>
        </ha-formfield>
      `;
    }
    if (field.kind === "number") {
      return html`
        <ha-textfield
          type="number"
          no-spinner
          label=${t(hass, field.label)}
          min=${field.min}
          max=${field.max}
          step=${field.float ? "0.05" : "1"}
          .value=${config[field.key] !== undefined ? String(config[field.key]) : ""}
          @change=${(ev: Event) =>
            this._onNumber(field, (ev.target as HTMLInputElement).value)}
        ></ha-textfield>
      `;
    }
    // select
    return html`
      <ha-select
        label=${t(hass, field.label)}
        .value=${(config[field.key] as string | undefined) ?? field.options[0].value}
        naturalMenuWidth
        fixedMenuPosition
        @selected=${(e: Event) => this._pickSelect(field, e)}
        @closed=${(e: Event) => {
          e.stopPropagation();
          this._pickSelect(field, e);
        }}
      >
        ${field.options.map(
          (o) => html`<ha-list-item .value=${o.value}>${t(hass, o.label)}</ha-list-item>`
        )}
      </ha-select>
    `;
  }

  /**
   * Read the current value straight off an `<ha-select>`. Its `selected`
   * event does not reliably cross the element's shadow boundary in current
   * HA frontends (so `ev.detail.index` is unusable here), but `closed`
   * does, and by then `ha-select.value` already reflects the pick.
   */
  private static _selectValue(ev: Event): string {
    const el = ev.currentTarget as (Element & { value?: string }) | null;
    return el?.value ?? "";
  }

  private _pickDevice(ev: Event): void {
    const id = LibrusCardEditor._selectValue(ev);
    if (id && id !== this._config?.device_id) this._patch({ device_id: id });
  }

  private _pickSubject(ev: Event): void {
    const raw = LibrusCardEditor._selectValue(ev);
    const next = raw === "" ? undefined : Number(raw);
    if (next === this._config?.subject_id) return;
    this._patch({ subject_id: Number.isNaN(next as number) ? undefined : next });
  }

  private _pickSelect(field: { key: "mailbox" | "sort"; options: { value: string }[] }, ev: Event): void {
    const value = LibrusCardEditor._selectValue(ev);
    if (!value) return;
    const current = (this._config?.[field.key] as string | undefined) ?? field.options[0].value;
    if (value === current) return;
    // Storing the first option (the default) as an explicit value is noise;
    // drop back to "unset" so the card falls through to its own default.
    this._patch({ [field.key]: value === field.options[0].value ? undefined : value });
  }

  private _onText(key: "title" | "exam_keywords" | "category_filter" | "icon", value: string): void {
    this._patch({ [key]: value.trim() || undefined });
  }

  private _onNumber(field: { key: string; min: number; max: number; float?: boolean }, raw: string): void {
    const parsed = field.float ? Number.parseFloat(raw) : Number.parseInt(raw, 10);
    if (Number.isNaN(parsed)) {
      this._patch({ [field.key]: undefined });
      return;
    }
    const clamped = Math.min(field.max, Math.max(field.min, parsed));
    this._patch({ [field.key]: field.float ? Math.round(clamped * 100) / 100 : clamped });
  }

  /** Merge a patch into the config, dropping keys set back to `undefined`. */
  private _patch(patch: Record<string, unknown>): void {
    if (!this._config) return;
    const next: Record<string, unknown> = { ...this._config, ...patch };
    for (const [k, v] of Object.entries(patch)) if (v === undefined) delete next[k];
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: next }, bubbles: true, composed: true })
    );
  }

  static styles = css`
    .form {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 4px 0;
    }
    ha-select,
    ha-textfield {
      width: 100%;
    }
    hr.sep {
      border: none;
      border-top: 1px solid var(--divider-color);
      margin: 2px 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-card-editor": LibrusCardEditor;
  }
}
