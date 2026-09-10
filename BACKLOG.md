# Backlog — ha-librus-synergia-cards

Card ideas raised but not built yet. Not a roadmap.

## New cards
- **Semester comparison** — semester 1 vs semester 2 average per subject,
  side by side. Data already exists: `average_semester_1` /
  `average_semester_2` attributes on every `subject_average` sensor (and
  the overall one).
- **Month mini-calendar** — a month grid highlighting exam days and free
  days. More work than the linear `librus-exam-countdown-card`.
- **Teacher directory** — homeroom + subject teachers. Thin until the
  integration exposes subject teachers (only homeroom is available now).
- **Multi-student switcher** — flip a dashboard view between students. A
  card can't drive other cards' `device_id`, so this needs a different
  mechanism (a helper + conditional cards, or a dashboard-level trick).

## Editor / config
- **`tap_action` in the visual editor** — it's YAML-only right now; the
  hand-rolled `librus-card-editor` has no nested action selector. A
  migration to HA's native `ha-form` (with its `ui-action` selector)
  would fix this and generally look more native — but can't be visually
  verified without a live HA instance.
- **Per-card options not yet exposed**: `icon` / `compact` on every card,
  category-keyword list for `librus-exam-countdown-card`, Mon-Fri vs
  Mon-Sat range for the timetable cards, term scope for the attendance
  cards, streak-type for `librus-streak-card`.
- **List-card filters** — category filter / sort / date range for
  `librus-grade-log-card` and `librus-grades-card` (only `max_items` so
  far).
- **`toggle header` common option** — hide the card header entirely.

## Card behaviour
- **`librus-messages-card` mark-as-read button** — an explicit action
  calling `librus_synergia.get_message` (which marks read) without
  expanding the row.
- **`librus-homework-checklist-card` shared done-state** — currently
  per-browser `localStorage`. A `todo` entity or `input_boolean` helper
  would sync it across devices, but that's a bigger lift and needs the
  user to create the helper.
- **Other donut → bar** — `librus-grade-category-distribution-card` still
  uses a donut; the `hBarChart` helper (added for `librus-subject-time-card`)
  could replace it if a school has many grade categories.
