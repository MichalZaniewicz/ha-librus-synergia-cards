import "./librus-device-editor";
import "./utils/card-editor";
import "./librus-grades-card";
import "./librus-grade-log-card";
import "./librus-subject-grades-card";
import "./librus-grade-trend-card";
import "./librus-grade-goal-card";
import "./librus-grade-simulator-card";
import "./librus-grade-distribution-card";
import "./librus-grades-radar-card";
import "./librus-grade-category-distribution-card";
import "./librus-latest-grade-card";
import "./librus-behaviour-grade-card";
import "./librus-descriptive-grades-card";
import "./librus-subject-spotlight-card";
import "./librus-attendance-card";
import "./librus-attendance-tile-card";
import "./librus-attendance-heatmap-card";
import "./librus-attendance-weekday-card";
import "./librus-behaviour-notices-card";
import "./librus-behaviour-notices-tile-card";
import "./librus-messages-card";
import "./librus-messages-tile-card";
import "./librus-substitutions-card";
import "./librus-announcements-card";
import "./librus-announcements-tile-card";
import "./librus-homework-assignments-card";
import "./librus-recent-activity-card";
import "./librus-today-lessons-card";
import "./librus-next-lesson-tile-card";
import "./librus-agenda-card";
import "./librus-exam-countdown-card";
import "./librus-free-days-card";
import "./librus-free-days-tile-card";
import "./librus-week-timetable-card";
import "./librus-bell-schedule-card";
import "./librus-subject-time-card";
import "./librus-school-card";
import "./librus-school-year-card";
import "./librus-today-card";
import "./librus-tomorrow-card";
import "./librus-week-summary-card";
import "./librus-lucky-number-card";
import "./librus-student-card";
import "./librus-streak-card";

interface CustomCardEntry {
  type: string;
  name: string;
  description: string;
  preview?: boolean;
}

declare global {
  interface Window {
    customCards?: CustomCardEntry[];
  }
}

