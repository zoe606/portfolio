# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **SvelteKit-based portfolio website** using a Vercel-like design template. The project is configured for deployment to GitHub Pages with static site generation.

**Tech Stack:**

- SvelteKit 2.x with Svelte 4.2.1
- TypeScript
- UnoCSS for atomic CSS utilities
- SCSS for custom styling
- Vite as build tool
- Static adapter for GitHub Pages deployment

## Essential Commands

### Development

```bash
# Start development server
yarn dev

# Type check (without watch)
yarn check

# Type check with watch mode
yarn check:watch
```

### Building & Preview

```bash
# Build for production (outputs to build/)
yarn build

# Preview production build
yarn preview
```

### Linting & Formatting

```bash
# Run linting (Prettier + ESLint)
yarn lint

# Format code with Prettier
yarn format
```

## Architecture & Code Structure

### Configuration Files

**`svelte.config.js`** - Key configuration:

- Uses `@sveltejs/adapter-static` for static site generation
- Base path is `/portfolio` in production (for GitHub Pages)
- Outputs to `build/` directory with 404.html fallback

**`uno.config.ts`** - UnoCSS setup:

- Defines utility shortcuts: `col`, `row`, `col-center`, `row-center`
- Uses Inter font from Google Fonts
- Includes preset-icons for icon support

**`vite.config.ts`**:

- Configures UnoCSS and SvelteKit plugins

### Data Architecture

The portfolio content is data-driven and centralized in `src/lib/` files:

**Core Data Files:**

- `src/lib/params.ts` - Main configuration exporting all page data (HOME, PROJECTS, EXPERIENCES, SKILLS, EDUCATION, etc.)
- `src/lib/types.ts` - TypeScript type definitions for all entities (Project, Experience, Education, Skill, etc.)
- `src/lib/projects.params.ts` - Project data
- `src/lib/experiences.params.ts` - Work experience data
- `src/lib/skills.params.ts` - Skills and tools data
- `src/lib/educations.params.ts` - Education data

**To customize portfolio content:** Edit the `src/lib/*.params.ts` files - do NOT modify individual route components.

### Theme System

**`src/lib/stores/theme.ts`**:

- Writable store managing dark/light theme state
- Persists theme preference to localStorage with key `@zoe606-theme`
- `toggleTheme(value?)` - Toggle or set theme explicitly
- `onHydrated()` - Initialize theme from localStorage or system preference on mount
- Theme class applied at root: `theme-dark` or `theme-light`

**Custom styling:** Edit `src/lib/index.scss` for global styles and CSS variables.

### Component Architecture

**Reusable Components** in `src/lib/components/`:

- `Card/` - Card components with subcomponents (CardTitle, CardLogo, CardLink, CardDivider)
- `Chip/` - Tag/badge components with optional icons
- `Icon/` - Icon wrapper components (Icon.svelte uses UnoCSS icons, UIcon.svelte is custom)
- `ExperienceCard.svelte` - Display experience items
- `ProjectCard.svelte` - Display project items
- `NavMenu.svelte` - Navigation menu with theme toggle
- `Markdown.svelte` - Markdown renderer using marked library
- `SearchPage.svelte` - Search functionality component
- `CommonPage.svelte` - Common page layout wrapper

**Page Components** in `src/routes/`:

- `+page.svelte` - Home page
- `projects/` - Projects listing and detail pages
- `experience/` - Experience listing and detail pages
- `skills/` - Skills listing and detail pages
- `education/` - Education listing page
- `resume/` - Resume page
- `search/` - Search page

### Routing & Data Loading

**Dynamic Routes:**

- `projects/[slug]/+page.ts` - Loads project by slug from `MY_PROJECTS` array
- `experience/[slug]/+page.ts` - Loads experience by slug from `MY_EXPERIENCES` array
- `skills/[slug]/+page.ts` - Loads skill by slug from `MY_SKILLS` array

All data loading uses SvelteKit's `+page.ts` files with `load` functions that filter by slug.

### Utilities

**`src/lib/utils/helpers.ts`**:

- `countMonths(from, to)` - Calculate months between dates
- `getTimeDiff(date1, date2)` - Human-readable time difference
- `useImage(url, base)` - Construct image URLs with base path
- `useTitle(title, suffix)` - Construct page titles
- `capitalize(str)` - Capitalize first letter
- `addDaysToDate(date, days)` - Date arithmetic

**`src/lib/utils/index.ts`** - Re-exports utilities including Icons enum.

## Deployment to GitHub Pages

**Important Steps:**

1. Update `base` constant in `svelte.config.js` to match your GitHub repo name
2. Enable GitHub Pages in repository settings
3. Run `yarn build` to generate static files in `build/`
4. Deploy the `build/` directory to GitHub Pages

**Current base path:** `/portfolio`

## Development Patterns

### Adding New Portfolio Items

**To add a project:**

1. Add entry to `src/lib/projects.params.ts` array with required fields (slug, name, logo, description, etc.)
2. Optionally add markdown content in `src/lib/md/` and reference in description
3. Add project logo asset to `src/lib/data/assets.ts`

**To add an experience:**

1. Add entry to `src/lib/experiences.params.ts` with company, location, contract type, period, etc.
2. Follow same pattern as projects

**To add a skill:**

1. Add entry to `src/lib/skills.params.ts` with name, color, logo, etc.
2. Define color in `src/lib/data/colors.ts` if needed

### Asset Management

**Assets are referenced via:**

- `src/lib/data/assets.ts` - Centralized asset paths
- Type `Asset = string | { light: string; dark: string }` supports theme-specific assets
- Use `useImage()` helper to construct URLs with base path

### Markdown Rendering

The `Markdown.svelte` component uses:

- `marked` library for parsing
- `marked-gfm-heading-id` for heading IDs
- `marked-mangle` for email obfuscation
- `prismjs` for syntax highlighting
- `dompurify` for XSS protection

## TypeScript Patterns

**Key Types in `src/lib/types.ts`:**

- `Item` - Base type for portfolio items (projects, skills, etc.)
- `Project extends Item` - Includes links, period, skills, color, type
- `Experience extends Project` - Adds company, location, contract
- `Education extends Item` - Adds organization, location, period, subjects, degree
- `Skill extends Omit<Item, 'shortDescription'>` - Adds color

**Enums:**

- `Platform` - Social media platforms (GitHub, LinkedIn, Email, etc.)
- `ContractType` - Employment types (FullTime, PartTime, Freelance, etc.)

## Known Issues

- Svelte no longer supports Node 14 - use Node 16+ (Node 18+ recommended)

## Custom Favicon

Replace `static/favicon.ico` to customize the browser tab icon.

## Task Master AI Instructions
**Import Task Master's development workflow commands and guidelines, treat as if import is in the main CLAUDE.md file.**
@./.taskmaster/CLAUDE.md
