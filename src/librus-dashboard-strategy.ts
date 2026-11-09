import type { LibrusHass } from "./utils/types";
import { findLibrusDeviceIds, mapByTranslationKey } from "./utils/entities";
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
 * view per child, most important first: today, what needs doing (tests,
 * absences to excuse, messages, homework), the weekly AI summary (when it's
 * set up), what's new, grades, attendance, timetable, school. Every card
 * full width. Built from the integration's devices
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

type Language = "pl" | "en" | "uk" | "pt" | "ru" | "de" | "fr";

const HEADINGS: Record<Language, Record<string, string>> = {
  pl: {
    family: "Rodzina",
    all: "Wszystkie dzieci",
    morning: "Rano",
    today: "Dziś",
    todo: "Do zrobienia",
    week: "Tydzień",
    news: "Co nowego",
    grades: "Oceny",
    attendance: "Frekwencja",
    timetable: "Plan",
    school: "Szkoła",
    none: "Brak uczniów",
    none_text:
      "Nie znaleziono żadnego ucznia z integracji Librus Synergia. Dodaj integrację w Ustawieniach → Urządzenia i usługi, a potem odśwież ten dashboard.",
  },
  en: {
    family: "Family",
    all: "All children",
    morning: "Morning",
    today: "Today",
    todo: "To do",
    week: "This week",
    news: "What's new",
    grades: "Grades",
    attendance: "Attendance",
    timetable: "Timetable",
    school: "School",
    none: "No students",
    none_text:
      "No student from the Librus Synergia integration was found. Add the integration under Settings → Devices & services, then reload this dashboard.",
  },
  uk: {
    family: "Родина",
    all: "Усі діти",
    morning: "Ранок",
    today: "Сьогодні",
    todo: "Зробити",
    week: "Цей тиждень",
    news: "Що нового",
    grades: "Оцінки",
    attendance: "Відвідуваність",
    timetable: "Розклад",
    school: "Школа",
    none: "Немає учнів",
    none_text:
      "Не знайдено жодного учня з інтеграції Librus Synergia. Додайте інтеграцію в Налаштуваннях → Пристрої та служби, а потім оновіть цю панель.",
  },
  pt: {
    family: "Família",
    all: "Todos os filhos",
    morning: "Manhã",
    today: "Hoje",
    todo: "Por fazer",
    week: "Esta semana",
    news: "Novidades",
    grades: "Notas",
    attendance: "Assiduidade",
    timetable: "Horário",
    school: "Escola",
    none: "Sem alunos",
    none_text:
      "Não foi encontrado nenhum aluno da integração Librus Synergia. Adicione a integração em Definições → Dispositivos e serviços e depois recarregue este painel.",
  },
  ru: {
    family: "Семья",
    all: "Все дети",
    morning: "Утро",
    today: "Сегодня",
    todo: "Нужно сделать",
    week: "Эта неделя",
    news: "Что нового",
    grades: "Оценки",
    attendance: "Посещаемость",
    timetable: "Расписание",
    school: "Школа",
    none: "Нет учеников",
    none_text:
      "Не найдено ни одного ученика из интеграции Librus Synergia. Добавьте интеграцию в разделе Настройки → Устройства и службы, затем обновите эту панель.",
  },
  de: {
    family: "Familie",
    all: "Alle Kinder",
    morning: "Morgen",
    today: "Heute",
    todo: "Zu erledigen",
    week: "Diese Woche",
    news: "Neuigkeiten",
    grades: "Noten",
    attendance: "Anwesenheit",
    timetable: "Stundenplan",
    school: "Schule",
    none: "Keine Schüler",
    none_text:
      "Es wurde kein Schüler aus der Integration Librus Synergia gefunden. Füge die Integration unter Einstellungen → Geräte & Dienste hinzu und lade dann dieses Dashboard neu.",
  },
  fr: {
    family: "Famille",
    all: "Tous les enfants",
    morning: "Matin",
    today: "Aujourd'hui",
    todo: "À faire",
    week: "Cette semaine",
    news: "Nouveautés",
    grades: "Notes",
    attendance: "Assiduité",
    timetable: "Emploi du temps",
    school: "École",
    none: "Aucun élève",
    none_text:
      "Aucun élève de l'intégration Librus Synergia n'a été trouvé. Ajoutez l'intégration dans Paramètres → Appareils et services, puis rechargez ce tableau de bord.",
  },
};

