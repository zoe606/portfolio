# Repository Guidelines

## Project Structure & Module Organization

This portfolio is a SvelteKit app powered by Vite. Reusable UI, data models, and global styles live in `src/lib` (see `src/lib/params.ts` and `src/lib/index.scss`). Page-level routes and layouts sit under `src/routes`, while `static/` holds assets such as favicons that ship verbatim. Configuration files (`svelte.config.js`, `uno.config.ts`, `vite.config.ts`) govern build tooling and UnoCSS presets—review them before introducing new adapters or icon sets.

## Build, Test, and Development Commands

Run `yarn dev` for a hot-reloading local server. Use `yarn build` to produce the optimized static output that Vercel or GitHub Pages can serve. `yarn preview` runs the production bundle locally for smoke tests. `yarn check` wires up `svelte-kit sync` and `svelte-check` against `tsconfig.json`, catching typing and accessibility issues early. `yarn lint` executes Prettier in check mode followed by ESLint, and `yarn format` applies Prettier fixes when you are ready to commit.

## Coding Style & Naming Conventions

Prettier (with the Svelte plugin) enforces two-space indentation and standard line wrapping; eslint.config.js extends that with Svelte-specific linting. Name Svelte components with PascalCase files (`HeroSection.svelte`) and favour kebab-case for routes under `src/routes`. Keep SCSS partials co-located with their components when feasible, and update `components.json` whenever you introduce new shadcn-svelte primitives so the generator stays in sync.

## Testing Guidelines

Automated testing currently relies on `yarn check`; ensure it passes in CI before requesting a review. When adding logic-heavy modules, co-locate Playwright or Vitest suites under `src/routes/.../__tests__` and mirror the filename (`about.spec.ts`). For visual changes, attach before/after screenshots in the PR to document layout shifts. Aim to keep svelte-check clean and avoid introducing accessibility regressions flagged by its reports.

## Commit & Pull Request Guidelines

Follow the existing Conventional Commits style (`feat:`, `fix:`, `chore:`) to keep the history searchable; squash small tweaks into the relevant feature commit before pushing. Each PR should describe the motivation, summarize key changes, and link any tracking issues. Include command outputs (`yarn check`, `yarn lint`, `yarn build`) in the PR notes, and for UI updates add screenshots or short screen recordings. Confirm `svelte.config.js` reflects the correct `base` when targeting GitHub Pages deployments.
