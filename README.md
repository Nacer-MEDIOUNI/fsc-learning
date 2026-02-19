# FSC Learning Dashboard

Next.js 16 + Tailwind CSS v4 + TypeScript (strict) learning platform with a local design system, i18n (English/Spanish/German), and full CI pipeline.

## Quick Start

```bash
npm install
npm run dev        # http://localhost:3000
npm run storybook  # http://localhost:6006
```

## Scripts

| Command             | Description                  |
| ------------------- | ---------------------------- |
| `npm run dev`       | Start dev server             |
| `npm run build`     | Production build             |
| `npm run lint`      | ESLint (src + design system) |
| `npm run format`    | Prettier format all files    |
| `npm run test`      | Vitest (watch mode)          |
| `npm run test:e2e`  | Playwright E2E + a11y tests  |
| `npm run storybook` | Storybook on port 6006       |

## Project Structure

```
src/app/[locale]/          App pages (i18n via next-intl)
src/i18n/                  Locale routing, navigation helpers
i18n/{en,es,de}/              Translation files
data/                      Static JSON data (no database)
design-system/
  components/              Shared UI components (tests + stories)
e2e/                       Playwright E2E + a11y tests
.storybook/                Storybook config (DS stories only)
.github/workflows/         CI pipeline
```

## Design

[Figma File](https://www.figma.com/design/RIPX2IdTJQksHaVv3DA7nd/FSC-Learning?node-id=0-1&t=UVk2SXyvqRvMfzwG-1)

## Design System

Local package linked as `@fsc/design-system`. Components only no tokens, no utilities.

```tsx
import { Button } from '@fsc/design-system';
```

Each component has 5 files: `.tsx`, `.interfaces.ts`, `.test.tsx`, `.stories.tsx`, `index.ts`.

Design tokens (colors, typography, spacing, etc.) live in `src/app/globals.css` via Tailwind v4 `@theme`.

## Git Hooks

- **pre-commit**: lint-staged (ESLint + Prettier on staged files)
- **commit-msg**: commitlint enforcing [Conventional Commits](https://www.conventionalcommits.org/)

```
type(scope): description     # scope is optional
feat: add course progress    # valid
fix(button): hover state     # valid
bad message                  # rejected
```

## CI

GitHub Actions runs on every push and PR: lint, build, unit tests, E2E tests, and WCAG 2.1 AA a11y audit.
