# Lesson 23. Вступ до Docker для тестування

Домашнє завдання складається з 4 пунктів. Пункти 1-2 та 4 — це разові дії в
операційній системі (встановлення WSL2/Docker Desktop, підняття важкого
стеку ReportPortal), їх треба виконати вручну на своїй машині. Пункт 3
повністю реалізований кодом у цій теці й перевірений локально.

## 1. WSL 2 (тільки для Windows 10/11)

1. Відкрити PowerShell **від імені адміністратора**.
2. Виконати:
    ```powershell
    wsl --install
    ```
3. Перезавантажити комп'ютер.
4. Перевірити встановлення:
    ```powershell
    wsl --status
    wsl -l -v
    ```

Довідка: https://learn.microsoft.com/en-us/windows/wsl/install

## 2. Docker

1. Завантажити й встановити Docker Desktop: https://www.docker.com/get-started/
2. Під час встановлення на Windows обрати backend **WSL 2**.
3. Після встановлення перевірити:
    ```powershell
    docker --version
    docker compose version
    ```

## 3. Docker-контейнер для Expense Tracker App + UI-тести

Проєкт під тестуванням: [AhmedShaykh/Expense-Tracker-App-With-React.JS](https://github.com/AhmedShaykh/Expense-Tracker-App-With-React.JS)
— React-застосунок обліку доходів/витрат без бекенду (стан лише в пам'яті
браузера), запускається dev-сервером `react-scripts start` на порту 3000.

Файли:

- [`app/Dockerfile`](app/Dockerfile) — клонує застосунок і піднімає його dev-сервер (`npm run start`, порт 3000, healthcheck через `wget`).
- [`Dockerfile`](Dockerfile) — образ для запуску тестів (`mcr.microsoft.com/playwright:v1.55.0-jammy`).
- [`docker-compose.yml`](docker-compose.yml) — два сервіси:
    - `app` — застосунок під тестуванням (порт `3000:3000`);
    - `tests` — Playwright-тести, чекають на `app` через `condition: service_healthy` і звертаються до нього за `http://app:3000`.
- [`tests/expense-tracker.spec.ts`](tests/expense-tracker.spec.ts) — 4 прості UI-тести:
    1. застосунок відкривається, баланс стартує з `$0.00`;
    2. додавання прибуткової транзакції оновлює баланс і історію;
    3. додавання видаткової транзакції оновлює баланс і історію;
    4. видалення транзакції перераховує баланс.

Тести написані й **перевірені локально** проти реального застосунку
(`npm start` в клоні репозиторію + `npx playwright test`) — усі 4 пройшли.
Одне з очікувань довелося виправити під реальну поведінку застосунку:
від'ємний баланс рендериться як `$-50.00` (знак після долара), а не
`-$50.00` — це особливість форматування у вихідному коді `Balance.jsx`.

### Запуск

```bash
docker compose build
docker compose up --abort-on-container-exit
```

Застосунок буде доступний окремо на http://localhost:3000, звіт Playwright
після прогону — у `./playwright-report` (HTML) і `./test-results`.

Локально без Docker (для розробки тестів):

```bash
npm install
npx playwright install chromium
npx playwright test            # проти http://localhost:3000, запущеного окремо
```

Лінтер і форматування (ESLint + Prettier, конфіг як у lesson21):

```bash
npm run lint
npm run format:check
```

## 4. ReportPortal у Docker

За офіційною інструкцією https://reportportal.io/installation :

1. Файл [`docker-compose.reportportal.yml`](docker-compose.reportportal.yml)
   у цій теці — це офіційний `docker-compose.yml` проєкту ReportPortal
   (завантажений без змін з
   https://raw.githubusercontent.com/reportportal/reportportal/master/docker-compose.yml).
2. Підняти стек:
    ```bash
    docker compose -f docker-compose.reportportal.yml -p reportportal up -d
    ```
3. Дочекатися, поки всі контейнери стануть `healthy` (перший старт — кілька
   хвилин, стек важкий: PostgreSQL, RabbitMQ, OpenSearch, кілька сервісів
   ReportPortal).
4. Відкрити http://localhost:8080/, залогінитися під `superadmin/erebus`
   (обов'язково змінити пароль після першого входу).
5. Створити нового користувача з роллю Project Manager для свого проєкту,
   згенерувати API key (Profile → API keys → Generate API Key).
6. Підключити Playwright-агент у тестовому проєкті:
    ```bash
    npm i -D @reportportal/agent-js-playwright
    ```
    і додати репортер у `playwright.config.ts`:
    ```ts
    const RPconfig = {
        apiKey: '<API_KEY>',
        endpoint: 'http://localhost:8080/api/v2',
        project: '<project_name>',
        launch: 'Playwright run',
        attributes: [],
        description: 'playwright run',
        includeTestSteps: true
    };

    export default defineConfig({
        // ...
        reporter: [['@reportportal/agent-js-playwright', RPconfig]]
    });
    ```
7. Запустити тести й перевірити на вкладці Launches у ReportPortal, що звіт
   згенерувався.

Довідка: https://reportportal.io/docs/log-data-in-reportportal/test-framework-integration/JavaScript/
