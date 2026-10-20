import type { LibrusHass } from "./utils/types";
import { findLibrusDeviceIds } from "./utils/entities";
import { studentName } from "./librus-first-lesson-card";

/**
 * A ready-made "School" dashboard (approved mockup: variant A). Picked as
 * "Szkoła (Librus)" in Settings → Dashboards → Add dashboard, or in YAML:
 *
 *   strategy:
 *     type: custom:librus
 *     family_view: true      # the "Family" tab when there are 2+ children
 *     students: [<device id>] # optional: these children only, in this order
 *
 * A "Family" view with every child at once (only with two or more), then a
 * view per child with six sections - today, grades, tests and homework,
 * attendance, messages, timetable. Built from the integration's devices
 * each time the dashboard loads, so a new child or a card added in a later
 * version shows up by itself. "Take control" in the dashboard's menu turns
 * it into an ordinary dashboard to edit by hand.
 */

export interface LibrusStrategyConfig {
  type: string;
  family_view?: boolean;
  students?: string[];
}

interface CardConfig {
  type: string;
  [key: string]: unknown;
}

type Language = "pl" | "en";

const HEADINGS: Record<Language, Record<string, string>> = {
  pl: {
    family: "Rodzina",
    all: "Wszystkie dzieci",
    morning: "Rano",
    today: "Dziś",
    grades: "Oceny",
    tests: "Sprawdziany i zadania",
    attendance: "Frekwencja",
    messages: "Wiadomości",
    timetable: "Plan",
    none: "Brak uczniów",
    none_text:
      "Nie znaleziono żadnego ucznia z integracji Librus Synergia. Dodaj integrację w Ustawieniach → Urządzenia i usługi, a potem odśwież ten dashboard.",
  },
  en: {
    family: "Family",
    all: "All children",
    morning: "Morning",
    today: "Today",
    grades: "Grades",
    tests: "Tests and homework",
    attendance: "Attendance",
    messages: "Messages",
    timetable: "Timetable",
    none: "No students",
    none_text:
      "No student from the Librus Synergia integration was found. Add the integration under Settings → Devices & services, then reload this dashboard.",
  },
};

const ICONS: Record<string, string> = {
  all: "mdi:account-group-outline",
  morning: "mdi:alarm",
  today: "mdi:calendar-today",
  grades: "mdi:star-outline",
  tests: "mdi:file-document-alert-outline",
  attendance: "mdi:account-check-outline",
  messages: "mdi:email-outline",
  timetable: "mdi:timetable",
};

/** The cards of a child's view, section by section ("half" = two side by side). */
const CHILD_SECTIONS: [string, (string | [string, "half"])[]][] = [
  [
    "today",
    [
      "school-day",
      "today-lessons",
      "tomorrow",
      ["lucky-number", "half"],
      ["next-lesson-tile", "half"],
    ],
  ],
  ["grades", ["report-card", "semester", "grade-log"]],
  ["tests", ["exam-countdown", "exam-prep", "homework-checklist"]],
  ["attendance", ["attendance", "subject-attendance", "justifications"]],
  ["messages", ["messages", "announcements"]],
  ["timetable", ["week-timetable", "substitutions", "month-calendar"]],
];

/** "Zośka Kowalska" -> "zoska-kowalska" (a view path). */
function slug(text: string): string {
  const out = text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ł/g, "l")
    .replace(/Ł/g, "L")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return out || "uczen";
}

function heading(lang: Language, key: string): CardConfig {
  return { type: "heading", heading: HEADINGS[lang][key], icon: ICONS[key] };
}

function card(name: string, deviceId: string | undefined, half = false): CardConfig {
  return {
    type: `custom:librus-${name}-card`,
    ...(deviceId ? { device_id: deviceId } : {}),
    grid_options: { columns: half ? 6 : 12 },
  };
}

export class LibrusDashboardStrategy extends HTMLElement {
  static async generate(config: LibrusStrategyConfig, hass: LibrusHass): Promise<Record<string, unknown>> {
    const lang: Language = (hass.language ?? "").toLowerCase().startsWith("pl") ? "pl" : "en";
    const t = HEADINGS[lang];
    const found = findLibrusDeviceIds(hass);
    const ids = config.students?.length
      ? config.students.filter((id) => found.includes(id))
      : [...found].sort((a, b) => studentName(hass, a).localeCompare(studentName(hass, b)));

    if (ids.length === 0) {
      return {
        title: lang === "pl" ? "Szkoła" : "School",
        views: [
          {
            title: t.none,
            type: "sections",
            sections: [
              { type: "grid", cards: [{ type: "markdown", content: `## ${t.none}\n\n${t.none_text}` }] },
            ],
          },
        ],
      };
    }

    // With one child the cards find the student on their own; with several
    // each card is told which one.
    const several = ids.length > 1;
    const views: Record<string, unknown>[] = [];
    const used = new Set<string>(["rodzina"]);

    if (several && config.family_view !== false) {
      views.push({
        title: t.family,
        path: "rodzina",
        icon: "mdi:account-group-outline",
        type: "sections",
        max_columns: 2,
        sections: [
          { type: "grid", cards: [heading(lang, "all"), { type: "custom:librus-family-card", grid_options: { columns: 12 } }] },
          { type: "grid", cards: [heading(lang, "morning"), { type: "custom:librus-first-lesson-card", grid_options: { columns: 12 } }] },
        ],
      });
    }

    for (const id of ids) {
      const name = studentName(hass, id);
      let path = slug(name);
      for (let n = 2; used.has(path); n++) path = `${slug(name)}-${n}`;
      used.add(path);
      const deviceId = several ? id : undefined;
      views.push({
        title: name,
        path,
        icon: "mdi:school-outline",
        type: "sections",
        max_columns: 3,
        sections: CHILD_SECTIONS.map(([key, cards]) => ({
          type: "grid",
          cards: [
            heading(lang, key),
            ...cards.map((entry) => (Array.isArray(entry) ? card(entry[0], deviceId, true) : card(entry, deviceId))),
          ],
        })),
      });
    }

    return { title: lang === "pl" ? "Szkoła" : "School", views };
  }
}

customElements.define("ll-strategy-dashboard-librus", LibrusDashboardStrategy);

// Shown as a tile in Settings → Dashboards → Add dashboard (HA reads
// window.customStrategies, like window.customCards for cards).
const strategiesWindow = window as unknown as {
  customStrategies?: { type: string; name?: string; description?: string; documentationURL?: string; strategyType: string }[];
};
strategiesWindow.customStrategies = strategiesWindow.customStrategies ?? [];
strategiesWindow.customStrategies.push({
  type: "librus",
  name: "Szkoła (Librus)",
  description: "Gotowy dashboard dla każdego dziecka z Librus Synergia: dziś, oceny, sprawdziany, frekwencja, wiadomości i plan.",
  documentationURL: "https://github.com/MichalZaniewicz/ha-librus-synergia-cards#ready-made-dashboard",
  strategyType: "dashboard",
});
