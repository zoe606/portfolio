# AGENTS.md

Guidance for AI coding agents and contributors working in this repository.

## Project Overview

This is a personal portfolio website built with **SvelteKit 3**, **Svelte 5**, and **Vite 8**. It's configured for static site generation and deployed to GitHub Pages with a base path of `/portfolio`.

**Key Technologies:**

- **Svelte 5** with runes
- **SvelteKit 3** with static adapter
- **Vite 8** for build tooling
- **UnoCSS** for utility-first styling with custom shortcuts
- **TypeScript** for type safety
- **Fuse.js** for fuzzy search
- **web-vitals** for performance monitoring

## Essential Commands

### Development

```bash
yarn dev              # Start dev server
yarn build            # Build for production
yarn preview          # Preview production build
```

### Code Quality

```bash
yarn run check        # Type-check with svelte-check (one-time); plain `yarn check` runs Yarn 1's built-in lockfile check instead
yarn check:watch      # Type-check with watch mode
yarn lint             # Run Prettier and ESLint checks
yarn format           # Format code with Prettier
```

There are no test commands configured in this project. `yarn run check`, `yarn lint` and `yarn build` are the quality gates; CI runs `yarn lint:ci` (Prettier on `src/` plus ESLint on the route files with `--max-warnings=0`).

## Architecture & Structure

### Data-Driven Content System

All portfolio content lives in JSON files in `src/lib/data/`:

- `site.json` - Site config (title suffix, metadata/SEO, navbar, page titles and descriptions, resume path)
- `projects.json` - Project definitions
- `experiences.json` - Work experience entries
- `skills.json` - Skills and tools
- `educations.json` - Education history

The `.params.ts` files in `src/lib/` (`params.ts`, `projects.params.ts`, etc.) are typed adapters: they import the JSON and map string keys (`color`, `logo`, `contract`, skill slugs) to `data/colors.ts`, `data/assets.ts`, `ContractType` and `Skill` objects.

**Imports:** Import from `src/lib` with the `#lib/*` subpath alias (defined in `package.json` `imports`) and include the file extension, for example `#lib/utils/helpers.js` or `#lib/components/TabTitle.svelte`.

**Paths:** Build links with `resolve()` from `$app/paths`, either a route ID (`resolve('/projects/[slug]', { slug })`) or a path without a leading slash (`resolve('skills')`). Build URLs for files in `static/` with `asset()`, for example `asset('logos/go.svg')`. `asset()` takes the `AssetPath` type, so `data/assets.ts` and `data/screenshoot.ts` fail the type check when a listed file does not exist.

**To update portfolio content:** Edit the JSON file. Edit `.params.ts` only when changing the mapping or types (`src/lib/types.ts`).

### Core Type System (`src/lib/types.ts`)

Key interfaces that define the data structure:

- `Item` - Base interface (slug, name, logo, description)
- `Project` - Projects with links, skills, period, color
- `Experience` - Work history extending Project (company, location, contract type)
- `Skill` - Skills with color coding
- `Education` - Education entries with organization, degree, subjects
- `HomePageParams`, `ProjectPageParams`, etc. - Page-level parameter interfaces

### Static Site Generation

**Important:** This site uses **full static prerendering** (`export const prerender = true` in `+layout.server.ts`). All pages are built at compile time.

**GitHub Pages Configuration:**

- Base path: `/portfolio` (set in the `sveltekit()` options in `vite.config.ts`; SvelteKit 3 has no `svelte.config.js`)
- Adapter: `@sveltejs/adapter-static` with fallback to `404.html`
- Base path is only applied in production (`process.env.NODE_ENV === 'production'`)

### Styling System

The site uses the **Blueprint** design: a light grid background, ink-colored 2px frames, one orange accent, Space Grotesk for headings, IBM Plex Sans for body text, and IBM Plex Mono for labels.

**Design tokens** (`src/lib/index.scss`):

- `--bp-*` custom properties hold the palette for `[data-theme='light']` and `[data-theme='dark']`. Use them for all colors.
- `--text-f`, `--title-f`, and `--mono-f` hold the font stacks for scoped styles.
- `.bp-button` and `.bp-button-primary` style links as buttons (the home page CTAs and the resume download).
- The file starts with a small base reset (`box-sizing: border-box`, borders `0 solid`). UnoCSS has no reset of its own, and utilities such as `w-full px-6` and `border-t` depend on it.

**UnoCSS Configuration** (`uno.config.ts`):

