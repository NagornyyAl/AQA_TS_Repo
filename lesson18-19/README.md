# Lesson 18-19 hw — Playwright, POM, WebElements & Fixtures (hotline.ua)

Playwright Test project (TypeScript) covering the [hotline.ua](https://hotline.ua/) homepage.

- **Lesson 18** — Page Object Model for the homepage with a few multi-step test cases.
- **Lesson 19** — the homepage is broken down into reusable **WebElements (components)**, page objects compose those components, and tests receive page objects via **Playwright fixtures** instead of manual instantiation.

## Project structure

```text
src/
  pages/
    components/
      catalog-menu.component.ts       # WebElement: catalog button + dropdown menu + category links
      search-box.component.ts         # WebElement: search input + autosuggest dropdown
      breadcrumbs.component.ts        # WebElement: breadcrumbs list (reused by any content page)
      product-list.component.ts       # WebElement: product cards grid (reused by search results / category pages)
      index.ts
    hotline-home.page.ts              # PageObject: homepage, composed of CatalogMenuComponent + SearchBoxComponent
    hotline-category.page.ts          # PageObject: category page, composed of BreadcrumbsComponent
    hotline-search-results.page.ts    # PageObject: search results page, composed of ProductListComponent
    index.ts
  fixtures/
    pages.fixture.ts                  # test.extend() — injects homePage/categoryPage/searchResultsPage into tests
    index.ts
tests/
  homepage.spec.ts       # Homepage smoke test (key elements)
  catalog-menu.spec.ts   # Catalog menu -> category navigation (2 cases, incl. component reuse across categories)
  search.spec.ts         # Search autosuggest + full search results
```

## Why components + fixtures (lesson 19)

Each UI block (catalog menu, search box, breadcrumbs, product list) is modeled as a small **WebElement** class that owns its own locators and actions. Page objects don't duplicate locators — they just compose the components they need. This is what lets `BreadcrumbsComponent` and `CatalogMenuComponent` be reused unchanged across different categories in `catalog-menu.spec.ts`.

Based on ["Playwright Fixtures vs POM: Which One Should You Choose?"](https://kailash-pathak.medium.com/playwright-fixtures-vs-pom-which-one-should-you-choose-d2ff01ec4f58), plain POM has three pain points once a suite grows: every test repeats `new HomePage(page)`, a page object change means editing every test file that instantiates it, and setup code is duplicated per test. The article's conclusion isn't "pick one" — it's to wrap page objects as fixtures via `base.extend()`, so tests declare `({ homePage }) => …` and Playwright handles instantiation/DI for them.

That's exactly how `src/fixtures/pages.fixture.ts` is built here: `homePage`, `categoryPage` and `searchResultsPage` are fixtures on top of the standard `test`, and every spec imports `test`/`expect` from `../src/fixtures` instead of `@playwright/test`, so no test ever writes `new HotlineHomePage(page)` directly.

## Test cases

1. **Homepage** — verifies URL, title, logo, catalog button, search input, city selector and footer are all present (7 checks).
2. **Catalog menu → category** — opens the catalog menu, verifies its categories, navigates to a category and checks the resulting URL, heading and breadcrumbs (6 checks).
3. **Catalog menu component reuse** — reopens the catalog menu and navigates to a *different* category, proving the same `CatalogMenuComponent`/`BreadcrumbsComponent` work unchanged (4 checks).
4. **Search autosuggest** — types a query and verifies the autosuggest dropdown, suggestion relevance and "show all results" option (4 checks).
5. **Search results** — submits a search and verifies the results page URL, title, product count and result relevance (5 checks).

## Run

```bash
npm install
npx playwright install chromium
npm test
```

Other commands: `npm run test:headed`, `npm run test:debug`, `npm run test:report`, `npm run lint`, `npm run format:check`.
