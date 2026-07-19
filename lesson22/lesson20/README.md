# Lesson 20 hw — BDD, Gherkin, Cucumber.js (hotline.ua)

Проєкт для домашнього завдання 20: BDD-тести на **Cucumber.js** + **Playwright** (TypeScript) для сайту [hotline.ua](https://hotline.ua/). Сценарії переписані з Playwright/POM-тестів [homework 18-19](../lesson18-19) на Gherkin.

## Що таке BDD / Gherkin / Cucumber.js

- **BDD** ([cucumber.io/docs/bdd](https://cucumber.io/docs/bdd/)) — підхід до розробки, у якому очікувана поведінка системи описується прикладами (сценаріями) в термінах бізнесу, зрозумілими і QA, і аналітику, і розробнику, ще до написання коду. Це спільна мова між ролями, а не просто формат для автотестів.
- **Gherkin** ([cucumber.io/docs/gherkin](https://cucumber.io/docs/gherkin/)) — DSL для запису цих сценаріїв у вигляді `Given/When/Then` (і `Background`, `Scenario Outline`/`Examples` для параметризації). Файли `.feature` є "живою документацією" — водночас специфікацією і джерелом для автотестів.
- **Cucumber.js** ([github.com/cucumber/cucumber-js](https://github.com/cucumber/cucumber-js), [10-minute tutorial](https://cucumber.io/docs/guides/10-minute-tutorial/?lang=javascript)) — реалізація Cucumber для Node.js/TypeScript: парсить `.feature`-файли і виконує відповідні step definitions (`Given/When/Then` з `@cucumber/cucumber`). Сам Cucumber.js **не вміє керувати браузером** — він лише прив'язує кроки Gherkin до коду, тому інструмент для UI (тут — Playwright) підключається окремо, через `World` та hooks.

## Чому "сирий" Cucumber.js + Playwright, а не playwright-bdd

Розглядали два варіанти інтеграції Cucumber з Playwright:

1. **[playwright-bdd](https://vitalets.github.io/playwright-bdd/#/)** — генерує Playwright-тести з `.feature`-файлів (`defineBddConfig` + `bddgen`) і запускає їх через `@playwright/test` runner. Це дає Playwright fixtures, паралелізацію, вбудовані репортери й трейси "з коробки".
2. **`@cucumber/cucumber` напряму** (обраний варіант) — Cucumber сам є test runner'ом, а Playwright підключається вручну через `World`/hooks. Це "класичний" підхід Cucumber.js, і саме його продовжує цей проєкт — для послідовності зі стилем курсу.

Обидва підходи однаково валідні; playwright-bdd зручніший, якщо команда вже живе в екосистемі `@playwright/test`, а прямий Cucumber.js — коли Cucumber має лишатись єдиним test runner'ом (наприклад, поруч з не-UI кроками).

## Fixtures vs POM — і як це відображено тут

Стаття ["Playwright Fixtures vs POM: Which One Should You Choose?"](https://kailash-pathak.medium.com/playwright-fixtures-vs-pom-which-one-should-you-choose-d2ff01ec4f58) описує біль звичайного POM без DI: кожен тест повторює `new HomePage(page)`, зміна конструктора page object означає правки в усіх тестах, а сетап дублюється. Висновок статті — не "або-або", а **обгортати page objects як fixtures** (`base.extend()`), щоб тести отримували готові page object'и через параметри, а не створювали їх самі. 

У Cucumber.js немає `test.extend()` — його аналог DI на рівні сценарію це кастомний **`World`**. Тут `src/world/hotline.world.ts` виконує ту саму роль, що й fixture-файл у lesson19: step definitions звертаються до `this.homePage`, `this.categoryPage`, `this.searchResultsPage` (ліниві, кешовані геттери), а не створюють page object вручну — конструктор `Page` завжди один, і World сам вирішує, коли його інстанціювати. POM-класи (`src/pages/**`) при цьому взяті майже без змін з минулого уроку — вони не залежать від test runner'а, тож однаково працюють і під `@playwright/test`, і під `@cucumber/cucumber`.

## Структура проєкту

```text
features/
  homepage.feature       # Background + Scenario
  search.feature         # Background + 2 Scenario
  catalog-menu.feature   # Background + Scenario Outline з Examples
src/
  main.ts                # setWorldConstructor + setDefaultTimeout
  world/
    hotline.world.ts     # кастомний World: page/browserContext + ліниві геттери page object'ів (DI, аналог fixtures)
  hooks/
    browser.hook.ts       # BeforeAll/AfterAll — запуск/закриття браузера (один на увесь run)
    page.hook.ts           # Before/After — новий BrowserContext + Page на кожен сценарій
    attach-results.hook.ts # After — скріншот у звіт при падінні сценарію
    index.ts
  pages/                  # Page Object Model, перенесений з lesson18-19
    components/           # WebElements: catalog-menu, search-box, breadcrumbs, product-list
    hotline-home.page.ts
    hotline-category.page.ts
    hotline-search-results.page.ts
  steps/
    homepage.steps.ts
    search.steps.ts
    catalog-menu.steps.ts
```

## Тест-кейси

1. **Homepage** (`homepage.feature`) — після завантаження головної сторінки видно title, лого, кнопку каталогу з текстом "Каталог", поле пошуку з правильним placeholder, непорожню назву міста і футер.
2. **Search** (`search.feature`) — два сценарії: автопідказки під час вводу запиту "iphone 15" (підказки релевантні, є посилання "показати всі результати"), і перехід на сторінку результатів пошуку (URL, заголовок, наявність і релевантність товарів).
3. **Catalog menu** (`catalog-menu.feature`) — `Scenario Outline` з двома прикладами (`Examples`): відкриття каталогу, перевірка списку категорій, перехід у категорію та перевірка URL, заголовка й хлібних крихт — демонструє переюзання одних і тих самих кроків/POM для різних категорій без дублювання сценаріїв.

## Запуск

```bash
npm install
npx playwright install chromium
npm test
```

- `npm test` — профіль `local` (`cucumber.cjs`), Chromium headless (керується змінною `HEADLESS`, за замовчуванням `true`). Запуск з видимим браузером:
  - bash/zsh: `HEADLESS=false npm test`
  - PowerShell: `$env:HEADLESS = 'false'; npm test`
- `npm run test:debug` — той самий профіль, але лише сценарії з тегом `@debug`.
- `npm run test:ci` — профіль `ci`: додає JSON/HTML звіти у `reports/` і 1 retry для нестабільних сценаріїв.
- `npm run lint` / `npm run format:check` — ESLint/Prettier (конфіги узгоджені з іншими уроками курсу).