- Atomic utility classes with `presetUno()`
- Theme colors map to the tokens: `text-bp-ink`, `bg-bp-surface`, `border-bp-line`, `text-bp-accent`, ...
- Font utilities: `font-sans`, `font-display`, `font-mono`. The font files load from the Google Fonts `<link>` in `src/app.html`
- Shortcuts: `bp-container` (page width and gutters), `bp-panel` (surface with a 2px ink frame), `bp-label` (mono uppercase label), `col`, `row`, `col-center`, `row-center`
- Icon system via `@unocss/preset-icons` with `@iconify-json/carbon`

**Theme System** (`src/lib/stores/theme.svelte.ts`):

- Two themes, light and dark. `theme.current` and `theme.isDark` are runes state; `theme.toggle()` switches and saves to localStorage key `@zoe606-theme`
- An inline script in `src/app.html` sets `data-theme` on `<html>` before the first paint, from the saved choice or the system preference
- `getAssetURL` reads `theme.isDark`, so theme-aware logos update when the theme changes

### Component Architecture

**Feature Components** (`src/lib/components/`):

- `Site/` - `SiteHeader` (navigation, search, theme toggle) and `SiteFooter`
- `Blueprint/` - building blocks for redesigned pages: `PageHeader` (label, title, description), `MetricStrip` (headline numbers), `WorkList` (numbered achievements), `SkillChips` (skill links), `Pager` (previous and next), `DecisionList` (the option turned down next to the option chosen, on project pages), `PrincipleFigure` (the animated diagram for each home page principle)
- `SearchModal.svelte` - the header search dialog (⌘K), built on `PortfolioSearch` from `utils/search.ts`
- `TabTitle.svelte` - page title and SEO meta tags
- `Icon/UIcon` - UnoCSS icons from Iconify (`i-carbon-*`). Write icon class names as literals in `.svelte` files so UnoCSS can find them

### Animations

