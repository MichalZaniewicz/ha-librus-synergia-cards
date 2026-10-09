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
 *
 * BUG FIX (reported live): `ha-select` was rewritten upstream to a new
 * MD3 implementation built on `<ha-dropdown>`/`<ha-dropdown-item>`, driven
 * by an `.options` PROPERTY - it only falls back to rendering a plain
 * `<slot>` when `.options` is unset. Its click handling is wired
 * specifically to `<ha-dropdown-item>`'s own selection event; a slotted
 * `<ha-list-item>` (what every select here used exclusively before) is
 * simply invisible to it - confirmed via HA frontend's own source
 * (`src/components/ha-select.ts`), matching exactly what was reported:
 * the dropdown opened, items showed with real labels and a hover
 * highlight, but clicking one did nothing at all. Every `<ha-select>`
 * below now ALSO passes `.options` (an array of `{value, label}`), which
 * this new implementation reads directly - fixing both the click and the
 * closed-select's label display (previously always the raw value, since
 * the new component's own label lookup requires `.options` too). The
 * `<ha-list-item>` children are kept alongside as a fallback for an
 * older, pre-rewrite HA frontend (still MWC-based, understands only the
 * slot, ignores the unknown `.options` property) - the new component
 * ignores that slot once `.options` is set, so passing both is safe on
 * either version. Selection is read from the new `selected` event's
 * `ev.detail.value` when present (reliable - HA's own `fireEvent`
 * defaults to `bubbles: true, composed: true`); `@closed` +
 * `ev.currentTarget.value` stays as the fallback for the old component,
 * which never fires a meaningful `detail` on `selected` and dispatches no
 * `closed` event of its own to react to on the new one either way.
 */

type EditorField =
  | { kind: "subject" }
  | { kind: "names" }
  | { kind: "action" }
  | { kind: "color" }
  | {
      kind: "text";
      key: "title" | "exam_keywords" | "category_filter" | "icon" | "accent_color";
      label: TranslationKey;
    }
  | {
      kind: "boolean";
      key:
        | "show_saturday"
        | "show_descriptive"
        | "hide_teacher"
        | "hide_header"
        | "hide_icon"
        | "hide_subtitle"
        | "hide_legend"
        | "hide_comments"
        | "compact"
        | "hide_outage_warning"
        | "hide_room"
        | "only_tomorrow"
        | "summary_only"
        | "hide_generate"
        | "show_past";
      label: TranslationKey;
    }
  | {
      kind: "number";
      key: "max_items" | "days_ahead" | "days" | "target" | "list_height";
      label: TranslationKey;
      min: number;
      max: number;
      float?: boolean;
    }
  | {
      kind: "select";
      key: "mailbox" | "sort" | "mode";
      label: TranslationKey;
      options: { value: string; label: TranslationKey }[];
    };

/**
 * Rendered for EVERY card, appended after its own type-specific fields -
 * these options are honored generically by `LibrusBaseCard` (icon
 * override, accent color, `.hide-*`/`.compact` host classes), so every
 * card gets them for free without an `EDITOR_FIELDS` entry.
 */
const COMMON_FIELDS: EditorField[] = [
  { kind: "text", key: "icon", label: "editor.icon" },
  { kind: "color" },
  { kind: "boolean", key: "hide_header", label: "editor.hide_header" },
  { kind: "boolean", key: "hide_icon", label: "editor.hide_icon" },
  { kind: "boolean", key: "hide_subtitle", label: "editor.hide_subtitle" },
  { kind: "boolean", key: "compact", label: "editor.compact" },
  { kind: "boolean", key: "hide_outage_warning", label: "editor.hide_outage_warning" },
];

/** Tiles and the student card have no title line, so no `title` field for them. */
/** Ready-made accent colors under the color field. The first one is the
 * cards' own indigo - picking it clears `accent_color`. */
const ACCENT_SWATCHES: { color: string; label: TranslationKey }[] = [
  { color: "#4f46e5", label: "editor.accent_default" },
  { color: "#e91e63", label: "editor.accent_pink" },
  { color: "#7e57c2", label: "editor.accent_purple" },
  { color: "#009688", label: "editor.accent_teal" },
  { color: "#43a047", label: "editor.accent_green" },
  { color: "#ff7043", label: "editor.accent_orange" },
];