window.customCards = window.customCards || [];
window.customCards.push(
  {
    type: "librus-grades-card",
    name: "Librus - Średnia ocen",
    description: "Średnia ogólna i średnie z każdego przedmiotu, z paskami porównawczymi.",
    preview: true,
  },
  {
    type: "librus-grade-log-card",
    name: "Librus - Dziennik ocen",
    description: "Wszystkie oceny ze wszystkich przedmiotów w jednej chronologicznej liście.",
    preview: true,
  },
  {
    type: "librus-subject-grades-card",
    name: "Librus - Oceny z przedmiotu",
    description: "Pełna lista ocen z JEDNEGO wybranego przedmiotu (wybór w konfiguracji karty).",
    preview: true,
  },
  {
    type: "librus-grade-trend-card",
    name: "Librus - Trend średniej",
    description: "Jak zmieniała się średnia (ogólna lub przedmiotu) w ostatnich 60 dniach.",
    preview: true,
  },
  {
    type: "librus-grade-goal-card",
    name: "Librus - Cel oceny",
    description: "Postęp do wybranej docelowej średniej (ogólnej lub z przedmiotu) + ile ocen brakuje.",
    preview: true,
  },
  {
    type: "librus-grade-simulator-card",
    name: "Librus - Symulator ocen",
    description: "A gdyby następna ocena to __ (waga __)? Zobacz, gdzie wylądowałaby średnia z przedmiotu.",
    preview: true,
  },
  {
    type: "librus-grade-distribution-card",
    name: "Librus - Rozkład ocen",
    description: "Histogram: ile było szóstek, piątek, czwórek itd. ze wszystkich przedmiotów.",
    preview: true,
  },
  {
    type: "librus-grades-radar-card",
    name: "Librus - Profil ocen (radar)",
    description: "Wykres pajęczynowy średnich wszystkich przedmiotów na jednym wykresie.",
    preview: true,
  },
  {
    type: "librus-grade-category-distribution-card",
    name: "Librus - Oceny wg kategorii",
    description: "Pierścieniowy wykres: ile ocen ze sprawdzianów, kartkówek, odpowiedzi itd.",
    preview: true,
  },
  {
    type: "librus-latest-grade-card",
    name: "Librus - Ostatnia ocena",
    description: "Najnowsza ocena ze wszystkich przedmiotów, wraz z komentarzem nauczyciela.",
    preview: true,
  },
  {
    type: "librus-behaviour-grade-card",
    name: "Librus - Ocena zachowania",
    description: "Formalna ocena zachowania, odrębna od uwag.",
    preview: true,
  },
  {
    type: "librus-descriptive-grades-card",
    name: "Librus - Oceny opisowe",
    description: "Oceny opisowe (nienumeryczne), jeśli szkoła je stosuje.",
    preview: true,
  },
  {
    type: "librus-subject-spotlight-card",
    name: "Librus - Najlepszy i najsłabszy przedmiot",
    description: "Dwa skrajne przedmioty wg średniej, obliczone z sensorów średnich per przedmiot.",
    preview: true,
  },
  {
    type: "librus-attendance-card",
    name: "Librus - Frekwencja",
    description: "Liczba realnych nieobecności i spóźnień, z rozbiciem na typy, % i podziałem na semestr.",
    preview: true,
  },
  {
    type: "librus-attendance-tile-card",
    name: "Librus - Frekwencja (kafelek)",
    description: "Kompaktowy kafelek z liczbą nieobecności i frekwencją %.",
    preview: true,
  },
  {
    type: "librus-attendance-heatmap-card",
    name: "Librus - Frekwencja (mapa roku)",
    description: "Mapa dni całego roku szkolnego kolorowana wg statusu frekwencji, w stylu GitHub contributions.",
    preview: true,
  },
  {
    type: "librus-attendance-weekday-card",
    name: "Librus - Nieobecności wg dnia tygodnia",
    description: "Słupek na każdy dzień tygodnia podzielony na usprawiedliwione/nieusprawiedliwione/spóźnienia.",
    preview: true,
  },
  {
    type: "librus-behaviour-notices-card",
    name: "Librus - Uwagi",
    description: "Lista uwag z kategorią i zabarwieniem (pozytywna/negatywna/neutralna).",
    preview: true,
  },
  {
    type: "librus-behaviour-notices-tile-card",
    name: "Librus - Uwagi (kafelek)",
    description: "Kompaktowy kafelek z liczbą uwag i ostatnią kategorią.",
    preview: true,
  },
  {
    type: "librus-messages-card",
    name: "Librus - Wiadomości",
    description: "Nieprzeczytane wiadomości ze wszystkich skrzynek i podgląd ostatnich z odebranych.",
    preview: true,
  },
  {
    type: "librus-messages-tile-card",
    name: "Librus - Wiadomości (kafelek)",
    description: "Kompaktowy kafelek z liczbą nieprzeczytanych i ostatnim nadawcą.",
    preview: true,
  },
  {
    type: "librus-substitutions-card",
    name: "Librus - Zastępstwa i alerty",
    description: "Pełna treść zastępstw i alertów - kliknij, by rozwinąć.",
    preview: true,
  },
  {
    type: "librus-announcements-card",
    name: "Librus - Ogłoszenia",
    description: "Nieprzeczytane ogłoszenia z tablicy szkolnej.",
    preview: true,
  },
  {
    type: "librus-announcements-tile-card",
    name: "Librus - Ogłoszenia (kafelek)",
    description: "Kompaktowy kafelek z liczbą nieprzeczytanych ogłoszeń.",
    preview: true,
  },
  {
    type: "librus-homework-assignments-card",
    name: "Librus - Zadania domowe",
    description: "Lista realnych zadań domowych z terminami.",
    preview: true,
  },
  {
    type: "librus-recent-activity-card",
    name: "Librus - Co nowego",
    description: "Wspólny, chronologiczny feed najnowszych ocen, uwag, ogłoszeń i wiadomości.",
    preview: true,
  },
  {
    type: "librus-today-lessons-card",
    name: "Librus - Dzisiejszy plan lekcji",
    description: "Oś czasu dzisiejszych lekcji z podświetleniem aktualnej.",
    preview: true,
  },
  {
    type: "librus-next-lesson-tile-card",
    name: "Librus - Najbliższa lekcja",
    description: "Kompaktowy kafelek z najbliższą lub trwającą lekcją.",
    preview: true,
  },
  {
    type: "librus-agenda-card",
    name: "Librus - Terminarz",
    description: "Nadchodzące wydarzenia z terminarza, pogrupowane wg dnia.",
    preview: true,
  },
  {
    type: "librus-exam-countdown-card",
    name: "Librus - Najbliższy sprawdzian",
    description: "Odliczanie do najbliższego sprawdzianu z terminarza, wyodrębnione z ogólnej listy.",
    preview: true,
  },
  {
    type: "librus-free-days-card",
    name: "Librus - Dni wolne",
    description: "Odliczanie do najbliższej przerwy i lista kolejnych dni wolnych.",
    preview: true,
  },
  {
    type: "librus-free-days-tile-card",
    name: "Librus - Dni wolne (kafelek)",
    description: "Kompaktowy kafelek z odliczaniem do najbliższej przerwy.",
    preview: true,
  },
  {
    type: "librus-week-timetable-card",
    name: "Librus - Plan tygodniowy",
    description: "Siatka planu lekcji na cały tydzień.",
    preview: true,
  },
  {
    type: "librus-bell-schedule-card",
    name: "Librus - Plan dnia",
    description: "Rozkład dzwonków na dziś z podświetleniem bieżącej lekcji.",
    preview: true,
  },
  {
    type: "librus-subject-time-card",
    name: "Librus - Podział czasu lekcji",
    description: "Pierścieniowy wykres liczby lekcji w tygodniu na przedmiot, z planu lekcji.",
    preview: true,
  },
  {
    type: "librus-school-card",
    name: "Librus - Szkoła i klasa",
    description: "Nazwa i adres szkoły, klasa, wychowawca, terminy semestru.",
    preview: true,
  },
  {
    type: "librus-school-year-card",
    name: "Librus - Koniec roku szkolnego",
    description: "Odliczanie do końca roku szkolnego, pasek postępu roku i data końca semestru.",
    preview: true,
  },
  {
    type: "librus-today-card",
    name: "Librus - Dziś",
    description: "Szczęśliwy numerek, nieprzeczytane wiadomości/ogłoszenia i najbliższa lekcja w jednym miejscu.",
    preview: true,
  },
  {
    type: "librus-tomorrow-card",
    name: "Librus - Jutro",
    description: "Następny dzień nauki: lekcje, zadania na termin i sprawdziany (ogarnia weekend).",
    preview: true,
  },
  {
    type: "librus-week-summary-card",
    name: "Librus - Tydzień w skrócie",
    description: "Nowe oceny, nieobecności, uwagi i najbliższe wydarzenie w tym tygodniu.",
    preview: true,
  },
  {
    type: "librus-lucky-number-card",
    name: "Librus - Szczęśliwy numerek",
    description: "Dzisiejszy szczęśliwy numerek w dużym formacie.",
    preview: true,
  },
  {
    type: "librus-student-card",
    name: "Librus - Karta ucznia",
    description: "Zabawowa karta w stylu trading-card, licząca ogólną ocenę z frekwencji/zachowania/ocen/aktywności.",
    preview: true,
  },
  {
    type: "librus-streak-card",
    name: "Librus - Seria bez nieobecności",
    description: "Licznik kolejnych dni bez nieobecności.",
    preview: true,
  }
);

// eslint-disable-next-line no-console
console.info(
  "%c LIBRUS-SYNERGIA-CARDS %c 43 cards loaded ",
  "color: #fff; background: #4f46e5; font-weight: 700; border-radius: 3px 0 0 3px; padding: 2px 6px;",
  "color: #4f46e5; background: transparent; font-weight: 500;"
);
