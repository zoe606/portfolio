# Portfolio

The personal portfolio of Librantara Erlangga, a backend engineer: projects, the decisions behind them, work experience, skills, and the CV.

Live site: https://zoe606.github.io/portfolio/

## Stack

- SvelteKit 3 and Svelte 5 (runes), built with Vite 8
- TypeScript and UnoCSS
- Static site: every page is prerendered and deployed to GitHub Pages

## Run it locally

Requires Node 22.17 or later and Yarn 1.

```bash
yarn install
yarn dev        # dev server
yarn build      # static build in build/
yarn preview    # serve the build
```

Run these before every commit:

```bash
yarn run check  # type check (plain `yarn check` is Yarn's lockfile check)
yarn lint:ci    # Prettier and ESLint, as in CI
yarn build
```

## Content

All content lives in JSON files in `src/lib/data/`: `projects.json`, `experiences.json`, `skills.json`, `educations.json`, and `site.json`. Edit those files to change the site. The CV PDF is generated from the same data with `scripts/make_cv.py`.

## Deployment

Every push to `master` builds the site and publishes it to the `gh-pages` branch (`.github/workflows/deploy.yml`). Production builds use the `/portfolio` base path set in `vite.config.ts`.

## For contributors and AI agents

`AGENTS.md` describes the architecture, the design system, and the conventions. `CLAUDE.md` loads it for Claude Code.

The project started from the open-source "Slick Portfolio With Svelte" template and has since been rebuilt.