function languageOf(hass: { language?: string }): Language {
  const code = (hass.language ?? "").toLowerCase().split("-")[0];
  return code in HEADINGS ? (code as Language) : "en";
}

const ICONS: Record<string, string> = {
  all: "mdi:account-group-outline",
  morning: "mdi:alarm",
  today: "mdi:calendar-today",
  todo: "mdi:bell-alert-outline",
  week: "mdi:robot-outline",
  news: "mdi:bell-outline",
  grades: "mdi:star-outline",
  attendance: "mdi:account-check-outline",
  timetable: "mdi:timetable",
  school: "mdi:school-outline",
};

/**
 * The cards of a child's view, section by section, most important first:
 * what's on today, what needs doing, the week at a glance, then what
 * changes slowly or is there to look things up. With three columns the
 * first three sections are the top row. "week" (the weekly AI summary) is
 * left out when the summary isn't set up.
 */
const CHILD_SECTIONS: [string, string[]][] = [
  ["today", ["school-day", "today-lessons", "tomorrow"]],
  ["todo", ["exam-countdown", "justifications", "messages", "homework-checklist"]],
  ["week", ["ai-summary"]],
  ["news", ["recent-activity"]],
  ["grades", ["report-card", "semester", "grade-log"]],
  ["attendance", ["attendance", "subject-attendance"]],
  ["timetable", ["week-timetable", "substitutions", "month-calendar"]],
  ["school", ["announcements", "lucky-number"]],
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

function card(name: string, deviceId: string | undefined): CardConfig {
  // Full width: a card squeezed next to another cuts its text.
  return {
    type: `custom:librus-${name}-card`,
    ...(deviceId ? { device_id: deviceId } : {}),
    grid_options: { columns: 12 },
  };
}

export class LibrusDashboardStrategy extends HTMLElement {
  static async generate(config: LibrusStrategyConfig, hass: LibrusHass): Promise<Record<string, unknown>> {
    const lang = languageOf(hass);
    const t = HEADINGS[lang];
    const found = findLibrusDeviceIds(hass);
    const ids = config.students?.length
      ? config.students.filter((id) => found.includes(id))
      : [...found].sort((a, b) => studentName(hass, a).localeCompare(studentName(hass, b)));

    if (ids.length === 0) {
      return {
        title: HEADINGS[lang].school,
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

    // With one Librus device in Home Assistant the cards find the student on
    // their own; with several each card is told which one - also when
    // `students` picks only some of them (a card without `device_id` then
    // can't tell which child it's for). The family view only makes sense
    // with two or more children shown.
    const passDeviceId = found.length > 1;
    const views: Record<string, unknown>[] = [];
    const used = new Set<string>(["rodzina"]);

    if (ids.length > 1 && config.family_view !== false) {
      views.push({
        title: t.family,
        path: "rodzina",
        icon: "mdi:account-group-outline",
        type: "sections",
        max_columns: 2,
        sections: [
          { type: "grid", cards: [heading(lang, "all"), { type: "custom:librus-family-card", grid_options: { columns: 12 } }] },
          {
            type: "grid",
            cards: [
              heading(lang, "morning"),
              { type: "custom:librus-first-lesson-card", grid_options: { columns: 12 } },
              { type: "custom:librus-siblings-card", grid_options: { columns: 12 } },
            ],
          },
        ],
      });
    }

    for (const id of ids) {
      const name = studentName(hass, id);
      let path = slug(name);
      for (let n = 2; used.has(path); n++) path = `${slug(name)}-${n}`;
      used.add(path);
      const deviceId = passDeviceId ? id : undefined;
      views.push({
        title: name,
        path,
        icon: "mdi:school-outline",
        type: "sections",
        max_columns: 3,
        sections: CHILD_SECTIONS.filter(
          ([key]) => key !== "week" || mapByTranslationKey(hass, id).weekly_summary
        ).map(([key, cards]) => ({
          type: "grid",
          cards: [heading(lang, key), ...cards.map((name) => card(name, deviceId))],
        })),
      });
    }

    return { title: HEADINGS[lang].school, views };
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
