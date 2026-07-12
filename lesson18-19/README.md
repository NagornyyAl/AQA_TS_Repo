# Lesson 18 hw — Playwright + Page Object Model (hotline.ua)

Playwright Test project (TypeScript) covering the [hotline.ua](https://hotline.ua/) homepage with a Page Object Model.

## Project structure

```text
src/
  pages/
    hotline-home.page.ts            # Homepage POM: header, catalog menu, search/autosuggest, city, footer
    hotline-category.page.ts        # Catalog category page POM: heading, breadcrumbs
    hotline-search-results.page.ts  # Search results page POM: results title, result items
tests/
  homepage.spec.ts       # Homepage smoke test (key elements)
  catalog-menu.spec.ts   # Catalog menu -> category navigation
  search.spec.ts         # Search autosuggest + full search results
```

## Test cases

1. **Homepage** — verifies URL, title, logo, catalog button, search input, city selector and footer are all present (7 checks).
2. **Catalog menu** — opens the catalog menu, verifies its categories, navigates to a category and checks the resulting URL, heading and breadcrumbs (6 checks).
3. **Search autosuggest** — types a query and verifies the autosuggest dropdown, suggestion relevance and "show all results" option (4 checks).
4. **Search results** — submits a search and verifies the results page URL, title, product count and result relevance (5 checks).

## Run

```bash
npm install
npx playwright install chromium
npm test
```

Other commands: `npm run test:headed`, `npm run test:debug`, `npm run test:report`.
