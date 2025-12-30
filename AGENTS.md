# Repository Guidelines (Food Manager)

## Project Overview

Food Manager is a portfolio app to track food items and visualize how many days remain until expiry.

**Current MVP (implemented):**

- Authentication (email/password + OAuth providers via NextAuth)
- Dashboard (expiry status distribution, status-based lists, category distribution)
- Error handling (typed AppError + UI error boundary)
- Quality gates (TypeScript, ESLint, Prettier, unit tests, Storybook tests) in CI

**Planned / not implemented yet (roadmap):**

- Full Food CRUD screens (register/edit/consume)
- In-app notifications and/or scheduled jobs
- Cleanup job for old/expired records

## Project Structure & Module Organization

- `src/app`: Next.js App Router routes.
  - Route groups are used (e.g., `(main)` for authenticated area).
- `src/features`: feature modules (e.g., `auth`, `food`, `category`).
- `src/components` / `src/components/ui`: shared UI components and shadcn/ui primitives.
- `src/server`: server-only code (repositories, services).
- `src/lib`: cross-cutting utilities (auth/session helpers, prisma client, error utilities).
- `prisma/`: schema, migrations, seed scripts.
- `.github/workflows`: CI workflows.

## Core Product Rules (implemented)

### Expiry date rules

- `expiryDate` is stored as `DateTime?` (nullable). The app treats it as a **date-based** concept:
  - Calculations normalize both “today” and `expiryDate` to **start-of-day (00:00)** before computing differences.
  - Time-of-day is effectively ignored for status judgment.
- “No expiry” is `expiryDate = null`:
  - It is shown as `期限未設定` in UI.
  - It is excluded from expiry-based alerts/sections and expiry distribution (until a dedicated bucket is added).

### Days remaining

- `daysRemaining = ceil((expiryDate_start_of_day - today_start_of_day) / 1 day)`
- UI formatting:
  - `daysRemaining < 0` → `期限切れ`
  - `daysRemaining == 0` → `今日まで`
  - `daysRemaining > 0` → `残N日`

### Status buckets (dashboard)

Dashboard groups foods into these buckets (priority order):

- `expired`: `daysRemaining < 0`
- `urgent`: `0..3`
- `warning`: `4..7`
- `mid_term`: `8..30`
- `long_term`: `31+`

## Dashboard Behavior (implemented)

- Only **not consumed** foods are included: `isConsumed = false`.
- Default expanded sections:
  - `expired` and `urgent` are expanded by default.
- Empty handling:
  - If the whole dashboard is empty, show the dedicated empty state with CTA.
  - Otherwise, hide empty status sections by default, with exceptions controlled by config.

## Error Handling & Observability (implemented)

### AppError

- Unknown errors are normalized into `AppError` with:
  - `type`: `NETWORK` | `DATABASE` | `UNKNOWN`
  - optional Prisma error code extraction (e.g., P1001/P1017/P2025)
  - `userMessage` for safe UI display

### Error boundary UI

- `(main)` route group provides an error page that:
  - shows icon + title based on error type
  - offers `再読み込み` and `ホームへ戻る`
  - prints detailed logs in development

### Logging

- `ErrorLogger` supports optional external logger registration (e.g., Sentry).
- In production, console output is minimized; `console.error` is preserved.

### Dev-only error testing

- When enabled, a forced error can be thrown for manual testing:
  - `NEXT_PUBLIC_ENABLE_ERROR_TESTING=true`
  - `FORCE_ERROR_TYPE=database|network|...`

## Environment Variables & Secrets

- Environment validation uses `@t3-oss/env-nextjs` (`src/env.ts`).
- **Never commit secrets** (`.env.local` must not be pushed). Use:
  - GitHub Actions Secrets for CI
  - Hosting provider environment variables for production
- CI currently allows a temporary bypass for env validation:
  - `SKIP_ENV_VALIDATION=true`
  - This should be removed once CI env vars are properly configured.

## Build, Test, and Dev Commands

### Local

- `npm run dev`: start Next.js dev server.
- `npm run build`: Prisma generate + Next build.
- `npm run lint`: ESLint.
- `npm run format`: Prettier write.
- `npm run type-check:full`: TypeScript check.

### Tests

- Unit: `npm run test` (Vitest, loads `.env.test`).
- Storybook: `npm run storybook` (dev) / `npm run test:storybook` (CI, Vitest + Playwright).

### Prisma

- `npm run migrate:dev`: create/apply migrations (uses `.env.local`).
- `npm run reset:dev`: reset DB.
- `npm run seed:dev`: seed data.

## CI / Quality Gates (implemented)

GitHub Actions runs on `push` and `pull_request` to `main`:

- Install dependencies (`npm ci`)
- Install Playwright browsers (Chromium)
- TypeScript check
- ESLint
- Prettier check
- Unit tests (Vitest)
- Storybook tests (Vitest + Playwright)

A PR must pass CI before merging.

## Coding Style & Implementation Notes

- Prefer Server Components / Server Actions; avoid unnecessary `useState`/`useEffect`.
- Validation: Zod + Conform.
- Always scope DB queries by authenticated `userId`.
- Prisma client:
  - dev: log queries/warn/error
  - production: log errors only
  - sensitive fields are omitted via Prisma `omit` where possible.

## Contribution / AI Working Rules

- Default to **proposal first**:
  - list target files + rationale + pseudo-diff before editing.
- Keep changes small (one concern per PR/commit).
- Do not modify or reveal secrets; never paste `.env` values in logs or docs.
- Update tests and CI expectations when behavior changes.
- When changing product rules (expiry logic, bucket ranges), update this document.