const NO_TITLE_CARDS = new Set([
  "custom:librus-announcements-tile-card",
  "custom:librus-attendance-tile-card",
  "custom:librus-behaviour-notices-tile-card",
  "custom:librus-free-days-tile-card",
  "custom:librus-last-update-tile-card",
  "custom:librus-messages-tile-card",
  "custom:librus-next-lesson-tile-card",
  "custom:librus-student-card",
]);

/** Cards that run a `tap_action` (utils/actions.ts) - they get HA's action picker. */
const TAP_ACTION_CARDS = new Set(
  [
    "announcements-tile", "attendance-tile", "behaviour-notices-tile", "bell-schedule",
    "exam-countdown", "free-days-tile", "grade-goal", "lucky-number", "messages-tile",
    "next-lesson-tile", "rank", "school-year", "streak", "student", "today", "week-summary",
  ].map((name) => `custom:librus-${name}-card`)
);

const MAILBOX_OPTIONS: { value: string; label: TranslationKey }[] = [
  { value: "inbox", label: "mailbox.inbox" },
  { value: "substitutions", label: "mailbox.substitutions" },
  { value: "alerts", label: "mailbox.alerts" },
  { value: "justifications", label: "mailbox.justifications" },
  { value: "outbox", label: "mailbox.outbox" },
  { value: "archive", label: "mailbox.archive" },
];

const SORT_OPTIONS: { value: string; label: TranslationKey }[] = [
  { value: "newest", label: "sort.newest" },
  { value: "oldest", label: "sort.oldest" },
];

const MODE_OPTIONS: { value: string; label: TranslationKey }[] = [
  { value: "archetype", label: "mode.archetype" },
  { value: "hero", label: "mode.hero" },
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
  "custom:librus-lesson-topics-card": [
    TITLE_FIELD,
    { kind: "number", key: "days", label: "editor.school_days_shown", min: 1, max: 10 },
  ],
  "custom:librus-school-trips-card": [TITLE_FIELD, MAX_ITEMS_FIELD(10)],
  "custom:librus-exam-prep-card": [
    TITLE_FIELD,
    { kind: "number", key: "days_ahead", label: "editor.days_ahead", min: 1, max: 60 },
  ],
  "custom:librus-school-documents-card": [TITLE_FIELD, MAX_ITEMS_FIELD(20)],
  "custom:librus-justifications-card": [TITLE_FIELD, MAX_ITEMS_FIELD(10)],
  "custom:librus-catch-up-card": [TITLE_FIELD],
  "custom:librus-substitutions-card": [
    TITLE_FIELD,
    { kind: "number", key: "days_ahead", label: "editor.days_ahead", min: 1, max: 30 },
    { kind: "boolean", key: "show_past", label: "editor.show_past" },
    MAX_ITEMS_FIELD(30),
  ],
  "custom:librus-grade-log-card": [
    TITLE_FIELD,
    MAX_ITEMS_FIELD(100),
    CATEGORY_FILTER_FIELD,
    DAYS_BACK_FIELD,
    SORT_FIELD,
    { kind: "boolean", key: "show_descriptive", label: "editor.show_descriptive" },
    { kind: "boolean", key: "hide_teacher", label: "editor.hide_teacher" },
  ],
  "custom:librus-descriptive-grades-card": [
    { kind: "boolean", key: "hide_teacher", label: "editor.hide_teacher" },
  ],
  "custom:librus-recent-activity-card": [TITLE_FIELD, MAX_ITEMS_FIELD(50)],
  "custom:librus-subject-attendance-card": [TITLE_FIELD],
  "custom:librus-report-card-card": [TITLE_FIELD],
  "custom:librus-school-day-card": [TITLE_FIELD],
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
    TITLE_FIELD,
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
  "custom:librus-first-lesson-card": [
    TITLE_FIELD,
    { kind: "boolean", key: "hide_room", label: "editor.hide_room" },
    { kind: "boolean", key: "only_tomorrow", label: "editor.only_tomorrow" },
    { kind: "names" },
  ],
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
  "custom:librus-hero-card": [
    TITLE_FIELD,
    { kind: "select", key: "mode", label: "editor.mode", options: MODE_OPTIONS },
  ],
  "custom:librus-hero-history-card": [
    TITLE_FIELD,
    { kind: "select", key: "mode", label: "editor.mode", options: MODE_OPTIONS },
  ],
  "custom:librus-achievements-card": [TITLE_FIELD],
  "custom:librus-hero-stats-card": [TITLE_FIELD],
  "custom:librus-level-card": [TITLE_FIELD],
  "custom:librus-rank-card": [TITLE_FIELD],
  "custom:librus-teachers-card": [TITLE_FIELD],
  "custom:librus-ai-summary-card": [
    TITLE_FIELD,
    { kind: "boolean", key: "summary_only", label: "editor.summary_only" },
    { kind: "boolean", key: "hide_generate", label: "editor.hide_generate" },
  ],
};