All motion goes through `src/lib/animations/` (built on `motion`'s `animateMini`). Import from the barrel `#lib/animations/index.js`:

- `scrollReveal` - Svelte action that fades an element in when it scrolls into view (`direction`: `up`, `left`, or `scale`; stagger siblings with `delay: index * REVEAL.stagger`)
- `playOnView` - Svelte action that sets `data-motion="ready"`, then `"play"` when the element scrolls into view. Write CSS so the final state is the default, and put the start state under `[data-motion='ready']`
- `cardHover` - Svelte action for the spring lift and shadow on hover and press
- `pageIn` / `pageOut` - route transitions used in `+layout.svelte`
- `presets.ts` - shared `DURATION`, `EASING`, `SPRING`, `REVEAL`, `CARD`, and `PAGE_TRANSITION` values

Reuse the presets instead of hard-coding timings. The actions do nothing when `prefers-reduced-motion: reduce` is set or during SSR, so content stays visible; keep that behavior in any new animation.

### Electric Effects

Signal and current effects that fit the Blueprint theme. All of them stop when `prefers-reduced-motion: reduce` is set.

- Diagram pulses: a pulse runs through Fig. 1 on the home page (`+page.svelte`), and a signal runs down the Fig. 3.1 pipeline, holding on the author's review steps (`PrincipleFigure.svelte`)
- Grid current and cursor glow: `Site/GridCurrent.svelte`, a layer behind the page content. Its pulses sit on 32px grid lines, so keep them aligned with the grid in `+layout.svelte`
- Timeline current: a pulse runs along the home page timeline to the current job
- Circuit border and neon numbers: global rules in `index.scss`. A signal runs around a `.bp-panel` frame on hover. A `.fx-neon` element flickers on when `playOnView` plays it
- Power switch and scroll current: in `+layout.svelte`. The page flickers when the theme changes. A line at the top grows with the scroll position (CSS scroll-driven animation, so it is missing in browsers without `animation-timeline` support)

### Performance Monitoring

**Web Vitals** in `+layout.svelte`:

- Logs CLS, INP, LCP, FCP and TTFB to the console in development only
- `web-vitals` is loaded with a dynamic import inside `import.meta.env.DEV`, so it is not in the production bundle

### Utilities (`src/lib/utils/`)

- `helpers.ts` - Date and text helpers (`formatYears`, `getTimeDiff`, `splitSentences`, `plural`)
- `search.ts` - `PortfolioSearch`, the Fuse.js search over projects, experience, and skills
- `seo.ts` - `buildPageSEO`, the title, description, canonical, Open Graph and Twitter tags used by `TabTitle`; `buildPersonJsonLd`, the schema.org `Person` data on the home page

### Route Structure

All routes in `src/routes/`:

- `/` - Home page with bio and links
- `/projects` - Projects showcase
- `/experience` - Work experience timeline
- `/skills` - Skills and tools
- `/education` - Education history
- `/resume` - PDF resume viewer
- `/search` - Search functionality
- `/sitemap.xml` - Sitemap of every page except search, prerendered from the data files. It is listed in `prerender.entries` in `vite.config.ts` because no page links to it. Submit it in Google Search Console, since a `robots.txt` under the `/portfolio` subpath is ignored
- `+error.svelte` - The 404 and error page, with links to Home, Projects, and the CV. GitHub Pages serves it through the `404.html` fallback

## Development Workflow

### Adding New Content

**Projects:**

1. Edit `src/lib/data/projects.json`
2. Add project object with all required fields (from `Project` type). `no` sets the order and the `PRJ-xx` code
3. Write `description` as sentences that each state one achievement. The project page lists each sentence as a numbered item
4. Optionally add `metrics` (`{ "value", "label" }`). Use only figures that the CV or other evidence supports
5. Optionally add `decisions` (`{ "title", "problem", "rejected", "choice", "tradeoff", "proof" }`) for the design choices behind the project. Name the option turned down and what the choice cost. The page then shows a Decisions section before "What I did", so do not repeat the same facts in `description`
6. Build will automatically generate project pages

**Experience:**

1. Edit `src/lib/data/experiences.json`
2. Add experience object (from `Experience` type); `no` sets display order, so renumber existing entries when inserting

**Skills:**

1. Edit `src/lib/data/skills.json`
2. Add skill object with name, logo, color

**Education:**

1. Edit `src/lib/data/educations.json`
2. Add education object with organization, degree, subjects, period

### Adding New Components

Write components with runes (`$props`, `$state`, `$derived`) and snippets. Put shared page blocks in `src/lib/components/Blueprint/` and style them with the `--bp-*` tokens and the `bp-*` shortcuts.

### Theme Customization

**CSS Variables:** Update `src/lib/index.scss` for theme colors and variables

**UnoCSS Utilities:** Modify `uno.config.ts` for new shortcuts or presets

### Deployment Checklist

Before deploying to GitHub Pages:

1. Ensure the `base` constant in `vite.config.ts` matches your repo path
2. Verify GitHub Pages is enabled in repository settings
3. Put the resume PDF in `static/` and set `resume.item` in `src/lib/data/site.json` to `<file>.pdf` (no leading slash and no base path; `src/routes/resume/+page.svelte` passes it to `asset()`). Regenerate the PDF with `scripts/make_cv.py` (ReportLab; see its docstring for setup) so it keeps the CV layout. The script reads the summary and the full-time jobs from `src/lib/data`, so edit the JSON first, then regenerate
4. Run `yarn build` to generate static files in `build/` directory
5. GitHub Pages should point to `build/` directory or use GitHub Actions

## Common Patterns

### Creating Type-Safe Pages

Page parameters follow the pattern:

```typescript
export const MY_PAGE: MyPageParams = {
	title: 'Page Title',
	items: MY_ITEMS // from corresponding .params.ts file
};
```

### Working with Assets

Assets use the `Asset` type which can be:

- Simple string: `"path/to/image.png"`
- Theme-aware object: `{ light: "light.png", dark: "dark.png" }`

### Icon Usage

Use `UIcon` with an Iconify class from `@iconify-json/carbon`, for example `<UIcon icon="i-carbon-search" />`.

### State Management

Uses Svelte 5 runes for reactivity:

- `$state` for reactive state
- `$derived` for computed values
- `$effect` for side effects

Shared state lives in `.svelte.ts` modules with runes (e.g., `theme` in `src/lib/stores/theme.svelte.ts`).

## Coding Style & Naming Conventions

- Prettier (with the Svelte plugin) formats the code; `eslint.config.js` adds Svelte-specific linting.
- Name Svelte components in PascalCase (`HeroSection.svelte`). Use kebab-case for routes under `src/routes`.
- Keep SCSS partials next to their components when feasible.
- Write new code in TypeScript (strict mode).

## Commit & Pull Request Guidelines

- Follow Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`). Squash small tweaks into the related commit before pushing.
- Before every commit, push, or PR, run all quality checks: `yarn run check`, `yarn lint` (or `yarn lint:ci`), and `yarn build`. Fix every failure first.
- Each PR describes the motivation, summarizes the key changes, and includes the check results. Add screenshots or short recordings for UI changes.
- Confirm `vite.config.ts` has the correct `base` for GitHub Pages deployments.

## Important Notes

- **Node.js:** Requires Node 22.17+ (SvelteKit 3). CI and the deploy workflow use Node 24
- **Prerendering:** All routes are statically generated at build time
- **Base path:** Production builds include `/portfolio` prefix for GitHub Pages
- **Performance:** Web Vitals are logged in development only
- **Search Console:** Keep the `google-site-verification` meta tag in `src/app.html`. Google Search Console uses it to verify the `https://zoe606.github.io/portfolio/` property, and removing it loses the verification
