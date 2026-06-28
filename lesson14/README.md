# Урок 14. Фреймворк для API тестування

Базовий тестовий фреймворк: **Vitest**.

Утиліта для HTTP-запитів: **axios**, обгорнутий у сервіс `src/framework/http-client.ts`.

Об'єкт тестування: зовнішній Official Joke API. Базовий URL заданий у `config.json`.

За потреби базовий URL можна перевизначити через змінну середовища `API_BASE_URL`.

## Команди

```bash
npm install
npm test
npm run typecheck
npm run lint
```

## Структура

- `src/framework` - перевикористовуваний HTTP client/service шар.
- `src/api/objects` - API Objects для конкретних API-ресурсів.
- `src/api/dto` - DTO-моделі відповідей.
- `config.json` - базова конфігурація API.
- `tests/support` - допоміжні перевірки для тестів.
- `tests/jokes-api.spec.ts` - п'ять API-тестів.