const card = (name: string): string => `custom:librus-${name}-card`;

/** Append `field` to each card's fields (after its own), skipping a key it already has. */
function addField(names: string[], field: EditorField): void {
  for (const name of names) {
    const fields = (EDITOR_FIELDS[card(name)] ??= []);
    const key = "key" in field ? field.key : undefined;
    if (!fields.some((f) => "key" in f && f.key === key)) fields.push(field);
  }
}

// Lists without a cap of their own.
addField(
  ["agenda", "behaviour-notices", "homework-assignments", "teachers", "substitutions", "descriptive-grades", "hero-history"],
  MAX_ITEMS_FIELD(50)
);
// "Later" chips under the next exam / free day (4 by default).
addField(["exam-countdown", "free-days"], {
  kind: "number",
  key: "max_items",
  label: "editor.more_items",
  min: 0,
  max: 20,
});
addField(["announcements", "messages", "recent-activity", "behaviour-notices", "descriptive-grades"], SORT_FIELD);
addField(["grade-log", "subject-grades", "descriptive-grades", "latest-grade", "behaviour-grade"], {
  kind: "boolean",
  key: "hide_comments",
  label: "editor.hide_comments",
});
addField(["bell-schedule", "today-lessons", "tomorrow"], { kind: "boolean", key: "hide_room", label: "editor.hide_room" });
addField(
  ["attendance", "attendance-heatmap", "attendance-subject", "attendance-weekday", "grades-radar", "subject-attendance"],
  { kind: "boolean", key: "hide_legend", label: "editor.hide_legend" }
);
addField(
  [
    "agenda", "announcements", "behaviour-notices", "descriptive-grades", "grade-log", "grades", "hero-history",
    "homework-assignments", "homework-checklist", "lesson-topics", "messages", "recent-activity",
    "subject-grades", "substitutions", "teachers", "tomorrow",
  ],
  { kind: "number", key: "list_height", label: "editor.list_height", min: 120, max: 1200 }
);

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

  private get _fields(): EditorField[] {
    return (this._config && EDITOR_FIELDS[this._config.type]) || [];
  }

  /** True when the card has a title line but no title field of its own - the
   * title field is then shown first, before the card's own fields. */
  private get _addsTitle(): boolean {
    const type = this._config?.type ?? "";
    return !NO_TITLE_CARDS.has(type) && !this._fields.some((f) => "key" in f && f.key === "title");
  }

  /** COMMON_FIELDS (minus the header ones for tiles, which have no header) and the
   * action picker for cards that run a tap action. */
  private get _commonFields(): EditorField[] {
    const type = this._config?.type ?? "";
    const headerKeys = new Set(["hide_header", "hide_icon", "hide_subtitle"]);
    const fields = NO_TITLE_CARDS.has(type)
      ? COMMON_FIELDS.filter((f) => !("key" in f && headerKeys.has(f.key)))
      : [...COMMON_FIELDS];
    if (TAP_ACTION_CARDS.has(type)) fields.push({ kind: "action" });
    return fields;
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
        ${devices.length > 1 && !fields.some((f) => f.kind === "names")
          ? html`
              <ha-select
                label=${t(hass, "editor.student")}
                .value=${config.device_id ?? ""}
                .options=${devices.map((id) => {
                  const device = hass.devices?.[id];
                  return { value: id, label: device?.name_by_user || device?.name || id };
                })}
                naturalMenuWidth
                fixedMenuPosition
                @selected=${(e: CustomEvent<{ value?: string }>) => this._pickDevice(e)}
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
                .options=${[
                  { value: "", label: t(hass, "editor.subject_auto") },
                  ...subjects
                    .filter((s) => s.subjectId !== undefined)
                    .map((s) => ({ value: String(s.subjectId), label: s.subject })),
                ]}
                naturalMenuWidth
                fixedMenuPosition
                @selected=${(e: CustomEvent<{ value?: string }>) => this._pickSubject(e)}
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
        ${this._addsTitle ? this._renderField(TITLE_FIELD) : nothing}
        ${fields.map((field) => this._renderField(field))}
        <div class="section">${t(hass, "editor.appearance")}</div>
        ${this._commonFields.map((field) => this._renderField(field))}
      </div>
    `;
  }

  private _renderField(field: EditorField): TemplateResult | typeof nothing {
    if (field.kind === "subject") return nothing; // rendered above
    const hass = this.hass!;
    const config = this._config!;
    if (field.kind === "action") {
      // HA's own action picker (navigate / more-info / url / perform action).
      return html`
        <ha-selector
          .hass=${hass}
          .selector=${{ ui_action: {} }}
          .label=${t(hass, "editor.tap_action")}
          .value=${config.tap_action}
          @value-changed=${(ev: CustomEvent<{ value?: unknown }>) =>
            this._patch({ tap_action: ev.detail.value || undefined })}
        ></ha-selector>
      `;
    }
    if (field.kind === "color") {
      const current = config.accent_color ?? "";
      const valid = current !== "" && typeof CSS !== "undefined" && CSS.supports("color", current);
      return html`
        <div class="color-field">
          ${this._input(
            t(hass, "editor.accent_color"),
            current,
            (value) => this._onText("accent_color", value),
            {},
            html`<span
              class="preview ${valid ? "" : "none"}"
              style=${valid ? `background:${current}` : ""}
            ></span>`
          )}
          <div class="swatches">
            ${ACCENT_SWATCHES.map((s, i) => {
              const selected = i === 0 ? !current : current.toLowerCase() === s.color;
              return html`<button
                type="button"
                class="swatch ${selected ? "selected" : ""}"
                style="background:${s.color}"
                title=${t(hass, s.label)}
                aria-label=${t(hass, s.label)}
                @click=${() => this._patch({ accent_color: i === 0 ? undefined : s.color })}
              ></button>`;
            })}
          </div>
        </div>
      `;
    }
    if (field.kind === "names") {
      return html`${findLibrusDeviceIds(hass).map((id) => {
        const device = hass.devices?.[id];
        return html`
          ${this._input(
            t(hass, "editor.student_name", { device: device?.name_by_user || device?.name || id }),
            config.names?.[id] ?? "",
            (value) => this._onName(id, value)
          )}
        `;
      })}`;
    }
    if (field.kind === "text") {
      return this._input(t(hass, field.label), (config[field.key] as string | undefined) ?? "", (value) =>
        this._onText(field.key, value)
      );
    }
    if (field.kind === "boolean") {
      const onChange = (ev: Event): void =>
        this._patch({ [field.key]: (ev.target as HTMLInputElement).checked || undefined });
      // The frontend is dropping <ha-formfield> (PR #54200, after 2026.10):
      // the switch then takes its label as content.
      if (!customElements.get("ha-formfield")) {
        return html`
          <ha-switch .checked=${Boolean(config[field.key])} @change=${onChange}
            >${t(hass, field.label)}</ha-switch
          >
        `;
      }
      return html`
        <ha-formfield label=${t(hass, field.label)}>
          <ha-switch .checked=${Boolean(config[field.key])} @change=${onChange}></ha-switch>
        </ha-formfield>
      `;
    }
    if (field.kind === "number") {
      return this._input(
        t(hass, field.label),
        config[field.key] !== undefined ? String(config[field.key]) : "",
        (value) => this._onNumber(field, value),
        { type: "number", min: field.min, max: field.max, step: field.float ? "0.05" : "1" }
      );
    }
    // select
    return html`
      <ha-select
        label=${t(hass, field.label)}
        .value=${(config[field.key] as string | undefined) ?? field.options[0].value}
        .options=${field.options.map((o) => ({ value: o.value, label: t(hass, o.label) }))}
        naturalMenuWidth
        fixedMenuPosition
        @selected=${(e: CustomEvent<{ value?: string }>) => this._pickSelect(field, e)}
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
   * A text/number field. Home Assistant 2026.4 removed `<ha-textfield>`
   * (frontend PR #30349, "Migrate all from ha-textfield to ha-input") - an
   * undefined element renders nothing, which is how every text field of
   * this editor silently disappeared (found live). Use whichever exists:
   * `<ha-input>` (2026.4+), `<ha-textfield>` (older), or a plain `<input>`.
   * The value is committed when the field is left, on Enter, or on
   * `change` - not on every keystroke, so a number's min/max clamp doesn't
   * fight the typing.
   */
  private _input(
    label: string,
    value: string,
    commit: (value: string) => void,
    opts: { type?: "number"; min?: number; max?: number; step?: string } = {},
    end?: TemplateResult
  ): TemplateResult {
    let last = value;
    const done = (ev: Event): void => {
      const next = String((ev.currentTarget as { value?: unknown } | null)?.value ?? "");
      if (next === last) return;
      last = next;
      commit(next);
    };
    const onKey = (ev: KeyboardEvent): void => {
      if (ev.key === "Enter") done(ev);
    };
    if (customElements.get("ha-input")) {
      return html`
        <ha-input
          .label=${label}
          .value=${value}
          .type=${opts.type ?? "text"}
          .min=${opts.min}
          .max=${opts.max}
          .step=${opts.step}
          ?without-spin-buttons=${opts.type === "number"}
          @change=${done}
          @focusout=${done}
          @keydown=${onKey}
          >${end ? html`<span slot="end">${end}</span>` : nothing}</ha-input
        >
      `;
    }
    if (customElements.get("ha-textfield")) {
      return html`
        <ha-textfield
          label=${label}
          .value=${value}
          type=${opts.type ?? "text"}
          ?no-spinner=${opts.type === "number"}
          min=${opts.min ?? ""}
          max=${opts.max ?? ""}
          step=${opts.step ?? ""}
          @change=${done}
          @focusout=${done}
          @keydown=${onKey}
        ></ha-textfield>
        ${end ? html`<span class="end-outside">${end}</span>` : nothing}
      `;
    }
    return html`
      <label class="plain">
        <span>${label}</span>
        <input
          .value=${value}
          type=${opts.type ?? "text"}
          min=${opts.min ?? ""}
          max=${opts.max ?? ""}
          step=${opts.step ?? ""}
          @change=${done}
          @keydown=${onKey}
        />
        ${end ? html`<span class="end-outside">${end}</span>` : nothing}
      </label>
    `;
  }

  /**
   * Read the picked value from either shape `<ha-select>` can hand us:
   * the current (MD3, `.options`-driven) implementation's `selected` event
   * carries it directly as `ev.detail.value` - reliable, since it's
   * dispatched via HA's own `fireEvent` (bubbles + composed by default).
   * The older, pre-rewrite MWC-based implementation's `selected` event
   * detail is a bare `{index}` (not `value`) and doesn't reliably cross
   * the shadow boundary either way, so for that one - and for `@closed`,
   * which the old component fires but the new one never does at all -
   * fall back to reading `ha-select.value` straight off the element,
   * which is already correct by the time either fires.
   */
  private static _selectValue(ev: Event): string {
    const detail = (ev as CustomEvent<{ value?: string | number }>).detail;
    if (detail && detail.value !== undefined) return String(detail.value);
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

  private _pickSelect(field: { key: "mailbox" | "sort" | "mode"; options: { value: string }[] }, ev: Event): void {
    const value = LibrusCardEditor._selectValue(ev);
    if (!value) return;
    const current = (this._config?.[field.key] as string | undefined) ?? field.options[0].value;
    if (value === current) return;
    // Storing the first option (the default) as an explicit value is noise;
    // drop back to "unset" so the card falls through to its own default.
    this._patch({ [field.key]: value === field.options[0].value ? undefined : value });
  }

  private _onName(deviceId: string, value: string): void {
    const names = { ...(this._config?.names ?? {}) };
    if (value.trim()) names[deviceId] = value.trim();
    else delete names[deviceId];
    this._patch({ names: Object.keys(names).length ? names : undefined });
  }

  private _onText(
    key: "title" | "exam_keywords" | "category_filter" | "icon" | "accent_color",
    value: string
  ): void {
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
    ha-input,
    ha-textfield {
      width: 100%;
    }
    label.plain {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 0.85rem;
      color: var(--secondary-text-color);
    }
    label.plain input {
      font: inherit;
      color: var(--primary-text-color);
      background: var(--card-background-color, transparent);
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      padding: 8px 10px;
    }
    .section {
      margin-top: 6px;
      padding-top: 12px;
      border-top: 1px solid var(--divider-color);
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
    }
    .color-field {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .preview {
      display: inline-block;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      margin-inline-end: 4px;
      vertical-align: middle;
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
    }
    .preview.none {
      background: repeating-conic-gradient(var(--divider-color) 0 25%, transparent 0 50%) 50% / 8px 8px;
    }
    .end-outside {
      align-self: flex-end;
    }
    .swatches {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .swatch {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: none;
      padding: 0;
      cursor: pointer;
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
    }
    .swatch.selected {
      outline: 2px solid var(--primary-text-color);
      outline-offset: 2px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "librus-card-editor": LibrusCardEditor;
  }
}
