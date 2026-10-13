# AGENTS.md

Guidance for AI coding agents and contributors working in this repository.

## Project Overview

This is a personal portfolio website built with **SvelteKit 2**, **Svelte 5**, and **Vite 7**. It's configured for static site generation and deployed to GitHub Pages with a base path of `/portfolio`.

**Key Technologies:**

- **Svelte 5** with runes (some components still use legacy syntax)
- **SvelteKit 2** with static adapter
- **Vite 7** for build tooling
- **UnoCSS** for utility-first styling with custom shortcuts
- **TypeScript** for type safety
- Hand-written UI components in the shadcn style
- **Marked** with plugins for markdown rendering (GFM heading IDs, mangle)
- **Prism.js** for syntax highlighting
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

- Base path: `/portfolio` (configured in `svelte.config.js`)
- Adapter: `@sveltejs/adapter-static` with fallback to `404.html`
- Base path is only applied in production (`process.env.NODE_ENV === 'production'`)

### Styling System

The site uses the **Blueprint** design: a light grid background, ink-colored 2px frames, one orange accent, Space Grotesk for headings, IBM Plex Sans for body text, and IBM Plex Mono for labels.

**Design tokens** (`src/lib/index.scss`):

- `--bp-*` custom properties hold the palette for `[data-theme='light']` and `[data-theme='dark']`. Use them for new styles.
- The older names (`--main`, `--secondary-text`, `--border`, ...) map onto the `--bp-*` tokens so pages that still use them share the palette. Do not add new uses of the older names.
- The file starts with a small base reset (`box-sizing: border-box`, borders `0 solid`). UnoCSS has no reset of its own, and utilities such as `w-full px-6` and `border-t` depend on it.

**UnoCSS Configuration** (`uno.config.ts`):

- Atomic utility classes with `presetUno()`
- Theme colors map to the tokens: `text-bp-ink`, `bg-bp-surface`, `border-bp-line`, `text-bp-accent`, ...
- Font utilities: `font-sans`, `font-display`, `font-mono`. The font files load from the Google Fonts `<link>` in `src/app.html`
- Shortcuts: `bp-container` (page width and gutters), `col`, `row`, `col-center`, `row-center`
- Icon system via `@unocss/preset-icons` with `@iconify-json/carbon`

**Theme System** (`src/lib/stores/theme.svelte.ts`):

- Two themes, light and dark. `theme.current` and `theme.isDark` are runes state; `theme.toggle()` switches and saves to localStorage key `@zoe606-theme`
- An inline script in `src/app.html` sets `data-theme` on `<html>` before the first paint, from the saved choice or the system preference
- `getAssetURL` reads `theme.isDark`, so theme-aware logos update when the theme changes

### Component Architecture

**Reusable UI Components** (`src/lib/components/ui/`):

- Hand-written in the shadcn style; they do not use bits-ui or the shadcn-svelte registry
- Some still use legacy Svelte syntax (`export let`, `$:`, `<slot>`, `on:`). Write new components with runes and snippets

**Feature Components** (`src/lib/components/`):

- `Site/` - `SiteHeader` (navigation, search, theme toggle) and `SiteFooter`
- `Blueprint/` - building blocks for redesigned pages: `PageHeader` (label, title, description), `MetricStrip` (headline numbers), `WorkList` (numbered achievements), `SkillChips` (skill links), `Pager` (previous and next)
- `Banner/`, `Card/CardLogo`, `MainTitle/`, `Markdown.svelte`, `SearchPage.svelte`, `CommonPage.svelte` - older building blocks still used by the skills, education, resume, and search pages
- `Icon/` - Icon system (UIcon for UnoCSS icons, Icon for custom icons)

### Markdown Processing

**Stack:** `marked` → `DOMPurify` → `Prism.js`

The `Markdown.svelte` component:

1. Uses `marked` with `gfmHeadingId()` and `mangle()` plugins
2. Sanitizes HTML with `DOMPurify` for security
3. Applies syntax highlighting with `Prism.js` (supports TypeScript)
4. Theme: `prism-tomorrow.css`

Markdown content is stored in `src/lib/md/` directory.

### Animations

