# MIA public site

The public website for the **Molosser International Association**, served at
[molosserinternational.org](https://molosserinternational.org).
Built with [Eleventy](https://www.11ty.dev/) as a static site and hosted on Cloudflare.
The registry portal (accounts, registrations, search) is a separate Django app at
`registry.molosserinternational.org`.

## Run it locally

Requires Node 22 (`nvm use` reads `.nvmrc`).

```sh
npm install
npm start        # dev server at http://localhost:8080, reloads on save
npm run build    # writes the site to _site/
```

## Where things live

| Path | What it is |
| --- | --- |
| `src/_data/site.json` | **Family decisions in one place:** name, founding year, emails, fees, rules (pass score, generations), nav, portal link |
| `src/_data/breeds.json` | Breeds shown on Home and Breeds: name, blurb, photo |
| `src/_data/events.json` | Appraisal events (example dates for now) |
| `src/breeds/*.md` | One Markdown file per breed standard |
| `src/code-of-ethics/index.md` | Code of Ethics (Markdown) |
| `src/*/index.njk` | The other pages |
| `src/_includes/layouts/` | `base` (every page), `page` (dark title band), `breed` (standard pages) |
| `src/_includes/partials/` | Header and footer |
| `src/assets/css/site.css` | All styles; colors and fonts are variables at the top |
| `src/assets/img/` | Logo (emblem for the header, full seal for About/Contact), favicons, breed photos |
| `src/_headers` | Response headers for Cloudflare (security headers, `noindex` while in testing) |

## Editing content

- **A fee, email or rule changed:** edit `src/_data/site.json`.
- **Add a breed:** add an entry to `src/_data/breeds.json`, a photo in `src/assets/img/breeds/`, and a `src/breeds/<slug>.md` file.
- **Bracketed text like `[FEE]`** is a placeholder still waiting on a family decision. Search the repo for `[` before launch.

## Before launch

- Replace all breed photos with MIA's own dogs (current ones are stand-ins).
- Set `"noindex": false` in `site.json` and remove the `X-Robots-Tag` line from `src/_headers`.
- Consider self-hosting the two Google Fonts so the security policy can stay strict.

## Deploys

Deployment to Cloudflare through GitHub Actions is set up in step 5 of the build checklist.
Changes go through pull requests into `main`.
