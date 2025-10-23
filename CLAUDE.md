# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with **SvelteKit 2**, **Svelte 5**, and **Vite 7**. It's configured for static site generation and deployed to GitHub Pages with a base path of `/portfolio`.

**Key Technologies:**

- **Svelte 5** (latest with runes and modern reactivity)
- **SvelteKit 2** with static adapter
- **Vite 7** for build tooling
- **UnoCSS** for utility-first styling with custom shortcuts
- **TypeScript** for type safety
- **shadcn-svelte** for UI components
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
yarn check            # Type-check with svelte-check (one-time)
yarn check:watch      # Type-check with watch mode
yarn lint             # Run Prettier and ESLint checks
yarn format           # Format code with Prettier
```

**Note:** There are no test commands configured in this project.

## Architecture & Structure

### Data-Driven Content System

All portfolio content is centrally managed through parameter files in `src/lib/`:

- `params.ts` - Main configuration hub (title suffix, navbar, page params)
- `projects.params.ts` - Project definitions
- `experiences.params.ts` - Work experience entries
- `skills.params.ts` - Skills and tools
- `educations.params.ts` - Education history

**To update portfolio content:** Modify the appropriate `.params.ts` file. The type system enforces structure via `src/lib/types.ts`.

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

**UnoCSS Configuration** (`uno.config.ts`):

- Atomic utility classes with `presetUno()`
- Custom shortcuts: `col`, `row`, `col-center`, `row-center`
- Icon system via `@unocss/preset-icons` with `@iconify-json/carbon`
- Web fonts: Inter (weights 100-900) via Google Fonts
- **Main styles:** `src/lib/index.scss` for custom SCSS

**Theme System:**

- Dark/light mode toggle via `src/lib/stores/theme.ts`
- Theme persisted to localStorage with key `@zoe606-theme`
- CSS custom properties defined in SCSS, switched via `data-theme` attribute
- Auto-detection of system preference on first visit

### Component Architecture

**Reusable UI Components** (`src/lib/components/ui/`):

- Built with **shadcn-svelte** design system
- Includes: avatar, badge, button, card, dialog, dropdown-menu, input, separator, switch, tabs, tooltip
- All components use modern Svelte 5 runes syntax

**Feature Components** (`src/lib/components/`):

- `Banner/` - Hero banner component
- `Card/` - Card components with logo, link, title variants
- `Carrousel/` - Image carousel for screenshots
- `ExperienceCard/` - Experience entries display
- `ProjectCard/` - Project entries display
- `Markdown.svelte` - Markdown renderer using marked + Prism.js + DOMPurify
- `SearchPage.svelte` - Search functionality component
- `CommonPage.svelte` - Base page layout wrapper
- `NavMenu/` - Navigation menu with theme toggle
- `Icon/` - Icon system (UIcon for UnoCSS icons, Icon for custom icons)

### Markdown Processing

**Stack:** `marked` → `DOMPurify` → `Prism.js`

The `Markdown.svelte` component:

1. Uses `marked` with `gfmHeadingId()` and `mangle()` plugins
2. Sanitizes HTML with `DOMPurify` for security
3. Applies syntax highlighting with `Prism.js` (supports TypeScript)
4. Theme: `prism-tomorrow.css`

Markdown content is stored in `src/lib/md/` directory.

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

1. Edit `src/lib/projects.params.ts`
2. Add project object with all required fields (from `Project` type)
3. Build will automatically generate project pages

**Experience:**

1. Edit `src/lib/experiences.params.ts`
2. Add experience object (from `Experience` type)

**Skills:**

1. Edit `src/lib/skills.params.ts`
2. Add skill object with name, logo, color

**Education:**

1. Edit `src/lib/educations.params.ts`
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
3. Update `RESUME.item` path in `src/lib/params.ts` to include base path
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

Stores still use Svelte's writable/readable for cross-component state (e.g., theme).

## Important Notes

- **Node.js:** Requires Node 16+ (Svelte 5 dropped Node 14 support)
- **Prerendering:** All routes are statically generated at build time
- **Base path:** Production builds include `/portfolio` prefix for GitHub Pages
- **TypeScript:** Strict mode enabled, all new code should be typed
- **Markdown security:** All markdown is sanitized with DOMPurify before rendering
- **Performance:** Web Vitals monitoring is built-in and active
