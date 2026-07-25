# Practice Software Testing - Playwright framework

**English** | [Українська](README.uk.md)

TypeScript test automation framework built on **Playwright Test** for the Practice Software Testing applications.

The primary suite covers two public resources:

- current UI: [Practice Software Testing](https://practicesoftwaretesting.com/);
- standalone API resource: [Toolshop API v2](https://api-v2.practicesoftwaretesting.com/api/documentation).

The current UI is a newer application and uses `https://api.practicesoftwaretesting.com` internally. The framework observes those browser API responses for UI/API integration checks. API v2 is tested as a separate, standalone API resource; it is not described as the backend of the current UI.

## What is covered

- Current UI E2E: catalogue, category filtering, search, price sorting, product details, related products and quantity increase.
- UI/API integration: rendered values and ordering are compared with the exact `QUERY` and `GET` responses observed by the browser.
- API v2: pagination, Zod contracts, list/detail consistency, category filtering, sorting, case-insensitive search, related products and negative `404` handling.
- Contracts: Pact V3 consumer contract for API v2 plus verification against the public provider.
- Live defect evidence on the selected UI resource, with screenshots, video, trace, expected/actual and API exchanges.
- Optional, completely separate demonstration against the official intentionally broken `with-bugs` environment.
- Layered Playwright fixtures, component Page Objects, typed clients, endpoint-specific Zod contracts and reusable reporting services.

Valid product IDs on the current UI are ULIDs and can change when public data is refreshed. Positive tests therefore discover a current product dynamically from the catalogue instead of relying on a hardcoded product URL.

## Confirmed defects on the selected resource

A known stale product URL (its ULID no longer exists in the public catalogue) currently exposes two reproducible defects:

| ID             | Actual result                                                     | Expected result                                                                                  |
| -------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `LIVE-API-001` | The product endpoint returns `404`, but `/related` returns `500`. | Related products for a missing product return a client-safe `404`, not an internal server error. |
| `LIVE-UI-001`  | The page is partially empty and still shows `Related products`.   | A clear `Product not found` state is shown.                                                      |

Both tests are marked as expected failures (`test.fail()`): while the defects exist, the primary run stays green and still records the full evidence (screenshots, video, trace and API exchanges). Once a defect is fixed on the public site, the corresponding test reports an unexpected pass and should be converted into permanent regression coverage.

The former quantity claim is not a defect of the selected resource. `UI-PROD-002` now verifies the correct current behaviour: quantity changes from `1` to `2`.

## Project structure

```text
src/
  api/          # Typed API v2 client
  config/       # Primary and optional-demo environments
  contracts/    # Endpoint-specific Zod runtime contracts
  fixtures/     # Layered service, API and page fixtures
  models/       # API v2 response models
  pages/        # Page Objects and UI components
  reporting/    # Context, outcome, API and screenshot attachments
tests/
  api/          # Standalone API v2 checks
  contracts/    # Pact consumer and provider verification
  e2e/          # Current UI, integration checks and selected-resource defects
  defects/      # Optional with-bugs demonstration; excluded from primary config
```

## Test strategy

The tests are read-only and do not create, modify or delete public data.

| Layer                     | Coverage                                                                                                        |
| ------------------------- | --------------------------------------------------------------------------------------------------------------- |
| API v2                    | Transport, schemas, pagination, consistency, filtering, sort, search, related products and negative responses.  |
| Current UI                | Navigation, catalogue, filters, search, sorting, product details and quantity behaviour.                        |
| Integration               | Browser request body and response are attached; UI cards/details are compared to the UI application's live API. |
| Contract                  | Pact field-level matchers and verification against the API v2 provider.                                         |
| Selected-resource defects | Genuine failures from the exact stale product resource, with reproducible evidence.                             |
| Optional demo             | Four educational failures on separate intentionally broken UI/API hosts.                                        |

Tests use IDs such as `API-PROD-004`, `UI-CAT-003`, `LIVE-API-001` and tags including `@api`, `@e2e`, `@smoke`, `@regression`, `@integration`, `@negative`, `@defect` and `@known-bug`.

## Tech stack

| Layer                        | Technology                                                                                   | Version                                                |
| ---------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Language                     | TypeScript (`strict` mode, `NodeNext` modules)                                               | ^5.9.3                                                 |
| Test runner / framework base | Playwright Test, extended with a custom layered fixture chain (`services` → `api` → `pages`) | ^1.61.1                                                |
| Runtime                      | Node.js                                                                                      | 20 LTS+                                                |
| Package manager              | pnpm (via Corepack)                                                                          | 11.9.0                                                 |
| Schema validation            | Zod (typed runtime contracts for API responses)                                              | ^4.1.5                                                 |
| Contract testing             | Pact (consumer contract generation + provider verification)                                  | ^16.5.0                                                |
| Reporting                    | Playwright HTML, Allure, JUnit XML, JSON                                                     | allure-playwright ^3.10.2 / allure-commandline ^2.43.0 |
| Code quality                 | ESLint (typescript-eslint, @stylistic, unicorn) + Prettier                                   | eslint ^9.39.1 / prettier ^3.6.2                       |
| CI/CD                        | GitHub Actions (browser matrix: chromium, firefox, webkit)                                   | -                                                      |
| Containerization             | Docker / docker compose (`mcr.microsoft.com/playwright` base image)                          | v1.61.1-noble                                          |

## Prerequisites

- Node.js 20 or later;
- Corepack/pnpm;
- Internet access;
- Java 17 or later only when generating a visual Allure report.

## Installation

```bash
corepack enable
pnpm install
pnpm exec playwright install chromium firefox webkit
```

## Primary selected-resource run

```bash
pnpm run test
```

Focused commands:

```bash
pnpm run test:api
pnpm run test:e2e
pnpm run test:contract
pnpm run test:smoke
pnpm run test:regression
pnpm run typecheck
```

## Code quality

ESLint and Prettier use the shared configuration style of the repository (`eslint.config.mjs`, `.prettierrc`):

```bash
pnpm run lint
pnpm run lint:fix
pnpm run format:check
pnpm run format
```

## Cross-browser coverage

`pnpm run test` runs three Playwright projects: `chromium`, `firefox` and `webkit`. Only `chromium` runs the full suite (API, E2E, contracts); `firefox` and `webkit` are scoped to `tests/e2e` only, since API/contract tests exercise HTTP endpoints directly and gain nothing from re-running per browser. To target one browser locally:

```bash
pnpm run test:chromium
pnpm run test:firefox
pnpm run test:webkit
```

`playwright.with-bugs.config.ts` explicitly pins its own `chromium`-only project, so the optional defect demo never inherits the base config's multi-browser matrix.

Open the primary Playwright report:

```bash
pnpm run report
```

Primary outputs:

- `playwright-report/` - interactive HTML report;
- `test-results/results.json` and `test-results/junit.xml`;
- `test-results/` - screenshots, video and traces;
- `allure-results/` - raw Allure results.

Generate Allure HTML:

```bash
pnpm run report:allure
pnpm run report:allure:open
```

## How to demonstrate bugs on the other page

The optional demonstration is intentionally separate from the primary suite. It targets:

- UI: `https://with-bugs.practicesoftwaretesting.com`;
- API: `https://api-with-bugs.practicesoftwaretesting.com`.

The primary `pnpm run test` command never executes `tests/defects`.

Run the intentionally broken page and API scenarios:

```bash
pnpm run test:with-bugs
```

`test:defects` is retained as an alias:

```bash
pnpm run test:defects
```

The command is expected to return a non-zero exit code while the demonstrated bugs exist. All four scenarios still run and produce evidence. Open their separate report with:

```bash
pnpm run report:with-bugs
```

The optional report is written to `playwright-report-with-bugs/`; screenshots, videos and traces are in `test-results-with-bugs/`. It never overwrites the primary report.

Optional Allure report:

```bash
pnpm run report:allure:with-bugs
pnpm run report:allure:with-bugs:open
```

After a demonstrated bug is fixed, its normal assertion becomes `passed`.

## Configuration

Primary URLs can be overridden without source changes:

```powershell
$env:PST_UI_URL = 'https://practicesoftwaretesting.com'
$env:PST_UI_API_URL = 'https://api.practicesoftwaretesting.com'
$env:PST_API_URL = 'https://api-v2.practicesoftwaretesting.com'
pnpm run test
```

Optional demonstration URLs:

```powershell
$env:PST_BUG_UI_URL = 'https://with-bugs.practicesoftwaretesting.com'
$env:PST_BUG_API_URL = 'https://api-with-bugs.practicesoftwaretesting.com'
pnpm run test:with-bugs
```

Every command clears only its own generated report folders before execution. Primary and optional demonstration reports therefore remain independent and never accumulate stale results.

## Docker

```bash
docker compose run --rm tests
```

Docker runs the primary selected-resource suite across all three browser projects (chromium, firefox, webkit — the base image already bundles all of them) and generates Playwright and Allure reports. The optional intentionally broken demonstration is not part of the Docker default command.

## CI

The GitHub Actions workflow lives at the repository root (`.github/workflows/playwright-finalproject.yml`) and is triggered by pushes and pull requests that touch `FinalProject/**` (plus manual `workflow_dispatch`), so runs appear only for changes to this project.

The workflow has two jobs:

- `lint` — Prettier formatting check, ESLint and TypeScript type check;
- `test` — the primary selected-resource suite as a `fail-fast: false` matrix job per browser (`chromium`, `firefox`, `webkit`), so one browser's failure doesn't cancel the others. Each matrix job installs only its own browser, runs `playwright test --project=<browser>`, generates an Allure report and uploads both the Playwright HTML report and the Allure report as separate artifacts.
