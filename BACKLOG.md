# Backlog — ha-librus-synergia-cards

Card ideas raised but not built yet. Not a roadmap.

## New cards
- **Semester comparison** — semester 1 vs semester 2 average per subject,
  side by side. Data already exists: `average_semester_1` /
  `average_semester_2` attributes on every `subject_average` sensor (and
  the overall one).
- **Month mini-calendar** — a month grid highlighting exam days and free
  days. More work than the linear `librus-exam-countdown-card`.
- ~~**Teacher directory**~~ — done: `librus-teachers-card`, homeroom +
  subject teachers from the School/Class sensors' existing attributes.
- **Month mini-calendar** — a month grid highlighting exam days and free
  days. More work than the linear `librus-exam-countdown-card`.
- **Multi-student switcher** — flip a dashboard view between students. A
  card can't drive other cards' `device_id`, so this needs a different
  mechanism (a helper + conditional cards, or a dashboard-level trick).
- ~~**Level/XP card**~~ — done: `librus-level-card`, a pure-fun meter that
  only ever goes up (distinct from Rank, which tracks the current average
  and can go back down).

## Editor / config
- **`tap_action` in the visual editor** — it's YAML-only right now; the
  hand-rolled `librus-card-editor` has no nested action selector. A
  migration to HA's native `ha-form` (with its `ui-action` selector)
  would fix this and generally look more native — but can't be visually
  verified without a live HA instance.
- ~~**Per-card options**: `icon` / `compact` / hide-header~~ — done: every
  card gets these for free via `LibrusBaseCard` (a runtime reach-through
  into each card's own `_config` field, documented in `base-card.ts` -
  avoided a much larger refactor touching every card's `render()`).
  Category-keyword list for `librus-exam-countdown-card` was already
  done (`exam_keywords`). Still open: Mon-Fri vs Mon-Sat range for the
  timetable cards (partially covered by `show_saturday`), term scope for
  the attendance cards.
- ~~**List-card filters**~~ — done: `category_filter` / `days` / `sort` on
  `librus-grade-log-card` and `librus-subject-grades-card`. (Renamed from
  the original "Grade average" idea - that card has no per-grade list to
  filter, only per-subject averages; `librus-subject-grades-card` was the
  actual second list-shaped card.)
- Every card previously using the bare `librus-device-editor` (student
  picker only) was switched onto the shared `librusCardEditor()` this
  round, so the old separate editor element could be deleted - now there
  is exactly one editor implementation for the whole repo.

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
