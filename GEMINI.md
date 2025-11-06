# Gemini Project Context: Svelte Portfolio

This document provides a comprehensive overview of the Svelte portfolio project for the Gemini CLI, enabling it to assist with development tasks effectively.

## Project Overview

This project is a personal portfolio website built with SvelteKit, a modern web development framework. It showcases the developer's skills, experience, and projects. The portfolio is designed to be a static site, making it fast, secure, and easily deployable.

**Key Technologies:**

- **SvelteKit:** The core framework for building the application.
- **Vite:** The build tool and development server.
- **TypeScript:** For static typing and improved code quality.
- **UnoCSS:** A utility-first CSS framework for styling.
- **marked:** A Markdown parser for rendering content.
- **Fuse.js:** A lightweight fuzzy-search library.
- **vite-imagetools:** A Vite plugin for image optimization.

## Building and Running

The following scripts are available in `package.json` to manage the development lifecycle:

- **`npm run dev`**: Starts the development server with hot-reloading.
- **`npm run build`**: Builds the application for production. The output is generated in the `build` directory.
- **`npm run preview`**: Serves the production build locally for previewing.
- **`npm run check`**: Runs `svelte-check` to perform type-checking on Svelte components and TypeScript files.
- **`npm run lint`**: Lints the codebase using ESLint and Prettier to enforce code quality and consistency.
- **`npm run format`**: Formats the entire codebase using Prettier.

## Development Conventions

- **Code Style:** The project uses Prettier for automatic code formatting. The configuration is defined in `.prettierrc`.
- **Linting:** ESLint is used to identify and report on patterns in the code. The configuration is in `eslint.config.js`.
- **TypeScript:** The project is written in TypeScript to ensure type safety. The TypeScript configuration is in `tsconfig.json`.
- **Styling:** The project uses UnoCSS, a utility-first CSS framework. The configuration is in `uno.config.ts`.

## Project Structure

- **`src/`**: Contains the main source code of the application.
  - **`lib/`**: Contains the core logic, components, and utilities.
    - **`components/`**: Reusable Svelte components.
    - **`data/`**: Data files for the portfolio, such as projects, experiences, and skills.
    - **`params.ts`**: Main configuration file for personal data.
  - **`routes/`**: Contains the pages of the application. Each file or directory in this folder corresponds to a route.
- **`static/`**: Contains static assets such as images, fonts, and the resume PDF.
- **`svelte.config.js`**: The main configuration file for SvelteKit.
- **`vite.config.ts`**: The configuration file for Vite.
- **`package.json`**: Defines the project's dependencies and scripts.

## Deployment

The project is configured to be deployed as a static site. The `svelte.config.js` file uses `@sveltejs/adapter-static` to generate the static files in the `build` directory.

Before deploying to GitHub Pages, ensure the `base` path in `svelte.config.js` is set correctly.
