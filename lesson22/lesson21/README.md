# Lesson 21 — HTML-репортери у Playwright-проєкті

Домашнє завдання 21: імплементація HTML-репортерів для UI-тестів. За основу взято POM-тести на
hotline.ua з домашнього завдання 18-19 (Playwright + TypeScript), до яких додано декілька
репортерів test-результатів.

## Що реалізовано

| Репортер | Статус | Як підключено |
| --- | --- | --- |
| **Allure Report** | ✅ Повністю робочий, HTML генерується локально | `allure-playwright` + `allure-commandline` |
| **Mochawesome** | ✅ Повністю робочий, HTML генерується локально | `pwmochawesome` (Playwright-репортер у стилі Mochawesome) |
| **Playwright HTML** | ✅ Залишений як базовий (штатний) репортер | вбудований у `@playwright/test` |
| **BrowserStack Test Observability** | ⚙️ Задокументовано, потребує платного акаунта BrowserStack |
| **ReportPortal** | ⚙️ Задокументовано, потребує self-hosted сервера (Docker) | 

## Структура проєкту

```
lesson21/
├── src/
│   ├── fixtures/         # Playwright test-фікстури (page objects як DI)
│   └── pages/             # Page Object Model для hotline.ua
├── tests/                  # Спеки: homepage, catalog-menu, search
├── playwright.config.ts    # Конфігурація Playwright + список репортерів
└── package.json
```

## Встановлення

```bash
npm install
npx playwright install chromium
```

## Запуск тестів

```bash
npm test
```

Під час прогону одночасно формуються дані для трьох репортерів:

- `playwright-report/` — стандартний HTML-звіт Playwright;
- `allure-results/` — сирі JSON-результати для Allure;
- `mochawesome-report/mochawesome.html` — готовий HTML-звіт у стилі Mochawesome (генерується
  одразу під час прогону, окремої команди не потрібно).

## Перегляд звітів

```bash
# Playwright HTML report
npm run test:report

# Mochawesome — просто відкрити файл у браузері
start mochawesome-report/mochawesome.html   # Windows
# open mochawesome-report/mochawesome.html  # macOS

# Allure — зібрати HTML з allure-results (single-file) і просто відкрити файл у браузері
npm run allure:generate
start allure-report/index.html   # Windows
# open allure-report/index.html  # macOS

# альтернатива: підняти локальний сервер зі звітом без збірки в окрему теку
npm run allure:serve
```

## Конфігурація репортерів

Все налаштовано в одному місці — [playwright.config.ts](playwright.config.ts):

```ts
reporter: [
    ['html', { open: 'never' }],
    ['list'],
    ['allure-playwright', { resultsDir: 'allure-results' }],
    ['pwmochawesome', {
        generateHTML: true,
        reportDir: 'mochawesome-report',
        reportTitle: 'Hotline.ua - Playwright report',
        charts: true
    }]
]
```

Playwright підтримує декілька репортерів одночасно "з коробки" — кожен зі списку отримує один і
той самий потік результатів тестів і формує свій вихідний файл незалежно від інших.

### Allure Report