All motion goes through `src/lib/animations/` (built on `motion`'s `animateMini`). Import from the barrel `$lib/animations`:

- `scrollReveal` - Svelte action that fades an element in when it scrolls into view (`direction`: `up`, `left`, or `scale`; stagger siblings with `delay: index * REVEAL.stagger`)
- `cardHover` - Svelte action for the spring lift and shadow on hover and press
- `pageIn` / `pageOut` - route transitions used in `+layout.svelte`
- `presets.ts` - shared `DURATION`, `EASING`, `SPRING`, `REVEAL`, `CARD`, and `PAGE_TRANSITION` values

Reuse the presets instead of hard-coding timings. The actions do nothing when `prefers-reduced-motion: reduce` is set or during SSR, so content stays visible; keep that behavior in any new animation.

### Performance Monitoring

**Web Vitals integration** in `+layout.svelte`:

- Tracks CLS, INP, LCP, FCP, TTFB
- Logs to console in development
- Ready for analytics service integration in production

### Utilities (`src/lib/utils/`)

- `analytics.svelte.ts` - Analytics tracking utilities
- `cn.ts` - Class name utilities (likely clsx wrapper)
- `color.ts` - Color manipulation utilities
- `eventDelegation.svelte.ts` - Event delegation patterns
- `helpers.ts` - General helper functions
- `scrollPreservation.svelte.ts` - Scroll position preservation
- `index.ts` - Utility exports including `Icons` enum

### Route Structure

All routes in `src/routes/`:

- `/` - Home page with bio and links
- `/projects` - Projects showcase
- `/experience` - Work experience timeline
- `/skills` - Skills and tools
- `/education` - Education history
- `/resume` - PDF resume viewer
- `/search` - Search functionality

## Development Workflow

### Adding New Content

**Projects:**

1. Edit `src/lib/data/projects.json`
2. Add project object with all required fields (from `Project` type). `no` sets the order and the `PRJ-xx` code
3. Write `description` as sentences that each state one achievement. The project page lists each sentence as a numbered item
4. Optionally add `metrics` (`{ "value", "label" }`). Use only figures that the CV or other evidence supports
5. Build will automatically generate project pages

**Experience:**

1. Edit `src/lib/data/experiences.json`
2. Add experience object (from `Experience` type); `no` sets display order, so renumber existing entries when inserting

**Skills:**

1. Edit `src/lib/data/skills.json`
2. Add skill object with name, logo, color

**Education:**

1. Edit `src/lib/data/educations.json`
2. Add education object with organization, degree, subjects, period

### Adding New UI Components

When using shadcn-svelte components, run:

```bash
npx shadcn-svelte@latest add [component-name]
```

This installs to `src/lib/components/ui/`.

### Theme Customization

**CSS Variables:** Update `src/lib/index.scss` for theme colors and variables

**UnoCSS Utilities:** Modify `uno.config.ts` for new shortcuts or presets

### Deployment Checklist

Before deploying to GitHub Pages:

1. Ensure `base` parameter in `svelte.config.js` matches your repo path
2. Verify GitHub Pages is enabled in repository settings
3. Put the resume PDF in `static/` and set `resume.item` in `src/lib/data/site.json` to `/<file>.pdf` (no base path; `src/routes/resume/+page.svelte` prefixes `base`). Regenerate the PDF with `scripts/make_cv.py` (ReportLab; see its docstring for setup) so it keeps the CV layout. The script reads the summary and the full-time jobs from `src/lib/data`, so edit the JSON first, then regenerate
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

Two icon systems:

1. **UIcon** - UnoCSS icons from Iconify (`@iconify-json/carbon`)
2. **Icon** - Custom SVG icons via `Icons` enum in utils

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
- Update `components.json` when you add new shadcn-svelte primitives so the generator stays in sync.
- Write new code in TypeScript (strict mode).

## Commit & Pull Request Guidelines

- Follow Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`). Squash small tweaks into the related commit before pushing.
- Before every commit, push, or PR, run all quality checks: `yarn run check`, `yarn lint` (or `yarn lint:ci`), and `yarn build`. Fix every failure first.
- Each PR describes the motivation, summarizes the key changes, and includes the check results. Add screenshots or short recordings for UI changes.
- Confirm `svelte.config.js` has the correct `base` for GitHub Pages deployments.

## Important Notes

- **Node.js:** Requires Node 16+ (Svelte 5 dropped Node 14 support)
- **Prerendering:** All routes are statically generated at build time
- **Base path:** Production builds include `/portfolio` prefix for GitHub Pages
- **Markdown security:** All markdown is sanitized with DOMPurify before rendering
- **Performance:** Web Vitals monitoring is built-in and active
