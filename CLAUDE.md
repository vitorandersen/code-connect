# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

pnpm workspace (`pnpm-workspace.yaml` → `apps/*`) with two independent apps that share no code yet:

- `apps/web` — React 19 + Vite 8 + TypeScript SPA (package name `web`).
- `apps/api` — NestJS 12 backend (package name `api`). It has its own `apps/api/CLAUDE.md` → `AGENTS.md` with NestJS-specific guidance (ESM-only rules, Vitest, first-party Nest packages, NestJS Observe telemetry); read it before working in the API.

The API listens on `PORT`, default **3001** (`apps/api/src/main.ts`); Vite's dev server uses 5173. The web app does not call the API yet — no proxy is configured in `apps/web/vite.config.ts`.

## Commands

Run from the repo root (always use pnpm, not npm):

```bash
pnpm install
pnpm dev              # web (vite) + api (nest start --watch) in parallel
pnpm dev:web          # web only
pnpm dev:api          # api only
pnpm build            # build all apps (web: tsc -b && vite build; api: nest build)
pnpm lint             # oxlint in every app
pnpm test:api         # api unit tests (vitest run)
```

Any app script can be run through the filter aliases: `pnpm api <script>` / `pnpm web <script>`, e.g.

```bash
pnpm api test:e2e                         # api e2e tests (test/*.e2e-spec.ts)
pnpm api test src/app.controller.spec.ts  # single test file
pnpm api test -t "should return"          # tests matching a name
pnpm api test:watch
pnpm api format                           # prettier on src/ and test/
```

## Frontend (`apps/web`)

### Atomic design

Components live in `src/components/`, organized by atomic level:

- `atoms/` — smallest UI building blocks with no dependency on other components (Button, Input, Label, Icon).
- `molecules/` — small groups of atoms with one purpose (FormField = Label + Input + error text, SearchBar).
- `organisms/` — larger sections composed of molecules/atoms (Header, PostCard list, LoginForm).
- `templates/` — page layouts that arrange organisms and receive content via props/children; no data fetching.
- `pages/` — templates filled with real data; the only level that fetches data or reads routing/global state.

A component may only import from its own level or lower levels, never higher. One component per folder, e.g. `atoms/Button/Button.tsx` + `Button.test.tsx` + `index.ts`.

### Styling

Use Tailwind CSS utility classes for all styling (Tailwind v4 via the `@tailwindcss/vite` plugin). Don't add new `.css` files or CSS modules for component styles; the remaining Vite template CSS (`App.css`, `index.css`) should be replaced by Tailwind as components are migrated. Put shared design tokens (colors, fonts, spacing) in the Tailwind theme, not as hardcoded values repeated across components.

### Tests

Every component must have a test file next to it (`Component.test.tsx`) covering its essential use: it renders with its required props, and its main interaction or variant works (e.g. a button calls `onClick`, a form field shows its error). Use Vitest + React Testing Library + `@testing-library/user-event`, querying by role/label/text rather than class names or test ids.

> The web app has no test runner configured yet. Before adding the first component test, set up Vitest (`jsdom` environment) with React Testing Library and `@testing-library/jest-dom`, and add `test` scripts to `apps/web/package.json` and a `test:web` script at the root.

## Backend (`apps/api`) — REST

All HTTP endpoints must follow REST principles:

- **Resources, not actions:** URLs name resources with plural nouns in kebab-case (`/users`, `/users/:id`, `/users/:id/posts`). No verbs in paths (`/getUsers`, `/users/:id/delete` are wrong). Nest maps a resource to a controller: `@Controller('users')`.
- **HTTP methods carry the semantics:**
  - `GET` reads (safe, no side effects) — collection or single item.
  - `POST` creates on the collection.
  - `PUT` replaces the whole resource; `PATCH` partially updates it.
  - `DELETE` removes it.
  - `GET`, `PUT` and `DELETE` must be idempotent.
- **Status codes:** `200` OK for reads/updates with a body; `201 Created` on `POST`, with a `Location` header pointing at the new resource and the created resource in the body; `204 No Content` for `DELETE` (and updates that return no body); `400` invalid input; `401` unauthenticated; `403` forbidden; `404` resource not found; `409` conflict (e.g. duplicate); `422` well-formed but semantically invalid; `500` only for unexpected errors. Use Nest's built-in exceptions (`NotFoundException`, `ConflictException`, …) and `@HttpCode()` rather than building responses by hand.
- **Representations:** JSON in and out, `camelCase` fields. Return the resource itself, not wrappers like `{ success: true, data }`. Errors use one consistent shape across the API (Nest's default `{ statusCode, message, error }`).
- **Collections:** filtering, sorting and pagination go in query parameters (`GET /posts?author=42&sort=-createdAt&page=2&limit=20`), never in the path or body. Paginated responses include pagination metadata (total, page, limit).
- **Nesting:** at most one level of nesting (`/users/:id/posts`); deeper relations get their own top-level resource.
- **Stateless:** every request carries everything needed to process it (e.g. auth token in the `Authorization` header); no server-side session state between requests.
- **Validation:** validate path params, query and body at the boundary (see the validation notes in `apps/api/AGENTS.md`) and return `400` for invalid input.
- **Versioning:** if a breaking change to an existing endpoint is needed, version via URI (`/v1/...`, Nest `enableVersioning`) instead of changing the contract in place.

## Git — Conventional Commits

Both apps use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short imperative description>

[optional body]

[optional footer(s)]
```

- **Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- **Scope:** the app touched — `web` or `api` (e.g. `feat(web): add Button atom`, `fix(api): return 404 for unknown user`). Omit the scope for repo-wide changes (`chore: update pnpm lockfile`). A commit that touches both apps for unrelated reasons should be split.
- **Breaking changes:** add `!` after the type/scope (`feat(api)!: rename /user to /users`) and a `BREAKING CHANGE:` footer explaining the migration.
- Description in lowercase, imperative mood, no trailing period, ≤ 72 characters for the header line.

## Conventions

- Both apps are ESM (`"type": "module"`). In the API, relative imports must end in `.js` and tests use `vi.fn()` (Vitest, globals enabled), not Jest.
- Linting is oxlint, not ESLint. API lint is type-aware (`oxlint --type-aware`) and treats `no-floating-promises` as an error; web enables the react/typescript/oxc plugins.
- Line endings are normalized to LF via the root `.gitattributes` (CRLF only for `.bat`/`.cmd`/`.ps1`). Development happens on Windows, so keep new files LF.
