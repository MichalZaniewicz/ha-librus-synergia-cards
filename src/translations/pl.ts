import type { en } from "./en";

export const pl: Record<keyof typeof en, string> = {
  "error.device_missing": "Nie znaleziono urządzenia {device}",
  "error.multiple_devices": "Znaleziono kilkoro uczniów - ustaw device_id",
  "error.no_device": "Nie znaleziono urządzenia Librus Synergia",
  "empty.loading": "Wczytywanie…",
  "empty.generic_error": "Coś poszło nie tak",

  "card.grades.title": "Średnia ocen",
  "card.grades.subtitle": "Wszystkie przedmioty",
  "card.grades.empty": "Brak ocen w tym roku szkolnym",

  "card.grade_trend.title": "Trend średniej",
  "card.grade_trend.subtitle": "Ostatnie {days} dni",
  "card.grade_trend.empty": "Za mało historii",

  "card.grade_distribution.title": "Rozkład ocen",
  "card.grade_distribution.subtitle": "{count} ocen, wszystkie przedmioty",
  "card.grade_distribution.other": "inne",

  "card.recent_activity.title": "Co nowego",
  "card.recent_activity.subtitle": "Oceny, uwagi, ogłoszenia i wiadomości",
  "card.recent_activity.empty": "Nic nowego",

  "card.grade_log.title": "Dziennik ocen",
  "card.grade_log.subtitle": "Wszystkie przedmioty",

  "card.latest_grade.title": "Ostatnia ocena",
  "card.latest_grade.empty": "Brak ocen",

  "card.behaviour_grade.title": "Ocena zachowania",
  "card.behaviour_grade.subtitle": "Ocena semestralna",
  "card.behaviour_grade.empty": "Brak jeszcze oceny zachowania",

  "card.descriptive_grades.title": "Oceny opisowe",
  "card.descriptive_grades.subtitle": "Ocenianie opisowe",
  "card.descriptive_grades.empty": "Brak jeszcze ocen opisowych",

  "card.attendance.title": "Frekwencja",
  "card.attendance.subtitle": "W tym roku szkolnym",
  "card.attendance.by_semester": "Wg semestru",
  "card.attendance.semester": "Semestr {n}",
  "stat.absences": "Nieobecności",
  "stat.late": "Spóźnienia",
  "stat.records": "Rekordów",
  "stat.percentage": "Frekwencja",

  "card.behaviour_notices.title": "Uwagi",
  "card.behaviour_notices.empty": "Brak uwag",

  "card.messages.title": "Wiadomości",
  "card.messages.unavailable": "Moduł wiadomości nie jest włączony",
  "card.messages.read_notice": "Otwarcie oznaczy jako przeczytane w Librusie",
  "card.messages.fetch_failed": "Nie udało się pobrać pełnej treści",

  "card.substitutions.title": "Zastępstwa, alerty i usprawiedliwienia",
  "card.substitutions.subtitle": "Wiadomości specjalne",
  "card.substitutions.empty": "Brak zastępstw, alertów ani usprawiedliwień",
  "mailbox.inbox": "Odebrane",
  "mailbox.notes": "Uwagi",
  "mailbox.alerts": "Alerty",
  "mailbox.substitutions": "Zastępstwa",
  "mailbox.absences": "Nieobecności",
  "mailbox.justifications": "Usprawiedliwienia",
  "mailbox.trash": "Kosz",

  "card.announcements.title": "Ogłoszenia",
  "card.announcements.empty": "Brak ogłoszeń",

  "card.homework_assignments.title": "Zadania domowe",
  "card.homework_assignments.empty": "Brak zadań domowych",
  "label.due": "Termin",

  "card.today_lessons.title": "Dzisiejszy plan lekcji",
  "card.today_lessons.subtitle": "Plan lekcji",
  "card.today_lessons.empty": "Brak lekcji dzisiaj",
  "label.now": "teraz",

  "card.next_lesson.title": "Najbliższa lekcja",
  "card.next_lesson.empty": "Koniec lekcji na dziś",
  "label.in_minutes": "za {minutes} min",
  "label.in_hours": "za {hours} godz.",
  "label.in_hours_minutes": "za {hours} godz. {minutes} min",
  "label.in_days": "za {days} dni",
  "label.in_days_hours": "za {days} dni {hours} godz.",

  "card.agenda.title": "Terminarz",
  "card.agenda.subtitle": "Nadchodzące",
  "card.agenda.empty": "Brak zaplanowanych wydarzeń",

  "card.free_days.title": "Dni wolne",
  "card.free_days.empty": "Brak nadchodzących dni wolnych",
  "label.days_until": "dni do",

  "card.week_timetable.title": "Plan tygodniowy",
  "card.week_timetable.subtitle": "Ten tydzień",
  "card.week_timetable.subtitle_upcoming": "Nadchodzący tydzień",
  "card.week_timetable.empty": "Brak lekcji w tym tygodniu",

  "card.school.title": "Szkoła",
  "label.head_teacher": "Dyrektor",
  "label.tutor": "Wychowawca",
  "label.semester_ends": "Koniec semestru",
  "label.year_ends": "Koniec roku szkolnego",

  "card.today.title": "Dziś",
  "stat.lucky_number": "Numerek",
  "stat.unread_messages": "Nieprzeczytane",
  "stat.new_announcements": "Nowe",

  "card.week_summary.title": "Tydzień w skrócie",
  "stat.new_grades": "Nowe oceny",

  "card.lucky_number.title": "Szczęśliwy numerek",
  "card.lucky_number.subtitle": "Dziś w dzienniku",
  "card.lucky_number.subtitle_for_date": "Na {date}",

  "card.student.title": "Karta ucznia",
  "stat.overall_rating": "ocena ogólna",
  "stat.attendance_score": "Frekwencja",
  "stat.behaviour_score": "Zachowanie",
  "stat.grades_score": "Oceny",
  "stat.activity_score": "Aktywność",

  "card.streak.title": "Seria bez nieobecności",
  "card.streak.subtitle": "Aktualna passa",
  "label.days": "dni",
};
