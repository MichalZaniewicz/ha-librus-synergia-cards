# Contributing

Thanks for helping! Issues and pull requests in **Polish or English** are both welcome.

## Reporting a problem

Use the [card bug form](https://github.com/MichalZaniewicz/ha-librus-synergia-cards/issues/new/choose). A screenshot, the card's YAML and any red entries from the browser console (F12) help the most. Please blur names, grades and message text in screenshots.

Missing or wrong **data** (not how it's shown) belongs in the [integration repo](https://github.com/MichalZaniewicz/ha-librus-synergia/issues).

## Development

```bash
npm ci
npm run typecheck
npm run build        # writes dist/librus-synergia-cards.js
```

To try cards without Home Assistant, serve the repo root and open the dev harness:

```bash
python -m http.server 8931
# http://127.0.0.1:8931/dev/index.html
```

It needs a real `http://` origin, because browsers block module imports from `file://`.

## Pull requests

- **Commit the rebuilt `dist/`** together with your source changes: HACS serves that file directly, and CI fails if it's out of date.
- New user-facing text goes into **both** `src/translations/en.ts` and `pl.ts` (the type checker enforces the Polish file has every key).
- A brand-new card needs a screenshot in the PR description.
- Never put real children's data in screenshots or in the dev harness mocks.

By participating you agree to the [Code of Conduct](CODE_OF_CONDUCT.md).
