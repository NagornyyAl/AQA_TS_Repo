# Jasmine

Jasmine - це BDD-фреймворк для тестування JavaScript/TypeScript з власним test runner, assertion API, spies, async helpers та можливістю запуску тестів у Node.js або браузері.

Офіційна документація:

- Documentation home: https://jasmine.github.io/pages/docs_home.html
- Getting started: https://jasmine.github.io/pages/getting_started.html
- First suite: https://jasmine.github.io/tutorials/your_first_suite.html
- Async tests: https://jasmine.github.io/tutorials/async.html
- API reference: https://jasmine.github.io/api/edge/index.html

## Встановлення

Для Node.js-проєкту:

```bash
npm install --save-dev jasmine
npx jasmine init
```

Додати script у `package.json`:

```json
{
  "scripts": {
    "test": "jasmine"
  }
}
```

Запуск тестів:

```bash
npm test
```

## Базова структура тесту

Jasmine використовує глобальні функції:

- `describe` групує пов'язані тести.
- `it` описує окремий тестовий сценарій.
- `expect` створює перевірку.
- `beforeEach`, `afterEach`, `beforeAll`, `afterAll` описують підготовку та очищення даних.

```ts
describe('Calculator', () => {
  it('adds two numbers', () => {
    expect(2 + 3).toBe(5);
  });
});
```

## Assertions

Jasmine має власний набір matchers, тому Chai для звичайних Jasmine-тестів не потрібен.

Поширені matchers:

- `toBe` - строга рівність.
- `toEqual` - порівняння структури об'єктів або масивів.
- `toContain` - перевірка наявності елемента в масиві або рядку.
- `toBeTruthy`, `toBeFalsy` - перевірка truthy/falsy значень.
- `toThrow`, `toThrowError` - перевірка помилок.

```ts
expect(user.name).toBe('Anna');
expect(user).toEqual({ name: 'Anna', role: 'admin' });
expect(() => service.run()).toThrowError();
```

## Асинхронні тести

Jasmine підтримує кілька способів тестування асинхронного коду:

- `async`/`await`;
- повернення `Promise`;
- callback-стиль через `done`.

```ts
it('loads user', async () => {
  const user = await loadUser();

  expect(user.id).toBe(1);
});
```

Для `Promise` Jasmine також має `expectAsync`.

```ts
await expectAsync(loadUser()).toBeResolved();
```

## Spies та mocks

Jasmine має вбудовані spies для заміни функцій та перевірки їх викликів.

```ts
const logger = {
  log(message: string): void {
    console.log(message);
  }
};

spyOn(logger, 'log');

logger.log('done');

expect(logger.log).toHaveBeenCalledWith('done');
```

Spies корисні, коли потрібно перевірити взаємодію з залежністю без виклику її реальної реалізації.

## TypeScript

Jasmine може тестувати TypeScript-код через `ts-node`, `tsx` або через попередню компіляцію TypeScript у JavaScript. Сам runner Jasmine шукає spec-файли згідно з конфігурацією, яка створюється після `jasmine init`.

Рекомендована структура:

```text
src/
  calculator.ts
spec/
  calculator.spec.ts
```

## Коли використовувати

Jasmine варто використовувати, коли потрібні:

- повний тестовий фреймворк з вбудованими assertions та spies;
- BDD-стиль без окремого підключення Chai/Sinon;
- запуск тестів у браузері або Node.js;
- стабільний і зрозумілий global API.

Якщо проєкт уже побудований навколо Vite і потрібен швидкий запуск TypeScript-тестів без додаткової конфігурації, простішим вибором зазвичай буде Vitest.