- Пакети: [`allure-playwright`](https://www.npmjs.com/package/allure-playwright) (адаптер для
  Playwright Test) + [`allure-commandline`](https://www.npmjs.com/package/allure-commandline)
  (CLI для збірки HTML із JSON-результатів).
- Документація: https://allurereport.org/docs/
- Allure пише "сирі" результати (JSON + attachments) у `allure-results/` під час прогону тестів,
  а фінальний інтерактивний HTML-звіт (з графіками, історією, деревом тестів, вкладеннями,
  `test.step`-кроками) збирається окремою командою `allure generate`. Кроки з `test.step(...)` у
  спеках (`tests/*.spec.ts`) автоматично потрапляють в Allure як окремі кроки тесту.
- Команда `allure:generate` використовує прапорець `--single-file`, тому весь звіт (розмітка,
  стилі, дані тестів, скріншоти/трейси у base64) пакується в один самодостатній
  `allure-report/index.html`. Це принципово відрізняється від звичайного `allure generate` /
  `allure open`, які підіймають локальний веб-сервер: за замовчуванням Allure підвантажує дані
  через `fetch` окремих JSON-файлів, а це не працює при відкритті `index.html` напряму з диска
  (`file://`) через обмеження браузера на XHR/fetch до локальних файлів. Single-file режим інлайнить
  усі дані прямо в HTML, тому звіт відкривається подвійним кліком, без `npm run allure:open` і без
  жодного сервера.

### Mochawesome

- Пакет: [`pwmochawesome`](https://www.npmjs.com/package/pwmochawesome) — Playwright-репортер,
  що формує JSON/HTML у форматі та стилі
  [Mochawesome](https://github.com/adamgruber/mochawesome) (класичний Mochawesome працює лише
  поверх Mocha, тому для Playwright Test використовується цей сумісний адаптер, який під капотом
  використовує той самий `mochawesome-report-generator`).
- HTML-звіт генерується одразу після прогону тестів, без окремого кроку merge/generate.

## BrowserStack Test Observability (конфігурація без реального акаунта)

Документація: https://www.browserstack.com/docs/test-reporting-and-analytics/getting-started

Test Observability підключається не як звичайний Playwright-репортер, а через BrowserStack SDK,
який обгортає команду запуску тестів і сам збирає та надсилає результати, відео, логи мережі
тощо у хмару BrowserStack. Щоб підключити цей проєкт до реального акаунта:

1. Встановити SDK:
   ```bash
   npm install --save-dev browserstack-node-sdk
   npx setup --username <BROWSERSTACK_USERNAME> --key <BROWSERSTACK_ACCESS_KEY>
   ```
   Ця команда сама створює `browserstack.yml` у корені проєкту та підключає observability-хук.
2. У `browserstack.yml` увімкнути спостережуваність:
   ```yaml
   userName: <BROWSERSTACK_USERNAME>
   accessKey: <BROWSERSTACK_ACCESS_KEY>
   framework: playwright
   testObservability: true
   ```
3. Креденшли зберігати не в yml, а через змінні середовища
   `BROWSERSTACK_USERNAME` / `BROWSERSTACK_ACCESS_KEY` (наприклад, у `.env`, доданому в
   `.gitignore`).
4. Запускати тести через обгортку SDK, а не напряму:
   ```bash
   npx browserstack-node-sdk playwright test
   ```
5. Результати, відео прогонів, логи та аналітика по флейкі-тестах з'являються в дашборді
   Test Observability на https://observability.browserstack.com/.

## ReportPortal (конфігурація без розгорнутого сервера)

Документація: https://reportportal.io/docs/

ReportPortal — self-hosted платформа (AI-аналітика логів, історія прогонів), яку зазвичай
піднімають локально через Docker Compose перед підключенням клієнта:

1. Підняти сервер (потребує Docker):
   ```bash
   git clone https://github.com/reportportal/reportportal.git
   cd reportportal
   docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d
   ```
   Веб-інтерфейс піднімається на `http://localhost:8080`, там створюється проєкт і генерується
   `API_KEY`.
2. Встановити клієнтський агент для Playwright:
   ```bash
   npm install --save-dev @reportportal/agent-js-playwright
   ```
3. Додати конфіг `reportportal.config.js` у корені проєкту:
   ```js
   module.exports = {
       apiKey: process.env.RP_API_KEY,
       endpoint: 'http://localhost:8080/api/v1',
       project: 'lesson21_hotline',
       launch: 'Hotline.ua UI tests',
       attributes: [{ key: 'framework', value: 'playwright' }],
       description: 'Lesson 21 reporters homework'
   };
   ```
4. Підключити репортер у `playwright.config.ts` поруч з іншими:
   ```ts
   reporter: [
       // ...існуючі репортери
       ['@reportportal/agent-js-playwright', require('./reportportal.config.js')]
   ]
   ```
5. `RP_API_KEY` зберігати у змінних середовища / `.env`, у git не комітити.

