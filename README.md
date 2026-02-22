# FSC Learning Dashboard

FSC learning platform built with Next.js 16, Tailwind CSS v4, and TypeScript.

## Get Started

```bash
npm install
npm run dev        # App at http://localhost:3000
npm run storybook  # Component library at http://localhost:6006
```

## Links

[Project Link](https://fsc-learning.vercel.app/)

[Design System Link](https://fsc-ds-storybook.netlify.app/)

[Figma File](https://www.figma.com/design/RIPX2IdTJQksHaVv3DA7nd/FSC-Learning?node-id=103-612&t=S7abdBLQ3OTxVvxC-1)

## What's Inside

**Dashboard**: See courses in progress, pick up where you left off, and discover new courses.

**Catalogue**: Browse all available courses with save for later bookmarks.

**Achievements**: Track completed courses, certifications, and your learning streak.

**Global Search**: Hit `Ctrl+K` to search across courses, and pages.

**Dark Mode**: Toggle between light and dark themes. Remembers your preference.

**4 Languages**: English, French, German, and Spanish.

**Fully Accessible**: Keyboard navigation everywhere, screen reader friendly, WCAG 2.1 AA compliant.

**Responsive**: Works on desktop, tablet, and mobile with adaptive layouts.

## Design System

18 reusable components (`Button`, `CourseCard`, `Popover`, `SearchModal`, `Badge`, `Avatar`, and more) living in their own local package.

```tsx
import { Button, CourseCard } from '@fsc/design-system';
```

Every component comes with unit tests and Storybook stories.

## Scripts

| Command             | What it does              |
| ------------------- | ------------------------- |
| `npm run dev`       | Dev server on port 3000   |
| `npm run build`     | Production build          |
| `npm run lint`      | Lint everything           |
| `npm run test`      | Unit tests (watch mode)   |
| `npm run test:e2e`  | E2E + accessibility tests |
| `npm run storybook` | Storybook on port 6006    |

## Tech Stack

Next.js 16 / React 19 / TypeScript (strict) / Tailwind CSS v4 / next-intl / next-themes / Floating UI / Vitest / Playwright / Storybook 10 / ESLint 9 / Husky

## CI

GitHub Actions runs lint, build, unit tests, E2E tests, and an accessibility audit on every push. All must pass before merge.
