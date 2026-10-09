# Librus Synergia Cards

<p align="center">
  <img src="https://raw.githubusercontent.com/MichalZaniewicz/ha-librus-synergia-cards/main/docs/hero-banner.svg" alt="Librus Synergia Cards">
</p>

Custom Lovelace cards for [`ha-librus-synergia`](https://github.com/MichalZaniewicz/ha-librus-synergia) (the
`librus_synergia` integration) - purpose-built widgets instead of wiring its sensors and calendars into
generic entity/gauge cards by hand.

> [!TIP]
> ⭐ **Enjoying these cards?** Every star is real motivation to keep building new features :)
>
> ☕ Want to say thanks another way? You can [buy me a coffee](https://buymeacoffee.com/zanula).

<!-- The badge lives OUTSIDE the alert on purpose: Home Assistant/HACS rewrites a GitHub alert
into <ha-alert> and drops every child whose textContent is empty, which silently removes any
<img> placed inside it. -->

[![Star this repo](https://img.shields.io/github/stars/MichalZaniewicz/ha-librus-synergia-cards?style=for-the-badge&logo=github&label=STAR%20THIS%20REPO&labelColor=555555&color=4f46e5)](https://github.com/MichalZaniewicz/ha-librus-synergia-cards) [![Buy me a coffee](https://img.shields.io/badge/BUY%20ME%20A%20COFFEE-FFDD00?style=for-the-badge&logo=buymeacoffee&logoColor=black)](https://buymeacoffee.com/zanula)

<p align="center">
  <a href="https://my.home-assistant.io/redirect/hacs_repository/?owner=MichalZaniewicz&repository=ha-librus-synergia-cards&category=plugin"><img alt="Open your Home Assistant instance and open this repository inside the Home Assistant Community Store." src="https://my.home-assistant.io/badges/hacs_repository.svg"></a>
</p>

## A school dashboard, ready-made

<p align="center">
  <img src="https://raw.githubusercontent.com/MichalZaniewicz/ha-librus-synergia-cards/main/docs/trailer.webp" alt="Librus Synergia Cards trailer: 65 cards, light and dark, English and Polish, the visual editor">
</p>

66 cards built for one job: showing a child's school life from Librus on a Home Assistant dashboard. Today's lessons and what changed, grades with a report card forecast, attendance, messages, homework, tests and the lucky number. Every card follows your light or dark theme, speaks English or Polish, and is set up in the visual editor, without YAML. With more than one child, each card picks a student, and some show all of them at once.

The cards read the entities of the [Librus Synergia integration](https://github.com/MichalZaniewicz/ha-librus-synergia), so install that first.

## Meet the cards

![Preview of the Librus Synergia cards](https://raw.githubusercontent.com/MichalZaniewicz/ha-librus-synergia-cards/main/docs/screenshots/cards-overview-dark.png)

## Cards

| Card | `type` | What it shows |
|---|---|---|
| Grade average | `custom:librus-grades-card` | Overall average (weighted, or arithmetic if the integration's average mode says so) and per-subject averages with comparison bars (a subject graded in points shows its percentage) |
| School trips | `custom:librus-school-trips-card` | The next school trip - date, how the class travels, the route and the coordinator - with a "tomorrow" / "in N days" badge, and the trips after it. Options: title, how many trips to list. Needs `ha-librus-synergia` 0.12.0+ (Next school trip sensor) |
| Test revision | `custom:librus-exam-prep-card` | Tests of the coming days, each with the topics to revise: the lessons taught in that subject since the previous test, the ones the student missed marked. The soonest test is open; tap any other to open it. Options: title, how many days ahead (default 14). Needs `ha-librus-synergia` 0.12.1+ (Next exam sensor with topics) |
| School documents | `custom:librus-school-documents-card` | The forms and regulations the school shares with parents, newest first, "new" for a week after they're added; a tap downloads the document through Home Assistant (needs `ha-librus-synergia` 0.12.5+; with an older one it opens the document in Synergia, which works only where the browser is logged in to Librus). Options: title, how many to list (default 6). Needs `ha-librus-synergia` 0.12.0+ (School documents sensor) |
| Justifications | `custom:librus-justifications-card` | The days still to excuse (nothing sent yet), then the justifications sent with the school's decision (waiting, accepted, rejected). Options: title, how many to list (default 5). Needs `ha-librus-synergia` 0.12.0+ (Absence justifications sensor) |
| Month calendar | `custom:librus-month-calendar-card` | A month grid with coloured dots for tests, quizzes, trips, meetings and other Agenda entries, homework due dates and days off; arrows switch the month, tapping a day lists its entries. Tests and quizzes are recognised by the school's own Agenda category names. Options: title |
| Catch up | `custom:librus-catch-up-card` | After the latest absence: the lessons missed with their topics and the homework given meanwhile, grouped by subject, each with a tick-box (kept in this browser) and a progress bar. Options: title. Needs `ha-librus-synergia` 0.12.2+ (Lesson topics sensor with `catch_up`) |
| What was taught | `custom:librus-lesson-topics-card` | The topics of the last few school days, day by day and lesson by lesson; lessons the student missed are marked, so it doubles as a "what to catch up on" list. Options: title, number of school days. Needs `ha-librus-synergia` 0.12.0+ (Lesson topics sensor) |
| Grade log | `custom:librus-grade-log-card` | Every grade from every subject, newest first, one chronological list (point grades as "17/20 85%") |
| Subject grades | `custom:librus-subject-grades-card` | Every grade from ONE subject you pick in the card's own config (point grades as "17/20 85%") |
| Grade trend | `custom:librus-grade-trend-card` | How the overall (or one subject's) average has moved over the last 60 days, from its own state history |
| Grade goal | `custom:librus-grade-goal-card` | Progress ring toward a target average you pick (overall or one subject), plus a rough "how many more top grades" estimate |
| Grade simulator | `custom:librus-grade-simulator-card` | Tap a grade + weight and see where the chosen subject's average would land (rough estimate) |
| Semester comparison | `custom:librus-semester-comparison-card` | Semester 1 vs 2 average per subject, side by side, with the change - fills in as semester 2 data lands |
| Grade distribution | `custom:librus-grade-distribution-card` | Histogram - how many 6s/5s/4s/... across every subject |
| Grade profile (radar) | `custom:librus-grades-radar-card` | Every subject's average on one spider/radar chart, so a strong or weak subject stands out at a glance |
| Grades by category | `custom:librus-grade-category-distribution-card` | A ranked horizontal bar chart of how the year's grades split across categories (Sprawdzian/Kartkówka/Odpowiedź/...) |
| Latest grade | `custom:librus-latest-grade-card` | The most recent grade across all subjects, with the teacher's comment if any |
| Behaviour grade | `custom:librus-behaviour-grade-card` | The formal "ocena zachowania" - distinct from the free-text notices below |
| Descriptive grades | `custom:librus-descriptive-grades-card` | Non-numeric descriptive assessment, for schools that use it |
| Report card forecast | `custom:librus-report-card-card` | The report card the averages point to: a tile per subject with the forecast grade (red when heading for a 1, amber when it dropped recently), the forecast report-card average with progress towards a distinction (4.75), and the subjects where one grade changes something. Thresholds come from the integration's options (requires `ha-librus-synergia` 0.12.0+) |
| Best & weakest subject | `custom:librus-subject-spotlight-card` | The two extremes by average, side by side - computed from the per-subject average sensors, no backend changes needed |
| Attendance | `custom:librus-attendance-card` | Percentage, unexcused count and excused count as their own stat tiles (requires `ha-librus-synergia` 0.4.19+), full per-type breakdown below (excused absences in their own color, distinct from unexcused), and a per-semester breakdown |
| Attendance tile | `custom:librus-attendance-tile-card` | Compact single-row tile - unexcused absence count + percentage, with excused ones called out separately (requires `ha-librus-synergia` 0.4.19+) |
| Attendance heatmap | `custom:librus-attendance-heatmap-card` | A GitHub-contributions-style calendar of the school year so far, one square per school day colored by that day's worst attendance status (requires `ha-librus-synergia` 0.4.20+) |
| Absences by weekday | `custom:librus-attendance-weekday-card` | Which weekday absences/lates tend to land on - each weekday's bar split into its own excused/unexcused/late segments (requires `ha-librus-synergia` 0.4.21+) |
| Absences by subject | `custom:librus-attendance-subject-card` | Ranked bar per subject showing which one is missed most often, split into excused/unexcused (requires `ha-librus-synergia` 0.7.7+) |
| Attendance by subject | `custom:librus-subject-attendance-card` | A tile per subject with the % of lessons attended, coloured green / amber / red (below 50%); subjects with fewer than 5 lessons greyed out (requires `ha-librus-synergia` 0.9.0+) |
| School day | `custom:librus-school-day-card` | Today's lessons as a strip of cells with short subject names - or the next school day's once school is out: the current lesson highlighted, past ones dimmed, cancelled ones struck through, substitutions, room changes and moved lessons outlined. Below: the lesson now (and minutes left), the break before the next one, or the first lesson and when it starts |
| Behaviour notices | `custom:librus-behaviour-notices-card` | Recent "uwagi" with category and sentiment (positive/negative/neutral) |
| Behaviour notices tile | `custom:librus-behaviour-notices-tile-card` | Compact single-row tile - count + latest category |
| Messages | `custom:librus-messages-card` | Unread counts across every Wiadomości mailbox, with a preview of recent messages from the chosen mailbox (inbox by default) - click one to load its full content (requires `ha-librus-synergia` 0.4.11+; this marks the message read in Librus, exactly like opening it in the Librus app). A paperclip badge marks messages with an attachment; the expanded view shows its real filename (requires 0.7.2+); with 0.12.0+ a tap on the file name downloads it to your device, without saving it in Home Assistant or opening the message in Librus. Tap a mailbox chip to switch to it; with a newer integration there are also *Sent* (with the recipient) and *Archive* (past school years), and mailboxes your account doesn't have are hidden. A mailbox with no messages (or, for the count-only ones, nothing unread) is greyed out. Files in archived messages can't be downloaded here - Librus doesn't allow it outside Synergia - so the card lists them without a download. In *Sent*, a message from the last 30 days says whether it has been read (and by how many recipients; the names show on hover) - needs a newer integration |
| Messages tile | `custom:librus-messages-tile-card` | Compact single-row tile - unread count + latest sender/topic |
| Timetable changes | `custom:librus-substitutions-card` | Substitutions, cancelled lessons, room changes and moved lessons from the timetable calendar - the next days (`days_ahead`, default 7) with filter chips, plus the last few changes (`hide_past: true` hides them). Below them, the school's own "Zastępstwa", "Alerty" and "Usprawiedliwienia" mailboxes when the school uses them (click a message to load it in full). |
| Announcements | `custom:librus-announcements-card` | The school notice board - unread notices in bold with a green dot, read ones dimmed (needs `ha-librus-synergia` 0.12.5+; older versions show unread ones only). Click one to expand its full content; no read-marking side effect, unlike Wiadomości |
| Announcements tile | `custom:librus-announcements-tile-card` | Compact single-row tile - unread count + latest subject |
| Homework assignments | `custom:librus-homework-assignments-card` | Real "zadania domowe" with due dates - distinct from the general agenda feed. Files a teacher attached are listed under each homework; a tap downloads one (needs a newer integration) |
| Homework checklist | `custom:librus-homework-checklist-card` | The same list with a tick-box per item; ticked items drop to the bottom. With `ha-librus-synergia` 0.11.0+ the ticks go to its Homework to-do list, so every device sees the same; on older versions they stay in this browser. Files a teacher attached are listed under the homework; a tap downloads one without ticking the homework off (needs a newer integration) |
| What's new | `custom:librus-recent-activity-card` | One chronological feed merging the most recent grades, notices, announcements and messages |
| Today's lessons | `custom:librus-today-lessons-card` | A timeline of today's timetable, highlighting the current lesson. Marks cancelled lessons, substitutions (with what they replace), room changes ("room 12 → 21") and moved lessons |
| Next lesson | `custom:librus-next-lesson-tile-card` | A single-row tile with the next (or current) lesson, for denser dashboards |
| Agenda | `custom:librus-agenda-card` | Upcoming terminarz events, grouped by date |
| Next exam | `custom:librus-exam-countdown-card` | A countdown to the next test/exam - uses the integration's `next_exam` sensor when present, otherwise scans the Agenda feed for "[Sprawdzian]"-tagged items |
| Free days | `custom:librus-free-days-card` | A countdown to the next school break, plus a short list of the next few |
| Free days tile | `custom:librus-free-days-tile-card` | Compact single-row tile - days until the next break |
| Week timetable | `custom:librus-week-timetable-card` | The whole week's lesson grid at a glance, with the lesson happening right now highlighted; substitutions, room changes and moved lessons are outlined (details in the tooltip) |
| Today's schedule | `custom:librus-bell-schedule-card` | The day's period grid (bell times) with each period's subject and room from the timetable, current period highlighted, past ones dimmed; once the day's lessons are over it shows the next school day - needs the integration's `bell_schedule` attribute |
| Lesson time split | `custom:librus-subject-time-card` | A ranked horizontal bar chart of how the week's lesson slots split across subjects, from the timetable |
| School & class | `custom:librus-school-card` | School name/address/head teacher, class, homeroom teacher, semester dates |
| End of school year | `custom:librus-school-year-card` | A countdown to the end of the school year, a progress ring for how far through it you are, and the current semester's own end date |
| Today | `custom:librus-today-card` | Lucky number, unread messages/announcements and the next lesson in one card |
| Tomorrow | `custom:librus-tomorrow-card` | The next school day (skips the weekend): its lessons, plus any homework due or exam that day |
| First lesson | `custom:librus-first-lesson-card` | **Every child at once**: when and with what each one starts today and on the next school day, who has to leave first, a cancelled first lesson or a substitution. Made for families with several kids |
| Week in review | `custom:librus-week-summary-card` | New grades, absences, notices and the next agenda item this week |
| Lucky number | `custom:librus-lucky-number-card` | The latest "szczęśliwy numerek" in large type - labeled "For {date}" instead of "Today" when Librus has published the next school day's number ahead of time (requires `ha-librus-synergia` 0.4.15+) |
| Student card | `custom:librus-student-card` | A playful trading-card style summary computed from attendance/behaviour/grades/activity |
| Streaks | `custom:librus-streak-card` | Three "passy": days without an absence, days without a negative behaviour note, consecutive good grades in a row (requires `ha-librus-synergia` 0.6.0+ for the two new ones - falls back to the old attendance-only computation on an older backend) |
| Rank | `custom:librus-rank-card` | Cosmetic Bronze/Silver/Gold/Diamond tier from your overall average, as a progress ring toward the next one up (requires `ha-librus-synergia` 0.6.0+) |
| Achievements | `custom:librus-achievements-card` | Every badge earned (20 badges, several with tiers - sixes, good-grade, attendance and behaviour streaks, a full month at school, a test at 5+, and more), the three closest goals with progress bars and the latest earned with their dates. Badges come from the Rank sensor's `badges` attribute (`ha-librus-synergia` 0.12.5+), counted from the whole school year, so ones earned before the card was added show too. With an older integration the card falls back to the events it saw in this browser |
| Teachers | `custom:librus-teachers-card` | Homeroom teacher plus every subject teacher, one directory in one place (requires `ha-librus-synergia` 0.6.0+ for the `subject_teachers` attribute) |
| Level | `custom:librus-level-card` | A pure-fun XP meter, separate from Rank - it only ever goes up (XP for every grade ever recorded, more for a good one, plus attendance), computed entirely client-side, no backend change needed |
| Hero | `custom:librus-hero-card` | One deterministic result computed from subject averages, attendance, behaviour and streaks - never random, same data always gives the same answer. "Mode" in the card's editor picks the tone: a school-counsellor-style **Archetype** (e.g. "Naukowiec") or an RPG-flavoured **Hero** (e.g. "Archimag") for the exact same underlying result. Every name/description is written to a fixed length so the card's height never changes across any of the 12 possible results |
| Hero Stats | `custom:librus-hero-stats-card` | An RPG character sheet - six stats (Siła/Intelekt/Wiedza/Charyzma/Wytrwałość/Szczęście), each 0-10 and each from exactly one real signal (a subject cluster average, the behaviour grade, the attendance streak, the rank tier), on a radar chart |
| Hero History | `custom:librus-hero-history-card` | A timeline of the Hero card's own past results and how long each one lasted, tracked locally in the browser from whenever this card was first added (same limitation as Achievements - nothing before that can be recovered) |
| Last Update | `custom:librus-last-update-tile-card` | How long ago Librus last answered - a quick "is this still fresh" signal without opening Settings. Turns amber with the next retry time while Librus isn't responding |
| Weekly AI summary | `custom:librus-ai-summary-card` | The weekly AI summary written for the parent or the student: headline and status, one tab per section (grades, attendance, behaviour, next week, optionally news from the school) with its own status dot, the to-dos for the coming week, and a **Generate now** button. Requires `ha-librus-synergia` 0.10+ with the weekly AI summary turned on - see [how to set it up](https://github.com/MichalZaniewicz/ha-librus-synergia/wiki/Weekly-AI-summary) |

Each card auto-detects your child's device - **zero YAML required** for the common case of one student.
If you ever have more than one, the card's visual editor shows a device picker.

```yaml
type: custom:librus-grades-card
```

**Subject grades** needs one extra field, editable from its own visual editor (a subject picker):

```yaml
type: custom:librus-subject-grades-card
subject_id: 42005
```

**Grade trend** uses the same subject-picker editor, but `subject_id` is *optional* there -
leave it unset for the Overall average's trend, or set it for one subject's:

```yaml
type: custom:librus-grade-trend-card
subject_id: 42005 # omit for the overall average
```

## Languages

Every label follows your Home Assistant language automatically - English and Polish are built in
(`src/translations/`). Anything else falls back to English. Adding a language is one new typed
file - see [Adding a language](#adding-a-language) below.

## Installation

1. HACS → ⋮ → **Custom repositories** → add this repo as category **Dashboard** (or use the
   badge above) → install **Librus Synergia Cards**.
2. Add a card to any dashboard with `type: custom:librus-grades-card` (or any other type from the
   table above) - no other configuration needed for a single student's account.

Manual install: copy `dist/librus-synergia-cards.js` into `<config>/www/`, then Settings →
Dashboards → Resources → add `/local/librus-synergia-cards.js` as a JavaScript module.

Requires [`ha-librus-synergia`](https://github.com/MichalZaniewicz/ha-librus-synergia) already set up.

### Card options

Every card works with zero config. A visual editor (the ⚙ / "Edit" pane) exposes the options a
card supports:

| Option | Cards | |
|---|---|---|
| Student | all except First lesson | Only shown when more than one child's e-dziennik is configured |
| Names | First lesson | The name shown for each child (default: the first name from the device name) |
| `hide_room` / `only_tomorrow` | First lesson | Hide the classroom; show only the next school day (e.g. for an evening dashboard) |
| `title` | every card with a header (all except the tiles and the Student card) | Header title override |
| `max_items` | Grade log, Subject grades, Recent activity, Announcements, Messages, Homework checklist, School trips, Agenda, Behaviour notices, Homework assignments, Teachers, Substitutions, Descriptive grades, Hero History | Row cap (School trips: default 4; no cap by default where there was none) |
| `max_items` | Next exam, Free days | How many later exams / free days to list under the next one (default 4, `0` hides them) |
| `list_height` | the cards with a scrolling list (Grade log, Agenda, Messages, Announcements, Grades, ...) | Height limit of the list in px (default 320; Grades 220) |
| `days_ahead` | Agenda | How far forward to look (default 14) |
| `days` | Grade trend | How much history to chart (default 60) |
| `days` | Grade log, Subject grades | Only include grades from the last N days (unset = no limit) |
| `days` | What was taught | Number of school days shown (default 3, 1-10) |
| `category_filter` | Grade log, Subject grades | Comma-separated category keywords - keeps a grade if its category matches any, e.g. `sprawdzian, kartkówka` |
| `sort` | Grade log, Subject grades, Announcements, Messages, Recent activity, Behaviour notices, Descriptive grades | `newest` (default) or `oldest` first |
| `subject_id` | Subject grades, Grade trend, Grade goal, Grade simulator | Pick one subject (Grade trend / Grade goal default to the overall average) |
| `target` | Grade goal | Target average, e.g. `4.5` |
| `mode` | Hero, Hero History | `archetype` or `hero` - which set of names and descriptions to use |
| `mailbox` | Messages | The mailbox shown first: `inbox` / `substitutions` / `alerts` / `justifications` / `outbox` / `archive` |
| `show_saturday` | Weekly timetable, Lesson-time split | Include Saturday (6-day week) - off by default |
| `hide_teacher` | Grade log, Descriptive grades | Don't show who gave each grade - off by default |
| `hide_comments` | Grade log, Subject grades, Descriptive grades, Latest grade, Behaviour grade | Don't show teachers' comments - off by default |
| `hide_room` | Today's lessons, Today's schedule, Tomorrow | Don't show the classroom - off by default |
| `hide_legend` | Attendance, Attendance heatmap, Absences by subject, Absences by weekday, Attendance by subject, Grade profile (radar) | Hide the colour legend under the chart - off by default |
| `show_descriptive` | Grade log | Also list descriptive grades (a skill-based subject, e.g. music in grades 1-3), with the skill shown where other grades show their category - off by default |
| `summary_only` / `hide_generate` | Weekly AI summary | Show only the headline, warning and to-dos (no section tabs); hide the Generate now button |
| `exam_keywords` | Next exam | Comma-separated Agenda-category keywords that count as an exam (default `sprawdzian`), e.g. `sprawdzian, praca klasowa, egzamin` |
| `icon` | every card | Override the header icon, e.g. `mdi:star` |
| `accent_color` | every card | Any CSS color (`#e91e63`, `teal`, `rgb(0 150 136)`) instead of the indigo accent - rings, bars, chips and the icon badge follow it. The exact color is used in both themes, so pick one that reads on a dark background too. An invalid value is ignored |
| `hide_header` | every card | Hide the header row entirely |
| `hide_icon` / `hide_subtitle` | every card with a header | Hide just the icon badge, or just the line under the title |
| `compact` | every card | Tighter padding, smaller icon badge, subtitle hidden - for a denser dashboard |
| `hide_outage_warning` | every card | Hide the "Librus not responding" strip. By default a card with a header shows it under the header while the integration's *Connection status* sensor is `stale` (Librus isn't answering and the last data is shown), with the time of that data |
| `tap_action` | the glanceable cards: the tiles (except Last update), Student card, Today, Week in review, End of school year, Today's schedule, Grade goal, Lucky number, Next exam, Streaks, Rank | Standard Lovelace action - `navigate`, `more-info`, `url`, `perform-action`, `none`. Set it in the editor (Home Assistant's own action picker) or in YAML |

In YAML, e.g.:

```yaml
type: custom:librus-messages-tile-card
tap_action:
  action: navigate
  navigation_path: /lovelace/szkola
```

## Design

Every card is a real `ha-card`, so it inherits your Home Assistant theme's colors, radius and
shadow automatically. The brand accent (indigo) and secondary accent (amber) come from the
`librus_synergia` brand icon itself - an indigo notebook with an amber bookmark ribbon - so this
repo reads as the same product family. Semantic colors (good/warning/bad - used for attendance,
sentiment, streaks) are deliberately separate from that brand accent. See
[`src/utils/style-tokens.ts`](src/utils/style-tokens.ts) for the full token set.

## Development

```bash
npm install
npm run build       # -> dist/librus-synergia-cards.js (committed to the repo, HACS serves it directly)
npm run watch        # rebuild on change
npm run typecheck    # tsc --noEmit across the whole src/ tree
```

No live Home Assistant instance is needed to work on these cards. Serve the repo root with any
static file server (`import()`-ing a local module needs `http://`, not `file://` - Chrome blocks
cross-origin module fetches from `file://`) and open `dev/index.html` after building - it loads the
real compiled bundle against a hand-built mock `hass` object covering every card in both its normal
and empty state, with a light/dark toggle and a language switcher.

### Adding a new card

1. Add `src/librus-<name>-card.ts` extending `LibrusBaseCard` ([`src/utils/base-card.ts`](src/utils/base-card.ts)) -
   it gives you dark-mode sync, device resolution and a consistent empty/error state for free.
2. Reuse [`src/utils/style-tokens.ts`](src/utils/style-tokens.ts) (`librusTokens` +
   `librusSharedStyles`) and [`src/utils/render-helpers.ts`](src/utils/render-helpers.ts)
   (`segmentedBar`, `progressRing`) before writing new CSS/SVG - most layouts in this family are
   built entirely from those two files.
3. Register it in [`src/librus-synergia-cards.ts`](src/librus-synergia-cards.ts) (one `import` + one
   `window.customCards.push(...)` entry). For `getConfigElement()`: return `librusCardEditor()` from
   [`src/utils/card-editor.ts`](src/utils/card-editor.ts) - every card uses this one shared editor.
   If a student picker is all the card needs, that's it (no `EDITOR_FIELDS` entry required); for
   extra controls add one, keyed by the card's `custom:` type - a `text` field (`title`,
   `exam_keywords`, `category_filter`), a `number` (`max_items`, `days_ahead`, `days`, `target`), a
   `boolean` (`show_saturday`, `show_descriptive`, `hide_teacher`, ...), a `subject` picker, or a `select` (`mailbox`, `sort`, `mode`).
   Options several cards share (`max_items`, `sort`, `hide_comments`, `hide_room`, `hide_legend`,
   `list_height`) are added with `addField([...cards], field)` below `EDITOR_FIELDS`. The editor
   renders the student picker automatically whenever more than one Librus device exists, adds a `title`
   field to every card with a title line, the action picker to cards listed in `TAP_ACTION_CARDS`, and
   always appends the universal `icon` / `accent_color` / `hide_header` / `hide_icon` / `hide_subtitle` /
   `compact` / `hide_outage_warning` fields - those are honored generically by `LibrusBaseCard` (see
   `utils/base-card.ts`), so a new card gets them for free. A new card's title should read
   `${this._config.title ?? t(hass, "...")}`; a list should go through `applyListOptions`
   (`utils/list-options.ts`) when it takes `sort` / `max_items`.
4. Every user-facing string goes through `t(hass, key)` from
   [`src/utils/localize.ts`](src/utils/localize.ts) - add the key to
   [`src/translations/en.ts`](src/translations/en.ts) first (the canonical key list) and
   TypeScript will then require it in `pl.ts` too.
5. Add a mock-data entry in [`dev/index.html`](dev/index.html) and verify both the happy-path and
   empty-state render.

### Adding a language

Copy `src/translations/en.ts` to `src/translations/<code>.ts`, translate every value (TypeScript
will error if a key is missing or extra), then register it in `LANGUAGES` in
[`src/utils/localize.ts`](src/utils/localize.ts).

## Status

Entity discovery reads Home Assistant's entity registry by `translation_key`, which
`librus_synergia` sets equal to each sensor's internal key (`attendance`, `lucky_number`, ...) -
that keeps discovery language-independent and immune to the user renaming entities. The one
exception is `subject_average`, shared by every dynamically-discovered per-subject sensor - the
subject NAME comes from that entity's own `subject` attribute (added in `ha-librus-synergia`
v0.4.7 specifically for this), not from `entity_id` or `friendly_name`, both of which are
per-language and/or user-renameable.

The calendar-reading cards (Today's lessons, Agenda, Week timetable, Today's schedule, Tomorrow, First lesson, School day, Free days, Free days tile, Lesson-time split, and Next exam as a fallback) fetch events via
Home Assistant's REST API (`GET /api/calendars/<entity_id>?start=...&end=...`) rather than reading
sensor state - `src/utils/calendar.ts` normalizes both response shapes HA has shipped for
`start`/`end` (a bare ISO string, and a Google-Calendar-style `{date}`/`{dateTime}` object)
defensively, since which one a given HA version sends wasn't verified against every version this
repo might run on.

The Achievements card reads the Rank sensor's `badges` attribute (integration 0.12.5+): every
badge with its tiers, the date each tier was earned and the progress towards the next one. With an
older integration it falls back to the `librus_synergia_achievement_unlocked` event bus
(`hass.connection.subscribeEvents`), keeping a list in `localStorage` and filtering events by the
card's own config entry, so a multi-student household's cards don't mix achievements.

## Disclaimer

An unofficial companion to an unofficial integration - not affiliated with or endorsed by Librus.

## License

[MIT](LICENSE)
